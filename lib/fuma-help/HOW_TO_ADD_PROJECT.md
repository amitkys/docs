# How to Add a New Project

Follow these steps to add a new documentation project (e.g., "Chat App") to the codebase.

## 1. Define the Content Collection

Open `source.config.ts` and add a new collection definition.

```typescript
// source.config.ts
export const chatApp = defineDocs({
  dir: 'content/chat-app', // Folder name in content/ directory
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});
```

## 2. Create the Source Loader

Open `lib/source.ts` and export a new loader.

```typescript
// lib/source.ts
import { chatApp } from 'fumadocs-mdx:collections/server';

export const chatAppSource = loader({
  baseUrl: '/chat-app', // URL prefix
  source: chatApp.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});
```

## 3. Create the Route Configuration

Create a new directory in `app/` matching your baseUrl (e.g., `app/chat-app`). You need two files:

### Layout (`app/chat-app/layout.tsx`)

```tsx
import { chatAppSource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/chat-app'>) {
  return (
    <DocsLayout tree={chatAppSource.getPageTree()} {...docsOptions}>
      {children}
    </DocsLayout>
  );
}
```

### Page (`app/chat-app/[[...slug]]/page.tsx`)

Copy `app/sabnamAI/[[...slug]]/page.tsx` and update:
1. The source import (`chatAppSource`).
2. The `PageProps` generic type.
3. The `githubUrl` if strictly mapped to a specific folder.

## 4. Update the Sidebar Dropdown

Open `lib/layout.shared.tsx` and add an entry to `docsOptions.sidebar.tabs`.

```typescript
// lib/layout.shared.tsx
{
  title: 'Chat App',
  url: '/chat-app',
  icon: <MessageCircle className="size-4" />,
  description: 'Chat documentation',
},
```

## 5. Add Content

Create the folder `content/chat-app` and add your `index.mdx` and `meta.json` files.

......................................
// additional,
go to this link: https://fumadocs.dev/docs/headless/page-conventions#pages (for setup text in sidebar)
