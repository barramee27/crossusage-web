import {
  Bell,
  KeyRound,
  LayoutGrid,
  MessageSquareText,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkReleasesLatest } from "@/lib/site";

const highlights = [
  {
    icon: MessageSquareText,
    title: "Product polls",
    body: "Optional in-app questions from crossusage.dev — Polls page, soft badge, Settings toggle (on by default). Vote only leaves when you tap.",
    badge: "1.4.0",
  },
  {
    icon: SlidersHorizontal,
    title: "Limits API & CLI",
    body: "GET /v1/limits (+ /:providerId) and crossusage-cli limits emit crossusage.limits.v1 — used / limit / remaining / utilization.",
    badge: "1.4.0",
  },
  {
    icon: KeyRound,
    title: "Windows Antigravity CLI",
    body: "Keyring read/write fixed for agy (UTF-8 + UTF-16LE) so Antigravity CLI tokens refresh without breaking the CLI.",
    badge: "1.4.0",
  },
  {
    icon: Bell,
    title: "New provider notify",
    body: "When an update bundles new plugins, they still default-disable — you get one desktop notification to enable them in Settings.",
    badge: "1.4.0",
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
              <strong className="font-semibold text-[var(--page-fg)]">1.4.0</strong> — product
              polls, machine-readable limits, Windows Antigravity CLI keyring fix, and a one-shot
              notify when new providers ship. Still multi-account + encrypted credentials on Linux
              &amp; Windows.
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
