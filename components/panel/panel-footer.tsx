interface PanelFooterProps {
  version: string;
}

export function PanelFooter({ version }: PanelFooterProps) {
  return (
    <div
      className="flex justify-between items-center h-8 pt-1.5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span
        className="text-xs"
        style={{ color: "var(--muted-foreground)" }}
      >
        OpenUsage {version}
      </span>
      <span
        className="text-xs tabular-nums"
        style={{ color: "var(--muted-foreground)" }}
      >
        Next update in 3m
      </span>
    </div>
  );
}
