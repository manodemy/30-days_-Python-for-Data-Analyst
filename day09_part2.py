"""Generate Day09 Loops notebook - Part 2: Sections 5-7 + assembly."""
from nb_helpers import *
from day09_part1 import sections_1_to_4
import os

def sections_5_to_7():
    S = []

    # ── SECTION 5: Generators & yield ──
    S.append((
        SH(5,"Generators & yield","Lazy Memory-Efficient Evaluation") + '\n\n' +
        WH("A <b>generator</b> is a special function that returns an iterator. Instead of computing an entire list and storing it in memory, it uses the <code>yield</code> keyword to produce values <b>one at a time</b>. It pauses its state between yields.") + '\n\n' +
        "```python\n# Normal Function (Eats RAM)\ndef get_millions():\n    return [x for x in range(1_000_000)] # list in memory\n\n# Generator (O(1) Memory)\ndef yield_millions():\n    for x in range(1_000_000):\n        yield x  # yields one by one\n```\n\n" +
        WC([("Big Data Processing","Reading a 50GB CSV file line-by-line without crashing your laptop"),
            ("Infinite Streams","Processing real-time sensor data or Kafka event streams"),
            ("API Pagination","Yielding records page-by-page as they are requested")]) + '\n\n' +
        PF("Generators are Single-Use","Once a generator is exhausted (loop finishes), it is empty. You cannot iterate over it a second time. You must create a new generator object."),
        "import sys\n\n# Regular list\nsquares_list = [x**2 for x in range(10000)]\n\n# Generator function\ndef generate_squares(n):\n    for x in range(n):\n        yield x**2\n\n# Generator object\nsquares_gen = generate_squares(10000)\n\nprint(f\"List memory: {sys.getsizeof(squares_list)} bytes\")\nprint(f\"Gen memory:  {sys.getsizeof(squares_gen)} bytes\")\n\n# Iterating the generator\nprint(\"First 3 from generator:\")\nprint(next(squares_gen))  # 0\nprint(next(squares_gen))  # 1\nprint(next(squares_gen))  # 4\n",
        "Generators",
        [
            '### **Q1.** Write a generator function `countdown(n)` that yields numbers from n down to 1. Test it in a loop.\n',
            '### **Q2.** Demonstrate that generators are single-use: create a generator, loop over it once, then try to loop over it again. What happens?\n',
            '### **Q3.** Write a generator `fibonacci(limit)` that yields Fibonacci numbers up to a maximum value. Print the results.\n',
            '### **Q4.** Create a generator that yields random numbers between 1-10 infinitely. Use `next()` to pull 3 numbers from it manually.\n',
            '### **Q5.** Why is `yield` better than `return` when parsing a massive log file?\n',
        ]
    ))

    # ── SECTION 6: Generator Expressions ──
    S.append((
        SH(6,"Generator Expressions","Inline Lazy Data") + '\n\n' +
        WH("A <b>generator expression</b> is exactly like a list comprehension, but it uses <b>parentheses <code>()</code></b> instead of square brackets <code>[]</code>. It creates a generator object instead of a list, saving massive amounts of memory.") + '\n\n' +
        "| Syntax | Object Created | Evaluation | Memory |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `[x for x in data]` | `list` | Eager (All at once) | High |\n"
        "| `(x for x in data)` | `generator` | Lazy (One by one) | Low O(1) |\n\n" +
        WC([("Math Reductions","`sum(x**2 for x in data)` — computes the sum without creating a temporary list"),
            ("Pipelining","Chain multiple generator expressions to create a clean, memory-efficient data pipeline")]) + '\n\n' +
        PT("When passing a generator expression as the ONLY argument to a function, you can omit the extra parentheses: <code>sum(x**2 for x in range(10))</code> instead of <code>sum((x**2 for x in range(10)))</code>."),
        "# List Comprehension\nlst = [x * 2 for x in range(10)]\nprint(type(lst))  # <class 'list'>\n\n# Generator Expression\ngen = (x * 2 for x in range(10))\nprint(type(gen))  # <class 'generator'>\n\n# Best practice: Reductions\ntotal = sum(x**2 for x in range(1, 1001))\nprint(f\"Sum of squares: {total:,}\")\n\n# Any / All with generators (short-circuits!)\n# Stops computing as soon as it finds an even number\nhas_even = any(x % 2 == 0 for x in [1, 3, 5, 6, 7, 9])\nprint(f\"Has even? {has_even}\")\n",
        "Generator Expressions",
        [
            '### **Q1.** Write a generator expression for the cubes of numbers 1-10. Assign it to `gen`. Print `next(gen)` twice.\n',
            '### **Q2.** Given `data = ["10", "20", "invalid", "30"]`, write a generator expression that attempts to convert valid integers. Iterate and print.\n',
            '### **Q3.** Compute the sum of the first 10,000 even numbers using `sum()` and a generator expression. Print the result.\n',
            '### **Q4.** Use `all()` with a generator expression to check if all words in `["apple", "banana", "cherry"]` have > 3 letters.\n',
            '### **Q5.** Measure the memory difference (`sys.getsizeof()`) between `[x for x in range(10000)]` and `(x for x in range(10000))`.\n',
        ]
    ))

    # ── SECTION 7: The Itertools Module ──
    S.append((
        SH(7,"The itertools Module","Professional Iteration") + '\n\n' +
        WH("The <code>itertools</code> module is a standard library toolkit for creating and combining iterators. It provides fast, memory-efficient tools for combinatorial math, grouping, and advanced looping patterns.") + '\n\n' +
        "**Key Itertools:**\n\n"
        "| Function | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `chain(A, B)` | Combine iterables sequentially | `chain([1,2], [3,4])` → 1,2,3,4 |\n"
        "| `combinations(A, 2)`| All unique pairs | `(A,B), (A,C), (B,C)` |\n"
        "| `permutations(A, 2)`| All ordered pairs | `(A,B), (B,A), (A,C)...` |\n"
        "| `cycle(A)` | Infinite loop over A | `1,2,1,2,1,2...` |\n"
        "| `groupby(A, key)` | Group adjacent duplicates | Grouping sorted data |\n\n" +
        WC([("Feature Interactions","Generating all pairs of columns using `combinations` for machine learning"),
            ("Flattening Data","Using `chain.from_iterable(list_of_lists)` to flatten nested structures efficiently")]) + '\n\n' +
        PF("Infinite Itertools","Tools like <code>cycle</code>, <code>count</code>, and <code>repeat</code> generate infinite streams. Always use a <code>break</code> condition or zip them with a finite sequence, otherwise your program will hang."),
        "import itertools\n\n# Chain: seamless iteration across multiple lists\nl1, l2 = [1, 2], [3, 4]\nprint(\"Chain:\", list(itertools.chain(l1, l2)))\n\n# Combinations: pick 2\nitems = ['A', 'B', 'C']\ncombs = list(itertools.combinations(items, 2))\nprint(\"Combinations:\", combs)\n\n# Zip Longest (pad missing values)\nl3 = [1, 2, 3]\nl4 = ['A']\nzipped = list(itertools.zip_longest(l3, l4, fillvalue='?'))\nprint(\"Zip Longest:\", zipped)\n\n# Slice an infinite iterator\ncounter = itertools.count(start=10, step=5)\nfirst_three = list(itertools.islice(counter, 3))\nprint(\"Infinite Count slice:\", first_three)\n",
        "Itertools",
        [
            '### **Q1.** Import `itertools`. Use `chain()` to loop over `[1,2,3]`, `(4,5)`, and `{"A", "B"}` in a single for loop. Print each item.\n',
            '### **Q2.** Use `itertools.combinations()` to find all 3-person teams from `["Alice", "Bob", "Charlie", "David"]`. Print them.\n',
            '### **Q3.** Use `itertools.permutations()` on `[1, 2, 3]` with length 2. How many results are there compared to combinations?\n',
            '### **Q4.** Write a `for` loop using `itertools.cycle(["Red", "Green", "Blue"])`. Use a manual counter to `break` after 7 prints.\n',
            '### **Q5.** Flatten `matrix = [[1, 2], [3, 4], [5, 6]]` using `itertools.chain.from_iterable()`. Print the resulting list.\n',
        ]
    ))

    return S

TASKS = [
    ("Data Paginator", "Write a generator `paginate(data, page_size)` that yields chunks of a list. E.g., `paginate([1,2,3,4,5], 2)` yields `[1,2]`, `[3,4]`, `[5]`. Test it in a loop."),
    ("CSV Reader Pipeline", "Write two generator functions. `read_lines(text)` yields lines from a multi-line string. `parse_csv(lines)` yields lists of values. Chain them: `for row in parse_csv(read_lines(data)):`."),
    ("Prime Generator", "Write a generator `primes_up_to(n)` that yields prime numbers. Use an internal `while` loop and math logic. Test with `n=50`."),
    ("For-Else Search", "Given a list of dictionaries (users), write a `for...else` loop that searches for a user with `role == 'admin'`. Break and print their name if found, else print 'No admin configured'."),
    ("Cartesian Combinations", "Given `colors = ['red', 'blue']` and `sizes = ['S', 'M', 'L']`, use `itertools.product` to generate and print all possible color/size combinations."),
]

INTERVIEWS = [
    "Write a generator `fibonacci()` that yields the Fibonacci sequence infinitely. Use `itertools.islice` to get the first 10.",
    "Explain the difference between `yield` and `return`. What is a coroutine?",
    "Write a function `flatten(nested_list)` using recursion and `yield from` to flatten arbitrarily deep lists.",
    "Explain how `for...else` works. Write a code example showing a use case where it replaces a boolean flag.",
    "Write a generator expression to find the sum of all odd numbers under 1,000,000. Why is this better than a list comprehension?",
    "Implement a custom iterator class (with `__iter__` and `__next__`) that mimics the `range(start, stop)` function.",
    "Write a function `sliding_window(iterable, n)` using `itertools` or generators to yield n-length windows. `[1,2,3,4]`, n=2 -> `(1,2), (2,3), (3,4)`.",
    "Write a function that parses a log file line-by-line using a generator, filtering only lines containing 'ERROR'.",
    "Explain the `StopIteration` exception. Write code that manually catches it while using `next()`.",
    "Write a function `group_anagrams(words)` using `itertools.groupby`. Why must the data be sorted first?",
    "Implement a custom `zip(*iterables)` function using a `while` loop and `next()`.",
    "Write code using `itertools.dropwhile` and `takewhile` to extract a specific segment of data from a stream.",
    "Explain what `itertools.tee` does and when you would need to use it to duplicate an iterator.",
    "Write a function to generate all subsets (powerset) of a list using `itertools.combinations`.",
    "Write a generator `chunker(iterable, size)` that works on ANY iterable (not just lists) using `itertools.islice`.",
    "Implement an infinite prime number generator using a growing set of seen primes.",
    "Write code showing the difference between `itertools.combinations` and `itertools.combinations_with_replacement`.",
    "Write a function that uses a generator to find the first duplicate in a stream of data in O(1) memory.",
    "Explain the memory profile of `any([cond(x) for x in data])` vs `any(cond(x) for x in data)`. Why does it matter?",
    "Write a pipeline of three generator functions: read, filter, and transform. Connect them together.",
    "Implement the Collatz conjecture as a generator yielding the sequence until it reaches 1.",
    "Write a function that alternates yielding from two infinite generators using `itertools.cycle` or manual logic.",
    "Explain why modifying a dictionary while iterating over it raises a RuntimeError. How do you safely delete keys in a loop?",
    "Write a `while` loop that retries an API call (simulated function) with exponential backoff.",
    "What is `yield from`? Write a function that uses it to chain two separate generator functions together.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | `for` loops | Iterates over iterables | Data traversal without indices |\n"
    "| 2 | `while` loops | Runs while condition is true | Polling, infinite streams, pagination |\n"
    "| 3 | Loop Control | `break`, `continue`, `else` | Fast filtering, search resolution |\n"
    "| 4 | Iteration Patterns | `enumerate`, `zip`, `reversed` | Elegant, readable data manipulation |\n"
    "| 5 | Generators | `yield` pauses execution | O(1) memory for massive datasets |\n"
    "| 6 | Gen Expressions | `(x for x in data)` | Inline lazy reductions (sum/any/all) |\n"
    "| 7 | Itertools | Standard library iteration tools | Combinatorics, efficient chaining |\n"
)

CHECKLIST = (
    "- [ ] I understand how `for` loops work under the hood (`iter()` and `next()`).\n"
    "- [ ] I know how to use `while` loops for unknown iteration counts (polling).\n"
    "- [ ] I can use `continue` to filter and `for...else` for search operations.\n"
    "- [ ] I always use `enumerate()` instead of `range(len())`.\n"
    "- [ ] I understand how `yield` saves memory compared to returning a full list.\n"
    "- [ ] I can write a generator expression for memory-efficient math reductions.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_4() + sections_5_to_7()
    nb = build(
        day=9, title="Loops & Iteration",
        obj_text="Iteration is the engine of data processing. Today we graduate from basic loops to professional iteration patterns. You will learn to write memory-efficient pipelines using generators and the `itertools` module, allowing you to process gigabytes of data seamlessly without crashing your system.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | `for` loops | Iterables & Iterators | Standard data traversal |\n"
            "| 2 | `while` loops | Condition-based | Polling & Pagination |\n"
            "| 3 | Loop Control | `continue`, `for...else` | Filtering & Search logic |\n"
            "| 4 | Patterns | `enumerate()`, `zip()` | Multi-list processing |\n"
            "| 5 | Generators | `yield` | O(1) Memory pipelines |\n"
            "| 6 | Expressions | `(expr for x in data)` | Lazy reductions |\n"
            "| 7 | Itertools | `chain`, `combinations` | Combinatorial math |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 10 - Functions: Scope, Arguments, \*args/\*\*kwargs, and Lambdas"
    )
    save(nb, os.path.join('notebooks', 'Day09_Loops_Blank.ipynb'))
    print("Day 09 generated successfully!")
