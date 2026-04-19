defmodule CommitVibe.OgImage do
  @moduledoc """
  OG 이미지용 SVG를 동적 생성한다.
  """

  alias CommitVibe.Analyzer

  @emotion_colors Analyzer.emotion_colors()
  @width 1200
  @height 630

  def generate_svg(timeline) do
    top_emotions = top_emotions(timeline.weeks)
    bars = render_bars(timeline.weeks)

    """
    <svg xmlns="http://www.w3.org/2000/svg" width="#{@width}" height="#{@height}" viewBox="0 0 #{@width} #{@height}">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;display=swap');
          text { font-family: 'Inter', -apple-system, sans-serif; }
        </style>
      </defs>

      <!-- Background -->
      <rect width="#{@width}" height="#{@height}" fill="#0a0a0a"/>

      <!-- Header -->
      <text x="60" y="80" fill="#e5e5e5" font-size="24" font-weight="700">commit-vibe</text>

      <!-- Repo name -->
      <text x="60" y="140" fill="#e5e5e5" font-size="40" font-weight="700">#{escape(timeline.repo)}</text>

      <!-- Vibe summary -->
      <text x="60" y="190" fill="#6b7280" font-size="22">#{escape(timeline.overall_vibe)}</text>

      <!-- Stats -->
      <text x="60" y="240" fill="#6b7280" font-size="18">#{timeline.total_commits}개 커밋 · 변동성 #{round(timeline.volatility * 100)}%</text>

      <!-- Emotion breakdown -->
      #{render_emotion_legend(top_emotions, 60, 290)}

      <!-- Timeline bars -->
      #{bars}
    </svg>
    """
  end

  defp top_emotions(weeks) do
    weeks
    |> Enum.flat_map(fn w -> Enum.to_list(w.emotions) end)
    |> Enum.reduce(%{}, fn {k, v}, acc -> Map.update(acc, k, v, &(&1 + v)) end)
    |> Enum.sort_by(fn {_, v} -> -v end)
    |> Enum.take(6)
  end

  defp render_emotion_legend(emotions, x, y) do
    emotions
    |> Enum.with_index()
    |> Enum.map(fn {{emotion, count}, i} ->
      cx = x + i * 160
      color = Map.get(@emotion_colors, emotion, "#6b7280")
      emoji = Map.get(Analyzer.emoji_map(), emotion, "😐")
      label = emotion_label(emotion)

      """
      <circle cx="#{cx}" cy="#{y - 5}" r="6" fill="#{color}"/>
      <text x="#{cx + 14}" y="#{y}" fill="#e5e5e5" font-size="14">#{escape(emoji)} #{escape(label)} #{count}</text>
      """
    end)
    |> Enum.join("\n")
  end

  defp render_bars(weeks) do
    recent_weeks = Enum.take(weeks, -8)
    max_commits = recent_weeks |> Enum.map(& &1.commit_count) |> Enum.max(fn -> 1 end) |> max(1)
    bar_area_width = @width - 120
    bar_height = 28
    start_y = 350

    recent_weeks
    |> Enum.with_index()
    |> Enum.map(fn {week, i} ->
      y = start_y + i * (bar_height + 8)
      render_week_bar(week, 60, y, bar_area_width, bar_height, max_commits)
    end)
    |> Enum.join("\n")
  end

  defp render_week_bar(week, x, y, total_width, height, max_commits) do
    label_width = 80
    bar_x = x + label_width + 10
    available_width = total_width - label_width - 60

    emotions = Enum.sort_by(week.emotions, fn {_, c} -> -c end)

    bars =
      emotions
      |> Enum.reduce({bar_x, []}, fn {emotion, count}, {current_x, acc} ->
        w = max(0.0, Float.round(count / max_commits * available_width, 1))
        color = Map.get(@emotion_colors, emotion, "#6b7280")

        bar = """
        <rect x="#{current_x}" y="#{y}" width="#{w}" height="#{height}" fill="#{color}" rx="3"/>
        """

        {current_x + w, [bar | acc]}
      end)
      |> elem(1)
      |> Enum.reverse()
      |> Enum.join()

    """
    <text x="#{x + label_width}" y="#{y + height - 8}" fill="#6b7280" font-size="13" text-anchor="end">#{escape(week.week_label)}</text>
    #{bars}
    <text x="#{bar_x + available_width + 8}" y="#{y + height - 8}" fill="#555" font-size="12">#{week.commit_count}</text>
    """
  end

  defp escape(text) do
    text
    |> to_string()
    |> String.replace("&", "&amp;")
    |> String.replace("<", "&lt;")
    |> String.replace(">", "&gt;")
    |> String.replace("\"", "&quot;")
  end

  defp emotion_label(:excited), do: "신남"
  defp emotion_label(:frustrated), do: "짜증"
  defp emotion_label(:motivated), do: "의욕"
  defp emotion_label(:desperate), do: "절망"
  defp emotion_label(:neutral), do: "무감정"
  defp emotion_label(:thinking), do: "고민"
  defp emotion_label(_), do: "기타"
end
