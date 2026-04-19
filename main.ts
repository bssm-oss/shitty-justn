// git-roast 메인 엔트리포인트
import { getHelpText, getVersion, parseCli } from "./src/cli.ts";
import { createCollector } from "./src/collectors/mod.ts";
import { runAllAnalyzers } from "./src/analyzers/mod.ts";
import { generateAllRoasts, generateClosingRoast } from "./src/roasts/mod.ts";
import { formatOutput } from "./src/formatter.ts";
import type { BranchInfo } from "./src/types.ts";

async function main() {
  const options = parseCli(Deno.args);

  // 도움말
  if (options.help) {
    console.log(getHelpText());
    Deno.exit(0);
  }

  // 버전
  if (options.version) {
    console.log(`git-roast v${getVersion()}`);
    Deno.exit(0);
  }

  try {
    // 컬렉터 생성
    const collector = createCollector(options);
    const name = collector.getName();

    // 커밋 수집
    console.error(`${name} 분석 중...`);
    const commits = await collector.collect(options.limit);

    if (commits.length === 0) {
      console.error("커밋을 찾을 수 없습니다.");
      Deno.exit(1);
    }

    // 추가 데이터 수집
    let reflogEntries: string[] = [];
    let branchInfo: BranchInfo | undefined;

    if (collector.getReflog) {
      try {
        reflogEntries = await collector.getReflog();
      } catch {
        // reflog 실패해도 계속 진행
      }
    }

    if (collector.getBranches) {
      try {
        branchInfo = await collector.getBranches();
      } catch {
        // 브랜치 정보 실패해도 계속 진행
      }
    }

    // 분석 실행
    const results = runAllAnalyzers({ commits, reflogEntries, branchInfo });

    // 로스트 생성
    const roasts = generateAllRoasts(results);
    const closing = generateClosingRoast(results);

    // 출력
    const output = formatOutput(name, roasts, closing, options.noColor);
    console.log(output);
  } catch (error) {
    console.error(`에러: ${error instanceof Error ? error.message : error}`);
    Deno.exit(1);
  }
}

main();
