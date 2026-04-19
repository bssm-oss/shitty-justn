defmodule CommitVibeWeb.Live.Components.ContributorChart do
  use Phoenix.Component

  alias CommitVibe.Analyzer

  @emotion_colors Analyzer.emotion_colors()

  attr :contributors, :list, required: true

  def render(assigns) do
    ~H"""
    <div class="space-y-4">
      <h2 class="text-lg font-semibold text-[#e5e5e5]">기여자별 감정</h2>

      <div :if={@contributors == []} class="text-[#6b7280] text-sm py-4">
        기여자 데이터가 없어요.
      </div>

      <div class="bg-[#111] rounded-2xl border border-[#222] p-4 sm:p-6 space-y-4">
        <div :for={contributor <- Enum.take(@contributors, 10)} class="space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold text-[#888] uppercase">
                {String.first(contributor.author)}
              </div>
              <span class="font-medium text-sm text-[#e5e5e5]">{contributor.author}</span>
              <span class="text-sm">{contributor.dominant_emoji}</span>
            </div>
            <span class="text-[#555] text-xs font-mono">{contributor.commit_count}커밋</span>
          </div>

          <div class="h-3 bg-[#0a0a0a] rounded-full overflow-hidden flex">
            <div
              :for={{emotion, count} <- Enum.sort_by(contributor.emotions, fn {_, c} -> -c end)}
              class="h-full first:rounded-l-full last:rounded-r-full"
              style={"width: #{Float.round(count / max(contributor.commit_count, 1) * 100, 1)}%; background-color: #{color_for(emotion)}; opacity: 0.85;"}
              title={"#{emotion_label(emotion)} #{count}"}
            />
          </div>
        </div>
      </div>

      <div :if={length(@contributors) > 10} class="text-[#555] text-xs text-center">
        상위 10명만 표시
      </div>
    </div>
    """
  end

  defp color_for(emotion), do: Map.get(@emotion_colors, emotion, "#6b7280")

  defp emotion_label(:excited), do: "신남"
  defp emotion_label(:frustrated), do: "짜증"
  defp emotion_label(:motivated), do: "의욕"
  defp emotion_label(:desperate), do: "절망"
  defp emotion_label(:neutral), do: "무감정"
  defp emotion_label(:thinking), do: "고민"
  defp emotion_label(_), do: "기타"
end
