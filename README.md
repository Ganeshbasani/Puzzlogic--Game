\documentclass[10pt,a4paper]{article}

% --- PACKAGES & SETUP ---
\usepackage[utf8]{inputenc}
\usepackage[margin=0.75in]{geometry}
\usepackage{helvet}
\renewcommand{\familydefault}{\sfdefault}
\usepackage{microtype}
\usepackage{xcolor}
\usepackage{hyperref}
\usepackage{booktabs}
\usepackage{tabularx}
\usepackage{titlesec}
\usepackage{listings}
\usepackage{enumitem}

% --- COLOR PALETTE ---
\definecolor{primary}{HTML}{4F46E5}   % Indigo
\definecolor{darkbg}{HTML}{1E293B}    % Dark Slate
\definecolor{lightbg}{HTML}{F8FAFC}   % Off White
\definecolor{border}{HTML}{E2E8F0}    % Light Gray Border
\definecolor{accent}{HTML}{0EA5E9}    % Sky Blue

% --- HYPERLINK STYLES ---
\hypersetup{
    colorlinks=true,
    linkcolor=primary,
    filecolor=primary,      
    urlcolor=primary,
    pdftitle={Puzzlogic Game - Technical Documentation},
}

% --- SECTION FORMATTING ---
\titleformat{\section}
  {\color{primary}\Large\bfseries\raggedright}
  {}{0em}{}
  [\color{border}\titlerule]

\titleformat{\subsection}
  {\color{darkbg}\large\bfseries\raggedright}
  {}{0em}{}

% --- LIST STYLES ---
\setlist[itemize]{noitemsep, topsep=3pt, leftmargin=1.5em}

% --- LISTINGS (CODE BLOCKS) ---
\lstdefinestyle{techstyle}{
    backgroundcolor=\color{lightbg},
    commentstyle=\color{gray},
    keywordstyle=\color{primary}\bfseries,
    numberstyle=\tiny\color{gray},
    stringstyle=\color{accent},
    basicstyle=\ttfamily\small\color{darkbg},
    breakatwhitespace=false,         
    breaklines=true,                 
    captionpos=b,                    
    keepspaces=true,                 
    numbers=left,                    
    numbersep=5pt,                  
    showspaces=false,                
    showstringspaces=false,
    showtabs=false,                  
    tabsize=2,
    frame=single,
    rulecolor=\color{border}
}
\lstset{style=techstyle}

% --- DOCUMENT CONTENT ---
\begin{document}

% --- HEADER BLOCK ---
\begin{center}
    {\Huge \bfseries \color{primary} 🧩 Puzzlogic Game} \\[0.4em]
    {\large \textbf{Production-Grade Mobile-First Daily Logic Puzzle Platform}} \\[0.8em]
    \href{https://puzzlogic-game-ja4v.onrender.com/modes}{\textbf{[🚀 Live Application]}} 
    \quad $\bullet$ \quad 
    \href{https://github.com/Ganeshbasani/Puzzlogic--Game}{\textbf{[📦 GitHub Repository]}}
\end{center}

\vspace{0.5em}

% --- METADATA TABLE ---
\noindent
\begin{tabularx}{\textwidth}{@{} X X X X @{}}
\toprule
\textbf{Frontend Core} & \textbf{State \& UI} & \textbf{Backend / DB} & \textbf{Deployment} \\
\midrule
React 18, TypeScript, Vite & Tailwind CSS, Framer Motion & Node.js, Express, Prisma & Render, GitHub Actions \\
\bottomrule
\end{tabularx}

\vspace{1em}

% --- OVERVIEW ---
\section{📖 Architecture Overview}
\textbf{Puzzlogic Game} is a mobile-first, daily logic puzzle platform engineered around short, high-satisfaction sessions. It leverages deterministic daily puzzle generation, offline-first local browser persistence, native Web Audio API synthesis, and real-time progress analytics.

The repository is structured as a full-stack monorepo featuring an active production frontend in \texttt{frontend/} (\textbf{PuzzDaily}) along with scaffolded backend, shared library, and documentation layers prepared for cloud state synchronization and global leaderboards.

% --- KEY FEATURES ---
\section{✨ Key Features}
\begin{itemize}
    \item \textbf{Multi-Category Engine:} Integrated puzzle execution for spatial logic (\textit{Queens}), word association (\textit{Pinpoint}), lateral deductions (\textit{Logic Riddle}), and matrix patterns (\textit{Number Grid}).
    \item \textbf{Deterministic Daily Loop:} Algorithmic daily session generator featuring streak retention and automated countdown resets.
    \item \textbf{Specialized Game Modes:} Complete support for \textbf{Daily}, \textbf{Practice} (filtered by type/difficulty), \textbf{Challenge} (timed score runs), and \textbf{Archive} (catalog replay).
    \item \textbf{Programmatic Audio Synthesis:} Dynamic sound feedback synthesized on-the-fly via the Web Audio API—eliminating bulky audio asset files.
    \item \textbf{Offline-First Persistence:} Complete local storage retention for settings, active state, streaks, and analytics without mandatory login barriers.
\end{itemize}

% --- GAME MODES BREAKDOWN ---
\section{🎮 Game Modes Specifications}
\begin{center}
\begin{tabularx}{\textwidth}{@{} l X l X @{}}
\toprule
\textbf{Mode} & \textbf{Description} & \textbf{Length} & \textbf{Primary Mechanics} \\
\midrule
\textbf{Daily} & Fixed daily puzzle set & 15 Puzzles & Rotates via deterministic day-index; drives streak retention \\
\textbf{Practice} & Focused skill improvement & 10 Puzzles & Filterable by category and difficulty level \\
\textbf{Challenge} & Score-oriented speed run & 10 Puzzles & Timed progression with attempt-based score multipliers \\
\textbf{Archive} & Historical puzzle catalog & On-Demand & Full historical catalog access for previous daily sets \\
\bottomrule
\end{tabularx}
\end{center}

% --- SYSTEM ARCHITECTURE ---
\section{🏗️ System Architecture}
\begin{lstlisting}[language=bash, caption={System Component & Data Flow Topology}]
                             +-----------------------+
                             |   Puzzlogic Client    |
                             |    (Vite / React)     |
                             +-----------+-----------+
                                         |
   +-------------------------------------+-------------------------------------+
   |                                     |                                     |
+--v------------+                 +------v--------+                     +------v--------+
|  Game Engine  |                 | Sound Service |                     | Progress Store|
| (Session Gen) |                 |  (Web Audio)  |                     | (localStorage)|
+--+------------+                 +---------------+                     +------+--------+
   |                                                                           |
   |              +-------------------------------------+                      |
   +------------->| Render Engine (Framer Motion / UI)  |<---------------------+
                  +-------------------------------------+
\end{lstlisting}

% --- MONOREPO STRUCTURE ---
\section{📂 Repository Directory Hierarchy}
\begin{lstlisting}[caption={Monorepo Project Layout}]
puzzlogic-game/
├── frontend/               # Active Vite + React + TypeScript client app
│   ├── src/
│   │   ├── components/     # Reusable glassmorphic UI components
│   │   ├── features/       # Game modules (play, puzzles, progress, settings)
│   │   ├── services/       # Web Audio synthesizer & scoring algorithms
│   │   └── utils/          # Data converters & helper functions
│   └── test/               # Vitest suite & regression tests
├── backend/                # Scaffolded Node.js + Express API server (Prisma)
├── shared/                 # Reserved for cross-layer types, rules, & algorithms
├── assets/                 # Centralized media, raw art, and global assets
└── docs/                   # System architecture & deployment manuals
\end{lstlisting}

% --- LOCAL DEVELOPMENT ---
\section{💻 Getting Started \& Execution}
\subsection{Prerequisites}
\begin{itemize}
    \item \textbf{Node.js}: \texttt{v18.0.0} or higher
    \item \textbf{npm}: \texttt{v9.0.0} or higher
\end{itemize}

\subsection{Setup Commands}
\begin{lstlisting}[language=bash, caption={Local Setup Steps}]
# 1. Clone the repository
git clone https://github.com/Ganeshbasani/Puzzlogic--Game.git
cd Puzzlogic--Game

# 2. Navigate to frontend and install dependencies
cd frontend
npm install

# 3. Launch dev server
npm run dev

# 4. Execute test suite
npm test
\end{lstlisting}

% --- FOOTER ---
\vspace{1.5em}
\centerline{\small \color{gray} Engineered by \textbf{Ganesh Basani} $\bullet$ Licensed under the \textbf{MIT License}}

\end{document}
