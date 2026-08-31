import { isSoundEnabled } from "@/features/settings/model/settingsStore";

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!isSoundEnabled()) return null;

  try {
    if (!audioContext) {
      audioContext = new (
        window.AudioContext ||
        (window as Window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      )();
    }

    return audioContext;
  } catch {
    return null;
  }
}

function playTone(
  frequency: number,
  duration: number,
  oscillatorType: OscillatorType = "sine",
  volume = 0.18,
) {
  const context = getAudioContext();
  if (!context) return;

  try {
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = oscillatorType;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    gainNode.gain.setValueAtTime(volume, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration);
  } catch {
    // Ignore audio failures on unsupported devices.
  }
}

function vibrate(pattern: number | number[]) {
  try {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Ignore vibration failures.
  }
}

export function playTap() {
  playTone(440, 0.06, "sine", 0.1);
  vibrate(8);
}

export function playMark() {
  playTone(320, 0.08, "triangle", 0.12);
  vibrate(12);
}

export function playQueen() {
  playTone(660, 0.1, "sine", 0.15);
  setTimeout(() => playTone(880, 0.08, "sine", 0.1), 80);
  vibrate(25);
}

export function playConflict() {
  playTone(200, 0.12, "sawtooth", 0.08);
  vibrate([30, 20, 30]);
}

export function playWin() {
  const notes = [523, 659, 784, 1047];
  notes.forEach((note, index) => setTimeout(() => playTone(note, 0.25, "sine", 0.18), index * 100));
  vibrate([40, 30, 40, 30, 80]);
}

export function playSelect() {
  playTone(500, 0.07, "sine", 0.1);
  vibrate(10);
}

export function playCorrect() {
  playTone(740, 0.12, "sine", 0.16);
  setTimeout(() => playTone(988, 0.1, "sine", 0.14), 100);
  vibrate(30);
}

export function playWrong() {
  playTone(250, 0.14, "sawtooth", 0.1);
  vibrate([20, 15, 20]);
}
