---
sidebar_position: 1
---

# Plugin state persistence

Plugins can persist state across sessions using browser storage APIs available inside the plugin iframe.

## localStorage

The most common approach — data survives browser restarts and is scoped to the origin of the plugin page.

```javascript
// Save
localStorage.setItem("myPlugin_setting", JSON.stringify({ theme: "dark" }));

// Load
const raw = localStorage.getItem("myPlugin_setting");
const settings = raw ? JSON.parse(raw) : {};
```

**Limitation:** `localStorage` is shared across all tabs with the same origin. Namespace your keys (e.g., `myPlugin_`) to avoid collisions.

## sessionStorage

Scoped to a single browser tab/session. Use when you only need state for the current editing session.

```javascript
sessionStorage.setItem("myPlugin_draft", content);
```

## Storing per-document state

To associate state with a specific document, use the document ID as part of the key:

```javascript
const docKey = window.Asc.plugin.docInfo?.doc?.key ?? "default";
localStorage.setItem(`myPlugin_${docKey}_data`, JSON.stringify(data));
```

## Limits

| Storage | Typical limit | Persists across sessions |
|---------|--------------|--------------------------|
| localStorage | ~5 MB | Yes |
| sessionStorage | ~5 MB | No |

For larger data, use an external backend and store only a reference (e.g., a token or ID) locally.

## See also

- [User preferences](user-preferences.md)
- [Cross-session data](cross-session-data.md)
