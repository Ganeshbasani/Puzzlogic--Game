# 🧩 Puzzlogic Game

> A polished, production-ready daily puzzle platform engineered for quick, rewarding brain-training sessions.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)

[🚀 Live Demo](https://puzzlogic-game-ja4v.onrender.com/modes) &nbsp;•&nbsp; [📦 GitHub Repository](https://github.com/Ganeshbasani/Puzzlogic--Game)

---

## 📸 Application Showcase

| 🏠 Dashboard | 🎮 Game Modes | 🧩 Number Grid |
| :---: | :---: | :---: |
| <img src="./docs/screenshots/home-dashboard.png" width="260" alt="Home Dashboard" /> | <img src="./docs/screenshots/game-modes.png" width="260" alt="Game Modes" /> | <img src="./docs/screenshots/gameplay-grid.png" width="260" alt="Number Grid" /> |

| 🎯 Pinpoint | 📖 Interactive Tutorials | 📊 Performance Stats |
| :---: | :---: | :---: |
| <img src="./docs/screenshots/gameplay-pinpoint.png" width="260" alt="Pinpoint Gameplay" /> | <img src="./docs/screenshots/how-to-play.png" width="260" alt="Puzzle Tutorial" /> | <img src="./docs/screenshots/statistics.png" width="260" alt="Statistics" /> |

---

## 📌 Overview

**Puzzlogic Game** is an architecture-focused monorepo housing a mobile-first, daily logic puzzle platform. It is engineered around a habit-forming product loop: short, high-satisfaction sessions that combine deterministic daily generation, localized offline persistence, Web Audio synthesis, and dynamic progress analytics.

The current production release features a fully functional client application located in [`frontend/`](./frontend) (**PuzzDaily**), with modular monorepo scaffolding (`backend/`, `shared/`, `docs/`) structured for future cloud-backed state synchronization and server-side leaderboards.

---

## ✨ Key Features

- **🧠 Multi-Category Engine:** Integrated puzzle engines for spatial logic (*Queens*), word association (*Pinpoint*), lateral deductions (*Logic Riddle*), and quantitative patterns (*Number Grid*).
- **📅 Deterministic Daily Loop:** Algorithmic daily session generator with streak retention and automated countdown resets.
- **🎮 Specialized Modes:** Feature-rich support for **Daily**, **Practice** (filtered by category & difficulty), **Challenge** (timed score runs), and **Archive** (historical replaying).
- **🔊 Programmatic Audio:** Dynamic sound synthesis via the native Web Audio API—eliminating bulky audio asset loads.
- **💾 Offline-First Persistence:** Robust local browser storage for statistics, active game state, streak tracking, and customization options.
- **📊 Real-time Analytics:** Advanced performance metrics including accuracy rings, percentile ranking calculations, and weekly activity heatmaps.

---

## 🏗️ System Architecture & Workflow

```text
                                  +-----------------------+
                                  |   Puzzlogic Client    |
                                  |    (Vite / React)     |
                                  +-----------+-----------+
                                              |
        +-------------------------------------+-------------------------------------+
        |                                     |                                     |
+-------v-------+                     +-------v-------+                     +-------v-------+
|  Game Engine  |                     | Sound Service |                     | Progress Store|
| (Session Gen) |                     |  (Web Audio)  |                     | (localStorage)|
+-------+-------+                     +---------------+                     +-------+-------+
        |                                                                           |
        |              +-------------------------------------+                      |
        +------------->| Render Engine (Framer Motion / UI)  |<---------------------+
                       +-------------------------------------+
