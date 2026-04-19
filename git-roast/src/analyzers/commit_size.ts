// 커밋 크기 분석기 — 1줄 커밋 vs 대규모 커밋
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 커밋당 변경 라인 수 분석 */
export function analyzeCommitSize(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "commit_size",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: {
        total: 0,
        tinyCount: 0,
        hugeCount: 0,
        avgSize: 0,
        maxSize: 0,
        tinyRatio: 0,
        hugeRatio: 0,
      },
    };
  }

  const total = commits.length;
  const sizes = commits.map((c) => c.insertions + c.deletions);

  // 1줄 커밋 (변경 0~2줄)
  const tinyCount = sizes.filter((s) => s <= 2).length;
  // 대규모 커밋 (100줄 이상)
  const hugeCount = sizes.filter((s) => s >= 100).length;

  const avgSize = Math.round(sizes.reduce((a, b) => a + b, 0) / total);
  const maxSize = Math.max(...sizes);

  const tinyRatio = (tinyCount / total) * 100;
  const hugeRatio = (hugeCount / total) * 100;

  // 극단적 커밋 비율로 심각도 판단
  const extremeRatio = tinyRatio + hugeRatio;
  const severity = getSeverity(extremeRatio);

  return {
    id: "commit_size",
    severity,
    value: extremeRatio,
    detail: `평균 ${avgSize}줄 변경. 1줄 커밋 ${tinyCount}개(${
      tinyRatio.toFixed(1)
    }%), 100줄+ 커밋 ${hugeCount}개(${hugeRatio.toFixed(1)}%)`,
    extras: {
      total,
      tinyCount,
      hugeCount,
      avgSize,
      maxSize,
      tinyRatio: Math.round(tinyRatio),
      hugeRatio: Math.round(hugeRatio),
    },
  };
}

function getSeverity(extremeRatio: number): Severity {
  if (extremeRatio >= 60) return "legendary";
  if (extremeRatio >= 40) return "savage";
  if (extremeRatio >= 25) return "medium";
  if (extremeRatio >= 10) return "mild";
  return "mild";
}
