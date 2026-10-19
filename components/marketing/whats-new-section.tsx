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
    icon: Workflow,
    title: "OpenUsage v0.7.13–v0.7.15",
    body: "Cursor paged usage-events history cache, Ollama /api/balance dollar allowance + Purchased Credits, Claude Rate Limit Resets hourly cache, Codex Pro 100/200/500 & auto-review $0 pricing.",
    badge: "1.6.1",
  },
  {
    icon: Sparkles,
    title: "Base account labels & slim builds",
    body: "Rename default provider rows in Settings → Providers without extra accounts. Stripped release binaries, thin LTO, and lazy-loaded UI views.",
    badge: "1.6.0–1.6.1",
  },
  {
    icon: Monitor,
    title: "Gemini Apps & Tray readout",
    body: "Current and Weekly from gemini.google.com via Chrome cookies. Logo+%, fill, pie, and all-logos readout picker with synced Classic/Modern icons.",
    badge: "1.4.4–1.5.0",
  },
  {
    icon: TrendingUp,
    title: "Grok Bot & Antigravity spend",
    body: "Cursor Grok Bot weekly allowance, Grok session spend from ledgers, and Antigravity Today / Yesterday / 30-day local spend.",
    badge: "1.4.3",
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
              <strong className="font-semibold text-[var(--page-fg)]">1.6.1</strong> — OpenUsage
              v0.7.13–v0.7.15 ports, base account display labels, Cursor paged usage-events history,
              Ollama balance credits, and smaller/faster native Linux &amp; Windows builds.
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
