import {
  LayoutGrid,
  Monitor,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkReleasesLatest } from "@/lib/site";

const highlights = [
  {
    icon: Sparkles,
    title: "Gemini Apps",
    body: "Current and Weekly from gemini.google.com via Chrome cookies or GEMINI_COOKIE. Off by default. Not Antigravity / Gemini CLI quota.",
    badge: "1.5.0",
  },
  {
    icon: Monitor,
    title: "Tray readout & Linux UI",
    body: "Logo+%, fill, pie, and all-logos open a readout picker. Classic vs Modern logos stay in sync. Linux topbar/tray text no longer clips.",
    badge: "1.4.4",
  },
  {
    icon: TrendingUp,
    title: "Grok Bot & Antigravity spend",
    body: "Cursor Grok Bot weekly allowance, Grok session spend from ledgers, and Antigravity Today / Yesterday / 30-day local spend.",
    badge: "1.4.3",
  },
  {
    icon: Workflow,
    title: "OpenUsage v0.7.8–v0.7.12",
    body: "Pricing supplement through 2026-09-11, Codex Business Premium, Claude live plan badge, Devin weekly remaining, Reduce animations, quieter Modern dashboard.",
    badge: "1.4.1–1.5.0",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted credentials",
    body: "provider_accounts.json is AES-256-GCM at rest. Master key lives in your OS keychain / credential manager.",
    badge: "CrossUsage",
  },
  {
    icon: LayoutGrid,
    title: "Classic & Modern",
    body: "Two layouts, same providers. Modern is the 0.7-style grouped dashboard; Classic stays for anyone who prefers it.",
    badge: "Both",
  },
] as const;

export function WhatsNewSection({ version }: { version: string | null }) {
  const label = version ? `v${version}` : "latest";

  return (
    <section id="whats-new" className="relative z-[1] scroll-mt-24 border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Release · {label}</Eyebrow>
            <h2 className="font-display mt-4 max-w-[18ch] text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              What&apos;s new in {label}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--page-fg-muted)]">
              CrossUsage{" "}
              <strong className="font-semibold text-[var(--page-fg)]">1.5.0</strong> — Gemini Apps,
              OpenUsage v0.7.8–v0.7.12, and the 1.4.x tray/UI catch-up. Still multi-account +
              encrypted credentials on Linux &amp; Windows.
            </p>
          </div>
          <a
            href={forkReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary shrink-0 !py-2.5 text-sm"
          >
            GitHub releases
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body, badge }) => (
            <div key={title} className="surface-panel lift-card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--page-accent-soft)] text-[var(--page-accent-ink)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="rounded-full bg-[var(--page-stripe)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--page-fg-dim)]">
                  {badge}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--page-fg)]">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--page-fg-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
