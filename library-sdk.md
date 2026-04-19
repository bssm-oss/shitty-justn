<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <a href="https://www.npmjs.com/package/{PACKAGE_NAME}"><img src="https://img.shields.io/npm/v/{PACKAGE_NAME}" alt="npm"></a>
  <a href="https://github.com/bssm-oss/{PROJECT_NAME}/actions/workflows/ci.yml"><img src="https://github.com/bssm-oss/{PROJECT_NAME}/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

{SHORT_DESCRIPTION}

It does **not** {WHAT_IT_DOES_NOT_1}.  
It does **not** {WHAT_IT_DOES_NOT_2}.

Instead, it {WHAT_IT_ACTUALLY_DOES}.

---

## Install

```bash
npm install {PACKAGE_NAME}
# or
pnpm add {PACKAGE_NAME}
```

---

## Quick Start

```ts
import { {MAIN_EXPORT} } from '{PACKAGE_NAME}'

// {QUICK_START_COMMENT}
const {INSTANCE} = new {MAIN_EXPORT}({
  {CONFIG_KEY_1}: {CONFIG_VALUE_1},
  {CONFIG_KEY_2}: {CONFIG_VALUE_2},
})

// {USAGE_COMMENT}
const result = {INSTANCE}.{METHOD}({ARGS})
```

---

## How It Works

```
{INPUT}
  │
  ├── {STEP_1}
  ├── {STEP_2}
  └── {STEP_3}
        │
      {OUTPUT}
```

---

## Core Concepts

### {CONCEPT_1}

{CONCEPT_1_DESCRIPTION}

### {CONCEPT_2}

{CONCEPT_2_DESCRIPTION}

---

## API Reference

### `{CLASS_OR_FUNCTION_1}(options)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `{OPTION_1}` | `{TYPE_1}` | `{DEFAULT_1}` | {OPTION_1_DESC} |
| `{OPTION_2}` | `{TYPE_2}` | `{DEFAULT_2}` | {OPTION_2_DESC} |

### `{METHOD_1}(args)`

```ts
{METHOD_1_SIGNATURE}
```

{METHOD_1_DESCRIPTION}

---

## Documentation

| Doc | Content |
|-----|---------|
| [API Reference](docs/API.md) | Full API docs |
| [Architecture](docs/ARCHITECTURE.md) | Design decisions |
| [Examples](docs/EXAMPLES.md) | Real-world patterns |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{INSTALL_COMMAND}
{BUILD_COMMAND}
{TEST_COMMAND}
{TYPECHECK_COMMAND}
```

---

## License

MIT
