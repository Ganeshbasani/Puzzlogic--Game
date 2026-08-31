import { useState, useCallback } from "react";

export type Difficulty = "easy" | "medium" | "hard";
export type GameStatus = "idle" | "playing" | "completed" | "wrong";

interface PuzzleQuestion {
  id: number;
  question: string;
  answer: string;
  hint: string;
  difficulty: Difficulty;
}

const PUZZLES: Record<Difficulty, PuzzleQuestion> = {
  easy: {
    id: 1,
    question: "What number completes the sequence?\n2, 4, 8, 16, __",
    answer: "32",
    hint: "Each number is multiplied by 2",
    difficulty: "easy",
  },
  medium: {
    id: 2,
    question: "If 3 cats catch 3 mice in 3 minutes, how many cats are needed to catch 100 mice in 100 minutes?",
    answer: "3",
    hint: "Think about the rate per cat",
    difficulty: "medium",
  },
  hard: {
    id: 3,
    question: "A bat and ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost in cents?",
    answer: "5",
    hint: "It's not 10 cents. Set up an equation.",
    difficulty: "hard",
  },
};

export interface GameState {
  difficulty: Difficulty;
  status: GameStatus;
  puzzle: PuzzleQuestion;
  attempts: number;
  hintsUsed: number;
  startTime: number | null;
  endTime: number | null;
  streak: number;
  totalSolved: number;
  accuracy: number;
}

export function useGameStore() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [status, setStatus] = useState<GameStatus>("idle");
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [streak] = useState(7);
  const [totalSolved] = useState(42);
  const [accuracy] = useState(87);
  const [showHint, setShowHint] = useState(false);

  const puzzle = PUZZLES[difficulty];

  const startGame = useCallback(() => {
    setStatus("playing");
    setAttempts(0);
    setHintsUsed(0);
    setStartTime(Date.now());
    setEndTime(null);
    setShowHint(false);
  }, []);

  const submitAnswer = useCallback(
    (answer: string) => {
      setAttempts((a) => a + 1);
      if (answer.trim().toLowerCase() === puzzle.answer.toLowerCase()) {
        setStatus("completed");
        setEndTime(Date.now());
        return true;
      } else {
        setStatus("wrong");
        setTimeout(() => setStatus("playing"), 600);
        return false;
      }
    },
    [puzzle.answer],
  );

  const useHint = useCallback(() => {
    setHintsUsed((h) => h + 1);
    setShowHint(true);
  }, []);

  const resetGame = useCallback(() => {
    setStatus("idle");
    setAttempts(0);
    setHintsUsed(0);
    setStartTime(null);
    setEndTime(null);
    setShowHint(false);
  }, []);

  const timeTaken = startTime && endTime ? Math.round((endTime - startTime) / 1000) : null;

  return {
    difficulty,
    setDifficulty,
    status,
    puzzle,
    attempts,
    hintsUsed,
    startTime,
    endTime,
    timeTaken,
    streak,
    totalSolved,
    accuracy,
    showHint,
    startGame,
    submitAnswer,
    useHint,
    resetGame,
  };
}
