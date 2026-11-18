import type { MetricLine as MetricLineType } from "@/lib/types";
import type { DisplayMode } from "./settings-demo";
import { formatDisplayPrimary } from "./modern-widget-row";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

export function MetricLine({
  metric,
  displayMode = "left",
}: {
  metric: MetricLineType;
  displayMode?: DisplayMode;
}) {
  const dotColor = paceColors[metric.pace];
  const dotLabel = paceLabels[metric.pace];
  const value = displayMode === "used" ? 100 - metric.percent : metric.percent;

  return (
    <div>
      {/* Label + pace dot */}
      <div className="mb-1.5 flex items-center gap-1.5 text-sm font-medium">
        <span className="text-foreground">{metric.label}</span>
        <Tooltip>
          <TooltipTrigger
            className="cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            <span
              className="block h-2 w-2 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          </TooltipTrigger>
          <TooltipContent>{dotLabel}</TooltipContent>
        </Tooltip>
      </div>

      {/* Progress bar */}
      <Progress value={value} indicatorColor={metric.barColor} />

      {/* Values */}
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-xs tabular-nums text-muted-foreground">
          {formatDisplayPrimary(metric.primaryValue, metric.percent, displayMode)}
        </span>
        <span className="text-xs text-muted-foreground">
          {metric.secondaryValue}
        </span>
      </div>
    </div>
  );
}
