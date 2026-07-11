"use client";

export function SettingsDemo({ layout = "Classic" }: { layout?: "Classic" | "Modern" }) {
  return (
    <div className="space-y-4 py-2">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Settings</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Demo only — toggles don&apos;t persist. Real app saves to disk.
        </p>
      </div>

      <DemoRow
        label="Layout"
        value={layout}
        hint={layout === "Classic" ? "Modern also available" : "Classic also available"}
      />
      <DemoRow label="Auto-update" value="Every 15m" />
      <DemoRow label="Display" value="% left" />
      <DemoRow label="Multi-account" value="On" hint="Add account per provider" />
      <DemoRow label="Credentials" value="Encrypted" hint="AES-256-GCM + OS keychain" />

      <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-[11px] leading-relaxed text-muted-foreground">
        {layout === "Modern"
          ? "Tip: use Dashboard for all providers, Customize to show/hide metrics."
          : "Tip: click a provider in the sidebar, or tap a card on Overview, to open its detail view."}
      </div>
    </div>
  );
}

function DemoRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/70 pb-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <span className="shrink-0 rounded-md border border-border bg-card px-2 py-1 text-xs font-medium text-foreground">
        {value}
      </span>
    </div>
  );
}
