"use client";

import { useState } from "react";
import { ArrowRight, BellRing, KeyRound, Layers, Lock, Radar, Wifi } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { upstreamRepo } from "@/lib/site";
import { cn } from "@/lib/utils";

type TrayModeId = "bars" | "pct" | "pie" | "fill";
type PipelineSourceId = "cursor" | "claude" | "rpc" | "keyring";

const PIPELINE_SOURCES: {
  id: PipelineSourceId;
  src: string;
  tag: string;
  provider: string;
  metricLabel: string;
  metricValue: string;
  barPct: number;
  barColor: string;
  rollup: string;
  footnote: string;
}[] = [
  {
    id: "cursor",
    src: "~/.cursor/ & state.vscdb",
    tag: "SQLite",
    provider: "Cursor · Personal",
    metricLabel: "Plan Usage",
    metricValue: "$167.78 left",
    barPct: 67,
    barColor: "#38bdf8",
    rollup: "$6.40 today · 4.8M tok",
    footnote: "SQLite read-only · Zero login popup",
  },
  {
    id: "claude",
    src: "~/.claude/ & ~/.codex/",
    tag: "OAuth JSON",
    provider: "Claude · Codex",
    metricLabel: "Session Quota",
    metricValue: "73% left",
    barPct: 73,
    barColor: "#4ade80",
    rollup: "$13.90 · 9.3M tok",
    footnote: "Reset clock · Burn pace · 30d SQLite",
  },
  {
    id: "rpc",
    src: "JetBrains / Antigravity LS",
    tag: "Local RPC",
    provider: "JetBrains AI + Antigravity",
    metricLabel: "Live IDE Quota",
    metricValue: "84% left",
    barPct: 84,
    barColor: "#a78bfa",
    rollup: "Live LS RPC + XML fallback",
    footnote: "Auto-discovers local language server port",
  },
  {
    id: "keyring",
    src: "libsecret / WinCred",
    tag: "Keyring",
    provider: "AES-256-GCM Vault",
    metricLabel: "Multi-Account Key",
    metricValue: "Sealed at rest",
    barPct: 100,
    barColor: "#2dd4bf",
    rollup: "96-bit IV · OS Keyring master key",
    footnote: "Secrets redacted from Host API logs",
  },
];

const TRAY_MODES: {
  id: TrayModeId;
  label: string;
  desc: string;
}[] = [
  { id: "bars", label: "Bars", desc: "Multi-provider live quota levels" },
  { id: "pct", label: "Logo+%", desc: "Brand glyph + tightest remaining %" },
  { id: "pie", label: "Pie", desc: "Radial ring sweep for primary window" },
  { id: "fill", label: "Fill", desc: "Liquid gauge proportional fill" },
];

export function FeaturesSection() {
  const [trayMode, setTrayMode] = useState<TrayModeId>("bars");
  const [sourceId, setSourceId] = useState<PipelineSourceId>("claude");
  const activeTray = TRAY_MODES.find((t) => t.id === trayMode) ?? TRAY_MODES[0];
  const activeSource =
    PIPELINE_SOURCES.find((s) => s.id === sourceId) ?? PIPELINE_SOURCES[1];

  return (
    <section
      id="architecture"
      className="relative scroll-mt-20 border-b border-[var(--rule)]"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>01 // SYSTEM ARCHITECTURE</Eyebrow>
            <h2 className="mt-4 max-w-[20ch] text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Engineered for{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                zero friction
              </span>{" "}
              on Linux &amp; Windows.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--ink-secondary)] lg:text-right">
            Native Rust workspace + Tauri v2 shell with sandboxed QuickJS plugins — carrying{" "}
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
            >
              OpenUsage
            </a>{" "}
            natively onto Linux and Windows desktops.
          </p>
        </div>

        {/* Architectural 12-col blueprint grid */}
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {/* Module A: Zero-Config Local Discovery (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.06)] sm:p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-[var(--signal)]">
                  <Radar className="size-4" aria-hidden />
                  MODULE A · AUTO-DISCOVERY
                </span>
                <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink-secondary)]">
                  0 LOGIN POPUPS
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
                Reads the tools you already signed into
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-secondary)]">
                Install CrossUsage and your quotas populate immediately. Click any local source
                below to inspect how QuickJS normalizes local state into telemetry.
              </p>
            </div>

            {/* Recessed dark hardware pipeline schematic */}
            <div className="mt-6 rounded-xl border border-[#1d222c] bg-[#0e1015] p-4 text-[#f1f3f7]">
              <div className="mb-3 flex items-center justify-between border-b border-white/[0.08] pb-2 font-mono text-[10px] text-[#8e97a8]">
                <span>LOCAL PROBE PIPELINE · CLICK TO INSPECT</span>
                <span className="inline-flex items-center gap-1.5 text-[#2dd4bf]">
                  <span className="size-1.5 rounded-full bg-[#2dd4bf]" />
                  READ-ONLY DISCOVERY
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="space-y-1.5 font-mono text-[11px]">
                  {PIPELINE_SOURCES.map((item) => {
                    const selected = item.id === sourceId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSourceId(item.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left transition-all",
                          selected
                            ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/12 text-white"
                            : "border-white/[0.08] bg-[#161a23] text-[#cbd5e1] hover:border-white/25"
                        )}
                      >
                        <span className="truncate">{item.src}</span>
                        <span
                          className={cn(
                            "shrink-0 text-[10px]",
                            selected ? "text-[#2dd4bf]" : "text-[#8e97a8]"
                          )}
                        >
                          {item.tag}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="hidden flex-col items-center gap-1 text-[#2dd4bf] sm:flex">
                  <div className="flex items-center gap-1">
                    <span className="h-px w-3 bg-[#2dd4bf]/40" />
                    <ArrowRight className="size-4" aria-hidden />
                  </div>
                  <span className="rounded border border-[#2dd4bf]/25 bg-[#2dd4bf]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#2dd4bf]">
                    QuickJS
                  </span>
                </div>

                <div className="rounded-lg border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 p-3.5">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#2dd4bf]">
                    {activeSource.provider}
                  </p>
                  <div className="mt-2.5 space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between font-mono text-[11px] text-white">
                        <span>{activeSource.metricLabel}</span>
                        <span
                          className="font-semibold"
                          style={{ color: activeSource.barColor }}
                        >
                          {activeSource.metricValue}
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/50">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${activeSource.barPct}%`,
                            backgroundColor: activeSource.barColor,
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between gap-2 border-t border-white/10 pt-2 font-mono text-[10.5px] text-white">
                      <span className="text-[#8e97a8]">Output</span>
                      <span className="truncate text-[#2dd4bf]">{activeSource.rollup}</span>
                    </div>
                    <p className="font-mono text-[10px] text-[#8e97a8]">
                      {activeSource.footnote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Module B: AES-256-GCM Vault Security (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.06)] sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-[#0d8563]">
                  <Lock className="size-4" aria-hidden />
                  MODULE B · VAULT SECURITY
                </span>
                <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink-secondary)]">
                  AES-256-GCM
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
                Sealed credentials at rest
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                Extra multi-account API keys and OAuth tokens are never left in plaintext JSON.{" "}
                <code className="rounded border border-[var(--rule)] bg-[var(--paper-recessed)] px-1.5 py-0.5 font-mono text-xs text-[var(--ink)]">
                  provider_accounts.json
                </code>{" "}
                is encrypted with a master key held in your OS keyring.
              </p>
            </div>

            <div className="mt-6 space-y-2 rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-4 font-mono text-xs">
              <div className="flex items-center justify-between rounded-lg border border-[var(--rule)] bg-white px-3 py-2">
                <span className="text-[var(--ink-muted)]">Cipher</span>
                <span className="font-semibold text-[var(--ink)]">AES-256-GCM (96-bit IV)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[var(--rule)] bg-white px-3 py-2">
                <span className="text-[var(--ink-muted)]">Linux Keyring</span>
                <span className="font-semibold text-[#0d8563]">Secret Service / libsecret</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[var(--rule)] bg-white px-3 py-2">
                <span className="text-[var(--ink-muted)]">Windows Keyring</span>
                <span className="font-semibold text-[#0d8563]">Credential Manager</span>
              </div>
              <div className="flex items-center gap-2 pt-1.5 text-[11px] text-[var(--ink-secondary)]">
                <KeyRound className="size-3.5 shrink-0 text-[var(--signal)]" aria-hidden />
                <span>Host API redacts Bearer, Cookie, and JWE secrets from logs</span>
              </div>
            </div>
          </div>

          {/* Module C: Multi-Account + Custom Base Labels (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.06)] sm:p-8 lg:col-span-5">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-[var(--ink)]">
                <Layers className="size-4 text-[var(--signal)]" aria-hidden />
                MODULE C · MULTI-ACCOUNT
              </span>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
                Personal + Company seats side by side
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                Add unlimited extra accounts per provider and rename your default base account
                (Personal, Work, Client) without duplicating credentials.
              </p>
            </div>

            <div className="mt-6 space-y-2 rounded-xl border border-[var(--rule)] bg-[var(--paper)] p-3.5">
              {[
                {
                  name: "Cursor · Personal",
                  plan: "Ultra",
                  value: "$167.78 left",
                  pct: 67,
                  color: "#16a34a",
                },
                {
                  name: "Cursor · Work",
                  plan: "Business",
                  value: "79% left",
                  pct: 79,
                  color: "#0d8563",
                },
                {
                  name: "Claude · Max 5x",
                  plan: "Max",
                  value: "42% left",
                  pct: 42,
                  color: "#e04819",
                },
              ].map((acct) => (
                <div
                  key={acct.name}
                  className="rounded-lg border border-[var(--rule)] bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(17,19,23,0.03)]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--ink)]">{acct.name}</span>
                    <span className="rounded border border-[var(--rule)] bg-[var(--paper-recessed)] px-1.5 py-0.5 font-mono text-[10px] font-medium text-[var(--ink-secondary)]">
                      {acct.plan}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--paper-recessed)]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${acct.pct}%`, backgroundColor: acct.color }}
                      />
                    </div>
                    <span className="font-mono text-[11px] font-semibold tabular-nums text-[var(--ink-secondary)]">
                      {acct.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module D: Burn-Rate Pace Engine & 4 Tray Modes (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.06)] sm:p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-[var(--signal)]">
                  <BellRing className="size-4" aria-hidden />
                  MODULE D · PACE ENGINE &amp; TRAY ICONS
                </span>
                <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink-secondary)]">
                  4 TRAY MODES
                </span>
              </div>
              <h3 className="mt-3 text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
                Catch runaway token burn before the wall hits
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-secondary)]">
                CrossUsage compares remaining quota against elapsed reset window time — coloring
                progress bars by pace, firing native desktop alerts, and rendering live tray icons.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {/* SVG Pace Trajectory Card */}
              <div className="rounded-xl border border-[var(--rule)] bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
                    Window Pace Curve
                  </p>
                  <span className="rounded bg-[#dc2626]/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#dc2626]">
                    1.4× BURN ALERT
                  </span>
                </div>

                {/* Precision Swiss Engineering SVG Chart */}
                <svg
                  viewBox="0 0 240 82"
                  className="mt-3 h-20 w-full overflow-visible"
                  aria-label="Quota burn pace vs linear baseline"
                >
                  <line x1="0" y1="12" x2="240" y2="12" stroke="rgba(17,19,23,0.08)" />
                  <line x1="0" y1="42" x2="240" y2="42" stroke="rgba(17,19,23,0.08)" />
                  <line x1="0" y1="72" x2="240" y2="72" stroke="rgba(17,19,23,0.16)" />

                  <line
                    x1="4"
                    y1="12"
                    x2="236"
                    y2="72"
                    stroke="#0d8563"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />

                  <path
                    d="M 4 12 Q 78 24, 134 50 T 174 72"
                    fill="none"
                    stroke="#e04819"
                    strokeWidth="2.2"
                  />
                  <circle cx="134" cy="50" r="3.5" fill="#e04819" />
                  <circle cx="174" cy="72" r="3" fill="#dc2626" />

                  <text x="6" y="9" fontSize="8" fill="#6e7480" fontFamily="monospace">
                    100% QUOTA
                  </text>
                  <text
                    x="236"
                    y="62"
                    textAnchor="end"
                    fontSize="8"
                    fill="#dc2626"
                    fontFamily="monospace"
                  >
                    EXHAUSTS EARLY
                  </text>
                </svg>

                <div className="mt-2 flex items-center justify-between border-t border-[var(--rule)] pt-2 font-mono text-[10.5px]">
                  <span className="inline-flex items-center gap-1.5 text-[#0d8563]">
                    <span className="inline-block h-0.5 w-3 bg-[#0d8563]" />
                    1.0× Linear
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#e04819]">
                    <span className="inline-block h-0.5 w-3 bg-[#e04819]" />
                    Actual Burn
                  </span>
                </div>
              </div>

              {/* Interactive Tray Styles Card + Live OS Bar Preview */}
              <div className="flex flex-col justify-between rounded-xl border border-[#1d222c] bg-[#0e1015] p-4 text-[#f1f3f7]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8e97a8]">
                      Interactive Tray Modes
                    </p>
                    <span className="font-mono text-[10px] text-[#2dd4bf]">
                      CLICK TO PREVIEW
                    </span>
                  </div>

                  {/* Simulated OS Status Bar showing selected tray icon */}
                  <div className="mt-2.5 flex items-center justify-between rounded-lg border border-white/10 bg-[#080a0f] px-3 py-1.5 font-mono text-[10.5px]">
                    <span className="text-[#646e82]">WAYBAR / TRAY</span>
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 rounded border border-[#2dd4bf]/40 bg-[#2dd4bf]/10 px-2 py-0.5 text-[#2dd4bf]">
                        {trayMode === "bars" && (
                          <span className="inline-flex items-end gap-[2px]">
                            <i className="block h-2.5 w-1 rounded-[1px] bg-[#2dd4bf]" />
                            <i className="block h-3 w-1 rounded-[1px] bg-[#4ade80]" />
                            <i className="block h-1.5 w-1 rounded-[1px] bg-[#fbbf24]" />
                          </span>
                        )}
                        {trayMode === "pct" && <span className="font-bold">73%</span>}
                        {trayMode === "pie" && (
                          <span className="inline-block size-3 rounded-full border-2 border-[#2dd4bf] border-t-white/20" />
                        )}
                        {trayMode === "fill" && (
                          <span className="inline-block size-3 rounded-[2px] border border-white/40 bg-gradient-to-t from-[#e04819] from-65% to-transparent to-65%" />
                        )}
                      </span>
                      <Wifi className="size-3 text-[#8e97a8]" aria-hidden />
                      <span className="text-[#cbd5e1]">22:15</span>
                    </div>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    {TRAY_MODES.map((m) => {
                      const active = trayMode === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setTrayMode(m.id)}
                          className={cn(
                            "flex items-center justify-between rounded-lg border px-2.5 py-1.5 transition-all",
                            active
                              ? "border-[#2dd4bf]/60 bg-[#2dd4bf]/12 text-white"
                              : "border-white/[0.08] bg-[#161a23] text-[#8e97a8] hover:border-white/25 hover:text-white"
                          )}
                        >
                          <span>{m.label}</span>
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              active ? "bg-[#2dd4bf]" : "bg-white/20"
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="mt-2.5 border-t border-white/[0.08] pt-2 font-mono text-[10.5px] text-[#98a2b3]">
                  <span className="text-[#2dd4bf]">{activeTray.label}:</span> {activeTray.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
