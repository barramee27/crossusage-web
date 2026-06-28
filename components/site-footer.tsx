import { TrackedLink } from "@/components/tracked-link";
import { forkRepo, upstreamRepo } from "@/lib/site";

const links = [
  { href: "/download/", label: "download", event: "footer_download_clicked" as const },
  { href: "/privacy/", label: "privacy", event: "footer_privacy_clicked" as const },
  { href: "/credits/", label: "credits", event: "footer_credits_clicked" as const },
  { href: forkRepo, label: "git", event: "footer_github_clicked" as const, external: true },
  {
    href: "https://itsbyrob.in/youtube",
    label: "yt",
    event: "footer_youtube_clicked" as const,
    external: true,
  },
  { href: "https://itsbyrob.in/x", label: "x", event: "footer_twitter_clicked" as const, external: true },
  {
    href: "https://itsbyrob.in/lab",
    label: "news",
    event: "footer_newsletter_clicked" as const,
    external: true,
  },
] as const;

const tickerItems = [
  "v1.2.0",
  "classic + modern",
  "26 plugins",
  "tauri 2",
  "insights",
  "history charts",
  "localhost:6736",
  "linux",
  "windows",
  "mit",
  "prs welcome",
  "open source",
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="fx-ticker-wrap overflow-hidden border-b border-[var(--page-border)]/60 py-2">
        <div className="fx-ticker gap-12 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--page-fg-dim)]">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={`${item}-${i}`} className="shrink-0">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="fx-glass-panel px-5 py-6 sm:px-8 sm:py-8">
          <p className="font-mono text-[10px] leading-relaxed text-[var(--page-fg-dim)] sm:text-[11px]">
            <span className="text-[var(--page-accent)]">#</span> fork of{" "}
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]"
            >
              openusage
            </a>
            {" · "}
            upstream by{" "}
            <a
              href="https://itsbyrob.in/youtube"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]"
            >
              robin ebers
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
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
                ./{l.label}
              </TrackedLink>
            ))}
          </div>
        </div>
        <p className="mt-8 text-center font-mono text-[10px] text-[var(--page-fg-dim)]">
          static site · no cookies by default · built to be read in source view
        </p>
      </div>
    </footer>
  );
}
