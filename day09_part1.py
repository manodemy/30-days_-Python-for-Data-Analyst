"""Generate Day09 Loops notebook - Part 1: Sections 1-4."""
from nb_helpers import *

def sections_1_to_4():
    S = []

    # ── SECTION 1: For Loops & Iterables ──
    S.append((
        SH(1,"For Loops & Iterables","Data Traversal") + '\n\n' +
        WH("A <code>for</code> loop in Python iterates over an <b>iterable</b> (like a list, string, or dictionary). Unlike C-style loops that use index counters, Python's <code>for</code> loop extracts the actual items directly. Under the hood, it calls <code>iter()</code> to get an iterator, and <code>next()</code> until it hits a <code>StopIteration</code> error.") + '\n\n' +
        "| Iterable Type | Iteration Yields | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| List / Tuple | Items | `for item in [1, 2]:` |\n"
        "| String | Characters | `for char in 'abc':` |\n"
        "| Dictionary | Keys | `for key in {'a': 1}:` |\n"
        "| Set | Items (Unordered)| `for item in {1, 2}:` |\n"
        "| File object | Lines | `for line in open('f.txt'):` |\n\n" +
        WC([("Data Processing","Iterating over rows in a dataset or JSON objects in an API response"),
            ("File Parsing","Reading gigabytes of log files line-by-line without loading them into memory")]) + '\n\n' +
        PF("Modifying While Iterating","Never modify a list (adding/removing items) while iterating over it with a <code>for</code> loop. It will skip elements or crash. Iterate over a <b>copy</b> instead: <code>for item in my_list.copy():</code>."),
        "# Iterating lists\nnames = ['Alice', 'Bob', 'Charlie']\nfor name in names:\n    print(f'Hello {name}')\n\n# Iterating strings\nfor char in 'Data':\n    print(char.upper())\n\n# Under the hood (How 'for' actually works)\nnums = [1, 2]\niterator = iter(nums)\nprint(next(iterator))  # 1\nprint(next(iterator))  # 2\n# print(next(iterator)) # Raises StopIteration\n",
        "For Loops",
        [
            '### **Q1.** Write a `for` loop that iterates over `data = [10, 20, 30]` and prints the square of each number.\n',
            '### **Q2.** Iterate over the string `"Python"` and print each character multiplied by 3 (e.g., `"PPP"`).\n',
            '### **Q3.** Create a dictionary `d = {"a": 1, "b": 2}`. Use a standard `for` loop (which yields keys) to print both key and value: `d[key]`.\n',
            '### **Q4.** Demonstrate the modification trap: iterate over `lst = [1, 2, 3, 4]`, and if the item is even, remove it using `lst.remove()`. Print the list. Did it work correctly? Explain.\n',
            '### **Q5.** Fix the previous code by iterating over a slice copy `lst[:]`. Print the corrected list.\n',
        ]
    ))

    # ── SECTION 2: While Loops ──
    S.append((
        SH(2,"While Loops & State Machines","Condition-Based Iteration") + '\n\n' +
        WH("A <code>while</code> loop runs as long as a condition evaluates to <code>True</code>. It is used when the number of iterations is <b>unknown</b> beforehand (e.g., waiting for an API response, polling a database, or reading user input until they type 'quit').") + '\n\n' +
        "```python\n# Polling pattern\nwhile not db.is_ready():\n    time.sleep(1)\n    print(\"Waiting...\")\n```\n\n" +
        WC([("API Pagination","Fetching pages of data until `next_page_token` is null"),
            ("Retry Logic","Attempting to connect to a server up to 5 times before failing"),
            ("Simulation","Running a simulation until a specific convergence threshold is met")]) + '\n\n' +
        PF("Infinite Loops","Always ensure the condition inside a <code>while</code> loop will eventually become <code>False</code>, or provide a <code>break</code> statement. Otherwise, your program will freeze forever."),
        "import random\n\n# Standard while loop\ncounter = 3\nwhile counter > 0:\n    print(f'Countdown: {counter}')\n    counter -= 1\nprint('Liftoff!')\n\n# Polling / Unknown iterations pattern\nattempts = 0\nsuccess = False\n\nwhile not success and attempts < 5:\n    attempts += 1\n    # Simulate a network request with 20% success rate\n    if random.random() > 0.8:\n        success = True\n        print(f'Connected on attempt {attempts}!')\n    else:\n        print(f'Attempt {attempts} failed...')\n",
        "While Loops",
        [
            '### **Q1.** Write a `while` loop that prints powers of 2 (1, 2, 4, 8...) as long as the value is less than 100.\n',
            '### **Q2.** Write a while loop to find the first number divisible by both 7 and 13, starting your search at `n = 1`. Print it.\n',
            '### **Q3.** Create a list `items = ["a", "b", "c"]`. Use a `while items:` loop and `.pop()` to empty the list, printing each item.\n',
            '### **Q4.** Write a simulation: start with `money = 100`. In a while loop, subtract a random amount between 10-20 until money is < 0. Count iterations.\n',
            '### **Q5.** What is the most common cause of an infinite loop? Write a tiny script demonstrating one (and comment it out so it doesn\'t crash the notebook!).\n',
        ]
    ))

    # ── SECTION 3: Loop Control (Break, Continue, Else) ──
    S.append((
        SH(3,"Loop Control","Break, Continue, Pass & Else") + '\n\n' +
        WH("Python provides keywords to alter loop flow. <code>break</code> exits the loop entirely. <code>continue</code> skips the rest of the current iteration and jumps to the next. Python also has a unique <code>for...else</code> construct where the <code>else</code> block runs <b>only if the loop completes without hitting a break</b>.") + '\n\n' +
        "| Keyword | Effect | Common Use |\n"
        "| :--- | :--- | :--- |\n"
        "| `continue` | Skip to next iteration | Guard clauses inside loops (filtering) |\n"
        "| `break` | Exit loop immediately | Early exit when item is found |\n"
        "| `pass` | Do nothing | Placeholder for unimplemented code |\n"
        "| `else` | Runs if NO break occurred | \"Search failed\" logic |\n\n" +
        WC([("Data Filtering","Use `continue` to skip invalid rows without deeply nesting `if` statements"),
            ("Search Algorithms","Use `break` to stop searching a massive dataset once the target is found"),
            ("Validation","Use `for...else` to verify that ALL items pass a check")]) + '\n\n' +
        PT("The <code>for...else</code> naming is confusing. Think of it as <b><code>for...no_break</code></b>. It's the most Pythonic way to perform a 'search and report if not found' pattern."),
        "# Continue (Skip evens)\nprint(\"Continue:\")\nfor i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    print(i)  # 1, 3, 5\n\n# Break (Early exit)\nprint(\"\\nBreak:\")\nfor i in range(1, 6):\n    if i == 4:\n        break\n    print(i)  # 1, 2, 3\n\n# For...Else (Search pattern)\nprint(\"\\nFor...Else:\")\ntarget = 99\ndata = [10, 20, 30]\n\nfor num in data:\n    if num == target:\n        print(\"Found it!\")\n        break\nelse:\n    print(\"Target not found in dataset.\")  # Runs because break was never hit\n",
        "Loop Control",
        [
            '### **Q1.** Write a loop from 1 to 10. Use `continue` to skip numbers divisible by 3. Print the rest.\n',
            '### **Q2.** Given `data = [1, 5, -2, 8, -4]`, iterate and print positive numbers. Use `break` to stop completely if you hit a negative number.\n',
            '### **Q3.** Write a `for...else` loop that checks if a prime number `11` is divisible by any number from 2 to 10. If not, the `else` block prints "It is prime".\n',
            '### **Q4.** Write a `while True:` loop that increments a counter. Use an `if` statement and `break` to exit when the counter reaches 5. Print the counter.\n',
            '### **Q5.** Why is `pass` useful? Write an empty function or loop using `pass` to show how it prevents a SyntaxError.\n',
        ]
    ))

    # ── SECTION 4: Iteration Patterns ──
    S.append((
        SH(4,"Iteration Patterns","Pythonic Looping") + '\n\n' +
        WH("Python emphasizes readability. Instead of manually tracking indices with <code>range(len(data))</code>, Python provides elegant built-in functions: <code>enumerate()</code> (value + index), <code>zip()</code> (parallel iteration), and <code>reversed()</code> (backwards).") + '\n\n' +
        "| Pattern | Good Pythonic Code | Bad C-Style Code |\n"
        "| :--- | :--- | :--- |\n"
        "| Index Tracking | `for i, val in enumerate(lst):` | `for i in range(len(lst)): val = lst[i]` |\n"
        "| Parallel Loops | `for a, b in zip(listA, listB):` | `for i in range(len(listA)): a,b = listA[i], listB[i]` |\n"
        "| Reverse Loop | `for val in reversed(lst):` | `for i in range(len(lst)-1, -1, -1):` |\n\n" +
        WC([("Feature Engineering","Combining multiple columns using `zip(col1, col2)`"),
            ("Logging","Printing row numbers alongside data errors using `enumerate(data, start=1)`")]) + '\n\n' +
        PF("Uneven Zip","<code>zip()</code> stops at the shortest iterable. If <code>A</code> has 5 items and <code>B</code> has 3, it only loops 3 times. Use <code>itertools.zip_longest</code> if you need to process all elements."),
        "names = ['Alice', 'Bob', 'Charlie']\nscores = [95, 82, 91]\n\n# Enumerate (Index + Value)\nprint(\"Enumerate:\")\nfor idx, name in enumerate(names, start=1):\n    print(f\"Row {idx}: {name}\")\n\n# Zip (Parallel iteration)\nprint(\"\\nZip:\")\nfor name, score in zip(names, scores):\n    print(f\"{name} got {score}\")\n\n# Reversed\nprint(\"\\nReversed:\")\nfor name in reversed(names):\n    print(name)\n",
        "Iteration Patterns",
        [
            '### **Q1.** Given `cities = ["NY", "LA", "CHI"]`, use `enumerate(..., start=1)` to print `"1. NY"`, `"2. LA"`, etc.\n',
            '### **Q2.** Given `keys = ["a", "b", "c"]` and `vals = [1, 2, 3]`, use `zip` in a dictionary comprehension to map them: `{k: v}`. Print the dict.\n',
            '### **Q3.** What happens if you `zip` `[1, 2, 3]` with `["A", "B"]`? Write the loop and print the results to see the truncation.\n',
            '### **Q4.** Loop backwards from 10 to 1 using `reversed(range(1, 11))`. Print the numbers.\n',
            '### **Q5.** Combine patterns: use `enumerate(zip(names, scores))` to print the index, name, and score all at once. Try it!\n',
        ]
    ))

    return S
