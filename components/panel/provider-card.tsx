import type { Provider, MetricLine as MetricLineType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { MetricLine } from "./metric-line";

export function ProviderCard({
  provider,
  metrics,
}: {
  provider: Provider;
  metrics: MetricLineType[];
}) {
  return (
    <div className="py-3">
      {/* Header: name + badge */}
      <div className="flex items-center justify-between mb-2">
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
          <MetricLine key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  );
}
