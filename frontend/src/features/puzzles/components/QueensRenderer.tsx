import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Crown, X, RotateCcw, ToggleLeft, ToggleRight } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import type { QueensPuzzle } from "@/features/puzzles/model/puzzleEngine";
import { playTap, playMark, playQueen, playConflict, playWin } from "@/services/soundEffects";

interface Props {
  puzzle: QueensPuzzle;
  onSolved: (attempts: number, hintsUsed: number) => void;
  autoCheck?: boolean;
}

type CellState = 0 | 1 | 2; // 0=empty, 1=X mark, 2=queen

const REGION_BG = [
  "rgb(var(--color-light-blue-rgb) / 0.55)",
  "rgb(var(--color-soft-blue-rgb) / 0.55)",
  "rgb(var(--color-lavender-rgb) / 0.7)",
  "rgb(var(--color-pale-blue-rgb) / 0.55)",
  "rgb(var(--color-muted-rgb) / 0.45)",
  "rgb(var(--color-light-blue-rgb) / 0.75)",
  "rgb(var(--color-lavender-rgb) / 0.85)",
  "rgb(var(--color-soft-blue-rgb) / 0.75)",
];

const REGION_BORDER = [
  "rgb(var(--color-primary-rgb) / 0.38)",
  "rgb(var(--color-indigo-rgb) / 0.38)",
  "rgb(var(--color-purple-rgb) / 0.38)",
  "rgb(var(--color-accent-rgb) / 0.38)",
  "rgb(var(--color-deep-purple-rgb) / 0.32)",
  "rgb(var(--color-primary-rgb) / 0.28)",
  "rgb(var(--color-purple-rgb) / 0.28)",
  "rgb(var(--color-indigo-rgb) / 0.28)",
];

const QUEEN_COLORS = [
  "var(--color-primary)",
  "var(--color-indigo)",
  "var(--color-purple)",
  "var(--color-accent)",
  "var(--color-deep-purple)",
  "var(--color-primary)",
  "var(--color-purple)",
  "var(--color-indigo)",
];

function getQueenConflicts(cells: CellState[][], puzzle: QueensPuzzle): Set<string> {
  const { size, regions } = puzzle;
  const queens: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cells[r][c] === 2) queens.push([r, c]);
    }
  }
  const conflicts = new Set<string>();
  for (let i = 0; i < queens.length; i++) {
    for (let j = i + 1; j < queens.length; j++) {
      const [r1, c1] = queens[i];
      const [r2, c2] = queens[j];
      const sameRow = r1 === r2;
      const sameCol = c1 === c2;
      const sameRegion = regions[r1][c1] === regions[r2][c2];
      const adjacent = Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1;
      if (sameRow || sameCol || sameRegion || adjacent) {
        conflicts.add(`${r1}-${c1}`);
        conflicts.add(`${r2}-${c2}`);
      }
    }
  }
  return conflicts;
}

function checkSolved(cells: CellState[][], puzzle: QueensPuzzle): boolean {
  const { size, regions } = puzzle;
  const queens: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (cells[r][c] === 2) queens.push([r, c]);
    }
  }
  if (queens.length !== size) return false;
  const regionSet = new Set<number>();
  for (const [r, c] of queens) regionSet.add(regions[r][c]);
  if (regionSet.size !== size) return false;
  return getQueenConflicts(cells, puzzle).size === 0;
}

const QueensRenderer = ({ puzzle, onSolved, autoCheck = false }: Props) => {
  const { size, regions, hint } = puzzle;
  const [cells, setCells] = useState<CellState[][]>(() =>
    Array.from({ length: size }, () => Array(size).fill(0))
  );
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [localAutoCheck, setLocalAutoCheck] = useState(autoCheck);
  const [focusedCell, setFocusedCell] = useState<[number, number]>([0, 0]);
  const [pressedCell, setPressedCell] = useState<string | null>(null);
  const tapTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const conflicts = localAutoCheck ? getQueenConflicts(cells, puzzle) : new Set<string>();

  const clearTapTimers = useCallback(() => {
    tapTimers.current.forEach((timer) => clearTimeout(timer));
    tapTimers.current.clear();
  }, []);

  const clearAsyncTimers = useCallback(() => {
    if (shakeTimeoutRef.current) {
      clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = null;
    }
    if (solveTimeoutRef.current) {
      clearTimeout(solveTimeoutRef.current);
      solveTimeoutRef.current = null;
    }
  }, []);

  const resetBoard = useCallback(() => {
    clearTapTimers();
    clearAsyncTimers();
    setCells(Array.from({ length: size }, () => Array(size).fill(0)));
    setAttempts(0);
    setHintsUsed(0);
    setShowHint(false);
    setShake(null);
    setSolved(false);
    setFocusedCell([0, 0]);
    setPressedCell(null);
    setLocalAutoCheck(autoCheck);
  }, [autoCheck, clearAsyncTimers, clearTapTimers, size]);

  useEffect(() => {
    resetBoard();
  }, [puzzle.id, resetBoard]);

  useEffect(() => {
    return () => {
      clearTapTimers();
      clearAsyncTimers();
    };
  }, [clearAsyncTimers, clearTapTimers]);

  const resolveQueenAction = useCallback(
    (next: CellState[][], row: number, col: number) => {
      const wasQueen = next[row][col] === 2;
      next[row][col] = wasQueen ? 0 : 2;

      if (wasQueen) {
        playTap();
        return;
      }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (checkSolved(next, puzzle)) {
        setSolved(true);
        playWin();
        solveTimeoutRef.current = setTimeout(() => onSolved(newAttempts, hintsUsed), 600);
        return;
      }

      playQueen();
      if (localAutoCheck) {
        const newConflicts = getQueenConflicts(next, puzzle);
        if (newConflicts.size > 0) {
          playConflict();
          setShake(`${row}-${col}`);
          if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
          shakeTimeoutRef.current = setTimeout(() => setShake(null), 500);
        }
      }
    },
    [attempts, hintsUsed, localAutoCheck, onSolved, puzzle]
  );

  const handleCellTap = useCallback(
    (row: number, col: number) => {
      if (solved) return;
      const key = `${row}-${col}`;

      if (tapTimers.current.has(key)) {
        clearTimeout(tapTimers.current.get(key)!);
        tapTimers.current.delete(key);
        setCells((prev) => {
          const next = prev.map((r) => [...r]);
          resolveQueenAction(next, row, col);
          return next;
        });
        return;
      }

      const timer = setTimeout(() => {
        tapTimers.current.delete(key);
        setCells((prev) => {
          const next = prev.map((r) => [...r]);
          const cur = next[row][col];
          if (cur === 0) {
            playMark();
            next[row][col] = 1;
          } else if (cur === 1) {
            resolveQueenAction(next, row, col);
          } else {
            playTap();
            next[row][col] = 0;
          }
          return next;
        });
      }, 250);
      tapTimers.current.set(key, timer);
    },
    [resolveQueenAction, solved]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (solved) return;
      const [r, c] = focusedCell;
      switch (e.key) {
        case "ArrowUp":    e.preventDefault(); setFocusedCell([Math.max(0, r - 1), c]); break;
        case "ArrowDown":  e.preventDefault(); setFocusedCell([Math.min(size - 1, r + 1), c]); break;
        case "ArrowLeft":  e.preventDefault(); setFocusedCell([r, Math.max(0, c - 1)]); break;
        case "ArrowRight": e.preventDefault(); setFocusedCell([r, Math.min(size - 1, c + 1)]); break;
        case " ":
        case "Enter":
          e.preventDefault();
          handleCellTap(r, c);
          break;
        case "Backspace":
        case "Delete":
          e.preventDefault();
          setCells((prev) => {
            const next = prev.map((row) => [...row]);
            next[r][c] = 0;
            return next;
          });
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedCell, size, solved, handleCellTap]);

  const handleReset = () => {
    resetBoard();
  };

  const handleHint = () => {
    setHintsUsed((h) => h + 1);
    setShowHint(true);
  };

  const handleClearFocused = () => {
    const [r, c] = focusedCell;
    setCells((prev) => {
      const next = prev.map((row) => [...row]);
      next[r][c] = 0;
      return next;
    });
    playTap();
  };

  const cellSize = size <= 4 ? "h-16 w-16" : size <= 5 ? "h-14 w-14" : size <= 6 ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className="flex flex-1 flex-col">
      <GlassCard elevated className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Queens Puzzle</p>
            <p className="text-sm text-foreground font-medium mt-0.5">One queen per region, row & column</p>
          </div>
          <button
            onClick={() => setLocalAutoCheck((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground"
            data-testid="toggle-autocheck"
          >
            {localAutoCheck ? (
              <ToggleRight size={20} className="text-primary" />
            ) : (
              <ToggleLeft size={20} />
            )}
            <span>{localAutoCheck ? "Check: On" : "Check: Off"}</span>
          </button>
        </div>

        <div className="flex justify-center">
          <div
            className="inline-grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${size}, 1fr)`,
              perspective: "600px",
            }}
            data-testid="queens-grid"
          >
            {cells.map((row, r) =>
              row.map((cell, c) => {
                const region = regions[r][c];
                const colorIdx = (region - 1) % REGION_BG.length;
                const isConflict = conflicts.has(`${r}-${c}`);
                const isShaking = shake === `${r}-${c}`;
                const isFocused = focusedCell[0] === r && focusedCell[1] === c;
                const isPressed = pressedCell === `${r}-${c}`;
                const isQueen = cell === 2;

                return (
                  <motion.button
                    key={`${r}-${c}`}
                    data-testid={`cell-${r}-${c}`}
                    animate={isShaking ? { x: [-4, 4, -4, 4, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    onClick={() => { setFocusedCell([r, c]); handleCellTap(r, c); }}
                    onPointerDown={() => setPressedCell(`${r}-${c}`)}
                    onPointerUp={() => setPressedCell(null)}
                    onPointerLeave={() => setPressedCell(null)}
                    onFocus={() => setFocusedCell([r, c])}
                    className={`
                      ${cellSize} flex items-center justify-center select-none
                      border-2 transition-none
                      ${isConflict ? "queens-tile-conflict" : ""}
                      ${isQueen && !isConflict ? "queens-tile-queen" : ""}
                      ${!isQueen && !isConflict ? (isPressed ? "queens-tile-pressed" : "queens-tile") : ""}
                      ${isFocused && !isConflict ? "ring-2 ring-primary ring-offset-1 ring-offset-background" : ""}
                    `}
                    style={{
                      borderRadius: "0.5rem",
                      background: REGION_BG[colorIdx],
                      borderColor: isConflict ? "rgb(var(--color-accent-rgb) / 0.55)" : REGION_BORDER[colorIdx],
                    }}
                  >
                    {cell === 1 && (
                      <X
                        size={size <= 5 ? 18 : 14}
                        className="font-bold"
                        strokeWidth={3}
                        style={{ color: "rgb(var(--color-dark-gray-rgb) / 0.55)", filter: "drop-shadow(0 1px 2px rgb(var(--color-dark-gray-rgb) / 0.28))" }}
                      />
                    )}
                    {isQueen && (
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      >
                        <Crown
                          size={size <= 5 ? 22 : 18}
                          className=""
                          fill="currentColor"
                          style={{ color: QUEEN_COLORS[colorIdx], filter: "drop-shadow(0 2px 6px rgb(var(--color-primary-rgb) / 0.26)) drop-shadow(0 1px 3px rgb(var(--color-dark-gray-rgb) / 0.22))" }}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <span>Tap → <X size={10} className="inline" /> Mark</span>
          <span>Tap again → <Crown size={10} className="inline" /> Queen</span>
          <span>Tap again → Clear</span>
        </div>
      </GlassCard>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <GlassCard className="border-primary/30 bg-primary/5">
              <p className="text-sm text-primary">💡 {hint}</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 flex items-center gap-2 rounded-2xl bg-success/10 border border-success/30 px-4 py-3"
            style={{
              boxShadow: "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.08), 0 0 24px rgb(var(--color-indigo-rgb) / 0.20)",
            }}
          >
            <Crown size={20} className="text-success" fill="currentColor" />
            <span className="text-sm font-semibold text-success">Brilliant! All queens placed perfectly! 👑</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto flex gap-3 mb-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleReset}
          className="btn-secondary-3d flex flex-1 items-center justify-center gap-2 py-4 font-semibold text-foreground"
          data-testid="button-reset"
        >
          <RotateCcw size={18} /> Reset
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleClearFocused}
          className="btn-secondary-3d flex flex-1 items-center justify-center gap-2 py-4 font-semibold text-foreground"
          data-testid="button-clear-cell"
        >
          <X size={18} /> Clear Cell
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleHint}
          disabled={showHint}
          className="btn-secondary-3d flex flex-1 items-center justify-center gap-2 py-4 font-semibold text-foreground disabled:opacity-40"
          data-testid="button-hint"
        >
          <Lightbulb size={18} className="text-secondary" /> Hint
        </motion.button>
      </div>
    </div>
  );
};

export default QueensRenderer;
