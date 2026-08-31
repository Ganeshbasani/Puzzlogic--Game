export type PuzzleType = "queens" | "pinpoint" | "riddle" | "grid" | "word";
export type GameMode = "daily" | "practice" | "challenge" | "archive";

export interface BasePuzzle {
  id: string;
  type: PuzzleType;
  difficulty: "easy" | "medium" | "hard";
  title: string;
}

export interface QueensPuzzle extends BasePuzzle {
  type: "queens";
  size: number;
  regions: number[][];
  solution: [number, number][];
  hint: string;
}

export interface PinpointPuzzle extends BasePuzzle {
  type: "pinpoint";
  clues: string[];
  answer: string;
  choices: string[];
  hint: string;
}

export interface RiddlePuzzle extends BasePuzzle {
  type: "riddle";
  question: string;
  answer: string;
  hint: string;
}

export interface GridPuzzle extends BasePuzzle {
  type: "grid";
  size: number;
  grid: (number | null)[][];
  solution: number[][];
  hint: string;
  instructions: string;
}

export interface WordPuzzle extends BasePuzzle {
  type: "word";
  scrambled: string;
  answer: string;
  hint: string;
  category: string;
}

export type Puzzle = QueensPuzzle | PinpointPuzzle | RiddlePuzzle | GridPuzzle | WordPuzzle;

// ---- QUEENS PUZZLES ----
// regions: 2D array where each number = color region (1-indexed, N regions for N×N grid)
// solution: array of [row, col] for each queen (one per region)
// Rules: one queen per row, per column, per region, no two queens adjacent (including diagonal)

const QUEENS_POOL: QueensPuzzle[] = [
  {
    id: "q1",
    type: "queens",
    difficulty: "easy",
    title: "4×4 Starter",
    size: 4,
    regions: [
      [3, 1, 4, 2],
      [3, 1, 4, 2],
      [3, 1, 4, 4],
      [3, 3, 4, 4],
    ],
    solution: [[0, 1], [1, 3], [2, 0], [3, 2]],
    hint: "Each colored region needs exactly one queen. No two queens can touch — not even diagonally.",
  },
  {
    id: "q2",
    type: "queens",
    difficulty: "easy",
    title: "5×5 Garden",
    size: 5,
    regions: [
      [5, 3, 1, 4, 2],
      [5, 3, 1, 4, 2],
      [5, 3, 3, 4, 2],
      [5, 5, 3, 4, 4],
      [5, 5, 3, 3, 4],
    ],
    solution: [[0, 2], [1, 4], [2, 1], [3, 3], [4, 0]],
    hint: "Start by finding regions with the fewest cells — those queens have fewer options.",
  },
  {
    id: "q3",
    type: "queens",
    difficulty: "medium",
    title: "6×6 Mosaic",
    size: 6,
    regions: [
      [4, 2, 1, 1, 1, 3],
      [4, 2, 2, 1, 3, 3],
      [4, 2, 6, 5, 3, 3],
      [4, 6, 6, 5, 5, 3],
      [6, 6, 6, 5, 5, 3],
      [6, 6, 6, 5, 5, 3],
    ],
    solution: [[0, 3], [1, 1], [2, 5], [3, 0], [4, 4], [5, 2]],
    hint: "When a queen is placed, eliminate its entire row, column, and all adjacent cells.",
  },
  {
    id: "q4",
    type: "queens",
    difficulty: "medium",
    title: "6×6 Cascade",
    size: 6,
    regions: [
      [1, 1, 2, 2, 3, 3],
      [1, 4, 4, 2, 3, 3],
      [1, 4, 5, 5, 3, 6],
      [1, 4, 5, 6, 6, 6],
      [1, 4, 5, 5, 6, 6],
      [1, 4, 4, 5, 5, 6],
    ],
    solution: [[0, 4], [1, 1], [2, 3], [3, 0], [4, 5], [5, 2]],
    hint: "Column elimination is powerful — as you place queens, cross off entire columns.",
  },
  {
    id: "q5",
    type: "queens",
    difficulty: "hard",
    title: "7×7 Labyrinth",
    size: 7,
    regions: [
      [1, 1, 2, 2, 3, 3, 3],
      [1, 4, 4, 2, 3, 6, 3],
      [1, 4, 5, 5, 3, 6, 3],
      [1, 4, 5, 6, 6, 6, 7],
      [1, 4, 5, 5, 6, 7, 7],
      [4, 4, 5, 5, 7, 7, 7],
      [4, 4, 5, 5, 5, 7, 7],
    ],
    solution: [[0, 0], [1, 2], [2, 4], [3, 6], [4, 1], [5, 3], [6, 5]],
    hint: "Work from the corners — corner regions often have only one valid placement.",
  },
  {
    id: "q6",
    type: "queens",
    difficulty: "hard",
    title: "7×7 Prism",
    size: 7,
    regions: [
      [1, 2, 2, 3, 3, 4, 4],
      [1, 1, 2, 3, 4, 4, 5],
      [6, 1, 2, 3, 4, 5, 5],
      [6, 6, 2, 3, 5, 5, 7],
      [6, 6, 2, 3, 3, 7, 7],
      [6, 6, 6, 3, 7, 7, 7],
      [6, 6, 6, 6, 7, 7, 7],
    ],
    solution: [[0, 5], [1, 3], [2, 1], [3, 6], [4, 4], [5, 2], [6, 0]],
    hint: "Region 6 (large bottom-left) still gets only one queen — find which row forces it.",
  },
];

// ---- PINPOINT PUZZLES ----
// clues: 5 words shown progressively (more clues = easier, lower score)
// answer: the connecting word/category
// choices: 4 tap options shown to the player

const PINPOINT_POOL: PinpointPuzzle[] = [
  {
    id: "p1", type: "pinpoint", difficulty: "easy", title: "What Connects These?",
    clues: ["Java", "Python", "Ruby", "Swift", "Go"],
    answer: "PROGRAMMING", choices: ["PROGRAMMING", "BEVERAGES", "ANIMALS", "LANGUAGES"],
    hint: "Think software development",
  },
  {
    id: "p2", type: "pinpoint", difficulty: "easy", title: "One Word Links Them",
    clues: ["Shooting", "Falling", "Morning", "Rock", "Gold"],
    answer: "STAR", choices: ["STAR", "SUN", "NIGHT", "MOON"],
    hint: "It comes after each of these words",
  },
  {
    id: "p3", type: "pinpoint", difficulty: "easy", title: "Name the Group",
    clues: ["Mercury", "Venus", "Earth", "Mars", "Jupiter"],
    answer: "PLANETS", choices: ["PLANETS", "ELEMENTS", "GODS", "METALS"],
    hint: "Our solar system",
  },
  {
    id: "p4", type: "pinpoint", difficulty: "medium", title: "Find the Link",
    clues: ["Black", "Blue", "Green", "White", "Dead"],
    answer: "SEA", choices: ["SEA", "COLOR", "OCEAN", "WATER"],
    hint: "Bodies of water named with colors",
  },
  {
    id: "p5", type: "pinpoint", difficulty: "medium", title: "What Ties These?",
    clues: ["Cat", "Bear", "Honey", "Bumble", "Spelling"],
    answer: "BEE", choices: ["BEE", "ANIMAL", "INSECT", "HONEY"],
    hint: "A buzzing theme",
  },
  {
    id: "p6", type: "pinpoint", difficulty: "medium", title: "The Connector",
    clues: ["Fire", "Police", "Ice", "Rescue", "Motor"],
    answer: "STATION", choices: ["STATION", "TRUCK", "DEPARTMENT", "CREW"],
    hint: "Each has one in your city",
  },
  {
    id: "p7", type: "pinpoint", difficulty: "medium", title: "Common Thread",
    clues: ["Grand", "Piano", "Organ", "Reed", "Concert"],
    answer: "HALL", choices: ["HALL", "MUSIC", "INSTRUMENT", "STAGE"],
    hint: "A word that follows each clue",
  },
  {
    id: "p8", type: "pinpoint", difficulty: "hard", title: "Deep Cut",
    clues: ["Rocket", "Science", "Junk", "Computer", "Outer"],
    answer: "SPACE", choices: ["SPACE", "MAIL", "SCIENCE", "ROCKET"],
    hint: "Two meanings at play here",
  },
  {
    id: "p9", type: "pinpoint", difficulty: "hard", title: "Abstract Link",
    clues: ["Stone", "Rolling", "Micro", "Drum", "Jazz"],
    answer: "ROCK", choices: ["ROCK", "MUSIC", "BAND", "ROLL"],
    hint: "A genre and much more",
  },
  {
    id: "p10", type: "pinpoint", difficulty: "easy", title: "Classic Link",
    clues: ["Chess", "Checker", "Game", "Cutting", "Dart"],
    answer: "BOARD", choices: ["BOARD", "GAME", "PIECE", "TABLE"],
    hint: "What all of these are played on",
  },
  {
    id: "p11", type: "pinpoint", difficulty: "medium", title: "Find the Theme",
    clues: ["Ice", "Speed", "Figure", "Roller", "Inline"],
    answer: "SKATING", choices: ["SKATING", "HOCKEY", "WINTER", "SPORT"],
    hint: "Things you do on wheels or blades",
  },
  {
    id: "p12", type: "pinpoint", difficulty: "medium", title: "Lunar Phases",
    clues: ["Full", "Half", "Crescent", "New", "Gibbous"],
    answer: "MOON", choices: ["MOON", "LIGHT", "LUNAR", "PHASE"],
    hint: "Phases of a celestial body",
  },
  {
    id: "p13", type: "pinpoint", difficulty: "hard", title: "Tricky Combo",
    clues: ["Book", "Worm", "Hole", "Keeper", "Mark"],
    answer: "BOOK", choices: ["BOOK", "PAGE", "READ", "WORM"],
    hint: "It can precede or follow each clue",
  },
  {
    id: "p14", type: "pinpoint", difficulty: "easy", title: "Fruit Connections",
    clues: ["Apple", "Cherry", "Lemon", "Grape", "Plum"],
    answer: "PIE", choices: ["PIE", "JAM", "JUICE", "TREE"],
    hint: "A classic dessert made from all of these",
  },
  {
    id: "p15", type: "pinpoint", difficulty: "hard", title: "Mind the Gap",
    clues: ["Time", "Inner", "Deep", "Air", "Blank"],
    answer: "SPACE", choices: ["SPACE", "TRAVEL", "VOID", "GAP"],
    hint: "A word that follows all but one",
  },
  {
    id: "p16", type: "pinpoint", difficulty: "medium", title: "Name the Link",
    clues: ["Full", "Short", "High", "Side", "Story"],
    answer: "STOP", choices: ["STOP", "SPEED", "BREAK", "PAUSE"],
    hint: "Think traffic and writing",
  },
  {
    id: "p17", type: "pinpoint", difficulty: "hard", title: "Compound Words",
    clues: ["Sun", "Rain", "Thunder", "Light", "Snow"],
    answer: "STORM", choices: ["STORM", "CLOUD", "WEATHER", "BOLT"],
    hint: "Add this to each for a compound word",
  },
  {
    id: "p18", type: "pinpoint", difficulty: "easy", title: "Ocean Theme",
    clues: ["Blue", "Great White", "Hammerhead", "Tiger", "Whale"],
    answer: "SHARK", choices: ["SHARK", "FISH", "OCEAN", "HUNTER"],
    hint: "All types of the same creature",
  },
  {
    id: "p19", type: "pinpoint", difficulty: "medium", title: "Hidden Word",
    clues: ["Hand", "Pocket", "Wrist", "Alarm", "Sun"],
    answer: "WATCH", choices: ["WATCH", "CLOCK", "TIME", "STRAP"],
    hint: "A device for telling time",
  },
  {
    id: "p20", type: "pinpoint", difficulty: "hard", title: "Wordplay",
    clues: ["Over", "Under", "Out", "In", "Up"],
    answer: "SIDE", choices: ["SIDE", "TURN", "TAKE", "PASS"],
    hint: "Add this to each directional word",
  },
];

// ---- RIDDLE PUZZLES ----
const RIDDLE_POOL: RiddlePuzzle[] = [
  { id: "r1", type: "riddle", difficulty: "easy", title: "Number Sequence", question: "What number completes the sequence?\n2, 4, 8, 16, __", answer: "32", hint: "Each number is multiplied by 2" },
  { id: "r2", type: "riddle", difficulty: "medium", title: "Cat Puzzle", question: "3 cats catch 3 mice in 3 minutes. How many cats catch 100 mice in 100 minutes?", answer: "3", hint: "Think about the rate per cat" },
  { id: "r3", type: "riddle", difficulty: "hard", title: "Bat & Ball", question: "A bat and ball cost $1.10 total. The bat costs $1.00 more than the ball. How many cents is the ball?", answer: "5", hint: "It's not 10 cents. Set up an equation." },
  { id: "r4", type: "riddle", difficulty: "easy", title: "Fibonacci", question: "What comes next?\n1, 1, 2, 3, 5, 8, __", answer: "13", hint: "Each number is the sum of the two before it" },
  { id: "r5", type: "riddle", difficulty: "medium", title: "Age Puzzle", question: "A father is 4 times as old as his son. In 20 years, he'll be twice as old. How old is the son now?", answer: "10", hint: "Set up two equations with the current ages" },
  { id: "r6", type: "riddle", difficulty: "hard", title: "Counterfeit Coin", question: "You have 12 coins. One is fake (lighter). What's the minimum weighings on a balance scale to find it?", answer: "3", hint: "Divide into groups of 3" },
  { id: "r7", type: "riddle", difficulty: "easy", title: "Always Coming", question: "I'm always coming but never arrive. What am I?", answer: "tomorrow", hint: "Think about time and days" },
  { id: "r8", type: "riddle", difficulty: "medium", title: "Two Coins", question: "I have two coins totaling 30 cents. One is not a nickel. What are the coins?", answer: "quarter nickel", hint: "Only ONE is not a nickel" },
  { id: "r9", type: "riddle", difficulty: "easy", title: "Speak Without Mouth", question: "I speak without a mouth and hear without ears. I have no body, but come alive with the wind. What am I?", answer: "echo", hint: "Mountains have many of me" },
  { id: "r10", type: "riddle", difficulty: "medium", title: "Surgeon's Paradox", question: "A man goes to a hospital. The surgeon says 'I can't operate on this man, he's my son.' The surgeon is not his father. Who is the surgeon?", answer: "mother", hint: "Challenge your assumptions about the surgeon" },
];

// ---- GRID PUZZLES ----
const GRID_POOL: GridPuzzle[] = [
  {
    id: "g1", type: "grid", difficulty: "easy", title: "Magic Square",
    size: 3,
    grid: [[2, 7, 6], [9, null, 1], [4, 3, 8]],
    solution: [[2, 7, 6], [9, 5, 1], [4, 3, 8]],
    hint: "Each row, column, and diagonal sums to 15",
    instructions: "Fill the empty cell so every row, column, and diagonal sums to 15.",
  },
  {
    id: "g2", type: "grid", difficulty: "medium", title: "Number Grid",
    size: 3,
    grid: [[1, null, 3], [4, 5, null], [null, 8, 9]],
    solution: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    hint: "Fill in sequential missing numbers",
    instructions: "Complete the grid with the missing numbers. Each number appears exactly once.",
  },
];

// ---- DAILY SEQUENCE (alternates queens and pinpoint) ----
const DAILY_SEQUENCE: Puzzle[] = [
  QUEENS_POOL[0], PINPOINT_POOL[0],
  QUEENS_POOL[1], PINPOINT_POOL[1],
  QUEENS_POOL[2], PINPOINT_POOL[2],
  QUEENS_POOL[3], PINPOINT_POOL[3],
  QUEENS_POOL[4], PINPOINT_POOL[4],
  QUEENS_POOL[5], PINPOINT_POOL[5],
  RIDDLE_POOL[0], PINPOINT_POOL[6],
  RIDDLE_POOL[1], PINPOINT_POOL[7],
  RIDDLE_POOL[2], PINPOINT_POOL[8],
  QUEENS_POOL[0], PINPOINT_POOL[9],
  QUEENS_POOL[1], PINPOINT_POOL[10],
  QUEENS_POOL[2], PINPOINT_POOL[11],
  QUEENS_POOL[3], PINPOINT_POOL[12],
  QUEENS_POOL[4], PINPOINT_POOL[13],
  QUEENS_POOL[5], PINPOINT_POOL[14],
];

const ALL_PUZZLES: Puzzle[] = [
  ...QUEENS_POOL,
  ...PINPOINT_POOL,
  ...RIDDLE_POOL,
  ...GRID_POOL,
];

export const DAILY_SESSION_LENGTH = 15;
export const PRACTICE_SESSION_LENGTH = 10;
export const CHALLENGE_SESSION_LENGTH = 10;

function getDayIndex(): number {
  const start = new Date(2024, 0, 1);
  const today = new Date();
  return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function buildSession(pool: Puzzle[], length: number, seed = 0): Puzzle[] {
  const source = pool.length > 0 ? pool : ALL_PUZZLES;
  if (source.length === 0) return [];

  const ordered = [...source];
  const rotation = ((seed % ordered.length) + ordered.length) % ordered.length;
  const rotated = ordered.slice(rotation).concat(ordered.slice(0, rotation));
  const picks: Puzzle[] = [];

  while (picks.length < length) {
    const next = rotated[picks.length % rotated.length];
    picks.push(next);
  }

  return picks;
}

export function getDailyPuzzle(): Puzzle {
  return getDailyPuzzles(1)[0];
}

export function getDailyPuzzles(length = DAILY_SESSION_LENGTH): Puzzle[] {
  const dayIndex = getDayIndex();
  return buildSession(DAILY_SEQUENCE, length, dayIndex * 3);
}

export function getPracticePuzzle(type?: PuzzleType, difficulty?: string): Puzzle {
  return getPracticePuzzles(type, difficulty, 1)[0];
}

export function getPracticePuzzles(type?: PuzzleType, difficulty?: string, length = PRACTICE_SESSION_LENGTH): Puzzle[] {
  let pool = ALL_PUZZLES;
  if (type) pool = pool.filter((p) => p.type === type);
  if (difficulty) pool = pool.filter((p) => p.difficulty === difficulty);
  if (pool.length === 0) pool = ALL_PUZZLES;

  const seed = Date.now();
  return buildSession(pool, length, seed);
}

export function getChallengePuzzles(count = CHALLENGE_SESSION_LENGTH): Puzzle[] {
  const challengePool: Puzzle[] = [
    ...QUEENS_POOL,
    ...PINPOINT_POOL.filter((p) => p.difficulty !== "easy"),
    ...RIDDLE_POOL,
    ...GRID_POOL,
  ];

  const ordered = [
    ...challengePool.filter((p) => p.difficulty === "easy"),
    ...challengePool.filter((p) => p.difficulty === "medium"),
    ...challengePool.filter((p) => p.difficulty === "hard"),
  ];

  return buildSession(ordered, count, getDayIndex() * 5 + 7);
}

export function getArchivePuzzles(): Puzzle[] {
  return [...ALL_PUZZLES].sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    if (a.difficulty !== b.difficulty) return a.difficulty.localeCompare(b.difficulty);
    return a.title.localeCompare(b.title);
  });
}

export function getDailyPuzzleNumber(): number {
  return getDayIndex() + 1;
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return ALL_PUZZLES.find((p) => p.id === id);
}

export function getHint(puzzle: Puzzle): string {
  return puzzle.hint;
}
