# whatdid

"오늘 뭐 했지?"를 자동으로 뽑아주는 CLI.

## 컨셉

스탠드업, TIL, 일일보고를 쓸 때마다 "오늘 뭐 했더라..." 하는 시간을 없앤다.
git log + GitHub API에서 오늘/이번 주 활동을 자동으로 추출해서 요약.

## 예시 출력

```bash
$ whatdid today
# 📅 2026-04-09 (수)
#
# 🔨 커밋 7개
#   - cotor: auth 미들웨어 리팩토링 (3개)
#   - jagalchi-client: 로드맵 뷰 반응형 수정 (4개)
#
# 🔀 PR
#   - jagalchi-client#42 머지됨
#   - cotor#128 리뷰 요청함
#
# ✅ 이슈
#   - syncingsh#7 close
#   - cotor#125 코멘트 남김
#
# 📊 요약: 리포 3개에서 작업, PR 2개 처리

$ whatdid week --format markdown
# (마크다운 형식으로 주간 보고서 출력)

$ whatdid today --org bssm-oss
# (bssm-oss 조직 전체 활동 요약)
```

## 데이터 소스

- `git log --since` (로컬 리포)
- GitHub API: 커밋, PR, 이슈, 리뷰, 코멘트
- (선택) GitHub Events API로 한번에 조회

## 기술 스택

- **Go** (Cobra CLI)
- **GitHub API** (gh CLI 또는 REST)
- **LLM** (선택, 활동 요약 자연어 생성)

## 출력 포맷

- `--format text` (기본, 터미널 출력)
- `--format markdown` (TIL/블로그용)
- `--format json` (다른 도구 연동)
- `--format slack` (슬랙 메시지 포맷)

## 옵션

- `whatdid today` / `whatdid yesterday` / `whatdid week`
- `--user <username>` (다른 사람 활동)
- `--org <org>` (조직 전체)
- `--repo <repo>` (특정 리포만)
- `--since 2026-04-01` (날짜 지정)

## 예상 규모

CLI + GitHub API 연동: 반나절
포맷 옵션 + 조직 지원: +반나절
LLM 요약: +반나절

---

## 이슈 / 개선사항

### ✅ [UX/UI] 환경변수 설정 개선 (완료)

**구현된 기능:**
- ✅ `whatdid login` - 대화형으로 토큰 입력 및 저장
- ✅ `whatdid logout` - 저장된 토큰 삭제
- ✅ `whatdid status` - 현재 인증 상태 확인
- ✅ 친절한 에러 메시지 (토큰 생성 URL, 필요한 권한 안내)
- ✅ 토큰 저장 위치: `~/.config/whatdid/config.json`
- ✅ Config 토큰 우선, 없으면 환경변수 사용

**추가 예정:**
- ⏳ 토큰 유효성 검사 (login 시 API 호출로 검증)
- ⏳ `gh` CLI 인증 정보 재사용 (선택사항)

**우선순위:** 완료 ✅
