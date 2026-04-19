// 기여자 분석기 — 솔로 개발자 감지, 기여자 수
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 기여자 수, 솔로 개발 비율 분석 */
export function analyzeContributor(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "contributor",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: {
        contributorCount: 0,
        topAuthor: "없음",
        topAuthorRatio: 0,
        total: 0,
      },
    };
  }

  const total = commits.length;

  // 작성자별 커밋 수
  const authorCounts = new Map<string, number>();
  for (const commit of commits) {
    authorCounts.set(
      commit.author,
      (authorCounts.get(commit.author) || 0) + 1,
    );
  }

  const contributorCount = authorCounts.size;

  // 가장 많이 커밋한 사람
  let topAuthor = "";
  let topCount = 0;
  for (const [author, count] of authorCounts) {
    if (count > topCount) {
      topCount = count;
      topAuthor = author;
    }
  }

  const topAuthorRatio = (topCount / total) * 100;
  const severity = getSeverity(topAuthorRatio, contributorCount);

  return {
    id: "contributor",
    severity,
    value: topAuthorRatio,
    detail: `기여자 ${contributorCount}명, 최다 커밋: ${topAuthor} (${
      topAuthorRatio.toFixed(1)
    }%)`,
    extras: {
      contributorCount,
      topAuthor,
      topAuthorRatio: Math.round(topAuthorRatio),
      topAuthorCount: topCount,
      total,
    },
  };
}

function getSeverity(
  topAuthorRatio: number,
  contributorCount: number,
): Severity {
  // 솔로 개발자이거나 한 명이 압도적이면 심각
  if (contributorCount === 1 || topAuthorRatio >= 95) return "legendary";
  if (topAuthorRatio >= 80) return "savage";
  if (topAuthorRatio >= 60) return "medium";
  if (topAuthorRatio >= 40) return "mild";
  return "mild";
}
