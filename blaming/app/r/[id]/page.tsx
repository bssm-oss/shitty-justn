import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db/client';
import type { AnalyzerResult, Issue } from '@/lib/analyzers/types';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CopyButton } from './copy-button';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const db = getDb();

  const row = await db.query.analysisResults.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!row) {
    return { title: 'blaming - 결과 없음' };
  }

  let data: AnalysisData;
  try {
    data = JSON.parse(row.result_data) as AnalysisData;
  } catch {
    return { title: 'blaming - 데이터 오류' };
  }

  const title = `blaming - ${row.url} (${data.overallScore}점)`;
  const description = `${row.url} 분석 결과: 종합 ${data.overallScore}점 | 성능 ${data.performance.score} | 접근성 ${data.accessibility.score} | SEO ${data.seo.score} | 보안 ${data.security.score} | 번들 ${data.bundle.score} | 모바일 ${data.mobile.score}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

type AnalysisData = {
  performance: AnalyzerResult;
  accessibility: AnalyzerResult;
  seo: AnalyzerResult;
  security: AnalyzerResult;
  bundle: AnalyzerResult;
  mobile: AnalyzerResult;
  overallScore: number;
};

const CATEGORY_LABELS: Record<string, string> = {
  performance: '성능',
  a11y: '접근성',
  seo: 'SEO',
  security: '보안',
  bundle: '번들',
  mobile: '모바일',
};

const CATEGORY_ORDER = ['performance', 'accessibility', 'seo', 'security', 'bundle', 'mobile'] as const;

function scoreColor(score: number): string {
  if (score >= 80) return 'text-score-good';
  if (score >= 60) return 'text-score-mid';
  return 'text-score-bad';
}

function scoreBorderColor(score: number): string {
  if (score >= 80) return 'border-score-good';
  if (score >= 60) return 'border-score-mid';
  return 'border-score-bad';
}

function severityLabel(severity: Issue['severity']): string {
  switch (severity) {
    case 'error': return '오류';
    case 'warning': return '경고';
    case 'info': return '정보';
  }
}

function severityColor(severity: Issue['severity']): string {
  switch (severity) {
    case 'error': return 'text-score-bad bg-score-bad/10 border-score-bad/30';
    case 'warning': return 'text-score-mid bg-score-mid/10 border-score-mid/30';
    case 'info': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  }
}

function severityBorder(severity: Issue['severity']): string {
  switch (severity) {
    case 'error': return 'border-l-score-bad';
    case 'warning': return 'border-l-score-mid';
    case 'info': return 'border-l-blue-400';
  }
}

function ScoreCircle({ score, size = 'lg' }: { score: number; size?: 'sm' | 'lg' }) {
  const isLarge = size === 'lg';
  const dimension = isLarge ? 'w-32 h-32' : 'w-20 h-20';
  const textSize = isLarge ? 'text-4xl' : 'text-2xl';

  return (
    <div className={`${dimension} rounded-full border-4 ${scoreBorderColor(score)} flex items-center justify-center`}>
      <span className={`${textSize} font-bold ${scoreColor(score)}`}>{score}</span>
    </div>
  );
}

function CategoryCard({ result }: { result: AnalyzerResult }) {
  const label = CATEGORY_LABELS[result.category] ?? result.category;
  const issueCount = result.issues.length;

  return (
    <div className="bg-surface rounded-lg p-4 flex flex-col items-center gap-2">
      <ScoreCircle score={result.score} size="sm" />
      <span className="text-sm font-medium">{label}</span>
      {issueCount > 0 && (
        <span className="text-xs text-muted">{issueCount}개 이슈</span>
      )}
    </div>
  );
}

function IssueItem({ issue }: { issue: Issue }) {
  return (
    <div className={`border-l-4 ${severityBorder(issue.severity)} bg-surface rounded-r-lg p-4`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <h4 className="font-medium text-sm">{issue.message}</h4>
        <span className={`shrink-0 px-2 py-0.5 text-xs rounded border ${severityColor(issue.severity)}`}>
          {severityLabel(issue.severity)}
        </span>
      </div>
      {issue.detail && (
        <p className="text-muted text-sm leading-relaxed">{issue.detail}</p>
      )}
    </div>
  );
}

function IssueSection({ result }: { result: AnalyzerResult }) {
  const label = CATEGORY_LABELS[result.category] ?? result.category;
  if (result.issues.length === 0) return null;

  return (
    <details className="group" open={result.issues.some((i) => i.severity === 'error')}>
      <summary className="cursor-pointer list-none flex items-center gap-3 py-3 hover:opacity-80">
        <span className="text-muted group-open:rotate-90 transition-transform">&#9654;</span>
        <span className="font-semibold">{label}</span>
        <span className="text-sm text-muted">({result.issues.length}개)</span>
      </summary>
      <div className="space-y-2 pb-4 pl-6">
        {result.issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </details>
  );
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = getDb();

  const row = await db.query.analysisResults.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });

  if (!row) notFound();

  let data: AnalysisData;
  try {
    data = JSON.parse(row.result_data) as AnalysisData;
  } catch {
    notFound();
  }

  const categories = CATEGORY_ORDER.map((key) => data[key]);
  const url = row.url;

  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80">
            blaming
          </Link>
        </div>

        {/* URL + Overall Score */}
        <div className="flex flex-col items-center text-center mb-10">
          <p className="text-muted text-sm mb-4 break-all">{url}</p>
          <ScoreCircle score={data.overallScore} size="lg" />
          <p className="mt-3 text-muted text-sm">종합 점수</p>
        </div>

        {/* Category Scores Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-12">
          {categories.map((result) => (
            <CategoryCard key={result.category} result={result} />
          ))}
        </div>

        {/* Issues */}
        <div className="border-t border-border pt-6">
          <h2 className="text-lg font-semibold mb-4">발견된 이슈</h2>
          <div className="divide-y divide-border">
            {categories.map((result) => (
              <IssueSection key={result.category} result={result} />
            ))}
          </div>
          {categories.every((r) => r.issues.length === 0) && (
            <p className="text-muted py-4">발견된 이슈가 없습니다.</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            &#8592; 새로운 URL 분석
          </Link>
          <CopyButton />
        </div>
      </div>
    </main>
  );
}
