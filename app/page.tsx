import { MenuBar, MenuBarTray } from "@/components/menu-bar";
import { Panel } from "@/components/panel/panel";
import { HeroContent } from "@/components/hero-content";
import { TrackedLink } from "@/components/tracked-link";
import { CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon } from "@/lib/icons";
import { Github, Gauge, BarChart3, Zap, Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

async function getVersion(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://github.com/robinebers/openusage/releases/latest/download/latest.json",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const version = await getVersion();

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      {/* ── Menu bar + hero wrapper (positioning context for panel) ── */}
      <div className="relative">
        {/* Full macOS menu bar — desktop only */}
        <div className="max-lg:hidden">
          <MenuBar />
        </div>

        {/* Hero: just the marketing content */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 lg:pr-[440px]">
          <div className="lg:min-h-[600px]">
            <HeroContent />
          </div>
        </section>

        {/* Panel: absolutely positioned, aligned to tray icon (desktop) */}
        <div className="absolute top-[28px] right-0 max-lg:hidden animate-fade-in stagger-2">
          <Panel version={version} />
        </div>

        {/* Mobile: tray bar + panel below hero */}
        <div className="lg:hidden flex flex-col items-center md:items-end px-3 md:px-12 pb-12 animate-fade-in stagger-2">
          {/* Full-width tray bar, items right-aligned */}
          <div
            className="w-full h-[28px] flex items-center justify-end px-4 select-none"
            style={{
              background: "var(--bar-bg)",
              color: "var(--bar-fg)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            <MenuBarTray trayIconId="tray-icon-mobile" />
          </div>
          {/* Normal panel with arrow, flow-positioned */}
          <Panel version={version} trayIconId="tray-icon-mobile" placement="flow" />
        </div>
      </div>

      {/* ── Features Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="mb-12">
          <h2
            className="text-2xl lg:text-3xl font-bold tracking-tight text-pretty"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Never wonder again
          </h2>
          <p
            className="mt-3 text-sm lg:text-base max-w-lg"
            style={{ color: "var(--page-fg-muted)" }}
          >
            Everything you need to build without token anxiety.
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
              <h3 className="text-base font-bold text-pretty mb-1.5">
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
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <h2
            className="text-2xl lg:text-3xl font-bold tracking-tight text-pretty mb-12"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Two minutes to peace of mind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                className="text-2xl font-bold tabular-nums flex-shrink-0"
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  color: "var(--page-fg-subtle)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-bold text-pretty mb-1">{step.title}</h3>
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
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div
          className="rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{
            border: "1px solid var(--page-border)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <div className="space-y-3 max-w-lg">
            <h2
            className="text-2xl lg:text-3xl font-bold tracking-tight text-pretty"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Read every line.
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed"
              style={{ color: "var(--page-fg-muted)" }}
            >
              Proudly open source. Built with Tauri, React, and TypeScript.
              Jump in, fix a bug, add a provider &mdash; every contribution
              makes it better for everyone.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <Badge variant="outline">Tauri 2</Badge>
              <Badge variant="outline">React 19</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">QuickJS</Badge>
            </div>
          </div>
          <TrackedLink
            event="view_on_github_clicked"
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
          </TrackedLink>
        </div>
      </section>

      {/* ── Download CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 text-center">
        <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pretty mb-4"
            style={{ fontFamily: "var(--font-jetbrains-mono)" }}
          >
            Never get cut off by surprise.
        </h2>
        <p
          className="text-sm lg:text-base mb-8 max-w-md mx-auto"
          style={{ color: "var(--page-fg-muted)" }}
        >
          Download OpenUsage for macOS. It&apos;s free, and you&apos;ll
          never have to guess your quota again.
        </p>
        <div className="flex items-center justify-center gap-4">
          <TrackedLink
            event="cta_download_clicked"
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
          </TrackedLink>
        </div>
        <p
          className="text-xs mt-4"
          style={{ color: "var(--page-fg-subtle)" }}
        >
          Requires macOS 14+{version ? <> &middot; v{version}</> : null} &middot; MIT License
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
              <CodexIcon className="w-4 h-4" style={{ color: "var(--page-fg-muted)" }} />
              <ClaudeIcon className="w-4 h-4" style={{ color: "var(--page-fg-muted)" }} />
              <CursorIcon className="w-4 h-4" style={{ color: "var(--page-fg-muted)" }} />
              <CopilotIcon className="w-4 h-4" style={{ color: "var(--page-fg-muted)" }} />
            </div>
            <span
              className="text-xs"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              OpenUsage &middot; by{" "}
              <a
                href="https://itsbyrob.in/youtube"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Robin Ebers
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <TrackedLink
              event="footer_github_clicked"
              href="https://github.com/robinebers/openusage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              GitHub
            </TrackedLink>
            <TrackedLink
              event="footer_youtube_clicked"
              href="https://itsbyrob.in/youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              YouTube
            </TrackedLink>
            <TrackedLink
              event="footer_twitter_clicked"
              href="https://itsbyrob.in/x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              Twitter
            </TrackedLink>
            <TrackedLink
              event="footer_newsletter_clicked"
              href="https://itsbyrob.in/lab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "var(--page-fg-subtle)" }}
            >
              Newsletter
            </TrackedLink>
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
    title: "Every tool, one glance",
    description:
      "All your AI coding tools in one panel. No more digging through dashboards.",
  },
  {
    icon: BarChart3,
    title: "Always visible",
    description:
      "OpenUsage lives in your menu bar. Just look up and know where you stand.",
  },
  {
    icon: Zap,
    title: "Know before you run out",
    description:
      "See if you're using too much too fast. Stay ahead of your limits before it's too late.",
  },
  {
    icon: Puzzle,
    title: "Plugin-based",
    description:
      "Every provider is a plugin and open source, when things breaks, they get fixed fast.",
  },
];

const steps = [
  {
    title: "Download",
    description:
      "One download from GitHub, zero terminals or setup fuss",
  },
  {
    title: "Sign in",
    description:
      "OpenUsage automatically finds your accounts like Cursor and Claude Code",
  },
  {
    title: "Automated updates",
    description:
      "Your usage stats refresh in the background, and so does the app",
  },
];

