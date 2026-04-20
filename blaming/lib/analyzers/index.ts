import { analyzePerformance } from './performance';
import { analyzeAccessibility } from './accessibility';
import { analyzeSEO } from './seo';
import { analyzeSecurity } from './security';
import { analyzeBundle } from './bundle';
import { analyzeMobile } from './mobile';
import { fetchPSI } from './psi';
import type { AnalyzerResult } from './types';

export type AnalysisResults = {
  performance: AnalyzerResult;
  accessibility: AnalyzerResult;
  seo: AnalyzerResult;
  security: AnalyzerResult;
  bundle: AnalyzerResult;
  mobile: AnalyzerResult;
  overallScore: number;
};

export async function runAnalysis(url: string): Promise<AnalysisResults> {
  try {
    // PSI API 1회 호출로 4개 분석기에 결과 분배 (mobile strategy, 전체 카테고리)
    const mobilePSI = await fetchPSI(url, 'mobile', ['performance', 'accessibility', 'best-practices', 'seo']);

    // PSI 기반 4개 분석기 + non-PSI 2개 분석기 병렬 실행
    const [
      performance,
      accessibility,
      seo,
      security,
      bundle,
      mobile
    ] = await Promise.all([
      analyzePerformance(url, mobilePSI),
      analyzeAccessibility(url, mobilePSI),
      analyzeSEO(url),
      analyzeSecurity(url),
      analyzeBundle(url, mobilePSI),
      analyzeMobile(url, mobilePSI)
    ]);

    // Calculate overall score as average of all category scores
    const overallScore = Math.round(
      (performance.score + accessibility.score + seo.score + security.score + bundle.score + mobile.score) / 6
    );

    return {
      performance,
      accessibility,
      seo,
      security,
      bundle,
      mobile,
      overallScore
    };
  } catch (error) {
    console.error('Error running analysis:', error);
    // Return a fallback result with error information
    const makeErrorResult = (category: AnalyzerResult['category']): AnalyzerResult => ({
      category,
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: '분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류',
      }],
      meta: {},
    });

    return {
      performance: makeErrorResult('performance'),
      accessibility: makeErrorResult('a11y'),
      seo: makeErrorResult('seo'),
      security: makeErrorResult('security'),
      bundle: makeErrorResult('bundle'),
      mobile: makeErrorResult('mobile'),
      overallScore: 0,
    };
  }
}