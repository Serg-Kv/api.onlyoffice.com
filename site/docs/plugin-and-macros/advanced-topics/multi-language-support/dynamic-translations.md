---
sidebar_position: 3
---

# Dynamic translations

Dynamic translations allow your plugin to switch language at runtime without reloading, and to support user-defined or server-provided translation strings.

## Runtime language switch

Build on the workflow from [Localization workflow](localization-workflow.md) to allow language changes without a page reload:

```javascript
async function switchLanguage(lang) {
  await loadTranslations(lang);
  applyTranslations();
  applyDirection(lang);
  // Persist preference
  localStorage.setItem("myPlugin_lang", lang);
}

// Language selector in the settings panel
document.getElementById("lang-select").addEventListener("change", (e) => {
  switchLanguage(e.target.value);
});
```

## Server-provided translations

Fetch translations from your backend instead of bundled files. This allows updating strings without releasing a new plugin version:

```javascript
async function loadTranslationsRemote(lang) {
  const cached = sessionStorage.getItem(`myPlugin_i18n_${lang}`);
  if (cached) return JSON.parse(cached);

  const res = await fetch(`https://myapi.example.com/i18n/${lang}`);
  const data = await res.json();
  sessionStorage.setItem(`myPlugin_i18n_${lang}`, JSON.stringify(data));
  return data;
}
```

## Pluralization

For strings that change based on count, use a simple pluralization helper:

```javascript
function plural(count, one, other) {
  return count === 1 ? one : other;
}

// Usage
const msg = `${count} ${plural(count, "item", "items")} selected`;
```

For full ICU MessageFormat support, consider a library like [i18next](https://www.i18next.com/).

## See also

- [Localization workflow](localization-workflow.md)
- [RTL language support](rtl-language-support.md)
