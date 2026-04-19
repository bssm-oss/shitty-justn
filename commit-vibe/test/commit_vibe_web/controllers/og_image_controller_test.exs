defmodule CommitVibeWeb.OgImageControllerTest do
  use CommitVibeWeb.ConnCase, async: false

  alias CommitVibe.{Analyzer, Timeline}

  defp cache_timeline(repo_name) do
    commits =
      Analyzer.analyze_commits([
        %{message: "feat: x", date: ~U[2025-03-10 10:00:00Z], author: "dev", sha: "a"}
      ])

    timeline = Timeline.build(repo_name, commits)
    :ets.insert(:commit_vibe_cache, {repo_name, %{analyzed_commits: commits, timeline: timeline}})
  end

  describe "GET /og/:owner/:repo" do
    test "returns SVG for cached repo", %{conn: conn} do
      cache_timeline("og-test/repo")

      conn = get(conn, ~p"/og/og-test/repo")
      assert response_content_type(conn, :xml) =~ "svg"
      assert response(conn, 200) =~ "<svg"
      assert response(conn, 200) =~ "og-test/repo"
    end

    test "returns fallback SVG for uncached repo", %{conn: conn} do
      conn = get(conn, ~p"/og/unknown/repo")
      assert response(conn, 200) =~ "<svg"
      assert response(conn, 200) =~ "unknown/repo"
    end

    test "sets cache-control header for cached repo", %{conn: conn} do
      cache_timeline("og-cache/repo")

      conn = get(conn, ~p"/og/og-cache/repo")
      assert get_resp_header(conn, "cache-control") == ["public, max-age=3600"]
    end
  end
end
