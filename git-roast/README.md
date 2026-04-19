<div align="center">

# git-roast

**Roast developers by analyzing their git commit history** :fire:

[![CI](https://github.com/justn-hyeok/git-roast/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/git-roast/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JSR](https://jsr.io/badges/@justn-hyeok/git-roast)](https://jsr.io/@justn-hyeok/git-roast)

[한국어](./README.ko.md)

<img src="./demo.gif" alt="git-roast demo" width="700">

</div>

## What is this?

git-roast analyzes your git commit history and roasts you based on your coding habits.
9,997 hand-crafted Korean roast templates (9,494 analysis + 503 closing) across 10 categories, each with 700–1,000+ templates. No AI, just pure judgment.

## Quick Start

### Homebrew

```bash
brew tap justn-hyeok/tap
brew install git-roast
```

### Deno

```bash
# Install globally
deno install --allow-run --allow-net --allow-read --allow-env \
  -n git-roast \
  https://raw.githubusercontent.com/justn-hyeok/git-roast/main/main.ts

# Or run directly without installing
deno run --allow-run --allow-net --allow-read --allow-env \
  https://raw.githubusercontent.com/justn-hyeok/git-roast/main/main.ts
```

### JSR

```bash
deno add @justn-hyeok/git-roast
```

### Binary Download

Grab a prebuilt binary from [Releases](https://github.com/justn-hyeok/git-roast/releases) (macOS / Linux / Windows):

```bash
chmod +x git-roast
./git-roast
```

## Usage

```bash
# Roast the current repo
git-roast

# Roast a specific local repo
git-roast --path /path/to/repo

# Roast a GitHub user
git-roast <username>

# Roast a GitHub repo
git-roast --repo owner/repo

# Limit analysis to the last 100 commits
git-roast --limit 100

# Disable color output (for piping/redirects)
git-roast --no-color
```

### All Options

| Flag | Description | Default |
|------|-------------|---------|
| `--path <path>` | Path to a local git repo | Current directory |
| `--repo <owner/repo>` | Analyze a GitHub repo | - |
| `<username>` | Analyze a GitHub user | - |
| `--limit <n>` | Max commits to analyze | 500 |
| `--no-color` | Disable ANSI colors | false |
| `--help`, `-h` | Show help | - |
| `--version`, `-v` | Show version | - |

## 10 Analysis Categories

| # | Category | What it checks |
|---|----------|----------------|
| 1 | :speech_balloon: **Commit Messages** | Ratio of meaningless messages like "fix", "wip", "asdf" |
| 2 | :crescent_moon: **Time Patterns** | Late-night and weekend commit frequency |
| 3 | :repeat: **File Churn** | Files modified an unreasonable number of times |
| 4 | :bomb: **Commit Size** | How many lines you change per commit |
| 5 | :seedling: **Streak** | Consecutive commit days and gaps |
| 6 | :busts_in_silhouette: **Contributors** | Solo wolf or team player? |
| 7 | :rotating_light: **Force Push** | Detected force push events from reflog |
| 8 | :clock3: **Commit Frequency** | Time gaps and irregularities between commits |
| 9 | :globe_with_meridians: **Languages** | Primary languages based on file extensions |
| 10 | :evergreen_tree: **Branches** | Branch count, merge ratio, zombie branches |

Each finding is assigned one of four severity levels:

> `[~]` **mild** | `[!]` **medium** | `[!!]` **savage** | `[!!!]` **legendary**

## How it Works

```
git log  -->  10 Analyzers  -->  Severity Assignment  -->  Random Roast Template  -->  Formatted Output
```

1. **Collect** -- Read git log (local or GitHub API)
2. **Analyze** -- Run 10 independent analyzers, each producing a severity + stats
3. **Roast** -- Pick a matching template from 9,997 hand-crafted Korean roast lines
4. **Output** -- Format with severity indicators and color

No LLMs. No network calls (unless analyzing a GitHub repo). Just deterministic, statistically-backed insults.

## Contributing

1. Fork and create a branch
2. Make your changes
3. Write tests (`deno task test`)
4. Open a PR

Roast template contributions are especially welcome! Add yours to `src/roasts/templates.ts`. The funnier and more brutal, the better.

```bash
# Development commands
deno task dev        # Run in dev mode
deno task test       # Run tests
deno task lint       # Lint
deno task fmt        # Format
deno task coverage   # Check coverage
```

## License

[MIT](https://opensource.org/licenses/MIT)

---

<p align="center">
  <i>Your commit history doesn't lie. git-roast just reads it out loud.</i>
</p>
