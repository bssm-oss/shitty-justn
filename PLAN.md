# blaming 기획서

## 한 줄 정의
URL 던지면 6가지 항목을 분석해서 한국어로 진단 결과를 보여주는 웹 도구. 한국어판 Lighthouse 포지션.

## 목표 / 비목표

**목표**
- 한국어 사용자가 자기 사이트의 객관적 상태를 즉시 파악
- Lighthouse 영어/번역체의 가독성 문제 해결
- URL 한 번 던지면 끝나는 단순함
- 결과 페이지 공유 가능 (URL로 바로)

**비목표 (안 함)**
- AI 해설/생성 (Phase 1까지 일절 없음)
- 까는 톤/유머 (딱딱하고 명확하게)
- 사용자 회원가입/계정
- UX 평가, 카피 평가 (스코프 아웃)
- 기술 스택 detect

## 아키텍처

```
[브라우저]
   ↓ URL 입력
[Next.js Frontend]
   ↓ POST /api/analyze
[API Route (서버리스)]
   ├─ Google PageSpeed Insights API (성능/접근성/번들/모바일)
   ├─ cheerio로 직접 fetch → SEO 메타 파싱
   ├─ 직접 fetch → 보안 헤더 체크
   ├─ 6개 analyzer 병렬 실행
   ├─ 결과 JSON 생성
   └─ DB에 저장 → ID 발급
   ↓
[결과 페이지 /r/{id}]
```

## 기술 스택

| 레이어 | 선택 | 이유 |
|---|---|---|
| 프레임워크 | Next.js (App Router) | 메인 스택 |
| 언어 | TypeScript | 기본 |
| 성능/접근성/번들/모바일 | Google PageSpeed Insights API | Playwright 없이 Lighthouse 결과 |
| SEO | cheerio | 메타 직접 파싱 |
| 보안 | 직접 fetch | 헤더 체크 |
| DB | Turso (LibSQL) + Drizzle ORM | Vercel 서버리스 호환. SQLite 문법 그대로 |
| 스타일 | Tailwind | 기본 |
| 배포 | Vercel | 서버리스 |

## 6개 분석기 명세

### 1. 성능 (PSI API)
- 입력: URL
- 출력: Performance score (0-100), LCP, CLS, INP, FCP, TBT, Speed Index
- 디테일: failing audits 위주

### 2. 접근성 (PSI API)
- 출력: Accessibility score, violations 배열 (rule ID, impact, 설명)
- impact 단위: minor / moderate / serious / critical

### 3. SEO (cheerio)
체크 항목:
- `<title>` 존재 + 길이 (10~60자 권장)
- `<meta name="description">` 존재 + 길이 (50~160자)
- Open Graph 태그 (og:title, og:description, og:image)
- Twitter Card 태그
- canonical URL
- `<h1>` 개수 (1개 권장)
- `lang` 속성
- robots.txt 존재
- sitemap.xml 존재

### 4. 보안
체크 항목:
- HTTPS 사용 여부
- 보안 헤더: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- 노출 경로: `/.env`, `/.git/config`, `/.git/HEAD` → 200 응답이면 위험

### 5. 번들 사이즈 (PSI API)
- JS / CSS / Image / Font / 기타 타입별 합산
- 총 용량 + 요청 수
- JS 1MB 초과 = 경고

### 6. 모바일 (PSI API 모바일 모드)
- 모바일 점수
- 가로 스크롤 여부
- 터치 타겟 크기

### 공통 응답 타입

```ts
type AnalyzerResult = {
  category: 'performance' | 'a11y' | 'seo' | 'security' | 'bundle' | 'mobile';
  score: number;        // 0-100
  issues: Issue[];
  meta: Record<string, unknown>;
};

type Issue = {
  id: string;
  severity: 'info' | 'warning' | 'error';
  message: string;      // 한국어 사전에서
  detail?: string;
};
```

## 한국어 메시지 사전

핵심 차별점. Lighthouse audit ID / axe rule ID → 한국어 설명 매핑.

```ts
// messages/a11y.ts
export const a11yMessages: Record<string, MessageEntry> = {
  'image-alt': {
    title: '이미지 대체 텍스트 누락',
    description: '이미지에 alt 속성이 없습니다. 스크린리더 사용자에게 이미지 정보가 전달되지 않습니다.',
    fix: '의미 있는 이미지에는 alt="설명"을, 장식용 이미지에는 alt=""를 추가하세요.',
  },
  'color-contrast': {
    title: '색상 대비 부족',
    description: '글자색과 배경색의 대비가 WCAG AA 기준(4.5:1)에 미달합니다.',
    fix: '글자색을 더 진하게 하거나 배경색을 더 밝게/어둡게 조정하세요.',
  },
};
```

**원칙:**
- 번역체 금지. 자연스러운 한국어
- 용어 풀이 포함 (LCP, CLS 처음 보는 사람도 이해 가능)
- 문제(왜 나쁜지) + 해결(어떻게 고치는지) 둘 다
- 객관적이고 명확하게. 친절하거나 까는 톤 X
- 주요 30~50개부터 시작 → 점진적 확장

## 페이즈 계획

### Phase 0 — 셋업
- Next.js 프로젝트 생성 ✅
- TypeScript + Tailwind ✅
- PSI API 키 발급 + 헬로월드
- DB 결정 (SQLite 시작 추천)
- Vercel 배포 연결

**완료 기준:** 빈 페이지 도메인에서 뜸

### Phase 1 — 코어 2개 분석기
- `analyzers/performance.ts` (PSI API)
- `analyzers/accessibility.ts` (PSI API)
- `/api/analyze` POST 엔드포인트
- DB 저장 (id, url, result_json, created_at)

**완료 기준:** curl로 분석 요청 → JSON 결과 반환

### Phase 2 — 나머지 4개 분석기
- SEO (cheerio)
- 보안 (헤더 + 노출 경로 fetch)
- 번들 (PSI API network requests)
- 모바일 (PSI API 모바일 모드)
- 6개 병렬 실행 + 결과 통합

**완료 기준:** 한 번 호출로 6개 카테고리 전부 반환

### Phase 3 — 한국어 메시지 사전
- Lighthouse 주요 audit ID 30개 매핑
- SEO/보안/번들/모바일 자체 정의 메시지
- analyzer 결과에 메시지 자동 주입

**완료 기준:** API 응답이 한국어로 읽히는 상태

### Phase 4 — 웹 UI
- **랜딩 페이지** (`/`) — URL 입력 + 로딩 상태
- **결과 페이지** (`/r/[id]`)
  - 종합 점수 (큰 숫자)
  - 카테고리 6개 점수 카드
  - 카테고리별 이슈 리스트 (펼침)
  - 공유 버튼 (URL 복사)
- 분석 후 결과 페이지 자동 리디렉트

**완료 기준:** 브라우저에서 URL 입력 → 결과 페이지까지 동작

### Phase 5 — 다듬기 + 출시
- OG 이미지 자동 생성 (점수 박힌 카드)
- 에러 핸들링: 사이트 다운, timeout, 봇 차단, 잘못된 URL
- 동시 요청 rate limit (IP당 분당 5회)
- README + 데모 GIF
- 출시

**완료 기준:** 친구들한테 링크 던질 수 있는 상태

**총합: 8~11일 실작업**

## 결과 페이지 컨셉

```
┌─────────────────────────────────────┐
│ blaming                             │
│                                     │
│ naver.com                           │
│                                     │
│         ┌───────┐                   │
│         │  47   │  종합             │
│         └───────┘                   │
│                                     │
│ ┌───┐ ┌───┐ ┌───┐                  │
│ │32 │ │28 │ │71 │                  │
│ │성능│ │접근성│ │SEO│                │
│ └───┘ └───┘ └───┘                  │
│ ┌───┐ ┌───┐ ┌───┐                  │
│ │55 │ │63 │ │40 │                  │
│ │보안│ │번들│ │모바일│               │
│ └───┘ └───┘ └───┘                  │
│                                     │
│ ─── 발견된 이슈 ───                  │
│                                     │
│ ▶ 성능 (8개)                        │
│ ▶ 접근성 (14개)                     │
│ ▶ SEO (3개)                         │
└─────────────────────────────────────┘
```

**디자인 원칙:**
- 점수가 즉시 보임 (큰 숫자, 색깔)
- 한 화면에 종합 + 카테고리
- 이슈는 펼침으로 깊이 조절
- 다크모드 only (토글 없음)
- 캡처했을 때 OG 이미지처럼 깔끔

## 운영 고려사항

- **PSI API**: 하루 25,000 쿼리 무료. 초반엔 충분
- **timeout**: PSI API 응답 느릴 수 있음. Vercel Pro 60초 / free 10초
- **보안 결과 저장**: 노출된 `.env` 내용 등 민감 정보 sanitize 필요
- **결과 보관**: 영구 보관 (바이럴용). 부담되면 30일 후 삭제
- **공개**: URL 알면 누구나 결과 열람 가능. 비공개 옵션 나중에
- **rate limit**: IP당 분당 5회

## 확정된 결정

- [x] **DB**: Turso (LibSQL) + Drizzle ORM — Vercel 서버리스에서 SQLite 파일 불가, Turso로 대체
- [x] **결과 URL**: `/r/{shortid}` (nanoid)
- [x] **다크모드**: only (토글 없음)

## 남은 결정

- [ ] **도메인**: blaming.kr / blaming.dev / 서브도메인
- [ ] **Vercel 플랜**: free(10초 timeout) vs Pro(60초)
