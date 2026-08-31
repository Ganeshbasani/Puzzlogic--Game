import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Target, Brain, Hash, ChevronRight } from "lucide-react";
import { markTutorialSeen } from "@/features/settings/model/settingsStore";

interface Props {
  puzzleType: string;
  onClose: () => void;
}

const tutorials: Record<string, {
  title: string;
  icon: string;
  color: string;
  steps: { emoji: string; title: string; desc: string }[];
}> = {
  queens: {
    title: "Queens Puzzle",
    icon: "👑",
    color: "text-primary",
    steps: [
      { emoji: "👆", title: "Tap once → Mark X", desc: "Mark a cell with X to eliminate it. X means no queen here." },
      { emoji: "👑", title: "Tap again → Place Queen", desc: "Tap an X cell to upgrade it to a Queen. Tap again to clear." },
      { emoji: "🚫", title: "No touching queens", desc: "Queens can't share a row, column, or touch diagonally — even adjacent diagonals." },
      { emoji: "🎨", title: "One queen per color", desc: "Each colored region must have exactly one queen. Fill all regions to win." },
    ],
  },
  pinpoint: {
    title: "Pinpoint",
    icon: "🎯",
    color: "text-accent",
    steps: [
      { emoji: "🕵️", title: "Find the connection", desc: "5 clue words all relate to one hidden answer. What links them?" },
      { emoji: "💡", title: "Clues reveal one by one", desc: "Start with just the first clue. Each wrong guess reveals the next one." },
      { emoji: "⚡", title: "Fewer clues = more points", desc: "Getting it on the first clue earns a perfect score. Clue 5 is the easiest." },
      { emoji: "🎯", title: "Tap your answer", desc: "Choose from 4 options. Trust your instinct on the early clues." },
    ],
  },
  riddle: {
    title: "Logic Riddle",
    icon: "🧠",
    color: "text-secondary",
    steps: [
      { emoji: "📖", title: "Read carefully", desc: "The answer is hidden in the wording. Every word in a riddle is deliberate." },
      { emoji: "🤔", title: "Think laterally", desc: "Riddles often mean something different to what they seem. Think sideways." },
      { emoji: "✍️", title: "Type your answer", desc: "Spelling and capitalisation don't matter — just the core word." },
      { emoji: "💡", title: "Use hints sparingly", desc: "Hints cost points. Try to solve it with fresh eyes first." },
    ],
  },
  grid: {
    title: "Number Grid",
    icon: "🔢",
    color: "text-success",
    steps: [
      { emoji: "🔍", title: "Find the pattern", desc: "Each row, column, or diagonal follows a rule. Spot it fast." },
      { emoji: "✏️", title: "Fill the gaps", desc: "Tap empty cells and type the missing number." },
      { emoji: "✅", title: "All cells must be correct", desc: "Every missing number must match the pattern to complete the grid." },
      { emoji: "⏱️", title: "Speed matters", desc: "Faster solves earn better rankings. But accuracy first!" },
    ],
  },
};

const fallback = tutorials.riddle;

const HowToPlay = ({ puzzleType, onClose }: Props) => {
  const [step, setStep] = useState(0);
  const tutorial = tutorials[puzzleType] || fallback;
  const isLast = step === tutorial.steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      markTutorialSeen(puzzleType);
      onClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleSkip = () => {
    markTutorialSeen(puzzleType);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/35 backdrop-blur-sm px-4 pb-8"
      onClick={handleSkip}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="w-full max-w-sm rounded-3xl border border-glass-border bg-card shadow-glass-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-glass-border">
          <div className="flex items-center gap-2">
            <span className="text-xl">{tutorial.icon}</span>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">How to play</p>
              <h2 className={`font-heading text-lg font-bold ${tutorial.color}`}>{tutorial.title}</h2>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="rounded-xl p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="tutorial-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step content */}
        <div className="px-5 py-6 min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-4xl">
                {tutorial.steps[step].emoji}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                  {tutorial.steps[step].title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tutorial.steps[step].desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots + action */}
        <div className="px-5 pb-5 flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {tutorial.steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === step ? "w-5 bg-primary" : "w-1.5 bg-muted"
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="btn-primary-gradient flex items-center gap-1.5 px-5 py-2.5 text-sm"
            data-testid="tutorial-next"
          >
            {isLast ? "Let's Play!" : "Next"}
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HowToPlay;
