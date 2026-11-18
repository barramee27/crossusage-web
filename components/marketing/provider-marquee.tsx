import { displayColor, plugins } from "@/lib/plugins";
import { ProviderIcon } from "@/components/provider-icon";

const SPECS = [
  {
    code: "SPEC.01",
    metric: `${plugins.length} Bundled`,
    label: "AI Providers & Routers",
    detail: "IDEs, frontier chats, local & cloud APIs",
  },
  {
    code: "SPEC.02",
    metric: "AES-256-GCM",
    label: "Hardware-Backed Vault",
    detail: "libsecret & Windows Credential Manager",
  },
  {
    code: "SPEC.03",
    metric: "127.0.0.1:6736",
    label: "Loopback JSON Engine",
    detail: "Waybar, Polybar, tmux & crossusage-cli",
  },
  {
    code: "SPEC.04",
    metric: "Zero Cloud",
    label: "100% Direct Probing",
    detail: "No middleman proxy, no account signup",
  },
] as const;

export function ProviderMarquee() {
  const row = [...plugins, ...plugins];

  return (
    <section
      className="relative border-b border-[var(--rule)]"
      aria-label="Technical specifications and supported providers"
    >
      <div className="drafting-frame reg-mark">
        {/* 4-column calibrated specification matrix */}
        <div className="grid grid-cols-2 divide-x divide-y divide-[var(--rule)] border-b border-[var(--rule)] bg-[var(--paper-elevated)] lg:grid-cols-4 lg:divide-y-0">
          {SPECS.map((s) => (
            <div key={s.code} className="px-5 py-5 sm:px-7 sm:py-6">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-[var(--ink-faint)]">
                {s.code}
              </span>
              <p className="mt-1.5 font-mono text-lg font-bold tracking-tight text-[var(--ink)] sm:text-xl">
                {s.metric}
              </p>
              <p className="mt-0.5 text-[13px] font-semibold text-[var(--signal)]">
                {s.label}
              </p>
              <p className="mt-0.5 text-xs text-[var(--ink-secondary)]">
                {s.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Recessed warm tape marquee */}
        <div className="overflow-hidden bg-[var(--paper-recessed)] py-3.5">
          <div className="provider-marquee gap-8 px-4">
            {row.map(({ id, name, brandColor, icon }, i) => {
              const color = displayColor(brandColor);
              return (
                <div
                  key={`${id}-${i}`}
                  className="flex shrink-0 items-center gap-2 rounded-md border border-[var(--rule)] bg-[var(--paper-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)] shadow-[0_1px_0_rgba(17,19,23,0.04)]"
                >
                  <ProviderIcon src={icon} color={color} className="size-3.5" />
                  <span>{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
