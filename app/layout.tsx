import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { SkipToContent } from "@/components/skip-to-content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const defaultTitle =
  "CrossUsage — AI limits tracker for Cursor, Claude Code, Codex, and more";
const description =
  "Track AI coding limits on Linux and Windows—CrossUsage shows Cursor, Claude, Codex, and more from your system tray or panel. Free, open source, MIT licensed.";

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
    images: [
      {
        url: "/hero-crossusage.png",
        width: 320,
        height: 463,
        alt: "CrossUsage usage panel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    images: ["/hero-crossusage.png"],
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased text-[var(--page-fg)]`}
      >
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
