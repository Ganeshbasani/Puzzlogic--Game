import { cn } from "@/utils/cn";

type Difficulty = "easy" | "medium" | "hard";

const styles: Record<Difficulty, string> = {
  easy: "bg-success/15 text-success border-success/30",
  medium: "bg-primary/15 text-primary border-primary/30",
  hard: "bg-destructive/15 text-destructive border-destructive/30",
};

const DifficultyBadge = ({
  difficulty,
  selected,
  onClick,
}: {
  difficulty: Difficulty;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-xl border px-4 py-1.5 text-xs font-semibold capitalize transition-all duration-200",
      styles[difficulty],
      selected && "ring-2 ring-offset-2 ring-offset-background",
      selected && difficulty === "easy" && "ring-success",
      selected && difficulty === "medium" && "ring-primary",
      selected && difficulty === "hard" && "ring-destructive",
      onClick && "active:scale-95",
    )}
  >
    {difficulty}
  </button>
);

export default DifficultyBadge;
