(function () {
  const DELETE_KEYWORDS = [
    "delete this repository",
    "delete this fork",
    "delete this organization",
    "delete forever",
  ];

  const GH_RESERVED = new Set([
    "settings", "organizations", "marketplace", "explore", "topics",
    "collections", "trending", "new", "notifications", "pulls", "issues",
    "codespaces", "sponsors", "orgs", "features", "pricing", "enterprise",
    "login", "logout", "join", "dashboard",
  ]);

  const UNLOCK_TTL_MS = 5 * 60 * 1000;
  const PENDING_TTL_MS = 10 * 1000;

  let currentCtx = null;
  let shouldBlock = false;

  function parseContext(pathname) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return null;
    if (parts[0] === "organizations" && parts[1]) {
      return { type: "org", owner: parts[1] };
    }
    if (GH_RESERVED.has(parts[0])) return null;
    if (parts.length >= 2) {
      return {
        type: "repo",
        owner: parts[0],
        repo: parts[1],
        full_name: `${parts[0]}/${parts[1]}`,
      };
    }
    return { type: "org", owner: parts[0] };
  }

  function checkProtected(list, ctx) {
    if (!ctx) return false;
    return list.some((e) => {
      if (e.type === "repo" && ctx.type === "repo") {
        return e.name.toLowerCase() === ctx.full_name.toLowerCase();
      }
      if (e.type === "org") {
        return e.name.toLowerCase() === ctx.owner.toLowerCase();
      }
      return false;
    });
  }

  function unlockKey(ctx) {
    return ctx.type === "repo"
      ? `unlock:repo:${ctx.full_name.toLowerCase()}`
      : `unlock:org:${ctx.owner.toLowerCase()}`;
  }

  function baseUrlFor(ctx) {
    return ctx.type === "repo"
      ? `https://github.com/${ctx.full_name}`
      : `https://github.com/${ctx.owner}`;
  }

  async function refresh() {
    try {
      const { protected: list = [] } = await chrome.storage.sync.get(["protected"]);
      currentCtx = parseContext(location.pathname);
      const prot = checkProtected(list, currentCtx);
      if (prot && currentCtx) {
        const key = unlockKey(currentCtx);
        const res = await chrome.storage.local.get(key);
        const expires = res[key] || 0;
        shouldBlock = Date.now() >= expires;
      } else {
        shouldBlock = false;
      }
      console.log("[for-real] refresh", { ctx: currentCtx, shouldBlock });
    } catch (err) {
      console.error("[for-real] refresh error", err);
    }
  }

  function hasDeleteKeyword(text) {
    if (!text) return false;
    const t = text.trim().toLowerCase();
    return DELETE_KEYWORDS.some((k) => t.includes(k));
  }

  function textOf(el) {
    if (!el) return "";
    const parts = [
      el.value,
      el.innerText,
      el.textContent,
      el.getAttribute?.("aria-label"),
      el.getAttribute?.("title"),
    ];
    return parts.filter(Boolean).join(" ");
  }

  async function handleInteraction(e) {
    if (!shouldBlock || !currentCtx) return;
    const el = e.target.closest?.('button, a, summary, [role="button"], input[type="submit"]');
    if (!el) return;
    if (!hasDeleteKeyword(textOf(el))) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    console.log("[for-real] intercepted", e.type);

    try {
      await chrome.storage.local.set({
        pendingGate: { ctx: currentCtx, ts: Date.now() },
      });
    } catch (err) {
      console.error("[for-real] session set error", err);
    }
    location.replace(baseUrlFor(currentCtx));
  }

  async function checkPendingGate() {
    try {
      const { pendingGate } = await chrome.storage.local.get("pendingGate");
      if (!pendingGate) return;
      if (Date.now() - pendingGate.ts > PENDING_TTL_MS) {
        await chrome.storage.local.remove("pendingGate");
        return;
      }
      await chrome.storage.local.remove("pendingGate");

      const show = () => {
        openGate(
          pendingGate.ctx,
          async () => {
            const key = unlockKey(pendingGate.ctx);
            await chrome.storage.local.set({
              [key]: Date.now() + UNLOCK_TTL_MS,
            });
            shouldBlock = false;
            console.log("[for-real] unlocked for 5 min");
          },
          () => {}
        );
      };

      if (document.body) {
        show();
      } else {
        document.addEventListener("DOMContentLoaded", show, { once: true });
      }
    } catch (err) {
      console.error("[for-real] checkPendingGate", err);
    }
  }

  function generateCode(len = 20) {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < len; i++) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[c]);
  }

  function openGate(ctx, onPass, onCancel) {
    if (document.getElementById("for-real-modal")) return;
    const code = generateCode(20);
    const label = ctx?.type === "repo" ? ctx.full_name : ctx?.owner || "protected";
    const kind = ctx?.type === "repo" ? "repository" : "organization";

    const dialog = document.createElement("dialog");
    dialog.id = "for-real-modal";
    dialog.innerHTML = `
      <div class="for-real-header">
        <div class="for-real-icon">⚠️</div>
        <div>
          <h2>for real?</h2>
          <p>You're about to delete a protected ${kind}.</p>
        </div>
      </div>
      <div class="for-real-target">${escapeHtml(label)}</div>
      <p class="for-real-instructions">
        Type the code below to confirm.<br>
        Passing this gate unlocks deletion for <strong>5 minutes</strong>.
      </p>
      <div class="for-real-code">${code}</div>
      <input type="text" id="for-real-input" autocomplete="off" spellcheck="false" placeholder="Type the code">
      <div class="for-real-actions">
        <button id="for-real-cancel" class="for-real-btn">Cancel</button>
        <button id="for-real-confirm" class="for-real-btn danger" disabled>Unlock for 5 min</button>
      </div>
    `;
    (document.body || document.documentElement).appendChild(dialog);

    dialog.addEventListener("cancel", (e) => e.preventDefault());

    const input = dialog.querySelector("#for-real-input");
    const confirmBtn = dialog.querySelector("#for-real-confirm");
    const cancelBtn = dialog.querySelector("#for-real-cancel");

    input.addEventListener("paste", (e) => {
      e.preventDefault();
      input.classList.add("for-real-shake");
      setTimeout(() => input.classList.remove("for-real-shake"), 400);
    });
    input.addEventListener("drop", (e) => e.preventDefault());
    input.addEventListener("input", () => {
      confirmBtn.disabled = input.value !== code;
    });

    confirmBtn.addEventListener("click", () => {
      if (input.value === code) {
        dialog.close();
        dialog.remove();
        onPass?.();
      }
    });
    cancelBtn.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
      onCancel?.();
    });

    try {
      dialog.showModal();
    } catch {
      dialog.setAttribute("open", "");
    }
    setTimeout(() => input.focus(), 50);
  }

  // --- 리스너 등록 ---

  console.log("[for-real] content script loaded at", location.href);

  document.addEventListener("pointerdown", handleInteraction, true);
  document.addEventListener("mousedown", handleInteraction, true);
  document.addEventListener("click", handleInteraction, true);

  refresh().then(checkPendingGate);

  document.addEventListener("turbo:load", () => {
    refresh().then(checkPendingGate);
  });
  document.addEventListener("turbo:render", refresh);
  window.addEventListener("popstate", refresh);

  let lastUrl = location.href;
  const urlObserver = new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      refresh().then(checkPendingGate);
    }
  });
  const startUrlObserver = () => {
    if (document.documentElement) {
      urlObserver.observe(document.documentElement, { subtree: true, childList: true });
    }
  };
  if (document.documentElement) {
    startUrlObserver();
  } else {
    document.addEventListener("DOMContentLoaded", startUrlObserver, { once: true });
  }

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.protected) refresh();
  });
})();
