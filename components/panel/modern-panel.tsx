"use client";

import { useCallback, useEffect, useState } from "react";
import { PanelFooter } from "./panel-footer";
import { SettingsDemo } from "./settings-demo";
import { ModernDashboard } from "./modern-dashboard";
import { ModernCustomize } from "./modern-customize";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type ModernTab = "dashboard" | "customize" | "settings";

const TABS: { id: ModernTab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "customize", label: "Customize" },
  { id: "settings", label: "Settings" },
];

interface ModernPanelProps {
  version: string | null;
  tab?: ModernTab;
  onTabChange?: (tab: ModernTab) => void;
  refreshKey?: number;
}

export function ModernPanel({
  version,
  tab,
  onTabChange,
  refreshKey = 0,
}: ModernPanelProps) {
  const [internalTab, setInternalTab] = useState<ModernTab>("dashboard");
  const active = tab ?? internalTab;

  const setTab = useCallback(
    (next: ModernTab) => {
      if (onTabChange) onTabChange(next);
      else setInternalTab(next);
      track("modern_tab_clicked", { tab: next });
    },
    [onTabChange]
  );

  useEffect(() => {
    if (refreshKey > 0) track("panel_refresh_clicked");
  }, [refreshKey]);

  return (
    <div className="panel mx-auto w-full max-w-[400px]">
      <div
        className="panel-box flex w-full max-w-[400px] flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.45)]"
        style={{
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          maxHeight: "580px",
        }}
      >
        <nav className="flex gap-1 border-b border-border px-2 pt-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "flex-1 rounded-t-md px-2 py-2 text-xs font-semibold transition-colors",
                active === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 pt-2 pb-1.5">
          {active === "dashboard" && <ModernDashboard />}
          {active === "customize" && <ModernCustomize />}
          {active === "settings" && <SettingsDemo layout="Modern" />}
        </div>

        <div className="px-3 pb-1.5">
          <PanelFooter version={version} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export type { ModernTab };
