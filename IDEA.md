# play-with-your-term

게임 티 안 나는 터미널 게임 모음.
겉보기엔 빌드 로그나 CI 출력처럼 보이지만, 실제론 게임.

## 컨셉

수업 중이든 사무실이든, 터미널은 항상 열려있다.
뒤에서 누가 봐도 "빌드 돌리는 중"으로 보이는 게임을 만든다.

## 게임 목록

### 🃏 npm run blackjack

블랙잭. 겉보기엔 npm 빌드 로그.

```
$ npm run build

> project@1.0.0 build
> compiling modules...

[████████░░░░░░░░] 52%  ← 현재 카드 합
  ✓ module-ace.js       compiled (11)
  ✓ module-king.js      compiled (10)
  ⠋ resolving dependencies...

  [h]it  [s]tand  [d]ouble

> resolved: 21  ✅ BUILD SUCCESS
> dealer: 18   — you win (+$500)
```

### 🎰 cargo build slots

슬롯머신. 겉보기엔 Rust 컴파일.

```
$ cargo build --release

   Compiling 🍒 v0.1.0
   Compiling 🍋 v0.1.0
   Compiling 🍒 v0.1.0
   
   Finished release [optimized] — JACKPOT
   credits: 1,500
```

### 🎲 docker compose dice

주사위. 겉보기엔 Docker Compose.

```
$ docker compose up

[+] Running 2/6
 ⠿ dice-1  ⬛⬛⚀   Rolling...
 ⠿ dice-2  ⬛⬛⚂   Rolling...
 
 ✔ dice-1  ⚃  Started    4
 ✔ dice-2  ⚅  Started    6
 
 Total: 10  —  You win!
```

### 🃏 git poker

포커. 겉보기엔 git log.

```
$ git log --oneline

a3f2c1d ♠A  Initial commit
b7e4a2f ♥K  Add feature
c9d1b3e ♠Q  Fix bug
d2f5c4a ♦J  Refactor
e8a3d6b ♣10 Update docs

Hand: Royal Flush 🔥
```

### 🐎 pytest race

경마. 겉보기엔 pytest 실행.

```
$ pytest -v

test_horse_1.py  ████████░░░░░░░░  52%  RUNNING
test_horse_2.py  ██████████████░░  89%  RUNNING  ← your bet
test_horse_3.py  ██████░░░░░░░░░░  38%  RUNNING

test_horse_2.py  ████████████████ 100%  PASSED ✅
  You win! (+300 credits)
```

## 공통 기능

- 크레딧 시스템 (실제 돈 아님, 로컬 저장)
- 리더보드 (GitHub Gist 기반, 서버 불필요)
- `--stealth` 모드: 키 입력을 최소화해서 더 자연스럽게
- `--boss` 키: 즉시 진짜 빌드 로그로 전환
- 통계: 승률, 총 크레딧, 플레이 시간

## 기술 스택

- **Kotlin** + **Mordant** (TUI/스타일링 — 빌드 로그 느낌 재현)
- **Clikt** (CLI 파싱)
- **kotlinx.serialization** (JSON — 크레딧/통계 로컬 저장)
- GitHub Gist API (리더보드)

> **변경 이유 (Go + BubbleTea → Kotlin + Mordant):**
> Android 밖에서 Kotlin CLI 개발 경험을 쌓고, bssm-oss의 cotor 프로젝트와 Kotlin 생태계를 공유하기 위함.
> Mordant는 리치 텍스트 렌더링과 애니메이션을 지원해 빌드 로그 위장 UI에 적합.

## 위장 명령어

실제 명령어처럼 보이게 alias 설정 가능:

```bash
alias "npm run build"="play-with-your-term blackjack"
alias "cargo build"="play-with-your-term slots"
alias "docker compose up"="play-with-your-term dice"
alias "pytest -v"="play-with-your-term race"
```

## 예상 규모

게임 1개 (블랙잭) MVP: 반나절
빌드 로그 위장 UI: +반나절
게임 추가 (각 2~3시간): +1~2일
리더보드 + --boss 키: +반나절
