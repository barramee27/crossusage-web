import { WhatsNewSection } from "@/components/marketing/whats-new-section";
import { ProviderGrid } from "@/components/provider-grid";
import { ProviderMarquee } from "@/components/marketing/provider-marquee";
import { HeroSection } from "@/components/marketing/hero-section";
import { ScreenshotsSection } from "@/components/marketing/screenshots-section";
import { ApiSection } from "@/components/marketing/api-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { OpenSourceSection } from "@/components/marketing/open-source-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getLatestVersion } from "@/lib/site";
import { getCrossUsageContributors } from "@/lib/contributors";

export const dynamic = "force-static";

export default async function Home() {
  const [version, contributors] = await Promise.all([
    getLatestVersion(),
    getCrossUsageContributors(),
  ]);

  return (
    <div className="min-h-0">
      <HeroSection version={version} />
      <ProviderMarquee />
      <FeaturesSection />
      <ScreenshotsSection version={version} />
      <ProviderGrid />
      <ApiSection />
      <WhatsNewSection version={version} />
      <OpenSourceSection contributors={contributors} />
      <CtaBand version={version} />
    </div>
  );
}
