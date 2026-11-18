import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { linuxInstallCmd, upstreamReleasesLatest } from "@/lib/site";
import { CopyCommand } from "@/components/copy-command";

export function CtaBand({ version }: { version: string | null }) {
  return (
    <section className="relative border-b border-[var(--rule)]">
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#1d222c] bg-[#0e1015] px-6 py-14 text-center text-[#f1f3f7] shadow-[0_36px_90px_-34px_rgba(14,16,21,0.65)] sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(224,72,25,0.22), transparent 65%), radial-gradient(ellipse 50% 45% at 80% 100%, rgba(45,212,191,0.12), transparent 60%)",
            }}
            aria-hidden
          />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-widest text-[#2dd4bf]">
              READY IN UNDER 30 SECONDS
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
              Calibrate every AI quota{" "}
              <span className="font-editorial italic font-normal text-[#ff7349]">
                today.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#98a2b3] sm:text-base">
              Native packages for Linux (.deb, .rpm, AppImage) and Windows (NSIS setup, portable
              zip, one-file exe). 100% free &amp; MIT licensed.
            </p>

            <div className="mx-auto mt-8 max-w-xl text-left">
              <CopyCommand
                command={linuxInstallCmd}
                promptSymbol="$"
                label="cta_linux"
                className="!border-white/15 !bg-[#151922]"
              />
            </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/download" className="keycap-signal min-w-[215px]">
                <Download className="size-4" aria-hidden />
                Download {version ? `v${version}` : "CrossUsage"}
              </Link>
              <a
                href={upstreamReleasesLatest}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/18 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.12]"
              >
                macOS GUI → OpenUsage
                <ArrowUpRight className="size-3.5 text-[#98a2b3]" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
