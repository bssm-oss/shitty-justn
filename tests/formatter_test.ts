// 포맷터 테스트
import { assertEquals } from "@std/assert";
import {
  colorize,
  formatClosing,
  formatHeader,
  formatOutput,
  formatRoastLine,
  formatStats,
} from "../src/formatter.ts";
import type { AnalysisResult } from "../src/types.ts";

// ============================================================
// colorize 테스트
// ============================================================
Deno.test("colorize: noColor=true일 때 원본 반환", () => {
  const result = colorize("hello", "mild", true);
  assertEquals(result, "hello");
});

Deno.test("colorize: noColor=false일 때 ANSI 코드 포함", () => {
  const result = colorize("hello", "mild", false);
  assertEquals(result.includes("\x1b["), true);
  assertEquals(result.includes("hello"), true);
  assertEquals(result.includes("\x1b[0m"), true); // RESET
});

Deno.test("colorize: mild -> yellow", () => {
  const result = colorize("test", "mild", false);
  assertEquals(result.includes("\x1b[33m"), true);
});

Deno.test("colorize: savage -> red", () => {
  const result = colorize("test", "savage", false);
  assertEquals(result.includes("\x1b[31m"), true);
});

Deno.test("colorize: legendary -> magenta + bold", () => {
  const result = colorize("test", "legendary", false);
  assertEquals(result.includes("\x1b[35m"), true);
  assertEquals(result.includes("\x1b[1m"), true);
});

Deno.test("colorize: medium -> bright yellow", () => {
  const result = colorize("test", "medium", false);
  assertEquals(result.includes("\x1b[93m"), true);
});

// ============================================================
// formatHeader 테스트
// ============================================================
Deno.test("formatHeader: 이름 포함", () => {
  const result = formatHeader("my-repo", true);
  assertEquals(result.includes("my-repo"), true);
  assertEquals(result.includes("git-roast"), true);
});

Deno.test("formatHeader: noColor=false일 때 ANSI 포함", () => {
  const result = formatHeader("test", false);
  assertEquals(result.includes("\x1b["), true);
});

Deno.test("formatHeader: noColor=true일 때 ANSI 없음", () => {
  const result = formatHeader("test", true);
  assertEquals(result.includes("\x1b["), false);
});

// ============================================================
// formatRoastLine 테스트
// ============================================================
Deno.test("formatRoastLine: 심각도 마크 표시", () => {
  const result: AnalysisResult = {
    id: "commit_message",
    severity: "savage",
    value: 40,
    detail: "test",
  };
  const line = formatRoastLine("로스트 문장", result, true);
  assertEquals(line.includes("[!!]"), true);
  assertEquals(line.includes("로스트 문장"), true);
});

Deno.test("formatRoastLine: mild 마크", () => {
  const result: AnalysisResult = {
    id: "commit_message",
    severity: "mild",
    value: 10,
    detail: "test",
  };
  const line = formatRoastLine("가벼운 농담", result, true);
  assertEquals(line.includes("[~]"), true);
});

Deno.test("formatRoastLine: legendary 마크", () => {
  const result: AnalysisResult = {
    id: "commit_message",
    severity: "legendary",
    value: 60,
    detail: "test",
  };
  const line = formatRoastLine("전설급", result, true);
  assertEquals(line.includes("[!!!]"), true);
});

Deno.test("formatRoastLine: medium 마크", () => {
  const result: AnalysisResult = {
    id: "streak",
    severity: "medium",
    value: 20,
    detail: "test",
  };
  const line = formatRoastLine("중간", result, true);
  assertEquals(line.includes("[!]"), true);
});

// ============================================================
// formatClosing 테스트
// ============================================================
Deno.test("formatClosing: 텍스트 포함", () => {
  const result = formatClosing("마무리 로스트", true);
  assertEquals(result.includes("마무리 로스트"), true);
  assertEquals(result.includes("─"), true);
});

Deno.test("formatClosing: noColor 적용", () => {
  const colored = formatClosing("test", false);
  const plain = formatClosing("test", true);
  assertNotEquals(colored, plain);
});

function assertNotEquals(a: string, b: string) {
  if (a === b) throw new Error("Expected values to be different");
}

// ============================================================
// formatStats 테스트
// ============================================================
Deno.test("formatStats: 심각도 분포 표시", () => {
  const results: AnalysisResult[] = [
    { id: "commit_message", severity: "mild", value: 5, detail: "" },
    { id: "time_pattern", severity: "mild", value: 3, detail: "" },
    { id: "file_churn", severity: "savage", value: 25, detail: "" },
    { id: "commit_size", severity: "legendary", value: 70, detail: "" },
  ];
  const stats = formatStats(results, true);
  assertEquals(stats.includes("mild: 2"), true);
  assertEquals(stats.includes("savage: 1"), true);
  assertEquals(stats.includes("legendary: 1"), true);
  assertEquals(stats.includes("medium: 0"), true);
});

// ============================================================
// formatOutput 전체 통합 테스트
// ============================================================
Deno.test("formatOutput: 전체 출력 포맷", () => {
  const roasts = [
    {
      result: {
        id: "commit_message" as const,
        severity: "mild" as const,
        value: 15,
        detail: "test",
      },
      roast: "커밋 100개 중 15개가 fix",
    },
    {
      result: {
        id: "time_pattern" as const,
        severity: "savage" as const,
        value: 35,
        detail: "test",
      },
      roast: "새벽 커밋 35%",
    },
  ];

  const output = formatOutput("test-repo", roasts, "마무리!", true);
  assertEquals(output.includes("test-repo"), true);
  assertEquals(output.includes("커밋 100개 중 15개가 fix"), true);
  assertEquals(output.includes("새벽 커밋 35%"), true);
  assertEquals(output.includes("마무리!"), true);
  assertEquals(output.includes("심각도 분포"), true);
});

Deno.test("formatOutput: 빈 로스트", () => {
  const output = formatOutput("empty-repo", [], "없음", true);
  assertEquals(output.includes("empty-repo"), true);
  assertEquals(output.includes("없음"), true);
});

Deno.test("formatOutput: noColor=false일 때 ANSI 포함", () => {
  const roasts = [
    {
      result: {
        id: "commit_message" as const,
        severity: "legendary" as const,
        value: 60,
        detail: "test",
      },
      roast: "전설",
    },
  ];

  const output = formatOutput("repo", roasts, "끝", false);
  assertEquals(output.includes("\x1b["), true);
});
