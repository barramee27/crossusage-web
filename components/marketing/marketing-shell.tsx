"use client";

import { useEffect, useRef } from "react";

/**
 * Drives CSS variables for cursor-reactive lighting and mounts ambient layers.
 * Pointer updates are rAF-batched. Listeners are omitted when `prefers-reduced-motion`
 * is set (see globals.css for visual fallbacks).
 */
export function MarketingShell({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyPointer = (x: number, y: number) => {
      const xp = (x / Math.max(window.innerWidth, 1)) * 100;
      const yp = (y / Math.max(window.innerHeight, 1)) * 100;
      root.style.setProperty("--mouse-x", `${xp.toFixed(2)}%`);
      root.style.setProperty("--mouse-y", `${yp.toFixed(2)}%`);
    };

    const flush = () => {
      rafRef.current = null;
      const p = pendingRef.current;
      if (p) {
        applyPointer(p.x, p.y);
        pendingRef.current = null;
      }
    };

    const schedule = (x: number, y: number) => {
      pendingRef.current = { x, y };
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(flush);
      }
    };

    const setDefaultPointer = () => {
      applyPointer(window.innerWidth * 0.5, window.innerHeight * 0.2);
    };

    const attach = () => {
      setDefaultPointer();
      const onMove = (e: MouseEvent) => schedule(e.clientX, e.clientY);
      const onLeave = () => {
        pendingRef.current = null;
        if (rafRef.current != null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        setDefaultPointer();
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      document.body.addEventListener("mouseleave", onLeave);

      return () => {
        window.removeEventListener("mousemove", onMove);
        document.body.removeEventListener("mouseleave", onLeave);
        if (rafRef.current != null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      };
    };

    let detach: (() => void) | undefined;
    if (!motionQuery.matches) {
      detach = attach();
    } else {
      setDefaultPointer();
    }

    const onMotionChange = () => {
      detach?.();
      detach = undefined;
      if (!motionQuery.matches) {
        detach = attach();
      } else {
        setDefaultPointer();
      }
    };

    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      detach?.();
    };
  }, []);

  return (
    <>
      <div className="fx-aurora" aria-hidden />
      <div className="fx-cursor-glow" aria-hidden />
      <div className="fx-grain" aria-hidden />
      {children}
    </>
  );
}
