"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Command,
  Copy,
  Download,
  FileCode2,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { displayColor, plugins } from "@/lib/plugins";
import { ProviderIcon } from "@/components/provider-icon";
import { cliInstallCmd, linuxInstallCmd, windowsInstallCmd } from "@/lib/site";
import { cn } from "@/lib/utils";

type PaletteItem = {
  id: string;
  group: "Actions" | "Sections" | "Providers";
  label: string;
  sublabel: string;
  keywords: string;
  icon?: string;
  color?: string;
  onSelect: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 20);
    return () => window.clearTimeout(t);
  }, [open]);

  const items: PaletteItem[] = useMemo(() => {
    const copyCmd = (id: string, cmd: string) => {
      void navigator.clipboard.writeText(cmd);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1400);
    };

    const navTo = (href: string) => {
      setOpen(false);
      router.push(href);
    };

    const actions: PaletteItem[] = [
      {
        id: "act-download",
        group: "Actions",
        label: "Download CrossUsage Packages",
        sublabel: ".deb · .rpm · AppImage · tar.gz · Windows NSIS",
        keywords: "install download deb rpm exe appimage arch fedora ubuntu opensuse nixos tar.gz",
        onSelect: () => navTo("/download"),
      },
      {
        id: "act-linux",
        group: "Actions",
        label: "Copy Linux One-Line Installer",
        sublabel: "curl -fsSL .../install.sh | bash",
        keywords: "copy linux ubuntu debian fedora opensuse arch manjaro nixos bash zypper dnf",
        onSelect: () => copyCmd("act-linux", linuxInstallCmd),
      },
      {
        id: "act-windows",
        group: "Actions",
        label: "Copy Windows PowerShell Installer",
        sublabel: "irm .../install.ps1 | iex",
        keywords: "copy windows powershell exe winget",
        onSelect: () => copyCmd("act-windows", windowsInstallCmd),
      },
      {
        id: "act-cli",
        group: "Actions",
        label: "Copy Headless CLI Installer",
        sublabel: "INSTALL_MODE=cli bash",
        keywords: "copy cli headless macos terminal",
        onSelect: () => copyCmd("act-cli", cliInstallCmd),
      },
    ];

    const sections: PaletteItem[] = [
      {
        id: "sec-arch",
        group: "Sections",
        label: "01 // System Architecture",
        sublabel: "Auto-discovery, AES-256-GCM vault, 4 tray modes",
        keywords: "architecture security keyring tray",
        onSelect: () => navTo("/#architecture"),
      },
      {
        id: "sec-providers",
        group: "Sections",
        label: `02 // Plugin Catalog (${plugins.length} Providers)`,
        sublabel: "Search QuickJS manifests & local discovery",
        keywords: "providers plugins catalog",
        onSelect: () => navTo("/#providers"),
      },
      {
        id: "sec-api",
        group: "Sections",
        label: "03 // Loopback API & CLI",
        sublabel: "127.0.0.1:6736/v1/usage · Waybar · tmux",
        keywords: "api json localhost cli waybar",
        onSelect: () => navTo("/#api"),
      },
      {
        id: "sec-gov",
        group: "Sections",
        label: "04 // Open Source & Poll-First Policy",
        sublabel: "Contributors, OpenUsage lineage, community polls",
        keywords: "governance polls credits openusage",
        onSelect: () => navTo("/#governance"),
      },
    ];

    const providerItems: PaletteItem[] = plugins.map((p) => ({
      id: `prov-${p.id}`,
      group: "Providers",
      label: p.name,
      sublabel: `${p.authMode} · ${p.metrics.slice(0, 3).join(", ")}`,
      keywords: `${p.id} ${p.name} ${p.authMode} ${p.metrics.join(" ")}`,
      icon: p.icon,
      color: displayColor(p.brandColor),
      onSelect: () => {
        setOpen(false);
        router.push("/#providers");
        window.setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("crossusage:select-provider", { detail: p.id })
          );
          document
            .getElementById("providers")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      },
    }));

    return [...actions, ...sections, ...providerItems];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 12);
    return items
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.sublabel.toLowerCase().includes(q) ||
          item.keywords.toLowerCase().includes(q)
      )
      .slice(0, 14);
  }, [items, query]);

  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        i <= 0 ? Math.max(filtered.length - 1, 0) : i - 1
      );
    } else if (e.key === "Enter" && filtered[safeIndex]) {
      e.preventDefault();
      filtered[safeIndex].onSelect();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }}
        aria-label="Open quick jump command palette"
        className="hidden items-center gap-2 rounded-md border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[var(--ink-secondary)] transition-colors hover:border-[var(--ink)] hover:bg-white hover:text-[var(--ink)] md:inline-flex"
      >
        <Search className="size-3.5 text-[var(--ink-muted)]" aria-hidden />
        <span>Jump</span>
        <kbd className="inline-flex items-center gap-0.5 rounded border border-[var(--rule)] bg-[var(--paper)] px-1 py-0.5 text-[9.5px] text-[var(--ink-muted)]">
          <Command className="size-2.5" />K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#0e1015]/55 px-4 pt-[12vh] backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Quick Jump Palette"
          onClick={() => setOpen(false)}
        >
          <div
            className="sim-pop w-full max-w-xl overflow-hidden rounded-2xl border border-[#1d222c] bg-[#0e1015] text-[#f1f3f7] shadow-[0_32px_90px_-16px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-[#141820] px-4 py-3">
              <Search className="size-4 shrink-0 text-[#2dd4bf]" aria-hidden />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to provider, section, or copy install command..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-[#6d7688] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close palette"
                className="rounded border border-white/12 p-1 text-[#8e97a8] hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const selected = idx === safeIndex;
                  const isCopied = copiedId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setActiveIndex(idx)}
                      onClick={item.onSelect}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        selected ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#161a23]">
                        {item.icon ? (
                          <ProviderIcon
                            src={item.icon}
                            color={
                              item.color === "#111317"
                                ? "#f1f4f9"
                                : (item.color ?? "#f1f4f9")
                            }
                            className="size-4"
                          />
                        ) : item.id === "act-download" ? (
                          <Download className="size-4 text-[#ff7349]" />
                        ) : item.group === "Actions" ? (
                          isCopied ? (
                            <Check className="size-4 text-[#2dd4bf]" />
                          ) : (
                            <Copy className="size-4 text-[#2dd4bf]" />
                          )
                        ) : item.group === "Sections" ? (
                          <Terminal className="size-4 text-[#ff7349]" />
                        ) : (
                          <FileCode2 className="size-4 text-[#8e97a8]" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-xs font-bold text-white">
                            {isCopied ? "Copied to clipboard!" : item.label}
                          </span>
                          <span className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#8e97a8]">
                            {item.group}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate font-mono text-[10.5px] text-[#8e97a8]">
                          {item.sublabel}
                        </p>
                      </div>

                      <ArrowRight
                        className={cn(
                          "size-3.5 shrink-0 transition-opacity",
                          selected ? "text-[#2dd4bf] opacity-100" : "opacity-0"
                        )}
                      />
                    </button>
                  );
                })
              ) : (
                <p className="px-4 py-8 text-center font-mono text-xs text-[#8e97a8]">
                  No match for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] bg-[#0a0c10] px-4 py-2 font-mono text-[10px] text-[#6d7688]">
              <span>↑↓ navigate · ↵ select · esc close</span>
              <span className="text-[#8e97a8]">{plugins.length} PROVIDERS INDEXED</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
