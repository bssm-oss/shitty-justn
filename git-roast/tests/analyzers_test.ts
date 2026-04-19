// 분석기 테스트
import { assertEquals, assertExists } from "@std/assert";
import { analyzeCommitMessage } from "../src/analyzers/commit_message.ts";
import { analyzeTimePattern } from "../src/analyzers/time_pattern.ts";
import { analyzeFileChurn } from "../src/analyzers/file_churn.ts";
import { analyzeCommitSize } from "../src/analyzers/commit_size.ts";
import { analyzeStreak } from "../src/analyzers/streak.ts";
import { analyzeContributor } from "../src/analyzers/contributor.ts";
import { analyzeForcePush } from "../src/analyzers/force_push.ts";
import { analyzeCommitFrequency } from "../src/analyzers/commit_frequency.ts";
import { analyzeLanguage } from "../src/analyzers/language.ts";
import { analyzeBranch } from "../src/analyzers/branch.ts";
import { runAllAnalyzers } from "../src/analyzers/mod.ts";
import type { BranchInfo, CommitData } from "../src/types.ts";

// === 헬퍼: 목 커밋 데이터 생성 ===
function makeCommit(overrides: Partial<CommitData> = {}): CommitData {
  return {
    hash: "abc123",
    message: "feat: add feature",
    authorDate: new Date("2024-06-15T14:30:00"),
    filesChanged: ["src/main.ts"],
    insertions: 10,
    deletions: 5,
    author: "dev1",
    ...overrides,
  };
}

function makeCommits(
  count: number,
  overrides: Partial<CommitData> = {},
): CommitData[] {
  return Array.from({ length: count }, (_, i) =>
    makeCommit({
      hash: `hash${i}`,
      message: `commit ${i}`,
      authorDate: new Date(2024, 5, 15 + i, 14, 0, 0),
      ...overrides,
    }));
}

// ============================================================
// commit_message 분석기
// ============================================================
Deno.test("commit_message: 빈 커밋 배열", () => {
  const result = analyzeCommitMessage([]);
  assertEquals(result.id, "commit_message");
  assertEquals(result.severity, "mild");
  assertEquals(result.value, 0);
});

Deno.test("commit_message: fix 비율 mild (10~20%)", () => {
  // 12개 중 2개 = 16.7% -> mild (10~20% 미만)
  const commits = [
    ...makeCommits(10, { message: "feat: something" }),
    makeCommit({ hash: "f1", message: "fix" }),
    makeCommit({ hash: "f2", message: "wip" }),
  ];
  const result = analyzeCommitMessage(commits);
  assertEquals(result.id, "commit_message");
  assertEquals(result.severity, "mild");
  assertEquals(result.extras?.total, 12);
  assertEquals(result.extras?.fixCount, 2);
});

Deno.test("commit_message: fix 비율 medium (20~35%)", () => {
  const commits = [
    ...makeCommits(7, { message: "feat: something" }),
    makeCommit({ hash: "f1", message: "fix" }),
    makeCommit({ hash: "f2", message: "wip" }),
    makeCommit({ hash: "f3", message: "typo" }),
  ];
  const result = analyzeCommitMessage(commits);
  assertEquals(result.id, "commit_message");
  assertEquals(result.severity, "medium");
});

Deno.test("commit_message: fix 비율 savage (35~50%)", () => {
  const commits = [
    ...makeCommits(6, { message: "feat: ok" }),
    ...makeCommits(4, { message: "fix" }),
  ];
  const result = analyzeCommitMessage(commits);
  assertEquals(result.id, "commit_message");
  assertEquals(result.severity, "savage");
});

Deno.test("commit_message: fix 비율 legendary (50%+)", () => {
  const commits = [
    ...makeCommits(4, { message: "feat: ok" }),
    ...makeCommits(6, { message: "fix" }),
  ];
  const result = analyzeCommitMessage(commits);
  assertEquals(result.id, "commit_message");
  assertEquals(result.severity, "legendary");
});

Deno.test("commit_message: extras 값 확인", () => {
  const commits = [
    makeCommit({ message: "hi" }),
    makeCommit({ hash: "h2", message: "this is a long commit message" }),
  ];
  const result = analyzeCommitMessage(commits);
  assertEquals(result.extras?.shortest, 2);
  assertEquals(result.extras?.longest, 29);
  assertExists(result.extras?.avgLength);
});

// ============================================================
// time_pattern 분석기
// ============================================================
Deno.test("time_pattern: 빈 커밋", () => {
  const result = analyzeTimePattern([]);
  assertEquals(result.id, "time_pattern");
  assertEquals(result.severity, "mild");
});

Deno.test("time_pattern: 새벽 커밋 감지", () => {
  const commits = [
    makeCommit({ authorDate: new Date("2024-06-15T02:00:00") }),
    makeCommit({ hash: "h2", authorDate: new Date("2024-06-15T03:30:00") }),
    makeCommit({ hash: "h3", authorDate: new Date("2024-06-15T14:00:00") }),
    makeCommit({ hash: "h4", authorDate: new Date("2024-06-15T15:00:00") }),
  ];
  const result = analyzeTimePattern(commits);
  assertEquals(result.extras?.lateNightCount, 2);
  assertEquals(result.extras?.total, 4);
});

Deno.test("time_pattern: 주말 커밋 감지", () => {
  // 2024-06-15 = 토요일, 2024-06-16 = 일요일
  const commits = [
    makeCommit({ authorDate: new Date("2024-06-15T10:00:00") }), // 토
    makeCommit({ hash: "h2", authorDate: new Date("2024-06-16T10:00:00") }), // 일
    makeCommit({ hash: "h3", authorDate: new Date("2024-06-17T10:00:00") }), // 월
  ];
  const result = analyzeTimePattern(commits);
  assertEquals(result.extras?.weekendCount, 2);
});

Deno.test("time_pattern: 높은 새벽 비율 -> savage", () => {
  const commits = makeCommits(10, {
    authorDate: new Date("2024-06-15T03:00:00"),
  });
  const result = analyzeTimePattern(commits);
  // lateNightRatio=100%, combinedScore=150
  assertEquals(result.severity, "legendary");
});

// ============================================================
// file_churn 분석기
// ============================================================
Deno.test("file_churn: 빈 커밋", () => {
  const result = analyzeFileChurn([]);
  assertEquals(result.id, "file_churn");
  assertEquals(result.severity, "mild");
});

Deno.test("file_churn: 파일 수정 빈도 계산", () => {
  const commits = [
    makeCommit({ filesChanged: ["a.ts", "b.ts"] }),
    makeCommit({ hash: "h2", filesChanged: ["a.ts", "c.ts"] }),
    makeCommit({ hash: "h3", filesChanged: ["a.ts"] }),
  ];
  const result = analyzeFileChurn(commits);
  assertEquals(result.extras?.maxChurn, 3);
  assertEquals(result.extras?.maxChurnFile, "a.ts");
  assertEquals(result.extras?.uniqueFiles, 3);
});

Deno.test("file_churn: 파일 없는 커밋", () => {
  const commits = [makeCommit({ filesChanged: [] })];
  const result = analyzeFileChurn(commits);
  assertEquals(result.extras?.uniqueFiles, 0);
});

Deno.test("file_churn: 높은 churn -> savage/legendary", () => {
  const commits = makeCommits(25, { filesChanged: ["hot.ts"] });
  const result = analyzeFileChurn(commits);
  assertEquals(result.extras?.maxChurn, 25);
  // maxChurn=25 -> savage (20~30)
  assertEquals(result.severity, "savage");
});

// ============================================================
// commit_size 분석기
// ============================================================
Deno.test("commit_size: 빈 커밋", () => {
  const result = analyzeCommitSize([]);
  assertEquals(result.id, "commit_size");
  assertEquals(result.severity, "mild");
});

Deno.test("commit_size: tiny 커밋 감지", () => {
  const commits = [
    makeCommit({ insertions: 1, deletions: 0 }),
    makeCommit({ hash: "h2", insertions: 0, deletions: 1 }),
    makeCommit({ hash: "h3", insertions: 50, deletions: 20 }),
  ];
  const result = analyzeCommitSize(commits);
  assertEquals(result.extras?.tinyCount, 2);
});

Deno.test("commit_size: huge 커밋 감지", () => {
  const commits = [
    makeCommit({ insertions: 200, deletions: 50 }),
    makeCommit({ hash: "h2", insertions: 5, deletions: 3 }),
  ];
  const result = analyzeCommitSize(commits);
  assertEquals(result.extras?.hugeCount, 1);
  assertEquals(result.extras?.maxSize, 250);
});

Deno.test("commit_size: 극단적 비율 -> legendary", () => {
  const tiny = makeCommits(4, { insertions: 0, deletions: 1 });
  const huge = makeCommits(4, { insertions: 500, deletions: 200 });
  const normal = makeCommits(2, { insertions: 20, deletions: 10 });
  const commits = [...tiny, ...huge, ...normal];
  // tinyRatio=40%, hugeRatio=40%, extremeRatio=80% -> legendary
  const result = analyzeCommitSize(commits);
  assertEquals(result.severity, "legendary");
});

// ============================================================
// streak 분석기
// ============================================================
Deno.test("streak: 빈 커밋", () => {
  const result = analyzeStreak([]);
  assertEquals(result.id, "streak");
  assertEquals(result.extras?.longestStreak, 0);
});

Deno.test("streak: 단일 커밋", () => {
  const result = analyzeStreak([makeCommit()]);
  assertEquals(result.extras?.longestStreak, 1);
  assertEquals(result.extras?.longestGap, 0);
});

Deno.test("streak: 연속 3일 커밋", () => {
  const commits = [
    makeCommit({ authorDate: new Date("2024-06-15T10:00:00") }),
    makeCommit({ hash: "h2", authorDate: new Date("2024-06-16T10:00:00") }),
    makeCommit({ hash: "h3", authorDate: new Date("2024-06-17T10:00:00") }),
  ];
  const result = analyzeStreak(commits);
  assertEquals(result.extras?.longestStreak, 3);
});

Deno.test("streak: 공백 감지", () => {
  const commits = [
    makeCommit({ authorDate: new Date("2024-01-01T10:00:00") }),
    makeCommit({ hash: "h2", authorDate: new Date("2024-02-15T10:00:00") }),
  ];
  const result = analyzeStreak(commits);
  assertEquals(result.extras?.longestGap, 45);
  assertEquals(result.severity, "savage"); // 30+일 공백
});

Deno.test("streak: 100일 공백 -> legendary", () => {
  const commits = [
    makeCommit({ authorDate: new Date("2024-01-01T10:00:00") }),
    makeCommit({ hash: "h2", authorDate: new Date("2024-04-15T10:00:00") }),
  ];
  const result = analyzeStreak(commits);
  // 약 105일 공백
  assertEquals(result.severity, "legendary");
});

// ============================================================
// contributor 분석기
// ============================================================
Deno.test("contributor: 빈 커밋", () => {
  const result = analyzeContributor([]);
  assertEquals(result.id, "contributor");
  assertEquals(result.extras?.contributorCount, 0);
});

Deno.test("contributor: 솔로 개발자 -> legendary", () => {
  const commits = makeCommits(10, { author: "solo-dev" });
  const result = analyzeContributor(commits);
  assertEquals(result.severity, "legendary");
  assertEquals(result.extras?.contributorCount, 1);
  assertEquals(result.extras?.topAuthor, "solo-dev");
});

Deno.test("contributor: 다수 기여자", () => {
  const commits = [
    ...makeCommits(3, { author: "dev1" }),
    ...makeCommits(3, { author: "dev2" }),
    ...makeCommits(3, { author: "dev3" }),
    makeCommit({ hash: "x1", author: "dev4" }),
  ];
  const result = analyzeContributor(commits);
  assertEquals(result.extras?.contributorCount, 4);
  assertEquals(result.extras?.topAuthorRatio, 30); // 3/10
});

Deno.test("contributor: 한 명이 압도적 -> savage", () => {
  const commits = [
    ...makeCommits(9, { author: "boss" }),
    makeCommit({ hash: "x1", author: "intern" }),
  ];
  const result = analyzeContributor(commits);
  assertEquals(result.severity, "savage"); // 90%
});

// ============================================================
// force_push 분석기
// ============================================================
Deno.test("force_push: 빈 reflog", () => {
  const result = analyzeForcePush([]);
  assertEquals(result.id, "force_push");
  assertEquals(result.value, 0);
  assertEquals(result.severity, "mild");
});

Deno.test("force_push: forced-update 감지", () => {
  const entries = [
    "commit: something",
    "forced-update",
    "commit: another",
    "reset: moving to HEAD~1",
  ];
  const result = analyzeForcePush(entries);
  assertEquals(result.value, 2);
});

Deno.test("force_push: 많은 포스 푸시 -> savage", () => {
  const entries = Array(7).fill("forced-update");
  const result = analyzeForcePush(entries);
  assertEquals(result.severity, "savage");
});

Deno.test("force_push: 10개 이상 -> legendary", () => {
  const entries = Array(12).fill("forced-update");
  const result = analyzeForcePush(entries);
  assertEquals(result.severity, "legendary");
});

// ============================================================
// commit_frequency 분석기
// ============================================================
Deno.test("commit_frequency: 빈/부족한 커밋", () => {
  const result = analyzeCommitFrequency([]);
  assertEquals(result.id, "commit_frequency");
  assertEquals(result.extras?.bulkCount, 0);
});

Deno.test("commit_frequency: 단일 커밋", () => {
  const result = analyzeCommitFrequency([makeCommit()]);
  assertEquals(result.extras?.total, 1);
});

Deno.test("commit_frequency: 벌크 커밋 감지", () => {
  // 5분 안에 6개 커밋
  const base = new Date("2024-06-15T10:00:00").getTime();
  const commits = Array.from({ length: 6 }, (_, i) =>
    makeCommit({
      hash: `bulk${i}`,
      authorDate: new Date(base + i * 30 * 1000), // 30초 간격
    }));
  const result = analyzeCommitFrequency(commits);
  // 첫 번째 커밋 기준으로 5분 안에 6개 -> bulkCount > 0
  assertEquals(Number(result.extras?.bulkCount ?? 0) > 0, true);
});

Deno.test("commit_frequency: 평균 간격 계산", () => {
  const commits = [
    makeCommit({ authorDate: new Date("2024-06-15T10:00:00") }),
    makeCommit({ hash: "h2", authorDate: new Date("2024-06-15T14:00:00") }),
    makeCommit({ hash: "h3", authorDate: new Date("2024-06-15T18:00:00") }),
  ];
  const result = analyzeCommitFrequency(commits);
  assertEquals(result.extras?.avgIntervalHours, 4);
});

// ============================================================
// language 분석기
// ============================================================
Deno.test("language: 빈 커밋", () => {
  const result = analyzeLanguage([]);
  assertEquals(result.id, "language");
  assertEquals(result.extras?.topLang, "없음");
});

Deno.test("language: 확장자 분포 분석", () => {
  const commits = [
    makeCommit({ filesChanged: ["src/a.ts", "src/b.ts", "config.json"] }),
    makeCommit({ hash: "h2", filesChanged: ["src/c.ts", "package.json"] }),
  ];
  const result = analyzeLanguage(commits);
  assertEquals(result.extras?.topLang, ".ts");
  assertEquals(result.extras?.langCount, 2); // .ts, .json
});

Deno.test("language: 설정 파일 비율", () => {
  const commits = [
    makeCommit({
      filesChanged: [
        "tsconfig.json",
        "package.json",
        ".eslintrc.yaml",
        "config.toml",
        "src/main.ts",
      ],
    }),
  ];
  const result = analyzeLanguage(commits);
  // json, yaml, toml = config, ts = not config
  assertEquals(Number(result.extras?.configRatio ?? 0) > 0, true);
});

Deno.test("language: 확장자 없는 파일", () => {
  const commits = [
    makeCommit({ filesChanged: ["Makefile", "Dockerfile"] }),
  ];
  const result = analyzeLanguage(commits);
  assertEquals(result.extras?.topLang, "(확장자 없음)");
});

Deno.test("language: 많은 설정 파일 -> savage+", () => {
  const configFiles = Array.from({ length: 8 }, (_, i) => `config${i}.json`);
  const codeFiles = ["main.ts", "util.ts"];
  const commits = [
    makeCommit({ filesChanged: [...configFiles, ...codeFiles] }),
  ];
  const result = analyzeLanguage(commits);
  // configRatio = 80% -> legendary
  assertEquals(
    result.severity === "savage" || result.severity === "legendary",
    true,
  );
});

// ============================================================
// branch 분석기
// ============================================================
Deno.test("branch: 빈 브랜치", () => {
  const info: BranchInfo = { total: 0, merged: 0, unmerged: 0, names: [] };
  const result = analyzeBranch(info);
  assertEquals(result.id, "branch");
  assertEquals(result.severity, "mild");
});

Deno.test("branch: 적은 브랜치 -> mild", () => {
  const info: BranchInfo = {
    total: 3,
    merged: 2,
    unmerged: 1,
    names: ["main", "develop", "feature/login"],
  };
  const result = analyzeBranch(info);
  assertEquals(result.severity, "mild");
});

Deno.test("branch: 많은 미머지 -> savage", () => {
  const names = Array.from({ length: 15 }, (_, i) => `feature/f${i}`);
  const info: BranchInfo = { total: 15, merged: 3, unmerged: 12, names };
  const result = analyzeBranch(info);
  assertEquals(result.severity, "savage");
});

Deno.test("branch: 이상한 이름 감지", () => {
  const info: BranchInfo = {
    total: 5,
    merged: 2,
    unmerged: 3,
    names: ["main", "test", "tmp", "asdf", "feature/ok"],
  };
  const result = analyzeBranch(info);
  assertEquals(result.extras?.badNameCount, 3); // test, tmp, asdf
});

Deno.test("branch: 대량 브랜치 -> legendary", () => {
  const names = Array.from({ length: 35 }, (_, i) => `b${i}`);
  const info: BranchInfo = { total: 35, merged: 5, unmerged: 30, names };
  const result = analyzeBranch(info);
  assertEquals(result.severity, "legendary");
});

// ============================================================
// 오케스트레이터 (runAllAnalyzers)
// ============================================================
Deno.test("runAllAnalyzers: 모든 분석기 실행", () => {
  const commits = makeCommits(5);
  const results = runAllAnalyzers({ commits });
  // branch 없이 9개 분석기
  assertEquals(results.length, 9);
  const ids = results.map((r) => r.id);
  assertEquals(ids.includes("commit_message"), true);
  assertEquals(ids.includes("time_pattern"), true);
  assertEquals(ids.includes("file_churn"), true);
  assertEquals(ids.includes("commit_size"), true);
  assertEquals(ids.includes("streak"), true);
  assertEquals(ids.includes("contributor"), true);
  assertEquals(ids.includes("force_push"), true);
  assertEquals(ids.includes("commit_frequency"), true);
  assertEquals(ids.includes("language"), true);
});

Deno.test("runAllAnalyzers: 브랜치 정보 포함 시 10개", () => {
  const commits = makeCommits(5);
  const branchInfo: BranchInfo = {
    total: 3,
    merged: 2,
    unmerged: 1,
    names: ["main", "dev", "feat"],
  };
  const results = runAllAnalyzers({ commits, branchInfo });
  assertEquals(results.length, 10);
  assertEquals(results.map((r) => r.id).includes("branch"), true);
});

Deno.test("runAllAnalyzers: reflog 전달", () => {
  const commits = makeCommits(5);
  const reflogEntries = ["forced-update", "commit: something"];
  const results = runAllAnalyzers({ commits, reflogEntries });
  const fp = results.find((r) => r.id === "force_push");
  assertExists(fp);
  assertEquals(fp!.value, 1);
});
