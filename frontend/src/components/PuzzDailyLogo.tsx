type PuzzDailyLogoProps = {
  compact?: boolean;
  className?: string;
};

const PuzzDailyLogo = ({ compact = false, className = "" }: PuzzDailyLogoProps) => {
  return (
    <div className={`puzzdaily-logo ${compact ? "puzzdaily-logo--compact" : ""} ${className}`.trim()}>
      <div className="puzzdaily-logo__mark" aria-hidden="true">
        <span className="puzzdaily-logo__bar puzzdaily-logo__bar--short" />
        <span className="puzzdaily-logo__bar puzzdaily-logo__bar--tall" />
        <span className="puzzdaily-logo__bar puzzdaily-logo__bar--mid" />
        <svg className="puzzdaily-logo__orbit" viewBox="0 0 112 72" fill="none">
          <path
            d="M4 59C32 57 54 46 73 28C80 22 87 16 95 8"
            stroke="url(#puzzdaily-orbit)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="98" cy="8" r="7" fill="var(--color-accent)" />
          <circle cx="98" cy="8" r="11" fill="var(--color-accent)" fillOpacity="0.2" />
          <defs>
            <linearGradient id="puzzdaily-orbit" x1="4" y1="59" x2="95" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--color-light-blue)" />
              <stop offset="0.5" stopColor="var(--color-pale-blue)" />
              <stop offset="1" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="puzzdaily-logo__wordmark">
        <span className="puzzdaily-logo__name">PUZZDAILY</span>
        <span className="puzzdaily-logo__tag">.in</span>
      </div>
    </div>
  );
};

export default PuzzDailyLogo;
