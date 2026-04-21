---
sidebar_position: 4
---

# Security best practices

Plugins run in a sandboxed iframe, which provides a baseline level of isolation. Follow these practices to keep your plugin and its users safe.

## Never expose secrets client-side

- Do not hardcode API keys, tokens, or credentials in plugin source files. Source files are accessible to users via DevTools.
- Store user credentials in `localStorage` (encrypted if sensitive) and use short-lived tokens.
- For sensitive operations, proxy requests through a backend you control.

## Validate all inputs

Sanitize any user input before using it in DOM operations, API calls, or storage:

```javascript
function sanitize(input) {
  const div = document.createElement("div");
  div.textContent = input; // textContent escapes HTML
  return div.innerHTML;
}
```

Avoid `innerHTML` with user-supplied data. Prefer `textContent` or a trusted sanitizer library.

## Content Security Policy

If you serve the plugin from your own server, add a strict CSP header:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src https://api.yourservice.com
```

## postMessage origin validation

When using `postMessage` (e.g., for OAuth popups), always verify the origin:

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== "https://trusted-provider.com") return;
  // Safe to process event.data
});
```

## Avoid `eval` and dynamic code execution

Never use `eval()`, `new Function()`, or `setTimeout(string)`. These bypass CSP and are vectors for injection attacks.

## Keep dependencies up to date

If your plugin bundles third-party libraries, pin versions and update regularly. Monitor the [npm audit](https://docs.npmjs.com/cli/audit) output in your build process.

## See also

- [Plugin architecture](../plugins/fundamentals/plugin-architecture/plugin-architecture.md)
- [Authentication patterns](external-api-integration/authentication-patterns.md)
- [Error handling](external-api-integration/error-handling.md)
