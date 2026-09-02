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

                                   │
                                   ▼
                        ┌────────────────────┐
                        │   Backend Layer    │
                        │ Node.js + Express  │
                        │ Prisma + TypeScript│
                        └──────────┬─────────┘
                                   │
                                   ▼
                        ┌────────────────────┐
                        │      Database      │
                        └────────────────────┘


## 📂 Monorepo Project Structure


puzzlogic-game/
│
├── frontend/                         # Active PuzzDaily client application
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── features/                  # Feature modules and game functionality
│   │   ├── hooks/                     # Shared React hooks
│   │   ├── services/                  # Audio, scoring, and application services
│   │   └── utils/                     # Utility functions and helpers
│   ├── test/                          # Vitest and Testing Library tests
│   ├── public/                        # Static assets
│   └── package.json
│
├── backend/                           # Node.js + Express + Prisma backend
│   ├── prisma/                        # Prisma schema and database configuration
│   ├── src/                           # Backend source code
│   └── package.json
│
├── shared/                            # Shared types, rules, and reusable logic
│
├── assets/                            # Project media and global assets
│
├── docs/
│   ├── screenshots/                   # Application screenshots
│   ├── api-docs.md                    # API documentation
│   ├── architecture.md                # Architecture documentation
│   ├── deployment.md                  # Deployment documentation
│   └── game-design.md                 # Puzzle and gameplay documentation
│
├── .env.example                       # Environment variable template
├── .gitignore
├── docker-compose.yml
└── README.md
```

---

## 🛠️ Technology Stack

| Domain              | Technologies                               |
| :------------------ | :----------------------------------------- |
| **Frontend Core**   | React 18, TypeScript, Vite, TanStack Query |
| **UI & Styling**    | Tailwind CSS                               |
| **Animation**       | Framer Motion                              |
| **Icons**           | Lucide Icons                               |
| **Testing**         | Vitest, Testing Library                    |
| **Backend**         | Node.js, Express, TypeScript               |
| **Database**        | Prisma ORM                                 |
| **Audio**           | Web Audio API                              |
| **Device Feedback** | Navigator Vibration API                    |
| **Persistence**     | Browser `localStorage`                     |
| **Version Control** | Git, GitHub                                |
| **Deployment**      | Render                                     |
| **CI/CD**           | GitHub Actions                             |

---

## 🎯 Design Principles

### 📱 Mobile-First

The interface is designed around a mobile gameplay experience while maintaining responsive layouts for larger screens.

### ⚡ Fast Sessions

Gameplay is structured around short, focused sessions that are easy to start and finish.

### 🧠 Meaningful Difficulty

Each puzzle category introduces a different reasoning challenge, encouraging deduction, pattern recognition, spatial thinking, and lateral problem solving.

### 🔄 Repeatable Gameplay

Daily, Practice, Challenge, and Archive modes provide multiple ways to return to the application.

### 💾 Reliable Progress

Important gameplay state, statistics, preferences, and streak information are persisted locally for continued gameplay across browser sessions.

### 🎨 Clean Interaction Design

The interface emphasizes clear hierarchy, large touch targets, visual feedback, motion, and minimal interaction friction.

---

## 💻 Getting Started

### Prerequisites

* **Node.js:** `v18.0.0` or higher
* **npm:** `v9.0.0` or higher
* **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Ganeshbasani/Puzzlogic--Game.git
cd Puzzlogic--Game
```

### 2. Navigate to the Frontend

```bash
cd frontend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Vite will display the local development URL in the terminal.

Typically:

```text
http://localhost:5173
```

---

## ⚙️ Backend Setup

Open a second terminal from the repository root:

```bash
cd backend
npm install
```

Configure the required backend environment variables and database connection.

Run the backend using the development script defined in:

```text
backend/package.json
```

The backend is structured to support future cloud-backed application functionality.

---

## 🔐 Environment Variables

Create your local environment file from the provided template.

### macOS / Linux

```bash
cp .env.example .env
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
```

Configure the required variables according to the frontend, backend, and database configuration.

> ⚠️ Never commit `.env` files containing API keys, credentials, database passwords, tokens, or other secrets.

---

## 🧪 Testing & Development Scripts

Run frontend commands from the `frontend/` directory.

```bash
# Start development server
npm run dev

# Create production build
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linting / code-quality checks
npm run lint
```

Before deployment, verify:

* Frontend builds successfully
* Tests pass successfully
* Puzzle modes load correctly
* Daily puzzles generate correctly
* Statistics update correctly
* Streak tracking works correctly
* Local persistence works correctly
* Sound settings work correctly
* Tutorials work correctly
* Responsive layouts work correctly

---

## 🚀 Deployment

The production application is deployed using **Render**.

### 🌐 Production Application

https://puzzlogic-game-ja4v.onrender.com/modes

### 📦 Source Repository

https://github.com/Ganeshbasani/Puzzlogic--Game

Deployment-specific documentation is available in:

```text
docs/deployment.md
```

---

## 📚 Documentation

| Document          | Description                              |
| :---------------- | :--------------------------------------- |
| `architecture.md` | System architecture and technical design |
| `api-docs.md`     | Backend/API documentation                |
| `deployment.md`   | Deployment and hosting instructions      |
| `game-design.md`  | Puzzle rules and gameplay design         |
| `screenshots/`    | Application screenshots                  |

---

## 🔌 Backend & API

The repository includes a backend foundation based on:

* Node.js
* Express
* TypeScript
* Prisma ORM
* Database integration
* API-oriented architecture

The backend is structured to support future server-side functionality such as:

* 🔐 User authentication
* 👤 User accounts and profiles
* ☁️ Cloud-synchronized progress
* 📊 Server-side statistics
* 📚 Persistent game history
* 🏆 Global leaderboards
* 🔄 Cross-device synchronization

> **Current status:** Core gameplay is primarily client-side and local-first. Full cloud synchronization and account-based features are planned for future phases.

---

## 🛣️ Roadmap

* [x] **Phase 1:** Standalone frontend with deterministic puzzle engine and local persistence.
* [ ] **Phase 2:** Live Express API integration for cloud synchronization.
* [ ] **Phase 3:** User accounts, OAuth authentication, cloud progress, and global leaderboards.
* [ ] **Phase 4:** Expanded multiplayer speed-run modes and additional puzzle categories.

---

## 🔮 Future Enhancements

* 🔐 Authentication and account management
* ☁️ Cloud save and cross-device synchronization
* 🏆 Global leaderboards
* 👥 Player profiles
* 🌎 Multiplayer and competitive gameplay
* 📈 Expanded analytics
* 🗓️ Larger historical puzzle archive
* 🔔 Daily reminders and notifications
* 🎖️ Achievements and badges
* 📱 Progressive Web App support
* ♿ Expanded accessibility improvements
* 🌍 Localization and additional language support

---

## 🤝 Contributing

Contributions, bug fixes, ideas, and improvements are welcome.

### 1. Fork the Repository

Use the **Fork** button on GitHub.

### 2. Clone Your Fork

```bash
git clone <your-fork-url>
cd Puzzlogic--Game
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

Implement and test your changes locally.

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: describe your change"
```

### 6. Push Your Branch

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

Create a Pull Request and describe:

* What changed
* Why the change was needed
* How it was tested
* Any relevant screenshots or notes

---

## 🐛 Bug Reports & Feature Requests

Found a problem or have an idea?

Open an issue in the GitHub repository:

https://github.com/Ganeshbasani/Puzzlogic--Game

Please include:

* Clear issue description
* Steps to reproduce
* Expected behavior
* Actual behavior
* Browser/device information
* Screenshot or recording when helpful

---

## 🔒 Security

Please never publish sensitive information such as:

* API keys
* Database credentials
* Authentication tokens
* Production environment variables
* Private access credentials

For security-sensitive issues, contact the project author directly instead of publishing confidential information in a public issue.

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for the complete license text.

---

## 👨‍💻 Author

### Ganesh Basani

**GitHub:**
https://github.com/Ganeshbasani

**Project Repository:**
https://github.com/Ganeshbasani/Puzzlogic--Game

---

## 🙏 Acknowledgements

Puzzlogic Game is built using modern open-source technologies.

Special thanks to:

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide Icons
* TanStack Query
* Vitest
* Testing Library
* Node.js
* Express
* Prisma
* Web Audio API
* GitHub
* Render

---

## ⭐ Support the Project

If you find **Puzzlogic Game** useful or interesting:

* ⭐ Star the repository
* 🐛 Report bugs
* 💡 Suggest improvements
* 🔧 Contribute code
* 📢 Share the project

---

<p align="center">

### 🧩 Challenge your mind. One puzzle at a time.

**Puzzlogic Game**

<br>

<a href="https://puzzlogic-game-ja4v.onrender.com/modes">
🚀 Play Now
</a>
&nbsp;&nbsp;•&nbsp;&nbsp;
<a href="https://github.com/Ganeshbasani/Puzzlogic--Game">
📦 GitHub
</a>

</p>
```

