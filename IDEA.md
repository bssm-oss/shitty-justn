# port-who

"이 포트 누가 쓰고 있냐"를 예쁘게 보여주는 CLI.

## 컨셉

`lsof -i` 출력은 못생기고 읽기 힘들다.
port-who는 현재 열린 포트를 예쁘게 정리해서 보여주고,
프로세스 이름/PID/업타임/프로젝트 디렉토리까지 한눈에 파악 가능.

## 예시 출력

```bash
$ port-who
# 🌐 열린 포트 목록
#
# PORT   PROCESS          PROJECT              UPTIME
# :3000  next dev         jagalchi-client/      ⬆ 2시간 13분
# :3001  vite             syncingsh/            ⬆ 47분
# :5432  postgres         docker                ⬆ 3일
# :8080  java             jagalchi-server/      ⬆ 1시간
# :8888  ???              pid:12847             ⬆ 47분  ← 🔴 미확인

$ port-who :3000
# :3000 — next dev
# PID: 28471
# CMD: node /usr/local/bin/next dev
# CWD: ~/projects/jagalchi-client
# 시작: 2026-04-09 14:32
# 업타임: 2시간 13분
# 메모리: 312MB

$ port-who kill :8888
# pid:12847 종료됨 ✅
```

## 기능

- 열린 포트 목록 (정렬: 포트/업타임/메모리)
- 프로세스 상세 정보
- 프로젝트 디렉토리 자동 감지 (cwd 기반)
- 미확인 프로세스 하이라이트
- `port-who kill <port>` — 포트 점유 프로세스 종료
- `port-who watch` — 실시간 모니터링 (TUI)
- docker 컨테이너 포트 매핑 표시

## 기술 스택

> 스택 변경: Go + Lip Gloss → Zig (시스템 프로그래밍 학습 + 현대적 DX)
>
> 이유: 시스템 콜 직접 호출, /proc 파싱에 Zig가 C 수준 접근 + 현대적 DX 제공

- **Zig**
- `std.posix`, `std.c` — 시스템 콜 직접 호출
- `zig build` — 내장 빌드 시스템, cross-compile 기본 지원
- `lsof` / `ss` / `netstat` 파싱
- `/proc` 파일시스템 (Linux)

## 지원 OS

- macOS (`lsof -i`)
- Linux (`ss -tlnp` + `/proc`)

## 예상 규모

기본 포트 목록 + 프로세스 정보: 1~2시간
프로젝트 디렉토리 감지 + kill: +2시간
watch 모드 TUI: +반나절
