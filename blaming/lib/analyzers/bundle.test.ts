import { analyzeBundle } from './bundle';

describe('Bundle Analyzer', () => {
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
          'uses-optimized-images': {
            score: 0.96
          },
          'uses-text-compression': {
            score: 0.94
          },
          'unused-css-rules': {
            score: 0.92
          },
          'unused-js': {
            score: 0.93
          },
          'render-blocking-resources': {
            score: 0.95
          },
          'total-byte-weight': {
            score: 0.96
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeBundle(testUrl);

    // Check result structure
    expect(result).toHaveProperty('category', 'bundle');
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
    expect(result.meta.usesOptimizedImages).toBeCloseTo(0.96, 2);
    expect(result.meta.usesTextCompression).toBeCloseTo(0.94, 2);
  });

  it('should detect bundle issues and create appropriate warnings/errors', async () => {
    // Mock PSI API response with various issue severities
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.65
          }
        },
        audits: {
          'uses-optimized-images': {
            score: 0.95, // Good - no issue
            numericValue: 0.95
          },
          'uses-text-compression': {
            score: 0.65, // Warning (0.5 <= score < 0.9)
            numericValue: 0.65
          },
          'unused-css-rules': {
            score: 0.3, // Error (score < 0.5)
            numericValue: 30  // 30% unused CSS
          },
          'unused-js': {
            score: 0.7, // Warning
            numericValue: 25  // 25% unused JS
          },
          'render-blocking-resources': {
            score: 0.8, // Warning
            numericValue: 0.8
          },
          'total-byte-weight': {
            score: 0.7, // Warning
            numericValue: 2500  // 2.5KB
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeBundle(testUrl);

    // Debug: print what we actually got
    console.log('Bundle analysis result:', JSON.stringify(result, null, 2));
    
    // Should have 5 issues (all except uses-optimized-images which scored 0.95)
    // Actually we have: uses-text-compression, unused-css-rules, unused-js, render-blocking-resources, total-byte-weight = 5
    expect(result.issues).toHaveLength(5);
    
    // Check that we have the right mix of severities
    const errorCount = result.issues.filter(issue => issue.severity === 'error').length;
    const warningCount = result.issues.filter(issue => issue.severity === 'warning').length;
    
    // Should have 1 error (unused-css-rules) and 4 warnings 
    expect(errorCount).toBe(1);
    expect(warningCount).toBe(4);
    
    // Check specific issues
    const cssIssue = result.issues.find(issue => issue.id === 'unused-css-rules');
    expect(cssIssue).toBeDefined();
    expect(cssIssue?.severity).toBe('error');
    
    const compressionIssue = result.issues.find(issue => issue.id === 'uses-text-compression');
    expect(compressionIssue).toBeDefined();
    expect(compressionIssue?.severity).toBe('warning');
    
    // Overall score should be around 65
    expect(result.score).toBeGreaterThan(60);
    expect(result.score).toBeLessThan(70);
    
    // Check meta values
    expect(result.meta.unusedCssRules).toBeCloseTo(30, -1);
    expect(result.meta.unusedJs).toBeCloseTo(25, -1);
  });

  it('should detect large JavaScript bundles', async () => {
    // Mock PSI API response with large JS bundles
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.8
          }
        },
        audits: {
          'uses-optimized-images': {
            score: 0.9
          },
          'uses-text-compression': {
            score: 0.9
          },
          'unused-css-rules': {
            score: 0.9
          },
          'unused-js': {
            score: 0.9
          },
          'render-blocking-resources': {
            score: 0.9
          },
          'total-byte-weight': {
            score: 0.9
          },
          'uses-long-cache-ttl': {
            score: 0.8,
            details: {
              items: [
                { url: 'https://example.com/app.js', transferSize: 150 * 1024 }, // 150KB JS file
                { url: 'https://example.com/style.css', transferSize: 30 * 1024 }  // 30KB CSS file
              ]
            }
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeBundle(testUrl);

    // Should detect large JavaScript bundle
    const largeJsIssue = result.issues.find(issue => issue.id === 'large-javascript-bundles');
    expect(largeJsIssue).toBeDefined();
    expect(largeJsIssue?.severity).toBe('warning'); // 1 large JS file = warning
    
    // Should have meta data about large bundles
    expect(result.meta.largeJsCount).toBe(1);
    expect(result.meta.largeCssCount).toBe(0); // 30KB is under 50KB threshold
  });

  it('should detect large CSS bundles', async () => {
    // Mock PSI API response with large CSS bundles
    const mockResponse = {
      lighthouseResult: {
        categories: {
          performance: {
            score: 0.8
          }
        },
        audits: {
          'uses-optimized-images': {
            score: 0.9
          },
          'uses-text-compression': {
            score: 0.9
          },
          'unused-css-rules': {
            score: 0.9
          },
          'unused-js': {
            score: 0.9
          },
          'render-blocking-resources': {
            score: 0.9
          },
          'total-byte-weight': {
            score: 0.9
          },
          'uses-long-cache-ttl': {
            score: 0.8,
            details: {
              items: [
                { url: 'https://example.com/app.js', transferSize: 30 * 1024 }, // 30KB JS file
                { url: 'https://example.com/style.css', transferSize: 70 * 1024 }  // 70KB CSS file
              ]
            }
          }
        }
      }
    };

    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const result = await analyzeBundle(testUrl);

    // Should detect large CSS bundle
    const largeCssIssue = result.issues.find(issue => issue.id === 'large-css-bundles');
    expect(largeCssIssue).toBeDefined();
    expect(largeCssIssue?.severity).toBe('warning'); // 1 large CSS file = warning
    
    // Should have meta data about large bundles
    expect(result.meta.largeJsCount).toBe(0); // 30KB is under 100KB threshold
    expect(result.meta.largeCssCount).toBe(1); // 70KB is over 50KB threshold
  });

  it('should handle API errors gracefully', async () => {
    // Mock failed PSI API response
    (fetch as vi.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const result = await analyzeBundle(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('bundle');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
    expect(result.issues[0].message).toBe('번들 분석 중 오류가 발생했습니다.');
  });

  it('should handle missing PSI API key', async () => {
    // Temporarily remove the API key
    const originalKey = process.env.PSI_API_KEY;
    delete process.env.PSI_API_KEY;

    const result = await analyzeBundle(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('bundle');
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
          performance: { score: 0.72 },
        },
        audits: {
          'unused-css-rules': { score: 0.4, numericValue: 50 },
          'unused-js': { score: 0.88, numericValue: 20 },
          'total-byte-weight': { numericValue: 300000 },
          'uses-optimized-images': { score: 0.95 },
          'uses-text-compression': { score: 0.91 },
          'render-blocking-resources': { score: 0.93 },
        },
      },
    };

    const result = await analyzeBundle(testUrl, psiData);

    expect(fetch).not.toHaveBeenCalled();
    expect(result.category).toBe('bundle');
    expect(result.score).toBe(68);
    expect(result.meta.totalByteWeight).toBe(300000);
    expect(result.meta.unusedCssRules).toBe(50);
  });

  it('빈 PSI 응답이 와도 meta 값이 0으로 채워진다 (nullish fallback 브랜치)', async () => {
    // lighthouseResult 자체가 없는 케이스 — || 0 fallback 브랜치 커버
    const emptyPsiData = {};

    const result = await analyzeBundle(testUrl, emptyPsiData);

    expect(result.category).toBe('bundle');
    expect(result.score).toBe(0);
    expect(result.meta.totalByteWeight).toBe(0);
    expect(result.meta.unusedCssRules).toBe(0);
    expect(result.meta.unusedJs).toBe(0);
    expect(result.meta.largeJsCount).toBe(0);
    expect(result.meta.largeCssCount).toBe(0);
    expect(result.issues).toHaveLength(0);
  });

  it('JS 파일이 3개 이상 100KB 초과이면 large-javascript-bundles가 error 심각도를 반환한다', async () => {
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.5 },
        },
        audits: {
          'uses-long-cache-ttl': {
            score: 0.6,
            details: {
              items: [
                { url: 'https://example.com/a.js', transferSize: 200 * 1024 },
                { url: 'https://example.com/b.js', transferSize: 150 * 1024 },
                { url: 'https://example.com/c.js', transferSize: 120 * 1024 },
              ],
            },
          },
        },
      },
    };

    const result = await analyzeBundle(testUrl, psiData);

    const issue = result.issues.find((i) => i.id === 'large-javascript-bundles');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error'); // 3개 초과 → error
    expect(result.meta.largeJsCount).toBe(3);
  });

  it('CSS 파일이 2개 이상 50KB 초과이면 large-css-bundles가 error 심각도를 반환한다', async () => {
    const psiData = {
      lighthouseResult: {
        categories: {
          performance: { score: 0.6 },
        },
        audits: {
          'uses-long-cache-ttl': {
            score: 0.7,
            details: {
              items: [
                { url: 'https://example.com/a.css', transferSize: 80 * 1024 },
                { url: 'https://example.com/b.css', transferSize: 60 * 1024 },
              ],
            },
          },
        },
      },
    };

    const result = await analyzeBundle(testUrl, psiData);

    const issue = result.issues.find((i) => i.id === 'large-css-bundles');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error'); // 2개 초과 → error
    expect(result.meta.largeCssCount).toBe(2);
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetch as vi.Mock).mockRejectedValueOnce('string error');

    const result = await analyzeBundle(testUrl);

    expect(result.score).toBe(0);
    expect(result.issues[0].detail).toBe('알 수 없는 오류');
  });
});