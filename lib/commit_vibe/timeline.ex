defmodule CommitVibe.Timeline do
  @moduledoc """
  커밋을 주차별로 그루핑하고 타임라인 데이터를 생성한다.
  """

  alias CommitVibe.Analyzer

  @type week_data :: %{
          week_label: String.t(),
          start_date: Date.t(),
          emotions: %{atom() => integer()},
          commit_count: integer(),
          dominant_emotion: atom(),
          dominant_emoji: String.t(),
          contributors: [String.t()],
          avg_stress: float()
        }

  @type t :: %{
          repo: String.t(),
          weeks: [week_data()],
          overall_vibe: String.t(),
          volatility: float(),
          total_commits: integer(),
          period: {Date.t(), Date.t()},
          revert_ratio: float(),
          avg_stress: float()
        }

  @period_days %{
    "1w" => 7,
    "1m" => 30,
    "3m" => 90,
    "1y" => 365,
    "all" => nil
  }

  @doc "기간 필터를 적용한 커밋 리스트 반환"
  def filter_by_period(analyzed_commits, "all"), do: analyzed_commits
  def filter_by_period(analyzed_commits, nil), do: analyzed_commits

  def filter_by_period(analyzed_commits, period) do
    case Map.get(@period_days, period) do
      nil ->
        analyzed_commits

      days ->
        cutoff = DateTime.utc_now() |> DateTime.add(-days * 86400, :second)

        Enum.filter(analyzed_commits, fn commit ->
          commit.date != nil and DateTime.compare(commit.date, cutoff) != :lt
        end)
    end
  end

  @doc "기여자별 감정 통계 반환"
  def contributor_stats(analyzed_commits) do
    analyzed_commits
    |> Enum.reject(&is_nil(&1.author))
    |> Enum.group_by(& &1.author)
    |> Enum.map(fn {author, commits} ->
      emotions = Analyzer.emotion_counts(commits)
      dominant = Analyzer.dominant_emotion(commits)

      %{
        author: author,
        commit_count: length(commits),
        emotions: emotions,
        dominant_emotion: dominant,
        dominant_emoji: Map.get(Analyzer.emoji_map(), dominant, "❓")
      }
    end)
    |> Enum.sort_by(& &1.commit_count, :desc)
  end

  @doc """
  분석된 커밋 리스트로 타임라인을 생성한다.
  commits는 이미 Analyzer.analyze_commits/1를 거친 상태.
  """
  def build(repo, analyzed_commits) do
    commits_with_dates =
      analyzed_commits
      |> Enum.filter(&(&1.date != nil))
      |> Enum.sort_by(& &1.date, DateTime)

    weeks = group_by_week(commits_with_dates)

    period = extract_period(commits_with_dates)
    emotions_over_time = Enum.map(weeks, & &1.dominant_emotion)

    %{
      repo: repo,
      weeks: weeks,
      overall_vibe: generate_vibe_summary(weeks, emotions_over_time),
      volatility: calculate_volatility(emotions_over_time),
      total_commits: length(analyzed_commits),
      period: period,
      revert_ratio: calculate_revert_ratio(analyzed_commits),
      avg_stress: calculate_avg_stress(analyzed_commits)
    }
  end

  defp group_by_week(commits) do
    commits
    |> Enum.group_by(fn commit ->
      date = DateTime.to_date(commit.date)
      days_since_monday = Date.day_of_week(date) - 1
      Date.add(date, -days_since_monday)
    end)
    |> Enum.sort_by(fn {monday, _} -> monday end, Date)
    |> Enum.map(fn {monday, week_commits} ->
      emotions = Analyzer.emotion_counts(week_commits)
      dominant = Analyzer.dominant_emotion(week_commits)
      emoji_map = Analyzer.emoji_map()

      %{
        week_label: format_week_label(monday),
        start_date: monday,
        emotions: emotions,
        commit_count: length(week_commits),
        dominant_emotion: dominant,
        dominant_emoji: Map.fetch!(emoji_map, dominant),
        contributors: week_commits |> Enum.map(& &1.author) |> Enum.reject(&is_nil/1) |> Enum.uniq(),
        avg_stress: calculate_avg_stress(week_commits)
      }
    end)
  end

  defp format_week_label(monday) do
    "#{monday.month}월 #{week_of_month(monday)}주"
  end

  defp week_of_month(date) do
    div(date.day - 1, 7) + 1
  end

  defp extract_period([]), do: {nil, nil}

  defp extract_period(sorted_commits) do
    first = hd(sorted_commits).date |> DateTime.to_date()
    last = List.last(sorted_commits).date |> DateTime.to_date()
    {first, last}
  end

  @doc "감정 변동성 (0.0~1.0). 매주 감정이 바뀌면 높음."
  def calculate_volatility([]), do: 0.0
  def calculate_volatility([_]), do: 0.0

  def calculate_volatility(emotions) do
    changes =
      emotions
      |> Enum.chunk_every(2, 1, :discard)
      |> Enum.count(fn [a, b] -> a != b end)

    total = length(emotions) - 1
    Float.round(changes / total, 2)
  end

  @doc "desperate 커밋 비율 (0.0~1.0). revert/rollback/긴급 커밋이 많을수록 높음."
  def calculate_revert_ratio([]), do: 0.0

  def calculate_revert_ratio(analyzed_commits) do
    total = length(analyzed_commits)
    revert_count = Enum.count(analyzed_commits, &(&1.analysis.emotion == :desperate))
    Float.round(revert_count / total, 2)
  end

  @doc "커밋 리스트의 평균 stress_multiplier. 야근/주말 커밋이 많을수록 높음."
  def calculate_avg_stress([]), do: 1.0

  def calculate_avg_stress(commits) do
    values = Enum.map(commits, & &1.analysis.stress_multiplier)
    Float.round(Enum.sum(values) / length(values), 2)
  end

  defp generate_vibe_summary([], _), do: "커밋이 없어요 👻"

  defp generate_vibe_summary(weeks, emotions) do
    total_emotions =
      weeks
      |> Enum.flat_map(fn w -> Enum.to_list(w.emotions) end)
      |> Enum.reduce(%{}, fn {k, v}, acc -> Map.update(acc, k, v, &(&1 + v)) end)

    top =
      total_emotions
      |> Enum.sort_by(fn {_, v} -> v end, :desc)
      |> Enum.take(2)
      |> Enum.map(&elem(&1, 0))

    volatility = calculate_volatility(emotions)

    vibe_text = emotion_pair_description(top)
    stability = volatility_description(volatility)

    "#{vibe_text} (#{stability})"
  end

  defp emotion_pair_description([]), do: "아직 분위기를 모르겠어요"
  defp emotion_pair_description([:excited]), do: "신나는 프로젝트"
  defp emotion_pair_description([:frustrated]), do: "고통의 연속"
  defp emotion_pair_description([:motivated]), do: "꾸준히 개선 중"
  defp emotion_pair_description([:desperate]), do: "위기 상황"
  defp emotion_pair_description([:neutral]), do: "평온한 유지보수"
  defp emotion_pair_description([:thinking]), do: "실험과 탐색 중"

  defp emotion_pair_description([:excited, :frustrated]), do: "열정적이지만 불안정"
  defp emotion_pair_description([:frustrated, :excited]), do: "힘들지만 성과 있음"
  defp emotion_pair_description([:excited, :motivated]), do: "최고의 컨디션"
  defp emotion_pair_description([:motivated, :excited]), do: "최고의 컨디션"
  defp emotion_pair_description([:frustrated, :desperate]), do: "SOS 모드"
  defp emotion_pair_description([:desperate, :frustrated]), do: "SOS 모드"
  defp emotion_pair_description([:frustrated, :motivated]), do: "고통 속 성장"
  defp emotion_pair_description([:motivated, :frustrated]), do: "개선하다 지침"
  defp emotion_pair_description([:neutral, :excited]), do: "가끔 불꽃이 튀는 안정기"
  defp emotion_pair_description([:excited, :neutral]), do: "활발하지만 잡일도 많음"
  defp emotion_pair_description([:neutral, :frustrated]), do: "잔잔하다 터지는 버그"

  defp emotion_pair_description([a, _b]) do
    emotion_pair_description([a])
  end

  defp volatility_description(v) when v < 0.2, do: "안정적"
  defp volatility_description(v) when v < 0.4, do: "약간 변동"
  defp volatility_description(v) when v < 0.6, do: "변동성 보통"
  defp volatility_description(v) when v < 0.8, do: "변동성 높음"
  defp volatility_description(_), do: "롤러코스터"
end
