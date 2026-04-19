import pytest
import respx
import httpx

import src.utils.maintainers as m_module
from src.utils.maintainers import get_maintainer

BOT_TOKEN = "token"
CHANNEL_ID = "chan-123"
GUILD_ID = "guild-456"

ACTIVE_URL = f"https://discord.com/api/v10/guilds/{GUILD_ID}/threads/active"
ARCHIVED_URL = f"https://discord.com/api/v10/channels/{CHANNEL_ID}/threads/archived/public?limit=100"
MSG_T1 = f"https://discord.com/api/v10/channels/t1/messages/t1"
MSG_T2 = f"https://discord.com/api/v10/channels/t2/messages/t2"

THREADS = [
    {"id": "t1", "name": "dep-age", "owner_id": "bot", "parent_id": CHANNEL_ID},
    {"id": "t2", "name": "CodeAgora", "owner_id": "bot", "parent_id": CHANNEL_ID},
]


@pytest.fixture(autouse=True)
def reset_cache():
    m_module._cache = {}
    m_module._cache_time = 0
    yield


@pytest.mark.asyncio
@respx.mock
async def test_known_repo_from_active_threads():
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": THREADS}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "<@111111111111111111>"}))
    respx.get(MSG_T2).mock(return_value=httpx.Response(200, json={"content": "<@222222222222222222>"}))

    result = await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result == "111111111111111111"


@pytest.mark.asyncio
@respx.mock
async def test_known_repo_from_archived_threads():
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": THREADS}))
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "<@111111111111111111>"}))
    respx.get(MSG_T2).mock(return_value=httpx.Response(200, json={"content": "<@222222222222222222>"}))

    result = await get_maintainer("CodeAgora", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result == "222222222222222222"


@pytest.mark.asyncio
@respx.mock
async def test_unknown_repo_returns_none():
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": THREADS}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "<@111111111111111111>"}))
    respx.get(MSG_T2).mock(return_value=httpx.Response(200, json={"content": "<@222222222222222222>"}))

    result = await get_maintainer("unknown-repo", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result is None


@pytest.mark.asyncio
@respx.mock
async def test_api_failure_returns_none():
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(403))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(403))

    result = await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result is None


@pytest.mark.asyncio
@respx.mock
async def test_filters_threads_from_other_channels():
    other_threads = [
        {"id": "t9", "name": "dep-age", "owner_id": "bot", "parent_id": "other-channel"},
    ]
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": other_threads}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": []}))

    result = await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result is None


@pytest.mark.asyncio
@respx.mock
async def test_no_mention_in_message_returns_none():
    threads = [{"id": "t1", "name": "dep-age", "owner_id": "bot", "parent_id": CHANNEL_ID}]
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": threads}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "설명만 있고 멘션 없음"}))

    result = await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert result is None


@pytest.mark.asyncio
@respx.mock
async def test_cache_prevents_second_fetch():
    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": THREADS}))
    respx.get(ARCHIVED_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "<@111111111111111111>"}))
    respx.get(MSG_T2).mock(return_value=httpx.Response(200, json={"content": "<@222222222222222222>"}))

    await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    await get_maintainer("CodeAgora", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    # active + archived + msg*2 = 4번, 두 번째 호출은 캐시
    assert respx.calls.call_count == 4


@pytest.mark.asyncio
@respx.mock
async def test_archived_pagination():
    """has_more=True면 다음 페이지를 계속 요청해야 한다."""
    page1_thread = {
        "id": "t1",
        "name": "dep-age",
        "owner_id": "bot",
        "parent_id": CHANNEL_ID,
        "thread_metadata": {"archive_timestamp": "2024-01-02T00:00:00Z"},
    }
    page2_thread = {
        "id": "t2",
        "name": "CodeAgora",
        "owner_id": "bot",
        "parent_id": CHANNEL_ID,
        "thread_metadata": {"archive_timestamp": "2024-01-01T00:00:00Z"},
    }

    respx.get(ACTIVE_URL).mock(return_value=httpx.Response(200, json={"threads": []}))
    respx.get(ARCHIVED_URL).mock(
        return_value=httpx.Response(200, json={"threads": [page1_thread], "has_more": True})
    )
    respx.get(
        f"https://discord.com/api/v10/channels/{CHANNEL_ID}/threads/archived/public?limit=100&before=2024-01-02T00:00:00Z"
    ).mock(
        return_value=httpx.Response(200, json={"threads": [page2_thread], "has_more": False})
    )
    respx.get(MSG_T1).mock(return_value=httpx.Response(200, json={"content": "<@111111111111111111>"}))
    respx.get(MSG_T2).mock(return_value=httpx.Response(200, json={"content": "<@222222222222222222>"}))

    r1 = await get_maintainer("dep-age", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert r1 == "111111111111111111"

    m_module._cache = {}
    m_module._cache_time = 0

    r2 = await get_maintainer("CodeAgora", BOT_TOKEN, CHANNEL_ID, GUILD_ID)
    assert r2 == "222222222222222222"
