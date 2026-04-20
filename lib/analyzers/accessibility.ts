import { AnalyzerResult, Issue, PSIAudit } from './types';
import { a11yMessages } from '../messages/a11y';
import { fetchPSI, type PSIData } from './psi';

// Accessibility analyzer using Google PageSpeed Insights API
export async function analyzeAccessibility(url: string, psiData?: PSIData): Promise<AnalyzerResult> {
  try {
    const data = psiData ?? await fetchPSI(url, 'mobile', ['accessibility']);

    // Extract accessibility score
    const score = Math.round(
      (data.lighthouseResult?.categories?.accessibility?.score ?? 0) * 100
    );

    // Map PSI audit results to our issue format
    const issues: Issue[] = [];
    const audits: Record<string, PSIAudit> = data.lighthouseResult?.audits || {};

    // Process audits and create issues
    for (const [auditId, audit] of Object.entries(audits)) {
      const msg = a11yMessages[auditId];
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
      category: 'a11y',
      score,
      issues,
      meta: {
        // Store some key metrics for reference
        'aria-allowed-attr': data.lighthouseResult?.audits?.['aria-allowed-attr']?.score || 0,
        'color-contrast': data.lighthouseResult?.audits?.['color-contrast']?.score || 0,
        'image-alt': data.lighthouseResult?.audits?.['image-alt']?.score || 0,
      }
    };
  } catch (error) {
    console.error('Accessibility analysis error:', error);
    // Return a fallback result with error information
    return {
      category: 'a11y',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '접근성 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류'
      }],
      meta: {}
    };
  }
}