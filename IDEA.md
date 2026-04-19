# repo-tag

GitHub 조직 리포에 커스텀 프로퍼티를 무료로 달 수 있는 Chrome 확장.

GitHub Custom Properties는 Team 플랜($4/user/month) 이상에서만 사용 가능.
repo-tag는 이 기능을 무료로 제공한다.

## 문제

- GitHub 조직에 리포가 많아지면 분류/필터가 필요
- Custom Properties는 유료 (Team $4/user)
- Topics는 있지만 구조적 분류(타입 지정, 필터 바)가 안 됨
- 서드파티 대안도 없음

## 해결

Chrome 확장이 `github.com/orgs/*/repositories` 페이지 위에 필터 바와 그룹 뷰를 inject.
프로퍼티 설정은 조직의 `.github` 리포에 JSON으로 저장해서 팀 전체가 공유.

## 핵심 기능

### 1. 프로퍼티 스키마 정의

조직마다 자유롭게 프로퍼티를 만들 수 있음.

```json
// .github/repo-tag.json
{
  "schema": [
    {
      "name": "category",
      "type": "multi_select",
      "color": true,
      "values": ["dev-tool", "ai", "automation", "fun", "library", "idea"]
    },
    {
      "name": "lead",
      "type": "multi_select",
      "values": ["heodongun", "justn-hyeok", "BitByte08"]
    },
    {
      "name": "platform",
      "type": "multi_select",
      "values": ["cli", "web", "mobile", "macos", "extension", "tui"]
    },
    {
      "name": "family",
      "type": "single_select",
      "values": ["kakao-bot", "ytm-jam", "desktop-pet"]
    },
    {
      "name": "priority",
      "type": "single_select",
      "values": ["high", "mid", "low"]
    }
  ],
  "repos": {
    "cotor": {
      "category": ["ai", "dev-tool"],
      "lead": ["heodongun"],
      "platform": ["cli", "tui", "web", "macos"],
      "family": "cotor"
    },
    "CodeAgora": {
      "category": ["dev-tool", "ai"],
      "lead": ["justn-hyeok"],
      "platform": ["cli", "web", "tui", "mcp"]
    }
  }
}
```

### 2. 필터 바 inject

`github.com/orgs/*/repositories` 페이지에 필터 바를 삽입.

```
┌─ repo-tag ──────────────────────────────────────────┐
│ category: [dev-tool ✕] [ai ✕]  lead: [all ▾]       │
│ platform: [all ▾]  family: [all ▾]                  │
│ 📊 12/49 repos shown  [Group by: category ▾] [⚙️]  │
└─────────────────────────────────────────────────────┘
```

### 3. 그룹 뷰

카테고리/패밀리별로 리포를 접기/펼치기로 그룹핑.

```
▼ dev-tool (14)
  CodeAgora  beautiful-ccg  ganbatte  blaming  ...

▼ ai (8)
  cotor  Free-API  PLASMA  ...

▶ fun (7)  ← 접힌 상태

▶ idea (5)
```

### 4. 리포 카드 뱃지

리포 목록의 각 항목에 프로퍼티 뱃지 표시.

```
cotor                              [ai] [dev-tool] [cli] [macos]
  Kotlin 코어와 CLI TUI 로컬 앱... ├ lead: heodongun
                                    └ family: cotor
```

### 5. 프로퍼티 에디터

확장 팝업 또는 인라인에서 리포별 프로퍼티 편집.
변경사항은 `.github/repo-tag.json`에 커밋으로 반영 (GitHub API).

## 데이터 저장

### 팀 공유 모드 (기본)
- 조직의 `.github` 리포에 `repo-tag.json` 저장
- GitHub API로 읽기/쓰기
- 팀원 전체가 같은 분류를 봄
- 변경 이력이 git history로 남음

### 개인 모드 (fallback)
- `.github` 리포 없거나 쓰기 권한 없으면
- `chrome.storage.sync`에 로컬 저장
- 개인 분류 가능

### 하이브리드
- 팀 설정 기반 + 개인 오버라이드
- 개인이 추가한 프로퍼티는 로컬에만 저장

## 자동 감지 (선택)

- GitHub Topics → 프로퍼티 값 자동 매핑 제안
- 리포 primary language → platform 추천
- Contributors API → lead 자동 추천
- 리포 description 키워드 → category 추천

## 기술 스택

- **TypeScript**
- **Chrome Extension MV3**
- **React** (팝업 UI, 옵션 페이지)
- **Tailwind CSS** (스타일링)
- **GitHub REST API** (repo-tag.json 읽기/쓰기, 리포 메타데이터)
- **Vite** + **CRXJS** (빌드)
- **Vitest** (테스트)
- **chrome.storage.sync** (개인 모드)

## 페이지별 동작

| 페이지 | 동작 |
|--------|------|
| `github.com/orgs/*/repositories` | 필터 바 + 그룹 뷰 + 뱃지 inject |
| `github.com/orgs/*/repositories?q=*` | 검색 결과에도 뱃지 표시 |
| `github.com/*` (리포 페이지) | 리포 헤더에 프로퍼티 뱃지 표시 |
| 확장 팝업 | 현재 조직 프로퍼티 편집, 설정 |

## 차별화

| | GitHub Custom Properties | repo-tag |
|---|---|---|
| 가격 | $4/user/month (Team) | 무료 |
| 설정 | 웹 UI (org settings) | JSON + 확장 UI |
| 필터 | 리포 목록 필터 | 필터 + 그룹 뷰 + 뱃지 |
| 이력 | 없음 | git history |
| 스키마 | 고정 | 자유 정의 |
| 공유 | 조직 멤버 자동 | `.github` 리포 통해 공유 |

## 예상 규모

- 콘텐츠 스크립트 (필터 바 + 뱃지): 3~4일
- 프로퍼티 에디터 (팝업): 2~3일
- GitHub API 연동 (JSON 읽기/쓰기): 1~2일
- 자동 감지: 1일
- 테스트 + 다듬기: 2일
- **총: 1.5~2주**

## 확장 가능성

- Firefox 지원
- CLI 버전 (`repo-tag list --org bssm-oss --filter category:ai`)
- GitHub Action (repo-tag.json 기반 자동 Topics 동기화)
- Chrome Web Store 배포
- 다크모드 지원
