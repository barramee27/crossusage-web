export interface Plugin {
  id: string;
  name: string;
  brandColor: string;
  /** Path under `public/` — real asset from repo `plugins/<id>/icon.*` */
  icon: string;
  /** Shown by name in the hero icon row */
  featured: boolean;
}

/** Bundled plugins (excludes dev-only mock). Keep in sync with repo `plugins/`. */
export const plugins: Plugin[] = [
  { id: "amp", name: "Amp", brandColor: "#F34E3F", icon: "/providers/amp.svg", featured: false },
  {
    id: "antigravity",
    name: "Antigravity",
    brandColor: "#4285F4",
    icon: "/providers/antigravity.svg",
    featured: true,
  },
  {
    id: "antigravity-cli",
    name: "Antigravity CLI",
    brandColor: "#4285F4",
    icon: "/providers/antigravity-cli.svg",
    featured: false,
  },
  {
    id: "antigravity-ide",
    name: "Antigravity IDE",
    brandColor: "#000000",
    icon: "/providers/antigravity-ide.svg",
    featured: false,
  },
  { id: "claude", name: "Claude", brandColor: "#DE7356", icon: "/providers/claude.svg", featured: true },
  { id: "codex", name: "Codex", brandColor: "#74AA9C", icon: "/providers/codex.svg", featured: true },
  {
    id: "command-code",
    name: "Command Code",
    brandColor: "#000000",
    icon: "/providers/command-code.svg",
    featured: false,
  },
  {
    id: "copilot",
    name: "Copilot",
    brandColor: "#A855F7",
    icon: "/providers/copilot.svg",
    featured: true,
  },
  { id: "crofai", name: "CrofAI", brandColor: "#000000", icon: "/providers/crofai.svg", featured: false },
  { id: "cursor", name: "Cursor", brandColor: "#000000", icon: "/providers/cursor.svg", featured: true },
  {
    id: "cursor-nightly",
    name: "Cursor Nightly",
    brandColor: "#E85D3A",
    icon: "/providers/cursor-nightly.png",
    featured: false,
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    brandColor: "#4D6BFE",
    icon: "/providers/deepseek.svg",
    featured: false,
  },
  { id: "devin", name: "Devin", brandColor: "#000000", icon: "/providers/devin.svg", featured: false },
  {
    id: "factory",
    name: "Factory",
    brandColor: "#020202",
    icon: "/providers/factory.svg",
    featured: false,
  },
  {
    id: "fireworks-ai",
    name: "Fireworks AI",
    brandColor: "#5019C5",
    icon: "/providers/fireworks-ai.svg",
    featured: false,
  },
  { id: "grok", name: "Grok", brandColor: "#000000", icon: "/providers/grok.svg", featured: false },
  {
    id: "jetbrains-ai-assistant",
    name: "JetBrains AI Assistant",
    brandColor: "#7d5fe6",
    icon: "/providers/jetbrains-ai-assistant.svg",
    featured: false,
  },
  { id: "kiro", name: "Kiro", brandColor: "#C09CFF", icon: "/providers/kiro.svg", featured: false },
  { id: "kimi", name: "Kimi", brandColor: "#000000", icon: "/providers/kimi.svg", featured: false },
  {
    id: "minimax",
    name: "MiniMax",
    brandColor: "#F5433C",
    icon: "/providers/minimax.svg",
    featured: false,
  },
  {
    id: "neuralwatt",
    name: "Neuralwatt",
    brandColor: "#D55934",
    icon: "/providers/neuralwatt.svg",
    featured: false,
  },
  { id: "ollama", name: "Ollama", brandColor: "#000000", icon: "/providers/ollama.svg", featured: false },
  {
    id: "opencode-go",
    name: "OpenCode Go",
    brandColor: "#000000",
    icon: "/providers/opencode-go.svg",
    featured: false,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    brandColor: "#6366F1",
    icon: "/providers/openrouter.svg",
    featured: false,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    brandColor: "#20808D",
    icon: "/providers/perplexity.svg",
    featured: false,
  },
  {
    id: "synthetic",
    name: "Synthetic",
    brandColor: "#000000",
    icon: "/providers/synthetic.svg",
    featured: false,
  },
  { id: "zai", name: "Z.ai", brandColor: "#2D2D2D", icon: "/providers/zai.svg", featured: false },
];

/**
 * Visible ink for brand accents on the light marketing page.
 * Near-white brands → dark ink; dark brands stay as-is (old dark-page
 * logic mapped blacks to white and made Cursor/Grok/etc invisible).
 */
export function displayColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r + g + b) / 3 > 220 ? "#111111" : hex;
}
