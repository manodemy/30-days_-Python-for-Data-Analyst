"""Generate Day04 Lists notebook - Part 1: Sections 1-4."""
from nb_helpers import *

def sections_1_to_4():
    S = []

    # ── SECTION 1: List Creation ──
    S.append((
        SH(1,"List Creation & Basics","Dynamic Mutable Sequences") + '\n\n' +
        WH("A list is an <b>ordered, mutable collection</b> that can hold items of any type. Lists are the most versatile data structure in Python — they grow and shrink dynamically, support indexing/slicing, and are the backbone of data pipelines.") + '\n\n' +
        "| Creation Method | Example | Use Case |\n"
        "| :--- | :--- | :--- |\n"
        "| Literal | `[1, 2, 3]` | Quick, explicit |\n"
        "| `list()` constructor | `list('abc')` → `['a','b','c']` | Convert iterables |\n"
        "| `list(range(n))` | `list(range(5))` → `[0,1,2,3,4]` | Numeric sequences |\n"
        "| Repetition | `[0] * 5` → `[0,0,0,0,0]` | Initialize with defaults |\n"
        "| Comprehension | `[x**2 for x in range(5)]` | Functional creation |\n\n" +
        WC([("Data buffers","Lists hold rows of data during ETL processing"),
            ("Feature collections","Gather column names, metrics, or results dynamically"),
            ("Pipeline stages","Accumulate transformed records before writing to output")]) + '\n\n' +
        PF("Shallow Copy Trap","<code>matrix = [[0]*3]*3</code> creates 3 references to the <b>same</b> inner list. Modifying one row changes all rows. Use <code>[[0]*3 for _ in range(3)]</code> instead.") + '\n\n' +
        PT("Use <code>list()</code> to convert any iterable: <code>list('hello')</code> → <code>['h','e','l','l','o']</code>, <code>list(range(5))</code> → <code>[0,1,2,3,4]</code>."),
        "# Creation methods\nnums = [10, 20, 30, 40, 50]\nmixed = [1, 'hello', True, 3.14, None]\nfrom_range = list(range(1, 6))\nrepeated = [0] * 5\n\nprint(f'nums: {nums}')\nprint(f'mixed types: {mixed}')\nprint(f'from range: {from_range}')\nprint(f'repeated: {repeated}')\n\n# Lists are mutable\nnums[0] = 99\nprint(f'After mutation: {nums}')\n",
        "List Creation",
        [
            '### **Q1.** Create a list of the first 10 even numbers using `list(range(...))`. Print the list and its length.\n',
            '### **Q2.** Create a list containing: an int, a float, a string, a boolean, and `None`. Print each element with its type using a loop.\n',
            '### **Q3.** Demonstrate the shallow copy trap: create `matrix = [[0]*3]*3`, modify `matrix[0][0] = 1`, then print the full matrix. Explain what happened.\n',
            '### **Q4.** Create the same 3x3 matrix correctly using a list comprehension `[[0]*3 for _ in range(3)]`. Modify `[0][0]` and verify only one row changed.\n',
            '### **Q5.** Convert the string `"Data Analytics"` into a list of characters, then into a list of words. Print both results.\n',
        ]
    ))

    # ── SECTION 2: Indexing & Slicing ──
    S.append((
        SH(2,"List Indexing & Slicing","Precision Data Access") + '\n\n' +
        WH("Lists use the same indexing and slicing syntax as strings: <code>lst[i]</code> for single access, <code>lst[start:stop:step]</code> for slices. Unlike strings, list slicing returns a <b>new list</b>, and you can <b>assign to slices</b> to modify multiple elements at once.") + '\n\n' +
        "| Operation | Syntax | Description |\n"
        "| :--- | :--- | :--- |\n"
        "| Access | `lst[0]`, `lst[-1]` | First, last element |\n"
        "| Slice | `lst[1:4]` | Elements at index 1,2,3 |\n"
        "| Step | `lst[::2]` | Every other element |\n"
        "| Reverse | `lst[::-1]` | Reversed copy |\n"
        "| Slice assign | `lst[1:3] = [10, 20]` | Replace range |\n\n" +
        WC([("Batch selection","Select specific rows/columns from data matrices"),
            ("Pagination","`data[offset:offset+limit]` — paginate query results"),
            ("Window operations","`data[i:i+window_size]` — sliding window analysis")]) + '\n\n' +
        PT("Slice assignment can <b>change list length</b>: <code>lst[1:3] = [10, 20, 30, 40]</code> replaces 2 elements with 4."),
        "data = [10, 20, 30, 40, 50, 60, 70]\n\n# Indexing\nprint(data[0])     # 10\nprint(data[-1])    # 70\n\n# Slicing\nprint(data[2:5])   # [30, 40, 50]\nprint(data[::2])   # [10, 30, 50, 70]\nprint(data[::-1])  # [70, 60, 50, 40, 30, 20, 10]\n\n# Slice assignment (unique to lists!)\ndata[1:3] = [200, 300]\nprint(data)  # [10, 200, 300, 40, 50, 60, 70]\n",
        "Indexing & Slicing",
        [
            '### **Q1.** Given `nums = list(range(1, 21))`, extract: first 5, last 5, every 3rd element, and reversed list. Print each.\n',
            '### **Q2.** Use slice assignment to replace elements at index 2-4 in `data = [1,2,3,4,5]` with `[30,40,50]`. Print the result.\n',
            '### **Q3.** Write code to rotate a list left by 2 positions: `[1,2,3,4,5]` → `[3,4,5,1,2]`. Use only slicing.\n',
            '### **Q4.** Given `matrix = [[1,2,3],[4,5,6],[7,8,9]]`, extract the second column `[2,5,8]` using indexing in a loop.\n',
            '### **Q5.** Use negative slicing to get the second-to-last element and the last 3 elements of `data = [10,20,30,40,50,60]`. Print both.\n',
        ]
    ))

    # ── SECTION 3: List Methods ──
    S.append((
        SH(3,"List Methods","In-Place Modification") + '\n\n' +
        WH("Lists have powerful methods for adding, removing, and reordering elements. Most methods modify the list <b>in-place</b> and return <code>None</code>. This is a common gotcha — never write <code>lst = lst.sort()</code>.") + '\n\n' +
        "| Method | Action | Returns |\n"
        "| :--- | :--- | :--- |\n"
        "| `.append(x)` | Add to end | `None` |\n"
        "| `.extend(iter)` | Add multiple items | `None` |\n"
        "| `.insert(i, x)` | Insert at position | `None` |\n"
        "| `.remove(x)` | Remove first occurrence | `None` |\n"
        "| `.pop(i)` | Remove and return at index | The removed item |\n"
        "| `.sort()` | Sort in-place | `None` |\n"
        "| `.reverse()` | Reverse in-place | `None` |\n"
        "| `.index(x)` | Find position | Index int |\n"
        "| `.count(x)` | Count occurrences | Count int |\n\n" +
        WC([("Data accumulation","`results.append(row)` — building datasets row by row"),
            ("Deduplication","`.count()` and `.remove()` for cleaning duplicates"),
            ("Sorting","`data.sort(key=lambda x: x['date'])` — sort records by field")]) + '\n\n' +
        PF("sort() Returns None","<code>lst.sort()</code> modifies in-place and returns <code>None</code>. Writing <code>lst = lst.sort()</code> destroys your list! Use <code>sorted(lst)</code> if you need a new sorted list."),
        "scores = [85, 92, 78, 95, 88]\n\n# Adding elements\nscores.append(76)\nscores.extend([91, 83])\nprint(f'After adding: {scores}')\n\n# Removing\nscores.remove(78)        # Remove by value\npopped = scores.pop(-1)  # Remove last, get value\nprint(f'Removed: {popped}, List: {scores}')\n\n# Sorting\nscores.sort(reverse=True)\nprint(f'Sorted desc: {scores}')\n\n# DANGER: sort() returns None\nresult = scores.sort()\nprint(f'result = {result}')  # None!\n",
        "List Methods",
        [
            '### **Q1.** Start with `lst = [3, 1, 4, 1, 5]`. Use `.append()`, `.extend()`, `.insert()` to add elements. Print the list after each operation.\n',
            '### **Q2.** Given `data = [5, 3, 8, 1, 9, 2]`, sort it in ascending order, then reverse it. Use both in-place methods. Print after each step.\n',
            '### **Q3.** Demonstrate the `sort()` trap: show that `result = [3,1,2].sort()` gives `None`. Then show the correct way using `sorted()`.\n',
            '### **Q4.** Given `items = ["apple", "banana", "apple", "cherry", "apple"]`, count occurrences of `"apple"` and find its first index. Print both.\n',
            '### **Q5.** Write code that removes all occurrences of a value from a list (not just the first). Remove all `0`s from `[1, 0, 2, 0, 3, 0]`.\n',
        ]
    ))

    # ── SECTION 4: Copying Lists ──
    S.append((
        SH(4,"Copying Lists","Shallow vs Deep Copy") + '\n\n' +
        WH("Assignment (<code>b = a</code>) creates a <b>reference</b>, not a copy. <code>.copy()</code> or <code>list(a)</code> creates a <b>shallow copy</b>. For nested lists, you need <code>copy.deepcopy()</code> to get a fully independent copy.") + '\n\n' +
        "| Method | Creates | Nested Objects |\n"
        "| :--- | :--- | :--- |\n"
        "| `b = a` | Reference (alias) | Shared — changes affect both |\n"
        "| `b = a.copy()` | Shallow copy | Still shared (inner refs) |\n"
        "| `b = a[:]` | Shallow copy | Still shared (inner refs) |\n"
        "| `b = copy.deepcopy(a)` | Deep copy | Fully independent |\n\n" +
        WC([("Data integrity","Always copy before modifying to preserve original data"),
            ("Function safety","Copy inputs inside functions to avoid side effects"),
            ("Snapshot patterns","Take deep copies as checkpoints in data transformations")]) + '\n\n' +
        PF("Shallow Copy Surprise","With nested lists, <code>.copy()</code> only copies the outer list. Inner lists are still <b>shared references</b>. Modifying an inner list in the copy changes the original too."),
        "import copy\n\n# Reference vs Copy\noriginal = [1, 2, [3, 4]]\nref = original            # Reference — same object\nshallow = original.copy()  # Shallow copy\ndeep = copy.deepcopy(original)  # Deep copy\n\n# Modify nested list\noriginal[2][0] = 99\n\nprint(f'original: {original}')  # [1, 2, [99, 4]]\nprint(f'ref:      {ref}')       # [1, 2, [99, 4]] — affected!\nprint(f'shallow:  {shallow}')   # [1, 2, [99, 4]] — affected!\nprint(f'deep:     {deep}')      # [1, 2, [3, 4]]  — safe!\n",
        "Copying",
        [
            '### **Q1.** Create `a = [1, 2, 3]` and `b = a`. Modify `b.append(4)`. Print both. Explain why `a` changed too.\n',
            '### **Q2.** Fix the above by using `.copy()`. Show that modifying `b` no longer affects `a`.\n',
            '### **Q3.** Create `nested = [[1, 2], [3, 4]]`. Make a shallow copy. Modify `copy[0][0] = 99`. Show that the original also changed.\n',
            '### **Q4.** Fix the nested copy issue using `copy.deepcopy()`. Verify the original is unaffected by changes to the deep copy.\n',
            '### **Q5.** Write a function `safe_process(data)` that takes a list, makes a deep copy internally, sorts the copy, and returns it — leaving the original unchanged. Test it.\n',
        ]
    ))

    return S
