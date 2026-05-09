"""Generate Day05 Tuples notebook - Part 1: Sections 1-3."""
from nb_helpers import *

def sections_1_to_3():
    S = []

    # ── SECTION 1: Tuple Creation ──
    S.append((
        SH(1,"Tuple Creation & Basics","Immutable Ordered Sequences") + '\n\n' +
        WH("A tuple is an <b>ordered, immutable collection</b> created with parentheses <code>()</code> or just commas. Once created, elements <b>cannot be added, removed, or changed</b>. This immutability makes tuples faster, hashable, and safer than lists.") + '\n\n' +
        "| Creation Method | Example | Note |\n"
        "| :--- | :--- | :--- |\n"
        "| Parentheses | `(1, 2, 3)` | Standard |\n"
        "| Without parens | `1, 2, 3` | Comma creates tuple |\n"
        "| Single element | `(42,)` | Trailing comma required! |\n"
        "| `tuple()` | `tuple([1,2,3])` | Convert from iterable |\n"
        "| Empty | `()` or `tuple()` | Empty tuple |\n\n" +
        WC([("Database records","Query results are returned as tuples — immutable rows"),
            ("Function returns","Functions return multiple values as tuples: `return x, y`"),
            ("Configuration","Immutable settings that should not be accidentally modified")]) + '\n\n' +
        PF("Single Element Tuple","<code>(42)</code> is just an integer in parentheses. You need a trailing comma: <code>(42,)</code> to create a single-element tuple.") + '\n\n' +
        PT("Tuples use <b>less memory</b> than lists and are <b>faster</b> to create and access. Use them for fixed collections."),
        "# Creation methods\ncoords = (10, 20)\nrgb = 255, 128, 0       # Parens optional\nsingle = (42,)           # Trailing comma!\nempty = ()\nfrom_list = tuple([1, 2, 3])\n\nprint(f'coords: {coords}, type: {type(coords)}')\nprint(f'rgb: {rgb}')\nprint(f'single: {single}, type: {type(single)}')\nprint(f'(42) type: {type((42))}')  # int, not tuple!\n\n# Immutability\nimport sys\nlst = [1, 2, 3]\ntpl = (1, 2, 3)\nprint(f'List size: {sys.getsizeof(lst)} bytes')\nprint(f'Tuple size: {sys.getsizeof(tpl)} bytes')\n",
        "Creation",
        [
            '### **Q1.** Create tuples using all 4 methods: parentheses, commas only, `tuple()` constructor, and single-element. Print each with `type()`.\n',
            '### **Q2.** Prove that `(42)` is an `int` but `(42,)` is a `tuple`. Print `type()` for both. Why does this matter?\n',
            '### **Q3.** Try to modify a tuple: `t = (1, 2, 3); t[0] = 99`. Catch the `TypeError` and print the error message.\n',
            '### **Q4.** Compare memory usage of a list vs tuple with the same 1000 elements using `sys.getsizeof()`. Print the difference.\n',
            '### **Q5.** Convert between types: list → tuple → list. Start with `[10, 20, 30]`. Print each conversion and verify contents are equal.\n',
        ]
    ))

    # ── SECTION 2: Indexing, Slicing & Methods ──
    S.append((
        SH(2,"Indexing, Slicing & Methods","Accessing Tuple Data") + '\n\n' +
        WH("Tuples support the same indexing and slicing as lists and strings. Since tuples are immutable, they have only <b>two methods</b>: <code>.count()</code> and <code>.index()</code>. No append, remove, or sort.") + '\n\n' +
        "| Operation | Syntax | Description |\n"
        "| :--- | :--- | :--- |\n"
        "| Access | `t[0]`, `t[-1]` | By index |\n"
        "| Slice | `t[1:3]` | Returns new tuple |\n"
        "| Count | `t.count(x)` | Occurrences of x |\n"
        "| Index | `t.index(x)` | First position of x |\n"
        "| Length | `len(t)` | Number of elements |\n"
        "| Membership | `x in t` | Check presence |\n\n" +
        WC([("Record access","Access database row fields by position: `row[0]` for ID, `row[1]` for name"),
            ("Data validation","`.count()` to verify expected occurrences in fixed datasets"),
            ("Slicing subsets","Extract specific fields from structured records")]) + '\n\n' +
        PT("Tuples support all the same built-in functions as lists: <code>len()</code>, <code>min()</code>, <code>max()</code>, <code>sum()</code>, <code>sorted()</code> (returns a list)."),
        "record = ('Alice', 28, 'Engineer', 'London', 85000)\n\n# Indexing\nprint(f'Name: {record[0]}')\nprint(f'City: {record[-2]}')\n\n# Slicing\nprint(f'Name+Age: {record[:2]}')\n\n# Methods\nscores = (85, 92, 78, 85, 95, 85)\nprint(f'Count of 85: {scores.count(85)}')  # 3\nprint(f'Index of 92: {scores.index(92)}')  # 1\n\n# Built-in functions work\nprint(f'Min: {min(scores)}, Max: {max(scores)}')\nprint(f'Sorted (returns list): {sorted(scores)}')\n",
        "Indexing & Methods",
        [
            '### **Q1.** Given `data = (10, 20, 30, 40, 50)`, access: first, last, middle element, and a slice of first 3. Print each.\n',
            '### **Q2.** Given `grades = (85, 92, 78, 85, 95, 85)`, find: how many times `85` appears, and the index of `95`. Print both.\n',
            '### **Q3.** Use `min()`, `max()`, `sum()`, `len()` on `scores = (88, 76, 95, 82, 91)` to compute basic statistics. Print all.\n',
            '### **Q4.** Use `sorted()` on `names = ("Charlie", "Alice", "Bob")`. What type does it return? Convert back to tuple.\n',
            '### **Q5.** Check membership: is `"Python"` in `langs = ("Python", "Java", "C++", "Go")`? Use the `in` operator. Print result.\n',
        ]
    ))

    # ── SECTION 3: Packing & Unpacking ──
    S.append((
        SH(3,"Packing & Unpacking","Elegant Data Extraction") + '\n\n' +
        WH("<b>Packing</b> combines values into a tuple. <b>Unpacking</b> extracts tuple elements into individual variables. Python also supports <b>extended unpacking</b> with <code>*</code> to capture remaining elements.") + '\n\n' +
        "```python\n# Packing\npoint = 10, 20, 30\n\n# Unpacking\nx, y, z = point\n\n# Extended unpacking\nfirst, *rest = [1, 2, 3, 4, 5]  # first=1, rest=[2,3,4,5]\nfirst, *mid, last = [1, 2, 3, 4, 5]  # first=1, mid=[2,3,4], last=5\n```\n\n" +
        WC([("Multiple returns","`mean, std = compute_stats(data)` — unpack function results"),
            ("Swap variables","`a, b = b, a` — Pythonic swap without temp variable"),
            ("Iteration","`for name, age in pairs:` — unpack in loops"),
            ("CSV parsing","`date, *values = row.split(',')` — separate header from data")]) + '\n\n' +
        PF("Mismatched Unpacking","Unpacking requires exact count match: <code>a, b = (1, 2, 3)</code> raises <code>ValueError</code>. Use <code>*</code> to absorb extras: <code>a, b, *rest = (1, 2, 3)</code>."),
        "# Packing\ncoord = 3.5, 7.2, 1.0\nprint(f'Packed: {coord}')\n\n# Unpacking\nx, y, z = coord\nprint(f'x={x}, y={y}, z={z}')\n\n# Swap — most Pythonic pattern\na, b = 10, 20\na, b = b, a\nprint(f'Swapped: a={a}, b={b}')\n\n# Extended unpacking\nfirst, *rest = [1, 2, 3, 4, 5]\nprint(f'First: {first}, Rest: {rest}')\n\nhead, *body, tail = 'ABCDE'\nprint(f'Head: {head}, Body: {body}, Tail: {tail}')\n\n# In loops\nstudents = [('Alice', 95), ('Bob', 82), ('Charlie', 91)]\nfor name, score in students:\n    print(f'{name}: {score}')\n",
        "Packing & Unpacking",
        [
            '### **Q1.** Pack three variables `name, age, city` into a tuple. Then unpack it back into three new variables and print them.\n',
            '### **Q2.** Swap `x = 10` and `y = 20` using tuple unpacking (one line, no temp variable). Print before and after.\n',
            '### **Q3.** Use extended unpacking: given `data = (1, 2, 3, 4, 5)`, extract first element and remaining into `first, *rest`. Print both.\n',
            '### **Q4.** Write a function `min_max(lst)` that returns `(min, max)` as a tuple. Unpack the result into two variables. Test with `[3, 1, 4, 1, 5]`.\n',
            '### **Q5.** Given `records = [("Alice",85,"A"), ("Bob",72,"B")]`, iterate with unpacking: `for name, score, grade in records:`. Print formatted output.\n',
        ]
    ))

    return S
