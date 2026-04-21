---
sidebar_position: 2
---

# Authentication patterns

Plugins often need to authenticate with external services. Because plugins run client-side inside an iframe, credentials must be handled carefully.

## API key (simplest)

Store the key in plugin settings persisted via `localStorage` or a backend. Never hardcode secrets in plugin source code.

```javascript
const apiKey = localStorage.getItem("myPlugin_apiKey");

const response = await fetch("https://api.example.com/data", {
  headers: { Authorization: `Bearer ${apiKey}` },
});
```

Prompt the user to enter their API key on first run and store it with [plugin state persistence](../state-management/plugin-state-persistence.md).

## OAuth 2.0

OAuth requires a browser redirect flow. From a plugin iframe, open a popup window for the OAuth authorize URL, then receive the token via `postMessage`:

```javascript
// Open OAuth popup
const popup = window.open(
  "https://provider.com/oauth/authorize?client_id=...&redirect_uri=...",
  "oauth",
  "width=500,height=600"
);

// Receive token from popup
window.addEventListener("message", (event) => {
  if (event.origin === "https://provider.com") {
    const { access_token } = event.data;
    localStorage.setItem("myPlugin_token", access_token);
  }
});
```

## See also

- [Making HTTP requests](making-http-requests.md)
- [Plugin state persistence](../state-management/plugin-state-persistence.md)
