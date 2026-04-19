<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <a href="https://github.com/bssm-oss/{PROJECT_NAME}/actions/workflows/ci.yml"><img src="https://github.com/bssm-oss/{PROJECT_NAME}/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

<!-- TODO: 실제 터미널 출력으로 교체 -->
```
$ {PROJECT_NAME} {EXAMPLE_COMMAND}

{EXAMPLE_OUTPUT_LINE_1}
{EXAMPLE_OUTPUT_LINE_2}
{EXAMPLE_OUTPUT_LINE_3}
```

{SHORT_DESCRIPTION}

---

## Quick Start

### Homebrew

```bash
brew install bssm-oss/tap/{PROJECT_NAME}
```

### Download binary

```bash
# macOS (Apple Silicon)
curl -L https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest/download/{PROJECT_NAME}-darwin-arm64.tar.gz | tar xz
sudo mv {PROJECT_NAME} /usr/local/bin/

# macOS (Intel)
curl -L https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest/download/{PROJECT_NAME}-darwin-x86_64.tar.gz | tar xz
sudo mv {PROJECT_NAME} /usr/local/bin/

# Linux
curl -L https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest/download/{PROJECT_NAME}-linux-x86_64.tar.gz | tar xz
sudo mv {PROJECT_NAME} /usr/local/bin/
```

### Build from source

Requires [{LANGUAGE_RUNTIME}]({RUNTIME_URL}).

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{BUILD_COMMAND}
```

---

## Usage

```bash
{PROJECT_NAME} {COMMAND} [options]
```

<!-- TODO: 핵심 사용 예시 2-3개 -->
```bash
# {USE_CASE_1}
{PROJECT_NAME} {EXAMPLE_1}

# {USE_CASE_2}
{PROJECT_NAME} {EXAMPLE_2}
```

---

## Commands

| Command | Description |
|---------|-------------|
| `{CMD_1}` | {CMD_1_DESC} |
| `{CMD_2}` | {CMD_2_DESC} |
| `{CMD_3}` | {CMD_3_DESC} |

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--{FLAG_1}` | `{DEFAULT_1}` | {FLAG_1_DESC} |
| `--{FLAG_2}` | `{DEFAULT_2}` | {FLAG_2_DESC} |
| `--json` | `false` | Output as JSON |

---

## Documentation

| Doc | Content |
|-----|---------|
| [CLI Reference](docs/CLI_REFERENCE.md) | All commands and flags |
| [Configuration](docs/CONFIGURATION.md) | Config file guide |
| [Examples](docs/EXAMPLES.md) | Real-world usage examples |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{DEV_INSTALL_COMMAND}
{DEV_RUN_COMMAND}
{TEST_COMMAND}
```

---

## License

MIT
