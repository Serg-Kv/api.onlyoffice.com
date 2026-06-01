import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

// SITE_MODE is set in CI (testing/production), NODE_ENV works for local dev
const isDev = process.env.SITE_MODE === 'testing' || process.env.NODE_ENV === 'development';

let keyPath = '';
function sidebarRecursive(item) {
  if (!item.key) {
    item.key = keyPath + item.label;
  }
  
  if (item.type === 'category') {
    const prevPath = keyPath;
    keyPath = (keyPath + item.key) + '.';
    item.items.forEach(sidebarRecursive);
    keyPath = prevPath;
  }
}

const config: Config = {
  title: 'ONLYOFFICE',
  tagline: 'ONLYOFFICE',
  favicon: 'img/favicon.ico',

  url: 'https://api.onlyoffice.com',
  baseUrl: '/',

  trailingSlash: true,

  noIndex: isDev,

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    mermaid: true,
  },

  customFields: {
    documentServer: isDev ? 'https://api.docs.teamlab.info/' : 'https://api.docs.onlyoffice.com/',
    documentServerSecret: isDev ? 'MYSECRET' : 'NsOb2yUBaI9yme0wbkGAapi',
  },

  future: {
    v4: {
      removeLegacyPostBuildHeadAttribute: true
    },
    faster: {
      mdxCrossCompilerCache: true,
      lightningCssMinimizer: true,
      ssgWorkerThreads: true,

      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      rspackBundler: true,
      rspackPersistentCache: true
    }
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'api',
          sidebarPath: './sidebars.ts',
          path: './site',
          routeBasePath: '',

          editUrl: ({docPath}) => {
            const baseUrl = 'https://github.com/ONLYOFFICE/api.onlyoffice.com/tree/master/site';

            // Transform sample paths: samples/{category}/{subcategory}/... → {category}/{subcategory}/samples/...
            if (docPath.startsWith('samples/')) {
              const parts = docPath.split('/');
              if (parts.length >= 4) {
                const [, category, subcategory, ...rest] = parts;
                let filePath = rest.join('/');

                // Reverse rename: {subcategory}.md → samples.md
                if (filePath === `${subcategory}.md`) {
                  filePath = 'samples.md';
                }

                return `${baseUrl}/${category}/${subcategory}/samples/${filePath}`;
              }
            }

            return `${baseUrl}/${docPath}`;
          },

          docItemComponent: '@theme/ApiItem',

          async sidebarItemsGenerator({defaultSidebarItemsGenerator, isCategoryIndex, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator({
              ...args,
              isCategoryIndex(params) {
                // Exclude index.md
                if (params.fileName.toLowerCase() === 'index') {
                  return false;
                }
                return isCategoryIndex(params);
              },
            });
            keyPath = args.item.dirName;
            const visibleItems = sidebarItems.filter(
              item => !(item.type === 'category' && item.customProps?.sidebar_hide)
            );
            visibleItems.forEach(sidebarRecursive);
            return visibleItems;
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        blog: {
          path: 'changelog',
          blogTitle: 'Changelog',
          blogDescription: 'The history of updates and changes to the documentation.',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'Changelog',
          blogSidebarCount: 'ALL',
          routeBasePath: 'changelog',
          showReadingTime: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'openapi',
        docsPluginId: "api",
        config: {
          workspaceBackend: {
            specPath: "openapi/workspace/community-server.yaml",
            outputDir: "site/workspace/api-backend/usage-api",
            sidebarOptions: {
              groupPathsBy: "tagGroup",
            },
          } satisfies OpenApiPlugin.Options,
          workspaceHosted: {
            specPath: "openapi/workspace/hosted-solutions.yaml",
            outputDir: "site/workspace/for-hosting-providers/usage-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
          } satisfies OpenApiPlugin.Options,
          docspaceBackend: {
            specPath: "openapi/docspace/docspace-backend.yaml",
            outputDir: "site/docspace/api-backend/usage-api",
            sidebarOptions: {
              groupPathsBy: "tagGroup",
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'GTM-5NW47TX'
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        createRedirects(existingPath: string) {
          // samples: /docs/macros/samples/... ← /docs/plugin-and-macros/samples/macros/...
          if (existingPath.startsWith('/docs/macros/samples/')) {
            return existingPath.replace('/docs/macros/samples/', '/docs/plugin-and-macros/samples/macros/');
          }
          // samples: /docs/ai/samples/... ← /docs/plugin-and-macros/samples/custom-ai-tools/...
          if (existingPath.startsWith('/docs/ai/samples/')) {
            return existingPath.replace('/docs/ai/samples/', '/docs/plugin-and-macros/samples/custom-ai-tools/');
          }
          // samples: /docs/plugins/samples/... ← /docs/plugin-and-macros/samples/plugins/...
          if (existingPath.startsWith('/docs/plugins/samples/')) {
            return existingPath.replace('/docs/plugins/samples/', '/docs/plugin-and-macros/samples/plugins/');
          }
          // API ref: /docs/plugins/interacting-with-editors/... ← /docs/plugin-and-macros/interacting-with-editors/...
          if (existingPath.startsWith('/docs/plugins/interacting-with-editors/')) {
            return existingPath.replace('/docs/plugins/interacting-with-editors/', '/docs/plugin-and-macros/interacting-with-editors/');
          }
          return undefined;
        },
        redirects: [
          // get-started
          { from: '/docs/plugin-and-macros/get-started/get-started', to: '/docs/plugins/get-started/get-started' },
          { from: '/docs/plugin-and-macros/get-started/playground', to: '/docs/plugins/get-started/playground' },
          { from: '/docs/plugin-and-macros/get-started/quick-start/hello-world-plugin', to: '/docs/plugins/get-started/quick-start/hello-world-plugin' },
          { from: '/docs/plugin-and-macros/get-started/quick-start/hello-world-macro', to: '/docs/macros/get-started/quick-start/hello-world-macro' },
          { from: '/docs/plugin-and-macros/get-started/quick-start/comment-text-ai-tool', to: '/docs/ai/get-started/quick-start/comment-text-ai-tool' },
          // macros
          { from: '/docs/plugin-and-macros/macros/adding-custom-functions', to: '/docs/macros/macros/adding-custom-functions' },
          { from: '/docs/plugin-and-macros/macros/converting-vba-macros', to: '/docs/macros/macros/converting-vba-macros' },
          { from: '/docs/plugin-and-macros/macros/debugging', to: '/docs/macros/macros/debugging' },
          { from: '/docs/plugin-and-macros/macros/getting-started', to: '/docs/macros/macros/getting-started' },
          { from: '/docs/plugin-and-macros/macros/recording-macros', to: '/docs/macros/macros/recording-macros' },
          { from: '/docs/plugin-and-macros/macros/writing-macros', to: '/docs/macros/macros/writing-macros' },
          // more-information (old unified → plugins as canonical)
          { from: '/docs/plugin-and-macros/more-information/changelog', to: '/docs/plugins/more-information/changelog' },
          { from: '/docs/plugin-and-macros/more-information/faq', to: '/docs/plugins/more-information/faq' },
          // structure → fundamentals
          { from: '/docs/plugin-and-macros/structure/configuration/configuration', to: '/docs/plugins/fundamentals/configuration/config-json' },
          { from: '/docs/plugin-and-macros/structure/configuration/types', to: '/docs/plugins/fundamentals/configuration/types' },
          { from: '/docs/plugin-and-macros/structure/configuration/variations', to: '/docs/plugins/fundamentals/configuration/variations' },
          { from: '/docs/plugin-and-macros/structure/entry-point', to: '/docs/plugins/fundamentals/configuration/entry-point' },
          { from: '/docs/plugin-and-macros/structure/getting-started', to: '/docs/plugins/fundamentals/getting-started/what-is-a-plugin' },
          { from: '/docs/plugin-and-macros/structure/localization', to: '/docs/plugins/fundamentals/configuration/localization' },
          // customization
          { from: '/docs/plugin-and-macros/customization/buttons', to: '/docs/plugins/customization/custom-buttons' },
          { from: '/docs/plugin-and-macros/customization/content-control-buttons', to: '/docs/plugins/customization/content-control-buttons' },
          { from: '/docs/plugin-and-macros/customization/context-menu', to: '/docs/plugins/customization/context-menu' },
          { from: '/docs/plugin-and-macros/customization/icons', to: '/docs/plugins/fundamentals/configuration/icons-and-branding' },
          { from: '/docs/plugin-and-macros/customization/input-helper', to: '/docs/plugins/customization/input-helper' },
          { from: '/docs/plugin-and-macros/customization/styles', to: '/docs/plugins/fundamentals/configuration/styles-and-theming' },
          { from: '/docs/plugin-and-macros/customization/toolbar', to: '/docs/plugins/customization/toolbar' },
          { from: '/docs/plugin-and-macros/customization/windows-and-panels', to: '/docs/plugins/customization/windows-and-panels' },
          // tutorials → development-workflow
          { from: '/docs/plugin-and-macros/tutorials/debugging/for-desktop-editors', to: '/docs/plugins/development-workflow/debugging/browser-devtools-guide' },
          { from: '/docs/plugin-and-macros/tutorials/debugging/for-web-editors', to: '/docs/plugins/development-workflow/debugging/browser-devtools-guide' },
          { from: '/docs/plugin-and-macros/tutorials/developing/for-desktop-editors', to: '/docs/plugins/development-workflow/developing/for-desktop-editors' },
          { from: '/docs/plugin-and-macros/tutorials/developing/for-web-editors', to: '/docs/plugins/development-workflow/developing/for-web-editors' },
          { from: '/docs/plugin-and-macros/tutorials/installing/onlyoffice-cloud', to: '/docs/plugins/development-workflow/installing-and-testing/cloud-saas-installation' },
          { from: '/docs/plugin-and-macros/tutorials/installing/onlyoffice-desktop-editors', to: '/docs/plugins/development-workflow/installing-and-testing/desktop-editors-installation' },
          { from: '/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises', to: '/docs/plugins/development-workflow/installing-and-testing/docs-on-premises-installation' },
          { from: '/docs/plugin-and-macros/tutorials/publishing', to: '/docs/plugins/development-workflow/publishing/marketplace-submission' },
          // ai
          { from: '/docs/plugin-and-macros/ai/ai-agent', to: '/docs/ai/ai/ai-agent' },
          { from: '/docs/plugin-and-macros/ai/ai-plugin', to: '/docs/ai/ai/ai-plugin' },
          { from: '/docs/plugin-and-macros/ai/configuring-ollama-with-cors', to: '/docs/ai/ai/configuring-ollama-with-cors' },
          { from: '/docs/plugin-and-macros/ai/converting-vba-macros', to: '/docs/ai/ai/converting-vba-macros' },
          { from: '/docs/plugin-and-macros/ai/custom-ai-tools', to: '/docs/ai/ai/custom-ai-tools' },
          { from: '/docs/plugin-and-macros/ai/custom-providers', to: '/docs/ai/ai/custom-providers' },
          { from: '/docs/plugin-and-macros/ai/text-annotations-guide', to: '/docs/ai/ai/text-annotations-guide' },
        ],
      },
    ],
  ],

  themeConfig: {
    image: 'img/favicon.png',
    colorMode: {
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      content: `<a target="_blank" href="https://www.onlyoffice.com/blog/2026/02/onlyoffice-docs-9-3"><b>ONLYOFFICE Docs 9.3 released</b></a>: enhanced PDF Editor and more signature options, multipage view for documents, Solver in sheets, GIF playback in presentation slideshow mode, AI-powered updates, and more.`,
      textColor: '#091E42',
      isCloseable: true,
    },
    navbar: {
      logo: {
        alt: 'ONLYOFFICE',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Docs',
          position: 'left',
          to: 'docs',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'docsDocs',
              label: 'Docs API',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsOffice',
              label: 'Office API',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsPlugins',
              label: 'Plugins',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsMacros',
              label: 'Macros',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsAI',
              label: 'AI',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsBuilder',
              label: 'Document Builder',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docsDesktop',
              label: 'Desktop Editors',
              docsPluginId: 'api',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Docspace',
          position: 'left',
          to: 'docspace',
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'docspaceApiBackend',
                label: 'API Reference',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docspaceJSSdk',
                label: 'Embed SDK',
              docsPluginId: 'api',
            },
            {
              type: 'docSidebar',
              sidebarId: 'docspacePlugins',
              label: 'Plugins SDK',
              docsPluginId: 'api',
             },
             {
               type: 'docSidebar',
               sidebarId: 'docspaceMCPServer',
               label: 'MCP Server',
               docsPluginId: 'api',
             },
          ],
        },
        {
          to: 'samples',
          label: 'Samples',
          position: 'left',
        },
        {
          to: 'changelog',
          label: 'Changelog',
          position: 'left'
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/ONLYOFFICE',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Get information',
          items: [
            {
              label: 'Blog for developers',
              href: 'https://www.onlyoffice.com/blog/category/for-developers?from=api',
            },
            {
              label: 'For contributors',
              href: 'https://www.onlyoffice.com/contribute.aspx?from=api',
            },
            {
              label: 'Legal notice',
              href: 'https://www.onlyoffice.com/legalterms.aspx?from=api',
            },
            {
              label: 'Legacy version',
              href: 'https://legacy-api.onlyoffice.com/',
            },
          ],
        },
        {
          title: 'Get help',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.onlyoffice.com/',
            },
            {
              label: 'Code on GitHub',
              href: 'https://github.com/ONLYOFFICE/',
            },
            {
              label: 'Installation guides',
              href: 'https://helpcenter.onlyoffice.com/installation/docs-developer-index.aspx?from=api',
            },
            {
              label: 'Support contact form',
              href: 'https://www.onlyoffice.com/support-contact-form.aspx?from=api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/onlyoffice',
            },
            {
              label: 'X',
              href: 'https://x.com/only_office',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ascensio System SIA. All right reserved`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ["bash", "php", "csharp", "java", "ruby"],
    },
    algolia: {
      appId: '59O6KESY1Y',
      apiKey: 'b7dbab0357490826b892aeb2aad32810',

      indexName: 'api-onlyoffice',
      contextualSearch: true,

      askAi: 'SWpvi77fTWXN'
    },
    languageTabs: [
      {
        highlight: "bash",
        language: "curl",
        logoClass: "curl",
      },
      {
        highlight: "python",
        language: "python",
        logoClass: "python",
      },
      {
        highlight: "javascript",
        language: "javascript",
        logoClass: "javascript",
      },
      {
        highlight: "php",
        language: "php",
        logoClass: "php",
      },
      {
        highlight: "csharp",
        language: "csharp",
        logoClass: "csharp",
      },
      {
        highlight: "java",
        language: "java",
        logoClass: "java",
        variant: "unirest",
      },
    ],
  } satisfies Preset.ThemeConfig,

  themes: ["docusaurus-theme-openapi-docs", "@docusaurus/theme-mermaid"],
};

export default config;
