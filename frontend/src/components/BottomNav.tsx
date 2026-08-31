import { useLocation, useNavigate } from "react-router-dom";
import { Home, Layers, BarChart3, Settings } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/modes", icon: Layers, label: "Modes" },
  { path: "/stats", icon: BarChart3, label: "Stats" },
  { path: "/settings", icon: Settings, label: "Settings" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (["/play", "/results"].includes(location.pathname)) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-glass-border/70 backdrop-blur-2xl"
      style={{
        background: "rgb(var(--color-white-rgb) / 0.92)",
        boxShadow:
          "inset 0 1px 0 rgb(var(--color-white-rgb) / 0.82), 0 -4px 24px rgb(var(--color-dark-gray-rgb) / 0.12), 0 -1px 6px rgb(var(--color-muted-rgb) / 0.24)",
      }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[env(safe-area-inset-bottom,8px)] pt-2">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="relative flex flex-col items-center gap-1 px-4 py-2"
              data-testid={`nav-${label.toLowerCase()}`}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 h-0.5 w-8 rounded-full bg-primary"
                  style={{
                    boxShadow: "0 0 8px rgb(var(--color-primary-rgb) / 0.42), 0 0 16px rgb(var(--color-purple-rgb) / 0.24)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={active ? { y: -2 } : { y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={
                  active
                    ? {
                        filter: "drop-shadow(0 3px 8px rgb(var(--color-primary-rgb) / 0.32)) drop-shadow(0 1px 3px rgb(var(--color-purple-rgb) / 0.22))",
                      }
                    : undefined
                }
              >
                <Icon size={22} className={active ? "text-primary" : "text-muted-foreground"} />
              </motion.div>
              <span
                className={`text-[10px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
