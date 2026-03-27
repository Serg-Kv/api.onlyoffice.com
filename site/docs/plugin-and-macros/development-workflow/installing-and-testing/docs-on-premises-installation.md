---
sidebar_position: -2
---

# Docs (on-premises) installation

## Quick setup with Docker

```bash
docker run -i -t -d -p 80:80 --restart=always onlyoffice/documentserver
```

Access the editor at `http://localhost`. An integration test page is available at `http://localhost/example`.

## Adding a plugin

1. Open a document from the example page at `http://localhost/example`.
2. Go to **Plugins → Plugin Manager → Add plugin from URL**.
3. Enter the URL to your plugin's `config.json`.

:::note
The `config.json` URL must be reachable from the server. For local development, use a tunneling tool such as `ngrok` or serve from a machine on the same network.
:::

## Organization-wide deployment

Administrators can deploy plugins for all users through the ONLYOFFICE Docs admin panel:

1. Open the admin panel.
2. Go to **Plugins** settings.
3. Add the plugin's `config.json` path.
4. Save — the plugin becomes available to all users.

## Additional resources

- [Docker Hub — onlyoffice/documentserver](https://hub.docker.com/r/onlyoffice/documentserver/)
- [For web editors](../developing/for-web-editors.md) — Development workflow
- [Test environment setup](./test-environment-setup.md)
