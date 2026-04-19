# dep-age

프로젝트 dependency가 얼마나 오래됐는지 시각화하는 CLI.

## 컨셉

package.json의 dependency 목록을 읽고, 각 패키지의 나이/최신 버전/마지막 업데이트를 조회해서
프로젝트의 "의존성 건강도"를 한눈에 보여준다.

## 예시 출력

```bash
$ dep-age
# 📦 dep-age scan: jagalchi-client
#
# ✅ 최신 (7)
#   react           19.1.0    ← 최신        12일 전 업데이트
#   next             16.2.0    ← 최신        3일 전 업데이트
#   tailwindcss      4.2.1    ← 최신        8일 전 업데이트
#   ...
#
# ⚠️ 업데이트 필요 (3)
#   zustand          4.5.0    → 5.0.2       287일 전 버전
#   zod              3.22.0   → 3.24.1      194일 전 버전
#   ...
#
# 💀 묘지 (1)
#   lodash           4.17.21                 1,847일 전 마지막 업데이트
#
# ────────────────────────
# 건강도: 67/100
# 평균 나이: 142일
# 좀비 패키지: 1개 (lodash)
# 권장: lodash → es-toolkit 마이그레이션 고려
```

## 분석 항목

- 현재 설치 버전 vs npm 최신 버전
- 마지막 npm publish 날짜
- 주간 다운로드 수 (인기도)
- deprecated 여부
- 알려진 대체 패키지 (lodash → es-toolkit 등)
- 라이선스 정보

## 지원 패키지 매니저

- npm (package.json) — 1순위
- pnpm (pnpm-lock.yaml)
- (추후) Go modules, Cargo, pip

## 기술 스택

> 스택 변경: TypeScript CLI → Rust + clap (Rust 입문에 적합한 스코프)
>
> 이유: npm registry API JSON 파싱으로 Rust 입문에 적합, 스코프가 작아서 학습 비용 관리 가능

- **Rust**
- **clap** — CLI 인터페이스
- **reqwest** — HTTP 클라이언트 (npm registry API 호출)
- **serde_json** — JSON 파싱
- **colored** — 터미널 색상 출력

## 출력 포맷

- 터미널 (기본, 컬러)
- `--format json` (CI 연동)
- `--format markdown` (README 뱃지용)
- `--ci` (건강도 threshold 이하면 exit code 1)

## 예상 규모

npm registry API 조회 + 터미널 출력: 반나절
점수 계산 + 추천 로직: +반나절
