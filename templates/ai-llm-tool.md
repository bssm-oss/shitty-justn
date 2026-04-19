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

<!-- TODO: 실제 사용 예시 출력으로 교체 -->
```
$ {PROJECT_NAME} {EXAMPLE_COMMAND}

{EXAMPLE_OUTPUT}
```

{SHORT_DESCRIPTION}

---

## Quick Start

```bash
# Install
{INSTALL_COMMAND}

# Setup API key
{API_KEY_SETUP_COMMAND}

# Run
{RUN_COMMAND}
```

---

## Supported Providers

| Provider | Type | Cost | Notes |
|----------|------|------|-------|
| {PROVIDER_1} | API | {COST_1} | {NOTE_1} |
| {PROVIDER_2} | API | {COST_2} | {NOTE_2} |
| {PROVIDER_3} | CLI | {COST_3} | {NOTE_3} |

[Full provider list →](docs/PROVIDERS.md)

---

## How It Works

```
{INPUT}
    │
    ├── {STAGE_1} ──────────────────┐
    ├── {STAGE_2} ──────────────────┤ parallel
    └── {STAGE_3} ──────────────────┘
                │
            {STAGE_4}
                │
            {OUTPUT}
```

---

## Configuration

```json
{
  "{CONFIG_KEY_1}": "{CONFIG_VALUE_1}",
  "{CONFIG_KEY_2}": "{CONFIG_VALUE_2}",
  "providers": [
    {
      "provider": "{PROVIDER_ID}",
      "model": "{MODEL_ID}",
      "apiKey": "{YOUR_API_KEY}"
    }
  ]
}
```

Save as `{CONFIG_FILE_PATH}` or pass via `--config`.

| Key | Default | Description |
|-----|---------|-------------|
| `{KEY_1}` | `{DEFAULT_1}` | {KEY_1_DESC} |
| `{KEY_2}` | `{DEFAULT_2}` | {KEY_2_DESC} |

---

## Commands

| Command | Description |
|---------|-------------|
| `{CMD_1}` | {CMD_1_DESC} |
| `{CMD_2}` | {CMD_2_DESC} |
| `{CMD_3}` | {CMD_3_DESC} |

---

## Documentation

| Doc | Content |
|-----|---------|
| [Providers](docs/PROVIDERS.md) | Full provider list and setup |
| [Configuration](docs/CONFIGURATION.md) | Config file reference |
| [Architecture](docs/ARCHITECTURE.md) | Pipeline design |

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
