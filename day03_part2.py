"""Generate Day03 Strings notebook - Part 2: Sections 5-8 + assembly."""
from nb_helpers import *
from day03_part1 import sections_1_to_4
import os

def sections_5_to_8():
    S = []

    # ── SECTION 5: String Formatting ──
    S.append((
        SH(5,"String Formatting","Professional Output Generation") + '\n\n' +
        WH("Python offers three formatting approaches: <b>f-strings</b> (Python 3.6+, fastest and most readable), <code>.format()</code>, and <code>%</code>-formatting (legacy). F-strings embed expressions directly inside <code>{}</code> braces.") + '\n\n' +
        "| Format Spec | Meaning | Example | Result |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `:.2f` | 2 decimal places | `f'{3.14159:.2f}'` | `3.14` |\n"
        "| `:,` | Thousands separator | `f'{1000000:,}'` | `1,000,000` |\n"
        "| `:>10` | Right-align (width 10) | `f'{\"hi\":>10}'` | `'        hi'` |\n"
        "| `:<10` | Left-align | `f'{\"hi\":<10}'` | `'hi        '` |\n"
        "| `:^10` | Center-align | `f'{\"hi\":^10}'` | `'    hi    '` |\n"
        "| `:.2%` | Percentage | `f'{0.856:.2%}'` | `85.60%` |\n\n" +
        WC([("Report generation","Formatted tables, aligned columns, currency values"),
            ("Logging","`f'[{timestamp}] {level}: {message}'` — structured log output"),
            ("Dashboard metrics","`f'{revenue:,.2f}'` — professional number formatting")]) + '\n\n' +
        PT("F-strings can contain any Python expression: <code>f'{len(data):,} records processed in {elapsed:.1f}s'</code>. They are evaluated at runtime."),
        # demo
        "name, age, salary = 'Alice', 30, 85432.5\n\n# f-string basics\nprint(f'{name} is {age} years old')\nprint(f'Salary: ${salary:,.2f}')\n\n# Alignment\nfor item, price in [('Coffee', 4.5), ('Sandwich', 8.99), ('Juice', 3.2)]:\n    print(f'{item:<12} ${price:>6.2f}')\n\n# Expressions inside f-strings\ndata = [1, 2, 3, 4, 5]\nprint(f'Sum: {sum(data)}, Avg: {sum(data)/len(data):.1f}')\n",
        "Formatting",
        [
            '### **Q1.** Given `revenue = 1234567.89`, print it as currency with commas and 2 decimal places: `$1,234,567.89`. Use an f-string.\n',
            '### **Q2.** Create a formatted table: print 3 products with name (left-aligned, 15 chars) and price (right-aligned, 8 chars, 2 decimals). Use f-string alignment.\n',
            '### **Q3.** Given `ratio = 0.8567`, print it as a percentage with 1 decimal place: `85.7%`. Use the `%` format specifier.\n',
            '### **Q4.** Print the number `42` in binary, octal, and hexadecimal using f-string format specs (`:b`, `:o`, `:x`). Print all three.\n',
            '### **Q5.** Write an f-string that embeds a conditional expression: print `"Even"` or `"Odd"` for `n = 7` directly inside the f-string.\n',
        ]
    ))

    # ── SECTION 6: String Validation ──
    S.append((
        SH(6,"String Validation Methods","Data Quality Checks") + '\n\n' +
        WH("Python strings have built-in validation methods that return <code>True</code> or <code>False</code>. These are essential for <b>input validation</b> and <b>data quality checks</b> before processing.") + '\n\n' +
        "| Method | Returns True if... | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `.isdigit()` | All characters are digits | `'123'.isdigit()` → `True` |\n"
        "| `.isalpha()` | All characters are letters | `'abc'.isalpha()` → `True` |\n"
        "| `.isalnum()` | Letters or digits only | `'abc123'.isalnum()` → `True` |\n"
        "| `.isspace()` | All whitespace | `'  '.isspace()` → `True` |\n"
        "| `.isupper()` | All uppercase | `'ABC'.isupper()` → `True` |\n"
        "| `.islower()` | All lowercase | `'abc'.islower()` → `True` |\n"
        "| `.istitle()` | Title case | `'Hello World'.istitle()` → `True` |\n\n" +
        WC([("Input validation","`if user_id.isdigit():` — validate before int conversion"),
            ("Data cleaning","Filter rows where a column should be numeric but contains text"),
            ("ETL pipelines","Validate data quality before loading into databases")]) + '\n\n' +
        PF("isdigit() vs isnumeric()","<code>isdigit()</code> only matches <code>0-9</code>. <code>isnumeric()</code> also matches Unicode numerals like <code>'\\u00B2'</code> (superscript 2). For data work, use <code>isdigit()</code> or try/except with <code>int()</code>."),
        # demo
        "# Validation checks\nprint('12345'.isdigit())    # True\nprint('12.34'.isdigit())    # False — dot is not a digit\nprint('hello'.isalpha())    # True\nprint('hello123'.isalnum()) # True\n\n# Practical: safe type conversion\nuser_input = '42'\nif user_input.isdigit():\n    age = int(user_input)\n    print(f'Valid age: {age}')\nelse:\n    print('Invalid input')\n\n# Check naming conventions\nprint('Hello World'.istitle())  # True\nprint('CONSTANT'.isupper())     # True\n",
        "Validation",
        [
            '### **Q1.** Given a list `inputs = ["123", "12.5", "abc", "45", ""]`, use `.isdigit()` to filter only valid integers. Print the valid ones.\n',
            '### **Q2.** Write a function `validate_username(name)` that returns `True` only if: length 3-20, alphanumeric only. Test with 5 examples.\n',
            '### **Q3.** Given `data = ["Hello", "WORLD", "mixedCase", "Title Case"]`, classify each as upper, lower, title, or mixed. Use `.isupper()`, `.islower()`, `.istitle()`.\n',
            '### **Q4.** Write code that checks if `s = "  \\t\\n  "` is all whitespace using `.isspace()`. Then check `""` (empty string). What does empty return? Explain.\n',
            '### **Q5.** Write a safe `to_float(s)` function that handles strings like `"3.14"`, `"-2.5"`, `"abc"`, `""`. Return `None` for invalid inputs. Test with 5 cases.\n',
        ]
    ))

    # ── SECTION 7: String Encoding ──
    S.append((
        SH(7,"Encoding & Unicode","Global Text Processing") + '\n\n' +
        WH("Python 3 strings are <b>Unicode by default</b> (UTF-8). When working with files, APIs, or databases, you must handle encoding correctly. <code>encode()</code> converts str → bytes, <code>decode()</code> converts bytes → str.") + '\n\n' +
        "```python\ntext = 'Hello'\nbytes_obj = text.encode('utf-8')   # b'Hello'\nback = bytes_obj.decode('utf-8')   # 'Hello'\n```\n\n" +
        WC([("API responses","JSON/REST APIs often return bytes that need decoding"),
            ("File I/O","`open(file, encoding='utf-8')` — always specify encoding"),
            ("International data","Names, addresses, currencies in non-Latin scripts need proper Unicode handling")]) + '\n\n' +
        PF("UnicodeDecodeError","Reading a file with wrong encoding causes <code>UnicodeDecodeError</code>. Always use <code>encoding='utf-8'</code> or detect encoding with libraries like <code>chardet</code>."),
        # demo
        "# Encoding and decoding\ntext = 'Python'\nbytes_val = text.encode('utf-8')\nprint(bytes_val)          # b'Python'\nprint(type(bytes_val))    # <class 'bytes'>\nprint(bytes_val.decode()) # Python\n\n# Unicode characters\nemoji = '\\U0001F4CA'  # chart emoji\nprint(f'Data {emoji}')\nprint(f'Length: {len(emoji)}')  # 1 character\nprint(f'Bytes:  {len(emoji.encode(\"utf-8\"))}')  # 4 bytes\n\n# ord() and chr()\nprint(ord('A'))    # 65\nprint(chr(65))     # A\n",
        "Encoding",
        [
            '### **Q1.** Encode `text = "Python"` to UTF-8 bytes. Print the bytes object and its length. Then decode it back and verify equality.\n',
            '### **Q2.** Compare the byte length of `"A"` vs `"\\u00C9"` (accented E) vs a Chinese character `"\\u4e16"` in UTF-8. Print each character and its byte count.\n',
            '### **Q3.** Use `ord()` to print the Unicode code point of each character in `"Hello"`. Then use `chr()` to reconstruct the string from code points.\n',
            '### **Q4.** Write code that safely reads a string, trying UTF-8 first, then Latin-1 as fallback. Use try/except with `.decode()`.\n',
            '### **Q5.** Create a string with mixed scripts: English, numbers, and symbols. Print its `len()` (characters) and `len(s.encode())` (bytes). Explain the difference.\n',
        ]
    ))

    # ── SECTION 8: Performance ──
    S.append((
        SH(8,"String Performance","Efficient Text Processing") + '\n\n' +
        WH("Since strings are <b>immutable</b>, concatenation in loops creates many temporary objects. For building large strings, use <code>list + join</code> or <code>io.StringIO</code> instead of <code>+=</code>. This can be <b>100x faster</b> for large datasets.") + '\n\n' +
        "| Approach | Speed | Memory | Use When |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `+=` in loop | Slow | High | Never for large data |\n"
        "| `''.join(list)` | Fast | Low | Building strings in loops |\n"
        "| f-strings | Fastest | Low | Single-line formatting |\n"
        "| `io.StringIO` | Fast | Medium | Stream-like building |\n\n" +
        WC([("ETL pipelines","Building CSV output with `join()` instead of `+=` saves minutes on large datasets"),
            ("Report generation","Use `join()` for assembling multi-line reports"),
            ("Memory management","Knowing string interning helps debug identity issues")]) + '\n\n' +
        PT("Python <b>interns</b> small strings and identifiers. <code>'hello' is 'hello'</code> may be <code>True</code> due to caching, but never rely on this — always use <code>==</code> for comparison."),
        # demo
        "import time\n\n# Slow: string concatenation in loop\nstart = time.time()\nresult = ''\nfor i in range(10000):\n    result += str(i)\nslow_time = time.time() - start\n\n# Fast: list + join\nstart = time.time()\nparts = []\nfor i in range(10000):\n    parts.append(str(i))\nresult = ''.join(parts)\nfast_time = time.time() - start\n\nprint(f'Concatenation: {slow_time:.4f}s')\nprint(f'Join:          {fast_time:.4f}s')\nprint(f'Join is {slow_time/fast_time:.1f}x faster')\n",
        "Performance",
        [
            '### **Q1.** Build a string of numbers `"0,1,2,...,999"` using: (a) `+=` in a loop, (b) `",".join()`. Time both approaches and print the speedup ratio.\n',
            '### **Q2.** Demonstrate string interning: test `a = "hello"; b = "hello"; print(a is b)`. Then test with `a = "hello world"`. Explain the difference.\n',
            '### **Q3.** Write code that builds a CSV string from `data = [("Alice",25), ("Bob",30), ("Charlie",35)]` using `join()`. Print the result.\n',
            '### **Q4.** Use `sys.getsizeof()` to measure memory of: empty string, `"a"`, `"hello"`, `"a"*1000`. Print each size. What pattern do you notice?\n',
            '### **Q5.** Write a function `build_report(rows)` that takes a list of dicts and returns a formatted table string using `join()`. Test with 3 sample rows.\n',
        ]
    ))

    return S

TASKS = [
    ("Data Cleaner", "Write a function `clean_name(name)` that: strips whitespace, converts to title case, replaces multiple spaces with single space, and removes non-alphabetic characters (except spaces). Test with `'  john   DOE 3rd  '`."),
    ("CSV Parser", "Write a function `parse_csv_line(line)` that splits a CSV line by commas, strips each field, and returns a list. Handle edge case: fields containing commas inside quotes. Test with `'Alice, 28, \"New York, NY\"'`."),
    ("Log Analyzer", 'Given `log = "2024-01-15 14:30:22 ERROR Database connection failed"`, extract: date, time, level, message using string methods only (no regex). Print each part.'),
    ("Email Validator", "Write a function `validate_email(email)` that checks: contains exactly one `@`, has text before and after `@`, domain has a dot, no spaces. Return `True`/`False`. Test with 5 valid and 5 invalid emails."),
    ("Text Statistics", "Write a function `text_stats(text)` that returns a dict with: character count, word count, sentence count, average word length, most common word. Test with a paragraph of text."),
]

INTERVIEWS = [
    "Write a function `reverse_words(s)` that reverses word order: `'hello world'` → `'world hello'`. Do NOT reverse individual characters.",
    "Write a function `is_anagram(s1, s2)` that checks if two strings are anagrams (case-insensitive, ignoring spaces). Test with `'listen'` and `'silent'`.",
    "Write a function `compress(s)` implementing run-length encoding: `'aabcccdd'` → `'a2b1c3d2'`. Only compress if result is shorter.",
    "Write a function `first_non_repeating(s)` that finds the first non-repeating character. `'aabbc'` → `'c'`. Return `None` if all repeat.",
    "Write a function `caesar_cipher(text, shift)` that shifts each letter by `shift` positions. Handle wrapping (z→a) and preserve non-letters.",
    "Write a function `longest_common_prefix(strs)` that finds the longest common prefix in a list of strings. `['flower','flow','flight']` → `'fl'`.",
    "Write a function `valid_parentheses(s)` that checks if brackets are balanced: `'([{}])'` → `True`, `'([)]'` → `False`.",
    "Write a function `count_vowels(s)` that returns a dict of vowel frequencies (case-insensitive). Test with a sentence.",
    "Write a function `title_case(s)` that capitalizes the first letter of each word, except articles (`a, an, the`). First word always capitalized.",
    "Write a function `remove_duplicates(s)` that removes duplicate characters preserving order: `'abcabc'` → `'abc'`.",
    "Write a function `zigzag(s, rows)` that converts text to zigzag pattern and reads row by row. `'PAYPALISHIRING'` with 3 rows → `'PAHNAPLSIIGYIR'`.",
    "Write a function `word_pattern(pattern, s)` that checks if string follows pattern: `pattern='abba', s='dog cat cat dog'` → `True`.",
    "Write a function `group_anagrams(words)` that groups anagrams together. `['eat','tea','tan','ate','nat','bat']` → grouped lists.",
    "Write a function `find_overlapping(s, sub)` that counts all overlapping occurrences of `sub` in `s`. E.g., `find_overlapping('aaa', 'aa')` returns `2`.",
    "Write a function `pad_number(n, width)` that pads a number with leading zeros to the given width. E.g., `pad_number(42, 5)` returns `'00042'`.",
    "Write code to implement `str.replace()` from scratch: `my_replace(text, old, new)`. Handle overlapping patterns.",
    "Write a function `repeat_chars(s, n)` that repeats each character n times: `repeat_chars('abc', 3)` returns `'aaabbbccc'`.",
    "Write a function `longest_palindrome_substring(s)` that finds the longest palindromic substring in a string.",
    "Write a function `atoi(s)` that converts string to integer handling: whitespace, signs, overflow, invalid chars. Mimic `int()` behavior.",
    "Write a function `justify_text(text, width)` that fully justifies text to given width by distributing spaces evenly between words.",
    "Write a function `compare_version(v1, v2)` that compares version strings: `'1.2.3'` vs `'1.2.4'` → `-1`. Handle different lengths.",
    "Write a function `interleave(s1, s2)` that interleaves two strings: `'abc','xyz'` → `'axbycz'`. Handle different lengths.",
    "Write a function `count_substrings(s, sub)` that counts overlapping occurrences: `'aaa'` contains `'aa'` twice.",
    "Write a function `to_snake_case(s)` converting `'camelCaseString'` → `'camel_case_string'`. Handle consecutive capitals.",
    "Write a function `expand_range(s)` that expands: `'1-5,8,11-14'` → `[1,2,3,4,5,8,11,12,13,14]`.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Creation | 4 ways to create; strings are immutable | File paths, SQL queries |\n"
    "| 2 | Indexing & Slicing | Zero-based; `stop` is exclusive; `[::-1]` reverses | Log parsing, data extraction |\n"
    "| 3 | Core Methods | `.strip()`, `.replace()`, `.find()` — chain them | Data cleaning pipelines |\n"
    "| 4 | Split & Join | `split()` → list; `join()` → string | CSV/text parsing |\n"
    "| 5 | Formatting | f-strings are fastest and most readable | Reports, dashboards |\n"
    "| 6 | Validation | `.isdigit()`, `.isalpha()` for quality checks | Input validation, ETL |\n"
    "| 7 | Encoding | UTF-8 default; `encode()`/`decode()` for bytes | APIs, file I/O |\n"
    "| 8 | Performance | `join()` >> `+=` for loop concatenation | Large-scale text processing |\n"
)

CHECKLIST = (
    "- [ ] I understand string immutability and its performance implications.\n"
    "- [ ] I can use slicing to extract substrings efficiently.\n"
    "- [ ] I know the difference between `.find()` (safe) and `.index()` (raises error).\n"
    "- [ ] I can use f-strings with format specs for professional output.\n"
    "- [ ] I understand encoding and can handle UTF-8/bytes conversion.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_4() + sections_5_to_8()
    nb = build(
        day=3, title="Strings",
        obj_text="Strings are the primary vehicle for text data — the most common data type in real-world datasets. Today we master every aspect of string manipulation, from basic creation to performance optimization. You will learn not just string methods, but professional text processing patterns used in ETL pipelines and data cleaning.",
        obj_table=(
            "| # | Topic | Key Methods | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Creation & Escaping | `''`, `\"\"`, `r''`, `'''` | File paths, SQL, multi-line |\n"
            "| 2 | Indexing & Slicing | `s[0]`, `s[1:4]`, `s[::-1]` | Data extraction |\n"
            "| 3 | Core Methods | `.strip()`, `.replace()`, `.find()` | Data cleaning |\n"
            "| 4 | Split & Join | `.split()`, `','.join()` | CSV/text parsing |\n"
            "| 5 | Formatting | f-strings, `.format()` | Reports, dashboards |\n"
            "| 6 | Validation | `.isdigit()`, `.isalpha()` | Input validation |\n"
            "| 7 | Encoding | `.encode()`, `.decode()` | APIs, file I/O |\n"
            "| 8 | Performance | `join()` vs `+=` | Efficient processing |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 4 - Lists: Dynamic Sequences, Manipulation, and Data Pipelines"
    )
    save(nb, os.path.join('notebooks', 'Day03_Strings_Blank.ipynb'))
    print("Day 03 generated successfully!")
