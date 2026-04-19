# terminal-pet

CI 상태에 반응하는 ASCII 캐릭터가 터미널에 사는 TUI 앱.
desktop-pet의 터미널 세계관 확장.

## 컨셉

터미널에서 작업하면 ASCII 캐릭터가 반응한다.
git commit하면 춤추고, CI fail 뜨면 울고, rm -rf 치면 도망간다.
개발자의 감정 대리인.

## 반응 목록

| 이벤트 | 반응 |
|--------|------|
| `git commit` | 춤춤 (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧ |
| `git push` | 손 흔듦 |
| CI pass | 축하 파티 |
| CI fail | 울음 (´;ω;`) |
| `rm -rf` | 도망 |
| `npm install` | 식사 중... |
| 10분 이상 미입력 | 졸기 시작 |
| `exit` | 바이바이 |
| force push | 공포에 떰 |
| merge conflict | 혼란 |

## 구현 방식

- **데몬 모드**: 백그라운드에서 돌면서 터미널 이벤트 감지
- **위젯 모드**: tmux statusline이나 터미널 한쪽 패인에 상주
- **원샷 모드**: `terminal-pet status`로 현재 상태만 출력

### 이벤트 감지

- shell hook (preexec/precmd)으로 명령어 감지
- GitHub API 폴링으로 CI 상태 확인
- 파일 시스템 watch로 git 이벤트 감지

## 기술 스택

- **Go** + **BubbleTea** (TUI)
- **Lip Gloss** (스타일링)
- Shell integration (zsh preexec hook)

## 확장 가능성

- 캐릭터 커스터마이징 (ASCII 아트 팩)
- desktop-pet 에셋을 ASCII로 변환
- 레벨 시스템 (커밋 많이 하면 성장)
- 팀 모드 (여러 명의 펫이 같은 터미널에)

## 예상 규모

기본 반응 + BubbleTea TUI: 1~2일
shell hook 연동 + CI 감지: +1일
