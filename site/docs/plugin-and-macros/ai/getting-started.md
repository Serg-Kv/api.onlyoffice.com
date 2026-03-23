---
sidebar_position: 2
---

# Getting started

This page covers installing the AI plugin and making your first AI-powered request in under 5 minutes.

## Installing

Starting from version 9.0.4, the AI plugin is included in ONLYOFFICE Docs server and desktop distributions with ONLYOFFICE branding.

If you need to add it manually:

1. Download the plugin from the [ONLYOFFICE App Directory](https://www.onlyoffice.com/app-directory/en/ai).
2. Install it following the instructions for your deployment:
   - [ONLYOFFICE Desktop Editors](/docs/plugin-and-macros/tutorials/installing/onlyoffice-desktop-editors.md)
   - [ONLYOFFICE Docs (on-premises)](/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises.md)
   - [ONLYOFFICE Cloud](/docs/plugin-and-macros/tutorials/installing/onlyoffice-cloud.md)

The plugin GUID is `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD007}`.

## Activating the plugin

1. Open the **Plugins** tab and click the **Plugin Manager** icon.
2. Find the **AI plugin** and click **Install** or **Update** if it is already installed.
3. Click the **Background Plugins** button and activate the **AI** switch.
4. An **AI** tab will appear in the top toolbar of ONLYOFFICE editors.

## Your first AI-powered feature

Once the plugin is active, configure an AI provider and try a quick test:

1. Go to the **AI** tab and click **Settings**.
2. Follow the [provider configuration instructions](providers/configuring-providers.md) to add an AI model.
3. Open any document and go to the **AI** tab.
4. Click **Chatbot** and type: `Summarize the key points of this document`.
5. The AI will respond based on the configured model.

### Built-in features

| Feature | How to access | What it does |
|---------|--------------|--------------|
| **Chatbot** | AI tab → Chatbot | Conversational AI for questions and text generation |
| **Summarization** | AI tab → Summarization | Generates summaries of document content |
| **Translation** | AI tab → Translation | Translates selected text |
| **Context menu** | Right-click selected text → AI | Summarization, text analysis, translate, image, chatbot |

## Next steps

- [Configure AI providers](providers/configuring-providers.md) — set up API keys and model preferences
- [AI agent](ai-agent.md) — use the inline Ctrl+/ agent for document editing tasks
- [Custom AI tools](custom-ai-tools/custom-ai-tools-overview.md) — extend the agent with your own tools
