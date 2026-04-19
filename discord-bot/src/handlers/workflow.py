from datetime import datetime, timezone
from typing import Any

from src.config import settings
from src.utils.discord import COLORS, mention, send
from src.utils.maintainers import get_maintainer


async def handle_workflow(payload: dict[str, Any]) -> None:
    if payload["action"] != "completed":
        return
    run = payload["workflow_run"]
    if run["conclusion"] != "failure":
        return

    repo = payload["repository"]
    maintainer_id = await get_maintainer(
        repo["name"], settings.discord_bot_token, settings.discord_channel_services, settings.discord_guild_id
    )

    content_parts = ["🔴 **CI failed**"]
    if maintainer_id:
        content_parts.append(mention(maintainer_id))

    await send(
        settings.discord_channel_ci,
        settings.discord_bot_token,
        {
            "content": " ".join(content_parts),
            "embeds": [
                {
                    "title": f"{run['name']} failed on {run['head_branch']}",
                    "url": run["html_url"],
                    "color": COLORS["CI_FAIL"],
                    "fields": [
                        {
                            "name": "Repository",
                            "value": f"[{repo['full_name']}]({repo['html_url']})",
                            "inline": True,
                        },
                        {"name": "Branch", "value": run["head_branch"], "inline": True},
                        {
                            "name": "Commit",
                            "value": f"`{run['head_sha'][:7]}`",
                            "inline": True,
                        },
                    ],
                    "footer": {"text": "bssm-oss CI"},
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                }
            ],
        },
    )
