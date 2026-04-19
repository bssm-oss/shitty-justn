defmodule CommitVibe.GitHub do
  @moduledoc """
  GitHub API client for fetching commit history.
  Uses Tesla with Finch adapter.

  페이지네이션 전략:
  1. 첫 페이지 fetch → Link 헤더에서 마지막 페이지 번호 파악
  2. 나머지 페이지를 Task.async_stream으로 병렬 fetch (max_concurrency: 10)
  3. max_commits(기본 2000) 초과 시 조기 종료
  """

  @behaviour CommitVibe.GitHub.Behaviour

  @base_url "https://api.github.com"
  @per_page 100
  @default_max_commits 2000
  @max_concurrency 10

  defp client do
    token = Application.get_env(:commit_vibe, :github_token)

    headers =
      [
        {"accept", "application/vnd.github+json"},
        {"user-agent", "commit-vibe"},
        {"x-github-api-version", "2022-11-28"}
      ] ++
        if(token, do: [{"authorization", "Bearer #{token}"}], else: [])

    adapter = Application.get_env(:tesla, :adapter, {Tesla.Adapter.Finch, name: CommitVibe.Finch})

    Tesla.client(
      [
        {Tesla.Middleware.BaseUrl, @base_url},
        {Tesla.Middleware.Headers, headers},
        Tesla.Middleware.JSON
      ],
      adapter
    )
  end

  @impl true
  def fetch_commits(owner, repo, opts \\ []) do
    since = Keyword.get(opts, :since)
    until_date = Keyword.get(opts, :until)
    max_commits = Keyword.get(opts, :max_commits, @default_max_commits)

    base_query =
      [per_page: @per_page]
      |> maybe_add(:since, since)
      |> maybe_add(:until, until_date)

    path = "/repos/#{owner}/#{repo}/commits"
    c = client()

    case fetch_page(c, path, base_query) do
      {:ok, first_commits, headers} ->
        case last_page_number(headers) do
          nil ->
            # 단일 페이지
            {:ok, first_commits, false}

          last_page ->
            max_pages = ceil(max_commits / @per_page)
            pages_to_fetch = min(last_page, max_pages)
            truncated = last_page > max_pages

            if pages_to_fetch <= 1 do
              {:ok, first_commits, truncated}
            else
              fetch_remaining_parallel(c, path, base_query, first_commits, 2..pages_to_fetch, max_commits, truncated)
            end
        end

      {:error, reason} ->
        {:error, reason}
    end
  end

  # 단일 페이지 fetch. 성공 시 {commits, headers} 반환.
  defp fetch_page(client, path, query) do
    case Tesla.get(client, path, query: query) do
      {:ok, %Tesla.Env{status: 200, headers: headers, body: body}} ->
        {:ok, parse_commits(body), headers}

      {:ok, %Tesla.Env{status: 403, headers: headers}} ->
        if get_header(headers, "x-ratelimit-remaining") == "0" do
          {:error, :rate_limited}
        else
          {:error, :forbidden}
        end

      {:ok, %Tesla.Env{status: 404}} ->
        {:error, :not_found}

      {:ok, %Tesla.Env{status: status, body: body}} ->
        {:error, {:api_error, status, body}}

      {:error, reason} ->
        {:error, {:request_failed, reason}}
    end
  end

  # 2..N 페이지를 병렬로 fetch하고 순서대로 합친다.
  defp fetch_remaining_parallel(client, path, base_query, first_commits, page_range, max_commits, truncated) do
    results =
      Task.async_stream(
        page_range,
        fn page -> fetch_page(client, path, Keyword.put(base_query, :page, page)) end,
        max_concurrency: @max_concurrency,
        timeout: 30_000,
        on_timeout: :kill_task
      )

    case collect_results(results, first_commits) do
      {:ok, all} -> {:ok, Enum.take(all, max_commits), truncated}
      {:error, reason} -> {:error, reason}
    end
  end

  # async_stream 결과를 순서대로 누적. 하나라도 실패하면 중단.
  defp collect_results(stream, initial) do
    Enum.reduce_while(stream, {:ok, initial}, fn
      {:ok, {:ok, commits, _headers}}, {:ok, acc} ->
        {:cont, {:ok, acc ++ commits}}

      {:ok, {:error, reason}}, _ ->
        {:halt, {:error, reason}}

      {:exit, reason}, _ ->
        {:halt, {:error, {:task_failed, reason}}}
    end)
  end

  defp parse_commits(body) when is_list(body) do
    Enum.map(body, fn commit ->
      %{
        sha: commit["sha"],
        message: get_in(commit, ["commit", "message"]) || "",
        author: get_in(commit, ["commit", "author", "name"]) || "unknown",
        author_login: get_in(commit, ["author", "login"]),
        date: parse_date(get_in(commit, ["commit", "author", "date"])),
        url: commit["html_url"]
      }
    end)
  end

  defp parse_commits(_), do: []

  defp parse_date(nil), do: nil

  defp parse_date(date_string) do
    case DateTime.from_iso8601(date_string) do
      {:ok, dt, _offset} -> dt
      _ -> nil
    end
  end

  # Link 헤더에서 rel="last" 페이지 번호 추출
  defp last_page_number(headers) do
    case get_header(headers, "link") do
      nil ->
        nil

      link ->
        case Regex.run(~r/<[^>]+[?&]page=(\d+)[^>]*>;\s*rel="last"/, link) do
          [_, n] -> String.to_integer(n)
          _ -> nil
        end
    end
  end

  defp get_header(headers, name) do
    headers
    |> Enum.find(fn {k, _v} -> String.downcase(k) == name end)
    |> case do
      {_, value} -> value
      nil -> nil
    end
  end

  defp maybe_add(query, _key, nil), do: query
  defp maybe_add(query, key, value), do: Keyword.put(query, key, value)
end
