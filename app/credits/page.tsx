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
    <DocPage title="Credits" kicker="thanks">
      <p className="font-mono text-sm text-[var(--page-fg-muted)]">
        Maintainers and strangers who filed issues—this fork is yours too.
      </p>

      <div className="mt-10 space-y-4">
        <div className="signal-block-strong p-5 sm:p-6">
          <h2 className="font-mono text-sm text-[var(--page-accent)]">upstream</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--page-fg)] hover:text-[var(--page-accent)]"
            >
              OpenUsage
            </a>{" "}
            by{" "}
            <a
              href="https://github.com/RobinEbers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--page-fg)] hover:text-[var(--page-accent)]"
            >
              Robin Ebers
            </a>
            —architecture, plugins, MIT license.
          </p>
        </div>

        <div className="signal-block p-5 sm:p-6">
          <h2 className="font-mono text-sm text-[var(--page-fg-dim)]">contributors</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            PRs and reports on{" "}
            <a
              href={forkRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--page-accent)] hover:underline"
            >
              github
            </a>
            .
          </p>
        </div>
      </div>

      <p className="mt-14 font-mono text-xs">
        <Link href="/" className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]">
          ← ../
        </Link>
      </p>
    </DocPage>
  );
}
