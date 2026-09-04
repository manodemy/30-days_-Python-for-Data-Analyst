# 🚀 1-Click Publishing Kit — `SQL-11-R1`

**Reel Identifier:** `SQL-11-R1`  
**Curriculum Day:** `Day 11 (Advanced Joins)`  
**Topic:** `Self-Join: Manager Salary Trap (LeetCode 181)`  
**Target Video:** `marketing/output/video/SQL-11-R1.mp4`  
**Cover Image:** `marketing/output/video/SQL-11-R1_Cover.jpg`  
**Live Simulator Link:** `https://www.manodemy.com/q18`

---

## 📝 1. Standardized Instagram & Social Media Caption

*(Click copy and paste directly into Instagram / YouTube Shorts / TikTok)*

```text
MANAGER SALARY TRAP 💼⚡

Which query finds employees earning more than their direct manager?

Can you spot which approach correctly links the employee to their manager without subquery scoping bugs?

What’s your answer — A or B? 👇
Drop your choice in the comments before checking the answer!

🧠 Test this SQL interview question live:
👉 manodemy.com/q18

📊 Practice Data Skills with Manodemy
🎁 Day 1 & Day 2 are 100% FREE

🔗 Link in bio

[sql interview questions, self join sql, leetcode 181, employees earning more than managers, faang sql interview, amazon sql interview, flipkart sql interview, advanced sql, learn sql]

#SQL #SQLInterview #SQLQuestions #SQLTips #DataAnalyst #DataAnalytics #LearnSQL #Manodemy
```

---

## 📌 2. Pinned First Comment (Reveals Technical Solution)

*(Post this immediately after sharing the reel, then tap **Pin comment**)*

```text
Option A is the Industry Standard ✅ | Option B is the Trap ❌

Why Option A (Self JOIN) is correct:
A Self JOIN (`e.manager_id = m.emp_id`) matches each employee row directly with their manager's record in the same table. The `WHERE e.salary > m.salary` filter then accurately isolates employees out-earning their managers.

Why Option B (Uncorrelated Subquery) fails:
In Option B, `WHERE emp_id = manager_id` inside the subquery evaluates against the SAME inner row! It searches for an employee who is their own manager (like a CEO), completely ignoring the outer employee's manager ID!

💡 Rule of thumb: Hierarchical comparisons within the same table (employee ↔ manager) are best solved with an explicit SELF JOIN!

Did you vote A or B? 👇
```

---

## 🎬 3. Video & Audio Production Specifications

- **Reel ID:** `SQL-11-R1`
- **Voiceover Actor:** `en-US-AndrewNeural`
- **Audio Script:**
  > *"Amazon and Flipkart love asking this Manager Salary S-Q-L question! Which query finds employees earning more than their direct manager? Choose your answer... Option A... or Option B? Drop your vote in the comments below."*
- **Countdown SFX:** 5.4s animated radial clock (`bomb` sound profile)
- **Visual Spec:** Full 1080x1920 9:16 Canvas, Org Chart Salary Clash with 1080x1080 Center Safe Zone compliance (Zero crop on Instagram 1:1 profile grid or 4:5 home feed).
- **Target Shortlink Bridge:** `manodemy.com/q18` -> Day 11 Practice Simulator
