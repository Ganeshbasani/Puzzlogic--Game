import type { Difficulty } from "@/features/settings/model/gameStore";
import type { GameMode, PuzzleType } from "@/features/puzzles/model/puzzleEngine";

export const MODE_LABELS: Record<GameMode, string> = {
  daily: "Daily",
  practice: "Practice",
  challenge: "Challenge",
  archive: "Archive",
};

export const PRACTICE_PUZZLE_OPTIONS: Array<{
  type: PuzzleType;
  label: string;
  description: string;
  emoji: string;
}> = [
  { type: "queens", label: "Queens Grid", description: "Plan placements and manage conflicts.", emoji: "👑" },
  { type: "pinpoint", label: "Pinpoint", description: "Uncover the hidden word from layered clues.", emoji: "🎯" },
  { type: "riddle", label: "Logic Riddle", description: "Slow down, read closely, and crack the trick.", emoji: "🧠" },
  { type: "grid", label: "Number Grid", description: "Finish the pattern with sharp numerical reasoning.", emoji: "🔢" },
];

export const DIFFICULTY_OPTIONS: Difficulty[] = ["easy", "medium", "hard"];

export const PUZZLE_TYPE_LABELS: Record<string, string> = {
  queens: "Queens",
  pinpoint: "Pinpoint",
  riddle: "Riddle",
  grid: "Grid",
  word: "Word",
};
