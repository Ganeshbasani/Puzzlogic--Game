import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Volume2, VolumeX, Shield, Trash2, Info, ChevronRight, Snowflake } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import PuzzDailyLogo from "@/components/PuzzDailyLogo";
import { loadSettings, toggleSound, resetAllProgress, markTutorialSeen } from "@/features/settings/model/settingsStore";
import { toast } from "sonner";
import "@/styles/components/puzzDailyLogo.css";

const Settings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(loadSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSettings((s) => ({ ...s, soundEnabled: next }));
    toast(next ? "Sound on 🔊" : "Sound off 🔇");
  };

  const handleResetTutorials = () => {
    const s = loadSettings();
    const cleared = { ...s, tutorialSeen: {} };
    localStorage.setItem("puzzdaily_settings", JSON.stringify(cleared));
    setSettings(cleared);
    toast.success("Tutorials reset — they'll show next time you play each type.");
  };

  const handleResetProgress = () => {
    resetAllProgress();
    setSettings(loadSettings());
    setShowResetConfirm(false);
    toast.success("Progress reset. Fresh start! 🌊");
    setTimeout(() => navigate("/"), 1200);
  };

  const rows = [
    {
      group: "Preferences",
      items: [
        {
          icon: settings.soundEnabled ? Volume2 : VolumeX,
          iconColor: "text-primary",
          label: "Sound Effects",
          desc: "Tap sounds and win chimes",
          right: (
            <div
              className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${settings.soundEnabled ? "bg-primary" : "bg-muted"}`}
              onClick={handleToggleSound}
            >
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform duration-200 ${settings.soundEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
            </div>
          ),
          onClick: handleToggleSound,
        },
      ],
    },
    {
      group: "Game",
      items: [
        {
          icon: Snowflake,
          iconColor: "text-primary",
          label: "Streak Freeze",
          desc: settings.streakFreezeAvailable ? "1 freeze available — skips a missed day" : "Used · Resets after next daily solve",
          right: (
            <span className={`text-xs font-medium px-2 py-1 rounded-lg ${settings.streakFreezeAvailable ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
              {settings.streakFreezeAvailable ? "Ready" : "Used"}
            </span>
          ),
          onClick: undefined as (() => void) | undefined,
        },
        {
          icon: Shield,
          iconColor: "text-accent",
          label: "Reset Tutorials",
          desc: "Show how-to-play again for each puzzle type",
          right: <ChevronRight size={16} className="text-muted-foreground" />,
          onClick: handleResetTutorials,
        },
      ],
    },
    {
      group: "Data",
      items: [
        {
          icon: Trash2,
          iconColor: "text-destructive",
          label: "Reset All Progress",
          desc: "Erase stats, streaks, and results permanently",
          right: <ChevronRight size={16} className="text-muted-foreground" />,
          onClick: () => setShowResetConfirm(true),
        },
      ],
    },
    {
      group: "About",
      items: [
        {
          icon: Info,
          iconColor: "text-muted-foreground",
          label: "",
          desc: "Version 1.0 · Daily puzzle challenge",
          right: <PuzzDailyLogo compact className="pointer-events-none" />,
          onClick: undefined as (() => void) | undefined,
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col px-4 pt-12 safe-bottom">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-center gap-3"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground"
          data-testid="button-back"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground">Customize your experience</p>
        </div>
      </motion.div>

      {rows.map(({ group, items }, gi) => (
        <motion.div
          key={group}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: gi * 0.06 }}
          className="mb-5"
        >
          <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group}</p>
          <GlassCard className="overflow-hidden p-0">
            {items.map((item, ii) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-muted/30 active:bg-muted/50"
                    onClick={item.onClick}
                    disabled={!item.onClick}
                    data-testid={`setting-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Icon size={18} className={item.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.label ? <p className="text-sm font-semibold text-foreground">{item.label}</p> : null}
                      <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                    </div>
                    {item.right}
                  </button>
                  {ii < items.length - 1 && <div className="mx-4 border-t border-glass-border" />}
                </div>
              );
            })}
          </GlassCard>
        </motion.div>
      ))}

      {/* Reset confirm dialog */}
      {showResetConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl border border-glass-border bg-card p-6 text-center shadow-glass-elevated"
          >
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Reset everything?</h3>
            <p className="text-sm text-muted-foreground mb-6">
              This will permanently delete all your stats, streaks, and results. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 rounded-2xl border border-glass-border bg-glass/80 py-3 text-sm font-semibold text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="flex-1 rounded-2xl bg-destructive py-3 text-sm font-semibold text-destructive-foreground"
                data-testid="button-confirm-reset"
              >
                Reset All
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Settings;
