"use client";

import { useCallback, useEffect, useState } from "react";
import { providers } from "@/lib/mock-data";
import { PanelFooter } from "./panel-footer";
import { SettingsDemo, type DisplayMode } from "./settings-demo";
import { ModernDashboard } from "./modern-dashboard";
import { ModernCustomize } from "./modern-customize";
import { PollsDemo } from "./polls-demo";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type ModernTab = "dashboard" | "customize" | "polls" | "settings";

const TABS: { id: ModernTab; label: string; badge?: boolean }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "customize", label: "Customize" },
  { id: "polls", label: "Polls", badge: true },
  { id: "settings", label: "Settings" },
];

interface ModernPanelProps {
  version: string | null;
  tab?: ModernTab;
  onTabChange?: (tab: ModernTab) => void;
  refreshKey?: number;
  isRefreshing?: boolean;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onToggleLayout?: () => void;
  displayMode?: DisplayMode;
  onToggleDisplayMode?: () => void;
}

function buildInitialEnabled(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const p of providers) {
    map[p.id] = p.detailMetrics.slice(0, 2).map((m) => m.label);
  }
  return map;
}

export function ModernPanel({
  version,
  tab,
  onTabChange,
  refreshKey = 0,
  isRefreshing = false,
  theme = "dark",
  onToggleTheme,
  onToggleLayout,
  displayMode = "left",
  onToggleDisplayMode,
}: ModernPanelProps) {
  const [internalTab, setInternalTab] = useState<ModernTab>("dashboard");
  const [enabledMetrics, setEnabledMetrics] =
    useState<Record<string, string[]>>(buildInitialEnabled);
  const [visitedPolls, setVisitedPolls] = useState(false);
  const [showTotalSpend, setShowTotalSpend] = useState(true);

  const active = tab ?? internalTab;

  const setTab = useCallback(
    (next: ModernTab) => {
      if (next === "polls") setVisitedPolls(true);
      if (onTabChange) onTabChange(next);
      else setInternalTab(next);
      track("modern_tab_clicked", { tab: next });
    },
    [onTabChange]
  );

  const onToggleMetric = useCallback((providerId: string, label: string) => {
    setEnabledMetrics((prev) => {
      const current = prev[providerId] ?? [];
      const next = current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label];
      return { ...prev, [providerId]: next };
    });
  }, []);

  useEffect(() => {
    if (refreshKey > 0) track("panel_refresh_clicked");
  }, [refreshKey]);

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[398px]",
        theme === "light" ? "app-sim-light" : "app-sim-dark"
      )}
    >
      <div
        className="flex w-full max-w-[398px] flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-[0_32px_90px_-18px_rgba(0,0,0,0.75)]"
        style={{
          fontFamily: "var(--font-jakarta), system-ui, -apple-system, sans-serif",
          height: "518px",
        }}
      >
        <nav
          aria-label="Modern shell navigation"
          className="flex gap-1 border-b border-border/70 bg-sidebar/80 px-2.5 pt-2 pb-1.5"
        >
          {TABS.map((t) => {
            const isSelected = active === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex-1 rounded-md px-2 py-1.5 text-[11.5px] font-semibold transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t.label}
                {t.badge && !visitedPolls ? (
                  <span
                    className={cn(
                      "absolute top-1 right-1 size-1.5 rounded-full",
                      isSelected ? "bg-primary-foreground" : "bg-[#e04819]"
                    )}
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-none px-3 pt-2.5 pb-1.5">
          {active === "dashboard" && (
            <ModernDashboard
              enabledMetrics={enabledMetrics}
              displayMode={displayMode}
              showTotalSpend={showTotalSpend}
            />
          )}
          {active === "customize" && (
            <ModernCustomize
              enabledMetrics={enabledMetrics}
              onToggleMetric={onToggleMetric}
            />
          )}
          {active === "polls" && <PollsDemo />}
          {active === "settings" && (
            <SettingsDemo
              layout="Modern"
              onToggleLayout={onToggleLayout}
              theme={theme}
              onToggleTheme={onToggleTheme}
              displayMode={displayMode}
              onToggleDisplayMode={onToggleDisplayMode}
              showTotalSpend={showTotalSpend}
              onToggleTotalSpend={() => setShowTotalSpend((v) => !v)}
            />
          )}
        </div>

        <div className="border-t border-border/50 px-3 pb-1">
          <PanelFooter
            version={version}
            refreshKey={refreshKey}
            isRefreshing={isRefreshing}
          />
        </div>
      </div>
    </div>
  );
}

export type { ModernTab };
