import { ImageResponse } from 'next/og';
import { getDb } from '@/lib/db/client';
import type { AnalyzerResult } from '@/lib/analyzers/types';

export const alt = 'blaming 분석 결과';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type AnalysisData = {
  performance: AnalyzerResult;
  accessibility: AnalyzerResult;
  seo: AnalyzerResult;
  security: AnalyzerResult;
  bundle: AnalyzerResult;
  mobile: AnalyzerResult;
  overallScore: number;
};

const COLORS = {
  good: '#22c55e',
  mid: '#eab308',
  bad: '#ef4444',
  muted: '#a1a1aa',
  surface: '#18181b',
  bg: '#09090b',
} as const;

function scoreColor(score: number): string {
  if (score >= 80) return COLORS.good;
  if (score >= 60) return COLORS.mid;
  return COLORS.bad;
}

const CATEGORY_LABELS: Record<string, string> = {
  performance: '성능',
  a11y: '접근성',
  seo: 'SEO',
  security: '보안',
  bundle: '번들',
  mobile: '모바일',
};

const CATEGORY_ORDER = [
  'performance',
  'accessibility',
  'seo',
  'security',
  'bundle',
  'mobile',
] as const;

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const row = await db.query.analysisResults.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!row) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.bg,
            color: COLORS.muted,
            fontSize: 48,
          }}
        >
          blaming - 결과를 찾을 수 없습니다
        </div>
      ),
      { ...size },
    );
  }

  let data: AnalysisData;
  try {
    data = JSON.parse(row.result_data) as AnalysisData;
  } catch {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.bg,
            color: COLORS.muted,
            fontSize: 48,
          }}
        >
          blaming - 데이터 오류
        </div>
      ),
      { ...size },
    );
  }

  const overallColor = scoreColor(data.overallScore);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: COLORS.bg,
          padding: '48px 60px',
        }}
      >
        {/* Header: blaming title */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.025em',
            }}
          >
            blaming
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            display: 'flex',
            marginTop: 16,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: COLORS.muted,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
            }}
          >
            {row.url}
          </span>
        </div>

        {/* Center: Overall Score Circle */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 180,
              height: 180,
              borderRadius: '50%',
              border: `6px solid ${overallColor}`,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: overallColor,
              }}
            >
              {data.overallScore}
            </span>
          </div>
        </div>

        {/* Bottom: 6 Category Scores */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {CATEGORY_ORDER.map((key) => {
            const result = data[key];
            const label = CATEGORY_LABELS[result.category] ?? result.category;
            const color = scoreColor(result.score);

            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  backgroundColor: COLORS.surface,
                  borderRadius: 12,
                  padding: '20px 0',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    border: `3px solid ${color}`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color,
                    }}
                  >
                    {result.score}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 18,
                    color: '#e4e4e7',
                    marginTop: 8,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
    { ...size },
  );
}
