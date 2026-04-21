---
sidebar_position: 1
---

# Localization workflow

This page covers the end-to-end process for localizing a plugin, from extracting strings to shipping translations.

## Overview

Plugin localization uses JSON translation files referenced from `config.json`. The editor loads the appropriate locale file based on the user's language setting.

For the full reference on localization file format and config.json fields, see [Localization](../../plugins/fundamentals/configuration/localization.md).

## Workflow

### 1. Extract strings

Identify all user-visible strings in your plugin and move them out of code into a base translation file:

```
my-plugin/
├── config.json
├── index.html
├── code.js
└── translations/
    ├── en.json
    ├── de.json
    └── fr.json
```

### 2. Define the base locale

`translations/en.json`:

```json
{
  "insertTable": "Insert table",
  "cancel": "Cancel",
  "settingsTitle": "Settings"
}
```

### 3. Load translations in JavaScript

```javascript
let t = {};

async function loadTranslations(lang) {
  try {
    const res = await fetch(`translations/${lang}.json`);
    t = await res.json();
  } catch {
    // Fall back to English
    const res = await fetch("translations/en.json");
    t = await res.json();
  }
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t[el.dataset.i18n] ?? el.textContent;
  });
}
```

### 4. Mark elements in HTML

```html
<button data-i18n="insertTable">Insert table</button>
<button data-i18n="cancel">Cancel</button>
```

### 5. Detect language

```javascript
window.Asc.plugin.init = function () {
  const lang = window.Asc.plugin.info?.currentUserId
    ? navigator.language.split("-")[0]
    : "en";
  loadTranslations(lang);
};
```

## See also

- [Localization reference](../../plugins/fundamentals/configuration/localization.md)
- [RTL language support](rtl-language-support.md)
- [Dynamic translations](dynamic-translations.md)
