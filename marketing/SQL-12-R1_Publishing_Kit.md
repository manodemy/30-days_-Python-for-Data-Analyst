# 🚀 1-Click Publishing Kit — `SQL-12-R1`

**Reel Identifier:** `SQL-12-R1`  
**Curriculum Day:** `Day 12 (Set Operations & Temporal Audits)`  
**Topic:** `Ghost Employee Payroll Trap: Date Filtering vs Status Flags`  
**Target Video:** `marketing/output/video/SQL-12-R1.mp4`  
**Opening Frame / Cover:** Embedded directly on Frame 0 of video (`marketing/output/video/SQL-12-R1_Cover.jpg`)  
**Live Simulator Link:** `https://www.manodemy.com/q19`

---

## 📝 1. Standardized Instagram & Social Media Caption

*(Click copy and paste directly into Instagram / YouTube Shorts / TikTok)*

```text
WHO STILL GOT PAID? 👻💸

Which query catches salary payments credited after an employee resigned?

Can you spot which approach checks transaction dates instead of historical status flags?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q19

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, date filtering sql, ghost employees, payroll fraud audit, leetcode sql, data analyst interview, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy
```

---

## 📌 2. Pinned First Comment (Reveals Technical Solution)

*(Post this immediately after sharing the reel, then tap **Pin comment**)*

```text
Option A is the Real-World Audit Standard ✅ | Option B is the Trap ❌

Why Option A (pay_date > exit_date) works:
An employee who resigned 3 months ago has a valid historical employment record. To catch post-resignation unauthorized payments, you MUST compare transaction timestamps (`p.pay_date > e.exit_date`).

Why Option B (status = 'Resigned') fails:
Option B simply checks if status is 'Resigned'. This catastrophically flags EVERY single legitimate monthly salary ever paid to that employee while they were working full-time!

💡 Rule of thumb: Never rely on static status flags for temporal audit checks — always filter against transactional timestamp boundaries!

Did you vote A or B? 👇
```

---

## 🎬 3. Video Assets & Specifications

| Asset | Path / Details | Specs |
| :--- | :--- | :--- |
| **Rendered MP4** | `marketing/output/video/SQL-12-R1.mp4` | 1080x1920 (9:16) @ 24fps |
| **Opening Hook Frame** | First 1.8 seconds of video | Frame 0 = High-CTR Poster Thumbnail |
| **Cover JPEG** | `marketing/output/video/SQL-12-R1_Cover.jpg` | 1080x1920 (Zero Crop) |
| **Profile Grid Crop** | `marketing/output/video/SQL-12-R1_Opening_Poster_1x1.jpg` | 1080x1080 Center Safe-Zone |
| **Voiceover Engine** | Edge-TTS (`en-US-AndrewNeural`) | 3-Layer Audio Mastered (Vox + BGM + SFX) |
| **Interactive Route** | `/q19` and `/go/q19` | Direct redirect to Day 12 SQL challenge |
