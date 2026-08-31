const SETTINGS_KEY = "puzzdaily_settings";

export interface AppSettings {
  soundEnabled: boolean;
  streakFreezeAvailable: boolean;
  streakFreezeUsedDate: string | null;
  tutorialSeen: Record<string, boolean>;
}

const defaults: AppSettings = {
  soundEnabled: true,
  streakFreezeAvailable: true,
  streakFreezeUsedDate: null,
  tutorialSeen: {},
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch {
    return { ...defaults };
  }
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function updateSettings(patch: Partial<AppSettings>) {
  const current = loadSettings();
  saveSettings({ ...current, ...patch });
}

export function isTutorialSeen(type: string): boolean {
  return loadSettings().tutorialSeen[type] === true;
}

export function markTutorialSeen(type: string) {
  const s = loadSettings();
  saveSettings({ ...s, tutorialSeen: { ...s.tutorialSeen, [type]: true } });
}

export function isSoundEnabled(): boolean {
  return loadSettings().soundEnabled;
}

export function toggleSound(): boolean {
  const s = loadSettings();
  const next = !s.soundEnabled;
  saveSettings({ ...s, soundEnabled: next });
  return next;
}

export function useStreakFreeze(): boolean {
  const s = loadSettings();
  const today = new Date().toISOString().split("T")[0];
  if (!s.streakFreezeAvailable || s.streakFreezeUsedDate === today) return false;
  saveSettings({ ...s, streakFreezeAvailable: false, streakFreezeUsedDate: today });
  return true;
}

export function resetAllProgress() {
  localStorage.removeItem("puzzdaily_stats");
  localStorage.removeItem("puzzdaily_daily");
  localStorage.removeItem("puzzdaily_daily_v3");
  const s = loadSettings();
  saveSettings({ ...s, streakFreezeAvailable: true, streakFreezeUsedDate: null });
}
