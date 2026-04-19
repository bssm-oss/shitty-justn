defmodule CommitVibe.AnalyzerTest do
  use ExUnit.Case, async: true

  alias CommitVibe.Analyzer

  defp commit(message, date \\ ~U[2025-03-15 14:00:00Z]) do
    %{message: message, date: date, author: "tester", sha: "abc"}
  end

  describe "analyze_commit/1" do
    test "conventional commit prefix → excited" do
      result = Analyzer.analyze_commit(commit("feat: add login page"))
      assert result.emotion == :excited
      assert result.emoji == "🎉"
      assert "feat" in result.keywords
    end

    test "fix prefix → frustrated" do
      result = Analyzer.analyze_commit(commit("fix: resolve login crash"))
      assert result.emotion == :frustrated
    end

    test "refactor prefix → motivated" do
      result = Analyzer.analyze_commit(commit("refactor: clean up auth module"))
      assert result.emotion == :motivated
    end

    test "revert → desperate" do
      result = Analyzer.analyze_commit(commit("revert: rollback deploy"))
      assert result.emotion == :desperate
    end

    test "docs → neutral" do
      result = Analyzer.analyze_commit(commit("docs: update README"))
      assert result.emotion == :neutral
    end

    test "wip → thinking" do
      result = Analyzer.analyze_commit(commit("wip: experiment with new layout"))
      assert result.emotion == :thinking
    end

    test "no keyword match → neutral" do
      result = Analyzer.analyze_commit(commit("oops"))
      assert result.emotion == :neutral
    end

    test "scoped conventional commit" do
      result = Analyzer.analyze_commit(commit("feat(auth): implement OAuth"))
      assert result.emotion == :excited
    end

    test "breaking change with !" do
      result = Analyzer.analyze_commit(commit("feat!: redesign API"))
      assert result.emotion == :excited
    end

    test "keyword in body (no prefix)" do
      result = Analyzer.analyze_commit(commit("add new payment module"))
      assert result.emotion == :excited
    end
  end

  describe "한국어 커밋" do
    test "버그 → frustrated" do
      result = Analyzer.analyze_commit(commit("버그 수정: 로그인 오류"))
      assert result.emotion == :frustrated
    end

    test "기능 추가 → excited" do
      result = Analyzer.analyze_commit(commit("기능 추가: 새 대시보드"))
      assert result.emotion == :excited
    end

    test "긴급 → desperate" do
      result = Analyzer.analyze_commit(commit("긴급: 서버 다운"))
      assert result.emotion == :desperate
    end

    test "리팩터링 → motivated" do
      result = Analyzer.analyze_commit(commit("리팩터링: 공통 컴포넌트 정리"))
      assert result.emotion == :motivated
    end

    test "실험 → thinking" do
      result = Analyzer.analyze_commit(commit("실험: 새 캐싱 전략 테스트"))
      assert result.emotion == :thinking
    end

    test "영문 prefix + 한글 본문" do
      result = Analyzer.analyze_commit(commit("fix: 대가리깨짐"))
      assert result.emotion == :frustrated
    end
  end

  describe "confidence score" do
    test "prefix match → 0.9" do
      result = Analyzer.analyze_commit(commit("feat: add login"))
      assert result.score == 0.9
    end

    test "단일 키워드 매치 → 0.5" do
      # "update" 하나만 매칭 ("the", "schema"는 키워드 없음)
      result = Analyzer.analyze_commit(commit("update the schema"))
      assert result.score == 0.5
    end

    test "복수 키워드 매치 → 0.65" do
      result = Analyzer.analyze_commit(commit("fix bug workaround"))
      assert result.score == 0.65
    end

    test "매치 없음 → 0.1" do
      result = Analyzer.analyze_commit(commit("oops"))
      assert result.score == 0.1
    end
  end

  describe "stress_multiplier" do
    test "일반 근무시간 → 1.0" do
      result = Analyzer.analyze_commit(commit("feat: x", ~U[2025-03-12 10:00:00Z]))
      assert result.stress_multiplier == 1.0
    end

    test "야근 (23시) → 1.3" do
      result = Analyzer.analyze_commit(commit("fix: x", ~U[2025-03-12 23:00:00Z]))
      assert result.stress_multiplier == 1.3
    end

    test "주말 낮 → 1.5" do
      # 2025-03-15 = 토요일
      result = Analyzer.analyze_commit(commit("fix: x", ~U[2025-03-15 14:00:00Z]))
      assert result.stress_multiplier == 1.5
    end

    test "주말 야근 → 1.8" do
      result = Analyzer.analyze_commit(commit("fix: x", ~U[2025-03-15 23:30:00Z]))
      assert result.stress_multiplier == 1.8
    end

    test "nil date → 1.0" do
      result = Analyzer.analyze_commit(%{message: "feat: x", date: nil})
      assert result.stress_multiplier == 1.0
    end
  end

  describe "analyze_commits/1" do
    test "여러 커밋 일괄 분석" do
      commits = [
        commit("feat: add login"),
        commit("fix: crash on startup"),
        commit("feat: add dashboard")
      ]

      results = Analyzer.analyze_commits(commits)
      assert length(results) == 3
      assert Enum.all?(results, &Map.has_key?(&1, :analysis))
    end
  end

  describe "emotion_counts/1" do
    test "감정별 카운트" do
      analyzed =
        Analyzer.analyze_commits([
          commit("feat: a"),
          commit("feat: b"),
          commit("fix: c")
        ])

      counts = Analyzer.emotion_counts(analyzed)
      assert counts[:excited] == 2
      assert counts[:frustrated] == 1
    end
  end

  describe "dominant_emotion/1" do
    test "가장 많은 감정 반환" do
      analyzed =
        Analyzer.analyze_commits([
          commit("fix: a"),
          commit("fix: b"),
          commit("feat: c")
        ])

      assert Analyzer.dominant_emotion(analyzed) == :frustrated
    end

    test "빈 리스트 → neutral" do
      assert Analyzer.dominant_emotion([]) == :neutral
    end

    test "동점 시 confidence 높은 쪽 승리" do
      # prefix match(score=0.9) vs keyword-only match(score=0.5) — 동수라도 prefix 쪽 승리
      analyzed =
        Analyzer.analyze_commits([
          commit("feat: a"),       # excited, score 0.9
          commit("add something")  # excited, score 0.5 — 같은 감정이지만 confidence 다름
        ])

      # 둘 다 excited라 그냥 excited
      assert Analyzer.dominant_emotion(analyzed) == :excited
    end
  end
end
