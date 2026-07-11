"use client";

import { useCallback, useEffect, useState } from "react";
import type { ActiveView } from "@/lib/types";
import { trayBarData } from "@/lib/mock-data";
import { Panel } from "@/components/panel/panel";
import { ModernPanel, type ModernTab } from "@/components/panel/modern-panel";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

export type DemoLayout = "classic" | "modern";

const CLASSIC_STEPS = [
  {
    id: "overview",
    label: "Overview",
    hint: "All providers at a glance — tap a card to open details.",
  },
  {
    id: "cursor-work",
    label: "Multi-account",
    hint: "Cursor + Cursor (Work) — two logins, same provider.",
  },
  {
    id: "settings",
    label: "Settings",
    hint: "Layout, refresh, encryption — demo only, nothing saves.",
  },
] as const;

const MODERN_STEPS = [
  {
    id: "dashboard",
    label: "Dashboard",
    hint: "Grouped provider cards — Cursor + Cursor (Work) as sibling cards.",
  },
  {
    id: "customize",
    label: "Customize",
    hint: "Show/hide metrics per provider. Real app also drag-reorders + tray pins.",
  },
  {
    id: "settings",
    label: "Settings",
    hint: "Same settings — Layout shows Modern while you’re in this demo.",
  },
] as const;

type ClassicStepId = (typeof CLASSIC_STEPS)[number]["id"];

function classicStepToView(step: ClassicStepId): ActiveView {
  return step;
}

function viewToClassicStep(view: ActiveView): ClassicStepId {
  if (view === "settings") return "settings";
  if (view === "cursor-work" || view === "cursor") return "cursor-work";
  return "overview";
}

export function AppViewport({ version }: { version: string | null }) {
  const [layout, setLayout] = useState<DemoLayout>("modern");
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<ActiveView>("overview");
  const [modernTab, setModernTab] = useState<ModernTab>("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);
  const [pulseTray, setPulseTray] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setPulseTray(false), 2800);
    return () => window.clearTimeout(t);
  }, []);

  const classicStep = viewToClassicStep(view);
  const steps = layout === "modern" ? MODERN_STEPS : CLASSIC_STEPS;
  const activeStepId = layout === "modern" ? modernTab : classicStep;
  const hint =
    steps.find((s) => s.id === activeStepId)?.hint ??
    "Click around — lightweight React mock, no WASM.";

  const setDemoLayout = useCallback((next: DemoLayout) => {
    setLayout(next);
    setOpen(true);
    track("viewport_layout", { layout: next });
  }, []);

  const goClassicStep = useCallback((step: ClassicStepId) => {
    setOpen(true);
    setView(classicStepToView(step));
    track("viewport_step", { step, layout: "classic" });
  }, []);

  const goModernStep = useCallback((step: ModernTab) => {
    setOpen(true);
    setModernTab(step);
    track("viewport_step", { step, layout: "modern" });
  }, []);

  const onViewChange = useCallback((next: ActiveView) => {
    setView(next);
    track("viewport_navigate", { view: next });
  }, []);

  const onModernTabChange = useCallback((next: ModernTab) => {
    setModernTab(next);
    track("viewport_navigate", { view: next });
  }, []);

  const onTrayClick = useCallback(() => {
    setOpen((v) => !v);
    setPulseTray(false);
    track("viewport_tray_toggle");
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    track("viewport_refresh");
  }, []);

  return (
    <div className="w-full">
      {/* Layout toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
          Layout
        </span>
        {(["modern", "classic"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setDemoLayout(id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition-colors",
              layout === id
                ? "border-[var(--page-accent)] bg-[var(--page-accent-soft)] text-[var(--page-accent-ink)]"
                : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
            )}
          >
            {id}
          </button>
        ))}
      </div>

      {/* Guided steps */}
      <div className="mb-5 flex flex-wrap gap-2">
        {layout === "modern"
          ? MODERN_STEPS.map((step, i) => {
              const active = modernTab === step.id && open;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goModernStep(step.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-left text-xs transition-colors",
                    active
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-60">{i + 1}.</span>{" "}
                  {step.label}
                </button>
              );
            })
          : CLASSIC_STEPS.map((step, i) => {
              const active = classicStep === step.id && open;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => goClassicStep(step.id)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-left text-xs transition-colors",
                    active
                      ? "border-white/40 bg-white/10 text-white"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-60">{i + 1}.</span>{" "}
                  {step.label}
                </button>
              );
            })}
      </div>

      <p className="mb-6 min-h-[2.5rem] text-sm leading-relaxed text-white/60">
        {open ? hint : "Panel closed — click the tray bars to reopen (like the real app)."}
      </p>

      {/* Desktop chrome */}
      <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#1a1f2e] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-2 border-b border-white/8 bg-[#12161f] px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[11px] text-white/40">
            CrossUsage demo — {layout === "modern" ? "Modern" : "Classic"}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/55 transition-colors hover:border-white/25 hover:text-white"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="relative flex min-h-[420px] flex-col bg-[linear-gradient(160deg,#0e1219_0%,#1a2230_55%,#121820_100%)] sm:min-h-[480px]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />

          <div className="relative flex flex-1 items-center justify-center p-4 sm:p-6">
            {open ? (
              <div className="viewport-panel-in w-full max-w-[400px]">
                {layout === "modern" ? (
                  <ModernPanel
                    version={version}
                    tab={modernTab}
                    onTabChange={onModernTabChange}
                    refreshKey={refreshKey}
                  />
                ) : (
                  <Panel
                    version={version}
                    view={view}
                    onViewChange={onViewChange}
                    refreshKey={refreshKey}
                  />
                )}
              </div>
            ) : (
              <p className="max-w-xs text-center text-sm text-white/45">
                Tray panel hidden. Click the usage bars in the corner to open again.
              </p>
            )}
          </div>

          <div className="relative z-[1] flex items-center justify-end gap-3 border-t border-white/8 bg-[#0a0d12]/90 px-3 py-2 backdrop-blur-sm">
            <span className="mr-auto hidden font-mono text-[10px] text-white/30 sm:inline">
              System tray
            </span>
            <button
              type="button"
              onClick={onTrayClick}
              title="Toggle CrossUsage panel"
              aria-label="Toggle CrossUsage panel"
              className={cn(
                "flex items-end gap-1 rounded-md border px-2.5 py-1.5 transition-all",
                pulseTray
                  ? "border-[var(--page-accent)]/60 bg-[var(--page-accent)]/15 shadow-[0_0_0_3px_rgba(15,159,122,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              )}
            >
              {trayBarData.map((bar) => (
                <span
                  key={bar.label}
                  className="flex w-2.5 flex-col items-center gap-0.5"
                  title={`${bar.label}: ${bar.percent}% left`}
                >
                  <span
                    className="w-full rounded-sm bg-[var(--page-accent)]"
                    style={{ height: `${Math.max(4, (bar.percent / 100) * 18)}px` }}
                  />
                </span>
              ))}
            </button>
            <span className="font-mono text-[10px] tabular-nums text-white/35">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-white/40">
        Lightweight React mock — Classic sidebar or Modern tabs. No WASM.
      </p>
    </div>
  );
}
