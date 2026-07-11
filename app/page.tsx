import { WhatsNewSection } from "@/components/marketing/whats-new-section";
import { ProviderGrid } from "@/components/provider-grid";
import { ProviderMarquee } from "@/components/marketing/provider-marquee";
import { HeroSection } from "@/components/marketing/hero-section";
import { InteractivePreviewSection } from "@/components/marketing/interactive-preview-section";
import { ApiSection } from "@/components/marketing/api-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { StepsSection } from "@/components/marketing/steps-section";
import { OpenSourceSection } from "@/components/marketing/open-source-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { forkLatestJson } from "@/lib/site";

export const dynamic = "force-static";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

async function getVersion(): Promise<string | null> {
  try {
    const res = await fetch(forkLatestJson, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.version || null;
  } catch {
    return null;
  }
}

async function getContributors(): Promise<Contributor[]> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/barramee27/crossusage/contributors?per_page=30",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data as Contributor[]).filter(
      (c) => !c.login.includes("[bot]") && c.login !== "dependabot"
    );
  } catch {
    return [];
  }
}

export default async function Home() {
  const [version, contributors] = await Promise.all([
    getVersion(),
    getContributors(),
  ]);

  return (
    <div className="min-h-0">
      <HeroSection version={version} />
      <ProviderMarquee />
      <WhatsNewSection version={version} />
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
