defmodule CommitVibe.OgImageTest do
  use ExUnit.Case, async: true

  alias CommitVibe.{Analyzer, Timeline, OgImage}

  defp sample_timeline do
    commits =
      Analyzer.analyze_commits([
        %{message: "feat: login", date: ~U[2025-03-10 10:00:00Z], author: "alice", sha: "a"},
        %{message: "fix: crash", date: ~U[2025-03-11 10:00:00Z], author: "bob", sha: "b"},
        %{message: "refactor: clean", date: ~U[2025-03-17 14:00:00Z], author: "alice", sha: "c"}
      ])

    Timeline.build("owner/repo", commits)
  end

  describe "generate_svg/1" do
    test "returns valid SVG string" do
      svg = OgImage.generate_svg(sample_timeline())
      assert String.starts_with?(svg, "<svg")
      assert svg =~ "xmlns=\"http://www.w3.org/2000/svg\""
      assert svg =~ "</svg>"
    end

    test "includes repo name" do
      svg = OgImage.generate_svg(sample_timeline())
      assert svg =~ "owner/repo"
    end

    test "includes vibe summary" do
      timeline = sample_timeline()
      svg = OgImage.generate_svg(timeline)
      assert svg =~ timeline.overall_vibe
    end

    test "includes commit count" do
      svg = OgImage.generate_svg(sample_timeline())
      assert svg =~ "3개 커밋"
    end

    test "includes emotion colors" do
      svg = OgImage.generate_svg(sample_timeline())
      # At least one emotion color should be present
      assert svg =~ "#22c55e" or svg =~ "#ef4444" or svg =~ "#f97316"
    end

    test "handles empty timeline" do
      timeline = %{
        repo: "empty/repo",
        overall_vibe: "커밋이 없어요 👻",
        volatility: 0.0,
        total_commits: 0,
        weeks: [],
        period: {nil, nil}
      }

      svg = OgImage.generate_svg(timeline)
      assert svg =~ "empty/repo"
      assert svg =~ "</svg>"
    end

    test "escapes special characters in repo name" do
      timeline = sample_timeline()
      timeline = %{timeline | repo: "test/<script>alert(1)</script>"}
      svg = OgImage.generate_svg(timeline)
      refute svg =~ "<script>"
      assert svg =~ "&lt;script&gt;"
    end
  end
end
