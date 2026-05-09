"""Generate Day03 Strings notebook - Part 1: Sections 1-4."""
from nb_helpers import *

def sections_1_to_4():
    S = []

    # ── SECTION 1: String Creation ──
    S.append((
        SH(1,"String Creation & Escaping","Text Data Fundamentals") + '\n\n' +
        WH("A string is an <b>immutable sequence of Unicode characters</b>. You can create strings with single quotes <code>'...'</code>, double quotes <code>\"...\"</code>, or triple quotes <code>'''...'''</code> for multi-line text. Raw strings <code>r'...'</code> disable escape character processing.") + '\n\n' +
        "| Syntax | Use Case | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `'hello'` | Simple text | Most common |\n"
        "| `\"it's\"` | Text with apostrophes | Avoids escaping |\n"
        '| `"""..."""` | Multi-line / docstrings | SQL queries, docs |\n'
        "| `r'C:\\path'` | Raw string (no escapes) | File paths, regex |\n\n" +
        "**Common Escape Characters:**\n\n"
        "| Escape | Meaning | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `\\n` | Newline | `'Line1\\nLine2'` |\n"
        "| `\\t` | Tab | `'Col1\\tCol2'` |\n"
        "| `\\\\` | Backslash | `'C:\\\\Users'` |\n"
        "| `\\'` | Single quote | `'it\\'s'` |\n\n" +
        WC([("CSV/JSON parsing","Understanding escape characters is essential for parsing data files"),
            ("SQL queries","Triple-quoted strings hold multi-line SQL cleanly"),
            ("File paths","Raw strings `r'C:\\data\\file.csv'` prevent escape issues on Windows")]) + '\n\n' +
        PF("Immutability","Strings <b>cannot be modified in place</b>. Every operation like <code>.upper()</code> or <code>+</code> creates a <b>new string object</b>. This matters for performance in loops.") + '\n\n' +
        PT("Use triple-quoted strings for multi-line SQL queries: <code>query = \"\"\"SELECT * FROM users WHERE age > 18\"\"\"</code>. This keeps your code readable."),
        # demo
        "# String creation methods\nsingle = 'Hello'\ndouble = \"World\"\nmulti = '''This is\na multi-line\nstring'''\nraw = r'C:\\Users\\data\\file.csv'\n\nprint(single, double)\nprint(multi)\nprint(raw)\n\n# Immutability proof\ns = 'hello'\nprint(f'id before: {id(s)}')\ns = s.upper()\nprint(f'id after:  {id(s)}')  # Different object!\n",
        "Creation",
        [
            '### **Q1.** Create strings using all 4 methods: single quotes, double quotes, triple quotes, and raw string. Print each with its `type()` and `len()`.\n',
            '### **Q2.** Write a string containing: a newline, a tab, and a backslash. Print it and then print its `repr()` to see the escape characters.\n',
            '### **Q3.** Prove string immutability: create `s = "hello"`, save `id(s)`, then do `s += " world"`. Compare the IDs. What does this prove?\n',
            '### **Q4.** Create a raw string for the Windows path `C:\\Users\\Admin\\Documents\\data.csv`. Then create the same path using escape characters. Verify they are equal.\n',
            '### **Q5.** Write a multi-line SQL query using triple quotes: `SELECT name, age FROM users WHERE age > 18 ORDER BY name`. Print it.\n',
        ]
    ))

    # ── SECTION 2: Indexing & Slicing ──
    S.append((
        SH(2,"Indexing & Slicing","Precision Text Extraction") + '\n\n' +
        WH("Strings support <b>zero-based indexing</b> and <b>negative indexing</b> (from the end). <b>Slicing</b> extracts substrings using the syntax <code>s[start:stop:step]</code> where <code>stop</code> is exclusive.") + '\n\n' +
        "```python\ntext = 'PYTHON'\n#       P  Y  T  H  O  N\n#       0  1  2  3  4  5   (positive index)\n#      -6 -5 -4 -3 -2 -1  (negative index)\n```\n\n"
        "| Operation | Syntax | Result |\n"
        "| :--- | :--- | :--- |\n"
        "| First char | `s[0]` | `'P'` |\n"
        "| Last char | `s[-1]` | `'N'` |\n"
        "| Slice | `s[1:4]` | `'YTH'` |\n"
        "| Reverse | `s[::-1]` | `'NOHTYP'` |\n"
        "| Every 2nd | `s[::2]` | `'PTO'` |\n\n" +
        WC([("Column extraction","Extract substrings from fixed-width data: `record[0:10]` for name field"),
            ("Data cleaning","`phone[-10:]` to extract last 10 digits of phone numbers"),
            ("Log parsing","Slice timestamps from log lines: `log_line[:19]` for ISO datetime")]) + '\n\n' +
        PF("Off-by-One","The stop index is <b>exclusive</b>: <code>'PYTHON'[0:3]</code> gives <code>'PYT'</code> (indices 0, 1, 2), not <code>'PYTH'</code>. This is a common source of bugs.") + '\n\n' +
        PT("Reverse a string with <code>s[::-1]</code>. Check for palindromes: <code>s == s[::-1]</code>."),
        # demo
        "text = 'Data Analytics'\n\n# Indexing\nprint(text[0])     # D\nprint(text[-1])    # s\n\n# Slicing\nprint(text[0:4])   # Data\nprint(text[5:])    # Analytics\nprint(text[::-1])  # scitylanA ataD\n\n# Practical: extract date parts\niso_date = '2024-12-25'\nyear  = iso_date[:4]\nmonth = iso_date[5:7]\nday   = iso_date[8:10]\nprint(f'{year}/{month}/{day}')\n",
        "Indexing & Slicing",
        [
            '### **Q1.** Given `s = "Data Analytics"`, extract: first word, last word, every other character, and the reversed string. Print each.\n',
            '### **Q2.** Given `iso_date = "2024-12-25T14:30:00"`, use slicing to extract: year, month, day, hour, minute, second. Print a formatted result.\n',
            '### **Q3.** Write code to check if `word = "racecar"` is a palindrome using slicing. Print the result with an explanation.\n',
            '### **Q4.** Given `phone = "+91-98765-43210"`, use slicing to extract just the 10-digit number (last 10 characters). Print it.\n',
            '### **Q5.** Write code that reverses each word in `sentence = "Hello World Python"` but keeps word order. Use `split()` and slicing.\n',
        ]
    ))

    # ── SECTION 3: Core String Methods ──
    S.append((
        SH(3,"Core String Methods","Search, Replace & Transform") + '\n\n' +
        WH("Python strings have 40+ built-in methods. The most important ones for data work are: <code>upper()</code>, <code>lower()</code>, <code>strip()</code>, <code>replace()</code>, <code>find()</code>, <code>count()</code>, <code>startswith()</code>, and <code>endswith()</code>. All return <b>new strings</b> (immutability).") + '\n\n' +
        "| Method | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `.upper()` / `.lower()` | Case conversion | Standardize text |\n"
        "| `.strip()` | Remove whitespace | Clean user input |\n"
        "| `.replace(old, new)` | Replace substrings | Data correction |\n"
        "| `.find(sub)` | Find position (-1 if absent) | Safe search |\n"
        "| `.count(sub)` | Count occurrences | Frequency analysis |\n"
        "| `.startswith()` | Check prefix | Filter by pattern |\n"
        "| `.endswith()` | Check suffix | File type detection |\n\n" +
        WC([("Data standardization","`name.strip().title()` — clean and capitalize names"),
            ("Text cleaning","`text.replace('\\n', ' ').strip()` — normalize whitespace"),
            ("File filtering","`if filename.endswith('.csv'):` — filter file types"),
            ("Search","`.find()` returns -1 instead of raising error (safer than `.index()`)")]) + '\n\n' +
        PF("find() vs index()","<code>.find()</code> returns <code>-1</code> if not found. <code>.index()</code> raises <code>ValueError</code>. Always prefer <code>.find()</code> for safe searching.") + '\n\n' +
        PT("Chain methods for clean data pipelines: <code>name.strip().lower().replace(' ', '_')</code> converts <code>' John Doe '</code> to <code>'john_doe'</code>."),
        # demo
        "name = '  John Doe  '\nprint(name.strip())          # 'John Doe'\nprint(name.strip().lower())  # 'john doe'\nprint(name.strip().title())  # 'John Doe'\n\nemail = 'user@company.com'\nprint(email.find('@'))       # 4\nprint(email.endswith('.com')) # True\n\ntext = 'apple banana apple cherry apple'\nprint(text.count('apple'))   # 3\nprint(text.replace('apple', 'mango'))  # mango banana mango cherry mango\n",
        "String Methods",
        [
            '### **Q1.** Given `name = "  alice SMITH  "`, clean it to produce `"Alice Smith"` using method chaining (`strip`, `title`). Print the result.\n',
            '### **Q2.** Given `csv_line = "John,25,Engineer,NYC"`, use `.find()` to locate the position of the second comma. Print the result.\n',
            '### **Q3.** Count how many times the word `"data"` appears in `text = "Data science uses data to derive data-driven insights"` (case-insensitive). Print the count.\n',
            '### **Q4.** Given a list of filenames `["report.csv", "image.png", "data.csv", "notes.txt"]`, use `.endswith()` to filter only `.csv` files. Print the result.\n',
            '### **Q5.** Write code that replaces all spaces in `"hello world python"` with underscores, then converts to uppercase. Chain the methods in one line.\n',
        ]
    ))

    # ── SECTION 4: Splitting & Joining ──
    S.append((
        SH(4,"Splitting & Joining","Text Decomposition & Assembly") + '\n\n' +
        WH("<code>split()</code> breaks a string into a <b>list</b> of substrings based on a delimiter. <code>join()</code> does the reverse — it combines a list of strings into one string with a separator. These two methods are the backbone of text data processing.") + '\n\n' +
        "```python\n# split: string → list\n'a,b,c'.split(',')        # ['a', 'b', 'c']\n\n# join: list → string\n','.join(['a', 'b', 'c'])  # 'a,b,c'\n```\n\n" +
        WC([("CSV parsing","`row.split(',')` — manual CSV field extraction"),
            ("Log analysis","`log_line.split()` — split on whitespace for field extraction"),
            ("Data export","`','.join(columns)` — build CSV rows for output"),
            ("Path building","`'/'.join(['home', 'user', 'data'])` — construct file paths")]) + '\n\n' +
        PF("split() with No Arguments","<code>'a  b  c'.split()</code> splits on <b>any whitespace</b> and removes empty strings. <code>'a  b  c'.split(' ')</code> splits on single space only, producing <code>['a', '', 'b', '', 'c']</code>.") + '\n\n' +
        PT("Use <code>splitlines()</code> for multi-line text: it handles <code>\\n</code>, <code>\\r\\n</code>, and <code>\\r</code> correctly across all platforms."),
        # demo
        "# Splitting\ncsv_row = 'Alice,28,Engineer,London'\nfields = csv_row.split(',')\nprint(fields)  # ['Alice', '28', 'Engineer', 'London']\nprint(f'Name: {fields[0]}, Age: {fields[1]}')\n\n# Joining\nwords = ['Data', 'Science', 'Python']\nprint(' '.join(words))    # Data Science Python\nprint(' -> '.join(words))  # Data -> Science -> Python\n\n# split() vs split(' ')\ntext = 'hello   world'\nprint(text.split())      # ['hello', 'world']\nprint(text.split(' '))   # ['hello', '', '', 'world']\n",
        "Split & Join",
        [
            '### **Q1.** Given `csv = "name,age,city,salary"`, split into a list, then rejoin with `" | "` as separator. Print both results.\n',
            '### **Q2.** Given `path = "/home/user/data/file.csv"`, split by `"/"` and extract just the filename. Print it.\n',
            '### **Q3.** Split `text = "one  two   three    four"` using both `.split()` and `.split(" ")`. Print both results and explain the difference.\n',
            '### **Q4.** Given `words = ["SELECT", "name", "FROM", "users"]`, join them with spaces to build a SQL query string. Print it.\n',
            '### **Q5.** Write code that reads a multi-line string (use triple quotes with 3 lines) and splits it into individual lines using `.splitlines()`. Print each line with its index.\n',
        ]
    ))

    return S
