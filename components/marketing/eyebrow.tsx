/** Small mono label — `[ topic ]` */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="signal-prompt">
      <span className="text-[var(--page-fg-dim)]">[ </span>
      {children}
      <span className="text-[var(--page-fg-dim)]"> ]</span>
    </p>
  );
}
