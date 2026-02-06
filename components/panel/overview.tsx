import { providers } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import { ProviderCard } from "./provider-card";

export function Overview() {
  return (
    <div>
      {providers.map((provider, index) => (
        <div key={provider.id}>
          {index > 0 && <Separator />}
          <ProviderCard
            provider={provider}
            metrics={provider.overviewMetrics}
          />
        </div>
      ))}
    </div>
  );
}
