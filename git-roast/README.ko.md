<div align="center">

# git-roast

**커밋 히스토리를 분석해서 개발자를 로스팅하는 CLI** :fire:

[![CI](https://github.com/justn-hyeok/git-roast/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/git-roast/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JSR](https://jsr.io/badges/@justn-hyeok/git-roast)](https://jsr.io/@justn-hyeok/git-roast)

[English](./README.md)

<img src="./demo.gif" alt="git-roast 데모" width="700">

</div>

## 이게 뭔데?

git-roast는 당신의 커밋 히스토리를 낱낱이 분석해서 따끔하게 한마디 해주는 도구입니다.
10가지 분석 항목, 9,997개의 한국어 로스팅 템플릿 (분석 9,494개 + 클로징 503개). 카테고리당 700~1,000개 이상. AI 없이 순수한 팩트 폭력만으로 동작합니다.

## 빠른 시작

### Homebrew

```bash
brew tap justn-hyeok/tap
brew install git-roast
```

### Deno

```bash
# 전역 설치
deno install --allow-run --allow-net --allow-read --allow-env \
  -n git-roast \
  https://raw.githubusercontent.com/justn-hyeok/git-roast/main/main.ts

# 설치 없이 바로 실행
deno run --allow-run --allow-net --allow-read --allow-env \
  https://raw.githubusercontent.com/justn-hyeok/git-roast/main/main.ts
```

### JSR

```bash
deno add @justn-hyeok/git-roast
```

### 바이너리 다운로드

[Releases](https://github.com/justn-hyeok/git-roast/releases)에서 플랫폼별 바이너리를 받으세요 (macOS / Linux / Windows):

```bash
chmod +x git-roast
./git-roast
```

## 사용법

```bash
# 현재 디렉토리의 git 리포 분석
git-roast

# 특정 경로의 git 리포 분석
git-roast --path /path/to/repo

# GitHub 유저 분석
git-roast <username>

# GitHub 리포 분석
git-roast --repo owner/repo

# 최근 100개 커밋만 분석
git-roast --limit 100

# 색상 없이 출력 (파이프/리다이렉트용)
git-roast --no-color
```

### 옵션 정리

| 플래그 | 설명 | 기본값 |
|--------|------|--------|
| `--path <path>` | 분석할 로컬 git 리포 경로 | 현재 디렉토리 |
| `--repo <owner/repo>` | GitHub 리포 지정 | - |
| `<username>` | GitHub 유저 분석 | - |
| `--limit <n>` | 분석할 최대 커밋 수 | 500 |
| `--no-color` | ANSI 색상 비활성화 | false |
| `--help`, `-h` | 도움말 | - |
| `--version`, `-v` | 버전 확인 | - |

## 10가지 분석 항목

| # | 항목 | 뭘 보는 건데 |
|---|------|-------------|
| 1 | :speech_balloon: **커밋 메시지** | "fix", "wip", "asdf" 같은 의미 없는 메시지 비율 |
| 2 | :crescent_moon: **시간 패턴** | 새벽/주말 커밋 빈도 (워라밸 상태 진단) |
| 3 | :repeat: **파일 수정 빈도** | 특정 파일을 과도하게 괴롭히는 패턴 |
| 4 | :bomb: **커밋 사이즈** | 한 번에 몇 줄이나 바꾸는지 (거대 커밋 경고) |
| 5 | :seedling: **잔디(스트릭)** | 연속 커밋 기록과 공백 기간 |
| 6 | :busts_in_silhouette: **기여자** | 외로운 늑대인지, 팀 플레이어인지 |
| 7 | :rotating_light: **Force Push** | reflog에서 force push 흔적 추적 |
| 8 | :clock3: **커밋 간격** | 커밋 사이 시간 간격의 패턴과 불규칙성 |
| 9 | :globe_with_meridians: **사용 언어** | 파일 확장자 기반 주력 언어 판별 |
| 10 | :evergreen_tree: **브랜치** | 브랜치 수, merge 비율, 좀비 브랜치 |

심각도는 4단계로 나뉩니다:

> `[~]` **mild** | `[!]` **medium** | `[!!]` **savage** | `[!!!]` **legendary**

## 작동 원리

```
git log  -->  10개 분석기  -->  심각도 판정  -->  랜덤 로스팅 템플릿  -->  포맷팅 출력
```

1. **수집** -- git log를 읽어옵니다 (로컬 또는 GitHub API)
2. **분석** -- 10개의 독립적인 분석기가 각각 심각도와 통계를 산출
3. **로스팅** -- 9,997개의 한국어 템플릿 중 상황에 맞는 멘트를 선택
4. **출력** -- 심각도 아이콘과 색상으로 포맷팅

LLM 안 씁니다. GitHub 리포 분석이 아닌 이상 네트워크 호출도 없습니다. 통계 기반의 순수한 팩폭.

## 기여하기

1. Fork하고 브랜치 만들어주세요
2. 기능 추가하거나 버그 고쳐주세요
3. 테스트 작성해주세요 (`deno task test`)
4. PR 보내주세요

로스팅 멘트 추가도 대환영! `src/roasts/templates.ts`에 마음껏 추가하세요. 더 웃기고 더 잔인할수록 좋습니다. 동료 개발자의 자존심을 박살내는 게 목표니까요.

```bash
# 개발 명령어
deno task dev        # 개발 모드 실행
deno task test       # 테스트
deno task lint       # 린트
deno task fmt        # 포맷팅
deno task coverage   # 커버리지 확인
```

## 라이선스

[MIT](https://opensource.org/licenses/MIT)

---

<p align="center">
  <i>당신의 커밋 히스토리는 거짓말을 하지 않습니다. git-roast는 그걸 소리 내어 읽어줄 뿐이에요.</i>
</p>
