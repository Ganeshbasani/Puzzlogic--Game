# 🧩 Puzzlogic Game

> A polished, mobile-first daily puzzle platform designed for short, rewarding brain-training sessions.

<p align="center">

  <a href="https://puzzlogic-game-ja4v.onrender.com/modes">
    <img src="https://img.shields.io/badge/🚀%20Live%20Application-Puzzlogic%20Game-4F46E5?style=for-the-badge" alt="Live Application">
  </a>

  <a href="https://github.com/Ganeshbasani/Puzzlogic--Game">
    <img src="https://img.shields.io/badge/📦%20GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>

</p>

<p align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)

</p>

---

## 🚀 Live Application

**Play Puzzlogic Game:**

https://puzzlogic-game-ja4v.onrender.com/modes

**GitHub Repository:**

https://github.com/Ganeshbasani/Puzzlogic--Game

---

## 📖 Overview

**Puzzlogic Game** is a mobile-first daily puzzle platform built to provide quick, engaging and repeatable brain-training sessions.

The application combines multiple puzzle categories, dedicated game modes, interactive tutorials, streak tracking, statistics, sound effects and persistent gameplay state into a single polished experience.

The project is structured as a modern full-stack monorepo with a production-ready frontend and backend architecture designed to support future cloud synchronization, authentication, leaderboards and persistent server-side game data.

The current deployed application focuses on the core gameplay experience and local-first persistence.

---

## ✨ Features

### 🧠 Multiple Puzzle Types

Puzzlogic provides different puzzle styles that challenge different types of reasoning:

- 👑 **Queens** — Spatial and logical placement puzzles
- 🎯 **Pinpoint** — Word association and deduction puzzles
- 🧩 **Logic Riddle** — Lateral thinking and logical reasoning
- 🔢 **Number Grid** — Numerical and pattern-based logic puzzles

---

### 🎮 Multiple Game Modes

#### 📅 Daily Mode

- 15 puzzles per daily session
- Designed around a daily habit loop
- Streak tracking
- Difficulty-based challenges
- Daily progress tracking
- Countdown/reset behavior

#### 🏋️ Practice Mode

- Practice individual puzzle categories
- Multiple difficulty levels
- Designed for unlimited practice
- Improve specific puzzle-solving skills

#### ⏱️ Challenge Mode

- Timed puzzle sessions
- Score-oriented gameplay
- Designed for competitive personal performance
- Encourages faster and more accurate solving

#### 📚 Archive Mode

- Browse historical puzzles
- Replay previous puzzle sessions
- Explore the puzzle catalogue

---

## 📊 Progress & Statistics

The application tracks gameplay progress and provides users with performance information such as:

- Solved puzzles
- Accuracy
- Win rate
- Current streak
- Weekly activity
- Daily progress
- Mode-specific performance
- Puzzle completion history

The statistics experience is designed to make improvement visible over time.

---

## 🔥 Streak System

The Daily experience includes a streak-based progression system.

Users can:

- Build consecutive daily streaks
- Track their current streak
- Maintain progress through the daily puzzle cycle
- Use the built-in **Streak Freeze** functionality when available

The streak system encourages consistent daily engagement without requiring long gaming sessions.

---

## 💡 Interactive Tutorials

Each puzzle type can provide an integrated **How to Play** tutorial.

Tutorials explain:

- The objective of the puzzle
- How to interact with the puzzle
- How answers are entered
- Important gameplay rules
- Useful hints and interactions

Tutorial progress can also be reset from Settings.

---

## 🔊 Sound Effects

Puzzlogic includes programmatic sound effects using the browser's **Web Audio API**.

This provides:

- Button interaction feedback
- Gameplay feedback
- Success/win sounds
- Lightweight audio without requiring a large collection of audio files

Sound effects can be enabled or disabled from Settings.

---

## 💾 Local-First Persistence

The current client application uses browser-based persistence for important gameplay state.

Persisted information includes:

- Game progress
- Statistics
- Streak information
- Gameplay state
- User preferences
- Sound settings
- Tutorial state

This allows the application to remain usable without requiring an account for the core gameplay experience.

---

# 📸 Application Showcase

## 🏠 Home Dashboard

<img src="./docs/screenshots/home-dashboard.png" width="300" alt="Puzzlogic Game Home Dashboard">

The dashboard provides quick access to the daily puzzle, current streak, solved count, win rate and available game modes.

---

## 🎮 Game Modes

<img src="./docs/screenshots/game-modes.png" width="300" alt="Puzzlogic Game Modes">

The Game Modes screen provides access to Daily, Practice, Challenge and Archive gameplay.

---

## 🔢 Number Grid Gameplay

<img src="./docs/screenshots/gameplay-grid.png" width="300" alt="Number Grid Gameplay">

Number Grid challenges users to complete missing values while following the puzzle's logical constraints.

---

## 🎯 Pinpoint Gameplay

<img src="./docs/screenshots/gameplay-pinpoint.png" width="300" alt="Pinpoint Gameplay">

Pinpoint presents progressive clues and requires players to identify the connection between them.

---

## ⚙️ Settings

<img src="./docs/screenshots/settings.png" width="300" alt="Puzzlogic Game Settings">

The Settings screen provides controls for sound effects, streak freeze, tutorial reset and progress management.

---

## 📊 Statistics

<img src="./docs/screenshots/statistics.png" width="300" alt="Puzzlogic Game Statistics">

The Statistics screen allows users to review their puzzle performance and daily progress.

---

# 🏗️ Architecture

The project follows a modular full-stack monorepo structure.

```text
                         ┌─────────────────────────┐
                         │     Puzzlogic Client     │
                         │      React + Vite        │
                         └────────────┬────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
       │ Puzzle Engine│       │ Sound Service│       │ Progress Store│
       │              │       │ Web Audio API│       │ localStorage  │
       └──────┬───────┘       └──────────────┘       └──────┬───────┘
              │                                              │
              └──────────────────┬───────────────────────────┘
                                 ▼
                       ┌────────────────────┐
                       │   React UI Layer   │
                       │ Tailwind + Motion  │
                       └────────────────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │   Backend Layer    │
                       │ Node.js + Prisma   │
                       └────────────────────┘
                                 │
                                 ▼
                       ┌────────────────────┐
                       │      Database      │
                       └────────────────────┘
