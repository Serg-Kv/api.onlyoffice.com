---
sidebar_position: 2
---

# User preferences

User preferences are plugin settings that the user configures once and expects to apply across sessions and documents.

## Pattern

Expose a settings panel (a separate plugin variation) where users enter preferences, then persist them with [localStorage](plugin-state-persistence.md).

### Settings schema

Define a defaults object to ensure all keys are always present:

```javascript
const DEFAULTS = {
  language: "en",
  autoSync: false,
  fontSize: 14,
};

function loadPrefs() {
  const raw = localStorage.getItem("myPlugin_prefs");
  return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
}

function savePrefs(prefs) {
  localStorage.setItem("myPlugin_prefs", JSON.stringify(prefs));
}
```

### Settings UI

```html
<form id="settings-form">
  <label>
    Language:
    <select name="language">
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  </label>
  <label>
    <input type="checkbox" name="autoSync" />
    Enable auto-sync
  </label>
  <button type="submit">Save</button>
</form>
```

```javascript
const prefs = loadPrefs();

// Populate form
document.querySelector('[name="language"]').value = prefs.language;
document.querySelector('[name="autoSync"]').checked = prefs.autoSync;

document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  savePrefs({
    language: data.get("language"),
    autoSync: data.has("autoSync"),
  });
});
```

## See also

- [Plugin state persistence](plugin-state-persistence.md)
- [Localization](../../plugins/fundamentals/configuration/localization.md)
