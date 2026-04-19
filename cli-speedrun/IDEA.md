# cli-speedrun

터미널 명령어 타자 연습 스피드런 게임.

## 컨셉

개발자가 자주 쓰는 터미널 명령어를 빠르게 타이핑하는 게임.
monkeytype의 터미널 명령어 버전.

## 게임 모드

### 🏃 스피드런

주어진 명령어를 최대한 빨리 정확하게 타이핑.

```
Round 1/10:
  git stash pop
> git stash pop_  ✅ 1.2s

Round 2/10:
  docker compose up -d --build
> docker compsoe_  ❌ TYPO! (retry)
> docker compose up -d --build_  ✅ 3.8s

...

🏁 결과
정확도: 92%
평균 속도: 2.1s/명령어
총 시간: 21.3s
등급: A
```

### 🎯 서바이벌

틀리면 즉시 탈락. 얼마나 오래 버티나.

### 📚 학습 모드

카테고리별 명령어 연습:
- git 기본 / git 고급
- docker
- linux 필수
- npm/pnpm
- kubectl
- 커스텀 (직접 추가)

## 명령어 데이터셋

```
# git
git stash pop
git rebase -i HEAD~3
git cherry-pick abc1234
git bisect start

# docker  
docker compose up -d --build
docker exec -it container_name sh
docker system prune -af

# linux
chmod +x script.sh
find . -name "*.log" -delete
tar -xzf archive.tar.gz
```

## 리더보드

- 로컬 기록 저장 (JSON)
- GitHub Gist 기반 글로벌 리더보드 (서버 불필요)
- `--org bssm-oss` 조직 내 랭킹

## 기술 스택

> 스택 변경: Go + BubbleTea → Rust + ratatui (TUI 타이핑 게임 + Rust ownership 학습 시너지)
>
> 이유: TUI 타이핑 게임 + Rust ownership 학습 시너지, ratatui 생태계 체험

- **Rust**
- **ratatui** — TUI 프레임워크
- **crossterm** — 터미널 제어 (키 입력, 화면 조작)
- **serde** — 데이터 직렬화 (명령어 데이터셋 + 로컬 기록)
- JSON (명령어 데이터셋 + 로컬 기록)
- GitHub Gist API (리더보드)

## 예상 규모

기본 타이핑 게임 TUI: 반나절
명령어 데이터셋 + 모드: +반나절
리더보드: +반나절
