import os

# src.config.Settings()는 모듈 임포트 시 즉시 실행되므로
# 테스트용 env를 conftest 최상위에서 미리 설정한다.
_TEST_ENV = {
    "DISCORD_BOT_TOKEN": "token",
    "DISCORD_GUILD_ID": "x",
    "DISCORD_CHANNEL_ISSUES": "x",
    "DISCORD_CHANNEL_PR": "x",
    "DISCORD_CHANNEL_CI": "x",
    "DISCORD_CHANNEL_RELEASES": "x",
    "DISCORD_CHANNEL_SERVICES": "x",
    "GITHUB_WEBHOOK_SECRET": "x",
    "GITHUB_TOKEN": "x",
    "MEMBER_MAP": '{"justn":"111111111111111111"}',
}
for k, v in _TEST_ENV.items():
    os.environ.setdefault(k, v)
