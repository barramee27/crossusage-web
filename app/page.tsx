import { WhatsNewSection } from "@/components/marketing/whats-new-section";
import { ProviderGrid } from "@/components/provider-grid";
import { ProviderMarquee } from "@/components/marketing/provider-marquee";
import { HeroSection } from "@/components/marketing/hero-section";
import { InteractivePreviewSection } from "@/components/marketing/interactive-preview-section";
import { ScreenshotsSection } from "@/components/marketing/screenshots-section";
import { ApiSection } from "@/components/marketing/api-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { StepsSection } from "@/components/marketing/steps-section";
import { OpenSourceSection } from "@/components/marketing/open-source-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { forkLatestJson, fallbackAppVersion } from "@/lib/site";
import { getCrossUsageContributors } from "@/lib/contributors";

export const dynamic = "force-static";

async function getVersion(): Promise<string> {
  try {
    const res = await fetch(forkLatestJson, { next: { revalidate: 86400 } });
    if (!res.ok) return fallbackAppVersion;
    const data = await res.json();
    return data.version || fallbackAppVersion;
  } catch {
    return fallbackAppVersion;
  }
}

export default async function Home() {
  const [version, contributors] = await Promise.all([
    getVersion(),
    getCrossUsageContributors(),
  ]);

  return (
    <div className="min-h-0">
      <HeroSection version={version} />
      <ProviderMarquee />
      <WhatsNewSection version={version} />
      <ScreenshotsSection version={version} />
      <FeaturesSection />
      <InteractivePreviewSection version={version} />
      <ProviderGrid />
      <StepsSection />
      <ApiSection />
      <OpenSourceSection contributors={contributors} />
      <CtaBand version={version} />
    </div>
  );
}
