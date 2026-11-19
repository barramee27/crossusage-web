"use client";

import Link from "next/link";
import { track } from "@/lib/track";

export function TrackedLink({
  event,
  props,
  href,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  props?: Record<string, string | number | boolean>;
}) {
  const isInternal = typeof href === "string" && href.startsWith("/");
  if (isInternal) {
    return (
      <Link href={href} {...rest} onClick={() => track(event, props)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest} onClick={() => track(event, props)}>
      {children}
    </a>
  );
}
