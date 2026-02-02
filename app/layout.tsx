import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Geist } from 'next/font/google';
import BProgressProviders from '@/components/provider/bprogress';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={` ${geist.className}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <BProgressProviders>{children}</BProgressProviders>
        </RootProvider>
      </body>
    </html>
  );
}
