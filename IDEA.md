# git-roast

커밋 히스토리를 분석해서 개발자를 로스팅하는 CLI.

## 컨셉

GitHub 유저나 로컬 git 리포의 커밋 히스토리를 분석해서 개발자의 습관을 까는 도구.
진지한 분석이 아니라 장난스러운 로스팅이 목적.

## 예시 출력

```
$ git-roast heodongun
> 커밋 203개 중 "fix" 47개. 뭘 그렇게 많이 부수냐
> 새벽 3시 커밋 비율 34%. 잠 좀 자라
> 파일 하나에 평균 커밋 8.2회. 한 번에 못하냐
> 가장 긴 커밋 메시지: 3글자 ("fix"). 소설가 재능은 없다

$ git-roast --repo bssm-oss/CodeAgora
> 테스트 2895개. 코드보다 테스트가 많은 거 아니냐
> 커밋 393개 중 1인 커밋 99.7%. 팀플 아니었냐
```

## 분석 항목

- 커밋 메시지 길이 분포 + "fix" 비율
- 커밋 시간대 분석 (새벽 커밋 비율, 주말 커밋)
- 파일당 평균 수정 횟수
- 가장 많이 수정한 파일 (= 가장 못 만든 파일)
- force push 횟수
- 커밋 간 평균 시간 간격
- 1줄 커밋 vs 대규모 커밋 비율
- 연속 커밋 기록 (잔디 분석)

## 기술 스택

> 스택 변경: Go + Cobra → Deno + TypeScript (기존 TS 경험 활용 + 새 런타임 체험)
>
> 이유: 기존 TS 경험을 살려 새 런타임 체험, `deno compile`로 단일 바이너리 배포 가능

- **Deno + TypeScript**
- `Deno.args` — CLI 인자 파싱
- `fetch` API — 내장 HTTP 클라이언트
- **GitHub REST API** (커밋 히스토리 조회)
- `deno compile` — 단일 바이너리 배포
- 로컬 git 분석: `git log --format` 파싱

## 확장 가능성

- `--lang ko/en` 로스팅 언어 선택
- `--org bssm-oss` 조직 전체 로스팅
- `--battle user1 user2` 두 개발자 비교 배틀
- 웹 버전: URL 공유로 로스팅 결과 공유
- GitHub Action: PR마다 자동 로스팅 코멘트

## 예상 규모

반나절 MVP, 주말이면 완성.
