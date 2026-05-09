"""Generate Day 11 and 12."""
from nb_helpers import *
import os

def build_day11():
    S = []
    
    S.append((
        SH(1,"Modules & Packages","Organizing Code") + '\n\n' +
        WH("A <b>module</b> is just a `.py` file containing Python code. A <b>package</b> is a directory of modules with an `__init__.py` file. Instead of writing monolithic 5000-line scripts, we split code into logical modules and <code>import</code> them.") + '\n\n' +
        "```python\n# 1. Import whole module\nimport math\nmath.sqrt(16)\n\n# 2. Import specific function\nfrom math import sqrt\nsqrt(16)\n\n# 3. Import with alias\nimport pandas as pd\n```\n\n" +
        WC([("Code Reuse","Import the same data-cleaning functions across multiple notebooks"),
            ("Namespace Management","`math.pi` and `numpy.pi` can coexist without overwriting each other")]) + '\n\n' +
        PF("Circular Imports","If Module A imports Module B, and Module B imports Module A, Python will crash with an ImportError. Always structure code hierarchically to avoid circular dependencies."),
        "# Importing standard library module\nimport statistics as stats\n\ndata = [10, 20, 30, 40, 50]\nprint(f'Mean: {stats.mean(data)}')\nprint(f'Median: {stats.median(data)}')\n\n# Importing specific items\nfrom datetime import date, timedelta\n\ntoday = date.today()\ntomorrow = today + timedelta(days=1)\nprint(f'Tomorrow is: {tomorrow}')\n",
        "Modules",
        [
            '### **Q1.** Import the `random` module. Use `random.randint(1, 10)` to print a random number.\n',
            '### **Q2.** Import `math` using an alias `m`. Print the value of `m.pi`.\n',
            '### **Q3.** Import ONLY the `choice` function from `random`. Use it to pick a random color from `["Red", "Blue", "Green"]`.\n',
            '### **Q4.** Try to import a module that doesn\'t exist (e.g., `import fake_module`). Catch the `ModuleNotFoundError` and print a friendly message.\n',
            '### **Q5.** Explain why `import pandas as pd` is preferred over `from pandas import *`.\n',
        ]
    ))
    
    S.append((
        SH(2,"The Standard Library","Batteries Included") + '\n\n' +
        WH("Python's philosophy is 'Batteries Included'. It comes with a massive standard library covering file systems, mathematics, network protocols, and data formats without needing `pip install`.") + '\n\n' +
        "| Module | Purpose | Example Use |\n"
        "| :--- | :--- | :--- |\n"
        "| `os` / `sys` | Operating System | File paths, command-line args |\n"
        "| `json` | Data Format | Parsing API responses |\n"
        "| `collections` | Data Structures | `Counter`, `defaultdict` |\n"
        "| `datetime` | Time & Dates | Timestamps, durations |\n\n" +
        WC([("No Dependencies","Code relies only on built-in tools, making it easy to deploy on servers"),
            ("Reliability","Standard library modules are heavily tested and rarely introduce breaking changes")]) + '\n\n' +
        PT("Before installing a third-party package for a simple task, check the standard library. For example, use <code>pathlib</code> for file paths instead of string manipulation."),
        "import os\nimport sys\nimport collections\n\n# os: File system information\ncwd = os.getcwd()\nprint(f'Current Directory: {cwd}')\n\n# collections: Advanced data structures\ntext = 'apple banana apple cherry apple'\nword_counts = collections.Counter(text.split())\nprint(f'Top word: {word_counts.most_common(1)}')\n\n# sys: Python environment info\nprint(f'Python version: {sys.version.split()[0]}')\n",
        "Standard Lib",
        [
            '### **Q1.** Import `json`. Parse `\'{"name": "Alice"}\'` into a dictionary using `json.loads()`. Print the dictionary.\n',
            '### **Q2.** Import `collections.defaultdict`. Create a dict that defaults to `0`. Increment a key `"x"` and print it.\n',
            '### **Q3.** Import `sys`. Print the list of command-line arguments using `sys.argv`.\n',
            '### **Q4.** Import `math`. Calculate the factorial of 5 using `math.factorial()`. Print it.\n',
            '### **Q5.** Import `time`. Use `time.sleep(1)` to pause execution for 1 second, then print "Done".\n',
        ]
    ))
    
    S.append((
        SH(3,"Virtual Environments & pip","Dependency Isolation") + '\n\n' +
        WH("Different projects need different versions of packages. A <b>Virtual Environment (venv)</b> is an isolated folder containing a specific Python interpreter and its own installed packages. <code>pip</code> is the package installer used to download libraries from PyPI (Python Package Index).") + '\n\n' +
        "```bash\n# 1. Create a virtual environment\npython -m venv myenv\n\n# 2. Activate it (Windows)\nmyenv\\Scripts\\activate\n\n# 3. Install a package\npip install requests==2.31.0\n\n# 4. Save dependencies\npip freeze > requirements.txt\n```\n\n" +
        WC([("Reproducibility","Ensures your code runs on your coworker's machine exactly as it does on yours"),
            ("Conflict Prevention","Project A uses Pandas 1.0, Project B uses Pandas 2.0 without crashing each other")]) + '\n\n' +
        PF("Global Installs","Never use <code>pip install</code> globally on your machine (outside a venv). It will eventually corrupt your system Python installation."),
        "# This is a conceptual demo.\n# In a real script, you'd run these in the terminal.\n\nprint(\"Standard Workflow:\")\nprint(\"1. Create:  python -m venv venv\")\nprint(\"2. Enable:  venv\\\\Scripts\\\\activate\")\nprint(\"3. Install: pip install pandas\")\nprint(\"4. Freeze:  pip freeze > requirements.txt\")\nprint(\"5. Restore: pip install -r requirements.txt\")\n",
        "Pip & Venv",
        [
            '### **Q1.** What command creates a new virtual environment named `env`?\n',
            '### **Q2.** What command activates the environment on Windows? On Mac/Linux?\n',
            '### **Q3.** Write the command to install exactly version `1.5.3` of the `pandas` library.\n',
            '### **Q4.** Explain what `pip freeze > requirements.txt` does and why it is important for version control.\n',
            '### **Q5.** Why should you exclude the virtual environment folder (e.g., `venv/`) from GitHub using `.gitignore`?\n',
        ]
    ))

    TASKS = [
        ("Math Operations", "Create a file `my_math.py` with an `add` function. In your main cell, import it and use it. (Simulate this by writing both blocks)."),
        ("JSON Config", "Import `json`. Create a dictionary, save it to a file `config.json` using `json.dump()`, then read it back using `json.load()`."),
        ("Collections Counter", "Write a function that takes a long string, removes punctuation, and uses `collections.Counter` to find the 3 most common words."),
        ("Datetime Math", "Import `datetime`. Calculate how many days have passed since January 1st, 2000. Print the result."),
        ("Requirements", "Write a Python script that reads a simulated `requirements.txt` file and prints out only the package names, stripping out the version numbers (`==X.Y.Z`)."),
    ]
    
    INTERVIEWS = [
        "Write a Python script that creates a folder `mypack/` with an `__init__.py` containing `version = '1.0'`. Then import it and print `mypack.version`.",
        "Write code that imports `math` two ways: `import math` and `from math import *`. Show how `*` can shadow a local variable named `pow` by printing `pow` before and after.",
        "Write code that appends a custom directory to `sys.path` using `sys.path.insert(0, '/custom')`. Print `sys.path` to show the change.",
        "Write a script that reads `sys.path` and prints each path entry on its own line, numbered 1 through N.",
        "Write a Python script that reads a `requirements.txt` string `'pandas==2.0.0\\nnumpy==1.24.0'` and prints each package name and version as a formatted table.",
        "Write code to parse `'pandas==2.0.0\\nnumpy==1.24.0'` and extract just the package names `['pandas', 'numpy']` into a list.",
        "Write code that creates a file called `math.py` with `print('Custom math!')`, then shows what happens when you try `import math`. Explain the shadowing.",
        "Write code using `os.path.join('data', 'users', 'file.csv')` and compare it with manual string concatenation `'data' + '/' + 'users'`. Print both results.",
        "Write code using `collections.defaultdict(list)` to group words by their first letter from `['apple', 'banana', 'avocado', 'blueberry']`.",
        "Write code using `urllib.request.urlopen()` to fetch the HTML of `http://example.com` and print the first 200 characters.",
        "Write a module-like script with a function and an `if __name__ == '__main__':` block. Show what runs when imported vs executed directly.",
        "Write the pip command to upgrade a package to the latest version. Then write Python code using `subprocess.run()` to execute that same command.",
        "Write code using `importlib.metadata.version('pip')` to print the installed version of pip.",
        "Write a function using `datetime.strptime()` to convert `'2023-12-25'` into a datetime object. Print the day of the week.",
        "Write code that uses both `os.path.join()` and `pathlib.Path() / 'subdir' / 'file.txt'` to build the same path. Print both.",
        "Write code using the `json` module: try to load a config file, catch `FileNotFoundError`, and return a default `{'debug': False}` dict.",
        "Write code using `importlib.metadata.version('pip')` to print the installed version of pip programmatically.",
        "Write the pip commands (as strings) to: install, uninstall, and reinstall all packages from a requirements file.",
        "Write code that uses `sys.exit(1)` to terminate a script if a required environment variable is missing. Use `os.environ.get()`.",
        "Write code that prints the absolute path of the `site-packages` directory using `import site; print(site.getsitepackages())`.",
        "Write a function `parse_toml_deps(text)` that extracts dependency names from a TOML-style string like `'[dependencies]\\npandas = \"^2.0\"\\nnumpy = \"^1.24\"'`.",
        "Write code that imports a module, then modifies it, and uses `importlib.reload()` to reload the updated version. Demonstrate with print statements.",
        "Write code that measures the time taken to import `json` vs `pandas` using `time.perf_counter()`. Print both durations.",
        "Write code that checks if a package name exists on PyPI by trying to import it and catching `ModuleNotFoundError`.",
        "Write a Python script using `os.walk()` to recursively list all `.py` files in the current directory. Print each file path.",
    ]

    nb = build(
        day=11, title="Modules & Packages",
        obj_text="To build large-scale applications, you must master code organization. Today we learn how to modularize code into separate files, leverage Python's powerful Standard Library, and isolate project dependencies using virtual environments. These are essential software engineering practices.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Modules | `import`, code splitting |\n| 2 | StdLib | `os`, `json`, `collections` |\n| 3 | Venvs | `pip`, isolation |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Imports | Avoid circular and `*` imports |\n| 2 | Library | Use built-ins before pip installing |\n| 3 | Venvs | Never install globally. Always use requirements.txt |\n",
        checklist="- [ ] I can import specific functions from a module.\n- [ ] I know how to use `os` and `collections`.\n- [ ] I can create and activate a virtual environment.",
        next_up="Day 12 - Advanced Comprehensions"
    )
    save(nb, os.path.join('notebooks', 'Day11_Modules_Blank.ipynb'))

def build_day12():
    S = []
    
    S.append((
        SH(1,"Advanced List Comprehensions","Deep Dive") + '\n\n' +
        WH("We\'ve seen basic list comprehensions. Advanced comprehensions allow for <b>nested loops</b> and <b>if/else conditionals</b>. They are the fastest, most Pythonic way to filter and transform lists.") + '\n\n' +
        "```python\n# If/Else mapping (Ternary inside comprehension)\nresults = ['Pass' if x >= 50 else 'Fail' for x in scores]\n\n# Nested Loops (Flattening a matrix)\nflat = [item for row in matrix for item in row]\n```\n\n" +
        WC([("Data Cleaning","Instantly mapping raw values to standardized categories"),
            ("Matrix Flattening","Converting a list-of-lists (JSON structure) into a flat 1D list")]) + '\n\n' +
        PF("Readability Trap","Never nest more than two loops in a comprehension. If it takes more than 5 seconds to read, convert it to standard <code>for</code> loops."),
        "# Nested loops in comprehensions\nmatrix = [[1, 2], [3, 4], [5, 6]]\nflat = [num for row in matrix for num in row]\nprint(f'Flattened: {flat}')\n\n# Conditionals (Filtering vs Mapping)\n# 1. Filtering (if at the end)\nevens = [x for x in flat if x % 2 == 0]\nprint(f'Evens: {evens}')\n\n# 2. Mapping (if/else at the front)\nlabels = ['Even' if x % 2 == 0 else 'Odd' for x in flat]\nprint(f'Labels: {labels}')\n",
        "Adv List Comp",
        [
            '### **Q1.** Given `matrix = [[1,2,3], [4,5,6]]`, write a comprehension to flatten it into `[1,2,3,4,5,6]`. Print it.\n',
            '### **Q2.** Use a comprehension with an if/else ternary to map `data = [-1, 2, -3, 4]` to `["Neg", "Pos", "Neg", "Pos"]`.\n',
            '### **Q3.** Generate all Cartesian coordinates for `x` in `[0, 1]` and `y` in `[0, 1]` using a nested comprehension resulting in `[(0,0), (0,1), (1,0), (1,1)]`.\n',
            '### **Q4.** Given `names = ["alice", "bob", ""]`, use a comprehension to capitalize valid names and drop empty strings.\n',
            '### **Q5.** Why is `[x if x > 0 for x in data]` invalid syntax? Explain the difference between filtering and mapping syntax.\n',
        ]
    ))
    
    S.append((
        SH(2,"Dict & Set Comprehensions","Dynamic Hash Maps") + '\n\n' +
        WH("Just like lists, you can create <b>Dictionaries</b> and <b>Sets</b> using comprehensions. For dictionaries, use the <code>key: value</code> syntax inside curly braces <code>{}</code>. For sets, just use values inside curly braces.") + '\n\n' +
        "```python\n# Dict Comprehension (Reverse mapping)\nlookup = {value: key for key, value in original.items()}\n\n# Set Comprehension (Unique lengths)\nlengths = {len(word) for word in words}\n```\n\n" +
        WC([("Fast Lookups","Convert a list of user objects into a dictionary keyed by ID for O(1) lookups"),
            ("Deduplication","Extracting a set of unique domains from a list of email strings")]) + '\n\n' +
        PT("When swapping keys and values using <code>{v: k for k,v in d.items()}</code>, remember that if values are not unique, the last one processed will overwrite the others!"),
        "names = ['Alice', 'Bob', 'Charlie', 'Bob']\n\n# Set comprehension (Deduplicates automatically)\nunique_lengths = {len(name) for name in names}\nprint(f'Unique lengths: {unique_lengths}')\n\n# Dict comprehension\nname_to_len = {name: len(name) for name in set(names)}\nprint(f'Dict map: {name_to_len}')\n\n# Filtering a dictionary\nprices = {'apple': 1.0, 'banana': 0.5, 'cherry': 2.0}\nexpensive = {k: v for k, v in prices.items() if v >= 1.0}\nprint(f'Expensive: {expensive}')\n",
        "Dict/Set Comp",
        [
            '### **Q1.** Given `words = ["data", "science", "python"]`, create a dict mapping each word to its first letter. Print it.\n',
            '### **Q2.** Create a set comprehension of the squares of numbers from 1 to 10 that are divisible by 3. Print it.\n',
            '### **Q3.** Given `d = {"a": 10, "b": -5, "c": 20}`, create a new dict containing only positive values.\n',
            '### **Q4.** Swap keys and values for `codes = {"NY": "New York", "CA": "California"}` using a dict comp.\n',
            '### **Q5.** Create a dict comprehension combining `keys=["x", "y"]` and `values=[1, 2]` using `zip()`.\n',
        ]
    ))

    TASKS = [
        ("Matrix Transpose", "Given a 3x3 matrix `[[1,2,3], [4,5,6], [7,8,9]]`, use a nested list comprehension to transpose it (swap rows and columns) into `[[1,4,7], [2,5,8], [3,6,9]]`."),
        ("Frequency Map", "Given a string `text = \"hello world\"`, use a dict comprehension with `text.count()` to create a frequency map of characters. (Note: this is O(n^2), but good practice)."),
        ("Data Cleaner", "Given a list of strings `raw = [\" 10 \", \"20\", \"  \", \"30 \"]`, use a list comprehension to strip whitespace and convert to integers, skipping empty/blank strings."),
        ("ID Lookup", "Given `users = [{'id': 101, 'name': 'Alice'}, {'id': 102, 'name': 'Bob'}]`, create a dict comp that maps `id -> name` for fast O(1) lookups."),
        ("Vowel Set", "Given a long paragraph, use a set comprehension to extract all unique words that start with a vowel (a, e, i, o, u)."),
    ]
    
    INTERVIEWS = [
        "Write a list comprehension to generate the first 20 even numbers.",
        "How do you flatten a 2D list `[[1,2], [3,4]]` using a list comprehension?",
        "Explain the difference in syntax between a list comprehension and a generator expression.",
        "Write a dict comprehension that maps numbers 1-10 to their binary string representation.",
        "Given `dict1 = {'a': 1}` and `dict2 = {'b': 2}`, combine them using a dict comprehension (or `**` unpacking).",
        "What happens in a list comprehension if the `if` condition is placed before the `for` loop?",
        "Write a comprehension that filters out all vowels from a string.",
        "Use a set comprehension to find the common elements between two lists without using `set(a) & set(b)`.",
        "Write a dict comprehension to invert a dictionary `d`, handling non-unique values by mapping to a list of keys.",
        "Given a list of strings, write a comprehension that returns a list of lengths, but only for strings longer than 3 characters.",
        "Write a nested dictionary comprehension to create a multiplication table (1 to 5).",
        "Is a list comprehension faster than a standard `for` loop with `.append()`? Why?",
        "Write a comprehension that parses a list of strings formatted as `'key:value'` into a dictionary.",
        "Explain the memory implications of using a list comprehension vs a generator expression on 10 million rows.",
        "Write a list comprehension that implements the FizzBuzz logic for numbers 1 to 50.",
        "Given a list of dictionaries, write a comprehension to extract the value of the 'name' key, providing 'Unknown' if missing.",
        "Write a comprehension to find all prime numbers up to 100 (can use an external `is_prime` function).",
        "Transpose a matrix without using list comprehensions (using `zip(*matrix)`). Which is better?",
        "Write a dict comprehension that maps characters of a string to their ASCII integer values.",
        "Why shouldn't you use a list comprehension just for its side effects (like printing)?",
        "Write a comprehension to extract the diagonal elements of a square matrix.",
        "Create a list of all possible 2-character combinations from the alphabet using a nested comprehension.",
        "Given `prices = {'apple': 1.0, 'banana': 0.5}`, use a dict comp to apply a 10% discount to all items.",
        "Write a list comprehension that extracts numbers from a string `s = 'abc123def456'`.",
        "Refactor a 3-level deep nested loop into a comprehension. Then explain why you probably shouldn't do that in production code.",
    ]

    nb = build(
        day=12, title="Advanced Comprehensions",
        obj_text="Comprehensions are the signature of Pythonic code. Today we move beyond simple lists to master nested data manipulation, ternary mappings, and O(1) dictionary generations. These techniques drastically reduce lines of code and improve execution speed in data processing pipelines.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Advanced Lists | Nested loops, Ternaries |\n| 2 | Dicts & Sets | `{}`, `k:v` mapping |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Lists | `[val if cond else alt for x in data]` |\n| 2 | Dicts | `{row['id']: row for row in data}` for fast lookups |\n",
        checklist="- [ ] I can write a list comprehension with an if/else ternary.\n- [ ] I can flatten a matrix using nested loops in a comprehension.\n- [ ] I can create a dictionary dynamically.",
        next_up="Day 13 - Exceptions & Error Handling"
    )
    save(nb, os.path.join('notebooks', 'Day12_Comprehensions_Blank.ipynb'))

if __name__ == '__main__':
    build_day11()
    build_day12()
    print("Days 11 and 12 generated successfully!")
