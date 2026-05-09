"""Generate Day08 Control Flow notebook - Part 1: Sections 1-4."""
from nb_helpers import *

def sections_1_to_4():
    S = []

    # ── SECTION 1: If/Elif/Else ──
    S.append((
        SH(1,"If/Elif/Else & Truthy Values","Core Decision Making") + '\n\n' +
        WH("The <code>if</code> statement evaluates an expression. If it is <b>truthy</b>, the indented block runs. Python considers almost everything truthy except: <code>False</code>, <code>None</code>, <code>0</code>, <code>0.0</code>, and empty collections (<code>[]</code>, <code>{}</code>, <code>\"\"</code>, <code>set()</code>).") + '\n\n' +
        "```python\nif condition1:\n    # runs if condition1 is True\nelif condition2:\n    # runs if condition1 is False AND condition2 is True\nelse:\n    # runs if all above are False\n```\n\n" +
        WC([("Data Filtering","`if user['age'] >= 18:` — standard filtering logic"),
            ("Null Checking","`if data:` — checking if a list/dict is not empty"),
            ("State Routing","Handling different data formats based on file extension")]) + '\n\n' +
        PF("Explicit Length Checks","Do not write <code>if len(my_list) > 0:</code>. It is unpythonic and slower. Just write <code>if my_list:</code> because empty lists are falsy."),
        "# Truthy / Falsy evaluation\nempty_list = []\nname = \"Alice\"\nzero = 0\n\nif empty_list:\n    print('List has data')\nelse:\n    print('List is empty (falsy)')\n\nif name:\n    print(f'Name is {name}')\n\n# Classic if/elif/else routing\nstatus_code = 404\n\nif status_code == 200:\n    print('OK')\nelif status_code == 404:\n    print('Not Found')\nelif status_code >= 500:\n    print('Server Error')\nelse:\n    print('Unknown Status')\n",
        "If/Elif/Else",
        [
            '### **Q1.** Write an if/elif/else block that categorizes `temp = 25` into "Cold" (<15), "Warm" (15-30), or "Hot" (>30).\n',
            '### **Q2.** Demonstrate truthy evaluation: create an empty dictionary `d = {}`. Use `if d:` to print "Has data" else "Empty". Print the result.\n',
            '### **Q3.** Given `user = None`, write a safe check `if user is not None and user.get("active"):`. Explain why `is not None` is used instead of just `if user:`.\n',
            '### **Q4.** Rewrite `if len(string) == 0:` in the Pythonic way using truthy/falsy evaluation.\n',
            '### **Q5.** Write an if-statement that checks if a year (e.g., `2024`) is a leap year (divisible by 4 AND not divisible by 100, OR divisible by 400).\n',
        ]
    ))

    # ── SECTION 2: Ternary Operator ──
    S.append((
        SH(2,"Ternary Operator","Inline Conditionals") + '\n\n' +
        WH("The ternary operator <code>x if condition else y</code> evaluates to <code>x</code> if the condition is True, otherwise <code>y</code>. It is an <b>expression</b>, meaning it returns a value and can be assigned to a variable or used inline.") + '\n\n' +
        "| Approach | Code | Lines |\n"
        "| :--- | :--- | :--- |\n"
        "| Standard | `if x > 0: y = 1`<br>`else: y = 0` | 4 |\n"
        "| Ternary | `y = 1 if x > 0 else 0` | 1 |\n\n" +
        WC([("Variable Assignment","`status = 'active' if is_paid else 'inactive'`"),
            ("Data Cleaning","`val = 0 if val is None else val` — handle nulls"),
            ("List Comprehensions","`[x if x > 0 else 0 for x in data]` — inline mapping")]) + '\n\n' +
        PF("Nested Ternaries","Avoid nesting ternaries (e.g., <code>a if cond1 else b if cond2 else c</code>). It destroys readability. Use a standard `if/elif` block instead."),
        "age = 20\n\n# Standard if/else\nif age >= 18:\n    category = 'Adult'\nelse:\n    category = 'Minor'\n\n# Ternary equivalent\ncategory_ternary = 'Adult' if age >= 18 else 'Minor'\nprint(f'Category: {category_ternary}')\n\n# Useful in f-strings\ncount = 1\nprint(f'I have {count} apple{\"s\" if count != 1 else \"\"}')\n\n# Handling nulls\nuser_input = None\nclean_input = user_input if user_input is not None else 'default_value'\nprint(f'Cleaned: {clean_input}')\n",
        "Ternary",
        [
            '### **Q1.** Use a ternary operator to assign `"Even"` to `result` if `n = 4` is even, else `"Odd"`. Print `result`.\n',
            '### **Q2.** Given `price = 100` and `is_member = True`, calculate `final_price` with a 20% discount if member, else 0%. Use a ternary. Print it.\n',
            '### **Q3.** Use a ternary inside an f-string to print `"Pass"` if `score = 75` is >= 60, else `"Fail"`. Print the string.\n',
            '### **Q4.** Write a list comprehension that uses a ternary to cap values at 100. For `[50, 150, 80, 200]`, return `[50, 100, 80, 100]`.\n',
            '### **Q5.** Why is `a = x or y` sometimes used instead of `a = x if x else y`? Demonstrate with `x = ""` and `y = "default"`.\n',
        ]
    ))

    # ── SECTION 3: Structural Pattern Matching ──
    S.append((
        SH(3,"Match-Case (Python 3.10+)","Structural Pattern Matching") + '\n\n' +
        WH("Introduced in Python 3.10, <code>match-case</code> is much more than a switch statement. It allows you to <b>match values AND structural patterns</b> (like the shape of a dictionary or list) and extract variables simultaneously.") + '\n\n' +
        "```python\nmatch status_code:\n    case 200 | 201:\n        print('Success')\n    case 404:\n        print('Not Found')\n    case _:\n        print('Unknown/Default')\n```\n\n" +
        WC([("API Routing","Handle different types of incoming JSON payloads based on their structure"),
            ("Command Parsing","Parse user input like `['drop', 'table', name]` cleanly"),
            ("State Machines","Cleanly manage transitions between app states")]) + '\n\n' +
        PF("Not Just a Switch","If you are just comparing a single variable against constants (like a switch), a dictionary lookup is often faster and cleaner: <code>routes.get(status, 'Unknown')</code>."),
        "# Simple literal matching\ncommand = 'start'\n\nmatch command:\n    case 'start' | 'run':  # Use | for multiple values\n        print('System starting...')\n    case 'stop':\n        print('System stopping...')\n    case _:  # The underscore acts as the default/else case\n        print('Unknown command')\n\n# Matching with variable capture\nuser_input = ['greet', 'Alice']\n\nmatch user_input:\n    case ['greet', name]:  # Matches a 2-element list starting with 'greet'\n        print(f'Hello, {name}!')\n    case ['exit']:\n        print('Goodbye!')\n    case _:\n        print('Invalid syntax')\n",
        "Match-Case",
        [
            '### **Q1.** Write a match-case block that checks a `grade = "B"`. Match "A", "B"|"C", "D"|"F", and a default case. Print a message for each.\n',
            '### **Q2.** Given `point = (0, 5)`, write a match-case that matches `(0, 0)` (Origin), `(0, y)` (Y-axis), `(x, 0)` (X-axis), and `(x, y)`. Print which it is.\n',
            '### **Q3.** Write a match-case that parses a list `cmd = ["rm", "file.txt"]`. Match `["rm", filename]` and print "Deleting [filename]".\n',
            '### **Q4.** Can you use conditions inside a case? Yes (called a guard). Add `if y > 0` to the `(0, y)` case in Q2. Try it.\n',
            '### **Q5.** Why might a dictionary `actions = {"start": func1, "stop": func2}` be preferred over a simple match-case for routing commands?\n',
        ]
    ))

    # ── SECTION 4: Match-Case with Data Structures ──
    S.append((
        SH(4,"Pattern Matching with Dicts","Extracting JSON Payloads") + '\n\n' +
        WH("The true power of <code>match-case</code> lies in matching dictionaries and extracting specific keys. It ignores extra keys, making it perfect for parsing heterogeneous JSON payloads.") + '\n\n' +
        "```python\npayload = {'type': 'user_update', 'id': 101, 'name': 'Alice'}\n\nmatch payload:\n    case {'type': 'user_update', 'id': uid}:\n        print(f'Updating user {uid}')\n```\n\n" +
        WC([("Event Streams","Process streams of JSON events (like Kafka topics) where schemas vary"),
            ("Data Validation","Ensure a dictionary has a specific shape before processing"),
            ("AST Parsing","Traversing Abstract Syntax Trees or complex nested data")]) + '\n\n' +
        PT("In dictionary matching, extra keys are ignored. <code>case {'id': uid}:</code> matches <i>any</i> dictionary that has an 'id' key, regardless of what else is in it."),
        "events = [\n    {'type': 'click', 'x': 10, 'y': 20},\n    {'type': 'keypress', 'key': 'Enter'},\n    {'type': 'unknown', 'data': '???', 'id': 99}\n]\n\nfor event in events:\n    match event:\n        # Match dictionary shape and capture variables\n        case {'type': 'click', 'x': x_pos, 'y': y_pos}:\n            print(f'Mouse click at ({x_pos}, {y_pos})')\n            \n        case {'type': 'keypress', 'key': key_name}:\n            print(f'Keyboard hit: {key_name}')\n            \n        # Use **rest to capture the remaining keys\n        case {'type': unknown_type, **rest}:\n            print(f'Unhandled event: {unknown_type}, payload: {rest}')\n",
        "Matching Dicts",
        [
            '### **Q1.** Write a match-case that handles a user record: `user = {"role": "admin", "name": "Alice"}`. Match if role is "admin" and capture the name.\n',
            '### **Q2.** Given `api_response = {"status": 200, "data": {"users": 5}}`, write a match-case that matches status 200 and captures the "data" dictionary.\n',
            '### **Q3.** Match `{"action": "move", "dx": 1, "dy": -1}`. Extract `dx` and `dy` and print `"Moving by x, y"`.\n',
            '### **Q4.** Write a match-case for a list of dictionaries. Try matching `[{"id": 1}, {"id": 2}]`. Capture the first id.\n',
            '### **Q5.** Explain why dictionary pattern matching is considered "structural". What happens if the dict has keys you didn\'t specify in the case?\n',
        ]
    ))

    return S
