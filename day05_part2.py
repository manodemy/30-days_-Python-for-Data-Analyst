"""Generate Day05 Tuples notebook - Part 2: Sections 4-6 + assembly."""
from nb_helpers import *
from day05_part1 import sections_1_to_3
import os

def sections_4_to_6():
    S = []

    # ── SECTION 4: Named Tuples ──
    S.append((
        SH(4,"Named Tuples","Self-Documenting Records") + '\n\n' +
        WH("<code>collections.namedtuple</code> creates tuple subclasses with <b>named fields</b>. You get the immutability and performance of tuples, plus the readability of accessing fields by name instead of index.") + '\n\n' +
        "```python\nfrom collections import namedtuple\nEmployee = namedtuple('Employee', ['name', 'age', 'dept'])\nemp = Employee('Alice', 30, 'Engineering')\nprint(emp.name)  # Alice (instead of emp[0])\n```\n\n" +
        WC([("Database rows","Map query results to named fields for readable access"),
            ("Config objects","Immutable configuration with meaningful attribute names"),
            ("API responses","Structure API data with clear field names"),
            ("CSV records","Parse CSV rows into typed, named records")]) + '\n\n' +
        PT("Named tuples support <code>._asdict()</code> to convert to dict, <code>._replace()</code> to create modified copies, and <code>._fields</code> to list field names."),
        "from collections import namedtuple\n\n# Define a record type\nEmployee = namedtuple('Employee', ['name', 'age', 'dept', 'salary'])\n\n# Create instances\nalice = Employee('Alice', 30, 'Engineering', 95000)\nbob = Employee(name='Bob', age=25, dept='Marketing', salary=72000)\n\n# Access by name (readable!)\nprint(f'{alice.name} in {alice.dept}: ${alice.salary:,}')\n\n# Still works with indexing\nprint(f'Name: {alice[0]}, Age: {alice[1]}')\n\n# Useful methods\nprint(f'Fields: {Employee._fields}')\nprint(f'As dict: {alice._asdict()}')\n\n# Create modified copy\nsenior_alice = alice._replace(salary=110000)\nprint(f'Promoted: {senior_alice}')\n",
        "Named Tuples",
        [
            '### **Q1.** Create a `Point` named tuple with fields `x, y`. Create two points and compute the distance between them. Print the result.\n',
            '### **Q2.** Create a `Student` named tuple with `name, grade, gpa`. Create 3 students and find the one with highest GPA. Print the winner.\n',
            '### **Q3.** Use `._asdict()` to convert a named tuple to a dictionary. Use `._replace()` to create a modified copy. Print both.\n',
            '### **Q4.** Parse CSV-style data into named tuples: from `"Alice,28,NYC"` create a `Person(name, age, city)`. Print with field names.\n',
            '### **Q5.** Create a list of 5 `Product(name, price, qty)` named tuples. Write code to find total inventory value (`price * qty` for all). Print it.\n',
        ]
    ))

    # ── SECTION 5: Tuples vs Lists ──
    S.append((
        SH(5,"Tuples vs Lists","When to Use Which") + '\n\n' +
        WH("The choice between tuple and list depends on your intent: use <b>tuples for fixed, heterogeneous records</b> (like database rows) and <b>lists for variable-length, homogeneous collections</b> (like a series of measurements). Tuples signal \"this data should not change.\"") + '\n\n' +
        "| Feature | Tuple | List |\n"
        "| :--- | :--- | :--- |\n"
        "| Mutable? | No | Yes |\n"
        "| Speed | Faster | Slower |\n"
        "| Memory | Less | More |\n"
        "| Hashable? | Yes (if contents are) | No |\n"
        "| Dict key? | Yes | No |\n"
        "| Methods | 2 (count, index) | 11+ |\n"
        "| Use for | Fixed records | Dynamic collections |\n\n" +
        WC([("Dict keys","Tuples can be dictionary keys (hashable): `{(lat, lon): 'city'}`"),
            ("Set elements","Tuples can be added to sets; lists cannot"),
            ("Thread safety","Immutable tuples are inherently thread-safe"),
            ("Performance","Tuple creation is ~5-10x faster than list creation")]) + '\n\n' +
        PF("Mutable Elements Inside Tuples","A tuple containing a list <code>t = ([1, 2], 3)</code> cannot be hashed (unhashable). The tuple itself is immutable, but the list inside can still be modified: <code>t[0].append(99)</code> works!"),
        "import timeit\n\n# Speed comparison\nlist_time = timeit.timeit('[1, 2, 3, 4, 5]', number=1000000)\ntuple_time = timeit.timeit('(1, 2, 3, 4, 5)', number=1000000)\nprint(f'List creation:  {list_time:.3f}s')\nprint(f'Tuple creation: {tuple_time:.3f}s')\nprint(f'Tuple is {list_time/tuple_time:.1f}x faster')\n\n# Tuples as dict keys\nlocations = {\n    (40.7128, -74.0060): 'New York',\n    (51.5074, -0.1278): 'London',\n    (35.6762, 139.6503): 'Tokyo',\n}\nprint(locations[(40.7128, -74.0060)])  # New York\n\n# Mutable element inside tuple\nt = ([1, 2], 'hello')\nt[0].append(3)  # This works!\nprint(t)  # ([1, 2, 3], 'hello')\n",
        "Tuples vs Lists",
        [
            '### **Q1.** Time the creation of a tuple vs list with 1000 elements using `timeit`. Print which is faster and by how much.\n',
            '### **Q2.** Use a tuple as a dictionary key: create a mapping from `(latitude, longitude)` to city names for 3 cities. Look up one coordinate.\n',
            '### **Q3.** Try adding a list and a tuple to a `set`. Which works? Which raises `TypeError`? Explain why (hashability).\n',
            '### **Q4.** Show that a tuple containing a list `([1,2], 3)` can have its list modified but the tuple itself cannot be reassigned. Demonstrate both.\n',
            '### **Q5.** Given a dataset scenario: 1000 records, each with 5 fixed fields. Argue whether to store as list-of-tuples or list-of-lists. Test memory with `sys.getsizeof`.\n',
        ]
    ))

    # ── SECTION 6: Tuple Patterns ──
    S.append((
        SH(6,"Professional Tuple Patterns","Real-World Applications") + '\n\n' +
        WH("Tuples shine in specific patterns: <b>multiple return values</b>, <b>dict items iteration</b>, <b>enumerate results</b>, and <b>zip pairings</b>. Recognizing where Python already uses tuples helps you write more idiomatic code.") + '\n\n' +
        "**Where Python uses tuples implicitly:**\n\n"
        "* `dict.items()` → `(key, value)` tuples\n"
        "* `enumerate()` → `(index, value)` tuples\n"
        "* `zip()` → tuples of paired elements\n"
        "* Multiple return → `return a, b` packs a tuple\n"
        "* String `%` formatting → `'%s is %d' % (name, age)`\n\n" +
        WC([("Multi-value returns","`mean, std = get_statistics(data)` — clean function interfaces"),
            ("Sorting with keys","`sorted(data, key=lambda x: (x['dept'], -x['salary']))` — multi-level sort"),
            ("Record comparison","Tuples compare element-by-element: `(1, 'b') < (1, 'c')` → `True`")]) + '\n\n' +
        PT("Tuples compare <b>lexicographically</b>: element by element, left to right. Use this for multi-level sorting: <code>sorted(items, key=lambda x: (x.dept, -x.salary))</code>."),
        "# Multiple return values\ndef analyze(data):\n    return min(data), max(data), sum(data)/len(data)\n\nlo, hi, avg = analyze([10, 20, 30, 40, 50])\nprint(f'Min: {lo}, Max: {hi}, Avg: {avg}')\n\n# dict.items() returns tuples\nscores = {'Alice': 95, 'Bob': 82, 'Charlie': 91}\nfor name, score in scores.items():\n    print(f'{name}: {score}')\n\n# Multi-level sort with tuples\nstudents = [('Bob', 85), ('Alice', 92), ('Bob', 78), ('Alice', 88)]\nsorted_students = sorted(students)  # Sorts by name, then score\nprint(f'\\nSorted: {sorted_students}')\n\n# Tuple comparison\nprint((1, 'b') < (1, 'c'))  # True — compares second element\nprint((2, 'a') < (1, 'z'))  # False — first element decides\n",
        "Patterns",
        [
            '### **Q1.** Write a function `stats(data)` that returns `(min, max, mean, median)` as a tuple. Unpack the result and print each value.\n',
            '### **Q2.** Use `enumerate()` on `fruits = ["apple", "banana", "cherry"]` and collect the `(index, value)` tuples into a list. Print it.\n',
            '### **Q3.** Sort `employees = [("Bob", "Sales", 50000), ("Alice", "Engineering", 90000), ("Bob", "Engineering", 75000)]` by department, then by salary descending.\n',
            '### **Q4.** Use `zip()` to combine `keys = ["name", "age", "city"]` and `values = ["Alice", 28, "NYC"]` into a dictionary using `dict(zip(...))`.\n',
            '### **Q5.** Demonstrate tuple comparison: create 5 version tuples like `(1, 2, 3)` and sort them. Print the sorted order.\n',
        ]
    ))

    return S

TASKS = [
    ("Record Processor", "Create 5 employee records as named tuples `(name, dept, salary)`. Write code to: find highest salary, average salary by department, and list employees sorted by salary."),
    ("Coordinate System", "Write functions `distance(p1, p2)` and `midpoint(p1, p2)` that take `(x, y)` tuples. Test with 3 pairs of points and print formatted results."),
    ("Data Converter", "Write a function `csv_to_records(csv_text)` that takes a multi-line CSV string, parses it into a list of named tuples, and returns them. Test with 5 rows of data."),
    ("Immutable Config", "Create a configuration system using nested named tuples: `Config(db=DBConfig(...), api=APIConfig(...))`. Show that values cannot be accidentally modified."),
    ("Frequency Analyzer", "Write a function `top_n(data, n)` that takes a list of values, counts frequencies using tuples `(value, count)`, sorts by count, and returns the top n. Test with a word list."),
]

INTERVIEWS = [
    "Write a function that takes a list of `(x, y)` tuples and returns the point closest to the origin `(0, 0)`.",
    "Implement `tuple_sort(tuples, key_index)` that sorts a list of tuples by the element at `key_index`.",
    "Write a function `group_by_first(pairs)` grouping `[(1,'a'),(1,'b'),(2,'c')]` → `{1:['a','b'], 2:['c']}`.",
    "Write a function `zip_longest(a, b, fill=None)` that zips with fill for shorter list. No `itertools`.",
    "Write a function `unzip(pairs)` that converts `[(1,'a'),(2,'b')]` → `([1,2],['a','b'])`. Use `zip(*pairs)`.",
    "Write a function `most_common(lst, n)` returning n most frequent elements as `(element, count)` tuples.",
    "Implement a simple `Point` class using named tuple with `distance_to()` and `__repr__` methods.",
    "Write a function that finds all pairs in a list that sum to a target, returning as tuples.",
    "Write a function `merge_records(r1, r2)` merging two named tuples, preferring non-None values from r2.",
    "Write a function `running_stats(data)` yielding `(index, value, running_mean, running_max)` tuples.",
    "Write a function to convert a dict to a sorted list of `(key, value)` tuples, sorted by value.",
    "Implement matrix transposition using tuples and `zip()`. Handle non-rectangular inputs.",
    "Write a function `compare_versions(v1, v2)` comparing version tuples like `(1,2,3)` vs `(1,3,0)`.",
    "Write a function `pack_ranges(sorted_nums)` converting `[1,2,3,5,6,8]` → `[(1,3),(5,6),(8,8)]`.",
    "Write a function `cartesian_product(a, b)` returning all `(x, y)` pairs from two tuples.",
    "Write code to find the second largest unique element in a tuple without converting to list or sorting.",
    "Write a function `rotate_tuple(t, n)` rotating a tuple by n positions. `(1,2,3,4), 2` → `(3,4,1,2)`.",
    "Write a function `flatten_tuples(nested)` flattening `((1, 2), (3, (4, 5)))` → `(1, 2, 3, 4, 5)`. Use recursion.",
    "Write a function `weighted_average(data)` taking `[(value, weight), ...]` tuples and computing weighted mean.",
    "Implement a simple `Matrix` as tuple-of-tuples with `get(row, col)`, `transpose()`, and `add(other)` methods.",
    "Write a function `sliding_window(data, size)` returning tuples of each window: `[1,2,3,4], 2` → `[(1,2),(2,3),(3,4)]`.",
    "Write a function `rank(data)` that returns `(value, rank)` tuples, handling ties with average rank.",
    "Write a function `safe_unpack(t, n, default=None)` that unpacks t into n variables, filling with default if too short.",
    "Implement `OrderedPair` ensuring `first <= second`. `OrderedPair(5, 3)` → `OrderedPair(3, 5)`.",
    "Write a function `tuple_diff(t1, t2)` returning elements in t1 but not t2, preserving order and count.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Creation | Immutable; trailing comma for single | Database records, config |\n"
    "| 2 | Indexing | Same as lists; only `count`/`index` methods | Data access |\n"
    "| 3 | Packing/Unpacking | `*` for extended; swap with `a,b=b,a` | Function returns, loops |\n"
    "| 4 | Named Tuples | Named fields; `_asdict()`, `_replace()` | Readable records |\n"
    "| 5 | Tuples vs Lists | Faster, hashable, dict-key-compatible | Performance, safety |\n"
    "| 6 | Patterns | Multi-return, `dict.items()`, sorting | Idiomatic Python |\n"
)

CHECKLIST = (
    "- [ ] I understand tuple immutability and when to prefer tuples over lists.\n"
    "- [ ] I can use packing/unpacking including extended `*` syntax.\n"
    "- [ ] I can create and use named tuples for readable records.\n"
    "- [ ] I know that tuples are hashable and can be dict keys.\n"
    "- [ ] I understand lexicographic tuple comparison for multi-level sorting.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_3() + sections_4_to_6()
    nb = build(
        day=5, title="Tuples",
        obj_text="Tuples are Python's immutable sequences — faster, safer, and more memory-efficient than lists. Today we master tuple creation, unpacking, named tuples, and professional patterns. Understanding tuples is essential because Python uses them everywhere: function returns, dict iteration, enumerate, and zip.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Creation | Immutable, `(42,)` for single | Fixed records |\n"
            "| 2 | Indexing & Methods | `.count()`, `.index()` only | Data access |\n"
            "| 3 | Packing/Unpacking | `a, *rest = data` | Multi-value returns |\n"
            "| 4 | Named Tuples | `namedtuple('Name', fields)` | Readable records |\n"
            "| 5 | Tuples vs Lists | Hashable, faster, less memory | Dict keys, safety |\n"
            "| 6 | Patterns | Sort keys, zip, enumerate | Idiomatic Python |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 6 - Sets: O(1) Lookups, Deduplication, and Set Theory Operations"
    )
    save(nb, os.path.join('notebooks', 'Day05_Tuples_Blank.ipynb'))
    print("Day 05 generated successfully!")
