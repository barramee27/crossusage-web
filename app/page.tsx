import { MenuBar, MenuBarTray } from "@/components/menu-bar";
import { Panel } from "@/components/panel/panel";
import { HeroContent } from "@/components/hero-content";
import { ProviderGrid } from "@/components/provider-grid";
import { NoiseOverlay } from "@/components/noise-overlay";
import { TrackedLink } from "@/components/tracked-link";
import { Github, Gauge, BarChart3, Zap, Puzzle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

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

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/robinebers/openusage/contributors?per_page=30",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // Filter out bots
    return (data as Contributor[]).filter(
      (c) => !c.login.includes("[bot]") && c.login !== "dependabot"
    );
  } catch {
    return [];
  }
}

export default async function Home() {
  const [version, contributors] = await Promise.all([
    getVersion(),
    getContributors(),
  ]);

  return (
    <div className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <NoiseOverlay />

      <div className="relative z-[2]">
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
        <div className="absolute top-[28px] right-0 max-lg:hidden animate-fade-in">
          <Panel version={version} />
        </div>

        {/* Mobile: tray bar + panel below hero */}
        <div className="lg:hidden flex flex-col items-center md:items-end pb-12">
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
          <div className="px-3 md:px-12 w-full flex flex-col items-center md:items-end animate-fade-in">
            <Panel version={version} trayIconId="tray-icon-mobile" placement="flow" />
          </div>
        </div>
      </div>

      {/* ── Provider Grid ── */}
      <ProviderGrid />

      {/* ── Features Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight text-pretty"
            style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
          >
            Never Wonder Again
          </h2>
          <p
            className="mt-3 text-sm lg:text-base max-w-lg text-pretty"
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
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
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
                className="text-sm leading-relaxed text-pretty"
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
          className="text-3xl lg:text-4xl font-bold tracking-tight text-pretty mb-12"
          style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
        >
          Two Minutes to Peace of Mind
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <span
                className="text-2xl font-bold tabular-nums flex-shrink-0"
                style={{
                  fontFamily: "var(--font-geist-pixel-circle)",
                  color: "var(--page-fg-subtle)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-bold text-pretty mb-1">{step.title}</h3>
                <p
                  className="text-sm leading-relaxed text-pretty"
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
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="space-y-3 max-w-lg">
            <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight text-pretty"
            style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
          >
            Read Every Line.
            </h2>
            <p
              className="text-sm lg:text-base leading-relaxed text-pretty"
              style={{ color: "var(--page-fg-muted)" }}
            >
              Proudly open source. Built with Tauri, React, and TypeScript.
              Jump in, fix a bug, add a provider, every contribution
              makes it better for everyone.
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
              <Badge variant="outline">Tauri 2</Badge>
              <Badge variant="outline">React 19</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">QuickJS</Badge>
            </div>
            {contributors.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <div className="flex -space-x-2">
                  {contributors.map((c) => (
                    <a
                      key={c.login}
                      href={c.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={c.login}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${c.avatar_url}&s=64`}
                        alt={c.login}
                        width={32}
                        height={32}
                        className="rounded-full ring-2 ring-[var(--card)] hover:ring-[var(--page-accent)] transition-all"
                      />
                    </a>
                  ))}
                </div>
                <span
                  className="text-xs"
                  style={{ color: "var(--page-fg-subtle)" }}
                >
                  {contributors.length} contributor{contributors.length !== 1 && "s"}
                </span>
              </div>
            )}
          </div>
          <TrackedLink
            event="view_on_github_clicked"
            href="https://github.com/robinebers/openusage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-colors hover:brightness-125 flex-shrink-0"
            style={{
              border: "1px solid var(--page-border)",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
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
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pretty mb-4"
            style={{ fontFamily: "var(--font-geist-pixel-circle)" }}
          >
            Never Get Cut Off by Surprise.
        </h2>
        <p
          className="text-sm lg:text-base mb-8 max-w-md mx-auto text-pretty"
          style={{ color: "var(--page-fg-muted)" }}
        >
          Download OpenUsage for macOS. It&apos;s free, and you&apos;ll
          never have to guess your limits again.
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
          className="text-xs mt-4 text-pretty"
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
    </div>
  );
}

/* ── Static data ── */

const features = [
  {
    icon: Gauge,
    title: "Every Tool, One Glance",
    description:
      "All your AI coding tools in one panel. No more digging through dashboards.",
  },
  {
    icon: BarChart3,
    title: "Always Visible",
    description:
      "OpenUsage lives in your menu bar. Just look up and know where you stand.",
  },
  {
    icon: Zap,
    title: "Know Before You Run Out",
    description:
      "See if you're using too much too fast. Stay ahead of your limits before it's too late.",
  },
  {
    icon: Puzzle,
    title: "Plugin-Based",
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
    title: "Sign In",
    description:
      "OpenUsage automatically finds your accounts like Cursor and Claude Code",
  },
  {
    title: "Automated Updates",
    description:
      "Your usage stats refresh in the background, and so does the app",
  },
];

