"use client";

import type { ComponentType, SVGProps } from "react";
import { providers } from "@/lib/mock-data";
import { CodexIcon, ClaudeIcon, CursorIcon } from "@/lib/icons";
import { ModernWidgetRow, ModernSpendRow } from "./modern-widget-row";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, IconComp> = {
  codex: CodexIcon,
  claude: ClaudeIcon,
  cursor: CursorIcon,
  "cursor-work": CursorIcon,
};

export function ModernDashboard() {
  return (
    <div className="space-y-2">
      <div className="mb-1 rounded-lg border border-amber-200/80 bg-amber-50 px-2.5 py-2 text-[11px] leading-snug text-amber-950">
        <p className="font-medium">Usage insights</p>
        <p className="mt-0.5 text-amber-900/85">
          Codex weekly at 91% — on track. Two Cursor accounts on the dashboard.
        </p>
      </div>

      {providers.map((provider) => {
        const Icon = icons[provider.id] ?? CodexIcon;
        const spend =
          provider.id === "codex"
            ? [
                { label: "Today", value: "$4.20" },
                { label: "Yesterday", value: "$2.80" },
              ]
            : provider.id === "claude"
              ? [{ label: "Today", value: "$1.10" }]
              : [];

        return (
          <section
            key={provider.id}
            className="overflow-hidden rounded-lg border bg-card/80"
            style={{ borderColor: `${provider.brandColor}33` }}
          >
            <header className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
              <Icon className="h-4 w-4 shrink-0" style={{ color: provider.brandColor }} />
              <h3 className="truncate text-base font-semibold text-foreground">{provider.name}</h3>
              <span className="ml-auto truncate rounded-md border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {provider.planBadge}
              </span>
            </header>
            <div className="px-3 py-2">
              {provider.detailMetrics.slice(0, 3).map((m) => (
                <ModernWidgetRow
                  key={m.label}
                  label={m.label}
                  primaryValue={m.primaryValue}
                  secondaryValue={m.secondaryValue}
                  percent={m.percent}
                  pace={m.pace}
                />
              ))}
              {spend.length > 0 && (
                <div className="mt-1 space-y-0 border-t border-border/50 pt-1">
                  {spend.map((s) => (
                    <ModernSpendRow key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
