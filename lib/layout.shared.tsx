import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { Book, Sparkles } from 'lucide-react';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: 'Amitkys',
  },
};

export const docsOptions: Omit<DocsLayoutProps, 'tree'> = {
  ...baseOptions,
  sidebar: {
    tabs: [
      {
        title: 'Documentation',
        url: '/docs',
        icon: <Book className="size-4" />,
        description: 'Main documentation',
      },
      {
        title: 'Sabnam AI',
        url: '/sabnamAI',
        icon: <Sparkles className="size-4" />,
        description: 'AI Project',
      },
    ],
  },
};
