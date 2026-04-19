// 커밋 메시지 분석기 — fix/wip 비율, 메시지 길이 등
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** fix/wip/typo 패턴 */
const BAD_PATTERNS = /^(fix|wip|typo|tmp|test|asdf|qwer|\.+|!+|\?+)$/i;

/** 커밋 메시지 품질 분석 */
export function analyzeCommitMessage(commits: CommitData[]): AnalysisResult {
  if (commits.length === 0) {
    return {
      id: "commit_message",
      severity: "mild",
      value: 0,
      detail: "커밋이 없습니다.",
      extras: {
        total: 0,
        fixCount: 0,
        fixRatio: 0,
        shortest: 0,
        longest: 0,
        avgLength: 0,
      },
    };
  }

  const total = commits.length;
  const fixCount =
    commits.filter((c) => BAD_PATTERNS.test(c.message.trim())).length;
  const fixRatio = (fixCount / total) * 100;

  const lengths = commits.map((c) => c.message.length);
  const shortest = Math.min(...lengths);
  const longest = Math.max(...lengths);
  const avgLength = Math.round(lengths.reduce((a, b) => a + b, 0) / total);

  const severity = getSeverity(fixRatio);

  return {
    id: "commit_message",
    severity,
    value: fixRatio,
    detail: `커밋 ${total}개 중 fix/wip류 ${fixCount}개 (${
      fixRatio.toFixed(1)
    }%)`,
    extras: {
      total,
      fixCount,
      fixRatio: Math.round(fixRatio),
      shortest,
      longest,
      avgLength,
      shortestMsg:
        commits.reduce((a, b) => a.message.length <= b.message.length ? a : b)
          .message || "(빈 메시지)",
    },
  };
}

function getSeverity(fixRatio: number): Severity {
  if (fixRatio >= 50) return "legendary";
  if (fixRatio >= 35) return "savage";
  if (fixRatio >= 20) return "medium";
  if (fixRatio >= 10) return "mild";
  return "mild";
}
