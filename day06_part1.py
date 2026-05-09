"""Generate Day06 Sets notebook - Part 1: Sections 1-3."""
from nb_helpers import *

def sections_1_to_3():
    S = []

    # ── SECTION 1: Set Creation & Basics ──
    S.append((
        SH(1,"Set Creation & Basics","Unordered, Unique Elements") + '\n\n' +
        WH("A set is an <b>unordered collection of unique, hashable elements</b>. Sets are defined by curly braces <code>{}</code> (but without key-value pairs) or the <code>set()</code> constructor. Their superpower is <b>fast O(1) membership testing</b> and automatic deduplication.") + '\n\n' +
        "| Creation Method | Example | Note |\n"
        "| :--- | :--- | :--- |\n"
        "| Curly braces | `{1, 2, 3}` | Values must be hashable |\n"
        "| `set()` constructor | `set([1, 2, 2, 3])` | Automatically deduplicates |\n"
        "| Empty set | `set()` | `{}` creates an empty dict! |\n"
        "| Comprehension | `{x**2 for x in range(5)}` | Set comprehension |\n\n" +
        WC([("Data Deduplication","`unique_users = set(user_ids)` — instant deduplication"),
            ("Membership Testing","Checking if an item exists is exponentially faster than lists"),
            ("Vocabulary Building","Finding unique words in a document corpus")]) + '\n\n' +
        PF("Empty Set Trap","<code>{}</code> creates an <b>empty dictionary</b>, not an empty set. You must use <code>set()</code> to create an empty set.") + '\n\n' +
        PT("Sets can only contain <b>hashable</b> (immutable) items. You cannot put a list or a dictionary inside a set, but you can put a tuple."),
        "# Creation methods\nnums = {1, 2, 3, 4, 5}\nletters = set('hello')  # string to set\nempty = set()         # Empty set\n\nprint(f'nums: {nums}')\nprint(f'letters (deduplicated & unordered): {letters}')\nprint(f'empty: {type(empty)}')\n\n# Empty dict trap\nwrong_empty = {}\nprint(f'wrong_empty is a dict: {type(wrong_empty)}')\n\n# Fast deduplication\nduplicates = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]\nunique_items = set(duplicates)\nprint(f'Unique list: {list(unique_items)}')\n",
        "Set Creation",
        [
            '### **Q1.** Create a set of your 3 favorite colors. Then create an empty set. Print their types.\n',
            '### **Q2.** Convert the string `"abracadabra"` to a set. Print it. Explain why the length is much shorter.\n',
            '### **Q3.** Try to create a set containing a list: `s = {1, 2, [3, 4]}`. Catch the `TypeError` and print the error message (unhashable type).\n',
            '### **Q4.** Create a set containing a tuple: `s = {1, 2, (3, 4)}`. Print the set. Why does this work but lists do not?\n',
            '### **Q5.** Use a set comprehension to create a set of the lengths of these words: `["data", "science", "python", "data", "code"]`. Print it.\n',
        ]
    ))

    # ── SECTION 2: Set Theory Operations ──
    S.append((
        SH(2,"Set Theory Operations","Mathematical Relational Logic") + '\n\n' +
        WH("Python sets support mathematical operations like <b>union</b>, <b>intersection</b>, <b>difference</b>, and <b>symmetric difference</b>. These can be performed using operators (e.g., <code>|</code>, <code>&amp;</code>) or methods (e.g., <code>.union()</code>). Operators require both operands to be sets, while methods accept any iterable.") + '\n\n' +
        "| Operation | Operator | Method | Meaning |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| Union | `A \\| B` | `A.union(B)` | Elements in A or B (or both) |\n"
        "| Intersection | `A & B` | `A.intersection(B)` | Elements in both A and B |\n"
        "| Difference | `A - B` | `A.difference(B)` | Elements in A but not in B |\n"
        "| Symmetric Diff | `A ^ B` | `A.symmetric_difference(B)`| Elements in exactly one set |\n\n" +
        WC([("Cohort Analysis","Find users who bought Product A AND Product B (Intersection)"),
            ("Churn Analysis","Users active last month MINUS users active this month (Difference)"),
            ("A/B Testing","Combine unique user IDs from two experiment arms (Union)")]) + '\n\n' +
        PF("Order Matters in Difference","<code>A - B</code> is not the same as <code>B - A</code>. The difference operation is <b>asymmetric</b>."),
        "A = {1, 2, 3, 4}\nB = {3, 4, 5, 6}\n\nprint(f'Union (A | B): {A | B}')\nprint(f'Intersection (A & B): {A & B}')\nprint(f'Difference (A - B): {A - B}')\nprint(f'Difference (B - A): {B - A}')\nprint(f'Sym Diff (A ^ B): {A ^ B}')\n\n# Methods accept iterables (lists, strings, etc.)\nC = {1, 2, 3}\nprint(f'Union with list: {C.union([3, 4, 5])}')\n",
        "Set Operations",
        [
            '### **Q1.** Given `engineers = {"Alice", "Bob", "Charlie"}` and `managers = {"Charlie", "David", "Eve"}`, find who is both an engineer and a manager.\n',
            '### **Q2.** Using the same sets, find all unique employees across both roles (Union). Print the result.\n',
            '### **Q3.** Find employees who are engineers but NOT managers. Find employees who are managers but NOT engineers. Print both.\n',
            '### **Q4.** Find employees who hold exactly ONE role (not both). Print the symmetric difference.\n',
            '### **Q5.** Demonstrate that operators require sets: try `{1, 2} | [2, 3]`. Then show how to fix it using the `.union()` method.\n',
        ]
    ))

    # ── SECTION 3: Set Methods & Modification ──
    S.append((
        SH(3,"Set Methods & Modification","Dynamic Set Updates") + '\n\n' +
        WH("Sets are mutable. You can add or remove elements using methods. Unlike lists, sets have no concept of index or order, so you cannot use `append()` or `pop(i)`.") + '\n\n' +
        "| Method | Action | Note |\n"
        "| :--- | :--- | :--- |\n"
        "| `.add(x)` | Add one item | Does nothing if already exists |\n"
        "| `.update(iter)` | Add multiple items | Like `.extend()` for lists |\n"
        "| `.remove(x)` | Remove item x | Raises `KeyError` if x not found |\n"
        "| `.discard(x)` | Remove item x | <b>Does nothing</b> if x not found (safe) |\n"
        "| `.pop()` | Remove & return random item | Raises `KeyError` if empty |\n"
        "| `.clear()` | Remove all items | Leaves `set()` |\n\n" +
        WC([("Incremental Processing","Add seen IDs to a set to track processed records: `seen.add(row_id)`"),
            ("Safe Cleanup","Use `.discard()` to remove elements without needing `if item in set:` checks")]) + '\n\n' +
        PF("remove() vs discard()","Always use <code>.discard()</code> unless you specifically want your program to crash when trying to remove an element that isn't there."),
        "s = {1, 2, 3}\n\n# Adding\ns.add(4)\ns.add(4)  # No effect, duplicates ignored\ns.update([5, 6, 7])\nprint(f'After adding: {s}')\n\n# Removing\ns.remove(7)\n# s.remove(99)  # Would raise KeyError!\ns.discard(99)   # Safe, no error\nprint(f'After removal: {s}')\n\n# Popping (removes arbitrary element)\npopped = s.pop()\nprint(f'Popped {popped}, remaining: {s}')\n",
        "Set Methods",
        [
            '### **Q1.** Start with `s = set()`. Add elements `1`, `2`, and `2` again. Print the set.\n',
            '### **Q2.** Update the set with a list `[3, 4, 5]` and a string `"hello"`. Print the result. Notice how the string is handled.\n',
            '### **Q3.** Demonstrate the difference between `.remove()` and `.discard()` by trying to remove an element that does not exist. Use a try/except block for `.remove()`.\n',
            '### **Q4.** Use a while loop and `.pop()` to empty a set of `5` elements, printing each popped item. Print the final set to confirm it is empty.\n',
            '### **Q5.** Write a function `add_if_missing(s, item)` that adds an item and returns `True` if it was added, or `False` if it was already there.\n',
        ]
    ))

    return S
