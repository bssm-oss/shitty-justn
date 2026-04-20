# blaming

URL을 던지면 6가지 항목을 한국어로 진단하는 웹 도구.

Lighthouse 결과를 영어 번역체 없이, 처음부터 한국어로 설명합니다.

## 분석 항목

| 카테고리 | 데이터 소스 | 설명 |
|---|---|---|
| **성능** | Google PSI API | LCP, CLS, TBT, FCP, Speed Index |
| **접근성** | Google PSI API | 색상 대비, ARIA, 이미지 alt, 폼 레이블 등 |
| **SEO** | cheerio (직접 파싱) | title, meta description, OG 태그, canonical, 구조화된 데이터 |
| **보안** | 직접 fetch | HTTPS, 보안 헤더 (CSP, HSTS 등), 민감 경로 노출 |
| **번들** | Google PSI API | JS/CSS 크기, 미사용 코드, 텍스트 압축, 렌더링 차단 |
| **모바일** | Google PSI API (mobile) | 뷰포트, 터치 대상 크기, 반응형 이미지, HTTP/2 |

## 핵심 특징

- **한국어 메시지 사전** -- Lighthouse audit ID를 자연스러운 한국어 설명으로 매핑. 번역체가 아니라 처음부터 한국어로 작성.
- **6개 분석기 병렬 실행** -- PSI API 1회 호출로 4개 분석기에 결과 분배. 쿼터 75% 절감.
- **결과 공유** -- `/r/{shortid}` URL로 누구나 결과 열람 가능. OG 이미지 자동 생성.
- **다크 모드 only** -- 토글 없음.

## 기술 스택

| 레이어 | 선택 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript (strict) |
| 스타일 | Tailwind CSS v4 |
| DB | Turso (LibSQL) + Drizzle ORM |
| 성능/접근성/번들/모바일 | Google PageSpeed Insights API |
| SEO 파싱 | cheerio |
| ID 생성 | nanoid |
| 배포 | Vercel |

## 시작하기

### 1. 클론 + 설치

```bash
git clone https://github.com/justn-hyeok/blaming.git
cd blaming
npm install
```

### 2. 환경변수

```bash
cp .env.example .env
```

`.env` 파일을 열고 값을 채워넣으세요:

```
PSI_API_KEY=           # Google PSI API 키 (https://developers.google.com/speed/docs/insights/v5/get-started)
TURSO_DB_URL=          # Turso DB URL (https://turso.tech)
TURSO_DB_AUTH_TOKEN=   # Turso DB 인증 토큰
```

### 3. DB 마이그레이션

```bash
npx drizzle-kit push
```

### 4. 실행

```bash
npm run dev
```

`http://localhost:3000`에서 확인.

## 프로젝트 구조

```
app/
  page.tsx                    # 랜딩 (URL 입력)
  r/[id]/
    page.tsx                  # 결과 페이지
    opengraph-image.tsx       # OG 이미지 자동 생성
    copy-button.tsx           # URL 복사 버튼
  api/analyze/route.ts        # POST 분석 엔드포인트
lib/
  analyzers/                  # 6개 분석기 (각각 독립)
    psi.ts                    # 공유 PSI fetcher
    performance.ts
    accessibility.ts
    seo.ts
    security.ts
    bundle.ts
    mobile.ts
    types.ts
    index.ts                  # 오케스트레이터
  messages/                   # 한국어 메시지 사전
    types.ts
    performance.ts
    a11y.ts
    seo.ts
    security.ts
    bundle.ts
    mobile.ts
  db/
    schema.ts                 # Drizzle 스키마
    client.ts                 # DB 클라이언트
```

## API

### `POST /api/analyze`

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

**응답:**
```json
{ "id": "a1b2c3d4" }
```

결과 확인: `http://localhost:3000/r/a1b2c3d4`

**에러 응답:**
- `400` -- URL 누락 또는 형식 오류
- `403` -- 내부 네트워크 주소 차단 (SSRF 방어)
- `422` -- 대상 사이트 접근 불가 (DNS 실패, 연결 거부 등)
- `429` -- Rate limit 초과 (IP당 분당 5회)
- `504` -- 분석 타임아웃 (45초)

## 테스트

```bash
npm test
```

## 라이선스

MIT
