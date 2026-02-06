interface PanelFooterProps {
  version: string | null;
}

export function PanelFooter({ version }: PanelFooterProps) {
  return (
    <div className="flex justify-between items-center h-8 pt-1.5 border-t">
      <span className="text-xs text-muted-foreground">
        OpenUsage{version ? ` ${version}` : ""}
      </span>
      <span className="text-xs text-muted-foreground tabular-nums">
        Next update in 3m
      </span>
    </div>
  );
}
