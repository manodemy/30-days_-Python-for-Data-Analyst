"""Generate Day04 Lists notebook - Part 2: Sections 5-8 + assembly."""
from nb_helpers import *
from day04_part1 import sections_1_to_4
import os

def sections_5_to_8():
    S = []

    # ── SECTION 5: List Comprehensions ──
    S.append((
        SH(5,"List Comprehensions","Functional Data Transformation") + '\n\n' +
        WH("A list comprehension is a concise way to create lists: <code>[expression for item in iterable if condition]</code>. They replace multi-line loops with a single readable line and are <b>faster</b> than equivalent for-loops.") + '\n\n' +
        "```python\n# Loop version (4 lines)\nresult = []\nfor x in range(10):\n    if x % 2 == 0:\n        result.append(x ** 2)\n\n# Comprehension (1 line)\nresult = [x**2 for x in range(10) if x % 2 == 0]\n```\n\n" +
        WC([("Data filtering","`clean = [x for x in data if x is not None]`"),
            ("Type conversion","`nums = [int(x) for x in string_list]`"),
            ("Feature engineering","`features = [row['age'] * row['income'] for row in records]`")]) + '\n\n' +
        PF("Readability Limit","If a comprehension needs more than one condition or nested loops, switch to a regular for-loop. Readability always wins over cleverness."),
        "# Basic comprehension\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\n# With filter\nevens = [x for x in range(20) if x % 2 == 0]\nprint(evens)\n\n# Transform + filter\nnames = ['  Alice ', 'Bob', '  charlie', '']\nclean = [n.strip().title() for n in names if n.strip()]\nprint(clean)  # ['Alice', 'Bob', 'Charlie']\n\n# Nested: flatten 2D list\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nflat = [x for row in matrix for x in row]\nprint(flat)  # [1,2,3,4,5,6,7,8,9]\n",
        "Comprehensions",
        [
            '### **Q1.** Create a list of squares of numbers 1-10 using a comprehension. Print it.\n',
            '### **Q2.** Given `words = ["hello", "world", "python", "data"]`, create a list of their lengths using a comprehension. Print it.\n',
            '### **Q3.** Filter: from `nums = [1, -2, 3, -4, 5, -6]`, extract only positive numbers using a comprehension.\n',
            '### **Q4.** Flatten `matrix = [[1,2],[3,4],[5,6]]` into `[1,2,3,4,5,6]` using a nested comprehension.\n',
            '### **Q5.** Given `data = ["42", "hello", "3.14", "7", "abc"]`, use a comprehension with `.isdigit()` to extract and convert valid integers. Print the result.\n',
        ]
    ))

    # ── SECTION 6: Built-in Functions ──
    S.append((
        SH(6,"Built-in Functions for Lists","Aggregation & Analysis") + '\n\n' +
        WH("Python provides powerful built-in functions that work on lists: <code>len()</code>, <code>sum()</code>, <code>min()</code>, <code>max()</code>, <code>sorted()</code>, <code>enumerate()</code>, <code>zip()</code>, <code>map()</code>, <code>filter()</code>, <code>any()</code>, <code>all()</code>.") + '\n\n' +
        "| Function | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `len(lst)` | Count elements | `len([1,2,3])` → `3` |\n"
        "| `sum(lst)` | Total | `sum([1,2,3])` → `6` |\n"
        "| `min/max` | Extremes | `max([3,1,2])` → `3` |\n"
        "| `sorted()` | New sorted list | `sorted([3,1,2])` → `[1,2,3]` |\n"
        "| `enumerate()` | Index + value | Indexed iteration |\n"
        "| `zip()` | Pair elements | Parallel iteration |\n"
        "| `any()/all()` | Boolean checks | Data validation |\n\n" +
        WC([("Statistics","`sum(data)/len(data)` — quick mean calculation"),
            ("Validation","`all(x > 0 for x in data)` — check all values positive"),
            ("Paired data","`zip(names, scores)` — combine parallel lists")]) + '\n\n' +
        PT("<code>enumerate()</code> is always preferred over <code>range(len(lst))</code>: <code>for i, val in enumerate(data):</code> is cleaner and more Pythonic."),
        "scores = [85, 92, 78, 95, 88]\n\nprint(f'Count: {len(scores)}')\nprint(f'Sum:   {sum(scores)}')\nprint(f'Avg:   {sum(scores)/len(scores):.1f}')\nprint(f'Min:   {min(scores)}')\nprint(f'Max:   {max(scores)}')\n\n# enumerate\nfor i, score in enumerate(scores, 1):\n    print(f'Student {i}: {score}')\n\n# zip\nnames = ['Alice', 'Bob', 'Charlie']\ngrades = [92, 85, 78]\nfor name, grade in zip(names, grades):\n    print(f'{name}: {grade}')\n",
        "Built-in Functions",
        [
            '### **Q1.** Given `data = [45, 82, 67, 91, 53]`, compute and print: length, sum, average, min, max.\n',
            '### **Q2.** Use `enumerate()` to print each element of `fruits = ["apple", "banana", "cherry"]` with its 1-based index.\n',
            '### **Q3.** Use `zip()` to combine `names = ["Alice", "Bob"]` and `ages = [25, 30]` into a list of tuples. Print it.\n',
            '### **Q4.** Use `any()` to check if any number in `nums = [2, 4, 6, 7, 8]` is odd. Use `all()` to check if all are positive. Print both.\n',
            '### **Q5.** Use `sorted()` with a `key` parameter to sort `words = ["banana", "apple", "cherry"]` by length. Print the result.\n',
        ]
    ))

    # ── SECTION 7: Nested Lists ──
    S.append((
        SH(7,"Nested Lists","2D Data Structures") + '\n\n' +
        WH("A nested list (list of lists) represents <b>2D data</b> — tables, matrices, grids. Access elements with <code>matrix[row][col]</code>. This is the foundation for understanding DataFrames in pandas.") + '\n\n' +
        "```python\nmatrix = [\n    [1, 2, 3],   # row 0\n    [4, 5, 6],   # row 1\n    [7, 8, 9],   # row 2\n]\nmatrix[1][2]  # row 1, col 2 → 6\n```\n\n" +
        WC([("Tabular data","CSV data is naturally a list of lists before converting to DataFrame"),
            ("Matrix operations","Row/column extraction, transposition, aggregation"),
            ("Grid problems","Game boards, pixel maps, adjacency matrices")]) + '\n\n' +
        PT("Transpose a matrix with <code>list(zip(*matrix))</code>. This unpacks rows and re-zips them as columns."),
        "# 2D data: sales by quarter\nsales = [\n    ['Q1', 150, 200, 180],\n    ['Q2', 220, 190, 210],\n    ['Q3', 180, 250, 230],\n]\n\n# Access\nprint(sales[0][0])  # Q1\nprint(sales[1][2])  # 190\n\n# Extract column (all Q values)\nquarters = [row[0] for row in sales]\nprint(quarters)  # ['Q1', 'Q2', 'Q3']\n\n# Row totals\nfor row in sales:\n    total = sum(row[1:])\n    print(f'{row[0]}: ${total:,}')\n\n# Transpose\nmatrix = [[1,2,3],[4,5,6]]\ntransposed = list(zip(*matrix))\nprint(transposed)  # [(1,4),(2,5),(3,6)]\n",
        "Nested Lists",
        [
            '### **Q1.** Create a 3x3 matrix using a nested list. Print it row by row in a formatted grid.\n',
            '### **Q2.** Given `matrix = [[1,2,3],[4,5,6],[7,8,9]]`, extract the diagonal `[1,5,9]` using indexing.\n',
            '### **Q3.** Write code to compute the sum of each row and each column in a 3x3 matrix. Print the results.\n',
            '### **Q4.** Transpose `matrix = [[1,2,3],[4,5,6]]` into `[[1,4],[2,5],[3,6]]` using `zip(*matrix)`. Print the result.\n',
            '### **Q5.** Given a list of student records `[["Alice",85],["Bob",92],["Charlie",78]]`, sort by score (descending) and print the ranked list.\n',
        ]
    ))

    # ── SECTION 8: List as Stack/Queue ──
    S.append((
        SH(8,"Lists as Stacks & Queues","Data Structure Patterns") + '\n\n' +
        WH("Lists can function as <b>stacks</b> (LIFO — Last In, First Out) using <code>append()</code>/<code>pop()</code>, and as <b>queues</b> (FIFO — First In, First Out) using <code>append()</code>/<code>pop(0)</code>. For production queues, use <code>collections.deque</code> for O(1) performance.") + '\n\n' +
        "| Pattern | Push | Pop | Order |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| Stack (LIFO) | `.append(x)` | `.pop()` | Last in, first out |\n"
        "| Queue (FIFO) | `.append(x)` | `.pop(0)` | First in, first out |\n"
        "| Deque (fast) | `.append(x)` | `.popleft()` | O(1) both ends |\n\n" +
        WC([("Undo systems","Stack-based undo/redo for data transformations"),
            ("Task queues","FIFO queues for processing jobs in order"),
            ("BFS/DFS","Graph traversal algorithms use stacks and queues")]) + '\n\n' +
        PF("list.pop(0) is O(n)","Removing from the front of a list shifts all elements. For frequent front-removal, use <code>collections.deque</code> which is O(1)."),
        "# Stack (LIFO)\nstack = []\nstack.append('undo_1')\nstack.append('undo_2')\nstack.append('undo_3')\nprint(f'Stack: {stack}')\nprint(f'Pop: {stack.pop()}')   # undo_3 (last in)\nprint(f'Stack: {stack}')\n\n# Queue (FIFO) — use deque for production\nfrom collections import deque\nqueue = deque()\nqueue.append('task_1')\nqueue.append('task_2')\nqueue.append('task_3')\nprint(f'\\nQueue: {list(queue)}')\nprint(f'Process: {queue.popleft()}')  # task_1 (first in)\nprint(f'Queue: {list(queue)}')\n",
        "Stack & Queue",
        [
            '### **Q1.** Implement a stack: push `[10, 20, 30]`, then pop twice. Print the popped values and remaining stack.\n',
            '### **Q2.** Implement a queue using `collections.deque`: enqueue `["A", "B", "C"]`, then dequeue twice. Print results.\n',
            '### **Q3.** Use a stack to reverse a string: push each character, then pop all. `"hello"` → `"olleh"`. Print the result.\n',
            '### **Q4.** Write a function `is_balanced(expr)` that uses a stack to check if parentheses are balanced. Test with `"(())"` and `"(()"`. \n',
            '### **Q5.** Compare performance: time `list.pop(0)` vs `deque.popleft()` for 10000 operations. Print the timing comparison.\n',
        ]
    ))

    return S

TASKS = [
    ("Data Pipeline", "Write a function `process_scores(raw)` that takes `raw = ['85', 'N/A', '92', '', '78', 'absent', '95']`, filters out non-numeric entries, converts to int, sorts descending, and returns the top 3. Print the result."),
    ("Matrix Calculator", "Write functions to add and multiply two 3x3 matrices (list of lists). Test with sample matrices and print formatted results."),
    ("Inventory Manager", "Create a list of dicts `[{'item': 'Laptop', 'qty': 5, 'price': 999}, ...]` with 5 products. Write code to: find most expensive, compute total inventory value, sort by price."),
    ("Deduplicator", "Write a function `deduplicate(lst)` that removes duplicates while preserving original order. `[3,1,4,1,5,3,2]` → `[3,1,4,5,2]`. Do NOT use `set()`."),
    ("Sliding Window", "Write a function `moving_average(data, window)` that computes moving averages. `data=[1,3,5,7,9], window=3` → `[3.0, 5.0, 7.0]`. Print results."),
]

INTERVIEWS = [
    "Write a function `two_sum(nums, target)` returning indices of two numbers that add to target. `[2,7,11,15], 9` → `[0,1]`.",
    "Write a function `rotate_list(lst, k)` that rotates right by k positions. `[1,2,3,4,5], k=2` → `[4,5,1,2,3]`.",
    "Write a function `merge_sorted(a, b)` that merges two sorted lists into one sorted list without using `sort()`.",
    "Write a function `flatten(nested)` that flattens arbitrarily nested lists: `[1,[2,[3,[4]]],5]` → `[1,2,3,4,5]`. Use recursion.",
    "Write a function `find_missing(nums)` that finds the missing number in `[0,1,2,4,5]` → `3`. List contains n-1 numbers from 0 to n.",
    "Write a function `remove_duplicates_sorted(lst)` in-place for a sorted list. `[1,1,2,2,3]` → `[1,2,3]`. Return new length.",
    "Write a function `max_subarray_sum(nums)` implementing Kadane's algorithm. Find contiguous subarray with largest sum.",
    "Write a function `intersection(a, b)` returning common elements preserving order from `a`. Handle duplicates correctly.",
    "Write a function `chunk(lst, size)` splitting list into chunks: `[1,2,3,4,5], size=2` → `[[1,2],[3,4],[5]]`.",
    "Write a function `spiral_order(matrix)` returning elements in spiral order from a 2D matrix.",
    "Write a function `product_except_self(nums)` returning array where each element is product of all others. No division.",
    "Write a function `longest_consecutive(nums)` finding longest consecutive sequence. `[100,4,200,1,3,2]` → 4 (sequence 1-4).",
    "Write a function `group_by(lst, key_func)` that groups elements by a key function. Return a dict of lists.",
    "Write a function `interleave(a, b)` merging alternately: `[1,3,5],[2,4,6]` → `[1,2,3,4,5,6]`. Handle different lengths.",
    "Write a function `partition(lst, pred)` splitting into two lists based on predicate. Return `(true_list, false_list)`.",
    "Write a function `find_duplicates(lst)` returning all elements that appear more than once. Preserve first-seen order.",
    "Write code implementing binary search on a sorted list. Return index or -1. No `bisect` module.",
    "Write a function `matrix_multiply(A, B)` for matrix multiplication. Validate dimensions. Return result matrix.",
    "Write a function `compress(lst)` implementing RLE: `[1,1,2,2,2,3]` → `[(1,2),(2,3),(3,1)]`.",
    "Write a function `kth_largest(lst, k)` finding kth largest element without full sort. Use partial sort or heap.",
    "Write a function `is_sorted(lst)` checking if list is sorted (ascending or descending). Handle equal elements.",
    "Write a function `dutch_flag(lst)` sorting `[0,1,2,0,1,2]` in-place with single pass. Three-way partition.",
    "Write a function `subsets(lst)` generating all subsets (power set). `[1,2]` → `[[], [1], [2], [1,2]]`.",
    "Write a function `next_greater(lst)` finding next greater element for each: `[4,5,2,10]` → `[5,10,10,-1]`.",
    "Write a function `max_profit(prices)` finding max stock profit from single buy-sell. `[7,1,5,3,6,4]` → `5`.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Creation | Mutable, dynamic, any type | Data buffers, accumulators |\n"
    "| 2 | Indexing | Zero-based; slice assignment modifies | Data extraction, pagination |\n"
    "| 3 | Methods | In-place methods return `None` | Data manipulation |\n"
    "| 4 | Copying | `.copy()` is shallow; use `deepcopy` for nested | Data integrity |\n"
    "| 5 | Comprehensions | `[expr for x in iter if cond]` | Filtering, transformation |\n"
    "| 6 | Built-ins | `enumerate`, `zip`, `any`, `all` | Aggregation, pairing |\n"
    "| 7 | Nested Lists | 2D data; `zip(*m)` transposes | Tabular data, matrices |\n"
    "| 8 | Stack/Queue | LIFO/FIFO patterns; use `deque` | Algorithms, task processing |\n"
)

CHECKLIST = (
    "- [ ] I understand mutability and can avoid accidental aliasing.\n"
    "- [ ] I know the difference between `.sort()` (in-place) and `sorted()` (new list).\n"
    "- [ ] I can use list comprehensions for filtering and transformation.\n"
    "- [ ] I understand shallow vs deep copy for nested structures.\n"
    "- [ ] I can use `enumerate()` and `zip()` for Pythonic iteration.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_4() + sections_5_to_8()
    nb = build(
        day=4, title="Lists",
        obj_text="Lists are Python's most versatile data structure and the foundation for data manipulation. Today we master list creation, modification, comprehensions, and advanced patterns. You will learn the professional techniques that translate directly to pandas DataFrame operations.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Creation | Literal, `range()`, repetition | Building datasets |\n"
            "| 2 | Indexing & Slicing | `lst[start:stop:step]` | Data extraction |\n"
            "| 3 | Methods | `.append()`, `.sort()`, `.pop()` | In-place modification |\n"
            "| 4 | Copying | Shallow vs deep copy | Data integrity |\n"
            "| 5 | Comprehensions | `[expr for x in iter if cond]` | Transformation |\n"
            "| 6 | Built-in Functions | `enumerate`, `zip`, `sorted` | Aggregation |\n"
            "| 7 | Nested Lists | 2D data, matrices | Tabular data |\n"
            "| 8 | Stack & Queue | LIFO/FIFO patterns | Algorithms |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 5 - Tuples: Immutable Records, Packing/Unpacking, and Named Tuples"
    )
    save(nb, os.path.join('notebooks', 'Day04_Lists_Blank.ipynb'))
    print("Day 04 generated successfully!")
