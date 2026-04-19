"""
E2E tests — 실제 FastAPI 앱에 서명된 webhook을 쏘고
외부 API(GitHub, Discord)만 mock해서 전체 흐름을 검증.
"""

import hashlib
import hmac
import json

import pytest
import respx
import httpx
from httpx import AsyncClient, ASGITransport

import src.utils.maintainers as maintainers_module

SECRET = "x"  # .env의 GITHUB_WEBHOOK_SECRET
MAINTAINER_ID = "111111111111111111"

ACTIVE_THREADS_URL = "https://discord.com/api/v10/guilds/x/threads/active"
ARCHIVED_THREADS_URL = "https://discord.com/api/v10/channels/x/threads/archived/public?limit=100"
THREAD_MSG_URL = "https://discord.com/api/v10/channels/t1/messages/t1"
DISCORD_URL = "https://discord.com/api/v10/channels/x/messages"
DISCORD_FORUM_THREADS_URL = "https://discord.com/api/v10/channels/x/threads"

THREADS = [{"id": "t1", "name": "dep-age", "owner_id": "bot", "parent_id": "x"}]


def sign(body: str) -> str:
    return "sha256=" + hmac.new(SECRET.encode(), body.encode(), hashlib.sha256).hexdigest()


def webhook_headers(event: str, body: str) -> dict[str, str]:
    return {
        "x-github-event": event,
        "x-hub-signature-256": sign(body),
        "content-type": "application/json",
    }


@pytest.fixture(autouse=True)
def reset_maintainers_cache():
    maintainers_module._cache = {}
    maintainers_module._cache_time = 0
    yield


@pytest.fixture
async def client():
    from src.main import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


# ── 공통 mock 헬퍼 ──────────────────────────────────────────────────────────

def mock_maintainers():
    respx.get(ACTIVE_THREADS_URL).mock(
        return_value=httpx.Response(200, json={"threads": THREADS})
    )
    respx.get(ARCHIVED_THREADS_URL).mock(
        return_value=httpx.Response(200, json={"threads": []})
    )
    respx.get(THREAD_MSG_URL).mock(
        return_value=httpx.Response(200, json={"content": f"<@{MAINTAINER_ID}>"})
    )

def mock_member(login: str = "justn"):
    url = f"https://api.github.com/orgs/bssm-oss/members/{login}"
    return respx.get(url).mock(return_value=httpx.Response(204))

def mock_non_member(login: str):
    url = f"https://api.github.com/orgs/bssm-oss/members/{login}"
    return respx.get(url).mock(return_value=httpx.Response(404))

def mock_discord():
    return respx.post(DISCORD_URL).mock(return_value=httpx.Response(200, json={}))


# ── 인증 ────────────────────────────────────────────────────────────────────

class TestAuth:
    @pytest.mark.asyncio
    async def test_missing_signature_returns_401(self, client):
        body = json.dumps({"action": "opened"})
        res = await client.post("/", content=body, headers={"x-github-event": "issues"})
        assert res.status_code == 401

    @pytest.mark.asyncio
    async def test_wrong_signature_returns_401(self, client):
        body = json.dumps({"action": "opened"})
        res = await client.post(
            "/",
            content=body,
            headers={"x-github-event": "issues", "x-hub-signature-256": "sha256=bad"},
        )
        assert res.status_code == 401

    @pytest.mark.asyncio
    async def test_get_returns_405(self, client):
        res = await client.get("/")
        assert res.status_code == 405


# ── 이슈 ────────────────────────────────────────────────────────────────────

ISSUE_PAYLOAD = {
    "action": "opened",
    "issue": {
        "title": "Bug: crash on startup",
        "html_url": "https://github.com/bssm-oss/dep-age/issues/1",
        "labels": [{"name": "bug"}],
    },
    "repository": {
        "name": "dep-age",
        "full_name": "bssm-oss/dep-age",
        "html_url": "https://github.com/bssm-oss/dep-age",
    },
    "sender": {"login": "justn", "avatar_url": "https://avatars.githubusercontent.com/u/1"},
}


class TestIssueWebhook:
    @pytest.mark.asyncio
    @respx.mock
    async def test_issue_opened_sends_to_discord(self, client):
        mock_maintainers()
        mock_member("justn")
        discord = mock_discord()

        body = json.dumps(ISSUE_PAYLOAD)
        res = await client.post("/", content=body, headers=webhook_headers("issues", body))

        assert res.status_code == 200
        assert discord.called

    @pytest.mark.asyncio
    @respx.mock
    async def test_issue_opened_mentions_maintainer(self, client):
        mock_maintainers()
        mock_member("justn")
        discord = mock_discord()

        body = json.dumps(ISSUE_PAYLOAD)
        await client.post("/", content=body, headers=webhook_headers("issues", body))

        sent = json.loads(discord.calls[0].request.content)
        assert f"<@{MAINTAINER_ID}>" in sent["content"]

    @pytest.mark.asyncio
    @respx.mock
    async def test_external_contributor_flagged(self, client):
        mock_maintainers()
        mock_non_member("outsider")
        discord = mock_discord()

        payload = {**ISSUE_PAYLOAD, "sender": {"login": "outsider", "avatar_url": ""}}
        body = json.dumps(payload)
        await client.post("/", content=body, headers=webhook_headers("issues", body))

        sent = json.loads(discord.calls[0].request.content)
        assert "⭐" in sent["content"]

    @pytest.mark.asyncio
    @respx.mock
    async def test_ignored_action_returns_200_no_discord(self, client):
        discord = mock_discord()

        payload = {**ISSUE_PAYLOAD, "action": "labeled"}
        body = json.dumps(payload)
        res = await client.post("/", content=body, headers=webhook_headers("issues", body))

        assert res.status_code == 200
        assert not discord.called


# ── PR ───────────────────────────────────────────────────────────────────────

PR_PAYLOAD = {
    "action": "opened",
    "pull_request": {
        "title": "feat: add thing",
        "html_url": "https://github.com/bssm-oss/dep-age/pull/2",
        "merged": False,
        "labels": [],
        "requested_reviewers": [],
    },
    "repository": {
        "name": "dep-age",
        "full_name": "bssm-oss/dep-age",
        "html_url": "https://github.com/bssm-oss/dep-age",
    },
    "sender": {"login": "justn", "avatar_url": "https://avatars.githubusercontent.com/u/1"},
}


class TestPRWebhook:
    @pytest.mark.asyncio
    @respx.mock
    async def test_pr_opened_sends_to_discord(self, client):
        mock_maintainers()
        mock_member("justn")
        discord = mock_discord()

        body = json.dumps(PR_PAYLOAD)
        res = await client.post("/", content=body, headers=webhook_headers("pull_request", body))

        assert res.status_code == 200
        assert discord.called

    @pytest.mark.asyncio
    @respx.mock
    async def test_pr_merged_sends_green(self, client):
        mock_maintainers()
        mock_member("justn")
        discord = mock_discord()

        payload = {
            **PR_PAYLOAD,
            "action": "closed",
            "pull_request": {**PR_PAYLOAD["pull_request"], "merged": True},
        }
        body = json.dumps(payload)
        await client.post("/", content=body, headers=webhook_headers("pull_request", body))

        sent = json.loads(discord.calls[0].request.content)
        assert sent["embeds"][0]["color"] == 0x10B981


# ── CI ───────────────────────────────────────────────────────────────────────

WORKFLOW_PAYLOAD = {
    "action": "completed",
    "workflow_run": {
        "name": "CI",
        "conclusion": "failure",
        "head_branch": "main",
        "head_sha": "abc1234567890",
        "html_url": "https://github.com/bssm-oss/dep-age/actions/runs/1",
    },
    "repository": {
        "name": "dep-age",
        "full_name": "bssm-oss/dep-age",
        "html_url": "https://github.com/bssm-oss/dep-age",
    },
}


class TestWorkflowWebhook:
    @pytest.mark.asyncio
    @respx.mock
    async def test_ci_failure_sends(self, client):
        mock_maintainers()
        discord = mock_discord()

        body = json.dumps(WORKFLOW_PAYLOAD)
        res = await client.post("/", content=body, headers=webhook_headers("workflow_run", body))

        assert res.status_code == 200
        assert discord.called

    @pytest.mark.asyncio
    @respx.mock
    async def test_ci_success_does_not_send(self, client):
        discord = mock_discord()

        payload = {**WORKFLOW_PAYLOAD, "workflow_run": {**WORKFLOW_PAYLOAD["workflow_run"], "conclusion": "success"}}
        body = json.dumps(payload)
        res = await client.post("/", content=body, headers=webhook_headers("workflow_run", body))

        assert res.status_code == 200
        assert not discord.called


# ── 릴리즈 ──────────────────────────────────────────────────────────────────

RELEASE_PAYLOAD = {
    "action": "published",
    "release": {
        "name": "v1.0.0",
        "tag_name": "v1.0.0",
        "html_url": "https://github.com/bssm-oss/dep-age/releases/tag/v1.0.0",
        "body": "Initial release",
        "prerelease": False,
    },
    "repository": {
        "name": "dep-age",
        "full_name": "bssm-oss/dep-age",
        "html_url": "https://github.com/bssm-oss/dep-age",
    },
}


class TestReleaseWebhook:
    @pytest.mark.asyncio
    @respx.mock
    async def test_release_published_sends(self, client):
        discord = mock_discord()

        body = json.dumps(RELEASE_PAYLOAD)
        res = await client.post("/", content=body, headers=webhook_headers("release", body))

        assert res.status_code == 200
        assert discord.called

    @pytest.mark.asyncio
    @respx.mock
    async def test_unknown_event_returns_200_no_discord(self, client):
        discord = mock_discord()

        body = json.dumps({"action": "ping"})
        res = await client.post("/", content=body, headers=webhook_headers("ping", body))

        assert res.status_code == 200
        assert not discord.called


# ── 레포지토리 자동 등록 ─────────────────────────────────────────────────────

REPO_PAYLOAD = {
    "action": "created",
    "repository": {
        "name": "new-repo",
        "full_name": "bssm-oss/new-repo",
        "html_url": "https://github.com/bssm-oss/new-repo",
        "description": "새 레포",
    },
    "sender": {"login": "justn"},
}


class TestRepositoryWebhook:
    @pytest.mark.asyncio
    @respx.mock
    async def test_repo_created_makes_forum_thread(self, client):
        forum = respx.post(DISCORD_FORUM_THREADS_URL).mock(
            return_value=httpx.Response(200, json={"id": "new-thread"})
        )

        body = json.dumps(REPO_PAYLOAD)
        res = await client.post("/", content=body, headers=webhook_headers("repository", body))

        assert res.status_code == 200
        assert forum.called

    @pytest.mark.asyncio
    @respx.mock
    async def test_repo_created_mentions_mapped_member(self, client):
        forum = respx.post(DISCORD_FORUM_THREADS_URL).mock(
            return_value=httpx.Response(200, json={"id": "new-thread"})
        )

        body = json.dumps(REPO_PAYLOAD)
        await client.post("/", content=body, headers=webhook_headers("repository", body))

        sent = json.loads(forum.calls[0].request.content)
        # justn은 conftest의 MEMBER_MAP에서 111111111111111111로 매핑됨
        assert f"<@{MAINTAINER_ID}>" in sent["message"]["content"]

    @pytest.mark.asyncio
    @respx.mock
    async def test_repo_created_thread_name_is_repo_name(self, client):
        forum = respx.post(DISCORD_FORUM_THREADS_URL).mock(
            return_value=httpx.Response(200, json={"id": "new-thread"})
        )

        body = json.dumps(REPO_PAYLOAD)
        await client.post("/", content=body, headers=webhook_headers("repository", body))

        sent = json.loads(forum.calls[0].request.content)
        assert sent["name"] == "new-repo"

    @pytest.mark.asyncio
    @respx.mock
    async def test_non_created_action_ignored(self, client):
        forum = respx.post(DISCORD_FORUM_THREADS_URL).mock(
            return_value=httpx.Response(200, json={})
        )

        payload = {**REPO_PAYLOAD, "action": "deleted"}
        body = json.dumps(payload)
        res = await client.post("/", content=body, headers=webhook_headers("repository", body))

        assert res.status_code == 200
        assert not forum.called
