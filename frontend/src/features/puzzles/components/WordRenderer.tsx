import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Lightbulb, CheckCircle2, XCircle, Shuffle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { WordPuzzle } from "@/features/puzzles/model/puzzleEngine";

interface Props {
  puzzle: WordPuzzle;
  onSolved: (attempts: number, hintsUsed: number) => void;
}

const WordRenderer = ({ puzzle, onSolved }: Props) => {
  const [answer, setAnswer] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [letters, setLetters] = useState(puzzle.scrambled.split(""));
  const inputRef = useRef<HTMLInputElement>(null);

  const shuffle = () => {
    setLetters(l => [...l].sort(() => Math.random() - 0.5));
  };

  const handleSubmit = () => {
    if (!answer.trim() || feedback === "correct") return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (answer.trim().toUpperCase() === puzzle.answer.toUpperCase()) {
      setFeedback("correct");
      setTimeout(() => onSolved(newAttempts, hintsUsed), 800);
    } else {
      setFeedback("wrong");
      setTimeout(() => { setFeedback(null); setAnswer(""); inputRef.current?.focus(); }, 600);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <GlassCard elevated className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Word Puzzle · {puzzle.category}</p>
          <motion.button whileTap={{ scale: 0.9 }} onClick={shuffle} className="p-2 text-muted-foreground hover:text-foreground">
            <Shuffle size={16} />
          </motion.button>
        </div>
        <div className="flex justify-center gap-2 flex-wrap">
          {letters.map((letter, i) => (
            <motion.div
              key={`${letter}-${i}`}
              layout
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted font-heading text-lg font-bold text-foreground"
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-4">
            <GlassCard className="border-primary/30 bg-primary/5">
              <p className="text-sm text-primary">💡 {puzzle.hint}</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback === "correct" && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-4 flex items-center gap-2 rounded-2xl bg-success/10 border border-success/30 px-4 py-3">
            <CheckCircle2 size={20} className="text-success" /><span className="text-sm font-medium text-success">Correct! 🎉</span>
          </motion.div>
        )}
        {feedback === "wrong" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, x: [0, -6, 6, -6, 6, 0] }} transition={{ duration: 0.3 }} className="mb-4 flex items-center gap-2 rounded-2xl bg-destructive/10 border border-destructive/30 px-4 py-3">
            <XCircle size={20} className="text-destructive" /><span className="text-sm font-medium text-destructive">Not quite. Try again!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto mb-4 space-y-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={answer}
            onChange={(e) => setAnswer(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Type the word..."
            disabled={feedback === "correct"}
            className="flex-1 rounded-2xl border border-glass-border bg-glass/80 px-5 py-4 text-base text-foreground font-heading tracking-widest placeholder:text-muted-foreground placeholder:tracking-normal placeholder:font-body focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-xl"
          />
          <motion.button whileTap={{ scale: 0.92 }} onClick={handleSubmit} disabled={feedback === "correct"} className="btn-primary-gradient flex items-center justify-center !px-5 !rounded-2xl">
            <Send size={20} />
          </motion.button>
        </div>
        {!showHint && hintsUsed < 1 && feedback !== "correct" && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => { setHintsUsed(1); setShowHint(true); }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass/50 px-4 py-3 text-sm text-muted-foreground backdrop-blur-xl transition-colors hover:text-foreground">
            <Lightbulb size={16} /> Use Hint
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default WordRenderer;
