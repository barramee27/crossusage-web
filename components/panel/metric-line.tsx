import type { MetricLine as MetricLineType } from "@/lib/types";
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

export function MetricLine({ metric }: { metric: MetricLineType }) {
  const dotColor = paceColors[metric.pace];
  const dotLabel = paceLabels[metric.pace];

  return (
    <div>
      {/* Label + pace dot */}
      <div className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
        <span className="text-foreground">{metric.label}</span>
        <Tooltip>
          <TooltipTrigger
            className="cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            <span
              className="block w-2 h-2 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          </TooltipTrigger>
          <TooltipContent>{dotLabel}</TooltipContent>
        </Tooltip>
      </div>

      {/* Progress bar */}
      <Progress value={metric.percent} indicatorColor={metric.barColor} />

      {/* Values */}
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-xs text-muted-foreground tabular-nums">
          {metric.primaryValue}
        </span>
        <span className="text-xs text-muted-foreground">
          {metric.secondaryValue}
        </span>
      </div>
    </div>
  );
}
