---
sidebar_position: 4
---

# Testing and debugging

This page covers strategies for testing custom AI tools and resolving common issues.

## Testing workflow

The recommended workflow for testing a custom AI tool:

1. **Write the tool** in `sdkjs-plugins/content/ai/.dev/helpers/word/` (or `cell/`, `slide/` depending on editor type).
2. **Run `helpers.py`** to rebuild the plugin bundle.
3. **Rebuild the plugin** (zip the `ai` folder → rename to `ai.plugin` → place in `deploy/`).
4. **Push and rebuild** your GitHub Pages site.
5. **Install via custom store** in ONLYOFFICE Plugin Manager.
6. **Test** by opening the AI agent (`Ctrl + /`) and sending a prompt that should trigger your tool.

For faster iteration, test the `func.call` logic separately using browser DevTools before integrating it with the full plugin rebuild cycle.

## Using browser DevTools

The AI agent runs in a sandboxed iframe. To inspect it:

1. Open ONLYOFFICE in a browser.
2. Press `Ctrl + /` to open the AI agent.
3. Right-click the agent panel → **Inspect** (or press `F12`).
4. Use the **Console** tab to view logs and errors.
5. Use the **Network** tab to inspect AI provider requests and responses.

Add `console.log` statements inside `func.call` to trace execution:

```js
func.call = async function (params) {
  console.log("Tool called with params:", params);

  let text = await Asc.Editor.callCommand(function () {
    let doc = Api.GetDocument();
    let range = doc.GetRangeBySelect();
    return range ? range.GetText() : "";
  });

  console.log("Retrieved text:", text);
  // ...
};
```

## Common errors and solutions

### Tool is never called

**Symptom:** The AI agent responds but never invokes your tool.

**Causes and solutions:**

| Cause | Solution |
|-------|---------|
| Poor `description` | Rewrite it to be more specific about when to use the tool |
| Missing or poor `examples` | Add more diverse examples that match expected user prompts |
| Name conflict | Ensure your tool name is unique across all registered tools |
| Plugin not updated | Verify the plugin version was bumped and the store link was rebuilt |

**Tip:** Test with a prompt that exactly matches one of your `examples.prompt` values. If the tool still is not called, the issue is likely with registration or the plugin not being updated.


### Asc.Editor.callCommand returns undefined

**Symptom:** `callCommand` callback receives `undefined` instead of the expected value.

**Cause:** The callback function does not return a value explicitly.

```js
// Incorrect — returns undefined
await Asc.Editor.callCommand(function () {
  let doc = Api.GetDocument();
  doc.GetCurrentWord(); // missing return
});

// Correct
await Asc.Editor.callCommand(function () {
  let doc = Api.GetDocument();
  return doc.GetCurrentWord();
});
```


### Asc.scope data is not accessible

**Symptom:** Variables set outside `callCommand` are not accessible inside it.

**Cause:** `callCommand` runs in a separate editor context. Use `Asc.scope` to pass data:

```js
// Incorrect
let myValue = "hello";
await Asc.Editor.callCommand(function () {
  console.log(myValue); // undefined
});

// Correct
Asc.scope.myValue = "hello";
await Asc.Editor.callCommand(function () {
  console.log(Asc.scope.myValue); // "hello"
});
```


### Undo does not work as expected

**Symptom:** Each streaming chunk creates a separate undo step.

**Cause:** `EndAction` is being called after every chunk instead of once.

**Solution:** Use the `checkEndAction` pattern to call `EndAction` only once:

```js
let ended = false;
async function checkEndAction() {
  if (!ended) {
    await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
    ended = true;
  }
}

await requestEngine.chatRequest(prompt, false, async function (data) {
  if (!data) return;
  await checkEndAction(); // called only on the first chunk
  // insert data...
});
```


### AI provider returns an error

**Symptom:** The agent shows an error or no response after sending a prompt.

**Debugging steps:**

1. Open the **Network** tab in DevTools and look for failed requests to your provider's API endpoint.
2. Check the response body for error messages (e.g., `invalid_api_key`, `rate_limit_exceeded`).
3. Verify the API key in **AI → Settings → Edit AI models**.
4. Ensure the model is assigned to the `Text` task type.


### requestEngine is null

**Symptom:** `AI.Request.create()` returns `null`.

**Cause:** No model is configured for the specified `AI.ActionType`.

**Solution:** Ensure a model is configured for the `Text` task type in **AI → Settings**. Add a null check:

```js
let requestEngine = AI.Request.create(AI.ActionType.Chat);
if (!requestEngine) {
  console.error("No AI model configured for Chat.");
  return;
}
```

## Testing strategies

- **Unit-test the prompt building** separately before wiring up the full tool.
- **Mock the AI response** during development by replacing `requestEngine.chatRequest` with a local function that returns a fixed string.
- **Test edge cases**: empty selection, very long text, special characters, and unsupported document states.
- **Test in all target editors** (word, cell, slide) if your tool is designed to work across editor types.
