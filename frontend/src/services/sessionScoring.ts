export function scoreForPuzzle(attemptCount: number, skipped = false): number {
  if (skipped) return 0;
  return Math.max(20, 120 - Math.max(0, attemptCount - 1) * 20);
}
