import { Eyebrow } from "@/components/marketing/eyebrow";

const steps = [
  {
    cmd: "fetch",
    title: "Pull release",
    detail: "GitHub Releases → pick OS + arch. No signup on this site.",
  },
  {
    cmd: "auth",
    title: "Existing logins",
    detail: "CrossUsage reuses local sessions for tools that already authenticated.",
  },
  {
    cmd: "watch",
    title: "Background sync",
    detail: "Usage ticks on a timer; you control when the app updates.",
  },
] as const;

export function StepsSection() {
  return (
    <section className="relative z-[1] border-t border-[var(--page-border)] bg-[var(--page-bg)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>boot.seq</Eyebrow>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
          Cold start
        </h2>
        <p className="mt-3 max-w-lg font-mono text-xs text-[var(--page-fg-muted)] sm:text-sm">
          Three beats from zero to signal. Rail on the left is decorative—timeline semantics stay
          in the copy.
        </p>

        <div className="relative mt-12 space-y-4 pl-8 sm:pl-10">
          <div className="fx-rail" aria-hidden />

          {steps.map((s, i) => (
            <div key={s.cmd} className="relative fx-glass-panel p-5 sm:p-6">
              <div className="absolute left-[-1.85rem] top-6 sm:left-[-2.1rem]">
                <div className="fx-rail-dot h-2.5 w-2.5 rounded-full border border-[var(--page-accent)] bg-[var(--page-bg)] sm:h-3 sm:w-3" />
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-10">
                <span className="w-12 shrink-0 font-mono text-[10px] text-[var(--page-fg-dim)] sm:text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="w-20 shrink-0 font-mono text-sm font-semibold text-[var(--page-accent)]">
                  {s.cmd}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-[var(--page-fg)]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--page-fg-muted)]">
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
