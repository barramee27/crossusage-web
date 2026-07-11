import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope, Syne } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SkipToContent } from "@/components/skip-to-content";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const defaultTitle = "CrossUsage — AI usage tracker for Linux & Windows";
const description =
  "Track Cursor, Claude, Codex, Copilot, OpenRouter, and 25+ providers from your tray. Multi-account for every provider, Classic or Modern UI, encrypted credentials. Fork of OpenUsage — ports 0.7.2 + 0.7.3.";
const ogImageUrl = "/og-crossusage.png?v=2";

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
        width: 1536,
        height: 1024,
        alt: "CrossUsage — AI quotas for Linux & Windows, fork of OpenUsage 1.3.1",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${manrope.variable} ${ibmPlexMono.variable} font-sans antialiased text-[var(--page-fg)]`}
      >
        <div className="page-atmosphere" aria-hidden />
        <div className="relative z-[1] flex min-h-screen flex-col">
          <SkipToContent />
          <MarketingShell>
            <SiteHeader />
            <main
              id="main-content"
              tabIndex={-1}
              className="relative z-[1] flex-1 outline-none focus-visible:ring-2 focus-visible:ring-[var(--page-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
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
