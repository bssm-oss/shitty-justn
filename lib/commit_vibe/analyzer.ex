defmodule CommitVibe.Analyzer do
  @moduledoc """
  커밋 메시지를 감정 분석하는 엔진.
  영문/한국어 키워드 기반 감정 매핑 + 시간대 가중치 + confidence score.
  """

  @emotion_map_en %{
    excited:    ~w(feat add new create implement launch ship),
    frustrated: ~w(fix bug patch hotfix workaround hack),
    motivated:  ~w(refactor clean perf improve optimize upgrade),
    desperate:  ~w(revert rollback urgent emergency break),
    neutral:    ~w(docs chore ci cd config update bump),
    thinking:   ~w(wip tmp test experiment try draft)
  }

  @emotion_map_ko %{
    excited:    ~w(기능 추가 신규 구현 출시),
    frustrated: ~w(수정 버그 패치 핫픽스),
    motivated:  ~w(리팩터링 개선 최적화 정리),
    desperate:  ~w(롤백 긴급 장애 복구),
    neutral:    ~w(문서 설정 업데이트 빌드),
    thinking:   ~w(실험 임시 초안 작업중)
  }

  @emotion_map Map.merge(@emotion_map_en, @emotion_map_ko, fn _k, en, ko -> en ++ ko end)

  @emoji_map %{
    excited: "🎉",
    frustrated: "😤",
    motivated: "🔥",
    desperate: "💀",
    neutral: "😐",
    thinking: "🤔"
  }

  @emotion_colors %{
    excited: "#22c55e",
    frustrated: "#ef4444",
    motivated: "#f97316",
    desperate: "#8b5cf6",
    neutral: "#6b7280",
    thinking: "#eab308"
  }

  def emoji_map, do: @emoji_map
  def emotion_colors, do: @emotion_colors

  @doc """
  커밋 메시지를 분석해 감정 카테고리를 반환한다.

  ## 반환값
  %{
    emotion: :excited | :frustrated | ...,
    emoji: "🎉",
    keywords: ["feat"],
    stress_multiplier: 1.0 | 1.3 | 1.5 | 1.8,
    score: 0.1 | 0.5 | 0.65 | 0.9   # confidence
  }

  ## Confidence 기준
  - 0.9: conventional commit prefix 매칭 (가장 신뢰도 높음)
  - 0.65: 본문 키워드 2개 이상 매칭
  - 0.5: 본문 키워드 1개 매칭
  - 0.1: 매칭 없음 (neutral 폴백)
  """
  def analyze_commit(%{message: message, date: date}) do
    message_lower = String.downcase(message)
    prefix = extract_prefix(message_lower)
    words = extract_words(message_lower)

    {emotion, matched_keywords, score} = classify(prefix, words)

    stress = stress_multiplier(date)

    %{
      emotion: emotion,
      emoji: Map.fetch!(@emoji_map, emotion),
      keywords: matched_keywords,
      stress_multiplier: stress,
      score: score
    }
  end

  @doc "여러 커밋을 한번에 분석"
  def analyze_commits(commits) when is_list(commits) do
    Enum.map(commits, fn commit ->
      Map.merge(commit, %{analysis: analyze_commit(commit)})
    end)
  end

  @doc "분석된 커밋 리스트에서 감정별 카운트"
  def emotion_counts(analyzed_commits) do
    analyzed_commits
    |> Enum.map(& &1.analysis.emotion)
    |> Enum.frequencies()
  end

  @doc """
  가장 많이 나온 감정. 동점 시 confidence 가중 점수로 타이브레이킹.
  """
  def dominant_emotion(analyzed_commits) when analyzed_commits == [], do: :neutral

  def dominant_emotion(analyzed_commits) do
    analyzed_commits
    |> Enum.group_by(& &1.analysis.emotion)
    |> Enum.map(fn {emotion, commits} ->
      avg_score = commits |> Enum.map(& &1.analysis.score) |> then(&(Enum.sum(&1) / length(&1)))
      {emotion, length(commits) * avg_score}
    end)
    |> Enum.max_by(fn {_emotion, weighted} -> weighted end)
    |> elem(0)
  end

  # conventional commit prefix 파싱: "feat: ...", "fix(scope): ...", "feat!: ..."
  defp extract_prefix(message) do
    case Regex.run(~r/^(\w+)(?:\([^)]*\))?[!]?:/, message) do
      [_, prefix] -> prefix
      _ -> nil
    end
  end

  # 영문·숫자·한글 유지, 나머지는 공백으로 치환 후 단어 분리
  defp extract_words(message) do
    message
    |> String.replace(~r/[^\p{L}\p{N}\s]/u, " ")
    |> String.split()
    |> Enum.reject(&(String.length(&1) < 2))
  end

  defp classify(prefix, words) do
    if prefix do
      case find_emotion_for_word(prefix) do
        {emotion, _} -> {emotion, [prefix], 0.9}
        nil -> classify_by_words(words)
      end
    else
      classify_by_words(words)
    end
  end

  defp classify_by_words(words) do
    matches =
      words
      |> Enum.reduce([], fn word, acc ->
        case find_emotion_for_word(word) do
          {emotion, keyword} -> [{emotion, keyword} | acc]
          nil -> acc
        end
      end)
      |> Enum.reverse()

    case matches do
      [] ->
        {:neutral, [], 0.1}

      [{emotion, _} | _] ->
        keywords =
          matches
          |> Enum.filter(fn {e, _} -> e == emotion end)
          |> Enum.map(&elem(&1, 1))
          |> Enum.uniq()

        score = if length(keywords) >= 2, do: 0.65, else: 0.5
        {emotion, keywords, score}
    end
  end

  defp find_emotion_for_word(word) do
    Enum.find_value(@emotion_map, fn {emotion, keywords} ->
      if word in keywords, do: {emotion, word}
    end)
  end

  # 야근(22시~06시) → 1.3x, 주말 → 1.5x, 야근+주말 → 1.8x
  defp stress_multiplier(nil), do: 1.0

  defp stress_multiplier(%DateTime{} = dt) do
    late_night? = dt.hour >= 22 or dt.hour < 6
    weekend? = Date.day_of_week(dt) in [6, 7]

    case {late_night?, weekend?} do
      {true, true} -> 1.8
      {false, true} -> 1.5
      {true, false} -> 1.3
      {false, false} -> 1.0
    end
  end

  defp stress_multiplier(_), do: 1.0
end
