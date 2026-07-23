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

---

## Standard Workflow

### Step 1: Measure Audio Durations
Run `ffprobe` on both the Question audio and Solution audio files to get exact durations:

```powershell
ffprobe -i public/Version-3/Day02/New_Day2Question05.mp3 -show_entries format=duration -v quiet -of csv="p=0"
ffprobe -i public/Version-3/Day02/New_Day2Question05sol.mp3 -show_entries format=duration -v quiet -of csv="p=0"
```

### Step 2: Extract Word-Level Timestamps with Whisper ASR
Write a scratch Python script to extract exact word-level timestamps using `openai-whisper` (`tiny.en` model):

```python
import whisper

model = whisper.load_model("tiny.en")
result = model.transcribe("public/Version-3/Day02/New_Day2Question05sol.mp3", word_timestamps=True)

print("=== WORD-LEVEL TIMESTAMPS ===")
for segment in result["segments"]:
    for word in segment.get("words", []):
        print(f"  {word['start']:6.3f}s - {word['end']:6.3f}s : {word['word']}")
```

Execute the script via `run_command`.

---

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
- Called automatically from `cancelTypewriter()` (seeking away) and `onNarrationSegmentEnded` (track ends)
- `completionDisposables[]` array tracks all `cd(resource)` calls for clean disposal

