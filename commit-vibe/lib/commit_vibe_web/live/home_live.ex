defmodule CommitVibeWeb.HomeLive do
  use CommitVibeWeb, :live_view

  alias CommitVibe.{GitHub, Analyzer, Timeline}

  @impl true
  def mount(_params, _session, socket) do
    {:ok,
     assign(socket,
       page_title: "commit-vibe",
       url_input: "",
       loading: false,
       error: nil
     )}
  end

  @impl true
  def handle_event("validate", %{"url" => url}, socket) do
    {:noreply, assign(socket, url_input: url, error: nil)}
  end

  @impl true
  def handle_event("analyze", %{"url" => url}, socket) do
    case parse_repo_url(url) do
      {:ok, owner, repo} ->
        self_pid = self()

        Task.start(fn ->
          result =
            try do
              do_analyze(owner, repo)
            rescue
              e ->
                require Logger
                Logger.error("Analysis failed: #{inspect(e)}")
                {:error, :internal}
            end

          send(self_pid, {:analysis_done, owner, repo, result})
        end)

        {:noreply, assign(socket, loading: true, error: nil)}

      :error ->
        {:noreply,
         assign(socket,
           error: "올바른 GitHub 리포 URL을 입력해주세요. (예: https://github.com/owner/repo)"
         )}
    end
  end

  @impl true
  def handle_info({:analysis_done, owner, repo, {:ok, %{analyzed_commits: _, timeline: _, truncated: _} = data}}, socket) do
    :ets.insert(:commit_vibe_cache, {"#{owner}/#{repo}", data})

    {:noreply,
     socket
     |> assign(loading: false)
     |> push_navigate(to: ~p"/result/#{owner}/#{repo}")}
  end

  @impl true
  def handle_info({:analysis_done, _owner, _repo, {:error, :not_found}}, socket) do
    {:noreply, assign(socket, loading: false, error: "리포를 찾을 수 없어요. URL을 확인해주세요.")}
  end

  @impl true
  def handle_info({:analysis_done, _owner, _repo, {:error, _reason}}, socket) do
    {:noreply, assign(socket, loading: false, error: "분석 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.")}
  end

  defp do_analyze(owner, repo) do
    case GitHub.fetch_commits(owner, repo) do
      {:ok, commits, truncated} ->
        analyzed = Analyzer.analyze_commits(commits)
        timeline = Timeline.build("#{owner}/#{repo}", analyzed)
        {:ok, %{analyzed_commits: analyzed, timeline: timeline, truncated: truncated}}

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp parse_repo_url(url) do
    url = String.trim(url)

    cond do
      # https://github.com/owner/repo 형태
      match = Regex.run(~r{github\.com/([^/]+)/([^/\s?#]+)}, url) ->
        [_, owner, repo] = match
        repo = String.replace_trailing(repo, ".git", "")
        {:ok, owner, repo}

      # owner/repo 형태
      match = Regex.run(~r{^([a-zA-Z0-9_.-]+)/([a-zA-Z0-9_.-]+)$}, url) ->
        [_, owner, repo] = match
        {:ok, owner, repo}

      true ->
        :error
    end
  end

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash}>
      <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <div class="text-center space-y-4">
          <h1 class="text-4xl sm:text-5xl font-bold tracking-tight">
            commit-vibe
          </h1>
          <p class="text-[#6b7280] text-lg">
            커밋 메시지로 프로젝트 감정 타임라인을 그려보세요
          </p>
        </div>

        <form phx-submit="analyze" phx-change="validate" class="w-full max-w-xl space-y-4">
          <div class="flex gap-2">
            <input
              type="text"
              name="url"
              value={@url_input}
              placeholder="https://github.com/owner/repo"
              class="flex-1 px-4 py-3 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#e5e5e5] placeholder-[#555] focus:outline-none focus:border-[#22c55e] transition"
              disabled={@loading}
              autofocus
            />
            <button
              type="submit"
              class="px-6 py-3 bg-[#22c55e] text-black font-semibold rounded-lg hover:bg-[#16a34a] transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={@loading}
            >
              <%= if @loading do %>
                <span class="inline-flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  분석 중...
                </span>
              <% else %>
                분석하기
              <% end %>
            </button>
          </div>

          <p :if={@error} class="text-[#ef4444] text-sm">{@error}</p>
        </form>

        <div class="text-[#555] text-sm space-y-1 text-center">
          <p>owner/repo 형태로도 입력 가능</p>
          <p>예: elixir-lang/elixir</p>
        </div>
      </div>
    </Layouts.app>
    """
  end
end
