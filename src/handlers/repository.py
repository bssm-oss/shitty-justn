from typing import Any

import httpx

from src.config import settings

DISCORD_API = "https://discord.com/api/v10"


async def handle_repository(payload: dict[str, Any]) -> None:
    if payload["action"] != "created":
        return

    repo = payload["repository"]
    sender = payload["sender"]

    discord_id = settings.member_map.get(sender["login"])
    mention = f"<@{discord_id}>" if discord_id else sender["login"]

    async with httpx.AsyncClient() as client:
        await client.post(
            f"{DISCORD_API}/channels/{settings.discord_channel_services}/threads",
            headers={"Authorization": f"Bot {settings.discord_bot_token}"},
            json={
                "name": repo["name"],
                "message": {
                    "content": mention,
                    "embeds": [
                        {
                            "title": repo["full_name"],
                            "url": repo["html_url"],
                            "description": repo.get("description") or "",
                            "color": 0x5865F2,
                        }
                    ],
                },
            },
        )
