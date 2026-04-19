// 포스 푸시 감지 분석기
import type { AnalysisResult, Severity } from "../types.ts";

/** reflog에서 force push 흔적 분석 */
export function analyzeForcePush(reflogEntries: string[]): AnalysisResult {
  // force push 패턴 감지
  const forcePushCount = reflogEntries.filter((entry) => {
    const lower = entry.toLowerCase();
    return lower.includes("forced-update") ||
      lower.includes("force") ||
      lower.includes("reset: moving to");
  }).length;

  const severity = getSeverity(forcePushCount);

  return {
    id: "force_push",
    severity,
    value: forcePushCount,
    detail: `포스 푸시 흔적 ${forcePushCount}회 감지`,
    extras: {
      forcePushCount,
      totalReflog: reflogEntries.length,
    },
  };
}

function getSeverity(count: number): Severity {
  if (count >= 10) return "legendary";
  if (count >= 5) return "savage";
  if (count >= 3) return "medium";
  if (count >= 1) return "mild";
  return "mild";
}
