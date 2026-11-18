"use client";

import { useState } from "react";
import { BarChart3, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  votes: number;
};

const POLL_OPTIONS: Option[] = [
  {
    id: "keep_auto",
    label: "Keep zero-config auto-discovery default (no login popups)",
    votes: 148,
  },
  {
    id: "opt_in_manual",
    label: "Keep auto-discovery + optional manual token override",
    votes: 64,
  },
  {
    id: "manual_only",
    label: "Switch to manual browser login per provider",
    votes: 11,
  },
];

export function PollsDemo() {
  const [selected, setSelected] = useState<string | null>(null);

  const baseTotal = POLL_OPTIONS.reduce((s, o) => s + o.votes, 0);
  const total = selected ? baseTotal + 1 : baseTotal;

  return (
    <div className="space-y-3 py-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="size-4 text-muted-foreground" aria-hidden />
          <h3 className="text-sm font-semibold text-foreground">
            Community Poll #04
          </h3>
        </div>
        <span className="rounded-full bg-[#e04819]/15 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-[#e04819]">
          POLL-FIRST RULE
        </span>
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold leading-snug text-foreground">
          How should CrossUsage handle provider authentication going forward?
        </p>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          Before changing credential behavior or removing any metric, users vote directly inside the tray app.
        </p>
      </div>

      {!selected ? (
        <div className="space-y-1.5 pt-0.5">
          {POLL_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelected(opt.id)}
              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-left text-xs font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-muted/60"
            >
              {opt.label}
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-2.5">
          <div className="flex items-center justify-between text-[10.5px] text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
              <CheckCircle2 className="size-3.5 text-[#16a34a]" aria-hidden />
              Vote recorded ({total} votes)
            </span>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="underline hover:text-foreground"
            >
              Change
            </button>
          </div>

          <ul className="space-y-2">
            {POLL_OPTIONS.map((opt) => {
              const count = opt.votes + (selected === opt.id ? 1 : 0);
              const pct = Math.round((count / total) * 100);
              const isMine = selected === opt.id;
              const isLead = opt.id === "keep_auto";
              return (
                <li key={opt.id} className="space-y-1">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span
                      className={cn(
                        "truncate",
                        (isMine || isLead) && "font-semibold text-foreground"
                      )}
                    >
                      {opt.label}
                      {isMine ? " · you" : ""}
                    </span>
                    <span className="shrink-0 font-mono tabular-nums text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        isLead ? "bg-[#16a34a]" : "bg-muted-foreground/50"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
