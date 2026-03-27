---
sidebar_position: 2
---

# Quick start guides

This guide provides step-by-step instructions for creating ONLYOFFICE plugins and macros. It includes three tutorials: a basic plugin implementation, a macro example, and instructions for using existing plugin templates.

:::note
The plugin and macro APIs described in this guide are available in ONLYOFFICE Docs version 7.0 and later. For the latest features including macro recording and enhanced AI integration, version 9.2 or later is recommended.
:::

---

## Plugin development tutorial

This tutorial demonstrates how to create a basic plugin that inserts text into a document.

**Estimated time:** 5-10 minutes
**Prerequisites:** Basic knowledge of HTML, CSS, and JavaScript

### Step 1: Create the plugin structure

Create a folder named `hello-world-plugin` with the following files:

#### Plugin configuration file

Create a file named `config.json` with the following content:

```json
{
  "name": "Hello World",
  "guid": "asc.{0000-0000-0000-0001}",
  "version": "1.0.0",
  "variations": [
    {
      "url": "index.html",
      "icons": ["icon.png"],
      "isViewer": false,
      "EditorsSupport": ["word", "cell", "slide"]
    }
  ]
}
```

**Configuration parameters:**
- `name` — Display name in the plugin menu
- `guid` — Unique identifier (must be changed for production use)
- `url` — Entry point HTML file
- `EditorsSupport` — Supported editor types (word/cell/slide)

---

#### Plugin interface file

Create a file named `index.html` with the following content:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World Plugin</title>
    <script src="https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
        }
        button {
            background: #FF6F3D;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #E55A2B;
        }
    </style>
</head>
<body>
    <h2>Hello World Plugin</h2>
    <button onclick="insertText()">Insert Hello World</button>

    <script>
        function insertText() {
            window.Asc.plugin.executeMethod("PasteText", ["Hello World! 🎉"]);
        }
    </script>
</body>
</html>
```

---

### Step 2: Add an icon (optional)

Create or download a 48x48 pixel PNG icon named `icon.png` and place it in the plugin folder. This icon will appear in the plugin menu.

---

### Step 3: Install the plugin

Installation procedures vary depending on your ONLYOFFICE deployment:

#### ONLYOFFICE Desktop Editors

1. Open ONLYOFFICE Desktop
2. Navigate to **Plugins → Settings → Add Plugin**
3. Browse to your `hello-world-plugin` folder
4. Click **OK**

[Detailed Desktop installation guide →](../development-workflow/installing-and-testing/desktop-editors-installation.md)

#### ONLYOFFICE Docs (On-Premises)

1. Copy your plugin folder to the server plugins directory:
   - Linux: `/var/www/onlyoffice/documentserver/sdkjs-plugins/`
   - Windows: `C:\Program Files\ONLYOFFICE\DocumentServer\sdkjs-plugins\`
2. Restart the Document Server
3. Refresh your browser

[Detailed Docs installation guide →](../development-workflow/installing-and-testing/docs-on-premises-installation.md)

---

### Step 4: Test the plugin

1. Open a document in ONLYOFFICE
2. Click **Plugins** in the toolbar
3. Select **Hello World**
4. Click the **Insert Hello World** button
5. Verify that "Hello World! 🎉" appears in your document

---

### Step 5: Extend the plugin

The following examples demonstrate common plugin enhancements:

#### Adding user input

```html
<input type="text" id="customText" placeholder="Enter your text">
<button onclick="insertCustomText()">Insert Custom Text</button>

<script>
    function insertCustomText() {
        const text = document.getElementById('customText').value;
        window.Asc.plugin.executeMethod("PasteText", [text]);
    }
</script>
```

#### Inserting formatted content

```javascript
function insertFormattedText() {
    window.Asc.plugin.executeMethod("PasteHtml", [
        "<p style='color: blue; font-weight: bold;'>Formatted Hello World!</p>"
    ]);
}
```

#### Adding multiple actions

```html
<button onclick="insertHeading()">Insert Heading</button>
<button onclick="insertList()">Insert List</button>

<script>
    function insertHeading() {
        window.Asc.plugin.executeMethod("PasteText", ["# My Heading\n"]);
    }

    function insertList() {
        window.Asc.plugin.executeMethod("PasteText", [
            "- Item 1\n- Item 2\n- Item 3\n"
        ]);
    }
</script>
```

---

### Additional resources

**Documentation:**
- [Plugin structure and configuration](../structure/configuration/configuration.md)
- [Complete API reference](../interacting-with-editors/overview/overview.md)
- [UI customization options](../customization/toolbar.md)

**Examples:**
- [YouTube plugin](../samples/plugin-samples/youtube.md) — Embed videos
- [Translator plugin](../samples/plugin-samples/translator.md) — Multi-language support
- [50+ more examples](../samples/plugin-samples/plugin-samples.md)

---

## Macro development tutorial

This tutorial demonstrates how to create and execute macros for document automation.

**Estimated time:** 2-5 minutes
**Prerequisites:** Basic JavaScript knowledge

### Step 1: Access the macro editor

1. Open a document in ONLYOFFICE
2. Navigate to **Tools → Macros**
3. The macro editor will open

---

### Step 2: Create a basic macro

Enter the following code in the macro editor:

```javascript
(function() {
    // Get the active document
    var oDocument = Api.GetDocument();

    // Create a new paragraph
    var oParagraph = Api.CreateParagraph();
    oParagraph.AddText("This text was added by a macro! 🎯");

    // Apply formatting
    oParagraph.SetBold(true);
    oParagraph.SetColor(0, 102, 204);

    // Insert into document
    oDocument.Push(oParagraph);
})();
```

**Code explanation:**
- `Api.GetDocument()` retrieves the current document object
- `Api.CreateParagraph()` creates a new paragraph element
- `AddText()` adds text content to the paragraph
- `SetBold()` and `SetColor()` apply formatting
- `Push()` inserts the paragraph into the document

---

### Step 3: Execute the macro

1. Click the **Run** button (▶️) in the macro editor
2. The formatted text will appear in your document

---

### Step 4: Save the macro

1. Click **Save** in the macro editor
2. Enter a descriptive name (e.g., "Insert Blue Text")
3. Access saved macros via **Tools → Macros → [Macro Name]**

---

### Example macros

The following examples demonstrate common macro use cases:

#### Formatting headings

```javascript
(function() {
    var oDocument = Api.GetDocument();

    // Create a heading
    var oHeading = Api.CreateParagraph();
    oHeading.AddText("Chapter 1: Introduction");
    oHeading.SetBold(true);
    oHeading.SetFontSize(24);
    oHeading.SetColor(51, 51, 51);

    oDocument.Push(oHeading);
})();
```

#### Finding and highlighting text

```javascript
(function() {
    var oDocument = Api.GetDocument();
    var searchText = "important";

    // Search for the keyword
    oDocument.Search(searchText, true, false, false);

    // Highlight found text
    var oRange = oDocument.GetRangeBySelect();
    if (oRange) {
        oRange.SetHighlight("yellow");
    }
})();
```

#### Creating tables

```javascript
(function() {
    var oDocument = Api.GetDocument();

    // Create a 3x3 table
    var oTable = Api.CreateTable(3, 3);

    // Populate header row
    oTable.GetCell(0, 0).GetContent().GetElement(0).AddText("Name");
    oTable.GetCell(0, 1).GetContent().GetElement(0).AddText("Age");
    oTable.GetCell(0, 2).GetContent().GetElement(0).AddText("City");

    // Insert table into document
    oDocument.Push(oTable);
})();
```

#### Calculating text statistics

```javascript
(function() {
    var oDocument = Api.GetDocument();
    var oRange = oDocument.GetRangeBySelect();

    if (oRange) {
        var text = oRange.GetText();
        var wordCount = text.split(/\s+/).filter(Boolean).length;
        var charCount = text.length;

        // Insert statistics
        var oParagraph = Api.CreateParagraph();
        oParagraph.AddText("\nStatistics:\n");
        oParagraph.AddText("Words: " + wordCount + "\n");
        oParagraph.AddText("Characters: " + charCount);

        oDocument.Push(oParagraph);
    }
})();
```

---

### Additional resources

**Documentation:**
- [Complete macro guide](../macros/writing-macros.md)
- [Custom spreadsheet functions](../macros/adding-custom-functions.md)
- [Debugging macros](../macros/debugging.md)

**Examples:**
- [Macro samples collection](../samples/macro-samples/macro-samples.md)
- [Converting VBA macros](../macros/converting-vba-macros.md)

---

## Using plugin templates

This section explains how to use existing plugin templates as a starting point for development.

**Estimated time:** 10-15 minutes
**Prerequisites:** Git (optional), basic web development knowledge

### Step 1: Select a template

Browse the official ONLYOFFICE plugin repository:

[ONLYOFFICE Plugin Templates](https://github.com/ONLYOFFICE/sdkjs-plugins)

**Available templates:**
- **Basic Plugin Template** — Minimal structure for custom plugins
- **YouTube Plugin** — Embedding external content
- **Translator Plugin** — API integration example
- **OCR Plugin** — Advanced processing example

---

### Step 2: Clone the repository

Using Git:

```bash
# Clone the entire plugins repository
git clone https://github.com/ONLYOFFICE/sdkjs-plugins.git

# Navigate to a specific plugin
cd sdkjs-plugins/youtube
```

Alternatively, download a specific plugin as a ZIP file from GitHub.

---

### Step 3: Customize the configuration

#### Modify `config.json`

Update the following required fields:

```json
{
  "name": "My Custom Plugin",
  "guid": "asc.{YOUR-UNIQUE-GUID-HERE}",
  "version": "1.0.0",
  "description": "Description of what your plugin does",
  "variations": [
    {
      "url": "index.html",
      "icons": ["resources/icon.png"],
      "isViewer": false,
      "EditorsSupport": ["word", "cell", "slide"]
    }
  ]
}
```

**Generating a unique GUID:**
- Use an online GUID generator
- Use Node.js: `node -e "console.log(require('crypto').randomUUID())"`

---

#### Modify the interface

Update `index.html` to match your requirements:

```html
<body>
    <h2>My Custom Plugin</h2>
    <p>Customize this interface for your use case</p>

    <!-- Add your custom UI elements here -->
    <button onclick="myCustomFunction()">My Action</button>

    <script>
        function myCustomFunction() {
            // Your custom logic here
            window.Asc.plugin.executeMethod("PasteText", ["Custom text"]);
        }
    </script>
</body>
```

---

#### Update styles

Customize the appearance in `styles.css` or inline styles:

```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f5f5f5;
    padding: 20px;
}

button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #45a049;
}
```

---

### Step 4: Test the customized plugin

1. Install the plugin following the [installation instructions](#step-3-install-the-plugin)
2. Open ONLYOFFICE and test your modifications
3. Use browser DevTools (F12) for debugging

---

### Step 5: Add custom functionality

#### External API integration example

```javascript
async function fetchDataFromAPI() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();

        // Process and insert data
        window.Asc.plugin.executeMethod("PasteText", [JSON.stringify(data)]);
    } catch (error) {
        console.error('API Error:', error);
    }
}
```

#### User preferences example

```javascript
// Save user preferences
function savePreference(key, value) {
    localStorage.setItem(key, value);
}

// Load user preferences
function loadPreference(key) {
    return localStorage.getItem(key);
}
```

---

### Step 6: Package and distribution

Preparation steps for plugin distribution:

1. **Testing:** Verify functionality in all supported editors (Word, Cell, Slide)
2. **Documentation:** Create user documentation
3. **Packaging:** Create a ZIP archive of all plugin files
4. **Distribution options:**
   - Submit to [ONLYOFFICE Marketplace](https://www.onlyoffice.com/app-directory/en)
   - Share on GitHub
   - Deploy to your organization's server

[Publishing guide →](../development-workflow/publishing/preparing-for-release.md)

---

### Best practices

**Required steps:**
- Change the GUID to avoid conflicts with existing plugins
- Update version numbers when making changes
- Test in all supported editor types
- Keep total file size under 5MB
- Use CDN for large libraries

**Common issues to avoid:**
- Using duplicate GUIDs (causes plugin conflicts)
- Insufficient testing across editor types
- Hardcoded URLs (use relative paths instead)
- Unhandled CORS issues with external APIs

---

## Next steps

After completing these tutorials, refer to the following resources:

| Documentation | Interactive tools | Tutorials |
|---|---|---|
| [API Reference →](../interacting-with-editors/overview/overview.md) | [Playground →](./playground.md) | [Plugin Tutorial →](../structure/getting-started.md) |
| [Plugin Structure →](../structure/configuration/configuration.md) | [Browse Examples →](../samples/plugin-samples/plugin-samples.md) | [Macro Guide →](../macros/getting-started.md) |
| [Best Practices →](../development-workflow/developing/for-web-editors.md) | [UI Components →](https://onlyoffice.github.io/storybook/static/) | [AI Integration →](../ai/ai-plugin.md) |

---

## Support

- [Developer Forum](https://forum.onlyoffice.com/) — Community support
- [GitHub Issues](https://github.com/ONLYOFFICE/sdkjs-plugins) — Bug reports
- [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice) — Q&A archive
- [Documentation](../more-information/faq.md) — FAQs and guides
