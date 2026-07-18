import { TrackedLink } from "@/components/tracked-link";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { plugins } from "@/lib/plugins";

const links = [
  { href: "/download/", label: "Download", event: "footer_download_clicked" as const },
  { href: "/privacy/", label: "Privacy", event: "footer_privacy_clicked" as const },
  { href: "/credits/", label: "Credits", event: "footer_credits_clicked" as const },
  { href: forkRepo, label: "GitHub", event: "footer_github_clicked" as const, external: true },
] as const;

const tickerItems = [
  "v1.3.3",
  "multi-account",
  "encrypted credentials",
  `${plugins.length} providers`,
  "classic + modern",
  "openusage 0.7.6",
  "linux",
  "windows",
  "localhost:6736",
  "mit",
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="provider-marquee-wrap overflow-hidden border-b border-[var(--page-border)] py-3">
        <div className="provider-marquee gap-10 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--page-fg-dim)]">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={`${item}-${i}`} className="shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="surface-panel px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-2xl font-bold tracking-tight">
                Cross<span className="text-[var(--page-accent)]">Usage</span>
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--page-fg-muted)]">
                Fork of{" "}
                <a
                  href={upstreamRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[var(--page-fg)] underline-offset-2 hover:underline"
                >
                  OpenUsage
                </a>{" "}
                by Robin Ebers — Linux & Windows native builds with multi-account and encrypted
                credentials.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              {links.map((l) => (
                <TrackedLink
                  key={l.href}
                  event={l.event}
                  href={l.href}
                  {...("external" in l && l.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-[var(--page-fg-muted)] transition-colors hover:text-[var(--page-fg)]"
                >
                  {l.label}
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-[var(--page-fg-dim)]">
          Static site · no cookies by default · MIT licensed
        </p>
      </div>
    </footer>
  );
}
