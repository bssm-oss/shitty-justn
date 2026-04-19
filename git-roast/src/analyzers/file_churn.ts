// 파일 변경 빈도 분석기
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 파일별 수정 빈도 분석 */
export function analyzeFileChurn(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "file_churn",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: {
        avgChurn: 0,
        maxChurn: 0,
        maxChurnFile: "없음",
        uniqueFiles: 0,
      },
    };
  }

  // 파일별 수정 횟수 카운트
  const fileCounts = new Map<string, number>();
  for (const commit of commits) {
    for (const file of commit.filesChanged) {
      fileCounts.set(file, (fileCounts.get(file) || 0) + 1);
    }
  }

  const uniqueFiles = fileCounts.size;
  if (uniqueFiles === 0) {
    return {
      id: "file_churn",
      severity: "mild",
      value: 0,
      detail: "파일 변경 정보가 없습니다.",
      extras: {
        avgChurn: 0,
        maxChurn: 0,
        maxChurnFile: "없음",
        uniqueFiles: 0,
      },
    };
  }

  const counts = [...fileCounts.values()];
  const avgChurn = counts.reduce((a, b) => a + b, 0) / uniqueFiles;

  // 가장 많이 수정된 파일
  let maxChurn = 0;
  let maxChurnFile = "";
  for (const [file, count] of fileCounts) {
    if (count > maxChurn) {
      maxChurn = count;
      maxChurnFile = file;
    }
  }

  const severity = getSeverity(maxChurn);

  return {
    id: "file_churn",
    severity,
    value: avgChurn,
    detail: `파일당 평균 ${
      avgChurn.toFixed(1)
    }회 수정, 최다 수정 파일: ${maxChurnFile} (${maxChurn}회)`,
    extras: {
      avgChurn: parseFloat(avgChurn.toFixed(1)),
      maxChurn,
      maxChurnFile,
      uniqueFiles,
    },
  };
}

function getSeverity(maxChurn: number): Severity {
  if (maxChurn >= 30) return "legendary";
  if (maxChurn >= 20) return "savage";
  if (maxChurn >= 10) return "medium";
  if (maxChurn >= 5) return "mild";
  return "mild";
}
