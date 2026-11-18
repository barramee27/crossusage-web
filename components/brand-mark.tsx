"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: number;
};

/**
 * Official CrossUsage Swiss hardware emblem — matches `src-tauri/icons/icon.png`
 * and `app/icon.svg`: anodized squircle with dual telemetry bars and vermilion LED.
 */
export function BrandMark({ className, size = 28 }: BrandMarkProps) {
  const uid = useId().replace(/:/g, "");
  const plateId = `cu-plate-${uid}`;
  const jadeId = `cu-jade-${uid}`;
  const ledId = `cu-led-${uid}`;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#111317] shadow-[0_2px_0_#000,inset_0_1px_0_rgba(255,255,255,0.16)]",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={plateId}
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#191c24" />
            <stop offset="1" stopColor="#0d0f13" />
          </linearGradient>
          <linearGradient
            id={jadeId}
            x1="19"
            y1="44.5"
            x2="50"
            y2="58"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5eead4" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient
            id={ledId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(72.5 67.5) rotate(45) scale(10)"
          >
            <stop stopColor="#ff6b3d" />
            <stop offset="1" stopColor="#e04819" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill={`url(#${plateId})`} />
        <rect
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          rx="20.5"
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="2"
        />

        {/* Top quota track */}
        <rect
          x="19"
          y="25"
          width="62"
          height="13.5"
          rx="6.75"
          fill="#ffffff"
          fillOpacity="0.16"
        />
        <rect x="19" y="25" width="44" height="13.5" rx="6.75" fill="#faf8f4" />

        {/* Middle telemetry track */}
        <rect
          x="19"
          y="44.5"
          width="62"
          height="13.5"
          rx="6.75"
          fill="#ffffff"
          fillOpacity="0.16"
        />
        <rect
          x="19"
          y="44.5"
          width="31"
          height="13.5"
          rx="6.75"
          fill={`url(#${jadeId})`}
        />

        {/* Bottom signal track + vermilion LED */}
        <rect
          x="19"
          y="64"
          width="41"
          height="10"
          rx="5"
          fill="#ffffff"
          fillOpacity="0.24"
        />
        <circle cx="74" cy="69" r="6.75" fill={`url(#${ledId})`} />
      </svg>
    </span>
  );
}
