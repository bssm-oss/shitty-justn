import { AnalyzerResult, Issue, PSIAudit } from './types';
import { mobileMessages } from '../messages/mobile';
import { fetchPSI, type PSIData } from './psi';

// Mobile analyzer using Google PageSpeed Insights API for mobile-specific metrics
export async function analyzeMobile(url: string, psiData?: PSIData): Promise<AnalyzerResult> {
  try {
    const data = psiData ?? await fetchPSI(url, 'mobile', ['performance', 'accessibility', 'best-practices', 'seo']);

    // We'll calculate a mobile-specific score based on multiple categories
    const performanceScore = data.lighthouseResult?.categories?.performance?.score || 0;
    const accessibilityScore = data.lighthouseResult?.categories?.accessibility?.score || 0;
    const bestPracticesScore = data.lighthouseResult?.categories?.['best-practices']?.score || 0;
    const seoScore = data.lighthouseResult?.categories?.seo?.score || 0;

    // Weighted average for mobile score (performance and accessibility are most important for mobile)
    let score = Math.round(
      (performanceScore * 0.4 + accessibilityScore * 0.3 + bestPracticesScore * 0.2 + seoScore * 0.1) * 100
    );

    // Map PSI audit results to our mobile issue format
    const issues: Issue[] = [];
    const audits: Record<string, PSIAudit> = data.lighthouseResult?.audits || {};

    // Process audits and create issues
    for (const [auditId, audit] of Object.entries(audits)) {
      const msg = mobileMessages[auditId];
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

    // Additional mobile-specific checks
    // Check for slow mobile network simulation
    const interactive = data.lighthouseResult?.audits?.['interactive']?.numericValue || 0;
    if (interactive > 5000) { // More than 5 seconds to interactive
      const interactiveScoreDeduction = Math.min(20, Math.floor((interactive - 5000) / 500)); // 2 points per 500ms over 5s
      const newScore = Math.max(0, score - interactiveScoreDeduction);

      const interactiveMsg = mobileMessages['slow-mobile-interactive'];
      issues.push({
        id: 'slow-mobile-interactive',
        severity: interactive > 10000 ? 'error' : 'warning',
        message: interactiveMsg ? interactiveMsg.title : '모바일 상호작용 시간 과다',
        detail: interactiveMsg
          ? `${interactiveMsg.description} ${interactiveMsg.fix}`
          : `모바일에서 페이지가 상호 작용 가능해지기까지 ${Math.round(interactive / 1000)}초가 걸립니다.`
      });

      // Update score for subsequent deductions
      score = newScore;
    }

    // Check for large layout shifts on mobile
    const layoutShift = data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue || 0;
    if (layoutShift > 0.25) { // Poor CLS threshold
      const layoutShiftScoreDeduction = Math.min(15, Math.floor((layoutShift - 0.25) * 50)); // 1 point per 0.02 over 0.25
      const newScore = Math.max(0, score - layoutShiftScoreDeduction);

      const clsMsg = mobileMessages['poor-mobile-cls'];
      issues.push({
        id: 'poor-mobile-cls',
        severity: layoutShift > 0.5 ? 'error' : 'warning',
        message: clsMsg ? clsMsg.title : '모바일 레이아웃 이동 과다',
        detail: clsMsg
          ? `${clsMsg.description} ${clsMsg.fix}`
          : '모바일에서 레이아웃 이동이 과다하여 사용자 경험이 나빠집니다.'
      });

      // Update score for subsequent deductions
      score = newScore;
    }

    return {
      category: 'mobile',
      score,
      issues,
      meta: {
        performanceScore: Math.round(performanceScore * 100),
        accessibilityScore: Math.round(accessibilityScore * 100),
        bestPracticesScore: Math.round(bestPracticesScore * 100),
        seoScore: Math.round(seoScore * 100),
        firstContentfulPaint: data.lighthouseResult?.audits?.['first-contentful-paint']?.numericValue || 0,
        largestContentfulPaint: data.lighthouseResult?.audits?.['largest-contentful-paint']?.numericValue || 0,
        cumulativeLayoutShift: data.lighthouseResult?.audits?.['cumulative-layout-shift']?.numericValue || 0,
        interactive: data.lighthouseResult?.audits?.['interactive']?.numericValue || 0,
        speedIndex: data.lighthouseResult?.audits?.['speed-index']?.numericValue || 0,
        viewport: (audits['viewport']?.score ?? 0) === 1,
        fontSizeAdequate: (audits['font-size']?.score ?? 0) >= 0.9,
        tapTargetsAdequate: (audits['tap-targets']?.score ?? 0) >= 0.9,
        contentWidthAdequate: (audits['content-width']?.score ?? 0) === 1
      }
    };
  } catch (error) {
    console.error('Mobile analysis error:', error);
    // Return a fallback result with error information
    return {
      category: 'mobile',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '모바일 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류'
      }],
      meta: {}
    };
  }
}