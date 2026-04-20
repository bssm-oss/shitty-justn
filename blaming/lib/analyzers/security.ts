import { AnalyzerResult, Issue } from './types';
import { securityMessages } from '../messages/security';

interface SecurityCheck {
  id: string;
  check: () => boolean;
  severity: 'info' | 'warning' | 'error';
}

export async function analyzeSecurity(url: string): Promise<AnalyzerResult> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'blaming/1.0 (Security Analyzer)',
      },
      signal: AbortSignal.timeout(10000),
    });

    const headers = response.headers;
    let score = 100;
    const issues: Issue[] = [];

    const securityChecks: SecurityCheck[] = [
      {
        id: 'strict-transport-security',
        check: () => !headers.has('strict-transport-security'),
        severity: 'error',
      },
      {
        id: 'content-security-policy',
        check: () => !headers.has('content-security-policy'),
        severity: 'error',
      },
      {
        id: 'x-content-type-options',
        check: () => !headers.has('x-content-type-options'),
        severity: 'warning',
      },
      {
        id: 'x-frame-options',
        check: () => !headers.has('x-frame-options'),
        severity: 'warning',
      },
      {
        id: 'referrer-policy',
        check: () => !headers.has('referrer-policy'),
        severity: 'warning',
      },
      {
        id: 'permissions-policy',
        check: () => !headers.has('permissions-policy'),
        severity: 'info',
      },
      {
        id: 'x-xss-protection',
        check: () => !headers.has('x-xss-protection'),
        severity: 'warning',
      },
      {
        id: 'server-header',
        check: () =>
          headers.has('server') &&
          ['nginx', 'apache', 'iis', 'github.com', 'cloudflare'].some((tech) =>
            headers.get('server')?.toLowerCase().includes(tech),
          ),
        severity: 'info',
      },
      {
        id: 'powered-by-header',
        check: () => headers.has('x-powered-by'),
        severity: 'info',
      },
    ];

    for (const check of securityChecks) {
      if (check.check()) {
        const pointsToDeduct = check.severity === 'error' ? 15 : check.severity === 'warning' ? 10 : 5;
        score = Math.max(0, score - pointsToDeduct);

        const msg = securityMessages[check.id];
        issues.push({
          id: check.id,
          severity: check.severity,
          message: msg?.title ?? check.id,
          detail: msg ? `${msg.description} ${msg.fix}` : undefined,
        });
      }
    }

    // 민감한 경로 노출 체크
    const exposedPaths = [
      '.env',
      '.git/config',
      '.git/HEAD',
      'wp-config.php',
      'config.php',
      'phpinfo.php',
      'info.php',
      'backup.zip',
      'database.sql',
      '.DS_Store',
      'error_log',
    ];

    const pathResults = await Promise.allSettled(
      exposedPaths.map(async (path) => {
        const pathUrl = new URL(url);
        pathUrl.pathname = path;
        const pathResponse = await fetch(pathUrl.toString(), {
          method: 'HEAD',
          redirect: 'follow',
          signal: AbortSignal.timeout(5000),
        });
        return pathResponse.ok || (pathResponse.status >= 300 && pathResponse.status < 400);
      }),
    );

    const exposedCount = pathResults.filter(
      (r) => r.status === 'fulfilled' && r.value,
    ).length;

    if (exposedCount > 0) {
      const exposureScoreDeduction = Math.min(30, exposedCount * 5);
      score = Math.max(0, score - exposureScoreDeduction);

      const msg = securityMessages['exposed-paths'];
      issues.push({
        id: 'exposed-paths',
        severity: exposedCount > 3 ? 'error' : 'warning',
        message: msg?.title ?? 'exposed-paths',
        detail: msg
          ? `${exposedCount}개의 민감한 경로가 외부에서 접근 가능합니다. ${msg.fix}`
          : `${exposedCount}개의 민감한 경로가 외부에서 접근 가능합니다.`,
      });
    }

    // HTTPS 사용 여부 체크
    try {
      const urlObj = new URL(url);
      if (urlObj.protocol !== 'https:') {
        score = Math.max(0, score - 20);
        const msg = securityMessages['no-https'];
        issues.push({
          id: 'no-https',
          severity: 'error',
          message: msg?.title ?? 'no-https',
          detail: msg ? `${msg.description} ${msg.fix}` : undefined,
        });
      }
    } catch {
      // URL 파싱 실패는 API route에서 처리됨
    }

    score = Math.max(0, score);

    return {
      category: 'security',
      score,
      issues,
      meta: {
        hasHsts: headers.has('strict-transport-security'),
        hasCsp: headers.has('content-security-policy'),
        hasXContentTypeOptions: headers.has('x-content-type-options'),
        hasXFrameOptions: headers.has('x-frame-options'),
        hasReferrerPolicy: headers.has('referrer-policy'),
        hasPermissionsPolicy: headers.has('permissions-policy'),
        hasXXSSProtection: headers.has('x-xss-protection'),
        serverHeader: headers.get('server') ?? '',
        poweredByHeader: headers.get('x-powered-by') ?? '',
        isHttps: url.startsWith('https://'),
        exposedPathsCount: exposedCount,
      },
    };
  } catch (error) {
    console.error('Security analysis error:', error);
    return {
      category: 'security',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '보안 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류',
      }],
      meta: {},
    };
  }
}
