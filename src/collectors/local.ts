// 로컬 git 리포 컬렉터
import type { BranchInfo, Collector, CommitData } from "../types.ts";

const COMMIT_SEP = "---COMMIT_SEP---";

/** 로컬 git 리포에서 커밋 데이터를 수집 */
export class LocalCollector implements Collector {
  constructor(private repoPath: string) {}

  getName(): string {
    // 리포 디렉토리 이름 반환
    const parts = this.repoPath.replace(/\/+$/, "").split("/");
    return parts[parts.length - 1] || "unknown";
  }

  async collect(limit: number): Promise<CommitData[]> {
    const format = `${COMMIT_SEP}%n%H%n%s%n%aI%n%an`;
    const cmd = new Deno.Command("git", {
      args: [
        "log",
        `--format=${format}`,
        "--numstat",
        `-n`,
        String(limit),
      ],
      cwd: this.repoPath,
      stdout: "piped",
      stderr: "piped",
    });

    const output = await cmd.output();
    if (!output.success) {
      const errMsg = new TextDecoder().decode(output.stderr);
      throw new Error(`git log 실패: ${errMsg}`);
    }

    const text = new TextDecoder().decode(output.stdout);
    return parseGitLog(text);
  }

  async getBranches(): Promise<BranchInfo> {
    // 전체 브랜치 목록
    const allCmd = new Deno.Command("git", {
      args: ["branch", "-a"],
      cwd: this.repoPath,
      stdout: "piped",
      stderr: "piped",
    });
    const allOutput = await allCmd.output();
    const allText = new TextDecoder().decode(allOutput.stdout);
    const allNames = allText
      .split("\n")
      .map((l) => l.replace(/^\*?\s+/, "").trim())
      .filter((l) => l.length > 0);

    // 머지된 브랜치
    const mergedCmd = new Deno.Command("git", {
      args: ["branch", "--merged"],
      cwd: this.repoPath,
      stdout: "piped",
      stderr: "piped",
    });
    const mergedOutput = await mergedCmd.output();
    const mergedText = new TextDecoder().decode(mergedOutput.stdout);
    const mergedNames = mergedText
      .split("\n")
      .map((l) => l.replace(/^\*?\s+/, "").trim())
      .filter((l) => l.length > 0);

    return {
      total: allNames.length,
      merged: mergedNames.length,
      unmerged: allNames.length - mergedNames.length,
      names: allNames,
    };
  }

  async getReflog(): Promise<string[]> {
    const cmd = new Deno.Command("git", {
      args: ["reflog", "--format=%gs"],
      cwd: this.repoPath,
      stdout: "piped",
      stderr: "piped",
    });
    const output = await cmd.output();
    const text = new TextDecoder().decode(output.stdout);
    return text.split("\n").filter((l) => l.trim().length > 0);
  }
}

/** git log 출력을 파싱해서 CommitData 배열 반환 */
export function parseGitLog(text: string): CommitData[] {
  const blocks = text.split(COMMIT_SEP).filter((b) => b.trim().length > 0);
  const commits: CommitData[] = [];

  for (const block of blocks) {
    const lines = block.split("\n").filter((l) => l !== "");
    if (lines.length < 4) continue;

    const hash = lines[0].trim();
    const message = lines[1].trim();
    const dateStr = lines[2].trim();
    const author = lines[3].trim();

    // numstat 파싱: insertions\tdeletions\tfilename
    const filesChanged: string[] = [];
    let insertions = 0;
    let deletions = 0;

    for (let i = 4; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const parts = line.split("\t");
      if (parts.length >= 3) {
        const ins = parseInt(parts[0], 10) || 0;
        const del = parseInt(parts[1], 10) || 0;
        insertions += ins;
        deletions += del;
        filesChanged.push(parts[2]);
      }
    }

    commits.push({
      hash,
      message,
      authorDate: new Date(dateStr),
      filesChanged,
      insertions,
      deletions,
      author,
    });
  }

  return commits;
}
