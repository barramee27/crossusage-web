"use client";

import type { ActiveView, ProviderId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GaugeIcon, SettingsIcon, CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon, WindsurfIcon, AntigravityIcon } from "@/lib/icons";
import { track } from "@/lib/track";

const providerNav: {
  id: ProviderId;
  Icon: typeof CodexIcon;
  brandColor: string;
}[] = [
  { id: "codex", Icon: CodexIcon, brandColor: "var(--brand-codex)" },
  { id: "claude", Icon: ClaudeIcon, brandColor: "var(--brand-claude)" },
  { id: "cursor", Icon: CursorIcon, brandColor: "var(--brand-cursor)" },
];

export function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}) {
  return (
    <div className="w-12 flex flex-col items-center py-3 flex-shrink-0 bg-sidebar/30 border-r border-sidebar-border">
      {/* Home / Overview */}
      <NavButton
        isActive={activeView === "overview"}
        onClick={() => {
          track("panel_tab_clicked", { tab: "overview" });
          onNavigate("overview");
        }}
      >
        <GaugeIcon
          className={cn("w-6 h-6", activeView === "overview" ? "text-foreground" : "text-muted-foreground")}
        />
      </NavButton>

      {/* Provider icons */}
      {providerNav.map(({ id, Icon, brandColor }) => (
        <NavButton
          key={id}
          isActive={activeView === id}
          onClick={() => {
            track("panel_tab_clicked", { tab: id });
            onNavigate(id);
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: brandColor }}
          />
        </NavButton>
      ))}

      {/* Copilot — visible but not navigable */}
      <button
        className="w-full p-2.5 flex items-center justify-center"
        onClick={() => track("panel_tab_clicked", { tab: "copilot" })}
      >
        <CopilotIcon className="w-6 h-6" style={{ color: "var(--brand-copilot)" }} />
      </button>

      {/* Windsurf — visible but not navigable */}
      <button
        className="w-full p-2.5 flex items-center justify-center"
        onClick={() => track("panel_tab_clicked", { tab: "windsurf" })}
      >
        <WindsurfIcon className="w-6 h-6" style={{ color: "var(--brand-windsurf)" }} />
      </button>

      {/* Antigravity — visible but not navigable */}
      <button
        className="w-full p-2.5 flex items-center justify-center"
        onClick={() => track("panel_tab_clicked", { tab: "antigravity" })}
      >
        <AntigravityIcon className="w-6 h-6" style={{ color: "var(--brand-antigravity)" }} />
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings — visible but not navigable */}
      <button
        className="w-full p-2.5 flex items-center justify-center"
        onClick={() => track("panel_tab_clicked", { tab: "settings" })}
      >
        <SettingsIcon className="w-6 h-6 text-muted-foreground opacity-40" />
      </button>
    </div>
  );
}

function NavButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full p-2.5 flex items-center justify-center transition-colors",
        isActive && "bg-accent"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full bg-sidebar-primary" />
      )}
      {children}
    </button>
  );
}
