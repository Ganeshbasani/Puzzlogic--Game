import { useNavigate } from "react-router-dom";
import { ArrowLeft, Archive } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import DifficultyBadge from "@/components/DifficultyBadge";
import EmptyState from "@/components/states/EmptyState";
import { APP_ROUTES } from "@/constants/app";
import { PUZZLE_TYPE_LABELS } from "@/constants/gameModes";
import { getArchivePuzzles } from "@/features/puzzles/model/puzzleEngine";

const ArchivePage = () => {
  const navigate = useNavigate();
  const puzzles = getArchivePuzzles();

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
        <h1 className="font-heading text-xl font-bold text-foreground">Puzzle Archive</h1>
      </div>

      {puzzles.length === 0 ? (
        <EmptyState
          icon={<Archive />}
          title="No archived puzzles yet"
          description="New puzzle sets will appear here as the catalog grows."
        />
      ) : (
        <div className="space-y-2">
          {puzzles.map((puzzle, i) => {
            const typeName = PUZZLE_TYPE_LABELS[puzzle.type] ?? "Puzzle";
            return (
              <GlassCard
                key={`${puzzle.id}-${i}`}
                className="flex cursor-pointer items-center gap-3 transition-transform active:scale-[0.98]"
                transition={{ delay: i * 0.04 }}
                onClick={() => navigate(APP_ROUTES.play, { state: { mode: "archive", puzzleId: puzzle.id } })}
                data-testid={`archive-puzzle-${puzzle.id}`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-muted text-lg">
                  {puzzle.type === "queens" ? "👑" : puzzle.type === "pinpoint" ? "🎯" : puzzle.type === "riddle" ? "🧠" : "🔢"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{puzzle.title}</p>
                  <p className="text-xs text-muted-foreground">{typeName} puzzle</p>
                </div>
                <DifficultyBadge difficulty={puzzle.difficulty as any} />
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
