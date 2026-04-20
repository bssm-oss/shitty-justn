import { AnalyzerResult, Issue, PSIAudit } from './types';
import { performanceMessages } from '../messages/performance';
import { fetchPSI, type PSIData } from './psi';

// Performance analyzer using Google PageSpeed Insights API
export async function analyzePerformance(url: string, psiData?: PSIData): Promise<AnalyzerResult> {
  try {
    const data = psiData ?? await fetchPSI(url, 'mobile', ['performance']);

    // Extract performance score
    const score = Math.round(
      (data.lighthouseResult?.categories?.performance?.score ?? 0) * 100
    );

    // Map PSI audit results to our issue format
    const issues: Issue[] = [];
    const audits: Record<string, PSIAudit> = data.lighthouseResult?.audits || {};

    // Process audits and create issues
    for (const [auditId, audit] of Object.entries(audits)) {
      const msg = performanceMessages[auditId];
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

    return {
      category: 'performance',
      score,
      issues,
      meta: {
        firstContentfulPaint: data.lighthouseResult?.audits?.['first-contentful-paint']?.numericValue || 0,
        largestContentfulPaint: data.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue || 0,
        totalBlockingTime: data.lighthouseResult?.audits?.['total-blocking-time']?.numericValue || 0,
        cumulativeLayoutShift: data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue || 0,
        speedIndex: data.lighthouseResult?.audits?.['speed-index']?.numericValue || 0,
      }
    };
  } catch (error) {
    console.error('Performance analysis error:', error);
    // Return a fallback result with error information
    return {
      category: 'performance',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '성능 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류'
      }],
      meta: {}
    };
  }
}