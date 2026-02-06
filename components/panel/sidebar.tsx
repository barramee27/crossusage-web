"use client";

import type { ActiveView, ProviderId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GaugeIcon, SettingsIcon, CodexIcon, ClaudeIcon, CursorIcon, CopilotIcon } from "@/lib/icons";

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
        onClick={() => onNavigate("overview")}
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
          onClick={() => onNavigate(id)}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: activeView === id ? brandColor : "var(--muted-foreground)" }}
          />
        </NavButton>
      ))}

      {/* Copilot — visible but not clickable */}
      <div className="w-full p-2.5 flex items-center justify-center">
        <CopilotIcon className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings (non-clickable) */}
      <div className="w-full p-2.5 flex items-center justify-center">
        <SettingsIcon className="w-6 h-6 text-muted-foreground opacity-40" />
      </div>
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
