import { AnalyzerResult, Issue } from './types';
import { load } from 'cheerio';
import { seoMessages } from '../messages/seo';

interface SEOCheck {
  id: string;
  check: () => boolean;
  severity: 'info' | 'warning' | 'error';
}

export async function analyzeSEO(url: string): Promise<AnalyzerResult> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'blaming/1.0 (SEO Analyzer)',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = load(html);

    let score = 100;
    const issues: Issue[] = [];

    const seoChecks: SEOCheck[] = [
      {
        id: 'title-tag',
        check: () => {
          const title = $('title').text().trim();
          return !title || title.length < 30;
        },
        severity: 'error',
      },
      {
        id: 'title-tag-long',
        check: () => $('title').text().trim().length > 60,
        severity: 'warning',
      },
      {
        id: 'meta-description',
        check: () => {
          const metaDesc = $('meta[name="description"]').attr('content')?.trim() || '';
          return !metaDesc || metaDesc.length < 50;
        },
        severity: 'error',
      },
      {
        id: 'meta-description-long',
        check: () => {
          const metaDesc = $('meta[name="description"]').attr('content')?.trim() || '';
          return metaDesc.length > 160;
        },
        severity: 'warning',
      },
      {
        id: 'h1-tag',
        check: () => {
          const h1Count = $('h1').length;
          return h1Count === 0 || h1Count > 1;
        },
        severity: 'error',
      },
      {
        id: 'og-title',
        check: () => !$('meta[property="og:title"]').attr('content'),
        severity: 'warning',
      },
      {
        id: 'og-description',
        check: () => !$('meta[property="og:description"]').attr('content'),
        severity: 'warning',
      },
      {
        id: 'og-image',
        check: () => !$('meta[property="og:image"]').attr('content'),
        severity: 'warning',
      },
      {
        id: 'canonical-url',
        check: () => !$('link[rel="canonical"]').attr('href'),
        severity: 'warning',
      },
      {
        id: 'viewport',
        check: () => !$('meta[name="viewport"]').attr('content'),
        severity: 'error',
      },
      {
        id: 'charset',
        check: () => !$('meta[charset]').attr('charset') && !$('meta[http-equiv="Content-Type"]').attr('content'),
        severity: 'error',
      },
    ];

    for (const check of seoChecks) {
      if (check.check()) {
        const pointsToDeduct = check.severity === 'error' ? 15 : check.severity === 'warning' ? 10 : 5;
        score = Math.max(0, score - pointsToDeduct);

        const msg = seoMessages[check.id];
        issues.push({
          id: check.id,
          severity: check.severity,
          message: msg?.title ?? check.id,
          detail: msg ? `${msg.description} ${msg.fix}` : undefined,
        });
      }
    }

    // 구조화된 데이터 체크
    const jsonLdScripts = $('script[type="application/ld+json"]');
    if (jsonLdScripts.length === 0) {
      score = Math.max(0, score - 5);
      const msg = seoMessages['structured-data'];
      issues.push({
        id: 'structured-data',
        severity: 'info',
        message: msg?.title ?? 'structured-data',
        detail: msg ? `${msg.description} ${msg.fix}` : undefined,
      });
    }

    // 설명 없는 링크 체크
    const links = $('a');
    let nondescriptiveLinks = 0;
    links.each((_, element) => {
      const linkText = $(element).text().trim();
      const ariaLabel = $(element).attr('aria-label');
      if (!linkText && !ariaLabel) {
        nondescriptiveLinks++;
      }
    });

    if (nondescriptiveLinks > 0) {
      const linkScoreDeduction = Math.min(20, nondescriptiveLinks * 2);
      score = Math.max(0, score - linkScoreDeduction);
      const msg = seoMessages['nondescriptive-links'];
      issues.push({
        id: 'nondescriptive-links',
        severity: 'warning',
        message: msg?.title ?? 'nondescriptive-links',
        detail: msg
          ? `${nondescriptiveLinks}개의 링크에 접근 가능한 텍스트가 없습니다. ${msg.fix}`
          : `${nondescriptiveLinks}개의 링크에 접근 가능한 텍스트가 없습니다.`,
      });
    }

    score = Math.max(0, score);

    return {
      category: 'seo',
      score,
      issues,
      meta: {
        titleLength: $('title').text().trim().length,
        metaDescriptionLength: $('meta[name="description"]').attr('content')?.trim().length || 0,
        h1Count: $('h1').length,
        hasOgTitle: !!$('meta[property="og:title"]').attr('content'),
        hasOgDescription: !!$('meta[property="og:description"]').attr('content'),
        hasOgImage: !!$('meta[property="og:image"]').attr('content'),
        hasCanonical: !!$('link[rel="canonical"]').attr('href'),
        hasViewport: !!$('meta[name="viewport"]').attr('content'),
        hasCharset: !!($('meta[charset]').attr('charset') || $('meta[http-equiv="Content-Type"]').attr('content')),
        structuredDataCount: jsonLdScripts.length,
        totalLinks: links.length,
        nondescriptiveLinks,
      },
    };
  } catch (error) {
    console.error('SEO analysis error:', error);
    return {
      category: 'seo',
      score: 0,
      issues: [{
        id: 'analysis-failed',
        severity: 'error',
        message: 'SEO 분석 중 오류가 발생했습니다.',
        detail: error instanceof Error ? error.message : '알 수 없는 오류',
      }],
      meta: {},
    };
  }
}
