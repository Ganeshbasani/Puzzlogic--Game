const ProgressRing = ({
  value,
  size = 80,
  strokeWidth = 6,
  label,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}) => {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const gradientId = `grad-${size}-${strokeWidth}-${label || "progress"}`;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-muted)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-purple)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-lg font-bold font-heading text-foreground">{value}%</span>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </div>
  );
};

export default ProgressRing;
