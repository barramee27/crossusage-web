import type { Metadata } from "next";
import Script from "next/script";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import { getLatestVersion, siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SkipToContent } from "@/components/skip-to-content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono-jb",
  display: "swap",
});

const defaultTitle = "CrossUsage — Native AI Quota & Spend Instrument for Linux & Windows";
const description =
  "One native system-tray instrument for Cursor, Claude, Codex, Copilot, Gemini Apps, OpenRouter, and 28+ AI providers. Zero-config local discovery, multi-account vaults, Classic & Modern UI, loopback HTTP API.";
const ogImageUrl = "/og-crossusage.png?v=4";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s · CrossUsage",
  },
  description,
  openGraph: {
    title: defaultTitle,
    description,
    type: "website",
    url: siteUrl,
    siteName: "CrossUsage",
    images: [
      {
        url: ogImageUrl,
        width: 1980,
        height: 960,
        alt: "CrossUsage — Native AI quota & spend instrument for Linux & Windows",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: [ogImageUrl],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const version = await getLatestVersion();

  return (
    <html lang="en">
      <head>
        <Script
          defer
          src="https://analytics.alaikubota.com/script.js"
          data-website-id="2c6e73a6-46f1-45c0-9d39-4519c0c53cc1"
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="paper-grain" aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col">
          <SkipToContent />
          <MarketingShell>
            <SiteHeader version={version} />
            <main
              id="main-content"
              tabIndex={-1}
              className="relative z-[1] flex-1 outline-none"
            >
              {children}
            </main>
            <SiteFooter />
          </MarketingShell>
        </div>
      </body>
    </html>
  );
}
