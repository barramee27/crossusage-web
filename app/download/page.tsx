import type { Metadata } from "next";
import Link from "next/link";
import { forkLatestJson, forkReleasesLatest, upstreamReleasesLatest } from "@/lib/site";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download CrossUsage for Linux and Windows from GitHub Releases. macOS users can use upstream OpenUsage.",
  openGraph: {
    title: "Download CrossUsage",
    description:
      "Linux and Windows installers from GitHub Releases. MIT licensed, open source.",
  },
};

async function getVersion(): Promise<string | null> {
  try {
    const res = await fetch(forkLatestJson, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
  } catch {
    return null;
  }
}

export default async function DownloadPage() {
  const version = await getVersion();

  return (
    <DocPage title="Download" kicker="dist">
      <p className="font-mono text-sm leading-relaxed text-[var(--page-fg-muted)]">
        Artifacts live on GitHub Releases. Verify checksums in the release notes when you
        care about supply chain.
      </p>

      <div className="mt-10 space-y-8">
        <a
          href={forkReleasesLatest}
          target="_blank"
          rel="noopener noreferrer"
          className="signal-block-strong inline-flex w-full items-center justify-center px-6 py-3.5 font-mono text-sm font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)] sm:w-auto"
        >
          releases/latest
        </a>

        <div className="signal-block divide-y divide-[var(--page-border)] font-mono text-xs sm:text-sm">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[var(--page-accent)]">windows</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              NSIS{" "}
              <code className="border border-[var(--page-border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[var(--page-fg)]">
                .exe
              </code>{" "}
              or portable drop-in from the release assets.
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[var(--page-accent)]">linux</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              <code className="border border-[var(--page-border)] bg-[var(--surface-2)] px-1.5 py-0.5 text-[var(--page-fg)]">
                .deb
              </code>
              , rpm, or appimage—whatever that tag ships.
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[var(--page-accent)]">cli</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              Tarballs sometimes ship for headless installs—read the changelog.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--page-fg-muted)]">
          <span className="font-mono text-[var(--page-fg-dim)]">darwin</span> →{" "}
          <a
            href={upstreamReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--page-accent)] hover:underline"
          >
            openusage/releases
          </a>
        </p>

        {version && (
          <p className="font-mono text-[10px] text-[var(--page-fg-dim)]">HEAD ~= v{version}</p>
        )}

        <p className="font-mono text-xs">
          <Link href="/" className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]">
            ← ../
          </Link>
        </p>
      </div>
    </DocPage>
  );
}
