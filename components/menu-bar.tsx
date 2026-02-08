"use client";

import { useState, useEffect } from "react";
import { AppleIcon, ControlCenterIcon, WifiIcon } from "@/lib/icons";
import { trayBarData } from "@/lib/mock-data";

function TrayIcon({ id = "tray-icon" }: { id?: string }) {
  const barWidth = 18;
  const barHeight = 18;
  const padding = 1.5;
  const gap = 1;
  const bars = trayBarData;
  const trackCount = bars.length;
  const totalGap = (trackCount - 1) * gap;
  const trackH = (barHeight - padding * 2 - totalGap) / trackCount;
  const radius = trackH / 3;

  return (
    <svg
      id={id}
      width={barWidth}
      height={barHeight}
      viewBox={`0 0 ${barWidth} ${barHeight}`}
      className="flex-shrink-0"
    >
      {bars.map((bar, i) => {
        const y = padding + i * (trackH + gap);
        const trackW = barWidth - padding * 2;
        const fillW = (trackW * bar.percent) / 100;
        return (
          <g key={bar.label}>
            <rect
              x={padding}
              y={y}
              width={trackW}
              height={trackH}
              rx={radius}
              fill="white"
              opacity={0.22}
            />
            <rect
              x={padding}
              y={y}
              width={fillW}
              height={trackH}
              rx={radius}
              fill="white"
              opacity={1}
            />
          </g>
        );
      })}
    </svg>
  );
}

/** macOS Battery icon */
function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 25 12" fill="currentColor" className={className}>
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      <rect x="23" y="3.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.35" />
      <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function formatTime(date: Date) {
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const d = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${month} ${d}\u2002${time}`;
}

function TimeDisplay() {
  const [display, setDisplay] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const update = () => setDisplay(formatTime(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="text-[13px] font-medium whitespace-nowrap"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      suppressHydrationWarning
    >
      {display}
    </span>
  );
}

export function MenuBar() {
  return (
    <div
      className="w-full h-[28px] flex items-center justify-between px-4 select-none"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        color: "var(--bar-fg)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Left: Apple icon + app name */}
      <div className="flex items-center gap-4">
        <AppleIcon className="w-[11px] h-[13px] -translate-y-[1px] opacity-90" />
        <span className="text-[13px] font-semibold opacity-90">Finder</span>
        <span className="text-[13px] opacity-60">File</span>
        <span className="text-[13px] opacity-60">Edit</span>
        <span className="text-[13px] opacity-60">View</span>
        <span className="text-[13px] opacity-60">Go</span>
        <span className="text-[13px] opacity-60">Window</span>
        <span className="text-[13px] opacity-60">Help</span>
      </div>

      {/* Right: OpenUsage tray first, then system icons, then date/time */}
      <MenuBarTray />
    </div>
  );
}

export function MenuBarTray({ trayIconId }: { trayIconId?: string } = {}) {
  return (
    <div className="flex items-center gap-[10px]">
      <TrayIcon id={trayIconId} />
      <WifiIcon className="h-[11px] w-auto opacity-85" />
      <BatteryIcon className="w-[24px] h-[11px] opacity-85" />
      <ControlCenterIcon className="h-[11px] w-auto opacity-85" />
      <TimeDisplay />
    </div>
  );
}
