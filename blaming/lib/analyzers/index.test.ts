import { runAnalysis } from './index';

// 각 분석기와 PSI fetcher를 모두 mock
vi.mock('./psi', () => ({
  fetchPSI: vi.fn(),
}));

vi.mock('./performance', () => ({
  analyzePerformance: vi.fn(),
}));

vi.mock('./accessibility', () => ({
  analyzeAccessibility: vi.fn(),
}));

vi.mock('./seo', () => ({
  analyzeSEO: vi.fn(),
}));

vi.mock('./security', () => ({
  analyzeSecurity: vi.fn(),
}));

vi.mock('./bundle', () => ({
  analyzeBundle: vi.fn(),
}));

vi.mock('./mobile', () => ({
  analyzeMobile: vi.fn(),
}));

import { fetchPSI } from './psi';
import { analyzePerformance } from './performance';
import { analyzeAccessibility } from './accessibility';
import { analyzeSEO } from './seo';
import { analyzeSecurity } from './security';
import { analyzeBundle } from './bundle';
import { analyzeMobile } from './mobile';
import type { AnalyzerResult } from './types';

// 테스트용 더미 AnalyzerResult 생성 헬퍼
function makeResult(
  category: AnalyzerResult['category'],
  score: number,
): AnalyzerResult {
  return {
    category,
    score,
    issues: [],
    meta: {},
  };
}

describe('runAnalysis 오케스트레이터', () => {
  const testUrl = 'https://example.com';
  const mockPsiData = {
    lighthouseResult: {
      categories: { performance: { score: 0.9 } },
      audits: {},
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.PSI_API_KEY = 'test-key';
    // 기본 mock 설정
    (fetchPSI as ReturnType<typeof vi.fn>).mockResolvedValue(mockPsiData);
    (analyzePerformance as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('performance', 90),
    );
    (analyzeAccessibility as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('a11y', 80),
    );
    (analyzeSEO as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('seo', 70),
    );
    (analyzeSecurity as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('security', 60),
    );
    (analyzeBundle as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('bundle', 85),
    );
    (analyzeMobile as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeResult('mobile', 75),
    );
  });

  afterEach(() => {
    delete process.env.PSI_API_KEY;
  });

  // ─── 정상 실행 ────────────────────────────────────────────────────────────────

  it('정상 실행 시 6개 카테고리 결과와 overallScore를 반환한다', async () => {
    const result = await runAnalysis(testUrl);

    expect(result.performance.category).toBe('performance');
    expect(result.accessibility.category).toBe('a11y');
    expect(result.seo.category).toBe('seo');
    expect(result.security.category).toBe('security');
    expect(result.bundle.category).toBe('bundle');
    expect(result.mobile.category).toBe('mobile');

    // overallScore = Math.round((90+80+70+60+85+75)/6) = Math.round(76.67) = 77
    expect(result.overallScore).toBe(77);
  });

  it('PSI API를 mobile strategy로 1회만 호출한다', async () => {
    await runAnalysis(testUrl);

    expect(fetchPSI).toHaveBeenCalledTimes(1);
    expect(fetchPSI).toHaveBeenCalledWith(testUrl, 'mobile', [
      'performance',
      'accessibility',
      'best-practices',
      'seo',
    ]);
  });

  it('PSI 결과를 4개 분석기에 전달한다', async () => {
    await runAnalysis(testUrl);

    expect(analyzePerformance).toHaveBeenCalledWith(testUrl, mockPsiData);
    expect(analyzeAccessibility).toHaveBeenCalledWith(testUrl, mockPsiData);
    expect(analyzeBundle).toHaveBeenCalledWith(testUrl, mockPsiData);
    expect(analyzeMobile).toHaveBeenCalledWith(testUrl, mockPsiData);
  });

  it('SEO와 security 분석기에는 PSI 결과를 전달하지 않는다', async () => {
    await runAnalysis(testUrl);

    expect(analyzeSEO).toHaveBeenCalledWith(testUrl);
    expect(analyzeSecurity).toHaveBeenCalledWith(testUrl);
  });

  it('overallScore는 6개 점수의 평균을 반올림한 값이다', async () => {
    // 모두 100점이면 100
    (analyzePerformance as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('performance', 100));
    (analyzeAccessibility as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('a11y', 100));
    (analyzeSEO as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('seo', 100));
    (analyzeSecurity as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('security', 100));
    (analyzeBundle as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('bundle', 100));
    (analyzeMobile as ReturnType<typeof vi.fn>).mockResolvedValue(makeResult('mobile', 100));

    const result = await runAnalysis(testUrl);
    expect(result.overallScore).toBe(100);
  });

  // ─── 에러 처리 ────────────────────────────────────────────────────────────────

  it('PSI 호출 실패 시 전체 6개 카테고리가 에러 결과로 폴백된다', async () => {
    (fetchPSI as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('PSI API down'),
    );

    const result = await runAnalysis(testUrl);

    expect(result.performance.score).toBe(0);
    expect(result.accessibility.score).toBe(0);
    expect(result.seo.score).toBe(0);
    expect(result.security.score).toBe(0);
    expect(result.bundle.score).toBe(0);
    expect(result.mobile.score).toBe(0);
    expect(result.overallScore).toBe(0);

    // 각 카테고리에 analysis-failed 이슈가 있어야 함
    expect(result.performance.issues[0]?.id).toBe('analysis-failed');
    expect(result.accessibility.issues[0]?.id).toBe('analysis-failed');
  });

  it('PSI 실패 에러 detail에 원본 에러 메시지가 포함된다', async () => {
    (fetchPSI as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Connection timeout'),
    );

    const result = await runAnalysis(testUrl);

    expect(result.performance.issues[0]?.detail).toBe('Connection timeout');
    expect(result.seo.issues[0]?.detail).toBe('Connection timeout');
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetchPSI as ReturnType<typeof vi.fn>).mockRejectedValue('string error');

    const result = await runAnalysis(testUrl);

    expect(result.overallScore).toBe(0);
    expect(result.performance.issues[0]?.detail).toBe('알 수 없는 오류');
  });

  it('모든 카테고리가 에러 폴백 시 올바른 category 값을 유지한다', async () => {
    (fetchPSI as ReturnType<typeof vi.fn>).mockRejectedValue(new Error('fail'));

    const result = await runAnalysis(testUrl);

    expect(result.performance.category).toBe('performance');
    expect(result.accessibility.category).toBe('a11y');
    expect(result.seo.category).toBe('seo');
    expect(result.security.category).toBe('security');
    expect(result.bundle.category).toBe('bundle');
    expect(result.mobile.category).toBe('mobile');
  });
});
