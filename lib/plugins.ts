import {
  CodexIcon,
  ClaudeIcon,
  CursorIcon,
  CopilotIcon,
  WindsurfIcon,
  AntigravityIcon,
  AmpIcon,
  KimiIcon,
} from "./icons";

export interface Plugin {
  id: string;
  name: string;
  brandColor: string;
  Icon: typeof CodexIcon;
  /** Shown by name in the hero icon row */
  featured: boolean;
}

export const plugins: Plugin[] = [
  { id: "codex",       name: "Codex",       brandColor: "#74AA9C", Icon: CodexIcon,       featured: true },
  { id: "claude",      name: "Claude",      brandColor: "#DE7356", Icon: ClaudeIcon,      featured: true },
  { id: "cursor",      name: "Cursor",      brandColor: "#000000", Icon: CursorIcon,      featured: true },
  { id: "copilot",     name: "Copilot",     brandColor: "#A855F7", Icon: CopilotIcon,     featured: false },
  { id: "windsurf",    name: "Windsurf",    brandColor: "#111111", Icon: WindsurfIcon,    featured: false },
  { id: "antigravity", name: "Antigravity", brandColor: "#4285F4", Icon: AntigravityIcon, featured: false },
  { id: "amp",         name: "Amp",         brandColor: "#F34E3F", Icon: AmpIcon,         featured: false },
  { id: "kimi",        name: "Kimi",        brandColor: "#000000", Icon: KimiIcon,        featured: false },
];

/**
 * Returns white for very dark brand colors (so they're visible on the dark page).
 * Used by the provider grid and footer — NOT the light panel sidebar.
 */
export function displayColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r + g + b) / 3 < 30 ? "#ffffff" : hex;
}
