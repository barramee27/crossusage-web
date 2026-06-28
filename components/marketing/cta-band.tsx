import Link from "next/link";
import { upstreamReleasesLatest } from "@/lib/site";

export function CtaBand({ version }: { version: string | null }) {
  return (
    <section className="relative z-[1] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="fx-reveal mx-auto max-w-3xl">
        <div className="fx-cta-shell">
          <div className="fx-cta-inner px-8 py-14 text-center sm:px-12 sm:py-16">
            <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--page-accent)]">EOF</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
              Get CrossUsage
            </h2>
            <p className="mx-auto mt-5 max-w-md font-mono text-xs leading-relaxed text-[var(--page-fg-muted)] sm:text-sm">
              {version ? `v${version}` : "Latest"} — .deb, .rpm, AppImage, Windows installer, or
              one-file portable exe. macOS → upstream OpenUsage.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/download/"
                className="signal-block-strong inline-flex min-w-[220px] items-center justify-center px-10 py-3.5 font-mono text-sm font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)]"
              >
                /download/
              </Link>
              <a
                href={upstreamReleasesLatest}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--page-fg-dim)] transition-colors hover:text-[var(--fx-magenta)]"
              >
                openusage/releases (macOS)
              </a>
            </div>
            {version && (
              <p className="mt-10 font-mono text-[10px] text-[var(--page-fg-dim)]">tag v{version}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
