defmodule CommitVibeWeb.ResultLiveTest do
  use CommitVibeWeb.ConnCase, async: false

  import Phoenix.LiveViewTest

  defp build_and_cache(repo_name, commits \\ nil) do
    commits =
      commits ||
        [
          %{
            message: "feat: add login",
            author: "alice",
            author_login: "alice",
            sha: "abc",
            date: ~U[2025-03-10 10:00:00Z],
            url: "https://github.com/#{repo_name}/commit/abc"
          },
          %{
            message: "fix: crash on load",
            author: "bob",
            author_login: "bob",
            sha: "def",
            date: ~U[2025-03-11 22:00:00Z],
            url: "https://github.com/#{repo_name}/commit/def"
          },
          %{
            message: "refactor: clean up utils",
            author: "alice",
            author_login: "alice",
            sha: "ghi",
            date: ~U[2025-03-17 14:00:00Z],
            url: "https://github.com/#{repo_name}/commit/ghi"
          }
        ]

    analyzed = CommitVibe.Analyzer.analyze_commits(commits)
    timeline = CommitVibe.Timeline.build(repo_name, analyzed)
    :ets.insert(:commit_vibe_cache, {repo_name, %{analyzed_commits: analyzed, timeline: timeline}})
    timeline
  end

  describe "ResultLive" do
    test "renders timeline from cache", %{conn: conn} do
      build_and_cache("owner/repo")

      {:ok, _view, html} = live(conn, ~p"/result/owner/repo")

      assert html =~ "owner/repo"
      assert html =~ "감정 타임라인"
      assert html =~ "변동성"
    end

    test "displays vibe summary", %{conn: conn} do
      build_and_cache("test/vibe")

      {:ok, _view, html} = live(conn, ~p"/result/test/vibe")

      assert html =~ "신남" or html =~ "짜증" or html =~ "의욕"
      assert html =~ "커밋 분석"
    end

    test "displays emotion emojis in timeline", %{conn: conn} do
      build_and_cache("test/emoji")

      {:ok, _view, html} = live(conn, ~p"/result/test/emoji")

      assert html =~ "🎉" or html =~ "😤" or html =~ "🔥"
    end

    test "shows week labels", %{conn: conn} do
      build_and_cache("test/weeks")

      {:ok, _view, html} = live(conn, ~p"/result/test/weeks")

      assert html =~ "3월"
      assert html =~ "주"
    end

    test "back link goes to home", %{conn: conn} do
      build_and_cache("test/back")

      {:ok, _view, html} = live(conn, ~p"/result/test/back")

      assert html =~ "돌아가기"
      assert html =~ ~s(href="/")
    end

    test "shows loading when no cache", %{conn: conn} do
      {:ok, _view, html} = live(conn, ~p"/result/nocache/repo")

      assert html =~ "커밋 분석 중"
    end
  end

  describe "기간 필터" do
    test "renders period filter buttons", %{conn: conn} do
      build_and_cache("test/filter")

      {:ok, _view, html} = live(conn, ~p"/result/test/filter")

      assert html =~ "1주"
      assert html =~ "1달"
      assert html =~ "3달"
      assert html =~ "1년"
      assert html =~ "전체"
    end

    test "filter_period event updates timeline", %{conn: conn} do
      # Use recent commits so they pass 1w filter
      now = DateTime.utc_now()

      commits = [
        %{message: "feat: recent", author: "alice", author_login: "alice", sha: "a",
          date: DateTime.add(now, -2 * 86400), url: "url"},
        %{message: "fix: old", author: "bob", author_login: "bob", sha: "b",
          date: ~U[2020-01-01 10:00:00Z], url: "url"}
      ]

      build_and_cache("test/period", commits)

      {:ok, view, _html} = live(conn, ~p"/result/test/period")

      # Initially "all" — both commits
      html = render(view)
      assert html =~ "2"

      # Filter to 1w — only recent commit
      html = render_click(view, "filter_period", %{"period" => "1w"})
      assert html =~ "1"
      assert html =~ "alice"
    end
  end

  describe "기여자별 감정" do
    test "shows contributor chart", %{conn: conn} do
      build_and_cache("test/contrib")

      {:ok, _view, html} = live(conn, ~p"/result/test/contrib")

      assert html =~ "기여자별 감정"
      assert html =~ "alice"
      assert html =~ "bob"
    end

    test "shows commit count per contributor", %{conn: conn} do
      build_and_cache("test/contrib-count")

      {:ok, _view, html} = live(conn, ~p"/result/test/contrib-count")

      assert html =~ "커밋"
    end
  end
end
