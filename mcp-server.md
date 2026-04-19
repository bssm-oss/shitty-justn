<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/MCP-compatible-blueviolet" alt="MCP">
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

{SHORT_DESCRIPTION}

---

## Tools

| Tool | Description |
|------|-------------|
| `{TOOL_1}` | {TOOL_1_DESC} |
| `{TOOL_2}` | {TOOL_2_DESC} |
| `{TOOL_3}` | {TOOL_3_DESC} |

---

## Quick Start

### Install

```bash
{INSTALL_COMMAND}
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "{SERVER_ID}": {
      "command": "{COMMAND}",
      "args": {ARGS_ARRAY},
      "env": {
        "{ENV_KEY}": "{ENV_VALUE}"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "{SERVER_ID}": {
      "command": "{COMMAND}",
      "args": {ARGS_ARRAY}
    }
  }
}
```

### Claude Code

```bash
claude mcp add {SERVER_ID} {COMMAND} {ARGS}
```

---

## Tool Reference

### `{TOOL_1}`

{TOOL_1_DESCRIPTION}

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `{PARAM_1}` | `{TYPE_1}` | {REQUIRED_1} | {PARAM_1_DESC} |
| `{PARAM_2}` | `{TYPE_2}` | {REQUIRED_2} | {PARAM_2_DESC} |

**Example:**

```
{TOOL_1_EXAMPLE_CALL}
→ {TOOL_1_EXAMPLE_RESULT}
```

### `{TOOL_2}`

{TOOL_2_DESCRIPTION}

---

## Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `{ENV_VAR_1}` | Yes | {ENV_VAR_1_DESC} |
| `{ENV_VAR_2}` | No | {ENV_VAR_2_DESC} |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{INSTALL_COMMAND}
{DEV_COMMAND}   # stdio mode for local testing
{TEST_COMMAND}
```

To test manually with the MCP inspector:

```bash
npx @modelcontextprotocol/inspector {RUN_COMMAND}
```

---

## License

MIT
