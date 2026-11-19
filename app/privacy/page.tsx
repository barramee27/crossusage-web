import type { Metadata } from "next";
import { EyeOff, Globe, HardDrive, Vote } from "lucide-react";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How CrossUsage and crossusage.dev handle your data — local-first usage storage, AES-256-GCM encrypted credentials, anonymous product polls, and zero tracking cookies.",
  openGraph: {
    title: "Privacy — CrossUsage",
    description: "Privacy practices for the CrossUsage desktop app and crossusage.dev.",
  },
};

const SECTIONS = [
  {
    icon: HardDrive,
    tag: "LOCAL STORAGE & CREDENTIALS",
    title: "Your tokens and usage stay on your machine",
    body: "CrossUsage probes provider quotas directly from your machine to each AI provider's official endpoint. Usage history (when enabled) is written strictly to a local SQLite database on disk. Extra multi-account credentials in provider_accounts.json are encrypted at rest with AES-256-GCM backed by your OS keychain (libsecret / Windows Credential Manager).",
  },
  {
    icon: EyeOff,
    tag: "APP TELEMETRY",
    title: "Minimal, transparent, and controllable",
    body: "CrossUsage never uploads your API keys, prompts, file paths, account emails, or provider spend ledgers to us. Any optional anonymous launch ping can be inspected in source code and disabled in Settings.",
  },
  {
    icon: Vote,
    tag: "COMMUNITY PRODUCT POLLS",
    title: "Opt-out polls with zero identity data",
    body: "CrossUsage occasionally fetches product governance questions from crossusage.dev/api/polls (toggleable anytime under Settings → Product Polls). A vote request is sent only if you explicitly click an option, containing solely the poll ID, option ID, and a random local install UUID.",
  },
  {
    icon: Globe,
    tag: "THIS WEBSITE (CROSSUSAGE.DEV)",
    title: "Static HTML, cookieless self-hosted analytics",
    body: "This marketing site compiles to static HTML/CSS/JS with zero tracking cookies or third-party ad pixels. We run a self-hosted, cookieless Umami instance to count anonymous pageviews and download clicks (no personal data or cross-site tracking). Standard web server access logs may also be transiently processed on our hosting VM for security and uptime.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <DocPage
      title="Privacy Policy"
      kicker="PRIVACY"
      subtitle="Plain-English summary of how CrossUsage and crossusage.dev treat your data. Every line in the app is open source and auditable on GitHub."
    >
      <div className="space-y-4">
        {SECTIONS.map(({ icon: Icon, tag, title, body }) => (
          <section
            key={tag}
            className="rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] sm:p-7"
          >
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--signal)]">
              <Icon className="size-4" aria-hidden />
              <span>{tag}</span>
            </div>
            <h2 className="mt-2.5 text-lg font-extrabold text-[var(--ink)]">
              {title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {body}
            </p>
          </section>
        ))}
      </div>
    </DocPage>
  );
}
