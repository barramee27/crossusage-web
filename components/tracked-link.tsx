"use client";

import { track } from "@/lib/track";

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
