---
sidebar_position: -4
title: "前提条件"
---

# 前提条件 {#prerequisites}

本页描述使用 ONLYOFFICE AI 插件构建 AI 功能之前所需的一切准备工作。

## 必需软件 {#required-software}

在开始之前，请确保以下条件已满足：

- **ONLYOFFICE Docs**（服务器或云）或**ONLYOFFICE 桌面编辑器**已安装并运行。
- **AI 插件**已安装。插件可从以下来源获取：
  - ONLYOFFICE Docs 或桌面编辑器 **v9.0.4** 及更高版本（内置或应用目录）。
  - ONLYOFFICE 应用目录：[https://www.onlyoffice.com/app-directory/en/ai](https://www.onlyoffice.com/app-directory/en/ai)。
- 至少配置了一个拥有有效 API 密钥或本地端点的**AI 提供商帐户**。

> 插件 GUID 为 `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD007}`。当以编程方式引用插件或在磁盘上定位其配置文件时，您需要此值。

## 支持的 AI 提供商 {#supported-ai-providers}

AI 插件开箱即用支持以下提供商类型：

| 提供商 | 类型 | 备注 |
| --- | --- | --- |
| OpenAI | 云端 | 需要来自 [platform.openai.com](https://platform.openai.com) 的 API 密钥 |
| DeepSeek | 云端 | 需要来自 DeepSeek 开发者仪表板的 API 密钥 |
| Ollama | 本地 | 完全在您的机器上运行；不需要 API 密钥 |
| 其他兼容 OpenAI 的提供商 | 云端或本地 | 任何暴露兼容 OpenAI REST API 的提供商 |

未来插件版本中可能会添加更多提供商。请查看应用目录列表了解当前完整列表。

## API 密钥要求 {#api-key-requirements}

### 云端提供商 {#cloud-providers}

对于 OpenAI 或 DeepSeek 等云端提供商：

1. 在提供商的开发者平台上创建帐户。
2. 导航到帐户仪表板的**API 密钥**部分。
3. 生成新的密钥并立即复制——大多数提供商在创建后不会再次显示完整密钥。
4. 妥善保管密钥。不要将其提交到源代码控制或在客户端代码中暴露。

### 本地提供商 {#local-providers}

对于 Ollama 等本地提供商：

- 不需要 API 密钥。
- 您需要一个可从运行 ONLYOFFICE 的机器或浏览器访问的运行中的 Ollama 实例。
- 必须配置 CORS，以便编辑器的来源被允许访问 Ollama HTTP 端点。有关设置说明，请参阅[提供商配置示例](./provider-configuration-examples.md#configuring-ollama-with-cors)。

## 环境要求 {#environment-requirements}

### 支持的编辑器版本 {#supported-editor-versions}

| 组件 | 最低版本 |
| --- | --- |
| ONLYOFFICE Docs | 7.5（插件 API）；AI 插件功能需要 v9.0.4+ |
| ONLYOFFICE 桌面编辑器 | v9.0.4+ |
| AI 插件 | v2.4.2+（支持 AI 助手测试版） |

### Web 编辑器浏览器支持 {#browser-support}

在浏览器中使用 ONLYOFFICE Docs 时，AI 插件在沙盒 iframe 中运行。支持以下浏览器：

- **基于 Chromium 的浏览器**（Chrome、Edge、Opera）——完全支持。
- **Firefox** ——支持。
- **Safari** ——支持，与其他 ONLYOFFICE Docs 功能相同的注意事项适用。

如果向云端提供商的请求在浏览器中失败，请打开浏览器开发者控制台（**F12**）并检查**网络**选项卡中的被阻止请求，以及**控制台**选项卡中的 CORS 或混合内容错误。

### 桌面编辑器 {#desktop-editors}

在 ONLYOFFICE 桌面编辑器中，插件在基于 Chromium 的嵌入式浏览器中运行。向云端提供商的网络请求直接从桌面应用程序发出，因此不需要额外的浏览器配置。对于本地提供商，请确保在启动编辑器之前 Ollama（或等效服务）正在运行。
