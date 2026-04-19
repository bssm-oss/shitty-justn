// 시간 패턴 분석기 — 새벽 커밋, 주말 커밋 비율
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 새벽 시간대 (0시~5시) 및 주말 커밋 분석 */
export function analyzeTimePattern(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "time_pattern",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: {
        total: 0,
        lateNightCount: 0,
        lateNightRatio: 0,
        weekendCount: 0,
        weekendRatio: 0,
      },
    };
  }

  const total = commits.length;

  // 새벽 커밋 (0~5시)
  const lateNightCount = commits.filter((c) => {
    const hour = c.authorDate.getHours();
    return hour >= 0 && hour < 5;
  }).length;

  // 주말 커밋 (토, 일)
  const weekendCount = commits.filter((c) => {
    const day = c.authorDate.getDay();
    return day === 0 || day === 6;
  }).length;

  const lateNightRatio = (lateNightCount / total) * 100;
  const weekendRatio = (weekendCount / total) * 100;

  // 새벽 비율이 더 심각하므로 그걸로 심각도 판단
  const combinedScore = lateNightRatio * 1.5 + weekendRatio * 0.5;
  const severity = getSeverity(combinedScore);

  return {
    id: "time_pattern",
    severity,
    value: lateNightRatio,
    detail: `새벽(0~5시) 커밋 ${lateNightCount}개 (${
      lateNightRatio.toFixed(1)
    }%), 주말 커밋 ${weekendCount}개 (${weekendRatio.toFixed(1)}%)`,
    extras: {
      total,
      lateNightCount,
      lateNightRatio: Math.round(lateNightRatio),
      weekendCount,
      weekendRatio: Math.round(weekendRatio),
    },
  };
}

function getSeverity(score: number): Severity {
  if (score >= 45) return "legendary";
  if (score >= 30) return "savage";
  if (score >= 15) return "medium";
  if (score >= 5) return "mild";
  return "mild";
}
