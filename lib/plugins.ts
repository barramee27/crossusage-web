import {
  AmpIcon,
  AntigravityIcon,
  ClaudeIcon,
  CodexIcon,
  CopilotIcon,
  CursorIcon,
  FactoryIcon,
  JetBrainsAiAssistantIcon,
  KimiIcon,
  KiroIcon,
  MiniMaxIcon,
  OpenCodeGoIcon,
  PerplexityIcon,
  SyntheticIcon,
  ZaiIcon,
  makeLetterIcon,
} from "./icons";

export interface Plugin {
  id: string;
  name: string;
  brandColor: string;
  Icon: typeof CodexIcon;
  /** Shown by name in the hero icon row */
  featured: boolean;
}

/** Bundled plugins (excludes dev-only mock). Keep in sync with repo `plugins/`. */
export const plugins: Plugin[] = [
  { id: "amp", name: "Amp", brandColor: "#F34E3F", Icon: AmpIcon, featured: false },
  { id: "antigravity", name: "Antigravity", brandColor: "#4285F4", Icon: AntigravityIcon, featured: true },
  { id: "antigravity-cli", name: "Antigravity CLI", brandColor: "#4285F4", Icon: AntigravityIcon, featured: false },
  { id: "antigravity-ide", name: "Antigravity IDE", brandColor: "#000000", Icon: AntigravityIcon, featured: false },
  { id: "claude", name: "Claude", brandColor: "#DE7356", Icon: ClaudeIcon, featured: true },
  { id: "codex", name: "Codex", brandColor: "#74AA9C", Icon: CodexIcon, featured: true },
  { id: "command-code", name: "Command Code", brandColor: "#000000", Icon: makeLetterIcon("C"), featured: false },
  { id: "copilot", name: "Copilot", brandColor: "#A855F7", Icon: CopilotIcon, featured: true },
  { id: "crofai", name: "CrofAI", brandColor: "#000000", Icon: makeLetterIcon("C"), featured: false },
  { id: "cursor", name: "Cursor", brandColor: "#000000", Icon: CursorIcon, featured: true },
  { id: "cursor-nightly", name: "Cursor Nightly", brandColor: "#E85D3A", Icon: CursorIcon, featured: false },
  { id: "deepseek", name: "DeepSeek", brandColor: "#4D6BFE", Icon: makeLetterIcon("D"), featured: false },
  { id: "devin", name: "Devin", brandColor: "#000000", Icon: makeLetterIcon("D"), featured: false },
  { id: "factory", name: "Factory", brandColor: "#020202", Icon: FactoryIcon, featured: false },
  { id: "fireworks-ai", name: "Fireworks AI", brandColor: "#5019C5", Icon: makeLetterIcon("F"), featured: false },
  { id: "grok", name: "Grok", brandColor: "#000000", Icon: makeLetterIcon("G"), featured: false },
  { id: "jetbrains-ai-assistant", name: "JetBrains AI Assistant", brandColor: "#7d5fe6", Icon: JetBrainsAiAssistantIcon, featured: false },
  { id: "kiro", name: "Kiro", brandColor: "#C09CFF", Icon: KiroIcon, featured: false },
  { id: "kimi", name: "Kimi", brandColor: "#000000", Icon: KimiIcon, featured: false },
  { id: "minimax", name: "MiniMax", brandColor: "#F5433C", Icon: MiniMaxIcon, featured: false },
  { id: "neuralwatt", name: "Neuralwatt", brandColor: "#D55934", Icon: makeLetterIcon("N"), featured: false },
  { id: "ollama", name: "Ollama", brandColor: "#000000", Icon: makeLetterIcon("O"), featured: false },
  { id: "opencode-go", name: "OpenCode Go", brandColor: "#000000", Icon: OpenCodeGoIcon, featured: false },
  { id: "openrouter", name: "OpenRouter", brandColor: "#8B5CF6", Icon: makeLetterIcon("O"), featured: false },
  { id: "perplexity", name: "Perplexity", brandColor: "#20808D", Icon: PerplexityIcon, featured: false },
  { id: "synthetic", name: "Synthetic", brandColor: "#000000", Icon: SyntheticIcon, featured: false },
  { id: "zai", name: "Z.ai", brandColor: "#2D2D2D", Icon: ZaiIcon, featured: false },
];

/**
 * Returns white for very dark brand colors (so they're visible on the dark page).
 * Used by the provider grid and footer — NOT the light panel sidebar.
 */
export function displayColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r + g + b) / 3 < 50 ? "#ffffff" : hex;
}
