import { analyzeAccessibility } from './accessibility';

describe('Accessibility Analyzer', () => {
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
          accessibility: {
            score: 0.95
          }
        },
        audits: {
          'color-contrast': {
            score: 0.96
          },
          'image-alt': {
            score: 0.94
          },
          'aria-allowed-attr': {
            score: 0.92
          },
          'button-name': {
            score: 0.96
          },
          'label': {
            score: 0.93
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeAccessibility(testUrl);

    // Check result structure
    expect(result).toHaveProperty('category', 'a11y');
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
    expect(result.meta['color-contrast']).toBeCloseTo(0.96, 2);
    expect(result.meta['image-alt']).toBeCloseTo(0.94, 2);
  });

  it('should detect accessibility issues and create appropriate warnings/errors', async () => {
    // Mock PSI API response with various issue severities
    const mockResponse = {
      lighthouseResult: {
        categories: {
          accessibility: {
            score: 0.65
          }
        },
        audits: {
          'color-contrast': {
            score: 0.95, // Good - no issue
          },
          'image-alt': {
            score: 0.65, // Warning (0.5 <= score < 0.9)
          },
          'aria-allowed-attr': {
            score: 0.3, // Error (score < 0.5)
          },
          'button-name': {
            score: 0.8, // Warning
          },
          'label': {
            score: 0.7, // Warning
          },
          'heading-order': {
            score: 0.4, // Error
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeAccessibility(testUrl);

    // Should have 5 issues (all except color-contrast which scored 0.95)
    expect(result.issues).toHaveLength(5);
    
    // Check that we have the right mix of severities
    const errorCount = result.issues.filter(issue => issue.severity === 'error').length;
    const warningCount = result.issues.filter(issue => issue.severity === 'warning').length;
    
    // Should have 2 errors (aria-allowed-attr, heading-order) and 3 warnings (image-alt, button-name, label)
    // Actually: image-alt(0.65:w), button-name(0.8:w), label(0.7:w) = 3 warnings
    // aria-allowed-attr(0.3:e), heading-order(0.4:e) = 2 errors
    expect(errorCount).toBe(2);
    expect(warningCount).toBe(3);
    
    // Check specific issues
    const ariaIssue = result.issues.find(issue => issue.id === 'aria-allowed-attr');
    expect(ariaIssue).toBeDefined();
    expect(ariaIssue?.severity).toBe('error');
    
    const altIssue = result.issues.find(issue => issue.id === 'image-alt');
    expect(altIssue).toBeDefined();
    expect(altIssue?.severity).toBe('warning');
    
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

    const result = await analyzeAccessibility(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('a11y');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
    expect(result.issues[0].message).toBe('접근성 분석 중 오류가 발생했습니다.');
  });

  it('should handle missing PSI API key', async () => {
    // Temporarily remove the API key
    const originalKey = process.env.PSI_API_KEY;
    delete process.env.PSI_API_KEY;

    const result = await analyzeAccessibility(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('a11y');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');

    // Restore the API key
    process.env.PSI_API_KEY = originalKey;
  });

  it('psiData를 직접 전달하면 fetch를 호출하지 않는다', async () => {
    // psiData?? 브랜치 — fetchPSI 경유 없이 주입된 데이터를 사용
    const psiData = {
      lighthouseResult: {
        categories: {
          accessibility: { score: 0.82 },
        },
        audits: {
          'color-contrast': { score: 0.6 },
          'image-alt': { score: 0.45 },
          'aria-allowed-attr': { score: 0.95 },
        },
      },
    };

    const result = await analyzeAccessibility(testUrl, psiData);

    expect(fetch).not.toHaveBeenCalled();
    expect(result.category).toBe('a11y');
    expect(result.score).toBe(82);
    // color-contrast(0.6: warning), image-alt(0.45: error) = 2개 이슈
    expect(result.issues).toHaveLength(2);
    expect(result.meta['color-contrast']).toBeCloseTo(0.6, 2);
    expect(result.meta['image-alt']).toBeCloseTo(0.45, 2);
  });

  it('빈 PSI 응답이 와도 meta 값이 0으로 채워진다 (nullish fallback 브랜치)', async () => {
    // lighthouseResult 자체가 없는 케이스 — || 0 fallback 브랜치 커버
    const emptyPsiData = {};

    const result = await analyzeAccessibility(testUrl, emptyPsiData);

    expect(result.category).toBe('a11y');
    expect(result.score).toBe(0);
    expect(result.meta['aria-allowed-attr']).toBe(0);
    expect(result.meta['color-contrast']).toBe(0);
    expect(result.meta['image-alt']).toBe(0);
    expect(result.issues).toHaveLength(0);
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce('string error');

    const result = await analyzeAccessibility(testUrl);

    expect(result.score).toBe(0);
    expect(result.issues[0].detail).toBe('알 수 없는 오류');
  });
});