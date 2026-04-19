import pytest
import respx
import httpx
from unittest.mock import AsyncMock, patch

from src.utils.discord import COLORS

MAINTAINER_ID = "111111111111111111"
GITHUB_API = "https://api.github.com"
DISCORD_API = "https://discord.com/api/v10/channels"

ISSUE_PAYLOAD = {
    "action": "opened",
    "issue": {
        "title": "Bug: something broken",
        "html_url": "https://github.com/bssm-oss/dep-age/issues/1",
        "labels": [{"name": "bug"}],
    },
    "repository": {
        "name": "dep-age",
        "full_name": "bssm-oss/dep-age",
        "html_url": "https://github.com/bssm-oss/dep-age",
    },
    "sender": {
        "login": "justn",
        "avatar_url": "https://avatars.githubusercontent.com/u/1",
    },
}

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
    "sender": {
        "login": "justn",
        "avatar_url": "https://avatars.githubusercontent.com/u/1",
    },
}

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


def _mock_deps(is_member: bool = True):
    return (
        patch("src.handlers.issues.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
        patch("src.handlers.issues.is_org_member", AsyncMock(return_value=is_member)),
    )


# ── issues ────────────────────────────────────────────────────────────────────

class TestHandleIssue:
    @pytest.mark.asyncio
    async def test_member_gets_issue_open_color(self):
        sent = []
        with (
            patch("src.handlers.issues.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.issues.is_org_member", AsyncMock(return_value=True)),
            patch("src.handlers.issues.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.issues import handle_issue
            await handle_issue(ISSUE_PAYLOAD)

        embed = sent[0][2]["embeds"][0]
        assert embed["color"] == COLORS["ISSUE_OPEN"]

    @pytest.mark.asyncio
    async def test_external_contributor_gets_gold_color(self):
        sent = []
        with (
            patch("src.handlers.issues.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.issues.is_org_member", AsyncMock(return_value=False)),
            patch("src.handlers.issues.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.issues import handle_issue
            await handle_issue(ISSUE_PAYLOAD)

        embed = sent[0][2]["embeds"][0]
        assert embed["color"] == COLORS["EXTERNAL"]
        assert "⭐" in sent[0][2]["content"]

    @pytest.mark.asyncio
    async def test_ignored_action_does_not_send(self):
        with patch("src.handlers.issues.send", AsyncMock()) as mock_send:
            from src.handlers.issues import handle_issue
            await handle_issue({**ISSUE_PAYLOAD, "action": "labeled"})
        mock_send.assert_not_called()

    @pytest.mark.asyncio
    async def test_maintainer_mentioned(self):
        sent = []
        with (
            patch("src.handlers.issues.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.issues.is_org_member", AsyncMock(return_value=True)),
            patch("src.handlers.issues.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.issues import handle_issue
            await handle_issue(ISSUE_PAYLOAD)

        assert f"<@{MAINTAINER_ID}>" in sent[0][2]["content"]

    @pytest.mark.asyncio
    async def test_no_maintainer_no_mention(self):
        sent = []
        with (
            patch("src.handlers.issues.get_maintainer", AsyncMock(return_value=None)),
            patch("src.handlers.issues.is_org_member", AsyncMock(return_value=True)),
            patch("src.handlers.issues.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.issues import handle_issue
            await handle_issue(ISSUE_PAYLOAD)

        assert "<@" not in sent[0][2]["content"]


# ── pull_request ───────────────────────────────────────────────────────────────

class TestHandlePullRequest:
    @pytest.mark.asyncio
    async def test_pr_open_color(self):
        sent = []
        with (
            patch("src.handlers.pull_request.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.pull_request.is_org_member", AsyncMock(return_value=True)),
            patch("src.handlers.pull_request.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.pull_request import handle_pull_request
            await handle_pull_request(PR_PAYLOAD)

        assert sent[0][2]["embeds"][0]["color"] == COLORS["PR_OPEN"]

    @pytest.mark.asyncio
    async def test_merged_pr_gets_green(self):
        merged = {**PR_PAYLOAD, "action": "closed", "pull_request": {**PR_PAYLOAD["pull_request"], "merged": True}}
        sent = []
        with (
            patch("src.handlers.pull_request.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.pull_request.is_org_member", AsyncMock(return_value=True)),
            patch("src.handlers.pull_request.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.pull_request import handle_pull_request
            await handle_pull_request(merged)

        assert sent[0][2]["embeds"][0]["color"] == COLORS["PR_MERGE"]

    @pytest.mark.asyncio
    async def test_ignored_action_does_not_send(self):
        with patch("src.handlers.pull_request.send", AsyncMock()) as mock_send:
            from src.handlers.pull_request import handle_pull_request
            await handle_pull_request({**PR_PAYLOAD, "action": "labeled"})
        mock_send.assert_not_called()


# ── workflow ───────────────────────────────────────────────────────────────────

class TestHandleWorkflow:
    @pytest.mark.asyncio
    async def test_ci_failure_sends(self):
        sent = []
        with (
            patch("src.handlers.workflow.get_maintainer", AsyncMock(return_value=MAINTAINER_ID)),
            patch("src.handlers.workflow.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))),
        ):
            from src.handlers.workflow import handle_workflow
            await handle_workflow(WORKFLOW_PAYLOAD)

        assert sent[0][2]["embeds"][0]["color"] == COLORS["CI_FAIL"]

    @pytest.mark.asyncio
    async def test_ci_success_does_not_send(self):
        payload = {**WORKFLOW_PAYLOAD, "workflow_run": {**WORKFLOW_PAYLOAD["workflow_run"], "conclusion": "success"}}
        with patch("src.handlers.workflow.send", AsyncMock()) as mock_send:
            from src.handlers.workflow import handle_workflow
            await handle_workflow(payload)
        mock_send.assert_not_called()

    @pytest.mark.asyncio
    async def test_non_completed_action_ignored(self):
        with patch("src.handlers.workflow.send", AsyncMock()) as mock_send:
            from src.handlers.workflow import handle_workflow
            await handle_workflow({**WORKFLOW_PAYLOAD, "action": "requested"})
        mock_send.assert_not_called()


# ── release ────────────────────────────────────────────────────────────────────

class TestHandleRelease:
    @pytest.mark.asyncio
    async def test_published_sends(self):
        sent = []
        with patch("src.handlers.release.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))):
            from src.handlers.release import handle_release
            await handle_release(RELEASE_PAYLOAD)

        assert sent[0][2]["embeds"][0]["color"] == COLORS["RELEASE"]
        assert "v1.0.0" in sent[0][2]["embeds"][0]["title"]

    @pytest.mark.asyncio
    async def test_long_body_truncated(self):
        long_body = "x" * 400
        payload = {**RELEASE_PAYLOAD, "release": {**RELEASE_PAYLOAD["release"], "body": long_body}}
        sent = []
        with patch("src.handlers.release.send", AsyncMock(side_effect=lambda *a, **kw: sent.append(a))):
            from src.handlers.release import handle_release
            await handle_release(payload)

        desc = sent[0][2]["embeds"][0]["description"]
        assert len(desc) <= 303
        assert desc.endswith("...")

    @pytest.mark.asyncio
    async def test_non_published_ignored(self):
        with patch("src.handlers.release.send", AsyncMock()) as mock_send:
            from src.handlers.release import handle_release
            await handle_release({**RELEASE_PAYLOAD, "action": "created"})
        mock_send.assert_not_called()
