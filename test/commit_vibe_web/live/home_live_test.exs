defmodule CommitVibeWeb.HomeLiveTest do
  use CommitVibeWeb.ConnCase, async: false

  import Phoenix.LiveViewTest
  import Tesla.Mock

  describe "HomeLive" do
    test "renders landing page", %{conn: conn} do
      {:ok, view, html} = live(conn, ~p"/")
      assert html =~ "commit-vibe"
      assert html =~ "커밋 메시지로 프로젝트 감정 타임라인을 그려보세요"
      assert has_element?(view, "input[name=url]")
      assert has_element?(view, "button", "분석하기")
    end

    test "validates URL input", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/")

      html =
        view
        |> element("form")
        |> render_change(%{url: "hello world"})

      refute html =~ "올바른 GitHub 리포 URL"
    end

    test "shows error for invalid URL on submit", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/")

      html =
        view
        |> element("form")
        |> render_submit(%{url: "not-a-repo-url"})

      assert html =~ "올바른 GitHub 리포 URL을 입력해주세요"
    end

    test "shows loading state on valid submit", %{conn: conn} do
      mock_global(fn
        %{method: :get} ->
          # Slow response to keep loading state visible
          Process.sleep(100)
          %Tesla.Env{status: 200, body: [], headers: []}
      end)

      {:ok, view, _html} = live(conn, ~p"/")

      html =
        view
        |> element("form")
        |> render_submit(%{url: "owner/repo"})

      assert html =~ "분석 중"
    end

    test "shows error for non-existent repo", %{conn: conn} do
      mock_global(fn
        %{method: :get} ->
          %Tesla.Env{status: 404, body: %{"message" => "Not Found"}}
      end)

      {:ok, view, _html} = live(conn, ~p"/")

      view
      |> element("form")
      |> render_submit(%{url: "bad/repo"})

      # Wait for async task to complete
      assert render_async(view) =~ "리포를 찾을 수 없어요"
    end

    test "navigates to result on success", %{conn: conn} do
      mock_global(fn
        %{method: :get} ->
          Tesla.Mock.json([
            %{
              "sha" => "abc",
              "commit" => %{
                "message" => "feat: init",
                "author" => %{"name" => "dev", "date" => "2025-03-10T10:00:00Z"}
              },
              "author" => %{"login" => "dev"},
              "html_url" => "https://github.com/owner/repo/commit/abc"
            }
          ])
      end)

      {:ok, view, _html} = live(conn, ~p"/")

      view
      |> element("form")
      |> render_submit(%{url: "owner/repo"})

      # Wait for task and follow navigation
      assert_redirect(view, "/result/owner/repo", 5000)
    end

    test "accepts full GitHub URL", %{conn: conn} do
      mock_global(fn
        %{method: :get} ->
          Tesla.Mock.json([])
      end)

      {:ok, view, _html} = live(conn, ~p"/")

      view
      |> element("form")
      |> render_submit(%{url: "https://github.com/owner/repo"})

      assert_redirect(view, "/result/owner/repo", 5000)
    end
  end
end
