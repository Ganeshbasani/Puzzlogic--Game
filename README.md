# 🧩 Puzzlogic Game

> A polished, mobile-first daily puzzle platform designed for short, rewarding brain-training sessions.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)

**🚀 Live Application:**  
https://puzzlogic-game-ja4v.onrender.com/modes

**📦 GitHub Repository:**  
https://github.com/Ganeshbasani/Puzzlogic--Game

---

## 📸 Application Showcase

Puzzlogic is designed as a responsive, mobile-first puzzle experience with a clean interface, focused interactions, progress tracking, and multiple puzzle categories.

### 🏠 Dashboard • 🎮 Game Modes • 🧩 Number Grid

| Dashboard | Game Modes | Number Grid |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/home-dashboard.png" width="280" alt="Puzzlogic Home Dashboard" /> | <img src="./docs/screenshots/game-modes.png" width="280" alt="Puzzlogic Game Modes" /> | <img src="./docs/screenshots/gameplay-grid.png" width="280" alt="Number Grid Gameplay" /> |

### 🎯 Pinpoint • 📖 How to Play • 📊 Statistics

| Pinpoint | How to Play | Statistics |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/gameplay-pinpoint.png" width="280" alt="Pinpoint Puzzle Gameplay" /> | <img src="./docs/screenshots/how-to-play.png" width="280" alt="How to Play Tutorial" /> | <img src="./docs/screenshots/statistics.png" width="280" alt="Puzzlogic Statistics" /> |

---

# 📌 Overview

**Puzzlogic Game** is a full-stack-ready, mobile-first daily logic puzzle platform built around the idea of making brain training simple, engaging, and repeatable.

The application combines several puzzle categories into a single experience and provides multiple ways to play, including daily puzzles, practice sessions, timed challenges, and historical puzzle replay.

The frontend is implemented using **React + TypeScript + Vite**, with a modular feature-based architecture designed to keep game logic, UI components, state management, and services separated.

The repository also contains a structured **Node.js + TypeScript + Prisma backend** that provides the foundation for authentication, game sessions, leaderboard functionality, and persistent server-side data.

---

# ✨ Key Features

## 🧠 Multiple Puzzle Categories

Puzzlogic provides several puzzle styles designed to test different types of reasoning.

### 👑 Queens

A spatial and logical deduction puzzle where players must place queens while respecting the game's constraints.

### 🎯 Pinpoint

A word-association and deduction puzzle where players progressively identify the relationship between clues.

### 🧩 Number Grid

A quantitative logic puzzle based on identifying and completing number patterns.

### 💡 Logic Riddle

A lateral-thinking puzzle focused on interpreting clues and reaching the correct logical conclusion.

Each puzzle type has its own dedicated renderer and gameplay logic.

---

# 🎮 Game Modes

## 📅 Daily

The primary Puzzlogic experience.

Players receive a daily puzzle session designed to encourage consistent engagement.

Features include:

- Daily puzzle generation
- Session progression
- Completion tracking
- Streak tracking
- Score calculation
- Daily countdown
- Persistent completion state

---

## 🏋️ Practice

Practice mode allows players to replay puzzles without the restrictions of the daily cycle.

Players can select:

- Puzzle category
- Difficulty
- Practice configuration

This mode is designed for learning and improving puzzle-solving ability.

---

## ⚡ Challenge

Challenge mode focuses on faster puzzle solving and score-oriented gameplay.

The mode introduces time-based pressure and scoring mechanics designed to encourage players to improve both:

- Accuracy
- Completion speed

---

## 🗂️ Archive

Archive mode allows players to revisit previous puzzle sessions.

This provides access to historical puzzles instead of limiting the application to the current daily session.

---

# 📊 Progress & Statistics

Puzzlogic tracks player performance locally and presents it through a dedicated statistics experience.

Tracked information includes:

- Games completed
- Accuracy
- Current streak
- Best streak
- Performance trends
- Puzzle activity
- Scores
- Completion history

The statistics interface provides players with feedback about their improvement over time.

---

# 🔥 Streak System

The daily experience is designed around consistent participation.

The application tracks daily completion and maintains player streak information.

The streak system includes:

- Current streak
- Best streak
- Daily completion state
- Automatic daily transitions
- Countdown until the next daily session

This creates a simple habit loop without requiring constant server communication.

---

# ⏱️ Daily Countdown

The application provides a countdown mechanism for the daily puzzle cycle.

Once the current daily session reaches its end, the application transitions toward the next daily puzzle state.

This functionality is handled through the application's session and countdown components.

---

# 🔊 Audio Experience

Puzzlogic uses the **Web Audio API** to generate interface and gameplay sound effects programmatically.

Instead of relying on large collections of static audio files, sound effects are generated dynamically.

This approach helps:

- Reduce asset size
- Keep the application lightweight
- Provide immediate feedback
- Avoid unnecessary audio downloads

Sound effects are encapsulated inside the application's sound service.

---

# 💾 Offline-First Client Persistence

The frontend uses browser-based persistence to retain important gameplay information.

Persisted state includes areas such as:

- Daily progress
- Statistics
- Game settings
- Active gameplay state
- Streak information
- User preferences

This allows the core gameplay experience to remain functional without requiring every interaction to communicate with a backend server.

---

# 📱 Responsive & Mobile-First UI

The application is designed primarily around a mobile puzzle experience while remaining responsive on larger screens.

The UI includes:

- Responsive layouts
- Mobile navigation
- Touch-friendly controls
- Adaptive puzzle rendering
- Responsive cards
- Progress indicators
- Accessible interactive elements

The application also includes dedicated responsive utilities and mobile detection hooks.

---

# 🎨 UI Architecture

The frontend uses reusable UI primitives and domain-specific components.

The interface includes reusable components for:

- Cards
- Buttons
- Dialogs
- Forms
- Inputs
- Navigation
- Progress indicators
- Badges
- Toasts
- Tooltips
- Drawers
- Tables
- Tabs
- Menus

The project also contains a reusable component library under:

```text
frontend/src/components/ui/
