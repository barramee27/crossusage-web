import { plugins, displayColor } from "@/lib/plugins";

export function ProviderGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      <div className="mb-8">
        <h2
          className="text-3xl lg:text-4xl font-bold tracking-tight text-pretty"
          style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
        >
          Works with Your Tools
        </h2>
        <p
          className="mt-3 text-sm lg:text-base max-w-lg text-pretty"
          style={{ color: "var(--page-fg-muted)" }}
        >
          Every provider is a plugin. Add what you use, ignore what you don&apos;t.
        </p>
      </div>

      {/* Flush tile grid — transparent cells, border separators */}
      <div
        className="rounded-xl overflow-hidden grid grid-cols-2 sm:grid-cols-4"
        style={{ border: "1px solid var(--page-border)" }}
      >
        {plugins.map(({ id, name, brandColor, Icon }, i) => {
          const color = displayColor(brandColor);
          const cols = 4;
          const isLastRow = i >= plugins.length - cols;
          const isLastCol = (i + 1) % cols === 0;
          return (
            <div
              key={id}
              className="flex flex-col items-center justify-center gap-2.5 py-8 px-4"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRight: isLastCol ? "none" : "1px solid var(--page-border)",
                borderBottom: isLastRow ? "none" : "1px solid var(--page-border)",
              }}
            >
              <Icon className="w-8 h-8" style={{ color }} />
              <span
                className="text-sm font-semibold"
                style={{ color }}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
