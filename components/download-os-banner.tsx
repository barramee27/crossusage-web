"use client";

import { useState, useSyncExternalStore } from "react";
import { Check, CheckCircle2, Copy, Download, Monitor, Terminal } from "lucide-react";
import { linuxInstallCmd, upstreamReleasesLatest } from "@/lib/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type DetectedOs = "linux" | "windows" | "macos" | null;
type LinuxDistroHint = "auto" | "deb" | "rpm" | "appimage" | "tarball";

interface ClientEnv {
  os: DetectedOs;
  distroHint: LinuxDistroHint;
  isArmLinux: boolean;
}

const SERVER_ENV: ClientEnv = {
  os: null,
  distroHint: "auto",
  isArmLinux: false,
};

let cachedClientEnv: ClientEnv | null = null;

const emptySubscribe = () => () => {};

function getClientEnv(): ClientEnv {
  if (cachedClientEnv) return cachedClientEnv;
  if (typeof navigator === "undefined") return SERVER_ENV;

  const ua = navigator.userAgent.toLowerCase();
  const isMobile =
    ua.includes("android") ||
    ua.includes("iphone") ||
    ua.includes("ipad") ||
    ua.includes("ipod") ||
    (ua.includes("mac") && navigator.maxTouchPoints > 1);

  if (isMobile) {
    cachedClientEnv = SERVER_ENV;
    return cachedClientEnv;
  }

  let os: DetectedOs = null;
  if (ua.includes("win")) os = "windows";
  else if (ua.includes("mac")) os = "macos";
  else if (ua.includes("linux") || ua.includes("x11")) os = "linux";

  let distroHint: LinuxDistroHint = "auto";
  if (os === "linux") {
    if (/(ubuntu|debian|mint|pop!_os|kali|zorin|elementary)/.test(ua)) {
      distroHint = "deb";
    } else if (/(fedora|red hat|rhel|centos|rocky|alma|opensuse|suse)/.test(ua)) {
      distroHint = "rpm";
    } else if (/(arch|manjaro|endeavour|cachyos|nixos|alpine|void|gentoo|solus)/.test(ua)) {
      distroHint = "appimage";
    }
  }

  const isArmLinux = os === "linux" && /(aarch64|arm64)/.test(ua);

  cachedClientEnv = { os, distroHint, isArmLinux };
  return cachedClientEnv;
}

export function DownloadOsBanner({
  version,
  dlBase,
}: {
  version: string;
  dlBase: string;
}) {
  const env = useSyncExternalStore(emptySubscribe, getClientEnv, () => SERVER_ENV);
  const [selectedDistro, setSelectedDistro] = useState<LinuxDistroHint | null>(null);
  const [copiedLinux, setCopiedLinux] = useState(false);

  if (!env.os) return null;

  if (env.os === "linux") {
    const activeDistro: LinuxDistroHint = selectedDistro ?? env.distroHint;

    const distroOptions: {
      id: LinuxDistroHint;
      label: string;
      note: string;
      file?: string;
      href?: string;
    }[] = [
      {
        id: "auto",
        label: "Auto-Detect Script",
        note: "Detects Debian/Ubuntu (.deb), Fedora/RHEL/openSUSE (.rpm), or Arch/NixOS/other (.AppImage) via /etc/os-release",
      },
      {
        id: "deb",
        label: "Debian / Ubuntu (.deb)",
        note: "Debian, Ubuntu, Linux Mint, Pop!_OS — includes signed Tauri auto-updater + crossusage-cli",
        file: `crossusage_${version}_amd64.deb`,
        href: `${dlBase}/crossusage_${version}_amd64.deb`,
      },
      {
        id: "rpm",
        label: "Fedora / openSUSE (.rpm)",
        note: "Fedora, RHEL, Rocky, Alma, openSUSE — install with dnf or zypper",
        file: `crossusage-${version}-1.x86_64.rpm`,
        href: `${dlBase}/crossusage-${version}-1.x86_64.rpm`,
      },
      {
        id: "appimage",
        label: "Arch / Any Linux (.AppImage)",
        note: "Arch, Manjaro, EndeavourOS, NixOS, Void, Alpine — chmod +x and run anywhere",
        file: `crossusage_${version}_amd64.AppImage`,
        href: `${dlBase}/crossusage_${version}_amd64.AppImage`,
      },
      {
        id: "tarball",
        label: "Portable (.tar.gz)",
        note: "Self-contained GUI + crossusage-cli tarball with no FUSE requirement",
        file: `crossusage_${version}_linux_amd64.tar.gz`,
        href: `${dlBase}/crossusage_${version}_linux_amd64.tar.gz`,
      },
    ];

    const current =
      distroOptions.find((d) => d.id === activeDistro) ?? distroOptions[0];

    const handleCopyInstaller = async () => {
      try {
        await navigator.clipboard.writeText(linuxInstallCmd);
        setCopiedLinux(true);
        track("banner_linux_install_copied");
        window.setTimeout(() => setCopiedLinux(false), 1800);
      } catch {
        // ignore clipboard failure
      }
    };

    return (
      <div className="mt-5 rounded-2xl border border-[#1d222c] bg-[#0e1015] p-5 text-[#f1f3f7] shadow-[0_18px_40px_-24px_rgba(14,16,21,0.5)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2dd4bf]/15 text-[#2dd4bf]">
              <Monitor className="size-4.5" aria-hidden />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2dd4bf]">
                  <CheckCircle2 className="size-3" aria-hidden />
                  DETECTED: LINUX ({env.isArmLinux ? "ARM64" : "X86_64"})
                </span>
                <span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[9.5px] text-[#98a2b3]">
                  PICK YOUR DISTRO
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#98a2b3]">
                {env.isArmLinux
                  ? "Prebuilt Linux packages currently target x86_64. On ARM64, build CrossUsage or crossusage-cli from source via Cargo."
                  : current.note}
              </p>
            </div>
          </div>

          {!env.isArmLinux &&
            (current.href && current.file ? (
              <a
                href={current.href}
                onClick={() =>
                  track("banner_download_clicked", { os: "linux", format: current.id })
                }
                className="keycap-signal shrink-0 !py-2 !text-xs"
              >
                <Download className="size-3.5" aria-hidden />
                Download {current.file}
              </a>
            ) : (
              <button
                type="button"
                onClick={() => void handleCopyInstaller()}
                className="keycap-signal shrink-0 !py-2 !text-xs"
              >
                {copiedLinux ? (
                  <>
                    <Check className="size-3.5" aria-hidden />
                    Copied One-Line Installer
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" aria-hidden />
                    Copy Auto-Detect Installer
                  </>
                )}
              </button>
            ))}
        </div>

        {/* Distro selector pills so non-Debian distros are first-class */}
        {!env.isArmLinux && (
          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/[0.08] pt-3.5">
            <span className="mr-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#6d7688]">
              <Terminal className="size-3 text-[#2dd4bf]" aria-hidden />
              Distro:
            </span>
            {distroOptions.map((opt) => {
              const selected = opt.id === activeDistro;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedDistro(opt.id)}
                  className={cn(
                    "rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                    selected
                      ? "border-[#e04819] bg-[#e04819] text-white"
                      : "border-white/12 bg-white/[0.04] text-[#cbd5e1] hover:border-white/30 hover:text-white"
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const rec =
    env.os === "windows"
      ? {
          osLabel: "Windows (x64)",
          cta: `Download crossusage_${version}_x64-setup.exe`,
          href: `${dlBase}/crossusage_${version}_x64-setup.exe`,
          note: "NSIS installer with signed WebView2 auto-updater + crossusage-cli (portable .zip & onefile .exe also below)",
          external: false,
        }
      : {
          osLabel: "macOS",
          cta: "OpenUsage macOS Releases",
          href: upstreamReleasesLatest,
          note: "Native Swift macOS menu-bar app is maintained by upstream OpenUsage; CrossUsage CLI can also be built from source via Cargo.",
          external: true,
        };

  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#1d222c] bg-[#0e1015] px-5 py-4 text-[#f1f3f7] shadow-[0_18px_40px_-24px_rgba(14,16,21,0.5)]">
      <div className="flex items-start gap-3 sm:items-center">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#2dd4bf]/15 text-[#2dd4bf]">
          <Monitor className="size-4.5" aria-hidden />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-[#2dd4bf]">
              <CheckCircle2 className="size-3" aria-hidden />
              DETECTED: {rec.osLabel}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#98a2b3]">{rec.note}</p>
        </div>
      </div>

      <a
        href={rec.href}
        {...(rec.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={() => track("banner_download_clicked", { os: env.os ?? "unknown" })}
        className="keycap-signal shrink-0 !py-2 !text-xs"
      >
        {rec.cta}
      </a>
    </div>
  );
}
