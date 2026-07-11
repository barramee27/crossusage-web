import { plugins, displayColor } from "@/lib/plugins";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function ProviderGrid() {
  return (
    <section id="providers" className="relative z-[1] scroll-mt-24 border-b border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>Providers</Eyebrow>
        <h2
          id="providers-heading"
          className="font-display mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl"
        >
          {plugins.length} bundled plugins
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--page-fg-muted)]">
          Multi-account works for every provider except Mock — paste API keys or OAuth tokens in
          Settings. Each id matches a{" "}
          <code className="rounded bg-white px-1.5 py-0.5 text-sm">plugin.json</code> in the repo.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plugins.map(({ id, name, brandColor, Icon }) => {
            const color = displayColor(brandColor);
            return (
              <div
                key={id}
                className="surface-panel lift-card flex items-center gap-3 px-4 py-3.5"
              >
                <span
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${color}18`, color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--page-fg)]">{name}</p>
                  <p className="truncate font-mono text-[11px] text-[var(--page-fg-dim)]">{id}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
