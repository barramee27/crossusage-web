import { Eyebrow } from "@/components/marketing/eyebrow";

const steps = [
  {
    n: "01",
    title: "Download for your OS",
    detail: "Linux .deb / .rpm / AppImage, or Windows NSIS / one-file portable. No signup on this site.",
  },
  {
    n: "02",
    title: "Reuse existing logins",
    detail: "CrossUsage reads local sessions for tools already authenticated — or paste credentials for extra accounts.",
  },
  {
    n: "03",
    title: "Watch from the tray",
    detail: "Usage refreshes on a timer. Classic or Modern layout — switch anytime in Settings.",
  },
] as const;

export function StepsSection() {
  return (
    <section className="relative z-[1] border-b border-[var(--page-border)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <Eyebrow>Get started</Eyebrow>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
          Three steps to signal
        </h2>
        <p className="mt-3 max-w-lg text-base text-[var(--page-fg-muted)]">
          From zero to tray panel — no cloud account required.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="surface-panel lift-card relative overflow-hidden p-6 sm:p-7">
              <span className="font-display text-5xl font-extrabold tracking-tight text-[var(--page-accent)]/20">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[var(--page-fg)]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--page-fg-muted)]">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
