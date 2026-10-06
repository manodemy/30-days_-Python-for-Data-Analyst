---
name: practice-question-audio-sync
description: Standard operating procedure for adding practice question audio, extracting Whisper ASR word-level timestamps, syncing code typewriter animation with solution narration, handling query execution & table scrolling, registering tracks for seamless timeline continuation, maintaining 100% UI & question card sync during timeline scrubbing/seeking/pausing, and formatting multi-column SQL queries in structured multi-line layout for maximum readability. Trigger whenever the user provides practice question audio files (e.g. New_DayXQuestionYY.mp3 and New_DayXQuestionYYsol.mp3).
---

# Practice Question Audio & Solution Typewriter Sync Guide

This skill defines the step-by-step workflow for integrating practice question narration and solution typewriter audio sync into the Scrimba learning engine.

---

## 🎨 SQL Code Formatting & Multi-line Layout Standard

When typing complex queries with multiple columns, expressions, or aliases, **do NOT place all columns on a single long line**. Format the SQL code multi-line with 7-space column alignment under `SELECT` so each column types out clearly on its own line:

### Comparison Reference:

#### ❌ Avoid: Single-line column clutter
![Single line SQL layout](file:///C:/Users/deepa/.gemini/antigravity-ide/brain/a7289ed4-3046-4d0f-818a-5733f70e6ba3/sql_single_line_unformatted.png)

#### ✅ Preferred: Clean Multi-line Indented Layout
![Multi line formatted SQL layout](file:///C:/Users/deepa/.gemini/antigravity-ide/brain/a7289ed4-3046-4d0f-818a-5733f70e6ba3/sql_multiline_formatted.png)

```sql
SELECT name,
       unit_price,
       cost_price,
       unit_price - cost_price AS profit
FROM   products
ORDER BY profit DESC;
```

---

## UI/UX & Timeline Sync Architecture Rules

1. **Question Card & Audio Synchronization**:
   - When any `question` or `solution` track is played or seeked to, `currentPracticeQ` MUST immediately update to match `track.qId`, `renderPracticeQuestion()` and `updatePracticeStats()` MUST be invoked, and the practice panel MUST be switched into view so the UI question card ALWAYS matches the active audio narration.
   - Question bar highlight (`question-playing` class) MUST activate for question & solution tracks and deactivate for theory tracks.

2. **Scrubbing & Seeking Fast-Forward Handling**:
   - `startAudioSyncedTypewriter(audioObj, solEntry)` handles arbitrary seeking:
     - When seeking into the middle of a solution track, the engine calculates all character events up to `audioObj.currentTime` and instantly sets `mainEditor.setValue(typedTextSoFar)`.
     - If seeked past typing, `runCurrentQuery()` is executed and the output table is brought into view.
     - The `requestAnimationFrame` loop resumes smoothly from the new timestamp.

3. **Pause & Resume State Preservation**:
   - Pausing the lesson (`pauseCombinedPlayback()`) immediately calls `cancelTypewriter()`, halting RAF loops and table scroll intervals.
   - Resuming (`playCombinedPlayback()`) restarts `startAudioSyncedTypewriter(audioObj, solEntry)` from the paused `audio.currentTime`.

4. **Unified Master Timeline & Single-Play Linkage (`playbackMode`)**:
   - Audio playback supports two unified modes managed by `playbackMode = 'master' | 'single'`:
     - **Master Mode (`'master'`)**: Initiated from the top "Play Lesson" button. When track $N$ finishes, `onNarrationSegmentEnded` automatically advances to track $N+1$.
     - **Single Mode (`'single'`)**: Initiated when the user clicks an individual inline card audio, Question Audio button (`#questionAudioBtn`), or Solution Audio button (`#solutionAudioBtn`). The master timeline seek bar immediately updates to the exact track start offset (`elapsedBefore`), plays that track with full typewriter sync, and upon track completion, pauses cleanly without advancing to subsequent tracks.
   - **Two-Way Button State Sync**: `updateAllPlayButtonStates(isPlaying, activeBtn)` keeps the master timeline play icon and active snippet button in perfect unison.

---

## Standard Workflow

### Step 1: Run the Automated Narration & Typing Syncing Inspector
Instead of manual timestamp calculation, run the built-in **Narration & Typing Syncing Inspector** to automatically transcribe the solution audio, extract word-level Whisper ASR timestamps, align multi-line SQL clauses to spoken keywords, and generate the production `segments` object:

```bash
# Inspect a single question solution audio:
python scripts/inspect_solution_sync.py --audio "public/Version-3/Day05/New_Day5Question01sol.mp3" --code "SELECT SUM(salary) AS total_payroll, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees;" --q 1

# Or inspect all practice questions for a day:
python scripts/inspect_solution_sync.py --day 5
```

The inspector generates structured multi-line SQL formatting with 7-space column alignment, aligns keyword timestamps, and outputs the exact JavaScript configuration ready for `questionSolutionMap`.

---

### Step 2: Extract Word-Level Timestamps with Whisper ASR (Manual / Verification)

### Step 3: Map Spoken Words to Structured Code Segments
Match the spoken words from the Whisper output to the multi-line SQL code lines:

1. **Group adjacent keywords spoken rapidly** into a single segment to avoid overlapping sub-second timestamps in `requestAnimationFrame` (e.g., merge `SELECT ` and `DISTINCT ` into `"SELECT DISTINCT "` if spoken within 50ms of each other).
2. **Include newlines (`\n`) and 7-space column indents** in the segment `text` so the editor auto-formats line-by-line as the narrator mentions each column.
3. **Calculate `charInterval`** (in ms) per segment so typing finishes smoothly right as the spoken phrase ends:
   $$\text{charInterval} = \frac{(\text{Speech End Timestamp} - \text{Speech Start Timestamp}) \times 1000}{\text{Length of Segment String}}$$
4. **Determine `scrollAt`**: Set `scrollAt` (in seconds) to the timestamp when the narrator mentions *"run button"*, *"execute"*, or *"output"*, so query execution (`runCurrentQuery()`) and table smooth scrolling occur in sync with speech.

---

### Step 4: Register in `scrimba-engine.js`

#### A. Question Audio Map
In `questionAudioMap['dayXX']`, map question ID to relative MP3 path:
```javascript
'day02': {
  6: 'Day02/New_Day2Question06.mp3'
}
```

#### B. Question Solution Map
In `questionSolutionMap['dayXX']`, add solution entry with `src`, structured multi-line `code`, `segments`, and `scrollAt`:
```javascript
6: {
  src: 'Day02/New_Day2Question06sol.mp3',
  code: 'SELECT name,\n       unit_price,\n       cost_price,\n       unit_price - cost_price AS profit\nFROM   products\nORDER BY profit DESC;',
  segments: [
    { text: "SELECT name,\n",              startAt: 3.40,  charInterval: 45 },
    { text: "       unit_price,\n",        startAt: 4.44,  charInterval: 45 },
    { text: "       cost_price,\n",        startAt: 5.32,  charInterval: 45 },
    { text: "       unit_price - cost_price ", startAt: 10.78, charInterval: 40 },
    { text: "AS profit\n",                 startAt: 14.36, charInterval: 45 },
    { text: "FROM   products\n",           startAt: 17.58, charInterval: 45 },
    { text: "ORDER BY profit DESC;",       startAt: 22.56, charInterval: 40 }
  ],
  scrollAt: 23.9
}
```

#### C. Timeline Track & Duration Registration
Add durations (in seconds) to `dayXXDurations` and track objects to `dayXXTracks`:
```javascript
const day02Durations = [..., 19.5, 24.1]; // Question duration, Solution duration

const day02Tracks = [
  ...,
  { src: 'Day02/New_Day2Question06.mp3',    target: '#questionBar', title: 'Q6: Profit Margin Column', type: 'question', qId: 6 },
  { src: 'Day02/New_Day2Question06sol.mp3', target: '#questionBar', title: 'Q6 Solution: Profit Margin Column', type: 'solution', qId: 6 }
];
```

---

### Step 5: Update Manifest & Slide Content

1. **`public/Version-3/manifest.json`**: Add `durationMs` entries:
   ```json
   "day02_New_Day2Question06": {
     "audioPath": "Day02/New_Day2Question06.mp3",
     "eventsPath": null,
     "durationMs": 19461
   },
   "day02_New_Day2Question06sol": {
     "audioPath": "Day02/New_Day2Question06sol.mp3",
     "eventsPath": null,
     "durationMs": 24059
   }
   ```

2. **`public/Version-3/content/day-XX.js`**: Update total slide duration string (`"duration": "MM:SS"`) by adding the new question and solution audio lengths.

---

### Step 6: Verify Build
Run `npm run build` to ensure Next.js production compilation passes cleanly without errors.

---

## Section 7: Completion / Celebration Audio — 3D Three.js Narration Companion

When a day's final "completion" audio plays, a Three.js 3D animation companion syncs unique 3D objects to spoken keywords, followed by a persistent **Take Test** button blink until the learner submits and receives a score.

### Track Type: `'completion'`

```javascript
{ src: 'Day02/Final_Audio.mp3', target: '#day02Completion', title: 'Day 2 Complete! 🎉', type: 'completion' }
```

- Appended last in `dayXXTracks` and `dayXXDurations`
- `loadAndPlayTrack()` detects `track.type === 'completion'` and calls `launchCompletionAnimation(audio)`
- Three.js is loaded via dynamic CDN injection (`cdnjs r128 three.min.js`) the first time it is needed — zero bundle impact

### Full-Screen 80% Transparent Backdrop & Centered Viewport

When a completion track plays, `#completionOverlayDiv` creates an **80% dark transparent backdrop (`rgba(10, 14, 26, 0.85)` + `backdrop-filter: blur(12px)`) covering the entire screen (`100vw` × `100vh`)**.

- **Centered 3D Objects**: All 3D models are rendered dead-center in the camera viewport (`(0, 0, 0)`).
- **Floating Controls**: Captions (`#completionCaption`) and timeline legend dots (`#completionLegend`) float glassmorphic near the bottom center.

### MOMENTS Array & High-Detail Primitives

Extract keyword timestamps with Whisper ASR:
```python
result = model.transcribe("Final_Audio.mp3", word_timestamps=True)
```

Map to a `COMPLETION_MOMENTS` array:
```javascript
const COMPLETION_MOMENTS = [
  { id: 'complete',   startAt: 0.00,  endAt: 5.50,  label: '✅ Day 2 Complete!',    builder: 'buildCheckmark',  accent: 0x00ffcc },
  { id: 'distinct',   startAt: 6.58,  endAt: 9.00,  label: '💎 DISTINCT',          builder: 'buildGem',        accent: 0xa78bfa },
  // ... one entry per spoken keyword concept
];
```

Each object builder (`buildCheckmark`, `buildGem`, `buildSortedBars`, `buildPipeline`, `buildQuestionCluster`, `buildTrophy`, `buildRocket`) constructs high-detail 3D models using **only Three.js primitive geometries** — no external asset files.

### Take Test Button Persistent Blink

After `onNarrationSegmentEnded` fires for a `completion` track:
1. `activateTakeTestBlink()` adds `.take-test--urgent` class to `#takeTestBtn`
2. CSS animates a gold `#fbbf24` ↔ blue pulse at 1.2s intervals with a ring glow `::after` element
3. `sessionStorage.setItem(\`${currentDay}_testUrgent\`, '1')` persists blink across page reloads
4. `restoreTakeTestBlinkIfNeeded()` is called on `DOMContentLoaded` to restore the blink if not yet cleared
5. `deactivateTakeTestBlink()` is called inside `submitTest()` after the score is saved — blink stops the instant the learner submits
6. `prefers-reduced-motion`: only opacity blinks, no scale/glow effects

### WebGL Lifecycle

- `teardownCompletionAnimation()`: disposes all geometries/materials, calls `renderer.dispose()`, removes full-screen backdrop and overlay DOM elements
- Called automatically from `cancelTypewriter()` (seeking away) and `onNarrationSegmentEnded` (track ends)
- `completionDisposables[]` array tracks all `cd(resource)` calls for clean memory disposal

---

## 🐍 Python Track Typewriter & Pyodide Execution Standard

> **Rewritten against Python Day 01 production.** The `startAt`/`endAt` even-cadence
> model below was replaced by **spoken-phrase segments**. Do not reintroduce it.

For all Python curriculum days (`pyDay01` through `pyDay30`). The SQL sections
above remain the reference for the SQL engine; the Python engine has since moved
ahead of it and is now the stronger reference.

### 1. Engine Registration — `segments`, not `startAt`/`endAt`

`PYTHON_QUESTION_SOLUTIONS` lives inside a `SYNC-GENERATED` block in
`public/python/python-engine.js` and is **rewritten by the builder** — never
hand-edit it:

```javascript
PYTHON_QUESTION_SOLUTIONS['pyDayXX'] = {
  "1": {
    src: 'DayXX/New_PyDayXXQuestion01sol.mp3',
    code: 'print("Hello, Python for Data Analysis!")',
    duration: 11.45,
    segments: [
      { text: "print(",   startAt: 2.06, charInterval: 40 },
      { text: '"Hello, Python for Data Analysis!")', startAt: 3.86, charInterval: 34 }
    ],
    scrollAt: 8.53
  }
};
```

Each segment is **one phrase of code with the timestamp the narrator begins
saying it** and a per-character cadence:

$$\text{charInterval}_{ms} = \frac{(\text{next segment start} - \text{this start}) \times 1000}{|\text{text}|}$$

clamped to **25–85 ms**. The builder enforces the invariants:

- Concatenating every `segments[].text` reproduces `code` **byte for byte**
- `startAt` is monotonic non-decreasing
- The final character lands **before** the clip ends
- `scrollAt` is **never** earlier than the last character (no executing mid-type)

### 2. Narration Must Describe the Code

This is the single most important authoring rule, and no tooling can substitute
for it. If the narration does not say what the code contains, typing cannot sync.

> **"Here is the solution. We import `defaultdict` from `collections`. Then we build a list called `transactions` holding four sample records. The first record has user id U zero one … Finally we print the `fraud_map`."**

Requirements:
- Name every variable **when it is created**, in code order
- Say `print` explicitly — 7 of 15 Day 01 scripts omitted it, leaving the last
  line unanchored in every one of them
- Speak every identifier required by `checkVars` (`fraud_map`, `flatten_dict`,
  `flat`, `jump_sizes` were all graded but never narrated)
- Leave ≥1s of speech after `print` so the final line can finish typing
- Avoid trailing clauses that alias to earlier code tokens (ending with
  "which **lists**…" made `lst` anchor 22s late)

**Anti-pattern — conceptual narration.** "We recursively traverse the dictionary…
If a value is another dictionary, we call flatten dict…" describes the algorithm
but never its literals. Result: **20 of 21 segments unanchored**, ladder
extrapolating 26s past a 13.7s clip, typing visibly wrong. Rewrite the script to
walk the code.

### 3. High-Performance RAF Typewriter Loop

- `requestAnimationFrame` loop (`activeTypewriterRAF`) driven by per-character
  events expanded from `segments`.
- Each event carries an absolute `atSec` compared against
  `audioObj.currentTime`.
- At `scrollAt`, `hasExecutedCurrentCode` fires `runCurrentCode()` (Pyodide) and
  scrolls `#mainOutput` into view.
- Listeners are bound once per entry (`play`/`playing`/`timeupdate`) and removed
  by `cancelTypewriter()`, so resume never requires re-entry.

**Do NOT divide timings by `playbackRate`.** `audio.currentTime` already advances
at content rate. Dividing double-compensates and makes typing run 25% *ahead* of
the voice at 1.25x — the SQL engine still contains this bug; do not port it.

### 4. Arbitrary Seeking, Fast-Forward & Backward Scrub

- **Entry:** fast-forwards the editor to the text implied by `currentTime`.
- **Backward scrub:** when `currentTime` drops below the last fired event, the
  event cursor rewinds to zero and the visible text is rebuilt from the events —
  so editor state depends only on audio position, never on history.
- **Resume:** replaying forward from a rewound position retraces the same text
  and completes.
- Writes go through `setEditorCodeSafely(text)`, which no-ops when the value is
  already identical.

The harness pins all three as regression tests.

### 5. Overflow Repair — Anchors Are Immutable

When many segments have no spoken anchor, the fallback ladder can extrapolate
past the clip end. Repair must compress **only unanchored runs**, into the window
between their neighbouring anchors.

Never rescale the whole ladder. Doing so dragged already-correct anchors
**4–6 seconds early** (Q13 −5.67s, Q14 −5.82s, Q15 −2.81s) while looking like a
successful fix. The builder's validation gate now catches the overflow that the
old rescale used to hide.

### 6. Anchor Safety

- **`_preamble_floor`** — anchors may never resolve inside "Here is the solution."
  Without it `is_full_time` → alias `["is"]` matched *"Here **is** the solution"*
  and started the code 1.66s before the narrator began.
- **`TOKEN_ALIASES`** must cover multi-word identifiers (`is_full_time` →
  `["is full time", "full time"]`). Splitting on `_` reduces them to homophones.
- **Prefer `word` over `phrase` anchors** for enumerations. Fuzzy multi-word
  matching drifted +5.38s on one phrase and failed entirely on another;
  single-token exact matching landed on the syllable.
- Use `occurrence: N` when the narrator names a term in a list before describing
  it (e.g. "two families: Mutable and Immutable. Mutable objects, such as …").

### 7. Audio Whitelist & URL Normalization

- All playback paths pass through `resolveAudioUrl(src)` → `/python/${clean}`.
- `!public/python/**/*.mp3` must be whitelisted in `.gitignore`
  (`git check-ignore` must exit `1`).
- `.cache/` (Whisper word cache) must be gitignored.

### 8. Regenerating a Python Day

```bash
python scripts/update_day01_narrations.py   # edit scripts (idempotent)
python scripts/build_python_audio.py        # Edge-TTS, hash-cached
python scripts/build_python_sync_data.py    # ASR + alignment + emit + validate
node scripts/test_python_sync.js            # must be all-pass
node scripts/test_python_topic_picker.js    # must be all-pass
```

The builder **must fail loudly**. Never relax its validation gate to force a
green build — a silent partial rebuild shipped 6 overflow defects in Day 01.

