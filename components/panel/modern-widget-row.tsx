"use client";

import type { PaceStatus } from "@/lib/types";
import type { DisplayMode } from "./settings-demo";
import { cn } from "@/lib/utils";

const paceDot: Record<PaceStatus, string> = {
  ahead: "bg-[var(--pace-green)]",
  "on-track": "bg-[var(--pace-yellow)]",
  behind: "bg-[var(--pace-red)]",
};

const paceFill: Record<PaceStatus, string> = {
  ahead: "bg-[var(--pace-green)]",
  "on-track": "bg-[var(--pace-yellow)]",
  behind: "bg-[var(--pace-red)]",
};

export function formatDisplayPrimary(
  primaryValue: string,
  percent: number,
  displayMode: DisplayMode
): string {
  if (displayMode === "left") return primaryValue;
  const pctMatch = primaryValue.match(/^(\d+)%\s+left$/i);
  if (pctMatch) {
    const used = Math.max(0, 100 - Number(pctMatch[1]));
    return `${used}% used`;
  }
  if (primaryValue.includes("left")) {
    return `${Math.max(0, 100 - percent)}% used`;
  }
  return primaryValue;
}

export function ModernWidgetRow({
  label,
  primaryValue,
  secondaryValue,
  percent,
  pace,
  displayMode = "left",
}: {
  label: string;
  primaryValue: string;
  secondaryValue?: string;
  percent: number;
  pace: PaceStatus;
  displayMode?: DisplayMode;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  const barWidth = displayMode === "used" ? 100 - clamped : clamped;

  return (
    <div className="py-1.5">
      <div className="mb-1 flex items-center gap-1.5 text-sm">
        <span
          className={cn("inline-block h-1.5 w-1.5 shrink-0 rounded-full", paceDot[pace])}
          title={pace}
        />
        <span className="min-w-0 flex-1 truncate font-medium text-foreground">{label}</span>
        <span className="shrink-0 tabular-nums text-foreground">
          {formatDisplayPrimary(primaryValue, percent, displayMode)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all duration-300", paceFill[pace])}
          style={{ width: `${barWidth}%` }}
        />
      </div>
      {secondaryValue && (
        <p className="mt-1 text-right text-[11px] text-muted-foreground">{secondaryValue}</p>
      )}
    </div>
  );
}

export function ModernSpendRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1 text-sm">
      <span className="truncate text-muted-foreground">{label}</span>
      <span className="shrink-0 font-medium tabular-nums text-foreground">{value}</span>
    </div>
  );
}
