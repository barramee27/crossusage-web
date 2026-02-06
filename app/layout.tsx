import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OpenUsage — Track AI Coding Tool Usage in One Place",
  description:
    "A menu bar app that aggregates usage from Cursor, Claude Code, Codex, and more. Open source, plugin-based, built with Tauri.",
  openGraph: {
    title: "OpenUsage — Track AI Coding Tool Usage in One Place",
    description:
      "A menu bar app that aggregates usage from Cursor, Claude Code, Codex, and more.",
    type: "website",
    url: "https://openusage.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenUsage — Track AI Coding Tool Usage in One Place",
    description:
      "A menu bar app that aggregates usage from Cursor, Claude Code, Codex, and more.",
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
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
