import pytest
import respx
import httpx

from src.utils.github import is_org_member

ORG = "bssm-oss"
TOKEN = "token"


@pytest.mark.asyncio
@respx.mock
async def test_member_returns_true():
    respx.get(f"https://api.github.com/orgs/{ORG}/members/justn").mock(
        return_value=httpx.Response(204)
    )
    assert await is_org_member("justn", ORG, TOKEN) is True


@pytest.mark.asyncio
@respx.mock
async def test_non_member_returns_false():
    respx.get(f"https://api.github.com/orgs/{ORG}/members/outsider").mock(
        return_value=httpx.Response(404)
    )
    assert await is_org_member("outsider", ORG, TOKEN) is False
