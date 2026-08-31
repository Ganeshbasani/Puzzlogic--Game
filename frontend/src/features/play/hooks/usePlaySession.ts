import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getArchivePuzzles,
  getChallengePuzzles,
  getDailyPuzzle,
  getDailyPuzzleNumber,
  getDailyPuzzles,
  getPracticePuzzles,
  type GameMode,
  type Puzzle,
  type PuzzleType,
} from "@/features/puzzles/model/puzzleEngine";
import type { Difficulty } from "@/features/settings/model/gameStore";
import { recordResult } from "@/features/progress/model/statsStore";
import { setDailyCompleted } from "@/features/progress/model/dailyStore";
import { isTutorialSeen } from "@/features/settings/model/settingsStore";
import { scoreForPuzzle } from "@/services/sessionScoring";
import { APP_ROUTES } from "@/constants/app";
import { MODE_LABELS } from "@/constants/gameModes";

type PlayState = {
  mode?: GameMode;
  difficulty?: Difficulty;
  puzzleType?: PuzzleType;
  puzzleId?: string;
};

export function usePlaySession(state: PlayState) {
  const navigate = useNavigate();
  const mode: GameMode = state.mode || "daily";
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [startTime] = useState(Date.now());
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionHintsUsed, setSessionHintsUsed] = useState(0);
  const [sessionSkipped, setSessionSkipped] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    let selected: Puzzle[];
    switch (mode) {
      case "daily":
        selected = getDailyPuzzles();
        break;
      case "practice":
        selected = getPracticePuzzles(state.puzzleType, state.difficulty);
        break;
      case "challenge":
        selected = getChallengePuzzles();
        break;
      case "archive":
        if (state.puzzleId) {
          const found = getArchivePuzzles().find((p) => p.id === state.puzzleId);
          selected = found ? [found] : [getDailyPuzzle()];
        } else {
          selected = getArchivePuzzles();
        }
        break;
      default:
        selected = [getDailyPuzzle()];
    }

    setPuzzles(selected);
    setCurrentIndex(0);
    setSessionScore(0);
    setSessionAttempts(0);
    setSessionHintsUsed(0);
    setSessionSkipped(0);
    setShowTutorial(false);
  }, [mode, state.difficulty, state.puzzleId, state.puzzleType]);

  useEffect(() => {
    if (puzzles.length > 0) {
      const type = puzzles[currentIndex]?.type ?? puzzles[0].type;
      setShowTutorial(!isTutorialSeen(type));
    }
  }, [currentIndex, puzzles]);

  useEffect(() => {
    const timerId = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(timerId);
  }, [startTime]);

  const puzzle = puzzles[currentIndex];
  const isLastPuzzle = currentIndex >= puzzles.length - 1;
  const modeLabel = MODE_LABELS[mode];

  const backTarget = useMemo(() => {
    if (mode === "practice") return APP_ROUTES.practiceSetup;
    if (mode === "archive") return APP_ROUTES.archive;
    return APP_ROUTES.modes;
  }, [mode]);

  const goToResults = (
    totalTimeTaken: number,
    totalAttempts: number,
    totalHintsUsed: number,
    finalScore: number,
    totalSkipped: number,
  ) => {
    navigate(APP_ROUTES.results, {
      state: {
        timeTaken: totalTimeTaken,
        attempts: totalAttempts,
        hintsUsed: totalHintsUsed,
        difficulty: puzzle?.difficulty ?? "medium",
        mode,
        total: puzzles.length,
        score: finalScore,
        skipped: totalSkipped,
        puzzleNumber: mode === "daily" ? getDailyPuzzleNumber() : undefined,
        puzzleType: puzzle?.type ?? "queens",
      },
    });
  };

  const handleSolved = (attempts: number, hintsUsed: number) => {
    if (!puzzle) return;

    const totalTimeTaken = Math.floor((Date.now() - startTime) / 1000);
    const totalAttempts = sessionAttempts + attempts;
    const totalHintsUsed = sessionHintsUsed + hintsUsed;
    const nextScore = sessionScore + scoreForPuzzle(attempts);

    setSessionAttempts(totalAttempts);
    setSessionHintsUsed(totalHintsUsed);
    setSessionScore(nextScore);

    recordResult({
      mode,
      puzzleType: puzzle.type,
      difficulty: puzzle.difficulty,
      timeTaken: totalTimeTaken,
      attempts,
      hintsUsed,
      solved: true,
      date: new Date().toISOString().split("T")[0],
    });

    if (!isLastPuzzle) {
      setTimeout(() => setCurrentIndex((index) => index + 1), 900);
      return;
    }

    if (mode === "daily") {
      setDailyCompleted(puzzles[0].id, {
        timeTaken: totalTimeTaken,
        attempts: totalAttempts,
        hintsUsed: totalHintsUsed,
        solved: true,
        puzzleType: puzzle.type,
      });
    }

    setTimeout(() => {
      goToResults(totalTimeTaken, totalAttempts, totalHintsUsed, nextScore, sessionSkipped);
    }, 900);
  };

  const handleSkip = () => {
    if (!puzzle) return;

    const totalTimeTaken = Math.floor((Date.now() - startTime) / 1000);
    const totalSkipped = sessionSkipped + 1;
    setSessionSkipped(totalSkipped);

    recordResult({
      mode,
      puzzleType: puzzle.type,
      difficulty: puzzle.difficulty,
      timeTaken: totalTimeTaken,
      attempts: 0,
      hintsUsed: 0,
      solved: false,
      date: new Date().toISOString().split("T")[0],
    });

    if (!isLastPuzzle) {
      setCurrentIndex((index) => index + 1);
      setShowTutorial(false);
      return;
    }

    if (mode === "daily") {
      setDailyCompleted(puzzles[0].id, {
        timeTaken: totalTimeTaken,
        attempts: sessionAttempts,
        hintsUsed: sessionHintsUsed,
        solved: false,
        puzzleType: puzzle.type,
      });
    }

    goToResults(totalTimeTaken, sessionAttempts, sessionHintsUsed, sessionScore, totalSkipped);
  };

  return {
    puzzle,
    puzzles,
    mode,
    modeLabel,
    currentIndex,
    elapsed,
    sessionScore,
    showTutorial,
    setShowTutorial,
    backTarget,
    handleSolved,
    handleSkip,
  };
}
