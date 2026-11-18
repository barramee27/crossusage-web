"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Github, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { CommandPalette } from "@/components/command-palette";
import { githubRepoUrl } from "@/lib/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/#architecture", sectionId: "architecture", index: "01", label: "Architecture" },
  { href: "/#providers", sectionId: "providers", index: "02", label: "28 Providers" },
  { href: "/#api", sectionId: "api", index: "03", label: "Local API & CLI" },
  { href: "/#governance", sectionId: "governance", index: "04", label: "Poll-First" },
  { href: "/download", sectionId: null, index: "05", label: "Downloads" },
];

export function SiteHeader({ version }: { version: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const updateScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      setScrollPct(pct);

      if (pathname !== "/") {
        setActiveSection(null);
        return;
      }

      const ids = ["architecture", "providers", "api", "governance"];
      let current: string | null = null;
      const offset = window.scrollY + 180;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[#f4f1ea]/92 backdrop-blur-md">
      {/* Top micro specification tape */}
      <div className="hidden border-b border-[var(--rule)] bg-[#ebe7de]/80 sm:block">
        <div className="mx-auto flex h-7 max-w-[82rem] items-center justify-between border-x border-[var(--rule-strong)] px-5 font-mono text-[10.5px] tracking-wide text-[var(--ink-secondary)]">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink)]">
              <span className="size-1.5 rounded-full bg-[#0d8563]" />
              RELEASE v{version} STABLE
            </span>
            <span className="text-[var(--ink-faint)]">/</span>
            <span>LINUX X64 &amp; ARM64 · WINDOWS 10/11</span>
            <span className="hidden text-[var(--ink-faint)] md:inline">/</span>
            <span className="hidden md:inline">RUST + TAURI v2 · ZERO TELEMETRY</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`${githubRepoUrl}/discussions`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--signal)]"
            >
              DISCUSSIONS &amp; POLLS ↗
            </a>
            <span className="text-[var(--ink-faint)]">·</span>
            <span className="font-semibold text-[var(--ink)]">MIT LICENSE</span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="mx-auto flex h-15 max-w-[82rem] items-center justify-between border-x border-[var(--rule-strong)] px-5">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <BrandMark size={30} />
          <div className="flex flex-col leading-none">
            <span className="text-[15.5px] font-extrabold tracking-[-0.03em] text-[var(--ink)]">
              CrossUsage
            </span>
            <span className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
              System Tray Instrument
            </span>
          </div>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              (item.href === "/download" && pathname === "/download") ||
              (item.sectionId !== null && pathname === "/" && activeSection === item.sectionId);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                  active
                    ? "bg-[var(--ink)] text-[#faf8f4]"
                    : "text-[var(--ink-secondary)] hover:bg-[var(--paper-recessed)] hover:text-[var(--ink)]"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[10px]",
                    active
                      ? "text-[#ff7349]"
                      : "text-[var(--ink-faint)] group-hover:text-[var(--signal)]"
                  )}
                >
                  {item.index}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CommandPalette />

          <a
            href={githubRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("github_clicked", { location: "header" })}
            className="hidden items-center gap-1.5 rounded-md border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-3 py-1.5 text-[12.5px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--ink)] hover:bg-white sm:inline-flex"
          >
            <Github className="size-3.5" aria-hidden />
            <span>Star on GitHub</span>
          </a>

          <Link
            href="/download"
            onClick={() => track("download_clicked", { location: "header" })}
            className="inline-flex items-center gap-1.5 rounded-md bg-[var(--signal)] px-3.5 py-1.5 text-[12.5px] font-semibold text-white shadow-[0_2px_0_#9b2b0a] transition-all hover:bg-[var(--signal-hover)] active:translate-y-px"
          >
            <Download className="size-3.5" aria-hidden />
            <span>Install v{version}</span>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="inline-flex size-9 items-center justify-center rounded-md border border-[var(--rule-strong)] bg-[var(--paper-elevated)] text-[var(--ink)] lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Hairline scroll calibration rail */}
      <div className="pointer-events-none mx-auto h-[2px] max-w-[82rem] overflow-hidden border-x border-[var(--rule-strong)] bg-transparent">
        <div
          className="h-full bg-[var(--signal)] transition-[width] duration-75"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {open ? (
        <div className="border-t border-[var(--rule)] bg-[var(--paper-elevated)] px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--paper-recessed)]"
              >
                <span className="font-mono text-xs text-[var(--signal)]">
                  {item.index}
                </span>
                {item.label}
              </Link>
            ))}
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-md border border-[var(--rule-strong)] bg-white px-3 py-2.5 text-sm font-semibold text-[var(--ink)]"
            >
              <Github className="size-4" />
              barramee27/crossusage
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
