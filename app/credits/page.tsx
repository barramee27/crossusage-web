import type { Metadata } from "next";
import { ExternalLink, GitFork, Users } from "lucide-react";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { getCrossUsageContributors } from "@/lib/contributors";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "CrossUsage credits upstream OpenUsage by Robin Ebers and every contributor on barramee27/crossusage.",
  openGraph: {
    title: "Credits — CrossUsage",
    description: "Attribution for OpenUsage, Robin Ebers, and CrossUsage contributors.",
  },
};

export default async function CreditsPage() {
  const contributors = await getCrossUsageContributors();

  return (
    <DocPage
      title="Credits & Attribution"
      kicker="CREDITS"
      subtitle="Open-source software stands on the shoulders of upstream creators, PR authors, bug reporters, and daily testers."
    >
      <div className="space-y-5">
        <section className="rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0d8563]">
            <GitFork className="size-4" aria-hidden />
            <span>UPSTREAM FOUNDATION</span>
          </div>
          <h2 className="mt-3 text-xl font-extrabold text-[var(--ink)]">
            OpenUsage by Robin Ebers
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--ink-secondary)]">
            CrossUsage is a Linux &amp; Windows native fork of{" "}
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
            >
              OpenUsage
            </a>{" "}
            created by{" "}
            <a
              href="https://github.com/robinebers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
            >
              Robin Ebers
            </a>
            , distributed under the MIT License. CrossUsage ports upstream plugin and UI work
            through v0.7.15 while maintaining native Tauri v2 desktop support for Linux and Windows.
          </p>
          <div className="mt-5">
            <a
              href={upstreamRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="keycap-secondary !py-2 !text-xs"
            >
              Visit robinebers/openusage
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] sm:p-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--signal)]">
            <Users className="size-4" aria-hidden />
            <span>CROSSUSAGE FORK CONTRIBUTORS</span>
          </div>
          <h2 className="mt-3 text-xl font-extrabold text-[var(--ink)]">
            Builders on barramee27/crossusage
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
            Everyone who has shipped features, provider fixes, and platform improvements directly
            to{" "}
            <a
              href={forkRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
            >
              barramee27/crossusage
            </a>
            :
          </p>

          {contributors.length > 0 ? (
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {contributors.map((c) => (
                <li key={c.login}>
                  <a
                    href={c.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[var(--rule-strong)] bg-white px-3.5 py-2.5 text-sm font-medium text-[var(--ink)] transition-all hover:-translate-y-0.5 hover:border-[var(--signal)]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${c.avatar_url}&s=72`}
                      alt={c.login}
                      width={32}
                      height={32}
                      className="rounded-full border border-[var(--rule)]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold text-[var(--ink)]">@{c.login}</p>
                      <p className="font-mono text-[11px] text-[var(--ink-muted)]">
                        {c.login === "barramee27"
                          ? "Creator & Lead"
                          : `${c.contributions} merged PR${c.contributions !== 1 ? "s" : ""}`}
                      </p>
                    </div>
                    <ExternalLink className="size-3.5 shrink-0 text-[var(--ink-muted)]" />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>
    </DocPage>
  );
}
