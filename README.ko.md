<div align="center">

# dep-age

**프로젝트 의존성이 얼마나 오래됐는지 시각화하는 CLI** 📦

[![CI](https://github.com/justn-hyeok/dep-age/actions/workflows/ci.yml/badge.svg)](https://github.com/justn-hyeok/dep-age/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/dep-age)](https://github.com/justn-hyeok/dep-age/releases)

[English](./README.md)

</div>

## 이게 뭐야?

`npm outdated`는 어떤 패키지가 뒤쳐졌는지는 알려주지만, **얼마나** 뒤쳐졌는지는 안 알려줍니다. **dep-age**는 4개 패키지 매니저를 한 번에 스캔해서 건강도 점수를 내고, 단순히 outdated가 아니라 **죽은 의존성**을 찾아냅니다.

```
$ dep-age

📦 dep-age scan: ./sample-node

⚠️ Outdated (1)
  jest                 29.0.0       → 30.3.0       30 days behind

💀 Zombie (1)
  left-pad             1.3.0                            2922 days since last update

────────────────────────────────────────
건강도: 80/100
평균 나이: 1476일
좀비 패키지: 1개
권장: left-pad → String.prototype.padStart (built-in) 마이그레이션 고려
```

## 빠른 시작

### Homebrew

```bash
brew install justn-hyeok/tap/dep-age
```

### 소스에서 빌드

[Rust 1.75+](https://rustup.rs/) 필요.

```bash
git clone https://github.com/justn-hyeok/dep-age.git
cd dep-age
cargo install --path .
```

### 바이너리 다운로드

[Releases](https://github.com/justn-hyeok/dep-age/releases) 페이지에서 받으면 됩니다.

```bash
# macOS arm64
curl -Lo dep-age.tar.gz https://github.com/justn-hyeok/dep-age/releases/latest/download/dep-age-aarch64-apple-darwin.tar.gz
tar xzf dep-age.tar.gz
mv dep-age ~/.local/bin/
```

## 사용법

```
Usage: dep-age [OPTIONS]

Options:
      --dir <DIR>              스캔할 디렉토리 [기본: .]
      --format <FORMAT>        출력 포맷 [기본: terminal] [선택: terminal, json, markdown]
      --ci <CI>                건강도가 이 값 미만이면 exit code 1
      --max-depth <MAX_DEPTH>  디렉토리 탐색 최대 깊이 [기본: 4]
  -h, --help                   도움말
  -V, --version                버전
```

### 예시

```bash
# 현재 디렉토리 스캔
dep-age

# 특정 프로젝트 스캔
dep-age --dir ~/projects/my-app

# JSON 출력 (파이프용)
dep-age --format json

# Markdown 출력 (PR 코멘트 / README 뱃지용)
dep-age --format markdown

# CI 모드 — 건강도 80 미만이면 빌드 실패
dep-age --ci 80
```

## 지원 언어

| 언어 | 매니페스트 | 레지스트리 | 버전 | 라이선스 | deprecated |
|------|-----------|-----------|:----:|:--------:|:----------:|
| Node.js | `package.json` | npm | ✅ | ✅ | ✅ |
| Python | `requirements.txt` | PyPI | ✅ | ✅ | ✅ |
| Java | `pom.xml` | Maven Central | ✅ | ✅ | ✅ |
| Go | `go.mod` | Go Proxy | ✅ | ✅ | ✅ |

deprecated 감지: npm `deprecated` 필드, PyPI "Development Status :: 7 - Inactive" classifier, Maven POM `<relocation>`, Go `// Deprecated:` 주석

## 기능

- **다중 언어** — Node, Python, Java, Go를 한 번에 스캔
- **재귀 스캔** — 레포 전체를 돌며 모든 매니페스트 발견 (모노레포 친화)
- **건강도 점수** — 0~100 단일 지표, CI 대시보드용
- **좀비 감지** — 1000일+ 업데이트 없는 패키지
- **deprecated 감지** — 명시적으로 deprecated 표시된 패키지
- **대체 패키지 추천** — `lodash → es-toolkit`, `moment → dayjs`, `chalk → picocolors` 등
- **3가지 출력 포맷** — 터미널(컬러), JSON, Markdown
- **CI 모드** — `--ci 80`으로 임계값 기반 빌드 실패
- **동시 API 호출** — Semaphore로 동시 10개 제한

## 건강도 점수

100에서 시작.

| 조건 | 감점 |
|------|----:|
| Outdated | -5 |
| Zombie (1000일+) | -15 |
| Deprecated | -10 |

0~100으로 clamp.

## 기여

1. Fork
2. `git checkout -b feat/awesome`
3. `git commit -m 'feat: add awesome feature'`
4. `git push origin feat/awesome`
5. PR 열기

### 테스트

```bash
cargo test
cargo clippy -- -D warnings
```

## License

[MIT](LICENSE)
