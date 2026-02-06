import { providers } from "@/lib/mock-data";
import { ProviderCard } from "./provider-card";

export function Overview() {
  return (
    <div>
      {providers.map((provider, index) => (
        <div key={provider.id}>
          {index > 0 && (
            <hr
              className="h-px border-0"
              style={{ backgroundColor: "var(--border)" }}
            />
          )}
          <ProviderCard
            provider={provider}
            metrics={provider.overviewMetrics}
          />
        </div>
      ))}
    </div>
  );
}
