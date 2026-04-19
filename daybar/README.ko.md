<div align="center">

# daybar

**macOS 메뉴바 D-day 카운트다운 트래커** 🎓

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/daybar)](https://github.com/justn-hyeok/daybar/releases)

[English](./README.md)

</div>

## 이게 뭐야?

시험, 마감, 여행 같은 중요한 날짜들, 매번 달력 열어보기 귀찮죠. **daybar**는 macOS 메뉴바에 상주하면서 **가장 가까운 D-day**를 항상 보여줍니다. 앱 열 필요 없이 메뉴바만 흘깃 보면 됩니다.

```
🎓 D-42      ← 메뉴바에 항상 표시 (가장 가까운 D-day)
```

메뉴바 아이콘을 클릭하면 전체 목록이 드롭다운으로 나옵니다.

```
┌──────────────────────┐
│  🎓 수능      D-42   │
│  🎂 생일      D-104  │
│  ✈️ 여행      D+3    │
├──────────────────────┤
│  + 추가              │
│  설정                │
│  종료                │
└──────────────────────┘
```

## 빠른 시작

### Homebrew

```bash
brew install --cask justn-hyeok/tap/daybar
```

### 수동 설치

[Releases](https://github.com/justn-hyeok/daybar/releases)에서 `.dmg`를 받아 `daybar.app`을 `/Applications`에 드래그.

### CLI

설치 후 터미널에서도 실행 가능:

```bash
daybar
```

## 첫 실행 시 Gatekeeper 경고

daybar는 Apple 공증(Notarize)이 되어있지 않아서 macOS가 막을 수 있습니다.

**방법 1 — 시스템 설정**

> 시스템 설정 → 개인 정보 보호 및 보안 → "확인되지 않은 개발자" 섹션 → **그래도 열기**

**방법 2 — 터미널**

```bash
xattr -cr /Applications/daybar.app
```

## 사용법

| 동작 | 설명 |
|------|------|
| 메뉴바 아이콘 클릭 | D-day 목록 드롭다운 |
| **+ 추가** | 새 D-day 등록 (이름 / 날짜 / 이모지) |
| 항목 클릭 | 편집 또는 삭제 |
| **선택 & 삭제** | 여러 항목 일괄 삭제 |
| **설정 (⌘,)** | 로그인 시 자동 시작, 언어, 버전 정보 |

가장 가까운 D-day가 메뉴바에 자동 표시됩니다. 최대 50개까지 등록 가능.

### D-day 표시 형식

| 상태 | 형식 |
|------|------|
| 지나기 전 | `🎓 D-42` |
| 당일 | `🎂 D-Day` |
| 지난 후 | `✅ D+7` |

## 기능

- **항상 보임** — 가장 가까운 D-day가 메뉴바에 상주
- **항목별 이모지** — 원하는 이모지로 카테고리 구분
- **자동 정렬** — 가장 가까운 날짜 우선
- **바로 추가/편집** — 네이티브 SwiftUI 폼
- **영속 저장** — UserDefaults에 저장, 재시작해도 유지
- **로그인 시 자동 시작** — macOS 로그인 아이템 연동
- **다국어** — 영어(기본) + 한국어
- **경량** — 앱 번들 384KB, DMG 110KB

## 다국어

daybar는 **영어**(기본)와 **한국어**를 지원합니다.

**설정 → 언어**에서 변경 가능. 즉시 전체 UI가 업데이트되고 재시작해도 유지됩니다.

## 요구사항

- macOS 13 Ventura 이상

## 기술 스택

- Swift 5.9+
- AppKit (`NSStatusItem`, `NSMenu`, `NSPopover`)
- SwiftUI (추가/편집 팝오버)
- UserDefaults (저장소)

## 기여

1. Fork
2. `git checkout -b feat/awesome`
3. `git commit -m 'feat: add awesome feature'`
4. `git push origin feat/awesome`
5. PR 열기

## License

[MIT](LICENSE)
