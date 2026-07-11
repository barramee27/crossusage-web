import type { Metadata } from "next";
import Link from "next/link";
import { forkLatestJson, forkReleasesLatest, upstreamReleasesLatest } from "@/lib/site";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download CrossUsage 1.3.1 for Linux (.deb, .rpm, AppImage) and Windows (NSIS installer + portable onefile). macOS → upstream OpenUsage.",
  openGraph: {
    title: "Download CrossUsage",
    description:
      "Linux and Windows installers from GitHub Releases. Multi-account, encrypted credentials. MIT licensed.",
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
  const tag = version ?? "latest";

  const assets = version
    ? [
        { platform: "Windows installer", file: `crossusage_${version}_x64-setup.exe` },
        { platform: "Windows portable (one file)", file: `crossusage_${version}_windows_amd64_onefile.exe` },
        { platform: "Linux Debian/Ubuntu", file: `crossusage_${version}_amd64.deb` },
        { platform: "Linux Fedora/RHEL", file: `crossusage-${version}-1.x86_64.rpm` },
        { platform: "Linux AppImage", file: `crossusage_${version}_amd64.AppImage` },
      ]
    : [];

  return (
    <DocPage title="Download" kicker="download">
      <p className="text-base leading-relaxed text-[var(--page-fg-muted)]">
        Installers and portable builds live on GitHub Releases. In-app updates use the{" "}
        <code className="rounded bg-[var(--page-stripe)] px-1.5 py-0.5 text-sm">.deb</code> / NSIS{" "}
        <code className="rounded bg-[var(--page-stripe)] px-1.5 py-0.5 text-sm">.exe</code> plus
        bundled signatures.
      </p>

      <div className="mt-10 space-y-8">
        <a
          href={forkReleasesLatest}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex w-full sm:w-auto"
        >
          Download {version ? `v${version}` : "latest release"}
        </a>

        {assets.length > 0 && (
          <div className="surface-panel overflow-hidden text-sm">
            <div className="border-b border-[var(--page-border)] bg-[var(--page-stripe)] px-5 py-3 text-[var(--page-fg-dim)]">
              Typical assets for v{version}
            </div>
            <ul className="divide-y divide-[var(--page-border)]">
              {assets.map(({ platform, file }) => (
                <li
                  key={file}
                  className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="font-medium text-[var(--page-fg)]">{platform}</span>
                  <code className="break-all rounded-lg border border-[var(--page-border)] bg-[var(--page-stripe)] px-2 py-1 font-mono text-[11px] text-[var(--page-fg-muted)]">
                    {file}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="surface-panel divide-y divide-[var(--page-border)] text-sm">
          <div className="px-5 py-4">
            <p className="font-semibold text-[var(--page-fg)]">Quick install</p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-[var(--page-fg-muted)]">
              Linux: <code className="text-[var(--page-fg)]">curl -fsSL …/install.sh | bash</code>
              <br />
              Windows: <code className="text-[var(--page-fg)]">irm …/install.ps1 | iex</code>
              <br />
              <span className="text-[var(--page-fg-dim)]">Scripts in the main repo README.</span>
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="font-semibold text-[var(--page-fg)]">CLI-only</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              Headless <code className="rounded bg-[var(--page-stripe)] px-1">crossusage-cli</code>{" "}
              tarballs/zips on the same release — see INSTALL.md.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--page-fg-muted)]">
          <span className="font-medium text-[var(--page-fg)]">macOS GUI</span> →{" "}
          <a
            href={upstreamReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--page-accent-ink)] underline-offset-2 hover:underline"
          >
            OpenUsage releases
          </a>{" "}
          (upstream Swift app)
        </p>

        {version && (
          <p className="font-mono text-[11px] text-[var(--page-fg-dim)]">
            Updater manifest: latest.json · tag v{tag}
          </p>
        )}

        <p className="text-sm">
          <Link href="/" className="text-[var(--page-fg-muted)] hover:text-[var(--page-accent)]">
            ← Back home
          </Link>
        </p>
      </div>
    </DocPage>
  );
}
