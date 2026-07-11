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
    <article className="relative z-[1] mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="fx-reveal">
        <nav className="mb-8 text-sm text-[var(--page-fg-dim)]">
          <Link href="/" className="rounded-md px-1 transition-colors hover:text-[var(--page-accent)]">
            Home
          </Link>
          <span> / </span>
          <span className="text-[var(--page-fg-muted)]">{kicker}</span>
        </nav>

        <h1 className="font-display text-4xl font-bold tracking-tight text-[var(--page-fg)] sm:text-5xl">
          {title}
        </h1>
        <div className="mt-5 h-1 w-16 rounded-full bg-[var(--page-accent)]" aria-hidden />

        <div className="mt-12">{children}</div>
      </div>
    </article>
  );
}
