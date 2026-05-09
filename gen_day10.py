"""Generate Day 10: Functions."""
from nb_helpers import *
import os

def build_day10():
    S = []
    
    S.append((
        SH(1,"Function Definition & Scope","Reusable Logic Blocks") + '\n\n' +
        WH("A function is a named block of code designed to do one specific job. Defined using <code>def</code>, functions take inputs (arguments), perform operations, and return outputs. Variables created inside a function are in <b>local scope</b> and cannot be accessed from outside.") + '\n\n' +
        "```python\ndef calculate_roi(revenue, cost):\n    profit = revenue - cost\n    return (profit / cost) * 100\n```\n\n" +
        WC([("Code Reusability","Define logic once, use it across 100 datasets"),
            ("Testability","Small functions can be individually tested to prevent pipeline bugs")]) + '\n\n' +
        PF("Global Variables","Avoid using <code>global</code> variables inside functions. It creates 'spaghetti code' where state changes unpredictably. Pass data in as arguments, and return data as outputs."),
        "def greet(name):\n    # Local variable\n    message = f'Hello, {name}!'\n    return message\n\nresult = greet('Alice')\nprint(result)\n# print(message)  # NameError: name 'message' is not defined\n",
        "Functions",
        [
            '### **Q1.** Write a function `square(n)` that returns the square of `n`. Call it with `5` and print the result.\n',
            '### **Q2.** Write a function `is_even(n)` that returns `True` if `n` is even, `False` otherwise. Test it with 4 and 7.\n',
            '### **Q3.** Demonstrate local scope: define `x = 10` in a function, then try to print `x` outside. Catch and print the NameError.\n',
            '### **Q4.** Write a function `greet(name, greeting="Hello")`. Call it with and without the `greeting` argument.\n',
            '### **Q5.** Write a function `multiply(a, b)` and call it using keyword arguments `b=5, a=2`. Print result.\n',
        ]
    ))
    
    S.append((
        SH(2,"Arguments: *args and **kwargs","Flexible Inputs") + '\n\n' +
        WH("Python allows functions to accept an arbitrary number of arguments. <code>*args</code> collects positional arguments into a <b>tuple</b>. <code>**kwargs</code> collects keyword arguments into a <b>dictionary</b>.") + '\n\n' +
        "| Syntax | Collects as | Example Call |\n"
        "| :--- | :--- | :--- |\n"
        "| `*args` | Tuple | `func(1, 2, 3)` |\n"
        "| `**kwargs` | Dict | `func(a=1, b=2)` |\n\n" +
        WC([("Wrapper Functions","`*args, **kwargs` is standard for writing decorators or logging wrappers"),
            ("Flexible APIs","Creating functions that can accept any number of column names or configuration flags")]) + '\n\n' +
        PT("Order matters: Standard args come first, then <code>*args</code>, then <code>**kwargs</code>. E.g., <code>def func(a, b, *args, **kwargs):</code>"),
        "def process_data(name, *args, **kwargs):\n    print(f'Name: {name}')\n    print(f'Args (tuple): {args}')\n    print(f'Kwargs (dict): {kwargs}')\n\nprocess_data('Analytics', 10, 20, 30, mode='fast', debug=True)\n",
        "*args and **kwargs",
        [
            '### **Q1.** Write a function `sum_all(*args)` that takes any number of arguments and returns their sum. Test with 4 numbers.\n',
            '### **Q2.** Write a function `print_info(**kwargs)` that iterates over the kwargs dict and prints `Key: Value`. Call it with 3 kwargs.\n',
            '### **Q3.** Write a function `combine(name, *args, **kwargs)`. Print all three parts. Call it with `"Test", 1, 2, a=3, b=4`.\n',
            '### **Q4.** Unpack a list into a function: `nums = [1, 2, 3]`. Call `func(*nums)` instead of `func(nums[0], ...)`. Demonstrate this.\n',
            '### **Q5.** Unpack a dict into kwargs: `config = {"x": 10, "y": 20}`. Call `func(**config)`. Demonstrate this.\n',
        ]
    ))
    
    S.append((
        SH(3,"Recursion","Functions That Call Themselves") + '\n\n' +
        WH("A <b>recursive function</b> is a function that calls itself to solve a problem by breaking it into smaller sub-problems. Every recursive function needs a <b>base case</b> (the stop condition) and a <b>recursive case</b> (the self-call with a simpler input).") + '\n\n' +
        "```python\ndef factorial(n):\n    if n <= 1:       # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n```\n\n" +
        WC([("Tree Traversal","Navigating nested folder structures or JSON trees recursively"),
            ("Divide and Conquer","Algorithms like merge sort and binary search use recursion naturally")]) + '\n\n' +
        PF("Stack Overflow","Python has a default recursion limit of 1000 calls. Deep recursion will raise <code>RecursionError</code>. For very deep problems, convert to an iterative solution or use <code>sys.setrecursionlimit()</code> cautiously."),
        "# Factorial using recursion\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(f'5! = {factorial(5)}')  # 120\n\n# Fibonacci using recursion\ndef fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\n\nprint(f'fib(7) = {fib(7)}')  # 13\n",
        "Recursion",
        [
            '### **Q1.** Write a recursive function `countdown(n)` that prints numbers from `n` down to 1, then prints "Done!".\n',
            '### **Q2.** Write a recursive function `sum_list(lst)` that returns the sum of all elements. Base case: empty list returns 0.\n',
            '### **Q3.** Write a recursive function `power(base, exp)` that calculates `base ** exp` without using `**`. Test with `power(2, 10)`.\n',
            '### **Q4.** Write a recursive function `reverse_string(s)` that reverses a string. Base case: length 0 or 1 returns `s`.\n',
            '### **Q5.** Write a recursive `flatten(lst)` that flattens `[1, [2, [3, 4], 5]]` into `[1, 2, 3, 4, 5]`.\n',
        ]
    ))

    TASKS = [
        ("Math Library", "Write a module-like set of functions for `add`, `subtract`, `multiply`, `divide`. `divide` must handle zero division. Write a master `calculate(a, b, op)` function that uses them."),
        ("Data Cleaner", "Write a function `clean_string(s)` that trims whitespace and lowercases. Use `map()` to apply it to a list of messy strings."),
        ("Config Merger", "Write a function `merge_configs(default, **kwargs)` that takes a default dictionary and updates it with the provided kwargs. Return the new dict."),
        ("Custom Sort", "Given a list of strings like `['user-10', 'user-2', 'user-100']`, write a lambda that extracts the integer part for correct numeric sorting."),
        ("Timer Wrapper", "Write a simple function `time_it(func, *args)` that records the start time, calls `func(*args)`, records end time, prints duration, and returns the result."),
    ]
    
    INTERVIEWS = [
        "Write a function that accepts any number of positional arguments and returns their average.",
        "Write two functions: one that modifies a global variable using `global`, and one that uses a return value instead. Print both results and show why the return-value approach is safer.",
        "Write a recursive function `flatten(nested_list)` that takes a nested list like `[1, [2, [3]], 4]` and returns `[1, 2, 3, 4]`.",
        "Write a function with a mutable default argument `def append_val(v, lst=[])`. Call it 3 times and print the result each time to demonstrate the bug.",
        "Fix the mutable default argument trap in `def append_val(v, lst=[]): lst.append(v); return lst`. Use `None` as the default.",
        "Write a function `compose(f, g)` that returns a new function computing `f(g(x))`. Test with `square` and `add_one`.",
        "Write a simple memoization wrapper: a function `memoize(func)` that caches results in an inner dictionary. Test with a recursive `fib(n)`.",
        "Write a function `filter_data(data, **kwargs)` that filters a list of dicts, keeping only dicts matching ALL kwargs. Test with `filter_data(users, age=25, city='NY')`.",
        "Write a function `make_multiplier(n)` that returns an inner function which multiplies its argument by `n`. Create `double = make_multiplier(2)` and test it.",
        "Write a higher-order function `apply_twice(func, x)` that returns `func(func(x))`. Test with `lambda x: x + 3` and `x = 7`.",
        "Write a recursive function `is_palindrome(s)` that checks if a string is a palindrome without using slicing.",
        "Sort a list of strings by their last character using a `key` function (not lambda). Then do it with a lambda.",
        "Use `filter` and a function to remove all `None` or empty string values from `[None, 'hello', '', 'world', None, 'hi']`. Print the result.",
        "Write a function `call_with_dict(func, d)` that unpacks `d = {'a':1, 'b':2}` and passes it to `func(a, b)`. Demonstrate with `**`.",
        "Write a function `greet(name, *, greeting='Hello')` that forces `greeting` to be keyword-only. Show a `TypeError` when called positionally like `greet('Bob', 'Hi')`.",
        "Write a function `safe_div(a, b, *, round_to=2)` with a keyword-only argument. Test it with `safe_div(10, 3, round_to=4)`.",
        "Write a function `add(a, b, /)` using positional-only parameters (Python 3.8+). Show the `TypeError` when calling `add(a=1, b=2)`.",
        "Write a list comprehension `[lambda x, i=i: x * i for i in range(5)]` and call each function. Print results and explain the `i=i` default trick.",
        "Write a nested function demonstrating LEGB scope: define `x` at global, enclosing, and local level. Print `x` from the innermost function.",
        "Write a recursive function `sum_digits(n)` that returns the sum of all digits in a positive integer. Test with `12345`.",
        "Write a function that returns `(quotient, remainder)` as a tuple. Unpack the result into two variables and print them.",
        "Write the same transformation using both `list(map(str.upper, words))` and `[w.upper() for w in words]`. Time both and print which is faster.",
        "Write a function `merge_dicts(*dicts)` that takes any number of dictionaries and merges them into one. Later dicts override earlier keys.",
        "Import `functools.partial`. Create a `double = partial(multiply, 2)` function from `def multiply(a, b): return a * b`. Test it.",
        "Write a function `safe_execute(func, *args)` that wraps `func(*args)` in try/except and returns `None` on any exception. Test with a division by zero.",
    ]

    nb = build(
        day=10, title="Functions & Scope",
        obj_text="Functions are the building blocks of maintainable code. Today we master writing flexible, reusable logic blocks using *args, **kwargs, and anonymous lambda functions. Understanding these patterns is essential for writing professional-grade data pipelines.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Functions | `def`, scope, returns |\n| 2 | Args | `*args`, `**kwargs` |\n| 3 | Lambdas | Anonymous inline functions |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Def | Functions isolate logic and scope |\n| 2 | Args | `*` unpacks tuples, `**` unpacks dicts |\n| 3 | Lambda | `lambda x: x*2` is great for `apply()`/`sort()` |\n",
        checklist="- [ ] I can write functions with default arguments.\n- [ ] I understand `*args` and `**kwargs`.\n- [ ] I can write and use a lambda function.",
        next_up="Day 11 - Modules & Packages"
    )
    save(nb, os.path.join('notebooks', 'Day10_Functions_Blank.ipynb'))

if __name__ == '__main__':
    build_day10()
