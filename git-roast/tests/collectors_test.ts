// 컬렉터 테스트
import { assertEquals, assertExists } from "@std/assert";
import { parseGitLog } from "../src/collectors/local.ts";
import { createCollector } from "../src/collectors/mod.ts";
import { GitHubCollector } from "../src/collectors/github.ts";
import { LocalCollector } from "../src/collectors/local.ts";
import type { CliOptions } from "../src/types.ts";

// ============================================================
// parseGitLog 파서 테스트
// ============================================================
Deno.test("parseGitLog: 정상 파싱", () => {
  const input = `---COMMIT_SEP---
abc123
feat: add login
2024-06-15T14:30:00+09:00
developer1
10\t5\tsrc/login.ts
3\t1\tsrc/auth.ts

---COMMIT_SEP---
def456
fix: typo
2024-06-14T10:00:00+09:00
developer2
1\t1\tREADME.md
`;

  const commits = parseGitLog(input);
  assertEquals(commits.length, 2);

  assertEquals(commits[0].hash, "abc123");
  assertEquals(commits[0].message, "feat: add login");
  assertEquals(commits[0].author, "developer1");
  assertEquals(commits[0].filesChanged.length, 2);
  assertEquals(commits[0].insertions, 13);
  assertEquals(commits[0].deletions, 6);

  assertEquals(commits[1].hash, "def456");
  assertEquals(commits[1].message, "fix: typo");
  assertEquals(commits[1].author, "developer2");
  assertEquals(commits[1].filesChanged, ["README.md"]);
  assertEquals(commits[1].insertions, 1);
  assertEquals(commits[1].deletions, 1);
});

Deno.test("parseGitLog: 빈 입력", () => {
  const commits = parseGitLog("");
  assertEquals(commits.length, 0);
});

Deno.test("parseGitLog: 불완전한 블록 무시", () => {
  const input = `---COMMIT_SEP---
abc
`;
  const commits = parseGitLog(input);
  assertEquals(commits.length, 0);
});

Deno.test("parseGitLog: numstat 없는 커밋", () => {
  const input = `---COMMIT_SEP---
abc123
initial commit
2024-01-01T00:00:00+09:00
dev1
`;
  const commits = parseGitLog(input);
  assertEquals(commits.length, 1);
  assertEquals(commits[0].filesChanged.length, 0);
  assertEquals(commits[0].insertions, 0);
  assertEquals(commits[0].deletions, 0);
});

Deno.test("parseGitLog: 바이너리 파일 (- - filename)", () => {
  const input = `---COMMIT_SEP---
abc123
add image
2024-06-15T14:00:00+09:00
dev1
-\t-\timage.png
5\t0\tsrc/app.ts
`;
  const commits = parseGitLog(input);
  assertEquals(commits.length, 1);
  // 바이너리 파일은 insertions/deletions가 NaN->0
  assertEquals(commits[0].filesChanged.length, 2);
});

Deno.test("parseGitLog: 여러 커밋 순서 유지", () => {
  const input = `---COMMIT_SEP---
hash1
msg1
2024-06-15T10:00:00+09:00
dev1

---COMMIT_SEP---
hash2
msg2
2024-06-15T11:00:00+09:00
dev2

---COMMIT_SEP---
hash3
msg3
2024-06-15T12:00:00+09:00
dev3
`;
  const commits = parseGitLog(input);
  assertEquals(commits.length, 3);
  assertEquals(commits[0].hash, "hash1");
  assertEquals(commits[1].hash, "hash2");
  assertEquals(commits[2].hash, "hash3");
});

// ============================================================
// createCollector 팩토리 테스트
// ============================================================
Deno.test("createCollector: 기본 -> LocalCollector", () => {
  const options: CliOptions = {
    limit: 500,
    noColor: false,
    help: false,
    version: false,
  };
  const collector = createCollector(options);
  assertExists(collector);
  assertEquals(collector instanceof LocalCollector, true);
});

Deno.test("createCollector: path 지정 -> LocalCollector", () => {
  const options: CliOptions = {
    path: "/tmp/some-repo",
    limit: 500,
    noColor: false,
    help: false,
    version: false,
  };
  const collector = createCollector(options);
  assertEquals(collector instanceof LocalCollector, true);
  assertEquals(collector.getName(), "some-repo");
});

Deno.test("createCollector: repo 지정 -> GitHubCollector", () => {
  const options: CliOptions = {
    repo: "owner/repo",
    limit: 500,
    noColor: false,
    help: false,
    version: false,
  };
  const collector = createCollector(options);
  assertEquals(collector instanceof GitHubCollector, true);
  assertEquals(collector.getName(), "owner/repo");
});

Deno.test("createCollector: username 지정 -> GitHubCollector", () => {
  const options: CliOptions = {
    username: "someuser",
    limit: 500,
    noColor: false,
    help: false,
    version: false,
  };
  const collector = createCollector(options);
  assertEquals(collector instanceof GitHubCollector, true);
  assertEquals(collector.getName(), "someuser");
});

// ============================================================
// LocalCollector 이름 추출
// ============================================================
Deno.test("LocalCollector: getName 경로에서 이름 추출", () => {
  const c1 = new LocalCollector("/home/user/projects/my-repo");
  assertEquals(c1.getName(), "my-repo");

  const c2 = new LocalCollector("/home/user/projects/my-repo/");
  assertEquals(c2.getName(), "my-repo");
});

// ============================================================
// GitHubCollector 이름
// ============================================================
Deno.test("GitHubCollector: owner/repo 이름", () => {
  const c = new GitHubCollector("octocat/hello-world");
  assertEquals(c.getName(), "octocat/hello-world");
});

Deno.test("GitHubCollector: username 이름", () => {
  const c = new GitHubCollector("octocat");
  assertEquals(c.getName(), "octocat");
});

Deno.test("GitHubCollector: getReflog은 빈 배열 반환", async () => {
  const c = new GitHubCollector("octocat");
  const reflog = await c.getReflog();
  assertEquals(reflog, []);
});
