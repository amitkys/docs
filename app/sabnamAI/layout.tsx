import { sabnamAISource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';

// @ts-ignore
export default function Layout({ children }: LayoutProps<'/sabnamAI'>) {
  return (
    <DocsLayout tree={sabnamAISource.getPageTree()} {...docsOptions}>
      {children}
    </DocsLayout>
  );
}
