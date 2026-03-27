---
sidebar_position: 1
---

# Getting started

This guide provides an overview of ONLYOFFICE extension capabilities, including plugins, macros, and AI integration. Use this guide to understand available options and select the appropriate approach for your requirements.

:::note
Plugin and macro functionality is available in ONLYOFFICE Docs version 7.0 and later. For the latest features including macro recording and enhanced AI integration, version 9.2 or later is recommended.
:::

---

## Getting started options

### Quick start

Begin development immediately with step-by-step tutorials:

- [Quick Start Guides](quick-start-guides.md) — Complete walkthroughs
- [Interactive Playground](playground.md) — Test code without installation

### Overview and concepts

Learn about extension capabilities and implementation approaches:

- [Extension Types](#extension-types) — Available extension methods
- [Choosing an Approach](#choosing-an-approach) — Decision framework
- [Feature Comparison](#feature-comparison) — Detailed comparison table

## Extension types

ONLYOFFICE supports three extension methods, each designed for specific use cases:

### Plugins

Plugins are HTML/CSS/JavaScript applications embedded in the ONLYOFFICE editor interface. They provide custom UI elements and can integrate with external services.

**Use cases:**
- Embedding external content ([YouTube](../samples/plugin-samples/youtube.md), media galleries)
- Third-party service integration ([Translator](../samples/plugin-samples/translator.md), [Zotero](../samples/plugin-samples/zotero.md), CRM systems)
- Advanced document processing ([OCR](../samples/plugin-samples/ocr.md), image manipulation, data visualization)
- Custom workflows (form builders, approval systems, templates)

**Development requirements:**
- **Time:** 2-7 days
- **Skill level:** Intermediate
- **Technologies:** HTML, CSS, JavaScript
- **Distribution:** [ONLYOFFICE Marketplace](https://www.onlyoffice.com/app-directory/en) or private deployment

### Macros

Macros are JavaScript code snippets that execute directly within documents. They require no installation and run in the document context.

**Use cases:**
- Automated formatting (applying complex styles)
- Batch operations (find-replace, bulk updates)
- Custom calculations (specialized formulas, data transformations)
- Document cleanup (metadata removal, formatting standardization)

**Development requirements:**
- **Time:** 30 minutes - 2 hours
- **Skill level:** Beginner
- **Technologies:** JavaScript
- **Distribution:** Copy-paste or embed in document templates

### AI Integration

AI-enabled plugins combine standard plugin capabilities with AI service integration for advanced document processing.

**Use cases:**
- Writing assistance (grammar checking, style suggestions, content generation)
- Document summarization (key point extraction, abstract creation)
- Context-aware translation (preserving formatting and tone)
- Data analysis (spreadsheet analysis, report generation)

**Development requirements:**
- **Time:** 3-10 days
- **Skill level:** Advanced
- **Technologies:** Plugin API, AI provider integration (OpenAI, Claude, or custom services)
- **Additional requirements:** API keys for AI services

[Browse 50+ examples in the App Directory](https://www.onlyoffice.com/app-directory/en)

## Choosing an approach

Use the following decision tree to select the appropriate extension method:

```
START
    │
    ├─ Do you need a custom user interface (buttons, forms, panels)?
    │   │
    │   ├─ YES → Do you need to connect external services (APIs, databases)?
    │   │   │
    │   │   ├─ YES → Use Plugins
    │   │   │         (Full capabilities: UI + external integrations)
    │   │   │
    │   │   └─ NO → Use Plugins
    │   │             (UI-focused: custom panels and controls)
    │   │
    │   └─ NO → Do you need to connect external services?
    │       │
    │       ├─ YES → Use Plugins
    │       │         (Background integration without UI)
    │       │
    │       └─ NO → Use Macros
    │                 (Document automation without UI)
    │
    └─ Do you need AI-powered features?
        │
        └─ Use AI-Enabled Plugins
           (Plugin capabilities with AI provider integration)
```

Refer to the [Feature Comparison](#feature-comparison) table for detailed information.

## Feature comparison

The following table compares the capabilities of each extension method:

| Feature | Plugins | Macros | AI-Enabled Plugins |
|---------|---------|--------|-------------------|
| **Implementation** | HTML/CSS/JS application embedded in editor | JavaScript code in documents | Plugin with AI provider integration |
| **Installation** | Required (marketplace or manual) | Not required (embedded in documents) | Required (same as plugins) |
| **User Interface** | Full custom UI support | No UI | Full custom UI support |
| **External APIs** | Supported (REST, GraphQL, etc.) | Not supported | Supported (AI services required) |
| **Offline Functionality** | Depends on implementation | Fully offline | Requires internet connection |
| **Skill Level** | Intermediate | Beginner | Advanced |
| **Development Time** | 2-7 days | 30 minutes - 2 hours | 3-10 days |
| **Distribution** | Marketplace, GitHub, private deployment | Copy-paste, templates | Marketplace, private deployment |
| **Primary Use Case** | Reusable tools, integrations | Personal automation | AI-powered features |
| **Framework Support** | React, Vue, Angular supported | Vanilla JavaScript only | Any framework supported |

## Examples

The following examples demonstrate real-world implementations:

### Plugin Examples

**[YouTube Embed](../samples/plugin-samples/youtube.md)**
- Embeds YouTube videos in documents
- Provides preview and playback controls
- Supports playlists and timestamps

**[Translator](../samples/plugin-samples/translator.md)**
- Translates selected text to 100+ languages
- Preserves formatting and document structure
- Integrates with multiple translation APIs

**[OCR](../samples/plugin-samples/ocr.md)**
- Extracts text from images
- Supports multiple languages
- Inserts extracted text directly into documents

**[Zotero](../samples/plugin-samples/zotero.md)**
- Connects to Zotero citation library
- Inserts citations and bibliographies
- Supports multiple citation styles (APA, MLA, Chicago)

[Browse 50+ plugin examples →](../samples/plugin-samples/plugin-samples.md)

### Macro Examples

**Table Formatting**
- Applies alternating row colors and borders to tables

**Pattern-Based Text Replacement**
- Performs complex find-replace operations using regex

**Custom Spreadsheet Functions**
- Implements business-specific calculations

**Document Cleanup**
- Removes metadata and standardizes formatting

[Browse macro examples →](../samples/macro-samples/macro-samples.md)

### AI Integration Examples

**Grammar and Style Checker**
- Provides real-time grammar and style suggestions
- Offers context-aware corrections
- Supports multiple writing styles (formal, casual, academic)

**Document Summarizer**
- Generates executive summaries
- Extracts action items and key points
- Allows customizable summary length

**Data Analysis Assistant**
- Processes natural language queries about spreadsheet data
- Generates insights and visualizations
- Creates automated reports

[Browse AI function examples →](../samples/custom-ai-tools/custom-ai-tools.md)

## Frequently Asked Questions

### Can plugins access files outside ONLYOFFICE?

No. Plugins run in a sandboxed browser environment with the following capabilities:
- Access to current document content
- HTTP requests to external APIs (if configured)
- Browser localStorage for data storage

Plugins cannot access the local filesystem or other applications.

### Do plugins require a server?

**Development:** No server required. Plugins can be developed entirely client-side using local files.

**Production:** Server requirements depend on plugin functionality:
- **Client-only plugins** (no external APIs): No server required
- **API integrations**: Backend server or serverless functions required
- **AI features:** API endpoints required (self-hosted or third-party services)

### Can plugins be monetized?

Yes. Available monetization options:
- License sales through your own website
- Freemium models (basic free, premium paid)
- Paid support and customization services
- Independent distribution of paid plugins (ONLYOFFICE Marketplace currently hosts free plugins)

### Are frontend frameworks supported?

Yes. Any frontend framework can be used for plugin development. Requirements:
- Final output must be standard HTML/CSS/JS
- Bundle size should be under 5MB (recommended)
- Plugin must load correctly in an iframe environment

Common build tools: Vite, Webpack

### How are plugins debugged?

Use browser DevTools for debugging:
1. Right-click on the plugin UI
2. Select "Inspect Element"
3. Use Console, Network, and Sources tabs

[Detailed debugging guide →](../development-workflow/developing/for-web-editors.md)

### What are the main limitations?

Key constraints:
- Plugin package size limit: 50MB (use CDN for large libraries)
- Some browser APIs are blocked in iframe context (use plugin API alternatives)
- Heavy operations may impact editor performance (use Web Workers)
- CORS restrictions apply for external APIs
- External APIs require internet connectivity (implement offline fallbacks)
- Feature availability varies by editor type (check `EditorsSupport` in configuration)

[View all FAQs →](../more-information/faq.md)

## Troubleshooting

### Plugin Issues

| Problem | Solution |
|---------|----------|
| **Plugin not visible** | • Verify `config.json` contains a unique GUID<br/>• Check file paths are correct<br/>• Restart ONLYOFFICE |
| **JavaScript errors** | • Open browser DevTools (F12)<br/>• Check Console for error messages<br/>• Verify `plugins.js` is loaded |
| **API method failures** | • Confirm ONLYOFFICE version supports the method<br/>• Verify method syntax in [API reference](../interacting-with-editors/overview/overview.md)<br/>• Check editor type compatibility |

### Macro Issues

| Problem | Solution |
|---------|----------|
| **Macro does not execute** | • Verify macros are enabled in Tools → Settings<br/>• Check for syntax errors in macro editor<br/>• Confirm API method names are correct |
| **Unexpected results** | • Add `console.log()` statements for debugging<br/>• Test each operation individually<br/>• Verify document state before execution |

**Additional support:**
- [Developer Forum](https://forum.onlyoffice.com/) — Community support
- [GitHub Issues](https://github.com/ONLYOFFICE/sdkjs-plugins) — Bug reports
- [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice) — Q&A archive

## Resources

### Development Tools

- [Interactive Playground](playground.md) — Test code without installation
- [UI Component Library](https://onlyoffice.github.io/storybook/static/) — Pre-built components
- [Plugin Templates](https://github.com/ONLYOFFICE/sdkjs-plugins) — Starter projects
- Browser DevTools — Debugging tools

### Sample Code

- [Plugin Examples](../samples/plugin-samples/plugin-samples.md) — 50+ working examples
- [Macro Examples](../samples/macro-samples/macro-samples.md) — Common automation scripts
- [AI Function Examples](../samples/custom-ai-tools/custom-ai-tools.md) — AI integration patterns

### Documentation

- [API Reference](../interacting-with-editors/overview/overview.md) — Complete API documentation
- [Plugin Structure](../structure/configuration/configuration.md) — Configuration guide
- [Macro Guide](../macros/writing-macros.md) — Macro development
- [AI Integration](../ai/ai-plugin.md) — AI plugin setup

### Community

- [Forum](https://forum.onlyoffice.com/) — Questions and project sharing
- [GitHub](https://github.com/ONLYOFFICE/sdkjs-plugins) — Source code, issues, contributions
- [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice) — Technical Q&A
- [Changelog](../more-information/changelog.md) — API updates

## Next Steps

### Start Development

- [Quick Start Guides](quick-start-guides.md)
- [Plugin Tutorial](../structure/getting-started.md)
- [Macro Tutorial](../macros/getting-started.md)
- [AI Integration](../ai/ai-plugin.md)

### Experiment

- [Open Playground](playground.md)
- [Browse Examples](https://github.com/ONLYOFFICE/sdkjs-plugins)
- [Watch Tutorials](https://www.youtube.com/onlyoffice)

### Learn More

- [API Reference](../interacting-with-editors/overview/overview.md)
- [Best Practices](../development-workflow/developing/for-web-editors.md)
- [Publishing Guide](../development-workflow/publishing/preparing-for-release.md)

For questions or feedback, visit the [developer forum](https://forum.onlyoffice.com/).
