---
sidebar_position: 3
---

# Cross-session data

When plugin data must survive beyond `localStorage` (e.g., synced across devices or users), use a server-side store.

## Architecture

```
Plugin UI  ──fetch──▶  Your backend API  ──▶  Database
                      (auth, storage, sync)
```

The plugin authenticates using a token stored locally (see [Authentication patterns](../external-api-integration/authentication-patterns.md)), then reads and writes data through your API.

## Minimal backend example

```javascript
// Plugin: save data
async function syncToServer(data) {
  const token = localStorage.getItem("myPlugin_token");
  await fetch("https://myapi.example.com/plugin-data", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Plugin: load data
async function loadFromServer() {
  const token = localStorage.getItem("myPlugin_token");
  const res = await fetch("https://myapi.example.com/plugin-data", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
```

## Conflict resolution

When multiple users or devices can update the same data, implement a last-write-wins strategy or use optimistic locking with version numbers.

## See also

- [Plugin state persistence](plugin-state-persistence.md)
- [Authentication patterns](../external-api-integration/authentication-patterns.md)
