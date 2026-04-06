---
sidebar_position: -1
title: "提供商配置示例"
---

# 提供商配置示例 {#provider-configuration-examples}

本页提供最常见 AI 提供商配置的实用设置说明：本地 Ollama 实例、云端提供商（OpenAI），以及如何验证任一配置是否正常工作。

## 第 1 节：配置 Ollama 的 CORS（本地提供商） {#configuring-ollama-with-cors}

Ollama 默认在 `http://localhost:11434` 上暴露本地 HTTP API。当 ONLYOFFICE Docs 在浏览器中运行时，从编辑器来源到 Ollama 的请求受浏览器同源策略的约束。您必须配置 Ollama 发出宽松的 CORS 标头，以便浏览器允许这些请求。

控制 Ollama 允许来源的环境变量是 `OLLAMA_ORIGINS`。将其设置为：

```bash
OLLAMA_ORIGINS=http://*,https://*,onlyoffice://*
```

这允许来自任何 HTTP 或 HTTPS 来源的请求，以及来自 ONLYOFFICE 桌面编辑器使用的 `onlyoffice://` 协议的请求。

> 有关包括模型选择和测试在内的完整演练，请参阅[配置 Ollama 的 CORS](../../ai/configuring-ollama-with-cors.md)。

### Linux（systemd） {#linux-systemd}

编辑 Ollama systemd 服务覆盖：

```bash
sudo systemctl edit ollama
```

在打开的编辑器中添加以下块：

```ini
[Service]
Environment="OLLAMA_ORIGINS=http://*,https://*,onlyoffice://*"
```

保存文件，然后重新加载并重启服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```

### macOS（launchctl） {#macos-launchctl}

通过 `launchctl` 设置环境变量，使其在 Ollama 启动时被继承：

```bash
launchctl setenv OLLAMA_ORIGINS "http://*,https://*,onlyoffice://*"
```

然后重启 Ollama：

```bash
osascript -e 'quit app "Ollama"'
open -a Ollama
```

### Windows（setx） {#windows-setx}

以管理员身份打开**命令提示符**并运行：

```bash
setx OLLAMA_ORIGINS "http://*,https://*,onlyoffice://*" /M
```

`/M` 标志将变量写入系统级环境。运行命令后，重启 Ollama。

## 第 2 节：配置云端提供商（OpenAI 示例） {#configuring-a-cloud-provider}

### 获取 API 密钥 {#obtain-an-api-key}

1. 在 [https://platform.openai.com](https://platform.openai.com) 登录 OpenAI 开发者平台。
2. 在左侧边栏导航到**API keys**。
3. 点击**Create new secret key**，为其命名，然后复制密钥值。安全存储——完整密钥仅显示一次。

### 在 ONLYOFFICE 编辑器中添加提供商 {#add-the-provider-in-onlyoffice-editors}

1. 在 ONLYOFFICE Docs 或桌面编辑器中打开任何文档。
2. 点击顶部工具栏中的**AI**选项卡。
3. 点击**设置**。
4. 在设置面板中，点击**编辑 AI 模型**。
5. 点击 **+**（加号）按钮添加新的提供商。
6. 从提供商列表中选择**OpenAI**。
7. 将 API 密钥粘贴到**API key**字段中。
8. 选择要启用的**模型功能**（例如**文本生成**、**图像生成**、**嵌入**），并为每个功能选择特定的模型。
9. 点击**确定**保存。

OpenAI 提供商现已激活。AI 插件将为您启用的功能路由请求到 OpenAI。

## 第 3 节：验证配置 {#verifying-the-configuration}

### 快速功能测试 {#quick-functional-test}

确认提供商已激活且可访问的最快方法是直接在编辑器中使用 AI 助手：

1. 打开任何文档。
2. 按 **Ctrl + /** 打开 AI 助手输入框。
3. 输入一个简单的提示，如 `What is 2 + 2?`，然后按 **Enter**。
4. 如果提供商配置正确，助手将在几秒钟内返回响应。

### 检查错误 {#checking-for-errors}

如果请求失败或没有响应：

1. 使用 **F12**（Web 编辑器）打开浏览器开发者工具。
2. 转到**控制台**选项卡，查看 AI 插件的错误消息。常见错误包括：
   - `401 Unauthorized` — API 密钥缺失或不正确。
   - `CORS error` — 提供商（通常是 Ollama）未配置为允许编辑器的来源。
   - `net::ERR_CONNECTION_REFUSED` — 本地提供商（Ollama）未运行。
3. 转到**网络**选项卡，按**Fetch/XHR**筛选，然后重新发送提示。检查请求和响应以查看提供商返回的确切 HTTP 状态和响应正文。

解决根本错误（错误密钥、CORS 配置错误、服务未运行）并重复功能测试。
