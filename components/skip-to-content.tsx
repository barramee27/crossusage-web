import Link from "next/link";

/** First focusable control: jumps to `#main-content` for keyboard and screen reader users. */
export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      className="absolute left-4 top-0 z-[100] -translate-y-[calc(100%+1.25rem)] rounded-md border border-[var(--page-border)] bg-[var(--surface-2)] px-4 py-2 font-mono text-xs font-semibold text-[var(--page-accent)] shadow-lg transition-transform duration-200 focus:translate-y-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--page-accent)]"
    >
      Skip to content
    </Link>
  );
}
