import type { CSSProperties } from "react";
import { HeroContent } from "@/components/hero-content";
import { Panel } from "@/components/panel/panel";

export function HeroSection({ version }: { version: string | null }) {
  return (
    <section
      className="fx-section-bleed relative z-[1] overflow-hidden border-b border-[var(--page-border)] pb-1"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_70%_-10%,rgba(34,211,238,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:flex lg:items-stretch lg:gap-16 lg:px-8 lg:py-24 xl:gap-24">
        <div className="fx-reveal animate-scan-in max-w-xl flex-1 lg:max-w-none lg:pt-2">
          <HeroContent version={version} />
        </div>

        <div className="relative mt-16 flex flex-1 justify-center lg:mt-0 lg:max-w-md xl:max-w-lg">
          <div
            className="fx-reveal fx-corner-frame relative w-full max-w-[min(100%,420px)]"
            style={{ animationDelay: "0.05s" } satisfies CSSProperties}
          >
            <div className="absolute -top-6 right-0 hidden font-mono text-[9px] text-[var(--page-fg-dim)] sm:block">
              VIEWPORT · 400×580
            </div>

            <div className="signal-block-strong p-1.5">
              <div className="relative overflow-hidden rounded-sm shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)]">
                <Panel version={version} />
                <div
                  className="pointer-events-none absolute inset-0 z-[2] rounded-sm bg-gradient-to-t from-[var(--page-bg)]/15 via-transparent to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <p className="mt-5 text-center font-mono text-[10px] tracking-widest text-[var(--page-fg-dim)]">
              FIG.01 — LIVE PANEL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
