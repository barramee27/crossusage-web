import type { Metadata } from "next";
import { Download, ExternalLink, Terminal } from "lucide-react";
import {
  cliInstallCmd,
  forkRepo,
  forkReleasesLatest,
  getLatestVersion,
  linuxInstallCmd,
  upstreamReleasesLatest,
  windowsInstallCmd,
} from "@/lib/site";
import { DocPage } from "@/components/marketing/doc-page";
import { CopyCommand } from "@/components/copy-command";
import { DownloadOsBanner } from "@/components/download-os-banner";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download CrossUsage for Linux (Debian/Ubuntu .deb, Fedora/RHEL/openSUSE .rpm, Arch/NixOS/universal AppImage, portable tar.gz) and Windows (NSIS setup, portable zip, onefile exe), or install via one-line shell script.",
  openGraph: {
    title: "Download CrossUsage",
    description:
      "Native Linux (.deb, .rpm, AppImage, tar.gz) and Windows installers from GitHub Releases. 28+ AI providers, multi-account, encrypted credentials. MIT licensed.",
  },
};

const FORMAT_MATRIX = [
  {
    format: ".deb (Debian / Ubuntu / Mint)",
    updater: "Signed auto-updater (latest.json)",
    cli: "Included (/usr/bin)",
    keyring: "Secret Service / libsecret",
  },
  {
    format: ".rpm (Fedora / RHEL / openSUSE)",
    updater: "Manual / install.sh",
    cli: "Included (/usr/bin)",
    keyring: "Secret Service / libsecret",
  },
  {
    format: ".AppImage (Arch / NixOS / Any Linux)",
    updater: "Manual / install.sh",
    cli: "Sidecar inside bundle",
    keyring: "Secret Service / libsecret",
  },
  {
    format: "Portable Archive (.tar.gz — Linux)",
    updater: "Manual",
    cli: "Included in archive",
    keyring: "Secret Service / libsecret",
  },
  {
    format: "NSIS Setup (.exe — Windows)",
    updater: "Signed auto-updater (latest.json)",
    cli: "Included",
    keyring: "Windows Credential Manager",
  },
  {
    format: "Portable (.zip / onefile .exe)",
    updater: "Manual",
    cli: "Included (.zip)",
    keyring: "Windows Credential Manager",
  },
] as const;

export default async function DownloadPage() {
  const version = await getLatestVersion();
  const dlBase = `${forkRepo}/releases/download/v${version}`;

  const linuxAssets = [
    {
      format: "Debian / Ubuntu / Mint / Pop!_OS (.deb)",
      note: "Includes signed Tauri auto-updater + crossusage-cli · sudo apt install ./crossusage_..._amd64.deb",
      file: `crossusage_${version}_amd64.deb`,
      href: `${dlBase}/crossusage_${version}_amd64.deb`,
    },
    {
      format: "Fedora / RHEL / Rocky / openSUSE (.rpm)",
      note: "Native x86_64 RPM + crossusage-cli · sudo dnf install or sudo zypper install",
      file: `crossusage-${version}-1.x86_64.rpm`,
      href: `${dlBase}/crossusage-${version}-1.x86_64.rpm`,
    },
    {
      format: "Arch / Manjaro / NixOS / Any Linux (.AppImage)",
      note: "Universal single-file binary for any distro · chmod +x && ./crossusage_...AppImage",
      file: `crossusage_${version}_amd64.AppImage`,
      href: `${dlBase}/crossusage_${version}_amd64.AppImage`,
    },
    {
      format: "Portable Linux Archive (.tar.gz)",
      note: "Self-contained GUI + crossusage-cli bundle (great for Arch, Gentoo, Void, or no-FUSE setups)",
      file: `crossusage_${version}_linux_amd64.tar.gz`,
      href: `${dlBase}/crossusage_${version}_linux_amd64.tar.gz`,
    },
  ];

  const windowsAssets = [
    {
      format: "Windows Installer (NSIS .exe)",
      note: "Recommended · Per-user install + signed auto-updates + crossusage-cli",
      file: `crossusage_${version}_x64-setup.exe`,
      href: `${dlBase}/crossusage_${version}_x64-setup.exe`,
    },
    {
      format: "Windows One-File Portable (.exe)",
      note: "Zero-install standalone executable",
      file: `crossusage_${version}_windows_amd64_onefile.exe`,
      href: `${dlBase}/crossusage_${version}_windows_amd64_onefile.exe`,
    },
    {
      format: "Windows Portable Archive (.zip)",
      note: "Unpack anywhere + crossusage-cli included",
      file: `crossusage_${version}_windows_amd64.zip`,
      href: `${dlBase}/crossusage_${version}_windows_amd64.zip`,
    },
  ];

  return (
    <DocPage
      title={`Download CrossUsage v${version}`}
      kicker="DOWNLOADS"
      subtitle="Native packages for every major Linux distro (.deb, .rpm, AppImage, tar.gz) and Windows hosted directly on GitHub Releases. Zero account signup required."
      wide
    >
      {/* Release status bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-5 py-4 shadow-[0_2px_0_rgba(17,19,23,0.05)]">
        <div className="text-sm">
          <span className="font-extrabold text-[var(--ink)]">
            Latest stable release: v{version}
          </span>
          <span className="ml-2 text-[var(--ink-secondary)]">
            In-app updates verified via signed{" "}
            <code className="rounded border border-[var(--rule)] bg-[var(--paper-recessed)] px-1.5 py-0.5 font-mono text-xs text-[var(--ink)]">
              latest.json
            </code>{" "}
            (.deb &amp; Windows NSIS)
          </span>
        </div>
        <a
          href={forkReleasesLatest}
          target="_blank"
          rel="noopener noreferrer"
          className="keycap-primary !py-2 !text-xs"
        >
          All GitHub Release Assets
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>

      {/* Client OS & Linux distro auto-detection banner */}
      <DownloadOsBanner version={version} dlBase={dlBase} />

      {/* Linux & Windows side-by-side */}
      <div id="linux-downloads" className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[var(--ink)]">Linux</h2>
              <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[var(--ink-secondary)]">
                x86_64 · Wayland / X11
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--ink-secondary)]">
              One-line installer (reads <code className="font-mono text-[11px]">/etc/os-release</code>{" "}
              to pick <code className="font-mono text-[11px]">.deb</code>,{" "}
              <code className="font-mono text-[11px]">.rpm</code>, or{" "}
              <code className="font-mono text-[11px]">.AppImage</code> — override with{" "}
              <code className="font-mono text-[11px]">INSTALL_KIND=deb|rpm|appimage|tarball</code>):
            </p>
            <div className="mt-3">
              <CopyCommand
                command={linuxInstallCmd}
                promptSymbol="$"
                label="dl_linux_script"
              />
            </div>

            <div className="mt-5 space-y-2.5">
              {linuxAssets.map((a) => (
                <a
                  key={a.file}
                  href={a.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--rule-strong)] bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--signal)]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--signal)]">
                      {a.format}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--ink-secondary)]">
                      {a.note}
                    </p>
                    <code className="mt-1 block truncate font-mono text-[11px] text-[var(--ink-muted)]">
                      {a.file}
                    </code>
                  </div>
                  <Download className="size-4 shrink-0 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--signal)]" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 text-xs leading-relaxed text-[var(--ink-secondary)]">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink)]">
              Distro &amp; Tray Notes
            </p>
            <p className="mt-1">
              Works across Debian/Ubuntu, Fedora/RHEL, openSUSE, Arch/Manjaro, NixOS, and Void.
              Requires GTK3 + WebKitGTK 4.1 and a Secret Service keyring (GNOME Keyring / KWallet)
              for encrypted multi-account vaults.
            </p>
          </div>
        </section>

        <section className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)]">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-[var(--ink)]">Windows</h2>
              <span className="rounded border border-[var(--rule-strong)] bg-[var(--paper-recessed)] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[var(--ink-secondary)]">
                Windows 10 / 11 (x64)
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--ink-secondary)]">
              One-line PowerShell installer (downloads latest NSIS setup; set{" "}
              <code className="font-mono text-[11px]">$env:INSTALL_MODE=&apos;cli&apos;</code> for
              standalone CLI):
            </p>
            <div className="mt-3">
              <CopyCommand
                command={windowsInstallCmd}
                promptSymbol="PS>"
                label="dl_windows_script"
              />
            </div>

            <div className="mt-5 space-y-2.5">
              {windowsAssets.map((a) => (
                <a
                  key={a.file}
                  href={a.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--rule-strong)] bg-white px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-[var(--signal)]"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--ink)] group-hover:text-[var(--signal)]">
                      {a.format}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--ink-secondary)]">
                      {a.note}
                    </p>
                    <code className="mt-1 block truncate font-mono text-[11px] text-[var(--ink-muted)]">
                      {a.file}
                    </code>
                  </div>
                  <Download className="size-4 shrink-0 text-[var(--ink-muted)] transition-colors group-hover:text-[var(--signal)]" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--rule)] bg-[var(--paper)] px-4 py-3 text-xs leading-relaxed text-[var(--ink-secondary)]">
            <p className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-[var(--ink)]">
              Verification &amp; Keyring
            </p>
            <p className="mt-1">
              Uses native Windows Credential Manager + WebView2 runtime. In-app updates verify
              signed <code className="font-mono text-[11px] text-[var(--ink)]">latest.json</code>{" "}
              signatures before applying.
            </p>
          </div>
        </section>
      </div>

      {/* Package format matrix */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] shadow-[0_2px_0_rgba(17,19,23,0.05)]">
        <div className="border-b border-[var(--rule)] bg-[var(--paper-recessed)] px-5 py-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
            Package Format Matrix · v{version}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[var(--rule)] font-mono text-[10.5px] uppercase tracking-wider text-[var(--ink-muted)]">
                <th className="px-5 py-3 font-semibold">Format</th>
                <th className="px-5 py-3 font-semibold">Updater</th>
                <th className="px-5 py-3 font-semibold">CLI Sidecar</th>
                <th className="px-5 py-3 font-semibold">Vault Backend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {FORMAT_MATRIX.map((row) => (
                <tr key={row.format} className="bg-white/60">
                  <td className="px-5 py-3 font-mono font-semibold text-[var(--ink)]">
                    {row.format}
                  </td>
                  <td className="px-5 py-3 text-[var(--ink-secondary)]">{row.updater}</td>
                  <td className="px-5 py-3 font-semibold text-[#0d8563]">{row.cli}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--ink-secondary)]">
                    {row.keyring}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Headless CLI + macOS note */}
      <div id="headless-cli" className="mt-6 grid gap-5 lg:grid-cols-12">
        <section className="rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] lg:col-span-7">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[var(--signal)]">
            <Terminal className="size-4" aria-hidden />
            <span>HEADLESS CLI &amp; TUI</span>
          </div>
          <h3 className="mt-2 text-base font-extrabold text-[var(--ink)]">
            Install <code className="font-mono text-sm">crossusage-cli</code> standalone
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
            Prebuilt standalone binaries for Linux (<code className="font-mono">x86_64</code>) and
            Windows (<code className="font-mono">x64</code>) — no desktop GUI session needed. On
            macOS or ARM64, build directly from source with{" "}
            <code className="font-mono">cargo build --release -p crossusage-cli</code>:
          </p>
          <div className="mt-3">
            <CopyCommand
              command={cliInstallCmd}
              promptSymbol="$"
              label="dl_cli_script"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={`${dlBase}/crossusage-cli_${version}_linux_amd64.tar.gz`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--rule-strong)] bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
            >
              <Download className="size-3.5" aria-hidden />
              Linux CLI (.tar.gz)
            </a>
            <a
              href={`${dlBase}/crossusage-cli_${version}_windows_amd64.zip`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--rule-strong)] bg-white px-3 py-1.5 font-mono text-[11px] font-semibold text-[var(--ink)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal)]"
            >
              <Download className="size-3.5" aria-hidden />
              Windows CLI (.zip)
            </a>
          </div>
        </section>

        <section className="flex flex-col justify-between rounded-2xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-6 shadow-[0_2px_0_rgba(17,19,23,0.05)] lg:col-span-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink-muted)]">
              macOS Desktop GUI
            </p>
            <h3 className="mt-2 text-base font-extrabold text-[var(--ink)]">
              Looking for macOS menu bar?
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-secondary)]">
              CrossUsage focuses on native Linux &amp; Windows builds (plus cross-platform CLI).
              For the native Swift macOS menu-bar app, grab upstream OpenUsage directly:
            </p>
          </div>
          <a
            href={upstreamReleasesLatest}
            target="_blank"
            rel="noopener noreferrer"
            className="keycap-secondary mt-4 w-fit !py-2 !text-xs"
          >
            OpenUsage macOS Releases
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </section>
      </div>
    </DocPage>
  );
}
