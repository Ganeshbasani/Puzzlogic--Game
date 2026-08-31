import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { PinpointPuzzle } from "@/features/puzzles/model/puzzleEngine";
import { playCorrect, playWrong, playSelect, playWin } from "@/services/soundEffects";

interface Props {
  puzzle: PinpointPuzzle;
  onSolved: (attempts: number, hintsUsed: number) => void;
}

const PinpointRenderer = ({ puzzle, onSolved }: Props) => {
  const { clues, answer, choices, hint } = puzzle;
  const [revealedCount, setRevealedCount] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [wrongChoice, setWrongChoice] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);

  const handleChoice = (choice: string) => {
    if (solved || feedback === "correct") return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (choice === answer) {
      setFeedback("correct");
      setSolved(true);
      playCorrect();
      setTimeout(() => { playWin(); onSolved(newAttempts, hintsUsed); }, 900);
    } else {
      setFeedback("wrong");
      setWrongChoice(choice);
      playWrong();
      setTimeout(() => {
        setFeedback(null);
        setWrongChoice(null);
        if (revealedCount < clues.length) {
          setRevealedCount((c) => Math.min(c + 1, clues.length));
        }
      }, 700);
    }
  };

  const handleRevealNext = () => {
    if (revealedCount < clues.length) {
      playSelect();
      setRevealedCount((c) => c + 1);
    }
  };

  const handleHint = () => {
    setHintsUsed((h) => h + 1);
    setShowHint(true);
    playSelect();
    if (revealedCount < clues.length) {
      setRevealedCount((c) => Math.min(c + 2, clues.length));
    }
  };

  const scoreLabel = revealedCount === 1 ? "Perfect!" : revealedCount === 2 ? "Excellent" : revealedCount === 3 ? "Great" : revealedCount === 4 ? "Good" : "Got it";

  return (
    <div className="flex flex-1 flex-col">
      <GlassCard elevated className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Pinpoint</p>
            <p className="text-sm text-foreground font-medium mt-0.5">What connects these words?</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Clues shown</p>
            <p className="font-heading font-bold text-primary">{revealedCount}/{clues.length}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4" data-testid="clues-container">
          {clues.map((clue, i) => (
            <AnimatePresence key={i}>
              {i < revealedCount ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i === revealedCount - 1 ? 0.05 : 0 }}
                  className="flex items-center gap-3 rounded-xl bg-muted/60 px-4 py-3"
                  data-testid={`clue-${i}`}
                >
                  <span className="font-heading text-xs text-primary font-bold w-4">{i + 1}</span>
                  <span className="font-heading font-semibold text-foreground tracking-wide">{clue}</span>
                </motion.div>
              ) : (
                <motion.div
                  className="flex items-center gap-3 rounded-xl border border-dashed border-muted-foreground/20 px-4 py-3"
                  data-testid={`clue-hidden-${i}`}
                >
                  <span className="font-heading text-xs text-muted-foreground font-bold w-4">{i + 1}</span>
                  <span className="text-muted-foreground/40 text-sm">• • • • •</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {revealedCount < clues.length && (
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleRevealNext}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-glass-border bg-muted/40 py-2.5 text-sm text-muted-foreground"
            data-testid="button-reveal-next"
          >
            <Eye size={14} /> Reveal next clue
          </motion.button>
        )}
      </GlassCard>

      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4">
            <GlassCard className="border-primary/30 bg-primary/5">
              <p className="text-sm text-primary">💡 {hint}</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3 mb-4" data-testid="choices-container">
        {choices.map((choice) => {
          const isWrong = wrongChoice === choice;
          const isCorrect = feedback === "correct" && choice === answer;
          return (
            <motion.button
              key={choice}
              data-testid={`choice-${choice}`}
              whileTap={{ scale: 0.95 }}
              animate={
                isWrong
                  ? { x: [-6, 6, -6, 6, 0] }
                  : isCorrect
                  ? { scale: [1, 1.05, 1] }
                  : {}
              }
              onClick={() => handleChoice(choice)}
              disabled={solved}
              className={`
                relative flex items-center justify-center rounded-2xl border px-4 py-5 font-heading font-bold text-base transition-all duration-200
                ${isCorrect ? "border-success bg-success/15 text-success shadow-[0_0_16px_rgba(34,197,94,0.35)]" : ""}
                ${isWrong ? "border-destructive bg-destructive/15 text-destructive" : ""}
                ${!isCorrect && !isWrong ? "border-glass-border bg-glass/80 text-foreground active:bg-muted/60" : ""}
                disabled:opacity-60
              `}
            >
              {isCorrect && <CheckCircle2 size={16} className="absolute top-2 right-2 text-success" />}
              {isWrong && <XCircle size={16} className="absolute top-2 right-2 text-destructive" />}
              {choice}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 rounded-2xl bg-success/10 border border-success/30 px-4 py-3 text-center"
          >
            <p className="font-heading font-bold text-success text-lg">{scoreLabel}!</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {revealedCount === 1 ? "You got it on the first clue!" : `You needed ${revealedCount} clues.`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!solved && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleHint}
          disabled={showHint}
          className="mb-4 w-full flex items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass/80 py-3 text-sm font-semibold text-muted-foreground backdrop-blur-xl disabled:opacity-40"
          data-testid="button-hint"
        >
          💡 Show hint & reveal more clues
        </motion.button>
      )}
    </div>
  );
};

export default PinpointRenderer;
