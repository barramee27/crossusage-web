"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";

const ARROW_HALF_W = 7; // border-left/right on .tray-arrow

interface PanelProps {
  version: string | null;
}

export function Panel({ version }: PanelProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const panelRef = useRef<HTMLDivElement>(null);
  const [arrowRight, setArrowRight] = useState<number | null>(null);

  const measure = useCallback(() => {
    const tray = document.getElementById("tray-icon");
    const panel = panelRef.current;
    if (!tray || !panel) return;

    const trayRect = tray.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const trayCenterX = trayRect.left + trayRect.width / 2;
    const offset = panelRect.right - trayCenterX - ARROW_HALF_W;
    setArrowRight(offset);
  }, []);

  useEffect(() => {
    // Measure after layout settles (fonts, CSS)
    requestAnimationFrame(measure);
    document.fonts.ready.then(measure);

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 80);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [measure]);

  const activeProvider = activeView !== "overview"
    ? providers.find((p) => p.id === activeView)
    : null;

  return (
    <div ref={panelRef} className="panel flex flex-col items-end">
      {/* Arrow / notch — dynamically aligned to the tray icon */}
      <div
        className="w-[400px] flex justify-end"
        style={{ paddingRight: arrowRight != null ? arrowRight : 16 }}
      >
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
