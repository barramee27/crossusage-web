"use client";

import { providers } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { ProviderCard } from "./provider-card";

export function Overview({
  onOpenProvider,
}: {
  onOpenProvider?: (id: string) => void;
}) {
  return (
    <div>
      <div className="mb-3 rounded-lg border border-amber-200/80 bg-amber-50 px-2.5 py-2 text-[11px] leading-snug text-amber-950">
        <p className="font-medium">Usage insights</p>
        <p className="mt-0.5 text-amber-900/85">
          Codex weekly at 91% — on track. Next reset in 4d 7h. Two Cursor accounts enabled.
        </p>
      </div>
      {providers.map((provider, index) => (
        <div key={provider.id}>
          {index > 0 && <Separator />}
          <button
            type="button"
            className="w-full rounded-lg text-left transition-colors hover:bg-muted/50"
            onClick={() => onOpenProvider?.(provider.id)}
          >
            <ProviderCard provider={provider} metrics={provider.overviewMetrics} />
          </button>
        </div>
      ))}
    </div>
  );
}
