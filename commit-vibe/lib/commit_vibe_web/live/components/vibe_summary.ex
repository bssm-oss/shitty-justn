defmodule CommitVibeWeb.Live.Components.VibeSummary do
  use Phoenix.Component

  alias CommitVibe.Analyzer

  attr :timeline, :map, required: true

  def render(assigns) do
    ~H"""
    <div class="bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-2xl p-6 sm:p-8 border border-[#222] space-y-6">
      <div class="flex items-start justify-between gap-4">
        <div class="space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#22c55e] to-[#eab308] bg-clip-text text-transparent">
            {@timeline.overall_vibe}
          </h2>
          <p class="text-[#6b7280] text-sm">
            총 <span class="text-[#e5e5e5] font-semibold">{@timeline.total_commits}</span>개 커밋 분석
            <%= if @timeline.period do %>
              <span :if={elem(@timeline.period, 0)}>
                · {format_date(elem(@timeline.period, 0))} ~ {format_date(elem(@timeline.period, 1))}
              </span>
            <% end %>
          </p>
        </div>

        <div class="flex gap-2 flex-wrap justify-end">
          <div class="text-center px-4 py-2 rounded-xl bg-[#0a0a0a] border border-[#222]">
            <div class="text-xs text-[#6b7280] uppercase tracking-wider">변동성</div>
            <div class={"text-2xl font-bold #{volatility_color(@timeline.volatility)}"}>
              {Float.round(@timeline.volatility * 100, 0)}%
            </div>
          </div>

          <div class="text-center px-4 py-2 rounded-xl bg-[#0a0a0a] border border-[#222]">
            <div class="text-xs text-[#6b7280] uppercase tracking-wider">야근 지수</div>
            <div class={"text-2xl font-bold #{stress_color(@timeline.avg_stress)}"}>
              {stress_label(@timeline.avg_stress)}
            </div>
          </div>

          <div :if={@timeline.revert_ratio > 0} class="text-center px-4 py-2 rounded-xl bg-[#0a0a0a] border border-[#222]">
            <div class="text-xs text-[#6b7280] uppercase tracking-wider">롤백률</div>
            <div class={"text-2xl font-bold #{revert_color(@timeline.revert_ratio)}"}>
              {Float.round(@timeline.revert_ratio * 100, 0)}%
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 flex-wrap">
        <div
          :for={{emotion, count} <- top_emotions(@timeline.weeks)}
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222] text-sm"
        >
          <span class="text-base">{Map.get(Analyzer.emoji_map(), emotion, "😐")}</span>
          <span style={"color: #{Map.get(Analyzer.emotion_colors(), emotion, "#6b7280")};"} class="font-medium">
            {emotion_label(emotion)}
          </span>
          <span class="text-[#555] font-mono text-xs">{count}</span>
        </div>
      </div>
    </div>
    """
  end

  defp top_emotions(weeks) do
    weeks
    |> Enum.flat_map(fn w -> Enum.to_list(w.emotions) end)
    |> Enum.reduce(%{}, fn {k, v}, acc -> Map.update(acc, k, v, &(&1 + v)) end)
    |> Enum.sort_by(fn {_, v} -> -v end)
  end

  defp format_date(nil), do: ""
  defp format_date(%Date{} = d), do: "#{d.year}.#{zero_pad(d.month)}.#{zero_pad(d.day)}"
  defp zero_pad(n) when n < 10, do: "0#{n}"
  defp zero_pad(n), do: "#{n}"

  defp volatility_color(v) when v < 0.3, do: "text-[#22c55e]"
  defp volatility_color(v) when v < 0.6, do: "text-[#eab308]"
  defp volatility_color(_), do: "text-[#ef4444]"

  # avg_stress: 1.0 = 정상, 1.3 = 야근, 1.5 = 주말, 1.8 = 주말야근
  defp stress_label(s) when s < 1.1, do: "😴"
  defp stress_label(s) when s < 1.4, do: "🌙"
  defp stress_label(s) when s < 1.6, do: "📅"
  defp stress_label(_), do: "🔥"

  defp stress_color(s) when s < 1.1, do: "text-[#22c55e]"
  defp stress_color(s) when s < 1.4, do: "text-[#eab308]"
  defp stress_color(s) when s < 1.6, do: "text-[#f97316]"
  defp stress_color(_), do: "text-[#ef4444]"

  defp revert_color(r) when r < 0.1, do: "text-[#eab308]"
  defp revert_color(r) when r < 0.2, do: "text-[#f97316]"
  defp revert_color(_), do: "text-[#ef4444]"

  defp emotion_label(:excited), do: "신남"
  defp emotion_label(:frustrated), do: "짜증"
  defp emotion_label(:motivated), do: "의욕"
  defp emotion_label(:desperate), do: "절망"
  defp emotion_label(:neutral), do: "무감정"
  defp emotion_label(:thinking), do: "고민"
  defp emotion_label(_), do: "기타"
end
