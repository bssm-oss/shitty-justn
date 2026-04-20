import { AnalyzerResult, Issue, PSIAudit } from './types';
import { bundleMessages } from '../messages/bundle';
import { fetchPSI, type PSIData } from './psi';

// Bundle analyzer using Google PageSpeed Insights API for performance metrics related to bundle size
export async function analyzeBundle(url: string, psiData?: PSIData): Promise<AnalyzerResult> {
  try {
    const data = psiData ?? await fetchPSI(url, 'mobile', ['performance']);

    // Calculate bundle score from bundle-related audit scores directly
    const bundleAuditIds = [
      'uses-text-compression',
      'unused-css-rules',
      'unused-js',
      'render-blocking-resources',
      'uses-optimized-images',
      'total-byte-weight',
    ] as const;

    const bundleAuditScores = bundleAuditIds.map(
      (id) => data.lighthouseResult?.audits?.[id]?.score ?? 0
    );
    const avgScore =
      bundleAuditScores.reduce((sum, s) => sum + s, 0) / bundleAuditScores.length;

    let score = Math.round(avgScore * 100);

    // Penalty for total page weight exceeding 3MB
    const totalByteWeight =
      data.lighthouseResult?.audits?.['total-byte-weight']?.numericValue ?? 0;
    if (totalByteWeight > 3_000_000) {
      const overageMb = (totalByteWeight - 3_000_000) / 1_000_000;
      const byteWeightPenalty = Math.min(20, Math.floor(overageMb * 5));
      score = Math.max(0, score - byteWeightPenalty);
    }

    // Map PSI audit results to our bundle issue format
    const issues: Issue[] = [];
    const audits: Record<string, PSIAudit> = data.lighthouseResult?.audits || {};

    // Process audits and create issues
    for (const [auditId, audit] of Object.entries(audits)) {
      const msg = bundleMessages[auditId];
      if (msg && audit.score !== undefined && audit.score < 0.9) {
        // Score below 90% is considered an issue
        const severity = audit.score <= 0.5 ? 'error' : 'warning';
        issues.push({
          id: auditId,
          severity,
          message: msg.title,
          detail: `${msg.description} ${msg.fix}`
        });
      }
    }

    // Additional bundle-specific checks
    // Check for large JavaScript bundles
    const jsUsage = data.lighthouseResult?.audits?.['uses-long-cache-ttl']?.details?.items || [];
    let largeJsCount = 0;
    interface CacheItem { url?: string; transferSize?: number }
    (jsUsage as CacheItem[]).forEach((item) => {
      if (item.url?.endsWith('.js') && (item.transferSize ?? 0) > 100 * 1024) {
        largeJsCount++;
      }
    });

    if (largeJsCount > 0) {
      const jsScoreDeduction = Math.min(15, largeJsCount * 5);
      score = Math.max(0, score - jsScoreDeduction);

      const msg = bundleMessages['large-javascript-bundles'];
      issues.push({
        id: 'large-javascript-bundles',
        severity: largeJsCount > 2 ? 'error' : 'warning',
        message: msg?.title ?? 'large-javascript-bundles',
        detail: msg
          ? `${largeJsCount}개의 JavaScript 파일이 100KB를 초과합니다. ${msg.fix}`
          : `${largeJsCount}개의 JavaScript 파일이 100KB를 초과합니다.`,
      });
    }

    // 큰 CSS 번들 체크
    const cssUsage = data.lighthouseResult?.audits?.['uses-long-cache-ttl']?.details?.items || [];
    let largeCssCount = 0;
    (cssUsage as CacheItem[]).forEach((item) => {
      if (item.url?.endsWith('.css') && (item.transferSize ?? 0) > 50 * 1024) {
        largeCssCount++;
      }
    });

    if (largeCssCount > 0) {
      const cssScoreDeduction = Math.min(10, largeCssCount * 5);
      score = Math.max(0, score - cssScoreDeduction);

      const msg = bundleMessages['large-css-bundles'];
      issues.push({
        id: 'large-css-bundles',
        severity: largeCssCount > 1 ? 'error' : 'warning',
        message: msg?.title ?? 'large-css-bundles',
        detail: msg
          ? `${largeCssCount}개의 CSS 파일이 50KB를 초과합니다. ${msg.fix}`
          : `${largeCssCount}개의 CSS 파일이 50KB를 초과합니다.`,
      });
    }

    return {
      category: 'bundle',
      score,
      issues,
      meta: {
        totalByteWeight: data.lighthouseResult?.audits?.['total-byte-weight']?.numericValue || 0,
        usesOptimizedImages: data.lighthouseResult?.audits?.['uses-optimized-images']?.score || 0,
        usesTextCompression: data.lighthouseResult?.audits?.['uses-text-compression']?.score || 0,
        unusedCssRules: data.lighthouseResult?.audits?.['unused-css-rules']?.numericValue || 0,
        unusedJs: data.lighthouseResult?.audits?.['unused-js']?.numericValue || 0,
        renderBlockingResources: data.lighthouseResult?.audits?.['render-blocking-resources']?.score || 0,
        largeJsCount,
        largeCssCount
      }
    };
  } catch (error) {
    console.error('Bundle analysis error:', error);
    // Return a fallback result with error information
    return {
      category: 'bundle',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '번들 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류'
      }],
      meta: {}
    };
  }
}