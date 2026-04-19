from typing import Any
import httpx

COLORS = {
    "ISSUE_OPEN": 0xF0B429,
    "ISSUE_CLOSE": 0x6B7280,
    "PR_OPEN": 0x3B82F6,
    "PR_MERGE": 0x10B981,
    "PR_CLOSE": 0x6B7280,
    "CI_FAIL": 0xEF4444,
    "CI_PASS": 0x10B981,
    "RELEASE": 0x8B5CF6,
    "EXTERNAL": 0xF59E0B,
}


def mention(discord_id: str) -> str:
    return f"<@{discord_id}>"


async def send(channel_id: str, token: str, message: dict[str, Any]) -> None:
    async with httpx.AsyncClient() as client:
        res = await client.post(
            f"https://discord.com/api/v10/channels/{channel_id}/messages",
            headers={"Authorization": f"Bot {token}"},
            json=message,
        )
    if not res.is_success:
        print(f"[discord] error {res.status_code}: {res.text}")
