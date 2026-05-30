import { Gauge, BarChart3, Zap, Puzzle } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";

const blocks = [
  {
    icon: Gauge,
    title: "Aggregate",
    body: "Cursor, Claude, Codex, Copilot, and more in one desktop view. Add multiple Claude and Cursor accounts—work, personal, or team logins—each with its own credentials and usage.",
    gridClass: "md:row-span-2",
    large: true,
  },
  {
    icon: BarChart3,
    title: "Surface",
    body: "Tray icon or in-app panel: check limits and spend without opening every vendor dashboard.",
    gridClass: "md:col-start-2 md:row-start-1",
    large: false,
  },
  {
    icon: Zap,
    title: "Velocity",
    body: "Auto-refresh on your schedule so burn, credits, and renewal windows stay visible when they matter.",
    gridClass: "md:col-start-2 md:row-start-2",
    large: false,
  },
  {
    icon: Puzzle,
    title: "Plugins",
    body: "Providers ship as plugins—extend, fork, or patch without a single gatekeeper release train.",
    gridClass: "md:col-span-2 md:row-start-3",
    large: false,
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="fx-section-bleed relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>Overview</Eyebrow>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Why CrossUsage
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[var(--page-fg-muted)] lg:text-right">
            CrossUsage brings AI subscription and usage signals into one desktop experience—including{" "}
            <span className="font-medium text-[var(--page-fg)]">
              multiple Claude and Cursor accounts
            </span>{" "}
            when you use more than one login.
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
