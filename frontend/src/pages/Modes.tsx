import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Dumbbell, Timer, Archive } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { GameMode } from "@/features/puzzles/model/puzzleEngine";

const modes: { mode: GameMode; icon: typeof Calendar; label: string; desc: string; accent: string }[] = [
  { mode: "daily", icon: Calendar, label: "Daily", desc: "15 puzzles each day. Keep your streak alive.", accent: "text-primary" },
  { mode: "practice", icon: Dumbbell, label: "Practice", desc: "10-puzzle practice runs by type and difficulty.", accent: "text-success" },
  { mode: "challenge", icon: Timer, label: "Challenge", desc: "10 puzzles, timed. Build the best score you can.", accent: "text-accent" },
  { mode: "archive", icon: Archive, label: "Archive", desc: "Browse and replay the full puzzle catalog.", accent: "text-secondary" },
];

const Modes = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col px-4 pt-12 safe-bottom">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading text-2xl font-bold text-foreground mb-1">Game Modes</h1>
        <p className="text-sm text-muted-foreground mb-8">Choose how you want to play</p>
      </motion.div>

      <div className="space-y-3">
        {modes.map(({ mode, icon: Icon, label, desc, accent }, i) => (
          <GlassCard
            key={mode}
            className="flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
            transition={{ delay: i * 0.06 }}
            onClick={() => {
              if (mode === "daily") navigate("/play", { state: { mode: "daily" } });
              else if (mode === "practice") navigate("/practice-setup");
              else if (mode === "challenge") navigate("/play", { state: { mode: "challenge" } });
              else if (mode === "archive") navigate("/archive");
            }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted">
              <Icon size={22} className={accent} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-muted-foreground">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Modes;
