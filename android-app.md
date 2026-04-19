<p align="center">
  <!-- TODO: assets/logo.svg 또는 assets/logo.png -->
  <img src="assets/logo.svg" width="100" alt="{PROJECT_NAME} Logo">
</p>

<h1 align="center">{PROJECT_NAME}</h1>
<p align="center"><strong>{TAGLINE}</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/Android-{MIN_SDK}%2B-3DDC84?logo=android" alt="Android">
  <img src="https://img.shields.io/github/v/release/bssm-oss/{PROJECT_NAME}" alt="Release">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
  <a href="README.ko.md">🇰🇷 한국어</a>
</p>

<!-- TODO: 스크린샷 또는 데모 GIF -->
<!-- <img src="assets/demo.gif" alt="demo" width="300"> -->

{SHORT_DESCRIPTION}

---

## Requirements

- Android {MIN_SDK}+ (API level {MIN_API_LEVEL})
- {ADDITIONAL_REQUIREMENT_IF_ANY}

---

## Installation

### APK (recommended)

1. Download the latest `.apk` from [Releases](https://github.com/bssm-oss/{PROJECT_NAME}/releases/latest)
2. Enable "Install from unknown sources" in Settings > Security
3. Open the downloaded `.apk` to install

### Build from source

Requires Android Studio {ANDROID_STUDIO_VERSION}+.

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
./gradlew assembleDebug
# APK output: app/build/outputs/apk/debug/app-debug.apk
```

---

## Permissions

| Permission | Why |
|------------|-----|
| `{PERMISSION_1}` | {PERMISSION_1_REASON} |
| `{PERMISSION_2}` | {PERMISSION_2_REASON} |

---

## Setup

<!-- TODO: 처음 실행 시 설정 흐름 -->

1. {SETUP_STEP_1}
2. {SETUP_STEP_2}
3. {SETUP_STEP_3}

---

## Usage

<!-- TODO: 주요 기능 설명 -->

{USAGE_DESCRIPTION}

---

## Configuration

<!-- TODO: 설정 화면이나 파일이 있으면 설명 -->

| Setting | Default | Description |
|---------|---------|-------------|
| `{SETTING_1}` | `{DEFAULT_1}` | {SETTING_1_DESC} |
| `{SETTING_2}` | `{DEFAULT_2}` | {SETTING_2_DESC} |

---

## Development

```bash
git clone https://github.com/bssm-oss/{PROJECT_NAME}
cd {PROJECT_NAME}
./gradlew build
./gradlew test
```

---

## License

MIT
