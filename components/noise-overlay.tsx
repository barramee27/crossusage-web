export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true">
      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(191, 255, 0, 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(191, 255, 0, 0.04) 0%, transparent 50%)',
        }}
      />
      {/* Noise grain */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '182px',
          opacity: 0.25,
          mixBlendMode: 'soft-light',
        }}
      />
    </div>
  );
}
