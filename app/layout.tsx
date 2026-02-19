import { RootProvider } from "fumadocs-ui/provider/next";
import Script from "next/script";
import "./global.css";
import { Geist, Geist_Mono } from "next/font/google"; // Import Geist_Mono
import BProgressProviders from "@/components/provider/bprogress";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MY71Z7LWSC"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-MY71Z7LWSC');
        `}
      </Script>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider>
          <BProgressProviders>{children}</BProgressProviders>
        </RootProvider>
      </body>
    </html>
  );
}
