from datetime import datetime, timezone
from typing import Any

from src.config import settings
from src.utils.discord import COLORS, send


async def handle_release(payload: dict[str, Any]) -> None:
    if payload["action"] != "published":
        return

    release = payload["release"]
    repo = payload["repository"]

    body: str | None = release.get("body")
    if body and len(body) > 300:
        body = body[:300] + "..."

    await send(
        settings.discord_channel_releases,
        settings.discord_bot_token,
        {
            "content": "🚀 **New release**",
            "embeds": [
                {
                    "title": f"{release.get('name') or release['tag_name']} released",
                    "url": release["html_url"],
                    "color": COLORS["RELEASE"],
                    "description": body,
                    "author": {
                        "name": repo["full_name"],
                        "url": repo["html_url"],
                    },
                    "fields": [
                        {"name": "Tag", "value": release["tag_name"], "inline": True},
                        {
                            "name": "Pre-release",
                            "value": "Yes" if release["prerelease"] else "No",
                            "inline": True,
                        },
                    ],
                    "footer": {"text": "bssm-oss"},
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                }
            ],
        },
    )
