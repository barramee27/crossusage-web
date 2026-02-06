"use client";

import { CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon } from "@/lib/icons";
import { Github } from "lucide-react";
import { track } from "@vercel/analytics";

const providerIcons = [
  { Icon: CodexIcon, label: "Codex", color: "#74aa9c" },
  { Icon: ClaudeIcon, label: "Claude", color: "#de7356" },
  { Icon: CursorIcon, label: "Cursor", color: "#a0a0a0" },
  { Icon: CopilotIcon, label: "Copilot", color: "#6e40c9" },
];

export function HeroContent() {
  return (
    <div className="flex flex-col justify-center gap-8 py-16 max-w-xl">
      {/* Headline */}
      <div className="space-y-4 animate-fade-in-up stagger-1">
        <h1
          className="text-5xl font-bold tracking-tight leading-[1.1]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          You&apos;re about to hit your limit.
          <br />
          <span style={{ color: "var(--page-accent)" }}>Or are you?</span>
        </h1>
      </div>

      {/* Tagline */}
      <p
        className="text-lg leading-relaxed animate-fade-in-up stagger-2"
        style={{ color: "var(--page-fg-muted)" }}
      >
        See your Cursor, Claude, Codex, and Copilot limits in the menu bar.
        How much you&apos;ve used, how fast you&apos;re going, when it resets.
        No account needed. Free and open source.
      </p>

      {/* Provider icons */}
      <div className="flex items-center gap-5 animate-fade-in-up stagger-3">
        {providerIcons.map(({ Icon, label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-6 h-6" style={{ color }} />
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
