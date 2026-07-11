"use client";

import type { ActiveView, ProviderId } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  GaugeIcon,
  SettingsIcon,
  CodexIcon,
  ClaudeIcon,
  CursorIcon,
} from "@/lib/icons";
import { track } from "@/lib/track";

const providerNav: {
  id: ProviderId;
  Icon: typeof CodexIcon;
  brandColor: string;
  title: string;
}[] = [
  { id: "codex", Icon: CodexIcon, brandColor: "var(--brand-codex)", title: "Codex" },
  { id: "claude", Icon: ClaudeIcon, brandColor: "var(--brand-claude)", title: "Claude" },
  { id: "cursor", Icon: CursorIcon, brandColor: "var(--brand-cursor)", title: "Cursor" },
  {
    id: "cursor-work",
    Icon: CursorIcon,
    brandColor: "var(--brand-cursor)",
    title: "Cursor (Work)",
  },
];

export function Sidebar({
  activeView,
  onNavigate,
}: {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}) {
  return (
    <div className="flex w-12 flex-shrink-0 flex-col items-center border-r border-[var(--sidebar-border)] bg-[var(--sidebar)]/40 py-3">
      <NavButton
        isActive={activeView === "overview"}
        title="Overview"
        onClick={() => {
          track("panel_tab_clicked", { tab: "overview" });
          onNavigate("overview");
        }}
      >
        <GaugeIcon
          className={cn(
            "h-6 w-6",
            activeView === "overview" ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </NavButton>

      {providerNav.map(({ id, Icon, brandColor, title }) => (
        <NavButton
          key={id}
          isActive={activeView === id}
          title={title}
          onClick={() => {
            track("panel_tab_clicked", { tab: id });
            onNavigate(id);
          }}
        >
          <span className="relative">
            <Icon className="h-6 w-6" style={{ color: brandColor }} />
            {id === "cursor-work" && (
              <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full border border-card bg-[var(--page-accent)]" />
            )}
          </span>
        </NavButton>
      ))}

      <div className="flex-1" />

      <NavButton
        isActive={activeView === "settings"}
        title="Settings"
        onClick={() => {
          track("panel_tab_clicked", { tab: "settings" });
          onNavigate("settings");
        }}
      >
        <SettingsIcon
          className={cn(
            "h-6 w-6",
            activeView === "settings" ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </NavButton>
    </div>
  );
}

function NavButton({
  isActive,
  onClick,
  title,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center justify-center p-2.5 transition-colors",
        isActive && "bg-accent"
      )}
    >
      {isActive && (
        <span className="absolute top-1.5 bottom-1.5 left-0 w-0.5 rounded-r-full bg-[var(--sidebar-primary)]" />
      )}
      {children}
    </button>
  );
}
