import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "OpenUsage — Know Exactly How Much AI Quota You Have Left",
  description:
    "Never run out of AI quota by surprise. OpenUsage shows your Cursor, Claude, Codex, and Copilot limits in the macOS menu bar. Free and open source.",
  openGraph: {
    title: "OpenUsage — Know Exactly How Much AI Quota You Have Left",
    description:
      "Never run out of AI quota by surprise. OpenUsage shows your Cursor, Claude, Codex, and Copilot limits in the macOS menu bar.",
    type: "website",
    url: "https://openusage.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenUsage — Know Exactly How Much AI Quota You Have Left",
    description:
      "Never run out of AI quota by surprise. OpenUsage shows your Cursor, Claude, Codex, and Copilot limits in the macOS menu bar.",
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
        <Analytics />
      </body>
    </html>
  );
}
