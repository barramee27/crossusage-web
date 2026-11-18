export function UsageSparkline({
  points,
  color = "#2dd4bf",
  todaySpend,
  thirtyDaySpend,
}: {
  points: number[];
  color?: string;
  todaySpend: string;
  thirtyDaySpend: string;
}) {
  const width = 220;
  const height = 44;
  const max = Math.max(...points, 1);
  const min = Math.min(...points, 0);
  const span = Math.max(max - min, 1);

  const coords = points.map((v, idx) => {
    const x = (idx / Math.max(points.length - 1, 1)) * (width - 8) + 4;
    const y = height - 6 - ((v - min) / span) * (height - 14);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = `M ${coords.join(" L ")}`;
  const areaPath = `${linePath} L ${(width - 4).toFixed(1)},${height} L 4,${height} Z`;

  return (
    <div className="mt-2 rounded-md border border-border/60 bg-muted/35 px-2.5 py-2">
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <span>30D SQLITE TREND</span>
        <span className="tabular-nums text-foreground">
          Today {todaySpend} · 30d {thirtyDaySpend}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-10 w-full overflow-visible"
        aria-hidden
      >
        <path d={areaPath} fill={color} opacity={0.14} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
