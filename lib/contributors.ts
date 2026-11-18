export interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const BOT_LOGINS = new Set(["dependabot", "cursoragent", "claude", "Copilot"]);

const FALLBACK_CONTRIBUTORS: Contributor[] = [
  {
    login: "barramee27",
    avatar_url: "https://avatars.githubusercontent.com/u/105411143?v=4",
    html_url: "https://github.com/barramee27",
    contributions: 1,
  },
  {
    login: "sonanchenko",
    avatar_url: "https://github.com/sonanchenko.png?size=64",
    html_url: "https://github.com/sonanchenko",
    contributions: 3,
  },
  {
    login: "Or1j1n",
    avatar_url: "https://github.com/Or1j1n.png?size=64",
    html_url: "https://github.com/Or1j1n",
    contributions: 2,
  },
  {
    login: "R0SEWT",
    avatar_url: "https://github.com/R0SEWT.png?size=64",
    html_url: "https://github.com/R0SEWT",
    contributions: 2,
  },
  {
    login: "orvoss",
    avatar_url: "https://github.com/orvoss.png?size=64",
    html_url: "https://github.com/orvoss",
    contributions: 1,
  },
  {
    login: "HiImSunny",
    avatar_url: "https://github.com/HiImSunny.png?size=64",
    html_url: "https://github.com/HiImSunny",
    contributions: 1,
  },
  {
    login: "idkwhodatis",
    avatar_url: "https://github.com/idkwhodatis.png?size=64",
    html_url: "https://github.com/idkwhodatis",
    contributions: 1,
  },
];

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return token
    ? { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}` }
    : { Accept: "application/vnd.github+json" };
}

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
    const headers = githubHeaders();

    const ownerRes = await fetch("https://api.github.com/users/barramee27", {
      headers,
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
        { headers, next: { revalidate: 86400 } }
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

    if (byLogin.size === 0) return FALLBACK_CONTRIBUTORS;
    return [...byLogin.values()].sort((a, b) => b.contributions - a.contributions);
  } catch {
    return FALLBACK_CONTRIBUTORS;
  }
}
