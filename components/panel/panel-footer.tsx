"use client";

import { useEffect, useState } from "react";

interface PanelFooterProps {
  version: string | null;
  refreshKey?: number;
  isRefreshing?: boolean;
}

export function PanelFooter({
  version,
  refreshKey = 0,
  isRefreshing = false,
}: PanelFooterProps) {
  const [acknowledgedKey, setAcknowledgedKey] = useState(0);

  useEffect(() => {
    if (refreshKey <= 0) return;
    const t = window.setTimeout(() => setAcknowledgedKey(refreshKey), 1800);
    return () => window.clearTimeout(t);
  }, [refreshKey]);

  const label = isRefreshing
    ? "Probing providers…"
    : refreshKey > 0 && acknowledgedKey !== refreshKey
      ? "Just refreshed"
      : refreshKey > 0
        ? "Next update in 15m"
        : "Next update in 3m";

  return (
    <div className="flex h-8 shrink-0 items-center justify-between pt-1">
      <span className="text-xs text-muted-foreground">
        CrossUsage{version ? ` ${version}` : ""}
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">{label}</span>
    </div>
  );
}
