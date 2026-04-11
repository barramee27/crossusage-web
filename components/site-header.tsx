import Link from "next/link";
import { Github } from "lucide-react";
import { forkRepo } from "@/lib/site";

const nav = [
  { href: "/", label: "home" },
  { href: "/download/", label: "download" },
  { href: "/privacy/", label: "privacy" },
  { href: "/credits/", label: "credits" },
] as const;

export function SiteHeader() {
  return (
    <header className="fx-header-scan fx-header-mobile-lite sticky top-0 z-50 border-b border-[var(--page-border)] bg-[var(--page-bg)]/75 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group relative shrink-0 font-mono text-sm font-medium tracking-tight text-[var(--page-fg)]"
        >
          <span className="text-[var(--page-accent)] transition-colors group-hover:text-[var(--fx-magenta)]">
            ~
          </span>
          /crossusage
          <span
            className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-[var(--page-accent)] to-[var(--fx-magenta)] transition-all duration-500 group-hover:w-full"
            aria-hidden
          />
        </Link>

        <nav
          className="site-nav min-w-0 flex-1 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:thin] sm:px-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--page-border)]"
          aria-label="Main"
        >
          <div className="flex w-max flex-nowrap items-center gap-0 px-1 font-mono text-[11px] text-[var(--page-fg-muted)] sm:text-xs">
            {nav.map((item, i) => (
              <span key={item.href} className="flex shrink-0 items-center">
                {i > 0 && <span className="px-2 text-[var(--page-fg-dim)]">/</span>}
                <Link
                  href={item.href}
                  className="shrink-0 rounded px-1.5 py-1 transition-colors hover:bg-[var(--page-accent)]/10 hover:text-[var(--page-accent)]"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={forkRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="signal-block flex h-9 w-9 items-center justify-center text-[var(--page-fg-muted)] hover:border-[var(--page-accent)] hover:text-[var(--page-accent)]"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="/download/"
            className="signal-block-strong px-3 py-2 font-mono text-[11px] font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)] sm:px-4 sm:text-xs"
          >
            GET.bin
          </Link>
        </div>
      </div>
    </header>
  );
}
