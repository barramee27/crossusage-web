import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-[1] flex min-h-[55vh] flex-col items-center justify-center px-4 py-24">
      <div className="fx-reveal surface-panel max-w-md px-10 py-12 text-center sm:px-14 sm:py-14">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--page-accent-ink)]">
          Not found
        </p>
        <h1 className="font-display mt-4 text-6xl font-extrabold tracking-tighter text-[var(--page-fg)] sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--page-fg-muted)]">
          This path is not in the static export map.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          Back home
        </Link>
      </div>
    </div>
  );
}
