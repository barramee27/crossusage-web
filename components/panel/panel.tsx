"use client";

import { useCallback, useEffect, useState } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";
import { SettingsDemo, type DisplayMode } from "./settings-demo";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

interface PanelProps {
  version: string | null;
  view?: ActiveView;
  onViewChange?: (view: ActiveView) => void;
  refreshKey?: number;
  isRefreshing?: boolean;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onToggleLayout?: () => void;
  displayMode?: DisplayMode;
  onToggleDisplayMode?: () => void;
}

export function Panel({
  version,
  view,
  onViewChange,
  refreshKey = 0,
  isRefreshing = false,
  theme = "dark",
  onToggleTheme,
  onToggleLayout,
  displayMode = "left",
  onToggleDisplayMode,
}: PanelProps) {
  const [internalView, setInternalView] = useState<ActiveView>("overview");
  const activeView = view ?? internalView;

  const setActiveView = useCallback(
    (next: ActiveView) => {
      if (onViewChange) onViewChange(next);
      else setInternalView(next);
    },
    [onViewChange]
  );

  useEffect(() => {
    if (refreshKey > 0) {
      track("panel_refresh_clicked");
    }
  }, [refreshKey]);

  const activeProvider =
    activeView !== "overview" && activeView !== "settings"
      ? providers.find((p) => p.id === activeView)
      : null;

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[398px]",
        theme === "light" ? "app-sim-light" : "app-sim-dark"
      )}
    >
      <div
        className="w-full max-w-[398px] overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_32px_90px_-18px_rgba(0,0,0,0.75)]"
        style={{
          fontFamily: "var(--font-jakarta), system-ui, -apple-system, sans-serif",
        }}
      >
        <div className="flex" style={{ height: "518px" }}>
          <Sidebar activeView={activeView} onNavigate={setActiveView} />

          <div className="flex min-h-0 flex-1 flex-col px-3 pt-2.5 pb-1">
            <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none pr-0.5">
              {activeView === "overview" ? (
                <Overview
                  onOpenProvider={(id) => setActiveView(id as ActiveView)}
                  displayMode={displayMode}
                />
              ) : activeView === "settings" ? (
                <SettingsDemo
                  layout="Classic"
                  onToggleLayout={onToggleLayout}
                  theme={theme}
                  onToggleTheme={onToggleTheme}
                  displayMode={displayMode}
                  onToggleDisplayMode={onToggleDisplayMode}
                />
              ) : activeProvider ? (
                <ProviderCard
                  provider={activeProvider}
                  metrics={activeProvider.detailMetrics}
                  displayMode={displayMode}
                  showTrend
                />
              ) : null}
            </div>

            <div className="border-t border-border/50 pt-0.5">
              <PanelFooter
                version={version}
                refreshKey={refreshKey}
                isRefreshing={isRefreshing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
