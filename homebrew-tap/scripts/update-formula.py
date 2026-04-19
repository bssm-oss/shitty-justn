#!/usr/bin/env python3
"""Update a Homebrew formula's version, URLs, and sha256 hashes.

Usage:
    python3 update-formula.py <formula.rb> <tag> [asset=sha256 ...]

Example:
    python3 update-formula.py dep-age.rb dep-age-v0.2.0 \
        dep-age-x86_64-apple-darwin.tar.gz=abc123 \
        dep-age-aarch64-apple-darwin.tar.gz=def456
"""
import re
import sys


def update_formula(path: str, tag: str, sha_map: dict[str, str]) -> None:
    # Extract version from tag (e.g. "cli-speedrun-v0.1.2" -> "0.1.2")
    version = tag.split("-v")[-1]

    with open(path) as f:
        content = f.read()

    # Update version field
    content = re.sub(r'version "\S+"', f'version "{version}"', content)

    # Update tag in release download URLs (matches any tag format)
    content = re.sub(
        r'(releases/download/)[^/]+(/)',
        lambda m: f'{m.group(1)}{tag}{m.group(2)}',
        content,
    )

    # Update sha256 values: match url + immediately following sha256
    def replace_sha(m: re.Match) -> str:
        url = m.group(1)
        asset = url.split("/")[-1]
        new_sha = sha_map.get(asset, m.group(2))
        return f'url "{url}"\n      sha256 "{new_sha}"'

    content = re.sub(
        r'url "([^"]+)"\s+sha256 "([^"]+)"',
        replace_sha,
        content,
    )

    with open(path, "w") as f:
        f.write(content)

    print(f"Updated {path} to {tag}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)

    formula_path = sys.argv[1]
    tag = sys.argv[2]
    sha_pairs = sys.argv[3:]

    sha_map = {}
    for pair in sha_pairs:
        asset, sha = pair.split("=", 1)
        sha_map[asset] = sha

    update_formula(formula_path, tag, sha_map)
