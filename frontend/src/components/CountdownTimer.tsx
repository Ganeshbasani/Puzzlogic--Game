import { useState, useEffect } from "react";
import { getSecondsUntilMidnight } from "@/features/progress/model/dailyStore";

const CountdownTimer = ({ className = "", large = false }: { className?: string; large?: boolean }) => {
  const [seconds, setSeconds] = useState(getSecondsUntilMidnight());

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (large) {
    return (
      <div className={`flex items-center gap-2 ${className}`} data-testid="countdown-timer">
        {[{ v: h, label: "HR" }, { v: m, label: "MIN" }, { v: s, label: "SEC" }].map(({ v, label }, i) => (
          <div key={label} className="flex items-center gap-2">
            {i > 0 && <span className="font-heading text-2xl font-bold text-muted-foreground/40">:</span>}
            <div className="flex flex-col items-center">
              <span className="font-heading text-3xl font-bold tabular-nums text-foreground">{pad(v)}</span>
              <span className="text-[9px] text-muted-foreground tracking-widest">{label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`} data-testid="countdown-timer">
      <span className="font-heading tabular-nums text-muted-foreground text-xs">
        Next puzzle in{" "}
        <span className="text-foreground font-semibold">
          {pad(h)}:{pad(m)}:{pad(s)}
        </span>
      </span>
    </div>
  );
};

export default CountdownTimer;
