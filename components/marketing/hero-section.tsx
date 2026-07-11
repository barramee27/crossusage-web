"use client";

import Link from "next/link";
import { ArrowDown, Github } from "lucide-react";
import { track } from "@/lib/track";
import { forkRepo } from "@/lib/site";
import { plugins } from "@/lib/plugins";
import { HeroClassicViewport } from "@/components/marketing/hero-classic-viewport";

const pluginCount = plugins.length;

export function HeroSection({ version }: { version: string | null }) {
  return (
    <section
      className="hero-viewport relative z-[1] overflow-hidden border-b border-[var(--page-border)]"
      aria-labelledby="hero-heading"
    >
      <div className="relative mx-auto grid min-h-[calc(100svh-4.25rem)] max-w-6xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Copy */}
        <div className="relative z-[1] flex flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-xl lg:max-w-[34rem]">
            <p className="hero-rise font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-[var(--page-fg)]">
              Cross
              <span className="text-[var(--page-accent)]">Usage</span>
            </p>

            <h1
              id="hero-heading"
              className="hero-rise-delay mt-6 max-w-[16ch] font-display text-[clamp(1.75rem,4.2vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--page-fg)]"
            >
              Every AI quota in one tray panel.
            </h1>

            <p className="hero-rise-delay mt-5 max-w-md text-base leading-relaxed text-[var(--page-fg-muted)] sm:text-lg">
              Track {pluginCount}+ providers on Linux & Windows — multi-account, encrypted
              credentials, Classic or Modern UI. Local-first.
            </p>

            <div className="hero-rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/download/"
                className="btn-primary"
                onClick={() => track("hero_download_clicked")}
              >
                Download {version ? `v${version}` : "latest"}
              </Link>
              <a
                href="#try"
                className="btn-secondary"
                onClick={() => track("hero_try_clicked")}
              >
                Try in browser
              </a>
              <a
                href={forkRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                onClick={() => track("hero_contribute_clicked")}
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Classic viewport plane — desktop wash + live panel */}
        <div className="hero-rise-delay-2 relative hidden min-h-[32rem] lg:block">
          <div className="absolute inset-y-0 -right-[max(0px,calc((100vw-72rem)/2))] left-0">
            <HeroClassicViewport version={version} />
          </div>
        </div>

        {/* Mobile: Classic panel under copy */}
        <div className="hero-rise-delay-2 relative -mx-4 sm:-mx-6 lg:hidden">
          <div className="overflow-hidden rounded-t-[1.5rem] border border-[var(--page-border)] border-b-0 shadow-[0_-20px_60px_-30px_rgba(12,18,34,0.35)]">
            <HeroClassicViewport version={version} />
          </div>
        </div>
      </div>

      <a
        href="#whats-new"
        className="hero-scroll-cue absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 items-center gap-2 text-xs font-medium text-[var(--page-fg-dim)] transition-colors hover:text-[var(--page-fg)] lg:inline-flex"
      >
        What&apos;s new
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
