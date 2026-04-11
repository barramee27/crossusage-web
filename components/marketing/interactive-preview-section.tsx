import { Panel } from "@/components/panel/panel";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function InteractivePreviewSection({ version }: { version: string | null }) {
  return (
    <section className="relative z-[1] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(167,139,250,0.06),transparent_60%)]" />
      <div className="fx-reveal relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>live.mock.tsx</Eyebrow>
        <h2
          id="interactive-preview-heading"
          className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl"
        >
          Embedded UI
        </h2>
        <p className="mt-3 max-w-xl font-mono text-xs leading-relaxed text-[var(--page-fg-muted)] sm:text-sm">
          Hydrated client island—sidebar state is ephemeral. Matches binary chrome so you know what
          you are installing.
        </p>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-[460px]">
            <div className="fx-glass-panel relative p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--page-border)] pb-3 font-mono text-[10px] text-[var(--page-fg-dim)] sm:text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--page-accent)] shadow-[0_0_8px_var(--page-accent)]" />
                  panel.preview
                </span>
                <span className="text-[var(--page-accent)]">● live</span>
              </div>
              <div className="flex justify-center">
                <Panel version={version} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
