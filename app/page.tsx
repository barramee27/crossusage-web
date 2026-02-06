import { MenuBar } from "@/components/menu-bar";
import { Panel } from "@/components/panel/panel";
import { HeroContent } from "@/components/hero-content";
import { CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon } from "@/lib/icons";
import { Github, Gauge, BarChart3, Zap, Puzzle } from "lucide-react";

async function getVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://github.com/robinebers/openusage/releases/latest/download/latest.json",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return "0.3.1";
    const data = await res.json();
    return data.version || "0.3.1";
  } catch {
    return "0.3.1";
  }
}

export default async function Home() {
  const version = await getVersion();

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      {/* ── macOS Menu Bar ── */}
      <MenuBar />

      {/* ── Hero: marketing content + interactive panel ── */}
      <section className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-start justify-between gap-12 min-h-[600px]">
          {/* Left: marketing */}
          <div className="flex-1 min-w-0">
            <HeroContent />
          </div>

          {/* Right: interactive panel prototype */}
          <div className="flex-shrink-0 pt-4 animate-fade-in stagger-2 max-lg:hidden">
            <Panel version={version} />
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="mb-12">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Built for how you work
          </h2>
          <p
            className="mt-3 text-base max-w-lg"
            style={{ color: "var(--page-fg-muted)" }}
          >
            Fast, focused, and out of the way until you need it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl transition-colors"
              style={{
                border: "1px solid var(--page-border)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <feature.icon
                className="w-5 h-5 mb-3"
                style={{ color: "var(--page-accent)" }}
              />
              <h3 className="text-sm font-semibold mb-1.5">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--page-fg-muted)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <h2
          className="text-3xl font-bold tracking-tight mb-12"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Three steps. That&apos;s it.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                className="text-2xl font-bold tabular-nums flex-shrink-0"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--page-fg-subtle)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--page-fg-muted)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Open Source ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div
          className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            border: "1px solid var(--page-border)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="space-y-3 max-w-lg">
            <h2
              className="text-3xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Open source. Always.
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--page-fg-muted)" }}
            >
              MIT licensed. Built with Tauri 2, React 19, and TypeScript.
              Plugins are JavaScript running in a sandboxed QuickJS runtime.
              Extend it, fork it, make it yours.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <TechBadge>Tauri 2</TechBadge>
              <TechBadge>React 19</TechBadge>
              <TechBadge>TypeScript</TechBadge>
              <TechBadge>QuickJS</TechBadge>
            </div>
          </div>
          <a
            href="https://github.com/robinebers/openusage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:bg-white/10 flex-shrink-0"
            style={{
              border: "1px solid var(--page-border)",
              color: "var(--page-fg)",
            }}
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 text-center">
        <h2
          className="text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ready to try it?
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto"
          style={{ color: "var(--page-fg-muted)" }}
        >
          Download OpenUsage for macOS. Cross-platform support coming soon.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/robinebers/openusage/releases/latest"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-sm font-semibold transition-all hover:brightness-110"
            style={{
              backgroundColor: "var(--page-accent)",
              color: "#000",
            }}
          >
            Download for macOS
          </a>
        </div>
        <p
          className="text-xs mt-4"
          style={{ color: "var(--page-fg-subtle)" }}
        >
          Requires macOS 14+ &middot; v{version} &middot; MIT License
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--page-border)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <CodexIcon className="w-4 h-4" style={{ color: "#74aa9c" }} />
              <ClaudeIcon className="w-4 h-4" style={{ color: "#de7356" }} />
              <CursorIcon className="w-4 h-4" style={{ color: "#666" }} />
              <CopilotIcon className="w-4 h-4" style={{ color: "#6e40c9" }} />
            </div>
            <span
              className="text-xs"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              OpenUsage &middot; by{" "}
              <a
                href="https://github.com/robinebers"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Robin Ebers
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/robinebers/openusage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              GitHub
            </a>
            <span
              className="text-xs"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              Inspired by{" "}
              <a
                href="https://github.com/steipete/CodexBar"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                CodexBar
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Static data ── */

const features = [
  {
    icon: Gauge,
    title: "Unified dashboard",
    description:
      "All your AI tool usage in one panel. No more jumping between dashboards.",
  },
  {
    icon: BarChart3,
    title: "Tray icon progress",
    description:
      "See usage at a glance — progress bars right in your menu bar, no click needed.",
  },
  {
    icon: Zap,
    title: "Pace tracking",
    description:
      "Know if you're burning through your quota too fast before it resets.",
  },
  {
    icon: Puzzle,
    title: "Plugin architecture",
    description:
      "Each provider is a JS plugin. Add new ones yourself — don't wait for updates.",
  },
];

const steps = [
  {
    title: "Install the app",
    description:
      "Download from GitHub Releases or build from source. One binary, no dependencies.",
  },
  {
    title: "Sign into your tools",
    description:
      "OpenUsage detects your existing credentials for Cursor, Claude, and Codex.",
  },
  {
    title: "Glance at the menu bar",
    description:
      "Usage data refreshes automatically. Everything you need, always one click away.",
  },
];

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 rounded"
      style={{
        color: "var(--page-fg-subtle)",
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid var(--page-border)",
      }}
    >
      {children}
    </span>
  );
}
