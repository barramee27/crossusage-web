import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/tracked-link";
import { forkRepo, upstreamRepo } from "@/lib/site";
import { Eyebrow } from "@/components/marketing/eyebrow";

export interface ContributorAvatar {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const stack = ["tauri2", "react19", "typescript", "quickjs"] as const;

export function OpenSourceSection({ contributors }: { contributors: ContributorAvatar[] }) {
  return (
    <section className="fx-section-bleed relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>LICENSE</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
          Source open
        </h2>
        <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-[var(--page-fg-muted)] sm:text-sm">
          Fork lineage →{" "}
          <a
            href={upstreamRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--page-accent)] hover:underline"
          >
            openusage
          </a>
          . Patch the fork, not a black box.
        </p>

        <div className="mt-10 fx-glass-panel p-6 sm:flex sm:items-start sm:justify-between sm:gap-12 sm:p-10">
          <div className="max-w-xl space-y-6">
            <div className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[var(--page-border)] bg-[var(--page-bg)]/40 font-mono text-[10px] uppercase tracking-wider text-[var(--page-fg-muted)]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {contributors.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--page-fg-dim)]">
                  contributors
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex -space-x-2">
                    {contributors.map((c) => (
                      <a
                        key={c.login}
                        href={c.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={c.login}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${c.avatar_url}&s=64`}
                          alt={c.login}
                          width={36}
                          height={36}
                          className="rounded-sm border border-[var(--page-border)] ring-2 ring-[var(--surface)] transition-transform hover:z-10 hover:scale-110 hover:ring-[var(--page-accent)]/40"
                        />
                      </a>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-[var(--page-fg-dim)]">
                    {contributors.length} human{contributors.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            )}
          </div>
          <TrackedLink
            event="view_on_github_clicked"
            href={forkRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="signal-block-strong mt-8 inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 font-mono text-sm font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)] sm:mt-0 sm:w-auto"
          >
            <Github className="h-4 w-4" />
            origin/main
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
