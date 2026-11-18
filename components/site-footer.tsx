import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { forkRepo, forkReleasesLatest, upstreamRepo } from "@/lib/site";
import { plugins } from "@/lib/plugins";
import { BrandMark } from "@/components/brand-mark";

const PRODUCT_LINKS = [
  { href: "/download", label: "Download Packages", event: "footer_download_clicked" as const },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#providers", label: `Providers (${plugins.length})` },
  { href: "/#api", label: "Loopback API & CLI" },
] as const;

const PROJECT_LINKS = [
  {
    href: forkRepo,
    label: "GitHub Repository",
    event: "footer_github_clicked" as const,
    external: true,
  },
  { href: forkReleasesLatest, label: "Release Notes", external: true },
  { href: "/credits", label: "Credits & Lineage", event: "footer_credits_clicked" as const },
  { href: "/privacy", label: "Privacy Policy", event: "footer_privacy_clicked" as const },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative bg-[var(--paper-recessed)]">
      <div className="drafting-frame px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BrandMark size={30} />
              <span className="text-lg font-extrabold tracking-[-0.03em] text-[var(--ink)]">
                CrossUsage
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--ink-secondary)]">
              Native AI subscription &amp; API quota instrument for Linux and Windows. Fork of{" "}
              <a
                href={upstreamRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
              >
                OpenUsage
              </a>{" "}
              by Robin Ebers.
            </p>
            <p className="mt-4 font-mono text-[11px] text-[var(--ink-muted)]">
              STATIC EXPORT · ZERO TRACKING COOKIES · LOCAL-FIRST TELEMETRY · MIT LICENSE
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:col-span-6 md:justify-items-end">
            <div>
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                Instrument
              </p>
              <ul className="mt-3 space-y-2.5 text-sm font-medium">
                {PRODUCT_LINKS.map((item) => (
                  <li key={item.href}>
                    {"event" in item && item.event ? (
                      <TrackedLink
                        event={item.event}
                        href={item.href}
                        className="text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
                      >
                        {item.label}
                      </TrackedLink>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                Open Source
              </p>
              <ul className="mt-3 space-y-2.5 text-sm font-medium">
                {PROJECT_LINKS.map((item) => (
                  <li key={item.href}>
                    {"event" in item && item.event ? (
                      <TrackedLink
                        event={item.event}
                        href={item.href}
                        {...("external" in item && item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
                      >
                        {item.label}
                      </TrackedLink>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
