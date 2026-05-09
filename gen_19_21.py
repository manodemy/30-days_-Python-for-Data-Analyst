"""Generate Days 19 to 21."""
from nb_helpers import *
import os

def build_day19():
    S = []
    
    S.append((
        SH(1,"Advanced Generators","yield from & State") + '\n\n' +
        WH("We've learned that <code>yield</code> pauses a function. Advanced generators can yield from OTHER generators using <b><code>yield from</code></b>, allowing you to chain pipelines cleanly. Generators also maintain complex internal state across iterations.") + '\n\n' +
        "```python\ndef sub_gen():\n    yield 1\n    yield 2\n\ndef main_gen():\n    yield from sub_gen() # Chains the sub-generator seamlessly\n    yield 3\n```\n\n" +
        WC([("Tree Traversal","Flattening complex nested JSON structures recursively"),
            ("Data Pipelining","Chaining multiple generator functions (extract -> transform -> load)")]) + '\n\n' +
        PF("Infinite Recursion","When using <code>yield from</code> recursively, ensure you have a base case that stops yielding, just like standard recursion, to prevent a RecursionError."),
        "def flatten_list(nested):\n    \"\"\"Recursively flatten a list of lists using yield from\"\"\"\n    for item in nested:\n        if isinstance(item, list):\n            yield from flatten_list(item)  # Delegate to sub-generator\n        else:\n            yield item\n\ndata = [1, [2, 3], [4, [5, 6]]]\nflat = list(flatten_list(data))\nprint(f\"Original: {data}\")\nprint(f\"Flattened: {flat}\")\n",
        "Yield From",
        [
            '### **Q1.** Write a generator `gen_a()` yielding 1, 2. Write `gen_b()` yielding `yield from gen_a()` then 3. Test it.\n',
            '### **Q2.** Create a generator that yields numbers 1 to 3, then yields from `range(4, 6)`. Print as list.\n',
            '### **Q3.** Write a generator that maintains state: a running total. It takes a list of numbers and yields the running total at each step.\n',
            '### **Q4.** Try to call `len()` on a generator. Catch the TypeError. Why doesn\'t it work?\n',
            '### **Q5.** Explain why `yield from` is cleaner than `for x in sub_gen(): yield x`.\n',
        ]
    ))
    
    S.append((
        SH(2,"Coroutines","Sending Data to Generators") + '\n\n' +
        WH("Generators don't just produce data; they can consume it! By using the <b><code>.send()</code></b> method, you can pass data <i>into</i> a paused generator. A generator used this way is called a <b>Coroutine</b>.") + '\n\n' +
        "```python\ndef accumulator():\n    total = 0\n    while True:\n        value = yield total # Pauses here, waits for .send()\n        total += value\n```\n\n" +
        WC([("Event Loops","Coroutines are the historical foundation of Python's `asyncio` for asynchronous programming"),
            ("State Machines","Building state machines that wait for external inputs to transition states")]) + '\n\n' +
        PT("Before you can <code>.send()</code> a value into a coroutine, you MUST 'prime' it by calling <code>next(gen)</code> or <code>gen.send(None)</code> so it reaches the first <code>yield</code> statement."),
        "def averager():\n    \"\"\"Coroutine that yields the running average\"\"\"\n    total = 0.0\n    count = 0\n    average = None\n    while True:\n        # Yield the current average, and WAIT for a new term\n        term = yield average\n        if term is None:\n            break\n        total += term\n        count += 1\n        average = total / count\n\n# Usage\ncoro = averager()\nnext(coro)  # Prime the coroutine!\n\nprint(f\"Sent 10, Avg: {coro.send(10)}\")\nprint(f\"Sent 20, Avg: {coro.send(20)}\")\nprint(f\"Sent 30, Avg: {coro.send(30)}\")\n",
        "Coroutines",
        [
            '### **Q1.** Write a coroutine `greeter()` that waits for a name (`yield`) and prints `"Hello [name]"`. Prime it, then send `"Alice"`.\n',
            '### **Q2.** Modify the averager above. Send `5`, `10`, `15`. Print the final average.\n',
            '### **Q3.** What happens if you try to `send()` to a coroutine without calling `next()` first? Catch the `TypeError`.\n',
            '### **Q4.** Send `None` to the averager coroutine above to break the loop. Catch the `StopIteration`.\n',
            '### **Q5.** Explain how a coroutine differs fundamentally from a standard function (hint: pausing vs returning).\n',
        ]
    ))
    
    S.append((
        SH(3,"Context Managers","Building Your Own 'with'") + '\n\n' +
        WH("You know how to use <code>with open()</code>. You can build your own Context Managers using the <code>contextlib</code> module and a generator. This is the cleanest way to handle setup and teardown logic.") + '\n\n' +
        "```python\nfrom contextlib import contextmanager\n\n@contextmanager\ndef my_timer():\n    start = time.time()\n    yield # Code inside the 'with' block runs here\n    print(f'Took {time.time() - start}s')\n```\n\n" +
        WC([("Database Connections","Yielding a DB connection and ensuring `conn.close()` happens after the `with` block"),
            ("Temporary State","Temporarily changing a directory, then switching back safely")]) + '\n\n' +
        PT("If an exception occurs inside the <code>with</code> block, it will be raised at the <code>yield</code> statement in your context manager. Wrap the <code>yield</code> in a <code>try/finally</code> to ensure cleanup!"),
        "from contextlib import contextmanager\nimport time\n\n@contextmanager\ndef timing(label):\n    \"\"\"A context manager to measure execution time\"\"\"\n    start = time.time()\n    try:\n        yield  # The indented code runs here!\n    finally:\n        # This runs when the block finishes (or crashes!)\n        end = time.time()\n        print(f\"{label} took {end - start:.4f} seconds\")\n\n# Usage\nwith timing(\"Loop Test\"):\n    # Simulate work\n    for _ in range(1_000_000):\n        pass\n    print(\"Work done!\")\n",
        "Contextlib",
        [
            '### **Q1.** Import `contextmanager`. Write a `@contextmanager` called `tag(name)` that prints `<name>`, yields, then prints `</name>`.\n',
            '### **Q2.** Use your `tag(\"div\")` in a `with` block and print `"Hello"` inside it.\n',
            '### **Q3.** Write a context manager `ignore_errors` that yields inside a try/except block catching `Exception`. Use it to ignore `1/0`.\n',
            '### **Q4.** Why must you use `try/finally` around the `yield` in a context manager for resource cleanup?\n',
            '### **Q5.** Does a context manager have to yield a value? (e.g., `yield f` vs just `yield`). Explain.\n',
        ]
    ))

    TASKS = [
        ("Recursive File Finder", "Write a generator `find_txt_files(path)` using `pathlib`. If a path is a directory, iterate over its children. If a child is a directory, `yield from find_txt_files(child)`. If it's a `.txt` file, `yield` it."),
        ("Filter Coroutine", "Write a coroutine `filter_even(target_list)`. In an infinite loop, wait for a value using `val = yield`. If `val` is even, append it to `target_list`."),
        ("Custom Open Context", "Write a `@contextmanager` `safe_open(file, mode)` that prints 'Opening', yields the file object, and prints 'Closing' in a `finally` block."),
        ("Stateful Generator", "Write a generator `moving_average(window_size)`. It keeps an internal list of the last N values. Yield the average of the list at each step. Test by sending it 1,2,3,4,5."),
        ("HTML Builder", "Write nested context managers to build HTML strings. `with tag('body'): with tag('h1'): print('Title')` should result in valid HTML structure."),
    ]
    
    INTERVIEWS = [
        "What is the `yield from` keyword used for in Python 3.3+?",
        "Explain how coroutines in Python differ from traditional threads.",
        "Write a simple coroutine and explain why you must call `next(coro)` before sending a value.",
        "What happens if a generator used as a context manager does not have a `try/finally` block and an exception occurs in the `with` block?",
        "How do you return a value from a generator (i.e., when `StopIteration` is raised)?",
        "Implement a simple Event Broker using coroutines (subscribers wait for messages via `yield`).",
        "Explain the `contextlib.suppress` context manager. Write a custom version of it.",
        "Write a generator that yields chunks of a specific size from a larger list.",
        "What is the difference between implementing a context manager using classes (`__enter__`/`__exit__`) vs `@contextmanager`?",
        "Write a context manager that temporarily redirects `sys.stdout` to a file.",
        "Write a coroutine that acts as a grep command: it receives lines of text and prints those that contain a specific substring.",
        "Explain what `generator.throw()` does.",
        "Explain what `generator.close()` does and how a generator can catch `GeneratorExit`.",
        "How would you use `yield from` to flatten a deeply nested dictionary?",
        "Write a context manager that acquires a lock from the `threading` module and releases it safely.",
        "Explain how `asyncio` built upon the concept of generator-based coroutines.",
        "Write a generator that produces an infinite sequence of prime numbers.",
        "What is the memory complexity of traversing a massive tree structure using `yield from`?",
        "Write a coroutine `broadcast` that takes a list of other coroutines and sends any received value to all of them.",
        "Explain the performance differences between `[x for x in gen]` and `list(gen)`.",
        "Write a context manager that temporarily modifies an environment variable and restores it afterward.",
        "How do you chain multiple generators together into a data pipeline?",
        "Write a generator that acts like a sliding window over an iterable.",
        "Explain why generators cannot be pickled (serialized) natively.",
        "Write a `@contextmanager` to mock a database transaction (print 'begin', yield, print 'commit', or 'rollback' on exception).",
    ]

    nb = build(
        day=19, title="Advanced Generators",
        obj_text="Generators are capable of much more than simple iteration. Today we master `yield from` for recursive pipelines, Coroutines for two-way data streaming (`.send()`), and the elegant `@contextmanager` to build our own robust `with` blocks.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Yield From | Chaining & recursion |\n| 2 | Coroutines | `.send()` data inwards |\n| 3 | Contexts | Building `with` blocks |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Yield From | Flattens nested generator logic effortlessly |\n| 2 | Coroutine | Generators can pause to receive data, not just emit it |\n| 3 | Context | `@contextmanager` makes setup/teardown logic perfectly clean |\n",
        checklist="- [ ] I can use `yield from` to delegate to another generator.\n- [ ] I understand how to `.send()` data to a coroutine.\n- [ ] I can write a custom `@contextmanager`.",
        next_up="Day 20 - Phase 1 Capstone Project"
    )
    save(nb, os.path.join('notebooks', 'Day19_Generators_Blank.ipynb'))

def build_day20():
    S = []
    
    S.append((
        SH(1,"Phase 1 Capstone","Python Core Mastery") + '\n\n' +
        WH("You have completed the core Python phase. You understand data structures, control flow, functions, OOP, and file I/O. <b>Today is a pure coding challenge day.</b> No new theory, just application. You will build a complete, robust, object-oriented application from scratch.") + '\n\n' +
        "### 🎯 The Mission: Log Analyzer System\n\n" +
        "You will build a system that reads messy server logs, parses them using Regex, cleans them using Comprehensions, models them using OOP, and exports a clean JSON report." + '\n\n' +
        WC([("Portfolio Building","This is a realistic engineering task you can put on your resume"),
            ("Knowledge Integration","Forces you to use Lists, Dicts, Regex, OOP, and JSON together")]) + '\n\n' +
        PF("Blank Page Syndrome","Don't freeze. Break the problem into tiny pieces. Write one small function at a time. Test it. Then move to the next."),
        "# Outline of what you will build:\n\nclass LogEntry:\n    # Model a single log line\n    pass\n\nclass LogParser:\n    # Read file, extract data via Regex\n    pass\n\nclass ReportGenerator:\n    # Aggregate data and export to JSON\n    pass\n\nprint(\"Are you ready? Let's go.\")\n",
        "Capstone",
        [
            '### **Q1.** Before coding, plan: What attributes should a `LogEntry` class have? (e.g., timestamp, level, message).\n',
            '### **Q2.** What regex pattern would you use to extract `[2023-10-01] ERROR: Disk full`?\n',
            '### **Q3.** How will you handle missing or corrupt lines in the file? (Hint: try/except).\n',
            '### **Q4.** How will you aggregate the data? (Hint: `collections.Counter` for counting error types).\n',
            '### **Q5.** Set up your working directory. Create a dummy `server.log` file with 10 lines of fake data to test against.\n',
        ]
    ))
    
    # Minimal sections for Day 20 since it's a Capstone day.
    S.append((
        SH(2,"Capstone Architecture","System Design") + '\n\n' +
        WH("A good system is modular. Let's design the architecture before writing the full implementation.") + '\n\n' +
        "1. **`LogEntry(timestamp, level, message)`**: A class that uses `__str__` for nice printing.\n" +
        "2. **`parse_line(line)`**: A function or static method that takes a string, runs regex, and returns a `LogEntry` (or raises a `ValueError` if invalid).\n" +
        "3. **`process_file(path)`**: A generator that opens the file safely and `yields` parsed `LogEntry` objects.\n" +
        "4. **`generate_report(entries)`**: A function that takes the generator, counts error levels, and saves to `report.json`.\n\n" +
        WC([("Clean Code","Separation of concerns. The parser shouldn't write files. The writer shouldn't parse Regex.")]),
        "# Example Regex to test\nimport re\nline = \"[2023-12-01 10:00:00] WARN: High memory usage\"\npattern = r\"\\[(.*?)\\]\\s(\\w+):\\s(.*)\"\n\nmatch = re.match(pattern, line)\nif match:\n    ts, level, msg = match.groups()\n    print(f\"Parsed: Level={level}, Msg={msg}\")\n",
        "Architecture",
        [
            '### **Q1.** Implement the `LogEntry` class with an `__init__` and `__repr__` method.\n',
            '### **Q2.** Implement the `parse_line` method using `re.match`. Return a `LogEntry`. Raise `ValueError` if it fails.\n',
            '### **Q3.** Test `parse_line` on a valid string and an invalid string. Catch the error.\n',
            '### **Q4.** Implement `process_file(path)`. Use `with open` and a `for` loop. `yield` parsed entries, use `try/except` to ignore bad lines.\n',
            '### **Q5.** Loop over `process_file` and print the entries.\n',
        ]
    ))
    
    S.append((
        SH(3,"Capstone Execution","Putting it Together") + '\n\n' +
        WH("Now integrate the components and produce the final output.") + '\n\n' +
        "Your final task is to write the aggregator. It should loop over the generator, group messages by their Log Level (e.g., 5 ERRORs, 10 WARNs), and export this summary as beautifully formatted JSON.",
        "# Example aggregation target format:\n# {\n#   \"total_logs_processed\": 15,\n#   \"levels\": {\n#       \"INFO\": 10,\n#       \"ERROR\": 5\n#   }\n# }\n",
        "Execution",
        [
            '### **Q1.** Import `collections.Counter`.\n',
            '### **Q2.** Create a `generate_report(entries)` function. Initialize counters.\n',
            '### **Q3.** Loop through `entries`. Increment counters based on `entry.level`.\n',
            '### **Q4.** Construct the final dictionary format shown above.\n',
            '### **Q5.** Use `json.dump(..., indent=4)` to save the dictionary to `"report.json"`.\n',
        ]
    ))

    TASKS = [
        ("Capstone Step 1", "Generate fake log data. Write a script to write 100 random log lines to `server.log` (mix of INFO, WARN, ERROR, and some garbage lines)."),
        ("Capstone Step 2", "Write the `LogEntry` class and regex parsing logic. Test it thoroughly."),
        ("Capstone Step 3", "Write the generator pipeline to read the file efficiently and yield objects."),
        ("Capstone Step 4", "Write the JSON aggregation logic. Run the full pipeline."),
        ("Capstone Step 5", "Refactor. Add type hints (`-> str`). Add docstrings. Make it look like professional enterprise code."),
    ]
    
    INTERVIEWS = [
        "How do you approach debugging a system that consists of multiple interacting classes?",
        "Why did we use a generator to read the file instead of returning a list of all `LogEntry` objects?",
        "If the log file was 500GB, how would your code handle it? Would it crash?",
        "How would you modify this system to read from a continuous stream of logs (like a network socket) instead of a static file?",
        "Explain the importance of Separation of Concerns in software architecture.",
        "How would you write unit tests for the `parse_line` function?",
        "What edge cases might break your Regex pattern in production?",
        "How would you handle timezone differences if the logs came from servers in different regions?",
        "If you needed to store this data permanently, would you choose JSON, CSV, or a Database? Why?",
        "How would you use Python's `logging` module instead of `print()` statements for debugging this application?",
        "Explain the tradeoff between using regex vs basic string splitting (`.split()`) for parsing logs.",
        "How could you make the file reading multi-threaded if you had to process 100 different log files?",
        "What is cyclomatic complexity and why should we avoid deep nesting?",
        "How do you ensure your classes are easily extensible in the future (e.g., adding a `CriticalLogEntry` type)?",
        "Explain the Single Responsibility Principle (SRP) from SOLID.",
        "How would you package this script so another team could `pip install` it?",
        "What are Python Type Hints (`a: int`) and why are they useful in enterprise projects?",
        "How would you handle a `PermissionError` when trying to write the `report.json` file?",
        "If the JSON export gets too large for memory, how do you stream JSON to a file?",
        "How do you benchmark the execution speed of your pipeline?",
        "What is the difference between a functional approach and an OOP approach for this specific log parsing task?",
        "How would you refactor the code to use `pathlib` exclusively?",
        "Explain how you would containerize this script using Docker.",
        "How would you automate this script to run every midnight? (Cron/Task Scheduler).",
        "What did you find most challenging about integrating all these Python concepts together?",
    ]

    nb = build(
        day=20, title="Phase 1 Capstone",
        obj_text="You have mastered Core Python. Today, you prove it. You will build a professional, object-oriented Log Analysis Pipeline that integrates File I/O, Generators, Regex, and JSON. This is the bridge between learning syntax and writing real-world software.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Architecture | System Design |\n| 2 | Implementation | OOP + Regex |\n| 3 | Execution | Generators + JSON |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Planning | Always separate concerns (Parser vs Writer) |\n| 2 | Robustness | Catch bad data early, don't let it crash the pipeline |\n| 3 | Execution | Code is useless until it solves a business problem |\n",
        checklist="- [ ] I successfully implemented an OOP architecture.\n- [ ] I processed data efficiently using generators.\n- [ ] I exported a clean JSON report.",
        next_up="Day 21 - NumPy: Vectorized Math & Arrays (Phase 2 Begins!)"
    )
    save(nb, os.path.join('notebooks', 'Day20_Capstone_Blank.ipynb'))

def build_day21():
    S = []
    
    S.append((
        SH(1,"NumPy Arrays (ndarrays)","The Core of Data Science") + '\n\n' +
        WH("Welcome to Phase 2: Data Analytics. <b>NumPy</b> (Numerical Python) is the foundation of Pandas and Scikit-Learn. Its core structure is the <b>ndarray</b> (N-dimensional array), which is up to 50x faster than Python lists because it uses fixed-type C-arrays under the hood.") + '\n\n' +
        "```python\nimport numpy as np\n# Create a 1D array\narr = np.array([1, 2, 3, 4, 5])\n```\n\n" +
        WC([("Performance","Processing millions of data points instantly"),
            ("Memory Efficiency","NumPy arrays take up significantly less RAM than standard Python lists")]) + '\n\n' +
        PF("Mixed Data Types","Unlike Python lists which can hold `[1, 'a', True]`, a NumPy array must be <b>homogenous</b> (all elements must be the same type, e.g., all floats or all ints). If you mix them, NumPy will force them into strings."),
        "import numpy as np\n\n# Creating arrays\nlist_data = [1, 2, 3]\narray_1d = np.array(list_data)\nprint(f\"1D Array: {array_1d}\")\nprint(f\"Type: {type(array_1d)}\")\n\n# Creating 2D arrays (Matrices)\nmatrix = np.array([[1, 2], [3, 4]])\nprint(f\"\\n2D Array (Matrix):\\n{matrix}\")\n\n# Checking attributes\nprint(f\"\\nShape: {matrix.shape}\")   # (Rows, Cols)\nprint(f\"Dimensions: {matrix.ndim}\") # 2\nprint(f\"Data Type: {matrix.dtype}\") # int64 or int32\n",
        "NumPy Basics",
        [
            '### **Q1.** Import `numpy as np`. Create an array from `[10, 20, 30]`. Print it.\n',
            '### **Q2.** Create a 2D array (matrix) representing a 3x3 grid of numbers. Print its `.shape`.\n',
            '### **Q3.** Try creating an array from `[1, "two", 3]`. Print its `.dtype`. Notice how the numbers became strings (`<U...`).\n',
            '### **Q4.** Print the number of dimensions `.ndim` of the 3x3 array.\n',
            '### **Q5.** Print the total number of elements in the array using `.size`.\n',
        ]
    ))
    
    S.append((
        SH(2,"Array Generation","Built-in Constructors") + '\n\n' +
        WH("You rarely build massive arrays by manually typing lists. NumPy provides powerful generation functions like <code>np.zeros()</code>, <code>np.arange()</code>, and <code>np.linspace()</code>.") + '\n\n' +
        "| Function | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `np.zeros(shape)` | Array of 0s | `np.zeros((3,3))` |\n"
        "| `np.ones(shape)` | Array of 1s | `np.ones(5)` |\n"
        "| `np.arange(start, stop, step)`| Like Python `range` | `np.arange(0, 10, 2)` |\n"
        "| `np.linspace(start, stop, num)`| Evenly spaced points | `np.linspace(0, 1, 5)` |\n\n" +
        WC([("Initialization","Creating empty matrices to fill with model weights"),
            ("Plotting","Using `linspace` to generate perfectly spaced X-axis values for charts")]) + '\n\n' +
        PT("<code>np.arange()</code> works with floats (e.g., step=0.5), unlike Python's built-in <code>range()</code> which only takes integers!"),
        "import numpy as np\n\n# Zeros and Ones\nzeros = np.zeros((2, 4))  # Pass shape as a tuple\nprint(\"Zeros:\\n\", zeros)\n\n# Arange (Start, Stop exclusive, Step)\nsteps = np.arange(0, 10, 2)\nprint(\"\\nArange:\", steps)\n\n# Linspace (Start, Stop INCLUSIVE, Number of points)\npoints = np.linspace(0, 100, 5)\nprint(\"\\nLinspace:\", points)\n\n# Random generation (Uniform 0-1)\nrands = np.random.rand(3, 3)\nprint(\"\\nRandoms:\\n\", rands)\n",
        "Generators",
        [
            '### **Q1.** Create an array of 10 zeros. Print it.\n',
            '### **Q2.** Create a 3x3 matrix of ones using `np.ones((3, 3))`.\n',
            '### **Q3.** Use `np.arange()` to create an array of numbers from 10 to 50, stepping by 5.\n',
            '### **Q4.** Use `np.linspace()` to generate exactly 11 evenly spaced points between 0 and 1.\n',
            '### **Q5.** Generate a 2x2 matrix of random integers between 1 and 100 using `np.random.randint(1, 100, size=(2,2))`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Vectorized Operations","No More For-Loops") + '\n\n' +
        WH("The most important concept in NumPy is <b>Vectorization</b>. You can perform math on entire arrays at once without writing <code>for</code> loops. This is executed in optimized C code, making it blazing fast.") + '\n\n' +
        "```python\n# ❌ Bad (Python Loop)\nfor i in range(len(arr)): arr[i] *= 2\n\n# ✅ Good (Vectorized)\narr = arr * 2\n```\n\n" +
        WC([("Financial Math","Applying a 5% interest rate to a million bank accounts instantly (`balances * 1.05`)"),
            ("Image Processing","Brightening an image matrix by adding a constant (`pixels + 50`)")]) + '\n\n' +
        PT("Arrays operate element-wise. If you add two arrays `A + B`, they must be the exact same shape (or compatible via 'broadcasting'). They add position 0 to position 0, 1 to 1, etc."),
        "import numpy as np\nimport time\n\narr = np.array([1, 2, 3, 4, 5])\n\n# Scalar Math (Applies to all elements)\nprint(f\"Add: {arr + 10}\")\nprint(f\"Multiply: {arr * 10}\")\nprint(f\"Power: {arr ** 2}\")\n\n# Array to Array Math (Element-wise)\narr2 = np.array([10, 20, 30, 40, 50])\nprint(f\"\\nArray Addition: {arr + arr2}\")\n\n# Speed test!\nbig_list = list(range(1000000))\nbig_arr = np.array(big_list)\n\nt1 = time.time()\n_ = [x * 2 for x in big_list]  # Python loop\nlist_time = time.time() - t1\n\nt2 = time.time()\n_ = big_arr * 2  # NumPy Vectorization\narr_time = time.time() - t2\n\nprint(f\"\\nNumPy is {list_time / arr_time:.1f}x faster!\")\n",
        "Vectorization",
        [
            '### **Q1.** Create `arr = np.array([10, 20, 30])`. Divide every element by 10 and print the result.\n',
            '### **Q2.** Given `A = np.array([1, 2])` and `B = np.array([10, 20])`, multiply them together. Print the result.\n',
            '### **Q3.** Create an array using `arange(1, 6)`. Square all elements (`**2`). Print the result.\n',
            '### **Q4.** Write a boolean operation: `arr > 15`. Print the result (you get a boolean array!).\n',
            '### **Q5.** Measure the speed difference between `sum(range(100000))` and `np.arange(100000).sum()`.\n',
        ]
    ))

    TASKS = [
        ("Celsius to Fahrenheit", "Create an array of Celsius temperatures: `[0, 10, 20, 30, 40]`. Use vectorized math to convert them to Fahrenheit `(C * 9/5) + 32`. Print the result."),
        ("Distance Formula", "Given two 1D arrays `p1 = np.array([1, 2, 3])` and `p2 = np.array([4, 5, 6])`. Calculate the Euclidean distance using vector math: `sqrt(sum((p1 - p2)**2))`. (Use `np.sqrt` and `.sum()`)."),
        ("Identity Matrix", "Research and use `np.eye()` to create a 5x5 Identity matrix (1s on the diagonal, 0s elsewhere). Multiply it by 5 to make the diagonal 5s."),
        ("Random Noise", "Create a 100-element array using `np.linspace(0, 10, 100)`. Add random uniform noise to it using `np.random.rand(100)`. Plotting this is the foundation of data visualization!"),
        ("Shape Manipulation", "Create a 1D array of 12 elements. Use `.reshape((3, 4))` to turn it into a 3x4 matrix. Print the new matrix and its `.shape`."),
    ]
    
    INTERVIEWS = [
        "Why is NumPy so much faster than standard Python lists?",
        "What is the difference between an ndarray and a Python list?",
        "Explain what 'Vectorization' means in NumPy.",
        "What happens if you try to put a string into an array of integers? Explain `dtype` casting.",
        "What does the `.shape` attribute return? What type of object is it?",
        "How do you create a 3D array in NumPy? What does its shape look like?",
        "Explain the difference between `np.arange()` and `np.linspace()`.",
        "What is 'Element-wise' operation?",
        "How does NumPy handle missing data (NaN) compared to Python `None`?",
        "Write a one-liner to generate an array of 100 random numbers drawn from a normal distribution (`np.random.randn`).",
        "What is the output of `np.array([1, 2]) + np.array([3, 4, 5])`? Explain what happens.",
        "How do you check the data type of a NumPy array?",
        "How do you explicitly force a NumPy array to be floats instead of ints upon creation? (Hint: `dtype=float`).",
        "Explain what `np.zeros_like(arr)` does.",
        "What is the difference between `np.random.rand()` and `np.random.randint()`?",
        "How do you find the total memory consumed by a NumPy array? (Hint: `.nbytes`).",
        "Why is it a bad idea to use `append()` in a loop with NumPy arrays?",
        "What is broadcasting in NumPy (briefly)?",
        "How do you flatten a 2D matrix into a 1D array? (`.flatten()` or `.ravel()`).",
        "Explain the difference between deep copy and shallow copy (views) in NumPy arrays.",
        "What happens when you do `arr > 5`? What does it return?",
        "How do you get the transpose of a matrix in NumPy? (Hint: `.T`).",
        "What is the dot product of two vectors, and how do you compute it in NumPy? (`np.dot` or `@`).",
        "How do you find the maximum value in an array? How do you find its index? (`argmax`).",
        "What is the difference between `np.nan` and `np.inf`?",
    ]

    nb = build(
        day=21, title="NumPy Arrays",
        obj_text="Welcome to Phase 2. Data Analytics requires crunching millions of numbers. Standard Python is too slow. NumPy bridges Python with fast C-code, providing the N-Dimensional Array (ndarray). Mastering vectorized math is the gateway to Pandas and Machine Learning.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | ndarrays | Homogeneous matrices |\n| 2 | Generation | `arange`, `zeros`, `linspace` |\n| 3 | Vectorization | Fast math without loops |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Array | `shape`, `ndim`, and `dtype` define the structure |\n| 2 | Gen | Never build big arrays by hand |\n| 3 | Vector | Replace `for` loops with `arr * 2`. It's 100x faster. |\n",
        checklist="- [ ] I can create 1D and 2D arrays.\n- [ ] I can generate arrays using `linspace` and `arange`.\n- [ ] I understand vectorized math vs for-loops.",
        next_up="Day 22 - NumPy Advanced: Indexing, Filtering & Broadcasting"
    )
    save(nb, os.path.join('notebooks', 'Day21_NumPy_Blank.ipynb'))

if __name__ == '__main__':
    build_day19()
    build_day20()
    build_day21()
    print("Days 19, 20, 21 generated successfully!")
