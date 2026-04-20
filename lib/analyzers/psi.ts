import type { PSIAudit } from './types';

// PSI API 응답 데이터 구조
export interface PSIData {
  lighthouseResult?: {
    categories?: Record<string, { score?: number }>;
    audits?: Record<string, PSIAudit>;
  };
}

/**
 * PSI API를 호출해서 Lighthouse 결과를 가져온다.
 * 4개 분석기(performance, accessibility, bundle, mobile)가 공유해서 사용.
 */
export async function fetchPSI(
  url: string,
  strategy: 'mobile' | 'desktop',
  categories: string[],
): Promise<PSIData> {
  const psiApiKey = process.env.PSI_API_KEY;
  if (!psiApiKey) {
    throw new Error('PSI API key is not configured');
  }

  const psiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
  psiUrl.searchParams.set('url', url);
  psiUrl.searchParams.set('key', psiApiKey);
  psiUrl.searchParams.set('strategy', strategy);

  for (const category of categories) {
    psiUrl.searchParams.append('category', category);
  }

  const response = await fetch(psiUrl.toString());

  if (!response.ok) {
    throw new Error(`PSI API error: ${response.status}`);
  }

  const data: PSIData = await response.json() as PSIData;
  return data;
}
