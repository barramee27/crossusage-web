"use client";

import type { ActiveView, ProviderId } from "@/lib/types";
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
    <div
      className="w-12 flex flex-col items-center py-3 flex-shrink-0"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Home / Overview */}
      <NavButton
        isActive={activeView === "overview"}
        onClick={() => onNavigate("overview")}
      >
        <GaugeIcon
          className="w-6 h-6"
          style={{
            color: activeView === "overview" ? "var(--foreground)" : "var(--muted-foreground)",
          }}
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
            style={{
              color: activeView === id ? brandColor : "var(--muted-foreground)",
            }}
          />
        </NavButton>
      ))}

      {/* Copilot — visible but not clickable */}
      <div className="w-full p-2.5 flex items-center justify-center">
        <CopilotIcon
          className="w-6 h-6"
          style={{ color: "var(--muted-foreground)" }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings (non-clickable) */}
      <div className="w-full p-2.5 flex items-center justify-center">
        <SettingsIcon
          className="w-6 h-6 opacity-40"
          style={{ color: "var(--muted-foreground)" }}
        />
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
      className="relative w-full p-2.5 flex items-center justify-center transition-colors"
      style={{
        backgroundColor: isActive ? "rgba(0,0,0,0.04)" : "transparent",
      }}
    >
      {/* Active indicator — left bar */}
      {isActive && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full"
          style={{ backgroundColor: "var(--primary)" }}
        />
      )}
      {children}
    </button>
  );
}
