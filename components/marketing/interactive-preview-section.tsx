import { Eyebrow } from "@/components/marketing/eyebrow";
import { AppViewport } from "@/components/marketing/app-viewport";

export function InteractivePreviewSection({ version }: { version: string | null }) {
  return (
    <section
      id="try"
      className="relative z-[1] scroll-mt-24 overflow-hidden border-b border-[var(--page-border)] bg-[var(--hero-wash)] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_20%,rgba(15,159,122,0.22),transparent_55%)]" />
      <div className="fx-reveal relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <Eyebrow className="!border-white/15 !bg-white/10 !text-[var(--page-accent)] mx-auto lg:mx-0">
            Try it
          </Eyebrow>
          <h2
            id="interactive-preview-heading"
            className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Classic or Modern.
            <span className="mt-2 block text-white/55">Click through both — no install.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/65">
            Toggle layouts in the demo. Modern uses top tabs + grouped cards; Classic keeps the
            sidebar. Same mock data as {version ? `v${version}` : "the desktop app"} — light React,
            not WASM.
          </p>
        </div>

        <div id="layouts" className="mt-12 scroll-mt-24 lg:mt-14">
          <AppViewport version={version} />
        </div>
      </div>
    </section>
  );
}
