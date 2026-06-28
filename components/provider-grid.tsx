import { plugins, displayColor } from "@/lib/plugins";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function ProviderGrid() {
  return (
    <section className="fx-section-bleed relative z-[1] border-b border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Eyebrow>plugins.json</Eyebrow>
        <h2
          id="providers-heading"
          className="mt-4 text-2xl font-bold tracking-tight text-[var(--page-fg)] sm:text-3xl"
        >
          Providers
        </h2>
        <p className="mt-2 max-w-lg font-mono text-xs text-[var(--page-fg-muted)] sm:text-sm">
          {plugins.length} bundled plugins — each row matches a{" "}
          <code className="text-[var(--page-fg)]">plugin.json</code> in the repo. Swatch = brand
          color from the plugin manifest.
        </p>

        <div className="fx-table-wrap mt-10 max-h-[min(70vh,640px)] overflow-auto rounded-sm signal-block">
          <table className="w-full border-collapse text-left font-mono text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[var(--page-border)] bg-[var(--surface-2)] text-[var(--page-fg-dim)]">
                <th scope="col" className="px-3 py-2.5 font-normal sm:px-4">
                  id
                </th>
                <th scope="col" className="px-3 py-2.5 font-normal sm:px-4">
                  label
                </th>
                <th
                  scope="col"
                  className="hidden px-4 py-2.5 font-normal sm:table-cell"
                  title="Brand color sample; hover cell for #hex"
                >
                  swatch
                </th>
              </tr>
            </thead>
            <tbody>
              {plugins.map(({ id, name, brandColor, Icon }, i) => {
                const color = displayColor(brandColor);
                return (
                  <tr
                    key={id}
                    className={`fx-table-glow-row transition-colors duration-150 hover:bg-[var(--surface-2)]/90 ${
                      i % 2 === 0 ? "bg-[var(--surface)]" : "bg-[var(--page-bg)]/40"
                    }`}
                  >
                    <td className="border-t border-[var(--page-border)] px-3 py-2.5 text-[var(--page-accent)] sm:px-4">
                      {id}
                    </td>
                    <td className="border-t border-[var(--page-border)] px-3 py-2.5 text-[var(--page-fg-muted)] sm:px-4">
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0" style={{ color }} />
                        {name}
                      </span>
                    </td>
                    <td className="hidden border-t border-[var(--page-border)] px-4 py-2.5 sm:table-cell">
                      <abbr
                        title={`Brand hex ${brandColor}`}
                        className="cursor-help no-underline"
                      >
                        <span
                          className="inline-block h-2.5 w-2.5 ring-1 ring-[var(--page-border)]"
                          style={{ backgroundColor: color }}
                        />
                      </abbr>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
