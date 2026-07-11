import type { Metadata } from "next";
import Link from "next/link";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How CrossUsage and this website handle your data — local-first usage, encrypted credentials, optional analytics, and hosting logs.",
  openGraph: {
    title: "Privacy — CrossUsage",
    description: "Privacy practices for the CrossUsage app and crossusage.dev.",
  },
};

export default function PrivacyPage() {
  return (
    <DocPage title="Privacy" kicker="privacy">
      <p className="text-sm text-[var(--page-fg-muted)]">
        Non-lawyer summary. Authoritative text may live in-repo or in-app.
      </p>

      <div className="mt-10 space-y-4">
        <section className="surface-panel p-6">
          <h2 className="text-sm font-semibold text-[var(--page-fg)]">Local data</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            CrossUsage records usage on your machine. Core flows do not require uploading your full
            history to us. Provider credentials are encrypted at rest (AES-256-GCM) with a master key
            in your OS keychain when available.
          </p>
        </section>

        <section className="surface-panel p-6">
          <h2 className="text-sm font-semibold text-[var(--page-fg)]">Telemetry</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            Some builds may ship optional analytics. Expect opt-in or off-by-default. Confirm in
            settings for the binary you installed.
          </p>
        </section>

        <section className="surface-panel p-6">
          <h2 className="text-sm font-semibold text-[var(--page-fg)]">This website</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--page-fg-muted)]">
            This site is static HTML. No tracking cookies here by default. Your host may still log
            IPs and paths like any web server.
          </p>
        </section>
      </div>

      <p className="mt-14 text-sm">
        <Link href="/" className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]">
          ← Back home
        </Link>
      </p>
    </DocPage>
  );
}
