"""Generate Day07 Dictionaries notebook - Part 2: Sections 5-7 + assembly."""
from nb_helpers import *
from day07_part1 import sections_1_to_4
import os

def sections_5_to_7():
    S = []

    # ── SECTION 5: Dictionary Comprehensions ──
    S.append((
        SH(5,"Dictionary Comprehensions","Functional Dictionary Creation") + '\n\n' +
        WH("Just like list comprehensions, <b>dictionary comprehensions</b> provide a concise way to create dictionaries from iterables. The syntax is <code>{key: value for item in iterable if condition}</code>.") + '\n\n' +
        "```python\n# Square numbers mapping\nsquares = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n```\n\n" +
        WC([("Data Transformation","Convert a list of records into a dictionary keyed by ID for fast lookups"),
            ("Filtering Dictionaries","`{k: v for k, v in data.items() if v > 0}` — clean negative values"),
            ("Key Mapping","Mapping original column names to new clean column names")]) + '\n\n' +
        PT("A very common pattern for fast lookups: <code>lookup = {row['id']: row for row in dataset}</code>. This converts an O(n) search into an O(1) dictionary lookup."),
        "names = ['Alice', 'Bob', 'Charlie']\n\n# Create dict mapping name to its length\nname_lengths = {name: len(name) for name in names}\nprint(f'Lengths: {name_lengths}')\n\n# Filtering an existing dictionary\nprices = {'apple': 1.2, 'banana': 0.5, 'cherry': 2.5}\nexpensive = {k: v for k, v in prices.items() if v > 1.0}\nprint(f'Expensive items: {expensive}')\n\n# Swapping keys and values\noriginal = {'a': 1, 'b': 2, 'c': 3}\nswapped = {v: k for k, v in original.items()}\nprint(f'Swapped: {swapped}')\n",
        "Dict Comprehensions",
        [
            '### **Q1.** Create a dictionary comprehension that maps numbers 1-5 to their cubes (`x**3`). Print it.\n',
            '### **Q2.** Given `keys = ["a", "b", "c"]` and `values = [1, 2, 3]`, use `zip()` in a comprehension to create a dictionary. Print it.\n',
            '### **Q3.** Filter `data = {"x": -5, "y": 10, "z": -2, "w": 15}` to keep only positive values using a comprehension. Print the result.\n',
            '### **Q4.** Swap keys and values in `codes = {"NY": "New York", "CA": "California"}` using a comprehension. Print the result.\n',
            '### **Q5.** Create a dictionary mapping each character in `"Data Science"` to its uppercase version. Notice what happens to duplicate characters. Print it.\n',
        ]
    ))

    # ── SECTION 6: Merging & Updating ──
    S.append((
        SH(6,"Merging & Updating","Combining Dictionaries") + '\n\n' +
        WH("Python provides multiple ways to combine dictionaries. <code>dict.update()</code> modifies in-place. Python 3.9+ introduced the <b>merge operator <code>|</code></b> which creates a new dictionary.") + '\n\n' +
        "| Operation | Syntax | Effect |\n"
        "| :--- | :--- | :--- |\n"
        "| Update in-place | `d1.update(d2)` | `d1` is modified. `d2` keys overwrite `d1`. Returns `None`. |\n"
        "| Merge operator (3.9+) | `d3 = d1 \\| d2` | Creates new dict `d3`. `d2` overwrites `d1`. |\n"
        "| Unpacking | `d3 = {**d1, **d2}` | Creates new dict. Pre-3.9 equivalent of `\\|`. |\n\n" +
        WC([("Configuration Management","Merge `default_config` with `user_config` (user overrides default)"),
            ("Aggregating Data","Combining parsed JSON objects from multiple API endpoints")]) + '\n\n' +
        PF("Right Wins","When merging, if the same key exists in both dictionaries, the value from the dictionary on the <b>right side</b> (or passed to `.update()`) wins."),
        "defaults = {'theme': 'light', 'port': 8080, 'debug': False}\nuser_prefs = {'theme': 'dark', 'verbose': True}\n\n# 1. Update in-place\nactive_config = defaults.copy()\nactive_config.update(user_prefs)\nprint(f'Update: {active_config}')\n\n# 2. Merge operator (Python 3.9+)\nmerged_config = defaults | user_prefs\nprint(f'Merge |: {merged_config}')\n\n# 3. Kwargs unpacking (older Python)\nunpacked = {**defaults, **user_prefs}\nprint(f'Unpacked: {unpacked}')\n",
        "Merging & Updating",
        [
            '### **Q1.** Merge `d1 = {"a": 1, "b": 2}` and `d2 = {"b": 99, "c": 3}` using `.update()`. Note the value of `"b"`. Print `d1`.\n',
            '### **Q2.** Merge the same dictionaries using the `|` operator into a new dict `d3`. Print `d3`.\n',
            '### **Q3.** Merge three dictionaries `d1`, `d2`, `d3 = {"d": 4}` using kwargs unpacking `{**d1, **d2, **d3}`. Print the result.\n',
            '### **Q4.** Try to merge a dictionary and a list `{"a": 1} | ["b", 2]`. Catch the TypeError and print it.\n',
            '### **Q5.** Write a function `apply_defaults(config, defaults)` that returns a new config where `config` values override `defaults`. Test it.\n',
        ]
    ))

    # ── SECTION 7: Nested Dictionaries ──
    S.append((
        SH(7,"Nested Dictionaries","JSON & Deep Data") + '\n\n' +
        WH("A dictionary can contain other dictionaries (or lists, sets, etc.) as values. This is essential for working with hierarchical data like <b>JSON</b> or <b>NoSQL document databases</b>.") + '\n\n' +
        "```python\nusers = {\n    'u1': {'name': 'Alice', 'role': 'Admin'},\n    'u2': {'name': 'Bob', 'role': 'User'}\n}\n# Access nested data\nalice_role = users['u1']['role']\n```\n\n" +
        WC([("API Parsing","Traversing complex JSON responses from web services"),
            ("Document Storage","Representing MongoDB documents in memory"),
            ("Configuration Trees","Hierarchical settings (e.g., `config['database']['host']`)")]) + '\n\n' +
        PF("Deep Missing Keys","Accessing <code>data['user']['address']['zip']</code> will crash if <i>any</i> key in the chain is missing. Use chained `.get()` or handle exceptions."),
        "import json\n\n# JSON-like nested structure\napi_response = {\n    'status': 200,\n    'data': {\n        'user': {'id': 101, 'name': 'Alice'},\n        'permissions': ['read', 'write']\n    }\n}\n\n# Accessing deep data\nuser_name = api_response['data']['user']['name']\nperms = api_response['data']['permissions']\nprint(f'User: {user_name}, Perms: {perms}')\n\n# Safe deep access (avoid KeyError)\ndata_obj = api_response.get('data', {})\naddress = data_obj.get('user', {}).get('address', 'No Address')\nprint(f'Address: {address}')\n\n# Pretty printing nested dicts\nprint(\"\\nPretty printed:\")\nprint(json.dumps(api_response, indent=2))\n",
        "Nested Dictionaries",
        [
            '### **Q1.** Create a nested dictionary representing a company with two departments (`"Sales"`, `"Engineering"`), each containing a list of employee names. Print it.\n',
            '### **Q2.** Access and print the first employee in the `"Engineering"` department from the dictionary above.\n',
            '### **Q3.** Add a new department `"HR"` with an empty list of employees to the company dictionary. Print the updated dict.\n',
            '### **Q4.** Safely extract `"city"` from `data = {"user": {"id": 1}}` using chained `.get()` to avoid KeyError. Print the default `"Unknown"`.\n',
            '### **Q5.** Use `json.dumps(dict, indent=4)` to pretty-print your company dictionary. Print the result.\n',
        ]
    ))

    return S

TASKS = [
    ("Frequency Counter", "Write a function `count_words(text)` that takes a string, splits it into words (lowercase), and returns a dictionary of word frequencies. Handle punctuation if you can. Test with a short paragraph."),
    ("Dict Inverter", "Write a function `invert_dict(d)` that swaps keys and values. Since multiple keys might have the same value, the new dictionary should map `value -> list_of_keys`. Test with `{'a':1, 'b':2, 'c':1}`."),
    ("JSON Path Extractor", "Write a function `extract_path(data, path_list)` that safely navigates a nested dict. `extract_path(data, ['user', 'address', 'city'])`. Return `None` if any key is missing."),
    ("Data Grouper", "Given a list of dictionaries `[{'dept': 'HR', 'name': 'Alice'}, {'dept': 'IT', 'name': 'Bob'}, {'dept': 'HR', 'name': 'Charlie'}]`, write code to group them by department: `{'HR': ['Alice', 'Charlie'], 'IT': ['Bob']}`."),
    ("Config Merger", "Write a function `deep_merge(d1, d2)` that merges two dictionaries. If a key contains a nested dictionary in both, recursively merge them. Otherwise, `d2` overwrites `d1`."),
]

INTERVIEWS = [
    "Write a function `two_sum(nums, target)` using a dictionary to find the pair of indices in O(n) time.",
    "Write a function `is_isomorphic(s, t)` that checks if two strings are isomorphic using a dictionary mapping.",
    "Write a function `lru_cache_simulation(queries, capacity)` using `collections.OrderedDict` to track recently used keys.",
    "Write a function `group_anagrams(strs)` using a dictionary where the key is the sorted string and the value is a list of anagrams.",
    "Write a function `first_unique_char(s)` using a dictionary to count frequencies, then a second pass to find the first with count 1.",
    "Implement a `Trie` (Prefix Tree) data structure using nested dictionaries. Include `insert` and `search` methods.",
    "Write a function `find_itinerary(tickets)` given a list of `(source, dest)` tuples, reconstruct the full itinerary using a dict.",
    "Write a function `contains_duplicate_nearby(nums, k)` checking if duplicate values exist within distance `k` using a dict.",
    "Write a function `longest_consecutive_sequence(nums)` using a dictionary/set for O(n) time complexity.",
    "Write a function `sort_characters_by_frequency(s)` returning a string with characters sorted by decreasing frequency.",
    "Write a function `subarray_sum(nums, k)` that finds the total number of continuous subarrays whose sum equals `k`. Use a dict to store prefix sums.",
    "Write a function `roman_to_int(s)` using a dictionary to map Roman numerals to integers.",
    "Write a function `majority_element(nums)` using a dictionary to count frequencies and find the element appearing > n/2 times.",
    "Implement an `LFUCache` (Least Frequently Used) using combinations of dictionaries for O(1) operations.",
    "Write a function `design_hashmap()` from scratch using a list of lists (chaining) without using the built-in dictionary.",
    "Write a function `word_pattern(pattern, s)` using dictionaries to check a bijective mapping between a pattern and words.",
    "Write a function `find_all_anagrams_in_string(s, p)` using sliding window and dictionaries to count characters.",
    "Write a function `flatten_nested_dict(d)` that flattens `{'a': {'b': 1}}` into `{'a.b': 1}`.",
    "Write a function `dict_difference(d1, d2)` returning keys added, removed, and modified between two dictionaries.",
    "Write a function `top_k_frequent_elements(nums, k)` using a dictionary and sorting/heap.",
    "Explain the internal implementation of a Python dictionary (Hash Table, open addressing, PyDictObject).",
    "Write a function `check_valid_sudoku(board)` using dictionaries/sets to track seen numbers in rows, columns, and 3x3 grids.",
    "Write a function `minimum_window_substring(s, t)` using a dictionary to track character counts in a sliding window.",
    "Write a function `find_duplicate_file(paths)` grouping identical file contents (using content hash as dict key).",
    "Implement `defaultdict` behavior manually by subclassing `dict` and overriding the `__missing__` method.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Creation | Key-Value pairs, hashable keys, O(1) lookup | JSON modeling, caching |\n"
    "| 2 | Access/Modify | Use `.get(key, default)` for safety | Robust API parsing |\n"
    "| 3 | Views | `keys()`, `values()`, `items()` are dynamic | Data extraction |\n"
    "| 4 | Iteration | `for k, v in d.items():` is standard | Data transformation loops |\n"
    "| 5 | Comprehensions | `{k: v for ...}` creates dicts cleanly | Fast filtering & mapping |\n"
    "| 6 | Merging | `d1 \\| d2` or `.update()` | Combining configurations |\n"
    "| 7 | Nested Dicts | Dicts inside dicts represent JSON | NoSQL, complex payloads |\n"
)

CHECKLIST = (
    "- [ ] I understand why dictionary keys must be immutable (hashable).\n"
    "- [ ] I know to use `.get()` to safely extract data without crashing.\n"
    "- [ ] I can iterate efficiently using `.items()`.\n"
    "- [ ] I can create dictionaries quickly using dictionary comprehensions.\n"
    "- [ ] I know how to merge two dictionaries using the `|` operator or `.update()`.\n"
    "- [ ] I understand how to navigate nested dictionaries (JSON objects).\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_4() + sections_5_to_7()
    nb = build(
        day=7, title="Dictionaries",
        obj_text="Dictionaries are the most critical data structure in modern programming. They map keys to values with lightning-fast O(1) lookups and are the exact equivalent of JSON objects. Today we master dictionary manipulation, safe extraction, functional comprehensions, and deep nested hierarchies. Mastery of dictionaries is non-negotiable for working with APIs and DataFrames.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Creation | `{'k': 'v'}`, `dict(k='v')` | JSON modeling |\n"
            "| 2 | Access & Safety | `.get(k, default)` | Avoid KeyError crashes |\n"
            "| 3 | Views | `.keys()`, `.values()`, `.items()` | Fast dynamic views |\n"
            "| 4 | Iteration | `for k, v in d.items():` | Data processing |\n"
            "| 5 | Comprehensions | `{k: v for k, v in data}` | Transformation |\n"
            "| 6 | Merging | `d1 \\| d2`, `.update()` | Aggregating data |\n"
            "| 7 | Nested Dicts | Deep hierarchical data | API Payloads |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 8 - Control Flow: Advanced If/Else, Match-Case, and Logic Design"
    )
    save(nb, os.path.join('notebooks', 'Day07_Dictionaries_Blank.ipynb'))
    print("Day 07 generated successfully!")
