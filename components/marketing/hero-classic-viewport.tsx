"use client";

import { useState } from "react";
import { Panel } from "@/components/panel/panel";
import { ModernPanel } from "@/components/panel/modern-panel";
import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

type HeroLayout = "classic" | "modern";

/** Hero product plane — Classic or Modern tray panel on a desktop wash. */
export function HeroClassicViewport({ version }: { version: string | null }) {
  const [layout, setLayout] = useState<HeroLayout>("modern");

  return (
    <div className="hero-classic-plane relative h-full min-h-[28rem] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#0b1220_0%,#152033_42%,#0f1a28_100%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.55)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_70%_35%,rgba(15,159,122,0.28),transparent_60%)]" />
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--page-bg)] to-transparent" />

      <div className="relative flex h-full min-h-[28rem] flex-col">
        <div className="flex items-center justify-end gap-2 border-b border-white/8 bg-black/25 px-4 py-2 backdrop-blur-sm">
          <span className="mr-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
            {layout === "modern" ? "Modern" : "Classic"} · 400×580
          </span>
          {(["modern", "classic"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setLayout(id);
                track("hero_layout_toggle", { layout: id });
              }}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold capitalize transition-colors",
                layout === id
                  ? "border-[var(--page-accent)]/70 bg-[var(--page-accent)]/20 text-[var(--page-accent)]"
                  : "border-white/15 text-white/45 hover:border-white/30 hover:text-white/80"
              )}
            >
              {id}
            </button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center p-6 lg:p-8">
          <div className="hero-float w-full max-w-[400px]">
            {layout === "modern" ? (
              <ModernPanel version={version} />
            ) : (
              <Panel version={version} />
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/8 bg-black/30 px-4 py-2">
          <span className="mr-auto font-mono text-[10px] text-white/25">Tray</span>
          <div className="flex items-end gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1">
            {[73, 42, 67, 79].map((p) => (
              <span
                key={p}
                className="w-2 rounded-sm bg-[var(--page-accent)]"
                style={{ height: `${Math.max(4, (p / 100) * 14)}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
