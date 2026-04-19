// CLI 파서 테스트
import { assertEquals } from "@std/assert";
import { getHelpText, getVersion, parseCli } from "../src/cli.ts";

Deno.test("parseCli: 기본값", () => {
  const opts = parseCli([]);
  assertEquals(opts.limit, 500);
  assertEquals(opts.noColor, false);
  assertEquals(opts.help, false);
  assertEquals(opts.version, false);
  assertEquals(opts.path, undefined);
  assertEquals(opts.repo, undefined);
  assertEquals(opts.username, undefined);
});

Deno.test("parseCli: --path 옵션", () => {
  const opts = parseCli(["--path", "/some/repo"]);
  assertEquals(opts.path, "/some/repo");
});

Deno.test("parseCli: --repo 옵션", () => {
  const opts = parseCli(["--repo", "owner/repo"]);
  assertEquals(opts.repo, "owner/repo");
});

Deno.test("parseCli: --limit 옵션", () => {
  const opts = parseCli(["--limit", "100"]);
  assertEquals(opts.limit, 100);
});

Deno.test("parseCli: --no-color 옵션", () => {
  const opts = parseCli(["--no-color"]);
  assertEquals(opts.noColor, true);
});

Deno.test("parseCli: --help 옵션", () => {
  const opts = parseCli(["--help"]);
  assertEquals(opts.help, true);
});

Deno.test("parseCli: -h 단축 옵션", () => {
  const opts = parseCli(["-h"]);
  assertEquals(opts.help, true);
});

Deno.test("parseCli: --version 옵션", () => {
  const opts = parseCli(["--version"]);
  assertEquals(opts.version, true);
});

Deno.test("parseCli: -v 단축 옵션", () => {
  const opts = parseCli(["-v"]);
  assertEquals(opts.version, true);
});

Deno.test("parseCli: 위치 인자 (username)", () => {
  const opts = parseCli(["myuser"]);
  assertEquals(opts.username, "myuser");
});

Deno.test("parseCli: 복합 옵션", () => {
  const opts = parseCli(["--repo", "a/b", "--limit", "200", "--no-color"]);
  assertEquals(opts.repo, "a/b");
  assertEquals(opts.limit, 200);
  assertEquals(opts.noColor, true);
});

Deno.test("parseCli: 잘못된 limit은 500 기본값", () => {
  const opts = parseCli(["--limit", "abc"]);
  assertEquals(opts.limit, 500);
});

Deno.test("getHelpText: 도움말 텍스트 확인", () => {
  const help = getHelpText();
  assertEquals(help.includes("git-roast"), true);
  assertEquals(help.includes("--path"), true);
  assertEquals(help.includes("--repo"), true);
  assertEquals(help.includes("--limit"), true);
  assertEquals(help.includes("--no-color"), true);
});

Deno.test("getVersion: 버전 문자열", () => {
  const version = getVersion();
  assertEquals(version, "0.1.0");
});
