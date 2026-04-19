// 분석기 오케스트레이터 — 모든 분석기 실행, 결과 수집
import type { AnalysisResult, BranchInfo, CommitData } from "../types.ts";
import { analyzeCommitMessage } from "./commit_message.ts";
import { analyzeTimePattern } from "./time_pattern.ts";
import { analyzeFileChurn } from "./file_churn.ts";
import { analyzeCommitSize } from "./commit_size.ts";
import { analyzeStreak } from "./streak.ts";
import { analyzeContributor } from "./contributor.ts";
import { analyzeForcePush } from "./force_push.ts";
import { analyzeCommitFrequency } from "./commit_frequency.ts";
import { analyzeLanguage } from "./language.ts";
import { analyzeBranch } from "./branch.ts";

export interface AnalyzeOptions {
  commits: CommitData[];
  reflogEntries?: string[];
  branchInfo?: BranchInfo;
}

/** 모든 분석기를 실행하고 결과 배열 반환 */
export function runAllAnalyzers(options: AnalyzeOptions): AnalysisResult[] {
  const { commits, reflogEntries = [], branchInfo } = options;

  const results: AnalysisResult[] = [
    analyzeCommitMessage(commits),
    analyzeTimePattern(commits),
    analyzeFileChurn(commits),
    analyzeCommitSize(commits),
    analyzeStreak(commits),
    analyzeContributor(commits),
    analyzeForcePush(reflogEntries),
    analyzeCommitFrequency(commits),
    analyzeLanguage(commits),
  ];

  // 브랜치 정보가 있으면 추가
  if (branchInfo) {
    results.push(analyzeBranch(branchInfo));
  }

  return results;
}

// 개별 분석기 재export
export { analyzeCommitMessage } from "./commit_message.ts";
export { analyzeTimePattern } from "./time_pattern.ts";
export { analyzeFileChurn } from "./file_churn.ts";
export { analyzeCommitSize } from "./commit_size.ts";
export { analyzeStreak } from "./streak.ts";
export { analyzeContributor } from "./contributor.ts";
export { analyzeForcePush } from "./force_push.ts";
export { analyzeCommitFrequency } from "./commit_frequency.ts";
export { analyzeLanguage } from "./language.ts";
export { analyzeBranch } from "./branch.ts";
