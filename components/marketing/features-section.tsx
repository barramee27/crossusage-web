import { Gauge, BarChart3, Zap, Puzzle } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";

const blocks = [
  {
    icon: Gauge,
    title: "Aggregate",
    body: "One surface for Cursor, Claude, Codex, Copilot, and the long tail.",
    gridClass: "md:row-span-2",
    large: true,
  },
  {
    icon: BarChart3,
    title: "Surface",
    body: "Tray or panel—glance without alt-tabbing into five dashboards.",
    gridClass: "md:col-start-2 md:row-start-1",
    large: false,
  },
  {
    icon: Zap,
    title: "Velocity",
    body: "See burn rate while it still matters.",
    gridClass: "md:col-start-2 md:row-start-2",
    large: false,
  },
  {
    icon: Puzzle,
    title: "Plugins",
    body: "Providers ship separately; community patches land without a gatekeeper.",
    gridClass: "md:col-span-2 md:row-start-3",
    large: false,
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="fx-section-bleed relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>features.manifest</Eyebrow>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Why it exists
          </h2>
          <p className="max-w-md font-mono text-xs text-[var(--page-fg-muted)] lg:text-right lg:text-sm">
            Bento grid: left column is the thesis (tall cell); right stack is supporting signals;
            full-width row closes the argument.
          </p>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-2 md:grid-rows-3 lg:gap-4">
          {blocks.map(({ icon: Icon, title, body, gridClass, large }) => (
            <div
              key={title}
              className={`fx-bento-cell fx-glass-panel p-5 sm:p-6 ${gridClass} ${
                large ? "flex flex-col justify-between md:min-h-[280px] md:p-8" : ""
              }`}
            >
              <Icon
                className={`shrink-0 text-[var(--page-accent)] ${large ? "h-8 w-8" : "h-5 w-5"}`}
                aria-hidden
              />
              <div className={large ? "mt-8 md:mt-auto" : "mt-4"}>
                <h3
                  className={`font-mono font-semibold text-[var(--page-fg)] ${
                    large ? "text-base sm:text-lg" : "text-sm"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-[var(--page-fg-muted)] ${
                    large ? "max-w-prose text-sm sm:text-base" : "text-sm"
                  }`}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
