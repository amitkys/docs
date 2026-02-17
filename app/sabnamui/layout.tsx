import { sabnamUISource } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { docsOptions } from '@/lib/layout.shared';

// @ts-ignore
export default function Layout({ children }: LayoutProps<'/sabnamUI'>) {
    return (
        <DocsLayout tree={sabnamUISource.getPageTree()} {...docsOptions}>
            {children}
        </DocsLayout>
    );
}