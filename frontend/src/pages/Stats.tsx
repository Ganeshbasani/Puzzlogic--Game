import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Target, Flame, TrendingUp, Calendar, Crown, PlayCircle, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ProgressRing from "@/components/ProgressRing";
import { getStatsForMode, getOverallStats, getWeeklyActivity } from "@/features/progress/model/statsStore";
import type { GameMode } from "@/features/puzzles/model/puzzleEngine";

const STAGGER = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const modeTabs: { mode: GameMode; label: string }[] = [
  { mode: "daily", label: "Daily" },
  { mode: "practice", label: "Practice" },
  { mode: "challenge", label: "Challenge" },
];

const WeeklyBarChart = ({ weekActivity }: { weekActivity: { dayLabel: string; solved: boolean; isToday: boolean }[] }) => (
  <div>
    <div className="flex items-end gap-1.5" style={{ height: 52 }}>
      {weekActivity.map(({ dayLabel, solved, isToday }, i) => (
        <div key={dayLabel} className="flex-1 flex flex-col justify-end">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: solved ? 44 : 7 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-full rounded-t-lg"
            style={{
              background: solved
                ? isToday
                  ? "var(--color-primary)"
                  : "rgb(var(--color-indigo-rgb) / 0.65)"
                : "rgb(var(--color-muted-rgb) / 0.4)",
              boxShadow: solved && isToday ? "0 0 10px rgb(var(--color-primary-rgb) / 0.28)" : undefined,
            }}
          />
        </div>
      ))}
    </div>
    <div className="flex gap-1.5 mt-1.5">
      {weekActivity.map(({ dayLabel, solved, isToday }) => (
        <div key={dayLabel} className="flex-1 flex justify-center">
          <span
            className={`text-[9px] font-bold uppercase ${isToday ? "text-primary" : solved ? "text-success/70" : "text-muted-foreground/50"}`}
          >
            {dayLabel.slice(0, 1)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const InsightCard = ({ streak, bestStreak, winRate }: { streak: number; bestStreak: number; winRate: number }) => {
  let text = "";
  let color = "text-primary";
  let icon = "🎯";

  if (streak >= bestStreak && streak > 0) {
    text = `New personal best! ${streak}-day streak 🏆`;
    color = "text-secondary";
    icon = "🏆";
  } else if (winRate >= 80) {
    text = `${winRate}% win rate — you're in the top tier!`;
    icon = "⚡";
  } else if (streak > 0) {
    text = `Keep it up! You're on a ${streak}-day streak.`;
  } else {
    text = "Complete today's daily to start building your streak!";
    color = "text-muted-foreground";
    icon = "💡";
  }

  return (
    <div
      className="rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: "rgb(var(--color-primary-rgb) / 0.07)",
        border: "1px solid rgb(var(--color-primary-rgb) / 0.18)",
      }}
    >
      <span className="text-base shrink-0">{icon}</span>
      <p className={`text-xs font-medium ${color} leading-relaxed`}>{text}</p>
    </div>
  );
};

const Stats = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<GameMode>("daily");
  const stats = getStatsForMode(activeMode);
  const overall = getOverallStats();
  const weekActivity = getWeeklyActivity();
  const formatTime = (s: number | null) =>
    s === null ? "—" : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const isEmpty = stats.totalPlayed === 0;
  const streak = activeMode === "daily" ? (stats.currentStreak || overall.dailyStreak) : stats.bestStreak;

  return (
    <motion.div
      className="flex min-h-screen flex-col px-4 pt-12 safe-bottom"
      variants={STAGGER.container}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <motion.div variants={STAGGER.item}>
        <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight mb-0.5">Your Stats</h1>
        <p className="text-xs text-muted-foreground mb-5">Track your puzzle journey</p>
      </motion.div>

      {/* Mode Tabs */}
      <motion.div variants={STAGGER.item} className="flex gap-2 mb-6">
        <div
          className="flex gap-1 p-1 rounded-2xl w-full"
          style={{ background: "var(--color-white)", border: "1px solid rgb(var(--color-muted-rgb) / 0.5)" }}
        >
          {modeTabs.map(({ mode, label }) => (
            <motion.button
              key={mode}
              data-testid={`tab-${mode}`}
              onClick={() => setActiveMode(mode)}
              className="relative flex-1 rounded-xl py-2 text-xs font-semibold transition-colors"
              style={{
                color: activeMode === mode ? "var(--color-white)" : "rgb(var(--color-dark-gray-rgb) / 0.72)",
              }}
            >
              {activeMode === mode && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--color-primary)", boxShadow: "0 0 12px rgb(var(--color-primary-rgb) / 0.20)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isEmpty ? (
          /* ── Empty State ── */
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex flex-col items-center text-center gap-5 mt-6 mb-6"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl text-5xl"
              style={{
                background: "var(--color-white)",
                border: "1px solid var(--glass-border)",
                boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.08), 0 8px 24px rgb(var(--color-dark-gray-rgb) / 0.10), 0 0 30px rgb(var(--color-primary-rgb) / 0.10)",
              }}
            >
              {activeMode === "daily" ? "👑" : activeMode === "practice" ? "🎯" : "🏆"}
            </motion.div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                {activeMode === "daily" ? "No games yet" : `No ${activeMode} games yet`}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[260px] leading-relaxed">
                {activeMode === "daily"
                  ? "Complete today's daily puzzle to start building your stats and streak."
                  : activeMode === "practice"
                  ? "Head to Practice Mode to sharpen your skills and track your improvement."
                  : "Try Challenge Mode — 5 timed puzzles in a row for your best score."}
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate(activeMode === "daily" ? "/" : "/modes")}
              className="btn-primary-gradient flex items-center gap-2 px-6 py-3 text-sm"
              data-testid="button-start-playing"
            >
              <PlayCircle size={16} />
              {activeMode === "daily" ? "Play Today's Puzzle" : `Start ${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)}`}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="has-data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ── Win Rate Hero ── */}
            <motion.div
              variants={STAGGER.item}
              className="mb-5 rounded-3xl p-5 flex items-center gap-5"
              style={{
                background: "var(--color-white)",
                border: "1px solid rgb(var(--color-muted-rgb) / 0.7)",
                boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.09), 0 4px 16px rgb(var(--color-dark-gray-rgb) / 0.10), 0 0 40px rgb(var(--color-primary-rgb) / 0.07)",
              }}
            >
              <ProgressRing value={stats.winRate || 0} size={96} label="Win Rate" strokeWidth={9} />
              <div className="flex-1 space-y-3">
                {[
                  { label: "Easy", pct: stats.easyWinRate ?? 0, color: "var(--color-indigo)" },
                  { label: "Medium", pct: stats.mediumWinRate ?? 0, color: "var(--color-primary)" },
                  { label: "Hard", pct: stats.hardWinRate ?? 0, color: "var(--color-accent)" },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                      <p className="text-[11px] font-bold tabular-nums" style={{ color }}>{pct}%</p>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-muted)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.4, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── 4 Stats Grid ── */}
            <motion.div variants={STAGGER.item} className="grid grid-cols-2 gap-3 mb-5">
              {[
                { icon: Trophy, label: "Solved", value: String(stats.totalSolved || overall.totalSolved || 0), color: "var(--color-primary)", glow: "rgb(var(--color-primary-rgb) / 0.15)" },
                { icon: Flame, label: activeMode === "daily" ? "Streak" : "Best Streak", value: `${streak}d`, color: "var(--color-accent)", glow: "rgb(var(--color-accent-rgb) / 0.15)" },
                { icon: Target, label: "Best Time", value: formatTime(stats.bestTime), color: "var(--color-accent)", glow: "rgb(var(--color-accent-rgb) / 0.12)" },
                { icon: TrendingUp, label: "Accuracy", value: `${stats.accuracy || 0}%`, color: "var(--color-indigo)", glow: "rgb(var(--color-indigo-rgb) / 0.15)" },
              ].map(({ icon: Icon, label, value, color, glow }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07 }}
                  className="flex flex-col items-center gap-2 rounded-2xl p-5"
                  style={{
                    background: "var(--color-white)",
                    border: "1px solid rgb(var(--color-muted-rgb) / 0.6)",
                    boxShadow: `inset 0 1px 0 rgb(var(--color-white-rgb) / 0.07), inset 0 -1px 0 rgb(var(--color-muted-rgb) / 0.35), 0 3px 0 rgb(var(--color-muted-rgb) / 0.20), 0 5px 16px rgb(var(--color-dark-gray-rgb) / 0.10)`,
                  }}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: glow }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span className="font-heading text-2xl font-bold text-foreground tabular-nums" data-testid={`stat-${label.toLowerCase().replace(" ", "-")}`}>
                    {value}
                  </span>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* ── Insight Card ── */}
            <motion.div variants={STAGGER.item} className="mb-5">
              <InsightCard streak={streak} bestStreak={stats.bestStreak} winRate={stats.winRate || 0} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Weekly Bar Chart — always visible ── */}
      <motion.div
        variants={STAGGER.item}
        className="mb-5 rounded-3xl p-5"
        style={{
          background: "var(--color-white)",
          border: "1px solid rgb(var(--color-muted-rgb) / 0.6)",
          boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.07), 0 4px 16px rgb(var(--color-dark-gray-rgb) / 0.10)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-primary" />
            <span className="text-sm font-bold text-foreground">This Week</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-success/65 inline-block" /> Done
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-muted/40 inline-block" /> Missed
            </span>
          </div>
        </div>
        <WeeklyBarChart weekActivity={weekActivity} />
        {weekActivity.every((d) => !d.solved) && (
          <p className="mt-3 text-center text-xs text-muted-foreground">Complete daily puzzles to fill your week 🎯</p>
        )}
        {weekActivity.filter((d) => d.solved).length >= 5 && (
          <p className="mt-3 text-center text-xs font-semibold text-success">Great week! {weekActivity.filter((d) => d.solved).length}/7 days completed 🔥</p>
        )}
      </motion.div>

      {/* ── Accuracy Ring (secondary) ── */}
      {!isEmpty && (
        <motion.div
          variants={STAGGER.item}
          className="mb-5 rounded-3xl p-5 flex items-center justify-center"
          style={{
            background: "var(--color-white)",
            border: "1px solid rgb(var(--color-muted-rgb) / 0.6)",
            boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.07), 0 4px 16px rgb(var(--color-dark-gray-rgb) / 0.10)",
          }}
        >
          <div className="flex items-center gap-6">
            <ProgressRing value={stats.accuracy || 0} size={80} label="Accuracy" strokeWidth={8} />
            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">First-attempt accuracy</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {(stats.accuracy || 0) >= 80
                  ? "Exceptional precision! You rarely make mistakes."
                  : (stats.accuracy || 0) >= 60
                  ? "Good accuracy. Keep practicing to improve!"
                  : "Take your time — accuracy improves with practice."}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Tip ── */}
      <motion.div
        variants={STAGGER.item}
        className="mb-6 rounded-2xl px-4 py-4 flex items-start gap-3"
        style={{
          background: "linear-gradient(135deg, rgb(var(--color-accent-rgb) / 0.10), rgb(var(--color-primary-rgb) / 0.06))",
          border: "1px solid rgb(var(--color-accent-rgb) / 0.18)",
        }}
      >
        <Zap size={14} className="text-accent shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-foreground mb-0.5">💡 Sharpen your skills</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Try Practice Mode for unlimited Queens and Pinpoint puzzles between daily sessions.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Stats;
