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

export const dynamic = "force-static";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

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

const FORK_START_ISO = "2026-06-07T00:00:00Z";
const BOT_LOGINS = new Set(["dependabot", "cursoragent", "claude", "Copilot"]);

async function getContributors(): Promise<Contributor[]> {
  try {
    const byLogin = new Map<string, Contributor>();
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(
        `https://api.github.com/repos/barramee27/crossusage/commits?sha=feat/linux-windows-native-support&since=${FORK_START_ISO}&per_page=100&page=${page}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) break;
      const commits = (await res.json()) as Array<{
        author?: {
          login: string;
          avatar_url: string;
          html_url: string;
          type?: string;
        } | null;
      }>;
      if (!Array.isArray(commits) || commits.length === 0) break;
      for (const c of commits) {
        const a = c.author;
        if (!a?.login) continue;
        if (a.type === "Bot" || a.login.includes("[bot]") || BOT_LOGINS.has(a.login)) {
          continue;
        }
        const existing = byLogin.get(a.login);
        if (existing) {
          existing.contributions += 1;
        } else {
          byLogin.set(a.login, {
            login: a.login,
            avatar_url: a.avatar_url,
            html_url: a.html_url,
            contributions: 1,
          });
        }
      }
      if (commits.length < 100) break;
    }
    return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
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
