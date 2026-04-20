import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { eq, sql, desc } from 'drizzle-orm';
import { getDb } from '@/lib/db/client';
import { analysisResults, rateLimits } from '@/lib/db/schema';
import { runAnalysis } from '@/lib/analyzers';

const ANALYSIS_TIMEOUT_MS = 45_000;

const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function checkRateLimit(ip: string): Promise<boolean> {
  const db = getDb();
  const now = new Date();

  const existing = await db
    .select()
    .from(rateLimits)
    .where(eq(rateLimits.ip, ip))
    .get();

  // No record or window expired → reset
  if (!existing || existing.reset_at.getTime() <= now.getTime()) {
    const resetAt = new Date(now.getTime() + RATE_LIMIT_WINDOW_MS);
    await db
      .insert(rateLimits)
      .values({ ip, count: 1, reset_at: resetAt })
      .onConflictDoUpdate({
        target: rateLimits.ip,
        set: { count: 1, reset_at: resetAt },
      });
    return true;
  }

  // Window active, check limit
  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  // Increment count
  await db
    .update(rateLimits)
    .set({ count: sql`${rateLimits.count} + 1` })
    .where(eq(rateLimits.ip, ip));

  return true;
}

function getClientIP(request: NextRequest): string {
  // Check for forwarded headers first (common in Vercel)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in the forwarded-for chain
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback to other headers or remote address
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: unknown = await request.json();
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json(
        { error: 'URL이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const rawBody = body as Record<string, unknown>;
    const { url } = rawBody;
    const force = rawBody['force'] === true;

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    let validatedUrl: string;
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      // Additional SSRF protection - check if URL points to internal addresses
      const hostname = parsedUrl.hostname.toLowerCase();
      // hostname에서 IPv6 bracket 제거
      const bare = hostname.startsWith('[') && hostname.endsWith(']')
        ? hostname.slice(1, -1)
        : hostname;

      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0' ||
        hostname === '::1' ||
        hostname === '[::1]' ||
        hostname.endsWith('.local') ||
        /^10\./.test(hostname) ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
        /^192\.168\./.test(hostname) ||
        /^169\.254\./.test(hostname) ||
        // IPv6 loopback
        bare === '::1' ||
        // IPv4-mapped IPv6 loopback
        bare.toLowerCase() === '::ffff:127.0.0.1' ||
        // IPv6 ULA (fc00::/7 = fc00:: ~ fdff::)
        /^f[cd][0-9a-f]{2}:/i.test(bare) ||
        // IPv6 link-local (fe80::/10)
        /^fe[89ab][0-9a-f]:/i.test(bare) ||
        // IPv4-mapped IPv6 private ranges
        /^::ffff:(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.|127\.|0\.0\.0\.0)/i.test(bare)
      ) {
        return NextResponse.json(
          { error: '보안 정책상 내부 네트워크 주소는 분석할 수 없습니다.' },
          { status: 403 }
        );
      }
      validatedUrl = parsedUrl.toString();
    } catch {
      return NextResponse.json(
        { error: '올바른 URL 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Cache lookup — skip if force=true
    if (!force) {
      try {
        const db = getDb();
        const cached = await db
          .select({ id: analysisResults.id, created_at: analysisResults.created_at })
          .from(analysisResults)
          .where(eq(analysisResults.url, validatedUrl))
          .orderBy(desc(analysisResults.created_at))
          .limit(1)
          .get();

        if (cached) {
          const ageMs = Date.now() - cached.created_at.getTime();
          if (ageMs < CACHE_TTL_MS) {
            return NextResponse.json({ id: cached.id, cached: true });
          }
        }
      } catch {
        // Cache lookup failure is non-fatal — fall through to fresh analysis
      }
    }

    // Rate limiting (only consumed on cache miss or force)
    const clientIP = getClientIP(request);
    if (!(await checkRateLimit(clientIP))) {
      return NextResponse.json(
        { error: '요청 한도를 초과했습니다. 1분 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    // Generate unique ID for this analysis
    const analysisId = nanoid(8);

    // Run all analyzers in parallel with timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error('분석 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.')),
        ANALYSIS_TIMEOUT_MS,
      ),
    );
    const results = await Promise.race([runAnalysis(validatedUrl), timeoutPromise]);

    // Bot blocking detection: all 6 scores being 0 likely means the site blocked us
    const allZero =
      results.performance.score === 0 &&
      results.accessibility.score === 0 &&
      results.seo.score === 0 &&
      results.security.score === 0 &&
      results.bundle.score === 0 &&
      results.mobile.score === 0;

    // Store results in database (even if possibly blocked)
    const db = getDb();
    await db.insert(analysisResults).values({
      id: analysisId,
      url: validatedUrl,
      result_data: JSON.stringify(results),
    });

    // Return the analysis ID with optional warning
    if (allZero) {
      return NextResponse.json({
        id: analysisId,
        warning: '대상 사이트가 요청을 차단했을 수 있습니다. 결과가 정확하지 않을 수 있습니다.',
      });
    }

    return NextResponse.json({ id: analysisId });
  } catch (error) {
    console.error('Analysis API error:', error);

    // Timeout
    if (error instanceof Error && error.message.includes('분석 시간이 초과')) {
      return NextResponse.json(
        { error: error.message },
        { status: 504 },
      );
    }

    // Network errors (DNS, connection refused, etc.)
    const cause = (error as { cause?: { code?: string } }).cause;
    if (cause?.code) {
      const networkErrors: Record<string, string> = {
        ENOTFOUND: '해당 도메인을 찾을 수 없습니다. URL을 다시 확인해주세요.',
        ECONNREFUSED: '대상 서버가 연결을 거부했습니다.',
        ETIMEDOUT: '대상 서버 연결 시간이 초과되었습니다.',
        ECONNRESET: '대상 서버와의 연결이 끊어졌습니다.',
        ERR_TLS_CERT_ALTNAME_INVALID: '대상 사이트의 SSL 인증서가 유효하지 않습니다.',
        CERT_HAS_EXPIRED: '대상 사이트의 SSL 인증서가 만료되었습니다.',
      };

      const message = networkErrors[cause.code];
      if (message) {
        return NextResponse.json({ error: message }, { status: 422 });
      }
    }

    return NextResponse.json(
      { error: '서버 내부 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
