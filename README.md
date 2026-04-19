# 🚀 Visual Dev Editor (Standalone)

> **⚠️ NON - COMMERCIAL USE ONLY:** This is an open-source project intended for the developer community. It is free to use, but the software itself (or any modified version) **cannot be sold commercially**.

A lightweight, zero-dependency visual HTML editor designed for **Local Development**. It allows you to "wrap" any HTML project with a visual interface to rapidly edit text, images, and links without digging into the code.

## 🎯 Primary Use Cases

1.  **Agency Template Speed-Run:** Stop hunting through lines of hardcoded HTML to change client logos or headlines. Use the **Assets Manager** to swap all images and links in seconds.
2.  **The "Messy CMS" Fixer:** Marketers often get broken or structureless HTML from Rich Text Editors. Paste that code here to fix the structure visually and export clean, production-ready HTML.
3.  **Local Landing Page Tweaking:** Perfect for developers who want to adjust spacing and content on a static site while seeing the results live, then syncing those changes back to their local files.

## ✨ Features

- **🌳 Collapsible Tree Explorer:** Navigate complex DOM structures with an expandable/collapsible tree view.
- **🖼️ Global Assets Manager:** One-click access to every image and link in your document for bulk updates.
- **✍️ Inline Text Editing:** Double-click any text to edit it directly.
- **🪄 Floating Format Bar:** Select text to Bold, Italicize, or Underline instantly.
- **📥 Clean Export:** Generates lean HTML with no editor-specific junk, IDs, or classes.

---

## 🛠️ How to Use (Local Development)

### Option 1: The "Cover" Method (Recommended)
This method "covers" your existing local project with the editor so you can edit the file directly.

1.  Add this script to your local HTML file:
    ```html
    <script src="https://yourdomain.com/editor.js"></script>
    ```
2.  Open your file in a browser (e.g., `localhost:5500` or `127.0.0.1`).
3.  Click the **✏️ Edit Page** button in the bottom-right corner.
4.  Make your changes and click **Export** or **Copy Code** to update your local file.

### Option 2: The "Paste" Method
1.  Open the editor directly in your browser.
2.  Paste your HTML and CSS into the startup screen.
3.  Hit **Start Editing**.

---

## 🌐 Self-Hosting Guide

If you want to host this tool on your own server (e.g., `yoursite.com/editor/`) and use it for your team's projects:

### 1. Upload the Files
Upload the following files from this repository to a folder on your server:
- `standalone-editor/index.html` (The Editor UI)
- `standalone-editor/editor.js` (The Loader Script)

**Note:** Ensure both files are in the same folder so the script can find the editor.

### 2. Update your Projects
Change the script source in your project files to point to **your own server**:
```html
<script src="https://yourdomain.com/editor.js"></script>
```

### 3. (Optional) Custom Configuration
You can customize the editor's behavior by adding this config before the script tag:
```html
<script>
  window.VisualEditorConfig = {
    buttonPosition: { bottom: '30px', right: '30px' },
    buttonText: 'Visual Edit'
  };
</script>
<script src="https://yourdomain.com/editor/editor.js"></script>
```

---

## ⚠️ Safety First
- **Development Only:** This tool is designed for **local development environments**.
- **No Direct Server Writes:** For security, the editor does not directly modify files on your server. It provides you with clean code to save manually.
- **Cleanup:** Always remove the `<script>` tag before deploying your project to a live production environment.

## 📜 License & Usage
This project is Open Source and provided for free. You are free to use, modify, and distribute it.

**Strictly Prohibited:** You may **NOT** sell this software, its source code, or any modified versions of it commercially. It must remain free for everyone.
