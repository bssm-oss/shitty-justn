# Critline

> section-by-section feedback, right inside your Notion portfolio.

## 한 줄 정의

노션 포트폴리오에 임베드하는 피드백 위젯. 섹션별로 AI 즉시 피드백 + 외부 방문자 코멘트를 작성 중에 받는 도구.

---

## 왜 만드나

노션으로 포폴 쓰는 사람이 피드백 받는 방법:
1. 완성하고 링크 공유 → 카톡/슬랙으로 "봐줘" → 흐지부지
2. Notion 기본 코멘트 → 상대방이 Notion 계정 있어야 함
3. 별도 AI 툴 → URL 넣으면 보고서 나옴, Notion 안에서 안 됨

**Critline은 작성 중에, Notion 안에서, 섹션별로 받는다.**

---

## 경쟁 현황

| 도구 | Notion 임베드 | 섹션별 | AI 피드백 | 외부 방문자 |
|---|---|---|---|---|
| Refined AI | X | X | O | O |
| Markup.io | X | 화면 핀 | X | O |
| Notion 기본 코멘트 | O | O | X | X (멤버만) |
| Hyvor Talk / Common Ninja | O (범용) | X | X | O |
| **Critline** | **O** | **O** | **O** | **O** |

이 교차점을 채우는 도구 없음.

---

## 핵심 기능

### 섹션별 코멘트
- Notion API로 `heading_1/2/3` 기준 섹션 자동 분리
- 각 블록 ID에 코멘트 매핑
- "프로젝트 소개", "기술스택", "회고" 각각 분리된 피드백

### AI 즉시 피드백 (Claude API)
24시간 즉시, 섹션별 체크:
- "기술적 기여도가 안 보여요"
- "문제 → 해결 → 결과 구조로 바꿔보세요"
- "이 섹션 너무 길어요, 핵심만 남기세요"
- "기술스택은 있는데 왜 이걸 선택했는지 없네요"

### 사람 피드백
- 링크만 공유하면 누구나 (Notion 계정 불필요)
- 현직자/선배한테 실무 관점 조언

---

## 플로우

```
포트폴리오 작성 시작 (Notion)
        ↓
Critline 위젯 /embed로 삽입
        ↓
AI 즉시 피드백 → 기본 점검
        ↓
다듬고 나서 링크 공유
        ↓
사람 피드백 → 완성도 업
        ↓
반복
```

**핵심: "완성 후 피드백"이 아니라 "작성 중 피드백"**

---

## 기술 스택

| 레이어 | 기술 |
|---|---|
| 위젯 | **htmx** (iframe으로 Notion에 임베드, 부분 렌더링) |
| 백엔드 | **Hono** (경량 서버) |
| Notion 연동 | Notion API (`Retrieve block children`) |
| AI 피드백 | **Claude API** |
| DB | **SQLite / Turso** (코멘트 저장) |
| 호스팅 | Cloudflare Workers 또는 Fly.io |

> **변경 이유 (Next.js + React → Hono + htmx):**
> iframe 위젯에 풀 프레임워크(Next.js + React)는 오버킬.
> Hono(경량 서버) + htmx(부분 렌더링)로 최소 번들 사이즈를 달성하고,
> 위젯 로딩 속도를 극대화. Notion 임베드 환경에서 가벼운 것이 핵심.

**임베드 방식:** 위젯을 본인 도메인에 호스팅 → CSP 헤더 설정 → Notion `/embed [URL]`로 삽입. Typeform, Blocky가 이미 이 방식으로 동작.

---

## 아키텍처

```
[Notion 페이지]
  └── /embed critline.dev/widget?page={notionPageId}
        ↓ (iframe)
[Critline 위젯 (htmx)]
  ├── Notion API로 섹션 파싱
  ├── 섹션별 AI 피드백 요청
  └── 섹션별 코멘트 표시/입력
        ↓
[Critline API (Hono)]
  ├── POST /api/feedback → Claude API 호출
  └── POST /api/comment → DB 저장
```

---

## 페이즈 계획

### Phase 0 — 검증
- Notion 공유 페이지에서 `/embed` 동작 확인
- iframe CSP 헤더 설정 테스트
- Notion API로 블록 파싱 테스트

**완료 기준:** Notion 페이지에 커스텀 위젯 뜨면 성공

### Phase 1 — 섹션 파싱 + 코멘트
- Notion API 블록 파싱 (heading 기준 섹션 분리)
- 섹션별 코멘트 입력/저장
- 외부 방문자 코멘트 (계정 불필요)

### Phase 2 — AI 피드백
- Claude API 연동
- 섹션 내용 → AI 피드백 생성
- 피드백 캐싱 (같은 내용 재요청 방지)

### Phase 3 — UI 다듬기
- 위젯 디자인 (Notion 다크모드 어울리게)
- 모바일 제한 안내 (데스크탑 전용 v1)
- 공유 플로우 UX

**총합: 1~2주**

---

## 주의사항

- **Notion 모바일**: 임베드 인터랙션 제한됨. v1은 데스크탑 전용
- **Notion API 인증**: 각 사용자가 본인 Notion 권한 줘야 함 → 진입 마찰. OAuth 플로우 필요
- **AI 비용**: v1은 본인 키, 나중에 사용자 키 입력 방식으로

---

## 타이밍

blaming → DIGG 안정화 후 다음 카드.
기획 완성도 높고 갭 확인됨. 언제든 시작 가능.
