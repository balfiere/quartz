import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "kwaamfan's notes",
    pageTitleSuffix: "",
    enableSPA: false,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "kwaamfan.neocities.org/notes",
    ignorePatterns: ["**/private", "templates", ".obsidian", "*.base"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "DM Serif Display",
        body: "IBM Plex Sans Thai",
        code: "Space Mono",
      },
      colors: {
        lightMode: {
          light: "#fbf8f5;",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#161618",
          secondary: "#44a464ff",
          tertiary: "#7962b9ff",
          quaternary: "#31a1b5ff",
          highlight: "rgba(173, 173, 173, 0.25)",
          textHighlight: "#6b42267a",
        },
        darkMode: {
          light: "#1a1918",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#54a06dff",
          tertiary: "#7862b3ff",
          quaternary: "#5fa7b4ff",
          highlight: "rgba(173, 173, 173, 0.25)",
          textHighlight: "#6b4226ae",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "rose-pine-dawn",
          dark: "rose-pine-moon",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true }),
      // Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      // Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.ExplicitPublish(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,y
        enableRSS: false,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      // Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
