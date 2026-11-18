import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="drafting-frame flex min-h-[65vh] flex-col items-center justify-center px-5 py-24">
      <div className="max-w-md rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-10 py-12 text-center shadow-[0_4px_0_rgba(17,19,23,0.08)] sm:px-14">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--signal)]">
          STATUS 404
        </p>
        <h1 className="mt-3 text-6xl font-extrabold tracking-tighter text-[var(--ink)] sm:text-7xl">
          404
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)]">
          This route does not exist in the CrossUsage static export.
        </p>
        <Link href="/" className="keycap-primary mt-8 inline-flex">
          <ArrowLeft className="size-4" aria-hidden />
          Return to CrossUsage
        </Link>
      </div>
    </div>
  );
}
