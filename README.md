# 🧩 Puzzlogic Game

<p align="center">
  <img src="https://img.shields.io/badge/🧩%20Puzzlogic-Game-4F46E5?style=for-the-badge" alt="Puzzlogic Game">
  <br><br>
  <a href="https://puzzlogic-game-ja4v.onrender.com/modes">
    <img src="https://img.shields.io/badge/🚀%20Live%20Application-Puzzlogic%20Game-4F46E5?style=for-the-badge" alt="Live Application">
  </a>
  <a href="https://github.com/Ganeshbasani/Puzzlogic--Game">
    <img src="https://img.shields.io/badge/📦%20GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma">
</p>

<p align="center">
  <strong>A polished, mobile-first daily puzzle platform engineered for short, high-satisfaction brain-training sessions.</strong>
</p>

---

## 📸 Application Showcase

| 🏠 Home Dashboard | 🎮 Game Modes | 🔢 Number Grid |
| :---: | :---: | :---: |
| <img src="./docs/screenshots/home-dashboard.png" width="260" alt="Home Dashboard"> | <img src="./docs/screenshots/game-modes.png" width="260" alt="Game Modes"> | <img src="./docs/screenshots/gameplay-grid.png" width="260" alt="Number Grid"> |

| 🎯 Pinpoint Gameplay | ⚙️ App Settings | 📊 Statistics |
| :---: | :---: | :---: |
| <img src="./docs/screenshots/gameplay-pinpoint.png" width="260" alt="Pinpoint Gameplay"> | <img src="./docs/screenshots/settings.png" width="260" alt="Settings"> | <img src="./docs/screenshots/statistics.png" width="260" alt="Statistics"> |

---

## 🚀 Quick Links & Live Application

- 🌐 **Live Application:** [https://puzzlogic-game-ja4v.onrender.com/modes](https://puzzlogic-game-ja4v.onrender.com/modes)
- 📦 **GitHub Repository:** [https://github.com/Ganeshbasani/Puzzlogic--Game](https://github.com/Ganeshbasani/Puzzlogic--Game)

---

## 💡 System Overview & Core Philosophy

> **Design Philosophy:** *Make short daily puzzle sessions feel rewarding enough to build a lasting habit.*

**Puzzlogic Game** is a mobile-first daily puzzle platform engineered around quick, highly engaging logic challenges. 

The production client inside `frontend/` (branded as **PuzzDaily**) delivers dynamic puzzle generators, animated step feedback, programmatic audio synthesis, local-first progress storage, and interactive tutorials. The system is architected as a full-stack monorepo featuring scaffolded backend and shared modules prepared for server-side user synchronization and global leaderboards.

---

## ✨ Key Technical & UX Features

- 🧠 **Multi-Category Logic Engine:** Supports spatial grid placement (**Queens**), word association (**Pinpoint**), typed lateral thinking (**Logic Riddle**), and matrix deduction (**Number Grid**).
- 📅 **Deterministic Daily Session Loop:** Algorithmic daily session generation featuring daily resets, active streak tracking, and built-in **Streak Freeze** protection.
- 🎮 **4 Specialized Game Modes:** Dedicated modes for **Daily**, **Practice** (custom filterable runs), **Challenge** (timed score runs), and **Archive** (historical catalog replay).
- 🔊 **Web Audio Synthesizer:** On-the-fly sound effect generation synthesized entirely using browser APIs—eliminating external audio assets.
- 💾 **Offline-First Storage:** Zero-barrier gameplay that persists all progress, statistics, settings, and streak counts in local browser storage.
- 📱 **Mobile-First UX:** Glassmorphic card design, fluid micro-interactions via Framer Motion, lazy-loaded page routing, and celebration feedback (confetti & vibration).

---

## 🎮 Game Modes Breakdown

| Game Mode | Session Length | Description & Primary Mechanics |
| :--- | :--- | :--- |
| 📅 **Daily** | 15 Puzzles | Deterministically rotated daily set focused on habit retention and daily streak tracking. |
| 🏋️ **Practice** | 10 Puzzles | Skill-building run filtered by user-selected puzzle type and difficulty level. |
| ⏱️ **Challenge** | 10 Puzzles | High-intensity timed run with score-driven mechanics and penalty modifiers. |
| 📚 **Archive** | On-Demand | Full historical catalog access allowing players to browse and replay past daily puzzle sets. |

---

## 🧩 Playable Puzzle Categories

| Category | Type & Focus | Gameplay Mechanics |
| :--- | :--- | :--- |
| 👑 **Queens** | Spatial Logic | Place non-touching queens (including diagonals) across rows, columns, and color zones. Includes tap-to-mark and collision checking. |
| 🎯 **Pinpoint** | Word Association | Progressively revealed clues requiring deduction of a hidden central connection. Rewards quick recognition. |
| 🧩 **Logic Riddle** | Lateral Thinking | Concise text riddles and logic prompts requiring typed input with optional hint overlays. |
| 🔢 **Number Grid** | Quantitative Reasoning | Complete missing values within a matrix grid by identifying hidden numerical patterns. |

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │     Puzzlogic Client    │
                         │      React + Vite       │
                         └────────────┬────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
       │ Puzzle Engine│       │ Sound Service│       │ Progress Store│
       │ (Session Gen)│       │ Web Audio API│       │ localStorage │
       └──────┬───────┘       └──────────────┘       ───────┬───────┘
              │                                              │
              └──────────────────┬───────────────────────────┘
                                 ▼
                        ┌────────────────────┐
                        │   React UI Layer   │
                        │ Tailwind + Motion  │
                        └──────────┬─────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │   Backend Layer    │
                        │ Node.js + Prisma   │
                        └────────────────────┘
