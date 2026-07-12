/** Renders a plugin icon from public/providers (copied from repo plugins icons). */
export function ProviderIcon({
  src,
  color,
  className = "h-4 w-4",
}: {
  src: string;
  color: string;
  className?: string;
}) {
  if (src.endsWith(".png") || src.endsWith(".jpg") || src.endsWith(".webp")) {
    // eslint-disable-next-line @next/next/no-img-element -- static export; small brand assets
    return <img src={src} alt="" className={`object-contain ${className}`} />;
  }

  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
