---
sidebar_position: -5
title: 提示工程
description: 编写有效的提示。
---

# 提示工程 {#prompt-engineering}

在使用 ONLYOFFICE 插件构建自定义 AI 工具时，编写有效的提示是最重要的技能之一。您提供的 `params`、`examples` 和 `description` 字段的质量直接决定了 AI 模型调用工具的可靠性以及结果的准确性。

## 在此上下文中提示工程的含义 {#what-prompt-engineering-means}

当您使用 `RegisteredFunction` 注册函数时，`description`、`params` 和 `examples` 字段不仅仅是文档——它们是运行时发送给 AI 模型的提示的一部分。模型读取这些字段来决定：

- 针对给定的用户请求调用哪个工具
- 从自然语言输入中提取哪些参数值
- 如何处理边缘情况和可选参数

这些字段中的每个词都会影响模型行为。将它们视为提示工程任务——而不仅仅是元数据——是工具可靠工作与错误触发之间的关键区别。

## 编写清晰的 `params` 描述 {#params-descriptions}

每个参数描述应为模型回答三个问题：

- 期望什么类型的值？
- 有效或推荐的值是什么？
- 省略参数时的默认值是什么？

**错误名称：** 模糊的参数描述

:::warning[错误]
```ts
{
  name: "language",
  description: "The language to use."
}
```
:::

:::tip[正确]
```ts
{
  name: "language",
  description: "The target language for translation. Must be a BCP 47 language tag such as 'en', 'fr', 'de', or 'zh-CN'. Defaults to 'en' if not specified."
}
```
:::

错误输出：AI 模型可能会误解参数，推断出不正确的值，或无法从自然语言中提取预期的输入。

其他指南：

- 明确说明参数是必需的还是可选的。
- 当有效值集较小（少于八个选项）时，在行内列出有效值。
- 避免使用"the value"或"the input"等通用短语——直接命名概念。
- 如果数字参数有有意义的范围，请说明：`"An integer between 1 and 10"`。

## 编写有效的 `examples` {#examples}

示例教会模型如何将自然语言短语映射到结构化的工具调用。每个工具至少提供两到三个示例，并确保它们涵盖不同的场景。

**涵盖这些情况：**

- 使用所有必需参数的最常见用法
- 省略一个或多个可选参数的用法
- 练习边缘情况或不太明显表述的用法

**"翻译选择"工具的示例集：**

```ts
examples: [
  {
    prompt: "Translate the selected text to French",
    params: { language: "fr" }
  },
  {
    prompt: "Translate this to simplified Chinese",
    params: { language: "zh-CN" }
  },
  {
    prompt: "Translate the highlighted passage",
    params: { language: "en" }  // defaults to English when not stated
  }
]
```

**要避免的常见错误：**

- 只提供一个示例——模型可能会过度拟合该表述。
- 编写两个几乎相同的示例——它们不提供新信息。
- 使用模糊的表述如"do the thing"——示例应反映真实的用户输入。
- 忘记展示可选参数的省略——没有它，模型可能总是尝试填充每个字段。

## 编写好的 `description` {#description}

`description` 字段是模型用来决定调用哪个工具的主要信号。保持简短（一两句话）、有区分度和面向操作。

好的描述应回答：

- 这个工具做什么？
- 模型应在何时选择此工具而不是其他工具？

**错误名称：** 无区分度的工具描述

:::warning[错误]
```ts
description: "Does text stuff."
```
:::

:::tip[正确]
```ts
description: "Translates the currently selected text into the specified language and replaces the selection with the translated result. Use this tool when the user asks to translate, convert, or localize selected text."
```
:::

错误输出：AI 模型无法区分工具，可能会调用错误的工具，或完全无法调用任何工具。

如果您的插件注册了多个工具，请确保每个描述清楚地将该工具与其他工具区分开来。模型在决定调用哪个工具时会同时阅读所有描述。

## 在 `func.call` 中编写好的 `prompt` 值 {#prompt-in-func-call}

在 `func.call` 内部，您构造作为 `chatRequest` 第一个参数传递的提示字符串。此提示与注册元数据不同——它是针对特定调用发送给语言模型的实际指令。

**在提示中包含相关上下文。** 如果您的工具操作选定的文本，请直接嵌入该文本：

```ts
async call(params) {
  const selectedText = await Asc.Editor.callMethod("GetSelectedText");
  const prompt = `Translate the following text into ${params.language}:\n\n${selectedText}`;
  await chatRequest(prompt, null, (chunk) => {
    // handle streaming response
  });
}
```

**构造提示字符串的指南：**

- 先提供任务指令，然后是要操作的内容。
- 清楚地标记各部分：在插入变量内容之前使用前缀如 `"Text to translate:"` 或 `"Cell value:"`。
- 保持提示尽可能简短，同时仍提供所有必要的上下文——每个 token 都有成本并增加延迟。
- 避免重复 `description` 字段中已涵盖的指令；模型会看到两者。
- 如果任务涉及多个步骤，在提示字符串中使用编号指令来引导模型。

**示例——总结一个段落：**

```ts
const text = await Asc.Editor.callMethod("GetSelectedText");
const prompt = [
  "Summarize the following paragraph in one sentence.",
  "Return only the summary with no additional explanation.",
  "",
  `Paragraph:\n${text}`
].join("\n");
```

## 常见错误 {#common-mistakes}

- **模糊的描述导致错误的工具选择。** 如果两个工具有相似的描述，模型可能会调用错误的工具。使每个描述明显不同。
- **示例太少。** 单个示例使模型对如何处理表述变化几乎没有信号。
- **没有上下文的提示。** 发送 `"Translate this"` 而不包含实际选定的文本会迫使模型猜测或产生错误。
- **过长的提示。** 当只需要一个段落时嵌入整个文档会增加 token 使用量，并可能降低响应质量。
- **在示例中忽略可选参数。** 如果您从不向模型展示参数可以省略，它可能总是尝试推断一个值，即使没有提供。
