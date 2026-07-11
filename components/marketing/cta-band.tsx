import Link from "next/link";
import { upstreamReleasesLatest } from "@/lib/site";

export function CtaBand({ version }: { version: string | null }) {
  return (
    <section className="relative z-[1] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="fx-reveal mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-[var(--hero-wash)] px-8 py-16 text-center text-white sm:px-12 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(15,159,122,0.28),transparent_60%)]"
            aria-hidden
          />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--page-accent)]">
              Ready when you are
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
              Get CrossUsage {version ? `v${version}` : ""}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
              .deb, .rpm, AppImage, Windows installer, or one-file portable exe. macOS GUI → upstream
              OpenUsage.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/download/"
                className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[var(--page-accent)] px-8 py-3.5 text-sm font-semibold text-[var(--hero-wash)] transition-transform hover:-translate-y-0.5"
              >
                Download
              </Link>
              <a
                href={upstreamReleasesLatest}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white/55 transition-colors hover:text-white"
              >
                OpenUsage releases (macOS)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
