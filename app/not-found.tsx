import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative z-[1] flex min-h-[55vh] flex-col items-center justify-center px-4 py-24">
      <div className="fx-reveal fx-glass-panel max-w-md px-10 py-12 text-center sm:px-14 sm:py-14">
        <p className="font-mono text-[10px] tracking-[0.35em] text-[var(--page-accent)]">ERR_ROUTE</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tighter text-[var(--page-fg)] sm:text-7xl">404</h1>
        <p className="mt-4 font-mono text-xs leading-relaxed text-[var(--page-fg-muted)]">
          This path is not in the static export map.
        </p>
        <Link
          href="/"
          className="signal-block-strong mt-8 inline-flex px-8 py-3 font-mono text-xs font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)]"
        >
          cd ~
        </Link>
      </div>
    </div>
  );
}
