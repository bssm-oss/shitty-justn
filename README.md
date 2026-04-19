<div align="center">

# cli-speedrun

**Terminal command typing speed game** ⌨️ &nbsp; `v0.1.1`

[![CI](https://github.com/justn-hyeok/cli-speedrun/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/cli-speedrun/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![crates.io](https://img.shields.io/crates/v/cli-speedrun.svg)](https://crates.io/crates/cli-speedrun)

[🇰🇷 한국어](./README.ko.md)

<img src="./demo.gif" alt="cli-speedrun demo" width="700">

</div>

## What is this?

Like [monkeytype](https://monkeytype.com), but for terminal commands. Practice typing `git`, `docker`, `linux`, `kubectl`, `npm`, and more — as fast as you can. Real-time character-by-character feedback tells you exactly where you nailed it and where you fumbled.

Built with Rust, [ratatui](https://github.com/ratatui/ratatui), and [crossterm](https://github.com/crossterm-rs/crossterm) for a snappy, cross-platform TUI experience.

## Quick Start

```bash
# Install from crates.io
cargo install cli-speedrun

# Or with Homebrew (macOS)
brew tap justn-hyeok/tap && brew install cli-speedrun

# Or download a prebuilt binary
# → https://github.com/justn-hyeok/cli-speedrun/releases
```

Then just run:

```bash
cli-speedrun
```

Pick a mode, pick a category, and start typing.

## Game Modes

### Speedrun 🏃

Type 10 commands as fast and accurately as you can. Mistyped characters highlight in red — press **Backspace** to fix and keep going. Your final grade is based on total time and accuracy. Chase that S rank!

### Survival 🎯

One mistake costs a life. Three lives total — how far can you get before it's game over?

### Learning 📚

No timer, no pressure. Wrong keys are simply ignored so you build muscle memory for the correct input. Each command comes with a description so you learn what it does while you type it.

## Command Categories

| Category | What you'll type | Examples |
|----------|-----------------|----------|
| **git** | Everyday Git | `git add .`, `git commit -m "msg"` |
| **git-advanced** | Power-user Git | `git rebase -i HEAD~3`, `git cherry-pick abc123` |
| **docker** | Container ops | `docker build -t app .`, `docker compose up -d` |
| **linux** | Essential shell | `chmod 755 script.sh`, `grep -r "pattern" .` |
| **npm** | Node.js tooling | `npm init -y`, `npx create-react-app my-app` |
| **kubectl** | Kubernetes admin | `kubectl get pods`, `kubectl apply -f deploy.yml` |

72 commands across 6 categories, randomly shuffled each game.

## Grading

| Grade | Description | Avg. Time / Command | Accuracy |
|-------|-------------|---------------------|----------|
| **S** | Perfect! | < 1.5 s | > 98% |
| **A** | Excellent | < 2.0 s | > 95% |
| **B** | Great | < 3.0 s | > 90% |
| **C** | Good | < 4.0 s | > 80% |
| **D** | Keep going | everything else | — |

## Features

- **Real-time feedback** — each character lights up green (correct) or red (wrong) as you type
- **Polished TUI** — ASCII art logo, centered typing area, adaptive margins, bolder text, and color-coded accuracy (green/yellow/red)
- **Grade descriptions** on the result screen (e.g. S — Perfect!, A — Excellent)
- **3-2-1 countdown** centered on screen before each round
- **Local records** saved automatically — track your progress over time
- **72 commands** across 6 categories covering real-world CLI usage
- **Random shuffle** every game so you never memorize the order
- **Cross-platform** — works on macOS, Linux, and Windows

## Installation

### From crates.io

```bash
cargo install cli-speedrun
```

### Homebrew (macOS)

```bash
brew tap justn-hyeok/tap && brew install cli-speedrun
```

### Prebuilt Binaries

Download the latest release for your platform from the [Releases](https://github.com/justn-hyeok/cli-speedrun/releases) page:

```bash
chmod +x cli-speedrun
mv cli-speedrun ~/.local/bin/
```

### Build from Source

```bash
git clone https://github.com/justn-hyeok/cli-speedrun.git
cd cli-speedrun
cargo build --release
cp target/release/cli-speedrun ~/.local/bin/
```

## Usage

```bash
# Launch the TUI menu
cli-speedrun

# Jump straight into a game
cli-speedrun --mode speedrun --category git
cli-speedrun --mode survival --category docker
cli-speedrun --mode learning --category kubectl

# Show help
cli-speedrun --help
```

### Controls

| Key | Action |
|-----|--------|
| `Enter` | Confirm input / Next round |
| `Backspace` | Delete character |
| `Esc` | Quit / Back |
| `Tab` | Switch mode (menu) |

## Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

```bash
# Run all 141 tests (unit 75 + E2E 32 + integration 34)
cargo test
```

## License

[MIT](https://opensource.org/licenses/MIT) — use it, modify it, ship it.

---

<p align="center">
  <strong>Become a terminal speed demon.</strong><br>
  5 minutes a day — that's all it takes to level up your CLI game.
</p>
