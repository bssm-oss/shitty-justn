import { analyzeSEO } from './seo';

// 완전한 SEO가 갖춰진 HTML 템플릿 — 여기서 항목을 빼가며 부족한 케이스 테스트
const GOOD_SEO_HTML = `
  <html>
    <head>
      <title>This is a good title length for SEO purposes</title>
      <meta name="description" content="This is a good meta description that is long enough for SEO but not too long to be truncated in search results.">
      <meta property="og:title" content="OG Title">
      <meta property="og:description" content="OG Description">
      <meta property="og:image" content="https://example.com/image.jpg">
      <link rel="canonical" href="https://example.com/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta charset="UTF-8">
      <script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage"}</script>
    </head>
    <body>
      <h1>Main Heading</h1>
      <p>Some content</p>
      <a href="/link1">Link Text</a>
      <a href="/link2" aria-label="Another Link">ARIA Link</a>
    </body>
  </html>
`;

describe('SEO Analyzer', () => {
  const testUrl = 'https://example.com';

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // ─── 기본 구조 ──────────────────────────────────────────────────────────────

  it('완전한 SEO를 갖춘 페이지는 높은 점수를 반환한다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(GOOD_SEO_HTML),
    });

    const result = await analyzeSEO(testUrl);

    expect(result).toHaveProperty('category', 'seo');
    expect(typeof result.score).toBe('number');
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
    expect(Array.isArray(result.issues)).toBe(true);
    expect(typeof result.meta).toBe('object');
    expect(result.score).toBeGreaterThan(90);
  });

  it('meta 값이 정확히 채워진다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(GOOD_SEO_HTML),
    });

    const result = await analyzeSEO(testUrl);

    expect(result.meta.hasOgTitle).toBe(true);
    expect(result.meta.hasOgDescription).toBe(true);
    expect(result.meta.hasOgImage).toBe(true);
    expect(result.meta.hasCanonical).toBe(true);
    expect(result.meta.hasViewport).toBe(true);
    expect(result.meta.hasCharset).toBe(true);
    expect(result.meta.structuredDataCount).toBe(1);
    expect(result.meta.h1Count).toBe(1);
  });

  // ─── title 태그 ─────────────────────────────────────────────────────────────

  it('title 태그가 없으면 title-tag 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(/<title>.*?<\/title>/, '');
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'title-tag');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
  });

  it('title이 10자 미만이면 title-tag 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<title>.*?<\/title>/,
      '<title>짧은제목</title>',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'title-tag');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
  });

  it('title이 60자를 초과하면 title-tag-long 경고를 보고한다', async () => {
    const longTitle = 'A'.repeat(61);
    const html = GOOD_SEO_HTML.replace(
      /<title>.*?<\/title>/,
      `<title>${longTitle}</title>`,
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'title-tag-long');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  // ─── meta description ───────────────────────────────────────────────────────

  it('meta description이 없으면 meta-description 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta name="description".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'meta-description');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
  });

  it('meta description이 160자를 초과하면 meta-description-long 경고를 보고한다', async () => {
    const longDesc = 'A'.repeat(161);
    const html = GOOD_SEO_HTML.replace(
      /<meta name="description".*?>/,
      `<meta name="description" content="${longDesc}">`,
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'meta-description-long');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  // ─── OG 태그 ────────────────────────────────────────────────────────────────

  it('og:title이 없으면 og-title 경고를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta property="og:title".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'og-title');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(result.meta.hasOgTitle).toBe(false);
  });

  it('og:description이 없으면 og-description 경고를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta property="og:description".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'og-description');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
  });

  it('og:image가 없으면 og-image 경고를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta property="og:image".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'og-image');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(result.meta.hasOgImage).toBe(false);
  });

  // ─── canonical ──────────────────────────────────────────────────────────────

  it('canonical이 없으면 canonical-url 경고를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<link rel="canonical".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'canonical-url');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(result.meta.hasCanonical).toBe(false);
  });

  // ─── viewport ───────────────────────────────────────────────────────────────

  it('viewport 메타 태그가 없으면 viewport 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta name="viewport".*?>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'viewport');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(result.meta.hasViewport).toBe(false);
  });

  // ─── charset ────────────────────────────────────────────────────────────────

  it('charset 선언이 없으면 charset 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(/<meta charset="UTF-8">/, '');
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'charset');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(result.meta.hasCharset).toBe(false);
  });

  it('http-equiv Content-Type으로도 charset 체크를 통과한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<meta charset="UTF-8">/,
      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'charset');
    expect(issue).toBeUndefined();
    expect(result.meta.hasCharset).toBe(true);
  });

  // ─── h1 태그 ────────────────────────────────────────────────────────────────

  it('h1 태그가 없으면 h1-tag 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace('<h1>Main Heading</h1>', '');
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'h1-tag');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(result.meta.h1Count).toBe(0);
  });

  it('h1 태그가 2개 이상이면 h1-tag 오류를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      '<h1>Main Heading</h1>',
      '<h1>First H1</h1><h1>Second H1</h1>',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'h1-tag');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('error');
    expect(result.meta.h1Count).toBe(2);
  });

  // ─── 구조화된 데이터 ─────────────────────────────────────────────────────────

  it('structured data가 없으면 structured-data info를 보고한다', async () => {
    const html = GOOD_SEO_HTML.replace(
      /<script type="application\/ld\+json">.*?<\/script>/,
      '',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'structured-data');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('info');
    expect(result.meta.structuredDataCount).toBe(0);
  });

  it('structured data가 있으면 structured-data 이슈를 보고하지 않는다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(GOOD_SEO_HTML),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'structured-data');
    expect(issue).toBeUndefined();
    expect(result.meta.structuredDataCount).toBe(1);
  });

  // ─── 설명 없는 링크 ──────────────────────────────────────────────────────────

  it('텍스트와 aria-label이 없는 링크를 감지하고 점수를 차감한다', async () => {
    // <a href="/empty"></a> — 텍스트 없고 aria-label도 없음
    const html = GOOD_SEO_HTML.replace(
      '<a href="/link1">Link Text</a>',
      '<a href="/empty1"></a><a href="/empty2"></a>',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'nondescriptive-links');
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe('warning');
    expect(result.meta.nondescriptiveLinks).toBe(2);
    // 점수가 차감되어 있어야 함
    expect(result.score).toBeLessThan(100);
  });

  it('nondescriptive-links detail에 개수가 포함된다', async () => {
    const html = GOOD_SEO_HTML.replace(
      '<a href="/link1">Link Text</a>',
      '<a href="/no-text"></a>',
    );
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(html),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'nondescriptive-links');
    expect(issue).toBeDefined();
    expect(issue?.detail).toContain('1개');
  });

  it('모든 링크에 텍스트가 있으면 nondescriptive-links 이슈를 보고하지 않는다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(GOOD_SEO_HTML),
    });

    const result = await analyzeSEO(testUrl);

    const issue = result.issues.find((i) => i.id === 'nondescriptive-links');
    expect(issue).toBeUndefined();
    expect(result.meta.nondescriptiveLinks).toBe(0);
  });

  // ─── 에러 처리 ───────────────────────────────────────────────────────────────

  it('fetch가 404를 반환하면 analysis-failed를 보고한다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await analyzeSEO(testUrl);

    expect(result.category).toBe('seo');
    expect(result.score).toBe(0);
    expect(result.issues).toHaveLength(1);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0]).toHaveProperty('severity', 'error');
  });

  it('fetch가 네트워크 에러를 던지면 analysis-failed를 보고한다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('Network error'),
    );

    const result = await analyzeSEO(testUrl);

    expect(result.category).toBe('seo');
    expect(result.score).toBe(0);
    expect(result.issues[0]).toHaveProperty('id', 'analysis-failed');
    expect(result.issues[0].detail).toBe('Network error');
  });

  it('Error가 아닌 값이 throw되면 알 수 없는 오류 detail을 반환한다', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce('string error');

    const result = await analyzeSEO(testUrl);

    expect(result.score).toBe(0);
    expect(result.issues[0].detail).toBe('알 수 없는 오류');
  });
});