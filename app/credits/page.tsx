import type { Metadata } from "next";
import Link from "next/link";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { getCrossUsageContributors } from "@/lib/contributors";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "CrossUsage credits OpenUsage and Robin Ebers. Thank you to everyone who contributes.",
  openGraph: {
    title: "Credits — CrossUsage",
    description: "Attribution for OpenUsage, Robin Ebers, and CrossUsage contributors.",
  },
};

export default async function CreditsPage() {
  const contributors = await getCrossUsageContributors();

  return (
    <DocPage title="Credits" kicker="credits">
      <p className="text-base text-[var(--page-fg-muted)]">
        Maintainers and strangers who filed issues — this fork is yours too.
      </p>

      <div className="mt-10 space-y-4">
        <div className="surface-panel border-[var(--page-accent)]/30 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--page-accent-ink)]">
            Upstream
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--page-fg)] underline-offset-2 hover:underline"
            >
              OpenUsage
            </a>{" "}
            by{" "}
            <a
              href="https://github.com/robinebers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--page-fg)] underline-offset-2 hover:underline"
            >
              Robin Ebers
            </a>
            — architecture, plugins, MIT license. CrossUsage ports through v0.7.15 to Linux &
            Windows.
          </p>
        </div>

        <div className="surface-panel p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--page-fg-dim)]">
            CrossUsage Contributors
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            Code contributors and PR authors on{" "}
            <a
              href={forkRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--page-accent-ink)] underline-offset-2 hover:underline"
            >
              barramee27/crossusage
            </a>
            :
          </p>
          {contributors.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {contributors.map((c) => (
                <li key={c.login}>
                  <a
                    href={c.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--page-border)] bg-[var(--page-stripe)] py-1 pr-3 pl-1 text-xs font-medium text-[var(--page-fg)] transition-colors hover:border-[var(--page-accent)]/50"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${c.avatar_url}&s=48`}
                      alt={c.login}
                      width={22}
                      height={22}
                      className="rounded-full"
                    />
                    <span>@{c.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="mt-14 text-sm">
        <Link href="/" className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]">
          ← Back home
        </Link>
      </p>
    </DocPage>
  );
}
