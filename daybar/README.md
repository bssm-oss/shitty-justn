<div align="center">

# daybar

**D-day countdown tracker for your macOS menu bar** 🎓

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Release](https://img.shields.io/github/v/release/justn-hyeok/daybar)](https://github.com/justn-hyeok/daybar/releases)

[:kr: 한국어](./README.ko.md)

</div>

## What is this?

Got an exam, deadline, or trip coming up? **daybar** lives in your macOS menu bar and always shows the nearest D-day. No window to open, no app to click through — just a glance at the menu bar.

```
🎓 D-42      ← always visible in menu bar (nearest D-day)
```

Click the menu bar icon to see all D-days, add new ones, or edit existing entries.

```
┌──────────────────────┐
│  🎓 Exam      D-42   │
│  🎂 Birthday  D-104  │
│  ✈️ Trip      D+3    │
├──────────────────────┤
│  + Add               │
│  Settings            │
│  Quit                │
└──────────────────────┘
```

## Quick Start

### Homebrew

```bash
brew install --cask justn-hyeok/tap/daybar
```

### Manual

Download the latest `.dmg` from the [Releases](https://github.com/justn-hyeok/daybar/releases) page and drag `daybar.app` to `/Applications`.

### CLI

After installing, launch daybar from the terminal:

```bash
daybar
```

## Gatekeeper Warning on First Launch

daybar is not notarized by Apple, so macOS may block it on first launch.

**Option 1 — System Settings**

> System Settings → Privacy & Security → "Unidentified Developer" section → **Open Anyway**

**Option 2 — Terminal**

```bash
xattr -cr /Applications/daybar.app
```

## Usage

| Action | Description |
|--------|-------------|
| Click menu bar icon | Open D-day list dropdown |
| **+ Add** | Create new D-day (name / date / emoji) |
| Click item | Edit or delete |
| **Select & Delete** | Bulk delete multiple D-days |
| **Settings (⌘,)** | Launch at login, language, version info |

The nearest D-day is automatically displayed in the menu bar. Up to 50 D-days supported.

### D-day Display

| State | Format |
|-------|--------|
| Before the date | `🎓 D-42` |
| On the date | `🎂 D-Day` |
| After the date | `✅ D+7` |

## Features

- **Always visible** — Nearest D-day shown directly in the menu bar
- **Emoji per entry** — Pick any emoji to categorize your D-days
- **Automatic sorting** — Nearest date is always prioritized
- **Instant add/edit** — Native SwiftUI forms for quick entry
- **Persistent** — Saved to UserDefaults, survives restarts
- **Launch at login** — Optional setting via macOS login items
- **Localized** — English (default) and Korean
- **Tiny footprint** — 384 KB app bundle, 110 KB DMG

## Localization

daybar supports **English** (default) and **Korean**.

Change the language in **Settings → Language**. The entire UI updates instantly and the setting persists across restarts.

## Requirements

- macOS 13 Ventura or later

## Tech Stack

- Swift 5.9+
- AppKit (`NSStatusItem`, `NSMenu`, `NSPopover`) for menu bar integration
- SwiftUI for add/edit popovers
- UserDefaults for persistence

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/awesome`)
3. Commit your changes (`git commit -m 'feat: add awesome feature'`)
4. Push to your branch (`git push origin feat/awesome`)
5. Open a Pull Request

## License

[MIT](LICENSE)
