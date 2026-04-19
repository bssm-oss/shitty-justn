defmodule CommitVibe.GitHubTest do
  use ExUnit.Case, async: false

  alias CommitVibe.GitHub

  import Tesla.Mock

  @sample_commit %{
    "sha" => "abc123",
    "commit" => %{
      "message" => "feat: add new feature",
      "author" => %{
        "name" => "Test User",
        "date" => "2025-03-15T10:30:00Z"
      }
    },
    "author" => %{"login" => "testuser"},
    "html_url" => "https://github.com/owner/repo/commit/abc123"
  }

  @sample_commit_2 %{
    "sha" => "def456",
    "commit" => %{
      "message" => "fix: resolve bug",
      "author" => %{
        "name" => "Another Dev",
        "date" => "2025-03-16T22:15:00Z"
      }
    },
    "author" => %{"login" => "anotherdev"},
    "html_url" => "https://github.com/owner/repo/commit/def456"
  }

  defp link_header(last_page) do
    base = "https://api.github.com/repos/owner/repo/commits"
    "<#{base}?page=2>; rel=\"next\", <#{base}?page=#{last_page}>; rel=\"last\""
  end

  describe "fetch_commits/3" do
    test "parses single page of commits" do
      mock_global(fn
        %{method: :get, url: "https://api.github.com/repos/owner/repo/commits"} ->
          json([@sample_commit, @sample_commit_2])
      end)

      assert {:ok, commits, false} = GitHub.fetch_commits("owner", "repo")
      assert length(commits) == 2

      [first | _] = commits
      assert first.sha == "abc123"
      assert first.message == "feat: add new feature"
      assert first.author == "Test User"
      assert first.author_login == "testuser"
      assert %DateTime{} = first.date
    end

    test "fetches multiple pages in parallel via rel=last" do
      mock_global(fn env ->
        cond do
          # 첫 페이지 — rel="last" 포함
          not (env.query |> Keyword.has_key?(:page)) ->
            %Tesla.Env{
              status: 200,
              headers: [{"link", link_header(2)}],
              body: [@sample_commit]
            }

          # 2페이지
          Keyword.get(env.query, :page) == 2 ->
            json([@sample_commit_2])
        end
      end)

      assert {:ok, commits, false} = GitHub.fetch_commits("owner", "repo")
      assert length(commits) == 2
      assert Enum.at(commits, 0).sha == "abc123"
      assert Enum.at(commits, 1).sha == "def456"
    end

    test "truncates at max_commits and returns truncated: true" do
      mock_global(fn env ->
        cond do
          not (env.query |> Keyword.has_key?(:page)) ->
            %Tesla.Env{
              status: 200,
              headers: [{"link", link_header(5)}],
              body: [@sample_commit]
            }

          true ->
            json([@sample_commit_2])
        end
      end)

      # max_commits=1 → 첫 페이지만 쓰고 truncated
      assert {:ok, commits, true} = GitHub.fetch_commits("owner", "repo", max_commits: 1)
      assert length(commits) == 1
      assert hd(commits).sha == "abc123"
    end

    test "returns :not_found for 404" do
      mock_global(fn
        %{method: :get} ->
          %Tesla.Env{status: 404, body: %{"message" => "Not Found"}}
      end)

      assert {:error, :not_found} = GitHub.fetch_commits("bad", "repo")
    end

    test "returns :forbidden for 403 without rate limit" do
      mock_global(fn
        %{method: :get} ->
          %Tesla.Env{
            status: 403,
            headers: [{"x-ratelimit-remaining", "10"}],
            body: %{"message" => "Forbidden"}
          }
      end)

      assert {:error, :forbidden} = GitHub.fetch_commits("private", "repo")
    end

    test "handles empty commit list" do
      mock_global(fn
        %{method: :get} -> json([])
      end)

      assert {:ok, [], false} = GitHub.fetch_commits("owner", "empty-repo")
    end
  end
end
