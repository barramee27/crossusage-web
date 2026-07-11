"use client";

import { useCallback, useEffect, useState } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";
import { SettingsDemo } from "./settings-demo";
import { track } from "@/lib/track";

interface PanelProps {
  version: string | null;
  /** Controlled view — when set, parent owns navigation */
  view?: ActiveView;
  onViewChange?: (view: ActiveView) => void;
  /** Flash a brief “refreshed” state in the footer */
  refreshKey?: number;
}

export function Panel({ version, view, onViewChange, refreshKey = 0 }: PanelProps) {
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
    <div className="panel mx-auto w-full max-w-[400px]">
      <div
        className="panel-box w-full max-w-[400px] overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.45)]"
        style={{
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="flex" style={{ maxHeight: "580px" }}>
          <Sidebar activeView={activeView} onNavigate={setActiveView} />

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pt-2 pb-1.5">
            <div className="flex-1">
              {activeView === "overview" ? (
                <Overview onOpenProvider={(id) => setActiveView(id as ActiveView)} />
              ) : activeView === "settings" ? (
                <SettingsDemo layout="Classic" />
              ) : activeProvider ? (
                <ProviderCard
                  provider={activeProvider}
                  metrics={activeProvider.detailMetrics}
                />
              ) : null}
            </div>

            <PanelFooter version={version} refreshKey={refreshKey} />
          </div>
        </div>
      </div>
    </div>
  );
}
