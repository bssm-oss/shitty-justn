import { analyzePerformance } from './performance';

describe('Performance Analyzer', () => {
  const testUrl = 'https://example.com';

  beforeEach(() => {
    // Mock fetch for PSI API
    global.fetch = vi.fn();
    // Set up environment variable for API key
    process.env.PSI_API_KEY = 'test-key';
  });

  afterEach(() => {
    vi.resetAllMocks();
    // Clean up environment variable
    delete process.env.PSI_API_KEY;
  });

  it('should return a valid AnalyzerResult object with good scores', async () => {
    // Mock successful PSI API response with good scores
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.95
          }
        },
        audits: {
          'first-contentful-paint': {
            score: 0.96,
            numericValue: 800
          },
          'largest-contentful-paint': {
            score: 0.94,
            numericValue: 1200
          },
          'total-blocking-time': {
            score: 0.92,
            numericValue: 100
          },
          'cumulative-layout-shift': {
            score: 0.96,
            numericValue: 0.08
          },
          'speed-index': {
            score: 0.93,
            numericValue: 1100
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzePerformance(testUrl);

    // Check result structure
    expect(result).toHaveProperty('category', 'performance');
    expect(typeof result.score).toBe('number');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Array.isArray(result.issues)).toBe(true);
    expect(typeof result.meta).toBe('object');

    // With good scores, we should have no issues (all scores >= 0.9)
    expect(result.issues).toHaveLength(0);
    
    // Score should be around 95
    expect(result.score).toBeGreaterThan(90);
    expect(result.score).toBeLessThanOrEqual(100);
    
    // Check meta values
    expect(result.meta.firstContentfulPaint).toBeCloseTo(800, -1);
    expect(result.meta.largestContentfulPaint).toBeCloseTo(1200, -1);
  });

  it('should detect performance issues and create appropriate warnings/errors', async () => {
    // Mock PSI API response with various issue severities
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.65
          }
        },
        audits: {
          'first-contentful-paint': {
            score: 0.95, // Good - no issue
            numericValue: 1000
          },
          'largest-contentful-paint': {
            score: 0.65, // Warning (0.5 <= score < 0.9)
            numericValue: 3500
          },
          'total-blocking-time': {
            score: 0.3, // Error (score < 0.5)
            numericValue: 400
          },
          'cumulative-layout-shift': {
            score: 0.8, // Warning
            numericValue: 0.25
          },
          'speed-index': {
            score: 0.7, // Warning
            numericValue: 3200
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzePerformance(testUrl);

    // Should have 4 issues (all except FCP which scored 0.95)
    expect(result.issues).toHaveLength(4);
    
    // Check that we have the right mix of severities
    const errorCount = result.issues.filter(issue => issue.severity === 'error').length;
    const warningCount = result.issues.filter(issue => issue.severity === 'warning').length;
    
    // Should have 1 error (TBT) and 3 warnings (LCP, CLS, SI)
    expect(errorCount).toBe(1);
    expect(warningCount).toBe(3);
    
    // Check specific issues
    const tbtIssue = result.issues.find(issue => issue.id === 'total-blocking-time');
    expect(tbtIssue).toBeDefined();
    expect(tbtIssue?.severity).toBe('error');
    
    const lcpIssue = result.issues.find(issue => issue.id === 'largest-contentful-paint');
    expect(lcpIssue).toBeDefined();
    expect(lcpIssue?.severity).toBe('warning');
    
    // Overall score should be around 65
    expect(result.score).toBeGreaterThan(60);
    expect(result.score).toBeLessThan(70);
  });

  it('should handle API errors gracefully', async () => {
    // Mock failed PSI API response
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await analyzePerformance(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('performance');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
    expect(result.issues[0].message).toBe('성능 분석 중 오류가 발생했습니다.');
  });

  it('should handle missing PSI API key', async () => {
    // Temporarily remove the API key
    const originalKey = process.env.PSI_API_KEY;
    delete process.env.PSI_API_KEY;

    const result = await analyzePerformance(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('performance');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');

    // Restore the API key
    process.env.PSI_API_KEY = originalKey;
  });

  it('should handle network errors gracefully', async () => {
    // Mock network error
    (fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await analyzePerformance(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('performance');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
  });

  it('psiData를 직접 전달하면 fetch를 호출하지 않는다', async () => {
    // psiData?? 브랜치 — fetchPSI 경유 없이 주입된 데이터를 사용
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.88 },
        },
        audits: {
          'largest-contentful-paint': {
            score: 0.75,
            numericValue: 2800,
          },
        },
      },
    };

    const result = await analyzePerformance(testUrl, psiData);

    expect(fetch).not.toHaveBeenCalled();
    expect(result.category).toBe('performance');
    expect(result.score).toBe(88);
    expect(result.meta.largestContentfulPaint).toBe(2800);
  });

  it('빈 PSI 응답이 와도 meta 값이 0으로 채워진다 (nullish fallback 브랜치)', async () => {
    // lighthouseResult 자체가 없는 케이스 — || 0 fallback 브랜치 커버
    const emptyPsiData = {};

    const result = await analyzePerformance(testUrl, emptyPsiData);

    expect(result.category).toBe('performance');
    expect(result.score).toBe(0);
    expect(result.meta.firstContentfulPaint).toBe(0);
    expect(result.meta.largestContentfulPaint).toBe(0);
    expect(result.meta.totalBlockingTime).toBe(0);
    expect(result.meta.cumulativeLayoutShift).toBe(0);
    expect(result.meta.speedIndex).toBe(0);
    expect(result.issues).toHaveLength(0);
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce('string error');

    const result = await analyzePerformance(testUrl);

    expect(result.score).toBe(0);
    expect(result.issues[0].detail).toBe('알 수 없는 오류');
  });
});