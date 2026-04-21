---
sidebar_position: 3
---

# Rate limiting and caching

External APIs often impose rate limits. Caching responses reduces requests and keeps your plugin responsive.

## In-memory cache

A simple cache for the duration of the plugin session:

```javascript
const cache = new Map();

async function fetchCached(url, ttlMs = 60_000) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }

  const data = await fetch(url).then((r) => r.json());
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}
```

## Persistent cache

Use `localStorage` to cache across sessions:

```javascript
function getCached(key, ttlMs) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const { data, timestamp } = JSON.parse(item);
  return Date.now() - timestamp < ttlMs ? data : null;
}

function setCached(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}
```

## Handling 429 Too Many Requests

Implement exponential backoff when you receive a 429 response:

```javascript
async function fetchWithRetry(url, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, delay * 2 ** i));
      continue;
    }
    return res.json();
  }
  throw new Error("Rate limit exceeded after retries");
}
```

## See also

- [Making HTTP requests](making-http-requests.md)
- [Error handling](error-handling.md)
