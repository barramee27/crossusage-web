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
    <div className="flex flex-col items-end">
      {/* Arrow / notch pointing up toward the tray icon */}
      <div className="w-[400px] relative" style={{ height: "9px" }}>
        <div
          className="absolute"
          style={{ right: "15px", top: 0 }}
        >
          {/* Border arrow (outer) */}
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderBottom: "9px solid var(--panel-border)",
            }}
          />
          {/* Fill arrow (inner, white) */}
          <div
            style={{
              position: "absolute",
              top: "1.5px",
              left: "1px",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "8px solid white",
            }}
          />
        </div>
      </div>

      {/* Panel container */}
      <div
        className="panel rounded-xl overflow-hidden w-[400px]"
        style={{
          backgroundColor: "var(--panel-bg)",
          border: "1px solid var(--panel-border)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div className="flex" style={{ maxHeight: "580px" }}>
          {/* Sidebar */}
          <Sidebar activeView={activeView} onNavigate={setActiveView} />

          {/* Content area */}
          <div
            className="flex-1 overflow-y-auto px-3 pt-2 pb-1.5 flex flex-col"
            style={{ minHeight: 0 }}
          >
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

            {/* Footer */}
            <PanelFooter version={version} />
          </div>
        </div>
      </div>
    </div>
  );
}
