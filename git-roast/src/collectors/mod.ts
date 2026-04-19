// 컬렉터 모듈 — 데이터 수집 팩토리
import type { CliOptions, Collector } from "../types.ts";
import { LocalCollector } from "./local.ts";
import { GitHubCollector } from "./github.ts";

/** CLI 옵션에 따라 적절한 컬렉터 생성 */
export function createCollector(options: CliOptions): Collector {
  // GitHub 리포 지정
  if (options.repo) {
    return new GitHubCollector(options.repo);
  }

  // GitHub 유저 지정
  if (options.username) {
    return new GitHubCollector(options.username);
  }

  // 로컬 리포 (기본)
  const repoPath = options.path || Deno.cwd();
  return new LocalCollector(repoPath);
}

export { LocalCollector } from "./local.ts";
export { GitHubCollector } from "./github.ts";
