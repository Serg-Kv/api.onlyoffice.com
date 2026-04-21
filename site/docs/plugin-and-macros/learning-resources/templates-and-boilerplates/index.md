---
sidebar_position: 6
---

# Templates and boilerplates

**Goal:** Start faster with ready-made structures you can adapt for your own plugins, macros, and AI tools.

Use these templates together with the [samples](../samples-and-examples/index.md) and [tutorials](../tutorials/index.md) to move from prototype to production-ready solution quickly, without breaking existing plugin, macro, or AI tool APIs.

## Plugin templates

### Official plugin templates

Use the official plugin templates from the ONLYOFFICE repository as your starting point:

- [ONLYOFFICE sdkjs-plugins repository](https://github.com/ONLYOFFICE/sdkjs-plugins)

Each template provides:

- A minimal `config.json` with all required fields pre-filled.
- A ready-to-run `index.html` with the plugin SDK already included.
- A `code.js` scaffold with the `init` and `button` handlers stubbed out.

### How to use a plugin template

1. Clone or download the repository.
2. Copy the template folder that matches your plugin type (panel, window, background).
3. Update `config.json` with your plugin name, GUID, and description.
4. Replace the placeholder UI in `index.html` with your own panel.
5. Implement your logic in `code.js` using the [Plugin API](https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js).

For a detailed walkthrough, see the **Using plugin templates** section in the [Quick Start Guides](../../plugins/fundamentals/getting-started/your-first-plugin.md).

## Macro snippets

Reuse code fragments from the macro samples collection as building blocks for your own automation scripts.

### Recommended starting points

| Task                        | Sample to adapt                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------- |
| Insert or replace text       | [Text document macros](../../samples/macro-samples/macro-samples.md#text-document-editor) |
| Work with spreadsheet ranges | [Spreadsheet macros](../../samples/macro-samples/macro-samples.md#spreadsheet-editor)     |
| Automate PDF form fields     | [PDF editor macros](../../samples/macro-samples/macro-samples.md#pdf-editor)              |
| Generate slide content       | [Presentation macros](../../samples/macro-samples/macro-samples.md#presentation-editor)   |

### Snippet structure

Every macro snippet follows this minimal pattern:

```js
(function () {
  // Your macro logic here
  // Use Api.GetDocument(), Api.GetActiveSheet(), etc.
})();
```

Copy any macro sample into this wrapper and adapt the body.

## Custom AI tool patterns

Take the custom AI tool samples as boilerplates for common AI tasks.

### Pattern: content generation

```js
(function () {
  let func = new RegisteredFunction({
    name: "GenerateDraft",
    description: "Generate a draft paragraph based on a topic",
    parameters: {
      type: "object",
      properties: {
        topic: { type: "string", description: "The topic to write about" },
      },
      required: ["topic"],
    },
    examples: [{ prompt: "Write about climate change", arguments: { topic: "climate change" } }],
  });

  func.call = async function (params) {
    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine) return;
    // Send request and insert the generated text into the document
  };

  return func;
})();
```

- Full examples: [Text document Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#text-document-editor)

### Pattern: data analysis

```js
(function () {
  let func = new RegisteredFunction({
    name: "ExplainFormula",
    description: "Explain what a spreadsheet formula does in plain language",
    parameters: {
      type: "object",
      properties: {
        formula: { type: "string", description: "The formula to explain" },
      },
      required: ["formula"],
    },
    examples: [{ prompt: "What does SUM(A1:A10) do?", arguments: { formula: "SUM(A1:A10)" } }],
  });

  func.call = async function (params) {
    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine) return;
    // Send request and display the explanation
  };

  return func;
})();
```

- Full examples: [Spreadsheet Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#spreadsheet-editor)

### Pattern: document intelligence

```js
(function () {
  let func = new RegisteredFunction({
    name: "ExtractKeyPoints",
    description: "Extract key points from the selected document section",
    parameters: {
      type: "object",
      properties: {
        content: { type: "string", description: "The document section to analyze" },
      },
      required: ["content"],
    },
    examples: [{ prompt: "Extract key points", arguments: { content: "selected text" } }],
  });

  func.call = async function (params) {
    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine) return;
    // Send request and insert the extracted points
  };

  return func;
})();
```

- Full examples: [Presentation Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#presentation-editor)
