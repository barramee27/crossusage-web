import type { Metadata } from "next";
import Link from "next/link";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "CrossUsage credits OpenUsage and Robin Ebers. Thank you to everyone who contributes.",
  openGraph: {
    title: "Credits — CrossUsage",
    description: "Attribution for OpenUsage, Robin Ebers, and contributors.",
  },
};

export default function CreditsPage() {
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
            — architecture, plugins, MIT license. CrossUsage ports 0.7.x to Linux & Windows.
          </p>
        </div>

        <div className="surface-panel p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--page-fg-dim)]">
            Contributors
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            PRs and reports on{" "}
            <a
              href={forkRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--page-accent-ink)] underline-offset-2 hover:underline"
            >
              GitHub
            </a>
            .
          </p>
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
