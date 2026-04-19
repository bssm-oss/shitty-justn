<p align="center">
  <img src="assets/logo.svg" width="100" alt="bssm-oss templates">
</p>

<h1 align="center">templates</h1>
<p align="center"><strong>bssm-oss 프로젝트 유형별 README 템플릿 모음</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/templates-9-blueviolet" alt="Templates">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>

---

## 컨셉

모든 템플릿은 세 가지 기준을 따른다.

- **형식**: 센터 헤더 + 로고 + tagline + 배지 ([CodeAgora](https://github.com/bssm-oss/CodeAgora) 스타일)
- **구조**: "What it is" + "What it is NOT" + Quick Start + 섹션 계층 ([AdaptiveUIRuntime](https://github.com/bssm-oss/AdaptiveUIRuntime) 스타일)
- **언어**: 영어 우선, 한국어 링크 (`README.ko.md`)

---

## Templates

| Template | 대상 프로젝트 유형 | 예시 |
|----------|------------------|------|
| [cli.md](cli.md) | CLI 도구 | dep-age, whatdid, git-roast, port-who |
| [macos-app.md](macos-app.md) | macOS 앱 (메뉴바 포함) | daybar, killsnail, katalk-ax |
| [android-app.md](android-app.md) | Android 앱 | kakao-talk-auto-bot, AICall |
| [chrome-extension.md](chrome-extension.md) | Chrome 확장 | repo-tag, MorphUI, readable |
| [web-service.md](web-service.md) | 웹 서비스 | syncingsh, commit-vibe, marubase |
| [library-sdk.md](library-sdk.md) | 라이브러리 / SDK | AdaptiveUIRuntime, PLASMA |
| [ai-llm-tool.md](ai-llm-tool.md) | AI / LLM 도구 | beautiful-ccg, cotor, Free-API |
| [mcp-server.md](mcp-server.md) | MCP 서버 | katalk-ax-mcp, @codeagora/mcp |
| [tui-app.md](tui-app.md) | TUI 앱 | terminal-pet |

---

## 사용 방법

1. 프로젝트 유형에 맞는 템플릿 파일을 복사한다.
2. `{PLACEHOLDER}` 항목을 전부 채운다.
3. `<!-- TODO: ... -->` 주석을 따라 스크린샷, GIF, 다이어그램을 추가한다.
4. 필요 없는 섹션은 삭제한다.
5. `README.ko.md`를 만들어 한국어 버전을 추가한다.

---

## Placeholder 규칙

| Placeholder | 설명 |
|-------------|------|
| `{PROJECT_NAME}` | 저장소 이름 (kebab-case) |
| `{TAGLINE}` | 한 줄 설명 — 동사로 시작하거나 명확한 명사구 |
| `{SHORT_DESCRIPTION}` | 2-3문장 요약. 무엇을 하는지 + 무엇을 하지 않는지 |
| `{PACKAGE_NAME}` | npm / pip / cargo 패키지 이름 |
| `{LANGUAGE_RUNTIME}` | Go, Rust, Node.js 20+ 등 |

---

## License

MIT
