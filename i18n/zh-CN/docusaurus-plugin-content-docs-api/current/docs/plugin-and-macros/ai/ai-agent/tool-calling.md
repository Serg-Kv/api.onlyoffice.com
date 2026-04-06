---
sidebar_position: 3
---

# 工具调用

AI 助手通过调用**工具**来执行用户请求——这些工具是已注册的函数，用于向 AI 模型发送请求并使用 Office API 将结果应用于文档。

## 工具调用的工作原理

ONLYOFFICE AI 助手中的工具调用遵循与 [LLM API 中的函数调用](https://platform.openai.com/docs/guides/function-calling)类似的流程：

1. **注册。** 每个工具注册时都包含名称、参数模式、描述和使用示例。这些元数据告诉 AI 模型该工具的功能以及何时调用它。
2. **用户请求。** 用户打开助手（`Ctrl + /`）并输入自然语言请求。
3. **工具选择。** AI 模型检查请求和可用工具列表，然后选择最合适的工具并确定要传递的参数。
4. **执行。** 选定的工具运行：它向 AI 模型发送请求，并通过 Office API 将结果应用于文档。

## 内置工具

AI 助手为每种编辑器类型提供预定义工具：

**[文本文档编辑器](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai/.dev/helpers/word)**
- 为选定的文本添加注释或批注
- 改写或重新措辞文本
- 检查拼写和语法
- 更改文本样式和段落格式
- 插入页面

**[电子表格编辑器](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai/.dev/helpers/cell)**
- 从数据范围添加图表
- 解释公式
- 插入数据透视表
- 应用筛选和排序

**[演示文稿编辑器](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai/.dev/helpers/slide)**
- 添加新幻灯片
- 向幻灯片添加形状、表格和图表
- 更改幻灯片背景
- 复制或删除幻灯片

## 自定义工具

开发者可以使用 `RegisteredFunction` 对象注册自定义工具来扩展助手。自定义工具遵循与内置工具相同的调用模式。

有关实现详情，请参阅[创建自定义 AI 工具](../custom-ai-tools/creating-a-custom-ai-tool.md)。
