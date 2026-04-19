class DepAge < Formula
  desc "Visualize how old your project dependencies are"
  homepage "https://github.com/bssm-oss/shitty-justn/tree/main/dep-age"
  version "0.1.0"
  license "MIT"

  on_macos do
    on_intel do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/dep-age-v0.1.0/dep-age-x86_64-apple-darwin.tar.gz"
      sha256 "14dc5f9187ae7c8dc6a7273fe4b8f957e203fcad3dc23db93655b97c33d9f35f"
    end
    on_arm do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/dep-age-v0.1.0/dep-age-aarch64-apple-darwin.tar.gz"
      sha256 "db80a077961df3bbf81c64c605c00674a021d20fe24dee158f0f60d1354b61c2"
    end
  end

  on_linux do
    on_intel do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/dep-age-v0.1.0/dep-age-x86_64-unknown-linux-gnu.tar.gz"
      sha256 "acb3a7d5c9457f8656baad3cb6b257a11b0ca295aeb4b0cb9d82d29e73bb980a"
    end
    on_arm do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/dep-age-v0.1.0/dep-age-aarch64-unknown-linux-gnu.tar.gz"
      sha256 "cd2bec97703c2448dfc1dcca528792fb5d83c2887eb14ce77df9a3b8883ee3b6"
    end
  end

  def install
    bin.install "dep-age"
  end

  test do
    system "#{bin}/dep-age", "--help"
  end
end
