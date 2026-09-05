# 🚀 1-Click Publishing Kit — `SQL-14-R1`

**Reel Identifier:** `SQL-14-R1`  
**Curriculum Day:** `Day 14 (Advanced Sessionization & Temporal Windows)`  
**Topic:** `Session Timeout: Dynamic User Sessionization vs Calendar Date Ranks`  
**Target Video:** `marketing/output/video/SQL-14-R1.mp4`  
**Opening Frame / Cover:** Embedded directly on Frame 0 of video (`marketing/output/video/SQL-14-R1_Cover.jpg`)  
**Live Simulator Link:** `https://www.manodemy.com/q21`

---

## 📝 1. Standardized Instagram & Social Media Caption

*(Click copy and paste directly into Instagram / YouTube Shorts / TikTok)*

```text
SESSION TIMEOUT? ⏱️📱

Which query tracks dynamic user sessions when 30 minutes of inactivity triggers a new session?

Can you spot which approach computes event inactivity gaps instead of merely ranking calendar dates?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q21

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, sessionization sql, swiggy sql interview, uber data analyst, lag function sql, running total session id, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy #database #dataanalytics #sql
```

---

## 📌 2. Pinned First Comment (Reveals Technical Solution)

*(Post this immediately after sharing the reel, then tap **Pin comment**)*

```text
Option A is the FAANG Standard ✅ | Option B is the Trap ❌

Why Option A (SUM of is_new) works:
When inactivity exceeds 30 minutes, `is_new` flags 1; otherwise it flags 0. `SUM(is_new) OVER (ORDER BY click_time)` adds 0 on ordinary clicks (preserving the current session ID) and adds 1 only when a new session starts (1, 1, 1, 2, 2, 3...)!

Why Option B (COUNT of is_new) fails:
In SQL, `0` is a valid, populated integer value — it is NOT NULL! `COUNT(is_new)` counts every single 0 as a row, incrementing the session ID on EVERY SINGLE CLICK (1, 2, 3, 4, 5...)! It completely destroys session grouping!

💡 Rule of thumb: To accumulate binary flags (0 and 1) in SQL, always use SUM() — COUNT() counts both 0 and 1!

Did you vote A or B? 👇
```

---

## 🎙️ 3. Audio Narration & Voiceover Script

**Voice Actor:** `en-US-AndrewNeural` (Deep, crisp tech documentary tone)

> "Swiggy and Uber love asking this User Sessionization S-Q-L challenge!
> Which query tracks dynamic user sessions when thirty minutes of inactivity triggers a timeout?
> Choose your answer.
> Option A...
> or Option B?
> Drop your vote in the comments below."

---

## 📂 4. Direct Launchpad Asset Index

| Asset Type | File Location | Specifications |
| :--- | :--- | :--- |
| **Rendered MP4** | `marketing/output/video/SQL-14-R1.mp4` | 1080x1920 (9:16) @ 24fps |
| **Opening Poster** | `marketing/output/video/SQL-14-R1_Opening_Poster_1080x1920.jpg` | Embedded on Frame 0 (Safe Padding) |
| **Cover JPEG** | `marketing/output/video/SQL-14-R1_Cover.jpg` | 1080x1920 (Zero Crop) |
| **Profile Grid Crop** | `marketing/output/video/SQL-14-R1_Opening_Poster_1x1.jpg` | 1080x1080 Center Safe-Zone |
| **Publish Pack JSON** | `marketing/output/video/SQL-14-R1_Publish_Pack.json` | 1-Click Launchpad Metadata |
| **Live Simulator** | `https://www.manodemy.com/q21` | Interactive SQL Sandbox |
