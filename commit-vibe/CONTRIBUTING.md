# Contributing

## Setup

```bash
git clone https://github.com/bssm-oss/commit-vibe
cd commit-vibe
mix setup
mix phx.server   # → http://localhost:4000
```

Optional: set `GITHUB_TOKEN` to avoid the 60 req/hr unauthenticated rate limit.

## Before submitting a PR

```bash
mix precommit   # compile --warnings-as-errors + format + test
```

All three must pass.

## What's welcome

- Bug fixes
- New emotion keywords (especially non-English languages)
- UI improvements
- Performance improvements for large repos

## What to discuss first

Open an issue before starting work on new features or significant refactors — to avoid duplicate effort.
