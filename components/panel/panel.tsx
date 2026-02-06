"use client";

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import type { ActiveView } from "@/lib/types";
import { providers } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { Overview } from "./overview";
import { ProviderCard } from "./provider-card";
import { PanelFooter } from "./panel-footer";

const ARROW_HALF_W = 7; // border-left/right on .tray-arrow

interface PanelProps {
  version: string | null;
  /** Which tray icon element to anchor the arrow to (defaults to "tray-icon") */
  trayIconId?: string;
  /** "absolute" (default) = desktop overlay; "flow" = inline in document flow */
  placement?: "absolute" | "flow";
}

export function Panel({ version, trayIconId = "tray-icon", placement = "absolute" }: PanelProps) {
  const [activeView, setActiveView] = useState<ActiveView>("overview");
  const panelRef = useRef<HTMLDivElement>(null);
  const [arrowRight, setArrowRight] = useState<number | null>(null);
  const [panelRight, setPanelRight] = useState<number | null>(null);

  const isFlow = placement === "flow";

  const measure = useCallback(() => {
    const tray = document.getElementById(trayIconId);
    if (!tray) return;

    const trayRect = tray.getBoundingClientRect();
    const trayCenterX = trayRect.left + trayRect.width / 2;

    if (isFlow) {
      /* Flow mode: panel is positioned by parent flex alignment.
         We only need the arrow offset relative to the panel box. */
      const box = panelRef.current?.querySelector(".panel-box");
      if (!box) return;
      const boxRect = box.getBoundingClientRect();
      const arrowOffset = boxRect.right - trayCenterX - ARROW_HALF_W;
      setArrowRight(arrowOffset);
      return;
    }

    /* Absolute mode: position the whole panel from the viewport right edge */
    const PANEL_W = 400;
    const MIN_RIGHT_PAD = 12;
    const viewportW = window.innerWidth;

    const idealRight = viewportW - trayCenterX - PANEL_W / 2;
    const clampedRight = Math.max(MIN_RIGHT_PAD, idealRight);
    setPanelRight(clampedRight);

    const panelRightEdge = viewportW - clampedRight;
    const arrowOffset = panelRightEdge - trayCenterX - ARROW_HALF_W;
    setArrowRight(arrowOffset);
  }, [trayIconId, isFlow]);

  // Measure before first paint so the panel doesn't flash at the wrong position
  useLayoutEffect(() => {
    measure();
    // Retry after browser has done layout -- catches cases where
    // CSS/fonts aren't applied yet during hydration
    requestAnimationFrame(() => requestAnimationFrame(measure));
  }, [measure]);

  useEffect(() => {
    // Re-measure after fonts load (may shift tray icon position)
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

  const widthClass = isFlow ? "w-full max-w-[400px]" : "w-[400px]";
  const measured = isFlow ? arrowRight != null : panelRight != null;

  return (
    <div
      ref={panelRef}
      className={`panel flex flex-col items-end pt-1${isFlow ? " w-full max-w-[400px]" : ""}`}
      style={{
        ...(isFlow ? {} : { marginRight: panelRight ?? 16 }),
        // Hide until JS has measured the correct position (avoids SSR flash)
        visibility: measured ? "visible" : "hidden",
      }}
    >
      {/* Arrow / notch — dynamically aligned to the tray icon */}
      <div
        className={`${widthClass} flex justify-end`}
        style={{ paddingRight: arrowRight != null ? arrowRight : 16 }}
      >
        <div className="tray-arrow" />
      </div>

      {/* Panel container — matches the real app's layout */}
      <div
        className={`panel-box rounded-xl overflow-hidden ${widthClass} bg-card border border-border shadow-lg`}
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
    </div>
  );
}
