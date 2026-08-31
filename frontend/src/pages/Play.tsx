import { Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HowToPlay from "@/features/play/components/HowToPlay";
import PlayActions from "@/features/play/components/PlayActions";
import PlayHeader from "@/features/play/components/PlayHeader";
import QueensRenderer from "@/features/puzzles/components/QueensRenderer";
import PinpointRenderer from "@/features/puzzles/components/PinpointRenderer";
import RiddleRenderer from "@/features/puzzles/components/RiddleRenderer";
import GridRenderer from "@/features/puzzles/components/GridRenderer";
import LoadingScreen from "@/components/states/LoadingScreen";
import { usePlaySession } from "@/features/play/hooks/usePlaySession";
import type { GameMode, PuzzleType } from "@/features/puzzles/model/puzzleEngine";
import type { Difficulty } from "@/features/settings/model/gameStore";

const Play = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as {
    mode?: GameMode;
    difficulty?: Difficulty;
    puzzleType?: PuzzleType;
    puzzleId?: string;
  };

  const {
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
  } = usePlaySession(state);

  if (!puzzle) {
    return <LoadingScreen label="Preparing your puzzle session..." />;
  }

  return (
    <div className="flex min-h-screen flex-col px-4 pt-8 safe-bottom">
      <AnimatePresence>
        {showTutorial && <HowToPlay puzzleType={puzzle.type} onClose={() => setShowTutorial(false)} />}
      </AnimatePresence>

      <PlayHeader
        currentIndex={currentIndex}
        totalPuzzles={puzzles.length}
        elapsed={elapsed}
        score={sessionScore}
        modeLabel={modeLabel}
        difficulty={puzzle.difficulty as Difficulty}
        onBack={() => navigate(backTarget)}
      />

      <Suspense fallback={<LoadingScreen label="Loading puzzle board..." />}>
        {puzzle.type === "queens" && <QueensRenderer puzzle={puzzle} onSolved={handleSolved} />}
        {puzzle.type === "pinpoint" && <PinpointRenderer puzzle={puzzle} onSolved={handleSolved} />}
        {puzzle.type === "riddle" && <RiddleRenderer puzzle={puzzle} onSolved={handleSolved} />}
        {puzzle.type === "grid" && <GridRenderer puzzle={puzzle} onSolved={handleSolved} />}
      </Suspense>

      <PlayActions onSkip={handleSkip} />
    </div>
  );
};

export default Play;
