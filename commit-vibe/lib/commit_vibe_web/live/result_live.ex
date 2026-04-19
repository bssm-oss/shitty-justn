defmodule CommitVibeWeb.ResultLive do
  use CommitVibeWeb, :live_view

  alias CommitVibe.{GitHub, Analyzer, Timeline}
  alias CommitVibeWeb.Live.Components.{TimelineBar, VibeSummary, ContributorChart}

  @periods [
    {"1주", "1w"},
    {"1달", "1m"},
    {"3달", "3m"},
    {"1년", "1y"},
    {"전체", "all"}
  ]

  @impl true
  def mount(%{"owner" => owner, "repo" => repo}, _session, socket) do
    repo_name = "#{owner}/#{repo}"

    {analyzed_commits, timeline, truncated} =
      case :ets.lookup(:commit_vibe_cache, repo_name) do
        [{_, %{analyzed_commits: commits, timeline: tl, truncated: tr}}] -> {commits, tl, tr}
        [{_, %{analyzed_commits: commits, timeline: tl}}] -> {commits, tl, false}
        _ -> {nil, nil, false}
      end

    vibe_desc =
      if timeline,
        do: "#{repo_name}: #{timeline.overall_vibe} — #{timeline.total_commits}개 커밋 분석",
        else: "#{repo_name} 감정 타임라인"

    socket =
      assign(socket,
        page_title: "#{repo_name} - commit-vibe",
        meta_description: vibe_desc,
        og_image_url: "/og/#{owner}/#{repo}",
        owner: owner,
        repo: repo,
        analyzed_commits: analyzed_commits,
        timeline: timeline,
        contributors: if(analyzed_commits, do: Timeline.contributor_stats(analyzed_commits), else: []),
        loading: timeline == nil,
        error: nil,
        period: "all",
        periods: @periods,
        truncated: truncated
      )

    if timeline == nil and connected?(socket) do
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
          catch
            :exit, reason ->
              require Logger
              Logger.error("Analysis task exited: #{inspect(reason)}")
              {:error, :internal}
          end

        send(self_pid, {:analysis_done, result})
      end)
    end

    {:ok, socket}
  end

  @impl true
  def handle_event("filter_period", %{"period" => period}, socket) do
    case socket.assigns.analyzed_commits do
      nil ->
        {:noreply, socket}

      commits ->
        filtered = Timeline.filter_by_period(commits, period)
        repo_name = "#{socket.assigns.owner}/#{socket.assigns.repo}"
        timeline = Timeline.build(repo_name, filtered)
        contributors = Timeline.contributor_stats(filtered)

        {:noreply,
         assign(socket,
           period: period,
           timeline: timeline,
           contributors: contributors
         )}
    end
  end

  @impl true
  def handle_info({:analysis_done, {:ok, %{analyzed_commits: commits, timeline: timeline, truncated: truncated}}}, socket) do
    repo_name = "#{socket.assigns.owner}/#{socket.assigns.repo}"
    :ets.insert(:commit_vibe_cache, {repo_name, %{analyzed_commits: commits, timeline: timeline, truncated: truncated}})
    contributors = Timeline.contributor_stats(commits)

    {:noreply,
     assign(socket,
       analyzed_commits: commits,
       timeline: timeline,
       contributors: contributors,
       loading: false,
       truncated: truncated
     )}
  end

  @impl true
  def handle_info({:analysis_done, {:error, :not_found}}, socket) do
    {:noreply, assign(socket, loading: false, error: "리포를 찾을 수 없어요.")}
  end

  @impl true
  def handle_info({:analysis_done, {:error, _}}, socket) do
    {:noreply, assign(socket, loading: false, error: "분석 중 오류가 발생했어요.")}
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

  @impl true
  def render(assigns) do
    ~H"""
    <Layouts.app flash={@flash}>
      <div class="space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <a href="/" class="text-[#6b7280] hover:text-[#e5e5e5] text-sm transition">
              &larr; 돌아가기
            </a>
            <h1 class="text-2xl sm:text-3xl font-bold mt-2">{@owner}/{@repo}</h1>
          </div>

          <div :if={@timeline} class="flex gap-1 bg-[#111] rounded-xl border border-[#222] p-1">
            <button
              :for={{label, value} <- @periods}
              phx-click="filter_period"
              phx-value-period={value}
              class={"px-3 py-1.5 text-sm rounded-lg transition #{if @period == value, do: "bg-[#22c55e] text-black font-semibold shadow-lg shadow-[#22c55e]/20", else: "text-[#555] hover:text-[#e5e5e5]"}"}
            >
              {label}
            </button>
          </div>
        </div>

        <%= cond do %>
          <% @loading -> %>
            <div class="flex flex-col items-center justify-center py-20 space-y-4">
              <svg class="animate-spin h-8 w-8 text-[#22c55e]" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p class="text-[#6b7280]">커밋 분석 중...</p>
            </div>

          <% @error -> %>
            <div class="bg-[#1a1a1a] rounded-lg p-8 text-center space-y-4">
              <p class="text-[#ef4444] text-lg">{@error}</p>
              <a href="/" class="inline-block px-4 py-2 bg-[#333] rounded-lg hover:bg-[#444] transition">
                다시 시도
              </a>
            </div>

          <% @timeline -> %>
            <div :if={@truncated} class="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-sm text-[#6b7280]">
              <span>⚠</span>
              <span>커밋이 너무 많아 최근 2,000개 기준으로 분석했습니다.</span>
            </div>
            <VibeSummary.render timeline={@timeline} />
            <TimelineBar.render weeks={@timeline.weeks} />
            <ContributorChart.render contributors={@contributors} />

          <% true -> %>
            <div></div>
        <% end %>
      </div>
    </Layouts.app>
    """
  end
end
