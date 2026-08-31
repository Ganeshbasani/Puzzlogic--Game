const DAILY_KEY = "puzzdaily_daily_v3";

export interface DailyResult {
  timeTaken: number;
  attempts: number;
  hintsUsed: number;
  solved: boolean;
  puzzleType: string;
}

interface DailyData {
  date: string;
  completed: boolean;
  puzzleId: string;
  result?: DailyResult;
}

export function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDailyData(): DailyData | null {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    const data: DailyData = JSON.parse(raw);
    if (data.date === getTodayKey()) return data;
    return null;
  } catch {
    return null;
  }
}

export function setDailyCompleted(puzzleId: string, result: DailyResult): void {
  const data: DailyData = {
    date: getTodayKey(),
    completed: true,
    puzzleId,
    result,
  };
  localStorage.setItem(DAILY_KEY, JSON.stringify(data));
}

export function isDailyCompleted(): boolean {
  return getDailyData()?.completed ?? false;
}

export function getSecondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

export function getSimulatedPlayerCount(puzzleNumber: number): number {
  const base = 1847;
  const seed = (puzzleNumber * 1301 + 419) % 2800;
  return base + seed;
}

export function getPercentile(timeTaken: number, puzzleType: string): number {
  const avgTimes: Record<string, number> = {
    queens: 210,
    pinpoint: 90,
    riddle: 75,
    grid: 150,
    word: 60,
  };
  const avg = avgTimes[puzzleType] ?? 150;
  const ratio = timeTaken / avg;
  if (ratio < 0.4) return 95;
  if (ratio < 0.6) return 88;
  if (ratio < 0.8) return 78;
  if (ratio < 1.0) return 65;
  if (ratio < 1.3) return 52;
  if (ratio < 1.6) return 40;
  if (ratio < 2.0) return 28;
  return 18;
}
