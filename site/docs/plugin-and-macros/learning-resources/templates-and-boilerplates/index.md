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
- A `plugin.js` scaffold with the `init` and `button` handlers stubbed out.

### How to use a plugin template

1. Clone or download the repository.
2. Copy the template folder that matches your plugin type (panel, window, background).
3. Update `config.json` with your plugin name, GUID, and description.
4. Replace the placeholder UI in `index.html` with your own panel.
5. Implement your logic in `plugin.js` using the [Plugin API](https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js).

For a detailed walkthrough, see the **Using plugin templates** section in the [Quick Start Guides](../../get-started/quick-start-guides.md).

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
// Register a custom AI tool that generates text from a prompt
Api.RegisterAIFunction({
  name: "GenerateDraft",
  description: "Generate a draft paragraph based on a topic",
  parameters: { topic: "string" },
  handler: async function ({ topic }) {
    // Call your AI provider here
    return generatedText;
  },
});
```

- Full examples: [Text document Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#text-document-editor)

### Pattern: data analysis

```js
// Register a custom AI tool that explains a spreadsheet formula
Api.RegisterAIFunction({
  name: "ExplainFormula",
  description: "Explain what a spreadsheet formula does in plain language",
  parameters: { formula: "string" },
  handler: async function ({ formula }) {
    // Call your AI provider here
    return explanation;
  },
});
```

- Full examples: [Spreadsheet Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#spreadsheet-editor)

### Pattern: document intelligence

```js
// Register a custom AI tool that extracts key points from a document section
Api.RegisterAIFunction({
  name: "ExtractKeyPoints",
  description: "Extract key points from the selected document section",
  parameters: { content: "string" },
  handler: async function ({ content }) {
    // Call your AI provider here
    return keyPoints;
  },
});
```

- Full examples: [Presentation Editor AI tools](../../samples/custom-ai-tools/custom-ai-tools.md#presentation-editor)
