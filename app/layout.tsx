import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistPixelCircle } from "geist/font/pixel";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const title =
  "OpenUsage - AI Limits Tracker for Cursor, Claude Code, Codex and more";
const description =
  "Never hit your AI limits by surprise. Know exactly where you stand without ever leaving your AI coding tool. Track Cursor, Claude Code, Codex, Copilot and more. Free and open source.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://openusage.dev",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
        className={`${GeistSans.variable} ${GeistPixelCircle.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
