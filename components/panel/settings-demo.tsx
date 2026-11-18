"use client";

export type DisplayMode = "left" | "used";

interface SettingsDemoProps {
  layout: "Classic" | "Modern";
  onToggleLayout?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  displayMode?: DisplayMode;
  onToggleDisplayMode?: () => void;
  showTotalSpend?: boolean;
  onToggleTotalSpend?: () => void;
}

export function SettingsDemo({
  layout = "Classic",
  onToggleLayout,
  theme = "dark",
  onToggleTheme,
  displayMode = "left",
  onToggleDisplayMode,
  showTotalSpend = true,
  onToggleTotalSpend,
}: SettingsDemoProps) {
  return (
    <div className="space-y-3.5 py-1.5">
      <div>
        <h3 className="text-base font-semibold text-foreground">Settings</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Interactive preview — click any pill to change the live simulator.
        </p>
      </div>

      <InteractiveRow
        label="Layout"
        value={layout}
        hint="Switch between Modern tabs & Classic sidebar"
        onClick={onToggleLayout}
      />
      <InteractiveRow
        label="Appearance"
        value={theme === "dark" ? "Dark" : "Light"}
        hint="Matches Linux & Windows desktop theme"
        onClick={onToggleTheme}
      />
      <InteractiveRow
        label="Quota display"
        value={displayMode === "left" ? "% left" : "% used"}
        hint="Updates every progress row live"
        onClick={onToggleDisplayMode}
      />
      {layout === "Modern" && onToggleTotalSpend ? (
        <InteractiveRow
          label="Total Spend card"
          value={showTotalSpend ? "Shown" : "Hidden"}
          hint="Donut ring rollup at top of Dashboard"
          onClick={onToggleTotalSpend}
        />
      ) : null}
      <InteractiveRow
        label="Multi-account"
        value="Enabled"
        hint="Base account labels + unlimited extra seats"
      />
      <InteractiveRow
        label="Credentials"
        value="AES-256-GCM"
        hint="Sealed with libsecret / Windows Keyring"
      />
    </div>
  );
}

function InteractiveRow({
  label,
  value,
  hint,
  onClick,
}: {
  label: string;
  value: string;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 pb-2.5">
      <div>
        <p className="text-xs font-semibold text-foreground">{label}</p>
        {hint ? (
          <p className="mt-0.5 text-[10.5px] text-muted-foreground">{hint}</p>
        ) : null}
      </div>
      {onClick ? (
        <button
          type="button"
          onClick={onClick}
          className="shrink-0 rounded-md border border-border bg-primary px-2.5 py-1 font-mono text-[11px] font-semibold text-primary-foreground shadow-xs transition-opacity hover:opacity-90"
        >
          {value} ↻
        </button>
      ) : (
        <span className="shrink-0 rounded-md border border-border bg-muted/60 px-2 py-1 font-mono text-[11px] font-medium text-foreground">
          {value}
        </span>
      )}
    </div>
  );
}
