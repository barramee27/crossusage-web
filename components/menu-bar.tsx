"use client";

import { useState, useEffect } from "react";
import { AppleIcon } from "@/lib/icons";
import { trayBarData } from "@/lib/mock-data";

function TrayIcon() {
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

/** macOS Wi-Fi icon — concentric arcs */
function WiFiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 20" fill="currentColor" className={className}>
      <path
        d="M14 17.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5z"
        opacity="1"
      />
      <path
        d="M14 12.5c2.1 0 4 .85 5.38 2.23l-1.76 1.77A4.97 4.97 0 0 0 14 15a4.97 4.97 0 0 0-3.62 1.5l-1.76-1.77A7.46 7.46 0 0 1 14 12.5z"
        opacity="0.95"
      />
      <path
        d="M14 7c3.59 0 6.84 1.46 9.19 3.81l-1.77 1.77A10.43 10.43 0 0 0 14 9.5c-2.9 0-5.52 1.17-7.42 3.08L4.81 10.81A12.93 12.93 0 0 1 14 7z"
        opacity="0.85"
      />
      <path
        d="M14 1.5c5.06 0 9.64 2.05 12.96 5.37l-1.77 1.77A16.38 16.38 0 0 0 14 4 16.38 16.38 0 0 0 2.81 8.64L1.04 6.87A18.37 18.37 0 0 1 14 1.5z"
        opacity="0.7"
      />
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

/** macOS Control Center icon — two horizontal toggles */
function ControlCenterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 14" fill="currentColor" className={className}>
      <rect x="0" y="1" width="18" height="4" rx="2" opacity="0.35" />
      <circle cx="14" cy="3" r="3" opacity="0.9" />
      <rect x="0" y="9" width="18" height="4" rx="2" opacity="0.35" />
      <circle cx="4" cy="11" r="3" opacity="0.9" />
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
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    setDisplay(formatTime(new Date()));
    const id = setInterval(() => {
      setDisplay(formatTime(new Date()));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="text-[13px] font-medium whitespace-nowrap"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
      suppressHydrationWarning
    >
      {display ?? "\u00A0"}
    </span>
  );
}

export function MenuBar() {
  return (
    <div
      className="w-full h-[28px] flex items-center justify-between px-4 select-none"
      style={{
        background: "var(--bar-bg)",
        color: "var(--bar-fg)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Left: Apple icon + app name */}
      <div className="flex items-center gap-4">
        <AppleIcon className="w-[11px] h-[13px] opacity-90" />
        <span className="text-[13px] font-semibold opacity-90">Finder</span>
        <span className="text-[13px] opacity-60">File</span>
        <span className="text-[13px] opacity-60">Edit</span>
        <span className="text-[13px] opacity-60">View</span>
        <span className="text-[13px] opacity-60">Go</span>
        <span className="text-[13px] opacity-60">Window</span>
        <span className="text-[13px] opacity-60">Help</span>
      </div>

      {/* Right: OpenUsage tray first, then system icons, then date/time */}
      <div className="flex items-center gap-[10px]">
        <TrayIcon />
        <WiFiIcon className="w-[14px] h-[11px] opacity-85" />
        <BatteryIcon className="w-[24px] h-[11px] opacity-85" />
        <ControlCenterIcon className="w-[15px] h-[10px] opacity-85" />
        <TimeDisplay />
      </div>
    </div>
  );
}
