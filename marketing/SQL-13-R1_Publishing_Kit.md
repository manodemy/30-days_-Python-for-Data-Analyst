# 🚀 1-Click Publishing Kit — `SQL-13-R1`

**Reel Identifier:** `SQL-13-R1`  
**Curriculum Day:** `Day 13 (Advanced Aggregation & Window Counters)`  
**Topic:** `Netflix Peak Concurrency Trap: Event Delta Counters vs Quadratic Self-Joins`  
**Target Video:** `marketing/output/video/SQL-13-R1.mp4`  
**Opening Frame / Cover:** Embedded directly on Frame 0 of video (`marketing/output/video/SQL-13-R1_Cover.jpg`)  
**Live Simulator Link:** `https://www.manodemy.com/q20`

---

## 📝 1. Standardized Instagram & Social Media Caption

*(Click copy and paste directly into Instagram / YouTube Shorts / TikTok)*

```text
PEAK STREAMERS? 🎬🍿

Which query finds concurrent viewers watching at the exact same second?

Can you spot which approach scales to millions of streams without quadratic join crashes?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q20

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, peak concurrency sql, netflix sql interview, hotstar live streams, running total sql, window functions, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy #database #dataanalytics #sql
```

---

## 📌 2. Pinned First Comment (Reveals Technical Solution)

*(Post this immediately after sharing the reel, then tap **Pin comment**)*

```text
Option B is the FAANG Standard ✅ | Option A is the Crash Trap ❌

Why Option B (Delta Event Counter +1 / -1) works:
By tagging each stream start as +1 and each stream end as -1, `SUM(delta) OVER (ORDER BY t)` computes the exact running concurrent viewers in O(N log N) time without storing redundant combinations!

Why Option A (Self-Join BETWEEN) fails:
Option A compares every stream against every other overlapping stream using an O(N²) quadratic Self-Join. On 10 million concurrent streams, this generates 100 trillion row comparisons, causing catastrophic database memory exhaustion!

💡 Rule of thumb: When tracking concurrent active sessions, convert starts and ends into +1 / -1 delta events instead of writing quadratic self-joins!

Did you vote A or B? 👇
```

---

## 🎬 3. Video Assets & Specifications

| Asset | Path / Details | Specs |
| :--- | :--- | :--- |
| **Rendered MP4** | `marketing/output/video/SQL-13-R1.mp4` | 1080x1920 (9:16) @ 30fps |
| **Opening Hook Frame** | First ~1.8s Hollywood zoom + shutter SFX | Frame 0 = High-CTR Poster Thumbnail |
| **Cover JPEG** | `marketing/output/video/SQL-13-R1_Cover.jpg` | 1080x1920 (Zero Crop) |
| **Profile Grid Crop** | `marketing/output/video/SQL-13-R1_Opening_Poster_1x1.jpg` | 1080x1080 Center Safe-Zone |
| **Voiceover Engine** | Edge-TTS (`en-US-AndrewNeural`) | 3-Layer Audio Mastered (Vox + BGM + SFX) |
| **Interactive Route** | `/q20` and `/go/q20` | Direct redirect to Day 13 SQL challenge |
