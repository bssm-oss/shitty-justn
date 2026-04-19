// 브랜치 분석기 — 브랜치 수, 네이밍 패턴
import type { AnalysisResult, BranchInfo, Severity } from "../types.ts";

/** 브랜치 현황 분석 */
export function analyzeBranch(branchInfo: BranchInfo): AnalysisResult {
  const { total, unmerged, names } = branchInfo;

  if (total === 0) {
    return {
      id: "branch",
      severity: "mild",
      value: 0,
      detail: "브랜치 정보가 없습니다.",
      extras: { total: 0, unmerged: 0, badNameCount: 0, badNameRatio: 0 },
    };
  }

  // 나쁜 브랜치 네이밍 감지
  const badPatterns = /^(test|tmp|temp|asdf|branch\d*|dev\d+|untitled|wip)$/i;
  const badNameCount = names.filter((n) => {
    const name = n.replace(/^remotes\/origin\//, "").replace(/^\*?\s*/, "");
    return badPatterns.test(name);
  }).length;

  const badNameRatio = total > 0 ? (badNameCount / total) * 100 : 0;
  const severity = getSeverity(unmerged, total);

  return {
    id: "branch",
    severity,
    value: unmerged,
    detail:
      `브랜치 ${total}개 (미머지 ${unmerged}개), 이상한 이름 ${badNameCount}개`,
    extras: {
      total,
      unmerged,
      badNameCount,
      badNameRatio: Math.round(badNameRatio),
    },
  };
}

function getSeverity(unmerged: number, total: number): Severity {
  if (unmerged >= 20 || total >= 30) return "legendary";
  if (unmerged >= 10 || total >= 20) return "savage";
  if (unmerged >= 5 || total >= 10) return "medium";
  if (unmerged >= 2) return "mild";
  return "mild";
}
