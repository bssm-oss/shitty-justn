<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <!-- TODO: Chrome Web Store에 올린 경우 배지 교체 -->
  <!-- <a href="https://chrome.google.com/webstore/detail/{EXTENSION_ID}"><img src="https://img.shields.io/chrome-web-store/v/{EXTENSION_ID}" alt="Chrome Web Store"></a> -->
  <img src="https://img.shields.io/badge/Chrome-MV3-4285F4?logo=googlechrome" alt="Chrome MV3">
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

<!-- TODO: 데모 GIF -->
<!-- <img src="assets/demo.gif" alt="demo" width="700"> -->

{SHORT_DESCRIPTION}

---

## Installation

### Chrome Web Store

<!-- TODO: 스토어에 올린 경우 -->
[Install from Chrome Web Store →](https://chrome.google.com/webstore/detail/{EXTENSION_ID})

### Manual install (developer mode)

1. Download the latest `.zip` from [Releases](https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest) and unzip
2. Open `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the unzipped folder

### Build from source

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{INSTALL_COMMAND}
{BUILD_COMMAND}
# Output: dist/
```

Then load `dist/` via **Load unpacked**.

---

## Permissions

| Permission | Why |
|------------|-----|
| `{PERMISSION_1}` | {PERMISSION_1_REASON} |
| `{PERMISSION_2}` | {PERMISSION_2_REASON} |

This extension does **not** collect or transmit any personal data.

---

## Usage

<!-- TODO: 주요 기능 및 사용 흐름 -->

{USAGE_DESCRIPTION}

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `{KEY_1}` | {ACTION_1} |
| `{KEY_2}` | {ACTION_2} |

---

## Configuration

<!-- TODO: 옵션 페이지 또는 popup 설정이 있으면 설명 -->

Open the extension options page to configure:

| Setting | Default | Description |
|---------|---------|-------------|
| `{SETTING_1}` | `{DEFAULT_1}` | {SETTING_1_DESC} |
| `{SETTING_2}` | `{DEFAULT_2}` | {SETTING_2_DESC} |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{INSTALL_COMMAND}
{DEV_COMMAND}   # watch mode
```

Load `dist/` in Chrome via developer mode.

---

## License

MIT
