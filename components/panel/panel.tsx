"use client";

import { useState } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";

interface PanelProps {
  version: string;
}

export function Panel({ version }: PanelProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview");

  const activeProvider = activeView !== "overview"
    ? providers.find((p) => p.id === activeView)
    : null;

  return (
    <div className="panel flex flex-col items-end">
      {/* Arrow / notch — uses the real app's .tray-arrow CSS */}
      <div className="w-[400px] flex justify-end pr-4">
        <div className="tray-arrow" />
      </div>

      {/* Panel container — matches the real app's layout */}
      <div
        className="rounded-xl overflow-hidden w-[400px] bg-card border border-border shadow-lg"
        style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <div className="flex" style={{ maxHeight: "580px" }}>
          {/* Sidebar */}
          <Sidebar activeView={activeView} onNavigate={setActiveView} />

          {/* Content area */}
          <div className="flex-1 overflow-y-auto px-3 pt-2 pb-1.5 flex flex-col min-h-0">
            <div className="flex-1">
              {activeView === "overview" ? (
                <Overview />
              ) : activeProvider ? (
                <ProviderCard
                  provider={activeProvider}
                  metrics={activeProvider.detailMetrics}
                />
              ) : null}
            </div>

            <PanelFooter version={version} />
          </div>
        </div>
      </div>
    </div>
  );
}
