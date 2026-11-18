/** Marketing site + fork repo (VPS: crossusage.dev) */
export const siteUrl = "https://crossusage.dev";
export const forkRepo = "https://github.com/barramee27/crossusage";
export const githubRepoUrl = forkRepo;
export const forkReleasesLatest = `${forkRepo}/releases/latest`;
export const forkLatestJson = `${forkRepo}/releases/latest/download/latest.json`;
export const upstreamRepo = "https://github.com/robinebers/openusage";
export const upstreamReleasesLatest = `${upstreamRepo}/releases/latest`;
/** Fallback when latest.json cannot be fetched at build time. */
export const fallbackAppVersion = "1.6.1";

export const linuxInstallCmd =
  "curl -fsSL https://raw.githubusercontent.com/barramee27/crossusage/feat/linux-windows-native-support/scripts/install.sh | bash";
export const windowsInstallCmd =
  "irm https://raw.githubusercontent.com/barramee27/crossusage/feat/linux-windows-native-support/scripts/install.ps1 | iex";
export const cliInstallCmd =
  "curl -fsSL https://raw.githubusercontent.com/barramee27/crossusage/feat/linux-windows-native-support/scripts/install.sh | INSTALL_MODE=cli bash";

export async function getLatestVersion(): Promise<string> {
  try {
    const res = await fetch(forkLatestJson, { next: { revalidate: 86400 } });
    if (!res.ok) return fallbackAppVersion;
    const data = (await res.json()) as { version?: string };
    return data.version || fallbackAppVersion;
  } catch {
    return fallbackAppVersion;
  }
}
