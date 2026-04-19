// 커밋 빈도 분석기 — 평균 간격, 벌크 커밋 감지
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 커밋 간격 및 벌크 커밋 분석 */
export function analyzeCommitFrequency(commits: CommitData[]): AnalysisResult {
  if (commits.length <= 1) {
    return {
      id: "commit_frequency",
      severity: "mild",
      value: 0,
      detail: "분석할 커밋이 부족합니다.",
      extras: {
        avgIntervalHours: 0,
        bulkCount: 0,
        total: commits.length,
        maxBulkSize: 0,
      },
    };
  }

  // 시간순 정렬
  const sorted = [...commits].sort(
    (a, b) => a.authorDate.getTime() - b.authorDate.getTime(),
  );

  // 평균 커밋 간격 (시간)
  const intervals: number[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const diffMs = sorted[i].authorDate.getTime() -
      sorted[i - 1].authorDate.getTime();
    intervals.push(diffMs / (1000 * 60 * 60)); // 시간 단위
  }

  const avgIntervalHours = intervals.reduce((a, b) => a + b, 0) /
    intervals.length;

  // 벌크 커밋 감지 (5분 내 5개 이상 커밋)
  let bulkCount = 0;
  let maxBulkSize = 0;
  const BULK_WINDOW_MS = 5 * 60 * 1000; // 5분
  const BULK_THRESHOLD = 5;

  for (let i = 0; i < sorted.length; i++) {
    let count = 1;
    for (let j = i + 1; j < sorted.length; j++) {
      const diff = sorted[j].authorDate.getTime() -
        sorted[i].authorDate.getTime();
      if (diff <= BULK_WINDOW_MS) {
        count++;
      } else {
        break;
      }
    }
    if (count >= BULK_THRESHOLD) {
      bulkCount++;
      maxBulkSize = Math.max(maxBulkSize, count);
    }
  }

  const severity = getSeverity(bulkCount, avgIntervalHours);

  return {
    id: "commit_frequency",
    severity,
    value: avgIntervalHours,
    detail: `평균 커밋 간격 ${
      avgIntervalHours.toFixed(1)
    }시간, 벌크 커밋(5분 내 5+) ${bulkCount}회`,
    extras: {
      avgIntervalHours: parseFloat(avgIntervalHours.toFixed(1)),
      bulkCount,
      total: commits.length,
      maxBulkSize,
    },
  };
}

function getSeverity(bulkCount: number, _avgInterval: number): Severity {
  if (bulkCount >= 10) return "legendary";
  if (bulkCount >= 5) return "savage";
  if (bulkCount >= 2) return "medium";
  if (bulkCount >= 1) return "mild";
  return "mild";
}
