"use client";

import { useEffect, useState } from "react";

interface PanelFooterProps {
  version: string | null;
  refreshKey?: number;
}

export function PanelFooter({ version, refreshKey = 0 }: PanelFooterProps) {
  const [label, setLabel] = useState("Next update in 3m");

  useEffect(() => {
    if (refreshKey <= 0) return;
    setLabel("Just refreshed");
    const t = window.setTimeout(() => setLabel("Next update in 15m"), 1600);
    return () => window.clearTimeout(t);
  }, [refreshKey]);

  return (
    <div className="flex h-8 items-center justify-between border-t pt-1.5">
      <span className="text-xs text-muted-foreground">
        CrossUsage{version ? ` ${version}` : ""}
      </span>
      <span className="text-xs tabular-nums text-muted-foreground">{label}</span>
    </div>
  );
}
