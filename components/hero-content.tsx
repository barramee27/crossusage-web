"use client";

import Link from "next/link";
import { plugins } from "@/lib/plugins";
import { Github } from "lucide-react";
import { track } from "@/lib/track";
import { forkRepo } from "@/lib/site";
import { Eyebrow } from "@/components/marketing/eyebrow";

const featured = plugins.filter((p) => p.featured);
const moreCount = plugins.length - featured.length;
const pluginCount = plugins.length;

export function HeroContent({ version }: { version: string | null }) {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>linux · windows · tray · local-first</Eyebrow>
        {version && (
          <span className="rounded-sm border border-[var(--page-accent)]/40 bg-[var(--page-accent)]/10 px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[var(--page-accent)]">
            v{version}
          </span>
        )}
      </div>

      <div className="space-y-4">
        <h1
          id="hero-heading"
          className="max-w-[14ch] text-4xl font-bold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
        >
          <span className="fx-headline">Every AI quota</span>
          <br />
          <span className="text-[var(--page-fg)]">in one</span>{" "}
          <span className="fx-accent-text">panel</span>
          <span className="text-[var(--page-fg)]">.</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--page-fg-muted)] sm:text-base lg:text-[1.05rem] lg:leading-relaxed">
          CrossUsage tracks Cursor, Claude, Codex, Copilot, and {pluginCount - 4}+ more from your
          system tray — Classic or Modern layout, usage insights, and history charts. Data stays on
          your machine until you export it.
        </p>
      </div>

      <dl className="grid max-w-lg grid-cols-2 gap-3 font-mono text-[10px] sm:grid-cols-4 sm:text-xs">
        <div className="fx-glass-panel px-3 py-2.5 sm:px-4 sm:py-3">
          <dt className="text-[var(--page-fg-dim)]">providers</dt>
          <dd className="mt-1 text-lg font-bold tabular-nums text-[var(--page-accent)] sm:text-xl">
            {pluginCount}
          </dd>
        </div>
        <div className="fx-glass-panel px-3 py-2.5 sm:px-4 sm:py-3">
          <dt className="text-[var(--page-fg-dim)]">layouts</dt>
          <dd className="mt-1 text-sm font-bold text-[var(--page-fg)] sm:text-base">2</dd>
        </div>
        <div className="fx-glass-panel px-3 py-2.5 sm:px-4 sm:py-3">
          <dt className="text-[var(--page-fg-dim)]">license</dt>
          <dd className="mt-1 text-sm font-bold text-[var(--page-fg)] sm:text-base">MIT</dd>
        </div>
        <div className="fx-glass-panel px-3 py-2.5 sm:px-4 sm:py-3">
          <dt className="text-[var(--page-fg-dim)]">api</dt>
          <dd className="mt-1 text-sm font-bold text-[var(--page-fg)] sm:text-base">:6736</dd>
        </div>
      </dl>

      <div className="fx-glass-panel flex flex-wrap items-center gap-4 px-4 py-3">
        {featured.map(({ id, name, Icon }) => (
          <div key={id} className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-[var(--page-fg-dim)]" />
            <span className="hidden font-mono text-xs text-[var(--page-fg-muted)] sm:inline">
              {name}
            </span>
          </div>
        ))}
        {moreCount > 0 && (
          <span className="font-mono text-xs text-[var(--page-fg-dim)]">+{moreCount}</span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          href="/download/"
          className="signal-block-strong inline-flex items-center justify-center px-8 py-3.5 font-mono text-sm font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)]"
          onClick={() => track("hero_download_clicked")}
        >
          Download {version ? `v${version}` : "latest"}
        </Link>
        <a
          href={forkRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="signal-block inline-flex items-center justify-center gap-2 px-8 py-3.5 font-mono text-sm font-medium text-[var(--page-fg-muted)] hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
          onClick={() => track("hero_contribute_clicked")}
        >
          <Github className="h-4 w-4" />
          PRs welcome
        </a>
      </div>

      <div className="font-mono text-[10px] leading-relaxed text-[var(--page-fg-dim)] sm:text-[11px]">
        <p className="text-[var(--page-accent)]">$ curl -s localhost:6736/v1/insights | jq .ok</p>
        <p className="mt-1 opacity-80">true // pace, quota, and rollup — loopback only</p>
      </div>
    </div>
  );
}
