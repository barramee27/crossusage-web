import { Cpu, ShieldAlert, TerminalSquare, Workflow } from "lucide-react";
import { ApiExample } from "@/components/api-example";
import { Eyebrow } from "@/components/marketing/eyebrow";

const INTEGRATIONS = [
  {
    icon: TerminalSquare,
    title: "Waybar, Polybar & tmux",
    body: "Pipe /v1/limits or crossusage-cli directly into Linux statusbars, Starship prompts, or tmux right-status.",
  },
  {
    icon: Cpu,
    title: "Headless SSH & macOS CLI",
    body: "Run crossusage-cli standalone on remote Linux boxes, WSL2, or macOS terminals — powered by the same Rust core.",
  },
  {
    icon: ShieldAlert,
    title: "Origin-Locked Loopback",
    body: "Bound strictly to 127.0.0.1:6736 with Origin & Sec-Fetch rejection so arbitrary browser tabs cannot query it.",
  },
  {
    icon: Workflow,
    title: "SQLite History & CSV",
    body: "Query /v1/history/* or export local 30-day SQLite rollups to CSV for monthly cost reconciliation.",
  },
] as const;

export function ApiSection() {
  return (
    <section
      id="api"
      className="relative scroll-mt-20 border-b border-[var(--rule)]"
    >
      <div className="drafting-frame reg-mark px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          <div>
            <Eyebrow>03 // LOOPBACK API &amp; CLI</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-[var(--ink)] sm:text-4xl">
              Scriptable telemetry over{" "}
              <span className="font-editorial italic font-normal text-[var(--signal)]">
                localhost &amp; TTY.
              </span>
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--ink-secondary)]">
              Every desktop install embeds a fast loopback HTTP server on{" "}
              <code className="rounded border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-1.5 py-0.5 font-mono text-xs font-semibold text-[var(--ink)]">
                127.0.0.1:6736
              </code>{" "}
              and ships{" "}
              <code className="rounded border border-[var(--rule-strong)] bg-[var(--paper-elevated)] px-1.5 py-0.5 font-mono text-xs font-semibold text-[var(--ink)]">
                crossusage-cli
              </code>{" "}
              sidecar. Wire your AI quotas into dotfiles in two lines of shell.
            </p>

            <div className="mt-8 grid gap-3.5 sm:grid-cols-2">
              {INTEGRATIONS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-[var(--rule-strong)] bg-[var(--paper-elevated)] p-4 shadow-[0_2px_0_rgba(17,19,23,0.05)]"
                >
                  <Icon className="size-4 text-[var(--signal)]" aria-hidden />
                  <h3 className="mt-2.5 text-sm font-bold text-[var(--ink)]">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--ink-secondary)]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-1">
            <ApiExample />
          </div>
        </div>
      </div>
    </section>
  );
}
