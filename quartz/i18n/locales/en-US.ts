import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "untitled",
    description: "no description provided",
    title: "untitled",
    description: "no description provided",
  },
  components: {
    callout: {
      note: "note",
      abstract: "abstract",
      info: "info",
      todo: "todo",
      tip: "tip",
      success: "success",
      question: "question",
      warning: "warning",
      failure: "failure",
      danger: "danger",
      bug: "bug",
      example: "example",
      quote: "quote",
      note: "note",
      abstract: "abstract",
      info: "info",
      todo: "todo",
      tip: "tip",
      success: "success",
      question: "question",
      warning: "warning",
      failure: "failure",
      danger: "danger",
      bug: "bug",
      example: "example",
      quote: "quote",
    },
    backlinks: {
      title: "backlinks",
      noBacklinksFound: "no backlinks found",
      title: "backlinks",
      noBacklinksFound: "no backlinks found",
    },
    themeToggle: {
      lightMode: "light mode",
      darkMode: "dark mode",
    },
    readerMode: {
      title: "reader mode",
    },
    explorer: {
      title: "explorer",
      title: "explorer",
    },
    footer: {
      createdWith: "built with",
      createdWith: "built with",
    },
    graph: {
      title: "graph view",
      title: "graph view",
    },
    recentNotes: {
      title: "recent notes",
      seeRemainingMore: ({ remaining }) => `see ${remaining} more →`,
      title: "recent notes",
      seeRemainingMore: ({ remaining }) => `see ${remaining} more →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclude of ${targetSlug}`,
      linkToOriginal: "link to original",
      linkToOriginal: "link to original",
    },
    search: {
      title: "search",
      searchBarPlaceholder: "search for something",
      title: "search",
      searchBarPlaceholder: "search for something",
    },
    tableOfContents: {
      title: "table of contents",
      title: "table of contents",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min read`,
    },
  },
  pages: {
    rss: {
      recentNotes: "recent notes",
      lastFewNotes: ({ count }) => `last ${count} notes`,
      recentNotes: "recent notes",
      lastFewNotes: ({ count }) => `last ${count} notes`,
    },
    error: {
      title: "not found",
      notFound: "either this page is private or doesn't exist.",
    },
    folderContent: {
      folder: "folder",
      folder: "folder",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item under this folder." : `${count} items under this folder.`,
    },
    tagContent: {
      tag: "tag",
      tagIndex: "tag index",
      tag: "tag",
      tagIndex: "tag index",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `showing first ${count} tags.`,
      totalTags: ({ count }) => `found ${count} total tags.`,
      showingFirst: ({ count }) => `showing first ${count} tags.`,
      totalTags: ({ count }) => `found ${count} total tags.`,
    },
  },
} as const satisfies Translation
