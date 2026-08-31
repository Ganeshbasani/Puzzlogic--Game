# Puzzlogic Game

Puzzlogic Game is a monorepo for a puzzle-focused web application designed around short, satisfying daily brain-training sessions.

The current live product inside this repository is the migrated frontend app in [`frontend/`](./frontend). That frontend is a polished, mobile-first puzzle experience currently branded and implemented as **PuzzDaily**. The rest of the repository is structured to support the next phase of the product, including backend APIs, shared game logic, centralized assets, and technical documentation.

## What This App Is

Puzzlogic Game is built for players who want quick puzzle sessions that still feel rewarding and structured.

The app combines:

- a daily puzzle loop
- replayable practice sessions
- timed challenge runs
- an archive of puzzle content
- persistent stats and streak tracking
- a visually polished mobile-first UI

At the moment, the app is frontend-driven and stores player progress locally in the browser. The backend, shared, and documentation layers are scaffolded and ready for expansion.

## Current Status

- `frontend/` is the active, working application
- `backend/`, `shared/`, `assets/`, `docs/`, and `scripts/` are prepared for future development
- the frontend currently persists settings, daily completion, and stats in `localStorage`
- authentication and server-side leaderboards are planned but not implemented yet

## Core Player Experience

The app is centered on a simple but sticky gameplay loop:

1. Open the home screen and see today's puzzle, your streak, and quick performance stats
2. Start a daily session, enter practice mode, try a challenge run, or browse the archive
3. Solve puzzle cards one by one with interactive feedback, hints, timers, and animations
4. Finish the session and review results including time, attempts, hints, score, and social-style ranking feedback
5. Track long-term performance through stats, streaks, and weekly activity

## How The App Works

### Home Screen

The home screen is the main entry point and acts as the player's dashboard.

It shows:

- the current daily puzzle number
- the type and difficulty of today's featured puzzle
- current streak information
- quick lifetime stats such as solved count and win rate
- a countdown to the next daily reset after completion
- a simulated active-player indicator for social energy

The goal of the screen is to make it obvious what the player should do next and to reinforce the daily habit loop.

### Mode Selection

From the home screen, players can move into dedicated gameplay modes:

- **Daily**: a fixed 15-puzzle session generated for the current day
- **Practice**: a 10-puzzle run filtered by puzzle type and difficulty
- **Challenge**: a 10-puzzle run intended to feel more score-driven and intense
- **Archive**: a browse-and-replay catalog of puzzle content

### Session Flow

All gameplay sessions are coordinated through the frontend session layer.

When a session starts, the app:

- determines which mode the player selected
- builds the correct puzzle set for that mode
- resets session-level counters such as score, attempts, hints, skips, and elapsed time
- loads the correct puzzle renderer based on the puzzle type
- optionally shows a first-time tutorial overlay for that puzzle type

As the player progresses:

- each solved or skipped puzzle is recorded
- session score and counters are updated
- the next puzzle loads automatically when applicable
- daily completion is marked if the player is in daily mode
- the final results screen summarizes the full run

### Results Flow

After a session or puzzle completion, the results page gives the player a satisfying summary.

It includes:

- total time
- attempts
- hints used
- skipped count
- final score for session-based modes
- an accuracy ring
- streak information
- percentile-style performance feedback
- a shareable result card format

### Stats and Settings

The app also includes supporting screens for retention and customization.

**Stats** tracks:

- total played and solved
- win rate
- best time
- first-attempt accuracy
- daily streak and best streak
- difficulty-based performance
- weekly activity

**Settings** currently supports:

- sound on or off
- tutorial reset
- progress reset
- streak-freeze display state

## Game Modes In Detail

### Daily Mode

Daily mode is the main habit-forming loop of the app.

It provides:

- a fixed 15-puzzle session each day
- streak tracking across days
- daily completion state
- countdown behavior after completion
- daily result persistence

The current implementation builds the daily session from a deterministic rotating sequence so every day feels structured and repeatable.

### Practice Mode

Practice mode is meant for focused improvement.

Players can choose:

- puzzle type
- difficulty

The app then generates a 10-puzzle run filtered by those selections, making this mode useful for skill-building and repetition.

### Challenge Mode

Challenge mode is a faster, score-oriented run.

It uses:

- a curated puzzle pool
- session scoring
- timed progression
- attempts-based reward behavior

This mode is designed to feel more performance-driven than daily or practice.

### Archive Mode

Archive mode gives the player access to the puzzle catalog.

It allows players to:

- browse previously available content
- replay archived puzzles
- jump directly into a selected puzzle from the catalog

## Puzzle Types

The current playable app supports four live puzzle categories:

### Queens

Queens is a spatial logic puzzle where the player must place one queen per row, column, and color region, while also ensuring queens do not touch each other, including diagonally adjacent cells.

The interaction model supports:

- tap-to-mark
- tap-to-place
- conflict feedback
- reset and clear controls
- optional auto-check behavior

### Pinpoint

Pinpoint is a word-association puzzle.

Players are shown clue words progressively and must identify the hidden connection from multiple-choice answers.

It emphasizes:

- layered clue reveal
- low-attempt solving
- recognition and word association

### Logic Riddle

Logic Riddle presents short text riddles and logic prompts where the player types in the answer.

It focuses on:

- careful reading
- lateral thinking
- typed input
- optional hint support

### Number Grid

Number Grid is a compact numeric reasoning puzzle where the player fills missing grid values to satisfy a pattern or rule.

It focuses on:

- pattern recognition
- short-form deduction
- direct answer verification

### Future Puzzle Expansion

The puzzle engine and component structure are designed to grow.

The codebase already includes scaffolding for additional puzzle categories, including a word puzzle model and renderer, even though the current live experience primarily centers on the four active puzzle types above.

## Feature Breakdown

### Player-Facing Features

- mobile-first interface
- animated transitions and polished visual feedback
- daily streak loop
- local stats and result history
- puzzle-specific tutorials
- in-browser sound effects
- device vibration feedback when supported
- shareable results summary
- archive browsing

### Progress Features

- local persistence for stats
- daily completion tracking
- tutorial completion tracking
- sound preference persistence
- streak calculations
- weekly activity summary

### UX Features

- lazy-loaded route screens
- suspense-based loading states
- reusable glass-card style system
- bottom navigation for primary screens
- error boundary fallback screen
- confetti and celebratory completion feedback

## How Puzzle Generation Works

The puzzle engine is the core content layer of the app.

It currently defines:

- puzzle types
- puzzle difficulty levels
- puzzle pools
- daily session length
- practice session length
- challenge session length
- archive sorting

Generation strategy by mode:

- **Daily** uses a deterministic sequence rotated by the current day index
- **Practice** filters the overall puzzle pool by type and difficulty
- **Challenge** uses a curated pool ordered by difficulty mix
- **Archive** returns the full catalog sorted for browsing

This makes the content layer predictable, easy to reason about, and easy to extend with new puzzles later.

## Data and Persistence

The current frontend uses browser storage rather than a live backend.

The app persists:

- user settings
- tutorial visibility state
- daily completion data
- per-session result records
- aggregated statistics derived from recorded results

This means the app works as a lightweight standalone experience today, while the repository structure leaves room for later migration to a server-backed system.

## Sound, Feedback, and Onboarding

The player experience is reinforced with lightweight sensory feedback.

### Sound

The app generates sound effects in the browser using the Web Audio API rather than relying on bundled media files.

Current feedback includes:

- tap
- mark
- queen placement
- conflict
- correct answer
- wrong answer
- win/celebration
- general selection feedback

### Vibration

When supported by the device, short vibration patterns are triggered for interactions and success/error states.

### Tutorials

Each puzzle type has a first-time tutorial overlay that explains:

- how the puzzle works
- how to interact with it
- what success looks like

Tutorial completion is remembered so returning players are not blocked by repeated onboarding.

## Repository Structure

```text
puzzlogic-game/
  frontend/    Active Vite + React + TypeScript puzzle client
  backend/     Planned Node.js + Express + Prisma backend
  shared/      Cross-layer types, constants, rules, and algorithms
  assets/      Centralized images, audio, levels, and animation assets
  docs/        Architecture, product, API, and deployment docs
  scripts/     Automation and project maintenance scripts
```

## Frontend Architecture

The frontend is a feature-oriented React application.

```text
frontend/
  public/      Static public assets
  src/
    assets/     App artwork and image assets
    components/ Shared UI building blocks
    constants/  Routes, labels, and app configuration
    features/   Play, puzzles, progress, and settings
    hooks/      Shared custom hooks
    pages/      Route-level screens
    services/   Helpers such as sound and scoring
    styles/     Global and component-level styles
    test/       Vitest regression tests
    utils/      Small utility helpers
```

Important frontend modules:

- `frontend/src/main.tsx` bootstraps the client
- `frontend/src/App.tsx` sets up providers, routing, lazy loading, and the app shell
- `frontend/src/features/puzzles/model/puzzleEngine.ts` defines the puzzle data model and session generation rules
- `frontend/src/features/play/hooks/usePlaySession.ts` drives gameplay sessions and transitions
- `frontend/src/features/progress/model/` manages results, stats, and daily completion data
- `frontend/src/features/settings/model/` manages persisted app settings and tutorial state

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- TanStack Query
- Vitest

### Planned Backend

- Node.js
- Express
- Prisma
- TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

### Build the Frontend

```bash
cd frontend
npm run build
```

### Test the Frontend

```bash
cd frontend
npm test
```

## Frontend Scripts

Available in `frontend/package.json`:

- `npm run dev`
- `npm run build`
- `npm run build:dev`
- `npm run lint`
- `npm run preview`
- `npm test`
- `npm run test:watch`

## Backend Plan

The backend scaffold is intended to support the next stage of the product.

Planned responsibilities include:

- user authentication
- server-side leaderboards
- persistent player accounts
- game-state APIs
- shared puzzle and session APIs
- long-term progress storage

Current backend structure includes:

- `backend/src/controllers/`
- `backend/src/routes/`
- `backend/src/services/`
- `backend/src/middleware/`
- `backend/src/validators/`
- `backend/src/utils/`
- `backend/src/config/`
- `backend/src/types/`
- `backend/prisma/`

## Shared Layer Plan

The `shared/` directory is reserved for reusable cross-layer logic such as:

- shared types
- constants
- puzzle rules
- validation-friendly domain models
- algorithms that should be consistent between frontend and backend

## Documentation

Planned docs live in:

- `docs/architecture.md`
- `docs/game-design.md`
- `docs/api-docs.md`
- `docs/deployment.md`

## Notes

- There is no root-level workspace or package manager orchestration yet, so commands should currently be run from `frontend/`
- the migrated frontend still uses the existing package name `puzzdaily`
- the backend and supporting monorepo layers are placeholders today and should be implemented as the platform evolves
