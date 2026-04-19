class CliSpeedrun < Formula
  desc "Terminal command typing speed game - like monkeytype for CLI"
  homepage "https://github.com/bssm-oss/cli-speedrun"
  version "0.1.1"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/bssm-oss/cli-speedrun/releases/download/v0.1.1/cli-speedrun"
      sha256 "f007bc8174e18c7f6e06ca8b721b2f3a99f7be66a01c005194034d6879c2522a"
    end
  end

  def install
    bin.install "cli-speedrun"
  end

  test do
    system "#{bin}/cli-speedrun", "--help"
  end
end
