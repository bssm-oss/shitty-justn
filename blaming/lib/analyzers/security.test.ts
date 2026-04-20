import { analyzeSecurity } from './security';

describe('Security Analyzer', () => {
  const testUrl = 'https://example.com';

  beforeEach(() => {
    // Mock fetch for webpage content and headers
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return a valid AnalyzerResult object with good scores', async () => {
    // Mock successful webpage response with good security headers
    const mockResponse = new Response('', {
      status: 200,
      headers: {
        'strict-transport-security': 'max-age=31536000; includeSubDomains; preload',
        'content-security-policy': "default-src 'self'",
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'geolocation=(self)',
        'x-xss-protection': '1; mode=block'
      }
    });

    (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

    const result = await analyzeSecurity(testUrl);

    // Check result structure
    expect(result).toHaveProperty('category', 'security');
    expect(typeof result.score).toBe('number');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Array.isArray(result.issues)).toBe(true);
    expect(typeof result.meta).toBe('object');

    // With good security headers, we should have few or no issues
    // Note: Our test might still have some issues based on our implementation
    expect(result.score).toBeGreaterThan(70); // Should be reasonably high with good headers
  });

  it('should detect security issues and create appropriate warnings/errors', async () => {
    // Mock webpage response missing several security headers
    const mockResponse = new Response('', {
      status: 200,
      headers: {
        // Missing most security headers
        'content-type': 'text/html'
      }
    });

    (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

    const result = await analyzeSecurity(testUrl);

    // Should detect missing security headers as issues
    expect(result.issues.length).toBeGreaterThan(3); // Should have several issues
    
    // Check that we have error-level issues for critical missing headers
    const errorIssues = result.issues.filter(issue => issue.severity === 'error');
    expect(errorIssues.length).toBeGreaterThan(1); // Should have at least HSTS and CSP errors
    
    // Check for specific critical issues
    const hstsIssue = result.issues.find(issue => issue.id === 'strict-transport-security');
    expect(hstsIssue).toBeDefined();
    expect(hstsIssue?.severity).toBe('error');
    
    const cspIssue = result.issues.find(issue => issue.id === 'content-security-policy');
    expect(cspIssue).toBeDefined();
    expect(cspIssue?.severity).toBe('error');
    
    // Overall score should be low due to missing headers
    expect(result.score).toBeLessThan(50);
  });

  it('should detect exposed paths', async () => {
    // Mock responses: main page returns 200, but .env returns 200 (exposed)
    const mockResponses = [
      new Response('<!DOCTYPE html><html><body>Hello World</body></html>', {
        status: 200,
        headers: {
          'content-type': 'text/html'
        }
      }), // Main page
      new Response('DB_PASSWORD=secret', { // .env file
        status: 200,
        headers: {
          'content-type': 'text/plain'
        }
      })
    ];

    // Mock fetch to return different responses based on URL
    (fetch as vi.Mock).mockImplementationOnce(() => Promise.resolve(mockResponses[0])) // Main page
                        .mockImplementationOnce(() => Promise.resolve(mockResponses[1])) // .env
                        .mockResolvedValueOnce(new Response('', { status: 404 })); // Other paths

    const result = await analyzeSecurity(testUrl);

    // Should detect exposed .env file
    const exposedIssue = result.issues.find(issue => issue.id === 'exposed-paths');
    expect(exposedIssue).toBeDefined();
    expect(exposedIssue?.severity).toBe('warning'); // Should be warning for 1 exposed path
    
    // Score should be reduced due to exposed paths
    expect(result.score).toBeLessThan(100);
  });

  it('should detect lack of HTTPS', async () => {
    // Test with HTTP URL
    const httpUrl = 'http://example.com';
    
    const mockResponse = new Response('<!DOCTYPE html><html><body>Hello World</body></html>', {
      status: 200,
      headers: {
        'content-type': 'text/html'
      }
    });

    (fetch as vi.Mock).mockResolvedValueOnce(mockResponse);

    const result = await analyzeSecurity(httpUrl);

    // Should detect lack of HTTPS
    const httpsIssue = result.issues.find(issue => issue.id === 'no-https');
    expect(httpsIssue).toBeDefined();
    expect(httpsIssue?.severity).toBe('error');
    
    // Score should be significantly reduced
    expect(result.score).toBeLessThan(80);
  });

  it('should handle fetch errors gracefully', async () => {
    // Mock failed fetch
    (fetch as vi.Mock).mockRejectedValueOnce(new Error('Network error'));

    const result = await analyzeSecurity(testUrl);

    // Should return a fallback result
    expect(result.category).toBe('security');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
    expect(result.issues[0].message).toBe('보안 분석 중 오류가 발생했습니다.');
  });
});