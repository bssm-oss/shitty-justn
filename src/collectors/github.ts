// GitHub REST API 컬렉터
import type { BranchInfo, Collector, CommitData } from "../types.ts";

const GITHUB_API = "https://api.github.com";

/** GitHub REST API에서 커밋 데이터를 수집 */
export class GitHubCollector implements Collector {
  private owner: string;
  private repo: string;
  private isUser: boolean;

  constructor(target: string) {
    if (target.includes("/")) {
      // owner/repo 형태
      const [owner, repo] = target.split("/");
      this.owner = owner;
      this.repo = repo;
      this.isUser = false;
    } else {
      // username 형태 — 유저의 가장 최근 리포를 분석
      this.owner = target;
      this.repo = "";
      this.isUser = true;
    }
  }

  getName(): string {
    return this.isUser ? this.owner : `${this.owner}/${this.repo}`;
  }

  async collect(limit: number): Promise<CommitData[]> {
    const token = Deno.env.get("GITHUB_TOKEN") || "";
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "git-roast",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // 유저 모드: 최근 리포 찾기
    if (this.isUser && !this.repo) {
      const reposUrl =
        `${GITHUB_API}/users/${this.owner}/repos?sort=pushed&per_page=1`;
      const reposRes = await fetch(reposUrl, { headers });
      if (!reposRes.ok) {
        throw new Error(
          `GitHub API 에러 (repos): ${reposRes.status} ${reposRes.statusText}`,
        );
      }
      const repos = await reposRes.json();
      if (repos.length === 0) {
        throw new Error(`${this.owner}의 공개 리포를 찾을 수 없습니다.`);
      }
      this.repo = repos[0].name;
    }

    // 커밋 수집 (페이지네이션)
    const commits: CommitData[] = [];
    const perPage = Math.min(limit, 100);
    let page = 1;

    while (commits.length < limit) {
      const url =
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/commits?per_page=${perPage}&page=${page}`;
      const res = await fetch(url, { headers });

      if (!res.ok) {
        if (res.status === 409) {
          // 빈 리포
          return [];
        }
        throw new Error(
          `GitHub API 에러: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) break;

      for (const item of data) {
        if (commits.length >= limit) break;

        // 개별 커밋 상세 정보 (파일 변경 사항)
        let filesChanged: string[] = [];
        let insertions = 0;
        let deletions = 0;

        try {
          const detailUrl =
            `${GITHUB_API}/repos/${this.owner}/${this.repo}/commits/${item.sha}`;
          const detailRes = await fetch(detailUrl, { headers });
          if (detailRes.ok) {
            const detail = await detailRes.json();
            if (detail.files) {
              filesChanged = detail.files.map((f: { filename: string }) =>
                f.filename
              );
              insertions = detail.stats?.additions || 0;
              deletions = detail.stats?.deletions || 0;
            }
          }
        } catch {
          // 상세 정보 실패해도 기본 정보는 유지
        }

        commits.push({
          hash: item.sha,
          message: item.commit?.message?.split("\n")[0] || "",
          authorDate: new Date(item.commit?.author?.date || Date.now()),
          filesChanged,
          insertions,
          deletions,
          author: item.commit?.author?.name || item.author?.login || "unknown",
        });
      }

      page++;
      if (data.length < perPage) break;
    }

    return commits;
  }

  async getBranches(): Promise<BranchInfo> {
    const token = Deno.env.get("GITHUB_TOKEN") || "";
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "git-roast",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const url =
      `${GITHUB_API}/repos/${this.owner}/${this.repo}/branches?per_page=100`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      return { total: 0, merged: 0, unmerged: 0, names: [] };
    }

    const branches = await res.json();
    const names = branches.map((b: { name: string }) => b.name);

    return {
      total: names.length,
      merged: 0, // GitHub API에서는 정확한 머지 상태 판별이 복잡
      unmerged: names.length,
      names,
    };
  }

  getReflog(): Promise<string[]> {
    // GitHub에서는 reflog 접근 불가
    return Promise.resolve([]);
  }
}
