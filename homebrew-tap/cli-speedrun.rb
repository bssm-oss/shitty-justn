class CliSpeedrun < Formula
  desc "Terminal command typing speed game - like monkeytype for CLI"
  homepage "https://github.com/bssm-oss/shitty-justn/tree/main/cli-speedrun"
  version "0.1.1"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/cli-speedrun-v0.1.1/cli-speedrun-macos-arm64"
      sha256 "f007bc8174e18c7f6e06ca8b721b2f3a99f7be66a01c005194034d6879c2522a"
    end
    on_intel do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/cli-speedrun-v0.1.1/cli-speedrun-macos-x64"
      sha256 ""
    end
  end

  on_linux do
    on_arm do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/cli-speedrun-v0.1.1/cli-speedrun-linux-arm64"
      sha256 ""
    end
    on_intel do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/cli-speedrun-v0.1.1/cli-speedrun-linux-x64"
      sha256 ""
    end
  end

  def install
    bin.install stable.url.split("/").last => "cli-speedrun"
  end

  test do
    system "#{bin}/cli-speedrun", "--help"
  end
end
