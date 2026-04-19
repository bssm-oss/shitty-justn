<div align="center">

# port-who

**이 포트 누가 쓰고 있냐를 예쁘게 보여주는 CLI** :mag:

[![CI](https://github.com/justn-hyeok/port-who/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/port-who/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[:us: English](./README.md)

<img src="./demo.gif" alt="port-who 데모" width="700">

</div>

## 이게 뭔가요?

`lsof -i` 출력은 못생기고 읽기 힘듭니다. **port-who**는 현재 열린 포트를 프로세스 이름, 프로젝트 디렉토리, 업타임, 메모리 사용량과 함께 ANSI 컬러 테이블로 정리해서 보여줍니다.

```
$ port-who

 🔌 5 ports open
 PORT   PROCESS          PROJECT              UPTIME
 :3000  ⚡ next dev       jagalchi-client/      2시간 13분
 :3001  ⚡ vite           syncingsh/            47분
 :5432  🗄️ postgres       🐳 docker-postgres    3일
 :8080  ☕ java           jagalchi-server/      1시간
 :8888  ???              pid:12847             47분
```

## 빠른 시작

### Homebrew

```bash
brew install justn-hyeok/tap/port-who
```

### 소스에서 빌드

[Zig 0.15+](https://ziglang.org/download/)가 필요합니다. macOS: `brew install zig`

```bash
git clone https://github.com/justn-hyeok/port-who.git
cd port-who
zig build -Doptimize=ReleaseFast

# 바이너리를 PATH에 복사
cp zig-out/bin/port-who ~/.local/bin/
```

### 바이너리 다운로드

[Releases](https://github.com/justn-hyeok/port-who/releases) 페이지에서 최신 바이너리를 다운로드할 수 있습니다.

```bash
# macOS arm64
curl -Lo port-who https://github.com/justn-hyeok/port-who/releases/latest/download/port-who-macos-arm64
chmod +x port-who
mv port-who ~/.local/bin/

# macOS x64
curl -Lo port-who https://github.com/justn-hyeok/port-who/releases/latest/download/port-who-macos-x64
chmod +x port-who
mv port-who ~/.local/bin/
```

## 사용법

```
사용법: port-who [옵션] [명령]

명령:
  (없음)              열린 포트 목록 표시
  :PORT 또는 PORT     특정 포트 상세 정보
  :PORT-PORT          포트 범위 필터 (예: :3000-4000)
  :PORT,PORT,...      복수 포트 필터 (예: :3000,8080)
  watch               실시간 모니터링 (2초 갱신, q로 종료)
  kill :PORT          포트 점유 프로세스 종료

옵션:
  -a, --all           ESTABLISHED 포함 전체 표시
  -s, --sort VALUE    정렬 기준 (port|uptime|memory)
  -g, --group         프로세스별 그룹 표시
  -j, --json          JSON 형식 출력
  -h, --help          도움말 표시
  -v, --version       버전 표시
```

### 예시

```bash
# 열린 포트 전체 보기
port-who

# ESTABLISHED 연결 포함
port-who --all

# 업타임 기준 정렬
port-who --sort uptime

# JSON 출력 (파이프 연동용)
port-who --json

# 특정 포트 상세 정보
port-who :3000

# 포트 범위 필터
port-who :3000-4000

# 복수 포트 필터
port-who :3000,8080

# 프로세스별 그룹 표시
port-who --group

# 실시간 모니터링 (2초 갱신, q로 종료)
port-who watch
```

```
$ port-who :3000

:3000 — next dev
  PID:     28471
  CMD:     node /usr/local/bin/next dev
  CWD:     ~/projects/jagalchi-client
  시작:    2026-04-09 14:32
  업타임:  2시간 13분
  메모리:  312MB
```

```bash
# 프로세스 종료
port-who kill :8888
```

```
$ port-who kill :8888

:8888 (PID:12847) 정말 종료할까요? (y/n) y
✓ PID:12847 종료됨
```

## 주요 기능

- **컬러 테이블** — LISTEN 상태 포트를 깔끔한 ANSI 컬러 테이블로 표시, 굵은 포트 번호와 색상 업타임
- **Watch 모드** — `port-who watch`로 실시간 모니터링 (2초 갱신, `q`로 종료)
- **Docker 감지** — Docker 컨테이너 이름 자동 감지 (`🐳` 접두사로 표시)
- **포트 범위 & 복수 포트 필터** — `port-who :3000-4000` 또는 `port-who :3000,8080`으로 필터링
- **프로세스 그룹** — `--group` 플래그로 프로세스별 포트 그룹 표시
- **프로세스 아이콘** — 프로세스 타입별 시각적 아이콘: `⚡` node, `🗄️` postgres, `🐍` python, `☕` java, `🌐` nginx, `🐳` docker
- **프로젝트 감지** — CWD에서 상위 디렉토리로 올라가며 `package.json`, `Cargo.toml`, `go.mod`, `build.zig.zon`, `pyproject.toml`, `pom.xml`, `build.gradle`, `Gemfile`, `mix.exs`, `deno.json`, `composer.json`을 찾아 프로젝트 자동 감지
- **한국어 업타임** — "2시간 13분" 같은 자연스러운 한국어 형식
- **프로세스 종료** — `kill` 명령으로 확인 후 안전하게 종료 (SIGTERM)
- **정렬** — 포트 번호, 업타임, 메모리 기준으로 정렬
- **JSON 출력** — `jq` 등 다른 도구와 파이프라인 연동 가능
- **미확인 프로세스 강조** — 식별되지 않은 프로세스는 `???`로 표시되어 눈에 띔

## 지원 플랫폼

| 플랫폼 | 상태 |
|--------|------|
| macOS | :white_check_mark: 지원 (`lsof` 기반) |
| Linux | :construction: 지원 예정 — 기여 환영! |

## 기여하기

기여를 환영합니다! 이슈나 PR을 자유롭게 올려주세요.

1. Fork
2. Feature 브랜치 생성 (`git checkout -b feat/awesome`)
3. 커밋 (`git commit -m 'feat: add awesome feature'`)
4. Push (`git push origin feat/awesome`)
5. Pull Request

### 테스트 실행

```bash
zig build test
```

111개 유닛 테스트가 포함되어 있습니다.

## 라이선스

[MIT](LICENSE)
