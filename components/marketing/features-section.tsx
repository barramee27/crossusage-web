import { Gauge, LayoutGrid, Puzzle, Shield } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { plugins } from "@/lib/plugins";
import { upstreamRepo } from "@/lib/site";

const blocks = [
  {
    icon: Gauge,
    title: "All your quotas, one glance",
    body: `${plugins.length} bundled plugins — Cursor, Claude, Codex, Copilot, OpenRouter, Devin, and more. Multi-account when you run separate logins.`,
    large: true,
  },
  {
    icon: LayoutGrid,
    title: "Classic or Modern",
    body: "Pick at first run or in Settings → Appearance. Same enabled providers in both layouts.",
    large: false,
  },
  {
    icon: Shield,
    title: "Encrypted at rest",
    body: "Account tokens use AES-256-GCM. Master key in OS keychain — not plaintext on disk.",
    large: false,
  },
  {
    icon: Puzzle,
    title: "Plugin-based",
    body: "Providers ship as plugins. Fork, patch, or add your own. PRs welcome.",
    large: false,
  },
] as const;

export function FeaturesSection() {
  return (
    <section className="relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>Why CrossUsage</Eyebrow>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="font-display max-w-[16ch] text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Built for Linux & Windows
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-[var(--page-fg-muted)] lg:text-right">
            A Tauri tray app — fork of{" "}
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--page-fg)] underline-offset-2 hover:underline"
            >
              OpenUsage
            </a>{" "}
            with native packaging, local history, and the 0.7 Modern UI port.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {blocks.map(({ icon: Icon, title, body, large }) => (
            <div
              key={title}
              className={`surface-panel lift-card p-6 sm:p-7 ${
                large ? "md:col-span-2 md:flex md:items-center md:gap-8 md:p-8" : ""
              }`}
            >
              <span
                className={`inline-flex shrink-0 items-center justify-center rounded-2xl bg-[var(--page-accent-soft)] text-[var(--page-accent-ink)] ${
                  large ? "h-14 w-14" : "h-11 w-11"
                }`}
              >
                <Icon className={large ? "h-7 w-7" : "h-5 w-5"} aria-hidden />
              </span>
              <div className={large ? "mt-5 md:mt-0" : "mt-4"}>
                <h3 className={`font-semibold text-[var(--page-fg)] ${large ? "text-xl" : "text-base"}`}>
                  {title}
                </h3>
                <p
                  className={`mt-2 leading-relaxed text-[var(--page-fg-muted)] ${
                    large ? "max-w-3xl text-base" : "text-sm"
                  }`}
                >
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
