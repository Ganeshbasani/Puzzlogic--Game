import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Target, Zap, Share2, Home, RotateCcw, Trophy, Crown, Users, Flame } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import ProgressRing from "@/components/ProgressRing";
import CountdownTimer from "@/components/CountdownTimer";
import Confetti from "@/components/Confetti";
import type { Difficulty } from "@/features/settings/model/gameStore";
import type { GameMode } from "@/features/puzzles/model/puzzleEngine";
import { getPercentile, getSimulatedPlayerCount } from "@/features/progress/model/dailyStore";
import { getStatsForMode } from "@/features/progress/model/statsStore";
import { toast } from "sonner";
import { playWin } from "@/services/soundEffects";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(true);

  const {
    timeTaken = 0,
    attempts = 1,
    hintsUsed = 0,
    difficulty = "medium",
    mode = "daily",
    score,
    skipped = 0,
    total,
    puzzleNumber,
    puzzleType = "queens",
  } = (location.state || {}) as {
    timeTaken?: number;
    attempts?: number;
    hintsUsed?: number;
    difficulty?: Difficulty;
    mode?: GameMode;
    score?: number;
    skipped?: number;
    total?: number;
    puzzleNumber?: number;
    puzzleType?: string;
  };

  useEffect(() => {
    playWin();
    const t = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(t);
  }, []);

  const percentile = getPercentile(timeTaken, puzzleType);
  const accuracy = Math.max(0, Math.round((1 / Math.max(1, attempts)) * 100));
  const dailyStats = getStatsForMode("daily");
  const streak = dailyStats.currentStreak;
  const playerCount = getSimulatedPlayerCount(puzzleNumber || 815);

  const modeLabels: Record<GameMode, string> = { daily: "Daily", practice: "Practice", challenge: "Challenge", archive: "Archive" };
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const solverType =
    timeTaken < 60 && attempts <= 1
      ? { label: "Lightning Solver", emoji: "⚡", color: "text-primary" }
      : timeTaken < 120
      ? { label: "Speed Thinker", emoji: "🏎️", color: "text-accent" }
      : attempts <= 1
      ? { label: "First-Try Genius", emoji: "🎯", color: "text-success" }
      : hintsUsed === 0
      ? { label: "Pure Logic", emoji: "🧠", color: "text-secondary" }
      : { label: "Careful Solver", emoji: "🔍", color: "text-accent" };

  const emojiGrid = (() => {
    const blocks = attempts <= 1 ? 4 : attempts <= 2 ? 3 : attempts <= 3 ? 2 : 1;
    return "🟩".repeat(blocks) + "⬛".repeat(4 - blocks);
  })();

  const shareResult = () => {
    const num = puzzleNumber || "?";
    const typeEmoji = puzzleType === "queens" ? "👑" : puzzleType === "pinpoint" ? "🎯" : "🧩";
    const appUrl = window.location.origin;
    const text = [
      `${typeEmoji} PuzzDaily #${num} — ${modeLabels[mode]}`,
      ``,
      emojiGrid,
      ``,
      `⏱ ${formatTime(timeTaken)}  🎯 ${accuracy}%  🏆 Top ${100 - percentile}%`,
      `${streak > 0 ? `🔥 ${streak} day streak` : ""}`,
      ``,
      `Better than ${percentile}% of today's players`,
      `Play at ${appUrl}`,
    ].filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");

    navigator.clipboard.writeText(text).then(() => toast.success("Copied to clipboard!"));
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 pt-10 safe-bottom">
      {showConfetti && <Confetti />}

      {/* Header */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-6 text-center w-full"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{modeLabels[mode]} Puzzle</p>
        <h1 className="font-heading text-3xl font-bold gradient-text mb-1">
          {mode === "challenge" ? "Challenge Complete! 🏆" : "Puzzle Solved! 🎉"}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 space-y-1"
          data-testid="social-stats"
        >
          <p className="text-base font-semibold text-foreground">
            Better than{" "}
            <span className="gradient-text font-bold">{percentile}%</span> of players today
          </p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Users size={12} />
            <span data-testid="player-count">{playerCount.toLocaleString()} players solved today</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Session Score */}
      {score !== undefined && (
        <GlassCard gradient className="mb-4 w-full flex items-center justify-center gap-3 py-5">
          <Trophy size={28} className="text-primary" />
          <div className="text-center">
            <p className="font-heading text-4xl font-bold text-foreground">{score}</p>
            <p className="text-xs text-muted-foreground">{total} puzzles · final score</p>
          </div>
        </GlassCard>
      )}

      {/* Solver style badge */}
      <GlassCard gradient className="mb-4 w-full flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-2xl">
          {solverType.emoji}
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Your style</p>
          <p className={`font-heading font-bold text-lg ${solverType.color}`}>{solverType.label}</p>
        </div>
      </GlassCard>

      {/* Stats grid */}
      <div className="mb-4 grid w-full grid-cols-2 gap-3">
        {[
          { icon: Clock, label: "Time", value: formatTime(timeTaken), color: "text-primary" },
          { icon: Target, label: "Attempts", value: String(attempts), color: "text-accent" },
          { icon: Zap, label: "Hints Used", value: String(hintsUsed), color: "text-accent" },
          { icon: Crown, label: "Skipped", value: String(skipped), color: "text-secondary" },
        ].map(({ icon: Icon, label, value, color }, i) => (
          <GlassCard key={label} className="flex items-center gap-3 p-4" transition={{ delay: 0.12 + i * 0.07 }}>
            <Icon size={18} className={color} />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="font-heading font-bold text-foreground" data-testid={`stat-${label.toLowerCase()}`}>{value}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Accuracy + streak */}
      <div className="mb-4 grid w-full grid-cols-2 gap-3">
        <GlassCard className="flex items-center justify-center py-5">
          <ProgressRing value={accuracy} size={90} label="Accuracy" />
        </GlassCard>
        <GlassCard className="flex flex-col items-center justify-center gap-1 py-5">
          <Flame size={28} className="text-accent animate-streak-flame" />
          <p className="font-heading text-3xl font-bold text-foreground">{streak}d</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">streak</p>
        </GlassCard>
      </div>

      {/* Share card preview */}
      <GlassCard className="mb-4 w-full py-4 px-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Your Result</p>
        <p className="font-heading text-xl tracking-widest mb-2">{emojiGrid}</p>
        <div className="flex gap-3 text-xs text-muted-foreground flex-wrap">
          <span>⏱ {formatTime(timeTaken)}</span>
          <span>🎯 {accuracy}%</span>
          <span>🏆 Top {100 - percentile}%</span>
          {streak > 0 && <span>🔥 {streak}d streak</span>}
        </div>
      </GlassCard>

      {/* Comeback loop — daily */}
      {mode === "daily" && (
        <GlassCard className="mb-4 w-full flex flex-col items-center gap-2 py-5 border-primary/25 bg-primary/5">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Next Puzzle In</p>
          <CountdownTimer large />
          <p className="text-xs text-muted-foreground">Come back tomorrow to keep your streak alive 🔥</p>
        </GlassCard>
      )}

      {/* Actions */}
      <div className="mt-auto mb-4 flex w-full gap-3">
        {mode === "practice" && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/play", { state: { mode: "practice" } })}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass/80 py-4 font-semibold text-foreground backdrop-blur-xl"
            data-testid="button-play-again"
          >
            <RotateCcw size={18} /> Again
          </motion.button>
        )}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={shareResult}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass/80 py-4 font-semibold text-foreground backdrop-blur-xl"
          data-testid="button-share"
        >
          <Share2 size={18} /> Share
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/")}
          className="btn-primary-gradient flex flex-1 items-center justify-center gap-2"
          data-testid="button-home"
        >
          <Home size={18} /> Home
        </motion.button>
      </div>
    </div>
  );
};

export default Results;
