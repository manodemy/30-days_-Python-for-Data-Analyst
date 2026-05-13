// ═══════════════════════════════════════════════════════════════════════
// MANO VOICE ASSISTANT v4.0 — 1000-Line Narration Engine
// Smart anti-repeat | Dynamic regex extraction | 20 categories
// ═══════════════════════════════════════════════════════════════════════

const ManoVoice = (() => {
  'use strict';

  // ── STATE ──
  let muted = false;
  let streak = 0;
  let correctCount = 0;
  let lastMilestone = 0;
  let voice = null;
  let voicesReady = false;
  let toastTimer = null;
  let muteBtn = null;
  let sessionSolves = 0;
  let runTimestamps = {};
  let attemptCounts = {};
  let sessionGreeted = false;

  // ── VOICE TUNING ──
  const RATE_NORMAL = 1.0;
  const RATE_CELEBRATE = 1.05;
  const RATE_ERROR = 0.95;
  const RATE_SLOW = 0.9;
  const PITCH = 1.0;
  const TOAST_MS = 5000;

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: NARRATION DATA (1000 lines across 20 categories)
  // ═══════════════════════════════════════════════════════════════════
  const VOICE_DATA = {

// ═══════ CATEGORY 1: CORRECT ANSWER (50 lines) ═══════
ok: [
  "Nailed it!","That's it!","Spot on!","Boom, correct!","Yes!","Clean!","Love it!","Right on!","Exactly!","You got it!","On point!","Perfect!",
  "Beautiful work! Ready for the next one?","That was clean code. On to the next!","You're building real skills. Keep going!","Excellent! Let's tackle the next challenge.","Smooth! That was well done. What's next?","Great momentum! Keep this energy going.","That flowed perfectly. Next question!","Nice rhythm! You're in the zone now.","Onward! You're making great progress.","One more down! Let's keep rolling.",
  "You're thinking like a real developer now.","That's exactly how a professional would write it.","See? You're getting the hang of this!","Look at you go! Solid answer.","You should be proud of that one.","That confidence is showing in your code!","You're leveling up with every question.","I can tell you really understand this concept.","That was textbook perfect!","Your Python instincts are getting sharper.",
  "Perfect. That concept will come up again, and now you own it.","Great work! Remember this pattern, it shows up everywhere.","That's a fundamental skill you just locked in.","This kind of thinking is what separates good coders from great ones.","You just practiced something you'll use in real projects.","That's a building block. Everything ahead gets easier because of it.","Solid understanding! This will serve you well in interviews too.","You nailed the concept behind the code, not just the syntax."
],

// ═══════ CATEGORY 2: PARTIAL ANSWER (30 lines) ═══════
close: [
  "You're on the right track, but the question asks for a bit more.","Good start! But look again, there's more to do here.","Almost there! Just one more piece is missing.","You answered part of it. Check if there's more to the question.","Nice thinking, but the output isn't quite complete yet.",
  "So close! Re-read the question carefully, you missed one thing.","You're halfway there. The question wants one more step.","The logic is right, but the question asks for something extra.","Solid attempt! But check the full requirements of the question.","Your approach is good, just expand it a little more.",
  "Good foundation! But I think the question expects a more complete answer.","You're close, but not quite. Take another careful look.","Almost! Double check your values and give it another try.","You're on the right track. Re-read the question one more time.","Not bad! But something's a little off. Try again.",
  "That's a good first step. Now see if the question asks for anything else.","Your code works, but the question has multiple parts.","One more thing and you've got it! Look at the question again.","Partial credit! You need to address the full question though.","Nice work so far, but the question expects a bit more output.",
  "You solved one part beautifully. Now tackle the rest!","Check the question again. I think there's a second requirement.","Great logic! But make sure your output covers everything asked.","You're really close. Just read the last part of the question.","The core is right, but you missed a detail. Try once more.",
  "Good thinking! But the output doesn't match everything expected.","Almost perfect! One small thing is still missing.","You've got the right idea. Now make it complete.","So close I can taste it! Just one more tweak.","Re-read the question word by word. You'll spot what's missing."
],

// ═══════ CATEGORY 3: WRONG ANSWER (25 lines) ═══════
wrong: [
  "Hmm, that's not quite it. Give the question another read.","Not quite! Take a fresh look at what's being asked.","The output doesn't match what's expected. Try a different approach.","Your code runs fine, but it's solving a different problem.","That's valid Python, but it doesn't answer this particular question.",
  "Try approaching this from a completely different angle.","Read the question one more time. The answer is different from what you wrote.","Close, but not there yet. What exactly is the question asking?","That's not what's being asked. Re-read the question carefully.","Hmm, your code does something different from what the question wants.",
  "I see what you're trying to do, but the question asks for something else.","Good effort! But the question is asking for a different thing entirely.","Your code is correct Python, just not the right answer here.","Take a step back and re-read. The question is asking for something specific.","That doesn't quite solve the problem. Try thinking about it differently.",
  "Not the answer we're looking for. Give the question a fresh read.","Your logic is interesting, but it doesn't match the requirements.","Try re-reading the question. Your code is doing something different.","Almost, but the approach needs to change. What does the question really ask?","That's creative, but not what's expected. Read the question again.",
  "Hmm, that doesn't seem to match the question.","Let's try again. Focus on what the question is specifically asking.","Good try! But the expected output is different. Re-read carefully.","The approach is off. Start fresh and read the question word by word.","Not quite right. Take a deep breath and try again!"
],

// ═══════ CATEGORY 4: NO OUTPUT (20 lines) ═══════
noOut: [
  "Your code ran fine, but nothing was printed. Add a print statement!","I don't see any output. Wrap your answer in print.","The code executed, but the output area is empty. Try adding print.","No output! Remember, Python won't display results unless you print them.",
  "Everything ran smoothly, but I can't see the answer. Add print to show it.","Your code is silent! Show me the result with print.","Hmm, no errors but no output either. Did you forget print?","The code works, but you need to print the result so I can check it.",
  "Almost there! Just wrap your answer in a print statement.","Good code, but nothing showed up. Use print to display your answer.","Python executed successfully, but I need to see the output. Add print!","No errors, that's great! But I need you to print the result.",
  "Your code is doing the right thing silently. Let's make it visible with print.","Remember, in this notebook you need print to show results.","The computation happened, but the result is hidden. Print it out!","Tip: Always use print to show your answers in this notebook.",
  "I think you solved it, but I can't tell without output. Add print!","Your answer is invisible right now. Make it visible with print.","Code ran perfectly, just missing the print statement to show results.","One small thing: add print so the output appears on screen."
],

// ═══════ CATEGORY 5: STREAKS (40 lines) ═══════
s3: [
  "Three in a row! You're on a roll!","Hat trick! Three correct in a row!","Three straight! You're picking up momentum!","That's three! You're on fire!","Triple! You're building a nice streak!","Three in a row! Keep this going!","Boom, three straight! Nice rhythm!"
],
s5: [
  "Five in a row! You're absolutely crushing it!","Five straight! You're in the zone!","High five! That's five correct answers in a row!","Five and counting! Unstoppable!","That's five! You're dominating this!","Five in a row! Your confidence is showing!","Incredible! Five straight correct answers!"
],
s7: [
  "Seven in a row! You're on a legendary streak!","Seven straight! This is impressive!","Lucky seven! Though luck has nothing to do with it!","Seven! You really know your Python!","That's seven correct! You're flying through these!","Seven in a row! Nothing can stop you!"
],
s10: [
  "Ten in a row! You're unstoppable!","Double digits! Ten straight correct answers!","Ten! That's a perfect ten streak!","Wow, ten in a row! You're a Python machine!","Ten straight! I'm genuinely impressed!","That's ten! You've mastered this material!","Ten in a row! Standing ovation!"
],
s15: [
  "Fifteen in a row! You're in god mode!","Fifteen straight! This is elite level!","Fifteen! I've never seen anyone this consistent!","That's fifteen correct! You're absolutely phenomenal!","Fifteen in a row! You should be teaching this!","Incredible fifteen streak! Pure mastery!"
],
s20: [
  "Twenty in a row! This is legendary!","Twenty straight! You're writing Python history!","Twenty! I'm running out of ways to praise you!","That's twenty correct! You are officially a Python wizard!","Twenty in a row! Absolute perfection!","Twenty straight! Take a bow, you've earned it!"
],

// ═══════ CATEGORY 6: STREAK BROKEN (12 lines) ═══════
brk: [
  "Streak broken. No worries, that was a great run!","The streak ended, but you learned something new.","Streaks come and go. What matters is you keep trying!","Streak over, but don't worry. Every expert makes mistakes.","The streak broke, but your skills didn't. Keep going!",
  "That's okay! Mistakes are part of learning.","No sweat! The streak may be over, but your knowledge isn't.","Streak ended, but you're still doing amazing overall.","Don't let one wrong answer discourage you. You've been doing great!","The streak stopped, but your progress didn't. Onward!",
  "Hey, even the best get tripped up sometimes.","Streak broken, but your determination isn't. Let's go!"
],

// ═══════ CATEGORY 7: MILESTONES (40 lines) ═══════
first: [
  "First one down! Great start. Keep this going.","You solved your first question! Welcome to the journey.","And we're off! First question solved.","One down! Every expert started right where you are.","First solve complete! You're officially on your way.","Great beginning! The first step is always the most important.","You just wrote your first correct answer. This is just the start!","First one done! That's how champions begin."
],
quarter: [
  "Twenty-five percent done! You're making real progress.","A quarter of the way there! Great pace.","One-fourth complete! You're doing wonderfully.","Quarter mark reached! Keep this momentum going.","Twenty-five percent solved! You should feel proud.","A quarter done already! Time flies when you're coding.","Nice! You've knocked out a quarter of the questions.","Quarter milestone! You're building a strong foundation."
],
half: [
  "You're halfway there! Keep pushing, you're doing amazing.","Fifty percent! The halfway point feels great, doesn't it?","Half done! You're making incredible progress.","Halfway mark! You've conquered half the questions.","Fifty percent complete! The finish line is in sight.","You're at the midpoint! Downhill from here.","Halfway there! You've shown real dedication.","Half the questions solved! Keep that energy up."
],
three_quarter: [
  "Seventy-five percent done! You're almost there!","Three quarters complete! The finish line is so close.","Just a few more to go! You've done seventy-five percent.","Seventy-five percent! You can practically taste the finish.","Almost done! Only a quarter of the questions remain.","Three-quarter mark! You're in the home stretch now.","So close to finishing! Keep that focus.","Seventy-five percent! Nothing can stop you now."
],
done: [
  "You've completed every question on this page. Incredible work!","One hundred percent! Every single question solved. You're amazing!","All done! You crushed every question on this page.","Perfect completion! You answered every single question.","That's all of them! You should be incredibly proud.","Complete! Every question conquered. You're ready for the next day.","All questions solved! Take a moment to celebrate this achievement.","One hundred percent completion! That's dedication right there."
],

// ═══════ CATEGORY 8: ENCOURAGEMENT AFTER STRUGGLE (30 lines) ═══════
struggle3: [
  "Hey, take a deep breath. This one is tricky, but you've got this.","Don't worry about getting it wrong. Every expert was once a beginner.","This is a tough one! Take your time, there's no rush.","It's okay to struggle. That's actually how your brain learns best.","Hang in there! Sometimes the hardest questions teach us the most.",
  "Don't give up! You're closer than you think.","Remember, struggling with a problem means you're growing.","Take a moment, re-read the question slowly, and try again.","This one is challenging, but I believe in you!","Everyone gets stuck sometimes. That's completely normal."
],
struggle5: [
  "Still working on this one? Try breaking it into smaller steps.","Here's a strategy: write the code one line at a time.","Let me help. Read the question one word at a time, very carefully.","Try the hint button! There's no shame in getting help.","What if you tried a completely different approach?",
  "Sometimes stepping away for a minute helps. Fresh eyes see solutions.","Try writing out the logic in plain English first, then translate to Python.","Focus on just the first part of the problem. Solve it piece by piece.","What's the simplest version of this code you could write?","Don't overthink it. Sometimes the answer is simpler than you expect."
],
struggle7: [
  "I can see you're really working hard. That persistence makes great programmers.","You know what? The fact that you haven't given up says everything about you.","This question is genuinely hard. Your persistence is admirable.","You're building real problem-solving muscles right now.","Keep going! The breakthrough moment is coming, I can feel it.",
  "Real programmers debug for hours. You're doing exactly what professionals do.","Every attempt teaches you something new. You're learning even when it feels like you're not.","I respect your determination. You'll crack this one.","The struggle is the learning. You're becoming a better coder with each try.","Almost there! Sometimes the answer clicks suddenly after many tries."
],

// ═══════ CATEGORY 9: PERSISTENCE VICTORY (25 lines) ═══════
persist: [
  "YES! You did it! That took real determination!","Finally! And you'll remember this answer forever now.","That struggle you went through? That's how real learning happens.","You didn't give up, and now you've conquered it! Amazing!","The hard-won victories are the ones that stick. Beautiful work!",
  "I knew you could do it! That persistence paid off!","After all that effort, you nailed it! That's the sweetest kind of victory.","See? All that struggle was worth it. You learned something deep just now.","That right there is what separates good learners from great ones. You didn't quit!","Victory tastes sweeter after a challenge, doesn't it?",
  "Boom! You finally cracked it! I'm so proud of you!","That was tough, but you pushed through. That's a developer mindset!","All those attempts weren't failures. They were steps to this moment.","You just proved that persistence beats talent every single time.","YES! The breakthrough! Every failed attempt led to this success.",
  "That's the spirit! You kept trying until you got it right!","What a fighter! You earned this correct answer the hard way.","This is the most satisfying kind of correct answer. Well earned!","You wrestled with this one and won! That's incredible.","Remember this feeling. This is what growth feels like.",
  "Bravo! You turned struggle into success. That's rare and valuable.","After all those attempts, you owned it. That's true learning.","The persistence you just showed? That's a superpower in programming.","You could have given up, but you didn't. That makes all the difference.","That was a battle, and you won! On to the next challenge!"
],

// ═══════ CATEGORY 10: HINT BUTTON (25 lines) ═══════
hint1: [
  "Good idea to check the hint! Let me nudge you in the right direction.","Smart move! Sometimes a little hint is all you need.","No shame in asking for help. Even pros look things up!","Let's see if this hint helps you figure it out.","A hint can save you time. Let's get you unstuck!",
  "Checking the hint is a smart strategy. Let's go!","Great instinct! Hints are here to help you learn.","Using hints wisely is a sign of a smart learner."
],
hint2: [
  "Still need more help? Let's break this down further.","Okay, here's another clue. You're getting closer!","Second hint! Pay close attention to this one.","This hint should make things clearer. Read carefully.","Let's dig deeper into this problem together.",
  "More guidance coming your way. You'll get this!","Another hint unlocked! Use it wisely.","This should narrow things down for you."
],
hint3: [
  "Alright, this is a bigger hint. Take your time with it.","Professional developers look things up constantly. No judgment!","Here's a strong clue. You should be able to solve it after this.","Last level of hints! This one is very direct.","This hint gives you almost everything. You can do this!",
  "Big hint incoming! Connect the dots and you've got it.","After this hint, try one more time. I believe in you!","Here's the strongest clue. Put it all together now!","This should light the way. Give it another shot!"
],

// ═══════ CATEGORY 11: SPEED PRAISE (20 lines) ═══════
speed: [
  "Wow, that was fast! You really know your stuff.","Speed demon! You solved that in seconds.","Lightning fast! You barely had to think about it.","That was quick! This concept clearly clicked for you.",
  "Instant solve! You're on another level.","That was blazing fast! Impressive reflexes.","You made that look easy! Super quick answer.","Rapid fire! You're flying through these.",
  "No hesitation! You knew exactly what to do.","Speed and accuracy! That's a powerful combination.","That took you no time at all! Well done.","Quick draw! You solved that before I finished reading.",
  "Snap! Just like that, correct answer.","You're getting faster with each question!","That was so quick I almost missed it! Great work.","Effortless! Your Python skills are getting sharp.",
  "Zero hesitation. That's what mastery looks like.","Fast and correct! You're in peak form.","You crushed that instantly! Keep it up.","That speed tells me you truly understand this concept."
],

// ═══════ CATEGORY 12: CODE QUALITY (20 lines) ═══════
quality_fstring: [
  "Nice use of f-strings! That's the modern Python way.","I see you're using f-strings. Clean and readable!","F-strings! You know the best way to format text in Python.","Great choice with f-strings. Professional and elegant.","Love the f-string usage! That's current best practice."
],
quality_comp: [
  "Beautiful list comprehension! That's clean Pythonic code.","A comprehension! You're writing Python like a pro.","That comprehension is elegant. Much better than a loop here.","Love the comprehension! Concise and readable.","Pythonic style with that comprehension! Well done."
],
quality_names: [
  "I love your variable names. Clear and descriptive!","Great naming conventions! Your code reads like English.","Nice descriptive variable names. That's a professional habit.","Your variable names make the code self-documenting. Excellent!","Clean naming! Anyone could read and understand your code."
],
quality_comments: [
  "Great job adding comments. That's a professional habit!","I see you wrote comments. Future you will thank you.","Comments in your code! That shows real maturity as a developer.","Nice comments! Good code tells you how, comments tell you why.","Adding comments is a sign of a thoughtful programmer. Well done!"
],

// ═══════ CATEGORY 13: SESSION WELCOME (15 lines) ═══════
welcome_morning: [
  "Good morning! Ready to write some Python today?","Morning! Let's start the day with some coding.","Rise and shine! Time to practice Python.","Good morning! Your brain is fresh. Perfect time to learn.","Morning coding session! Let's make it productive."
],
welcome_afternoon: [
  "Good afternoon! Let's keep the momentum going.","Afternoon session! Great time to practice Python.","Hello! Ready for some afternoon coding?","Good afternoon! Let's sharpen those Python skills.","Afternoon! Perfect time to challenge yourself."
],
welcome_evening: [
  "Good evening! Perfect time to focus and learn.","Evening study session! Let's make it count.","Good evening! Quiet time is great for deep learning.","Evening coding! Your dedication is impressive.","Welcome to your evening session! Let's dive in."
],

// ═══════ CATEGORY 14: DAY TOPIC INTRO (20 lines) ═══════
intro_beginner: [
  "Welcome to a new day! Today's topic is fundamental. Master it and everything else gets easier.","New day, new skills! Today's concept is a building block for everything ahead.","Let's begin! Today you're learning something that every Python developer must know.","Fresh topic today! Take your time and really understand it.","New day! This topic comes up in almost every Python project.",
  "Today's lesson is a core concept. Get this right and you're unstoppable.","Welcome! Today's topic is something you'll use every single day as a developer.","New chapter! What you learn today will be the foundation for advanced topics.","Let's start today's lesson! This is one of Python's most important features.","Today is going to be great! This topic is both fun and essential."
],
intro_intermediate: [
  "You're in intermediate territory now! Today separates beginners from real developers.","Welcome to the next level! Today's topic requires deeper thinking.","Intermediate content today! You've earned your way here.","Today's topic is where Python gets really powerful. Let's explore!","Welcome! Today you'll learn techniques that professionals use daily."
],
intro_advanced: [
  "Welcome to the advanced section! This is where you become a data professional.","Advanced material today! You've come so far to get here.","Today's topic is industry-level. Companies hire people who know this.","Advanced Python ahead! This is the real deal.","Welcome to advanced territory! Very few learners make it this far."
],

// ═══════ CATEGORY 15: DEBUGGING GUIDANCE (20 lines) ═══════
debug: [
  "Pro tip: Read the error from bottom to top. The last line tells you what went wrong.","Try adding print statements to check your variables. That's how real developers debug.","A good trick is to test each line separately.","When stuck, try simplifying your code to the bare minimum that reproduces the error.",
  "Read the error message word by word. Python is actually very descriptive.","Pro tip: Check your variable types with print and type. Mismatches cause most errors.","Try commenting out lines one by one to find which line causes the error.","Google the exact error message. Every developer does it, even experts.",
  "Break the problem into tiny pieces. Solve each piece separately.","Check your spelling carefully. Typos cause more errors than logic mistakes.","Pro tip: Count your parentheses and brackets. Mismatches are sneaky.","When debugging, ask yourself: what did I expect versus what actually happened?",
  "Try running just the first few lines. Add more code gradually.","Double check your indentation. Python is very strict about spaces.","Pro tip: Use descriptive variable names. It makes bugs easier to spot.","Read your code out loud. You'll often hear the mistake before you see it.",
  "Take a short break and come back with fresh eyes. It works!","Compare your code to the examples in the question. Spot the differences.","Think about edge cases. What happens with zero, empty strings, or None?","When in doubt, check the Python documentation. It's surprisingly readable."
],

// ═══════ CATEGORY 16: LEARNING TIPS (20 lines) ═══════
tips: [
  "Fun fact: Python is named after Monty Python, not the snake!","Pro tip: Use underscore for large numbers like 1_000_000. Python ignores them.","Did you know? Python uses indentation instead of braces. That's unique!","Tip: You can swap two variables in one line. a, b = b, a. Try it!",
  "Fun fact: The Zen of Python has 20 guiding principles. Type import this to see them.","Pro tip: Use enumerate instead of range and len when looping with indices.","Did you know? Python supports multiple assignment. x = y = z = 0 works!","Tip: Negative indexing lets you count from the end. my_list at negative 1 gives the last item.",
  "Fun fact: Python was created by Guido van Rossum in 1991.","Pro tip: f-strings are the fastest way to format strings in Python.","Did you know? The walrus operator lets you assign and test in one expression.","Tip: Use triple quotes for multi-line strings. Very handy for documentation.",
  "Fun fact: Google, Netflix, and Instagram all use Python extensively.","Pro tip: List comprehensions are faster than regular for loops in Python.","Did you know? Python has over 300,000 packages on PyPI.","Tip: The underscore variable stores the last result in the Python shell.",
  "Fun fact: Python is the most popular language for data science and AI.","Pro tip: Use with statements for file handling. They auto-close files for you.","Did you know? Python supports operator overloading through magic methods.","Tip: Use zip to iterate over multiple lists simultaneously. Very Pythonic!"
],

// ═══════ CATEGORY 17: LONG SESSION PRAISE (15 lines) ═══════
longSession: [
  "You've been at it for a while now. That dedication is incredible!","Over thirty questions solved in one session! You're on fire today.","Your focus is impressive. Take a water break if you need one!","What a marathon session! Your determination is paying off.",
  "You've been coding for a while. That's serious commitment!","So many questions solved! You should be really proud of this session.","Your stamina is impressive! Most people would have stopped by now.","What a productive session! You're making huge progress.",
  "You're putting in serious work today. It shows!","Long sessions like this build real expertise. Keep it up!","I'm impressed by how long you've been practicing. That's dedication.","You're in deep focus mode! Amazing work ethic.",
  "This is what dedicated learners look like. Inspiring!","Marathon study session! You're going to see massive improvement.","Your commitment to learning is remarkable. Keep going!"
],

// ═══════ CATEGORY 18: RETURN WELCOME (8 lines) ═══════
returnWelcome: [
  "Welcome back! Ready to pick up where you left off?","Hey, you're back! Let's continue learning.","Great to see you again! Your progress is saved. Let's keep going.","Welcome back! Consistency is the key to mastery.",
  "You returned! That shows real commitment.","Back for more Python! I like your dedication.","Welcome back! Every session makes you stronger.","Hey, welcome back! Let's make today count."
],

// ═══════ CATEGORY 19: SESSION FAREWELL (5 lines) ═══════
farewell: [
  "Great session today! See you next time.","Nice work today! Come back tomorrow and keep the momentum.","Good job today! Rest up and come back strong.","Excellent session! Your Python skills are growing.","Until next time! You did great today."
]
};

  const ERROR_DATA = {

// ═══════ SYNTAXERROR — 8 sub-types × 8 each = 64 ═══════
syntax_str: [
  "Looks like you have an unclosed string. Make sure every quote has a matching closing quote.",
  "Oops, did you forget a matching quote? One of your strings never ended.",
  "Hmm, check your quotes. It seems a string was left open.",
  "I see an unterminated string. Every opening quote needs a closing quote.",
  "Wait, the string doesn't end. Double check your quotation marks.",
  "That's a syntax error for an unclosed string. Just add the missing quote.",
  "One of your strings is missing its closing quote. Find it and close it!",
  "Your string started but never finished. Match every opening quote with a closing one."
],
syntax_bracket: [
  "You've got an unclosed bracket. Try counting your parentheses.",
  "Oops, a mismatched bracket. Make sure every open bracket is closed.",
  "Hmm, one of your parentheses wasn't closed properly.",
  "Check your brackets. It looks like you forgot to close one.",
  "There's an unclosed parenthesis somewhere. Take a careful look.",
  "Count your opening and closing brackets. They should match perfectly.",
  "A bracket was opened but never closed. Find the missing pair.",
  "Your brackets don't match up. Check each opening bracket has a partner."
],
syntax_colon: [
  "You're missing a colon. If statements, loops, and functions need one.",
  "Oops, don't forget the colon at the end of that line.",
  "Missing colon! Python needs that to start a new block.",
  "Hmm, expected a colon there. Check the end of your statement.",
  "Just a small typo. You missed a colon!",
  "After if, for, while, or def, you always need a colon.",
  "The colon is missing at the end of that line. Add it!",
  "Python expects a colon before indented blocks. Don't forget it!"
],
syntax_char: [
  "There's a character Python doesn't recognize. Check for smart quotes.",
  "Invalid character detected. Did you copy-paste from a word processor?",
  "Python found a character it can't understand. Look for hidden Unicode.",
  "Check for smart quotes or special characters. Python only likes plain ones.",
  "There might be an invisible character in your code. Try retyping the line.",
  "That character isn't valid Python. Make sure you're using regular quotes.",
  "Python found an unexpected character. Check for curly quotes or em-dashes.",
  "Hmm, there's a non-ASCII character hiding in your code. Find and remove it."
],
syntax_print: [
  "In Python 3, print needs parentheses. Try print with parentheses around your value.",
  "Looks like a Python 2 habit! Add parentheses to your print statement.",
  "Print is a function in Python 3. It needs parentheses around the arguments.",
  "Almost! Just add parentheses around what you want to print.",
  "Remember, it's print with parentheses, not print with a space.",
  "Python 3 changed print to a function. Wrap your text in parentheses.",
  "Quick fix: add parentheses after print. Like print and then parentheses.",
  "That's a Python 2 style print. In Python 3, print uses parentheses."
],
syntax_fstring: [
  "There's an issue with your f-string. Check the curly braces.",
  "Your f-string has unbalanced braces. Make sure each one opens and closes.",
  "F-string error! The expression inside the curly braces isn't valid.",
  "Check your f-string syntax. Every opening brace needs a closing one.",
  "Hmm, the f-string has a problem. Double check what's inside the braces.",
  "If you need a literal brace in an f-string, use double braces.",
  "Your f-string expression has a syntax error. Simplify it.",
  "F-string tip: Make sure the expression inside the braces is valid Python."
],
syntax_assign: [
  "Did you mean to compare? Use double equals for comparison.",
  "Single equals is assignment, double equals is comparison. Which did you mean?",
  "You used equals in a condition. For comparison, use double equals.",
  "Oops! To check equality, use double equals, not single.",
  "That's an assignment, not a comparison. Switch to double equals.",
  "Python doesn't allow assignment inside conditions. Use double equals to compare.",
  "Quick fix: change your single equals to double equals for comparison.",
  "In Python, single equals assigns. Double equals compares. Check which you need."
],
syntax_scope: [
  "Return can only be used inside a function. Check your indentation.",
  "Break can only be used inside a loop. Make sure it's properly indented.",
  "Continue only works inside loops. Is your code properly structured?",
  "That statement is outside its valid scope. Check your function or loop structure.",
  "You're using return outside of a function. It needs to be inside def.",
  "Break needs to be inside a for or while loop to work.",
  "That keyword only works in a specific context. Check your code structure.",
  "Make sure return, break, and continue are inside their proper blocks."
],
syntax_gen: [
  "There's a syntax error. Check for missing colons, brackets, or typos.",
  "Hmm, that looks like a syntax error. Double check your grammar.",
  "Oops, Python is confused by the syntax. Look closely at the line.",
  "Check your syntax. Something isn't quite right.",
  "Python couldn't parse this. Make sure your structure is correct.",
  "Syntax error detected. Read the line carefully for any small mistakes.",
  "There's a typo or structural issue. Go through the line character by character.",
  "Python can't understand this line. Check for common mistakes like missing commas."
],

// ═══════ TYPEERROR — 6 sub-types × 8 each = 48 ═══════
type_concat: [
  "You can't mix numbers and strings directly. Convert the number with str.",
  "Oops, trying to add a string and a number? Use str to convert.",
  "You're mixing incompatible types. Use str to convert numbers to text.",
  "Type error! You can't combine text and numbers without converting.",
  "To join a string and number, convert the number to a string first.",
  "Python can't add text and numbers together. Try using an f-string.",
  "Use an f-string or str function to mix text with numbers.",
  "Strings and numbers don't mix directly. Convert one to match the other."
],
type_callable: [
  "You're calling something that isn't a function. Remove the parentheses.",
  "That's not a function, so you can't call it with parentheses.",
  "Oops, you put parentheses on something that isn't callable.",
  "Check if you accidentally named a variable the same as a function.",
  "That object isn't callable. Did you overwrite a built-in function name?",
  "You might have accidentally shadowed a function with a variable.",
  "Remove the parentheses. That's a value, not a function.",
  "Not callable! Make sure you haven't redefined a built-in like list or str."
],
type_args: [
  "Wrong number of arguments. Check the function definition.",
  "The function expects a different number of parameters.",
  "Oops, you're passing too many or too few arguments.",
  "Count the parameters in the function definition and match them.",
  "Argument mismatch! The function needs a specific number of inputs.",
  "Check how many parameters the function expects, then match it.",
  "You gave the function the wrong number of arguments. Count them.",
  "The argument count doesn't match. Review the function signature."
],
type_subscript: [
  "You're using square brackets on something that doesn't support indexing.",
  "That object isn't subscriptable. You can't use square brackets on it.",
  "Oops, you tried to index something that doesn't have indices.",
  "Did you use square brackets instead of parentheses by accident?",
  "That type doesn't support indexing. Check your data type.",
  "You might have written len[x] instead of len(x). Use parentheses for functions.",
  "Not subscriptable! Only lists, tuples, strings, and dicts support brackets.",
  "Check whether you should be using parentheses instead of brackets."
],
type_iterable: [
  "You're trying to loop over something that isn't iterable.",
  "That object can't be looped over. Make sure it's a list, tuple, or string.",
  "Oops, you can't iterate over that type. Check your loop variable.",
  "For loops need something iterable. An integer isn't iterable.",
  "Use range if you want to loop a specific number of times.",
  "Not iterable! You might need to wrap this in a list or range.",
  "You're passing a single value where Python expects a sequence.",
  "Check what you're looping over. It needs to be a collection, not a single value."
],
type_unhashable: [
  "You used an unhashable type as a dictionary key. Lists can't be keys.",
  "Lists and dictionaries can't be used as dictionary keys or set members.",
  "Oops, unhashable type! Try using a tuple instead of a list as a key.",
  "Dictionary keys must be immutable. Convert your list to a tuple.",
  "Sets and dictionary keys need hashable types. Lists aren't hashable.",
  "You can't put a list in a set. Convert it to a tuple first.",
  "Unhashable! Only immutable types like strings, numbers, and tuples can be keys.",
  "That type can't be hashed. Use a tuple or frozenset instead."
],
type_gen: [
  "There's a type mismatch. You're mixing incompatible data types.",
  "Oops, a type error. Check what type each variable actually is.",
  "Hmm, Python doesn't like mixing these types. Try converting them.",
  "Make sure you're passing the correct data type into your function.",
  "Type error spotted. Double check the data you are working with.",
  "The types don't match. Use type() to check what you're working with.",
  "Python is strict about types. Make sure everything matches.",
  "Check your data types carefully. Something doesn't match what's expected."
],

// ═══════ NAMEERROR — 30 lines ═══════
name_dynamic: [
  "Wait, what is VAR? Python doesn't recognize that name yet.",
  "Oops, I don't see anything defined as VAR. Did you spell it correctly?",
  "Hmm, VAR isn't defined. Make sure you created it before using it.",
  "Python threw a name error for VAR. Check your spelling.",
  "Looks like VAR doesn't exist yet. Did you forget to run the cell above?",
  "VAR hasn't been defined. Did you forget to create it?",
  "Python can't find VAR. Check capitalization and spelling.",
  "I don't see VAR anywhere. Make sure you defined it in an earlier cell.",
  "VAR is not recognized. Variables are case-sensitive in Python.",
  "Hmm, where is VAR? It needs to be defined before you can use it."
],
name_gen: [
  "You're using a name that hasn't been defined yet. Check for typos.",
  "That variable doesn't exist. Check for spelling mistakes.",
  "Oops, that name isn't recognized. Make sure you typed it correctly.",
  "Name error! Double check your spelling and capitalization.",
  "Hmm, Python doesn't know that name. Did you forget to define it?",
  "Check your variable names. One of them isn't defined yet.",
  "That name doesn't exist in the current scope. Define it first.",
  "Python is case-sensitive. Check if you have the right capitalization.",
  "Make sure you ran the cells above. The variable might be defined there.",
  "Variable not found! It might be a typo or it wasn't created yet."
],
name_typo: [
  "Looks like a small typo. Did you mean print?",
  "Tiny typo! Did you mean return?",
  "Watch the spelling. It's True with a capital T.",
  "Check the spelling. It's False with a capital F.",
  "Small typo! The function is len, not length.",
  "Typo! The keyword for functions is def.",
  "Small typo! Did you mean input?",
  "That looks like a misspelling. Check each character carefully.",
  "Common typo! Double check the built-in function name.",
  "Almost right! But there's a small spelling mistake."
],

// ═══════ VALUEERROR — 24 lines ═══════
value_literal: [
  "You're converting a string to a number, but the string isn't numeric.",
  "That string can't be converted to a number. Check the value.",
  "Invalid literal! The string contains non-numeric characters.",
  "You can't convert text like a word into an integer. Clean the data first.",
  "The value inside int() or float() must be a valid number string.",
  "Check what you're passing to int(). It has to be a numeric string."
],
value_unpack_many: [
  "Too many values on the right side. Add more variables on the left.",
  "There are more values than variables. Use a star expression to catch extras.",
  "Unpacking mismatch! The right side has more values than variables.",
  "You need more variables on the left to catch all the values.",
  "Too many values to unpack. Count the items and match with variables.",
  "The number of values doesn't match the number of variables. Add more."
],
value_unpack_few: [
  "Not enough values to unpack. Check the length of your data.",
  "There are fewer values than variables. Reduce the variables.",
  "Unpacking mismatch! Not enough items for all the variables.",
  "Check the length of what you're unpacking. It's shorter than expected.",
  "You have more variables than values. Remove some variables.",
  "The data is shorter than the number of variables. Count again."
],
value_gen: [
  "The value isn't valid for this operation. Double check your input.",
  "Value error! The input doesn't fit what the function expects.",
  "Oops, Python received the right type but a bad value.",
  "Check the value you're passing in. It doesn't quite fit.",
  "That's a value error. The data doesn't meet the requirements.",
  "Something's wrong with the value, not the type. Check your data."
],

// ═══════ INDEXERROR — 24 lines ═══════
index_list: [
  "List index out of range. Indexing starts at zero!",
  "You're reaching beyond the list. Check its length with len.",
  "That index doesn't exist in the list. Lists start counting at zero.",
  "The list is shorter than you think. Use len to check.",
  "Oops, that position doesn't exist in the list.",
  "Index too high! A list of five items has indices zero through four.",
  "You reached past the end of the list. Check your index.",
  "List index out of range. Try printing len of your list first."
],
index_tuple: [
  "Tuple index out of range. Check the length before accessing.",
  "That index doesn't exist in the tuple. Count the elements.",
  "You're trying to access a position that doesn't exist in the tuple.",
  "The tuple is shorter than you expected. Check with len.",
  "Oops, tuple index out of range. Remember, counting starts at zero.",
  "That tuple doesn't have that many elements. Verify the index.",
  "Index too high for this tuple. Check its actual length.",
  "Tuple indexing starts at zero. Adjust your index."
],
index_str: [
  "String index out of range. The string is shorter than your index.",
  "You're trying to access a character that doesn't exist in the string.",
  "That position doesn't exist in the string. Check its length.",
  "The string isn't long enough for that index. Use len to check.",
  "Oops, you went past the end of the string.",
  "String index out of bounds. Remember, indexing starts at zero.",
  "That character position doesn't exist. The string is too short.",
  "Check the string length before accessing by index."
],

// ═══════ KEYERROR — 20 lines ═══════
key_dynamic: [
  "Key error! I don't see the key KEY in this dictionary.",
  "The dictionary doesn't have a key named KEY. Check spelling.",
  "Hmm, KEY is missing. Try using the get method instead.",
  "Python couldn't find KEY. Make sure you typed it correctly.",
  "Wait, KEY isn't in the dictionary. Check the keys you added.",
  "No key named KEY exists. Did you misspell it?",
  "KEY not found! Use dot get method to safely access dictionary keys.",
  "That dictionary doesn't contain KEY. Verify the key name.",
  "Check if KEY was actually added to the dictionary.",
  "The key KEY doesn't exist. Keys are case-sensitive in Python."
],
key_gen: [
  "That key doesn't exist in your dictionary. Check for typos.",
  "Key error! Check the spelling of your dictionary key.",
  "Hmm, the dictionary is missing that key. Try the get method.",
  "Python couldn't find that key. Make sure it was added.",
  "Double check the keys in your dictionary.",
  "Use the get method to avoid key errors. It returns None if missing.",
  "That key was never added to the dictionary. Verify your data.",
  "Key not found! Print your dictionary keys to see what's available.",
  "Check if you're using the right key name and capitalization.",
  "Dictionary keys are case-sensitive. Double check the case."
],

// ═══════ ATTRIBUTEERROR — 28 lines ═══════
attr_dynamic: [
  "Oops, a OBJ object doesn't have a method named ATTR.",
  "You can't use ATTR on a OBJ. Check your data type.",
  "Wait, ATTR doesn't exist for OBJ. Did you misspell it?",
  "Attribute error! OBJ does not support ATTR.",
  "Check the documentation. OBJ objects don't have ATTR.",
  "OBJ doesn't have ATTR. Are you using the right method?",
  "ATTR isn't available for OBJ type. Check what methods it supports.",
  "That method ATTR doesn't exist on OBJ objects."
],
attr_none: [
  "You're calling a method on None. Something returned None unexpectedly.",
  "NoneType error! A previous operation returned None instead of a value.",
  "Oops, you got None where you expected an object. Check the assignment.",
  "Methods like sort and append return None. Don't assign their result.",
  "Something is None that shouldn't be. Check your return statements.",
  "That variable is None. A function probably returned None instead of data.",
  "NoneType has no methods. Find where your variable became None.",
  "Check if a function you called actually returns a value or just modifies in place."
],
attr_misspell: [
  "Did you misspell the method name? Check the exact spelling.",
  "That method name looks wrong. Common ones: append, extend, remove.",
  "Hmm, method not found. Did you mean append instead of appned?",
  "Close! But the method name has a typo. Check each letter.",
  "That's not a valid method. Check Python docs for available methods."
],
attr_gen: [
  "This object doesn't have that method. Check the data type.",
  "Attribute error! That method doesn't exist for this type.",
  "Oops, check what type of object you're working with.",
  "That object doesn't support this property.",
  "The method you're calling isn't valid here. Check the type.",
  "Double check the method name. It might be misspelled.",
  "Not all types have the same methods. Verify your object type."
],

// ═══════ INDENTATIONERROR — 18 lines ═══════
indent_unexpected: [
  "Python found an unexpected indent. Remove the extra spaces.",
  "That line has too much indentation. Pull it back.",
  "Unexpected indent! Check the spacing at the start of the line.",
  "This line is indented when it shouldn't be. Remove extra spaces.",
  "Oops, unexpected indentation. Align this line with the block above.",
  "Too much whitespace at the start. Remove the extra indentation."
],
indent_expected: [
  "Python expects indented code here. Add four spaces after the colon.",
  "After if, for, or def, the next line must be indented.",
  "Missing indentation! Add four spaces at the start of the next line.",
  "Python needs indented code after that colon. Indent with four spaces.",
  "The code after a colon must be indented. That's how Python knows it's a block.",
  "Expected indentation! Every block after a colon needs to be indented."
],
indent_mismatch: [
  "Your indentation doesn't line up. Use the same number of spaces.",
  "Indentation mismatch! All lines in a block need the same spacing.",
  "Your spaces don't match. Stick to four spaces per level.",
  "The indent levels are inconsistent. Pick one style and keep it.",
  "Misaligned indentation. Make sure each block uses exactly four spaces.",
  "Your indentation is uneven. Align all lines in the same block."
],

// ═══════ ZERODIVISIONERROR — 12 ═══════
zero: [
  "You're dividing by zero! That's mathematically impossible.",
  "Oops, zero division error. Your denominator is zero.",
  "Can't divide by zero. Add a check before dividing.",
  "Zero division! Make sure the divisor isn't zero.",
  "The number you're dividing by turned out to be zero.",
  "Add an if-statement to check for zero before dividing.",
  "Python can't divide by zero. Check your math logic.",
  "Division by zero detected. Guard against this with an if check.",
  "Hmm, your denominator became zero. That's not allowed.",
  "Zero division error. This applies to regular division and modulo too.",
  "You can't use modulo with zero either. Check your divisor.",
  "Make sure no path in your code leads to dividing by zero."
],

// ═══════ IMPORTERROR — 12 ═══════
import_err: [
  "That module isn't available in the browser. Some libraries aren't installed.",
  "Oops, Python can't find that library. Check the spelling.",
  "Module not found. Make sure you typed the library name correctly.",
  "Import error! That module isn't available right now.",
  "Did you misspell the import? Check the module name.",
  "Double check your imports. Python can't locate that package.",
  "That library isn't installed in this environment.",
  "Import failed. This might be a browser limitation for external packages.",
  "Module not available. Try using Python's built-in alternatives.",
  "That package isn't accessible here. Stick to built-in modules.",
  "Check the exact module name. Python imports are case-sensitive.",
  "Some popular libraries aren't available in the browser Python."
],

// ═══════ REMAINING ERRORS — ~120 lines total ═══════
unbound: [
  "You're using a variable before assigning it inside a function.",
  "Unbound local error! Assign the variable before using it.",
  "That variable is referenced before assignment in this function.",
  "Use the global keyword if you need the outer variable inside a function.",
  "The variable exists outside but isn't accessible inside. Use global.",
  "Hmm, Python thinks this is a local variable but it hasn't been assigned yet.",
  "If you modify a variable inside a function, Python treats it as local.",
  "Add global at the top of your function if you need the outer variable.",
  "This is a scope issue. The variable isn't defined locally yet.",
  "Assign the variable before using it, or declare it as global."
],
recursion: [
  "Your function calls itself forever. Add a base case.",
  "Maximum recursion depth exceeded! You need a stopping condition.",
  "Infinite recursion detected. Make sure the function stops calling itself.",
  "Add a base case to your recursive function. Without it, it runs forever.",
  "Your recursion never stops. Add an if-statement that returns without calling itself.",
  "Recursion error! Every recursive function needs a base case.",
  "The function keeps calling itself. Check your base case logic.",
  "Stack overflow from too much recursion. Fix the stopping condition.",
  "Make sure your recursive call moves toward the base case.",
  "Your base case might not be triggering. Check the condition."
],
tab: [
  "You're mixing tabs and spaces. Python doesn't allow that.",
  "Tab error! Use only spaces for indentation. Four per level.",
  "Hmm, mixing tabs and spaces. Pick one and stick with it.",
  "Python detected both tabs and spaces. Convert everything to spaces.",
  "Tab versus space conflict. Use four spaces per indent level.",
  "Your editor might be inserting tabs. Switch to spaces only.",
  "Mixed indentation detected. Standardize to four spaces everywhere.",
  "Tab error! Configure your editor to use spaces instead of tabs."
],
file_err: [
  "File not found. This runs in your browser, not your local computer.",
  "That file doesn't exist in the browser environment.",
  "File handling is limited in the browser. Use sample data in code.",
  "File not found! Create your data directly in the code instead.",
  "The file system isn't accessible from the browser.",
  "You can't read local files here. Define your data as variables.",
  "File operations are limited online. Try creating data inline.",
  "That path doesn't exist in the browser. Use strings or lists for data."
],
eof: [
  "The input function doesn't work in the browser. Assign values directly.",
  "Input isn't supported here. Set your variable with equals instead.",
  "Can't use input in this notebook. Hardcode the value instead.",
  "EOF error! Replace input with a direct assignment.",
  "The browser can't handle keyboard input. Define the value in code.",
  "Instead of input, just write my_variable equals your value.",
  "Input prompts don't work online. Assign the value directly.",
  "Replace input with a hardcoded value for this exercise."
],
permission: [
  "Permission denied. The browser limits file access for security.",
  "You don't have permission for that operation in the browser.",
  "Access denied! This is a browser security restriction.",
  "Permission error. Try a different approach that doesn't need file access.",
  "The browser restricts certain operations. Use in-memory data instead.",
  "That operation requires permissions not available in the browser."
],
stop_iter: [
  "The iterator ran out of items. No more values to give.",
  "StopIteration! The sequence has been fully consumed.",
  "You called next on an exhausted iterator.",
  "There are no more items left. The iterator is done.",
  "The generator has yielded all its values.",
  "Use a for loop instead of manual next calls to avoid this.",
  "StopIteration means there's nothing left to iterate over.",
  "Wrap next calls in a try-except to handle the end of iteration."
],
overflow: [
  "That number is too large for this operation.",
  "Overflow error! The value exceeded the allowed range.",
  "The calculation produced a number too big to handle.",
  "Try using a smaller value. This one overflowed.",
  "The result is too large. Check your math logic.",
  "Overflow! Python integers are unlimited, but float has limits."
],
assert_err: [
  "An assertion failed. The condition evaluated to False.",
  "Oops, the assert statement failed. Check your logic.",
  "Assertion error! The condition you tested isn't True.",
  "Your assert caught a problem. The condition is False.",
  "The assertion check didn't pass. Review the condition.",
  "Assert failed! Double check the values being compared.",
  "Your test condition returned False. Debug the values.",
  "The assertion detected an incorrect state. Check your variables."
],
runtime: [
  "A runtime error occurred. Check your code logic.",
  "Runtime error! Something went wrong during execution.",
  "Hmm, a runtime issue. Look for logical errors in your code.",
  "The code structure is fine, but there's a runtime problem.",
  "Runtime error detected. Check for edge cases in your logic.",
  "Something unexpected happened during execution. Review your code.",
  "A general runtime error. Try simplifying your code to find the issue.",
  "Runtime failure. Check if you're modifying a collection while iterating."
],
not_impl: [
  "This method hasn't been implemented yet. Override it in your class.",
  "NotImplementedError! This is a placeholder. Write the actual code.",
  "That method needs to be implemented. It's just a stub right now.",
  "The base class left this for you to implement. Override it.",
  "This is intentionally not implemented. You need to write the code.",
  "Override this method in your subclass with actual logic."
],
unicode: [
  "There's an encoding issue. Try using UTF-8.",
  "Unicode error! Check for special characters in your strings.",
  "Encoding mismatch. Specify the correct encoding explicitly.",
  "Your text has characters that can't be encoded. Use UTF-8.",
  "Unicode decode error. The file encoding doesn't match.",
  "Try opening the file with encoding equals UTF-8."
],
memory: [
  "Your code ran out of memory. Check for infinite loops.",
  "Memory error! You might be creating very large data structures.",
  "The program needs too much memory. Simplify your approach.",
  "Check for infinite loops or unnecessarily large lists.",
  "Memory exhausted. Are you accidentally creating infinite data?",
  "Your data structure grew too large. Use generators instead of lists."
],
regex: [
  "Regex pattern error. Check your regular expression syntax.",
  "The regex pattern has a syntax error. Check special characters.",
  "Invalid regex! Escape special characters with a backslash.",
  "Your regular expression pattern is malformed. Check the brackets.",
  "Regex error! Make sure character classes are properly closed.",
  "The pattern isn't valid. Use raw strings for regex patterns.",
  "Check your regex for unmatched parentheses or brackets.",
  "Regex syntax error. Special characters need escaping with backslash.",
  "Use a raw string prefix r for your regex pattern.",
  "The regex quantifier is invalid. Check your plus, star, or question marks."
],
timeout: [
  "Your code seems to be running forever. Check for infinite loops.",
  "Possible infinite loop detected. Make sure your loop can exit.",
  "The code is taking too long. Check your while loop condition.",
  "Infinite loop! Your loop condition might never become False.",
  "Timeout! Make sure your loop has a proper exit condition.",
  "The loop never stops. Double check the condition and the increment.",
  "Your while loop might run forever. Add a break condition.",
  "Infinite loop detected. Verify that your counter is being updated."
],
fallback: [
  "Something went wrong. Read the last line of the error message carefully.",
  "Oops, an error occurred. Fix the issue shown in red and try again.",
  "Hmm, Python threw an error. Look at the bottom line for clues.",
  "Check your code again. That didn't run correctly.",
  "Wait, there's an error. Read the red text carefully.",
  "An unexpected error occurred. The error message has the details.",
  "Read the error output carefully. Python tells you exactly what went wrong.",
  "Something broke. Focus on the last line of the error for the key information.",
  "Error detected. Check the traceback for the specific line number.",
  "Hmm, that didn't work. The error message is your best friend here.",
  "An error occurred. Try to understand the message before fixing it.",
  "Check the error type and message. They tell you exactly what happened."
]
};

  // ── 3-Back Anti-Repeat Memory ──
  const spokenHistory = new Map();
  function smartPick(category, arr) {
    if (!arr || arr.length <= 1) return arr ? arr[0] : '';
    const history = spokenHistory.get(category) || [];
    let choice, attempts = 0;
    do {
      choice = arr[(Math.random() * arr.length) | 0];
      attempts++;
    } while (history.includes(choice) && attempts < 15);
    history.push(choice);
    if (history.length > 3) history.shift();
    spokenHistory.set(category, history);
    return choice;
  }

  const pick = a => a[(Math.random() * a.length) | 0];

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: ERROR HINT ENGINE (Smart Sub-Routing + Regex)
  // ═══════════════════════════════════════════════════════════════════
  function hint(msg) {
    const lo = msg.toLowerCase();
    const E = ERROR_DATA;

    // Dynamic regex extractors
    const nameMatch = msg.match(/NameError: name '([^']+)' is not defined/i);
    const attrMatch = msg.match(/AttributeError: '([^']+)' object has no attribute '([^']+)'/i);
    const keyMatch = msg.match(/KeyError: ['\"](.*?)['\"]|KeyError: (\d+)/i);
    const typeMatch = msg.match(/TypeError: (.*)/i);
    const valMatch = msg.match(/ValueError: invalid literal for .+ '([^']+)'/i);

    // SyntaxError (8 sub-routes)
    if (lo.includes('syntaxerror')) {
      if (lo.includes('eol while scanning') || lo.includes('unterminated string'))
        return smartPick('syntax_str', E.syntax_str);
      if (lo.includes('unexpected eof') || lo.includes('was never closed') || lo.includes('unmatched'))
        return smartPick('syntax_bracket', E.syntax_bracket);
      if (lo.includes("expected ':'") || lo.includes('expected colon'))
        return smartPick('syntax_colon', E.syntax_colon);
      if (lo.includes('invalid character') || lo.includes('unexpected character'))
        return smartPick('syntax_char', E.syntax_char);
      if (lo.includes('missing parentheses') && lo.includes('print'))
        return smartPick('syntax_print', E.syntax_print);
      if (lo.includes('f-string'))
        return smartPick('syntax_fstring', E.syntax_fstring);
      if (lo.includes('cannot assign') || lo.includes('cannot use assignment'))
        return smartPick('syntax_assign', E.syntax_assign);
      if (lo.includes('return outside') || lo.includes('break outside') || lo.includes("'continue' not"))
        return smartPick('syntax_scope', E.syntax_scope);
      return smartPick('syntax_gen', E.syntax_gen);
    }

    // IndentationError (3 sub-routes)
    if (lo.includes('indentationerror')) {
      if (lo.includes('unexpected indent')) return smartPick('indent_un', E.indent_unexpected);
      if (lo.includes('expected an indented')) return smartPick('indent_exp', E.indent_expected);
      if (lo.includes('unindent does not match')) return smartPick('indent_mis', E.indent_mismatch);
      return smartPick('indent_un', E.indent_unexpected);
    }

    // TabError
    if (lo.includes('taberror')) return smartPick('tab', E.tab);

    // NameError (dynamic + typo + general)
    if (nameMatch) {
      const n = nameMatch[1];
      return smartPick('name_dyn', E.name_dynamic.map(s => s.replace(/VAR/g, n)));
    }
    if (lo.includes('nameerror')) {
      // Check common typos
      if (lo.includes('pritn') || lo.includes('pirnt') || lo.includes('prit') ||
          lo.includes('retrun') || lo.includes('ture') || lo.includes('flase') ||
          lo.includes('lenght') || lo.includes('defien') || lo.includes('inpt'))
        return smartPick('name_typo', E.name_typo);
      return smartPick('name_gen', E.name_gen);
    }

    // TypeError (6 sub-routes)
    if (lo.includes('typeerror')) {
      if (lo.includes('can only concatenate str') || (lo.includes('unsupported operand') && lo.includes('str')))
        return smartPick('type_concat', E.type_concat);
      if (lo.includes('is not callable'))
        return smartPick('type_callable', E.type_callable);
      if (lo.includes('positional argument') || (lo.includes('missing') && lo.includes('required')))
        return smartPick('type_args', E.type_args);
      if (lo.includes('is not subscriptable'))
        return smartPick('type_subscript', E.type_subscript);
      if (lo.includes('is not iterable'))
        return smartPick('type_iterable', E.type_iterable);
      if (lo.includes('unhashable'))
        return smartPick('type_unhashable', E.type_unhashable);
      if (typeMatch) {
        const t = typeMatch[1].replace(/['\"/]/g, '');
        return smartPick('type_dyn', E.type_gen.map(s => s + ' ' + t));
      }
      return smartPick('type_gen', E.type_gen);
    }

    // ValueError (4 sub-routes)
    if (lo.includes('valueerror')) {
      if (lo.includes('invalid literal')) return smartPick('val_lit', E.value_literal);
      if (lo.includes('too many values')) return smartPick('val_many', E.value_unpack_many);
      if (lo.includes('not enough values')) return smartPick('val_few', E.value_unpack_few);
      return smartPick('val_gen', E.value_gen);
    }

    // IndexError (3 sub-routes)
    if (lo.includes('indexerror')) {
      if (lo.includes('list')) return smartPick('idx_list', E.index_list);
      if (lo.includes('tuple')) return smartPick('idx_tuple', E.index_tuple);
      if (lo.includes('string')) return smartPick('idx_str', E.index_str);
      return smartPick('idx_list', E.index_list);
    }

    // KeyError (dynamic + general)
    if (keyMatch) {
      const k = keyMatch[1] || keyMatch[2];
      return smartPick('key_dyn', E.key_dynamic.map(s => s.replace(/KEY/g, k)));
    }
    if (lo.includes('keyerror')) return smartPick('key_gen', E.key_gen);

    // AttributeError (dynamic + NoneType + misspell + general)
    if (attrMatch) {
      const obj = attrMatch[1], attr = attrMatch[2];
      return smartPick('attr_dyn', E.attr_dynamic.map(s => s.replace(/OBJ/g, obj).replace(/ATTR/g, attr)));
    }
    if (lo.includes('attributeerror')) {
      if (lo.includes("'nonetype'")) return smartPick('attr_none', E.attr_none);
      if (lo.includes('appned') || lo.includes('apped') || lo.includes('extnend'))
        return smartPick('attr_mis', E.attr_misspell);
      return smartPick('attr_gen', E.attr_gen);
    }

    // ZeroDivisionError
    if (lo.includes('zerodivisionerror')) return smartPick('zero', E.zero);

    // ImportError / ModuleNotFoundError
    if (lo.includes('importerror') || lo.includes('modulenotfounderror') || lo.includes('no module named'))
      return smartPick('import', E.import_err);

    // UnboundLocalError
    if (lo.includes('unboundlocalerror')) return smartPick('unbound', E.unbound);

    // RecursionError
    if (lo.includes('recursionerror') || lo.includes('maximum recursion'))
      return smartPick('recurse', E.recursion);

    // StopIteration
    if (lo.includes('stopiteration')) return smartPick('stop', E.stop_iter);

    // OverflowError
    if (lo.includes('overflowerror')) return smartPick('overflow', E.overflow);

    // AssertionError
    if (lo.includes('assertionerror')) return smartPick('assert', E.assert_err);

    // RuntimeError
    if (lo.includes('runtimeerror')) return smartPick('runtime', E.runtime);

    // NotImplementedError
    if (lo.includes('notimplementederror')) return smartPick('notimpl', E.not_impl);

    // FileNotFoundError
    if (lo.includes('filenotfounderror') || lo.includes('no such file'))
      return smartPick('file', E.file_err);

    // PermissionError
    if (lo.includes('permissionerror')) return smartPick('perm', E.permission);

    // EOFError
    if (lo.includes('eoferror')) return smartPick('eof', E.eof);

    // UnicodeError
    if (lo.includes('unicodeerror') || lo.includes('unicodedecodeerror') || lo.includes('unicodeencodeerror'))
      return smartPick('unicode', E.unicode);

    // MemoryError
    if (lo.includes('memoryerror')) return smartPick('memory', E.memory);

    // re.error (Regex)
    if (lo.includes('re.error') || lo.includes('bad character range') || lo.includes('unterminated subpattern'))
      return smartPick('regex', E.regex);

    // Timeout / Infinite loop
    if (lo.includes('timeout') || lo.includes('infinite') || lo.includes('execution time'))
      return smartPick('timeout', E.timeout);

    // Fallback
    return smartPick('fallback', E.fallback);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: PREMIUM VOICE SELECTION ENGINE
  // Priority: Microsoft Natural > Google Premium > Standard
  //
  // Microsoft Edge has "Natural" voices (Jenny, Aria, Guy) that are
  // neural TTS and sound nearly indistinguishable from a real person.
  // Chrome has "Google UK English Female" which is also very clean.
  // ═══════════════════════════════════════════════════════════════════
  function loadVoices() {
    if (voicesReady || !window.speechSynthesis) return;
    const all = speechSynthesis.getVoices();
    if (!all.length) return;
    voicesReady = true;

    // Tiered priority — Indian English first, then premium fallbacks
    const tiers = [
      // Tier 1: Indian English Natural voices (Edge) — best for Indian students
      v => /natural/i.test(v.name) && /neerja|prabhat/i.test(v.name) && v.lang.startsWith('en'),
      v => /natural/i.test(v.name) && v.lang.startsWith('en-IN'),
      v => /online/i.test(v.name) && v.lang.startsWith('en-IN'),
      v => v.lang.startsWith('en-IN'),
      // Tier 2: Microsoft Natural voices (Edge) — near-human quality
      v => /natural/i.test(v.name) && /jenny|aria|ana|sonia/i.test(v.name) && v.lang.startsWith('en'),
      v => /natural/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 3: Microsoft Online voices (Edge) — high quality
      v => /online/i.test(v.name) && /zira|hazel|susan/i.test(v.name) && v.lang.startsWith('en'),
      v => /online/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 4: Google Premium voices (Chrome)
      v => /google/i.test(v.name) && /uk english female/i.test(v.name),
      v => /google/i.test(v.name) && /us english/i.test(v.name),
      v => /google/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 5: Apple voices (Safari)
      v => /samantha|karen|moira|fiona|victoria/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 6: Any female-sounding English voice
      v => /female/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 7: Any English
      v => v.lang.startsWith('en-US'),
      v => v.lang.startsWith('en-GB'),
      v => v.lang.startsWith('en'),
    ];

    for (const test of tiers) {
      const found = all.find(test);
      if (found) {
        voice = found;
        console.log('Mano Voice: Selected "' + found.name + '" (' + found.lang + ')');
        return;
      }
    }
    voice = all[0];
    console.log('Mano Voice: Fallback to "' + voice.name + '"');
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: NATURAL SPEECH DELIVERY
  // Rate varies by context: celebrations are punchier, errors are slower.
  // Pitch stays at 1.0 to avoid the "robot" effect.
  // ═══════════════════════════════════════════════════════════════════
  function say(text, rate) {
    if (muted || !window.speechSynthesis) return;
    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate || RATE_NORMAL;
    u.pitch = PITCH;
    u.volume = 1;
    if (voice) u.voice = voice;

    u.onstart = () => { if (muteBtn) muteBtn.classList.add('mano-speaking'); };
    u.onend = () => { if (muteBtn) muteBtn.classList.remove('mano-speaking'); };
    u.onerror = () => { if (muteBtn) muteBtn.classList.remove('mano-speaking'); };

    speechSynthesis.speak(u);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: VISUAL FEEDBACK
  // ═══════════════════════════════════════════════════════════════════
  function toast(cellId, msg, icon, cls) {
    const old = document.querySelector('.mano-toast');
    if (old) old.remove();
    clearTimeout(toastTimer);

    const cell = document.getElementById(cellId);
    if (!cell) return;

    const el = document.createElement('div');
    el.className = 'mano-toast ' + cls;
    el.innerHTML = '<span class="mano-toast-icon">' + icon + '</span><span class="mano-toast-text">' + msg + '</span>';
    cell.style.position = 'relative';
    cell.appendChild(el);

    requestAnimationFrame(() => el.classList.add('mano-toast-visible'));

    toastTimer = setTimeout(() => {
      el.classList.remove('mano-toast-visible');
      setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    }, TOAST_MS);
  }

  function glow(cellId, cls) {
    const cell = document.getElementById(cellId);
    if (!cell) return;
    cell.classList.remove('mano-glow-correct', 'mano-glow-partial', 'mano-glow-error', 'mano-glow-streak');
    cell.classList.add(cls);
    setTimeout(() => cell.classList.remove(cls), 2000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: MUTE BUTTON
  // ═══════════════════════════════════════════════════════════════════
  function injectUI() {
    if (document.getElementById('manoMuteBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'manoMuteBtn';
    btn.className = 'mano-mute-btn' + (muted ? ' mano-muted' : '');
    btn.setAttribute('aria-label', 'Toggle Mano voice assistant');
    btn.title = 'Mano Voice Assistant';
    btn.textContent = muted ? '🔇' : '🔊';
    btn.addEventListener('click', toggleMute, { passive: true });
    document.body.appendChild(btn);
    muteBtn = btn;
  }

  function toggleMute() {
    muted = !muted;
    try { localStorage.setItem('mano_voice_muted', muted ? '1' : '0'); } catch(e) {}
    if (muteBtn) {
      muteBtn.textContent = muted ? '🔇' : '🔊';
      muteBtn.classList.toggle('mano-muted', muted);
    }
    if (muted && window.speechSynthesis) speechSynthesis.cancel();
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: PUBLIC API (v4.0 — 20 categories)
  // ═══════════════════════════════════════════════════════════════════

  function sessionWelcome() {
    if (sessionGreeted) return;
    sessionGreeted = true;
    const h = new Date().getHours();
    const R = VOICE_DATA;
    let line;
    if (h >= 6 && h < 12) line = smartPick('greet_m', R.welcome_morning);
    else if (h >= 12 && h < 17) line = smartPick('greet_a', R.welcome_afternoon);
    else line = smartPick('greet_e', R.welcome_evening);

    // Check if returning user
    try {
      const last = localStorage.getItem('mano_last_session');
      if (last) {
        const diff = Date.now() - parseInt(last);
        if (diff > 3600000) line = smartPick('return', R.returnWelcome);
      }
      localStorage.setItem('mano_last_session', String(Date.now()));
    } catch(e) {}

    setTimeout(() => say(line, RATE_NORMAL), 1500);
  }

  function onCorrect(cellId) {
    streak++;
    correctCount++;
    sessionSolves++;
    const R = VOICE_DATA;
    let line, icon, msg, rate = RATE_CELEBRATE;

    // Check if persistence victory (solved after 3+ failed attempts)
    const attempts = attemptCounts[cellId] || 0;
    if (attempts >= 3) {
      line = smartPick('persist', R.persist);
      icon = '🎉'; msg = 'You did it!';
      glow(cellId, 'mano-glow-streak');
      toast(cellId, msg, icon, 'mano-toast-streak');
      attemptCounts[cellId] = 0;
      say(line, rate);
      return;
    }

    // Check speed praise (solved within 15 seconds)
    const runTime = runTimestamps[cellId];
    if (runTime && (Date.now() - runTime) < 15000 && correctCount > 2) {
      line = smartPick('speed', R.speed);
      icon = '⚡'; msg = 'Lightning fast!';
      glow(cellId, 'mano-glow-correct');
      toast(cellId, msg, icon, 'mano-toast-correct');
      say(line, rate);
      return;
    }

    // Streak celebrations
    if (streak === 3) {
      line = smartPick('s3', R.s3); icon = '🔥'; msg = '3 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 5) {
      line = smartPick('s5', R.s5); icon = '🔥'; msg = '5 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 7) {
      line = smartPick('s7', R.s7); icon = '🔥'; msg = '7 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 10) {
      line = smartPick('s10', R.s10); icon = '⚡'; msg = '10 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 15) {
      line = smartPick('s15', R.s15); icon = '💎'; msg = '15 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 20) {
      line = smartPick('s20', R.s20); icon = '👑'; msg = '20 in a row!';
      glow(cellId, 'mano-glow-streak'); toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (correctCount === 1) {
      line = smartPick('first', R.first); icon = '✅'; msg = 'First one solved!';
      glow(cellId, 'mano-glow-correct'); toast(cellId, msg, icon, 'mano-toast-correct');
    } else {
      line = smartPick('ok', R.ok); icon = '✅'; msg = 'Correct!';
      glow(cellId, 'mano-glow-correct'); toast(cellId, msg, icon, 'mano-toast-correct');
    }

    // Long session praise every 30 solves
    if (sessionSolves > 0 && sessionSolves % 30 === 0) {
      line = smartPick('long', R.longSession);
    }

    // Learning tip every 10 correct answers
    if (correctCount > 0 && correctCount % 10 === 0 && streak < 3) {
      setTimeout(() => say(smartPick('tip', R.tips), RATE_NORMAL), 4000);
    }

    say(line, rate);
    attemptCounts[cellId] = 0;
  }

  function onPartial(cellId, type) {
    const hadStreak = streak >= 3;
    streak = 0;
    const R = VOICE_DATA;
    let line, icon, msg;

    if (type === 'no_output') {
      line = smartPick('noOut', R.noOut); icon = '💡'; msg = 'No output — try print()';
      glow(cellId, 'mano-glow-partial'); toast(cellId, msg, icon, 'mano-toast-partial');
    } else {
      line = smartPick('close', R.close); icon = '🤔'; msg = 'Almost there!';
      glow(cellId, 'mano-glow-partial'); toast(cellId, msg, icon, 'mano-toast-partial');
    }
    say(hadStreak ? smartPick('brk', R.brk) + '. ' + line : line, RATE_NORMAL);
  }

  function onWrong(cellId) {
    const hadStreak = streak >= 3;
    streak = 0;
    const R = VOICE_DATA;
    const line = smartPick('wrong', R.wrong);
    glow(cellId, 'mano-glow-error');
    toast(cellId, 'Re-read the question', '❌', 'mano-toast-error');
    say(hadStreak ? smartPick('brk', R.brk) + '. ' + line : line, RATE_NORMAL);
  }

  function onError(cellId, errorMsg) {
    const hadStreak = streak >= 3;
    streak = 0;
    const R = VOICE_DATA;

    // Track attempts for struggle detection
    attemptCounts[cellId] = (attemptCounts[cellId] || 0) + 1;
    const attempts = attemptCounts[cellId];

    const h = hint(errorMsg);
    const errType = (errorMsg.match(/^(\w*Error)/m) || ['Error'])[0];
    glow(cellId, 'mano-glow-error');
    toast(cellId, errType + ' — listen for hint', '🐛', 'mano-toast-error');

    let spoken = hadStreak ? smartPick('brk', R.brk) + '. ' + h : h;

    // Struggle encouragement
    if (attempts === 3) {
      spoken = smartPick('str3', R.struggle3) + '. ' + h;
    } else if (attempts === 5) {
      spoken = smartPick('str5', R.struggle5) + '. ' + h;
    } else if (attempts >= 7) {
      spoken = smartPick('str7', R.struggle7);
    }

    // Debugging guidance on 2nd error of same question
    if (attempts === 2) {
      setTimeout(() => say(smartPick('debug', R.debug), RATE_SLOW), 5000);
    }

    say(spoken, RATE_ERROR);
  }

  function onHintClick(cellId, hintLevel) {
    const R = VOICE_DATA;
    let line;
    if (hintLevel <= 1) line = smartPick('h1', R.hint1);
    else if (hintLevel === 2) line = smartPick('h2', R.hint2);
    else line = smartPick('h3', R.hint3);
    say(line, RATE_NORMAL);
  }

  function onCodeQuality(cellId, code) {
    const R = VOICE_DATA;
    if (/f["']/.test(code) || /f\{/.test(code)) {
      setTimeout(() => say(smartPick('qf', R.quality_fstring), RATE_CELEBRATE), 2000);
    } else if (/\[.*\bfor\b.*\bin\b/.test(code)) {
      setTimeout(() => say(smartPick('qc', R.quality_comp), RATE_CELEBRATE), 2000);
    } else if (code.includes('#')) {
      if (Math.random() < 0.3) setTimeout(() => say(smartPick('qm', R.quality_comments), RATE_CELEBRATE), 2000);
    }
  }

  function checkMilestone(solved, total) {
    if (total <= 0) return;
    const R = VOICE_DATA;
    const q1 = Math.ceil(total * 0.25);
    const q2 = Math.ceil(total * 0.5);
    const q3 = Math.ceil(total * 0.75);

    if (solved === q1 && lastMilestone < q1) {
      lastMilestone = q1;
      say(smartPick('ms_q', R.quarter), RATE_CELEBRATE);
    } else if (solved === q2 && lastMilestone < q2) {
      lastMilestone = q2;
      say(smartPick('ms_h', R.half), RATE_CELEBRATE);
    } else if (solved === q3 && lastMilestone < q3) {
      lastMilestone = q3;
      say(smartPick('ms_3q', R.three_quarter), RATE_CELEBRATE);
    } else if (solved === total && lastMilestone < total) {
      lastMilestone = total;
      say(smartPick('ms_d', R.done), RATE_CELEBRATE);
      const nb = document.querySelector('.notebook');
      if (nb) { nb.classList.add('mano-glow-celebrate'); setTimeout(() => nb.classList.remove('mano-glow-celebrate'), 3000); }
    }
  }

  function trackRunStart(cellId) {
    runTimestamps[cellId] = Date.now();
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: INIT
  // ═══════════════════════════════════════════════════════════════════
  function init() {
    if (!window.speechSynthesis) return;
    try { muted = localStorage.getItem('mano_voice_muted') === '1'; } catch(e) {}

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    injectUI();
    sessionWelcome();

    // Session farewell
    window.addEventListener('beforeunload', () => {
      if (!muted && sessionSolves > 0) {
        const R = VOICE_DATA;
        say(smartPick('bye', R.farewell), RATE_NORMAL);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  return { onCorrect, onPartial, onWrong, onError, onHintClick, onCodeQuality, checkMilestone, trackRunStart, sessionWelcome };
})();
