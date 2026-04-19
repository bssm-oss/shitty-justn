<div align="center">

# cli-speedrun

**터미널 명령어 타자 스피드런 게임** ⌨️ &nbsp; `v0.1.1`

[![CI](https://github.com/justn-hyeok/cli-speedrun/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/cli-speedrun/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![crates.io](https://img.shields.io/crates/v/cli-speedrun.svg)](https://crates.io/crates/cli-speedrun)

[🇺🇸 English](./README.md)

<img src="./demo.gif" alt="cli-speedrun 데모" width="700">

</div>

## 이게 뭔가요?

[monkeytype](https://monkeytype.com)을 아시나요? 그걸 터미널 명령어 버전으로 만들었습니다! `git`, `docker`, `linux`, `kubectl`, `npm` 등 실전 CLI 명령어를 최대한 빠르게 타이핑하세요. 글자 하나하나 실시간으로 맞았는지 틀렸는지 바로 보여줍니다.

Rust + [ratatui](https://github.com/ratatui/ratatui) + [crossterm](https://github.com/crossterm-rs/crossterm)으로 만들어서 어떤 OS에서든 쾌적하게 돌아갑니다.

## 빠른 시작

```bash
# crates.io에서 설치
cargo install cli-speedrun

# 또는 Homebrew (macOS)
brew tap justn-hyeok/tap && brew install cli-speedrun

# 또는 바이너리 직접 다운로드
# → https://github.com/justn-hyeok/cli-speedrun/releases
```

설치했으면 바로 실행!

```bash
cli-speedrun
```

모드 고르고, 카테고리 고르고, 타이핑 시작!

## 게임 모드

### Speedrun 🏃

10개 명령어를 최대한 빠르고 정확하게 입력하세요! 오타가 나면 빨간색으로 표시되고, **Backspace**로 지우고 다시 입력하면 됩니다. 총 소요 시간과 정확도로 등급이 결정됩니다. S등급에 도전해보세요!

### Survival 🎯

한 번 틀리면 라이프 하나 차감! 라이프는 총 3개 — 끝까지 살아남을 수 있을까요? 긴장감 넘치는 모드입니다.

### Learning 📚

시간 제한 없음, 압박감 없음. 잘못된 키를 누르면 그냥 무시됩니다. 올바른 입력만 받아들여서 자연스럽게 손가락이 기억하게 됩니다. 명령어마다 설명도 같이 보여주니까 의미도 함께 익혀보세요!

## 명령어 카테고리

| 카테고리 | 내용 | 예시 |
|---------|------|------|
| **git** | Git 기본 명령어 | `git add .`, `git commit -m "msg"` |
| **git-advanced** | Git 고급 명령어 | `git rebase -i HEAD~3`, `git cherry-pick abc123` |
| **docker** | Docker 컨테이너 관리 | `docker build -t app .`, `docker compose up -d` |
| **linux** | 리눅스 필수 명령어 | `chmod 755 script.sh`, `grep -r "pattern" .` |
| **npm** | Node.js 패키지 관리 | `npm init -y`, `npx create-react-app my-app` |
| **kubectl** | Kubernetes 클러스터 관리 | `kubectl get pods`, `kubectl apply -f deploy.yml` |

6개 카테고리, 총 72개 명령어! 매 게임 랜덤 셔플이라 순서 외우기 불가능!

## 등급 시스템

| 등급 | 설명 | 명령어당 평균 시간 | 정확도 |
|------|------|-------------------|--------|
| **S** | Perfect! | < 1.5초 | > 98% |
| **A** | Excellent | < 2.0초 | > 95% |
| **B** | Great | < 3.0초 | > 90% |
| **C** | Good | < 4.0초 | > 80% |
| **D** | Keep going | 그 외 | — |

## 주요 기능

- **실시간 피드백** — 타이핑할 때마다 초록(정확) / 빨강(오타)으로 바로 표시
- **깔끔한 TUI** — ASCII 아트 로고, 중앙 정렬 타이핑 영역, 터미널 폭 적응형 여백, 볼드 텍스트, 정확도 색상 표시 (초록/노랑/빨강)
- **등급 설명** — 결과 화면에서 등급별 설명 표시 (S — Perfect!, A — Excellent 등)
- **3-2-1 카운트다운** — 화면 중앙에 카운트다운 표시
- **로컬 기록 저장** — 자동으로 기록이 남아서 성장 과정을 확인 가능
- **72개 실전 명령어** — 6개 카테고리, 진짜 쓰는 명령어만 수록
- **랜덤 셔플** — 매번 순서가 바뀌어서 암기가 아닌 실력이 필요
- **크로스 플랫폼** — macOS, Linux, Windows 모두 지원

## 설치

### crates.io

```bash
cargo install cli-speedrun
```

### Homebrew (macOS)

```bash
brew tap justn-hyeok/tap && brew install cli-speedrun
```

### 바이너리 다운로드

[Releases](https://github.com/justn-hyeok/cli-speedrun/releases) 페이지에서 OS에 맞는 바이너리를 받으세요:

```bash
chmod +x cli-speedrun
mv cli-speedrun ~/.local/bin/
```

### 소스에서 빌드

```bash
git clone https://github.com/justn-hyeok/cli-speedrun.git
cd cli-speedrun
cargo build --release
cp target/release/cli-speedrun ~/.local/bin/
```

## 사용법

```bash
# TUI 메뉴 실행
cli-speedrun

# 바로 게임 시작
cli-speedrun --mode speedrun --category git
cli-speedrun --mode survival --category docker
cli-speedrun --mode learning --category kubectl

# 도움말
cli-speedrun --help
```

### 조작법

| 키 | 동작 |
|----|------|
| `Enter` | 입력 확인 / 다음 라운드 |
| `Backspace` | 글자 삭제 |
| `Esc` | 종료 / 뒤로 |
| `Tab` | 모드 전환 (메뉴) |

## 기여하기

기여는 언제나 환영합니다!

1. Fork
2. Feature branch 생성 (`git checkout -b feature/amazing-feature`)
3. 커밋 (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

```bash
# 전체 141개 테스트 실행 (유닛 75 + E2E 32 + 통합 34)
cargo test
```

## 라이선스

[MIT](https://opensource.org/licenses/MIT) — 자유롭게 사용하고, 수정하고, 배포하세요.

---

<p align="center">
  <strong>터미널의 달인이 되어보세요!</strong><br>
  매일 5분, CLI 타자 연습으로 개발 속도를 확 올려봅시다! 🔥
</p>
