// ANSI 컬러 출력 포맷터
import type { AnalysisResult, Severity } from "./types.ts";

// ANSI 이스케이프 코드
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

// 심각도별 색상
const COLORS: Record<Severity, string> = {
  mild: "\x1b[33m", // yellow
  medium: "\x1b[93m", // bright yellow (orange-ish)
  savage: "\x1b[31m", // red
  legendary: "\x1b[35m", // magenta
};

// 심각도별 이모지/마크
const SEVERITY_MARKS: Record<Severity, string> = {
  mild: "~",
  medium: "!",
  savage: "!!",
  legendary: "!!!",
};

/** 색상 적용된 텍스트 반환 */
export function colorize(
  text: string,
  severity: Severity,
  noColor: boolean,
): string {
  if (noColor) return text;
  const color = COLORS[severity];
  if (severity === "legendary") {
    return `${color}${BOLD}${text}${RESET}`;
  }
  return `${color}${text}${RESET}`;
}

/** 헤더 포맷 */
export function formatHeader(name: string, noColor: boolean): string {
  const line = "═".repeat(50);
  const header = `\n${line}\n  git-roast: ${name}\n${line}\n`;
  if (noColor) return header;
  return `${BOLD}${header}${RESET}`;
}

/** 개별 로스트 라인 포맷 */
export function formatRoastLine(
  roast: string,
  result: AnalysisResult,
  noColor: boolean,
): string {
  const mark = SEVERITY_MARKS[result.severity];
  const prefix = `[${mark}]`;
  const line = `  ${prefix} ${roast}`;
  return colorize(line, result.severity, noColor);
}

/** 클로징 로스트 포맷 */
export function formatClosing(closing: string, noColor: boolean): string {
  const line = "─".repeat(50);
  const formatted = `\n${line}\n  ${closing}\n${line}\n`;
  if (noColor) return formatted;
  return `${DIM}${formatted}${RESET}`;
}

/** 통계 요약 포맷 */
export function formatStats(
  results: AnalysisResult[],
  noColor: boolean,
): string {
  const counts: Record<Severity, number> = {
    mild: 0,
    medium: 0,
    savage: 0,
    legendary: 0,
  };

  for (const r of results) {
    counts[r.severity]++;
  }

  const parts = [
    `mild: ${counts.mild}`,
    `medium: ${counts.medium}`,
    `savage: ${counts.savage}`,
    `legendary: ${counts.legendary}`,
  ];

  const text = `  심각도 분포: ${parts.join(" | ")}`;
  if (noColor) return text;
  return `${DIM}${text}${RESET}`;
}

/** 전체 출력 포맷팅 */
export function formatOutput(
  name: string,
  roasts: Array<{ result: AnalysisResult; roast: string }>,
  closing: string,
  noColor: boolean,
): string {
  const lines: string[] = [];

  lines.push(formatHeader(name, noColor));

  for (const { result, roast } of roasts) {
    lines.push(formatRoastLine(roast, result, noColor));
  }

  lines.push("");
  lines.push(formatStats(roasts.map((r) => r.result), noColor));
  lines.push(formatClosing(closing, noColor));

  return lines.join("\n");
}
