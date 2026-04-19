class PortWho < Formula
  desc "Beautiful CLI that shows which processes are using which ports"
  homepage "https://github.com/bssm-oss/shitty-justn/tree/main/port-who"
  version "0.4.1"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/port-who-v0.4.1/port-who-macos-arm64"
      sha256 "6c5d0ebb3a6abd65be455ed201a2245ee7ebb8c36beede78b5f887aa3669f9bd"
    end
    on_intel do
      url "https://github.com/bssm-oss/shitty-justn/releases/download/port-who-v0.4.1/port-who-macos-x64"
      sha256 "6218242326800a86311380874e87b650fe5d8567ce12c234aaf96854b1ad23b2"
    end
  end

  def install
    bin.install stable.url.split("/").last => "port-who"
  end

  test do
    system "#{bin}/port-who", "--help"
  end
end
