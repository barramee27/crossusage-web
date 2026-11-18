"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { ChevronDown } from "lucide-react";
import { providers } from "@/lib/mock-data";
import { CodexIcon, ClaudeIcon, CursorIcon } from "@/lib/icons";
import type { DisplayMode } from "./settings-demo";
import { ModernWidgetRow } from "./modern-widget-row";
import { TotalSpendDemo } from "./total-spend-demo";
import { UsageSparkline } from "./usage-sparkline";
import { cn } from "@/lib/utils";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, IconComp> = {
  codex: CodexIcon,
  claude: ClaudeIcon,
  cursor: CursorIcon,
  "cursor-work": CursorIcon,
};

export function ModernDashboard({
  enabledMetrics,
  displayMode = "left",
  showTotalSpend = true,
}: {
  enabledMetrics?: Record<string, string[]>;
  displayMode?: DisplayMode;
  showTotalSpend?: boolean;
}) {
  const [insightDismissed, setInsightDismissed] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2.5 pb-1">
      {/* Authentic UsageInsightsBanner replica */}
      {!insightDismissed ? (
        <section
          aria-label="Usage insights"
          className="rounded-lg border border-border bg-muted/35 px-2.5 py-2 text-[11px] leading-snug"
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-foreground/95">
              <span className="mr-1.5 text-[#d97706]" aria-hidden>
                ⚠
              </span>
              Claude Weekly at 42% left — burning 1.4× faster than window pace.
            </p>
            <button
              type="button"
              onClick={() => setInsightDismissed(true)}
              aria-label="Dismiss insight"
              className="shrink-0 px-1 text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <p className="mt-1 text-muted-foreground">
            <span className="mr-1.5" aria-hidden>
              ∑
            </span>
            7d total: $93.90 (+12% vs prior 7d) — Cursor, Codex, Claude
          </p>
        </section>
      ) : null}

      {/* Authentic TotalSpendCard donut ring */}
      {showTotalSpend ? <TotalSpendDemo /> : null}

      {/* Grouped provider widget cards */}
      {providers.map((provider) => {
        const Icon = icons[provider.id] ?? CodexIcon;
        const isCursor = provider.id === "cursor" || provider.id === "cursor-work";
        const iconColor = isCursor ? "var(--brand-cursor)" : provider.brandColor;
        const sparkColor = isCursor ? "#38bdf8" : provider.brandColor;
        const borderAccent = isCursor
          ? "var(--border)"
          : `${provider.brandColor}45`;

        const allowed = enabledMetrics?.[provider.id];
        const visibleMetrics = allowed
          ? provider.detailMetrics.filter((m) => allowed.includes(m.label))
          : provider.detailMetrics.slice(0, 2);
        const isExpanded = expandedId === provider.id;

        return (
          <section
            key={provider.id}
            className="overflow-hidden rounded-lg border bg-card/90 transition-colors"
            style={{ borderColor: borderAccent }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : provider.id)}
              aria-expanded={isExpanded}
              className="flex w-full items-center gap-2 border-b border-border/60 px-3 py-1.5 text-left transition-colors hover:bg-muted/40"
              title="Toggle 30-day local SQLite spend trend"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: iconColor }} />
              <span className="truncate text-xs font-semibold text-foreground">
                {provider.name}
              </span>
              <span className="ml-auto truncate rounded border border-border px-1.5 py-0.5 font-mono text-[9.5px] text-muted-foreground">
                {provider.planBadge}
              </span>
              <ChevronDown
                className={cn(
                  "size-3 shrink-0 text-muted-foreground transition-transform",
                  isExpanded && "rotate-180 text-foreground"
                )}
                aria-hidden
              />
            </button>
            <div className="px-3 py-1.5">
              {visibleMetrics.length > 0 ? (
                visibleMetrics.map((m) => (
                  <ModernWidgetRow
                    key={m.label}
                    label={m.label}
                    primaryValue={m.primaryValue}
                    secondaryValue={m.secondaryValue}
                    percent={m.percent}
                    pace={m.pace}
                    displayMode={displayMode}
                  />
                ))
              ) : (
                <p className="py-1.5 text-[11px] text-muted-foreground">
                  All metrics hidden — re-enable in Customize.
                </p>
              )}

              {isExpanded ? (
                <UsageSparkline
                  points={provider.trend30d}
                  color={sparkColor}
                  todaySpend={provider.todaySpend}
                  thirtyDaySpend={provider.thirtyDaySpend}
                />
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
