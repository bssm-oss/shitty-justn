import { analyzeMobile } from './mobile';

describe('Mobile Analyzer', () => {
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
          },
          accessibility: {
            score: 0.94
          },
          'best-practices': {
            score: 0.93
          },
          seo: {
            score: 0.92
          }
        },
        audits: {
          'viewport': {
            score: 0.96
          },
          'font-size': {
            score: 0.95
          },
          'tap-targets': {
            score: 0.94
          },
          'image-aspect-ratio': {
            score: 0.96
          },
          'uses-responsive-images': {
            score: 0.95
          },
          'uses-http2': {
            score: 0.9
          },
          'redirects': {
            score: 0.98
          },
          'minify-css': {
            score: 0.97
          },
          'minify-javascript': {
            score: 0.96
          },
          'offline-start-url': {
            score: 0.93
          },
          'interactive': {
            numericValue: 2000  // 2 seconds - good
          },
          'cumulative-layout-shift': {
            numericValue: 0.08  // Good CLS
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeMobile(testUrl);

    // Check result structure
    expect(result).toHaveProperty('category', 'mobile');
    expect(typeof result.score).toBe('number');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Array.isArray(result.issues)).toBe(true);
    expect(typeof result.meta).toBe('object');

    // With good scores, we should have no issues (all scores >= 0.9)
    expect(result.issues).toHaveLength(0);
    
    // Score should be around the weighted average: 
    // (0.95*0.4 + 0.94*0.3 + 0.93*0.2 + 0.92*0.1)*100 = 93.7
    expect(result.score).toBeGreaterThan(90);
    expect(result.score).toBeLessThanOrEqual(100);
    
    // Check meta values
    expect(result.meta.performanceScore).toBe(95);
    expect(result.meta.accessibilityScore).toBe(94);
  });

  it('should detect mobile issues and create appropriate warnings/errors', async () => {
    // Mock PSI API response with various issue severities
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.65
          },
          accessibility: {
            score: 0.75
          },
          'best-practices': {
            score: 0.8
          },
          seo: {
            score: 0.85
          }
        },
        audits: {
          'viewport': {
            score: 0.65, // Warning
          },
          'font-size': {
            score: 0.9, // Warning (close to threshold)
          },
          'tap-targets': {
            score: 0.5, // Error
          },
          'image-aspect-ratio': {
            score: 0.9, // Warning
          },
          'uses-responsive-images': {
            score: 0.7, // Warning
          },
          'uses-http2': {
            score: 0.4, // Error
          },
          'redirects': {
            score: 0.9, // Warning
          },
          'minify-css': {
            score: 0.8, // Warning
          },
          'minify-javascript': {
            score: 0.7, // Warning
          },
          'offline-start-url': {
            score: 0.6, // Warning
          },
          'interactive': {
            numericValue: 8000  // 8 seconds - poor
          },
          'cumulative-layout-shift': {
            numericValue: 0.3  // Poor CLS
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeMobile(testUrl);

    // Debug: print what we actually got
    console.log('Mobile analysis result:', JSON.stringify(result, null, 2));
    
    // Should have several issues - let's count what we expect:
    // viewport(0.65:w), font-size(0.9:w), tap-targets(0.5:e), image-aspect-ratio(0.9:w),
    // uses-responsive-images(0.7:w), uses-http2(0.4:e), redirects(0.9:w),
    // minify-css(0.8:w), minify-javascript(0.7:w), offline-start-url(0.6:w),
    // slow-mobile-interactive(8000ms:e), poor-mobile-cls(0.3:w)
    // That's 12 total issues: 4 errors, 8 warnings
    expect(result.issues.length).toBeGreaterThan(5);
    
    // Check that we have the right mix of severities
    const errorCount = result.issues.filter(issue => issue.severity === 'error').length;
    const warningCount = result.issues.filter(issue => issue.severity === 'warning').length;
    
    // Should have multiple errors and warnings
    expect(errorCount).toBeGreaterThan(0);
    expect(warningCount).toBeGreaterThan(0);
    
    // Check specific issues
    const viewportIssue = result.issues.find(issue => issue.id === 'viewport');
    expect(viewportIssue).toBeDefined();
    expect(viewportIssue?.severity).toBe('warning');
    
    const tapTargetsIssue = result.issues.find(issue => issue.id === 'tap-targets');
    expect(tapTargetsIssue).toBeDefined();
    expect(tapTargetsIssue?.severity).toBe('error');
    
    const http2Issue = result.issues.find(issue => issue.id === 'uses-http2');
    expect(http2Issue).toBeDefined();
    expect(http2Issue?.severity).toBe('error');
    
    // Overall score should be in the 60-75 range based on our inputs
    expect(result.score).toBeGreaterThan(60);
    expect(result.score).toBeLessThan(80);
    
    // Check meta values
    expect(result.meta.performanceScore).toBe(65);
    expect(result.meta.accessibilityScore).toBe(75);
    expect(result.meta.interactive).toBe(8000);
    expect(result.meta.cumulativeLayoutShift).toBeCloseTo(0.3, 2);
  });

  it('should detect slow interactive time on mobile', async () => {
    // Mock PSI API response with slow interactive time
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.8
          },
          accessibility: {
            score: 0.8
          },
          'best-practices': {
            score: 0.8
          },
          seo: {
            score: 0.8
          }
        },
        audits: {
          'viewport': {
            score: 0.9
          },
          'font-size': {
            score: 0.9
          },
          'tap-targets': {
            score: 0.9
          },
          'image-aspect-ratio': {
            score: 0.9
          },
          'uses-responsive-images': {
            score: 0.9
          },
          'uses-http2': {
            score: 0.9
          },
          'redirects': {
            score: 0.9
          },
          'minify-css': {
            score: 0.9
          },
          'minify-javascript': {
            score: 0.9
          },
          'offline-start-url': {
            score: 0.9
          },
          'interactive': {
            numericValue: 12000  // 12 seconds - very poor
          },
          'cumulative-layout-shift': {
            numericValue: 0.1
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeMobile(testUrl);

    // Should detect slow interactive time
    const slowInteractiveIssue = result.issues.find(issue => issue.id === 'slow-mobile-interactive');
    expect(slowInteractiveIssue).toBeDefined();
    expect(slowInteractiveIssue?.severity).toBe('error'); // >10s should be error
    
    // Score should be reduced due to slow interactive time
    expect(result.score).toBeLessThan(80);
  });

  it('should detect poor CLS on mobile', async () => {
    // Mock PSI API response with poor CLS
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.8
          },
          accessibility: {
            score: 0.8
          },
          'best-practices': {
            score: 0.8
          },
          seo: {
            score: 0.8
          }
        },
        audits: {
          'viewport': {
            score: 0.9
          },
          'font-size': {
            score: 0.9
          },
          'tap-targets': {
            score: 0.9
          },
          'image-aspect-ratio': {
            score: 0.9
          },
          'uses-responsive-images': {
            score: 0.9
          },
          'uses-http2': {
            score: 0.9
          },
          'redirects': {
            score: 0.9
          },
          'minify-css': {
            score: 0.9
          },
          'minify-javascript': {
            score: 0.9
          },
          'offline-start-url': {
            score: 0.9
          },
          'interactive': {
            numericValue: 3000  // 3 seconds - OK
          },
          'cumulative-layout-shift': {
            numericValue: 0.4  // Poor CLS (>0.25)
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeMobile(testUrl);

    // Should detect poor CLS
    const poorClsIssue = result.issues.find(issue => issue.id === 'poor-mobile-cls');
    expect(poorClsIssue).toBeDefined();
    expect(poorClsIssue?.severity).toBe('warning'); // 0.4 is warning, >0.5 would be error
    
    // Score should be reduced due to poor CLS
    expect(result.score).toBeLessThan(80);
  });

  it('should handle API errors gracefully', async () => {
    // Mock failed PSI API response
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await analyzeMobile(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('mobile');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
    expect(result.issues[0].message).toBe('모바일 분석 중 오류가 발생했습니다.');
  });

  it('should handle missing PSI API key', async () => {
    // Temporarily remove the API key
    const originalKey = process.env.PSI_API_KEY;
    delete process.env.PSI_API_KEY;

    const result = await analyzeMobile(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('mobile');
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
          performance: { score: 0.8 },
          accessibility: { score: 0.9 },
          'best-practices': { score: 0.85 },
          seo: { score: 0.88 },
        },
        audits: {
          'first-contentful-paint': { numericValue: 1500 },
          'largest-contentful-paint': { numericValue: 2500 },
          'cumulative-layout-shift': { numericValue: 0.05 },
          'interactive': { numericValue: 3000 },
          'speed-index': { numericValue: 2000 },
        },
      },
    };

    const result = await analyzeMobile(testUrl, psiData);

    expect(fetch).not.toHaveBeenCalled();
    expect(result.category).toBe('mobile');
    // 가중 평균: (0.8*0.4 + 0.9*0.3 + 0.85*0.2 + 0.88*0.1)*100 = 85
    expect(result.score).toBe(85);
    expect(result.meta.performanceScore).toBe(80);
    expect(result.meta.accessibilityScore).toBe(90);
  });

  it('빈 PSI 응답이 와도 meta 값이 0으로 채워진다 (nullish fallback 브랜치)', async () => {
    // lighthouseResult 자체가 없는 케이스 — || 0 fallback 브랜치 커버
    const emptyPsiData = {};

    const result = await analyzeMobile(testUrl, emptyPsiData);

    expect(result.category).toBe('mobile');
    expect(result.score).toBe(0);
    expect(result.meta.performanceScore).toBe(0);
    expect(result.meta.accessibilityScore).toBe(0);
    expect(result.meta.firstContentfulPaint).toBe(0);
    expect(result.meta.largestContentfulPaint).toBe(0);
    expect(result.meta.cumulativeLayoutShift).toBe(0);
    expect(result.issues).toHaveLength(0);
  });

  it('interactive가 정확히 5000ms이면 slow-mobile-interactive를 보고하지 않는다', async () => {
    // 경계값 테스트: > 5000 이어야 이슈가 생기므로 5000은 통과
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.8 },
          accessibility: { score: 0.8 },
          'best-practices': { score: 0.8 },
          seo: { score: 0.8 },
        },
        audits: {
          'interactive': { numericValue: 5000 },
          'cumulative-layout-shift': { numericValue: 0.1 },
        },
      },
    };

    const result = await analyzeMobile(testUrl, psiData);

    const issue = result.issues.find((i) => i.id === 'slow-mobile-interactive');
    expect(issue).toBeUndefined();
  });

  it('CLS가 정확히 0.25이면 poor-mobile-cls를 보고하지 않는다', async () => {
    // 경계값 테스트: > 0.25 이어야 이슈가 생기므로 0.25는 통과
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.8 },
          accessibility: { score: 0.8 },
          'best-practices': { score: 0.8 },
          seo: { score: 0.8 },
        },
        audits: {
          'interactive': { numericValue: 3000 },
          'cumulative-layout-shift': { numericValue: 0.25 },
        },
      },
    };

    const result = await analyzeMobile(testUrl, psiData);

    const issue = result.issues.find((i) => i.id === 'poor-mobile-cls');
    expect(issue).toBeUndefined();
  });

  it('CLS가 0.5 초과이면 poor-mobile-cls가 error 심각도를 반환한다', async () => {
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.6 },
          accessibility: { score: 0.6 },
          'best-practices': { score: 0.6 },
          seo: { score: 0.6 },
        },
        audits: {
          'interactive': { numericValue: 3000 },
          'cumulative-layout-shift': { numericValue: 0.6 },
        },
      },
    };

    const result = await analyzeMobile(testUrl, psiData);

    const issue = result.issues.find((i) => i.id === 'poor-mobile-cls');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error'); // > 0.5 → error
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce('string error');

    const result = await analyzeMobile(testUrl);

    expect(result.score).toBe(0);
    expect(result.issues[0].detail).toBe('알 수 없는 오류');
  });
});