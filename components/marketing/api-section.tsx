import { ApiExample } from "@/components/api-example";
import { Eyebrow } from "@/components/marketing/eyebrow";

export function ApiSection() {
  return (
    <section className="fx-section-bleed relative z-[1] border-y border-[var(--page-border)] bg-[var(--page-stripe)]">
      <div className="fx-reveal mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <Eyebrow>127.0.0.1:6736</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--page-fg)] sm:text-4xl">
            Local HTTP
          </h2>
          <p className="mt-4 font-mono text-xs leading-relaxed text-[var(--page-fg-muted)] sm:text-sm">
            JSON over loopback. Wire status lines, Hammerspoon, or CI on the same machine—no API keys
            in this hop.
          </p>
          <ul className="mt-10 space-y-3 font-mono text-xs sm:text-sm">
            <li className="fx-glass-panel px-4 py-3">
              <span className="text-[var(--page-accent)]">GET</span>{" "}
              <a
                href="http://localhost:6736/v1/usage"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[var(--page-fg)] hover:text-[var(--page-accent)]"
              >
                /v1/usage
              </a>
            </li>
            <li className="fx-glass-panel px-4 py-3">
              <span className="text-[var(--page-accent)]">GET</span>{" "}
              <a
                href="http://localhost:6736/v1/usage/claude"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[var(--page-fg)] hover:text-[var(--page-accent)]"
              >
                /v1/usage/claude
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-12 min-w-0 lg:mt-0">
          <ApiExample />
        </div>
      </div>
    </section>
  );
}
