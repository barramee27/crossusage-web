import type { Provider, MetricLine as MetricLineType } from "@/lib/types";
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
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {provider.name}
        </h3>
        <span
          className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium max-w-[40%] truncate"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--border)",
          }}
        >
          {provider.planBadge}
        </span>
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
