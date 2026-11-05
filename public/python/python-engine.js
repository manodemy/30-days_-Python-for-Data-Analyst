// ═══════════════════════════════════════════════════════════════
// MANODEMY — PYTHON STUDIO ENGINE (100% Parity with SQL Engine)
// Pyodide-powered runtime with slides, Whisper sync, dark/light theme,
// dual CodeMirror editors, 25-question test portal, and scorecards.
// ═══════════════════════════════════════════════════════════════

'use strict';

// ── Global State ──────────────────────────────────────────────
let pyodide = null;
let pyodideReady = false;

let currentDayId = null;
let currentDayData = null;
let currentSlideIndex = 0;
let currentQuestionIndex = 0;

// Test portal state
let testEditor = null;
let testTimerInterval = null;
let testSecondsLeft = 7200; // 120 mins
let testAnswers = {}; // { questionId: { code, passed, message, stdout } }
let currentTestQuestionIndex = 0;

// Main editor
let mainEditor = null;

// Narration / Playback State
let isCombinedPlaying = false;
let combinedTrackIndex = 0;
let combinedTracks = [];
let combinedTrackDurations = [];
let totalCombinedDuration = 0;
let currentCombinedTime = 0;
let currentPlaybackRate = 1.0;
let currentPlaybackVolume = 1.0;
let ttsUtterance = null;
let playbackTimerInterval = null;
let isMuted = false;

// Audio playback instance
let activeCombinedAudio = null;
let currentPlayingAudio = null;
let currentPlayingBtn = null;
let typewriterTimer = null;

// Drawing canvas state
let isDrawing = false;
let drawMode = 'pen'; // 'pen' | 'rect' | 'laser'
let drawStrokes = [];

// Persistence key

const STORAGE_KEY = 'manodemy_python_progress';

// ── Track Registries (100% Parity with SQL Engine) ────────────
const PYTHON_DAY_TRACKS = {
    'pyDay01': {
    tracks: [
  {
    "src": "Day01/New_PyDay01Audio01.mp3",
    "target": "#day01WhyPythonSection",
    "title": "01. Python in Modern Data Analytics",
    "type": "narration"
  },
  {
    "src": "Day01/New_PyDay01Audio02.mp3",
    "target": "#day01ToolMatrixSection",
    "title": "Tool Matrix: SQL vs Excel vs Python",
    "type": "narration"
  },
  {
    "src": "Day01/New_PyDay01Audio03.mp3",
    "target": "#day01MutabilitySection",
    "title": "02. Object Mutability & Shared References",
    "type": "narration"
  },
  {
    "src": "Day01/New_PyDay01Audio04.mp3",
    "target": "#day01DataTypesSection",
    "title": "03. Master Data Types Reference",
    "type": "narration"
  },
  {
    "src": "Day01/New_PyDay01Audio05.mp3",
    "target": "#day01MemorySection",
    "title": "04. Memory Management & RAM Pointers",
    "type": "narration"
  },
  {
    "src": "Day01/New_PyDay01Question01.mp3",
    "target": "#questionBar",
    "title": "Question 1",
    "type": "question",
    "qId": 1
  },
  {
    "src": "Day01/New_PyDay01Question01sol.mp3",
    "target": "#questionBar",
    "title": "Q1 Solution Walkthrough",
    "type": "solution",
    "qId": 1
  },
  {
    "src": "Day01/New_PyDay01Question02.mp3",
    "target": "#questionBar",
    "title": "Question 2",
    "type": "question",
    "qId": 2
  },
  {
    "src": "Day01/New_PyDay01Question02sol.mp3",
    "target": "#questionBar",
    "title": "Q2 Solution Walkthrough",
    "type": "solution",
    "qId": 2
  },
  {
    "src": "Day01/New_PyDay01Question03.mp3",
    "target": "#questionBar",
    "title": "Question 3",
    "type": "question",
    "qId": 3
  },
  {
    "src": "Day01/New_PyDay01Question03sol.mp3",
    "target": "#questionBar",
    "title": "Q3 Solution Walkthrough",
    "type": "solution",
    "qId": 3
  },
  {
    "src": "Day01/New_PyDay01Question04.mp3",
    "target": "#questionBar",
    "title": "Question 4",
    "type": "question",
    "qId": 4
  },
  {
    "src": "Day01/New_PyDay01Question04sol.mp3",
    "target": "#questionBar",
    "title": "Q4 Solution Walkthrough",
    "type": "solution",
    "qId": 4
  },
  {
    "src": "Day01/New_PyDay01Question05.mp3",
    "target": "#questionBar",
    "title": "Question 5",
    "type": "question",
    "qId": 5
  },
  {
    "src": "Day01/New_PyDay01Question05sol.mp3",
    "target": "#questionBar",
    "title": "Q5 Solution Walkthrough",
    "type": "solution",
    "qId": 5
  },
  {
    "src": "Day01/New_PyDay01Question06.mp3",
    "target": "#questionBar",
    "title": "Question 6",
    "type": "question",
    "qId": 6
  },
  {
    "src": "Day01/New_PyDay01Question06sol.mp3",
    "target": "#questionBar",
    "title": "Q6 Solution Walkthrough",
    "type": "solution",
    "qId": 6
  },
  {
    "src": "Day01/New_PyDay01Question07.mp3",
    "target": "#questionBar",
    "title": "Question 7",
    "type": "question",
    "qId": 7
  },
  {
    "src": "Day01/New_PyDay01Question07sol.mp3",
    "target": "#questionBar",
    "title": "Q7 Solution Walkthrough",
    "type": "solution",
    "qId": 7
  },
  {
    "src": "Day01/New_PyDay01Question08.mp3",
    "target": "#questionBar",
    "title": "Question 8",
    "type": "question",
    "qId": 8
  },
  {
    "src": "Day01/New_PyDay01Question08sol.mp3",
    "target": "#questionBar",
    "title": "Q8 Solution Walkthrough",
    "type": "solution",
    "qId": 8
  },
  {
    "src": "Day01/New_PyDay01Question09.mp3",
    "target": "#questionBar",
    "title": "Question 9",
    "type": "question",
    "qId": 9
  },
  {
    "src": "Day01/New_PyDay01Question09sol.mp3",
    "target": "#questionBar",
    "title": "Q9 Solution Walkthrough",
    "type": "solution",
    "qId": 9
  },
  {
    "src": "Day01/New_PyDay01Question10.mp3",
    "target": "#questionBar",
    "title": "Question 10",
    "type": "question",
    "qId": 10
  },
  {
    "src": "Day01/New_PyDay01Question10sol.mp3",
    "target": "#questionBar",
    "title": "Q10 Solution Walkthrough",
    "type": "solution",
    "qId": 10
  },
  {
    "src": "Day01/New_PyDay01Question11.mp3",
    "target": "#questionBar",
    "title": "Question 11",
    "type": "question",
    "qId": 11
  },
  {
    "src": "Day01/New_PyDay01Question11sol.mp3",
    "target": "#questionBar",
    "title": "Q11 Solution Walkthrough",
    "type": "solution",
    "qId": 11
  },
  {
    "src": "Day01/New_PyDay01Question12.mp3",
    "target": "#questionBar",
    "title": "Question 12",
    "type": "question",
    "qId": 12
  },
  {
    "src": "Day01/New_PyDay01Question12sol.mp3",
    "target": "#questionBar",
    "title": "Q12 Solution Walkthrough",
    "type": "solution",
    "qId": 12
  },
  {
    "src": "Day01/New_PyDay01Question13.mp3",
    "target": "#questionBar",
    "title": "Question 13",
    "type": "question",
    "qId": 13
  },
  {
    "src": "Day01/New_PyDay01Question13sol.mp3",
    "target": "#questionBar",
    "title": "Q13 Solution Walkthrough",
    "type": "solution",
    "qId": 13
  },
  {
    "src": "Day01/New_PyDay01Question14.mp3",
    "target": "#questionBar",
    "title": "Question 14",
    "type": "question",
    "qId": 14
  },
  {
    "src": "Day01/New_PyDay01Question14sol.mp3",
    "target": "#questionBar",
    "title": "Q14 Solution Walkthrough",
    "type": "solution",
    "qId": 14
  },
  {
    "src": "Day01/New_PyDay01Question15.mp3",
    "target": "#questionBar",
    "title": "Question 15",
    "type": "question",
    "qId": 15
  },
  {
    "src": "Day01/New_PyDay01Question15sol.mp3",
    "target": "#questionBar",
    "title": "Q15 Solution Walkthrough",
    "type": "solution",
    "qId": 15
  }
],
    durations: [47.0, 46.0, 47.8, 46.9, 50.1, 10.1, 11.4, 11.1, 12.8, 11.4, 11.7, 12.0, 11.9, 13.5, 14.5, 10.9, 10.7, 12.4, 9.4, 14.1, 13.4, 14.5, 14.3, 12.0, 12.9, 12.4, 11.6, 11.5, 9.6, 10.8, 13.8, 11.5, 13.7, 10.2, 13.3]
  },
'pyDay03': {
  tracks: [
    { "src": "Day03/New_PyDay03Audio01.mp3", "target": "#day03FundamentalsSection", "title": "Fundamentals", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio02.mp3", "target": "#day03FundamentalsTableSection", "title": "Fundamentals — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio03.mp3", "target": "#day03FundamentalsCodeSection", "title": "Fundamentals — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio04.mp3", "target": "#day03EscapesSection", "title": "Escape Sequences and Raw Strings", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio05.mp3", "target": "#day03EscapesTableSection", "title": "Escape Sequences and Raw Strings — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio06.mp3", "target": "#day03EscapesCodeSection", "title": "Escape Sequences and Raw Strings — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio07.mp3", "target": "#day03ConcatSection", "title": "Concatenation, Repetition and Comparison", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio08.mp3", "target": "#day03ConcatTableSection", "title": "Concatenation, Repetition and Comparison — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio09.mp3", "target": "#day03ConcatCodeSection", "title": "Concatenation, Repetition and Comparison — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio10.mp3", "target": "#day03SlicingSection", "title": "Indexing and Slicing", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio11.mp3", "target": "#day03SlicingTableSection", "title": "Indexing and Slicing — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio12.mp3", "target": "#day03SlicingCodeSection", "title": "Indexing and Slicing — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio13.mp3", "target": "#day03FormattingSection", "title": "String Formatting", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio14.mp3", "target": "#day03FormattingTableSection", "title": "String Formatting — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio15.mp3", "target": "#day03FormattingCodeSection", "title": "String Formatting — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio16.mp3", "target": "#day03MethodsSection", "title": "String Methods", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio17.mp3", "target": "#day03MethodsTableSection", "title": "String Methods — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio18.mp3", "target": "#day03MethodsCodeSection", "title": "String Methods — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio19.mp3", "target": "#day03ValidationSection", "title": "Validation Methods Compared", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio20.mp3", "target": "#day03ValidationTableSection", "title": "Validation Methods Compared — Reference", "type": "narration" },
    { "src": "Day03/New_PyDay03Audio21.mp3", "target": "#day03ValidationCodeSection", "title": "Validation Methods Compared — Examples", "type": "narration" },
    { "src": "Day03/New_PyDay03Question01.mp3", "target": "#questionBar", "title": "Question 1", "type": "question", "qId": 1 },
    { "src": "Day03/New_PyDay03Question01sol.mp3", "target": "#questionBar", "title": "Q1 Solution Walkthrough", "type": "solution", "qId": 1 },
    { "src": "Day03/New_PyDay03Question02.mp3", "target": "#questionBar", "title": "Question 2", "type": "question", "qId": 2 },
    { "src": "Day03/New_PyDay03Question02sol.mp3", "target": "#questionBar", "title": "Q2 Solution Walkthrough", "type": "solution", "qId": 2 },
    { "src": "Day03/New_PyDay03Question03.mp3", "target": "#questionBar", "title": "Question 3", "type": "question", "qId": 3 },
    { "src": "Day03/New_PyDay03Question03sol.mp3", "target": "#questionBar", "title": "Q3 Solution Walkthrough", "type": "solution", "qId": 3 },
    { "src": "Day03/New_PyDay03Question04.mp3", "target": "#questionBar", "title": "Question 4", "type": "question", "qId": 4 },
    { "src": "Day03/New_PyDay03Question04sol.mp3", "target": "#questionBar", "title": "Q4 Solution Walkthrough", "type": "solution", "qId": 4 },
    { "src": "Day03/New_PyDay03Question05.mp3", "target": "#questionBar", "title": "Question 5", "type": "question", "qId": 5 },
    { "src": "Day03/New_PyDay03Question05sol.mp3", "target": "#questionBar", "title": "Q5 Solution Walkthrough", "type": "solution", "qId": 5 },
    { "src": "Day03/New_PyDay03Question06.mp3", "target": "#questionBar", "title": "Question 6", "type": "question", "qId": 6 },
    { "src": "Day03/New_PyDay03Question06sol.mp3", "target": "#questionBar", "title": "Q6 Solution Walkthrough", "type": "solution", "qId": 6 },
    { "src": "Day03/New_PyDay03Question07.mp3", "target": "#questionBar", "title": "Question 7", "type": "question", "qId": 7 },
    { "src": "Day03/New_PyDay03Question07sol.mp3", "target": "#questionBar", "title": "Q7 Solution Walkthrough", "type": "solution", "qId": 7 },
    { "src": "Day03/New_PyDay03Question08.mp3", "target": "#questionBar", "title": "Question 8", "type": "question", "qId": 8 },
    { "src": "Day03/New_PyDay03Question08sol.mp3", "target": "#questionBar", "title": "Q8 Solution Walkthrough", "type": "solution", "qId": 8 },
    { "src": "Day03/New_PyDay03Question09.mp3", "target": "#questionBar", "title": "Question 9", "type": "question", "qId": 9 },
    { "src": "Day03/New_PyDay03Question09sol.mp3", "target": "#questionBar", "title": "Q9 Solution Walkthrough", "type": "solution", "qId": 9 },
    { "src": "Day03/New_PyDay03Question10.mp3", "target": "#questionBar", "title": "Question 10", "type": "question", "qId": 10 },
    { "src": "Day03/New_PyDay03Question10sol.mp3", "target": "#questionBar", "title": "Q10 Solution Walkthrough", "type": "solution", "qId": 10 },
    { "src": "Day03/New_PyDay03Question11.mp3", "target": "#questionBar", "title": "Question 11", "type": "question", "qId": 11 },
    { "src": "Day03/New_PyDay03Question11sol.mp3", "target": "#questionBar", "title": "Q11 Solution Walkthrough", "type": "solution", "qId": 11 },
    { "src": "Day03/New_PyDay03Question12.mp3", "target": "#questionBar", "title": "Question 12", "type": "question", "qId": 12 },
    { "src": "Day03/New_PyDay03Question12sol.mp3", "target": "#questionBar", "title": "Q12 Solution Walkthrough", "type": "solution", "qId": 12 },
    { "src": "Day03/New_PyDay03Question13.mp3", "target": "#questionBar", "title": "Question 13", "type": "question", "qId": 13 },
    { "src": "Day03/New_PyDay03Question13sol.mp3", "target": "#questionBar", "title": "Q13 Solution Walkthrough", "type": "solution", "qId": 13 },
    { "src": "Day03/New_PyDay03Question14.mp3", "target": "#questionBar", "title": "Question 14", "type": "question", "qId": 14 },
    { "src": "Day03/New_PyDay03Question14sol.mp3", "target": "#questionBar", "title": "Q14 Solution Walkthrough", "type": "solution", "qId": 14 },
    { "src": "Day03/New_PyDay03Question15.mp3", "target": "#questionBar", "title": "Question 15", "type": "question", "qId": 15 },
    { "src": "Day03/New_PyDay03Question15sol.mp3", "target": "#questionBar", "title": "Q15 Solution Walkthrough", "type": "solution", "qId": 15 },
  ],
  durations: []
},
'pyDay02': {
    tracks: [
  {
    "src": "Day02/New_PyDay02Audio01.mp3",
    "target": "#day02ArithSection",
    "title": "01. Arithmetic & In-Place Assignment",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio02.mp3",
    "target": "#day02ArithTableSection",
    "title": "Arithmetic Operator Reference Table",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio03.mp3",
    "target": "#day02ArithCodeSection",
    "title": "Compound Interest & Mutability Example",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio04.mp3",
    "target": "#day02CompSection",
    "title": "02. Comparison Operators & Chaining",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio05.mp3",
    "target": "#day02CompTableSection",
    "title": "Comparison Patterns & Chaining Matrix",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio06.mp3",
    "target": "#day02CompCodeSection",
    "title": "Data Quality Validation with Chained Checks",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio07.mp3",
    "target": "#day02LogSection",
    "title": "03. Logical Operators & Short-Circuit",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio08.mp3",
    "target": "#day02LogTableSection",
    "title": "Short-Circuit Evaluation Matrix",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio09.mp3",
    "target": "#day02LogCodeSection",
    "title": "Defensive Division Guard & Fallbacks",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio10.mp3",
    "target": "#day02IdSection",
    "title": "04. Identity (is) vs Membership (in)",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio11.mp3",
    "target": "#day02IdTableSection",
    "title": "Identity vs Membership Comparison Table",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio12.mp3",
    "target": "#day02IdCodeSection",
    "title": "High-Speed Stop-Word Filter with Sets",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio13.mp3",
    "target": "#day02BitSection",
    "title": "05. Bitwise Operators & Binary Masks",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio14.mp3",
    "target": "#day02BitTableSection",
    "title": "Bitwise Operator Reference Table",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio15.mp3",
    "target": "#day02BitCodeSection",
    "title": "Role-Based Access Control (RBAC) Bitmask",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio16.mp3",
    "target": "#day02WalrusSection",
    "title": "06. Ternary & The Walrus Operator (:=)",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio17.mp3",
    "target": "#day02WalrusTableSection",
    "title": "Operator Precedence Hierarchy Table",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Audio18.mp3",
    "target": "#day02WalrusCodeSection",
    "title": "Walrus in List Comprehensions & Loops",
    "type": "narration"
  },
  {
    "src": "Day02/New_PyDay02Question01.mp3",
    "target": "#questionBar",
    "title": "Question 1",
    "type": "question",
    "qId": 1
  },
  {
    "src": "Day02/New_PyDay02Question01sol.mp3",
    "target": "#questionBar",
    "title": "Q1 Solution Walkthrough",
    "type": "solution",
    "qId": 1
  },
  {
    "src": "Day02/New_PyDay02Question02.mp3",
    "target": "#questionBar",
    "title": "Question 2",
    "type": "question",
    "qId": 2
  },
  {
    "src": "Day02/New_PyDay02Question02sol.mp3",
    "target": "#questionBar",
    "title": "Q2 Solution Walkthrough",
    "type": "solution",
    "qId": 2
  },
  {
    "src": "Day02/New_PyDay02Question03.mp3",
    "target": "#questionBar",
    "title": "Question 3",
    "type": "question",
    "qId": 3
  },
  {
    "src": "Day02/New_PyDay02Question03sol.mp3",
    "target": "#questionBar",
    "title": "Q3 Solution Walkthrough",
    "type": "solution",
    "qId": 3
  },
  {
    "src": "Day02/New_PyDay02Question04.mp3",
    "target": "#questionBar",
    "title": "Question 4",
    "type": "question",
    "qId": 4
  },
  {
    "src": "Day02/New_PyDay02Question04sol.mp3",
    "target": "#questionBar",
    "title": "Q4 Solution Walkthrough",
    "type": "solution",
    "qId": 4
  },
  {
    "src": "Day02/New_PyDay02Question05.mp3",
    "target": "#questionBar",
    "title": "Question 5",
    "type": "question",
    "qId": 5
  },
  {
    "src": "Day02/New_PyDay02Question05sol.mp3",
    "target": "#questionBar",
    "title": "Q5 Solution Walkthrough",
    "type": "solution",
    "qId": 5
  },
  {
    "src": "Day02/New_PyDay02Question06.mp3",
    "target": "#questionBar",
    "title": "Question 6",
    "type": "question",
    "qId": 6
  },
  {
    "src": "Day02/New_PyDay02Question06sol.mp3",
    "target": "#questionBar",
    "title": "Q6 Solution Walkthrough",
    "type": "solution",
    "qId": 6
  },
  {
    "src": "Day02/New_PyDay02Question07.mp3",
    "target": "#questionBar",
    "title": "Question 7",
    "type": "question",
    "qId": 7
  },
  {
    "src": "Day02/New_PyDay02Question07sol.mp3",
    "target": "#questionBar",
    "title": "Q7 Solution Walkthrough",
    "type": "solution",
    "qId": 7
  },
  {
    "src": "Day02/New_PyDay02Question08.mp3",
    "target": "#questionBar",
    "title": "Question 8",
    "type": "question",
    "qId": 8
  },
  {
    "src": "Day02/New_PyDay02Question08sol.mp3",
    "target": "#questionBar",
    "title": "Q8 Solution Walkthrough",
    "type": "solution",
    "qId": 8
  },
  {
    "src": "Day02/New_PyDay02Question09.mp3",
    "target": "#questionBar",
    "title": "Question 9",
    "type": "question",
    "qId": 9
  },
  {
    "src": "Day02/New_PyDay02Question09sol.mp3",
    "target": "#questionBar",
    "title": "Q9 Solution Walkthrough",
    "type": "solution",
    "qId": 9
  },
  {
    "src": "Day02/New_PyDay02Question10.mp3",
    "target": "#questionBar",
    "title": "Question 10",
    "type": "question",
    "qId": 10
  },
  {
    "src": "Day02/New_PyDay02Question10sol.mp3",
    "target": "#questionBar",
    "title": "Q10 Solution Walkthrough",
    "type": "solution",
    "qId": 10
  },
  {
    "src": "Day02/New_PyDay02Question11.mp3",
    "target": "#questionBar",
    "title": "Question 11",
    "type": "question",
    "qId": 11
  },
  {
    "src": "Day02/New_PyDay02Question11sol.mp3",
    "target": "#questionBar",
    "title": "Q11 Solution Walkthrough",
    "type": "solution",
    "qId": 11
  },
  {
    "src": "Day02/New_PyDay02Question12.mp3",
    "target": "#questionBar",
    "title": "Question 12",
    "type": "question",
    "qId": 12
  },
  {
    "src": "Day02/New_PyDay02Question12sol.mp3",
    "target": "#questionBar",
    "title": "Q12 Solution Walkthrough",
    "type": "solution",
    "qId": 12
  },
  {
    "src": "Day02/New_PyDay02Question13.mp3",
    "target": "#questionBar",
    "title": "Question 13",
    "type": "question",
    "qId": 13
  },
  {
    "src": "Day02/New_PyDay02Question13sol.mp3",
    "target": "#questionBar",
    "title": "Q13 Solution Walkthrough",
    "type": "solution",
    "qId": 13
  },
  {
    "src": "Day02/New_PyDay02Question14.mp3",
    "target": "#questionBar",
    "title": "Question 14",
    "type": "question",
    "qId": 14
  },
  {
    "src": "Day02/New_PyDay02Question14sol.mp3",
    "target": "#questionBar",
    "title": "Q14 Solution Walkthrough",
    "type": "solution",
    "qId": 14
  },
  {
    "src": "Day02/New_PyDay02Question15.mp3",
    "target": "#questionBar",
    "title": "Question 15",
    "type": "question",
    "qId": 15
  },
  {
    "src": "Day02/New_PyDay02Question15sol.mp3",
    "target": "#questionBar",
    "title": "Q15 Solution Walkthrough",
    "type": "solution",
    "qId": 15
  }
],
    durations: [
  23.76,
  17.64,
  14.4,
  14.98,
  13.97,
  11.33,
  12.72,
  12.94,
  13.49,
  12.12,
  12.77,
  11.26,
  11.98,
  14.18,
  12.5,
  11.93,
  15.5,
  11.45,
  9.48,
  12.55,
  9.24,
  13.66,
  10.01,
  16.06,
  8.28,
  12.84,
  8.42,
  15.77,
  8.54,
  22.37,
  9.43,
  16.7,
  8.09,
  13.94,
  8.88,
  9.7,
  9.62,
  6.6,
  7.58,
  8.02,
  9.0,
  7.37,
  8.45,
  6.82,
  9.1,
  9.02,
  8.93,
  8.5
]
  },
  'pyDay04': {
    tracks: [
      { "src": "Day04/New_PyDay04Audio01.mp3", "target": "#day04FundamentalsSection", "title": "Fundamentals & Collections", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio02.mp3", "target": "#day04FundamentalsTableSection", "title": "Fundamentals — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio03.mp3", "target": "#day04FundamentalsCodeSection", "title": "Fundamentals — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio04.mp3", "target": "#day04IndexingSlicingSection", "title": "Indexing & Slicing", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio05.mp3", "target": "#day04IndexingSlicingTableSection", "title": "Indexing & Slicing — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio06.mp3", "target": "#day04IndexingSlicingCodeSection", "title": "Indexing & Slicing — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio07.mp3", "target": "#day04UnpackingSection", "title": "Unpacking & Starred Assignment", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio08.mp3", "target": "#day04UnpackingTableSection", "title": "Unpacking — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio09.mp3", "target": "#day04UnpackingCodeSection", "title": "Unpacking — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio10.mp3", "target": "#day04ModifyingSection", "title": "Modifying Lists & Mutability", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio11.mp3", "target": "#day04ModifyingTableSection", "title": "Modifying — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio12.mp3", "target": "#day04ModifyingCodeSection", "title": "Modifying — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio13.mp3", "target": "#day04AddingSection", "title": "Adding Elements: append, insert, extend", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio14.mp3", "target": "#day04AddingTableSection", "title": "Adding Elements — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio15.mp3", "target": "#day04AddingCodeSection", "title": "Adding Elements — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio16.mp3", "target": "#day04RemovingSection", "title": "Removing Elements: pop, remove, del", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio17.mp3", "target": "#day04RemovingTableSection", "title": "Removing Elements — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio18.mp3", "target": "#day04RemovingCodeSection", "title": "Removing Elements — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio19.mp3", "target": "#day04CopyingSection", "title": "References, Shallow & Deep Copy", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio20.mp3", "target": "#day04CopyingTableSection", "title": "Copying — Reference", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio21.mp3", "target": "#day04CopyingCodeSection", "title": "Copying — Code", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio22.mp3", "target": "#day04MistakesSection", "title": "14 Critical List Anti-Patterns", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio23.mp3", "target": "#day04SortingPerfSection", "title": "Sorting, Reversing & Complexity", "type": "narration" },
      { "src": "Day04/New_PyDay04Audio24.mp3", "target": "#day04SortingPerfCodeSection", "title": "Sorting & Analytics Code", "type": "narration" }
    ],
    durations: []
  },
  'pyDay05': {
    tracks: [
      { "src": "Day05/New_PyDay05Audio01.mp3", "target": "#day05FundamentalsSection", "title": "Fundamentals & Train Ticket", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio02.mp3", "target": "#day05FundamentalsCodeSection", "title": "Syntax & Commas Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio03.mp3", "target": "#day05MemorySection", "title": "Memory & Sealed Display Case", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio04.mp3", "target": "#day05MemoryTableSection", "title": "Memory Architecture Reference", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio05.mp3", "target": "#day05MemoryCodeSection", "title": "Memory & Nested Lists Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio06.mp3", "target": "#day05IndexingSection", "title": "Indexing & Locker Row", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio07.mp3", "target": "#day05IndexingTableSection", "title": "Indexing Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio08.mp3", "target": "#day05IndexingCodeSection", "title": "Indexing & Safe Guard Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio09.mp3", "target": "#day05SlicingSection", "title": "Slicing & Stop-Sign Rule", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio10.mp3", "target": "#day05SlicingTableSection", "title": "Slicing Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio11.mp3", "target": "#day05SlicingCodeSection", "title": "Slicing & Strides Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio12.mp3", "target": "#day05MethodsSection", "title": "Built-in Methods & Operations", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio13.mp3", "target": "#day05MethodsTableSection", "title": "Methods Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio14.mp3", "target": "#day05MethodsCodeSection", "title": "Methods & Roundtrip Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio15.mp3", "target": "#day05UnpackingSection", "title": "Packing & Unpacking", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio16.mp3", "target": "#day05UnpackingTableSection", "title": "Unpacking Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio17.mp3", "target": "#day05UnpackingCodeSection", "title": "Packing & Swap Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio18.mp3", "target": "#day05ApplicationsSection", "title": "Real-World Applications", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio19.mp3", "target": "#day05ApplicationsTableSection", "title": "Applications Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio20.mp3", "target": "#day05ApplicationsCodeSection", "title": "Dict Keys & NamedTuples Code", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio21.mp3", "target": "#day05DecisionSection", "title": "Architectural Decision Matrix", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio22.mp3", "target": "#day05DecisionTableSection", "title": "Matrix Reference Table", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio23.mp3", "target": "#day05MistakesSection", "title": "10 Critical Anti-Patterns", "type": "narration" },
      { "src": "Day05/New_PyDay05Audio24.mp3", "target": "#day05MistakesTableSection", "title": "Anti-Patterns Reference Table", "type": "narration" }
    ],
    durations: []
  },
  'pyDay06': {
    tracks: [
      { "src": "Day06/New_PyDay06Audio01.mp3", "target": "#day06FundamentalsSection", "title": "Fundamentals & Properties", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio02.mp3", "target": "#day06PropertiesTableSection", "title": "Structures Comparison Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio03.mp3", "target": "#day06CreationSection", "title": "Creation & Empty Set Trap", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio04.mp3", "target": "#day06CreationCodeSection", "title": "Creation Syntax Code", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio05.mp3", "target": "#day06InspectionSection", "title": "Membership & Hash Engine", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio06.mp3", "target": "#day06InspectionTableSection", "title": "Inspection Reference Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio07.mp3", "target": "#day06AddSection", "title": "Adding: add vs update", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio08.mp3", "target": "#day06AddMethodsTableSection", "title": "Insertion Methods Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio09.mp3", "target": "#day06RemoveSection", "title": "Removing: 5 Eviction Strategies", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio10.mp3", "target": "#day06RemoveMethodsTableSection", "title": "Eviction Reference Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio11.mp3", "target": "#day06RemoveCodeSection", "title": "Eviction Strategies Code", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio12.mp3", "target": "#day06DeduplicationSection", "title": "One-Line Deduplication", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio13.mp3", "target": "#day06DeduplicationTableSection", "title": "Deduplication Patterns Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio14.mp3", "target": "#day06MathOneSection", "title": "Union & Intersection Math", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio15.mp3", "target": "#day06MathOneCodeSection", "title": "Union & Intersection Code", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio16.mp3", "target": "#day06MathTwoSection", "title": "Difference & Symmetric Diff", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio17.mp3", "target": "#day06SetMathTableSection", "title": "Set Operations Matrix Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio18.mp3", "target": "#day06RelationshipsSection", "title": "Relationships & Disjoint Testing", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio19.mp3", "target": "#day06RelationshipsTableSection", "title": "Relationships Reference Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio20.mp3", "target": "#day06RelationshipsCodeSection", "title": "Relationships Code Walkthrough", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio21.mp3", "target": "#day06MistakesSection", "title": "10 Critical Set Anti-Patterns", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio22.mp3", "target": "#day06MistakesTableSection", "title": "Anti-Patterns Diagnostic Table", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio23.mp3", "target": "#day06InterviewSubcard", "title": "Top 25 FAANG Interview Questions", "type": "narration" },
      { "src": "Day06/New_PyDay06Audio24.mp3", "target": "#day06KeyNotesSubcard", "title": "Key Notes: Sets & Math", "type": "narration" }
    ],
    durations: []
  }
};


function updateLoadingProgress(pct) {
  const bar = document.getElementById('pyLoadingBar');
  if (bar) bar.style.width = pct + '%';
}

async function loadPyodideRuntime() {
  try {
    updateLoadingProgress(20);
    if (typeof loadPyodide === 'function') {
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
      });
      updateLoadingProgress(70);

      // Pre-warm stdlib imports & compile fast student code runner
      await pyodide.runPythonAsync(`
import sys, io as _io, ast as _ast, traceback as _traceback
import math, time, functools, copy
from collections import defaultdict, Counter, namedtuple
from decimal import Decimal

def __run_student_code_fast__(code):
    _buf_stdout = _io.StringIO()
    _buf_stderr = _io.StringIO()
    _old_stdout, _old_stderr = sys.stdout, sys.stderr
    sys.stdout, sys.stderr = _buf_stdout, _buf_stderr
    _init_keys = set(globals().keys())
    try:
        _parsed = _ast.parse(code)
        if _parsed.body:
            _last = _parsed.body[-1]
            if isinstance(_last, _ast.Expr):
                if len(_parsed.body) > 1:
                    exec(compile(_ast.Module(body=_parsed.body[:-1], type_ignores=[]), '<student_code>', 'exec'), globals())
                _eval_val = eval(compile(_ast.Expression(_last.value), '<student_code>', 'eval'), globals())
                if _eval_val is not None:
                    print(_eval_val)
            else:
                exec(compile(_parsed, '<student_code>', 'exec'), globals())
                if not _buf_stdout.getvalue().strip():
                    _assigned = [k for k in globals().keys() if not k.startswith('_') and k not in _init_keys and k != 'code']
                    for _k in _assigned:
                        print(f"{_k} = {repr(globals()[_k])}")
    except Exception:
        _traceback.print_exc(file=_buf_stderr)
    finally:
        sys.stdout, sys.stderr = _old_stdout, _old_stderr
    return (_buf_stdout.getvalue(), _buf_stderr.getvalue())

print("⚡ Python 3.11 fast execution engine ready.")
`);
      updateLoadingProgress(100);
      pyodideReady = true;
      window.pyodideReady = true;
      window.pyodide = pyodide;

      const runBtn = document.getElementById('runBtn');
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.textContent = '▶ Run';
      }
      const testRunBtn = document.getElementById('testRunBtn');
      if (testRunBtn) {
        testRunBtn.disabled = false;
        testRunBtn.textContent = '▶ Run';
      }

      const initMsg = document.getElementById('outputInitMsg');
      if (initMsg) initMsg.textContent = '⚡ Python 3.11 engine ready. Write code and click Run!';
    }
  } catch (err) {
    console.warn('Pyodide background loading notice:', err);
    const initMsg = document.getElementById('outputInitMsg');
    if (initMsg && !pyodideReady) initMsg.textContent = '⚠️ Python runtime loading in background...';
  }
}

// ── Initialisation ────────────────────────────────────────────

function init() {
  initTheme();
  updateOverallScoreUI();

  // Dismiss loading overlay smoothly so UI is immediately interactive
  setTimeout(() => {
    const overlay = document.getElementById('pyLoadingOverlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { overlay.style.display = 'none'; }, 250);
    }
  }, 100);

  // Initialize CodeMirror editor
  initMainEditor();

  // Build Day Selector
  buildDaySelector();

  // Resolve current day
  const urlParams = new URLSearchParams(window.location.search);
  let pathDay = null;
  const pathMatch = window.location.pathname.match(/day(\d+)\.html/i);
  if (pathMatch) pathDay = parseInt(pathMatch[1], 10);
  const requestedDay = parseInt(urlParams.get('day'), 10) || window.COURSE_DAY || pathDay || 1;

  let initialDay = null;
  if (window.COURSE_MANIFEST && window.COURSE_MANIFEST.length > 0) {
    initialDay = window.COURSE_MANIFEST.find(d => d.day === requestedDay);
  }
  if (initialDay) {
    loadDay(initialDay.id);
  } else {
    // Fallback direct load
    const fallbackId = 'pyDay' + String(requestedDay).padStart(2, '0');
    loadDay(fallbackId);
  }

  // Setup resizable divider
  initDivider();

  // Background runtime loading
  loadPyodideRuntime();

  // Close popovers when clicking outside
  document.addEventListener('click', e => {
    const qWrapper = document.getElementById('qPickerWrapper');
    const qPopover = document.getElementById('qPickerPopover');
    if (qWrapper && !qWrapper.contains(e.target) && qPopover) {
      qPopover.style.display = 'none';
    }

    const chapBtn = document.getElementById('chapterPillBtn');
    const chapList = document.getElementById('chapterList');
    if (chapBtn && !chapBtn.contains(e.target) && chapList && !chapList.contains(e.target)) {
      chapList.style.display = 'none';
    }

    const volWrapper = document.querySelector('.volume-control-wrapper');
    const volPopover = document.getElementById('volumePopover');
    if (volWrapper && !volWrapper.contains(e.target) && volPopover) {
      volPopover.classList.remove('open');
      document.getElementById('volumeBtn')?.classList.remove('active');
    }

    const speedWrapper = document.querySelector('.speed-control-wrapper');
    const speedPopover = document.getElementById('speedPopover');
    if (speedWrapper && !speedWrapper.contains(e.target) && speedPopover) {
      speedPopover.classList.remove('open');
      document.getElementById('speedControlBtn')?.classList.remove('active');
    }
  });

  // Hotkeys: Ctrl+Enter / Cmd+Enter runs code
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      const testOverlay = document.getElementById('testOverlay');
      if (testOverlay && testOverlay.style.display === 'flex') {
        runTestCode();
      } else {
        runCurrentCode();
      }
    }
  });
}

function updateLoadingProgress(pct) {
  const bar = document.getElementById('pyLoadingBar');
  if (bar) bar.style.width = pct + '%';
}

// ── Theme Engine (100% Parity with SQL Studio) ──────────────────

function initTheme() {
  try {
    const saved = localStorage.getItem('manodemy-theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeToggleUI(saved);
  } catch (e) {
    console.error('Error initTheme:', e);
  }
}

function updateThemeToggleUI(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  const isLight = theme === 'light';
  btn.setAttribute('aria-checked', isLight ? 'true' : 'false');
  btn.title = isLight ? 'Switch to Dark mode' : 'Switch to Light mode';
  btn.setAttribute('aria-label', isLight ? 'Switch to Dark mode' : 'Switch to Light mode');
}

function toggleTheme() {
  try {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.classList.add('theme-transitioning');
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('manodemy-theme', newTheme);
    updateThemeToggleUI(newTheme);

    const isLight = newTheme === 'light';
    const cmTheme = isLight ? 'default' : 'dracula';
    if (typeof mainEditor !== 'undefined' && mainEditor) {
      mainEditor.setOption('theme', cmTheme);
      setTimeout(() => { try { mainEditor.refresh(); } catch (e) {} }, 50);
    }
    if (typeof testEditor !== 'undefined' && testEditor) {
      testEditor.setOption('theme', cmTheme);
      setTimeout(() => { try { testEditor.refresh(); } catch (e) {} }, 50);
    }

    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 400);
  } catch (e) {
    console.error('Error toggling theme:', e);
  }
}
window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.updateThemeToggleUI = updateThemeToggleUI;

// ── Overall Scorecard Badge (/ 1500) ──────────────────────────

function updateOverallScoreUI() {
  let totalScore = 0;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.days) {
        Object.keys(parsed.days).forEach(k => {
          totalScore += (parsed.days[k].bestScore || 0);
          totalScore += (parsed.days[k].marks || 0);
        });
      }
    }
  } catch (e) {}

  const scoreEls = document.querySelectorAll('#headerOverallScore, #testHeaderOverallScore, .overall-score-num');
  scoreEls.forEach(el => {
    el.textContent = Math.round(totalScore);
  });

  const fills = document.querySelectorAll('#overallScoreBarFill, #testOverallScoreBarFill, .overall-score-bar-fill');
  const pct = Math.min(100, Math.max(0, (totalScore / 1500) * 100));
  fills.forEach(f => {
    f.style.width = `${pct}%`;
  });
}
window.updateOverallScoreUI = updateOverallScoreUI;

// ── Navigation & Day Selection ─────────────────────────────────

function buildDaySelector() {
  const sel = document.getElementById('daySelect');
  if (!sel) return;
  sel.innerHTML = '';

  const manifest = (window.COURSE_MANIFEST && window.COURSE_MANIFEST.length > 0)
    ? window.COURSE_MANIFEST
    : (window.COURSE_MANIFEST_60 && window.COURSE_MANIFEST_60.length > 0)
      ? window.COURSE_MANIFEST_60.filter(d => d.track === 'python').map(d => ({ day: d.trackDay, id: d.id, title: d.title, emoji: '🐍' }))
      : Array.from({ length: 27 }, (_, i) => ({ day: i + 1, id: `pyDay${String(i + 1).padStart(2, '0')}`, title: `Day ${String(i + 1).padStart(2, '0')}`, emoji: '🐍' }));

  manifest.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `Day ${String(item.day).padStart(2,'0')}: ${item.title}`;
    sel.appendChild(opt);
  });

  sel.onchange = () => {
    const targetDay = manifest.find(m => m.id === sel.value);
    if (targetDay) {
      window.location.href = `/python/day${String(targetDay.day).padStart(2,'0')}.html`;
    }
  };
}

function parseTrackDurationStr(str) {
  if (!str || typeof str !== 'string') return 90;
  const parts = str.split(':');
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 0;
    const secs = parseInt(parts[1], 10) || 0;
    return mins * 60 + secs;
  }
  return 90;
}

function scrollToLessonTarget(targetSelector, isInstant = false) {
  if (!targetSelector) return;
  try {
    const targetEl = document.querySelector(targetSelector);
    if (!targetEl) return;
    const container = document.getElementById('slideContent') || document.getElementById('slideBodyText');
    if (container && container.contains(targetEl)) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: Math.max(0, relativeTop - 20), behavior: isInstant ? 'auto' : 'smooth' });
    } else {
      targetEl.scrollIntoView({ behavior: isInstant ? 'auto' : 'smooth', block: 'start' });
    }
  } catch(e) {
    try {
      document.querySelector(targetSelector)?.scrollIntoView({ behavior: isInstant ? 'auto' : 'smooth', block: 'start' });
    } catch(err) {}
  }
}

function resolvePythonDayTracks(dayId, dayData) {
  // If pre-recorded Whisper ASR tracks exist for early days (pyDay01, pyDay02, pyDay03), use them
  if (PYTHON_DAY_TRACKS && PYTHON_DAY_TRACKS[dayId] && PYTHON_DAY_TRACKS[dayId].tracks && (dayId === 'pyDay01' || dayId === 'pyDay02' || dayId === 'pyDay03')) {
    return PYTHON_DAY_TRACKS[dayId];
  }

  // If complete tracks (at least 30) are already defined in registry, use them
  if (PYTHON_DAY_TRACKS && PYTHON_DAY_TRACKS[dayId] && PYTHON_DAY_TRACKS[dayId].tracks && PYTHON_DAY_TRACKS[dayId].tracks.length >= 30) {
    return PYTHON_DAY_TRACKS[dayId];
  }

  if (!dayData) return { tracks: [], durations: [] };

  const dayNum = parseInt(dayId.replace('pyDay', ''), 10) || 1;
  const pad = String(dayNum).padStart(2, '0');
  const tracks = [];
  const durations = [];

  const html = (dayData.slides && dayData.slides[0] && dayData.slides[0].html) || '';

  // Extract headings with IDs from slide HTML
  const h2Regex = /<h2[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/h2>/gi;
  const headings = [];
  let hm;
  while ((hm = h2Regex.exec(html)) !== null) {
    const id = hm[1];
    const inner = hm[2];
    const titleMatch = inner.match(/class=["']heading-title-text["'][^>]*>([\s\S]*?)<\/span>/i);
    let title = (titleMatch ? titleMatch[1] : inner).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    headings.push({ id, title });
  }

  // Also check section elements with IDs
  const secRegex = /<(?:section|div)[^>]*id=["']([^"']+)["'][^>]*class=["'][^"']*slide-section[^"']*["'][^>]*>/gi;
  const secIds = [];
  let sm;
  while ((sm = secRegex.exec(html)) !== null) {
    secIds.push(sm[1]);
  }

  const rawTopics = dayData.topics || [];
  const topicCount = Math.max(rawTopics.length, headings.length, 10);

  for (let i = 0; i < Math.min(10, topicCount); i++) {
    const rawTopic = rawTopics[i];
    const h = headings[i];
    let title = '';
    let target = '';
    let dur = 90;

    if (rawTopic) {
      if (typeof rawTopic === 'string') {
        title = rawTopic;
      } else if (typeof rawTopic === 'object') {
        title = rawTopic.label || rawTopic.title || '';
        if (rawTopic.id) target = '#' + rawTopic.id;
        if (rawTopic.duration) dur = parseTrackDurationStr(rawTopic.duration);
      }
    }

    if (!title && h) {
      title = h.title;
    }

    if (!target) {
      if (secIds[i]) {
        target = '#' + secIds[i];
      } else if (h && h.id) {
        target = '#' + h.id;
      }
    }

    // Clean title
    title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
    const numPrefix = String(i + 1).padStart(2, '0') + '. ';
    if (!title.startsWith(String(i + 1).padStart(2, '0')) && !title.match(/^\d+\.\s*/)) {
      title = numPrefix + title;
    }

    tracks.push({
      src: `Day${pad}/New_PyDay${pad}Audio${String(i + 1).padStart(2, '0')}.mp3`,
      target: target,
      title: title,
      type: 'narration'
    });
    durations.push(dur);
  }

  // Add practice questions and solutions
  const questions = dayData.practiceQuestions || [];
  questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const qPad = String(qNum).padStart(2, '0');
    tracks.push({
      src: `Day${pad}/New_PyDay${pad}Question${qPad}.mp3`,
      target: '#questionBar',
      title: `Question ${qNum}`,
      type: 'question',
      qId: q.id || qNum
    });
    durations.push(30);

    tracks.push({
      src: `Day${pad}/New_PyDay${pad}Question${qPad}sol.mp3`,
      target: '#questionBar',
      title: `Q${qNum} Solution Walkthrough`,
      type: 'solution',
      qId: q.id || qNum
    });
    durations.push(45);
  });

  return { tracks, durations };
}

function loadDay(dayId) {
  currentDayId = dayId;
  currentDayData = (window.COURSE_CONTENT && window.COURSE_CONTENT[dayId]) || null;

  if (!currentDayData) {
    console.error(`Course data for ${dayId} not found.`);
    return;
  }

  // Sync daySelect dropdown value
  const daySel = document.getElementById('daySelect');
  if (daySel) daySel.value = dayId;

  // Initialize master timeline tracks for this day
  const registry = currentDayData.media?.mode === 'study'
    ? { tracks: [], durations: [] }
    : resolvePythonDayTracks(dayId, currentDayData);
  combinedTracks = registry.tracks.slice();
  combinedTrackDurations = resolveTrackDurations(dayId, registry);
  totalCombinedDuration = combinedTrackDurations.reduce((acc, d) => acc + d, 0);

  const seekBar = document.getElementById('seekBar');
  if (seekBar) {
    seekBar.max = totalCombinedDuration;
    seekBar.value = 0;
  }
  const pTime = document.getElementById('playbackTime');
  if (pTime) {
    pTime.textContent = `0:00 / ${formatTime(totalCombinedDuration)}`;
  }
  document.getElementById('playbackBar')?.classList.add('visible');
  setupTimelineDragging();

  // Build topic selector & chapter list
  buildTopicSelector();
  buildChapterList();
  initCustomDropdowns();

  // Render the unified continuous lesson document
  currentSlideIndex = 0;
  renderSlide(0);

  // Load first practice question
  currentQuestionIndex = 0;
  buildQPickerList();
  loadPracticeQuestion(0);

  // Update stats
  updateStatsCard();
  updateLessonMediaAvailability();
  updateDayNavArrows();
}

function updateLessonMediaAvailability() {
  const studyOnly = currentDayData?.media?.mode === 'study';
  document.documentElement.dataset.courseMedia = studyOnly ? 'study' : 'narrated';
  document.querySelectorAll('.audio-play-btn, #navPlayBtn, #playPauseBtn').forEach(button => {
    button.disabled = studyOnly;
    if (studyOnly) {
      button.title = currentDayData.media.reason || 'Narration recording pending';
      button.setAttribute('aria-label', button.title);
    }
  });
  const player = document.getElementById('playbackBar');
  if (player) player.style.display = studyOnly ? 'none' : '';
  const nav = document.getElementById('navPlayBtn');
  if (studyOnly && nav) {
    nav.classList.remove('p11-play-radar-pulse');
    nav.textContent = 'Audio pending';
  }
}

/**
 * buildTopicSelector — SQL Day 02 parity.
 *
 * The topic picker is driven by `slides`, not the legacy `topics` array. A day
 * built as one continuous document therefore collapses to a single static
 * heading carrying the lesson's total duration, exactly like SQL Day 02.
 */
function buildTopicSelector() {
  const sel = document.getElementById('topicSelect');
  if (!sel || !currentDayData) return;
  sel.innerHTML = '';

  const slides = currentDayData.slides || [];
  if (!slides.length) {
    sel.innerHTML = '<option value="0">Overview</option>';
    sel.value = '0';
    return;
  }

  const multiTopic = slides.length > 1;
  const measuredTotal = getLessonDurationString();
  slides.forEach((slide, idx) => {
    const opt = document.createElement('option');
    opt.value = String(idx);
    const cleaned = slide.title
      .replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '')
      .replace(/\s*\([0-9:]+\)\s*$/, '');
    opt.textContent = `${multiTopic ? `Topic 0${idx + 1}: ` : ''}${cleaned} (${measuredTotal})`;
    sel.appendChild(opt);
  });

  sel.value = String(currentSlideIndex || 0);
}

function onTopicSelectChange(val) {
  const idx = parseInt(val, 10);
  if (Number.isNaN(idx)) return;
  // Selecting the slide that is already mounted must not remount it, or the
  // practice state inside the slide would be thrown away.
  if (idx !== currentSlideIndex || !document.getElementById('slideBodyText')) {
    renderSlide(idx);
  }
  if (typeof clearDrawCanvas === 'function') clearDrawCanvas();
}

// ── Custom Dropdowns Initializer (100% SQL Flagship Parity) ───────
function initCustomDropdowns() {
  const selects = document.querySelectorAll('.day-picker-pill select');
  selects.forEach(select => {
    const wrapper = select.parentElement;
    if (!wrapper) return;

    select.style.display = 'none';

    let trigger = wrapper.querySelector('.custom-select-trigger');
    let optionsMenu = wrapper.querySelector('.custom-select-options');

    // Remove legacy loose dot and chevron elements to prevent duplicate icons
    wrapper.querySelectorAll('.day-picker-dot, .day-picker-chevron').forEach(el => {
      if (!el.closest('.custom-select-trigger')) el.remove();
    });

    if (!trigger) {
      trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      wrapper.appendChild(trigger);
    }

    if (!trigger.querySelector('.selected-text')) {
      trigger.innerHTML = `
        <span class="selected-text"></span>
        <span class="day-picker-chevron">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1.5L5 5L9 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      `;
    }

    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = select.id === 'daySelect' ? 'custom-select-options day-select-options-menu' : 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    } else if (select.id === 'daySelect') {
      optionsMenu.classList.add('day-select-options-menu');
    }

    function updateTriggerText() {
      const textSpan = trigger.querySelector('.selected-text');
      if (!textSpan) return;

      if (select.id === 'daySelect') {
        const val = select.value || currentDayId || 'pyDay01';
        const match = val.match(/\d+/);
        const dayNum = match ? parseInt(match[0], 10) : 1;
        const dayNumStr = String(dayNum).padStart(2, '0');

        const svgIcons = window.SVG_TRACK_ICONS || {};
        const iconHtml = svgIcons.python || '<span class="track-logo-badge track-logo-python" title="Python Track"><svg viewBox="45.9 0 367.2 459" fill="none" style="width:14px;height:14px;"><path fill="#306998" d="M229.5 0C161.4 0 122.4 15.6 122.4 53.6v34.4h107.1v15.3H122.4c-47.8 0-76.5 30.6-76.5 76.5v61.2c0 45.9 28.7 76.5 76.5 76.5h30.6v-45.9c0-51 41.3-91.8 91.8-91.8h107.1V107.1c0-53.6-47.8-107.1-122.4-107.1zM175.9 30.6c8.4 0 15.3 6.9 15.3 15.3s-6.9 15.3-15.3 15.3-15.3-6.9-15.3-15.3 6.9-15.3 15.3-15.3z" /><path fill="#FFE873" d="M229.5 459c68.1 0 107.1-15.6 107.1-53.6v-34.4H229.5v-15.3h107.1c47.8 0 76.5-30.6 76.5-76.5v-61.2c0-45.9-28.7-76.5-76.5-76.5h-30.6v45.9c0 51-41.3 91.8-91.8 91.8H122.4V351.9c0 53.6 47.8 107.1 22.4 107.1zm53.6-30.6c-8.4 0-15.3-6.9-15.3-15.3s6.9-15.3 15.3-15.3 15.3-6.9 15.3-15.3z" /></svg></span>';

        textSpan.innerHTML = `
          <span style="display:inline-flex;align-items:center;gap:6px;">
            ${iconHtml}
            <strong>Day ${dayNumStr}</strong>
          </span>
        `;
      } else if (select.id === 'topicSelect') {
        // Single continuous-document slide renders as one heading + total duration.
        const slides = (currentDayData && currentDayData.slides) || [];
        const parsed = parseInt(select.value, 10);
        const idx = Number.isNaN(parsed) ? (currentSlideIndex || 0) : parsed;
        const slide = slides[idx] || slides[0] || null;
        const cleanedTitle = slide
          ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '').replace(/\s*\([0-9:]+\)\s*$/, '')
          : (currentDayData ? currentDayData.title : 'Overview');
        const multiTopic = slides.length > 1;
        // Measured total, never the hand-authored slides[].duration string.
        const totalDuration = getLessonDurationString();

        textSpan.innerHTML = `
          <span class="trigger-title">${multiTopic ? `Topic 0${idx + 1}: ` : ''}${cleanedTitle}</span>
          <span class="trigger-duration-badge">${totalDuration}</span>
        `;
      }
    }

    function populateOptions() {
      optionsMenu.innerHTML = '';
      const svgIcons = window.SVG_TRACK_ICONS || {
        python: `<svg viewBox="0 0 24 24" fill="none" style="width:14px;height:14px;"><path d="M11.927 2.1c-4.225 0-3.957 1.83-3.957 1.83l.004 1.895h4.033v.57H6.33S3.5 6.064 3.5 10.284c0 4.22 2.47 4.07 2.47 4.07h1.474v-2.07s-.08-2.47 2.43-2.47h4.167s2.35.038 2.35-2.312V4.012S16.85 2.1 11.927 2.1zm-2.22 1.342a.84.84 0 1 1 0 1.68.84.84 0 0 1 0-1.68z" fill="#3b82f6"/><path d="M12.073 21.9c4.225 0 3.957-1.83 3.957-1.83l-.004-1.895h-4.033v-.57h5.677s2.83.33 2.83-3.89c0-4.22-2.47-4.07-2.47-4.07h-1.474v2.07s.08 2.47-2.43 2.47h-4.167s-2.35-.038-2.35 2.312v3.488s-.458 1.912 4.464 1.912zm2.22-1.342a.84.84 0 1 1 0-1.68.84.84 0 0 1 0 1.68z" fill="#eab308"/></svg>`,
        sql: `<svg viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"></path><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"></path></svg>`,
        excel: `<svg viewBox="0 0 23 23" fill="none" style="width:14px;height:14px;"><path d="M14.625 0H8.625L1.5 2.625V20.375L8.625 23H14.625V0Z" fill="#107C41"/><path d="M21.5 2.625H14.625V6.375H21.5V2.625Z" fill="#1F9A55"/><path d="M21.5 6.375H14.625V10.125H21.5V6.375Z" fill="#33C481"/><path d="M21.5 10.125H14.625V13.875H21.5V10.125Z" fill="#107C41"/><path d="M21.5 13.875H14.625V17.625H21.5V13.875Z" fill="#1B9A59"/><path d="M21.5 17.625H14.625V20.375H21.5V17.625Z" fill="#107C41"/><path d="M10.125 6.375H3.375V16.625H10.125V6.375Z" fill="#107C41"/><path d="M11.813 7.875L9.938 11.25L11.813 14.625H9.563L8.438 12.75L7.313 14.625H5.063L6.938 11.25L5.063 7.875H7.313L8.438 9.75L9.563 7.875H11.813Z" fill="white"/></svg>`
      };
      let allDays = window.COURSE_MANIFEST_60 || [];
      if ((!allDays || allDays.length === 0) && window.COURSE_MANIFEST && window.COURSE_MANIFEST.length > 0) {
        allDays = window.COURSE_MANIFEST.map(d => ({
          track: 'python',
          trackDay: d.day,
          globalDay: (d.day || 0) + 30,
          id: d.id,
          title: d.title,
          free: true,
          prepared: true,
          comingSoon: false,
          url: `/python/day${String(d.day).padStart(2, '0')}.html`
        }));
      }

      if (select.id === 'daySelect' && allDays.length > 0) {
        // Group all 60 days into 3 categorized sections: Python FIRST, then SQL, then Excel
        const tracks = [
          { key: 'python', label: '🐍 Python for Data Analysis (Days 01–30)', days: allDays.filter(d => d.track === 'python') },
          { key: 'sql', label: '🗄️ SQL Mastery (Days 01–18)', days: allDays.filter(d => d.track === 'sql') },
          { key: 'excel', label: '📊 Excel Mastery (Days 01–12)', days: allDays.filter(d => d.track === 'excel') }
        ];

        tracks.forEach(trackGroup => {
          if (!trackGroup.days || trackGroup.days.length === 0) return;
          const header = document.createElement('div');
          header.className = 'dropdown-section-header';
          header.innerHTML = `<span>${trackGroup.label}</span>`;
          optionsMenu.appendChild(header);

          trackGroup.days.forEach(d => {
            const currentDayNum = parseInt(String(currentDayId || select.value || '').replace(/\D+/g, ''), 10) || window.COURSE_DAY || 1;
            const isCurrentPython = (d.track === 'python' && (d.id === currentDayId || d.trackDay === currentDayNum));
            const isLocked = (!d.prepared && !d.free);
            const optionItem = document.createElement('div');
            optionItem.className = `custom-select-option${isCurrentPython ? ' selected' : ''}${isLocked ? ' is-locked' : ''}`;

            const iconSvg = svgIcons[d.track] || '';
            const dayNumStr = String(d.trackDay || (d.globalDay && d.track === 'python' ? d.globalDay - 30 : d.globalDay) || 1).padStart(2, '0');

            let badgeHtml = '';
            if (d.comingSoon && !d.prepared) {
              badgeHtml = '<span class="day-coming-soon-badge" title="Under active development">Coming Soon</span>';
            } else if (d.free) {
              badgeHtml = '<span class="day-free-badge">FREE</span>';
            } else if (isLocked) {
              badgeHtml = '<span class="day-lock-badge" title="Pro subscription required">🔒</span>';
            }

            optionItem.innerHTML = `
              <span class="option-day-tag">
                <span class="track-icon-wrap">${iconSvg}</span>
                <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                  <strong>Day ${dayNumStr}</strong>
                  <span class="option-day-title">${d.title}</span>
                </span>
              </span>
              ${badgeHtml}
            `;

            optionItem.dataset.value = d.id;
            optionItem.addEventListener('click', (e) => {
              e.stopPropagation();
              if (isCurrentPython) {
                optionsMenu.classList.remove('open');
                wrapper.classList.remove('open');
                trigger.classList.remove('open');
                return;
              }
              if (d.comingSoon && !d.prepared) {
                if (typeof showComingSoonToast === 'function') {
                  showComingSoonToast(d.title, d.trackDay || d.globalDay);
                } else {
                  alert(`Day ${dayNumStr} (${d.title}) is currently under active preparation and coming soon!`);
                }
                optionsMenu.classList.remove('open');
                wrapper.classList.remove('open');
                trigger.classList.remove('open');
                return;
              }
              window.location.href = d.url;
            });
            optionsMenu.appendChild(optionItem);
          });
        });
      } else if (select.id === 'topicSelect') {
        const slides = (currentDayData && currentDayData.slides) || [];
        const multiTopic = slides.length > 1;
        const selectedIdx = parseInt(select.value, 10);
        const totalDuration = getLessonDurationString();
        slides.forEach((slide, idx) => {
          const optionItem = document.createElement('div');
          const isSelected = (Number.isNaN(selectedIdx) && idx === 0) || selectedIdx === idx;
          optionItem.className = `custom-select-option${isSelected ? ' selected' : ''}`;
          const cleaned = slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '').replace(/\s*\([0-9:]+\)\s*$/, '');
          optionItem.innerHTML = `
            <span class="option-title">${multiTopic ? `Topic 0${idx + 1}: ${cleaned}` : cleaned}</span>
            <span class="option-duration">${totalDuration}</span>
          `;
          optionItem.dataset.value = String(idx);
          optionItem.addEventListener('click', (e) => {
            e.stopPropagation();
            select.value = String(idx);
            select.dispatchEvent(new Event('change'));
            optionsMenu.classList.remove('open');
            wrapper.classList.remove('open');
            trigger.classList.remove('open');
          });
          optionsMenu.appendChild(optionItem);
        });
      }

      const isSingleTopic = (select.id === 'topicSelect' && (!currentDayData || !currentDayData.slides || currentDayData.slides.length <= 1));

      if (isSingleTopic) {
        wrapper.classList.add('no-dropdown');
        wrapper.querySelectorAll('.day-picker-chevron').forEach(el => el.remove());
        if (trigger) {
          trigger.querySelectorAll('.day-picker-chevron').forEach(el => el.remove());
        }
        wrapper.onclick = null;
      } else {
        wrapper.classList.remove('no-dropdown');
        const chev = trigger.querySelector('.day-picker-chevron');
        if (chev) chev.style.display = 'flex';

        wrapper.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options.open').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement?.classList.remove('open');
            if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
          });
          if (!isOpen) {
            if (optionsMenu.children.length === 0) {
              populateOptions();
            }
            if (window.innerWidth <= 900) {
              // Body portal on mobile to escape container overflow and backdrop-filter issues
              if (optionsMenu.parentElement !== document.body) {
                document.body.appendChild(optionsMenu);
              }
              const rect = wrapper.getBoundingClientRect();
              optionsMenu.style.position = 'fixed';
              optionsMenu.style.top = Math.max(70, Math.round(rect.bottom + 6)) + 'px';
              optionsMenu.style.left = '10px';
              optionsMenu.style.right = '10px';
              optionsMenu.style.width = 'calc(100vw - 20px)';
              optionsMenu.style.zIndex = '999999';
              optionsMenu.style.maxHeight = '65vh';
            } else {
              // On desktop, keep inside wrapper
              if (optionsMenu.parentElement !== wrapper) {
                wrapper.appendChild(optionsMenu);
              }
              optionsMenu.style.removeProperty('position');
              optionsMenu.style.removeProperty('top');
              optionsMenu.style.removeProperty('left');
              optionsMenu.style.removeProperty('right');
              optionsMenu.style.removeProperty('width');
              optionsMenu.style.removeProperty('zIndex');
              optionsMenu.style.removeProperty('maxHeight');
            }
            optionsMenu.classList.add('open');
            wrapper.classList.add('open');
            trigger.classList.add('open');
          }
        };
      }

      updateTriggerText();
    }

    populateOptions();

    select.addEventListener('change', () => {
      updateTriggerText();
      optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
        if (el.dataset.value === select.value) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    });

    const observer = new MutationObserver(() => {
      populateOptions();
    });
    observer.observe(select, { childList: true });

    if (!Object.getOwnPropertyDescriptor(select, 'value')) {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
      Object.defineProperty(select, 'value', {
        configurable: true,
        get() {
          return descriptor.get.call(this);
        },
        set(val) {
          descriptor.set.call(this, val);
          updateTriggerText();
          optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
            if (el.dataset.value === String(val)) {
              el.classList.add('selected');
            } else {
              el.classList.remove('selected');
            }
          });
        }
      });
    }
  });

  // Global click outside listener to close dropdown menus
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options').forEach(menu => {
      menu.classList.remove('open');
      menu.parentElement.classList.remove('open');
      if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
    });
  });
}
window.initCustomDropdowns = initCustomDropdowns;

function buildChapterList() {
  const list = document.getElementById('chapterList');
  if (!list) return;
  if (currentDayData?.media?.mode === 'study') {
    list.innerHTML = '';
    for (const section of currentDayData.sections || []) {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'chapter-item';
      item.textContent = String(section.number).padStart(2, '0') + '. ' + section.title;
      item.onclick = () => {
        document.getElementById(section.id)?.scrollIntoView({ block: 'start' });
        list.style.display = 'none';
      };
      list.appendChild(item);
    }
    return;
  }
  if (!combinedTracks || combinedTracks.length === 0) return;
  list.innerHTML = '';

  const typeIcons = { narration: '▶', question: '❓', solution: '✅', completion: '🏆' };
  let elapsed = 0;

  combinedTracks.forEach((t, idx) => {
    const dur = combinedTrackDurations[idx] || 0;
    const elapsedAtTrack = elapsed; // capture for closure
    const item = document.createElement('div');
    item.className = 'chapter-item' + (idx === combinedTrackIndex ? ' active' : '');
    item.dataset.idx = idx;
    item.setAttribute('role', 'option');
    item.innerHTML = `
      <span class="chapter-item__icon">${typeIcons[t.type] || '▶'}</span>
      <span class="chapter-item__time">${formatTime(elapsed)}</span>
      <span class="chapter-item__title">${t.title}</span>`;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      list.style.display = 'none';
      // SQL Day 02 parity: always seek, then play (whether or not already playing)
      seekCombinedPlayback(elapsedAtTrack);
      playCombinedPlayback();
    });
    list.appendChild(item);
    elapsed += dur;
  });
}

function updateChapterListActive() {
  const listEl = document.getElementById('chapterList');
  if (listEl) {
    listEl.querySelectorAll('.chapter-item').forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.idx, 10) === combinedTrackIndex);
    });
  }
  const titleEl = document.getElementById('activeChapterTitle');
  if (titleEl && combinedTracks && combinedTracks[combinedTrackIndex]) {
    titleEl.textContent = combinedTracks[combinedTrackIndex].title || 'In this lesson';
  }
}

function toggleChapterList(event) {
  if (event && event.stopPropagation) event.stopPropagation();
  const list = document.getElementById('chapterList');
  if (!list) return;
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
  if (list.style.display === 'block') {
    buildChapterList();
    updateChapterListActive();
  }
}

function renderSlide(index) {
  if (!currentDayData || !currentDayData.slides || !currentDayData.slides[index]) return;
  currentSlideIndex = index;
  const slide = currentDayData.slides[index];

  // Update header text
  const slideHeader = document.getElementById('slideHeader');
  if (slideHeader) {
    const h2 = slideHeader.querySelector('h2');
    if (h2) h2.textContent = slide.title;
  }
  const activeChapterTitle = document.getElementById('activeChapterTitle');
  if (activeChapterTitle) {
    // Use first track title (the actual day topic) if available; otherwise fall back to slide.title
    const firstTrackTitle = (combinedTracks && combinedTracks[0] && combinedTracks[0].title) || slide.title;
    activeChapterTitle.textContent = firstTrackTitle.length > 30 ? firstTrackTitle.substring(0, 28) + '…' : firstTrackTitle;
  }

  // Render unified continuous document
  const bodyText = document.getElementById('slideBodyText');
  if (bodyText) {
    bodyText.innerHTML = slide.html;
    const skel = document.getElementById('slideSkeleton');
    if (skel) skel.style.display = 'none';
    applyCodeLineNumbers(bodyText);
    initTableInteractiveFeatures(bodyText);
  }

  updateChapterListActive();
}

/**
 * Universal Code Line Numbering Engine
 * Automatically parses code lines and generates authentic IDE line numbers gutter
 */
function applyCodeLineNumbers(container) {
  // Pure pass-through: preserves pristine native pre/code formatting identical to SQL flagship standard
  // Avoids destructive string splitting and preserves standard indentation and syntax tokens
}
window.applyCodeLineNumbers = applyCodeLineNumbers;

/**
 * Universal Interactive Table Search & Cheatsheet Filter Engine
 * Allows students to instantly search/filter operators and traps in any reference table
 */
function filterTableRows(inputEl) {
  if (!inputEl) return;
  const query = inputEl.value.toLowerCase().trim();
  const tableCard = inputEl.closest('.topic-subcard, .db-mock-table-wrap') || inputEl.parentElement.closest('div');
  let table = tableCard ? tableCard.querySelector('table') : null;
  if (!table && inputEl.closest('.table-header-wrap')) {
    const hdr = inputEl.closest('.table-header-wrap');
    const siblingWrap = hdr.nextElementSibling;
    if (siblingWrap) table = siblingWrap.querySelector('table') || (siblingWrap.tagName === 'TABLE' ? siblingWrap : null);
  }
  if (!table) {
    const parentContainer = inputEl.closest('.slide-section, section, div');
    if (parentContainer) table = parentContainer.querySelector('table');
  }
  if (!table) return;
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr:not(.table-empty-row)');
  let visibleCount = 0;
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (!query || text.includes(query)) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });
  let emptyNotice = tbody.querySelector('.table-empty-row');
  if (visibleCount === 0) {
    if (!emptyNotice) {
      emptyNotice = document.createElement('tr');
      emptyNotice.className = 'table-empty-row';
      const cols = table.querySelectorAll('thead th').length || 4;
      emptyNotice.innerHTML = `<td colspan="${cols}" class="table-empty-cell">No matching operators or rules found for "${query}"</td>`;
      tbody.appendChild(emptyNotice);
    }
  } else if (emptyNotice) {
    emptyNotice.remove();
  }
}
window.filterTableRows = filterTableRows;
window.filterTable = filterTableRows;

/**
 * Click-to-Copy Interactive Syntax in Tables
 */
function initTableInteractiveFeatures(container) {
  if (!container) container = document;
  const codeSnippets = container.querySelectorAll('.db-table-mock td code, .db-table-mock .prec-ops-wrap code');
  codeSnippets.forEach(codeEl => {
    if (codeEl.dataset.copyInit) return;
    codeEl.dataset.copyInit = 'true';
    codeEl.title = 'Click to copy syntax';
    codeEl.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = codeEl.innerText.replace(/→.*$/, '').trim();
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        codeEl.classList.add('table-code-copied');
        setTimeout(() => {
          codeEl.classList.remove('table-code-copied');
        }, 1200);
      }).catch(() => {});
    });
  });
}
window.initTableInteractiveFeatures = initTableInteractiveFeatures;

/**
 * Click-to-Copy for Code Snippet Boxes
 */
function copySnippetCode(btn) {
  if (!btn) return;
  const box = btn.closest('.snippet-code-box');
  if (!box) return;
  const codeEl = box.querySelector('pre code');
  if (!codeEl) return;
  const text = codeEl.innerText.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    setTimeout(() => {
      btn.classList.remove('copied');
    }, 1500);
  }).catch(() => {});
}
window.copySnippetCode = copySnippetCode;

if (typeof document !== 'undefined') {
  const initAll = () => {
    applyCodeLineNumbers(document);
    initTableInteractiveFeatures(document);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    setTimeout(initAll, 0);
  }
}


// ── Audio-Synced Typewriter & Visual Synchronization Engine ──────────

/* SYNC-GENERATED:PYTHON_QUESTION_SOLUTIONS:BEGIN — run scripts/build_python_sync_data.py */
const PYTHON_QUESTION_SOLUTIONS = {
  'pyDay01': {
    "1": {
      "src": "Day01/New_PyDay01Question01sol.mp3",
      "code": "print(\"Hello, Python for Data Analysis!\")",
      "duration": 11.45,
      "segments": [
        { "text": "print(", "startAt": 2.06, "charInterval": 85 },
        { "text": "\"Hello, Python for Data Analysis!\")", "startAt": 3.86, "charInterval": 34 },
      ],
      "scrollAt": 8.53
    },
    "2": {
      "src": "Day01/New_PyDay01Question02sol.mp3",
      "code": "print(150 + 250)",
      "duration": 12.77,
      "segments": [
        { "text": "print(150 ", "startAt": 2.14, "charInterval": 85 },
        { "text": "+ 250)", "startAt": 4.48, "charInterval": 58 },
      ],
      "scrollAt": 11.49
    },
    "3": {
      "src": "Day01/New_PyDay01Question03sol.mp3",
      "code": "print(\"Total Records:\", 500)",
      "duration": 11.74,
      "segments": [
        { "text": "print(\"Total Records:\"", "startAt": 3.08, "charInterval": 60 },
        { "text": ", 500)", "startAt": 4.4, "charInterval": 58 },
      ],
      "scrollAt": 5.35
    },
    "4": {
      "src": "Day01/New_PyDay01Question04sol.mp3",
      "code": "employee_count = 150\nprint(\"Employee Count:\", employee_count)",
      "duration": 11.93,
      "segments": [
        { "text": "employee_count = 150\n", "startAt": 2.06, "charInterval": 85 },
        { "text": "print(\"Employee Count:\", employee_count)", "startAt": 5.04, "charInterval": 25 },
      ],
      "scrollAt": 10.63
    },
    "5": {
      "src": "Day01/New_PyDay01Question05sol.mp3",
      "code": "average_salary = 75450.50\nprint(\"Average Salary:\", average_salary)",
      "duration": 14.5,
      "segments": [
        { "text": "average_salary = 75450.50\n", "startAt": 2.08, "charInterval": 85 },
        { "text": "print(\"Average Salary:\", average_salary)", "startAt": 7.3, "charInterval": 25 },
      ],
      "scrollAt": 8.9
    },
    "6": {
      "src": "Day01/New_PyDay01Question06sol.mp3",
      "code": "company_name = \"Manodemy\"\nprint(\"Company Name:\", company_name)",
      "duration": 10.82,
      "segments": [
        { "text": "company_name = \"Manodemy\"\n", "startAt": 2.06, "charInterval": 85 },
        { "text": "print(\"Company Name:\", company_name)", "startAt": 5.9, "charInterval": 25 },
      ],
      "scrollAt": 7.4
    },
    "7": {
      "src": "Day01/New_PyDay01Question07sol.mp3",
      "code": "is_full_time = True\nprint(\"Full Time Status:\", is_full_time)",
      "duration": 9.43,
      "segments": [
        { "text": "is_full_time = True\n", "startAt": 2.0, "charInterval": 85 },
        { "text": "print(\"Full Time Status:\", ", "startAt": 5.08, "charInterval": 40 },
        { "text": "is_full_time)", "startAt": 6.16, "charInterval": 25 },
      ],
      "scrollAt": 7.08
    },
    "8": {
      "src": "Day01/New_PyDay01Question08sol.mp3",
      "code": "sales_figures = [1200, 1450, 1800]\nprint(\"Sales Figures:\", sales_figures)",
      "duration": 15.46,
      "segments": [
        { "text": "sales_figures = [1200, 1450", "startAt": 1.98, "charInterval": 85 },
        { "text": ", 1800]\n", "startAt": 6.69, "charInterval": 85 },
        { "text": "print(\"Sales Figures:\", sales_figures)", "startAt": 13.88, "charInterval": 25 },
      ],
      "scrollAt": 15.21
    },
    "9": {
      "src": "Day01/New_PyDay01Question09sol.mp3",
      "code": "server_location = (\"Mumbai\", 19.07, 72.87)\nprint(\"Server Location:\", server_location)",
      "duration": 16.34,
      "segments": [
        { "text": "server_location = (\"Mumbai\"", "startAt": 2.18, "charInterval": 85 },
        { "text": ", 19.07, 72.87)\n", "startAt": 7.05, "charInterval": 85 },
        { "text": "print(\"Server Location:\", server_location)", "startAt": 14.76, "charInterval": 25 },
      ],
      "scrollAt": 16.09
    },
    "10": {
      "src": "Day01/New_PyDay01Question10sol.mp3",
      "code": "customer_profile = {\"name\": \"Aarav\", \"orders\": 5}\nprint(\"Customer Profile:\", customer_profile)",
      "duration": 15.29,
      "segments": [
        { "text": "customer_profile = {\"name\"", "startAt": 2.04, "charInterval": 85 },
        { "text": ": \"Aarav\", \"orders\": 5}\n", "startAt": 5.56, "charInterval": 85 },
        { "text": "print(\"Customer Profile:\", ", "startAt": 13.42, "charInterval": 40 },
        { "text": "customer_profile)", "startAt": 14.5, "charInterval": 25 },
      ],
      "scrollAt": 15.04
    },
    "11": {
      "src": "Day01/New_PyDay01Question11sol.mp3",
      "code": "unique_tags = {\"python\", \"sql\", \"analytics\"}\nprint(\"Unique Tags:\", unique_tags)",
      "duration": 13.8,
      "segments": [
        { "text": "unique_tags = {\"python\", \"sql\"", "startAt": 2.1, "charInterval": 85 },
        { "text": ", \"analytics\"}\n", "startAt": 8.04, "charInterval": 85 },
        { "text": "print(\"Unique Tags:\", unique_tags)", "startAt": 12.1, "charInterval": 25 },
      ],
      "scrollAt": 13.55
    },
    "12": {
      "src": "Day01/New_PyDay01Question12sol.mp3",
      "code": "bonus_amount = None\nprint(\"Bonus Amount:\", bonus_amount)",
      "duration": 11.28,
      "segments": [
        { "text": "bonus_amount = None\n", "startAt": 1.98, "charInterval": 85 },
        { "text": "print(\"Bonus Amount:\", bonus_amount)", "startAt": 5.5, "charInterval": 25 },
      ],
      "scrollAt": 7.0
    },
    "13": {
      "src": "Day01/New_PyDay01Question13sol.mp3",
      "code": "from collections import defaultdict\n\ntransactions = [\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.1\", \"amount\": 120.50},\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.1\", \"amount\": 340.00},\n    {\"user_id\": \"U02\", \"device\": \"desktop\", \"ip\": \"192.168.1.5\", \"amount\": 85.75},\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.2\", \"amount\": 500.00},\n]\n\nfraud_map = defaultdict(float)\nfor tx in transactions:\n    key = (tx[\"user_id\"], tx[\"device\"], tx[\"ip\"])\n    fraud_map[key] += tx[\"amount\"]\nprint(dict(fraud_map))",
      "duration": 67.01,
      "segments": [
        { "text": "from collections import defaultdict\n\n", "startAt": 3.08, "charInterval": 75 },
        { "text": "transactions = [\n    ", "startAt": 5.86, "charInterval": 85 },
        { "text": "{\"user_id\": \"U01\", \"device\"", "startAt": 9.86, "charInterval": 85 },
        { "text": ": \"mobile\", \"ip\": \"10.0.0.1\"", "startAt": 12.48, "charInterval": 85 },
        { "text": ", \"amount\": 120.50},\n    ", "startAt": 16.5, "charInterval": 85 },
        { "text": "{\"user_id\": \"U01\", \"device\"", "startAt": 20.12, "charInterval": 65 },
        { "text": ": \"mobile\", \"ip\": \"10.0.0.1\"", "startAt": 21.88, "charInterval": 31 },
        { "text": ", \"amount\": 340.00},\n    ", "startAt": 22.76, "charInterval": 85 },
        { "text": "{\"user_id\": \"U02\", \"device\"", "startAt": 25.18, "charInterval": 59 },
        { "text": ": \"desktop\", \"ip\": \"192.168.1.5\"", "startAt": 26.76, "charInterval": 85 },
        { "text": ", \"amount\": 85.75},\n    ", "startAt": 32.06, "charInterval": 85 },
        { "text": "{\"user_id\": \"U01\", \"device\"", "startAt": 35.46, "charInterval": 58 },
        { "text": ": \"mobile\", \"ip\": \"10.0.0.2\"", "startAt": 37.02, "charInterval": 85 },
        { "text": ", \"amount\": 500.00},\n]\n\n", "startAt": 40.68, "charInterval": 85 },
        { "text": "fraud_map = defaultdict(float)\n", "startAt": 43.4, "charInterval": 85 },
        { "text": "for tx in transactions:\n    ", "startAt": 49.64, "charInterval": 85 },
        { "text": "key = (tx[\"user_id\"], tx[\"device\"", "startAt": 52.77, "charInterval": 64 },
        { "text": "], tx[\"ip\"])\n    ", "startAt": 54.88, "charInterval": 85 },
        { "text": "fraud_map[key] += tx[\"amount\"]\n", "startAt": 57.78, "charInterval": 85 },
        { "text": "print(dict(fraud_map))", "startAt": 60.42, "charInterval": 38 },
      ],
      "scrollAt": 64.49
    },
    "14": {
      "src": "Day01/New_PyDay01Question14sol.mp3",
      "code": "nested = {\n    \"user\": {\n        \"name\": \"Aarav\",\n        \"address\": {\n            \"city\": \"Mumbai\",\n            \"pin\": None\n        }\n    },\n    \"score\": 95\n}\n\ndef flatten_dict(d, parent_key=''):\n    items = {}\n    for k, v in d.items():\n        new_key = f\"{parent_key}.{k}\" if parent_key else k\n        if isinstance(v, dict):\n            items.update(flatten_dict(v, new_key))\n        else:\n            items[new_key] = 'N/A' if v is None else v\n    return items\n\nflat = flatten_dict(nested)\nprint(flat)",
      "duration": 63.86,
      "segments": [
        { "text": "nested = {\n    ", "startAt": 2.8, "charInterval": 85 },
        { "text": "\"user\": {\n        ", "startAt": 4.38, "charInterval": 85 },
        { "text": "\"name\": \"Aarav\",\n        ", "startAt": 7.48, "charInterval": 85 },
        { "text": "\"address\": {\n            ", "startAt": 9.7, "charInterval": 62 },
        { "text": "\"city\": \"Mumbai\",\n            ", "startAt": 11.24, "charInterval": 68 },
        { "text": "\"pin\": None\n        }\n    },\n    ", "startAt": 13.28, "charInterval": 64 },
        { "text": "\"score\": 95\n}\n\n", "startAt": 15.4, "charInterval": 85 },
        { "text": "def flatten_dict(d, parent_key=''):\n    ", "startAt": 17.96, "charInterval": 85 },
        { "text": "items = {}\n    ", "startAt": 25.16, "charInterval": 77 },
        { "text": "for k, v in d.items():\n        ", "startAt": 26.32, "charInterval": 85 },
        { "text": "new_key = f\"{parent_key}.{k}\" ", "startAt": 30.82, "charInterval": 42 },
        { "text": "if parent_key else k\n        ", "startAt": 32.08, "charInterval": 85 },
        { "text": "if isinstance(v, dict):\n            ", "startAt": 40.5, "charInterval": 85 },
        { "text": "items.update(flatten_dict(", "startAt": 48.76, "charInterval": 85 },
        { "text": "v, new_key))\n        ", "startAt": 51.56, "charInterval": 40 },
        { "text": "else:\n            ", "startAt": 52.4, "charInterval": 85 },
        { "text": "items[new_key] = 'N/A' if v ", "startAt": 57.04, "charInterval": 40 },
        { "text": "is None else v\n    ", "startAt": 58.16, "charInterval": 40 },
        { "text": "return items\n\n", "startAt": 58.92, "charInterval": 85 },
        { "text": "flat = flatten_dict(nested)\n", "startAt": 62.1, "charInterval": 29 },
        { "text": "print(flat)", "startAt": 62.92, "charInterval": 50 },
      ],
      "scrollAt": 63.61
    },
    "15": {
      "src": "Day01/New_PyDay01Question15sol.mp3",
      "code": "import sys\n\nlst = []\njump_sizes = []\nprev_size = sys.getsizeof(lst)\n\nfor i in range(21):\n    lst.append(i)\n    cur_size = sys.getsizeof(lst)\n    if cur_size > prev_size:\n        jump_sizes.append((i, cur_size))\n        prev_size = cur_size\n\nprint(jump_sizes)",
      "duration": 40.01,
      "segments": [
        { "text": "import sys\n\n", "startAt": 1.68, "charInterval": 85 },
        { "text": "lst = []\n", "startAt": 4.02, "charInterval": 85 },
        { "text": "jump_sizes = []\n", "startAt": 7.92, "charInterval": 85 },
        { "text": "prev_size = sys.getsizeof(", "startAt": 14.58, "charInterval": 85 },
        { "text": "lst)\n\n", "startAt": 21.24, "charInterval": 85 },
        { "text": "for i in range(21):\n    ", "startAt": 31.18, "charInterval": 40 },
        { "text": "lst.append(i)\n    ", "startAt": 32.14, "charInterval": 40 },
        { "text": "cur_size = sys.getsizeof(lst)\n    ", "startAt": 32.86, "charInterval": 46 },
        { "text": "if cur_size > prev_size:\n        ", "startAt": 34.42, "charInterval": 85 },
        { "text": "jump_sizes.append((i, cur_size))\n        ", "startAt": 37.32, "charInterval": 25 },
        { "text": "prev_size = cur_size\n\n", "startAt": 37.62, "charInterval": 40 },
        { "text": "print(jump_sizes)", "startAt": 38.5, "charInterval": 25 },
      ],
      "scrollAt": 39.52
    }
  }
};
/* SYNC-GENERATED:PYTHON_QUESTION_SOLUTIONS:END */

// ── Theory Visual Cues: word-level timestamps → selector targets (SQL Day 02 parity) ──
// Each entry: { atSec, selector } where selector is what gets spotlit in the slide
// Narration durations: Audio01=47.0s, Audio02=46.0s, Audio03=47.8s, Audio04=46.9s, Audio05=50.1s
/* SYNC-GENERATED:THEORY_VISUAL_CUES:BEGIN */
const THEORY_VISUAL_CUES = {
  "Day01/New_PyDay01Audio01.mp3": [
    { atSec: 0.0, selector: "#headingWhyPython" },  // welcome to day 01
    { atSec: 23.84, selector: ".py-sp-showcase .py-sp-header" },  // why data analysts need python
    { atSec: 32.04, selector: ".py-sp-card.sp-blue" },  // first
    { atSec: 38.14, selector: ".py-sp-card.sp-green" },  // second
    { atSec: 44.46, selector: ".py-sp-card.sp-amber" },  // third
    { atSec: 52.1, selector: ".py-sp-card.sp-purple" },  // fourth
    { atSec: 56.7, selector: ".py-sp-ai-banner" }  // fifth
  ],
  "Day01/New_PyDay01Audio02.mp3": [
    { atSec: 0.0, selector: "#day01ToolMatrixSection" },  // let's examine the analytics tool matrix
    { atSec: 6.67, selector: ".py-matrix-table tbody tr:nth-child(1)" },  // enterprise
    { atSec: 16.69, selector: ".py-matrix-table tbody tr:nth-child(2)" },  // scratchpad
    { atSec: 23.51, selector: ".py-matrix-table tbody tr:nth-child(3)" },  // python
    { atSec: 36.65, selector: ".py-matrix-table" }  // analysts
  ],
  "Day01/New_PyDay01Audio03.mp3": [
    { atSec: 0.0, selector: "#headingMutability" },  // every value is an object
    { atSec: 18.87, selector: ".py-mut-panel.panel-mutable" },  // mutable
    { atSec: 26.39, selector: ".py-mut-panel.panel-immutable" },  // immutable
    { atSec: 40.17, selector: ".py-analyst-trap-card" }  // pitfall
  ],
  "Day01/New_PyDay01Audio04.mp3": [
    { atSec: 0.0, selector: "#headingDataTypes" },  // master data types reference
    { atSec: 10.5, selector: ".py-master-ref-table tbody tr:nth-child(1)" },  // integer
    { atSec: 16.14, selector: ".py-master-ref-table tbody tr:nth-child(2)" },  // float
    { atSec: 23.58, selector: ".py-master-ref-table tbody tr:nth-child(3)" },  // complex
    { atSec: 28.94, selector: ".py-master-ref-table tbody tr:nth-child(4)" },  // string
    { atSec: 35.84, selector: ".py-master-ref-table tbody tr:nth-child(5)" },  // boolean
    { atSec: 45.28, selector: ".py-master-ref-table tbody tr:nth-child(6)" },  // list
    { atSec: 48.79, selector: ".py-master-ref-table tbody tr:nth-child(7)" },  // tuple
    { atSec: 52.28, selector: ".py-master-ref-table tbody tr:nth-child(8)" },  // range
    { atSec: 57.28, selector: ".py-master-ref-table tbody tr:nth-child(9)" },  // dictionary
    { atSec: 65.6, selector: ".py-master-ref-table tbody tr:nth-child(10)" },  // set
    { atSec: 71.8, selector: ".py-master-ref-table tbody tr:nth-child(11)" },  // frozen
    { atSec: 78.27, selector: ".py-master-ref-table tbody tr:nth-child(12)" }  // nonetype
  ],
  "Day01/New_PyDay01Audio05.mp3": [
    { atSec: 0.0, selector: "#headingMemory" },  // let's trace how python manages memory
    { atSec: 6.22, selector: ".vnode-code" },  // python first allocates object values inside heap memory
    { atSec: 12.76, selector: ".vnode-objects" },  // they are lightweight pointers or name tags bound to memory addresses
    { atSec: 23.22, selector: ".vnode-pointers" },  // reassigning a variable does not overwrite the old data
    { atSec: 34.02, selector: ".vnode-mutable" },  // use the is keyword which checks object identity
    { atSec: 42.34, selector: ".vnode-mgmt" }  // python automatically frees unused memory using reference counting
  ]
};
/* SYNC-GENERATED:THEORY_VISUAL_CUES:END */

/* SYNC-GENERATED:PYTHON_CAPTION_TRACKS:BEGIN */
const PYTHON_CAPTION_TRACKS = {
  "Day01/New_PyDay01Audio01.mp3": [
    { start: 0.0, end: 3.46, text: "Welcome to Day 01 of Python for Data Analysis!" },
    { start: 4.14, end: 9.92, text: "Python is a high-level, interpreted programming language known for its clean syntax and readability." },
    { start: 10.74, end: 24.46, text: "Created by Guido van Rossum in 1991, Python emphasizes code simplicity, enabling developers and analysts to express complex logic in fewer lines of code than traditional languages like C++ or Java." },
    { start: 24.46, end: 26.42, text: "Why Data Analysts Need Python?" },
    { start: 26.96, end: 37.84, text: "For data analyst, Python gives you five indispensable superpowers: first, loading and transforming massive datasets of 10 million rows or more where Excel freezes." },
    { start: 38.44, end: 44.34, text: "second, building end-to-end automated ETL pipelines that run overnight without manual effort." },
    { start: 44.76, end: 51.79, text: "third, executing advanced statistical modeling, grouping, and regex data cleaning with Pandas and NumPy." },
    { start: 52.4, end: 62.18, text: "fourth, rendering interactive dashboards and charts with Seaborn and Plotly fifth, acting as your direct gateway into machine learning and modern generative AI." }
  ],
  "Day01/New_PyDay01Audio02.mp3": [
    { start: 0.0, end: 5.56, text: "Now, Let's examine the Analytics Tool Matrix: SQL versus Excel versus Python." },
    { start: 6.26, end: 15.3, text: "SQL is your enterprise database workhorse, lightning-fast at filtering, joining, and aggregating billions of records directly inside the warehouse." },
    { start: 15.98, end: 23.5, text: "Excel is your agile scratchpad for ad-hoc exploration, quick formulas, and executive summaries under 1 million rows." },
    { start: 23.86, end: 35.04, text: "Python is your automation engine and analytical powerhouse, excelling at complex multi-step transformations, statistical algorithms, API integrations, and predictive modeling." },
    { start: 35.64, end: 45.78, text: "The highest-paid modern data analysts don't pick just one; they extract with SQL, engineer and analyze with Python, and communicate insights with executive dashboards." }
  ],
  "Day01/New_PyDay01Audio03.mp3": [
    { start: 0.0, end: 8.04, text: "In Python, every value is an object living in your computer's memory, and every object has an identity: its memory address." },
    { start: 8.58, end: 12.42, text: "The big question is whether that object can be changed after it is created." },
    { start: 12.88, end: 18.7, text: "The answer splits Python's data types into two families: Mutable objects and Immutable objects." },
    { start: 19.22, end: 26.74, text: "Mutable objects, such as lists, dictionaries, and sets, can be modified in-place without changing their memory address." },
    { start: 26.74, end: 34.3, text: "Immutable objects, including integers, floats, strings, and tuples, can never be changed once created." },
    { start: 34.84, end: 38.9, text: "Any modification generates a brand new object at a new memory address." },
    { start: 39.42, end: 48.42, text: "Watch out for the dangerous Pitfall: writing clean data equals raw data does not create a copy, it creates an alias pointing to the exact same memory!" },
    { start: 49.08, end: 52.08, text: "Modifying clean data will silently corrupt your raw source." },
    { start: 52.56, end: 55.72, text: "Always use dot copy to safeguard your analytical pipelines." }
  ],
  "Day01/New_PyDay01Audio04.mp3": [
    { start: 0.0, end: 3.66, text: "Here is the Master Data Types Reference matrix for data analysts." },
    { start: 4.32, end: 8.46, text: "The table is organised by category, exactly as it appears on screen." },
    { start: 9.18, end: 15.96, text: "Starting with Numeric types: Integer, written int, is an arbitrary-precision whole number that never overflows." },
    { start: 16.44, end: 23.2, text: "Float is an IEEE-754 double-precision decimal, ideal for currency and averages." },
    { start: 23.88, end: 27.52, text: "Complex stores real and imaginary parts for scientific work." },
    { start: 27.52, end: 35.26, text: "Moving to Text: String, written str, is an immutable Unicode sequence and the workhorse for categorical columns." },
    { start: 36.14, end: 42.3, text: "Boolean, written bool, is simply True or False, and it controls every analytical branch you write." },
    { start: 42.74, end: 56.5, text: "The Sequence family holds ordered collections: List is mutable and perfect for a column of rows, Tuple is immutable and protects fixed records, and Range generates lazy integer sequences for memory-efficient iteration." },
    { start: 57.08, end: 65.36, text: "Mapping means Dictionary, written dict, which stores key-value pairs and gives you lightning-fast O of 1 lookups using a hash table." },
    { start: 65.9, end: 77.18, text: "Set types eliminate duplicates automatically and power fast union and intersection operations; Frozen Set is the immutable, hashable version safe to use as a dictionary key." },
    { start: 77.6, end: 83.6, text: "And finally, NoneType is the singleton that represents missing or null data, just like SQL NULL." }
  ],
  "Day01/New_PyDay01Audio05.mp3": [
    { start: 0.0, end: 5.26, text: "Let's trace how Python manages memory under the hood through our runtime execution pipeline." },
    { start: 5.76, end: 10.78, text: "When you run Python code, Python first allocates object values inside heap memory." },
    { start: 11.34, end: 17.92, text: "Variables are not boxes that hold values; they are lightweight pointers or name tags bound to memory addresses." },
    { start: 18.5, end: 23.78, text: "When two variables are assigned the same value, they point to the exact same object in RAM." },
    { start: 24.38, end: 30.7, text: "Reassigning a variable does not overwrite the old data; it simply repoints the tag to a new memory location." },
    { start: 31.16, end: 43.2, text: "To test whether two variables share the exact same memory address, use the is keyword, which checks object identity via memory IDs, compared to double equals, which checks value equality." },
    { start: 44.06, end: 49.6, text: "Python automatically frees unused memory using reference counting and a cyclic garbage collector." }
  ],
  "Day01/New_PyDay01Question01sol.mp3": [
    { start: 0.0, end: 1.04, text: "Here is the solution." },
    { start: 1.52, end: 7.56, text: "We call the print function and pass the string Hello, Python for Data Analysis inside quotation marks." },
    { start: 8.08, end: 11.06, text: "When run, Python displays this text in the terminal." }
  ],
  "Day01/New_PyDay01Question02sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.56, end: 7.62, text: "We write print opening parenthesis, 150 plus 250, closing parenthesis." },
    { start: 8.14, end: 12.36, text: "Python calculates the arithmetic expression first and outputs 400." }
  ],
  "Day01/New_PyDay01Question03sol.mp3": [
    { start: 0.0, end: 1.04, text: "Here is the solution." },
    { start: 1.54, end: 8.5, text: "We pass two arguments into print separated by a comma: the string label 'Total Records:' and the number 500." },
    { start: 9.14, end: 11.32, text: "Python formats them separated by a space." }
  ],
  "Day01/New_PyDay01Question04sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.56, end: 7.04, text: "We assign employee count equals 150, then call print passing the label and variable." },
    { start: 7.7, end: 11.48, text: "Python looks up the variable's integer pointer and displays 150." }
  ],
  "Day01/New_PyDay01Question05sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.56, end: 8.34, text: "We assign average salary equals 75450.50, then print it with its label." },
    { start: 8.86, end: 14.06, text: "Python stores decimal numbers as 64-bit IEEE double-precision floats." }
  ],
  "Day01/New_PyDay01Question06sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.56, end: 6.9, text: "We assign company name equals 'Manodemy' in quotes, then print it with its label." },
    { start: 7.48, end: 10.44, text: "Python creates an immutable string object in memory." }
  ],
  "Day01/New_PyDay01Question07sol.mp3": [
    { start: 0.0, end: 1.04, text: "Here is the solution." },
    { start: 1.56, end: 5.82, text: "We write is full time equals True with a capital T, and print it." },
    { start: 6.02, end: 9.04, text: "Python booleans are singletons used for conditional logic." }
  ],
  "Day01/New_PyDay01Question08sol.mp3": [
    { start: 0.0, end: 1.08, text: "Here is the solution." },
    { start: 1.6, end: 8.72, text: "We write sales figures equals opening bracket, 1200, 1450, 1800, closing bracket." },
    { start: 9.01, end: 13.06, text: "Lists allow you to add, remove, and modify elements in place." },
    { start: 13.46, end: 15.08, text: "Then we print the list with its label." }
  ],
  "Day01/New_PyDay01Question09sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.54, end: 8.95, text: "We define server location equals parentheses containing 'Mumbai', 19.07, and 72.87." },
    { start: 9.68, end: 13.84, text: "Tuples protect coordinates and dimensions from accidental modification." },
    { start: 14.38, end: 15.98, text: "Then we print the tuple with its label." }
  ],
  "Day01/New_PyDay01Question10sol.mp3": [
    { start: 0.0, end: 1.08, text: "Here is the solution." },
    { start: 1.56, end: 9.11, text: "We assign customer profile equals curly braces, key 'name' colon 'Aarav', comma, key 'orders' colon 5." },
    { start: 9.48, end: 12.82, text: "Dictionaries provide fast O of 1 lookups by key." },
    { start: 13.02, end: 14.92, text: "Then we print the dictionary with its label." }
  ],
  "Day01/New_PyDay01Question11sol.mp3": [
    { start: 0.0, end: 1.08, text: "Here is the solution." },
    { start: 1.56, end: 8.04, text: "We assign unique tags equals curly braces containing 'python', 'sql', and 'analytics'." },
    { start: 8.68, end: 11.22, text: "Sets automatically discard duplicate entries." },
    { start: 11.72, end: 13.42, text: "Then we print the set with its label." }
  ],
  "Day01/New_PyDay01Question12sol.mp3": [
    { start: 0.0, end: 1.04, text: "Here is the solution." },
    { start: 1.56, end: 4.86, text: "We write bonus amount equals None with a capital N." },
    { start: 5.1, end: 6.5, text: "Then we print it with its label." },
    { start: 6.9, end: 10.92, text: "None is Python's standard singleton for representing the absence of a value." }
  ],
  "Day01/New_PyDay01Question13sol.mp3": [
    { start: 0.0, end: 1.08, text: "Here is the solution." },
    { start: 1.54, end: 3.96, text: "We import defaultdict from collections." },
    { start: 4.46, end: 8.22, text: "Then we build a list called transactions holding four sample records." },
    { start: 8.78, end: 18.46, text: "The first record has user id U zero one, device mobile, ip address ten dot zero dot zero dot one, and amount one twenty point five zero." },
    { start: 18.8, end: 23.89, text: "The second record repeats user U zero one and mobile, with amount three forty." },
    { start: 24.3, end: 34.02, text: "The third record is user U zero two on desktop, ip one nine two dot one six eight dot one dot five, amount eighty five point seven five." },
    { start: 34.34, end: 41.6, text: "The fourth record is user U zero one, mobile, ip ten dot zero dot zero dot two, amount five hundred." },
    { start: 41.94, end: 49.02, text: "Now we create an empty fraud map using defaultdict of float, so a missing key defaults to zero point zero." },
    { start: 49.3, end: 51.1, text: "We loop through each transaction." },
    { start: 51.62, end: 55.26, text: "We build a tuple key from user id, device, and ip." },
    { start: 55.64, end: 59.4, text: "Then we add the transaction amount into fraud map at that key." },
    { start: 59.84, end: 66.54, text: "Finally we print the fraud map, converted to a regular dictionary, which shows the total amount per unique combination." }
  ],
  "Day01/New_PyDay01Question14sol.mp3": [
    { start: 0.0, end: 1.06, text: "Here is the solution." },
    { start: 1.54, end: 3.16, text: "We build a dictionary called nested." },
    { start: 3.72, end: 14.02, text: "It has a key user, whose value is another dictionary with key name, set to Aarav, and key address, which holds key city set to Mumbai and key pin set to None." },
    { start: 14.46, end: 17.28, text: "It also has key score, set to ninety five." },
    { start: 17.58, end: 25.6, text: "Then we define a function called flatten dict that takes a dictionary d and a parent key, and creates an empty dictionary called items." },
    { start: 26.22, end: 29.78, text: "We loop over each key value pair in d using the items method." },
    { start: 30.32, end: 40.12, text: "We build a new key: if parent key exists, we combine parent key, a dot, and the current key using an f string; otherwise the new key is just k." },
    { start: 40.5, end: 49.24, text: "If the value is a dictionary, we check with isinstance, and recursively call flatten dict with the value and the new key, then update items." },
    { start: 49.78, end: 56.22, text: "Otherwise, we set items at the new key to the value, or to the string N/A if the value is None." },
    { start: 56.66, end: 57.6, text: "We return items." },
    { start: 58.14, end: 63.48, text: "Finally we call flatten dict on nested, store the result in flat, and print flat." }
  ],
  "Day01/New_PyDay01Question15sol.mp3": [
    { start: 0.0, end: 1.08, text: "Here is the solution." },
    { start: 1.56, end: 2.46, text: "We import sys." },
    { start: 2.9, end: 5.36, text: "Then we create an empty list called lst." },
    { start: 5.86, end: 8.6, text: "We also create an empty list called jump sizes." },
    { start: 9.14, end: 15.18, text: "We measure the size of lst using sys dot getsizeof, and store that value in prev size." },
    { start: 15.7, end: 18.8, text: "We loop from 0 to 20 using range of 21." },
    { start: 19.34, end: 21.86, text: "Inside the loop, we append i to lst." },
    { start: 22.26, end: 27.02, text: "Then we measure the size of lst again with getsizeof, and store it in cur size." },
    { start: 27.48, end: 35.96, text: "If cur size is greater than prev size, we append the tuple of i and cur size to jump sizes, and we update prev size to cur size." },
    { start: 36.4, end: 39.62, text: "Finally we print jump sizes, and that is our complete answer." }
  ],
  "Day01/New_PyDay01Question01.mp3": [
    { start: 0.0, end: 2.4, text: "Welcome to your first Python exercise!" },
    { start: 3.06, end: 8.8, text: "Use Python's built-in print function to output the greeting: Hello, Python for Data Analysis!" },
    { start: 9.36, end: 9.9, text: "to the console." }
  ],
  "Day01/New_PyDay01Question02.mp3": [
    { start: 0.0, end: 2.02, text: "Let's perform calculations with print!" },
    { start: 2.5, end: 5.56, text: "The print function can directly calculate math expressions." },
    { start: 6.08, end: 10.62, text: "Use print to compute and display the sum of 150 plus 250." }
  ],
  "Day01/New_PyDay01Question03.mp3": [
    { start: 0.0, end: 1.48, text: "Printing multiple values!" },
    { start: 2.08, end: 6.1, text: "You can print multiple items in a single line separated by commas." },
    { start: 6.42, end: 10.92, text: "Use print to output the label 'Total Records:' followed by the number 500." }
  ],
  "Day01/New_PyDay01Question04.mp3": [
    { start: 0.0, end: 1.94, text: "Creating an integer variable!" },
    { start: 2.56, end: 5.16, text: "Integers store whole numbers without decimals." },
    { start: 5.52, end: 10.86, text: "Create a variable named employee count set to 150, and print it with the label 'Employee Count:'." }
  ],
  "Day01/New_PyDay01Question05.mp3": [
    { start: 0.0, end: 1.52, text: "Creating a float variable!" },
    { start: 1.96, end: 3.58, text: "Floats store decimal numbers." },
    { start: 4.22, end: 12.16, text: "Create a float variable named average salary set to 75450.50, and print it with the label 'Average Salary:'." }
  ],
  "Day01/New_PyDay01Question06.mp3": [
    { start: 0.0, end: 1.6, text: "Creating a string variable!" },
    { start: 1.99, end: 4.72, text: "Strings store text enclosed in quotation marks." },
    { start: 5.46, end: 10.54, text: "Create a string variable named company name set to 'Manodemy', and print it with its label." }
  ],
  "Day01/New_PyDay01Question07.mp3": [
    { start: 0.0, end: 1.76, text: "Creating a boolean variable!" },
    { start: 2.22, end: 7.0, text: "Booleans represent truth values and must be capitalized: True or False." },
    { start: 7.58, end: 12.08, text: "Create a variable named is full time set to True, and print it with its label." }
  ],
  "Day01/New_PyDay01Question08.mp3": [
    { start: 0.0, end: 1.28, text: "Creating a list!" },
    { start: 1.52, end: 5.8, text: "Lists are ordered, mutable sequences defined inside square brackets." },
    { start: 6.5, end: 13.74, text: "Create a list named sales figures containing 1200, 1450, and 1800, and print it with its label." }
  ],
  "Day01/New_PyDay01Question09.mp3": [
    { start: 0.0, end: 1.28, text: "Creating a tuple!" },
    { start: 1.46, end: 5.08, text: "Tuples are ordered, immutable sequences defined in parentheses." },
    { start: 5.94, end: 14.12, text: "Create a tuple named server location with 'Mumbai', 19.07, and 72.87, and print it with its label." }
  ],
  "Day01/New_PyDay01Question10.mp3": [
    { start: 0.0, end: 1.14, text: "Creating a dictionary!" },
    { start: 1.76, end: 4.66, text: "Dictionaries store key-value pairs in curly braces." },
    { start: 5.4, end: 11.62, text: "Create a dictionary named customer profile with name 'Aarav' and orders 5, and print it with its label." }
  ],
  "Day01/New_PyDay01Question11.mp3": [
    { start: 0.0, end: 1.1, text: "Creating a set!" },
    { start: 1.44, end: 4.6, text: "Sets store unique elements inside curly braces." },
    { start: 5.28, end: 12.0, text: "Create a set named unique tags containing 'python', 'sql', and 'analytics', and print it with its label." }
  ],
  "Day01/New_PyDay01Question12.mp3": [
    { start: 0.0, end: 1.32, text: "The NoneType singleton!" },
    { start: 1.92, end: 5.06, text: "In Python, None represents missing or null data." },
    { start: 5.44, end: 11.18, text: "Create a variable named bonus amount set to None with a capital N, and print it with its label." }
  ],
  "Day01/New_PyDay01Question13.mp3": [
    { start: 0.0, end: 1.64, text: "Composite fraud detection!" },
    { start: 2.26, end: 12.82, text: "Group transaction amounts across multi-dimensional keys user id, device, and ip into a dictionary called fraud map, using a tuple-keyed defaultdict of float." }
  ],
  "Day01/New_PyDay01Question14.mp3": [
    { start: 0.0, end: 2.48, text: "Recursive dict flattener!" },
    { start: 2.48, end: 14.1, text: "Write a recursive function called flatten dict that takes a nested dictionary and a parent key, and returns a flat dictionary with dot-separated keys, coalescing any None values to the string N/A." }
  ],
  "Day01/New_PyDay01Question15.mp3": [
    { start: 0.0, end: 2.04, text: "Dynamic list allocator tracking!" },
    { start: 2.48, end: 6.63, text: "Create an empty list called lst and a list called jump sizes." },
    { start: 7.1, end: 13.34, text: "Loop through the integers zero to twenty using range of twenty one, appending each index to lst." },
    { start: 13.8, end: 19.98, text: "Every time the size of lst jumps, append the index and the new size as a tuple to jump sizes." },
    { start: 20.7, end: 21.18, text: "Finally print jump sizes." }
  ]
};
/* SYNC-GENERATED:PYTHON_CAPTION_TRACKS:END */

/* SYNC-GENERATED:PYTHON_TRACK_DURATIONS:BEGIN */
const PYTHON_TRACK_DURATIONS = {
  'pyDay01': [
    62.52,
    46.25,
    56.26,
    83.9,
    50.06,
    10.32,
    11.45,
    11.14,
    12.77,
    11.4,
    11.74,
    12.05,
    11.93,
    13.46,
    14.5,
    10.9,
    10.82,
    12.43,
    9.43,
    14.11,
    15.46,
    14.47,
    16.34,
    11.98,
    15.29,
    12.36,
    13.8,
    11.52,
    11.28,
    13.18,
    67.01,
    15.22,
    63.86,
    22.25,
    40.01
  ]
};
/* SYNC-GENERATED:PYTHON_TRACK_DURATIONS:END */

function resolveAudioUrl(src) {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  const clean = src.replace(/\\/g, '/').replace(/^\/?(python\/)?/, '');
  return `/python/${clean}`;
}

let currentSpotlightSelector = null;

// ── SQL Day 02 Parity: Section Isolation + Spotlight Orchestrator ──────────────

/**
 * clearSlidePlaybackVisibility — strips ALL playback isolation classes, restoring
 * the slide to its fully-visible, non-playing state. Called on pause / stop / end.
 */
function clearSlidePlaybackVisibility() {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('slideContent'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    container.classList.remove('playback-active');
    container.querySelectorAll(
      '.section-hidden, .narration-spotlight-active, .active-section-mounted, ' +
      '.stunning-section-entry, .instant-display, .row-active-spotlight, ' +
      '.card-active-spotlight, .narration-spotlight'
    ).forEach(el => {
      el.classList.remove(
        'section-hidden', 'narration-spotlight-active', 'active-section-mounted',
        'stunning-section-entry', 'instant-display', 'row-active-spotlight',
        'card-active-spotlight', 'narration-spotlight'
      );
      el.style.opacity = '';
    });
  });

  currentSpotlightSelector = null;
}

/**
 * updateSlidePlaybackVisibility — the heart of the SQL Day 02 parity sync.
 * 1. Marks the slide container with .playback-active (enables dim rule).
 * 2. Hides all .slide-section except the one containing targetSelector.
 * 3. Plays the gorgeous pop-in animation on section entry.
 * 4. Applies card / row / heading spotlight to the specific element.
 * 5. Ergonomically scrolls the target into view.
 *
 * @param {string} targetSelector — CSS selector of the element to spotlight
 * @param {boolean} isSeek — if true, skips animation (instant display on scrub)
 */
function updateSlidePlaybackVisibility(targetSelector, isSeek = false) {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('slideContent'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    container.classList.add('playback-active');

    // 1. Clear previous spotlight classes
    container.querySelectorAll(
      '.narration-spotlight-active, .row-active-spotlight, .card-active-spotlight, .narration-spotlight'
    ).forEach(el => {
      el.classList.remove('narration-spotlight-active', 'row-active-spotlight', 'card-active-spotlight', 'narration-spotlight');
    });

    // 2. Find the target element
    let targetEl = null;
    try { targetEl = container.querySelector(targetSelector); } catch(e) {}
    if (!targetEl) return;

    // 3. Isolate the active .slide-section
    const activeSection = targetEl.closest('.slide-section');
    if (!activeSection) {
      container.querySelectorAll('.slide-section').forEach(s => s.classList.remove('section-hidden'));
      return;
    }

    const isAlreadyMounted = !activeSection.classList.contains('section-hidden') &&
                             activeSection.classList.contains('active-section-mounted');

    if (!isAlreadyMounted) {
      container.querySelectorAll('.slide-section').forEach(section => {
        if (section !== activeSection) {
          section.classList.add('section-hidden');
          section.classList.remove('stunning-section-entry', 'active-section-mounted', 'instant-display');
        } else {
          section.classList.remove('section-hidden');
          section.classList.add('active-section-mounted');
          if (isSeek) {
            section.classList.add('instant-display');
            section.classList.remove('stunning-section-entry');
          } else {
            section.classList.remove('instant-display');
            section.classList.add('stunning-section-entry');
          }
        }
      });
      container.scrollTop = 0;
    }

    // 4. Apply spotlight to the specific element — card, row, or heading
    const targetRow = targetEl.closest('tr');
    const targetCard = targetEl.closest(
      '.py-sp-card, .py-sp-ai-banner, .py-mut-panel, .py-analyst-trap-card, .py-vfc-node'
    );

    if (targetRow) {
      targetRow.classList.add('row-active-spotlight');
    } else if (targetCard) {
      targetCard.classList.add('card-active-spotlight');
    } else {
      targetEl.classList.add('narration-spotlight-active');
    }

    // 5. Ergonomic smooth scroll: bring target to near-top of scroll container
    try {
      const containerRect = container.getBoundingClientRect();
      const targetRect = (targetCard || targetRow || targetEl).getBoundingClientRect();
      const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: Math.max(0, relativeTop - 32), behavior: isSeek ? 'auto' : 'smooth' });
    } catch(e) {}
  });
}

// Alias: clearTheoryVisuals → also clears the new classes for backward compat
function clearTheoryVisuals() {
  clearSlidePlaybackVisibility();
  clearPyNarrationGroups();
}

// ── Per-Track Narration Group Choreography (SQL Day 02 dispatcher parity) ─────
// The cue ladder above spotlights one element at a time. These groups add the
// second layer SQL uses: while the narrator walks a set of related elements, the
// element being discussed lights up, the ones already covered stay marked as
// done, and the ones still to come are dimmed.

const PY_NARRATION_GROUPS = {
  // Audio01 is a progressive reveal: the narrator introduces Python before the
  // list exists, so nothing in the showcase is on screen until the phrase that
  // introduces it, and each superpower appears only when the narrator reaches
  // it. `gate` items are headings — revealed once, then left at full emphasis.
  'New_PyDay01Audio01.mp3': {
    scope: '#day01WhyPythonSection',
    reveal: true,
    container: '.py-sp-showcase',
    items: [
      { sel: '.py-sp-showcase .py-sp-header', gate: true },
      '.py-sp-card.sp-blue',
      '.py-sp-card.sp-green',
      '.py-sp-card.sp-amber',
      '.py-sp-card.sp-purple',
      '.py-sp-ai-banner'
    ]
  },
  'New_PyDay01Audio02.mp3': {
    scope: '#day01ToolMatrixSection',
    items: [
      '.py-matrix-table tbody tr:nth-child(1)',
      '.py-matrix-table tbody tr:nth-child(2)',
      '.py-matrix-table tbody tr:nth-child(3)'
    ],
    resolveFromCue: true
  },
  'New_PyDay01Audio03.mp3': {
    scope: '#day01MutabilitySection',
    items: ['.py-mut-panel.panel-mutable', '.py-mut-panel.panel-immutable', '.py-analyst-trap-card']
  },
  'New_PyDay01Audio04.mp3': {
    scope: '#day01DataTypesSection',
    items: [
      '.py-master-ref-table tbody tr:nth-child(1)',
      '.py-master-ref-table tbody tr:nth-child(2)',
      '.py-master-ref-table tbody tr:nth-child(3)',
      '.py-master-ref-table tbody tr:nth-child(4)',
      '.py-master-ref-table tbody tr:nth-child(5)',
      '.py-master-ref-table tbody tr:nth-child(6)',
      '.py-master-ref-table tbody tr:nth-child(7)',
      '.py-master-ref-table tbody tr:nth-child(8)',
      '.py-master-ref-table tbody tr:nth-child(9)',
      '.py-master-ref-table tbody tr:nth-child(10)',
      '.py-master-ref-table tbody tr:nth-child(11)',
      '.py-master-ref-table tbody tr:nth-child(12)'
    ]
  },
  'New_PyDay01Audio05.mp3': {
    scope: '#day01MemorySection',
    items: [
      '.vnode-code',
      '.vnode-objects',
      '.vnode-pointers',
      '.vnode-mutable',
      '.vnode-mgmt'
    ]
  }
};

let activePyGroupKey = null;

/**
 * pyCueWindows — turns the cue ladder into explicit [start, end) windows so a
 * highlight can be released when the narrator moves on, instead of latching.
 */
function pyCueWindows(src) {
  if (!src) return [];
  const fname = src.split('/').pop().split('?')[0];
  const key = Object.keys(THEORY_VISUAL_CUES).find(k => k.includes(fname));
  if (!key) return [];
  const cues = THEORY_VISUAL_CUES[key];
  return cues.map((cue, i) => ({
    selector: cue.selector,
    atSec: cue.atSec,
    endAt: i + 1 < cues.length ? cues[i + 1].atSec : Infinity
  }));
}

function pyActiveCueIndex(src, t) {
  const windows = pyCueWindows(src);
  let idx = -1;
  for (let i = 0; i < windows.length; i++) {
    if (t >= windows[i].atSec) idx = i;
    else break;
  }
  return idx;
}

function clearPyNarrationGroups() {
  document.querySelectorAll(
    '.py-narration-active, .py-narration-dim, .py-narration-done, ' +
    '.py-narration-upcoming, .py-narration-container-hidden'
  ).forEach(el => {
    el.classList.remove(
      'py-narration-active', 'py-narration-dim', 'py-narration-done',
      'py-narration-upcoming', 'py-narration-container-hidden'
    );
  });
  activePyGroupKey = null;
}

/** Items are either a selector string or `{ sel, gate }` for heading elements. */
function pyItemSelector(item) {
  return typeof item === 'string' ? item : item.sel;
}

/**
 * updatePyNarrationGroup — drives the group choreography for one theory track.
 * Items already narrated keep a "done" mark so progress is visible; the item
 * currently being discussed is the only one at full emphasis.
 *
 * Groups flagged `reveal` additionally hide anything the narrator has not reached
 * yet, and hide their whole `container` until the first item is introduced.
 */
function updatePyNarrationGroup(src, currentTime, isPlaying) {
  if (!src || !isPlaying) return;
  const fname = src.split('/').pop().split('?')[0];
  const group = PY_NARRATION_GROUPS[fname];
  if (!group) return;

  const windows = pyCueWindows(src);
  const cueIndex = pyActiveCueIndex(src, currentTime);
  if (cueIndex === -1) return;

  const selectors = group.items.map(pyItemSelector);
  let itemIndex = selectors.indexOf(windows[cueIndex].selector);

  if (itemIndex === -1 && group.resolveFromCue) {
    // The cue landed on a wrapper (e.g. the table itself); hold the last row lit.
    const within = windows.slice(0, cueIndex + 1)
      .map(w => selectors.indexOf(w.selector))
      .filter(i => i !== -1);
    itemIndex = within.length ? within[within.length - 1] : -1;
  }

  // A non-reveal group must leave its state alone until the first member is
  // actually discussed, rather than blanking a group the narrator hasn't reached.
  if (itemIndex === -1 && !group.reveal) return;

  const groupKey = fname + ':' + cueIndex;
  if (groupKey === activePyGroupKey) return;
  activePyGroupKey = groupKey;

  const scope = document.querySelector(group.scope) || document;

  if (group.reveal && group.container) {
    const box = scope.querySelector(group.container);
    if (box) box.classList.toggle('py-narration-container-hidden', itemIndex === -1);
  }

  group.items.forEach((item, i) => {
    const el = scope.querySelector(pyItemSelector(item));
    if (!el) return;
    const isGate = typeof item === 'object' && item.gate;
    const isActive = i === itemIndex;
    const isDone = !isGate && i < itemIndex;
    let isUpcoming = i > itemIndex;

    // Never withhold an element that contains other members of this group.
    // Hiding such a wrapper (a whole table or showcase) would take the revealed
    // items down with it, leaving the section blank.
    if (isUpcoming && group.reveal) {
      for (let j = 0; j < group.items.length; j++) {
        if (j === i) continue;
        const other = scope.querySelector(pyItemSelector(group.items[j]));
        if (other && other !== el && el.contains(other)) {
          isUpcoming = false;
          break;
        }
      }
    }

    el.classList.toggle('py-narration-active', isActive);
    el.classList.toggle('py-narration-done', isDone);
    if (group.reveal) {
      el.classList.remove('py-narration-dim');
      el.classList.toggle('py-narration-upcoming', isUpcoming);
    } else {
      el.classList.remove('py-narration-upcoming');
      el.classList.toggle('py-narration-dim', isUpcoming);
    }
  });
}

/**
 * dispatchPythonTrackVisualHighlights — per-track entry point, mirroring
 * SQL Day 02's dispatchTrackVisualHighlights. Keeps the track -> visual mapping
 * in one place so a new narration track only needs a branch here.
 */
function dispatchPythonTrackVisualHighlights(track, currentTime, isPlaying, isSeek = false) {
  if (!track || !track.src) return;

  // Captions cover every track kind; the spotlight choreography is theory-only.
  if (track.type !== 'solution') {
    if (isPlaying) {
      updatePyNarrationGroup(track.src, currentTime, true);
      syncTheoryVisuals({ currentTime }, track.src, isSeek);
    } else {
      clearPyNarrationGroups();
    }
  }
  updateNarrationCaption(track.src, currentTime, isPlaying);
}

/**
 * updateNarrationCaption — shows the sentence the narrator is currently saying,
 * using the timings forced onto the narration scripts by Whisper ASR.
 */
let lastCaptionText = null;

function updateNarrationCaption(src, currentTime, isPlaying) {
  const box = document.getElementById('workspaceVpCaption');
  if (!box) return;
  if (!isPlaying) {
    box.classList.remove('narration-active');
    lastCaptionText = null;
    return;
  }

  const fname = src.split('/').pop().split('?')[0];
  const key = Object.keys(PYTHON_CAPTION_TRACKS).find(k => k.includes(fname));
  const sentences = key ? PYTHON_CAPTION_TRACKS[key] : null;
  if (!sentences || !sentences.length) return;

  let active = sentences[0];
  for (let i = 0; i < sentences.length; i++) {
    if (currentTime >= sentences[i].start) active = sentences[i];
    else break;
  }
  if (!active || active.text === lastCaptionText) return;

  lastCaptionText = active.text;
  box.textContent = active.text;
  box.classList.add('narration-active');
}

/**
 * syncTheoryVisuals — called on ontimeupdate. Reads the THEORY_VISUAL_CUES map
 * for the current audio file, finds the active cue, and calls
 * updateSlidePlaybackVisibility with the right selector.
 */
function syncTheoryVisuals(audioObj, src, isSeek = false) {
  if (!audioObj || !src) return;
  const fname = src.split('/').pop().split('?')[0];
  const matchedKey = Object.keys(THEORY_VISUAL_CUES).find(k => k.includes(fname));
  if (!matchedKey) return;

  const cues = THEORY_VISUAL_CUES[matchedKey];
  const t = audioObj.currentTime || 0;

  let activeCue = cues[0];
  for (let i = 0; i < cues.length; i++) {
    if (t >= cues[i].atSec) {
      activeCue = cues[i];
    } else {
      break;
    }
  }

  if (activeCue && activeCue.selector !== currentSpotlightSelector) {
    currentSpotlightSelector = activeCue.selector;
    updateSlidePlaybackVisibility(activeCue.selector, isSeek);
  }
}

let activeTypewriterRAF = null;
let activeTypewriterEvents = [];
let activeTypewriterScrollAt = null;
let hasExecutedCurrentCode = false;
let typewriterAttachedAudio = null;
let typewriterPlayHandler = null;
let typewriterTimeupdateHandler = null;

function cancelTypewriter() {
  if (activeTypewriterRAF) {
    cancelAnimationFrame(activeTypewriterRAF);
    activeTypewriterRAF = null;
  }
  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }
  if (typewriterAttachedAudio && typewriterPlayHandler) {
    typewriterAttachedAudio.removeEventListener('play', typewriterPlayHandler);
    typewriterAttachedAudio.removeEventListener('playing', typewriterPlayHandler);
    typewriterAttachedAudio.removeEventListener('timeupdate', typewriterTimeupdateHandler);
  }
  typewriterAttachedAudio = null;
  typewriterPlayHandler = null;
  typewriterTimeupdateHandler = null;
  activeTypewriterEvents = [];
  activeTypewriterScrollAt = null;
  hasExecutedCurrentCode = false;
}

/**
 * setEditorCodeSafely — writes narration-driven text into CodeMirror without
 * clobbering the learner's own edits when the value is already identical.
 */
function setEditorCodeSafely(text) {
  if (!mainEditor) return;
  const next = text || '';
  if (mainEditor.getValue() === next) return;
  mainEditor.setValue(next);
  try { mainEditor.setCursor(mainEditor.lineCount(), 0); } catch (e) {}
}

/**
 * startAudioSyncedTypewriter — SQL Day 02 parity.
 *
 * Each `segments` entry is one phrase of the code with the timestamp the narrator
 * starts saying it and a per-character cadence. Segments are expanded into
 * per-character events that are compared against `audioObj.currentTime`.
 *
 * Cue timings are deliberately NOT divided by the playback rate: `currentTime`
 * already advances at content speed, so at 1.25x the same content timestamps
 * naturally arrive sooner and the typing tracks the voice in wall-clock terms.
 * Scrubbing in either direction re-derives the visible text from `currentTime`,
 * so the editor, the output panel and the narration can never disagree.
 */
function startAudioSyncedTypewriter(audioObj, solEntry) {
  cancelTypewriter();
  if (!audioObj || !solEntry || !mainEditor) return;

  const duration = solEntry.duration ||
    (audioObj.duration && !isNaN(audioObj.duration) ? audioObj.duration : 12);

  let syncEvents = [];
  if (Array.isArray(solEntry.segments) && solEntry.segments.length) {
    let currentCode = '';
    solEntry.segments.forEach(seg => {
      const chars = (seg.text || '').split('');
      const intervalSec = (seg.charInterval || 70) / 1000;
      chars.forEach((ch, idx) => {
        currentCode += ch;
        syncEvents.push({
          atSec: (seg.startAt || 0) + idx * intervalSec,
          text: currentCode
        });
      });
    });
  } else {
    // Legacy fallback: even cadence across the whole snippet.
    const code = (solEntry.code || '').trim();
    const startAt = solEntry.startAt || 1.3;
    const endAt = solEntry.endAt || Math.max(startAt + 1, duration - 1.4);
    const intervalSec = (endAt - startAt) / Math.max(1, code.length);
    let currentCode = '';
    code.split('').forEach((ch, idx) => {
      currentCode += ch;
      syncEvents.push({ atSec: startAt + idx * intervalSec, text: currentCode });
    });
  }
  syncEvents.sort((a, b) => a.atSec - b.atSec);

  const scrollAtSec = solEntry.scrollAt || Math.max(0, duration - 0.8);
  const initialTime = (audioObj && typeof audioObj.currentTime === 'number') ? audioObj.currentTime : 0;

  activeTypewriterEvents = syncEvents;
  activeTypewriterScrollAt = scrollAtSec;
  hasExecutedCurrentCode = false;

  // Fast-forward the editor to wherever the learner scrubbed into.
  let nextEvtIdx = 0;
  let currentText = '';
  while (nextEvtIdx < syncEvents.length && initialTime >= syncEvents[nextEvtIdx].atSec) {
    currentText = syncEvents[nextEvtIdx].text;
    nextEvtIdx++;
  }
  setEditorCodeSafely(currentText);

  if (nextEvtIdx >= syncEvents.length && syncEvents.length && initialTime < scrollAtSec) {
    hasExecutedCurrentCode = true;
    if (typeof runCurrentCode === 'function') runCurrentCode(false);
  }
  if (initialTime >= scrollAtSec) {
    hasExecutedCurrentCode = true;
    if (typeof runCurrentCode === 'function') runCurrentCode(false);
    const out = document.getElementById('mainOutput');
    if (out) out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function step() {
    if (!audioObj || audioObj.ended) {
      activeTypewriterRAF = null;
      return;
    }
    const t = audioObj.currentTime || 0;

    // Backward scrub: rewind the event cursor and rebuild the visible text.
    if (nextEvtIdx > 0 && t < syncEvents[nextEvtIdx - 1].atSec) {
      nextEvtIdx = 0;
      let text = '';
      while (nextEvtIdx < syncEvents.length && t >= syncEvents[nextEvtIdx].atSec) {
        text = syncEvents[nextEvtIdx].text;
        nextEvtIdx++;
      }
      setEditorCodeSafely(text);
    }

    while (nextEvtIdx < syncEvents.length && t >= syncEvents[nextEvtIdx].atSec) {
      setEditorCodeSafely(syncEvents[nextEvtIdx].text);
      nextEvtIdx++;
    }

    if (!hasExecutedCurrentCode && t >= scrollAtSec) {
      hasExecutedCurrentCode = true;
      if (typeof runCurrentCode === 'function') {
        runCurrentCode(false);
        setTimeout(() => {
          const out = document.getElementById('mainOutput');
          if (out) out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 350);
      }
    }

    if (audioObj.paused) {
      activeTypewriterRAF = null;
    } else {
      activeTypewriterRAF = requestAnimationFrame(step);
    }
  }

  function ensureRunning() {
    if (!activeTypewriterRAF) {
      activeTypewriterRAF = requestAnimationFrame(step);
    }
  }

  // Keep typing in step when playback resumes without a full re-entry.
  if (typeof audioObj.addEventListener === 'function') {
    typewriterAttachedAudio = audioObj;
    typewriterPlayHandler = ensureRunning;
    typewriterTimeupdateHandler = step;
    audioObj.addEventListener('play', ensureRunning);
    audioObj.addEventListener('playing', ensureRunning);
    audioObj.addEventListener('timeupdate', step);
  }

  if (!audioObj.paused) {
    activeTypewriterRAF = requestAnimationFrame(step);
  }
}

function playAudio(src, btn, onStartCb) {
  if (currentDayData?.media?.mode === 'study') return;
  if (!src) return;
  const audioSrc = resolveAudioUrl(src);

  // Initialize master timeline tracks if not loaded
  if (!combinedTracks || combinedTracks.length === 0) {
    const registry = resolvePythonDayTracks(currentDayId, currentDayData);
    if (registry) {
      combinedTracks = registry.tracks.slice();
      combinedTrackDurations = resolveTrackDurations(currentDayId, registry);
      totalCombinedDuration = combinedTrackDurations.reduce((acc, d) => acc + d, 0);
    }
  }

  // 1. Direct integration with Master Combined Timeline (SQL Day 02 Parity)
  const fname = src.split('/').pop().split('?')[0];
  const trackIdx = combinedTracks ? combinedTracks.findIndex(t => {
    const tSrc = (t.src || t.audio || '').split('/').pop().split('?')[0];
    return tSrc === fname || (t.src && t.src.includes(fname));
  }) : -1;

  if (trackIdx !== -1) {
    currentPlayingBtn = btn;
    if (combinedTrackIndex === trackIdx && isCombinedPlaying) {
      pauseCombinedPlayback();
    } else {
      isCombinedPlaying = true;
      playTrackSegment(trackIdx);
    }
    return;
  }

  // 2. Standalone fallback for audio clips outside the master timeline
  if (currentPlayingAudio && currentPlayingAudio.src.includes(fname)) {
    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play().catch(e => console.warn(e));
      if (btn) {
        btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        btn.classList.add('playing');
        btn.setAttribute('title', 'Pause narration (Space)');
      }
      updatePlayButtonStates(true);
    } else {
      currentPlayingAudio.pause();
      if (btn) {
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Play narration (Space)');
      }
      if (activeTypewriterRAF) {
        cancelAnimationFrame(activeTypewriterRAF);
        activeTypewriterRAF = null;
      }
      updatePlayButtonStates(false);
    }
    return;
  }

  // Stop any active combined timeline audio if playing standalone clip
  if (activeCombinedAudio) {
    try { activeCombinedAudio.pause(); } catch(e) {}
    activeCombinedAudio = null;
    isCombinedPlaying = false;
  }

  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    if (currentPlayingBtn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
    }
  }

  cancelTypewriter();
  clearTheoryVisuals();

  currentPlayingAudio = new Audio(audioSrc);
  currentPlayingBtn = btn;
  currentPlayingAudio.playbackRate = currentPlaybackRate;
  currentPlayingAudio.volume = isMuted ? 0 : currentPlaybackVolume;

  currentPlayingAudio.onplay = () => {
    if (btn) {
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      btn.setAttribute('title', 'Pause narration (Space)');
    }
    const sec = btn ? btn.closest('.slide-section') : null;
    if (sec) {
      document.querySelectorAll('.slide-section').forEach(s => s.classList.remove('active-narration'));
      sec.classList.add('active-narration');
    }
    updatePlayButtonStates(true);
    const clipCaption = document.getElementById('workspaceVpCaption');
    if (clipCaption) {
      clipCaption.style.display = 'block';
      clipCaption.classList.add('narration-active');
      const key = Object.keys(PYTHON_CAPTION_TRACKS).find(k => k.includes(fname));
      const opening = key && PYTHON_CAPTION_TRACKS[key] && PYTHON_CAPTION_TRACKS[key][0];
      clipCaption.textContent = opening ? opening.text : 'Narrator speaking…';
    }
    lastCaptionText = null;
    dispatchPythonTrackVisualHighlights({ src, type: 'narration' }, currentPlayingAudio.currentTime, true);
    if (typeof onStartCb === 'function') {
      onStartCb(currentPlayingAudio);
    }
  };

  currentPlayingAudio.ontimeupdate = () => {
    dispatchPythonTrackVisualHighlights({ src, type: 'narration' }, currentPlayingAudio.currentTime, true);
  };

  currentPlayingAudio.onpause = () => {
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
      btn.setAttribute('title', 'Play narration (Space)');
    }
    if (activeTypewriterRAF) {
      cancelAnimationFrame(activeTypewriterRAF);
      activeTypewriterRAF = null;
    }
    dispatchPythonTrackVisualHighlights({ src, type: 'narration' }, currentPlayingAudio.currentTime, false);
    updatePlayButtonStates(false);
  };

  currentPlayingAudio.onended = () => {
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
      btn.setAttribute('title', 'Play narration (Space)');
    }
    clearTheoryVisuals();
    cancelTypewriter();
    updatePlayButtonStates(false);
    const doneCaption = document.getElementById('workspaceVpCaption');
    if (doneCaption) {
      doneCaption.style.display = 'none';
      doneCaption.classList.remove('narration-active');
    }
    currentPlayingAudio = null;
    currentPlayingBtn = null;
  };

  currentPlayingAudio.onerror = (err) => {
    console.warn("Audio file error:", src, err);
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    updatePlayButtonStates(false);
  };

  currentPlayingAudio.play().catch(e => {
    console.warn("Audio play blocked:", e.message);
    updatePlayButtonStates(false);
  });
}

function playQuestionAudio(btn) {
  if (currentDayData?.media?.mode === 'study') return;
  const q = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
  if (!q) return;
  if (!combinedTracks || combinedTracks.length === 0) {
    const registry = resolvePythonDayTracks(currentDayId, currentDayData);
    if (registry) {
      combinedTracks = registry.tracks.slice();
      combinedTrackDurations = resolveTrackDurations(currentDayId, registry);
      totalCombinedDuration = combinedTrackDurations.reduce((acc, d) => acc + d, 0);
    }
  }
  const qIdx = combinedTracks ? combinedTracks.findIndex(t => t.type === 'question' && (t.qId === q.id || findQuestionIdxById(t.qId) === currentQuestionIndex)) : -1;
  if (qIdx !== -1) {
    currentPlayingBtn = btn;
    if (combinedTrackIndex === qIdx && isCombinedPlaying) {
      pauseCombinedPlayback();
    } else {
      isCombinedPlaying = true;
      playTrackSegment(qIdx);
    }
    return;
  }
  const dayNum = String(currentDayData.day).padStart(2,'0');
  const qNum = String(currentQuestionIndex + 1).padStart(2,'0');
  const src = q.questionAudio || `Day${dayNum}/New_PyDay${dayNum}Question${qNum}.mp3`;
  cancelTypewriter();
  playAudio(src, btn);
}

function playSolutionAudioFromBtn(btn) {
  if (currentDayData?.media?.mode === 'study') return;
  const q = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
  if (!q) return;
  if (!combinedTracks || combinedTracks.length === 0) {
    const registry = resolvePythonDayTracks(currentDayId, currentDayData);
    if (registry) {
      combinedTracks = registry.tracks.slice();
      combinedTrackDurations = resolveTrackDurations(currentDayId, registry);
      totalCombinedDuration = combinedTrackDurations.reduce((acc, d) => acc + d, 0);
    }
  }
  const sIdx = combinedTracks ? combinedTracks.findIndex(t => t.type === 'solution' && (t.qId === q.id || findQuestionIdxById(t.qId) === currentQuestionIndex)) : -1;
  if (sIdx !== -1) {
    currentPlayingBtn = btn;
    if (combinedTrackIndex === sIdx && isCombinedPlaying) {
      pauseCombinedPlayback();
    } else {
      isCombinedPlaying = true;
      playTrackSegment(sIdx);
    }
    return;
  }
  const dayNum = String(currentDayData.day).padStart(2,'0');
  const qNum = String(currentQuestionIndex + 1).padStart(2,'0');
  const src = q.solutionAudio || `Day${dayNum}/New_PyDay${dayNum}Question${qNum}sol.mp3`;
  const solMap = PYTHON_QUESTION_SOLUTIONS[currentDayId] || PYTHON_QUESTION_SOLUTIONS['pyDay01'];
  const solEntry = (solMap && solMap[q.id]) || { code: q.ref, duration: 12 };
  playAudio(src, btn, (audioInstance) => {
    if (solEntry) {
      startAudioSyncedTypewriter(audioInstance, solEntry);
    }
  });
}

function typewriterCode(targetCode) {
  // Legacy fallback if called directly
  if (!mainEditor) return;
  startAudioSyncedTypewriter({ currentTime: 0, duration: 8, paused: false }, { code: targetCode, startAt: 0, endAt: 7.5 });
}

// ── Master Timeline Combined Playback Controls ──────────────────
function toggleCombinedPlayback() {
  if (isCombinedPlaying) {
    pauseCombinedPlayback();
  } else {
    playCombinedPlayback();
  }
}

function playCombinedPlayback() {
  if (currentDayData?.media?.mode === 'study') return;
  if (!combinedTracks || combinedTracks.length === 0) {
    const registry = resolvePythonDayTracks(currentDayId, currentDayData);
    if (registry) {
      combinedTracks = registry.tracks.slice();
      combinedTrackDurations = resolveTrackDurations(currentDayId, registry);
      totalCombinedDuration = combinedTrackDurations.reduce((acc, d) => acc + d, 0);
    }
  }
  if (!combinedTracks || combinedTracks.length === 0) return;

  // Stop any active single-audio playback
  if (currentPlayingAudio) {
    try { currentPlayingAudio.pause(); } catch(e) {}
    if (currentPlayingBtn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
      currentPlayingBtn = null;
    }
  }

  isCombinedPlaying = true;
  updatePlayButtonStates(true);

  if (activeCombinedAudio && activeCombinedAudio.paused && combinedTrackIndex >= 0) {
    activeCombinedAudio.play().catch(e => console.warn(e));
    const track = combinedTracks[combinedTrackIndex];
    if (track && track.type === 'solution' && track.qId) {
      const solMap = PYTHON_QUESTION_SOLUTIONS[currentDayId] || PYTHON_QUESTION_SOLUTIONS['pyDay01'];
      const solEntry = (solMap && solMap[track.qId]);
      if (solEntry) {
        startAudioSyncedTypewriter(activeCombinedAudio, solEntry);
      }
    } else if (track) {
      dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, true);
    }
  } else {
    playTrackSegment(combinedTrackIndex);
  }
}

/**
 * resolveTrackDurations — prefers the durations measured from the MP3s over the
 * hand-entered registry list, so re-recording a narration can never leave the
 * master timeline seeking against stale numbers. Falls back to the registry, and
 * finally to a per-track probe of the audio metadata.
 */
function resolveTrackDurations(dayId, registry) {
  const tracks = (registry && registry.tracks) || [];
  const measured = (typeof PYTHON_TRACK_DURATIONS !== 'undefined') && PYTHON_TRACK_DURATIONS[dayId];

  if (measured && measured.length === tracks.length && measured.every(d => d > 0)) {
    return measured.slice();
  }

  const declared = (registry && registry.durations) || [];
  if (declared.length === tracks.length && declared.every(d => d > 0)) {
    return declared.slice();
  }

  // Last resort: let the browser report each clip's real length.
  return tracks.map((track, i) => declared[i] || 0);
}

function pauseCombinedPlayback() {
  isCombinedPlaying = false;
  updatePlayButtonStates(false);

  if (activeCombinedAudio) {
    try { activeCombinedAudio.pause(); } catch(e) {}
  }
  if (activeTypewriterRAF) {
    cancelAnimationFrame(activeTypewriterRAF);
    activeTypewriterRAF = null;
  }
  if (playbackTimerInterval) {
    clearInterval(playbackTimerInterval);
    playbackTimerInterval = null;
  }
  // SQL Day 02 parity: restore full slide visibility on pause
  clearSlidePlaybackVisibility();
}

function playTrackSegment(trackIdx, localOffset = 0) {
  if (!isCombinedPlaying) return;
  if (trackIdx < 0 || trackIdx >= combinedTracks.length) {
    onCombinedPlaybackEnded();
    return;
  }

  cancelTypewriter();
  clearTheoryVisuals();

  // Stop any active single-audio playback
  if (currentPlayingAudio) {
    try { currentPlayingAudio.pause(); } catch(e) {}
    if (currentPlayingBtn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
      currentPlayingBtn = null;
    }
  }

  combinedTrackIndex = trackIdx;
  const track = combinedTracks[trackIdx];
  updateChapterListActive();

  // ── INSTANT SCENE TRANSITION (SQL Day 02 parity) ─────────────────
  const qBar = document.getElementById('questionBar');
  if (track.type === 'question' && track.qId) {
    // Use findIndex like SQL — qId value is NOT guaranteed to equal array position
    const qIdx = findQuestionIdxById(track.qId);
    if (qIdx !== -1) loadPracticeQuestion(qIdx);
    if (qBar) {
      qBar.classList.add('question-playing');
      qBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } else if (track.type === 'solution' && track.qId) {
    const qIdx = findQuestionIdxById(track.qId);
    if (qIdx !== -1) loadPracticeQuestion(qIdx);
    if (qBar) {
      qBar.classList.add('question-playing');
      qBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } else {
    // Theory narration track
    if (qBar) qBar.classList.remove('question-playing');
    // Scroll to the section targeted by this narration track
    if (track && track.target) {
      scrollToLessonTarget(track.target, false);
    }
  }

  // Caption banner — replaced with the live spoken sentence as soon as the
  // first timeupdate lands; this is the fallback title-only state.
  const captionBox = document.getElementById('workspaceVpCaption');
  if (captionBox) {
    captionBox.style.display = 'block';
    captionBox.textContent = `📢 Narrator: "${track.title}"`;
    captionBox.classList.add('narration-active');
  }
  lastCaptionText = null;

  let startOffset = 0;
  for (let i = 0; i < trackIdx; i++) {
    startOffset += combinedTrackDurations[i];
  }
  currentCombinedTime = startOffset + localOffset;
  updateProgressUI();

  if (activeCombinedAudio) {
    try { activeCombinedAudio.pause(); } catch(e) {}
    activeCombinedAudio = null;
  }

  const audioSrc = resolveAudioUrl(track.src);
  activeCombinedAudio = new Audio(audioSrc);
  activeCombinedAudio.playbackRate = currentPlaybackRate;
  activeCombinedAudio.volume = isMuted ? 0 : currentPlaybackVolume;

  if (localOffset > 0) {
    activeCombinedAudio.onloadedmetadata = () => {
      try {
        if (localOffset < activeCombinedAudio.duration) {
          activeCombinedAudio.currentTime = localOffset;
        }
      } catch(e) {}
    };
  }

  activeCombinedAudio.onplay = () => {
    updatePlayButtonStates(true);
    if (track.type === 'solution' && track.qId) {
      const solMap = PYTHON_QUESTION_SOLUTIONS[currentDayId] || PYTHON_QUESTION_SOLUTIONS['pyDay01'];
      const solEntry = (solMap && solMap[track.qId]) || { code: currentDayData?.practiceQuestions[track.qId - 1]?.ref, duration: combinedTrackDurations[trackIdx] };
      if (solEntry) {
        startAudioSyncedTypewriter(activeCombinedAudio, solEntry);
      }
    } else {
      dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, true);
    }
  };

  activeCombinedAudio.ontimeupdate = () => {
    if (isCombinedPlaying && activeCombinedAudio) {
      currentCombinedTime = startOffset + activeCombinedAudio.currentTime;
      updateProgressUI();
      dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, true);
    }
  };

  activeCombinedAudio.onpause = () => {
    updatePlayButtonStates(false);
    dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, false);
  };

  activeCombinedAudio.onseeked = () => {
    dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, true, true);
  };

  activeCombinedAudio.onended = () => {
    cancelTypewriter();
    clearTheoryVisuals();
    if (isCombinedPlaying && combinedTrackIndex === trackIdx) {
      playTrackSegment(trackIdx + 1);
    }
  };

  activeCombinedAudio.onerror = (err) => {
    console.warn("Audio error for track:", track.src, err);
    if (isCombinedPlaying && combinedTrackIndex === trackIdx) {
      playTrackSegment(trackIdx + 1);
    }
  };

  activeCombinedAudio.play().catch(e => {
    console.warn("Audio play blocked:", e.message);
    if (isCombinedPlaying && combinedTrackIndex === trackIdx) {
      playTrackSegment(trackIdx + 1);
    }
  });
}

/**
 * findQuestionIdxById — SQL Day 02 parity.
 * Looks up the 0-based array index of a practice question by its `id` field.
 * This is the ONLY safe way to map track.qId → array index because id and
 * position are not guaranteed to be in sync.
 */
function findQuestionIdxById(qId) {
  if (!currentDayData || !currentDayData.practiceQuestions) return -1;
  return currentDayData.practiceQuestions.findIndex(q => q.id === qId);
}

let isScrubbing = false;

function seekCombinedPlayback(val, shouldPlay = true) {
  const targetTime = parseFloat(val);
  let elapsed = 0;
  let trackIdx = 0;
  let localTime = 0;

  for (let i = 0; i < combinedTrackDurations.length; i++) {
    const dur = combinedTrackDurations[i];
    if (targetTime < elapsed + dur) {
      trackIdx = i;
      localTime = targetTime - elapsed;
      break;
    }
    elapsed += dur;
    if (i === combinedTrackDurations.length - 1) {
      trackIdx = i;
      localTime = Math.max(0, dur - 0.1);
    }
  }

  currentCombinedTime = targetTime;
  combinedTrackIndex = trackIdx;
  updateProgressUI();
  updateChapterListActive();

  const track = combinedTracks[trackIdx];

  // ── INSTANT SYNCHRONOUS SCENE TRANSITION (SQL Day 02 parity) ────────
  // Zero-latency DOM switch: load the right question / theory section
  // immediately on seek so the UI never flashes the wrong content.
  if (track) {
    const qBar = document.getElementById('questionBar');
    if (track.type === 'question' || track.type === 'solution') {
      // Use findIndex like SQL engine — never assume qId-1 === array position
      const qIdx = findQuestionIdxById(track.qId);
      if (qIdx !== -1) {
        loadPracticeQuestion(qIdx);
      }
      if (qBar) {
        qBar.classList.add('question-playing');
        qBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (track.type === 'solution') {
        const solMap = PYTHON_QUESTION_SOLUTIONS[currentDayId] || PYTHON_QUESTION_SOLUTIONS['pyDay01'];
        const solEntry = (solMap && solMap[track.qId]);
        if (solEntry) {
          startAudioSyncedTypewriter({ currentTime: localTime, duration: combinedTrackDurations[trackIdx], paused: !isCombinedPlaying }, solEntry);
        }
      }
    } else {
      if (qBar) qBar.classList.remove('question-playing');
      clearSlidePlaybackVisibility();
      // Scroll to the section targeted by this narration track
      if (track && track.target) {
        scrollToLessonTarget(track.target, true);
      }
      dispatchPythonTrackVisualHighlights(track, localTime, true, true);
    }
  }

  // ── AUDIO TRACK RESOLUTION ──────────────────────────────────────────
  if (shouldPlay) {
    if (activeCombinedAudio) {
      try { activeCombinedAudio.pause(); } catch(e) {}
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (isCombinedPlaying) {
      playTrackSegment(trackIdx, localTime);
    }
  }
}

function skipCombined(seconds) {
  if (!totalCombinedDuration) return;
  const target = Math.max(0, Math.min(totalCombinedDuration, currentCombinedTime + seconds));
  seekCombinedPlayback(target, isCombinedPlaying);
}

function onCombinedPlaybackEnded() {
  isCombinedPlaying = false;
  currentCombinedTime = 0;
  combinedTrackIndex = 0;
  if (playbackTimerInterval) {
    clearInterval(playbackTimerInterval);
    playbackTimerInterval = null;
  }
  updatePlayButtonStates(false);
  updateProgressUI();

  // SQL Day 02 parity: restore full slide visibility on playback end
  clearSlidePlaybackVisibility();

  const qBar = document.getElementById('questionBar');
  if (qBar) qBar.classList.remove('question-playing');

  const captionBox = document.getElementById('workspaceVpCaption');
  if (captionBox) captionBox.style.display = 'none';
}

function updateProgressUI() {
  const seekBar = document.getElementById('seekBar');
  const playbackTime = document.getElementById('playbackTime');
  const isDragging = typeof isScrubbing !== 'undefined' && isScrubbing;
  const dur = totalCombinedDuration > 0 ? totalCombinedDuration : 100;

  if (seekBar) {
    seekBar.max = dur;
    if (!isDragging) {
      seekBar.value = currentCombinedTime;
    }
    const val = isDragging ? parseFloat(seekBar.value) : currentCombinedTime;
    const fillPct = Math.max(0, Math.min(100, (val / dur) * 100));
    seekBar.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
  }
  if (playbackTime && !isDragging) {
    playbackTime.textContent = `${formatTime(currentCombinedTime)} / ${formatTime(totalCombinedDuration)}`;
  }
}

function setupTimelineDragging() {
  const seekBar = document.getElementById('seekBar');
  const tooltip = document.getElementById('timelineHoverTooltip');
  const timelineRow = document.getElementById('playbackTimelineRow');
  if (!seekBar || !timelineRow) return;

  if (timelineRow.dataset.timelineDragBound) return;
  timelineRow.dataset.timelineDragBound = 'true';

  // Real-time hover preview tooltip showing Scene Title + Time + Category Badge
  timelineRow.addEventListener('mousemove', (e) => {
    const rect = seekBar.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pos = rect.width > 0 ? (mouseX / rect.width) : 0;
    const targetTime = pos * (totalCombinedDuration || 100);

    // Resolve track at this hover position
    let elapsed = 0;
    let trackTitle = '';
    let trackType = 'Theory';
    if (typeof combinedTrackDurations !== 'undefined' && typeof combinedTracks !== 'undefined') {
      for (let i = 0; i < combinedTrackDurations.length; i++) {
        const dur = combinedTrackDurations[i];
        if (targetTime < elapsed + dur || i === combinedTrackDurations.length - 1) {
          const t = combinedTracks[i];
          if (t) {
            trackTitle = t.title || t.src || '';
            if (t.type === 'question') trackType = 'Practice';
            else if (t.type === 'solution') trackType = 'Solution';
            else if (t.type === 'completion') trackType = 'Milestone';
          }
          break;
        }
        elapsed += dur;
      }
    }

    if (tooltip) {
      tooltip.classList.add('active');

      const svgTheory = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
      const svgPractice = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
      const svgSolution = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px; vertical-align:-1px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
      const svgMilestone = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7"/><path d="M14 14.66V17c0 .55.45 1 1 1h2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>';

      let badgeHtml = '';
      if (trackType === 'Theory') {
        badgeHtml = '<span class="tt-badge tt-badge--theory">' + svgTheory + 'THEORY</span>';
      } else if (trackType === 'Practice') {
        badgeHtml = '<span class="tt-badge tt-badge--practice">' + svgPractice + 'PRACTICE</span>';
      } else if (trackType === 'Solution') {
        badgeHtml = '<span class="tt-badge tt-badge--solution">' + svgSolution + 'SOLUTION</span>';
      } else {
        badgeHtml = '<span class="tt-badge tt-badge--milestone">' + svgMilestone + 'MILESTONE</span>';
      }

      tooltip.innerHTML = `
        <span class="tt-time">${formatTime(targetTime)}</span>
        <span class="tt-divider"></span>
        ${badgeHtml}
        <span class="tt-title">${trackTitle}</span>
      `;

      // Smart Edge Clamping: Ensure tooltip is NEVER cropped at left or right window boundary
      const tooltipWidth = tooltip.offsetWidth || 220;
      const halfWidth = tooltipWidth / 2;
      const minCenter = halfWidth + 8;
      const maxCenter = Math.max(minCenter, rect.width - halfWidth - 8);
      const clampedCenter = Math.max(minCenter, Math.min(maxCenter, mouseX));

      tooltip.style.left = `${clampedCenter}px`;

      // Position the pointer arrow precisely above the cursor
      const arrowOffset = mouseX - clampedCenter;
      tooltip.style.setProperty('--arrow-x', `${arrowOffset}px`);
    }
  });

  timelineRow.addEventListener('mouseleave', () => {
    if (tooltip) tooltip.classList.remove('active');
  });

  // Direct click on timeline row to seek instantly
  timelineRow.addEventListener('click', (e) => {
    const rect = seekBar.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pos = rect.width > 0 ? (clickX / rect.width) : 0;
    const targetTime = pos * (totalCombinedDuration || 100);
    const sb = document.getElementById('seekBar');
    if (sb) {
      sb.value = targetTime;
      const fillPct = Math.max(0, Math.min(100, pos * 100));
      sb.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
    }
    seekCombinedPlayback(targetTime, true);
  });

  // Smooth live scrubbing
  seekBar.addEventListener('input', (e) => {
    isScrubbing = true;
    const targetTime = parseFloat(e.target.value);
    currentCombinedTime = targetTime;
    updateProgressUI();
    // Live visual scene sync during scrub without audio restart
    seekCombinedPlayback(targetTime, false);
  });

  seekBar.addEventListener('change', (e) => {
    isScrubbing = false;
    seekCombinedPlayback(e.target.value, true);
  });
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/**
 * getLessonDurationString — the single source of truth for "how long is this
 * lesson", so the topic badge and the timeline can never disagree.
 *
 * Prefers the durations measured from the MP3s. The `slides[].duration` string
 * in the content bundle is hand-authored and goes stale the moment narration is
 * re-recorded or a track is added — that is how the badge came to read 3:58
 * while the timeline correctly read 13:41.
 */
function getLessonDurationString(dayId) {
  const id = dayId || (typeof currentDayId !== 'undefined' && currentDayId) || 'pyDay01';
  const content = window.COURSE_CONTENT && window.COURSE_CONTENT[id];
  if (content?.media?.mode === 'study') return 'Study';
  const measured = (typeof PYTHON_TRACK_DURATIONS !== 'undefined') && PYTHON_TRACK_DURATIONS[id];
  if (Array.isArray(measured) && measured.length && measured.every(d => d > 0)) {
    return formatTime(measured.reduce((a, d) => a + d, 0));
  }
  const registry = (typeof PYTHON_DAY_TRACKS !== 'undefined') && PYTHON_DAY_TRACKS[id];
  if (registry && Array.isArray(registry.durations) && registry.durations.length) {
    return formatTime(registry.durations.reduce((a, d) => a + d, 0));
  }
  const slide = currentDayData && currentDayData.slides && currentDayData.slides[0];
  return (slide && slide.duration) || '0:00';
}

function updatePlayButtonStates(isPlaying) {
  const equalizerHtml = `<span class="audio-wave-equalizer" aria-hidden="true"><span></span><span></span><span></span></span>`;

  const navBtn = document.getElementById('navPlayBtn');
  if (navBtn) {
    if (isPlaying) {
      navBtn.innerHTML = `${equalizerHtml} <span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
      navBtn.classList.add('playing');
      navBtn.setAttribute('aria-label', 'Pause Lesson');
      navBtn.setAttribute('aria-pressed', 'true');
    } else {
      navBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">▶</span> <span class="btn-text">Play Lesson</span>`;
      navBtn.classList.remove('playing');
      navBtn.setAttribute('aria-label', 'Play Lesson');
      navBtn.setAttribute('aria-pressed', 'false');
    }
  }

  const playPauseBtn = document.getElementById('playPauseBtn');
  if (playPauseBtn) {
    if (isPlaying) {
      playPauseBtn.innerHTML = `${equalizerHtml} <span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
      playPauseBtn.classList.add('playing');
      playPauseBtn.setAttribute('aria-label', 'Pause Lesson');
      playPauseBtn.setAttribute('aria-pressed', 'true');
    } else {
      playPauseBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">&#9654;</span> <span class="btn-text">Play Lesson</span>`;
      playPauseBtn.classList.remove('playing');
      playPauseBtn.setAttribute('aria-label', 'Play Lesson');
      playPauseBtn.setAttribute('aria-pressed', 'false');
    }
  }

  const captionEl = document.getElementById('workspaceVpCaption');
  if (captionEl) {
    captionEl.classList.toggle('narration-active', isPlaying);
  }

  const activeTrack = (combinedTracks && combinedTrackIndex >= 0 && combinedTrackIndex < combinedTracks.length)
    ? combinedTracks[combinedTrackIndex]
    : null;
  const activeSrc = activeTrack ? (activeTrack.src || '') : '';
  const activeFname = activeSrc.split('/').pop().split('?')[0];

  const playSvg = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  const pauseSvg = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  document.querySelectorAll('.audio-play-btn').forEach(btn => {
    const onclickStr = btn.getAttribute('onclick') || '';

    // For playAudio('filename.mp3', this)
    if (onclickStr.includes('playAudio')) {
      const match = onclickStr.match(/playAudio\(['"]([^'"]+)['"]/);
      if (match) {
        const btnSrc = match[1];
        const btnFname = btnSrc.split('/').pop().split('?')[0];
        if (activeFname && (activeFname === btnFname || activeSrc.includes(btnSrc)) && isPlaying) {
          btn.innerHTML = pauseSvg;
          btn.classList.add('playing');
          btn.setAttribute('title', 'Pause narration (Space)');
        } else {
          btn.innerHTML = playSvg;
          btn.classList.remove('playing');
          btn.setAttribute('title', 'Play narration (Space)');
        }
      }
    }

    // For playQuestionAudio(this) or #playQuestionBtn
    if (onclickStr.includes('playQuestionAudio') || btn.id === 'playQuestionBtn') {
      const currentQ = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
      const matchesQ = activeTrack && activeTrack.type === 'question' && (
        activeTrack.qId === (currentQ && currentQ.id) ||
        findQuestionIdxById(activeTrack.qId) === currentQuestionIndex
      );
      if (matchesQ && isPlaying) {
        btn.innerHTML = pauseSvg;
        btn.classList.add('playing');
        btn.setAttribute('title', 'Pause question audio (Space)');
      } else {
        btn.innerHTML = playSvg;
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Play question audio (Space)');
      }
    }

    // For playSolutionAudioFromBtn(this) or #playSolBtn
    if (onclickStr.includes('playSolutionAudioFromBtn') || btn.id === 'playSolBtn') {
      const currentQ = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
      const matchesSol = activeTrack && activeTrack.type === 'solution' && (
        activeTrack.qId === (currentQ && currentQ.id) ||
        findQuestionIdxById(activeTrack.qId) === currentQuestionIndex
      );
      if (matchesSol && isPlaying) {
        btn.innerHTML = pauseSvg;
        btn.classList.add('playing');
        btn.setAttribute('title', 'Pause solution walkthrough (Space)');
      } else {
        btn.innerHTML = playSvg;
        btn.classList.remove('playing');
        btn.setAttribute('title', 'Play solution walkthrough (Space)');
      }
    }
  });
}

function toggleVolumePopover(event) {
  event.stopPropagation();
  const popover = document.getElementById('volumePopover');
  const volBtn = document.getElementById('volumeBtn');
  popover?.classList.toggle('open');
  volBtn?.classList.toggle('active');
}

function toggleSpeedPopover(event) {
  event.stopPropagation();
  const popover = document.getElementById('speedPopover');
  const speedBtn = document.getElementById('speedControlBtn');
  popover?.classList.toggle('open');
  speedBtn?.classList.toggle('active');
}

function setPlaybackVolume(val) {
  currentPlaybackVolume = parseFloat(val) / 100;
  isMuted = currentPlaybackVolume === 0;
  const label = document.getElementById('volumeValue');
  if (label) label.textContent = `${Math.round(val)}%`;
  if (currentPlayingAudio) currentPlayingAudio.volume = currentPlaybackVolume;
  // The master timeline keeps its own audio element; without this the volume
  // control is a no-op for the whole lesson.
  if (activeCombinedAudio) activeCombinedAudio.volume = currentPlaybackVolume;
}

function selectSpeedOption(rate, label) {
  currentPlaybackRate = rate;
  const speedLabel = document.getElementById('speedValueLabel');
  if (speedLabel) speedLabel.textContent = label;

  const options = document.querySelectorAll('.speed-option');
  options.forEach(opt => {
    opt.classList.toggle('active', opt.textContent.trim() === label);
  });

  const popover = document.getElementById('speedPopover');
  popover?.classList.remove('open');
  document.getElementById('speedControlBtn')?.classList.remove('active');

  if (currentPlayingAudio) currentPlayingAudio.playbackRate = rate;
  if (activeCombinedAudio) {
    activeCombinedAudio.playbackRate = rate;
    // Narration timings are authored at 1x, so the visual and typewriter layers
    // have to be re-derived from the audio's current position at the new rate.
    const track = combinedTracks[combinedTrackIndex];
    if (track && activeCombinedAudio.currentTime > 0) {
      if (track.type === 'solution' && track.qId) {
        const solMap = PYTHON_QUESTION_SOLUTIONS[currentDayId] || PYTHON_QUESTION_SOLUTIONS['pyDay01'];
        const solEntry = solMap && solMap[track.qId];
        if (solEntry) startAudioSyncedTypewriter(activeCombinedAudio, solEntry);
      } else if (track) {
        dispatchPythonTrackVisualHighlights(track, activeCombinedAudio.currentTime, true, true);
      }
    }
  }
}

// ── Practice Questions & CodeMirror Workbench ──────────────────

function initMainEditor() {
  const wrap = document.getElementById('mainEditorWrap');
  if (!wrap || mainEditor) return;

  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  mainEditor = CodeMirror(wrap, {
    value: '',
    mode: 'python',
    theme: isLight ? 'default' : 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    extraKeys: {
      Tab: cm => cm.execCommand('indentMore'),
      'Shift-Tab': cm => cm.execCommand('indentLess'),
      'Ctrl-Enter': () => runCurrentCode(),
      'Cmd-Enter': () => runCurrentCode(),
    },
    lineWrapping: true,
  });
  window.mainEditor = mainEditor;
}

function buildQPickerList() {
  const list = document.getElementById('qPickerList');
  if (!list || !currentDayData || !currentDayData.practiceQuestions) return;
  list.innerHTML = '';

  const headerEl = document.querySelector('#qPickerPopover .q-picker-header');
  let solvedCount = 0;
  const questions = currentDayData.practiceQuestions;

  // Retrieve saved solved questions from localStorage
  let solvedIds = [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { days: {} };
    if (data.days && data.days[currentDayId] && data.days[currentDayId].solved) {
      solvedIds = data.days[currentDayId].solved;
    }
  } catch (e) {}

  questions.forEach((q, idx) => {
    const isSolved = solvedIds.includes(q.id);
    if (isSolved) solvedCount++;
    const isActive = idx === currentQuestionIndex;

    // Extract clean title and badge from prompt
    let title = '';
    let badge = '';

    const strongMatch = (q.prompt || '').match(/<strong>(.*?)<\/strong>/i);
    if (strongMatch) {
      let rawTitle = strongMatch[1].replace(/<[^>]*>/g, '').trim();
      const tagMatch = rawTitle.match(/^\[(.*?)\]\s*(.*)$/);
      if (tagMatch) {
        badge = tagMatch[1];
        title = tagMatch[2];
      } else if (rawTitle.toLowerCase().startsWith('task:')) {
        title = rawTitle.substring(5).trim();
      } else {
        title = rawTitle;
      }
    }

    if (!title) {
      const clean = (q.prompt || '')
        .replace(/<\/(p|div|strong|h\d)>|<br\s*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      title = clean.length > 55 ? clean.substring(0, 52) + '…' : clean;
    }

    const qNum = String(q.id || idx + 1).padStart(2, '0');

    const btn = document.createElement('button');
    btn.className = 'q-picker-item' + (isActive ? ' q-picker-item--active active' : '');
    btn.setAttribute('role', 'option');
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    btn.setAttribute('data-idx', idx);
    btn.title = `Question ${qNum}: ${title}`;

    const esc = str => (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    btn.innerHTML = `
      <span class="q-picker-item-num">Q${qNum}</span>
      <div class="q-picker-item-main">
        <span class="q-picker-item-title">${esc(title)}</span>
        ${badge ? `<span class="q-picker-item-badge">${esc(badge)}</span>` : ''}
      </div>
      <span class="q-picker-item-status ${isSolved ? 'is-solved' : ''}">
        ${isSolved ? `<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="rgba(34, 197, 94, 0.2)" stroke="#16a34a" stroke-width="1.5"/>
          <path d="M5 8.2l2 2 4.2-4.2" stroke="#16a34a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>` : `<span class="q-picker-item-dot"></span>`}
      </span>
    `;
    btn.onclick = () => {
      selectQuestion(idx);
      closeQPicker();
    };
    list.appendChild(btn);
  });

  if (headerEl) {
    headerEl.innerHTML = `<span>Practice Questions (${questions.length})</span> <span class="q-picker-count-badge">${solvedCount}/${questions.length} Solved</span>`;
  }

  // Auto scroll active into view
  setTimeout(() => {
    const activeItem = list.querySelector('.q-picker-item--active, .q-picker-item.active');
    if (activeItem) activeItem.scrollIntoView({ block: 'nearest' });
  }, 10);
}

function openQPicker() {
  const popover = document.getElementById('qPickerPopover');
  const trigger = document.getElementById('qPickerTrigger');
  if (!popover) return;
  buildQPickerList();

  if (window.innerWidth <= 768 && trigger) {
    const rect = trigger.getBoundingClientRect();
    popover.style.position = 'fixed';
    popover.style.top = (rect.bottom + 6) + 'px';
    popover.style.left = '8px';
    popover.style.right = '8px';
    popover.style.width = 'auto';
    popover.style.maxWidth = 'calc(100vw - 16px)';
    popover.style.maxHeight = 'min(440px, 65vh)';
    popover.style.zIndex = '999999';
  } else {
    popover.style.position = '';
    popover.style.top = '';
    popover.style.left = '';
    popover.style.right = '';
    popover.style.width = '';
    popover.style.maxWidth = '';
    popover.style.maxHeight = '';
    popover.style.zIndex = '';
  }

  popover.style.display = 'flex';
  if (trigger) trigger.setAttribute('aria-expanded', 'true');
  setTimeout(() => {
    document.addEventListener('click', _qPickerOutsideClick, { once: true });
  }, 0);
}

function closeQPicker() {
  const popover = document.getElementById('qPickerPopover');
  const trigger = document.getElementById('qPickerTrigger');
  if (popover) {
    popover.style.display = 'none';
    if (window.innerWidth <= 768) {
      popover.style.position = '';
      popover.style.top = '';
      popover.style.left = '';
      popover.style.right = '';
      popover.style.width = '';
      popover.style.maxWidth = '';
      popover.style.maxHeight = '';
      popover.style.zIndex = '';
    }
  }
  if (trigger) trigger.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', _qPickerOutsideClick);
}

function _qPickerOutsideClick(e) {
  const wrapper = document.getElementById('qPickerWrapper');
  const popover = document.getElementById('qPickerPopover');
  if (
    (!wrapper || !wrapper.contains(e.target)) &&
    (!popover || !popover.contains(e.target))
  ) {
    closeQPicker();
  } else {
    if (popover && popover.style.display !== 'none') {
      document.addEventListener('click', _qPickerOutsideClick, { once: true });
    }
  }
}

function toggleQPicker(event) {
  if (event) event.stopPropagation();
  const popover = document.getElementById('qPickerPopover');
  if (popover && popover.style.display !== 'none') {
    closeQPicker();
  } else {
    openQPicker();
  }
}

function selectQuestion(idx) {
  currentQuestionIndex = idx;
  loadPracticeQuestion(idx);
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    selectQuestion(currentQuestionIndex - 1);
  }
}

function nextQuestion() {
  if (currentDayData && currentDayData.practiceQuestions && currentQuestionIndex < currentDayData.practiceQuestions.length - 1) {
    selectQuestion(currentQuestionIndex + 1);
  }
}

function loadPracticeQuestion(idx) {
  if (!currentDayData || !currentDayData.practiceQuestions || !currentDayData.practiceQuestions[idx]) return;
  const q = currentDayData.practiceQuestions[idx];

  // Keep the active index in step with the panel. The master timeline advances
  // the panel via this function, and grading, the picker highlight and the
  // audio buttons all read currentQuestionIndex — without this they would act
  // on whichever question was last clicked rather than the one on screen.
  currentQuestionIndex = idx;

  // Update prompt
  const promptEl = document.getElementById('questionPrompt');
  if (promptEl) promptEl.innerHTML = q.prompt;

  // Update counter
  const counter = document.getElementById('qCounter');
  if (counter) counter.textContent = `Question-${String(q.id).padStart(2, '0')}`;

  // Keep code cell completely blank initially (SQL Flagship standard)
  if (mainEditor) {
    mainEditor.setValue('');
    mainEditor.clearHistory();
  }

  // Update picker list active state
  const list = document.getElementById('qPickerList');
  if (list) {
    const items = list.querySelectorAll('.q-picker-item');
    items.forEach((it, i) => it.classList.toggle('active', i === idx));
  }

  // Clear output terminal
  clearOutput();
}

function peekSolution() {
  const q = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
  if (!q || !q.ref || !mainEditor) return;
  mainEditor.setValue(q.ref);
  if (q.explanation) {
    const output = document.getElementById('mainOutput');
    if (output) output.innerHTML = '<div class="output-label">Solution reasoning</div><p>' + q.explanation + '</p>';
  }
}

function resetCode() {
  if (mainEditor) {
    mainEditor.setValue('');
    mainEditor.clearHistory();
  }
  clearOutput();
}

function clearEditor() {
  if (mainEditor) {
    mainEditor.setValue('');
    mainEditor.clearHistory();
  }
}

function clearOutput() {
  const out = document.getElementById('mainOutput');
  if (out) {
    out.innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your Python code above and click "Run" to execute it!</span>';
  }
}

async function runCurrentCode(saveDraft = true) {
  if (!pyodideReady) {
    renderOutput({ stdout: '', stderr: '' }, document.getElementById('mainOutput'), false, 'Python engine still loading… please wait a moment.');
    return;
  }

  const q = currentDayData && currentDayData.practiceQuestions && currentDayData.practiceQuestions[currentQuestionIndex];
  if (!q) return;

  const code = mainEditor ? mainEditor.getValue() : '';
  const outDiv = document.getElementById('mainOutput');

  if (!code || code.trim() === '') {
    renderOutput({ stdout: '', stderr: '' }, outDiv, false, '⚠️ Please enter your Python code before running.');
    return;
  }

  // Save draft for user runs
  if (saveDraft) {
    saveQuestionCode(currentDayId, q.id, code);
  }

  // Execute in Pyodide
  const start = performance.now();
  const out = await executePython(code, q);
  const duration = Math.round(performance.now() - start);

  // Grade submission if grader available
  let passed = false;
  let gradeMsg = '';
  if (typeof window.pyGradeSubmission === 'function') {
    const grade = await window.pyGradeSubmission(code, q, pyodide, out);
    passed = grade.passed;
    gradeMsg = grade.message;
  } else {
    // Fallback: check no error
    passed = !out.error;
    gradeMsg = passed ? '✅ Code executed successfully.' : '⚠️ Execution encountered an error.';
  }

  // Render output
  renderOutput(out, outDiv, passed, gradeMsg, duration);

  if (passed) {
    markQuestionSolved(currentDayId, q.id);
    updateStatsCard();
    updateOverallScoreUI();
  }
}

async function executePython(code, question = null) {
  if (!pyodide) return { stdout: '', stderr: 'Python runtime is not loaded yet. Please wait a moment.', error: true };
  if (!code || code.trim() === '') {
    return { stdout: '', stderr: 'Editor is empty. Write your Python code above and click Run.', error: true };
  }

  let stdout = '';
  let stderr = '';
  let error = false;

  try {
    // Independent assessments cannot reuse a previous submission's outputs.
    if (question?.validation?.freshResults) {
      for (const { name } of question.validation.checkVars || []) {
        if (pyodide.globals.has(name)) pyodide.globals.delete(name);
      }
    }
    const runner = pyodide.globals.get('__run_student_code_fast__');
    if (runner) {
      const res = runner(code);
      stdout = String(res.get(0) || '');
      stderr = String(res.get(1) || '');
      res.destroy?.();
    } else {
      pyodide.globals.set('__student_code__', code);
      await pyodide.runPythonAsync(`
import sys, io as _io, ast as _ast, traceback as _traceback
_buf_stdout, _buf_stderr = _io.StringIO(), _io.StringIO()
_old_out, _old_err = sys.stdout, sys.stderr
sys.stdout, sys.stderr = _buf_stdout, _buf_stderr
try:
    exec(compile(__student_code__, '<student_code>', 'exec'), globals())
except Exception:
    _traceback.print_exc(file=_buf_stderr)
finally:
    sys.stdout, sys.stderr = _old_out, _old_err
`);
      stdout = String(await pyodide.runPythonAsync(`_buf_stdout.getvalue()`));
      stderr = String(await pyodide.runPythonAsync(`_buf_stderr.getvalue()`));
    }
    if (stderr.trim()) {
      error = true;
    }
  } catch (err) {
    stderr = err.message || String(err);
    error = true;
  }

  return { stdout, stderr, error };
}

function renderOutput(out, container, passed, gradeMsg, duration) {
  if (!container) return;
  const execTimeBadge = duration ? `<span class="exec-badge" style="float:right;font-size:0.75rem;color:var(--cyan);background:rgba(0,230,246,0.1);padding:2px 8px;border-radius:4px;">⚡ ${duration}ms</span>` : '';

  let html = `<div class="output-label">Terminal Output ${execTimeBadge}</div>`;

  const hasStdout = Boolean(out && out.stdout && out.stdout.trim() !== '');
  const hasStderr = Boolean(out && out.stderr && out.stderr.trim() !== '');

  // 1. Terminal Console STDOUT (Displayed FIRST so student sees their printed output immediately)
  if (hasStdout) {
    html += `<pre class="output-stdout" style="margin:6px 0 10px 0;font-family:var(--mono, 'JetBrains Mono', monospace);font-size:0.88rem;color:var(--terminal-text, inherit);white-space:pre-wrap;line-height:1.55;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px 12px;word-break:break-word;">${escHtml(out.stdout.trimEnd())}</pre>`;
  }

  // 2. Terminal Console STDERR (Displayed if runtime or syntax error)
  if (hasStderr) {
    html += `<pre class="output-stderr" style="margin:6px 0 10px 0;font-family:var(--mono, 'JetBrains Mono', monospace);font-size:0.85rem;color:#f87171;white-space:pre-wrap;line-height:1.5;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:6px;padding:8px 12px;word-break:break-word;">${escHtml(out.stderr.trimEnd())}</pre>`;
  }

  // 3. Grader Evaluation Status Banner (Displayed below program output)
  if (gradeMsg) {
    const bannerColor = passed ? '#16a34a' : '#dc2626';
    const bannerBorder = passed ? '#22c55e' : '#ef4444';
    const bannerBg = passed ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)';
    html += `<div class="terminal-grade-banner" style="background:${bannerBg};border-left:4px solid ${bannerBorder};padding:8px 12px;border-radius:6px;margin-bottom:6px;font-size:0.85rem;color:${bannerColor};font-weight:600;white-space:pre-wrap;line-height:1.45;">${gradeMsg}</div>`;
  }

  // 4. Default prompt if no output, no errors, and no grade message
  if (!hasStdout && !hasStderr && !gradeMsg) {
    html += `<span class="output-success">⚡ Write your Python code above and click "Run" to execute it!</span>`;
  }

  container.innerHTML = html;
}

function escHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Mobile Syntax Chips ────────────────────────────────────────

function insertPythonSnippet(snippet) {
  if (!mainEditor) return;
  const doc = mainEditor.getDoc();
  const cursor = doc.getCursor();
  doc.replaceRange(snippet, cursor);
  mainEditor.focus();
}
window.insertPythonSnippet = insertPythonSnippet;

// ── Timed Test Portal (25 Questions) ───────────────────────────

function openTestPortal() {
  const overlay = document.getElementById('testOverlay');
  if (!overlay || !currentDayData || !currentDayData.testQuestions) return;

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Build sidebar with 25 questions
  buildTestSidebar();

  // Load question 0
  currentTestQuestionIndex = 0;
  loadTestQuestion(0);

  // Start countdown timer
  startTestTimer();
}

function closeTestPortal() {
  const overlay = document.getElementById('testOverlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
  if (testTimerInterval) {
    clearInterval(testTimerInterval);
    testTimerInterval = null;
  }
}

function buildTestSidebar() {
  const sidebar = document.getElementById('testSidebar');
  if (!sidebar || !currentDayData || !currentDayData.testQuestions) return;
  sidebar.innerHTML = '';

  currentDayData.testQuestions.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = 'test-q-btn' + (idx === currentTestQuestionIndex ? ' active' : '');
    btn.textContent = `Q${q.id}`;
    btn.onclick = () => loadTestQuestion(idx);
    sidebar.appendChild(btn);
  });
}

function loadTestQuestion(idx) {
  if (!currentDayData || !currentDayData.testQuestions || !currentDayData.testQuestions[idx]) return;
  currentTestQuestionIndex = idx;
  const q = currentDayData.testQuestions[idx];

  // Update prompt
  const promptEl = document.getElementById('testQuestionPrompt');
  if (promptEl) promptEl.innerHTML = `<strong>Question ${q.id}:</strong> ${q.prompt}`;

  // Update counter
  const qCounter = document.getElementById('testQCounter');
  if (qCounter) qCounter.textContent = `Q${q.id} / ${currentDayData.testQuestions.length}`;

  // CodeMirror instance for test
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const saved = testAnswers[q.id];
  const initialCode = saved ? saved.code : '';

  if (!testEditor) {
    const wrap = document.getElementById('testEditorWrap');
    if (wrap) {
      testEditor = CodeMirror(wrap, {
        value: initialCode,
        mode: 'python',
        theme: isLight ? 'default' : 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: true,
      });
    }
  } else {
    testEditor.setValue(initialCode);
    testEditor.clearHistory();
  }
  window.testEditor = testEditor;

  // Update sidebar active buttons
  const sidebar = document.getElementById('testSidebar');
  if (sidebar) {
    const btns = sidebar.querySelectorAll('.test-q-btn');
    btns.forEach((b, i) => b.classList.toggle('active', i === idx));
    if (currentDayData.designVersion) btns[idx]?.scrollIntoView({ block: 'nearest' });
  }

  // Clear test output
  const testOut = document.getElementById('testOutput');
  if (testOut) testOut.innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">Ready...</span>';
}

async function runTestCode() {
  if (!pyodideReady || !currentDayData || !currentDayData.testQuestions) return;
  const q = currentDayData.testQuestions[currentTestQuestionIndex];
  if (!q) return;

  const code = testEditor ? testEditor.getValue() : '';
  const testOut = document.getElementById('testOutput');

  const start = performance.now();
  const out = await executePython(code, q);
  const duration = Math.round(performance.now() - start);

  let passed = false;
  let gradeMsg = '';
  if (typeof window.pyGradeSubmission === 'function') {
    const grade = await window.pyGradeSubmission(code, q, pyodide, out);
    passed = grade.passed;
    gradeMsg = grade.message;
  } else {
    passed = !out.error;
    gradeMsg = passed ? '✅ Valid submission.' : '⚠️ Error in code.';
  }

  testAnswers[q.id] = { code, passed, message: gradeMsg, stdout: out.stdout };

  renderOutput(out, testOut, passed, gradeMsg, duration);

  // Update sidebar button style
  const sidebar = document.getElementById('testSidebar');
  if (sidebar) {
    const btn = sidebar.querySelectorAll('.test-q-btn')[currentTestQuestionIndex];
    if (btn) {
      btn.classList.add(passed ? 'answered-correct' : 'answered');
    }
  }

  updateTestProgress();
}

function clearTestEditor() {
  if (testEditor) {
    testEditor.setValue('');
    testEditor.clearHistory();
  }
}

function updateTestProgress() {
  const attempted = Object.keys(testAnswers).length;
  const total = currentDayData && currentDayData.testQuestions ? currentDayData.testQuestions.length : 25;
  const el = document.getElementById('testProgress');
  if (el) el.textContent = `Attempted: ${attempted} / ${total}`;

  const attemptedCountEl = document.getElementById('testAttemptedCount');
  if (attemptedCountEl) attemptedCountEl.textContent = attempted;

  const fill = document.getElementById('testProgressFill');
  if (fill) fill.style.width = `${Math.round((attempted / total) * 100)}%`;
}

function submitTest() {
  if (!currentDayData || !currentDayData.testQuestions) return;
  const qs = currentDayData.testQuestions;
  let passedCount = 0;

  const tbody = document.getElementById('scorecardBody');
  if (tbody) tbody.innerHTML = '';

  qs.forEach(q => {
    const ans = testAnswers[q.id];
    const isPass = ans && ans.passed;
    if (isPass) passedCount++;

    if (tbody) {
      const tr = document.createElement('tr');
      const badge = isPass
        ? `<span class="badge badge-success" style="color:#22c55e;font-weight:700;">PASSED</span>`
        : `<span class="badge badge-fail" style="color:#ef4444;font-weight:700;">FAILED</span>`;
      tr.innerHTML = `<td>Q${q.id}</td><td>${badge}</td><td><code style="font-family:var(--font-mono);font-size:0.8rem;">${escHtml((ans ? ans.code : '').substring(0, 45))}…</code></td>`;
      tbody.appendChild(tr);
    }
  });

  const bigScore = document.getElementById('scoreBig');
  if (bigScore) bigScore.textContent = `${passedCount} / ${qs.length}`;

  const meta = document.getElementById('scoreMeta');
  const elapsedMins = Math.floor((7200 - testSecondsLeft) / 60);
  const elapsedSecs = (7200 - testSecondsLeft) % 60;
  if (meta) meta.textContent = `Time spent: ${String(elapsedMins).padStart(2,'0')}:${String(elapsedSecs).padStart(2,'0')} • Accuracy: ${Math.round((passedCount / qs.length) * 100)}%`;

  // Persist test best score
  saveTestScore(currentDayId, passedCount);
  updateOverallScoreUI();

  // Show scorecard modal
  const scorecard = document.getElementById('scorecardOverlay');
  if (scorecard) scorecard.style.display = 'flex';
}

function closeScorecard() {
  const scorecard = document.getElementById('scorecardOverlay');
  if (scorecard) scorecard.style.display = 'none';
  closeTestPortal();
}

function startTestTimer() {
  testSecondsLeft = 7200; // 2 hours
  if (testTimerInterval) clearInterval(testTimerInterval);

  testTimerInterval = setInterval(() => {
    if (testSecondsLeft > 0) {
      testSecondsLeft--;
      const m = Math.floor(testSecondsLeft / 60);
      const s = testSecondsLeft % 60;
      const el = document.getElementById('testTimer');
      if (el) el.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    } else {
      clearInterval(testTimerInterval);
      testTimerInterval = null;
      submitTest();
    }
  }, 1000);
}

// ── Progress & Persistence ─────────────────────────────────────

function markQuestionSolved(dayId, qId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { days: {} };
    if (!data.days[dayId]) data.days[dayId] = { solved: [], marks: 0, bestScore: 0 };
    if (!data.days[dayId].solved.includes(qId)) {
      data.days[dayId].solved.push(qId);
      data.days[dayId].marks = data.days[dayId].solved.length;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function saveQuestionCode(dayId, qId, code) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { days: {} };
    if (!data.days[dayId]) data.days[dayId] = { solved: [], codes: {} };
    if (!data.days[dayId].codes) data.days[dayId].codes = {};
    data.days[dayId].codes[qId] = code;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function getSavedQuestionCode(dayId, qId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.days && data.days[dayId] && data.days[dayId].codes ? data.days[dayId].codes[qId] : null;
  } catch (e) {
    return null;
  }
}

function saveTestScore(dayId, score) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { days: {} };
    if (!data.days[dayId]) data.days[dayId] = { solved: [], marks: 0, bestScore: 0 };
    data.days[dayId].bestScore = Math.max(data.days[dayId].bestScore || 0, score);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function updateStatsCard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : { days: {} };
    const dayData = (data.days && data.days[currentDayId]) || { solved: [], marks: 0 };

    const totalQ = currentDayData && currentDayData.practiceQuestions ? currentDayData.practiceQuestions.length : 15;
    const solvedNum = dayData.solved.length;
    const marksNum = dayData.solved.length;

    const solvedEl = document.getElementById('solvedCount');
    if (solvedEl) solvedEl.textContent = solvedNum;
    const totalQEl = document.getElementById('totalQuestions');
    if (totalQEl) totalQEl.textContent = totalQ;

    const marksEl = document.getElementById('marksCount');
    if (marksEl) marksEl.textContent = marksNum.toFixed(1);
    const totalMarksEl = document.getElementById('totalMarks');
    if (totalMarksEl) totalMarksEl.textContent = Number(totalQ).toFixed(1);

    const fill = document.getElementById('statsProgressFill');
    if (fill) fill.style.width = `${Math.min(100, Math.round((solvedNum / totalQ) * 100))}%`;
  } catch (e) {}
}

// ── Resizable Split Divider ───────────────────────────────────

function initDivider() {
  const divider = document.getElementById('divider');
  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  const container = document.getElementById('workspaceContainer');
  if (!divider || !panelLeft || !panelRight || !container) return;

  let isDragging = false;

  divider.addEventListener('mousedown', e => {
    if (e.target.closest('.divider-toggles')) return;
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width;
    const leftWidth = Math.max(280, Math.min(totalWidth - 320, x));
    const rightWidth = totalWidth - leftWidth - 6;

    panelLeft.style.flex = `0 0 ${leftWidth}px`;
    panelRight.style.flex = `0 0 ${rightWidth}px`;
    if (mainEditor) mainEditor.refresh();
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (mainEditor) mainEditor.refresh();
    }
  });
}

function toggleLeftPanel(e) {
  if (e) e.stopPropagation();
  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  if (!panelLeft || !panelRight) return;
  panelLeft.style.flex = '0 0 0px';
  panelRight.style.flex = '1 1 auto';
  panelLeft.style.display = 'none';
  if (mainEditor) mainEditor.refresh();
}

function toggleRightPanel(e) {
  if (e) e.stopPropagation();
  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  if (!panelLeft || !panelRight) return;
  panelRight.style.flex = '0 0 0px';
  panelLeft.style.flex = '1 1 auto';
  panelRight.style.display = 'none';
  if (mainEditor) mainEditor.refresh();
}

function resetSplitScreen(e) {
  if (e) e.stopPropagation();
  const panelLeft = document.getElementById('panelLeft');
  const panelRight = document.getElementById('panelRight');
  if (!panelLeft || !panelRight) return;
  panelLeft.style.display = 'flex';
  panelRight.style.display = 'flex';
  panelLeft.style.flex = '1 1 50%';
  panelRight.style.flex = '1 1 50%';
  if (mainEditor) mainEditor.refresh();
}

function setMobileTab(tab) {
  const container = document.getElementById('workspaceContainer');
  const btnPractice = document.getElementById('tabBtnPractice');
  const btnTheory = document.getElementById('tabBtnTheory');
  if (!container) return;

  if (tab === 'practice') {
    container.classList.remove('mobile-show-theory');
    container.classList.add('mobile-show-practice');
    btnPractice?.classList.add('active');
    btnTheory?.classList.remove('active');
  } else {
    container.classList.remove('mobile-show-practice');
    container.classList.add('mobile-show-theory');
    btnTheory?.classList.add('active');
    btnPractice?.classList.remove('active');
  }
}

// Compatibility no-ops for legacy slide nav
function prevSlide() {}
function nextSlide() {}

// ── Export globals ─────────────────────────────────────────────
window.init = init;
window.loadDay = loadDay;
window.renderSlide = renderSlide;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.toggleChapterList = toggleChapterList;
window.onTopicSelectChange = onTopicSelectChange;
window.toggleCombinedPlayback = toggleCombinedPlayback;
window.seekCombinedPlayback = seekCombinedPlayback;
window.skipCombined = skipCombined;
window.setPlaybackVolume = setPlaybackVolume;
window.toggleVolumePopover = toggleVolumePopover;
window.toggleSpeedPopover = toggleSpeedPopover;
window.selectSpeedOption = selectSpeedOption;
window.playAudio = playAudio;
window.playQuestionAudio = playQuestionAudio;
window.playSolutionAudioFromBtn = playSolutionAudioFromBtn;
window.prevQuestion = prevQuestion;
window.nextQuestion = nextQuestion;
window.selectQuestion = selectQuestion;
window.toggleQPicker = toggleQPicker;
window.peekSolution = peekSolution;
window.resetCode = resetCode;
window.clearEditor = clearEditor;
window.runCurrentCode = runCurrentCode;
window.openTestPortal = openTestPortal;
window.closeTestPortal = closeTestPortal;
window.loadTestQuestion = loadTestQuestion;
window.runTestCode = runTestCode;
window.clearTestEditor = clearTestEditor;
window.submitTest = submitTest;
window.closeScorecard = closeScorecard;
window.toggleLeftPanel = toggleLeftPanel;
window.toggleRightPanel = toggleRightPanel;
window.resetSplitScreen = resetSplitScreen;
window.setMobileTab = setMobileTab;
window.setupTimelineDragging = setupTimelineDragging;

// Start on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ── Mobile Theme Toggle Relocation ──
function initMobileThemeToggle() {
  const mql = window.matchMedia('(max-width: 768px)');
  function relocateToggle(e) {
    const btn = document.getElementById('themeToggleBtn');
    const dayNav = document.querySelector('.day-navigation');
    const headerRight = document.querySelector('.header-right');
    const topicPill = document.querySelector('.topic-picker-pill');
    if (!btn || !dayNav || !headerRight) return;

    if (e.matches) {
      dayNav.appendChild(btn);
    } else {
      if (headerRight.firstChild !== btn) {
        headerRight.insertBefore(btn, headerRight.firstChild);
      }
    }
  }
  mql.addEventListener('change', relocateToggle);
  relocateToggle(mql);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMobileThemeToggle);
} else {
  initMobileThemeToggle();
}

// ── OTT Media Player Global Keyboard Shortcuts (Space / K / J / L / Arrows / [ / ] / C) ──
document.addEventListener('keydown', (e) => {
  const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || (document.activeElement && document.activeElement.isContentEditable)) {
    return;
  }
  if (document.activeElement && document.activeElement.closest && document.activeElement.closest('.monaco-editor, .CodeMirror, #editor')) {
    return;
  }

  if (e.code === 'Space' || e.code === 'KeyK') {
    e.preventDefault();
    toggleCombinedPlayback();
  } else if (e.code === 'ArrowLeft' || e.code === 'KeyJ') {
    e.preventDefault();
    const target = Math.max(0, currentCombinedTime - 5);
    seekCombinedPlayback(target, isCombinedPlaying);
  } else if (e.code === 'ArrowRight' || e.code === 'KeyL') {
    e.preventDefault();
    const target = Math.min(totalCombinedDuration, currentCombinedTime + 5);
    seekCombinedPlayback(target, isCombinedPlaying);
  } else if (e.key === '[' || e.code === 'BracketLeft') {
    e.preventDefault();
    skipCombined(-10);
  } else if (e.key === ']' || e.code === 'BracketRight') {
    e.preventDefault();
    skipCombined(10);
  } else if (e.key === 'c' || e.key === 'C') {
    e.preventDefault();
    const captionBox = document.getElementById('workspaceVpCaption');
    if (captionBox) {
      captionBox.style.display = captionBox.style.display === 'none' ? 'block' : 'none';
    }
  }
});

// Auto-pause when browser tab is hidden (100% SQL Day 02 parity)
document.addEventListener('visibilitychange', () => {
  if (document.hidden && isCombinedPlaying) {
    pauseCombinedPlayback();
  }
});

// ═══════════════════════════════════════════════════════════════
// 🧭 PREV / NEXT DAY ARROW NAVIGATION ENGINE (Python Track)
// ═══════════════════════════════════════════════════════════════

function getAdjacentPythonDayInfo() {
  const path = window.location.pathname;
  const match = path.match(/day(\d+)/i);
  let currentNum = match 
    ? parseInt(match[1], 10) 
    : (typeof COURSE_DAY !== 'undefined' ? parseInt(String(COURSE_DAY).replace(/\D/g, ''), 10) || 1 : 1);
  
  const prevNum = currentNum - 1;
  const nextNum = currentNum + 1;
  
  const manifestMax = (typeof window !== 'undefined' && Array.isArray(window.COURSE_MANIFEST) && window.COURSE_MANIFEST.length > 0)
    ? window.COURSE_MANIFEST.length
    : (typeof window !== 'undefined' && Array.isArray(window.COURSE_MANIFEST_60)
        ? window.COURSE_MANIFEST_60.filter(d => d.track === 'python' && !d.comingSoon).length
        : 27);
  const maxDay = Math.max(27, manifestMax);
  
  const prevUrl = prevNum >= 1 ? `/python/day${String(prevNum).padStart(2, '0')}.html` : null;
  const nextUrl = nextNum <= maxDay ? `/python/day${String(nextNum).padStart(2, '0')}.html` : null;
  
  return { prevUrl, nextUrl, prevNum, nextNum, currentNum, maxDay };
}

function updateDayNavArrows() {
  const { prevUrl, nextUrl, prevNum, nextNum } = getAdjacentPythonDayInfo();
  const prevBtn = document.getElementById('prevDayBtn');
  const nextBtn = document.getElementById('nextDayBtn');
  
  if (prevBtn) {
    if (prevUrl) {
      prevBtn.disabled = false;
      prevBtn.classList.remove('disabled');
      prevBtn.title = `Previous Day (Day ${String(prevNum).padStart(2, '0')})`;
      prevBtn.setAttribute('aria-label', `Previous Day (Day ${String(prevNum).padStart(2, '0')})`);
    } else {
      prevBtn.disabled = true;
      prevBtn.classList.add('disabled');
      prevBtn.title = 'You are on the first day';
      prevBtn.setAttribute('aria-label', 'First day reached');
    }
  }
  
  if (nextBtn) {
    if (nextUrl) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('disabled');
      nextBtn.title = `Next Day (Day ${String(nextNum).padStart(2, '0')})`;
      nextBtn.setAttribute('aria-label', `Next Day (Day ${String(nextNum).padStart(2, '0')})`);
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.add('disabled');
      nextBtn.title = 'You are on the last available day';
      nextBtn.setAttribute('aria-label', 'Last day reached');
    }
  }
}
window.updateDayNavArrows = updateDayNavArrows;

function navigateToPrevDay() {
  const { prevUrl } = getAdjacentPythonDayInfo();
  if (prevUrl) window.location.href = prevUrl;
}
window.navigateToPrevDay = navigateToPrevDay;

function navigateToNextDay() {
  const { nextUrl } = getAdjacentPythonDayInfo();
  if (nextUrl) window.location.href = nextUrl;
}
window.navigateToNextDay = navigateToNextDay;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateDayNavArrows, 50);
  });
} else {
  setTimeout(updateDayNavArrows, 50);
}


// ── Mobile Header Info Bars Toggle (Zen / Focus Mode) ────────────────
function toggleMobileHeader(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  const header = document.querySelector('.header');
  const toggleBtn = document.getElementById('mobileHdrToggleBtn');
  if (!header) return;

  const isCollapsed = header.classList.toggle('is-collapsed');
  if (toggleBtn) {
    toggleBtn.classList.toggle('is-collapsed', isCollapsed);
    const label = toggleBtn.querySelector('.hdr-toggle-label');
    if (label) {
      label.textContent = isCollapsed ? 'Show Info' : 'Hide Info';
    }
    const icon = toggleBtn.querySelector('.hdr-toggle-icon');
    if (icon) {
      icon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    }
    toggleBtn.setAttribute('title', isCollapsed ? 'Show top header info bars' : 'Hide top header info bars');
    toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
  }
  try {
    sessionStorage.setItem('manodemy-header-collapsed', isCollapsed ? 'true' : 'false');
  } catch (err) {}
}
window.toggleMobileHeader = toggleMobileHeader;

function initMobileHeaderToggle() {
  const tabsNav = document.getElementById('mobileTabsNav');
  if (!tabsNav) return;

  // Wrap existing buttons into .mobile-tabs-group if not already wrapped
  if (!tabsNav.querySelector('.mobile-tabs-group')) {
    const existingBtns = Array.from(tabsNav.querySelectorAll('.mobile-tab-btn'));
    if (existingBtns.length > 0) {
      const group = document.createElement('div');
      group.className = 'mobile-tabs-group';
      existingBtns.forEach(btn => group.appendChild(btn));
      tabsNav.prepend(group);
    }
  }

  // Ensure the toggle button exists
  if (!document.getElementById('mobileHdrToggleBtn')) {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'mobile-hdr-toggle-btn';
    toggleBtn.id = 'mobileHdrToggleBtn';
    toggleBtn.setAttribute('aria-label', 'Toggle top header info bars');
    toggleBtn.setAttribute('title', 'Hide top header info bars');
    toggleBtn.onclick = toggleMobileHeader;
    toggleBtn.innerHTML = '<span class="hdr-toggle-icon"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></span><span class="hdr-toggle-label">Hide Info</span>';
    tabsNav.appendChild(toggleBtn);
  }

  // Restore saved state if any
  try {
    if (sessionStorage.getItem('manodemy-header-collapsed') === 'true') {
      const header = document.querySelector('.header');
      const toggleBtn = document.getElementById('mobileHdrToggleBtn');
      if (header) header.classList.add('is-collapsed');
      if (toggleBtn) {
        toggleBtn.classList.add('is-collapsed');
        const label = toggleBtn.querySelector('.hdr-toggle-label');
        if (label) label.textContent = 'Show Info';
        const icon = toggleBtn.querySelector('.hdr-toggle-icon');
        if (icon) icon.style.transform = 'rotate(180deg)';
        toggleBtn.setAttribute('title', 'Show top header info bars');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  } catch (err) {}
}
window.initMobileHeaderToggle = initMobileHeaderToggle;

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initMobileHeaderToggle, 50);
});
