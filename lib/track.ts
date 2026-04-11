/**
 * No-op event tracking for self-hosted static builds (nginx).
 * Replace with analytics if you add a provider later.
 */
export function track(
  _event: string,
  _props?: Record<string, string | number | boolean>
): void {}
