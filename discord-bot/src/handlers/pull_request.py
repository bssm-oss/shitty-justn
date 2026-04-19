import asyncio
from datetime import datetime, timezone
from typing import Any

from src.config import settings
from src.utils.discord import COLORS, mention, send
from src.utils.github import is_org_member
from src.utils.maintainers import get_maintainer

HANDLED_ACTIONS = {"opened", "closed", "review_requested"}


async def handle_pull_request(payload: dict[str, Any]) -> None:
    action = payload["action"]
    if action not in HANDLED_ACTIONS:
        return

    pr = payload["pull_request"]
    repo = payload["repository"]
    sender = payload["sender"]

    is_merge = action == "closed" and pr.get("merged")
    is_close = action == "closed" and not pr.get("merged")

    maintainer_id, member = await asyncio.gather(
        get_maintainer(repo["name"], settings.discord_bot_token, settings.discord_channel_services, settings.discord_guild_id),
        is_org_member(sender["login"], settings.github_org, settings.github_token),
    )
    is_external = not member

    color = (
        COLORS["EXTERNAL"]
        if is_external
        else COLORS["PR_MERGE"]
        if is_merge
        else COLORS["PR_CLOSE"]
        if is_close
        else COLORS["PR_OPEN"]
    )
    action_label = (
        "PR merged"
        if is_merge
        else "PR closed"
        if is_close
        else "Review requested"
        if action == "review_requested"
        else "PR opened"
    )

    labels = " ".join(f"`{l['name']}`" for l in pr.get("labels", [])) or "none"
    reviewers = ", ".join(r["login"] for r in pr.get("requested_reviewers", []))

    fields: list[dict[str, Any]] = [
        {
            "name": "Repository",
            "value": f"[{repo['full_name']}]({repo['html_url']})",
            "inline": True,
        },
        {"name": "Labels", "value": labels, "inline": True},
    ]
    if reviewers:
        fields.append({"name": "Reviewers", "value": reviewers, "inline": False})

    content_parts = []
    if is_external:
        content_parts.append("⭐ **외부 기여자**")
    content_parts.append(f"**{action_label}**")
    if maintainer_id:
        content_parts.append(mention(maintainer_id))

    await send(
        settings.discord_channel_pr,
        settings.discord_bot_token,
        {
            "content": " ".join(content_parts),
            "embeds": [
                {
                    "title": pr["title"],
                    "url": pr["html_url"],
                    "color": color,
                    "author": {
                        "name": sender["login"],
                        "url": f"https://github.com/{sender['login']}",
                        "icon_url": sender["avatar_url"],
                    },
                    "fields": fields,
                    "footer": {
                        "text": "⭐ External contributor" if is_external else "bssm-oss"
                    },
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                }
            ],
        },
    )
