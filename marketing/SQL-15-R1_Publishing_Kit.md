# 🚀 1-Click Publishing Kit — `SQL-15-R1`

**Reel Identifier:** `SQL-15-R1`  
**Curriculum Day:** `Day 15 (Window Framing: ROWS vs RANGE & Ledger Accumulation)`  
**Topic:** `Running Balance Bug: 2 Transactions on the Same Day (Google Pay & Stripe Ledger Trap)`  
**Target Video:** `marketing/output/video/SQL-15-R1.mp4`  
**Opening Frame / Cover:** Embedded directly on Frame 0 of video (`marketing/output/video/SQL-15-R1_Cover.jpg`)  
**Live Simulator Link:** `https://www.manodemy.com/q22`

---

## 📝 1. Standardized Instagram & Social Media Caption

*(Click copy and paste directly into Instagram / YouTube Shorts / TikTok)*

```text
RUNNING BALANCE BUG? 💳⚡

Which query calculates daily ledger totals when multiple transactions occur on the same day?

Can you spot the dangerous silent trap between default RANGE and explicit ROWS in window functions?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q22

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, running balance sql, window functions, google pay sql, stripe sql interview, range vs rows, bank ledger audit, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy #database #dataanalytics #sql
```

---

## 📌 2. Pinned First Comment (Reveals Technical Solution)

*(Post this immediately after sharing the reel, then tap **Pin comment**)*

```text
Option B is the Fintech Production Standard ✅ | Option A is the Ledger Bug Trap ❌

Why Option A (Default RANGE) fails in bank ledgers:
When you write `OVER (ORDER BY txn_date)` without specifying a frame, SQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`!
If two transactions happen on the SAME day (e.g., ₹500 coffee and ₹500 lunch on Jan 15), `RANGE` treats identical dates as a tie and adds BOTH amounts at once (₹1,000 for both rows) instead of progressive step-by-step running totals!

Why Option B (Explicit ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) works:
`ROWS` forces SQL to accumulate row-by-row regardless of duplicate timestamps, giving true progressive ledger accounting!

💡 Rule of thumb: Never trust default window frames on date columns — always specify explicit `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`!

Did you vote A or B? 👇
```

---

## 🎙️ 3. Audio Narration & Voiceover Script

**Voice Actor:** `en-US-AndrewNeural` (Deep, crisp tech documentary tone)

> "Google Pay and Stripe love asking this Running Balance S-Q-L challenge!
> Which query calculates daily ledger totals when multiple transactions occur on the same day?
> Choose your answer.
> Option A...
> or Option B?
> Drop your vote in the comments below."

---

## 📂 4. Direct Launchpad Asset Index

| Asset Type | File Location | Specifications |
| :--- | :--- | :--- |
| **Rendered MP4** | `marketing/output/video/SQL-15-R1.mp4` | 1080x1920 (9:16) @ 24fps |
| **Opening Poster** | `marketing/output/video/SQL-15-R1_Opening_Poster_1080x1920.jpg` | Embedded on Frame 0 (Safe Padding) |
| **Cover JPEG** | `marketing/output/video/SQL-15-R1_Cover.jpg` | 1080x1920 (Zero Crop) |
| **Cover PNG** | `marketing/output/video/SQL-15-R1_Cover.png` | 1080x1920 Lossless Master |
| **Publish Pack JSON** | `marketing/output/video/SQL-15-R1_Publish_Pack.json` | 1-Click Launchpad Metadata |
| **Live Simulator** | `https://www.manodemy.com/q22` | Interactive SQL Sandbox |
