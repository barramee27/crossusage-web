"use client";

import { track } from "@vercel/analytics";

export function TrackedLink({
  event,
  props,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  props?: Record<string, string | number | boolean>;
}) {
  return (
    <a
      {...rest}
      onClick={() => track(event, props)}
    >
      {children}
    </a>
  );
}
