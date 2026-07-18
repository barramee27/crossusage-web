import { KeyRound, LayoutGrid, LineChart, PieChart, ShieldCheck, Users } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkReleasesLatest } from "@/lib/site";

const highlights = [
  {
    icon: PieChart,
    title: "Total Spend ring",
    body: "Cross-provider spend sectors with Cost / Cost·MTok / Tokens — see where money goes at a glance.",
    badge: "1.3.2+",
  },
  {
    icon: LineChart,
    title: "Accurate Codex & Claude spend",
    body: "Subagent replay dedup, session-log fast tier, 272k long-context pricing, and pi agent fold-in so tiles match reality.",
    badge: "1.3.3",
  },
  {
    icon: Users,
    title: "Multi-account everywhere",
    body: "Add personal + work rows for every provider — Cursor, OpenRouter, Claude, and the rest. Each account probes independently.",
    badge: "CrossUsage",
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
  {
    icon: KeyRound,
    title: "Local HTTP API",
    body: "JSON on 127.0.0.1:6736 — /v1/usage, /v1/insights, history endpoints. Loopback only.",
    badge: "CrossUsage",
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
              Ports OpenUsage through{" "}
              <strong className="font-semibold text-[var(--page-fg)]">v0.7.6</strong> to Linux &amp;
              Windows — Total Spend, Codex claim resets, spend-accuracy fixes, Cursor Enterprise
              meters, plus CrossUsage multi-account and encrypted credentials.
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
