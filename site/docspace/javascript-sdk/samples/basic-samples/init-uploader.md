---
description: Initialize the DocSpace uploader using the JS SDK.
tags: ["DocSpace", "Embed SDK", "Integration"]
---

# Initialize uploader

This example demonstrates how to initialize the DocSpace uploader using the Embed SDK.

## Before you start

Please make sure you are using a server environment to run the HTML file because the Embed SDK must be launched on the server.
You need to [add the URL](/docspace/javascript-sdk/get-started/authentication-security.md#registering-allowed-embed-origins) of your server's root directory to the **Developer Tools** section of DocSpace.

<details>
  <summary>Full example</summary>

``` html
<!-- Step 1: HTML Setup -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Init Uploader</title>

    <!-- Replace with your actual portal URL -->
    <script src="{PORTAL_SRC}/static/scripts/sdk/2.2.0/api.js"></script>
  </head>

  <body>
    <!-- SDK iframe -->
    <iframe id="ds-frame"></iframe>
  </body>

  <!-- Step 2: Embed SDK Logic -->
  <script>
    function onAppReady() {
      const frame = DocSpace.SDK.frames["ds-frame"];
      console.log(frame);
    }

    function onUploadProgress(progress) {
      console.log("Progress:", progress);
    }

    function onUploadSuccess(file) {
      console.log("Uploaded:", file[0].response.title);
    }

    function onUploadError(error) {
      console.error("Upload failed:", error);
    }

    const config = {
      frameId: "ds-frame",
      src: "{PORTAL_SRC}",
      id: "{TARGET_FOLDER_ID}",
      width: "100%",
      height: "700px",
      events: {
        onAppReady,
        onUploadProgress,
        onUploadSuccess,
        onUploadError,
      },
    };

    const docSpace = DocSpace.SDK.initUploader(config);
  </script>
</html>
```

</details>

## Step 1. Set HTML structure

Create an HTML page with a frame element that will load the DocSpace uploader.

``` html
<!-- Step 1: HTML Setup -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Init Uploader</title>

    <!-- Replace with your actual portal URL -->
    <script src="{PORTAL_SRC}/static/scripts/sdk/2.2.0/api.js"></script>
  </head>

  <body>
    <!-- SDK iframe -->
    <iframe id="ds-frame"></iframe>
  </body>
</html>
```

:::info
The API JavaScript file can normally be found in the following DocSpace folder: **\{PORTAL_SRC\}/static/scripts/sdk/2.2.0/api.js** where **\{PORTAL_SRC\}** is the name of the server with the ONLYOFFICE DocSpace installed.
:::

## Step 2. Embed SDK logic

Configure and initialize the uploader using the `initUploader()` method. Pass the `id` of the target folder, and attach `onUploadProgress`, `onUploadSuccess`, and `onUploadError` to track each upload. For the full set of configuration options, see [Uploader mode](/docspace/javascript-sdk/embedding-modes/uploader-mode.md).

``` ts
function onAppReady() {
  const frame = DocSpace.SDK.frames["ds-frame"];
  console.log(frame);
}

function onUploadProgress(progress) {
  console.log("Progress:", progress);
}

function onUploadSuccess(file) {
  console.log("Uploaded:", file[0].response.title);
}

function onUploadError(error) {
  console.error("Upload failed:", error);
}

const config = {
  frameId: "ds-frame",
  src: "{PORTAL_SRC}",
  id: "{TARGET_FOLDER_ID}",
  width: "100%",
  height: "700px",
  events: {
    onAppReady,
    onUploadProgress,
    onUploadSuccess,
    onUploadError,
  },
};

const docSpace = DocSpace.SDK.initUploader(config);
```
