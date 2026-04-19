// 로스트 엔진 테스트
import { assertEquals, assertExists } from "@std/assert";
import {
  ALL_TEMPLATES,
  CLOSING_ROASTS,
  generateAllRoasts,
  generateClosingRoast,
  generateRoast,
  interpolate,
  pickTemplate,
} from "../src/roasts/mod.ts";
import type {
  AnalysisResult,
  AnalyzerId,
  RoastTemplate,
  Severity,
} from "../src/types.ts";

// ============================================================
// 템플릿 수량 검증
// ============================================================
Deno.test("templates: 총 200개 이상의 템플릿", () => {
  assertEquals(
    ALL_TEMPLATES.length >= 200,
    true,
    `템플릿 수: ${ALL_TEMPLATES.length}`,
  );
});

Deno.test("templates: 클로징 50개 이상", () => {
  assertEquals(
    CLOSING_ROASTS.length >= 50,
    true,
    `클로징 수: ${CLOSING_ROASTS.length}`,
  );
});

Deno.test("templates: 각 (id, severity) 조합에 5개씩", () => {
  const ids: AnalyzerId[] = [
    "commit_message",
    "time_pattern",
    "file_churn",
    "commit_size",
    "streak",
    "contributor",
    "force_push",
    "commit_frequency",
    "language",
    "branch",
  ];
  const severities: Severity[] = ["mild", "medium", "savage", "legendary"];

  for (const id of ids) {
    for (const severity of severities) {
      const count = ALL_TEMPLATES.filter(
        (t) => t.id === id && t.severity === severity,
      ).length;
      assertEquals(
        count >= 5,
        true,
        `${id}/${severity}: ${count}개 (5개 이상 필요)`,
      );
    }
  }
});

// ============================================================
// interpolate 테스트
// ============================================================
Deno.test("interpolate: 기본 변수 치환", () => {
  const result = interpolate("총 {total}개 중 {fixCount}개가 fix", {
    total: 100,
    fixCount: 30,
  });
  assertEquals(result, "총 100개 중 30개가 fix");
});

Deno.test("interpolate: 변수 없는 경우", () => {
  const result = interpolate("변수가 없는 문장", {});
  assertEquals(result, "변수가 없는 문장");
});

Deno.test("interpolate: 매칭 안 되는 변수 원본 유지", () => {
  const result = interpolate("{known}과 {unknown}", { known: "알려진" });
  assertEquals(result, "알려진과 {unknown}");
});

Deno.test("interpolate: 문자열 값 치환", () => {
  const result = interpolate("파일: {filename}", { filename: "main.ts" });
  assertEquals(result, "파일: main.ts");
});

Deno.test("interpolate: 여러 같은 변수", () => {
  const result = interpolate("{x}와 {x}", { x: "hello" });
  assertEquals(result, "hello와 hello");
});

// ============================================================
// pickTemplate 테스트
// ============================================================
Deno.test("pickTemplate: 일치하는 템플릿 반환", () => {
  const template = pickTemplate("commit_message", "mild");
  assertExists(template);
  assertEquals(template!.id, "commit_message");
  assertEquals(template!.severity, "mild");
});

Deno.test("pickTemplate: 커스텀 템플릿 목록", () => {
  const custom: RoastTemplate[] = [
    { id: "streak", severity: "savage", template: "custom {longestGap}일" },
  ];
  const result = pickTemplate("streak", "savage", custom);
  assertExists(result);
  assertEquals(result!.template, "custom {longestGap}일");
});

Deno.test("pickTemplate: 일치 없으면 null", () => {
  const custom: RoastTemplate[] = [
    { id: "streak", severity: "mild", template: "test" },
  ];
  const result = pickTemplate("streak", "legendary", custom);
  assertEquals(result, null);
});

// ============================================================
// generateRoast 테스트
// ============================================================
Deno.test("generateRoast: 로스트 문장 생성", () => {
  const result: AnalysisResult = {
    id: "commit_message",
    severity: "legendary",
    value: 60,
    detail: "test",
    extras: {
      total: 100,
      fixCount: 60,
      fixRatio: 60,
      shortest: 3,
      longest: 50,
      avgLength: 10,
      shortestMsg: "fix",
    },
  };
  const roast = generateRoast(result);
  assertExists(roast);
  // 변수가 치환되었는지 확인 (raw {변수} 없어야 함)
  assertEquals(roast!.includes("{total}"), false);
  assertEquals(roast!.includes("{fixCount}"), false);
});

Deno.test("generateRoast: extras 없으면 변수 원본 유지", () => {
  const templates: RoastTemplate[] = [
    { id: "streak", severity: "mild", template: "공백 {longestGap}일" },
  ];
  const result: AnalysisResult = {
    id: "streak",
    severity: "mild",
    value: 5,
    detail: "test",
    // extras 없음
  };
  const roast = generateRoast(result, templates);
  assertExists(roast);
  assertEquals(roast, "공백 {longestGap}일"); // extras 없으므로 원본
});

// ============================================================
// generateAllRoasts 테스트
// ============================================================
Deno.test("generateAllRoasts: 여러 결과에 대해 로스트 생성", () => {
  const results: AnalysisResult[] = [
    {
      id: "commit_message",
      severity: "mild",
      value: 15,
      detail: "test",
      extras: {
        total: 100,
        fixCount: 15,
        fixRatio: 15,
        shortest: 3,
        longest: 50,
        avgLength: 10,
        shortestMsg: "fix",
      },
    },
    {
      id: "time_pattern",
      severity: "medium",
      value: 20,
      detail: "test",
      extras: {
        total: 100,
        lateNightCount: 20,
        lateNightRatio: 20,
        weekendCount: 10,
        weekendRatio: 10,
      },
    },
  ];

  const roasts = generateAllRoasts(results);
  assertEquals(roasts.length, 2);
  assertEquals(roasts[0].result.id, "commit_message");
  assertEquals(roasts[1].result.id, "time_pattern");
  assertExists(roasts[0].roast);
  assertExists(roasts[1].roast);
});

Deno.test("generateAllRoasts: 빈 결과", () => {
  const roasts = generateAllRoasts([]);
  assertEquals(roasts.length, 0);
});

// ============================================================
// generateClosingRoast 테스트
// ============================================================
Deno.test("generateClosingRoast: savage 0개", () => {
  const results: AnalysisResult[] = [
    { id: "commit_message", severity: "mild", value: 5, detail: "test" },
    { id: "time_pattern", severity: "mild", value: 3, detail: "test" },
  ];
  const closing = generateClosingRoast(results);
  assertExists(closing);
  assertEquals(closing.length > 0, true);
});

Deno.test("generateClosingRoast: savage 3개", () => {
  const results: AnalysisResult[] = [
    { id: "commit_message", severity: "savage", value: 40, detail: "test" },
    { id: "time_pattern", severity: "savage", value: 35, detail: "test" },
    { id: "file_churn", severity: "savage", value: 25, detail: "test" },
    { id: "commit_size", severity: "mild", value: 5, detail: "test" },
  ];
  const closing = generateClosingRoast(results);
  assertExists(closing);
});

Deno.test("generateClosingRoast: legendary 포함", () => {
  const results: AnalysisResult[] = [
    { id: "commit_message", severity: "legendary", value: 60, detail: "test" },
    { id: "time_pattern", severity: "legendary", value: 50, detail: "test" },
    { id: "file_churn", severity: "savage", value: 30, detail: "test" },
    { id: "commit_size", severity: "savage", value: 45, detail: "test" },
    { id: "streak", severity: "savage", value: 100, detail: "test" },
  ];
  const closing = generateClosingRoast(results);
  assertExists(closing);
  assertEquals(closing.length > 0, true);
});

Deno.test("generateClosingRoast: 빈 결과", () => {
  const closing = generateClosingRoast([]);
  assertExists(closing);
});

// ============================================================
// 템플릿 무결성 검증
// ============================================================
Deno.test("templates: 모든 템플릿에 id와 severity가 유효", () => {
  const validIds: AnalyzerId[] = [
    "commit_message",
    "time_pattern",
    "file_churn",
    "commit_size",
    "streak",
    "contributor",
    "force_push",
    "commit_frequency",
    "language",
    "branch",
  ];
  const validSeverities: Severity[] = ["mild", "medium", "savage", "legendary"];

  for (const t of ALL_TEMPLATES) {
    assertEquals(validIds.includes(t.id), true, `Invalid id: ${t.id}`);
    assertEquals(
      validSeverities.includes(t.severity),
      true,
      `Invalid severity: ${t.severity}`,
    );
    assertEquals(t.template.length > 0, true, "Empty template");
  }
});

Deno.test("templates: 클로징에 minSavageCount가 유효", () => {
  for (const c of CLOSING_ROASTS) {
    assertEquals(c.minSavageCount >= 0, true);
    assertEquals(c.template.length > 0, true);
  }
});

Deno.test("templates: 랜덤성 확인 (같은 조건에서 다른 결과 가능)", () => {
  // 여러 번 실행해서 최소 한 번은 다른 결과가 나오는지 확인
  const results = new Set<string>();
  for (let i = 0; i < 20; i++) {
    const t = pickTemplate("commit_message", "mild");
    if (t) results.add(t.template);
  }
  // 5개 변형이 있으므로 20번 중 1종류만 나올 확률은 매우 낮음
  assertEquals(
    results.size > 1,
    true,
    "랜덤성 부족: 항상 같은 템플릿만 선택됨",
  );
});
