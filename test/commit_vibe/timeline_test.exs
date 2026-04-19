defmodule CommitVibe.TimelineTest do
  use ExUnit.Case, async: true

  alias CommitVibe.{Analyzer, Timeline}

  defp commit(message, date_str) do
    {:ok, dt, _} = DateTime.from_iso8601(date_str)
    %{message: message, date: dt, author: "dev1", sha: "abc"}
  end

  defp build_timeline(commits) do
    analyzed = Analyzer.analyze_commits(commits)
    Timeline.build("owner/repo", analyzed)
  end

  describe "build/2" do
    test "주차별 그루핑" do
      timeline =
        build_timeline([
          commit("feat: login", "2025-03-10T10:00:00Z"),
          commit("fix: crash", "2025-03-11T10:00:00Z"),
          commit("feat: dashboard", "2025-03-17T10:00:00Z")
        ])

      # 3/10(월)~3/11(화) = 1주, 3/17(월) = 다음주
      assert length(timeline.weeks) == 2
      assert timeline.total_commits == 3
      assert timeline.repo == "owner/repo"
    end

    test "week_label 형식" do
      timeline =
        build_timeline([
          commit("feat: x", "2025-03-10T10:00:00Z")
        ])

      [week] = timeline.weeks
      assert week.week_label == "3월 2주"
    end

    test "주차별 dominant_emotion" do
      timeline =
        build_timeline([
          commit("fix: a", "2025-03-10T10:00:00Z"),
          commit("fix: b", "2025-03-11T10:00:00Z"),
          commit("feat: c", "2025-03-12T10:00:00Z")
        ])

      [week] = timeline.weeks
      assert week.dominant_emotion == :frustrated
      assert week.dominant_emoji == "😤"
    end

    test "기여자 목록" do
      commits = [
        %{message: "feat: x", date: ~U[2025-03-10 10:00:00Z], author: "alice", sha: "a"},
        %{message: "fix: y", date: ~U[2025-03-11 10:00:00Z], author: "bob", sha: "b"},
        %{message: "feat: z", date: ~U[2025-03-11 10:00:00Z], author: "alice", sha: "c"}
      ]

      timeline = Timeline.build("r", Analyzer.analyze_commits(commits))
      [week] = timeline.weeks
      assert "alice" in week.contributors
      assert "bob" in week.contributors
      assert length(week.contributors) == 2
    end

    test "period 계산" do
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("feat: b", "2025-04-05T10:00:00Z")
        ])

      {start_date, end_date} = timeline.period
      assert start_date == ~D[2025-03-10]
      assert end_date == ~D[2025-04-05]
    end

    test "빈 커밋 → 빈 타임라인" do
      timeline = Timeline.build("r", [])
      assert timeline.weeks == []
      assert timeline.total_commits == 0
      assert timeline.overall_vibe == "커밋이 없어요 👻"
    end
  end

  describe "volatility" do
    test "같은 감정 반복 → 0.0" do
      assert Timeline.calculate_volatility([:excited, :excited, :excited]) == 0.0
    end

    test "매번 바뀜 → 1.0" do
      assert Timeline.calculate_volatility([:excited, :frustrated, :excited, :frustrated]) == 1.0
    end

    test "절반 바뀜 → 0.5" do
      assert Timeline.calculate_volatility([:excited, :excited, :frustrated]) == 0.5
    end
  end

  describe "revert_ratio" do
    test "desperate 없음 → 0.0" do
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("feat: b", "2025-03-10T11:00:00Z")
        ])

      assert timeline.revert_ratio == 0.0
    end

    test "desperate 하나면 비율 반영" do
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("revert: b", "2025-03-10T11:00:00Z")
        ])

      assert timeline.revert_ratio == 0.5
    end

    test "빈 리스트 → 0.0" do
      assert Timeline.calculate_revert_ratio([]) == 0.0
    end
  end

  describe "avg_stress" do
    test "평일 낮 커밋만 → 1.0" do
      # 2025-03-10 = 월요일 낮
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("feat: b", "2025-03-11T10:00:00Z")
        ])

      assert timeline.avg_stress == 1.0
    end

    test "주말 커밋 포함 시 avg_stress > 1.0" do
      # 2025-03-15 = 토요일
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("fix: b", "2025-03-15T14:00:00Z")
        ])

      assert timeline.avg_stress > 1.0
    end

    test "주차 데이터에 avg_stress 필드 존재" do
      timeline =
        build_timeline([
          commit("feat: x", "2025-03-10T10:00:00Z")
        ])

      [week] = timeline.weeks
      assert Map.has_key?(week, :avg_stress)
    end

    test "빈 리스트 → 1.0" do
      assert Timeline.calculate_avg_stress([]) == 1.0
    end
  end

  describe "filter_by_period/2" do
    test "all → 전체 반환" do
      commits = Analyzer.analyze_commits([
        commit("feat: a", "2020-01-01T10:00:00Z"),
        commit("feat: b", "2025-04-01T10:00:00Z")
      ])

      assert length(Timeline.filter_by_period(commits, "all")) == 2
    end

    test "nil → 전체 반환" do
      commits = Analyzer.analyze_commits([commit("feat: a", "2020-01-01T10:00:00Z")])
      assert length(Timeline.filter_by_period(commits, nil)) == 1
    end

    test "1w → 최근 7일만" do
      old = "2020-01-01T10:00:00Z"
      recent = DateTime.utc_now() |> DateTime.add(-3 * 86400) |> DateTime.to_iso8601()

      commits = Analyzer.analyze_commits([
        commit("feat: old", old),
        commit("feat: recent", recent)
      ])

      filtered = Timeline.filter_by_period(commits, "1w")
      assert length(filtered) == 1
      assert hd(filtered).message == "feat: recent"
    end

    test "1m → 최근 30일만" do
      old = "2020-01-01T10:00:00Z"
      recent = DateTime.utc_now() |> DateTime.add(-10 * 86400) |> DateTime.to_iso8601()

      commits = Analyzer.analyze_commits([
        commit("feat: old", old),
        commit("fix: recent", recent)
      ])

      filtered = Timeline.filter_by_period(commits, "1m")
      assert length(filtered) == 1
    end
  end

  describe "contributor_stats/1" do
    test "기여자별 감정 통계" do
      commits = Analyzer.analyze_commits([
        %{message: "feat: a", date: ~U[2025-03-10 10:00:00Z], author: "alice", sha: "a"},
        %{message: "fix: b", date: ~U[2025-03-11 10:00:00Z], author: "bob", sha: "b"},
        %{message: "feat: c", date: ~U[2025-03-12 10:00:00Z], author: "alice", sha: "c"},
        %{message: "fix: d", date: ~U[2025-03-13 10:00:00Z], author: "alice", sha: "d"}
      ])

      stats = Timeline.contributor_stats(commits)

      assert length(stats) == 2
      alice = Enum.find(stats, &(&1.author == "alice"))
      bob = Enum.find(stats, &(&1.author == "bob"))

      assert alice.commit_count == 3
      assert bob.commit_count == 1
      assert bob.dominant_emotion == :frustrated

      # alice: 2 excited, 1 frustrated → dominant excited
      assert alice.dominant_emotion == :excited
    end

    test "커밋 수 내림차순 정렬" do
      commits = Analyzer.analyze_commits([
        %{message: "feat: a", date: ~U[2025-03-10 10:00:00Z], author: "bob", sha: "a"},
        %{message: "feat: b", date: ~U[2025-03-11 10:00:00Z], author: "alice", sha: "b"},
        %{message: "feat: c", date: ~U[2025-03-12 10:00:00Z], author: "alice", sha: "c"}
      ])

      stats = Timeline.contributor_stats(commits)
      assert hd(stats).author == "alice"
    end

    test "빈 리스트 → 빈 결과" do
      assert Timeline.contributor_stats([]) == []
    end
  end

  describe "overall_vibe" do
    test "excited + frustrated → 열정적이지만 불안정" do
      timeline =
        build_timeline([
          commit("feat: a", "2025-03-10T10:00:00Z"),
          commit("feat: b", "2025-03-10T11:00:00Z"),
          commit("feat: c", "2025-03-10T12:00:00Z"),
          commit("fix: d", "2025-03-11T10:00:00Z"),
          commit("fix: e", "2025-03-11T11:00:00Z")
        ])

      assert timeline.overall_vibe =~ "열정"
    end
  end
end
