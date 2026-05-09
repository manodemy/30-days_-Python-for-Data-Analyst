"""Generate Day07 Dictionaries notebook - Part 1: Sections 1-4."""
from nb_helpers import *

def sections_1_to_4():
    S = []

    # ── SECTION 1: Dictionary Creation ──
    S.append((
        SH(1,"Dictionary Creation & Basics","Key-Value Mapping") + '\n\n' +
        WH("A dictionary is a <b>mutable, unordered collection of key-value pairs</b>. It is Python's most powerful data structure, serving as the foundation for JSON parsing, DataFrames, and fast lookups. Keys must be <b>hashable</b> (strings, numbers, tuples), while values can be anything.") + '\n\n' +
        "| Creation Method | Example | Note |\n"
        "| :--- | :--- | :--- |\n"
        "| Braces | `{'a': 1, 'b': 2}` | Standard literal |\n"
        "| `dict()` constructor | `dict(a=1, b=2)` | Clean for string keys |\n"
        "| From pairs | `dict([('a',1), ('b',2)])`| Converting lists of tuples |\n"
        "| `fromkeys()` | `dict.fromkeys(['a','b'], 0)`| Initialize with defaults |\n"
        "| Empty dict | `{}` or `dict()` | Empty dictionary |\n\n" +
        WC([("JSON Data","Dictionaries are the Python equivalent of JSON objects"),
            ("Fast Lookups","Looking up a value by its key is an O(1) operation"),
            ("Data Modeling","Representing real-world entities (e.g., a user profile)")]) + '\n\n' +
        PF("Mutable Keys","You cannot use a list or dictionary as a dictionary key because they are unhashable (mutable). You will get a <code>TypeError: unhashable type: 'list'</code>. Use tuples instead.") + '\n\n' +
        PT("Since Python 3.7, dictionaries maintain <b>insertion order</b>. But never rely on this for logic; if order matters explicitly, document it or use <code>collections.OrderedDict</code> for backward compatibility."),
        "# Creation methods\nuser = {\n    'id': 101,\n    'name': 'Alice',\n    'active': True\n}\n\n# dict() constructor (keys become strings automatically)\nconfig = dict(host='localhost', port=8080, debug=False)\n\n# fromkeys for initialization\nmetrics = dict.fromkeys(['clicks', 'views', 'sales'], 0)\n\nprint(f'User: {user}')\nprint(f'Config: {config}')\nprint(f'Metrics: {metrics}')\n\n# Fast lookup\nprint(f'User Name: {user[\"name\"]}')\n",
        "Dictionary Creation",
        [
            '### **Q1.** Create a dictionary representing a book with keys: `title`, `author`, `year`. Print the dictionary and its type.\n',
            '### **Q2.** Create a dictionary using the `dict()` constructor with kwargs for `x=10, y=20, z=30`. Print it.\n',
            '### **Q3.** Use `dict.fromkeys()` to initialize a dictionary with keys `["mon", "tue", "wed"]` and default value `None`. Print it.\n',
            '### **Q4.** Try to create a dictionary with a list as a key: `{[1, 2]: "value"}`. Catch the `TypeError` and print the error message.\n',
            '### **Q5.** Fix the previous code by using a tuple instead of a list for the key. Print the valid dictionary.\n',
        ]
    ))

    # ── SECTION 2: Accessing & Modifying ──
    S.append((
        SH(2,"Accessing & Modifying Data","Safe Lookups & Updates") + '\n\n' +
        WH("You can access values using <code>dict[key]</code>, but if the key doesn't exist, it raises a <code>KeyError</code>. To safely access data, use the <b><code>.get(key, default)</code></b> method. To add or modify, simply assign <code>dict[key] = value</code>.") + '\n\n' +
        "| Operation | Syntax | Behavior |\n"
        "| :--- | :--- | :--- |\n"
        "| Unsafe Access | `d['key']` | Returns value or raises `KeyError` |\n"
        "| Safe Access | `d.get('key')` | Returns value or `None` (no error) |\n"
        "| Safe w/ Default | `d.get('key', 0)` | Returns value or `0` |\n"
        "| Add / Modify | `d['key'] = val` | Creates new or overwrites existing |\n"
        "| Delete | `del d['key']` | Removes key-value pair |\n"
        "| Pop & Return | `d.pop('key')` | Removes and returns the value |\n\n" +
        WC([("API Parsing","APIs often have missing fields. Use `.get()` to avoid crashing your pipeline"),
            ("Counter Patterns","`d[key] = d.get(key, 0) + 1` is the standard way to count frequencies"),
            ("Configuration Defaults","`port = config.get('port', 80)` applies safe default values")]) + '\n\n' +
        PF("KeyError Crashes","<code>data['missing_key']</code> is the #1 cause of crashes in data pipelines. Always use <code>.get()</code> when parsing external data."),
        "record = {'id': 1, 'name': 'DataPipeline'}\n\n# Adding and Modifying\nrecord['status'] = 'running'  # Add new\nrecord['id'] = 2              # Overwrite\nprint(f'Updated: {record}')\n\n# Safe access\n# print(record['owner'])      # CRASH! KeyError\nprint(record.get('owner'))    # None\nprint(record.get('owner', 'Admin'))  # 'Admin' (fallback)\n\n# Deleting\ndel record['status']\nremoved_id = record.pop('id')\nprint(f'Popped ID: {removed_id}')\nprint(f'Final: {record}')\n",
        "Access & Modification",
        [
            '### **Q1.** Given `user = {"name": "Alice"}`, add a new key `"age"` with value `28`. Then update `"name"` to `"Alice Smith"`. Print the dict.\n',
            '### **Q2.** Demonstrate `KeyError`: try to access `user["city"]` in a try/except block. Print the error message.\n',
            '### **Q3.** Use `.get()` to safely access `"city"` with a default value of `"Unknown"`. Print the result.\n',
            '### **Q4.** Write the standard counting pattern: given `counts = {"a": 1}`, increment `"b"` by 1 using `counts["b"] = counts.get("b", 0) + 1`. Print the dict.\n',
            '### **Q5.** Use `.pop()` to remove `"name"` from `user` and save it to a variable. Print the popped value and the remaining dictionary.\n',
        ]
    ))

    # ── SECTION 3: Dictionary Views ──
    S.append((
        SH(3,"Dictionary Views","Keys, Values, and Items") + '\n\n' +
        WH("Dictionaries provide dynamic <b>view objects</b> through three methods: <code>.keys()</code>, <code>.values()</code>, and <code>.items()</code>. These views update automatically when the dictionary changes and are fast and memory-efficient.") + '\n\n' +
        "| Method | Returns View Of | Example Use |\n"
        "| :--- | :--- | :--- |\n"
        "| `.keys()` | All keys | Checking membership: `'age' in d.keys()` |\n"
        "| `.values()` | All values | Statistics: `sum(d.values())` |\n"
        "| `.items()` | `(key, value)` tuples | Iteration: `for k, v in d.items():` |\n\n" +
        WC([("Column Checks","Check if expected columns exist in a data record using `.keys()`"),
            ("Data Extraction","Extract all metric values for analysis using `.values()`"),
            ("Transformation","Iterate over `.items()` to apply a function to all values")]) + '\n\n' +
        PF("Views are not Lists","Views don't support indexing. <code>d.keys()[0]</code> raises a <code>TypeError</code>. If you need a list, explicitly convert it: <code>list(d.keys())</code>."),
        "scores = {'math': 95, 'physics': 88, 'chem': 92}\n\n# View objects\nkeys = scores.keys()\nvals = scores.values()\nitems = scores.items()\n\nprint(f'Keys: {keys}')\nprint(f'Values: {vals}')\nprint(f'Items: {items}')\n\n# Views are dynamic!\nscores['biology'] = 90\nprint(f'\\nAfter adding biology, keys view auto-updated: \\n{keys}')\n\n# Need a list? Convert it explicitly\nkey_list = list(keys)\nprint(f'First key: {key_list[0]}')\n",
        "Dictionary Views",
        [
            '### **Q1.** Given `data = {"a": 10, "b": 20, "c": 30}`, extract the values and calculate their sum. Print the sum.\n',
            '### **Q2.** Check if the key `"d"` exists in `data.keys()`. Print the boolean result.\n',
            '### **Q3.** Convert `data.items()` to a list of tuples. Print the list.\n',
            '### **Q4.** Prove views are dynamic: assign `view = data.values()`, add `"d": 40` to `data`, then print `view`. Note how it updated.\n',
            '### **Q5.** Try to access `data.keys()[0]`. Catch the TypeError and print the error message. Show the correct way by converting to a list first.\n',
        ]
    ))

    # ── SECTION 4: Iteration Patterns ──
    S.append((
        SH(4,"Iteration Patterns","Looping over Dictionaries") + '\n\n' +
        WH("Iterating directly over a dictionary loops over its <b>keys</b>. To loop over both keys and values, use <code>.items()</code>. This is the most common and Pythonic way to process dictionary data.") + '\n\n' +
        "```python\n# ❌ Bad: Looping keys to get values\nfor k in d:\n    v = d[k]  # Inefficient lookup\n\n# ✅ Good: Unpacking items directly\nfor k, v in d.items():\n    print(k, v)\n```\n\n" +
        WC([("Formatting Output","Printing structured reports of metrics or configuration"),
            ("Data Cleaning","Iterating over items to clean strings or convert types"),
            ("Filtering","Looping to build a new dictionary with specific key-value pairs")]) + '\n\n' +
        PT("You cannot add or remove keys from a dictionary while iterating over it. It will raise a <code>RuntimeError: dictionary changed size during iteration</code>. If you must modify keys, iterate over a copy or build a new dictionary."),
        "config = {'host': 'localhost', 'port': 5432, 'user': 'admin'}\n\n# Default iteration is keys\nprint(\"Keys only:\")\nfor k in config:\n    print(f\"- {k}\")\n\n# Iterating values\nprint(\"\\nValues only:\")\nfor v in config.values():\n    print(f\"- {v}\")\n\n# The Pythonic Way: items() unpacking\nprint(\"\\nItems (Keys & Values):\")\nfor key, value in config.items():\n    print(f\"{key.upper()}: {value}\")\n",
        "Iteration",
        [
            '### **Q1.** Iterate over `prices = {"apple": 1.2, "banana": 0.5}` and print just the keys using a standard `for` loop.\n',
            '### **Q2.** Iterate over `prices.values()` and print each value formatted as currency (e.g., `$1.20`).\n',
            '### **Q3.** Use `.items()` to iterate over `prices` and print `"[Item] costs $[Price]"`.\n',
            '### **Q4.** Write a loop over `.items()` that creates a new dictionary `expensive` containing only items costing more than `$1.00`. Print it.\n',
            '### **Q5.** Demonstrate the RuntimeError: try to `del d[k]` while iterating over `d = {"a":1, "b":2}`. Catch the error and print it.\n',
        ]
    ))

    return S
