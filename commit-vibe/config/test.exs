import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :commit_vibe, CommitVibeWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "test-secret-key-base-at-least-64-bytes-long-for-phoenix-security-requirement-000",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Disable live_view encryption checks for testing
config :phoenix_live_view,
  enable_expensive_runtime_checks: true

# Use Tesla Mock adapter in tests
config :tesla, adapter: Tesla.Mock
