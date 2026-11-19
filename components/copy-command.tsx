"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import {
  cliInstallCmd,
  linuxInstallCmd,
  windowsInstallCmd,
} from "@/lib/site";

type CopyCommandProps = {
  command?: string;
  promptSymbol?: string;
  label?: string;
  className?: string;
};

const TABS = [
  {
    id: "linux" as const,
    label: "Linux (.deb / .rpm / AppImage)",
    prompt: "$",
    cmd: linuxInstallCmd,
    note: "Auto-detects Debian/Ubuntu (.deb), Fedora/RHEL/openSUSE (.rpm), or Arch/other (.AppImage)",
  },
  {
    id: "windows" as const,
    label: "Windows 10/11",
    prompt: "PS>",
    cmd: windowsInstallCmd,
    note: "Native WebView2 tray app · NSIS setup + portable .zip available",
  },
  {
    id: "cli" as const,
    label: "Headless CLI",
    prompt: "$",
    cmd: cliInstallCmd,
    note: "Standalone crossusage-cli binary for Waybar, Polybar, tmux & scripts",
  },
];

export function CopyCommand({
  command,
  promptSymbol = "$",
  label = "copy_cmd",
  className,
}: CopyCommandProps) {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("linux");
  const [copied, setCopied] = useState(false);

  const currentTab = TABS.find((t) => t.id === active) ?? TABS[0];
  const textToCopy = command ?? currentTab.cmd;
  const prompt = command ? promptSymbol : currentTab.prompt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      track("command_copied", { label: command ? label : active });
      window.setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Clipboard write failed:", err);
    }
  };

  if (command) {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border border-[#1d222c] bg-[#0e1015] px-3.5 py-2.5 text-[#f1f3f7]",
          className
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto scrollbar-none font-mono text-[12px]">
          <span className="shrink-0 select-none font-bold text-[#2dd4bf]">
            {prompt}
          </span>
          <code className="whitespace-nowrap text-[#f1f3f7]">{command}</code>
        </div>
        <button
          type="button"
          onClick={() => void handleCopy()}
          aria-label="Copy command"
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-semibold transition-all",
            copied
              ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/15 text-[#2dd4bf]"
              : "border-white/15 bg-white/[0.06] text-[#f1f3f7] hover:border-white/30 hover:bg-white/[0.12]"
          )}
        >
          {copied ? (
            <>
              <Check className="size-3" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#1d222c] bg-[#0e1015] text-[#f1f3f7] shadow-[0_18px_40px_-18px_rgba(14,16,21,0.5)]",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#151921] px-3 py-2">
        <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Install platform">
          {TABS.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setActive(tab.id);
                  setCopied(false);
                }}
                className={cn(
                  "rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                  selected
                    ? "bg-[#e04819] text-white"
                    : "text-[#8e97a8] hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <span className="hidden items-center gap-1.5 pr-1 font-mono text-[10px] uppercase tracking-wider text-[#6d7688] sm:inline-flex">
          <Terminal className="size-3 text-[#2dd4bf]" aria-hidden />
          QUICK INSTALL
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 overflow-x-auto scrollbar-none font-mono text-[12px]">
          <span className="shrink-0 select-none font-bold text-[#2dd4bf]">
            {prompt}
          </span>
          <code className="whitespace-nowrap text-[#f1f3f7]">{textToCopy}</code>
        </div>
        <button
          type="button"
          onClick={() => void handleCopy()}
          aria-label="Copy install command"
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-all",
            copied
              ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/15 text-[#2dd4bf]"
              : "border-white/15 bg-white/[0.06] text-[#f1f3f7] hover:border-white/30 hover:bg-white/[0.12]"
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="border-t border-white/[0.06] bg-[#0a0c10] px-4 py-2 font-mono text-[10.5px] text-[#8e97a8]">
        {currentTab.note}
      </div>
    </div>
  );
}
