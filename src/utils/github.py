import httpx

HEADERS = {"User-Agent": "bssm-oss-discord-bot"}


async def is_org_member(username: str, org: str, token: str) -> bool:
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"https://api.github.com/orgs/{org}/members/{username}",
            headers={**HEADERS, "Authorization": f"Bearer {token}"},
        )
    return res.is_success
