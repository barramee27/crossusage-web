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
        parts.push({ text: match[1], color: "#0f766e" });
        parts.push({ text: match[2], color: "" });
      } else {
        parts.push({ text: match[1], color: "#166534" });
      }
    } else if (match[3] !== undefined) {
      parts.push({ text: match[3], color: "#b91c1c" });
    } else if (match[4] !== undefined) {
      parts.push({ text: match[4], color: "#a16207" });
    } else if (match[5] !== undefined) {
      parts.push({ text: match[5], color: "var(--page-fg-dim)" });
    }

    last = match.index + match[0].length;
  }

  if (last < json.length) {
    parts.push({ text: json.slice(last), color: "" });
  }

  return parts;
}

const response = `[
  {
    "providerId": "claude",
    "displayName": "Claude",
    "plan": "Team 5x",
    "lines": [
      {
        "type": "progress",
        "label": "Session",
        "used": 7,
        "limit": 100,
        "format": { "kind": "percent" },
        "resetsAt": "2026-07-10T08:00:00Z"
      },
      {
        "type": "text",
        "label": "Today",
        "value": "$1.33 · 4.6M tokens"
      }
    ],
    "fetchedAt": "2026-07-10T05:19:39Z"
  }
]`;

const highlighted = highlightJson(response);

export function ApiExample() {
  return (
    <div className="surface-panel overflow-hidden font-mono text-[11px] leading-relaxed sm:text-xs">
      <div className="flex items-center justify-between border-b border-[var(--page-border)] bg-[var(--page-stripe)] px-4 py-2.5">
        <span className="text-[10px] text-[var(--page-fg-dim)]">response.json</span>
        <span className="text-[10px] font-semibold text-[var(--page-accent-ink)]">200 OK</span>
      </div>
      <div className="max-h-[min(70vh,420px)] overflow-auto bg-[#0c1222] px-2 py-3 sm:px-4">
        <pre className="text-white/70">
          <code>
            {highlighted.map((part, i) =>
              part.color ? (
                <span
                  key={i}
                  style={{
                    color:
                      part.color === "#0f766e"
                        ? "#5eead4"
                        : part.color === "#166534"
                          ? "#86efac"
                          : part.color === "#b91c1c"
                            ? "#fca5a5"
                            : part.color === "#a16207"
                              ? "#fde047"
                              : part.color === "var(--page-fg-dim)"
                                ? "rgba(255,255,255,0.35)"
                                : part.color,
                  }}
                >
                  {part.text}
                </span>
              ) : (
                part.text
              )
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
