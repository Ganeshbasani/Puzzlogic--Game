import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import DifficultyBadge from "@/components/DifficultyBadge";
import { APP_ROUTES } from "@/constants/app";
import { DIFFICULTY_OPTIONS, PRACTICE_PUZZLE_OPTIONS } from "@/constants/gameModes";
import type { PuzzleType } from "@/features/puzzles/model/puzzleEngine";
import type { Difficulty } from "@/features/settings/model/gameStore";

const PracticeSetup = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<PuzzleType | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const canStartPractice = selectedType !== null;

  return (
    <div className="flex min-h-screen flex-col px-4 pt-8 safe-bottom">
      <div className="mb-6 flex items-center gap-3">
        <button
          data-testid="button-back"
          onClick={() => navigate(APP_ROUTES.modes)}
          className="text-muted-foreground p-2 -ml-2"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="font-heading text-xl font-bold text-foreground">Practice Mode</h1>
      </div>

      <p className="mb-1 text-sm text-muted-foreground">Choose a puzzle type</p>
      <p className="mb-4 text-xs text-muted-foreground">Each practice run gives you 10 puzzles in the same category.</p>
      <div className="space-y-2 mb-6">
        {PRACTICE_PUZZLE_OPTIONS.map(({ type, label, description, emoji }) => (
          <GlassCard
            key={type}
            data-testid={`type-${type}`}
            className={`flex items-center gap-3 cursor-pointer transition-all ${
              selectedType === type ? "border-primary/50 bg-primary/5" : ""
            }`}
            onClick={() => setSelectedType(type)}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-xl">
              {emoji}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            {selectedType === type && (
              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="var(--color-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-3">Difficulty</p>
      <div className="flex gap-2 mb-8">
        {DIFFICULTY_OPTIONS.map((d) => (
          <DifficultyBadge key={d} difficulty={d} selected={difficulty === d} onClick={() => setDifficulty(d)} />
        ))}
      </div>

      {!canStartPractice && (
        <div className="mb-4 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
          Pick a puzzle type to start your 10-question practice session.
        </div>
      )}

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          if (!selectedType) return;
          navigate(APP_ROUTES.play, { state: { mode: "practice", puzzleType: selectedType, difficulty } });
        }}
        disabled={!canStartPractice}
        className="btn-primary-gradient mt-auto mb-4 w-full disabled:pointer-events-none disabled:opacity-50"
        data-testid="button-start-practice"
      >
        Start Practice
      </motion.button>
    </div>
  );
};

export default PracticeSetup;
