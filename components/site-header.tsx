"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { forkRepo } from "@/lib/site";

const nav = [
  { href: "/#whats-new", label: "What's new" },
  { href: "/#try", label: "Try it" },
  { href: "/#providers", label: "Providers" },
  { href: "/download/", label: "Download" },
  { href: "/credits/", label: "Credits" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--page-border)] bg-[rgba(244,246,248,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display shrink-0 text-lg font-extrabold tracking-tight text-[var(--page-fg)]"
          onClick={() => setOpen(false)}
        >
          Cross<span className="text-[var(--page-accent)]">Usage</span>
        </Link>

        <nav className="site-nav hidden min-w-0 flex-1 items-center justify-center md:flex" aria-label="Main">
          <div className="flex items-center gap-0.5 text-sm font-medium text-[var(--page-fg-muted)]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-white hover:text-[var(--page-fg)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href={forkRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--page-border)] bg-white/80 text-[var(--page-fg-muted)] transition-colors hover:text-[var(--page-fg)]"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link href="/download/" className="btn-primary hidden !px-4 !py-2.5 text-sm sm:inline-flex">
            Download
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--page-border)] bg-white/80 text-[var(--page-fg)] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-[var(--page-border)] bg-[var(--page-bg)] px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-medium text-[var(--page-fg)] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/download/"
              className="btn-primary mt-2 justify-center"
              onClick={() => setOpen(false)}
            >
              Download
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
