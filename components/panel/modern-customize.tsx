"use client";

import { providers } from "@/lib/mock-data";

export function ModernCustomize({
  enabledMetrics,
  onToggleMetric,
}: {
  enabledMetrics: Record<string, string[]>;
  onToggleMetric: (providerId: string, label: string) => void;
}) {
  return (
    <div className="space-y-3 py-1">
      <div>
        <h3 className="text-sm font-semibold text-foreground">Customize</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Tap chips to toggle metrics on the live Dashboard tab. Real app also supports drag-reorder
          + tray pins.
        </p>
      </div>

      {providers.map((provider) => {
        const isCursor = provider.id === "cursor" || provider.id === "cursor-work";
        const borderAccent = isCursor ? "var(--border)" : `${provider.brandColor}40`;
        const activeList = enabledMetrics[provider.id] ?? [];

        return (
          <div
            key={provider.id}
            className="rounded-lg border bg-card/90 px-3 py-2.5"
            style={{ borderColor: borderAccent }}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground">{provider.name}</p>
              <span className="font-mono text-[10px] text-muted-foreground">
                {activeList.length}/{provider.detailMetrics.length} shown
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {provider.detailMetrics.map((m) => {
                const isEnabled = activeList.includes(m.label);
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => onToggleMetric(provider.id, m.label)}
                    className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ${
                      isEnabled
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isEnabled ? "✓ " : "+ "}
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
