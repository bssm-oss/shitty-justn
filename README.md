<div align="center">

# whatdid

**"What did I do today?" — Auto-generated daily reports from GitHub activity** 📝

[![CI](https://github.com/justn-hyeok/whatdid/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/whatdid/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/whatdid)](https://github.com/justn-hyeok/whatdid/releases)

[:kr: 한국어](./README.ko.md)

</div>

## What is this?

Ever spent 5 minutes trying to remember what you did today for a standup report? **whatdid** scans your GitHub activity — commits, PRs, issues across all your repos — and generates a formatted report in under 4 seconds.

```
$ whatdid today

📅 2026-04-10 ~ 2026-04-11

🔨 Commits: 77
  justn-hyeok/whatdid: feat: rewrite in Go, perf: parallelize API calls (8)
  justn-hyeok/daybar: docs: add localization, chore: bump version (14)
  justn-hyeok/syncingsh: Merge pull request #23, fix: update signaling URL (22)
  ...

🔀 PRs: 12
  justn-hyeok/daybar#5 merged
  justn-hyeok/findkey#9 open
  justn-hyeok/syncingsh#23 merged
  ...

✅ Issues: 5
  justn-hyeok/syncingsh#13 closed
  ...

📊 Summary: 9 repos, 77 commits, 12 PRs, 5 issues
```

## Quick Start

### Homebrew

```bash
brew install justn-hyeok/tap/whatdid
```

### Go install

```bash
go install github.com/justn-hyeok/whatdid@latest
```

### Download binary

Grab the latest binary from the [Releases](https://github.com/justn-hyeok/whatdid/releases) page.

```bash
# macOS arm64
curl -Lo whatdid.tar.gz https://github.com/justn-hyeok/whatdid/releases/latest/download/whatdid-darwin-arm64.tar.gz
tar xzf whatdid.tar.gz
mv whatdid-darwin-arm64 ~/.local/bin/whatdid

# Other platforms: darwin-amd64, linux-arm64, linux-amd64
```

## Auth

whatdid auto-detects your GitHub token from `gh` CLI. If `gh` is installed and authenticated, you're ready to go:

```bash
gh auth login     # if you haven't already
whatdid today     # just works
```

Alternatively, set `GITHUB_TOKEN`:

```bash
export GITHUB_TOKEN=ghp_...
```

Your token needs `repo` (all) and `read:org` scopes.

## Usage

```
Usage: whatdid <command> [options]

Commands:
  today       Today's activity (default)
  yesterday   Yesterday's activity
  week        This week's activity (Mon-today)

Options:
  --format <text|markdown|json|slack>   Output format (default: text)
  --user <username>                     Different user
  --org <org>                           Org-wide activity
  --repo <owner/repo>                   Single repo

  -h, --help
  -v, --version
```

### Examples

```bash
# Today's activity
whatdid today

# Week summary as Markdown (for TIL / blog post)
whatdid week --format markdown

# JSON output (pipe-friendly)
whatdid today --format json | jq '.summary'

# Slack message format
whatdid today --format slack

# Specific repo only
whatdid today --repo justn-hyeok/dep-age
```

## Features

- **Fast** — Parallel REST API calls + HTTP/2 + stale repo filtering. ~4s for a full org scan.
- **Zero config** — Auto-detects GitHub token from `gh` CLI
- **4 output formats** — Plain text (default), Markdown, JSON, Slack mrkdwn
- **All scopes** — Personal repos + org repos you're a member of
- **Smart filtering** — Only fetches repos with recent pushes, skipping stale ones
- **Today / Yesterday / Week** — Time ranges built in, or filter by `--repo` / `--org` / `--user`

## Why Go?

Originally written in TypeScript, rewrote to Go for speed.

|  | TypeScript | Go |
|---|---|---|
| Full scan time | 18s | **4s** |
| Cold start | ~1s (Node) | **0ms** |
| Binary size | npm required | **5.9 MB** single binary |
| Dependencies | octokit, commander | **stdlib only** |

## Supported Platforms

| Platform | Status |
|----------|--------|
| macOS (arm64, x64) | :white_check_mark: |
| Linux (arm64, x64) | :white_check_mark: |
| Windows | :construction: Planned |

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to your branch (`git push origin feat/awesome`)
5. Open a Pull Request

### Build & test

```bash
go build -o whatdid .
go vet ./...
./whatdid --help
```

## License

[MIT](LICENSE)
