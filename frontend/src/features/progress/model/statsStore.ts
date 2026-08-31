import type { GameMode, PuzzleType } from "@/features/puzzles/model/puzzleEngine";
import { loadSettings } from "@/features/settings/model/settingsStore";

export interface GameResult {
  mode: GameMode;
  puzzleType: PuzzleType;
  difficulty: string;
  timeTaken: number;
  attempts: number;
  hintsUsed: number;
  solved: boolean;
  date: string;
}

export interface ModeStats {
  totalPlayed: number;
  totalSolved: number;
  bestTime: number | null;
  avgTime: number;
  accuracy: number;
  winRate: number;
  currentStreak: number;
  bestStreak: number;
  easyWinRate: number;
  mediumWinRate: number;
  hardWinRate: number;
}

export interface WeekDay {
  dayLabel: string;
  solved: boolean;
  isToday: boolean;
}

const STORAGE_KEY = "puzzdaily_stats";

function loadResults(): GameResult[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveResults(results: GameResult[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

export function recordResult(result: GameResult) {
  const results = loadResults();
  results.push(result);
  saveResults(results);
}

function winRateForDifficulty(results: GameResult[], difficulty: string): number {
  const sub = results.filter((r) => r.difficulty === difficulty);
  if (sub.length === 0) return 0;
  return Math.round((sub.filter((r) => r.solved).length / sub.length) * 100);
}

export function getStatsForMode(mode: GameMode): ModeStats {
  const results = loadResults().filter((r) => r.mode === mode);
  if (results.length === 0) {
    return {
      totalPlayed: 0, totalSolved: 0, bestTime: null, avgTime: 0,
      accuracy: 0, winRate: 0, currentStreak: 0, bestStreak: 0,
      easyWinRate: 0, mediumWinRate: 0, hardWinRate: 0,
    };
  }
  const solved = results.filter((r) => r.solved);
  const times = solved.map((r) => r.timeTaken);

  let currentStreak = 0;
  let bestStreak = 0;

  if (mode === "daily") {
    const settings = loadSettings();
    const freezeDate = settings.streakFreezeUsedDate;

    const dates = [...new Set(solved.map((r) => r.date))].sort().reverse();
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split("T")[0];

    // Check if streak is still alive: today, yesterday, or freeze covered the gap
    const streakAlive =
      dates[0] === today ||
      dates[0] === yesterday ||
      (dates[0] === twoDaysAgo && freezeDate === yesterday);

    if (streakAlive) {
      currentStreak = 1;
      for (let i = 1; i < dates.length; i++) {
        const diffDays =
          (new Date(dates[i - 1]).getTime() - new Date(dates[i]).getTime()) / 86400000;
        // Gap of 1 = consecutive, gap of 2 with a freeze on the skipped date = still alive
        if (diffDays <= 1) {
          currentStreak++;
        } else if (diffDays === 2 && freezeDate) {
          // Check if freeze covers exactly the missed day
          const missedDay = new Date(new Date(dates[i]).getTime() + 86400000).toISOString().split("T")[0];
          if (freezeDate === missedDay) {
            currentStreak++;
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }

    let streak = 1;
    const sortedDates = [...new Set(solved.map((r) => r.date))].sort();
    for (let i = 1; i < sortedDates.length; i++) {
      const diff =
        (new Date(sortedDates[i]).getTime() - new Date(sortedDates[i - 1]).getTime()) / 86400000;
      if (diff <= 1) streak++;
      else {
        bestStreak = Math.max(bestStreak, streak);
        streak = 1;
      }
    }
    bestStreak = Math.max(bestStreak, streak, currentStreak);
  }

  return {
    totalPlayed: results.length,
    totalSolved: solved.length,
    bestTime: times.length ? Math.min(...times) : null,
    avgTime: times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
    accuracy: results.length
      ? Math.round((solved.filter((r) => r.attempts === 1).length / results.length) * 100)
      : 0,
    winRate: results.length ? Math.round((solved.length / results.length) * 100) : 0,
    currentStreak,
    bestStreak,
    easyWinRate: winRateForDifficulty(results, "easy"),
    mediumWinRate: winRateForDifficulty(results, "medium"),
    hardWinRate: winRateForDifficulty(results, "hard"),
  };
}

export function getOverallStats() {
  const results = loadResults();
  const solved = results.filter((r) => r.solved);
  return {
    totalPlayed: results.length,
    totalSolved: solved.length,
    dailyStreak: getStatsForMode("daily").currentStreak,
    bestStreak: getStatsForMode("daily").bestStreak,
  };
}

export function getWeeklyActivity(): WeekDay[] {
  const results = loadResults().filter((r) => r.mode === "daily" && r.solved);
  const solvedDates = new Set(results.map((r) => r.date));

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    return {
      dayLabel: DAY_LABELS[d.getDay()],
      solved: solvedDates.has(dateStr),
      isToday: dateStr === todayStr,
    };
  });
}
