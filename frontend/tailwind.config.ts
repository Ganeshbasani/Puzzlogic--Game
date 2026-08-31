import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        input: "rgb(var(--color-light-blue-rgb) / <alpha-value>)",
        ring: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        background: "rgb(var(--color-bg-rgb) / <alpha-value>)",
        foreground: "rgb(var(--color-black-rgb) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-white-rgb) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-purple-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-white-rgb) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-white-rgb) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--color-indigo-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-white-rgb) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--color-muted-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-dark-gray-rgb) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-white-rgb) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--color-white-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-black-rgb) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--color-white-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-black-rgb) / <alpha-value>)",
        },
        glass: {
          DEFAULT: "rgb(var(--color-white-rgb) / <alpha-value>)",
          border: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        },
        sidebar: {
          DEFAULT: "rgb(var(--color-white-rgb) / <alpha-value>)",
          foreground: "rgb(var(--color-black-rgb) / <alpha-value>)",
          primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
          "primary-foreground": "rgb(var(--color-white-rgb) / <alpha-value>)",
          accent: "rgb(var(--color-light-blue-rgb) / <alpha-value>)",
          "accent-foreground": "rgb(var(--color-dark-gray-rgb) / <alpha-value>)",
          border: "rgb(var(--color-muted-rgb) / <alpha-value>)",
          ring: "rgb(var(--color-primary-rgb) / <alpha-value>)",
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "2xl": "1rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass: "var(--shadow-glass)",
        "glass-elevated": "var(--shadow-glass-elevated)",
        glow: "var(--shadow-pulse-high)",
        "glow-coral": "var(--shadow-streak)",
        "3d-sm": "var(--shadow-badge)",
        "3d": "var(--shadow-secondary)",
        "3d-lg": "var(--shadow-primary)",
        "3d-inset": "var(--shadow-secondary-active)",
        tile: "var(--shadow-tile)",
        "tile-queen": "var(--shadow-tile-queen)",
        "tile-conflict": "var(--shadow-tile-conflict)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "var(--shadow-pulse-low)" },
          "50%": { boxShadow: "var(--shadow-pulse-high)" },
        },
        "streak-flame": {
          "0%, 100%": { transform: "scale(1) rotate(-3deg)" },
          "50%": { transform: "scale(1.18) rotate(3deg)" },
        },
        "float-up": {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0px)" },
        },
        "press-in": {
          "0%": { transform: "translateY(-3px)" },
          "100%": { transform: "translateY(2px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out forwards",
        shake: "shake 0.3s ease-in-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "streak-flame": "streak-flame 1.2s ease-in-out infinite",
        "float-up": "float-up 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
