import { displayColor, plugins } from "@/lib/plugins";

/** Continuous provider strip under the hero — ambient, not a card grid. */
export function ProviderMarquee() {
  const row = [...plugins, ...plugins];

  return (
    <section
      className="relative z-[1] border-b border-[var(--page-border)] bg-[var(--page-stripe)] py-4"
      aria-label="Supported providers"
    >
      <div className="provider-marquee-wrap overflow-hidden">
        <div className="provider-marquee gap-8 px-4">
          {row.map(({ id, name, brandColor, Icon }, i) => {
            const color = displayColor(brandColor);
            return (
              <div
                key={`${id}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-[var(--page-fg-muted)]"
              >
                <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
