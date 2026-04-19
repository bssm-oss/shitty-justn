class GitRoast < Formula
  desc "CLI that roasts developers by analyzing their git commit history"
  homepage "https://github.com/bssm-oss/git-roast"
  version "0.2.0"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/bssm-oss/git-roast/releases/download/v0.2.0/git-roast-macos-arm64"
      sha256 "7b7f76861f5b4b40563c5f7e3fddc1de7797e7db42ef7a7b5d3d429dc1f5eb28"
    end
    on_intel do
      url "https://github.com/bssm-oss/git-roast/releases/download/v0.2.0/git-roast-macos-x64"
      sha256 "479003e9eaa0b8853410e83b9100663b42e580b3ad4dde501b528242babcc324"
    end
  end

  on_linux do
    on_arm do
      url "https://github.com/bssm-oss/git-roast/releases/download/v0.2.0/git-roast-linux-arm64"
      sha256 "616c4e45b3182e9444e859898d492c7877200c72f1d8ca703c63b57e76452e9e"
    end
    on_intel do
      url "https://github.com/bssm-oss/git-roast/releases/download/v0.2.0/git-roast-linux-x64"
      sha256 "abb05c0754606901b22bc3aa70dd3bff792c9421b2f2dfbc7c50d4f5bbc56bdc"
    end
  end

  def install
    bin.install stable.url.split("/").last => "git-roast"
  end

  test do
    system "#{bin}/git-roast", "--help"
  end
end
