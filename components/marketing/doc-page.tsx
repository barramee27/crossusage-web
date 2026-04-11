import Link from "next/link";

export function DocPage({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <article className="fx-section-bleed relative z-[1] mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="fx-reveal">
        <nav className="mb-8 font-mono text-xs text-[var(--page-fg-dim)]">
          <Link
            href="/"
            className="rounded px-1 transition-colors hover:bg-[var(--page-accent)]/10 hover:text-[var(--page-accent)]"
          >
            ~
          </Link>
          <span className="text-[var(--page-fg-dim)]"> / </span>
          <span className="text-[var(--page-fg-muted)]">{kicker}</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="fx-headline">{title}</span>
        </h1>
        <div
          className="mt-5 h-0.5 w-32 max-w-full bg-gradient-to-r from-[var(--page-accent)] via-[var(--fx-magenta)] to-transparent"
          aria-hidden
        />

        <div className="mt-12">{children}</div>
      </div>
    </article>
  );
}
