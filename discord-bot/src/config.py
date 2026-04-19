from pydantic import Json
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    discord_bot_token: str
    discord_channel_issues: str
    discord_channel_pr: str
    discord_channel_ci: str
    discord_channel_releases: str
    discord_channel_services: str  # 서비스등록 포럼 채널 ID
    discord_guild_id: str
    github_webhook_secret: str
    github_token: str
    github_org: str = "bssm-oss"
    member_map: Json[dict[str, str]] = {}  # {"github_username": "discord_id"}

    model_config = {"env_file": ".env"}


settings = Settings()
