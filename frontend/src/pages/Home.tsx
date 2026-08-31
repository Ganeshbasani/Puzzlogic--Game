import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Zap, Trophy, ArrowRight, Layers, Crown, Users, Star, ChevronRight } from "lucide-react";
import CountdownTimer from "@/components/CountdownTimer";
import PuzzDailyLogo from "@/components/PuzzDailyLogo";
import { getDailyPuzzle, getDailyPuzzleNumber } from "@/features/puzzles/model/puzzleEngine";
import { getOverallStats, getStatsForMode } from "@/features/progress/model/statsStore";
import { isDailyCompleted, getDailyData, getSimulatedPlayerCount } from "@/features/progress/model/dailyStore";
import { playSelect } from "@/services/soundEffects";
import "@/styles/components/puzzDailyLogo.css";

const STAGGER = {
  container: { animate: { transition: { staggerChildren: 0.08 } } },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  },
};

const typeEmoji: Record<string, string> = {
  queens: "👑", pinpoint: "🎯", riddle: "🧠", grid: "🔢", word: "🔤",
};
const typeLabel: Record<string, string> = {
  queens: "Queens Grid", pinpoint: "Pinpoint", riddle: "Logic Riddle", grid: "Number Grid", word: "Word Puzzle",
};

const Home = () => {
  const navigate = useNavigate();
  const puzzleNumber = getDailyPuzzleNumber();
  const overall = getOverallStats();
  const dailyStats = getStatsForMode("daily");
  const streak = dailyStats.currentStreak || overall.dailyStreak;
  const todayDone = isDailyCompleted();
  const dailyData = getDailyData();
  const todayPuzzle = getDailyPuzzle();
  const playerCount = getSimulatedPlayerCount(puzzleNumber);

  const streakMessage =
    streak === 0
      ? "Start your streak today!"
      : streak === 1
      ? "Day 1 — you've started! Keep it going 💪"
      : streak < 7
      ? `You're on a ${streak}-day streak! Keep it alive 🔥`
      : streak < 30
      ? `${streak} days strong! You're on fire 🔥🔥`
      : `${streak} days — legendary streak! 🏆`;

  return (
    <motion.div
      className="flex min-h-screen flex-col px-4 pt-12 safe-bottom"
      variants={STAGGER.container}
      initial="initial"
      animate="animate"
    >
      {/* ── Header ────────────────────────────────────────── */}
      <motion.div variants={STAGGER.item} className="mb-5 flex items-center justify-between">
        <div className="min-w-0">
          <PuzzDailyLogo />
          <p className="text-xs text-muted-foreground mt-0.5">Challenge your mind daily</p>
        </div>
        <motion.div
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 rounded-2xl px-3 py-2 cursor-pointer"
          style={{
            background: "rgb(var(--color-accent-rgb) / 0.12)",
            border: "1px solid rgb(var(--color-accent-rgb) / 0.30)",
            boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.08), 0 0 16px rgb(var(--color-accent-rgb) / 0.20)",
          }}
          data-testid="streak-badge"
        >
          <Flame size={18} className="text-accent animate-streak-flame" />
          <span className="font-heading text-base font-bold text-accent">{streak}</span>
        </motion.div>
      </motion.div>

      {/* ── Streak Motivational Banner ───────────────────── */}
      {streak > 0 && (
        <motion.div
          variants={STAGGER.item}
          className="mb-4 flex items-center gap-2 rounded-2xl px-4 py-2.5"
          style={{
            background: "linear-gradient(135deg, rgb(var(--color-accent-rgb) / 0.10), rgb(var(--color-primary-rgb) / 0.10))",
            border: "1px solid rgb(var(--color-accent-rgb) / 0.20)",
          }}
        >
          <Flame size={14} className="text-accent shrink-0 animate-streak-flame" />
          <p className="text-xs font-medium text-accent">{streakMessage}</p>
        </motion.div>
      )}

      {/* ── HERO: Today's Puzzle ─────────────────────────── */}
      <motion.div variants={STAGGER.item} className="mb-5">
        <div
          className="relative overflow-hidden rounded-3xl p-5"
          style={{
            background: "linear-gradient(145deg, var(--color-white), var(--color-soft-blue))",
            border: "1px solid rgb(var(--color-primary-rgb) / 0.35)",
            boxShadow: `
              inset 0 1px 0 rgb(var(--color-white-rgb) / 0.10),
              inset 0 -1px 0 rgb(var(--color-muted-rgb) / 0.60),
              0 4px 8px rgb(var(--color-dark-gray-rgb) / 0.10),
              0 16px 40px rgb(var(--color-primary-rgb) / 0.10),
              0 0 60px rgb(var(--color-primary-rgb) / 0.12),
              0 0 120px rgb(var(--color-purple-rgb) / 0.06)
            `,
            animation: "hero-glow 3s ease-in-out infinite",
          }}
        >
          {/* ambient glow blobs */}
          <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/12 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-primary/05 blur-2xl" />

          <div className="relative">
            {/* Label */}
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 border border-primary/25">
              <Zap size={10} className="text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Today's Puzzle</span>
            </div>

            {/* Type emoji + number */}
            <div className="flex items-start gap-3 mb-4">
              <div className="text-5xl leading-none">{typeEmoji[todayPuzzle.type]}</div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
                  Puzzle #{puzzleNumber}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{typeLabel[todayPuzzle.type]}</span>
                  <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide
                      ${todayPuzzle.difficulty === "easy" ? "bg-secondary/12 text-secondary" :
                        todayPuzzle.difficulty === "medium" ? "bg-primary/12 text-primary" :
                        "bg-accent/14 text-accent"}`}
                  >
                    {todayPuzzle.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {todayDone ? (
              <div className="space-y-3">
                <div
                  className="flex items-center gap-2 rounded-2xl px-4 py-3"
                  style={{
                    background: "rgb(var(--color-indigo-rgb) / 0.12)",
                    border: "1px solid rgb(var(--color-indigo-rgb) / 0.28)",
                  }}
                >
                  <Crown size={16} className="text-success" fill="currentColor" />
                  <span className="text-sm font-semibold text-success">Completed today! 🎉</span>
                  {dailyData?.result && (
                    <span className="ml-auto text-xs text-muted-foreground font-mono">
                      {Math.floor(dailyData.result.timeTaken / 60)}:{String(dailyData.result.timeTaken % 60).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center gap-2 rounded-2xl bg-background/30 border border-glass-border px-4 py-4">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Next Puzzle In</p>
                  <CountdownTimer large />
                  <p className="text-[10px] text-muted-foreground">Come back tomorrow to keep your streak 🔥</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  Solve 15 daily puzzles to protect your streak. Miss a day and the streak resets.
                </p>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { playSelect(); navigate("/play", { state: { mode: "daily" } }); }}
                  className="btn-primary-gradient flex w-full items-center justify-center gap-2 text-sm font-bold"
                  data-testid="button-play-now"
                >
                  Start Today's Challenge
                  <ArrowRight size={16} />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Quick Stats ──────────────────────────────────── */}
      <motion.div variants={STAGGER.item} className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: Trophy, label: "Solved", value: String(overall.totalSolved || 0), color: "text-primary", glow: "rgb(var(--color-primary-rgb) / 0.20)" },
          { icon: Zap, label: "Win Rate", value: `${dailyStats.winRate || 0}%`, color: "text-success", glow: "rgb(var(--color-indigo-rgb) / 0.20)" },
          { icon: Flame, label: "Streak", value: `${streak}d`, color: "text-accent", glow: "rgb(var(--color-accent-rgb) / 0.20)" },
        ].map(({ icon: Icon, label, value, color, glow }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
            className="flex flex-col items-center gap-1 rounded-2xl p-4"
            style={{
              background: "var(--color-white)",
              border: "1px solid rgb(var(--color-muted-rgb) / 0.60)",
              boxShadow: `inset 0 1px 0 rgb(var(--color-white-rgb) / 0.07), inset 0 -1px 0 rgb(var(--color-muted-rgb) / 0.35), 0 3px 0 rgb(var(--color-muted-rgb) / 0.22), 0 5px 16px rgb(var(--color-dark-gray-rgb) / 0.10)`,
            }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl mb-1"
              style={{ background: glow.replace("0.25", "0.15") }}
            >
              <Icon size={15} className={color} />
            </div>
            <span className="font-heading text-xl font-bold text-foreground tabular-nums" data-testid={`stat-home-${label.toLowerCase()}`}>
              {value}
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Live Activity ────────────────────────────────── */}
      <motion.div
        variants={STAGGER.item}
        className="mb-5 flex items-center gap-3 rounded-2xl px-4 py-3"
        style={{
          background: "var(--color-white)",
          border: "1px solid rgb(var(--color-muted-rgb) / 0.50)",
          boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.06), 0 2px 8px rgb(var(--color-dark-gray-rgb) / 0.10)",
        }}
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-success/15 shrink-0">
          <div className="h-2 w-2 rounded-full bg-success" />
          <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-foreground" data-testid="player-count">{playerCount.toLocaleString()}</span>{" "}
          players active today
        </p>
        <Users size={13} className="text-muted-foreground ml-auto shrink-0" />
      </motion.div>

      {/* ── Explore Modes ────────────────────────────────── */}
      <motion.div variants={STAGGER.item}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => { playSelect(); navigate("/modes"); }}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-4 text-left"
          style={{
            background: "linear-gradient(135deg, rgb(var(--color-accent-rgb) / 0.10), rgb(var(--color-accent-rgb) / 0.05))",
            border: "1px solid rgb(var(--color-accent-rgb) / 0.22)",
            boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.07), 0 3px 12px rgb(var(--color-dark-gray-rgb) / 0.10)",
          }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgb(var(--color-accent-rgb) / 0.18)" }}
          >
            <Layers size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Explore Game Modes</p>
            <p className="text-xs text-muted-foreground mt-0.5">Practice, Challenge, Archive & more</p>
          </div>
          <ChevronRight size={16} className="text-accent shrink-0" />
        </motion.button>
      </motion.div>

      {/* ── Milestone hint ──────────────────────────────── */}
      {streak >= 3 && (
        <motion.div
          variants={STAGGER.item}
          className="mt-4 flex items-center gap-2 rounded-2xl px-4 py-3"
          style={{
            background: "rgb(var(--color-primary-rgb) / 0.07)",
            border: "1px solid rgb(var(--color-primary-rgb) / 0.18)",
          }}
        >
          <Star size={13} className="text-primary shrink-0" />
          <p className="text-xs text-muted-foreground">
            {streak < 7 ? `${7 - streak} more days to unlock the Week Warrior badge!` :
             streak < 30 ? `${30 - streak} more days to the Month Master badge!` :
             "You've unlocked all streak badges. Incredible! 🌟"}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;
