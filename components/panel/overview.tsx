"use client";

import { providers } from "@/lib/mock-data";
import type { DisplayMode } from "./settings-demo";
import { Separator } from "@/components/ui/separator";
import { ProviderCard } from "./provider-card";

export function Overview({
  onOpenProvider,
  displayMode = "left",
}: {
  onOpenProvider?: (id: string) => void;
  displayMode?: DisplayMode;
}) {
  return (
    <div>
      <div className="mb-3 rounded-lg border border-border bg-muted/40 px-2.5 py-2 text-[11px] leading-snug">
        <p className="font-semibold text-foreground">
          <span className="mr-1.5 text-[#d97706]" aria-hidden>
            ⚠
          </span>
          Usage insights
        </p>
        <p className="mt-0.5 text-muted-foreground">
          Claude weekly at 42% left — burning 1.4× faster than pace. Two Cursor accounts active.
        </p>
      </div>
      {providers.map((provider, index) => (
        <div key={provider.id}>
          {index > 0 && <Separator />}
          <button
            type="button"
            className="w-full rounded-lg px-1 text-left transition-colors hover:bg-muted/50"
            onClick={() => onOpenProvider?.(provider.id)}
          >
            <ProviderCard
              provider={provider}
              metrics={provider.overviewMetrics}
              displayMode={displayMode}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
