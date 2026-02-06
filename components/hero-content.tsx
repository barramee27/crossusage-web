"use client";

import { CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon } from "@/lib/icons";
import { Github } from "lucide-react";
import { track } from "@vercel/analytics";

const providerIcons = [
  { Icon: CodexIcon, label: "Codex" },
  { Icon: ClaudeIcon, label: "Claude" },
  { Icon: CursorIcon, label: "Cursor" },
  { Icon: CopilotIcon, label: "Copilot" },
];

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center gap-8 pt-24 pb-16 max-w-xl">
      {/* Headline */}
      <div className="space-y-4 animate-fade-in-up stagger-1 text-pretty">
        <h1
          className="text-5xl font-bold tracking-tight leading-[1.1]"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          All Your <span className="hero-highlight">AI Coding Limits</span> In One Place
        </h1>
      </div>

      {/* Tagline */}
      <p
        className="text-lg leading-relaxed animate-fade-in-up stagger-2"
        style={{ color: "var(--page-fg-muted)" }}
      >
        Burning through your subscriptions too fast? Paying for stuff you never use? Stop guessing. OpenUsage is free and open source.
      </p>

      {/* Provider icons */}
      <div className="flex items-center gap-5 animate-fade-in-up stagger-3">
        {providerIcons.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-6 h-6" style={{ color: "var(--page-fg-muted)" }} />
            <span
              className="text-sm font-medium"
              style={{ color: "var(--page-fg-muted)" }}
            >
              {label}
            </span>
          </div>
        ))}
        <span
          className="text-sm"
          style={{ color: "var(--page-fg-subtle)" }}
        >
          + more
        </span>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-4 animate-fade-in-up stagger-4">
        <a
          href="https://github.com/robinebers/openusage/releases/latest"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-white/10"
          style={{
            border: "1px solid var(--page-border)",
            color: "var(--page-fg)",
          }}
          onClick={() => track("hero_contribute_clicked")}
        >
          <Github className="w-4 h-4" />
          Contribute
        </a>
      </div>

      {/* MIT badge */}
      <div className="animate-fade-in-up stagger-5">
        <span
          className="text-xs font-mono px-2 py-1 rounded"
          style={{
            color: "var(--page-fg-subtle)",
            backgroundColor: "rgba(255,255,255,0.04)",
          }}
        >
          Free &middot; Open Source &middot; macOS
        </span>
      </div>
    </div>
  );
}
