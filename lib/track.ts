declare global {
  interface Window {
    umami?: {
      track: (
        event: string,
        props?: Record<string, string | number | boolean>
      ) => void;
    };
  }
}

/**
 * Forward custom UI events to self-hosted Umami when loaded; silent no-op otherwise.
 */
export function track(
  event: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  try {
    window.umami?.track(event, props);
  } catch {
    // ignore analytics errors
  }
}
