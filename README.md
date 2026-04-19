<h1 align="center">for-real</h1>
<p align="center"><strong>Prevent accidental deletion of GitHub repos and organizations.</strong></p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white" alt="Chrome Extension">
  <img src="https://img.shields.io/badge/Manifest-v3-green" alt="Manifest v3">
  <img src="https://img.shields.io/badge/License-MIT-blue" alt="License">
</p>

<p align="center">
  Because the author wiped an entire 9-member org while trying to delete a single test repo.
  <br>
  <a href="./WHY.md">이거 만든 이유 (ko)</a> · <a href="./README.ko.md">한국어 README</a>
</p>

<p align="center">
  <img src="./assets/rip.png" alt="rip justn-hyeok" width="720">
  <br>
  <em><strong>rip.</strong></em>
</p>

---

## What it does

For any repo or organization you register, clicking "Delete this repository" or "Delete this organization" won't go through. Instead:

1. You're redirected back to the project root
2. A `for real?` modal appears with a random 20-character code
3. Type the code manually — no paste — to unlock deletion for 5 minutes
4. Cancel and nothing happens

After 5 minutes, protection re-engages automatically.

## What it is NOT

- **Not an API guard.** `gh repo delete`, `curl`, or any non-browser deletion path is out of scope.
- **Not a backup tool.** Push your code somewhere before doing anything dangerous anyway.
- **Not a team permission system.** This runs locally in your browser. Each user installs their own.

---

## Install

Not on the Chrome Web Store (yet). Load it as an unpacked extension:

1. Clone this repo
   ```bash
   git clone https://github.com/justn-hyeok/for-real.git
   ```
2. Open `chrome://extensions` in Chrome/Brave/Edge
3. Turn on **Developer mode** (top right)
4. Click **Load unpacked** and select the `for-real` folder

---

## Usage

### Adding something to the protected list

**Option A — from the current page (recommended)**

1. Navigate to the GitHub repo or organization you want to protect
2. Click the for-real icon in your browser toolbar
3. The popup shows a **Current page** card with what it detected. Click **Add to protected list**
4. Done. The entry shows up in the list below with a `REPO` or `ORG` badge

**Option B — manually**

1. Click the for-real icon
2. In the text field at the bottom of the protected list, type one of:
   - `owner/repo` — protects a single repository (e.g. `justn-hyeok/dep-age`)
   - `owner` — protects an entire organization or user (e.g. `justn-hyeok`)
3. Press Enter or click **Add**

Entries sync across devices via your Chrome profile (`chrome.storage.sync`).

### Removing an entry

Hover over an entry in the list and click the **×** that appears on the right.

### What happens when you try to delete a protected item

1. You click GitHub's **Delete this repository** (or organization) button
2. for-real intercepts the click before GitHub's confirmation dialog can open, and redirects you to the project root page
3. A full-screen gate modal appears with a randomly generated 20-character code
4. You type the code into the input field — **paste is disabled**, you have to actually type it
5. Typing the full code correctly enables the **Unlock for 5 min** button
6. Click it, and deletion is unlocked for exactly 5 minutes. Go back to Settings and delete normally if you really mean to.
7. Click **Cancel** instead and nothing happens — you stay on the project root and no state changes

After 5 minutes the unlock expires automatically and the protection re-engages on the next page load.

### A typical scenario

You registered `justn-hyeok` (organization). Later, you navigate to
`github.com/organizations/justn-hyeok/settings/profile`, scroll to Danger Zone, and click **Delete this organization** by mistake because you thought you were on a repo settings page. for-real catches the click, bounces you to `github.com/justn-hyeok`, and shows the gate. You read the modal, realize what almost happened, and click Cancel. Crisis averted.

---

## How it works

- Delete button clicks are intercepted in the capture phase on `pointerdown`, `mousedown`, and `click`, stopping React's handler before it fires
- On intercept, `chrome.storage.local` stores a short-lived `pendingGate` flag and the page redirects to the project root
- On the root page, content script detects the flag and opens a native `<dialog>` via `showModal()`, which renders in the browser's top layer (above any page-level z-index)
- Unlock state is stored per-entry in `chrome.storage.local` with a 5-minute timestamp TTL
- Protected list syncs across your devices via `chrome.storage.sync`

---

## Limitations

- **Browser only.** API-based deletions bypass this entirely.
- **Per-device install.** Protection list syncs via Chrome profile sync, but the extension itself must be installed on each browser.
- **Not audited.** This was built after one person's panic. Trust it accordingly.

---

## License

MIT
