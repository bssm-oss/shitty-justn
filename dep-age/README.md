<div align="center">

# dep-age

**Visualize how old your project dependencies are** 📦

[![CI](https://github.com/justn-hyeok/dep-age/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/dep-age/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/dep-age)](https://github.com/justn-hyeok/dep-age/releases)

[:kr: 한국어](./README.ko.md)

</div>

## What is this?

`npm outdated` tells you which packages are behind, but not **how far** behind. **dep-age** scans your project across 4 package managers, calculates a health score, and flags dependencies that are dead — not just outdated.

```
$ dep-age

📦 dep-age scan: ./sample-node

⚠️ Outdated (1)
  jest                 29.0.0       → 30.3.0       30 days behind

💀 Zombie (1)
  left-pad             1.3.0                            2922 days since last update

────────────────────────────────────────
Health: 80/100
Average age: 1476 days
Zombie packages: 1
Suggestion: left-pad → String.prototype.padStart (built-in)
```

## Quick Start

### Homebrew

```bash
brew install justn-hyeok/tap/dep-age
```

### Build from source

Requires [Rust 1.75+](https://rustup.rs/).

```bash
git clone https://github.com/justn-hyeok/dep-age.git
cd dep-age
cargo install --path .
```

### Download binary

Grab the latest binary from the [Releases](https://github.com/justn-hyeok/dep-age/releases) page.

```bash
# macOS arm64
curl -Lo dep-age.tar.gz https://github.com/justn-hyeok/dep-age/releases/latest/download/dep-age-aarch64-apple-darwin.tar.gz
tar xzf dep-age.tar.gz
mv dep-age ~/.local/bin/

# macOS x64
curl -Lo dep-age.tar.gz https://github.com/justn-hyeok/dep-age/releases/latest/download/dep-age-x86_64-apple-darwin.tar.gz

# Linux arm64
curl -Lo dep-age.tar.gz https://github.com/justn-hyeok/dep-age/releases/latest/download/dep-age-aarch64-unknown-linux-gnu.tar.gz

# Linux x64
curl -Lo dep-age.tar.gz https://github.com/justn-hyeok/dep-age/releases/latest/download/dep-age-x86_64-unknown-linux-gnu.tar.gz
```

## Usage

```
Usage: dep-age [OPTIONS]

Options:
      --dir <DIR>              Directory to scan [default: .]
      --format <FORMAT>        Output format [default: terminal] [possible values: terminal, json, markdown]
      --ci <CI>                Exit with code 1 if health score is below this threshold
      --max-depth <MAX_DEPTH>  Max directory scan depth [default: 4]
  -h, --help                   Print help
  -V, --version                Print version
```

### Examples

```bash
# Scan current directory
dep-age

# Scan a specific project
dep-age --dir ~/projects/my-app

# JSON output (pipe-friendly)
dep-age --format json

# Markdown report (good for PR comments / README badges)
dep-age --format markdown

# CI mode — fail the build if health < 80
dep-age --ci 80
```

## Supported Languages

| Language | Manifest | Registry | Version | License | Deprecated |
|----------|----------|----------|:-------:|:-------:|:----------:|
| Node.js | `package.json` | npm | ✅ | ✅ | ✅ |
| Python | `requirements.txt` | PyPI | ✅ | ✅ | ✅ |
| Java | `pom.xml` | Maven Central | ✅ | ✅ | ✅ |
| Go | `go.mod` | Go Proxy | ✅ | ✅ | ✅ |

Deprecation detection: npm `deprecated` field, PyPI "Development Status :: 7 - Inactive" classifier, Maven POM `<relocation>`, Go `// Deprecated:` comment.

## Features

- **Multi-language** — Scan Node, Python, Java, Go projects in a single pass
- **Recursive scan** — Walks your repo and finds every manifest (monorepo friendly)
- **Health score** — Single 0-100 number for dashboard / CI gates
- **Zombie detection** — Flags packages with no updates in 1000+ days
- **Deprecation detection** — Warns on packages explicitly marked as deprecated
- **Replacement suggestions** — `lodash → es-toolkit`, `moment → dayjs`, `chalk → picocolors`, and more
- **3 output formats** — Terminal (colored), JSON, Markdown
- **CI mode** — `--ci 80` fails the build if health score drops below threshold
- **Concurrent API calls** — Parallel registry lookups with semaphore limiting (10 concurrent)
- **License aggregation** — Pulls license info from each registry

## Health Score

Starts at 100.

| Condition | Penalty |
|-----------|--------:|
| Outdated package | -5 |
| Zombie (1000+ days) | -15 |
| Deprecated package | -10 |

Clamped to 0-100.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to your branch (`git push origin feat/awesome`)
5. Open a Pull Request

### Running tests

```bash
cargo test
cargo clippy -- -D warnings
```

## License

[MIT](LICENSE)
