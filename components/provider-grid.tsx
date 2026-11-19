"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Code2, Copy, Search, X } from "lucide-react";
import { plugins, displayColor, type PluginCategory } from "@/lib/plugins";
import { ProviderIcon } from "@/components/provider-icon";
import { Eyebrow } from "@/components/marketing/eyebrow";
import { forkRepo } from "@/lib/site";
import { cn } from "@/lib/utils";

type FilterId = "all" | "auto" | PluginCategory;

const autoCount = plugins.filter((p) => p.autoDiscover).length;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: `All (${plugins.length})` },
  { id: "auto", label: `Zero-Config Auto (${autoCount})` },
  { id: "ide", label: "IDEs & Agents" },
  { id: "model", label: "Frontier Models & Chat" },
  { id: "router", label: "Cloud & Routers" },
];

export function ProviderGrid() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("cursor");
  const [copiedCli, setCopiedCli] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onSelectEvent = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (id && plugins.some((p) => p.id === id)) {
        setFilter("all");
        setQuery("");
        setSelectedId(id);
      }
    };
    window.addEventListener("crossusage:select-provider", onSelectEvent);
    return () =>
      window.removeEventListener("crossusage:select-provider", onSelectEvent);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && document.activeElement === searchRef.current) {
        setQuery("");
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return plugins.filter((p) => {
      if (filter === "auto" && !p.autoDiscover) return false;
      if (filter !== "all" && filter !== "auto" && p.category !== filter) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.authMode.toLowerCase().includes(q) ||
        p.metrics.some((m) => m.toLowerCase().includes(q))
      );
    });
  }, [filter, query]);

  const inspected = useMemo(
    () => plugins.find((p) => p.id === selectedId) ?? plugins[0],
    [selectedId]
  );

  const cliCmd = `crossusage-cli probe --human ${inspected.id}`;

  const copyCli = async () => {
    try {
      await navigator.clipboard.writeText(cliCmd);
      setCopiedCli(true);
      window.setTimeout(() => setCopiedCli(false), 1600);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <section
      id="providers"
      className="relative scroll-mt-20 border-b border-[var(--rule)] bg-[var(--paper-recessed)]/50"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>02 // PLUGIN CATALOG</Eyebrow>
            <h2
              id="providers-heading"
              className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl"
            >
              {plugins.length} bundled providers{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                out of the box.
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--ink-secondary)] sm:text-base">
              Every bundled plugin supports multi-account vaults, custom base labels, and local
              auto-discovery where available. Click any card to inspect its QuickJS manifest &amp;
              tracked metrics.
            </p>
          </div>

          <div className="relative w-full lg:w-76">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[var(--ink-muted)]"
              aria-hidden
            />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search provider, metric, auth..."
              aria-label="Filter providers"
              className="w-full rounded-lg border border-[var(--rule-strong)] bg-[var(--paper-elevated)] py-2.5 pr-12 pl-9 text-sm text-[var(--ink)] placeholder:text-[var(--ink-faint)] shadow-[inset_0_1px_2px_rgba(17,19,23,0.04)] focus:border-[var(--signal)] focus:bg-white focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2.5 inline-flex size-5 -translate-y-1/2 items-center justify-center rounded bg-[var(--paper-recessed)] text-[var(--ink-secondary)] hover:text-[var(--ink)]"
              >
                <X className="size-3" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded border border-[var(--rule-strong)] bg-[var(--paper)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--ink-muted)]">
                /
              </kbd>
            )}
          </div>
        </div>

        {/* Category selector tabs + live count */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-md border px-3 py-1.5 font-mono text-xs font-semibold transition-all",
                    active
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[#faf8f4] shadow-[0_2px_0_#000]"
                      : "border-[var(--rule-strong)] bg-[var(--paper-elevated)] text-[var(--ink-secondary)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  )}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[11px] font-medium text-[var(--ink-muted)]">
            Showing {filtered.length} / {plugins.length} bundled
          </span>
        </div>

        {/* Rich Live Plugin Manifest & Telemetry Inspector */}
        <div className="mt-6 rounded-2xl border border-[#1d222c] bg-[#0e1015] p-5 text-[#f1f3f7] shadow-[0_20px_50px_-28px_rgba(14,16,21,0.55)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3.5 sm:items-center">
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white"
                style={{ color: displayColor(inspected.brandColor) }}
              >
                <ProviderIcon
                  src={inspected.icon}
                  color={displayColor(inspected.brandColor)}
                  className="size-5"
                />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#e04819] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white">
                    MANIFEST
                  </span>
                  <span className="text-base font-extrabold text-white">
                    {inspected.name}
                  </span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                      inspected.autoDiscover
                        ? "bg-[#2dd4bf]/15 text-[#2dd4bf]"
                        : "bg-white/10 text-[#cbd5e1]"
                    )}
                  >
                    {inspected.autoDiscover ? "ZERO-CONFIG AUTO" : "API KEY / VAULT"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-[#98a2b3]">
                  Source: <span className="text-[#e2e8f0]">{inspected.localSource}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void copyCli()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#151922] px-3 py-1.5 font-mono text-[11px] text-[#cbd5e1] transition-colors hover:border-white/30 hover:text-white"
                title="Copy crossusage-cli probe command"
              >
                {copiedCli ? (
                  <>
                    <Check className="size-3.5 text-[#2dd4bf]" />
                    <span className="text-[#2dd4bf]">Copied CLI command</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5 text-[#8e97a8]" />
                    <span>{cliCmd}</span>
                  </>
                )}
              </button>
              <a
                href={`${forkRepo}/tree/feat/linux-windows-native-support/plugins/${inspected.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#e04819] px-3 py-1.5 font-mono text-[11px] font-semibold text-white transition-colors hover:bg-[#c73c11]"
              >
                plugin.js + json
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/[0.08] pt-3.5">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-[#6d7688]">
              Tracked lines:
            </span>
            {inspected.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md border border-white/10 bg-[#161a23] px-2 py-0.5 font-mono text-[10.5px] text-[#e2e8f0]"
              >
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Crisp tactile specimen cards */}
        {filtered.length > 0 ? (
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(({ id, name, brandColor, icon, authMode, autoDiscover }) => {
              const color = displayColor(brandColor);
              const selected = inspected.id === id;
              return (
                <div
                  key={id}
                  onClick={() => setSelectedId(id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedId(id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className={cn(
                    "group flex cursor-pointer items-center gap-3.5 rounded-xl border px-3.5 py-3 shadow-[0_2px_0_rgba(17,19,23,0.04)] transition-all hover:-translate-y-0.5",
                    selected
                      ? "border-[var(--signal)] bg-white ring-1 ring-[var(--signal)]/25"
                      : "border-[var(--rule-strong)] bg-[var(--paper-elevated)] hover:border-[var(--ink)] hover:bg-white"
                  )}
                >
                  <span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-[var(--rule)]"
                    style={{ backgroundColor: `${color}12`, color }}
                  >
                    <ProviderIcon src={icon} color={color} className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <p className="truncate text-sm font-bold text-[var(--ink)] group-hover:text-[var(--signal)]">
                        {name}
                      </p>
                      <span
                        className={cn(
                          "shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-wider",
                          autoDiscover
                            ? "bg-[#0d8563]/12 text-[#0d8563]"
                            : "bg-[var(--paper-recessed)] text-[var(--ink-muted)]"
                        )}
                      >
                        {autoDiscover ? "AUTO" : "KEY"}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate font-mono text-[10.5px] text-[var(--ink-muted)]">
                      {authMode}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-6 py-10 text-center text-sm text-[var(--ink-secondary)]">
            No bundled provider matches &ldquo;{query}&rdquo;.
          </div>
        )}

        {/* Sandboxed QuickJS SDK callout */}
        <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-[#1d222c] bg-[#0e1015] p-5 text-[#f1f3f7] sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-start gap-3.5 sm:items-center">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#e04819]/20 text-[#ff7349]">
              <Code2 className="size-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-white">
                Sandboxed QuickJS Plugin Runtime
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-[#98a2b3]">
                Every provider is a standalone{" "}
                <code className="font-mono text-white">plugin.json</code> +{" "}
                <code className="font-mono text-white">plugin.js</code> executed inside Rust&apos;s
                QuickJS engine. Ship a new provider without touching Rust UI code.
              </p>
            </div>
          </div>
          <a
            href={`${forkRepo}/tree/feat/linux-windows-native-support/plugins`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[0.08] px-3.5 py-2 font-mono text-xs font-semibold text-white transition-colors hover:border-white/35 hover:bg-white/[0.14]"
          >
            Inspect plugins/
            <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
