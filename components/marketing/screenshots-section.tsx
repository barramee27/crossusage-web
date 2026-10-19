import { Eyebrow } from "@/components/marketing/eyebrow";

const captions = [
  {
    title: "Modern UI · Dashboard",
    detail:
      "Top tabs, cross-provider Cost / Tokens / Cost·MTok donut ring, and grouped provider cards.",
  },
  {
    title: "Classic UI · All Providers",
    detail:
      "Icon rail on the left with every enabled provider's primary Session, Weekly, and Credits meters in one scrollable view.",
  },
  {
    title: "Classic UI · Provider Detail",
    detail:
      "Per-provider deep dive with rate-limit resets, 30-day usage trend bar chart, and Today / Yesterday / Last 30 Days spend rows.",
  },
] as const;

export function ScreenshotsSection({ version }: { version: string | null }) {
  const label = version ? `v${version}` : "1.6.1";

  return (
    <section
      id="screenshots"
      className="relative z-[1] scroll-mt-24 border-b border-[var(--page-border)]"
    >
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Real Desktop Captures · Linux ({label})</Eyebrow>
            <h2 className="font-display mt-4 max-w-[20ch] text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              Native Tauri UI on Linux &amp; Windows
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--page-fg-muted)] lg:text-right">
            Captured directly from the Linux desktop build — switch between Modern and Classic
            anytime in Settings → Appearance.
          </p>
        </div>

        <div className="surface-panel mt-10 overflow-hidden p-2 sm:p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/marketing/linux-showcase.png"
            alt={`CrossUsage ${label} running natively on Linux — Modern UI Dashboard, Classic UI All Providers, and Classic UI Provider Detail`}
            width={1980}
            height={960}
            loading="lazy"
            className="h-auto w-full rounded-xl border border-black/10 shadow-sm"
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {captions.map((item) => (
            <div key={item.title} className="surface-panel p-5">
              <h3 className="text-sm font-semibold text-[var(--page-fg)]">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--page-fg-muted)]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
