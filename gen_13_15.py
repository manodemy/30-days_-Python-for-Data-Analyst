"""Generate Days 13 to 15."""
from nb_helpers import *
import os

def build_day13():
    S = []
    
    S.append((
        SH(1,"Lambda Functions","Anonymous Inline Functions") + '\n\n' +
        WH("A <b>lambda</b> is a small, anonymous, single-line function. Defined using <code>lambda arguments: expression</code>. It implicitly returns the result of the expression.") + '\n\n' +
        "```python\n# Standard\ndef add(x, y): return x + y\n# Lambda\nadd_lambda = lambda x, y: x + y\n```\n\n" +
        WC([("Pandas Apply","`df['col'].apply(lambda x: x * 2)` — inline data transformations"),
            ("Sorting","`sorted(data, key=lambda d: d['age'])` — custom sort keys on the fly")]) + '\n\n' +
        PF("Overusing Lambdas","If a lambda gets complex or requires multiple lines, write a standard <code>def</code> function instead. Code readability is more important than brevity."),
        "# Sorting a list of tuples by the second element\nrecords = [('Alice', 95), ('Bob', 82), ('Charlie', 91)]\nsorted_records = sorted(records, key=lambda x: x[1])\nprint(sorted_records)\n\n# Inline math mapping\nmath_funcs = {\n    'double': lambda x: x * 2,\n    'square': lambda x: x ** 2\n}\nprint(math_funcs['square'](5))\n",
        "Lambdas",
        [
            '### **Q1.** Write a lambda that multiplies a number by 10. Assign it to `times10`. Call it with 5.\n',
            '### **Q2.** Use a lambda with `sorted()` to sort `words = ["apple", "banana", "cherry", "date"]` by length.\n',
            '### **Q3.** Given a list of dicts `[{"id": 2}, {"id": 1}]`, sort them by `"id"` using a lambda key.\n',
            '### **Q4.** Create a lambda that takes `x, y` and returns `True` if `x > y`. Call it with 10, 5.\n',
            '### **Q5.** Extract the domain from an email: `lambda email: email.split("@")[1]`. Test it on `"user@gmail.com"`.\n',
        ]
    ))
    
    S.append((
        SH(2,"Map, Filter, Reduce","Functional Paradigms") + '\n\n' +
        WH("Python supports functional programming concepts. <code>map()</code> applies a function to all items. <code>filter()</code> keeps items where a function returns True. <code>reduce()</code> (from `functools`) repeatedly applies a function to pairs of items to reduce a list to a single value.") + '\n\n' +
        "| Function | Purpose | Equivalent Comprehension |\n"
        "| :--- | :--- | :--- |\n"
        "| `map(f, data)` | Transform | `[f(x) for x in data]` |\n"
        "| `filter(f, data)`| Extract | `[x for x in data if f(x)]` |\n"
        "| `reduce(f, data)`| Aggregate | (No direct equivalent) |\n\n" +
        WC([("Data Pipelines","Chaining operations: `reduce(add, map(square, filter(is_even, data)))`"),
            ("Legacy Code","You will see `map/filter` frequently in codebases written by Java/JS developers")]) + '\n\n' +
        PT("In modern Python, list comprehensions are generally preferred over <code>map()</code> and <code>filter()</code> because they are more readable and slightly faster."),
        "from functools import reduce\n\nnums = [1, 2, 3, 4, 5]\n\n# Map (Transform)\ndoubled = list(map(lambda x: x * 2, nums))\nprint(f'Map: {doubled}')\n\n# Filter (Extract)\nevens = list(filter(lambda x: x % 2 == 0, nums))\nprint(f'Filter: {evens}')\n\n# Reduce (Aggregate - e.g., multiply all)\nproduct = reduce(lambda x, y: x * y, nums)\nprint(f'Reduce (Product): {product}')\n",
        "Functional",
        [
            '### **Q1.** Use `map()` and a lambda to convert `names = ["alice", "bob"]` to uppercase. Print as list.\n',
            '### **Q2.** Use `filter()` and a lambda to extract numbers > 5 from `[3, 8, 2, 9, 4]`. Print as list.\n',
            '### **Q3.** Import `reduce`. Use it to find the maximum value in `[1, 5, 2, 8, 3]` using a lambda.\n',
            '### **Q4.** Write a list comprehension that does the exact same thing as `list(map(lambda x: x**2, [1, 2, 3]))`.\n',
            '### **Q5.** Why does `map()` return a `<map object>` instead of a list? (Hint: Lazy evaluation).\n',
        ]
    ))

    TASKS = [
        ("Sort by Length", "Given `sentences = ['I am Python', 'Hi', 'This is a long sentence']`, sort them by word count using `sorted()` and a lambda. Print the result."),
        ("Data Pipeline", "Given `nums = [1, -5, 10, -2, 8]`. Use `filter()` to remove negatives, then `map()` to square them, then `reduce()` to sum them up. Print the final sum."),
        ("Dictionary Filter", "Given a dictionary `data = {'a': 10, 'b': 5, 'c': 20}`, use `filter()` and a lambda on `data.items()` to keep pairs where value > 5. Convert back to dict."),
        ("Multi-Map", "Given `A = [1, 2, 3]` and `B = [10, 20, 30]`. Use `map()` with a lambda `lambda x, y: x + y` to add them element-wise. Print the resulting list."),
        ("Custom Reduce", "Write your own `my_reduce(func, seq)` function using a `for` loop that mimics the behavior of `functools.reduce`."),
    ]
    
    INTERVIEWS = [
        "Write a lambda that takes a string and returns the number of vowels in it. Test with `'hello world'`.",
        "Write the same transformation using `list(map(lambda x: x**2, data))` and `[x**2 for x in data]`. Time both on a list of 100,000 numbers and print which is faster.",
        "Write a lambda to extract the domain from an email address (e.g., `'user@gmail.com'` → `'gmail.com'`). Test with 3 emails.",
        "Use `functools.reduce` to concatenate `['Hello', ' ', 'World']` into a single string `'Hello World'`.",
        "Write a `reduce()` call that computes the product of `[1, 2, 3, 4, 5]`. Then write the same logic using a `for` loop. Print both results.",
        "Write a `filter()` expression that removes all `None` values from `[1, None, 2, None, 3]`. Print the result as a list.",
        "Write code to sort a dictionary `{'b': 3, 'a': 1, 'c': 2}` by its values in descending order using `sorted()` with a lambda key.",
        "Write a custom `my_map(func, iterable)` generator function using `yield`. Test it with `my_map(str.upper, ['a', 'b'])`.",
        "Import `functools.partial`. Create `add_ten = partial(add, 10)` from `def add(a, b): return a + b`. Call `add_ten(5)` and print.",
        "Write a function `make_counter()` that returns an inner function. Each call to the inner function increments and returns a counter. Demonstrate the closure.",
        "Write a pipeline: use `filter` to get even numbers from `range(20)`, then `map` to square them. Print the result as a list.",
        "Write two versions of uppercasing a word list: `list(map(str.upper, words))` and `list(map(lambda x: x.upper(), words))`. Print both results.",
        "Given `[(1, 'a'), (3, 'c'), (2, 'b')]`, sort by the second element using a lambda key. Print the sorted list.",
        "Write a lambda that checks if a string reads the same forwards and backwards (palindrome). Test with `'racecar'` and `'hello'`.",
        "Write a lambda that classifies a number as `'positive'`, `'negative'`, or `'zero'` using nested ternary. Test with `-5, 0, 7`.",
        "Use `reduce` to find the intersection of `[{1,2,3}, {2,3,4}, {3,4,5}]`. Print the result.",
        "Write your own `my_any(iterable)` function using `functools.reduce`. It should return `True` if any element is truthy.",
        "Write code that creates a `map` object of 1 million squares. Print its size using `sys.getsizeof()` vs the equivalent list's size.",
        "Write a lambda that takes another function as an argument and calls it twice: `twice = lambda f, x: f(f(x))`. Test with `lambda x: x + 3`.",
        "Write code using `map` with `lambda` over a list of tuples `[(1,2), (3,4)]` to compute each tuple's sum. Print the result.",
        "Write code demonstrating the late-binding closure bug: `funcs = [lambda: i for i in range(3)]`. Call each and print the (unexpected) results.",
        "Fix the late-binding bug from the previous question using `lambda i=i: i`. Call each and verify they return `0, 1, 2`.",
        "Use `filter` and a lambda to keep only words containing the letter `'e'` from `['hello', 'world', 'test', 'fun']`.",
        "Write a lambda that parses `'2023-12-25'` and returns a tuple `(2023, 12, 25)` using `split` and `map(int, ...)`.",
        "Write a lambda that has a side effect (appends to a list). Call it 3 times and print the list to show the mutation.",
    ]

    nb = build(
        day=13, title="Lambda & Functional",
        obj_text="Functional programming treats computation as the evaluation of mathematical functions. Today we master `lambda`, `map`, `filter`, and `reduce`. These patterns are essential for writing clean data transformation pipelines, especially in Pandas.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Lambdas | Anonymous inline functions |\n| 2 | Functional | Map, Filter, Reduce |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Lambda | `lambda x: x*2` is great for `apply()` |\n| 2 | Map/Filter | Lazy evaluation saves memory |\n",
        checklist="- [ ] I can write a lambda function.\n- [ ] I can use `map()` and `filter()`.\n- [ ] I understand `reduce()`.",
        next_up="Day 14 - Exceptions & Error Handling"
    )
    save(nb, os.path.join('notebooks', 'Day13_Lambda_Blank.ipynb'))

def build_day14():
    S = []
    
    S.append((
        SH(1,"Try / Except Blocks","Catching Errors") + '\n\n' +
        WH("Code crashes when an error occurs. A <code>try/except</code> block allows you to 'catch' exceptions, handle them gracefully, and let the program continue running. This is critical for data pipelines where one bad row shouldn't stop the whole job.") + '\n\n' +
        "```python\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    result = 0\n```\n\n" +
        WC([("API Calls","Handling network timeouts or 500 errors without crashing"),
            ("Data Cleaning","Catching `ValueError` when trying to cast the string 'N/A' to an integer")]) + '\n\n' +
        PF("The Bare Except Trap","Never write a bare <code>except:</code>. It will catch SystemExit and KeyboardInterrupt (Ctrl+C), making your program impossible to stop. ALWAYS specify the exception type: <code>except Exception as e:</code> at a minimum."),
        "data = ['10', '20', 'invalid', '30']\nclean_data = []\n\nfor item in data:\n    try:\n        # Try to convert to integer\n        val = int(item)\n        clean_data.append(val)\n    except ValueError:\n        # If it fails, log it and continue\n        print(f\"Warning: '{item}' is not a valid number. Skipping.\")\n\nprint(f'Clean data: {clean_data}')\n",
        "Try/Except",
        [
            '### **Q1.** Write a try/except block that catches `ZeroDivisionError` when calculating `10 / 0`. Print "Cannot divide by zero".\n',
            '### **Q2.** Try accessing `d = {"a": 1}; print(d["b"])`. Catch the `KeyError` and print a warning.\n',
            '### **Q3.** Use `except Exception as e:` to catch ANY error in `1 + "a"`. Print `e` to see the actual error message.\n',
            '### **Q4.** Write a try/except block to catch `FileNotFoundError` when trying to open `"fake.txt"`. Print "File not found".\n',
            '### **Q5.** Why is a bare `except:` dangerous? Give an example of an exception it might catch that you don\'t want it to.\n',
        ]
    ))
    
    S.append((
        SH(2,"Else and Finally","Complete Error Control") + '\n\n' +
        WH("The full exception block includes <code>else</code> and <code>finally</code>. <code>else</code> runs <b>only if no exception occurred</b>. <code>finally</code> runs <b>no matter what</b> (even if the program crashes or returns early).") + '\n\n' +
        "| Block | When does it run? | Common Use |\n"
        "| :--- | :--- | :--- |\n"
        "| `try` | Always | Risky code |\n"
        "| `except` | If error happens | Error handling & logging |\n"
        "| `else` | If NO error happens | Code that depends on the try block succeeding |\n"
        "| `finally` | ALWAYS | Cleaning up resources (closing files/connections) |\n\n" +
        WC([("Database Connections","Ensuring `db.close()` runs in the `finally` block even if the query fails"),
            ("Safe Transactions","Committing a database transaction in the `else` block only if the execution succeeds")]) + '\n\n' +
        PT("Keep the <code>try</code> block as small as possible. Put the risky code in `try`, and the code that depends on it succeeding in the `else` block."),
        "def divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print(\"Error: Division by zero\")\n    else:\n        # Runs only if try succeeded\n        print(f\"Success! Result is {result}\")\n    finally:\n        # Runs no matter what\n        print(\"Execution finished.\\n\")\n\ndivide(10, 2)\ndivide(10, 0)\n",
        "Else & Finally",
        [
            '### **Q1.** Write a try/except/else block. Try `val = int("10")`. In `else`, print `"Success: [val]"`. Test it.\n',
            '### **Q2.** Change the input in Q1 to `"abc"`. Watch the `except` run and the `else` skip.\n',
            '### **Q3.** Add a `finally` block to Q1 that prints `"Cleanup complete"`. Run it with both "10" and "abc".\n',
            '### **Q4.** Write a function that opens a file in the `try`, and closes it in the `finally`. (Simulate with print statements).\n',
            '### **Q5.** Explain why code belonging in the `else` block shouldn\'t just be put at the bottom of the `try` block.\n',
        ]
    ))

    S.append((
        SH(3,"Raising Exceptions","Signaling Invalid State") + '\n\n' +
        WH("Sometimes your code detects an invalid state (like a negative age). You can <b>manually trigger an error</b> using the <code>raise</code> keyword. This tells the calling function that something went wrong.") + '\n\n' +
        "```python\ndef set_age(age):\n    if age < 0:\n        raise ValueError(\"Age cannot be negative\")\n    return age\n```\n\n" +
        WC([("Data Validation","Rejecting dirty data explicitly before it poisons the database"),
            ("API Contracts","Raising 400 Bad Request errors when user input is invalid")]) + '\n\n' +
        PT("You can define custom exceptions by subclassing `Exception`: <code>class DataValidationError(Exception): pass</code>. This makes your error handling highly specific."),
        "class InvalidTransactionError(Exception):\n    \"\"\"Custom exception for banking errors.\"\"\"\n    pass\n\ndef process_payment(amount):\n    if amount <= 0:\n        # Raise a built-in error\n        raise ValueError(\"Payment amount must be positive\")\n    if amount > 10000:\n        # Raise our custom error\n        raise InvalidTransactionError(\"Transaction too large. Requires approval.\")\n    print(f\"Processed ${amount}\")\n\ntry:\n    process_payment(50000)\nexcept InvalidTransactionError as e:\n    print(f\"Blocked: {e}\")\n",
        "Raising Errors",
        [
            '### **Q1.** Write a function `divide(a, b)` that explicitly raises a `ValueError` with message `"b cannot be zero"` if `b == 0`.\n',
            '### **Q2.** Create a custom exception class `InvalidAgeError(Exception): pass`. Raise it if age is > 150.\n',
            '### **Q3.** Write a try/except block to catch your `InvalidAgeError` from Q2 and print a friendly message.\n',
            '### **Q4.** What is the difference between `raise Exception("msg")` and `raise ValueError("msg")`?\n',
            '### **Q5.** Catch an exception, log it, and then re-raise it using the bare `raise` keyword. Demonstrate this.\n',
        ]
    ))

    TASKS = [
        ("Safe Config Loader", "Write a function `load_config(path)` that tries to open a file. Catch `FileNotFoundError` and return a default dict. Catch `json.JSONDecodeError` and return `{}`. Finally, print 'Load attempt complete'."),
        ("Data Caster", "Write a function `safe_cast(val, to_type, default=None)`. Try to cast `val` to `to_type`. Catch `ValueError` and `TypeError` and return `default`."),
        ("Password Validator", "Create custom exceptions `LengthError` and `SpecialCharError`. Write `validate(pwd)`. Raise `LengthError` if < 8 chars. Raise `SpecialCharError` if no '!' or '@' is found. Test with try/except."),
        ("API Retry", "Write a loop that tries to execute a flaky function `connect()`. If it raises `ConnectionError`, catch it, sleep 1 sec, and retry up to 3 times. If it succeeds, `break`. Else print 'Failed'."),
        ("File Cleanup", "Write code that tries to create a file, write to it, and then explicitly raises an error. Use `finally` to ensure `os.remove()` is called on the file no matter what."),
    ]
    
    INTERVIEWS = [
        "Write a try/except that catches `Exception` but lets `KeyboardInterrupt` pass through. Demonstrate by raising both and showing the different behaviors.",
        "Write two versions of a dict key lookup: one using `if key in d` (LBYL) and one using `try/except KeyError` (EAFP). Time both on 100,000 lookups and print the results.",
        "Write a loop that uses `StopIteration` via `next(iter)` to break. Then rewrite it using a standard `for` loop. Print results from both.",
        "Write code demonstrating `else` in a `try` block: try to open a file, use `else` to process it only if the open succeeded.",
        "Write a try/except that catches both `ValueError` and `TypeError` in a single `except` clause. Test with `int('abc')` and `len(5)`.",
        "Write code showing that if a `try` block returns `1` and a `finally` block returns `2`, the function returns `2`. Demonstrate this behavior.",
        "Write a context manager class `Timer` with `__enter__` and `__exit__` that prints how long the `with` block took to execute.",
        "Write code that catches an exception, prints the error message, then re-raises it using bare `raise`. Show the full traceback.",
        "Write code demonstrating `raise ValueError('bad') from TypeError('original')`. Print the chained exception's `__cause__` attribute.",
        "Write a function `validate_email(s)` that raises a custom `InvalidEmailError` if `'@'` is missing or the domain has no dot. Test with 3 inputs.",
        "Write code that raises an exception inside a `finally` block. Show what happens to the original exception (it gets suppressed).",
        "Write code comparing `assert x > 0` vs `if x <= 0: raise ValueError()`. Show that `assert` can be disabled with `-O` flag.",
        "Write code that catches an exception and prints the full traceback string using `traceback.format_exc()` without crashing.",
        "Write code that uses `contextlib.suppress(FileNotFoundError)` to silently ignore a missing file. Show the equivalent try/except.",
        "Write code showing that a bare `except:` catches `KeyboardInterrupt`. Then fix it by using `except Exception:` instead.",
        "Write code that catches a `SyntaxError` from `exec('if True print(1)')` using try/except. Print the error message.",
        "Write a decorator `@retry(max_attempts=3)` that catches exceptions and retries a function up to 3 times. Test with a function that fails randomly.",
        "Write a helper function `safe_get(lst, index, default=None)` using try/except IndexError. Test with valid and invalid indices.",
        "Write code that uses `sys.excepthook` to log unhandled exceptions to a file before the program exits.",
        "Write a class `Config` that validates `port` (must be int 1-65535) and `host` (must be non-empty string) in `__init__`, raising `TypeError`/`ValueError` as appropriate.",
        "Write code using `pd.to_numeric(series, errors='coerce')` to convert `['10', 'bad', '20']` to numbers, replacing failures with `NaN`.",
        "Write a function `validate_config(d)` that checks for required keys `['host', 'port', 'db']` and raises `ValueError` immediately listing all missing keys.",
        "Write a function that parses nested JSON using EAFP: try to access `data['users'][0]['email']`, catching `KeyError` and `IndexError`.",
        "Write code that issues a `DeprecationWarning` using `warnings.warn()`. Then show how to catch it with `warnings.catch_warnings()`.",
        "Write an exception class hierarchy: `DatabaseError` → `ConnectionError`, `QueryError`. Raise and catch them at different levels.",
    ]

    nb = build(
        day=14, title="Exceptions",
        obj_text="Code will break. Networks fail, data is dirty, and files go missing. Professional code anticipates these failures. Today we learn how to gracefully catch exceptions, ensure resource cleanup, and signal bad state using custom errors.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Try/Except | Catching runtime errors |\n| 2 | Else/Finally | Execution guarantees |\n| 3 | Raising | Custom error signaling |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Try | Wrap risky code to prevent crashes |\n| 2 | Finally | Always runs, perfect for `db.close()` |\n| 3 | Raise | Use explicit errors to reject bad data |\n",
        checklist="- [ ] I can write a `try/except` block.\n- [ ] I never use a bare `except:`.\n- [ ] I understand when to `raise` an error.",
        next_up="Day 15 - File Handling & JSON"
    )
    save(nb, os.path.join('notebooks', 'Day14_Exceptions_Blank.ipynb'))

def build_day15():
    S = []
    
    S.append((
        SH(1,"Reading & Writing Files","Disk I/O") + '\n\n' +
        WH("Data lives in files. Python interacts with files using the <code>open(filename, mode)</code> function. Modes include <code>'r'</code> (read), <code>'w'</code> (write/overwrite), and <code>'a'</code> (append). You should ALWAYS use a <b>Context Manager</b> (the <code>with</code> statement) to ensure the file is closed properly, even if an error occurs.") + '\n\n' +
        "```python\nwith open('data.txt', 'w') as f:\n    f.write('Hello World\\n')\n```\n\n" +
        WC([("Log Processing","Reading multi-gigabyte log files line-by-line without running out of RAM"),
            ("Data Exports","Saving analysis results to local text files")]) + '\n\n' +
        PF("Memory Leaks","If you do <code>f = open('data.txt')</code> and forget to call <code>f.close()</code>, the file remains locked in memory. Always use <code>with open(...) as f:</code>."),
        "# Writing to a file\nwith open('sample.txt', 'w') as file:\n    file.write(\"Line 1\\n\")\n    file.write(\"Line 2\\n\")\n\n# Reading from a file (Whole file at once)\nwith open('sample.txt', 'r') as file:\n    content = file.read()\n    print(\"Full content:\")\n    print(content)\n\n# Reading line by line (Memory efficient!)\nprint(\"Line by line:\")\nwith open('sample.txt', 'r') as file:\n    for line in file:\n        print(line.strip())  # strip() removes the newline character\n",
        "File I/O",
        [
            '### **Q1.** Write code to open a file `"test.txt"` in write mode (`"w"`) and write your name to it.\n',
            '### **Q2.** Open `"test.txt"` in read mode (`"r"`). Read the contents and print them.\n',
            '### **Q3.** Open `"test.txt"` in append mode (`"a"`). Add a new line `"Welcome to Python"`. Print the full file again.\n',
            '### **Q4.** Explain why `with open() as f:` is superior to `f = open(); f.read(); f.close()`.\n',
            '### **Q5.** Write a memory-efficient `for` loop to read a file line-by-line. (Assume file is "test.txt").\n',
        ]
    ))
    
    S.append((
        SH(2,"Parsing JSON","The Language of the Web") + '\n\n' +
        WH("JSON (JavaScript Object Notation) is the universal format for web APIs. It maps perfectly to Python <b>dictionaries and lists</b>. The built-in <code>json</code> module provides tools to parse strings into dicts (<code>loads</code>) and serialize dicts into strings (<code>dumps</code>).") + '\n\n' +
        "| Function | Purpose | Input -> Output |\n"
        "| :--- | :--- | :--- |\n"
        "| `json.loads(s)` | Load String | String -> Dictionary |\n"
        "| `json.dumps(d)` | Dump String | Dictionary -> String |\n"
        "| `json.load(f)` | Load File | File Object -> Dictionary |\n"
        "| `json.dump(d, f)` | Dump File | Dictionary -> File Object |\n\n" +
        WC([("API Integration","Parsing REST API responses (which are almost always JSON)"),
            ("Configuration","Loading application settings from a `.json` file")]) + '\n\n' +
        PT("Use <code>json.dumps(data, indent=4)</code> to 'pretty-print' complex dictionaries for easy debugging."),
        "import json\n\n# Dictionary to JSON String (Serialization)\ndata = {\"user\": \"Alice\", \"age\": 25, \"active\": True}\njson_str = json.dumps(data, indent=2)\nprint(\"JSON String:\")\nprint(json_str)\n\n# JSON String to Dictionary (Parsing)\nraw_json = '{\"status\": \"OK\", \"code\": 200}'\nparsed_dict = json.loads(raw_json)\nprint(f\"\\nParsed Dict: {parsed_dict}\")\nprint(f\"Status: {parsed_dict['status']}\")\n\n# Saving to a file\nwith open('config.json', 'w') as f:\n    json.dump(data, f)  # Note: dump, not dumps\n",
        "JSON",
        [
            '### **Q1.** Import `json`. Use `json.loads()` to parse `\'{"x": 10, "y": 20}\'` into a dictionary.\n',
            '### **Q2.** Convert the dictionary `{"color": "red", "sizes": [1, 2]}` to a JSON string using `json.dumps()`. Print it.\n',
            '### **Q3.** Use `json.dumps()` with the `indent=4` argument to pretty-print `{"a": {"b": 1}}`.\n',
            '### **Q4.** Write code to save a dictionary `d` directly to a file `"data.json"` using `with open()` and `json.dump()`.\n',
            '### **Q5.** Read `"data.json"` back into a dictionary using `json.load()`. Print the type of the loaded object.\n',
        ]
    ))
    
    S.append((
        SH(3,"Pathlib","Modern File Paths") + '\n\n' +
        WH("Handling file paths as strings (e.g., `'data/users.txt'`) causes bugs across different operating systems (Windows uses `\\`, Mac/Linux use `/`). The modern Pythonic way is the <b><code>pathlib</code></b> module, which treats paths as objects.") + '\n\n' +
        "```python\nfrom pathlib import Path\n\n# Object-oriented paths\nfolder = Path('data')\nfile_path = folder / 'users.txt'  # The / operator intelligently joins paths!\n```\n\n" +
        WC([("Cross-Platform Code","Write code on a Mac that executes flawlessly on a Windows server"),
            ("File Operations","Easily check if a file exists, get its suffix (e.g., `.csv`), or read its text instantly")]) + '\n\n' +
        PT("Pathlib objects have amazing built-in methods: <code>path.exists()</code>, <code>path.read_text()</code>, and <code>path.suffix</code>. Use them instead of the older <code>os.path</code> module."),
        "from pathlib import Path\n\n# Creating a path object\nbase_dir = Path('data_folder')\nfile_path = base_dir / 'reports' / 'summary.txt'\nprint(f\"Path object: {file_path}\")\n\n# Creating directories safely\nbase_dir.mkdir(exist_ok=True)\n\n# Quick write/read without context managers\ntest_file = base_dir / 'quick.txt'\ntest_file.write_text('Pathlib is awesome!')\nprint(f\"Read back: {test_file.read_text()}\")\n\n# Checking properties\nprint(f\"Exists? {test_file.exists()}\")\nprint(f\"Extension: {test_file.suffix}\")\nprint(f\"File name: {test_file.name}\")\n",
        "Pathlib",
        [
            '### **Q1.** Import `Path` from `pathlib`. Create a Path object for `"folder" / "subfolder" / "file.csv"`. Print it.\n',
            '### **Q2.** Create a Path object `p = Path("demo.txt")`. Use `p.write_text("Hello")` to create the file.\n',
            '### **Q3.** Use `p.read_text()` to read the file created in Q2 and print it. Then check `p.exists()`.\n',
            '### **Q4.** Create a Path for `"image.jpg"`. Print its `.suffix` and `.stem` (the name without extension).\n',
            '### **Q5.** Use `Path.cwd()` to get the current working directory. Print it.\n',
        ]
    ))

    TASKS = [
        ("Log Parser", "Create a file `server.log` with 5 lines: 2 containing 'ERROR', 3 containing 'INFO'. Write a memory-efficient loop to read the file and print ONLY the 'ERROR' lines."),
        ("JSON Config Updater", "Write a function `update_config(file_path, key, val)`. It should read a JSON file (or create `{}` if missing), update the key, and save the JSON back to the file."),
        ("File Extension Counter", "Create 3 files: `a.txt`, `b.csv`, `c.txt` in a new folder using Pathlib. Write a function that uses `Path.iterdir()` to iterate the folder and count how many `.txt` files exist."),
        ("CSV to JSON", "Write a simulated CSV string (e.g., `'id,name\\n1,Alice\\n2,Bob'`). Parse it manually using `split('\\n')` and `split(',')`, convert to a list of dicts, and `json.dumps()` it."),
        ("Safe File Reader", "Write a function `read_safe(path)` that uses `pathlib` to check if a file exists. If so, return its text. If not, return `None`. Test with a valid and invalid path."),
    ]
    
    INTERVIEWS = [
        "Explain the difference between `open('f.txt', 'w')` and `open('f.txt', 'a')`.",
        "Why is it essential to use a context manager (`with` statement) when opening files?",
        "Explain the difference between `f.read()`, `f.readline()`, and `f.readlines()`.",
        "How do you read a 50GB file in Python without running out of RAM?",
        "Explain the difference between `json.loads()` and `json.load()`.",
        "Write code to parse a JSON string, extract a specific field, and handle a `json.JSONDecodeError`.",
        "Why shouldn't you use regular expressions to parse JSON or HTML?",
        "Compare `os.path.join` with `pathlib`'s `/` operator. Why is pathlib preferred in modern Python?",
        "Write a script that uses `pathlib` to rename all `.txt` files in a directory to `.md`.",
        "How do you write a list of dictionaries to a CSV file without using Pandas (using the `csv` module)?",
        "Explain how character encodings work in Python. Why should you often use `encoding='utf-8'` in `open()`?",
        "Write code that safely creates a nested directory structure (e.g., `a/b/c`) if it doesn't exist.",
        "What is the Pickle module? Why is `json` generally preferred over `pickle` for data serialization?",
        "Write a generator function that reads a file and yields chunks of 1024 bytes at a time.",
        "Explain the security risks of using `yaml.load()` or `pickle.loads()` on untrusted data.",
        "Write code using the `tempfile` module to create a temporary file, write data, and auto-delete it.",
        "How do you handle file locking in Python if two processes try to write to the same file simultaneously?",
        "Explain what the `__file__` variable is and how it's used to find relative asset paths.",
        "Write a function that recursively finds all files larger than 1MB in a directory using `pathlib`.",
        "How do you handle reading a file that might be locked or currently being written to by another program?",
        "Write code using `shutil` to copy a file and preserve its metadata.",
        "Explain the purpose of `StringIO` and `BytesIO` in the `io` module. When would you use them?",
        "Write a script that merges 5 different JSON files into a single master JSON file.",
        "How does Pandas `read_csv` differ fundamentally from the standard library `csv.reader`?",
        "Write code to extract a ZIP file using the `zipfile` module or `shutil.unpack_archive`.",
    ]

    nb = build(
        day=15, title="File Handling & JSON",
        obj_text="Data Analyst pipelines start by reading data and end by saving data. Today we master Disk I/O, parsing the universal language of the web (JSON), and modernizing our code using the powerful, object-oriented `pathlib` module.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | File I/O | `open()`, `with` context |\n| 2 | JSON | `loads()`, `dumps()` |\n| 3 | Pathlib | Object-oriented paths |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | I/O | ALWAYS use context managers (`with`) |\n| 2 | JSON | The bridge between Python dicts and the web |\n| 3 | Pathlib | Replaces messy `os.path` strings |\n",
        checklist="- [ ] I can safely open, read, and close a file.\n- [ ] I can parse a JSON string into a dictionary.\n- [ ] I can use pathlib to construct safe file paths.",
        next_up="Day 16 - Object-Oriented Programming (OOP) Basics"
    )
    save(nb, os.path.join('notebooks', 'Day15_FileHandling_Blank.ipynb'))

if __name__ == '__main__':
    build_day13()
    build_day14()
    build_day15()
    print("Days 13, 14, 15 generated successfully!")
