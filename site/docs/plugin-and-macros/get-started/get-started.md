---
sidebar_position: -10
---

# Getting started

ONLYOFFICE offers three ways to extend and automate editors: plugins, macros, and AI features. This page helps you choose the right approach for your needs.

## What you can build

### Plugins

Plugins are HTML/CSS/JavaScript applications that run inside the editor. They can display custom UI panels, connect to external services, and interact with document content through the plugin API.

Use plugins when you need:

- A custom user interface (panels, buttons, forms)
- Integration with external APIs or databases
- Reusable tools that can be distributed and installed

**Skill level:** Intermediate | **Tech:** HTML/CSS/JavaScript | **Dev time:** 2–7 days

### Macros

Macros are lightweight JavaScript scripts that run directly inside documents without any installation. They automate repetitive tasks by calling the Office JavaScript API.

Use macros when you need:

- Batch formatting or document cleanup
- Custom calculations and data transformations
- Quick automation without UI or external services

**Skill level:** Beginner | **Tech:** JavaScript | **Dev time:** 30 min – 2 hours

### AI features

AI features are plugins enhanced with AI provider integration. They add intelligent capabilities like text generation, summarization, translation, and data analysis to the editor.

Use AI features when you need:

- Writing assistance or content generation
- Smart summarization or translation
- AI-driven document analysis

**Skill level:** Advanced | **Tech:** Plugin API + AI provider | **Dev time:** 3–10 days

## Which approach to choose

Answer these questions to find your path:

```
START HERE
    │
    ├─ Do you need a custom user interface (buttons, forms, panels)?
    │   │
    │   ├─ YES → Build a plugin
    │   │         (Full power: UI + optional external integrations)
    │   │
    │   └─ NO → Do you need to connect external services?
    │       │
    │       ├─ YES → Build a plugin
    │       │         (Background integration without UI)
    │       │
    │       └─ NO → Write a macro
    │                 (Pure automation, no UI needed)
    │
    └─ Want AI-powered features?
        │
        └─ Build a plugin with AI integration
           (Combine plugin capabilities with AI providers)
```

## Comparison

| Feature | Plugins | Macros | AI plugins |
|---------|---------|--------|------------|
| What is it? | HTML/CSS/JS app embedded in editor | JavaScript code in documents | Plugin + AI provider integration |
| Installation | Required | None (embedded in docs) | Required |
| User interface | Yes | No | Yes |
| External APIs | Yes | No | Yes (AI services required) |
| Offline use | Depends on features | Fully offline | Requires internet |
| Skill level | Intermediate | Beginner | Advanced |
| Dev time | 2–7 days | 30 min – 2 hours | 3–10 days |
| Distribution | Marketplace, GitHub, private | Copy-paste, templates | Marketplace, private |

## Next steps

- [Quick start guides](quick-start-guides.md) — complete walkthroughs for building your first plugin or macro
- [Plugin structure](../structure/configuration/configuration.md) — how to configure, localize, and publish a plugin
- [Writing macros](../macros/writing-macros.md) — how to write, debug, and run macros
- [AI integration](../ai/getting-started/installing-ai-plugin.md) — how to set up and use the AI plugin
- [Samples](../samples/plugin-samples/plugin-samples.md) — plugin, macro, and AI tool code examples
