defmodule CommitVibeWeb.OgImageController do
  use CommitVibeWeb, :controller

  alias CommitVibe.OgImage

  def show(conn, %{"owner" => owner, "repo" => repo}) do
    repo_name = "#{owner}/#{repo}"

    case :ets.lookup(:commit_vibe_cache, repo_name) do
      [{_, %{timeline: timeline}}] ->
        svg = OgImage.generate_svg(timeline)

        conn
        |> put_resp_content_type("image/svg+xml")
        |> put_resp_header("cache-control", "public, max-age=3600")
        |> send_resp(200, svg)

      _ ->
        svg = OgImage.generate_svg(%{
          repo: repo_name,
          overall_vibe: "아직 분석되지 않은 리포",
          volatility: 0.0,
          total_commits: 0,
          weeks: [],
          period: {nil, nil}
        })

        conn
        |> put_resp_content_type("image/svg+xml")
        |> send_resp(200, svg)
    end
  end
end
