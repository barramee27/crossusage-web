"use client";

import { useCallback, useEffect, useState } from "react";
import { Braces, Moon, RefreshCw, Sun } from "lucide-react";
import type { ActiveView } from "@/lib/types";
import type { DisplayMode } from "@/components/panel/settings-demo";
import { providers, trayBarData } from "@/lib/mock-data";
import { Panel } from "@/components/panel/panel";
import { ModernPanel, type ModernTab } from "@/components/panel/modern-panel";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

type HeroLayout = "modern" | "classic";
type PanelTheme = "dark" | "light";
type TrayStyle = "bars" | "pct" | "pie" | "fill";

const TRAY_STYLES: { id: TrayStyle; label: string }[] = [
  { id: "bars", label: "Bars" },
  { id: "pct", label: "Logo+%" },
  { id: "pie", label: "Pie" },
  { id: "fill", label: "Fill" },
];

const MODERN_PRESETS: { id: ModernTab; label: string }[] = [
  { id: "dashboard", label: "Spend & Quotas" },
  { id: "customize", label: "Customize" },
  { id: "polls", label: "In-App Polls" },
  { id: "settings", label: "Settings" },
];

const CLASSIC_PRESETS: { id: ActiveView; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "cursor-work", label: "Multi-Account" },
  { id: "claude", label: "Detail Card" },
  { id: "settings", label: "Settings" },
];

export function HeroClassicViewport({ version }: { version: string | null }) {
  const [layout, setLayout] = useState<HeroLayout>("modern");
  const [theme, setTheme] = useState<PanelTheme>("dark");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("left");
  const [trayStyle, setTrayStyle] = useState<TrayStyle>("bars");
  const [showJson, setShowJson] = useState(false);
  const [open, setOpen] = useState(true);
  const [classicView, setClassicView] = useState<ActiveView>("overview");
  const [modernTab, setModernTab] = useState<ModernTab>("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!isRefreshing) return;
    const t = window.setTimeout(() => setIsRefreshing(false), 650);
    return () => window.clearTimeout(t);
  }, [isRefreshing]);

  const onRefresh = useCallback(() => {
    setOpen(true);
    setIsRefreshing(true);
    setRefreshKey((k) => k + 1);
    track("hero_panel_refresh");
  }, []);

  const cycleTrayStyle = useCallback(() => {
    setTrayStyle((curr) => {
      const idx = TRAY_STYLES.findIndex((s) => s.id === curr);
      return TRAY_STYLES[(idx + 1) % TRAY_STYLES.length].id;
    });
  }, []);

  const liveJson = JSON.stringify(
    {
      endpoint: "http://127.0.0.1:6736/v1/usage",
      version: version ?? "1.6.1",
      displayMode,
      providers: providers.map((p) => ({
        id: p.id,
        plan: p.planBadge,
        todaySpend: p.todaySpend,
        primary: p.overviewMetrics[0]?.primaryValue,
        pace: p.overviewMetrics[0]?.pace,
      })),
    },
    null,
    2
  );

  return (
    <div
      id="try"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#1d222c] bg-[#0e1015] shadow-[0_36px_80px_-28px_rgba(17,19,23,0.62)]"
    >
      {/* Top Anodized Hardware Bezel / Simulated Linux Waybar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#141820] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#2dd4bf]">
            <span
              className={cn(
                "size-1.5 rounded-full",
                isRefreshing ? "animate-ping bg-[#e04819]" : "bg-[#2dd4bf]"
              )}
            />
            {isRefreshing ? "PROBING..." : "LIVE SIMULATOR"}
          </span>
          <button
            type="button"
            onClick={cycleTrayStyle}
            title="Cycle simulated tray icon style (Bars, Logo+%, Pie, Fill)"
            className="hidden rounded border border-white/10 bg-[#0a0c10] px-2 py-0.5 font-mono text-[10px] text-[#8e97a8] transition-colors hover:border-white/25 hover:text-white sm:inline-block"
          >
            Tray: {TRAY_STYLES.find((s) => s.id === trayStyle)?.label} ↻
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Modern / Classic switch */}
          <div className="inline-flex rounded-lg border border-white/12 bg-[#0a0c10] p-0.5">
            {(["modern", "classic"] as const).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setLayout(id);
                  setShowJson(false);
                  setOpen(true);
                  track("hero_layout_toggle", { layout: id });
                }}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wide transition-colors",
                  layout === id && !showJson
                    ? "bg-[#e04819] text-white"
                    : "text-[#8e97a8] hover:text-white"
                )}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Loopback JSON peek toggle */}
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setShowJson((v) => !v);
            }}
            title="Inspect live 127.0.0.1:6736/v1/usage JSON payload"
            aria-label="Inspect live loopback JSON payload"
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-lg border transition-colors",
              showJson
                ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/15 text-[#2dd4bf]"
                : "border-white/12 bg-[#0a0c10] text-[#8e97a8] hover:border-white/30 hover:text-white"
            )}
          >
            <Braces className="size-3.5" />
          </button>

          {/* Dark / Light panel theme */}
          <button
            type="button"
            onClick={() => {
              setShowJson(false);
              setTheme((t) => (t === "dark" ? "light" : "dark"));
            }}
            title={`Switch panel to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-label={`Switch panel to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex size-7 items-center justify-center rounded-lg border border-white/12 bg-[#0a0c10] text-[#8e97a8] transition-colors hover:border-white/30 hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="size-3.5" />
            ) : (
              <Moon className="size-3.5" />
            )}
          </button>

          {/* Refresh */}
          <button
            type="button"
            onClick={onRefresh}
            title="Probe all providers"
            aria-label="Probe all providers"
            className="inline-flex size-7 items-center justify-center rounded-lg border border-white/12 bg-[#0a0c10] text-[#8e97a8] transition-colors hover:border-white/30 hover:text-white"
          >
            <RefreshCw
              className={cn("size-3.5", isRefreshing && "animate-spin text-[#2dd4bf]")}
            />
          </button>

          {/* Authentic 4-mode tray indicator */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            title="Tray readout: Codex 73% · Claude 42% · Cursor 67% · Work 79% (click to toggle popover)"
            aria-label="Toggle system tray popover"
            className={cn(
              "inline-flex h-7 min-w-8 items-center justify-center rounded-lg border px-2 transition-all",
              open
                ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/15"
                : "border-white/15 bg-[#0a0c10] hover:border-white/35"
            )}
          >
            {trayStyle === "bars" && (
              <span className="inline-flex h-3.5 items-end gap-[2.5px]">
                {trayBarData.map((bar) => (
                  <span
                    key={bar.label}
                    className="w-1 rounded-[1.5px] bg-[#2dd4bf]"
                    style={{ height: `${Math.max(4, (bar.percent / 100) * 14)}px` }}
                  />
                ))}
              </span>
            )}
            {trayStyle === "pct" && (
              <span className="font-mono text-[10.5px] font-bold tabular-nums text-[#2dd4bf]">
                73%
              </span>
            )}
            {trayStyle === "pie" && (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                <circle
                  cx="7"
                  cy="7"
                  r="5.2"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2.2"
                />
                <circle
                  cx="7"
                  cy="7"
                  r="5.2"
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.2"
                  strokeDasharray="24 33"
                  transform="rotate(-90 7 7)"
                />
              </svg>
            )}
            {trayStyle === "fill" && (
              <span className="relative inline-block size-3.5 overflow-hidden rounded-[3px] border border-white/40">
                <span className="absolute inset-x-0 bottom-0 h-[73%] bg-[#2dd4bf]" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Interactive preset jump strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#10131a] px-4 py-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-0.5 font-mono text-[10px] uppercase tracking-wider text-[#646e82]">
            Explore:
          </span>
          {layout === "modern"
            ? MODERN_PRESETS.map((p) => {
                const active = open && !showJson && modernTab === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setShowJson(false);
                      setOpen(true);
                      setModernTab(p.id);
                    }}
                    className={cn(
                      "rounded border px-2 py-0.5 font-mono text-[10.5px] transition-colors",
                      active
                        ? "border-white/30 bg-white/12 text-white"
                        : "border-white/[0.08] text-[#8e97a8] hover:border-white/20 hover:text-white"
                    )}
                  >
                    {p.label}
                  </button>
                );
              })
            : CLASSIC_PRESETS.map((p) => {
                const active = open && !showJson && classicView === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setShowJson(false);
                      setOpen(true);
                      setClassicView(p.id);
                    }}
                    className={cn(
                      "rounded border px-2 py-0.5 font-mono text-[10.5px] transition-colors",
                      active
                        ? "border-white/30 bg-white/12 text-white"
                        : "border-white/[0.08] text-[#8e97a8] hover:border-white/20 hover:text-white"
                    )}
                  >
                    {p.label}
                  </button>
                );
              })}
        </div>
        <button
          type="button"
          onClick={() => setDisplayMode((m) => (m === "left" ? "used" : "left"))}
          className="hidden rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-[#8e97a8] transition-colors hover:border-white/25 hover:text-white sm:inline-block"
          title="Toggle quota display mode"
        >
          Mode: {displayMode === "left" ? "% left" : "% used"}
        </button>
      </div>

      {/* Desktop wallpaper stage */}
      <div className="relative flex min-h-[552px] items-center justify-center overflow-hidden p-4 sm:p-6">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 10%, rgba(224, 72, 25, 0.12), transparent 60%), radial-gradient(ellipse 65% 50% at 80% 85%, rgba(45, 212, 191, 0.1), transparent 60%), linear-gradient(180deg, #11151d 0%, #090b10 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative z-[1] w-full">
          {open ? (
            showJson ? (
              <div className="sim-pop mx-auto flex h-[518px] w-full max-w-[398px] flex-col overflow-hidden rounded-[18px] border border-white/15 bg-[#0f131b] text-[#e2e8f0] shadow-[0_32px_90px_-18px_rgba(0,0,0,0.75)]">
                <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#141923] px-4 py-2.5 font-mono text-[11px]">
                  <span className="text-[#2dd4bf]">GET 127.0.0.1:6736/v1/usage</span>
                  <button
                    type="button"
                    onClick={() => setShowJson(false)}
                    className="rounded border border-white/15 px-2 py-0.5 text-[10px] text-white/80 hover:text-white"
                  >
                    Back to UI
                  </button>
                </div>
                <pre className="min-h-0 flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-[#cbd5e1]">
                  {liveJson}
                </pre>
              </div>
            ) : (
              <div key={`${layout}-${theme}`} className="sim-pop">
                {layout === "modern" ? (
                  <ModernPanel
                    version={version}
                    tab={modernTab}
                    onTabChange={setModernTab}
                    refreshKey={refreshKey}
                    isRefreshing={isRefreshing}
                    theme={theme}
                    onToggleTheme={() =>
                      setTheme((t) => (t === "dark" ? "light" : "dark"))
                    }
                    onToggleLayout={() => setLayout("classic")}
                    displayMode={displayMode}
                    onToggleDisplayMode={() =>
                      setDisplayMode((m) => (m === "left" ? "used" : "left"))
                    }
                  />
                ) : (
                  <Panel
                    version={version}
                    view={classicView}
                    onViewChange={setClassicView}
                    refreshKey={refreshKey}
                    isRefreshing={isRefreshing}
                    theme={theme}
                    onToggleTheme={() =>
                      setTheme((t) => (t === "dark" ? "light" : "dark"))
                    }
                    onToggleLayout={() => setLayout("modern")}
                    displayMode={displayMode}
                    onToggleDisplayMode={() =>
                      setDisplayMode((m) => (m === "left" ? "used" : "left"))
                    }
                  />
                )}
              </div>
            )
          ) : (
            <div className="mx-auto max-w-xs rounded-xl border border-white/12 bg-[#141820]/90 px-5 py-8 text-center backdrop-blur-md">
              <p className="font-mono text-xs font-semibold text-[#2dd4bf]">
                SYSTEM TRAY MINIMIZED
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#8e97a8]">
                Click the tray indicator in the top-right bezel to summon the popover window.
              </p>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="mt-4 rounded-lg bg-[#e04819] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#c73c11]"
              >
                Summon Tray Window
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom hardware telemetry strip */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0b0d12] px-4 py-1.5 font-mono text-[10px] text-[#6d7688]">
        <span>RUST CORE · QUICKJS · 127.0.0.1:6736</span>
        <span className="text-[#8e97a8]">CLICK ANY CARD FOR 30D TREND</span>
      </div>
    </div>
  );
}
