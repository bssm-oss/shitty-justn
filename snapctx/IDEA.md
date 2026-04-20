# snapctx

> snap your context. switch in seconds.

## 한 줄 정의

프로젝트 전환할 때 컨텍스트(파일, 탭, 터미널, AI 대화)를 통째로 저장/복원하는 개발자용 데스크탑 앱. 개발자의 "뇌 상태" 스냅샷.

---

## 왜 만드나

지금 동시에 굴리는 것들:
- Jagalchi (팀 리딩)
- CodeAgora
- blaming
- DIGG
- 자격증 공부

각 프로젝트마다 열려있는 파일, 브라우저 탭, 터미널 세션, AI 대화 히스토리, 노션 페이지, 작업 메모가 다 다름.

프로젝트 전환할 때마다 이걸 새로 빌드해야 함. **5분 전에 뭐 하고 있었는지도 까먹음.**

snapctx는: **"DIGG 모드" → "blaming 모드" 원클릭 전환.** 한 모드로 들어가면 그 프로젝트 컨텍스트가 통째로 복원됨.

---

## 타겟 페르소나

- 멀티프로젝트 굴리는 개발자
- ADHD 성향
- "뭐 하다 말았지" 자주 겪는 사람
- 사이드 프로젝트 여러 개 동시 진행하는 사람

---

## 핵심 기능

### 컨텍스트 스냅샷
저장 대상:
- 열려있는 파일 (VSCode/Cursor 워크스페이스)
- 브라우저 탭 (탭 그룹 or URL 목록)
- 터미널 세션 (현재 디렉토리, 실행 중인 프로세스)
- AI 대화 히스토리 (Claude/ChatGPT 세션 링크)
- 노션 페이지 링크
- 자유 메모

### 원클릭 복원
- "DIGG 모드" 클릭 → 저장된 파일 열기, 탭 복원, 터미널 이동
- 이전 컨텍스트는 자동 저장 후 전환

### 빠른 메모
- 전환 전 "지금 어디까지 했는지" 한 줄 메모 남기기
- 복원 시 메모 먼저 보여줌 → "아 여기까지 했었구나"

---

## 기술 스택

| 레이어 | 기술 | 이유 |
|---|---|---|
| 앱 프레임워크 | Tauri | OS 통합 필수, 가벼움 |
| UI | React + TypeScript | 메인 스택 |
| OS API (macOS) | AppleScript / Accessibility API | 윈도우/앱 상태 추적 |
| OS API (Windows) | UI Automation | - |
| DB | SQLite | 로컬 저장 |
| 에디터 연동 | VSCode Extension API | 열린 파일 추적 |
| 브라우저 연동 | Chrome Extension | 탭 목록 캡처 |

---

## 아키텍처

```
[snapctx 데스크탑 앱 (Tauri)]
  ├── 컨텍스트 캡처
  │   ├── OS API → 활성 윈도우, 포커스된 파일
  │   ├── VSCode Extension → 열린 파일 목록
  │   └── Chrome Extension → 탭 URL 목록
  ├── 스냅샷 저장 (SQLite)
  └── 복원
      ├── 파일 열기 (VSCode CLI)
      ├── 탭 복원 (Chrome Extension)
      └── 터미널 이동 (AppleScript / shell)
```

---

## 페이즈 계획

### Phase 0 — 검증 (1~2일)
- Tauri 프로젝트 셋업
- macOS AppleScript로 활성 앱 목록 읽기
- VSCode Extension에서 열린 파일 목록 받아오기

**완료 기준:** 현재 열린 앱 + 파일 목록 콘솔 출력

### Phase 1 — 스냅샷 저장/복원 MVP
- 컨텍스트 캡처 (파일 + 앱)
- SQLite 저장
- 복원 (파일 열기, 앱 포커스)

### Phase 2 — 브라우저 탭 연동
- Chrome Extension 개발
- 탭 URL 목록 캡처/복원

### Phase 3 — UI
- 프로젝트 목록
- 전환 전 메모 입력
- 복원 시 이전 메모 표시

### Phase 4 — 다듬기
- macOS 메뉴바 상주
- 단축키로 빠른 전환

**총합: 2~3주 + Rust/OS API 학습 비용**

---

## 주의사항

- **Rust + OS API 새 영역** — Tauri는 알지만 Rust + AppleScript 조합은 학습 필요
- **스코프 폭발 위험** — 기능 욕심 내면 끝이 없음. MVP는 파일 + 앱만
- **기존 대안** — Raycast, Hammerspoon 일부 기능 겹침. 차별점은 AI 대화/메모 포함한 통합 컨텍스트
- **데모 어려움** — "이게 뭔지" 한눈에 안 들어옴. GIF 데모 중요

---

## 타이밍

blaming → DIGG → critline 이후 카드. 스코프가 크고 학습 비용 있어서 여유 있을 때 시작. 진짜 만들면 졸작급 임팩트.
