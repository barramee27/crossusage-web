import type { Provider, MetricLine as MetricLineType } from "@/lib/types";
import type { DisplayMode } from "./settings-demo";
import { Badge } from "@/components/ui/badge";
import { MetricLine } from "./metric-line";
import { UsageSparkline } from "./usage-sparkline";

export function ProviderCard({
  provider,
  metrics,
  displayMode = "left",
  showTrend = false,
}: {
  provider: Provider;
  metrics: MetricLineType[];
  displayMode?: DisplayMode;
  showTrend?: boolean;
}) {
  const isCursor = provider.id === "cursor" || provider.id === "cursor-work";

  return (
    <div className="py-3">
      {/* Header: name + badge */}
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          {provider.name}
        </h3>
        <Badge variant="outline" className="max-w-[40%] truncate">
          {provider.planBadge}
        </Badge>
      </div>

      {/* Metric lines */}
      <div className="space-y-4">
        {metrics.map((metric) => (
          <MetricLine
            key={metric.label}
            metric={metric}
            displayMode={displayMode}
          />
        ))}
      </div>

      {showTrend ? (
        <div className="mt-3">
          <UsageSparkline
            points={provider.trend30d}
            color={isCursor ? "#38bdf8" : provider.brandColor}
            todaySpend={provider.todaySpend}
            thirtyDaySpend={provider.thirtyDaySpend}
          />
        </div>
      ) : null}
    </div>
  );
}
