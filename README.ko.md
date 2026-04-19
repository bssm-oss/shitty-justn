<div align="center">

# whatdid

**"오늘 뭐 했지?" — GitHub 활동에서 자동으로 일일 보고서 생성** 📝

[![CI](https://github.com/justn-hyeok/whatdid/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/whatdid/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/whatdid)](https://github.com/justn-hyeok/whatdid/releases)

[English](./README.md)

</div>

## 이게 뭐야?

스탠드업이나 일일보고 쓸 때 "오늘 뭐 했더라..." 하면서 5분씩 날리는 경험, 누구나 있죠. **whatdid**는 GitHub 활동(커밋, PR, 이슈)을 전체 레포에서 스캔해서 4초 안에 보고서를 만들어줍니다.

```
$ whatdid today

📅 2026-04-10 ~ 2026-04-11

🔨 Commits: 77
  justn-hyeok/whatdid: feat: rewrite in Go, perf: parallelize API calls (8)
  justn-hyeok/daybar: docs: add localization, chore: bump version (14)
  justn-hyeok/syncingsh: Merge pull request #23, fix: update signaling URL (22)
  ...

🔀 PRs: 12
  justn-hyeok/daybar#5 merged
  justn-hyeok/findkey#9 open
  ...

✅ Issues: 5
  justn-hyeok/syncingsh#13 closed
  ...

📊 Summary: 9 repos, 77 commits, 12 PRs, 5 issues
```

## 빠른 시작

### Homebrew

```bash
brew install justn-hyeok/tap/whatdid
```

### Go install

```bash
go install github.com/justn-hyeok/whatdid@latest
```

### 바이너리 다운로드

```bash
# macOS arm64
curl -Lo whatdid.tar.gz https://github.com/justn-hyeok/whatdid/releases/latest/download/whatdid-darwin-arm64.tar.gz
tar xzf whatdid.tar.gz
mv whatdid-darwin-arm64 ~/.local/bin/whatdid
```

## 인증

whatdid는 `gh` CLI에서 토큰을 자동으로 가져옵니다. `gh` 설치하고 로그인되어 있으면 바로 쓸 수 있어요:

```bash
gh auth login     # 이미 되어있으면 생략
whatdid today     # 바로 동작
```

아니면 환경변수로:

```bash
export GITHUB_TOKEN=ghp_...
```

토큰 권한은 `repo` (all) + `read:org`가 필요합니다.

## 사용법

```
Usage: whatdid <command> [options]

Commands:
  today       오늘 활동 (기본)
  yesterday   어제 활동
  week        이번 주 활동 (월요일~오늘)

Options:
  --format <text|markdown|json|slack>   출력 포맷 (기본: text)
  --user <username>                     특정 사용자
  --org <org>                           조직 전체
  --repo <owner/repo>                   특정 리포

  -h, --help
  -v, --version
```

### 예시

```bash
# 오늘 활동
whatdid today

# 주간 요약 Markdown (TIL / 블로그용)
whatdid week --format markdown

# JSON 출력 (파이프용)
whatdid today --format json | jq '.summary'

# 슬랙 메시지 포맷
whatdid today --format slack

# 특정 리포만
whatdid today --repo justn-hyeok/dep-age
```

## 기능

- **빠름** — 병렬 REST API + HTTP/2 + stale 레포 필터. 전체 조직 스캔 4초
- **설정 불필요** — `gh` CLI 토큰 자동 감지
- **4가지 출력 포맷** — 텍스트(기본), Markdown, JSON, Slack mrkdwn
- **전체 범위** — 개인 레포 + 소속 조직 레포 모두
- **스마트 필터링** — 최근 push된 레포만 조회, 오래된 건 스킵

## 왜 Go?

처음엔 TypeScript로 만들었다가 속도 때문에 Go로 재작성했습니다.

|  | TypeScript | Go |
|---|---|---|
| 전체 스캔 시간 | 18초 | **4초** |
| Cold start | ~1초 (Node) | **0ms** |
| 바이너리 크기 | npm 필요 | **5.9 MB** 단일 바이너리 |
| 의존성 | octokit, commander | **stdlib만** |

## 지원 플랫폼

| 플랫폼 | 상태 |
|--------|------|
| macOS (arm64, x64) | :white_check_mark: |
| Linux (arm64, x64) | :white_check_mark: |
| Windows | :construction: 예정 |

## 기여

1. Fork
2. `git checkout -b feat/awesome`
3. `git commit -m 'feat: add awesome feature'`
4. `git push origin feat/awesome`
5. PR 열기

### 빌드 & 테스트

```bash
go build -o whatdid .
go vet ./...
./whatdid --help
```

## License

[MIT](LICENSE)
