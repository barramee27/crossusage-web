export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`pill pill-accent w-fit font-mono text-[11px] uppercase tracking-[0.16em] ${className}`}
    >
      {children}
    </p>
  );
}
