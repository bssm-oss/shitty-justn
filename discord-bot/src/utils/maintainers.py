import asyncio
import re
import time

import httpx

_cache: dict[str, str] = {}
_cache_time: float = 0
CACHE_TTL = 300  # 5 minutes

DISCORD_API = "https://discord.com/api/v10"
_MENTION_RE = re.compile(r"<@(\d+)>")


async def _fetch_threads(bot_token: str, channel_id: str, guild_id: str) -> list[dict]:
    headers = {
        "Authorization": f"Bot {bot_token}",
        "User-Agent": "bssm-oss-discord-bot",
    }

    async with httpx.AsyncClient() as client:
        # 활성 스레드 + 첫 아카이브 페이지 병렬 요청
        active_res, archived_res = await asyncio.gather(
            client.get(f"{DISCORD_API}/guilds/{guild_id}/threads/active", headers=headers),
            client.get(f"{DISCORD_API}/channels/{channel_id}/threads/archived/public?limit=100", headers=headers),
        )

        threads: list[dict] = []

        if active_res.is_success:
            threads += [t for t in active_res.json().get("threads", []) if t.get("parent_id") == channel_id]

        # 아카이브된 스레드 (첫 페이지 처리 + 추가 pagination)
        if archived_res.is_success:
            data = archived_res.json()
            batch: list[dict] = data.get("threads", [])
            threads += batch

            while data.get("has_more") and batch:
                before = batch[-1]["thread_metadata"]["archive_timestamp"]
                res = await client.get(
                    f"{DISCORD_API}/channels/{channel_id}/threads/archived/public?limit=100&before={before}",
                    headers=headers,
                )
                if not res.is_success:
                    break
                data = res.json()
                batch = data.get("threads", [])
                threads += batch

    return threads


async def _fetch_maintainer_id(client: httpx.AsyncClient, thread: dict, headers: dict) -> str | None:
    """스레드 첫 메시지(ID == 스레드 ID)에서 Discord ID 추출."""
    res = await client.get(
        f"{DISCORD_API}/channels/{thread['id']}/messages/{thread['id']}",
        headers=headers,
    )
    if not res.is_success:
        return None
    m = _MENTION_RE.search(res.json().get("content", ""))
    return m.group(1) if m else None


async def _build_cache(bot_token: str, channel_id: str, guild_id: str) -> dict[str, str]:
    threads = await _fetch_threads(bot_token, channel_id, guild_id)
    if not threads:
        return {}

    headers = {
        "Authorization": f"Bot {bot_token}",
        "User-Agent": "bssm-oss-discord-bot",
    }
    async with httpx.AsyncClient() as client:
        discord_ids = await asyncio.gather(
            *[_fetch_maintainer_id(client, t, headers) for t in threads]
        )

    return {
        t["name"].strip(): discord_id
        for t, discord_id in zip(threads, discord_ids)
        if discord_id
    }


async def get_maintainer(
    repo: str,
    bot_token: str,
    channel_id: str,
    guild_id: str,
) -> str | None:
    global _cache, _cache_time

    if not _cache or time.time() - _cache_time > CACHE_TTL:
        _cache = await _build_cache(bot_token, channel_id, guild_id)
        _cache_time = time.time()

    return _cache.get(repo)
