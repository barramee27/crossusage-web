"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, Monitor } from "lucide-react";

type DetectedOs = "linux" | "windows" | "macos" | null;

const emptySubscribe = () => () => {};

function getClientOs(): DetectedOs {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("win")) return "windows";
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux") || ua.includes("x11")) return "linux";
  return null;
}

export function DownloadOsBanner({
  version,
  dlBase,
}: {
  version: string;
  dlBase: string;
}) {
  const os = useSyncExternalStore(emptySubscribe, getClientOs, () => null);

  if (!os) return null;

  const rec =
    os === "windows"
      ? {
          osLabel: "Windows (x64)",
          file: `crossusage_${version}_x64-setup.exe`,
          href: `${dlBase}/crossusage_${version}_x64-setup.exe`,
          note: "NSIS installer with signed WebView2 auto-updater + CLI",
        }
      : os === "linux"
        ? {
            osLabel: "Linux (x86_64)",
            file: `crossusage_${version}_amd64.deb`,
            href: `${dlBase}/crossusage_${version}_amd64.deb`,
            note: "Or run the one-line installer below for .deb / .rpm / AppImage auto-detection",
          }
        : {
            osLabel: "macOS",
            file: `crossusage-cli (via curl installer)`,
            href: "#headless-cli",
            note: "GUI on macOS is served by upstream OpenUsage; CrossUsage CLI runs natively in Terminal",
          };

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1d222c] bg-[#0e1015] px-5 py-4 text-[#f1f3f7] shadow-[0_18px_40px_-24px_rgba(14,16,21,0.5)]">
      <div className="flex items-start gap-3 sm:items-center">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2dd4bf]/15 text-[#2dd4bf]">
          <Monitor className="size-4.5" aria-hidden />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2dd4bf]">
              <CheckCircle2 className="size-3" aria-hidden />
              DETECTED: {rec.osLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#98a2b3]">{rec.note}</p>
        </div>
      </div>

      <a href={rec.href} className="keycap-signal shrink-0 !py-2 !text-xs">
        {os === "macos" ? "Jump to macOS CLI" : `Download ${rec.file}`}
      </a>
    </div>
  );
}
