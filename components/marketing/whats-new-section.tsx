import {
  ArrowUpRight,
  LayoutGrid,
  Monitor,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkReleasesLatest, forkRepo } from "@/lib/site";

const LATEST_CHIPS = [
  "Cursor paged usage-events cache",
  "Ollama /api/balance + Purchased Credits",
  "Claude Rate Limit Resets cache",
  "Codex Pro 100 / 200 / 500 pricing",
  "Stripped LTO slimming",
] as const;

const RELEASES = [
  {
    version: "v1.6.0",
    tag: "MULTI-ACCOUNT",
    href: `${forkRepo}/releases/tag/v1.6.0`,
    icon: Sparkles,
    title: "Base Account Display Labels",
    body: "Give your primary default provider row a custom name (Personal, Laptop, Company) in Settings → Providers without duplicating credentials.",
  },
  {
    version: "v1.5.0",
    tag: "TRAY + GEMINI",
    href: `${forkRepo}/releases/tag/v1.5.0`,
    icon: Monitor,
    title: "Gemini Apps & 4-Mode Tray Readouts",
    body: "Current and Weekly quota tracking from gemini.google.com, plus Logo+%, Fill, Pie, and Multi-Bar system tray icon styles.",
  },
  {
    version: "v1.4.3",
    tag: "SPEND LEDGER",
    href: `${forkRepo}/releases/tag/v1.4.3`,
    icon: TrendingUp,
    title: "Grok Bot & Antigravity Local Spend",
    body: "Cursor Grok Bot weekly allowance, Grok ledger spend, and Antigravity Today / Yesterday / 30-day local spend breakdowns.",
  },
  {
    version: "v1.3–1.4",
    tag: "SECURITY + POLLS",
    href: `${forkRepo}/releases/tag/v1.4.0`,
    icon: ShieldCheck,
    title: "AES-256-GCM Vault & Community Polls",
    body: "Encrypted multi-account credential storage backed by Linux Secret Service (libsecret) and Windows Credential Manager, plus opt-out product governance polls.",
  },
  {
    version: "v1.2.0",
    tag: "DUAL SHELL",
    href: `${forkRepo}/releases/tag/v1.2.0`,
    icon: LayoutGrid,
    title: "Modern Dashboard + Classic Sidebar",
    body: "Complete Rust/React port of the grouped Modern dashboard alongside the original Classic sidebar layout — switchable instantaneously.",
  },
] as const;

export function WhatsNewSection({ version }: { version: string | null }) {
  const label = version ? `v${version}` : "v1.6.1";

  return (
    <section
      id="whats-new"
      className="relative scroll-mt-20 border-b border-[var(--rule)]"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>ENGINEERING CHANGELOG · {label}</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Shipped across{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                recent releases.
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
              Rapid upstream parity with OpenUsage combined with Linux/Windows-native security,
              multi-account ergonomics, and binary size discipline.
            </p>
          </div>
          <a
            href={forkReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-secondary shrink-0 !py-2 !text-xs"
          >
            GitHub Release Notes
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>

        {/* Flagship latest release spotlight */}
        <a
          href={`${forkRepo}/releases/tag/${label}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 block rounded-2xl border border-[var(--signal)]/50 bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(224,72,25,0.12)] ring-1 ring-[var(--signal)]/15 transition-all hover:-translate-y-0.5 hover:border-[var(--signal)] sm:p-7"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[var(--signal)]/30 bg-[var(--signal-soft)] text-[var(--signal)]">
                <Workflow className="size-5" aria-hidden />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[var(--signal)] px-2 py-0.5 font-mono text-[10.5px] font-bold text-white">
                    {label} · LATEST
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-[var(--ink-muted)]">
                    UPSTREAM PARITY + BINARY SLIMMING
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[var(--signal)] sm:text-xl">
                  OpenUsage v0.7.13–v0.7.15 Parity + LTO Binary Slimming
                </h3>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--ink-secondary)] group-hover:text-[var(--signal)]">
              Release notes
              <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {LATEST_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-[var(--rule-strong)] bg-white px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--ink)]"
              >
                + {chip}
              </span>
            ))}
          </div>
        </a>

        {/* Chronological release ledger */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RELEASES.map(({ icon: Icon, version: ver, tag, href, title, body }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] transition-all hover:-translate-y-0.5 hover:border-[var(--ink)] hover:bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--rule)] bg-[var(--paper-recessed)] text-[var(--ink)]">
                  <Icon className="size-4" aria-hidden />
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="rounded border border-[var(--rule-strong)] bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--ink)]">
                    {ver}
                  </span>
                  <span className="rounded bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[9.5px] font-semibold text-[var(--ink-secondary)]">
                    {tag}
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-base font-extrabold tracking-tight text-[var(--ink)] group-hover:text-[var(--signal)]">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--ink-secondary)] sm:text-[13px]">
                {body}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
