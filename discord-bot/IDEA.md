# bssm-oss Discord Bot — IDEA

GitHub 이벤트를 Discord로 라우팅하는 bssm-oss 공식 봇.
org 전체를 커버하며, 이벤트 종류별 채널로 자동 분류하고 담당 메인테이너를 멘션한다.

---

## 핵심 목표

- org webhook 하나로 65개 레포 전부 커버 (레포마다 설정 불필요)
- 이벤트 종류별 채널 분리 → 채널 알림 설정으로 개인화
- 메인테이너에게만 멘션 → 알림 피로 최소화
- 외부 기여자 감지 → OSS에서 가장 중요한 신호

---

## 채널 구조

```
#github-이슈     → 이슈 오픈 / 클로즈 / 재오픈
#github-pr       → PR 오픈 / 머지 / 리뷰 요청
#github-ci       → CI 실패 / 복구
#github-릴리즈    → 릴리즈 퍼블리시
```

---

## 메시지 포맷

Discord Embed 사용. 이벤트별 색상 코딩.

| 이벤트 | 색상 | 예시 |
|--------|------|------|
| 이슈 오픈 | 🟡 노랑 | `[bssm-oss/dep-age] @황준혁 — Issue opened` |
| PR 오픈 | 🔵 파랑 | `[bssm-oss/CodeAgora] @황준혁 — PR opened` |
| PR 머지 | 🟢 초록 | `[bssm-oss/CodeAgora] @황준혁 — PR merged` |
| CI 실패 | 🔴 빨강 | `[bssm-oss/dep-age] @황준혁 — CI failed on main` |
| 릴리즈 | 🟣 보라 | `[bssm-oss/dep-age] v1.2.0 released` |
| 외부 기여자 | ⭐ 골드 | `[bssm-oss/dep-age] 외부 기여자 PR — @황준혁` |

Embed 필드:
- 제목: 이슈/PR 제목
- 작성자: GitHub 프로필 이미지 + username
- 링크: 바로가기
- 라벨: 이슈/PR에 붙은 라벨

---

## 기능

### 기본
- [ ] 이벤트 종류별 채널 라우팅
- [ ] 메인테이너 멘션 (`maintainers.yml` 기반)
- [ ] 라벨 필터 — 특정 라벨만 알림 (`bug`, `help wanted` 등)
- [ ] 색상 코딩

### bssm-oss 특화
- [ ] **외부 기여자 감지** — org 멤버가 아닌 사람의 이슈/PR → 골드 하이라이트 + 별도 멘션
- [ ] **PR 리뷰 리마인더** — PR 오픈 후 N시간 리뷰 없으면 재알림
- [ ] **릴리즈 공지** — 퍼블리시 시 `#github-릴리즈` 외 공개 채널에도 포스팅

### 나중에
- [ ] 이벤트 on/off 커맨드 (`/notify off pr`)
- [ ] PR 스탯 주간 요약
- [ ] 특정 라벨 붙을 때만 알림

---

## 아키텍처

```
GitHub Org Webhook
        │
        ▼
  Cloudflare Worker
        │
        ├── maintainers.yml 읽기 (GitHub API)
        ├── org 멤버 여부 확인 (외부 기여자 감지)
        ├── 이벤트 종류 파싱
        ├── 라벨 필터링
        │
        ▼
  Discord Bot API
        │
        ├── 채널 라우팅
        └── 메인테이너 멘션
```

### 주요 파일 구조 (예상)

```
discord-bot/
  src/
    index.ts          ← Cloudflare Worker 진입점
    handlers/
      issues.ts       ← 이슈 이벤트 처리
      pull-request.ts ← PR 이벤트 처리
      workflow.ts     ← CI 이벤트 처리
      release.ts      ← 릴리즈 이벤트 처리
    utils/
      maintainers.ts  ← maintainers.yml 파싱
      discord.ts      ← Discord Embed 빌더
      github.ts       ← org 멤버 확인 등
  maintainers.yml     ← repo → Discord 유저 ID 매핑
  wrangler.toml       ← Cloudflare Workers 설정
```

---

## maintainers.yml 형식

```yaml
# repo명: Discord 유저 ID
dep-age: "123456789012345678"
whatdid: "123456789012345678"
daybar: "123456789012345678"
CodeAgora: "234567890123456789"
# ...
```

---

## 안티패턴 (피할 것)

- 쿨다운 없는 연속 알림 (같은 이슈 댓글마다 알림 X)
- 모든 이벤트 동등 처리 (CI 실패 = 이슈 댓글 취급 X)
- 설정 복잡도 과잉 (끄려면 여러 단계 X)
- 우선순위 없이 전부 멘션

---

## 참고

- [GitHub Webhooks docs](https://docs.github.com/en/webhooks)
- [Discord Embed 스펙](https://discord.com/developers/docs/resources/message#embed-object)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
