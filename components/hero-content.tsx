"use client";

import { GaugeIcon } from "@/lib/icons";
import { plugins } from "@/lib/plugins";
import { Github } from "lucide-react";
import { track } from "@vercel/analytics";

const featured = plugins.filter((p) => p.featured);
const moreCount = plugins.length - featured.length;

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center gap-6 lg:gap-8 pt-12 lg:pt-24 pb-16 max-w-xl">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <GaugeIcon className="w-5 h-5" style={{ color: "var(--page-fg)" }} />
        <span
          className="text-sm font-semibold tracking-tight"
          style={{ color: "var(--page-fg)" }}
        >
          OpenUsage
        </span>
      </div>

      {/* Headline */}
      <div className="space-y-4 text-pretty">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-pretty"
          style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
        >
          All Your <span style={{ color: "var(--page-accent)" }}>AI Coding Limits</span> In One Place
        </h1>
      </div>

      {/* Tagline */}
      <p
        className="text-sm sm:text-base lg:text-lg leading-relaxed text-pretty"
        style={{ color: "var(--page-fg-muted)" }}
      >
        Burning through your subscriptions too fast? Paying for stuff you never use? Stop guessing. OpenUsage is free and open source.
      </p>

      {/* Provider icons */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-5">
        {featured.map(({ id, name, Icon }) => (
          <div key={id} className="flex items-center gap-2">
            <Icon className="w-6 h-6" style={{ color: "var(--page-fg-muted)" }} />
            <span
              className="hidden sm:inline text-sm font-medium"
              style={{ color: "var(--page-fg-muted)" }}
            >
              {name}
            </span>
          </div>
        ))}
        {moreCount > 0 && (
          <span
            className="text-sm"
            style={{ color: "var(--page-fg-subtle)" }}
          >
            + {moreCount} more
          </span>
        )}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <a
          href="https://github.com/robinebers/openusage/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
          style={{
            backgroundColor: "var(--page-accent)",
            color: "#000",
          }}
          onClick={() => track("hero_download_clicked")}
        >
          Download for macOS
        </a>
        <a
          href="https://github.com/robinebers/openusage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:brightness-125"
          style={{
            border: "1px solid var(--page-border)",
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            color: "var(--page-fg)",
          }}
          onClick={() => track("hero_contribute_clicked")}
        >
          <Github className="w-4 h-4" />
          Contribute
        </a>
      </div>

      {/* MIT badge */}
      <div>
        <span
          className="text-xs font-mono px-2 py-1 rounded"
          style={{
            color: "var(--page-fg-muted)",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          Free &middot; Open Source &middot; macOS
        </span>
      </div>
    </div>
  );
}
