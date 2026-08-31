import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QueensRenderer from "@/features/puzzles/components/QueensRenderer";
import type { QueensPuzzle } from "@/features/puzzles/model/puzzleEngine";
import React from "react";

vi.mock("framer-motion", () => {
  const createMock = (tag: keyof JSX.IntrinsicElements) =>
    React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ children, ...props }, ref) =>
      React.createElement(tag, { ...props, ref }, children)
    );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: createMock("div"),
      button: createMock("button"),
    },
  };
});

vi.mock("@/services/soundEffects", () => ({
  playTap: vi.fn(),
  playMark: vi.fn(),
  playQueen: vi.fn(),
  playConflict: vi.fn(),
  playWin: vi.fn(),
}));

const basePuzzle: QueensPuzzle = {
  id: "test-queens-a",
  type: "queens",
  difficulty: "easy",
  title: "Test Queens A",
  size: 4,
  regions: [
    [1, 2, 3, 4],
    [2, 3, 4, 1],
    [3, 4, 1, 2],
    [4, 1, 2, 3],
  ],
  solution: [[0, 0], [1, 2], [2, 1], [3, 3]],
  hint: "test hint",
};

const regionConflictPuzzle: QueensPuzzle = {
  id: "test-queens-region",
  type: "queens",
  difficulty: "easy",
  title: "Region Conflict",
  size: 4,
  regions: [
    [1, 2, 3, 4],
    [2, 2, 4, 1],
    [3, 4, 2, 2],
    [4, 1, 3, 4],
  ],
  solution: [[0, 0], [1, 2], [2, 1], [3, 3]],
  hint: "test hint",
};

const nextPuzzle: QueensPuzzle = {
  ...basePuzzle,
  id: "test-queens-b",
  title: "Test Queens B",
};

describe("QueensRenderer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("cycles a cell from mark to queen on consecutive taps", () => {
    render(<QueensRenderer puzzle={basePuzzle} onSolved={vi.fn()} />);
    const cell = screen.getByTestId("cell-0-0");

    fireEvent.click(cell);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(cell.innerHTML).toContain("lucide-x");

    fireEvent.click(cell);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(cell.innerHTML).toContain("lucide-crown");
  });

  it("flags queens placed in the same region when auto-check is enabled", () => {
    render(<QueensRenderer puzzle={regionConflictPuzzle} onSolved={vi.fn()} autoCheck />);
    const firstCell = screen.getByTestId("cell-1-1");
    const secondCell = screen.getByTestId("cell-2-2");

    act(() => {
      fireEvent.click(firstCell);
      vi.advanceTimersByTime(300);
    });
    act(() => {
      fireEvent.click(firstCell);
      vi.advanceTimersByTime(300);
    });

    act(() => {
      fireEvent.click(secondCell);
      vi.advanceTimersByTime(300);
    });
    act(() => {
      fireEvent.click(secondCell);
      vi.advanceTimersByTime(300);
      vi.advanceTimersByTime(600);
    });

    expect(firstCell.className).toContain("queens-tile-conflict");
    expect(secondCell.className).toContain("queens-tile-conflict");
  });

  it("resets board state when the puzzle changes", () => {
    const { rerender } = render(<QueensRenderer puzzle={basePuzzle} onSolved={vi.fn()} />);
    const cell = screen.getByTestId("cell-0-0");

    fireEvent.click(cell);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    fireEvent.click(cell);
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(cell.innerHTML).toContain("lucide-crown");

    rerender(<QueensRenderer puzzle={nextPuzzle} onSolved={vi.fn()} />);

    const resetCell = screen.getByTestId("cell-0-0");
    expect(resetCell.innerHTML).not.toContain("lucide-crown");
    expect(resetCell.innerHTML).not.toContain("lucide-x");
  });
});
