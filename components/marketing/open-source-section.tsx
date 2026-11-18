import Link from "next/link";
import { ArrowUpRight, Github, GitFork, Vote } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { Eyebrow } from "@/components/marketing/eyebrow";

export interface ContributorAvatar {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const STACK = [
  "Rust Workspace",
  "Tauri v2",
  "React 19",
  "QuickJS",
  "SQLite",
  "MIT Licensed",
] as const;

export function OpenSourceSection({
  contributors,
}: {
  contributors: ContributorAvatar[];
}) {
  return (
    <section
      id="governance"
      className="relative scroll-mt-20 border-b border-[var(--rule)] bg-[var(--paper-recessed)]/55"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>04 // OPEN SOURCE &amp; GOVERNANCE</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Built in public.{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                Governed by daily users.
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {STACK.map((tag) => (
              <span
                key={tag}
                className="rounded border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Contributors card (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] sm:p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--signal)]">
                  CROSSUSAGE CONTRIBUTORS
                </p>
                <Link
                  href="/credits"
                  className="font-mono text-xs font-semibold text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
                >
                  All credits →
                </Link>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
                Developed openly on{" "}
                <a
                  href={forkRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
                >
                  barramee27/crossusage
                </a>{" "}
                with contributions from Linux and Windows engineers worldwide.
              </p>

              {contributors.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2">
                  {contributors.map((c) => (
                    <a
                      key={c.login}
                      href={c.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--rule-strong)] bg-white py-1 pr-2.5 pl-1 text-xs font-semibold text-[var(--ink)] shadow-[0_1px_0_rgba(17,19,23,0.04)] transition-all hover:-translate-y-0.5 hover:border-[var(--ink)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${c.avatar_url}&s=64`}
                        alt={c.login}
                        width={24}
                        height={24}
                        className="rounded-full border border-[var(--rule)]"
                      />
                      <span>@{c.login}</span>
                      <span className="rounded-full bg-[var(--paper-recessed)] px-1.5 py-0.5 font-mono text-[9.5px] font-semibold text-[var(--ink-muted)]">
                        {c.login === "barramee27"
                          ? "Creator"
                          : `${c.contributions} PR`}
                      </span>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--rule)] pt-5">
              <TrackedLink
                event="view_on_github_clicked"
                href={forkRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="keycap-primary !py-2 !text-xs"
              >
                <Github className="size-3.5" aria-hidden />
                Star or Contribute
              </TrackedLink>
              <a
                href={`${forkRepo}/discussions`}
                target="_blank"
                rel="noopener noreferrer"
                className="keycap-secondary !py-2 !text-xs"
              >
                GitHub Discussions
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Upstream + Poll-First Governance column (5 cols) */}
          <div className="grid gap-5 lg:col-span-5">
            <div className="rounded-2xl border border-[#1d222c] bg-[#0e1015] p-6 text-[#f1f3f7] shadow-[0_18px_40px_-24px_rgba(14,16,21,0.5)]">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#ff7349]">
                  <Vote className="size-4" aria-hidden />
                  POLL-FIRST POLICY
                </span>
                <span className="rounded border border-white/15 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] text-[#2dd4bf]">
                  USER-GOVERNED
                </span>
              </div>
              <h3 className="mt-3 text-base font-extrabold text-white">
                Users vote before credential or metric changes
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#98a2b3] sm:text-[13px]">
                We never silently remove a provider/metric or alter how local tokens and cookies
                are read. An anonymous in-app poll opens first before:
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10.5px]">
                <div className="rounded-lg border border-white/[0.08] bg-[#161a23] px-2.5 py-2 text-[#e2e8f0]">
                  <span className="block text-[9.5px] text-[#ff7349]">RULE 01</span>
                  Feature / Metric Removal
                </div>
                <div className="rounded-lg border border-white/[0.08] bg-[#161a23] px-2.5 py-2 text-[#e2e8f0]">
                  <span className="block text-[9.5px] text-[#2dd4bf]">RULE 02</span>
                  Token / Cookie Changes
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)]">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#0d8563]">
                <GitFork className="size-4" aria-hidden />
                <span>UPSTREAM LINEAGE</span>
              </div>
              <h3 className="mt-2.5 text-base font-extrabold text-[var(--ink)]">
                Rooted in OpenUsage
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)] sm:text-[13px]">
                CrossUsage is a native Linux &amp; Windows fork of{" "}
                <a
                  href={upstreamRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
                >
                  OpenUsage
                </a>{" "}
                by{" "}
                <a
                  href="https://github.com/robinebers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--ink)] underline decoration-[var(--rule-strong)] underline-offset-3 hover:decoration-[var(--signal)]"
                >
                  Robin Ebers
                </a>
                . Looking for the native Swift macOS menu-bar build? Grab it directly from upstream
                releases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
