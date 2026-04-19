<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/macOS-14%2B-black?logo=apple" alt="macOS">
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

<!-- TODO: 스크린샷 또는 데모 GIF로 교체 -->
<!-- <img src="assets/demo.gif" alt="demo" width="600"> -->
<!-- <img src="assets/screenshot.png" alt="screenshot" width="600"> -->

{SHORT_DESCRIPTION}

---

## Requirements

- macOS {MACOS_VERSION}+
- {ADDITIONAL_REQUIREMENT_IF_ANY}

---

## Installation

### DMG (recommended)

1. Download the latest `.dmg` from [Releases](https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest)
2. Open the `.dmg` and drag `{PROJECT_NAME}.app` to `/Applications`
3. Launch from Spotlight or Applications folder

### Homebrew

```bash
brew install --cask bssm-oss/tap/{PROJECT_NAME}
```

### Build from source

Requires Xcode {XCODE_VERSION}+.

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
{BUILD_COMMAND}
```

---

## Permissions

<!-- TODO: 앱에서 요구하는 권한만 남기고 나머지 삭제 -->

| Permission | Why |
|------------|-----|
| Accessibility | {ACCESSIBILITY_REASON} |
| Screen Recording | {SCREEN_RECORDING_REASON} |
| Notifications | {NOTIFICATIONS_REASON} |
| {OTHER_PERMISSION} | {OTHER_REASON} |

---

## Usage

<!-- TODO: 주요 기능/사용 흐름 설명 -->

{USAGE_DESCRIPTION}

### Menu Bar

<!-- TODO: 메뉴바 앱인 경우 -->

| Action | Description |
|--------|-------------|
| Left click | {LEFT_CLICK_ACTION} |
| Right click | {RIGHT_CLICK_ACTION} |

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `{KEY_1}` | {ACTION_1} |
| `{KEY_2}` | {ACTION_2} |

---

## Configuration

<!-- TODO: 설정 파일 또는 UI 설정이 있으면 설명 -->

Settings are stored at `~/Library/Application Support/{PROJECT_NAME}/`.

| Setting | Default | Description |
|---------|---------|-------------|
| `{SETTING_1}` | `{DEFAULT_1}` | {SETTING_1_DESC} |
| `{SETTING_2}` | `{DEFAULT_2}` | {SETTING_2_DESC} |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
open {PROJECT_NAME}.xcodeproj
```

---

## License

MIT
