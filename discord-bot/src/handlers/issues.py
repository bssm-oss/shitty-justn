import asyncio
from datetime import datetime, timezone
from typing import Any

from src.config import settings
from src.utils.discord import COLORS, mention, send
from src.utils.github import is_org_member
from src.utils.maintainers import get_maintainer

HANDLED_ACTIONS = {"opened", "closed", "reopened"}


async def handle_issue(payload: dict[str, Any]) -> None:
    action = payload["action"]
    if action not in HANDLED_ACTIONS:
        return

    issue = payload["issue"]
    repo = payload["repository"]
    sender = payload["sender"]

    maintainer_id, is_member = await asyncio.gather(
        get_maintainer(repo["name"], settings.discord_bot_token, settings.discord_channel_services, settings.discord_guild_id),
        is_org_member(sender["login"], settings.github_org, settings.github_token),
    )
    is_external = not is_member

    color = (
        COLORS["EXTERNAL"]
        if is_external
        else COLORS["ISSUE_CLOSE"] if action == "closed" else COLORS["ISSUE_OPEN"]
    )
    action_label = {
        "opened": "Issue opened",
        "closed": "Issue closed",
        "reopened": "Issue reopened",
    }[action]

    labels = " ".join(f"`{l['name']}`" for l in issue.get("labels", [])) or "none"

    content_parts = []
    if is_external:
        content_parts.append("⭐ **외부 기여자**")
    content_parts.append(f"**{action_label}**")
    if maintainer_id:
        content_parts.append(mention(maintainer_id))

    await send(
        settings.discord_channel_issues,
        settings.discord_bot_token,
        {
            "content": " ".join(content_parts),
            "embeds": [
                {
                    "title": issue["title"],
                    "url": issue["html_url"],
                    "color": color,
                    "author": {
                        "name": sender["login"],
                        "url": f"https://github.com/{sender['login']}",
                        "icon_url": sender["avatar_url"],
                    },
                    "fields": [
                        {
                            "name": "Repository",
                            "value": f"[{repo['full_name']}]({repo['html_url']})",
                            "inline": True,
                        },
                        {"name": "Labels", "value": labels, "inline": True},
                    ],
                    "footer": {
                        "text": "⭐ External contributor" if is_external else "bssm-oss"
                    },
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                }
            ],
        },
    )
