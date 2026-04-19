<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <!-- TODO: 배포된 서비스 URL이 있으면 추가 -->
  <!-- <a href="{LIVE_URL}"><img src="https://img.shields.io/website?url={LIVE_URL_ENCODED}" alt="Website"></a> -->
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

<!-- TODO: 스크린샷 또는 데모 GIF -->
<!-- <img src="assets/demo.gif" alt="demo" width="700"> -->
<!-- <img src="assets/screenshot.png" alt="screenshot" width="700"> -->

{SHORT_DESCRIPTION}

<!-- TODO: 라이브 데모 링크가 있으면 -->
<!-- **[→ Try it live]({LIVE_URL})** -->

---

## Quick Start (self-host)

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
cp .env.example .env   # fill in your values
{INSTALL_COMMAND}
{DEV_COMMAND}
```

Open [http://localhost:{PORT}](http://localhost:{PORT}).

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | {FRONTEND_TECH} |
| Backend | {BACKEND_TECH} |
| Database | {DATABASE} |
| Deployment | {DEPLOYMENT} |

---

## Environment Variables

```env
# {CATEGORY_1}
{ENV_VAR_1}={EXAMPLE_VALUE_1}
{ENV_VAR_2}={EXAMPLE_VALUE_2}

# {CATEGORY_2}
{ENV_VAR_3}={EXAMPLE_VALUE_3}
```

See [`.env.example`](.env.example) for a full list.

---

## Deployment

### Docker

```bash
docker compose up -d
```

### {PLATFORM} (e.g. Vercel / Railway / Fly.io)

```bash
{DEPLOY_COMMAND}
```

---

## Documentation

| Doc | Content |
|-----|---------|
| [API Reference](docs/API.md) | REST / WebSocket endpoints |
| [Configuration](docs/CONFIGURATION.md) | All environment variables |
| [Architecture](docs/ARCHITECTURE.md) | System design |

---

## Development

```bash
{INSTALL_COMMAND}
{DEV_COMMAND}
{TEST_COMMAND}
```

---

## License

MIT
