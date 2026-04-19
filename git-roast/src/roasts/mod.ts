// 로스트 선택 엔진 — 심각도 기반 템플릿 선택 + 변수 치환
import type {
  AnalysisResult,
  AnalyzerId,
  RoastTemplate,
  Severity,
} from "../types.ts";
import { ALL_TEMPLATES, CLOSING_ROASTS } from "./templates.ts";

/** 분석 결과에 맞는 템플릿을 랜덤으로 선택 */
export function pickTemplate(
  id: AnalyzerId,
  severity: Severity,
  templates: RoastTemplate[] = ALL_TEMPLATES,
): RoastTemplate | null {
  const matching = templates.filter(
    (t) => t.id === id && t.severity === severity,
  );
  if (matching.length === 0) return null;
  return matching[Math.floor(Math.random() * matching.length)];
}

/** 템플릿 문자열의 {변수}를 실제 값으로 치환 */
export function interpolate(
  template: string,
  extras: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    if (key in extras) {
      return String(extras[key]);
    }
    return match; // 매칭 안 되면 원본 유지
  });
}

/** 분석 결과 하나에 대해 로스트 문장 생성 */
export function generateRoast(
  result: AnalysisResult,
  templates: RoastTemplate[] = ALL_TEMPLATES,
): string | null {
  const template = pickTemplate(result.id, result.severity, templates);
  if (!template) return null;

  return interpolate(template.template, result.extras || {});
}

/** 모든 분석 결과에 대해 로스트 문장 배열 생성 */
export function generateAllRoasts(
  results: AnalysisResult[],
  templates: RoastTemplate[] = ALL_TEMPLATES,
): Array<{ result: AnalysisResult; roast: string }> {
  const roasts: Array<{ result: AnalysisResult; roast: string }> = [];

  for (const result of results) {
    const roast = generateRoast(result, templates);
    if (roast) {
      roasts.push({ result, roast });
    }
  }

  return roasts;
}

/** 클로징 로스트 선택 — savage+legendary 개수 기반 */
export function generateClosingRoast(results: AnalysisResult[]): string {
  const savageCount = results.filter(
    (r) => r.severity === "savage" || r.severity === "legendary",
  ).length;

  // savageCount 이하인 것 중 가장 높은 minSavageCount의 템플릿들 필터
  const eligible = CLOSING_ROASTS.filter(
    (c) => c.minSavageCount <= savageCount,
  );

  if (eligible.length === 0) {
    return "분석 완료. 별 문제 없어 보이는데... 진짜요?";
  }

  // 가장 높은 minSavageCount에 해당하는 것들 중에서 랜덤 선택
  const maxThreshold = Math.max(...eligible.map((c) => c.minSavageCount));
  const best = eligible.filter((c) => c.minSavageCount === maxThreshold);

  return best[Math.floor(Math.random() * best.length)].template;
}

export { ALL_TEMPLATES, CLOSING_ROASTS } from "./templates.ts";
