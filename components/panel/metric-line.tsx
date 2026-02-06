import type { MetricLine as MetricLineType } from "@/lib/types";

const paceColors: Record<string, string> = {
  ahead: "var(--pace-green)",
  "on-track": "var(--pace-yellow)",
  behind: "var(--pace-red)",
};

const paceLabels: Record<string, string> = {
  ahead: "Ahead of pace",
  "on-track": "On track",
  behind: "Using fast",
};

export function MetricLine({ metric }: { metric: MetricLineType }) {
  const dotColor = paceColors[metric.pace];
  const dotLabel = paceLabels[metric.pace];

  return (
    <div>
      {/* Label + pace dot */}
      <div className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
        <span style={{ color: "var(--foreground)" }}>{metric.label}</span>
        {/* Pace dot — larger hit area for tooltip via padding */}
        <span
          className="relative flex-shrink-0"
          title={dotLabel}
          style={{ padding: "4px", margin: "-4px", cursor: "default" }}
        >
          <span
            className="block w-2 h-2 rounded-full"
            style={{ backgroundColor: dotColor }}
          />
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="relative h-3 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--muted)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${metric.percent}%`,
            backgroundColor: metric.barColor || "var(--primary)",
          }}
        />
      </div>

      {/* Values */}
      <div className="flex justify-between items-center mt-1.5">
        <span
          className="text-xs tabular-nums"
          style={{ color: "var(--muted-foreground)" }}
        >
          {metric.primaryValue}
        </span>
        <span
          className="text-xs"
          style={{ color: "var(--muted-foreground)" }}
        >
          {metric.secondaryValue}
        </span>
      </div>
    </div>
  );
}
