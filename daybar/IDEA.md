# daybar

macOS 메뉴바에서 바로 보는 D-day 트래커.

---

## 핵심 컨셉

- 앱을 열 필요 없이 메뉴바에 남은 날짜가 항상 표시됨
- 여러 개 등록하면 **가장 가까운 D-day**가 메뉴바에 자동으로 올라옴
- 작고, 빠르고, 방해 안 됨

---

## 메뉴바 표시 방식

```
🎓 D-42        ← 아이콘 + 남은 일수
```

- 당일: `🎂 D-Day`
- 지난 날: `✅ D+7`
- 클릭하면 전체 목록 팝업

---

## 기능 목록

### MVP
- [ ] D-day 항목 추가 / 삭제
- [ ] 이름, 날짜, 이모지 설정
- [ ] 메뉴바에 가장 가까운 D-day 표시
- [ ] 클릭 시 전체 목록 드롭다운

### 추가하면 좋을 것
- [ ] 당일 / 하루 전 알림
- [ ] 여러 항목 중 메뉴바에 고정할 항목 선택
- [ ] 색상 태그
- [ ] 항목 순서 드래그로 정렬
- [ ] 위젯 지원 (macOS 14+ WidgetKit)

---

## 기술 스택

- Swift 5.9+
- AppKit (NSStatusItem, NSMenu)
- SwiftUI (팝업 UI)
- UserNotifications
- macOS 13+

---

## 화면 구성

```
메뉴바 아이콘 클릭
        │
        ▼
┌─────────────────────┐
│  🎓 수능     D-42   │
│  🎂 내 생일  D-104  │
│  ✈️ 여행     D+3    │
├─────────────────────┤
│  + 추가             │
│  설정               │
│  종료               │
└─────────────────────┘
```

---

## 참고 레포

- [desktop-pet](https://github.com/bssm-oss/desktop-pet) — 메뉴바 앱 구조 참고
- [kakao-talk-auto-bot-mac](https://github.com/bssm-oss/kakao-talk-auto-bot-mac) — AppKit 메뉴바 패턴 참고
