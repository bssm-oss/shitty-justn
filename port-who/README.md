<div align="center">

# port-who

**See who's using your ports — beautifully** :mag:

[![CI](https://github.com/justn-hyeok/port-who/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/port-who/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[:kr: 한국어](./README.ko.md)

<img src="./demo.gif" alt="port-who demo" width="700">

</div>

## What is this?

`lsof -i` output is ugly and hard to read. **port-who** shows open ports with process names, project directories, uptime, and memory usage — in a beautiful ANSI color table.

```
$ port-who

  🌐 5 open ports

  PORT    PROCESS          PROJECT              UPTIME
  ──────────────────────────────────────────────────
  :3000   ⚡ next dev       jagalchi-client      ⬆ 2h 13m
  :3001   ⚡ vite           syncingsh            ⬆ 47m
  :5432   🗄️ postgres       🐳 docker-postgres   ⬆ 3d
  :8080   ☕ java           jagalchi-server      ⬆ 1h
  :8888   ❓ unidentified   pid:12847            ⬆ 47m
```

## Quick Start

### Homebrew

```bash
brew install justn-hyeok/tap/port-who
```

### Build from source

Requires [Zig 0.15+](https://ziglang.org/download/). macOS: `brew install zig`

```bash
git clone https://github.com/justn-hyeok/port-who.git
cd port-who
zig build -Doptimize=ReleaseFast

# Copy binary to your PATH
cp zig-out/bin/port-who ~/.local/bin/
```

### Download binary

Grab the latest binary from the [Releases](https://github.com/justn-hyeok/port-who/releases) page.

```bash
# macOS arm64
curl -Lo port-who https://github.com/justn-hyeok/port-who/releases/latest/download/port-who-macos-arm64
chmod +x port-who
mv port-who ~/.local/bin/

# macOS x64
curl -Lo port-who https://github.com/justn-hyeok/port-who/releases/latest/download/port-who-macos-x64
chmod +x port-who
mv port-who ~/.local/bin/
```

## Usage

```
Usage: port-who [options] [command]

Commands:
  (none)              Show open port listing
  :PORT or PORT       Show details for a specific port
  :PORT-PORT          Filter by port range (e.g. :3000-4000)
  :PORT,PORT,...      Filter by multiple ports (e.g. :3000,8080)
  watch               Real-time monitoring (2s refresh, q to quit)
  kill :PORT          Kill the process occupying a port

Options:
  -a, --all           Include ESTABLISHED connections
  -s, --sort VALUE    Sort by (port|uptime|memory)
  -g, --group         Group ports by process
  -j, --json          Output as JSON
  -h, --help          Show help
  -v, --version       Show version
```

### Examples

```bash
# List all open ports
port-who

# Include ESTABLISHED connections
port-who --all

# Sort by uptime
port-who --sort uptime

# JSON output (pipe-friendly)
port-who --json

# Details for a specific port
port-who :3000

# Filter by port range
port-who :3000-4000

# Filter by multiple ports
port-who :3000,8080

# Group by process
port-who --group

# Real-time monitoring (2s refresh, q to quit)
port-who watch
```

```
$ port-who :3000

:3000 — next dev
  PID:     28471
  CMD:     node /usr/local/bin/next dev
  CWD:     ~/projects/jagalchi-client
  Started: 2026-04-09 14:32
  Uptime:  2h 13m
  Memory:  312MB
```

```bash
# Kill a process by port
port-who kill :8888
```

```
$ port-who kill :8888

:8888 (PID:12847) Kill this process? (y/n) y
✓ PID:12847 terminated
```

## Features

- **Color table** — LISTEN ports displayed in a clean ANSI color table with bold ports and color-coded uptime
- **Watch mode** — `port-who watch` for real-time monitoring with 2-second refresh (press `q` to quit)
- **Docker detection** — Automatically detects Docker container names (shown with `🐳` prefix)
- **Port range & multi-port filter** — `port-who :3000-4000` or `port-who :3000,8080` to narrow results
- **Process grouping** — `--group` flag groups ports by their parent process
- **Process icons** — Visual indicators per process type: `⚡` node, `🗄️` postgres, `🐍` python, `☕` java, `🌐` nginx, `🐳` docker
- **Project detection** — Auto-detects project directories by walking up from CWD looking for `package.json`, `Cargo.toml`, `go.mod`, `build.zig.zon`, `pyproject.toml`, `pom.xml`, `build.gradle`, `Gemfile`, `mix.exs`, `deno.json`, `composer.json`
- **Human-readable uptime** — Durations like `2h 13m`, `3d`, `47m`
- **Process kill** — `kill` command with confirmation prompt (sends SIGTERM)
- **Sorting** — Sort by port number, uptime, or memory usage
- **JSON output** — Pipe to `jq` or other tools
- **Unknown process highlighting** — Unidentified processes shown as `???` so they stand out

## Supported Platforms

| Platform | Status |
|----------|--------|
| macOS | :white_check_mark: Supported (`lsof` based) |
| Linux | :construction: Planned — contributions welcome! |

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to your branch (`git push origin feat/awesome`)
5. Open a Pull Request

### Running tests

```bash
zig build test
```

111 unit tests are included.

## License

[MIT](LICENSE)
