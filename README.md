# 🧩 Puzzlogic Game

> A polished, mobile-first daily puzzle platform designed for short, rewarding brain-training sessions.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)

### 🚀 Live Application

**[▶️ Play Puzzlogic Game](https://puzzlogic-game-ja4v.onrender.com/modes)**

**[📦 View Source Code](https://github.com/Ganeshbasani/Puzzlogic--Game)**

---

## 📸 Application Showcase

The application is designed around a clean, mobile-first interface with focused interactions and minimal friction between puzzle sessions.

### 🏠 Dashboard • 🎮 Game Modes • 🧩 Number Grid

| 🏠 Dashboard | 🎮 Game Modes | 🧩 Number Grid |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/home-dashboard.png" width="260" alt="Puzzlogic Home Dashboard" /> | <img src="./docs/screenshots/game-modes.png" width="260" alt="Puzzlogic Game Modes" /> | <img src="./docs/screenshots/gameplay-grid.png" width="260" alt="Puzzlogic Number Grid Gameplay" /> |

### 🎯 Pinpoint • 📖 How To Play • 📊 Statistics

| 🎯 Pinpoint | 📖 Interactive Tutorial | 📊 Statistics |
|:---:|:---:|:---:|
| <img src="./docs/screenshots/gameplay-pinpoint.png" width="260" alt="Puzzlogic Pinpoint Gameplay" /> | <img src="./docs/screenshots/how-to-play.png" width="260" alt="Puzzlogic How To Play" /> | <img src="./docs/screenshots/statistics.png" width="260" alt="Puzzlogic Statistics Dashboard" /> |

### ⚙️ Settings

<p align="center">
  <img src="./docs/screenshots/settings.png" width="260" alt="Puzzlogic Settings" />
</p>

---

# 📌 Overview

**Puzzlogic Game** is a full-stack-ready daily logic puzzle platform built as a structured monorepo.

The primary client application, **PuzzDaily**, focuses on delivering short, repeatable puzzle sessions through deterministic daily challenges, multiple puzzle categories, practice modes, progress tracking, responsive UI, and offline persistence.

The project combines a production-oriented React frontend with a structured Node.js/TypeScript backend architecture and Prisma data layer.

The architecture is intentionally modular so additional capabilities such as authentication, cloud synchronization, persistent leaderboards, and server-backed game sessions can be expanded without restructuring the entire application.

---

# ✨ Core Features

## 🧠 Multiple Puzzle Categories

Puzzlogic provides several puzzle formats designed to test different reasoning skills.

### ♛ Queens

A spatial constraint puzzle where players place queens while respecting row, column, and region constraints.

**Skills tested:**

- Spatial reasoning
- Constraint solving
- Pattern recognition
- Logical elimination

### 🎯 Pinpoint

A word-association and deduction puzzle where players progressively identify the intended connection.

**Skills tested:**

- Vocabulary
- Association
- Deductive reasoning
- Pattern recognition

### 🧩 Number Grid

A quantitative logic puzzle based around numerical relationships and grid-based reasoning.

**Skills tested:**

- Numerical reasoning
- Pattern recognition
- Logical deduction
- Problem solving

### 💡 Logic Riddle

A deduction-focused puzzle format where players interpret clues and determine the most logical answer.

**Skills tested:**

- Critical thinking
- Deduction
- Reading comprehension
- Lateral thinking

---

# 🎮 Game Modes

## 📅 Daily

The primary PuzzDaily experience.

Players receive a structured daily puzzle experience with:

- Daily puzzle generation
- Difficulty progression
- Session scoring
- Streak tracking
- Completion state
- Countdown to the next daily session

The deterministic generation model ensures that the same daily puzzle can be reproduced consistently.

---

## 🏋️ Practice

Practice mode allows players to continue playing outside the daily session.

Players can select:

- Puzzle category
- Difficulty
- Practice configuration

This mode provides unlimited opportunities to improve individual puzzle skills.

---

## ⚡ Challenge

A more performance-focused mode designed around speed and scoring.

The challenge experience emphasizes:

- Timed sessions
- Accuracy
- Completion speed
- Score optimization
- Performance comparison

---

## 🗂️ Archive

Archive mode allows previously generated daily sessions to be revisited.

This provides historical replayability without affecting the primary daily progression flow.

---

# 📊 Progress & Statistics

Puzzlogic tracks player performance locally and presents it through a dedicated statistics experience.

Tracked metrics include:

- Total games played
- Games completed
- Accuracy
- Current streak
- Best streak
- Performance history
- Weekly activity
- Puzzle-specific performance

The statistics interface provides players with feedback about their consistency and improvement over time.

---

# 🔥 Streak System

The daily experience is designed around a lightweight habit loop.

```text
Daily Puzzle
     ↓
Complete Session
     ↓
Record Result
     ↓
Update Streak
     ↓
Track Performance
     ↓
Return Tomorrow
