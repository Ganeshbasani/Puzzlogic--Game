import { ArrowLeft, Clock, Trophy } from "lucide-react";
import DifficultyBadge from "@/components/DifficultyBadge";
import { formatDuration } from "@/utils/format";
import type { Difficulty } from "@/features/settings/model/gameStore";

type PlayHeaderProps = {
  currentIndex: number;
  totalPuzzles: number;
  elapsed: number;
  score: number;
  modeLabel: string;
  difficulty: Difficulty;
  onBack: () => void;
};

const PlayHeader = ({
  currentIndex,
  totalPuzzles,
  elapsed,
  score,
  modeLabel,
  difficulty,
  onBack,
}: PlayHeaderProps) => (
  <div className="mb-6 flex items-center justify-between">
    <button data-testid="button-back" onClick={onBack} className="text-muted-foreground p-2 -ml-2">
      <ArrowLeft size={22} />
    </button>
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground mr-2">
        {currentIndex + 1}/{totalPuzzles}
      </span>
      <div className="hidden sm:flex items-center gap-1 glass-card px-3 py-1.5">
        <Trophy size={14} className="text-accent" />
        <span className="font-heading text-sm font-semibold text-foreground tabular-nums" data-testid="score">
          {score}
        </span>
      </div>
      <div className="flex items-center gap-2 glass-card px-3 py-1.5">
        <Clock size={14} className="text-primary" />
        <span className="font-heading text-sm font-semibold text-foreground tabular-nums" data-testid="timer">
          {formatDuration(elapsed)}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{modeLabel}</span>
      <DifficultyBadge difficulty={difficulty} />
    </div>
  </div>
);

export default PlayHeader;
