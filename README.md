<h1 align="center">discord-bot</h1>
<p align="center"><strong>GitHub 이벤트 → Discord 알림. bssm-oss 전용.</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?logo=python" alt="Python">
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/Docker-compose-2496ED?logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License">
</p>

org webhook 하나로 bssm-oss 전체 레포를 커버. 이벤트 종류별 채널로 자동 라우팅하고 담당 메인테이너를 멘션한다.
레포가 생성되면 서비스 등록 포럼 채널에 스레드를 자동 생성한다.

---

## 채널 구조

| 채널 | 이벤트 |
|------|--------|
| `#github-이슈` | 이슈 오픈 / 클로즈 / 재오픈 |
| `#github-pr` | PR 오픈 / 머지 / 클로즈 / 리뷰 요청 |
| `#github-ci` | CI 실패 |
| `#github-릴리즈` | 릴리즈 퍼블리시 |
| 서비스 등록 포럼 | 레포 생성 시 자동 스레드 |

---

## 메인테이너 매핑

메인테이너는 서비스 등록 포럼 채널의 스레드 첫 메시지에 `<@Discord_ID>`로 멘션된 사람이다.
레포 생성 시 봇이 자동으로 스레드를 만들고 `MEMBER_MAP`에서 Discord ID를 찾아 멘션한다.

`.env`에 GitHub username → Discord ID 매핑을 JSON으로 설정한다:

```
MEMBER_MAP={"justn":"111111111111111111","otheruser":"222222222222222222"}
```

Discord 유저 ID: 개발자 모드 ON → 유저 우클릭 → ID 복사

---

## 배포

### 1. Discord 봇 생성

1. [Discord Developer Portal](https://discord.com/developers/applications) → New Application
2. Bot 탭 → Token 복사
3. OAuth2 → URL Generator → `bot` 스코프 + `Send Messages`, `Create Public Threads` 권한 → 서버에 초대

### 2. 채널 ID 수집

Discord 개발자 모드 ON (설정 > 고급) → 채널 우클릭 → ID 복사

### 3. 환경변수 설정

```bash
cp .env.example .env
# .env 값 채우기
```

### 4. Docker로 실행

```bash
docker compose up -d
```

### 5. GitHub Org Webhook 설정

[github.com/organizations/bssm-oss/settings/hooks](https://github.com/organizations/bssm-oss/settings/hooks) → Add webhook

| 항목 | 값 |
|------|-----|
| Payload URL | `http://YOUR_SERVER:8000/` |
| Content type | `application/json` |
| Secret | `.env`의 `GITHUB_WEBHOOK_SECRET`과 동일 |
| Events | Issues, Pull requests, Workflow runs, Releases, Repositories |

> 서버가 공인 IP가 없으면 [ngrok](https://ngrok.com) 또는 Cloudflare Tunnel로 외부에 노출한다.

---

## 개발

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt

pytest
```

---

## License

MIT
