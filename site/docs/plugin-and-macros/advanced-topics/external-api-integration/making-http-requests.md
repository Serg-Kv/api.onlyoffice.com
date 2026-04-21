---
sidebar_position: 1
---

# Making HTTP requests

Plugins run inside a sandboxed iframe and can make HTTP requests using the standard `fetch` API or `XMLHttpRequest`. This page covers patterns for calling external services from a plugin.

## Basic fetch

```javascript
async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return response.json();
}
```

## CORS requirements

Your external service must return appropriate CORS headers to allow requests from the plugin iframe. If you control the server, add:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

If you do not control the server, you may need a proxy. See [Authentication patterns](authentication-patterns.md) for OAuth flows that use a server-side component.

## Error handling

Always handle network errors explicitly. See [Error handling](error-handling.md) for recommended patterns.

## See also

- [Authentication patterns](authentication-patterns.md)
- [Rate limiting and caching](rate-limiting-caching.md)
- [Error handling](error-handling.md)
