"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Cpu,
  Download,
  Github,
  KeyRound,
  Layers,
  Terminal,
} from "lucide-react";
import { track } from "@/lib/track";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { plugins } from "@/lib/plugins";
import { CopyCommand } from "@/components/copy-command";
import { HeroClassicViewport } from "@/components/marketing/hero-classic-viewport";

const TARGET_PACKAGES = [
  { label: ".deb", note: "Ubuntu / Debian" },
  { label: ".rpm", note: "Fedora / RHEL" },
  { label: "AppImage", note: "Any Linux" },
  { label: ".exe", note: "Win 10/11 NSIS" },
] as const;

export function HeroSection({ version }: { version: string | null }) {
  return (
    <section
      className="relative border-b border-[var(--rule)]"
      aria-labelledby="hero-heading"
    >
      <div className="drafting-frame px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          {/* Left Editorial & Engineering Column */}
          <div className="pt-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="spec-tag">
                INSTRUMENT SPEC // {version ? `v${version}` : "v1.6.1"}
              </span>
              <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[var(--ink-secondary)]">
                NATIVE LINUX &amp; WINDOWS
              </span>
            </div>

            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.55rem,5.2vw,4.35rem)] font-extrabold leading-[0.98] tracking-[-0.04em] text-[var(--ink)]"
            >
              Every AI quota &amp; dollar,{" "}
              <span className="font-editorial italic font-normal tracking-[-0.01em] text-[var(--signal)]">
                calibrated
              </span>{" "}
              in your system tray.
            </h1>

            <p className="mt-5 max-w-xl text-[16.5px] leading-[1.65] text-[var(--ink-secondary)]">
              One native Rust + Tauri v2 desktop instrument for{" "}
              <strong className="font-semibold text-[var(--ink)]">
                Cursor, Claude, Codex, Copilot, Gemini Apps, OpenRouter
              </strong>
              , and {plugins.length}+ AI tools. Reads your existing local sessions
              with zero login popups, aggregates daily spend, and exposes a loopback
              JSON API.
            </p>

            {/* Tactile Mechanical Keycap CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/download"
                className="keycap-signal"
                onClick={() => track("hero_download_clicked")}
              >
                <Download className="size-4" aria-hidden />
                Download {version ? `v${version}` : "v1.6.1"}
              </Link>

              <a
                href={forkRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="keycap-secondary"
                onClick={() => track("hero_contribute_clicked")}
              >
                <Github className="size-4" aria-hidden />
                GitHub Repository
                <ArrowUpRight className="size-3.5 text-[var(--ink-muted)]" aria-hidden />
              </a>
            </div>

            {/* Anodized Terminal Quick-Install Card */}
            <div className="mt-8">
              <CopyCommand />
            </div>

            {/* Precision Engineering Spec Ledger */}
            <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--rule)] pt-6">
              <div>
                <dt className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                  <Layers className="size-3 text-[var(--signal)]" aria-hidden />
                  PROVIDERS
                </dt>
                <dd className="mt-1 text-xl font-extrabold tracking-tight text-[var(--ink)]">
                  {plugins.length} Bundled
                </dd>
                <p className="mt-0.5 text-xs text-[var(--ink-secondary)]">
                  Multi-account vaults
                </p>
              </div>

              <div className="border-l border-[var(--rule)] pl-3.5">
                <dt className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                  <KeyRound className="size-3 text-[#0d8563]" aria-hidden />
                  SECURITY
                </dt>
                <dd className="mt-1 text-xl font-extrabold tracking-tight text-[var(--ink)]">
                  AES-256
                </dd>
                <p className="mt-0.5 text-xs text-[var(--ink-secondary)]">
                  OS Keyring · 0 cloud
                </p>
              </div>

              <div className="border-l border-[var(--rule)] pl-3.5">
                <dt className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                  <Terminal className="size-3 text-[var(--ink)]" aria-hidden />
                  LINEAGE
                </dt>
                <dd className="mt-1 text-xl font-extrabold tracking-tight text-[var(--ink)]">
                  MIT Open
                </dd>
                <p className="mt-0.5 text-xs text-[var(--ink-secondary)]">
                  Fork of{" "}
                  <a
                    href={upstreamRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
                  >
                    OpenUsage
                  </a>
                </p>
              </div>
            </dl>

            {/* Native Runtime & Package Targets Matrix */}
            <div className="mt-5 space-y-2.5">
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--rule)] bg-[var(--paper-elevated)] px-3.5 py-2.5 font-mono text-[11px] text-[var(--ink-secondary)]">
                <Cpu className="size-3.5 shrink-0 text-[var(--signal)]" aria-hidden />
                <span className="font-semibold text-[var(--ink)]">Zero Electron bloat:</span>
                <span>Wayland &amp; X11</span>
                <span className="text-[var(--ink-faint)]">·</span>
                <span>Win 10/11 WebView2</span>
                <span className="text-[var(--ink-faint)]">·</span>
                <span>SQLite 30d history</span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {TARGET_PACKAGES.map((pkg) => (
                  <Link
                    key={pkg.label}
                    href="/download"
                    className="group rounded-lg border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-[var(--signal)] hover:bg-white"
                  >
                    <p className="font-mono text-xs font-bold text-[var(--ink)] group-hover:text-[var(--signal)]">
                      {pkg.label}
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-[var(--ink-muted)]">
                      {pkg.note}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Live Interactive Hardware Stage */}
          <div>
            <HeroClassicViewport version={version} />
          </div>
        </div>
      </div>
    </section>
  );
}
