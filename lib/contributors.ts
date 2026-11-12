export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const BOT_LOGINS = new Set(["dependabot", "cursoragent", "claude", "Copilot"]);

/**
 * Fetch human contributors directly to CrossUsage (barramee27/crossusage).
 *
 * Uses merged PRs opened on barramee27/crossusage (plus repo owner barramee27,
 * whose initial March 2026 Linux/Windows port commits predate PR #3) so we never
 * accidentally mix in inherited upstream OpenUsage commits or upstream merges.
 */
export async function getCrossUsageContributors(): Promise<Contributor[]> {
  try {
    const byLogin = new Map<string, Contributor>();

    const ownerRes = await fetch("https://api.github.com/users/barramee27", {
      next: { revalidate: 86400 },
    });
    if (ownerRes.ok) {
      const owner = (await ownerRes.json()) as {
        login?: string;
        avatar_url?: string;
        html_url?: string;
      };
      if (owner.login && owner.avatar_url && owner.html_url) {
        byLogin.set(owner.login, {
          login: owner.login,
          avatar_url: owner.avatar_url,
          html_url: owner.html_url,
          contributions: 1,
        });
      }
    }

    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `https://api.github.com/repos/barramee27/crossusage/pulls?state=closed&per_page=100&page=${page}`,
        { next: { revalidate: 86400 } }
      );
      if (!res.ok) break;
      const pulls = (await res.json()) as Array<{
        merged_at?: string | null;
        user?: {
          login: string;
          avatar_url: string;
          html_url: string;
          type?: string;
        } | null;
      }>;
      if (!Array.isArray(pulls) || pulls.length === 0) break;
      for (const pr of pulls) {
        if (!pr.merged_at) continue;
        const u = pr.user;
        if (!u?.login) continue;
        if (u.type === "Bot" || u.login.includes("[bot]") || BOT_LOGINS.has(u.login)) {
          continue;
        }
        const existing = byLogin.get(u.login);
        if (existing) {
          existing.contributions += 1;
        } else {
          byLogin.set(u.login, {
            login: u.login,
            avatar_url: u.avatar_url,
            html_url: u.html_url,
            contributions: 1,
          });
        }
      }
      if (pulls.length < 100) break;
    }

    return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
  } catch {
    return [];
  }
}
