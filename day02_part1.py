"""Generate Day02 Operators notebook — Part 1: Sections 1-5."""
from nb_helpers import *

def sections_1_to_5():
    S = []

    # ── SECTION 1: Arithmetic ──
    S.append((
        SH(1,"Arithmetic Operators","Numeric Operations") + '\n\n' +
        WH("Python has 7 built-in arithmetic operators: <code>+</code> (add), <code>-</code> (subtract), <code>*</code> (multiply), <code>/</code> (true division), <code>//</code> (floor division), <code>%</code> (modulo), and <code>**</code> (exponentiation). These are the fundamental building blocks for all numerical computations.") + '\n\n' +
        "**Quick Reference:**\n\n"
        "| Operator | Name | Example | Result |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `+` | Addition | `7 + 3` | `10` |\n"
        "| `-` | Subtraction | `7 - 3` | `4` |\n"
        "| `*` | Multiplication | `7 * 3` | `21` |\n"
        "| `/` | True Division | `7 / 3` | `2.333...` |\n"
        "| `//` | Floor Division | `7 // 3` | `2` |\n"
        "| `%` | Modulo | `7 % 3` | `1` |\n"
        "| `**` | Power | `2 ** 10` | `1024` |\n\n" +
        WC([("Financial calculations","`profit = revenue - costs`"),
            ("Metrics generation","`margin = (profit / revenue) * 100`"),
            ("Batch processing","Using modulo `%` to execute code every Nth row")]) + '\n\n' +
        PF("Division Always Returns Float","The <code>/</code> operator <b>always</b> returns a float, even if the result is whole: <code>10 / 2</code> → <code>5.0</code>. Use <code>//</code> for integer results.") + '\n\n' +
        PT("Exponentiation evaluates right-to-left: <code>2**3**2</code> = <code>2**(3**2)</code> = <code>2**9</code> = 512, not <code>(2**3)**2</code> = 64."),
        # demo code
        "revenue = 150000\ncosts   = 87500\nprofit  = revenue - costs\nmargin  = (profit / revenue) * 100\nprint(f'Profit: ${profit:,}')\nprint(f'Margin: {margin:.1f}%')\n\n# Floor division and modulo\nprint(17 // 5)   # 3\nprint(17 %  5)   # 2\nprint(2 ** 10)   # 1024\n",
        "Arithmetic",
        [
            '### **Q1.** Compute `17 // 5` and `17 % 5`. Verify: `5 * (17//5) + (17%5) == 17`. Print all values and the verification.\n',
            '### **Q2.** Write code that computes the area of a circle with radius `r = 7.5` using `pi = 3.14159`. Print the result rounded to 2 decimal places.\n',
            '### **Q3.** Given `x = -7` and `y = 2`, compute `x / y`, `x // y`, and `x % y`. Explain why `x // y` is `-4` and not `-3`.\n',
            '### **Q4.** Write code to extract the tens digit from `n = 4567` using only `//` and `%` operators. Print the result.\n',
            '### **Q5.** Compute `2**3**2` and `(2**3)**2`. Print both results and explain why they differ (right-to-left associativity).\n',
        ]
    ))

    # ── SECTION 2: Assignment ──
    S.append((
        SH(2,"Assignment Operators","In-Place Operations") + '\n\n' +
        WH("Assignment operators combine an arithmetic or bitwise operation with assignment. Instead of writing <code>x = x + 5</code>, you write <code>x += 5</code>. Python supports: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>/=</code>, <code>//=</code>, <code>%=</code>, <code>**=</code>, and bitwise variants.") + '\n\n' +
        "| Operator | Equivalent | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `x += 5` | `x = x + 5` | Accumulate totals |\n"
        "| `x -= 3` | `x = x - 3` | Decrease counters |\n"
        "| `x *= 2` | `x = x * 2` | Scale values |\n"
        "| `x //= 4` | `x = x // 4` | Integer reduction |\n"
        "| `x **= 2` | `x = x ** 2` | Square values |\n\n" +
        WC([("Running totals","Accumulating sums in loops: `total += row_value`"),
            ("Counter patterns","`count += 1` is the most common pattern in data pipelines"),
            ("Scaling","Normalize columns: `col *= scale_factor`")]) + '\n\n' +
        PF("Immutable Types","For immutable types like <code>str</code> and <code>tuple</code>, <code>+=</code> creates a <b>new object</b> rather than modifying in-place. This can be a performance trap in tight loops.") + '\n\n' +
        PT("Use <code>x *= -1</code> to flip the sign of a number. Use <code>x **= 0.5</code> for square root."),
        # demo
        "total = 0\nfor sale in [150, 230, 180, 410]:\n    total += sale\nprint(f'Total sales: ${total:,}')\n\n# Compound assignments\nx = 100\nx //= 3    # 33\nx **= 2    # 1089\nprint(x)\n",
        "Assignment",
        [
            '### **Q1.** Start with `balance = 1000`. Apply these in order: `+= 500`, `-= 200`, `*= 1.1`, `//= 1`. Print balance after each step.\n',
            '### **Q2.** Write a loop that computes `n! (factorial)` for `n = 10` using only `*=`. Print the result and verify with `math.factorial(10)`.\n',
            '### **Q3.** Create `text = "Hello"`. Use `+=` to append `" World"`. Then check if `id(text)` changed (proving a new object was created). Print both IDs.\n',
            '### **Q4.** Start with `x = 256`. Apply `//= 2` repeatedly in a loop until `x < 1`. Count and print how many iterations it took.\n',
            '### **Q5.** Write code that uses `%=` to keep an angle within 0-359 degrees. Test with `angle = 750`. Print the normalized angle.\n',
        ]
    ))

    # ── SECTION 3: Comparison ──
    S.append((
        SH(3,"Comparison Operators","Relational Logic") + '\n\n' +
        WH("Comparison operators evaluate two values and return a <code>bool</code> (<code>True</code> or <code>False</code>). Python supports: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. A unique Python feature is <b>chained comparisons</b>: <code>1 &lt; x &lt; 10</code>.") + '\n\n' +
        "| Operator | Meaning | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `==` | Equal to | `5 == 5` → `True` |\n"
        "| `!=` | Not equal | `5 != 3` → `True` |\n"
        "| `<` | Less than | `3 < 5` → `True` |\n"
        "| `>` | Greater than | `5 > 3` → `True` |\n"
        "| `<=` | Less or equal | `5 <= 5` → `True` |\n"
        "| `>=` | Greater or equal | `6 >= 5` → `True` |\n\n" +
        WC([("Data filtering","`df[df['age'] >= 18]` — core of pandas filtering"),
            ("Validation","Check thresholds: `if revenue > target:`"),
            ("Sorting logic","Custom sort keys rely on `<` and `>` comparisons")]) + '\n\n' +
        PF("== vs is","<code>==</code> checks <b>value equality</b>, <code>is</code> checks <b>identity</b> (same object in memory). Never use <code>is</code> to compare values; use it only for <code>None</code> checks: <code>if x is None</code>.") + '\n\n' +
        PT("Python supports chained comparisons: <code>0 &lt;= x &lt; 100</code> is equivalent to <code>0 &lt;= x and x &lt; 100</code> but cleaner and faster."),
        # demo
        "score = 78\nprint(score >= 60)    # True\nprint(score == 100)   # False\n\n# Chained comparison\nage = 25\nprint(18 <= age < 65)  # True — working age\n\n# Comparing different types\nprint(1 == 1.0)   # True (value equality)\nprint(1 is 1.0)   # False (different objects)\n",
        "Comparison",
        [
            '### **Q1.** Given `a = 10` and `b = 10.0`, test `a == b` and `a is b`. Print results and explain the difference between value equality and identity.\n',
            '### **Q2.** Write a chained comparison that checks if `temperature = 37.5` is in the "normal" range (36.1 to 37.2). Print the result.\n',
            '### **Q3.** Compare strings: `"apple" < "banana"`, `"Apple" < "apple"`. Print results and explain how Python compares strings (lexicographic, Unicode order).\n',
            '### **Q4.** Write code that finds the maximum of three numbers `a, b, c` using only comparison operators (no `max()` built-in). Test with `a=15, b=42, c=8`.\n',
            '### **Q5.** Demonstrate that `None == None` is `True` but `None == 0` is `False` and `None == False` is `False`. Why should you always use `is None` instead?\n',
        ]
    ))

    # ── SECTION 4: Logical ──
    S.append((
        SH(4,"Logical Operators","Boolean Algebra") + '\n\n' +
        WH("Python has three logical operators: <code>and</code>, <code>or</code>, and <code>not</code>. They combine boolean expressions. Crucially, <code>and</code> and <code>or</code> use <b>short-circuit evaluation</b> — they stop evaluating as soon as the result is determined.") + '\n\n' +
        "| Operator | Returns True if... | Short-circuits when... |\n"
        "| :--- | :--- | :--- |\n"
        "| `and` | Both operands are truthy | Left operand is falsy |\n"
        "| `or` | At least one is truthy | Left operand is truthy |\n"
        "| `not` | Operand is falsy | Never |\n\n" +
        WC([("Multi-condition filters","`df[(df['age'] > 18) & (df['score'] > 90)]`"),
            ("Data validation","`if name and len(name) > 0:` — safe null checking"),
            ("Default values","`result = value or 'N/A'` — using `or` for defaults")]) + '\n\n' +
        PF("and/or Return Values, Not Booleans","<code>and</code> returns the first falsy value or the last value. <code>or</code> returns the first truthy value or the last value. <code>'hello' and 42</code> → <code>42</code>, not <code>True</code>.") + '\n\n' +
        PT("<code>value or default</code> is a common Python idiom for providing default values: <code>name = user_input or 'Anonymous'</code>."),
        # demo
        "age, income = 25, 55000\n\n# Multi-condition check\nif age >= 18 and income >= 50000:\n    print('Loan approved')\n\n# Short-circuit: second part never runs\nx = 0\nresult = x and (10 / x)  # No ZeroDivisionError!\nprint(result)  # 0\n\n# or for defaults\nname = '' or 'Anonymous'\nprint(name)  # Anonymous\n",
        "Logical",
        [
            '### **Q1.** Given `x = 5`, evaluate and print: `x > 3 and x < 10`, `x > 3 or x < 2`, `not(x > 3 and x < 10)`. Explain each result.\n',
            '### **Q2.** Demonstrate short-circuit evaluation: write code where `and` prevents a `ZeroDivisionError`. Print a message proving the second operand was never evaluated.\n',
            '### **Q3.** Write code showing that `"hello" and 42` returns `42`, while `"" and 42` returns `""`. Explain why `and`/`or` return values, not booleans.\n',
            '### **Q4.** Write a function `is_valid_age(age)` that returns `True` only if age is an integer, positive, and less than 150. Use `and` chaining.\n',
            '### **Q5.** Use `or` to set defaults: given `user_name = ""` and `fallback = "Guest"`, compute `display_name = user_name or fallback`. Print the result.\n',
        ]
    ))

    # ── SECTION 5: Identity & Membership ──
    S.append((
        SH(5,"Identity & Membership","Object Inspection") + '\n\n' +
        WH("<b>Identity operators</b> (<code>is</code>, <code>is not</code>) check whether two variables point to the <b>same object</b> in memory. <b>Membership operators</b> (<code>in</code>, <code>not in</code>) check whether a value exists inside a container (list, tuple, dict, set, string).") + '\n\n' +
        "| Operator | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `is` | Same object? | `x is None` |\n"
        "| `is not` | Different objects? | `x is not None` |\n"
        "| `in` | Value in container? | `'a' in 'abc'` → `True` |\n"
        "| `not in` | Value absent? | `5 not in [1,2,3]` → `True` |\n\n" +
        WC([("Null checking","`if value is None:` — the Pythonic way to check for null"),
            ("Data validation","`if col in df.columns:` — safe column access"),
            ("Search & lookup","`if key in my_dict:` — O(1) dict membership")]) + '\n\n' +
        PF("Integer Caching","Python caches integers from <code>-5</code> to <code>256</code>. So <code>a = 100; b = 100; a is b</code> → <code>True</code>, but <code>a = 1000; b = 1000; a is b</code> → <code>False</code> (different objects, same value).") + '\n\n' +
        PT("For <code>dict</code> and <code>set</code>, <code>in</code> is O(1). For <code>list</code>, <code>in</code> is O(n). Choose your data structure wisely for frequent membership tests."),
        # demo
        "# Identity\na = [1, 2, 3]\nb = a\nc = [1, 2, 3]\nprint(a is b)      # True — same object\nprint(a is c)      # False — same value, different object\nprint(a == c)      # True — value equality\n\n# Membership\nprint('P' in 'Python')           # True\nprint(5 in [1, 2, 3, 4, 5])     # True\nprint('age' in {'name': 'Ali'}) # False — checks keys\n",
        "Identity & Membership",
        [
            '### **Q1.** Create `a = [1, 2]` and `b = a` and `c = [1, 2]`. Test `a is b`, `a is c`, `a == c`. Print results and explain each.\n',
            '### **Q2.** Demonstrate Python\'s integer caching: test `a = 256; b = 256; print(a is b)` then `a = 257; b = 257; print(a is b)`. Explain the results.\n',
            '### **Q3.** Write code that checks if a column name `"salary"` exists in a list of column headers `["name", "age", "salary", "dept"]`. Use the `in` operator.\n',
            '### **Q4.** Given `d = {"x": 1, "y": 2}`, demonstrate that `in` checks keys (not values): test `"x" in d` and `1 in d`. Print results.\n',
            '### **Q5.** Write code showing `None is None` is `True` (singleton pattern). Then show why `if x is None:` is preferred over `if x == None:` (custom `__eq__` risk).\n',
        ]
    ))

    return S
