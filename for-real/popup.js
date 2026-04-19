const listEl = document.getElementById("list");
const countEl = document.getElementById("count");
const currentSection = document.getElementById("current-section");
const currentNameEl = document.getElementById("current-name");
const addCurrentBtn = document.getElementById("add-current");
const manualInput = document.getElementById("manual-input");
const addManualBtn = document.getElementById("add-manual");
const autoDetectToggle = document.getElementById("auto-detect");

const GITHUB_RESERVED = new Set([
  "settings", "organizations", "marketplace", "explore", "topics",
  "collections", "trending", "new", "notifications", "pulls", "issues",
  "codespaces", "sponsors", "orgs", "features", "pricing", "enterprise",
  "login", "logout", "join", "dashboard", "stars", "watching",
]);

function parseGithubUrl(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return null;

    if (parts[0] === "organizations" && parts[1]) {
      return { type: "org", name: parts[1] };
    }
    if (GITHUB_RESERVED.has(parts[0])) return null;

    if (parts.length >= 2) {
      return { type: "repo", name: `${parts[0]}/${parts[1]}` };
    }
    return { type: "org", name: parts[0] };
  } catch {
    return null;
  }
}

async function loadState() {
  const { protected: list = [], autoDetect = true } = await chrome.storage.sync.get([
    "protected",
    "autoDetect",
  ]);
  return { list, autoDetect };
}

async function saveList(list) {
  await chrome.storage.sync.set({ protected: list });
}

function renderList(list) {
  listEl.innerHTML = "";
  countEl.textContent = list.length;
  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "Nothing protected yet";
    listEl.appendChild(li);
    return;
  }
  list.forEach((entry, idx) => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    const badge = document.createElement("span");
    badge.className = `type-badge ${entry.type}`;
    badge.textContent = entry.type;
    left.appendChild(badge);
    left.append(entry.name);

    const btn = document.createElement("button");
    btn.className = "remove";
    btn.textContent = "×";
    btn.title = "Remove";
    btn.addEventListener("click", async () => {
      const next = list.filter((_, i) => i !== idx);
      await saveList(next);
      renderList(next);
    });

    li.appendChild(left);
    li.appendChild(btn);
    listEl.appendChild(li);
  });
}

function addEntry(list, entry) {
  if (!entry.name) return list;
  const exists = list.some((e) => e.type === entry.type && e.name === entry.name);
  if (exists) return list;
  return [...list, entry];
}

async function init() {
  const { list, autoDetect } = await loadState();
  renderList(list);
  autoDetectToggle.checked = autoDetect;

  autoDetectToggle.addEventListener("change", async () => {
    await chrome.storage.sync.set({ autoDetect: autoDetectToggle.checked });
  });

  addManualBtn.addEventListener("click", async () => {
    const raw = manualInput.value.trim();
    if (!raw) return;
    const type = raw.includes("/") ? "repo" : "org";
    const current = (await loadState()).list;
    const next = addEntry(current, { type, name: raw });
    await saveList(next);
    renderList(next);
    manualInput.value = "";
  });

  manualInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addManualBtn.click();
  });

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const ctx = tab?.url ? parseGithubUrl(tab.url) : null;
  if (ctx) {
    currentSection.classList.remove("hidden");
    currentNameEl.textContent = `${ctx.type}: ${ctx.name}`;
    addCurrentBtn.addEventListener("click", async () => {
      const current = (await loadState()).list;
      const next = addEntry(current, ctx);
      await saveList(next);
      renderList(next);
      addCurrentBtn.textContent = "Added ✓";
      addCurrentBtn.disabled = true;
    });
  }
}

init();
