"""Generate Day08 Control Flow notebook - Part 2: Sections 5-7 + assembly."""
from nb_helpers import *
from day08_part1 import sections_1_to_4
import os

def sections_5_to_7():
    S = []

    # ── SECTION 5: Guard Clauses ──
    S.append((
        SH(5,"Guard Clauses & Early Returns","Professional Logic Design") + '\n\n' +
        WH("A <b>guard clause</b> is an early <code>return</code> (or <code>continue</code>/<code>break</code>) that handles an edge case at the top of a function. This prevents deep nesting (the 'Arrow Anti-Pattern') and keeps the 'happy path' unindented at the bottom.") + '\n\n' +
        "```python\n# ❌ Bad: Nested 'Arrow' code\ndef process(data):\n    if data is not None:\n        if len(data) > 0:\n            # Do actual work here\n            return True\n    return False\n\n# ✅ Good: Guard Clauses\ndef process(data):\n    if not data:           # Guard 1\n        return False\n    if len(data) == 0:     # Guard 2\n        return False\n    \n    # Happy path (unindented!)\n    return True\n```\n\n" +
        WC([("Code Review","Flat code is infinitely easier to read than deeply nested if-statements"),
            ("Data Validation","Validating DataFrame structures at the top of a pipeline step"),
            ("Error Handling","Failing fast saves computation time")]) + '\n\n' +
        PT("Rule of thumb: <b>Fail fast, return early.</b> Handle all your errors, nulls, and edge cases in the first few lines of your function."),
        "def calculate_discount(user, cart_value):\n    # Guard 1: Invalid input\n    if not user or cart_value <= 0:\n        return 0.0\n        \n    # Guard 2: Ineligible tier\n    if user.get('tier') == 'free':\n        return 0.0\n        \n    # Happy Path: Actual business logic\n    if user.get('tier') == 'premium':\n        return cart_value * 0.20\n    \n    return cart_value * 0.05\n\n# Clean, readable execution\nprint(calculate_discount({'tier': 'free'}, 100))     # 0.0\nprint(calculate_discount({'tier': 'premium'}, 100))  # 20.0\n",
        "Guard Clauses",
        [
            '### **Q1.** Rewrite this nested code using guard clauses: `if a: if b: return a+b else: return 0 else: return 0`.\n',
            '### **Q2.** Write a function `divide(a, b)` with a guard clause that returns `None` if `b == 0` to prevent ZeroDivisionError.\n',
            '### **Q3.** Why are guard clauses better than deep nesting? Mention readability and the "happy path".\n',
            '### **Q4.** Write a `process_list(lst)` function. Guard 1: `lst` must be a list. Guard 2: `lst` must not be empty. Return length.\n',
            '### **Q5.** Refactor a loop: instead of `for x in data: if valid(x): process(x)`, write it using a guard clause with `continue`.\n',
        ]
    ))

    # ── SECTION 6: Complex Boolean Logic ──
    S.append((
        SH(6,"Complex Boolean Logic","De Morgan's Laws") + '\n\n' +
        WH("Writing complex <code>if</code> statements often leads to logic bugs. <b>De Morgan's Laws</b> are mathematical rules for simplifying negated boolean expressions. They are essential for refactoring messy conditionals.") + '\n\n' +
        "**De Morgan's Laws:**\n\n"
        "1. `not (A and B)` ≡ `(not A) or (not B)`\n"
        "2. `not (A or B)`  ≡ `(not A) and (not B)`\n\n" +
        "```python\n# ❌ Hard to read:\nif not (age >= 18 and status == 'active'):\n\n# ✅ De Morgan equivalent:\nif age < 18 or status != 'active':\n```\n\n" +
        WC([("Filter Simplification","Refactoring complex pandas queries: `~((df.A > 0) & (df.B == 1))` into `(df.A <= 0) | (df.B != 1)`"),
            ("Bug Prevention","Negated `and`/`or` chains are the #1 source of logic errors in code reviews")]) + '\n\n' +
        PF("Excessive Negation","Avoid double negatives like <code>if not is_invalid:</code>. Name your variables positively: <code>if is_valid:</code>."),
        "age = 16\nhas_permission = True\n\n# Example 1: not (A and B) == not A or not B\n# \"You cannot enter if you are not an adult and you don't have permission\"\n\n# Hard to parse:\nif not (age >= 18 and has_permission):\n    print(\"Access Denied (v1)\")\n\n# Easier to parse (De Morgan):\nif age < 18 or not has_permission:\n    print(\"Access Denied (v2)\")\n\n# Example 2: not (A or B) == not A and not B\nis_weekend = False\nis_holiday = False\n\nif not (is_weekend or is_holiday):\n    print(\"It's a workday\")\n\nif not is_weekend and not is_holiday:\n    print(\"It's a workday (cleaner)\")\n",
        "Boolean Logic",
        [
            '### **Q1.** Apply De Morgan\'s Law to simplify: `not (x > 10 or y < 5)`. Write the equivalent expression.\n',
            '### **Q2.** Simplify this filter logic: `not (user_is_active and account_balance > 0)`. Write the simplified version.\n',
            '### **Q3.** Given `is_admin = False` and `is_owner = False`, write a clean check to see if someone is NOT authorized using `and`.\n',
            '### **Q4.** Why is `if not is_empty:` worse than `if has_data:`? Explain the concept of positive variable naming.\n',
            '### **Q5.** Extract complex logic into a variable: instead of `if age > 18 and (score > 90 or has_recommendation):`, create boolean variables first.\n',
        ]
    ))

    # ── SECTION 7: Exception Handling as Control Flow ──
    S.append((
        SH(7,"Exceptions as Control Flow","EAFP vs LBYL") + '\n\n' +
        WH("Python embraces the <b>EAFP</b> philosophy: <i>Easier to Ask for Forgiveness than Permission</i>. Instead of checking if something is valid before doing it (<b>LBYL</b>: <i>Look Before You Leap</i>), just try it and catch the exception. It is often faster and cleaner.") + '\n\n' +
        "| Approach | Philosophy | Code Example |\n"
        "| :--- | :--- | :--- |\n"
        "| LBYL | Look Before You Leap | `if key in d: val = d[key]` |\n"
        "| EAFP | Ask Forgiveness | `try: val = d[key]`<br>`except KeyError: pass` |\n\n" +
        WC([("Data Parsing","Trying to cast strings to integers: `try: int(val) except ValueError: val = 0`"),
            ("File Operations","Trying to open a file instead of checking if it exists first (which causes race conditions)")]) + '\n\n' +
        PF("Naked Excepts","Never write a bare <code>except:</code>. It catches system-exiting exceptions like <code>KeyboardInterrupt</code> (Ctrl+C). Always specify the exact exception: <code>except ValueError:</code>."),
        "# LBYL: Look Before You Leap (checking types/keys first)\ndata = {'age': '25'}\nif 'age' in data and data['age'].isdigit():\n    age = int(data['age'])\n    print(f'LBYL Age: {age}')\n\n# EAFP: Easier to Ask Forgiveness (Pythonic)\ntry:\n    # Just try the operation!\n    age2 = int(data['age'])\n    print(f'EAFP Age: {age2}')\nexcept (KeyError, ValueError):\n    # Handle the specific failures\n    print('Invalid or missing age')\n\n# EAFP avoids race conditions when dealing with files\n",
        "EAFP vs LBYL",
        [
            '### **Q1.** Write LBYL code to safely divide `a / b` by checking if `b == 0` first.\n',
            '### **Q2.** Rewrite the division using EAFP: wrap `a / b` in a `try` block and catch `ZeroDivisionError`.\n',
            '### **Q3.** Given a list `data = [1, 2, 3]`, use EAFP to safely get `data[5]`. Catch the `IndexError`.\n',
            '### **Q4.** Why is `except Exception:` better than just `except:`, but still not ideal compared to `except ValueError:`?\n',
            '### **Q5.** Explain why EAFP is faster than LBYL when the "happy path" (no error) happens 99% of the time.\n',
        ]
    ))

    return S

TASKS = [
    ("Categorizer", "Write a function `categorize(score)`: >90='A', 80-89='B', 70-79='C', <70='F'. Handle edge cases: negative scores or >100 return 'Invalid'. Use guard clauses."),
    ("API Router", "Write a function `route(payload)` using `match-case`. Match a dict with `{'method': 'GET', 'path': '/users'}` to return 'User List'. Match `{'method': 'POST', 'path': '/users', 'data': d}` to return f'Creating {d}'. Default returns '404'."),
    ("Safe Number Parser", "Write a function `parse_ints(str_list)` that takes `['1', 'two', '3.5', '4']`. Use EAFP (try/except) inside a loop to convert valid integers and ignore strings/floats. Return `[1, 4]`."),
    ("Logic Simplifier", "You have: `if not (user.is_active and not user.is_banned):`. Rewrite this condition applying De Morgan's laws to remove the outer `not` and make it more readable."),
    ("Config Validator", "Write a function `validate(config)` using guard clauses. Config must be a dict. Must have key 'host'. Key 'port' must be int between 1-65535. Return True if valid, False otherwise. No nested ifs."),
]

INTERVIEWS = [
    "Write a function `fizzbuzz(n)` using a dictionary or match-case to avoid chaining multiple elifs.",
    "Explain the difference between `is` and `==` in Python control flow. When MUST you use `is`?",
    "Write a function that uses a `try/except/else/finally` block. Explain what the `else` block does in this context.",
    "Refactor a 3-level nested `if/elif/else` statement into a flat structure using early returns.",
    "Write code demonstrating how an empty list, empty dict, and zero evaluate in a boolean context.",
    "Explain EAFP vs LBYL. Write two functions demonstrating each approach for accessing a dictionary key.",
    "Write a function `evaluate_expression(op, a, b)` using Python 3.10 match-case for operations `+,-,*,/`.",
    "Apply De Morgan's Law to simplify: `if not (file_exists or directory_exists):`.",
    "What is the 'Arrow Anti-Pattern'? Write an example of it and then refactor it using guard clauses.",
    "Write a list comprehension that uses a ternary operator to replace `None` values with `0`.",
    "Explain short-circuit evaluation in `if a and b:`. Write code showing how it prevents a runtime error.",
    "Write a match-case statement that extracts the first and last elements of a list, regardless of its length.",
    "Why is a bare `except:` dangerous? Give an example of an exception it might catch that you don't want it to.",
    "Write a function that uses `match-case` to validate the shape of a JSON response dictionary.",
    "Explain why dictionary dispatch (`func = actions.get(cmd)`) is often preferred over `if/elif` chains for command routing.",
    "Write code showing the difference between `pass`, `continue`, and `break` in control flow loops.",
    "Implement a simple state machine using `match-case`. States: START, RUNNING, PAUSED, STOPPED.",
    "Write a function that safely converts a string to a float using EAFP, returning `None` on failure.",
    "Show how to use the Walrus operator (`:=`) inside an `if` statement to both evaluate and capture a regex match.",
    "Write a ternary expression nested inside another ternary expression. Then explain why you should almost never do this.",
    "Explain how truthy evaluation makes code more Pythonic. Compare `if len(items) == 0:` with `if not items:`.",
    "Write a function `process_data(*args)` that uses match-case to behave differently if given 1, 2, or 3 arguments.",
    "What is the difference between `if x:` and `if x is not None:`? Give an example where they behave differently.",
    "Write a `try/except` block that catches multiple specific exceptions (`ValueError`, `TypeError`) in a single line.",
    "Design a validation function for a user registration payload using guard clauses for email, password length, and age.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Truthy Eval | Empty collections are falsy | Pythonic `if data:` checks |\n"
    "| 2 | Ternary | `x if cond else y` | Inline variable assignment |\n"
    "| 3 | Match-Case | Structural pattern matching (3.10+) | Advanced state routing |\n"
    "| 4 | Dict Matching | Extract variables based on dict shape | JSON payload parsing |\n"
    "| 5 | Guard Clauses | Return early, fail fast | Clean, flat function design |\n"
    "| 6 | De Morgan's | Simplify negated boolean logic | Bug-free complex filters |\n"
    "| 7 | EAFP vs LBYL | Try/except is better than `if` checks | Faster, race-condition-free code |\n"
)

CHECKLIST = (
    "- [ ] I understand truthy/falsy evaluation and avoid `len(x) > 0`.\n"
    "- [ ] I can write single-line ternary expressions for simple assignments.\n"
    "- [ ] I understand how match-case differs from a traditional switch statement.\n"
    "- [ ] I can refactor nested 'Arrow' code into flat code using Guard Clauses.\n"
    "- [ ] I can apply De Morgan's Laws to simplify boolean logic.\n"
    "- [ ] I understand the EAFP philosophy and use specific exceptions.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_4() + sections_5_to_7()
    nb = build(
        day=8, title="Control Flow & Logic",
        obj_text="Control flow is more than just if/else—it's about designing logical pathways that are robust, readable, and Pythonic. Today we master advanced decision-making, from the powerful Python 3.10 match-case syntax to professional software design patterns like Guard Clauses, De Morgan's Laws, and the EAFP exception philosophy.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Truthy Evaluation | `if data:` instead of `len` | Clean null checking |\n"
            "| 2 | Ternary Operator | `a if cond else b` | Inline assignment |\n"
            "| 3 | Match-Case | Structural matching | Complex routing |\n"
            "| 4 | Dict Matching | Shape-based extraction | JSON parsing |\n"
            "| 5 | Guard Clauses | `if error: return` early | Flat code design |\n"
            "| 6 | De Morgan's Laws | Simplifying `not (a and b)` | Logic debugging |\n"
            "| 7 | Exceptions | EAFP (Ask Forgiveness) | Safe execution |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 9 - Loops: Iteration Patterns, Generators, and Itertools"
    )
    save(nb, os.path.join('notebooks', 'Day08_ControlFlow_Blank.ipynb'))
    print("Day 08 generated successfully!")
