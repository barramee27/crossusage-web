import { LayoutGrid, LineChart, Sparkles, RefreshCw } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkReleasesLatest } from "@/lib/site";

const highlights = [
  {
    icon: LayoutGrid,
    title: "Classic & Modern",
    body: "Two layouts, same providers. Enable once — settings sync when you switch in Appearance or Customize.",
  },
  {
    icon: Sparkles,
    title: "Usage insights",
    body: "Pace warnings, tightest quota, next reset, and a 7-day rollup on the home panel when history is on.",
  },
  {
    icon: LineChart,
    title: "History charts",
    body: "Daily usage and quota snapshots on provider detail, with CSV export from Settings.",
  },
  {
    icon: RefreshCw,
    title: "Tray refresh",
    body: "Provider logo plus remaining % on the tray icon — glanceable without opening the panel.",
  },
] as const;

export function WhatsNewSection({ version }: { version: string | null }) {
  const label = version ? `v${version}` : "latest";

  return (
    <section className="fx-section-bleed relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>release · {label}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              What&apos;s new in CrossUsage {label}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--page-fg-muted)] sm:text-base">
              OpenUsage 0.7-style Modern UI on Linux and Windows — grouped dashboard, customizable cards,
              and insights built on local probe + history data. No cloud account required.
            </p>
          </div>
          <a
            href={forkReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="signal-block shrink-0 px-5 py-2.5 font-mono text-xs font-semibold text-[var(--page-accent)] hover:border-[var(--page-accent)]"
          >
            releases/{label}
          </a>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="fx-bento-cell fx-glass-panel flex flex-col p-5 sm:p-6">
              <Icon className="h-5 w-5 text-[var(--page-accent)]" aria-hidden />
              <h3 className="mt-4 font-mono text-sm font-semibold text-[var(--page-fg)]">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--page-fg-muted)]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
