// 언어/파일 확장자 분석기
import type { AnalysisResult, CommitData, Severity } from "../types.ts";

/** 설정 파일 확장자 패턴 */
const CONFIG_EXTENSIONS = new Set([
  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".ini",
  ".cfg",
  ".conf",
  ".env",
  ".xml",
  ".lock",
  ".config",
]);

/** 파일 확장자 분포 분석 */
export function analyzeLanguage(commits: CommitData[]): AnalysisResult {
  // 전체 파일에서 확장자 추출
  const extCounts = new Map<string, number>();
  let configCount = 0;
  let totalFiles = 0;

  for (const commit of commits) {
    for (const file of commit.filesChanged) {
      totalFiles++;
      const ext = getExtension(file);
      extCounts.set(ext, (extCounts.get(ext) || 0) + 1);

      if (
        CONFIG_EXTENSIONS.has(ext) || file.includes("config") ||
        file.includes("rc.")
      ) {
        configCount++;
      }
    }
  }

  if (totalFiles === 0) {
    return {
      id: "language",
      severity: "mild",
      value: 0,
      detail: "파일 정보가 없습니다.",
      extras: {
        topLang: "없음",
        topLangRatio: 0,
        configRatio: 0,
        langCount: 0,
        totalFiles: 0,
      },
    };
  }

  // 가장 많이 사용된 확장자
  let topLang = "";
  let topCount = 0;
  for (const [ext, count] of extCounts) {
    if (count > topCount) {
      topCount = count;
      topLang = ext || "(확장자 없음)";
    }
  }

  const topLangRatio = (topCount / totalFiles) * 100;
  const configRatio = (configCount / totalFiles) * 100;
  const langCount = extCounts.size;

  const severity = getSeverity(configRatio, langCount);

  return {
    id: "language",
    severity,
    value: configRatio,
    detail: `주력 언어: ${topLang} (${
      topLangRatio.toFixed(1)
    }%), 설정 파일 비율: ${configRatio.toFixed(1)}%, 확장자 ${langCount}종`,
    extras: {
      topLang,
      topLangRatio: Math.round(topLangRatio),
      configRatio: Math.round(configRatio),
      langCount,
      totalFiles,
    },
  };
}

/** 파일 경로에서 확장자 추출 */
function getExtension(filepath: string): string {
  const parts = filepath.split("/");
  const filename = parts[parts.length - 1];
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex <= 0) return "";
  return filename.slice(dotIndex).toLowerCase();
}

function getSeverity(configRatio: number, langCount: number): Severity {
  // 설정 파일 비율이 높으면 로스팅
  if (configRatio >= 40 || langCount >= 15) return "legendary";
  if (configRatio >= 25 || langCount >= 10) return "savage";
  if (configRatio >= 15 || langCount >= 7) return "medium";
  if (configRatio >= 5) return "mild";
  return "mild";
}
