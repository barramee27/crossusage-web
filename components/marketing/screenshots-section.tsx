"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { cn } from "@/lib/utils";

type ViewFilter = "all" | "fig01" | "fig02" | "fig03";

const VIEWS: {
  id: Exclude<ViewFilter, "all">;
  index: string;
  title: string;
  detail: string;
  translateClass: string;
}[] = [
  {
    id: "fig01",
    index: "FIG.01",
    title: "Modern UI · Total Spend & Insights",
    detail:
      "Top navigation shell with cross-provider USD / Token donut ring, burn-rate insight alerts, community Polls tab, and grouped multi-account widgets.",
    translateClass: "translate-x-0",
  },
  {
    id: "fig02",
    index: "FIG.02",
    title: "Classic UI · Sidebar Rail",
    detail:
      "Ultra-compact vertical provider icon rail with instant Session, Weekly, and Credit progress bars across every active tool.",
    translateClass: "-translate-x-1/3",
  },
  {
    id: "fig03",
    index: "FIG.03",
    title: "Provider Detail · 30-Day Telemetry",
    detail:
      "Exact reset countdown timestamps, 30-day local SQLite history sparklines, and Today / Yesterday / 30-Day token & dollar breakdowns.",
    translateClass: "-translate-x-2/3",
  },
];

export function ScreenshotsSection({ version }: { version: string | null }) {
  const label = version ? `v${version}` : "v1.6.1";
  const [focus, setFocus] = useState<ViewFilter>("all");
  const focusedView = VIEWS.find((v) => v.id === focus) ?? null;

  return (
    <section
      id="screenshots"
      className="relative scroll-mt-20 border-b border-[var(--rule)] bg-[var(--paper-recessed)]/60"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>NATIVE DESKTOP CAPTURES · {label}</Eyebrow>
            <h2 className="mt-4 max-w-[22ch] text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Two complete interfaces.{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                One Rust engine.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--ink-secondary)] lg:text-right">
            Captured straight from the Linux x86_64 Tauri v2 build. Toggle between Modern and
            Classic anytime in{" "}
            <code className="rounded border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-1.5 py-0.5 font-mono text-xs text-[var(--ink)]">
              Settings → Appearance
            </code>
            .
          </p>
        </div>

        {/* Seamless architectural gallery frame */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--rule-strong)] bg-[#f6f7f9] shadow-[0_24px_60px_-32px_rgba(17,19,23,0.32)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] bg-[#0e1015] px-4 py-2.5 text-[#f1f3f7]">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFocus("all")}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-[10.5px] font-semibold transition-colors",
                  focus === "all"
                    ? "bg-[#e04819] text-white"
                    : "bg-white/[0.06] text-[#98a2b3] hover:text-white"
                )}
              >
                All Views (3-Up)
              </button>
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setFocus(v.id)}
                  className={cn(
                    "rounded-md px-2.5 py-1 font-mono text-[10.5px] font-semibold transition-colors",
                    focus === v.id
                      ? "bg-[#e04819] text-white"
                      : "bg-white/[0.06] text-[#98a2b3] hover:text-white"
                  )}
                >
                  {v.index}
                </button>
              ))}
            </div>
            <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#2dd4bf]">
              {focusedView ? `${focusedView.index} LOUPE · 1:1` : "1980 × 960 COMPOSITE"}
            </span>
          </div>

          <div className="bg-[#f6f7f9] p-1 sm:p-4">
            {focusedView ? (
              <div className="mx-auto max-w-[460px] overflow-hidden rounded-xl border border-[var(--rule)] bg-white shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/marketing/linux-showcase.png"
                  alt={`CrossUsage ${label} — ${focusedView.title}`}
                  width={1980}
                  height={960}
                  className={cn(
                    "h-auto w-[300%] max-w-none transition-transform duration-300",
                    focusedView.translateClass
                  )}
                />
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/marketing/linux-showcase.png"
                alt={`CrossUsage ${label} running natively on Linux — Modern UI Dashboard, Classic UI All Providers, and Classic UI Provider Detail`}
                width={1980}
                height={960}
                loading="lazy"
                className="h-auto w-full rounded-lg"
              />
            )}
          </div>

          <div className="grid divide-y divide-white/[0.08] border-t border-[#1d222c] bg-[#0e1015] md:grid-cols-3 md:divide-x md:divide-y-0">
            {VIEWS.map((item) => {
              const selected = focus === item.id;
              return (
                <button
                  key={item.index}
                  type="button"
                  onClick={() => setFocus(selected ? "all" : item.id)}
                  className={cn(
                    "p-5 text-left transition-colors sm:p-6",
                    selected
                      ? "bg-[#171c26]"
                      : "hover:bg-[#141820]"
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 font-mono text-[10px] font-bold",
                          selected
                            ? "bg-[#e04819] text-white"
                            : "bg-[#e04819]/20 text-[#ff7349]"
                        )}
                      >
                        {item.index}
                      </span>
                      <h3 className="text-sm font-bold text-[#f1f3f7]">{item.title}</h3>
                    </div>
                    <span className="font-mono text-[10px] text-[#2dd4bf]">
                      {selected ? "RESET" : "ZOOM →"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#98a2b3]">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
