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

<!-- TODO: TUI 데모 GIF (vhs 또는 asciinema 권장) -->
<!-- <img src="assets/demo.gif" alt="demo" width="700"> -->

{SHORT_DESCRIPTION}

---

## Installation

### Homebrew

```bash
brew install bssm-oss/tap/{PROJECT_NAME}
```

### Download binary

```bash
# macOS (Apple Silicon)
curl -L https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest/download/{PROJECT_NAME}-darwin-arm64.tar.gz | tar xz
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
{PROJECT_NAME} [options]
```

<!-- TODO: 실행 즉시 볼 수 있는 TUI 레이아웃 ASCII 스케치 -->
```
┌─────────────────────────────────────────┐
│  {PROJECT_NAME}                         │
├─────────────────┬───────────────────────┤
│                 │                       │
│  {PANEL_LEFT}   │  {PANEL_RIGHT}        │
│                 │                       │
├─────────────────┴───────────────────────┤
│ {STATUS_BAR}                            │
└─────────────────────────────────────────┘
```

---

## Keybindings

| Key | Action |
|-----|--------|
| `{KEY_1}` | {ACTION_1} |
| `{KEY_2}` | {ACTION_2} |
| `{KEY_3}` | {ACTION_3} |
| `q` / `Ctrl+C` | Quit |
| `?` | Show help |

---

## Options

| Flag | Default | Description |
|------|---------|-------------|
| `--{FLAG_1}` | `{DEFAULT_1}` | {FLAG_1_DESC} |
| `--{FLAG_2}` | `{DEFAULT_2}` | {FLAG_2_DESC} |

---

## Configuration

Config file at `~/.config/{PROJECT_NAME}/config.{EXT}`:

```{CONFIG_FORMAT}
{EXAMPLE_CONFIG}
```

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{INSTALL_COMMAND}
{DEV_COMMAND}
{TEST_COMMAND}
```

---

## License

MIT
