class Whatdid < Formula
  desc "Auto-generate daily/weekly reports from GitHub activity"
  homepage "https://github.com/bssm-oss/whatdid"
  version "0.2.2"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/bssm-oss/whatdid/releases/download/v0.2.2/whatdid-darwin-arm64.tar.gz"
      sha256 "98f94ef3c4e162f481e6801812684210c34c0b6d697581aa445f950ddec202f7"
    end
    on_intel do
      url "https://github.com/bssm-oss/whatdid/releases/download/v0.2.2/whatdid-darwin-amd64.tar.gz"
      sha256 "295b20b0fc6af1266066a670292df8d0269f05b53677d36ad0f33c277609158c"
    end
  end

  on_linux do
    on_arm do
      url "https://github.com/bssm-oss/whatdid/releases/download/v0.2.2/whatdid-linux-arm64.tar.gz"
      sha256 "341c4b12a3e77286706b4372919bcea85199c22182004ae3ccb1caed9728c73b"
    end
    on_intel do
      url "https://github.com/bssm-oss/whatdid/releases/download/v0.2.2/whatdid-linux-amd64.tar.gz"
      sha256 "2e1792b4e264a6e7374dcf0e8c9dc739e88235ccac2410c4aaeb4a75ad871d82"
    end
  end

  def install
    bin.install stable.url.split("/").last.sub(".tar.gz", "") => "whatdid"
  end

  test do
    system "#{bin}/whatdid", "--help"
  end
end
