---
sidebar_position: -1
title: 隐私和数据处理
description: 安全和数据实践。
---

# 隐私和数据处理 {#privacy-and-data-handling}

ONLYOFFICE 插件中的 AI 工具可以将文档内容发送到外部服务。了解哪些数据离开了编辑器——以及如何最小化暴露——对于构建可以在敏感环境中安全使用的插件至关重要。

## 哪些数据被发送到 AI 模型 {#what-data-is-sent}

传输到 AI 提供商的唯一数据是传递给 `chatRequest` 的 `prompt` 字符串。此字符串由您的插件代码构造，因此您可以完全控制它包含的内容。

最终出现在提示中的常见用户数据来源：

- 通过 `Asc.Editor.callMethod("GetSelectedText")` 检索的选定文本
- 电子表格中的单元格值
- 文档元数据，如文件名或作者
- 您的代码明确嵌入在提示字符串中的任何其他内容

没有文档内容会被自动或隐式地发送给提供商。如果您的 `func.call` 实现没有在提示中嵌入文档内容，则不会有内容到达提供商。

## 最小化数据暴露 {#minimize-data-exposure}

仅提取任务所需的内容。当单个选择或单元格值就足够时，不要发送整个文档。

**避免：**

```ts
const fullText = await Asc.Editor.callMethod("GetDocumentText");
const prompt = `Analyze this document:\n\n${fullText}`;
```

**推荐：**

```ts
const selectedText = await Asc.Editor.callMethod("GetSelectedText");
const prompt = `Summarize the following paragraph:\n\n${selectedText}`;
```

其他数据最小化实践：

- 如果任务不需要，从提示中剥离个人身份信息（姓名、电子邮件地址、电话号码）。
- 在嵌入之前，将过长的选择截断到合理的最大长度。
- 避免将提示字符串记录到浏览器控制台或 AI 提供商之外的任何外部服务。

## 本地提供商将数据保留在本地 {#local-providers}

当 ONLYOFFICE 安装配置为使用本地 AI 提供商（如 [Ollama](../../ai/configuring-ollama-with-cors.md)）时，所有 `chatRequest` 调用都发送到组织自身基础设施内的服务器。没有数据到达第三方云服务。

此方法推荐用于：

- 处理机密文档、财务记录或法律内容的组织
- 受数据驻留法规约束的环境（GDPR、HIPAA 及类似法规）
- 将真实文档内容发送到云提供商不可取的开发和测试工作流程

有关设置说明，请参阅[配置 Ollama 的 CORS](../../ai/configuring-ollama-with-cors.md)。

## API 密钥存储 {#api-key-storage}

永远不要在插件源代码中硬编码 API 密钥。插件文件分发给用户，可能被检查或提取。

正确的方法是使用 AI 插件的内置密钥管理：

1. 在 ONLYOFFICE 编辑器中打开 **AI** 选项卡。
2. 点击**设置**。
3. 在指定字段中输入 API 密钥。

插件运行时会自动将配置的密钥提供给 `chatRequest`。您的插件代码根本不需要处理密钥——它由运行时注入，而不是由您的 `func.call` 实现注入。

> 分布式插件中的硬编码 API 密钥是凭证泄露。任何安装插件的用户都可以提取并使用该密钥，在您的账户下产生费用。

## CORS 和网络安全 {#cors-and-network-security}

使用自托管 AI 提供商时，浏览器会对从编辑器来源发出的请求强制执行 CORS（跨源资源共享）限制。配置错误的 CORS 设置将导致 `chatRequest` 静默失败或出现不透明的网络错误。

自托管提供商的检查清单：

- 配置提供商以发出正确的 `Access-Control-Allow-Origin` 标头。对于 Ollama，请参阅[配置 Ollama 的 CORS](../../ai/configuring-ollama-with-cors.md)。
- 使用带有有效证书的 HTTPS。浏览器会阻止混合内容请求（从 HTTPS 页面调用 HTTP 端点）。
- 考虑将提供商放在反向代理（nginx、Caddy 或类似工具）后面，以集中处理 TLS 终止和 CORS 标头。
- 将允许的来源限制为仅 ONLYOFFICE 服务器主机名——不要在生产环境中使用 `*`。

## 在传输文档内容时通知用户 {#inform-users}

如果您的插件将文档内容发送给第三方 AI 提供商，请清楚地披露这一点：

- 在 ONLYOFFICE 应用商店或管理面板中显示的插件**描述**字段中
- 在插件的设置界面中，附带说明，例如："Selected text is sent to [Provider Name] to generate a response. Review [Provider Name]'s privacy policy before using this feature with confidential documents."
- 在插件的 README 或文档中

透明度建立用户信任，并帮助管理员就批准哪些插件用于其组织做出明智的决定。

## 数据保留 {#data-retention}

云 AI 提供商在保留提示和补全结果的时间上有所不同。一些提供商存储请求数据用于滥用监控；其他提供商为企业客户提供零保留 API 计划。

对于合规敏感的环境：

- 查看插件支持的每个提供商的数据保留政策。
- 处理受监管数据时，优先选择提供零保留或短保留计划的提供商。
- 为了最高保证，使用本地模型——保留的数据完全由您自己的基础设施策略管理。
- 在插件的隐私披露中记录保留政策，以便管理员可以做出明智的部署决定。
