"use client";

import { useState } from "react";
import { Check, Copy, Play } from "lucide-react";
import { CopyCommand } from "@/components/copy-command";
import { cn } from "@/lib/utils";

type EndpointTab = "usage" | "limits" | "insights" | "cli" | "waybar";

const EXAMPLES: Record<
  EndpointTab,
  {
    label: string;
    latency: string;
    cmd: string;
    prompt: string;
    output: string;
    isJson: boolean;
  }
> = {
  usage: {
    label: "GET /v1/usage",
    latency: "1.2ms",
    cmd: "curl -s http://127.0.0.1:6736/v1/usage | jq",
    prompt: "$",
    isJson: true,
    output: `[
  {
    "providerId": "claude",
    "displayName": "Claude",
    "plan": "Max 5x",
    "lines": [
      {
        "type": "progress",
        "label": "Session",
        "used": 42,
        "limit": 100,
        "format": { "kind": "percent" },
        "resetsAt": "2026-11-17T17:00:00Z"
      },
      {
        "type": "text",
        "label": "Today",
        "value": "$6.20 · 3.1M tokens"
      }
    ]
  }
]`,
  },
  limits: {
    label: "GET /v1/limits",
    latency: "0.9ms",
    cmd: "curl -s http://127.0.0.1:6736/v1/limits | jq",
    prompt: "$",
    isJson: true,
    output: `{
  "schema": "crossusage.limits.v1",
  "providers": {
    "claude": {
      "displayName": "Claude",
      "plan": "Max 5x",
      "resources": {
        "weekly": {
          "used": 58,
          "limit": 100,
          "remaining": 42,
          "utilization": 0.58,
          "unit": "percent",
          "resetsAt": "2026-11-19T07:00:00Z",
          "label": "Weekly"
        }
      }
    }
  },
  "errors": []
}`,
  },
  insights: {
    label: "GET /v1/insights",
    latency: "1.1ms",
    cmd: "curl -s http://127.0.0.1:6736/v1/insights | jq",
    prompt: "$",
    isJson: true,
    output: `{
  "generatedAtMs": 1794917704000,
  "retentionDays": 30,
  "tightest": [
    {
      "instanceId": "claude",
      "displayName": "Claude",
      "primaryPercent": 58.0,
      "remainingPercent": 42.0,
      "capturedAtMs": 1794917690000,
      "resetTime": "2026-11-19T07:00:00Z"
    }
  ]
}`,
  },
  cli: {
    label: "crossusage-cli",
    latency: "TTY",
    cmd: "crossusage-cli list",
    prompt: "$",
    isJson: false,
    output: `╭────────────┬─────────┬─────────┬──────────────────┬────────┬────────┬────────╮
│ id         │ name    │ primary │ Quota (per model)│ input  │ output │ cost   │
├────────────┼─────────┼─────────┼──────────────────┼────────┼────────┼────────┤
│ claude     │ Claude  │ 58%     │ Weekly 58%       │ —      │ —      │ —      │
│ codex      │ Codex   │ 27%     │ Session 27%      │ —      │ —      │ —      │
│ cursor     │ Cursor  │ 33%     │ Plan $32.22/$100 │ 12.4M  │ 1.9M   │ 14.80  │
│ gemini-apps│ Gemini  │ 16%     │ Current 16%      │ —      │ —      │ —      │
╰────────────┴─────────┴─────────┴──────────────────┴────────┴────────┴────────╯`,
  },
  waybar: {
    label: "Waybar config",
    latency: "config.jsonc",
    cmd: "crossusage-cli limits | jq -c '.providers.claude.resources.weekly'",
    prompt: "$",
    isJson: true,
    output: `{
  "custom/crossusage": {
    "exec": "curl -sf http://127.0.0.1:6736/v1/limits | jq -c '{text: (\"Claude \" + (.providers.claude.resources.weekly.remaining|tostring) + \"%\"), tooltip: \"CrossUsage local API\"}'",
    "interval": 60,
    "return-type": "json"
  }
}`,
  },
};

function highlightJson(json: string) {
  const parts: { text: string; color: string }[] = [];
  const regex =
    /("(?:[^"\\]|\\.)*")\s*(:)?|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|([{}[\],])/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(json)) !== null) {
    if (match.index > last) {
      parts.push({ text: json.slice(last, match.index), color: "" });
    }

    if (match[1] !== undefined) {
      if (match[2]) {
        parts.push({ text: match[1], color: "#5eead4" });
        parts.push({ text: match[2], color: "rgba(255,255,255,0.45)" });
      } else {
        parts.push({ text: match[1], color: "#fed7aa" });
      }
    } else if (match[3] !== undefined) {
      parts.push({ text: match[3], color: "#fca5a5" });
    } else if (match[4] !== undefined) {
      parts.push({ text: match[4], color: "#fde047" });
    } else if (match[5] !== undefined) {
      parts.push({ text: match[5], color: "rgba(255,255,255,0.38)" });
    }

    last = match.index + match[0].length;
  }

  if (last < json.length) {
    parts.push({ text: json.slice(last), color: "" });
  }

  return parts;
}

export function ApiExample() {
  const [tab, setTab] = useState<EndpointTab>("usage");
  const [copiedOut, setCopiedOut] = useState(false);
  const [probeSeq, setProbeSeq] = useState(0);

  const current = EXAMPLES[tab];
  const lines = current.output.split("\n");
  const latencyLabel =
    current.isJson && probeSeq > 0
      ? `200 OK · ${(0.8 + ((probeSeq * 3) % 7) * 0.1).toFixed(1)}ms`
      : current.isJson
        ? `200 OK · ${current.latency}`
        : current.latency;

  const copyResponse = async () => {
    try {
      await navigator.clipboard.writeText(current.output);
      setCopiedOut(true);
      window.setTimeout(() => setCopiedOut(false), 1600);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1d222c] bg-[#0e1015] shadow-[0_28px_70px_-28px_rgba(17,19,23,0.55)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#151921] px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {(Object.keys(EXAMPLES) as EndpointTab[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setTab(key);
                setCopiedOut(false);
              }}
              className={cn(
                "rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors",
                tab === key
                  ? "bg-[#e04819] text-white"
                  : "text-[#8e97a8] hover:bg-white/[0.06] hover:text-white"
              )}
            >
              {EXAMPLES[key].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 pr-1">
          <button
            type="button"
            onClick={() => setProbeSeq((n) => n + 1)}
            className="inline-flex items-center gap-1 rounded border border-white/12 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#cbd5e1] transition-colors hover:border-[#2dd4bf]/50 hover:text-[#2dd4bf]"
            title="Re-run simulated request"
          >
            <Play className="size-2.5" aria-hidden />
            Run
          </button>
          <button
            type="button"
            onClick={() => void copyResponse()}
            className="inline-flex items-center gap-1 rounded border border-white/12 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#cbd5e1] transition-colors hover:border-white/30 hover:text-white"
            title="Copy response payload"
          >
            {copiedOut ? (
              <>
                <Check className="size-2.5 text-[#2dd4bf]" />
                <span className="text-[#2dd4bf]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-2.5" />
                <span>JSON</span>
              </>
            )}
          </button>
          <span className="font-mono text-[10px] font-semibold text-[#4ade80]">
            {latencyLabel}
          </span>
        </div>
      </div>

      <div className="border-b border-white/[0.06] bg-[#10131a] p-3">
        <CopyCommand
          command={current.cmd}
          promptSymbol={current.prompt}
          label={`api_${tab}`}
          className="!rounded-lg !border-white/10 !bg-[#090b0f]"
        />
      </div>

      <div
        key={`${tab}-${probeSeq}`}
        className="sim-pop max-h-[360px] overflow-auto px-4 py-4 font-mono text-[11.5px] leading-relaxed"
      >
        <div className="space-y-0.5 text-[#e2e8f0]">
          {lines.map((line, idx) => {
            const highlighted = current.isJson ? highlightJson(line) : null;
            return (
              <div key={idx} className="flex gap-4">
                <span className="w-5 shrink-0 select-none text-right text-[10.5px] text-white/25">
                  {idx + 1}
                </span>
                <pre className="min-w-0 flex-1 whitespace-pre">
                  <code>
                    {highlighted
                      ? highlighted.map((part, i) =>
                          part.color ? (
                            <span key={i} style={{ color: part.color }}>
                              {part.text}
                            </span>
                          ) : (
                            part.text
                          )
                        )
                      : line}
                  </code>
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
