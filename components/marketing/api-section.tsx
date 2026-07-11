import { ApiExample } from "@/components/api-example";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function ApiSection() {
  return (
    <section className="relative z-[1] border-b border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <Eyebrow>127.0.0.1:6736</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Local HTTP API
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--page-fg-muted)]">
            JSON over loopback. Wire status lines, scripts, or CI on the same machine — no API keys in this hop.
          </p>
          <ul className="mt-8 space-y-3 font-mono text-sm">
            {[
              { method: "GET", path: "/v1/usage" },
              { method: "GET", path: "/v1/insights" },
              { method: "GET", path: "/v1/history/*" },
            ].map((row) => (
              <li key={row.path} className="surface-panel flex items-center gap-3 px-4 py-3">
                <span className="rounded-md bg-[var(--page-accent-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--page-accent-ink)]">
                  {row.method}
                </span>
                <code className="text-[var(--page-fg)]">{row.path}</code>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 lg:mt-0">
          <ApiExample />
        </div>
      </div>
    </section>
  );
}
