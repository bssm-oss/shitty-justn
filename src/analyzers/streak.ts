// 연속 커밋 / 공백 분석기
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 연속 커밋 일수(잔디), 최장 공백 분석 */
export function analyzeStreak(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "streak",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: { longestStreak: 0, longestGap: 0, totalDays: 0 },
    };
  }

  // 날짜별로 유니크 일자 추출 (YYYY-MM-DD)
  const dateSet = new Set<string>();
  for (const commit of commits) {
    const d = commit.authorDate;
    const key = `${d.getFullYear()}-${
      String(d.getMonth() + 1).padStart(2, "0")
    }-${String(d.getDate()).padStart(2, "0")}`;
    dateSet.add(key);
  }

  const sortedDates = [...dateSet].sort();
  if (sortedDates.length <= 1) {
    return {
      id: "streak",
      severity: "mild",
      value: 1,
      detail: "커밋 일자가 1일뿐입니다.",
      extras: { longestStreak: 1, longestGap: 0, totalDays: 1 },
    };
  }

  // 연속 일수 계산
  let longestStreak = 1;
  let currentStreak = 1;
  let longestGap = 0;

  for (let i = 1; i < sortedDates.length; i++) {
    const prev = new Date(sortedDates[i - 1]);
    const curr = new Date(sortedDates[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
      longestGap = Math.max(longestGap, diffDays);
    }
  }

  // 전체 기간 (일)
  const first = new Date(sortedDates[0]);
  const last = new Date(sortedDates[sortedDates.length - 1]);
  const totalDays = Math.round(
    (last.getTime() - first.getTime()) / (1000 * 60 * 60 * 24),
  ) + 1;

  const severity = getSeverity(longestGap);

  return {
    id: "streak",
    severity,
    value: longestStreak,
    detail:
      `최장 연속 ${longestStreak}일, 최장 공백 ${longestGap}일, 총 기간 ${totalDays}일`,
    extras: { longestStreak, longestGap, totalDays },
  };
}

function getSeverity(longestGap: number): Severity {
  if (longestGap >= 90) return "legendary";
  if (longestGap >= 30) return "savage";
  if (longestGap >= 14) return "medium";
  if (longestGap >= 7) return "mild";
  return "mild";
}
