<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

이 문서는 blaming 레포에서 AI 코딩 에이전트(Claude Code, OpenCode, Codex, Cursor 등)가 따라야 할 규칙이다. 사람도 읽을 수 있지만 1차 독자는 에이전트.

기획 상세는 `PLAN.md` 참조. 이 문서는 **"어떻게 작업하느냐"**에 집중한다.

---

## 0. 가장 중요한 규칙 (어기면 작업 거부)

1. **한국어로 응답한다.** 코드 주석/커밋/문서 영문 OK, 사람과의 대화는 한국어.
2. **`any` 남발 금지.** TypeScript strict mode. 타입은 명시적으로. `as any` 캐스팅 금지.
3. **`main` 브랜치에 직접 푸시 금지.** 모든 변경은 브랜치 → PR → merge.
4. **시크릿/API 키 절대 커밋 금지.** `.env.local`에만 두고, `.env.example`에는 키 이름만.
5. **확인 없이 destructive 명령 실행 금지.** DB 삭제, `rm -rf`, `git reset --hard` 등은 사용자에게 먼저 물어봐라.
6. **Next.js 16 API를 모르면 추측하지 마라.** `node_modules/next/dist/docs/`를 읽거나 Context7으로 확인해라. 이전 버전 패턴을 그대로 쓰면 깨진다.

---

## 1. 프로젝트 개요

- **이름**: blaming
- **한 줄**: URL 던지면 6가지 항목을 한국어로 진단하는 웹 도구 (한국어판 Lighthouse)
- **스택**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **상태**: Phase 0 (셋업 완료, 코어 분석기 구현 시작 전)

핵심 차별점:
- **한국어 메시지 사전** — Lighthouse audit ID → 자연스러운 한국어 설명 매핑
- **6개 분석기 병렬 실행** — 성능, 접근성, SEO, 보안, 번들, 모바일

---

## 2. 확정된 결정사항

| 항목 | 결정 | 비고 |
|---|---|---|
| DB | **Turso (LibSQL) + Drizzle ORM** | Vercel 서버리스에서 SQLite 파일 안 됨. Turso로. |
| 다크모드 | **다크 only** | 토글 없음. 처음부터 다크 테마로만 디자인. |
| 결과 URL | **`/r/{shortid}`** | nanoid 등으로 짧은 ID 생성. |
| 배포 | Vercel | 서버리스 함수로 분석 실행 |
| PSI API | Google PageSpeed Insights API | 성능/접근성/번들/모바일 4개 카테고리 담당 |
| SEO 파서 | cheerio | 직접 fetch → 메타 태그 파싱 |
| 보안 체커 | 직접 fetch | HTTP 헤더 + 노출 경로 확인 |

---

## 3. 기술 스택

| 레이어 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 16 (App Router) | `node_modules/next/dist/docs/` 참조 필수 |
| 언어 | TypeScript (strict) | |
| 스타일 | Tailwind CSS v4 | 다크 only |
| DB | Turso + Drizzle ORM | `@libsql/client` + `drizzle-orm` |
| API | Google PageSpeed Insights | 환경변수: `PSI_API_KEY` |
| HTML 파싱 | cheerio | SEO 분석용 |
| ID 생성 | nanoid | 결과 URL shortid |

새 라이브러리 추가 시 PR에 **이유** 필수. 이미 있는 것으로 충분하면 추가하지 마라.

---

## 4. 아키텍처 규칙

```
app/
  page.tsx              ← 랜딩 (URL 입력)
  r/[id]/page.tsx       ← 결과 페이지
  api/analyze/route.ts  ← POST 엔드포인트
lib/
  analyzers/            ← 6개 분석기. 각각 독립 모듈.
    performance.ts
    accessibility.ts
    seo.ts
    security.ts
    bundle.ts
    mobile.ts
    types.ts            ← AnalyzerResult, Issue 공통 타입
  messages/             ← 한국어 메시지 사전
    performance.ts
    a11y.ts
    seo.ts
    security.ts
    bundle.ts
    mobile.ts
  db/                   ← Drizzle 스키마 + 클라이언트
    schema.ts
    client.ts
```

**규칙**:
- 분석기(`lib/analyzers/`)는 서로 import 금지. 각각 독립적으로 동작.
- 분석기는 `AnalyzerResult` 타입만 반환. UI 로직 금지.
- 메시지 사전(`lib/messages/`)은 순수 데이터. 로직 금지.
- API route에서 6개 분석기를 `Promise.all`로 병렬 실행.
- 컴포넌트는 `app/` 안에서 colocate. 별도 `components/` 폴더는 공유 컴포넌트만.

---

## 5. 공통 타입 (반드시 준수)

```ts
type AnalyzerResult = {
  category: 'performance' | 'a11y' | 'seo' | 'security' | 'bundle' | 'mobile';
  score: number;        // 0-100
  issues: Issue[];
  meta: Record<string, string | number | boolean>;
};

type Issue = {
  id: string;
  severity: 'info' | 'warning' | 'error';
  message: string;      // 한국어 사전에서 가져옴
  detail?: string;
};
```

모든 분석기는 이 타입을 반환해야 한다. 타입을 변경하려면 6개 분석기 + 메시지 사전 + 결과 페이지 전부 업데이트.

---

## 6. 한국어 메시지 사전 규칙

blaming의 정체성이다. 번역체가 아니라 **처음부터 한국어로 쓴 설명**.

원칙:
- 번역체 금지. "최대 콘텐츠풀 페인트" 같은 거 하지 마라.
- 용어는 풀어서 설명: "LCP (화면에 가장 큰 요소가 뜨는 시간)"
- 각 항목에 **문제**(왜 나쁜지) + **해결**(어떻게 고치는지) 둘 다 포함
- 톤: 객관적, 명확. 친절하게 X, 까는 톤 X, 이모지 X
- 매핑 안 된 audit ID는 영문 원본 그대로 노출 (빈 문자열 금지)

```ts
// 예시
'image-alt': {
  title: '이미지 대체 텍스트 누락',
  description: '이미지에 alt 속성이 없습니다. 스크린리더 사용자에게 이미지 정보가 전달되지 않습니다.',
  fix: '의미 있는 이미지에는 alt="설명"을, 장식용 이미지에는 alt=""를 추가하세요.',
}
```

---

## 7. 코드 컨벤션

- TypeScript strict mode. `noUncheckedIndexedAccess` 포함.
- ESLint + Prettier (Tailwind 플러그인 포함).
- 함수형 컴포넌트 + hooks only.
- `use client`는 정말 필요한 곳만. 기본은 서버 컴포넌트.
- import 순서: 외부 → 내부 → 상대경로. 자동 정렬.
- 에러 처리: try-catch로 감싸되 무시하지 마라. 사용자에게 의미 있는 메시지를.
- 환경변수: `process.env.XXX`는 서버 코드에서만. 클라이언트에 노출해야 하면 `NEXT_PUBLIC_` prefix.

---

## 8. 테스트

- 분석기는 각각 단위 테스트 필수.
- 외부 API(PSI, fetch) 호출은 mock.
- 메시지 사전은 빈 값/누락 체크 테스트.
- `vitest` 사용 (이미 프로젝트에 세팅 예정).

---

## 9. Git 규칙

- **브랜치 네이밍**: `feat/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/` prefix.
- **커밋 메시지**: Conventional Commits.
  - `feat(analyzer): add performance analyzer with PSI API`
  - `fix(seo): handle missing og:image gracefully`
- **`main`은 보호 브랜치**. PR을 거쳐 merge만 가능.
- **PR은 작게**. Phase 하나를 한 PR에 넣지 마라. 분석기 하나 = PR 하나.
- 커밋 메시지에 AI 도구 이름 박지 마라.

---

## 10. 보안 주의사항

blaming은 외부 URL을 분석하는 도구라 보안에 특히 주의:

- **SSRF 방지**: 사용자 입력 URL을 그대로 fetch하므로, `localhost`, `127.0.0.1`, 내부 IP 대역 차단 필수.
- **결과 sanitize**: 보안 분석에서 `.env` 노출 감지 시 내용 자체는 저장하지 마라. "노출됨" 사실만 기록.
- **Rate limit**: IP당 분당 5회. 초과 시 429.
- **PSI API 키**: 서버 사이드에서만 사용. 절대 클라이언트에 노출 금지.

---

## 11. 작업 흐름 (에이전트가 따라야 할 순서)

1. **요구사항 읽기**. `PLAN.md`의 해당 Phase 확인.
2. **관련 코드 탐색**. 기존 분석기 패턴 확인 후 동일하게.
3. **계획 공유**. 큰 변경이면 코드 짜기 전에 한국어로 설명하고 OK 받기.
4. **작은 단위로 구현**. 분석기 하나씩.
5. **테스트 작성/실행**.
6. **lint 통과 확인**.
7. **PR 생성**.

---

## 12. 하지 마라 (Non-goals)

- ❌ AI 해설/생성 (Phase 1까지 일절 없음)
- ❌ 유머나 까는 톤 (객관적으로)
- ❌ 회원가입/계정 시스템
- ❌ UX 평가, 카피 평가
- ❌ 기술 스택 detect
- ❌ 라이트 모드 (다크 only)

---

## 13. 사용자 환경 메모

메인테이너(`@justn-hyeok`):

- 백엔드 경험 적음 — API/DB 관련 작업은 명확하게 설명하고 진행
- 프론트엔드(React, Next.js) 메인
- 한국어, 직설적/간결한 톤 선호
- 불필요한 사과, 과도한 설명, 부탁 안 한 제안 싫어함
- "확인해줘"라고 하면 코드 변경 전에 정말로 확인해라

---

## 14. 이 문서 자체에 대해

- 이 AGENTS.md는 에이전트 지시문의 단일 출처다.
- CLAUDE.md는 `@AGENTS.md`로 이 파일을 참조한다. 중복 작성 금지.
- 규칙 변경 시 이 파일 먼저 업데이트.
