import { sabnamUISource } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';


interface PageProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function Page(props: PageProps) {
    const params = await props.params as { slug?: string[] };
    const page = sabnamUISource.getPage(params.slug);
    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            {page.data.title && <DocsTitle>{page.data.title}</DocsTitle>}
            {page.data.description && <DocsDescription className="mb-0">{page.data.description}</DocsDescription>}
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        // this allows you to link to other pages with relative file paths
                        a: createRelativeLink(sabnamUISource, page as any),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return sabnamUISource.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params as { slug?: string[] };
    const page = sabnamUISource.getPage(params.slug);
    if (!page) notFound();

    const segments = [...page.slugs, 'image.png'];
    const imageUrl = `/og/sabnamui/${segments.join('/')}`;

    return {
        title: page.data.title || 'SabnamUI Documentation',
        description: page.data.description || 'SabnamUI component documentation',
        openGraph: {
            images: imageUrl,
        },
    };
}

