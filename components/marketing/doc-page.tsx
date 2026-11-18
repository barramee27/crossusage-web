import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function DocPage({
  title,
  kicker,
  subtitle,
  wide = false,
  children,
}: {
  title: string;
  kicker: string;
  subtitle?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <article className="relative border-b border-[var(--rule)]">
      <div className="drafting-frame px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
          <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-[var(--ink-muted)]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--ink-secondary)] transition-colors hover:text-[var(--signal)]"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Home
            </Link>
            <span>/</span>
            <span className="uppercase text-[var(--ink)]">{kicker}</span>
          </nav>

          <Eyebrow>{kicker}</Eyebrow>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--ink-secondary)]">
              {subtitle}
            </p>
          ) : null}

          <div className="mt-10">{children}</div>
        </div>
      </div>
    </article>
  );
}
