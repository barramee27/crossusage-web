"use client";

import { providers } from "@/lib/mock-data";

/** Lightweight Customize tab — show/hide chips, not full drag-and-drop. */
export function ModernCustomize() {
  return (
    <div className="space-y-3 py-1">
      <div>
        <h3 className="text-base font-semibold text-foreground">Customize</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Demo — pick which metrics appear on the dashboard. Real app supports drag reorder + tray
          pins.
        </p>
      </div>

      {providers.map((provider) => (
        <div
          key={provider.id}
          className="rounded-lg border bg-card/80 px-3 py-2.5"
          style={{ borderColor: `${provider.brandColor}33` }}
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-foreground">{provider.name}</p>
            <span className="text-[10px] text-muted-foreground">Show all</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {provider.detailMetrics.map((m, i) => (
              <span
                key={m.label}
                className={`rounded-md border px-2 py-1 text-[11px] ${
                  i < 2
                    ? "border-[var(--page-accent)]/40 bg-[var(--page-accent-soft)] text-[var(--page-accent-ink)]"
                    : "border-border text-muted-foreground"
                }`}
              >
                {i < 2 ? "✓ " : ""}
                {m.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
