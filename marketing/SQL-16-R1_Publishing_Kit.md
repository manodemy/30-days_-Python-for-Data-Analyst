# 🚀 1-Click Publishing Kit — `SQL-16-R1`

**Reel Identifier:** `SQL-16-R1`  
**Topic:** Zomato & Swiggy Duplicate Payment Deductions (`DOUBLE CHARGE? 💳🚨`)  
**Core Dilemma:** Option A (LAG Window Time-Delta) vs Option B (Time-Window Self-Join Trap)  
**Target Video:** `marketing/output/video/SQL-16-R1.mp4`  
**Opening Frame / Cover:** Embedded directly on Frame 0 of video (`marketing/output/video/SQL-16-R1_Cover.jpg`)  
**Verified Live Simulator Link:** [`https://www.manodemy.com/q23`](https://www.manodemy.com/q23)

---

## 📌 1. Pinned Answer / Solution Comment (Post Immediately After Publishing)

```text
Option A is the Production Standard ✅ | Option B is the Self-Match Trap ❌

Why Option A (LAG Window Time-Delta) works:
By partitioning by card_id and amount and ordering by txn_time, `LAG(txn_time)` looks strictly at the immediately preceding swipe for the same card and amount. If the delta is within 10 seconds, it flags only the second accidental swipe (4s later) while preserving all genuine orders!

Why Option B (Time-Window Self-Join) fails catastrophically:
Because the join condition includes `(p1.txn_time - p2.txn_time) BETWEEN 0 AND 10`, every single row joins against ITSELF! `p1.txn_time - p1.txn_time = 0`, which satisfies `0 <= 10`!
As a result, `COUNT(p2.txn_id)` is greater than 0 for EVERY order in the database, flagging 100% of innocent customer transactions as fraudulent duplicates!

💡 Rule of thumb: Never use self-joins for time-delta threshold checks — always use window LAG() to compare strictly against the prior chronological event!

Did you vote A or B? 👇
```

---

## 📱 2. Social Media Caption (Instagram / YouTube Shorts / LinkedIn)

```text
DOUBLE CHARGE? 💳🚨

Which query flags accidental double-swipes within 10 seconds without corrupting genuine orders?

Can you spot why Option B's time-window self-join flags 100% of all orders as fraud?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q23

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, duplicate payment detection, lag function sql, self join trap, zomato sql interview, swiggy data analyst, fintech fraud detection, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy
```

---

## 💻 3. Interactive Code Duel Snippets

### Option A: LAG Window Time-Delta (Production Standard ✅)
```sql
SELECT card_id, amount, txn_time,
  CASE WHEN txn_time - LAG(txn_time) OVER (
    PARTITION BY card_id, amount
    ORDER BY txn_time
  ) <= 10 THEN 'DUPLICATE'
  ELSE 'GENUINE' END AS status
FROM payments;
```

### Option B: Time-Window Self-Join (Catastrophic Trap ❌)
```sql
SELECT p1.card_id, p1.amount, p1.txn_time,
  CASE WHEN COUNT(p2.txn_id) > 0 THEN 'DUPLICATE'
  ELSE 'GENUINE' END AS status
FROM payments p1
LEFT JOIN payments p2
  ON p1.card_id = p2.card_id
  AND p1.amount = p2.amount
  AND (p1.txn_time - p2.txn_time) BETWEEN 0 AND 10
GROUP BY p1.txn_id;
```

---

## 🗂️ 4. Asset Manifest

| Asset | Path | Description |
| :--- | :--- | :--- |
| **Rendered MP4** | `marketing/output/video/SQL-16-R1.mp4` | 1080x1920 (9:16) @ 30fps |
| **Opening Poster** | `marketing/output/video/SQL-16-R1_Opening_Poster_1080x1920.jpg` | Embedded on Frame 0 (Safe Padding) |
| **Cover JPEG** | `marketing/output/video/SQL-16-R1_Cover.jpg` | 1080x1920 (Zero Crop) |
| **Profile Grid Crop** | `marketing/output/video/SQL-16-R1_Opening_Poster_1x1.jpg` | 1080x1080 Center Safe-Zone |
| **Publish Pack JSON** | `marketing/output/video/SQL-16-R1_Publish_Pack.json` | 1-Click Launchpad Metadata |
