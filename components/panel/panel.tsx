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
  inline?: boolean;
}

export function Panel({ version, inline }: PanelProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const panelRef = useRef<HTMLDivElement>(null);
  const [arrowRight, setArrowRight] = useState<number | null>(null);
  const [panelRight, setPanelRight] = useState<number | null>(null);

  const measure = useCallback(() => {
    if (inline) return;
    const tray = document.getElementById("tray-icon");
    if (!tray) return;

    const PANEL_W = 400;
    const MIN_RIGHT_PAD = 12;

    const trayRect = tray.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const trayCenterX = trayRect.left + trayRect.width / 2;

    // Ideal: center the panel under the tray icon
    const idealRight = viewportW - trayCenterX - PANEL_W / 2;
    // Clamp: never less than MIN_RIGHT_PAD from viewport edge
    const clampedRight = Math.max(MIN_RIGHT_PAD, idealRight);
    setPanelRight(clampedRight);

    // Arrow always points at tray icon center, independent of clamping
    const panelRightEdge = viewportW - clampedRight;
    const arrowOffset = panelRightEdge - trayCenterX - ARROW_HALF_W;
    setArrowRight(arrowOffset);
  }, [inline]);

  useEffect(() => {
    if (inline) return;
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
  }, [inline, measure]);

  const activeProvider = activeView !== "overview"
    ? providers.find((p) => p.id === activeView)
    : null;

  /* ── Inline mode: no arrow, no positioning, responsive width ── */
  if (inline) {
    return (
      <div
        className="panel rounded-b-xl overflow-hidden w-full max-w-[400px] bg-card border border-border shadow-lg"
        style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <div className="flex" style={{ maxHeight: "580px" }}>
          <Sidebar activeView={activeView} onNavigate={setActiveView} />
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
    );
  }

  /* ── Default mode: absolute-positioned with arrow ── */
  return (
    <div
      ref={panelRef}
      className="panel flex flex-col items-end pt-1"
      style={{ marginRight: panelRight ?? 16 }}
    >
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
