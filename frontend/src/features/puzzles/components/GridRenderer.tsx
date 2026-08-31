import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, CheckCircle2, XCircle, Send } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { GridPuzzle } from "@/features/puzzles/model/puzzleEngine";

interface Props {
  puzzle: GridPuzzle;
  onSolved: (attempts: number, hintsUsed: number) => void;
}

const GridRenderer = ({ puzzle, onSolved }: Props) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const emptyCells: [number, number][] = [];
  puzzle.grid.forEach((row, r) => row.forEach((cell, c) => { if (cell === null) emptyCells.push([r, c]); }));

  const handleSubmit = () => {
    if (feedback === "correct") return;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    const allCorrect = emptyCells.every(([r, c]) => {
      const val = values[`${r}-${c}`];
      return val && parseInt(val) === puzzle.solution[r][c];
    });
    if (allCorrect) {
      setFeedback("correct");
      setTimeout(() => onSolved(newAttempts, hintsUsed), 800);
    } else {
      setFeedback("wrong");
      setTimeout(() => setFeedback(null), 600);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <GlassCard elevated className="mb-6">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Grid Logic</p>
        <p className="text-sm text-muted-foreground mb-4">{puzzle.instructions}</p>
        <div className="flex justify-center">
          <div className="inline-grid gap-2" style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}>
            {puzzle.grid.map((row, r) =>
              row.map((cell, c) => (
                <div key={`${r}-${c}`} className={`flex h-14 w-14 items-center justify-center rounded-xl text-lg font-heading font-bold ${cell !== null ? "bg-muted text-foreground" : "border-2 border-dashed border-primary/30"}`}>
                  {cell !== null ? (
                    cell
                  ) : (
                    <input
                      value={values[`${r}-${c}`] || ""}
                      onChange={(e) => setValues(v => ({ ...v, [`${r}-${c}`]: e.target.value.replace(/\D/g, "").slice(0, 2) }))}
                      className="h-full w-full bg-background/0 text-center text-primary font-bold focus:outline-none"
                      disabled={feedback === "correct"}
                    />
                  )}
                </div>
              ))
            )}
          </div>
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
            <XCircle size={20} className="text-destructive" /><span className="text-sm font-medium text-destructive">Check your answers!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto mb-4 space-y-3">
        <motion.button whileTap={{ scale: 0.96 }} onClick={handleSubmit} disabled={feedback === "correct"} className="btn-primary-gradient flex w-full items-center justify-center gap-2">
          <Send size={18} /> Check Answer
        </motion.button>
        {!showHint && hintsUsed < 1 && feedback !== "correct" && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => { setHintsUsed(1); setShowHint(true); }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-glass-border bg-glass/50 px-4 py-3 text-sm text-muted-foreground backdrop-blur-xl transition-colors hover:text-foreground">
            <Lightbulb size={16} /> Use Hint
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default GridRenderer;
