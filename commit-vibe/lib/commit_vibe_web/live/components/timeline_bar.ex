defmodule CommitVibeWeb.Live.Components.TimelineBar do
  use Phoenix.Component

  alias CommitVibe.Analyzer

  @emotion_colors Analyzer.emotion_colors()

  attr :weeks, :list, required: true

  def render(assigns) do
    max_commits =
      case assigns.weeks do
        [] -> 1
        weeks -> weeks |> Enum.map(& &1.commit_count) |> Enum.max() |> max(1)
      end

    assigns = assign(assigns, max_commits: max_commits)

    ~H"""
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-[#e5e5e5]">감정 타임라인</h2>

      <div class="bg-[#111] rounded-2xl border border-[#222] p-4 sm:p-6 space-y-1">
        <div
          :for={week <- @weeks}
          class="flex items-center gap-3 py-1.5 hover:bg-[#1a1a1a] rounded-lg px-2 -mx-2 transition group"
        >
          <div class="w-16 text-right text-xs text-[#555] shrink-0 font-mono group-hover:text-[#888] transition">
            {week.week_label}
          </div>

          <div class="text-base shrink-0 w-7 text-center" title={Atom.to_string(week.dominant_emotion)}>
            {week.dominant_emoji}
          </div>

          <div class="flex-1 h-7 bg-[#0a0a0a] rounded-lg overflow-hidden flex">
            <div
              :for={{emotion, count} <- Enum.sort_by(week.emotions, fn {_, c} -> -c end)}
              class="h-full transition-all duration-300"
              style={"width: #{Float.round(count / @max_commits * 100, 1)}%; background-color: #{color_for(emotion)}; opacity: 0.85;"}
            />
          </div>

          <div class="w-8 text-right text-xs text-[#444] shrink-0 font-mono group-hover:text-[#888] transition">
            {week.commit_count}
          </div>
        </div>
      </div>

      <div class="flex gap-4 justify-center flex-wrap">
        <div :for={{emotion, color} <- legend_items()} class="flex items-center gap-1.5 text-xs text-[#555]">
          <div class="w-2.5 h-2.5 rounded-full" style={"background-color: #{color};"} />
          <span>{emotion}</span>
        </div>
      </div>
    </div>
    """
  end

  defp color_for(emotion), do: Map.get(@emotion_colors, emotion, "#6b7280")

  defp legend_items do
    [
      {"신남", "#22c55e"},
      {"짜증", "#ef4444"},
      {"의욕", "#f97316"},
      {"절망", "#8b5cf6"},
      {"무감정", "#6b7280"},
      {"고민", "#eab308"}
    ]
  end
end
