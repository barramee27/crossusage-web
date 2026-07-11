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
    <section className="relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>Open source</Eyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
          Built in the open
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--page-fg-muted)]">
          Fork of{" "}
          <a
            href={upstreamRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--page-fg)] underline-offset-2 hover:underline"
          >
            OpenUsage
          </a>{" "}
          by Robin Ebers. MIT licensed — pull requests welcome for providers, UI, and docs.
        </p>

        <div className="surface-panel mt-10 p-6 sm:flex sm:items-start sm:justify-between sm:gap-12 sm:p-10">
          <div className="max-w-xl space-y-6">
            <div className="flex flex-wrap gap-2">
              {stack.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[var(--page-border)] bg-[var(--page-stripe)] font-mono text-[10px] uppercase tracking-wider text-[var(--page-fg-muted)]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {contributors.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--page-fg-dim)]">
                  Contributors
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
                          className="rounded-full border-2 border-white ring-1 ring-[var(--page-border)] transition-transform hover:z-10 hover:scale-110"
                        />
                      </a>
                    ))}
                  </div>
                  <span className="text-xs text-[var(--page-fg-dim)]">
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
            className="btn-primary mt-8 inline-flex w-full sm:mt-0 sm:w-auto"
          >
            <Github className="h-4 w-4" />
            Contribute
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
