"use client";

import { useState } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";

interface PanelProps {
  version: string | null;
}

export function Panel({ version }: PanelProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview");

  const activeProvider =
    activeView !== "overview"
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
