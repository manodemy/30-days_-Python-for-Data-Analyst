"""Generate Day02 Operators notebook — Part 2: Sections 6-10 + assembly."""
from nb_helpers import *
from day02_part1 import sections_1_to_5
import os

def sections_6_to_10():
    S = []

    # ── SECTION 6: Bitwise ──
    S.append((
        SH(6,"Bitwise Operators","Binary-Level Control") + '\n\n' +
        WH("Bitwise operators work on the binary (base-2) representation of integers. Python supports: <code>&amp;</code> (AND), <code>|</code> (OR), <code>^</code> (XOR), <code>~</code> (NOT), <code>&lt;&lt;</code> (left shift), <code>&gt;&gt;</code> (right shift).") + '\n\n' +
        "| Operator | Name | Example | Result |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `&` | AND | `5 & 3` | `1` |\n"
        "| `\\|` | OR | `5 \\| 3` | `7` |\n"
        "| `^` | XOR | `5 ^ 3` | `6` |\n"
        "| `~` | NOT | `~5` | `-6` |\n"
        "| `<<` | Left shift | `5 << 1` | `10` |\n"
        "| `>>` | Right shift | `5 >> 1` | `2` |\n\n" +
        WC([("Flag management","Using bitmasks to store multiple boolean flags in one integer"),
            ("Performance","Left shift `<< 1` is faster multiplication by 2"),
            ("Hashing","XOR is used in hash functions and checksums")]) + '\n\n' +
        PT("<code>n &amp; 1</code> checks if <code>n</code> is odd (returns 1) or even (returns 0). <code>n &amp; (n-1)</code> checks if <code>n</code> is a power of 2 (returns 0 if yes)."),
        # demo
        "a, b = 12, 10  # 1100, 1010 in binary\nprint(f'{a} & {b}  = {a & b}')    # 8  (1000)\nprint(f'{a} | {b}  = {a | b}')    # 14 (1110)\nprint(f'{a} ^ {b}  = {a ^ b}')    # 6  (0110)\nprint(f'{a} << 1 = {a << 1}')     # 24 (multiply by 2)\nprint(f'{a} >> 1 = {a >> 1}')     # 6  (divide by 2)\n",
        "Bitwise",
        [
            '### **Q1.** Convert `a = 12` and `b = 10` to binary using `bin()`. Then compute `a & b`, `a | b`, `a ^ b` and verify the results match the binary math.\n',
            '### **Q2.** Write code that uses `<< 1` to multiply by 2 and `>> 1` to divide by 2. Test with `n = 42`. Compare results with `* 2` and `// 2`.\n',
            '### **Q3.** Write a function `is_odd(n)` using `n & 1`. Test with 5 numbers. Explain why this works at the binary level.\n',
            '### **Q4.** Write a function `is_power_of_two(n)` using `n & (n - 1) == 0`. Test with `[1, 2, 3, 4, 8, 16, 18]`. Handle edge case `n <= 0`.\n',
            '### **Q5.** Compute `~5` and explain why the result is `-6`. Relate it to two\'s complement: `~n = -(n+1)`.\n',
        ]
    ))

    # ── SECTION 7: Ternary ──
    S.append((
        SH(7,"Ternary Operator","Inline Conditionals") + '\n\n' +
        WH("The ternary (conditional) operator provides a one-line <code>if-else</code> expression: <code>value_if_true if condition else value_if_false</code>. It is an <b>expression</b> (returns a value), not a statement.") + '\n\n' +
        "```python\nstatus = 'Adult' if age >= 18 else 'Minor'\n```\n\n" +
        WC([("Column creation","`df['label'] = df['val'].apply(lambda x: 'High' if x > 50 else 'Low')`"),
            ("Default handling","`name = input_val if input_val else 'Unknown'`"),
            ("Compact logic","Replace 4-line if/else blocks with clean one-liners")]) + '\n\n' +
        PF("Nested Ternaries","Nesting ternaries like <code>'A' if x > 90 else 'B' if x > 80 else 'C'</code> works but reduces readability. Use sparingly."),
        # demo
        "age = 20\nstatus = 'Adult' if age >= 18 else 'Minor'\nprint(status)  # Adult\n\n# Nested (use sparingly)\nscore = 85\ngrade = 'A' if score >= 90 else 'B' if score >= 80 else 'C' if score >= 70 else 'F'\nprint(f'Score {score} → Grade {grade}')\n",
        "Ternary",
        [
            '### **Q1.** Given `x = -5`, use the ternary operator to compute `abs_x` (absolute value) without using `abs()`. Print the result.\n',
            '### **Q2.** Write a ternary expression that returns `"even"` if `n` is even, `"odd"` otherwise. Test with `n = 7` and `n = 12`.\n',
            '### **Q3.** Use a nested ternary to classify `temp = 35` as `"Cold"` (< 15), `"Warm"` (15-30), or `"Hot"` (> 30). Print the result.\n',
            '### **Q4.** Write a ternary that sets `discount = 0.2 if is_member else 0.05`. Test with `is_member = True` and `is_member = False`.\n',
            '### **Q5.** Use a ternary inside an f-string: `f"You have {n} item{\'s\' if n != 1 else \'\'}"`. Test with `n = 1` and `n = 5`.\n',
        ]
    ))

    # ── SECTION 8: Operator Precedence ──
    S.append((
        SH(8,"Operator Precedence","Order of Evaluation") + '\n\n' +
        WH("When an expression has multiple operators, Python follows a strict <b>precedence hierarchy</b>. Higher-precedence operators are evaluated first. When precedence is equal, <b>associativity</b> (left-to-right or right-to-left) determines the order.") + '\n\n' +
        "| Priority | Operators | Associativity |\n"
        "| :--- | :--- | :--- |\n"
        "| Highest | `**` | Right-to-left |\n"
        "| | `~`, `+x`, `-x` (unary) | Right-to-left |\n"
        "| | `*`, `/`, `//`, `%` | Left-to-right |\n"
        "| | `+`, `-` | Left-to-right |\n"
        "| | `<<`, `>>` | Left-to-right |\n"
        "| | `<`, `<=`, `>`, `>=`, `==`, `!=` | Left-to-right |\n"
        "| | `not` | Right-to-left |\n"
        "| | `and` | Left-to-right |\n"
        "| Lowest | `or` | Left-to-right |\n\n" +
        WC([("Debugging","Understanding precedence prevents subtle calculation bugs"),
            ("Code clarity","Explicit parentheses make complex formulas readable"),
            ("Formula translation","Converting math formulas to code requires correct operator order")]) + '\n\n' +
        PT("When in doubt, <b>use parentheses</b>. They cost nothing at runtime and prevent bugs: <code>(a + b) * c</code> is clearer than relying on precedence."),
        # demo
        "# Without parentheses — precedence matters\nprint(2 + 3 * 4)       # 14, not 20\nprint(2 ** 3 ** 2)     # 512 (right-to-left)\nprint(10 - 3 - 2)      # 5 (left-to-right)\n\n# Explicit parentheses for clarity\nresult = (2 + 3) * 4   # 20\nprint(result)\n",
        "Precedence",
        [
            '### **Q1.** Evaluate `2 + 3 * 4 ** 2` by hand, then verify with Python. Write out the step-by-step evaluation order.\n',
            '### **Q2.** Write code showing that `not True or False and True` evaluates differently than `not (True or False) and True`. Print both results.\n',
            '### **Q3.** Given `x = 10`, evaluate `x > 5 and x < 20 or x == 0`. Add parentheses to make the intent explicit. Test both versions.\n',
            '### **Q4.** Demonstrate right-to-left associativity: compute `2 ** 3 ** 2` and `(2 ** 3) ** 2`. Print and explain the difference.\n',
            '### **Q5.** Write the formula for BMI: `weight / height ** 2`. Test with `weight = 70, height = 1.75`. Does Python evaluate it correctly without parentheses? Verify.\n',
        ]
    ))

    # ── SECTION 9: Short-Circuit Evaluation ──
    S.append((
        SH(9,"Short-Circuit Evaluation","Lazy Boolean Logic") + '\n\n' +
        WH("Short-circuit evaluation means Python <b>stops evaluating</b> a boolean expression as soon as the result is determined. For <code>and</code>, if the left operand is falsy, the right is never evaluated. For <code>or</code>, if the left is truthy, the right is skipped.") + '\n\n' +
        "```python\n# If x is 0, (10/x) is NEVER executed — no error!\nresult = x != 0 and (10 / x) > 2\n```\n\n" +
        WC([("Safe access","`if key in d and d[key] > 0:` — prevents KeyError"),
            ("Guard clauses","`if obj is not None and obj.value > 0:` — prevents AttributeError"),
            ("Performance","Skip expensive checks when a cheaper one already determines the result")]) + '\n\n' +
        PF("Side Effects","If the right operand has side effects (printing, modifying state), short-circuiting may silently skip them. Never rely on side effects in boolean expressions."),
        # demo
        "# Short-circuit prevents ZeroDivisionError\nx = 0\nsafe = x != 0 and (10 / x) > 2\nprint(safe)  # False — division never happens\n\n# or short-circuits on first truthy value\nname = '' or 'Default'\nprint(name)  # Default\n\n# Practical guard clause\ndata = None\nif data is not None and len(data) > 0:\n    print('Has data')\nelse:\n    print('No data')  # This prints\n",
        "Short-Circuit",
        [
            '### **Q1.** Write code where `and` short-circuits to prevent a `ZeroDivisionError`. Use `x = 0` and `10 / x`. Print a message proving the division was skipped.\n',
            '### **Q2.** Write a function with a side effect (increments a counter). Show that `False and side_effect()` never calls the function. Print the counter.\n',
            '### **Q3.** Use `or` short-circuit to provide a default: `config = user_config or default_config`. Test with `user_config = {}` and `user_config = None`.\n',
            '### **Q4.** Write a guard clause: `if lst is not None and len(lst) > 0:` that safely handles `lst = None`. Show it prevents `TypeError`.\n',
            '### **Q5.** Demonstrate that `True or print("hi")` never prints, but `False or print("hi")` does. Explain why.\n',
        ]
    ))

    # ── SECTION 10: Walrus Operator ──
    S.append((
        SH(10,"Walrus Operator (:=)","Assignment Expressions") + '\n\n' +
        WH("Introduced in Python 3.8, the walrus operator <code>:=</code> assigns a value to a variable <b>as part of an expression</b>. It eliminates the need to compute a value on one line and use it on the next.") + '\n\n' +
        "```python\n# Before walrus\ndata = get_data()\nif data:\n    process(data)\n\n# After walrus\nif (data := get_data()):\n    process(data)\n```\n\n" +
        WC([("Loop optimization","Avoid calling expensive functions twice in while-loops"),
            ("List comprehensions","Filter and transform in one pass: `[y for x in data if (y := transform(x)) > 0]`"),
            ("Inline validation","`if (n := len(data)) > 100: print(f'{n} records')`")]) + '\n\n' +
        PF("Readability","The walrus operator can reduce readability if overused. Only use it when it genuinely eliminates redundancy."),
        # demo
        "import re\ntext = 'Hello World 2024'\n\n# Without walrus\nmatch = re.search(r'\\d+', text)\nif match:\n    print(f'Found number: {match.group()}')\n\n# With walrus — more concise\nif (m := re.search(r'\\d+', text)):\n    print(f'Found: {m.group()}')\n\n# In a list comprehension\ndata = [1, 5, 12, 3, 18, 7]\nresults = [y for x in data if (y := x * 2) > 10]\nprint(results)  # [24, 36, 14]\n",
        "Walrus",
        [
            '### **Q1.** Rewrite this using the walrus operator: `n = len(data); if n > 5: print(n)`. Test with `data = [1,2,3,4,5,6]`.\n',
            '### **Q2.** Use `:=` in a while loop: read from a list until you find a negative number. Print each positive number as you go.\n',
            '### **Q3.** Use `:=` in a list comprehension to filter and transform: from `[1,2,3,4,5]`, keep only values where `x**2 > 10`. Print the squares.\n',
            '### **Q4.** Use `:=` with `re.search` to extract and print the first email address from `text = "Contact us at info@company.com for details"`.\n',
            '### **Q5.** Write code comparing the readability of a 4-line pattern vs walrus operator. When is walrus helpful vs harmful? Add comments explaining.\n',
        ]
    ))

    return S


# ═══════════════════════════════════════════════════════════════
# TASKS, INTERVIEW QUESTIONS, SUMMARY
# ═══════════════════════════════════════════════════════════════

TASKS = [
    ("Expression Evaluator", "Write a function `evaluate(a, op, b)` that takes two numbers and an operator string (`'+', '-', '*', '/', '//', '%', '**'`) and returns the result. Handle division by zero gracefully. Test all 7 operators."),
    ("Grade Classifier", "Given `score = 78`, use chained comparisons and logical operators to classify: A(90+), B(80-89), C(70-79), D(60-69), F(<60). Print the grade with an f-string."),
    ("Bit Counter", "Use `%` and `//` operators to count how many digits are in a number `n = 123456`. Also compute the sum of its digits. No string conversion allowed."),
    ("Leap Year Checker", "Write a leap year checker using logical operators: divisible by 4 AND (not divisible by 100 OR divisible by 400). Test with: 2000, 1900, 2024, 2023."),
    ("Bill Splitter", "Given `total = 156.75`, `num_people = 4`, `tip_pct = 0.18`, compute: tip amount, total with tip, per-person share (rounded to 2 decimal places). Print a formatted receipt."),
]

INTERVIEWS = [
    "Write a function `is_power_of_two(n)` using only bitwise operators (no loops, no log). Hint: `n & (n-1) == 0`. Handle edge cases.",
    "Write code to check if a number is even using: (a) modulo, (b) bitwise AND, (c) integer division. Show all three return the same result.",
    "Write a function `clamp(value, min_val, max_val)` that restricts a value to a range. Use `min()` and `max()`. Test edge cases.",
    "Write code demonstrating operator overloading: create a class where `+` concatenates strings with a separator.",
    "Write a function `evaluate(a, op, b)` that takes an operator as a string and returns the result. Handle division by zero.",
    "Write code using only bitwise operators (`&`,`|`,`^`,`~`,`<<`,`>>`) to: (a) multiply by 2, (b) divide by 2, (c) check if odd.",
    "Write a function `compare_floats(a, b, tolerance=1e-9)` that correctly handles floating-point comparison. Test with `0.1+0.2` vs `0.3`.",
    "Write code that computes `a**b % m` efficiently for large numbers using Python's `pow(a, b, m)`. Compare with naive `(a**b) % m`.",
    "Write a function `digital_root(n)` that repeatedly sums digits until single digit: `493` → `16` → `7`. Use only arithmetic operators.",
    "Write code demonstrating short-circuit evaluation: create a function with a side effect and show `and`/`or` skip it when appropriate.",
    "Write a function `negate_without_minus(n)` that returns `-n` without using `-`. Hint: `~n + 1` (two's complement).",
    "Write a function `abs_without_abs(n)` using only comparison and arithmetic operators. No `abs()` built-in.",
    "Write code demonstrating all 6 comparison operators with a custom class by implementing `__eq__`, `__lt__`, etc. on a `Temperature` class.",
    "Write a function `count_set_bits(n)` that counts the number of 1-bits in binary representation using `&` and `>>` in a loop.",
    "Write a function `is_palindrome_number(n)` using only arithmetic operators to reverse digits and compare. No string conversion.",
    "Write code showing the ternary operator for 2 and 3 categories. Then write a nested ternary for grade classification.",
    "Write a function `gcd(a, b)` using only modulo and assignment (Euclidean algorithm). Test with several number pairs.",
    "Write code that computes `n!` (factorial) using `functools.reduce` and the `*` operator. Compare with `math.factorial`.",
    "Write a function `round_to_nearest(value, step)` that rounds to nearest multiple: `round_to_nearest(17, 5)` → `15`.",
    "Write code demonstrating `//` floor division with negative numbers: `-7 // 2`. Explain floor vs truncation division.",
    "Write a function `safe_divide(a, b)` returning `(quotient, remainder)` tuple. Handle: zero division, type errors, negatives.",
    "Write code using walrus operator to simplify: compute a value and use it in the same expression. Show before/after.",
    "Write a function `matrix_scalar_ops(matrix, scalar, op)` that applies `+,-,*,/` between a 2D list and a scalar.",
    "Write a function `chained_comparison(x, ranges)` where ranges is `[(0,10,'low'),(10,50,'mid'),(50,100,'high')]`. Return label.",
    "Write a simple expression evaluator: parse and compute `'3 + 4 * 2 - 1'` respecting operator precedence.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Arithmetic | `/` always float; `//` floor; `%` remainder; `**` power | Financial calculations, metrics |\n"
    "| 2 | Assignment | `+=`, `-=` modify in-place (except immutables) | Running totals, counters |\n"
    "| 3 | Comparison | `==` value; `is` identity; chaining supported | Data filtering, validation |\n"
    "| 4 | Logical | `and`/`or` return values, not booleans | Multi-condition filters |\n"
    "| 5 | Identity | `is` checks memory, `in` checks membership | Null checks, lookups |\n"
    "| 6 | Bitwise | Binary-level manipulation of integers | Flags, performance tricks |\n"
    "| 7 | Ternary | Inline if-else expression | Compact conditional logic |\n"
    "| 8 | Precedence | `**` > `*/` > `+-` > comparisons > `not` > `and` > `or` | Correct formula translation |\n"
    "| 9 | Short-Circuit | `and`/`or` stop early when result is known | Safe access, guard clauses |\n"
    "| 10 | Walrus `:=` | Assign inside expressions (Python 3.8+) | Loop optimization |\n"
)

CHECKLIST = (
    "- [ ] I understand the difference between `/` (true division) and `//` (floor division).\n"
    "- [ ] I know that `and`/`or` return actual values, not just `True`/`False`.\n"
    "- [ ] I can use `is` vs `==` correctly (identity vs equality).\n"
    "- [ ] I understand operator precedence and use parentheses for clarity.\n"
    "- [ ] I can leverage short-circuit evaluation for safe access patterns.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)


# ═══════════════════════════════════════════════════════════════
# BUILD
# ═══════════════════════════════════════════════════════════════

if __name__ == '__main__':
    all_sections = sections_1_to_5() + sections_6_to_10()

    nb = build(
        day=2,
        title="Operators",
        obj_text="Operators are the verbs of Python — they act on data. Today we master every operator category, from basic arithmetic to bitwise manipulation and the modern walrus operator. You will learn not just *what* each operator does, but *when* and *why* to use it in professional data pipelines.",
        obj_table=(
            "| # | Category | Operators | Core Use Case |\n"
            "|---|----------|-----------|---------------|\n"
            "| 1 | Arithmetic | `+`, `-`, `*`, `/`, `//`, `%`, `**` | Numeric computations |\n"
            "| 2 | Assignment | `+=`, `-=`, `*=`, `/=`, etc. | In-place modification |\n"
            "| 3 | Comparison | `==`, `!=`, `<`, `>`, `<=`, `>=` | Filtering & validation |\n"
            "| 4 | Logical | `and`, `or`, `not` | Boolean logic |\n"
            "| 5 | Identity & Membership | `is`, `in` | Object inspection |\n"
            "| 6 | Bitwise | `&`, `\\|`, `^`, `~`, `<<`, `>>` | Binary manipulation |\n"
            "| 7 | Ternary | `x if cond else y` | Inline conditionals |\n"
            "| 8 | Precedence | (evaluation order) | Correct formula design |\n"
            "| 9 | Short-Circuit | `and`/`or` early exit | Safe access patterns |\n"
            "| 10 | Walrus | `:=` | Assignment expressions |\n"
        ),
        sections=all_sections,
        tasks=TASKS,
        interviews=INTERVIEWS,
        summary=SUMMARY,
        checklist=CHECKLIST,
        next_up="Day 3 — Strings: Text Processing, Formatting, and Pattern Matching"
    )

    save(nb, os.path.join('notebooks', 'Day02_Operators_Blank.ipynb'))
    print("\nDay 02 generated successfully!")
