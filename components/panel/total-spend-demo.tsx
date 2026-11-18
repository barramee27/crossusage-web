"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Period = "Today" | "Yesterday" | "7D" | "30D";
type Metric = "spend" | "tokens";

const PERIODS: Period[] = ["Today", "Yesterday", "7D", "30D"];

type SliceData = {
  id: string;
  name: string;
  color: string;
  spend: Record<Period, number>;
  tokensM: Record<Period, number>;
};

const SLICES: SliceData[] = [
  {
    id: "cursor",
    name: "Cursor",
    color: "#38bdf8",
    spend: { Today: 6.4, Yesterday: 5.1, "7D": 41.8, "30D": 154.2 },
    tokensM: { Today: 4.8, Yesterday: 3.9, "7D": 31.4, "30D": 118.0 },
  },
  {
    id: "codex",
    name: "Codex",
    color: "#34d399",
    spend: { Today: 4.2, Yesterday: 2.8, "7D": 26.5, "30D": 89.4 },
    tokensM: { Today: 2.4, Yesterday: 1.7, "7D": 16.9, "30D": 62.5 },
  },
  {
    id: "claude",
    name: "Claude",
    color: "#de7356",
    spend: { Today: 2.35, Yesterday: 3.4, "7D": 19.2, "30D": 72.1 },
    tokensM: { Today: 1.3, Yesterday: 2.1, "7D": 12.1, "30D": 45.8 },
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    color: "#a78bfa",
    spend: { Today: 0.95, Yesterday: 0.6, "7D": 6.4, "30D": 24.8 },
    tokensM: { Today: 0.8, Yesterday: 0.5, "7D": 5.3, "30D": 19.4 },
  },
];

const RING_SIZE = 84;

function donutSectorPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startFrac: number,
  endFrac: number
): string {
  const gap = 0.006;
  const start = (startFrac + gap) * Math.PI * 2;
  const end = (endFrac - gap) * Math.PI * 2;
  if (end <= start) return "";
  const large = end - start > Math.PI ? 1 : 0;
  const ox1 = cx + outerR * Math.cos(start);
  const oy1 = cy + outerR * Math.sin(start);
  const ox2 = cx + outerR * Math.cos(end);
  const oy2 = cy + outerR * Math.sin(end);
  const ix1 = cx + innerR * Math.cos(end);
  const iy1 = cy + innerR * Math.sin(end);
  const ix2 = cx + innerR * Math.cos(start);
  const iy2 = cy + innerR * Math.sin(start);
  return [
    `M ${ox1} ${oy1}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${ox2} ${oy2}`,
    `L ${ix1} ${iy1}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${ix2} ${iy2}`,
    "Z",
  ].join(" ");
}

export function TotalSpendDemo() {
  const [period, setPeriod] = useState<Period>("Today");
  const [metric, setMetric] = useState<Metric>("spend");
  const [activeSlice, setActiveSlice] = useState<string | null>(null);

  const values = SLICES.map((s) =>
    metric === "spend" ? s.spend[period] : s.tokensM[period]
  );
  const total = values.reduce((a, b) => a + b, 0);

  const arcs = SLICES.reduce<
    (SliceData & { value: number; pct: number; start: number; end: number })[]
  >((acc, s, idx) => {
    const start = acc.length > 0 ? acc[acc.length - 1].end : -0.25;
    const share = values[idx] / Math.max(total, 1e-6);
    const end = start + share;
    acc.push({
      ...s,
      value: values[idx],
      pct: Math.round(share * 100),
      start,
      end,
    });
    return acc;
  }, []);

  const focused = activeSlice ? arcs.find((a) => a.id === activeSlice) : null;

  const centerText = focused
    ? metric === "spend"
      ? `$${focused.value.toFixed(2)}`
      : `${focused.value.toFixed(1)}M`
    : metric === "spend"
      ? total >= 100
        ? `$${Math.round(total)}`
        : `$${total.toFixed(2)}`
      : `${total.toFixed(1)}M`;

  const centerSub = focused
    ? `${focused.pct}%`
    : metric === "spend"
      ? "USD"
      : "TOK";

  return (
    <section className="space-y-1.5">
      <div className="flex items-center justify-between px-0.5">
        <button
          type="button"
          onClick={() => setMetric((m) => (m === "spend" ? "tokens" : "spend"))}
          className="inline-flex items-center gap-1 rounded px-1 py-0.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
          title="Switch between Total Spend and Token Volume"
        >
          {metric === "spend" ? "Total Spend" : "Total Tokens"}
          <span className="text-[10px] text-muted-foreground">▾</span>
        </button>
        <span className="font-mono text-[10px] text-muted-foreground">
          {focused ? focused.name : "Local log rollup"}
        </span>
      </div>

      <div className="rounded-lg border border-border bg-card/85 px-3 py-2">
        <div className="mb-2 flex rounded-full bg-muted/70 p-0.5">
          {PERIODS.map((p) => {
            const selected = p === period;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={cn(
                  "flex-1 rounded-full px-1.5 py-0.5 text-[10.5px] transition-colors",
                  selected
                    ? "bg-background font-semibold text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {p}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3.5">
          <div
            className="relative shrink-0"
            style={{ width: RING_SIZE, height: RING_SIZE }}
          >
            <svg
              width={RING_SIZE}
              height={RING_SIZE}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              aria-hidden
            >
              {arcs.map((arc) => {
                const isFocused = activeSlice === arc.id;
                const dimmed = activeSlice !== null && !isFocused;
                return (
                  <path
                    key={arc.id}
                    d={donutSectorPath(
                      RING_SIZE / 2,
                      RING_SIZE / 2,
                      isFocused ? RING_SIZE / 2 - 1 : RING_SIZE / 2 - 2.5,
                      RING_SIZE * 0.3,
                      arc.start,
                      arc.end
                    )}
                    fill={arc.color}
                    opacity={dimmed ? 0.35 : 1}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setActiveSlice(arc.id)}
                    onMouseLeave={() => setActiveSlice(null)}
                  />
                );
              })}
            </svg>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[12px] font-bold tabular-nums leading-none text-foreground">
                {centerText}
              </span>
              <span className="mt-0.5 text-[8.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                {centerSub}
              </span>
            </div>
          </div>

          <ul className="min-w-0 flex-1 space-y-0.5">
            {arcs.map((arc) => {
              const isFocused = activeSlice === arc.id;
              return (
                <li
                  key={arc.id}
                  onMouseEnter={() => setActiveSlice(arc.id)}
                  onMouseLeave={() => setActiveSlice(null)}
                  className={cn(
                    "flex cursor-default items-center justify-between gap-2 rounded px-1 py-0.5 text-[11.5px] transition-colors",
                    isFocused && "bg-muted/80"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: arc.color }}
                    />
                    <span className="truncate text-foreground">{arc.name}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                    {metric === "spend"
                      ? `$${arc.value.toFixed(2)}`
                      : `${arc.value.toFixed(1)}M`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
