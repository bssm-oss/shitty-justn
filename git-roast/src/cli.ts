// CLI 인자 파싱
import { parseArgs } from "@std/cli/parse-args";
import type { CliOptions } from "./types.ts";

const VERSION = "0.1.0";

const HELP_TEXT = `
git-roast v${VERSION}
커밋 히스토리를 분석해서 개발자를 로스팅하는 CLI 🔥

사용법:
  git-roast                       현재 디렉토리의 git 리포 분석
  git-roast --path /some/repo     특정 경로의 git 리포 분석
  git-roast <username>            GitHub 유저 분석
  git-roast --repo owner/repo     GitHub 리포 분석

옵션:
  --path <path>       분석할 로컬 git 리포 경로
  --repo <owner/repo> GitHub 리포 지정
  --limit <n>         분석할 최대 커밋 수 (기본: 500)
  --no-color          ANSI 색상 비활성화
  --help, -h          도움말 출력
  --version, -v       버전 출력
`.trim();

/** CLI 인자를 파싱해서 CliOptions 반환 */
export function parseCli(args: string[]): CliOptions {
  const parsed = parseArgs(args, {
    string: ["path", "repo", "limit"],
    boolean: ["no-color", "help", "version"],
    alias: {
      h: "help",
      v: "version",
    },
    default: {
      limit: "500",
      "no-color": false,
    },
  });

  // 위치 인자: username
  const positional = parsed._ as string[];
  const username = positional.length > 0 ? String(positional[0]) : undefined;

  return {
    path: parsed.path as string | undefined,
    username,
    repo: parsed.repo as string | undefined,
    limit: parseInt(parsed.limit as string, 10) || 500,
    noColor: parsed["no-color"] as boolean,
    help: parsed.help as boolean,
    version: parsed.version as boolean,
  };
}

/** 도움말 텍스트 반환 */
export function getHelpText(): string {
  return HELP_TEXT;
}

/** 버전 문자열 반환 */
export function getVersion(): string {
  return VERSION;
}
