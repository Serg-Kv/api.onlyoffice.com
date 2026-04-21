---
sidebar_position: 2
---

# RTL language support

Right-to-left (RTL) languages such as Arabic and Hebrew require layout and text direction adjustments in your plugin UI.

## Detect RTL locale

```javascript
const RTL_LANGS = ["ar", "he", "fa", "ur"];

function isRTL(lang) {
  return RTL_LANGS.includes(lang.split("-")[0]);
}
```

## Apply direction to the document

```javascript
function applyDirection(lang) {
  const dir = isRTL(lang) ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}
```

## CSS logical properties

Use CSS logical properties so layout flips automatically with `dir`:

```css
/* Instead of margin-left / margin-right */
.label {
  margin-inline-start: 8px;
  margin-inline-end: 4px;
}

/* Instead of padding-left */
.input {
  padding-inline-start: 12px;
}

/* Flex direction follows document direction */
.toolbar {
  display: flex;
  flex-direction: row; /* auto-mirrors with dir="rtl" */
}
```

## Test with sample RTL content

```javascript
// Quick test: switch UI to Arabic
applyDirection("ar");
```

Use browser DevTools to verify that flex containers, absolute positions, and text alignment all mirror correctly.

## See also

- [Localization workflow](localization-workflow.md)
- [Dynamic translations](dynamic-translations.md)
