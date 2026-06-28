import type { Metadata } from "next";
import Link from "next/link";
import { forkLatestJson, forkReleasesLatest, upstreamReleasesLatest } from "@/lib/site";
import { DocPage } from "@/components/marketing/doc-page";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download CrossUsage 1.2.0 for Linux (.deb, .rpm, AppImage) and Windows (installer + portable onefile). macOS → upstream OpenUsage.",
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
    <DocPage title="Download" kicker="dist">
      <p className="font-mono text-sm leading-relaxed text-[var(--page-fg-muted)]">
        Installers and portable builds live on GitHub Releases. In-app updates use the{" "}
        <code className="text-[var(--page-fg)]">.deb</code> / NSIS{" "}
        <code className="text-[var(--page-fg)]">.exe</code> plus bundled{" "}
        <code className="text-[var(--page-fg)]">.sig</code> files.
      </p>

      <div className="mt-10 space-y-8">
        <a
          href={forkReleasesLatest}
          target="_blank"
          rel="noopener noreferrer"
          className="signal-block-strong inline-flex w-full items-center justify-center px-6 py-3.5 font-mono text-sm font-semibold text-[var(--page-accent)] hover:bg-[var(--page-accent)] hover:text-[var(--page-bg)] sm:w-auto"
        >
          Download {version ? `v${version}` : "latest release"}
        </a>

        {assets.length > 0 && (
          <div className="signal-block overflow-hidden font-mono text-xs sm:text-sm">
            <div className="border-b border-[var(--page-border)] bg-[var(--surface-2)] px-4 py-3 text-[var(--page-fg-dim)] sm:px-5">
              Typical assets for v{version}
            </div>
            <ul className="divide-y divide-[var(--page-border)]">
              {assets.map(({ platform, file }) => (
                <li
                  key={file}
                  className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5"
                >
                  <span className="text-[var(--page-accent)]">{platform}</span>
                  <code className="break-all border border-[var(--page-border)] bg-[var(--surface-2)] px-2 py-1 text-[10px] text-[var(--page-fg)] sm:text-xs">
                    {file}
                  </code>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="signal-block divide-y divide-[var(--page-border)] font-mono text-xs sm:text-sm">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[var(--page-accent)]">quick install</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              Linux:{" "}
              <code className="text-[var(--page-fg)]">curl -fsSL …/install.sh | bash</code>
              <br />
              Windows:{" "}
              <code className="text-[var(--page-fg)]">irm …/install.ps1 | iex</code>
              <br />
              <span className="text-[var(--page-fg-dim)]">Scripts in the main repo README.</span>
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[var(--page-accent)]">cli-only</p>
            <p className="mt-2 text-[var(--page-fg-muted)]">
              Headless <code className="text-[var(--page-fg)]">crossusage-cli</code> tarballs/zips
              on the same release or branch <code className="text-[var(--page-fg)]">releases/</code>{" "}
              folder — see INSTALL.md.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--page-fg-muted)]">
          <span className="font-mono text-[var(--page-fg-dim)]">macOS GUI</span> →{" "}
          <a
            href={upstreamReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--page-accent)] hover:underline"
          >
            OpenUsage releases
          </a>{" "}
          (upstream Swift app)
        </p>

        {version && (
          <p className="font-mono text-[10px] text-[var(--page-fg-dim)]">Updater manifest: latest.json · tag v{tag}</p>
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
