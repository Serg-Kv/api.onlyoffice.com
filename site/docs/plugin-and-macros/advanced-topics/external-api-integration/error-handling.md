---
sidebar_position: 4
---

# Error handling

Robust error handling makes plugins resilient to network failures, API changes, and unexpected editor states.

## Network errors

Always wrap `fetch` calls to distinguish network failures from API errors:

```javascript
async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`API error ${response.status}: ${body}`);
    }

    return await response.json();
  } catch (err) {
    if (err.name === "TypeError") {
      // Network failure (offline, CORS, DNS)
      showError("Network error. Check your connection and try again.");
    } else {
      showError(err.message);
    }
    throw err;
  }
}
```

## User-facing error messages

Show errors inline in the plugin UI rather than using `alert()`:

```javascript
function showError(message) {
  const el = document.getElementById("error-message");
  el.textContent = message;
  el.style.display = "block";
}
```

## Editor method errors

When calling `window.Asc.plugin.executeMethod`, handle the callback's error parameter:

```javascript
window.Asc.plugin.executeMethod("GetCurrentWord", [], function (result, error) {
  if (error) {
    console.error("Editor method failed:", error);
    return;
  }
  // use result
});
```

## See also

- [Making HTTP requests](making-http-requests.md)
- [Logging best practices](../../plugins/development-workflow/debugging/logging-best-practices.md)
