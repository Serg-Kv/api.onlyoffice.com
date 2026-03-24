# Getting Started

> **Transform your ONLYOFFICE experience** — Build plugins, automate with macros, or integrate AI. Choose your path below.

---

## 🎯 Choose Your Journey

<table>
<tr>
<td width="50%">

### 🚀 **I want to start coding NOW**
Jump straight into building with our interactive quick-starts:

- **[Quick Start Guides](quick-start-guides.md)** — Complete walkthroughs
- **[Interactive Playground](playground/)** — Experiment without setup

</td>
<td width="50%">

### 🧭 **I want to explore first**
Learn what's possible and find the right approach:

- **[What can I build?](#what-you-can-build)** — Real-world examples
- **[Which approach fits my needs?](#which-approach-would-you-choose)** — Smart decision tree
- **[Detailed comparison](#detailed-comparison)** — Feature comparison table

</td>
</tr>
</table>

---

## <a name="what-you-can-build"></a>💡 What You Can Build

Discover the three ways to extend ONLYOFFICE — each designed for different use cases:

### 🔌 **Plugins** — Interactive Tools with Rich UI

Build sophisticated integrations that feel native to ONLYOFFICE.

**Perfect for:**
- 🎥 Embedding external content ([YouTube](../samples/plugin-samples/youtube.md), media galleries)
- 🌐 Third-party integrations ([Translator](../samples/plugin-samples/translator.md), [Zotero](../samples/plugin-samples/zotero.md), CRM systems)
- 🖼️ Advanced processing ([OCR](../samples/plugin-samples/ocr.md), image manipulation, data visualization)
- 📋 Custom workflows (form builders, approval systems, templates)

**Development profile:**
- **Time:** 2-7 days | **Skill:** Intermediate | **Tech:** HTML/CSS/JavaScript
- **Distribution:** [ONLYOFFICE Marketplace](https://www.onlyoffice.com/app-directory/en) or private deployment

---

### ⚡ **Macros** — Instant Automation Scripts

Lightweight JavaScript that runs directly in documents — no installation needed.

**Perfect for:**
- 🎨 One-click formatting (apply complex styles instantly)
- 🔄 Batch operations (find-replace across sections, bulk updates)
- 🧮 Custom calculations (specialized formulas, data transformations)
- 🧹 Document cleanup (remove metadata, standardize formatting)

**Development profile:**
- **Time:** 30 mins - 2 hours | **Skill:** Beginner | **Tech:** JavaScript basics
- **Distribution:** Copy-paste code or embed in document templates

---

### 🤖 **AI Features** — Intelligent Assistants

Plugins enhanced with AI capabilities for next-generation document workflows.

**Perfect for:**
- ✍️ Writing assistance (grammar, style, content generation)
- 📊 Smart summarization (extract key points, create abstracts)
- 🌍 Context-aware translation (preserve formatting and tone)
- 🔍 Data insights (analyze spreadsheets, generate reports)

**Development profile:**
- **Time:** 3-10 days | **Skill:** Advanced | **Tech:** Plugin API + AI provider integration
- **Requirements:** API keys for OpenAI, Claude, or custom AI services

---

**👉 [Browse 50+ live examples in the App Directory](https://www.onlyoffice.com/app-directory/en)**

---

## <a name="which-approach-would-you-choose"></a>🧭 Which Approach Would You Choose?

Answer these questions to find your ideal path:

```
START HERE
    │
    ├─ Do you need a custom user interface (buttons, forms, panels)?
    │   │
    │   ├─ YES → Do you need to connect external services (APIs, databases)?
    │   │   │
    │   │   ├─ YES → BUILD A PLUGIN 🔌
    │   │   │         (Full power: UI + external integrations)
    │   │   │
    │   │   └─ NO → BUILD A PLUGIN 🔌
    │   │             (UI-focused: custom panels and controls)
    │   │
    │   └─ NO → Do you need to connect external services?
    │       │
    │       ├─ YES → BUILD A PLUGIN 🔌
    │       │         (Background integration without UI)
    │       │
    │       └─ NO → WRITE A MACRO ⚡
    │                 (Pure automation, no UI needed)
    │
    └─ Want AI-powered features?
        │
        └─ BUILD A PLUGIN WITH AI INTEGRATION 🤖
           (Combine plugin capabilities with AI providers)
```

**Still unsure?** Check our [detailed comparison table](#detailed-comparison) below.

---

## <a name="detailed-comparison"></a>📊 Detailed Comparison

Choose the right tool for your project:

| Feature | **Plugins** 🔌 | **Macros** ⚡ | **AI Plugins** 🤖 |
|---------|---------------|--------------|------------------|
| **What is it?** | HTML/CSS/JS app embedded in editor | JavaScript code in documents | Plugin + AI provider integration |
| **Installation** | Required (marketplace or manual) | None (embedded in docs) | Required (like plugins) |
| **User Interface** | ✅ Full custom UI | ❌ No UI | ✅ Full custom UI |
| **External APIs** | ✅ Yes (REST, GraphQL, etc.) | ❌ No | ✅ Yes (AI services required) |
| **Offline Use** | ⚠️ Depends on features | ✅ Fully offline | ❌ Requires internet |
| **Skill Level** | Intermediate | Beginner | Advanced |
| **Dev Time** | 2-7 days | 30 mins - 2 hours | 3-10 days |
| **Distribution** | Marketplace, GitHub, private | Copy-paste, templates | Marketplace, private |
| **Best For** | Reusable tools, integrations | Personal automation | AI-powered features |
| **Framework Support** | ✅ React, Vue, Angular | ❌ Vanilla JS only | ✅ Any framework |

---

## <a name="real-world-examples"></a>🌟 Real-World Examples

See what others have built to inspire your own projects:

### Plugin Examples

**[YouTube Embed](../samples/plugin-samples/youtube.md)** — Insert videos with preview
- Embeds YouTube videos directly in documents
- Custom preview and playback controls
- Supports playlists and timestamps

**[Translator](../samples/plugin-samples/translator.md)** — Multi-language translation panel
- Translate selected text to 100+ languages
- Preserves formatting and document structure
- Integration with multiple translation APIs

**[OCR](../samples/plugin-samples/ocr.md)** — Extract text from images
- Upload images and extract text
- Multiple language support
- Insert extracted text directly into documents

**[Zotero](../samples/plugin-samples/zotero.md)** — Citation management
- Connect to Zotero library
- Insert citations and bibliographies
- Multiple citation styles (APA, MLA, Chicago, etc.)

**📚 [Browse 50+ plugin examples →](../samples/plugin-samples/plugin-samples.md)**

---

### Macro Examples

**Auto-format tables** — Apply alternating row colors and borders
```javascript
// Automatically formats all tables in the document
```

**Bulk find-replace** — Use regex patterns for complex replacements
```javascript
// Find and replace with advanced pattern matching
```

**Custom spreadsheet functions** — Business-specific calculations
```javascript
// Add custom formulas for specialized calculations
```

**Document cleanup** — Remove metadata and standardize formatting
```javascript
// Clean up document formatting and metadata
```

**📚 [Browse macro examples →](../samples/macro-samples/macro-samples.md)**

---

### AI Feature Examples

**Grammar and style checker** — Intelligent writing assistance
- Real-time grammar and style suggestions
- Context-aware corrections
- Multiple writing styles (formal, casual, academic)

**Document summarizer** — Extract key points automatically
- Generate executive summaries
- Extract action items and key points
- Customizable summary length

**Smart data analysis** — Natural language queries for spreadsheets
- Ask questions about your data in plain English
- Generate insights and visualizations
- Automated report generation

**📚 [Browse AI function examples →](../samples/custom-ai-functions-samples/custom-ai-functions-samples.md)**

---

## <a name="common-questions"></a>❓ Common Questions

<details>
<summary><strong>Can plugins access files outside ONLYOFFICE?</strong></summary>

No. Plugins run in a sandboxed browser environment and can only:
- Access the current document content
- Make HTTP requests to external APIs (if configured)
- Store data in browser localStorage

They **cannot** access your local filesystem or other applications.
</details>

<details>
<summary><strong>Do I need a server to run plugins?</strong></summary>

**For development:** No, you can develop plugins entirely client-side using local files.

**For production:** Depends on your plugin:
- **Client-only plugins** (no external APIs) → No server needed
- **API integrations** → You'll need a backend or use serverless functions
- **AI features** → Requires API endpoints (your server or third-party services)
</details>

<details>
<summary><strong>Can I monetize my plugins?</strong></summary>

Yes! You have several options:
- Sell licenses through your own website
- Offer freemium models (basic free, premium paid)
- Provide paid support and customization
- The ONLYOFFICE Marketplace currently hosts free plugins, but you can distribute paid plugins independently
</details>

<details>
<summary><strong>Can I use React, Vue, or Angular?</strong></summary>

Absolutely! You can use any frontend framework. Just ensure:
- Final output is standard HTML/CSS/JS
- Bundle size is reasonable (< 5MB recommended)
- The plugin loads in an iframe environment

Many developers use Vite or Webpack to bundle framework-based plugins.
</details>

<details>
<summary><strong>How do I debug plugins?</strong></summary>

Use browser DevTools:
1. Right-click on your plugin UI
2. Select "Inspect Element"
3. Use Console, Network, and Sources tabs as you would for any web app

[Detailed debugging guide →](../tutorials/developing/for-web-editors.md)
</details>

<details>
<summary><strong>What are the limitations I should know about?</strong></summary>

Key constraints to consider:
- Plugin packages must be < 50MB (use CDN for large libraries)
- Some browser APIs are blocked in iframe (use plugin API alternatives)
- Heavy operations can slow the editor (use Web Workers)
- CORS restrictions apply for external APIs
- External APIs won't work offline (implement fallbacks)
- Not all features work in all editors (check `EditorsSupport` in config)
</details>

**[View all FAQs →](../more-information/faq/)**

---

## <a name="troubleshooting"></a>🚨 Troubleshooting

### Plugin Issues

| Problem | Solution |
|---------|----------|
| **Plugin doesn't appear** | • Check `config.json` has unique GUID<br/>• Verify file paths are correct<br/>• Restart ONLYOFFICE |
| **JavaScript errors** | • Open browser DevTools (F12)<br/>• Check Console for error messages<br/>• Verify plugin.js is loaded |
| **API methods fail** | • Ensure ONLYOFFICE version supports the method<br/>• Check method syntax in [API reference](../interacting-with-editors/overview/overview.md)<br/>• Verify editor type compatibility |

### Macro Issues

| Problem | Solution |
|---------|----------|
| **Macro doesn't run** | • Check macros are enabled in Tools → Settings<br/>• Look for syntax errors in macro editor<br/>• Verify API method names are correct |
| **Unexpected results** | • Add `console.log()` for debugging<br/>• Test each step individually<br/>• Check document state before running |

**Need more help?**
- 💬 [Developer Forum](https://forum.onlyoffice.com/) — Community support
- 🐛 [GitHub Issues](https://github.com/ONLYOFFICE/sdkjs-plugins) — Report bugs
- 📖 [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice) — Q&A archive

---

## <a name="resources"></a>🎁 Resources

### 🛠️ Development Tools

- **[Interactive Playground](playground/)** — Test code without installation
- **[UI Component Library](https://onlyoffice.github.io/storybook/static/)** — Pre-built components
- **[Plugin Templates](https://github.com/ONLYOFFICE/sdkjs-plugins)** — Starter projects
- **Browser DevTools** — Your best debugging friend

### 📦 Sample Code

- **[Plugin Examples](../samples/plugin-samples/plugin-samples.md)** — 50+ working examples
- **[Macro Examples](../samples/macro-samples/macro-samples.md)** — Common automation scripts
- **[AI Function Examples](../samples/custom-ai-functions-samples/custom-ai-functions-samples.md)** — AI integration patterns

### 📚 Documentation

- **[API Reference](../interacting-with-editors/overview/overview.md)** — Complete API documentation
- **[Plugin Structure](../structure/configuration/configuration.md)** — Configuration guide
- **[Macro Guide](../macros/writing-macros.md)** — Macro development
- **[AI Integration](../ai/ai-plugin.md)** — AI plugin setup

### 👥 Community

- **[Forum](https://forum.onlyoffice.com/)** — Ask questions, share projects
- **[GitHub](https://github.com/ONLYOFFICE/sdkjs-plugins)** — Source code, issues, contributions
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice)** — Technical Q&A
- **[Changelog](../more-information/changelog/)** — Latest API updates

---

## <a name="next-steps"></a>🎯 Next Steps

<table>
<tr>
<td width="33%" align="center">

### 🏃 Start Building

**Ready to code?**

[**Quick Start Guides →**](quick-start-guides.md)

[**Plugin Tutorial →**](../structure/getting-started.md)

[**Macro Tutorial →**](../macros/getting-started.md)

[**AI Integration →**](../ai/ai-plugin.md)

</td>
<td width="33%" align="center">

### 🎮 Experiment

**Want to try first?**

[**Open Playground →**](playground/)

[**Browse Examples →**](https://github.com/ONLYOFFICE/sdkjs-plugins)

[**Watch Tutorials →**](https://www.youtube.com/onlyoffice)

</td>
<td width="33%" align="center">

### 📖 Learn More

**Need deeper knowledge?**

[**API Reference →**](../interacting-with-editors/overview/overview.md)

[**Best Practices →**](../tutorials/developing/for-web-editors/)

[**Publishing Guide →**](../tutorials/publishing.md)

</td>
</tr>
</table>

---

<p align="center">
<em>💡 <strong>Pro tip:</strong> Start with our <a href="quick-start-guides.md">Quick Start Guides</a>, then explore the playground to see what's possible!</em>
</p>

<p align="center">
<em>Questions or feedback? Use the thumbs up/down buttons below or <a href="https://forum.onlyoffice.com/">join our forum</a>.</em>
</p>
