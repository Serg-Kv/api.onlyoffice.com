# Quick Start Guides

> **Get hands-on in minutes** — Follow these complete walkthroughs to build your first ONLYOFFICE plugin or macro.

---

## 🚀 Hello World Plugin (Complete Walkthrough)

Build the simplest possible plugin — a button that inserts "Hello World" into your document.

**⏱️ Time:** 5 minutes | **Skill Level:** Beginner

### Step 1: Create the Plugin Structure

Create a folder named `hello-world-plugin` with these files:

#### 📄 `config.json` — Plugin Configuration

This file tells ONLYOFFICE about your plugin:

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

**Key fields explained:**
- `name` — Display name in the plugin menu
- `guid` — Unique identifier (change this for your plugin!)
- `url` — Entry point HTML file
- `EditorsSupport` — Which editors support this plugin (word/cell/slide)

---

#### 📄 `index.html` — Plugin Interface and Logic

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

### Step 2: Add an Icon (Optional)

Create or download a 48x48 PNG icon named `icon.png` in the same folder. This will appear in the plugin menu.

---

### Step 3: Install the Plugin

Choose your environment:

#### For ONLYOFFICE Desktop Editors

1. Open ONLYOFFICE Desktop
2. Go to **Plugins → Settings → Add Plugin**
3. Browse to your `hello-world-plugin` folder
4. Click **OK**

**📚 [Detailed Desktop installation guide →](../tutorials/installing/onlyoffice-desktop-editors/)**

#### For ONLYOFFICE Docs (On-Premises)

1. Copy your plugin folder to the server plugins directory:
   - Linux: `/var/www/onlyoffice/documentserver/sdkjs-plugins/`
   - Windows: `C:\Program Files\ONLYOFFICE\DocumentServer\sdkjs-plugins\`
2. Restart the Document Server
3. Refresh your browser

**📚 [Detailed Docs installation guide →](../tutorials/installing/onlyoffice-docs-on-premises/)**

---

### Step 4: Test Your Plugin

1. Open a document in ONLYOFFICE
2. Click **Plugins** in the toolbar
3. Select **Hello World**
4. Click the **Insert Hello World** button
5. See "Hello World! 🎉" appear in your document!

---

### Step 5: Extend Your Plugin

Now that it works, try these enhancements:

#### Add an Input Field

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

#### Insert Formatted Content

```javascript
function insertFormattedText() {
    window.Asc.plugin.executeMethod("PasteHtml", [
        "<p style='color: blue; font-weight: bold;'>Formatted Hello World!</p>"
    ]);
}
```

#### Add Multiple Buttons

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

### Next Steps for Plugin Development

**📚 Learn More:**
- [Plugin structure and configuration](../structure/configuration/configuration.md)
- [Complete API reference](../interacting-with-editors/overview/overview.md)
- [UI customization options](../customization/toolbar.md)

**🎨 Explore Examples:**
- [YouTube plugin](../samples/plugin-samples/youtube.md) — Embed videos
- [Translator plugin](../samples/plugin-samples/translator.md) — Multi-language support
- [50+ more examples](../samples/plugin-samples/plugin-samples.md)

---

## ⚡ Hello World Macro (Complete Walkthrough)

Macros are even simpler — pure JavaScript with no installation required.

**⏱️ Time:** 2 minutes | **Skill Level:** Beginner

### Step 1: Open the Macro Editor

1. Open any document in ONLYOFFICE
2. Go to **Tools → Macros**
3. The macro editor will open

---

### Step 2: Write Your First Macro

Paste this code into the editor:

```javascript
(function() {
    // Get the active document
    var oDocument = Api.GetDocument();
    
    // Create a new paragraph
    var oParagraph = Api.CreateParagraph();
    oParagraph.AddText("This text was added by a macro! 🎯");
    
    // Make it bold and blue
    oParagraph.SetBold(true);
    oParagraph.SetColor(0, 102, 204);
    
    // Add it to the document
    oDocument.Push(oParagraph);
})();
```

**What this does:**
- Gets the current document
- Creates a new paragraph with text
- Applies bold formatting and blue color
- Inserts it into the document

---

### Step 3: Run the Macro

1. Click the **Run** button (▶️) in the macro editor
2. The formatted text appears instantly in your document!

---

### Step 4: Save Your Macro

1. Click **Save** in the macro editor
2. Give it a name like "Insert Blue Text"
3. Now you can run it anytime from **Tools → Macros → [Your Macro Name]**

---

### Practice Macros

Try these examples to learn more:

#### Auto-Format Headings

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

#### Find and Highlight Keywords

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

#### Create a Simple Table

```javascript
(function() {
    var oDocument = Api.GetDocument();
    
    // Create a 3x3 table
    var oTable = Api.CreateTable(3, 3);
    
    // Fill first row with headers
    oTable.GetCell(0, 0).GetContent().GetElement(0).AddText("Name");
    oTable.GetCell(0, 1).GetContent().GetElement(0).AddText("Age");
    oTable.GetCell(0, 2).GetContent().GetElement(0).AddText("City");
    
    // Add the table to document
    oDocument.Push(oTable);
})();
```

#### Calculate Statistics from Selection

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

### Next Steps for Macro Development

**📚 Learn More:**
- [Complete macro guide](../macros/writing-macros.md)
- [Custom spreadsheet functions](../macros/adding-custom-functions.md)
- [Debugging macros](../macros/debugging.md)

**🎨 Explore Examples:**
- [Macro samples collection](../samples/macro-samples/macro-samples.md)
- [Converting VBA macros](../macros/converting-vba-macros.md)

---

## 🎯 Clone & Customize Template (Fastest Path)

The quickest way to start is by cloning an existing plugin template and customizing it.

**⏱️ Time:** 10 minutes | **Skill Level:** Beginner to Intermediate

### Step 1: Choose a Template

Browse the official ONLYOFFICE plugin repository for templates:

**🔗 [ONLYOFFICE Plugin Templates](https://github.com/ONLYOFFICE/sdkjs-plugins)**

**Popular starting templates:**
- **Basic Plugin Template** — Minimal structure for custom plugins
- **YouTube Plugin** — Example of embedding external content
- **Translator Plugin** — Example of API integration
- **OCR Plugin** — Example of advanced processing

---

### Step 2: Clone the Repository

```bash
# Clone the entire plugins repository
git clone https://github.com/ONLYOFFICE/sdkjs-plugins.git

# Navigate to a specific plugin
cd sdkjs-plugins/youtube
```

Or download a specific plugin as a ZIP file from GitHub.

---

### Step 3: Customize the Plugin

#### Update `config.json`

Change these essential fields:

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

**Generate a unique GUID:**
- Use an online GUID generator
- Or use Node.js: `node -e "console.log(require('crypto').randomUUID())"`

---

#### Modify the UI (`index.html`)

Update the HTML to match your needs:

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

#### Update Styles (`styles.css` or inline)

Customize the appearance:

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

### Step 4: Test Your Customized Plugin

1. Install the plugin following the [installation guide](#step-3-install-the-plugin)
2. Open ONLYOFFICE and test your changes
3. Use browser DevTools (F12) to debug any issues

---

### Step 5: Add Your Custom Features

Now enhance the template with your specific functionality:

#### Example: Add External API Integration

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

#### Example: Add User Preferences

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

### Step 6: Package and Distribute

Once your plugin is ready:

1. **Test thoroughly** in all supported editors (Word, Cell, Slide)
2. **Create documentation** for users
3. **Package the plugin** (ZIP all files)
4. **Distribute:**
   - Submit to [ONLYOFFICE Marketplace](https://www.onlyoffice.com/app-directory/en)
   - Share on GitHub
   - Deploy privately to your organization

**📚 [Publishing guide →](../tutorials/publishing.md)**

---

### Template Customization Tips

**✅ Best Practices:**
- Always change the GUID to avoid conflicts
- Update version numbers when making changes
- Test in all supported editors
- Keep file sizes reasonable (< 5MB total)
- Use CDN for large libraries

**⚠️ Common Pitfalls:**
- Forgetting to update the GUID (causes conflicts)
- Not testing in all editor types
- Hardcoding URLs (use relative paths)
- Ignoring CORS issues with external APIs

---

## 🎯 What's Next?

After completing these quick starts, you're ready to:

<table>
<tr>
<td width="33%" align="center">

### 📖 Learn More

Deepen your knowledge:

[**API Reference →**](../interacting-with-editors/overview/overview.md)

[**Plugin Structure →**](../structure/configuration/configuration.md)

[**Best Practices →**](../tutorials/developing/for-web-editors/)

</td>
<td width="33%" align="center">

### 🎮 Experiment

Try the interactive tools:

[**Playground →**](playground/)

[**Browse Examples →**](../samples/plugin-samples/plugin-samples.md)

[**UI Components →**](https://onlyoffice.github.io/storybook/static/)

</td>
<td width="33%" align="center">

### 🚀 Build

Start your project:

[**Plugin Tutorial →**](../structure/getting-started.md)

[**Macro Guide →**](../macros/getting-started.md)

[**AI Integration →**](../ai/ai-plugin.md)

</td>
</tr>
</table>

---

## 🆘 Need Help?

- 💬 [Developer Forum](https://forum.onlyoffice.com/) — Community support
- 🐛 [GitHub Issues](https://github.com/ONLYOFFICE/sdkjs-plugins) — Report bugs
- 📖 [Stack Overflow](https://stackoverflow.com/questions/tagged/onlyoffice) — Q&A archive
- 📚 [Documentation](../more-information/faq/) — FAQs and guides

---

<p align="center">
<em>💡 <strong>Pro tip:</strong> Start with the Hello World examples, then clone a template that's close to your use case!</em>
</p>
