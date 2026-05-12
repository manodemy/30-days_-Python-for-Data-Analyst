"""
MANO HINT GENERATOR — Embeds 3-5 progressive pedagogical hints per question.
Reads all 30 day HTML files, analyzes each question, generates step-by-step
thinking guidance WITHOUT giving the answer.
"""
import re, os, html as htmlmod

DAYS_DIR = r'd:\Learn Python in 60days\manodemy_web'

def extract(q):
    t = htmlmod.unescape(q)
    codes = re.findall(r'<code>([^<]+)</code>', t)
    assigns = re.findall(r'([a-z_]\w*)\s*=\s*([^\s,<]+)', t, re.I)
    funcs = re.findall(r'(?:^|[\s(,])(\w+)\s*\(', t)
    funcs = [f for f in funcs if f.lower() not in ('q1','q2','q3','q4','q5','strong','p','code','div','span','none')]
    funcs = list(dict.fromkeys(funcs))
    exp = re.search(r'(?:Expected|Output|Result|→|gives|yields|returns?)[:\s]*[`<]*([^<\n,]{2,40})', t, re.I)
    expected = exp.group(1).strip().strip('`').strip() if exp else ''
    kw = re.findall(r'\b(print|type|len|range|sorted|enumerate|zip|map|filter|int|float|str|bool|list|tuple|set|dict|abs|round|sum|max|min|def|class|import|return|for|while|if|elif|else|try|except|lambda|append|sort|split|strip|join|replace|upper|lower|find|index|count|pop|insert|remove|reverse|keys|values|items|get|update|add|union|intersection|difference|isinstance|isclose|complex|None|True|False|input|open|yield|global|assert|raise|with|pass|break|continue|not|and|or|in|is)\b', t, re.I)
    kw = list(dict.fromkeys([k.lower() for k in kw]))
    plain = re.sub(r'<[^>]+>', '', t).strip()
    return {'codes': codes, 'vars': assigns, 'funcs': funcs, 'expected': expected, 'kw': kw, 'text': plain, 'raw': t}

def gen_hints(q_text):
    e = extract(q_text)
    t = e['text'].lower()
    hints = []

    # ── H1: Understand the problem ──
    h1_parts = []
    if e['vars']:
        vl = ', '.join([f'{n} = {v}' for n, v in e['vars'][:4]])
        h1_parts.append(f"First, create the variables mentioned: {vl}.")
    elif 'write a function' in t or 'define a function' in t or 'def ' in t:
        fn = re.search(r'(?:function|def)\s+(\w+)', t)
        h1_parts.append(f"Start by defining your function: def {fn.group(1) if fn else 'function_name'}().")
    elif 'create a' in t or 'create an' in t:
        w = re.search(r'create\s+(?:a|an)\s+(\w+(?:\s+\w+)?)', t)
        h1_parts.append(f"Start by creating the {w.group(1) if w else 'data structure'} described.")
    elif 'given' in t:
        h1_parts.append("Set up the data exactly as described in the question first.")
    else:
        h1_parts.append("Read the question carefully. Identify what it's asking you to produce.")

    # Concept identification
    concept_hints = {
        'type(': "This tests the type() function — it tells you what kind of data a value is.",
        'data type': "This is about Python data types. Each value in Python has a specific type.",
        'for loop': "Think about: what collection to loop over, and what to do with each element.",
        'while': "Think about: what condition keeps the loop going, and what changes each time.",
        'list comprehension': "List comprehension pattern: [expression for item in iterable if condition].",
        'try': "Error handling: what code might fail, and what specific error type would it raise?",
        'lambda': "Lambda is a one-line function: lambda parameter: expression.",
        'class': "Think about: what attributes (data) and methods (actions) this object needs.",
        'decorator': "A decorator wraps a function. It takes a function in and returns a modified function.",
        'generator': "Generators use yield instead of return — they produce values lazily, one at a time.",
        'regex': "Think about the pattern character by character. Test small parts first.",
        'slice': "Slicing: [start:stop:step]. Remember start is inclusive, stop is exclusive.",
        'dictionary': "Think about your keys (unique identifiers) and values (the data they map to).",
        'set': "Sets store only unique values. Think about which set operation (union, intersection, difference) fits.",
        'tuple': "Tuples are immutable — once created, they can't be changed. Great for fixed data.",
        'boolean': "Falsy values: 0, 0.0, '', [], {}, set(), None, False. Everything else is Truthy.",
        'none': "None means 'no value'. Always check with 'is None', never '== None'.",
        'string': "Think about which string method transforms the text the way the question asks.",
        'convert': "Type conversion: int(), float(), str(), bool(), list(), tuple(), set(), dict().",
        'sort': "In-place: .sort() changes the list. New copy: sorted() returns a new list.",
        'enumerate': "enumerate() gives you (index, value) pairs in a loop.",
        'zip': "zip() pairs up elements from multiple iterables.",
        'import': "Think about which module provides the function you need.",
        'file': "Use 'with open(filename) as f:' for safe file handling.",
    }
    for keyword, hint_text in concept_hints.items():
        if keyword in t:
            h1_parts.append(hint_text)
            break

    hints.append(' '.join(h1_parts))

    # ── H2: Key tools to use ──
    h2_parts = []
    skip = {'write','show','create','given','use','find','check','test','compute','calculate','demonstrate','explain','call','make','prove','verify'}
    key_funcs = [f for f in e['funcs'] if f.lower() not in skip]
    if key_funcs:
        h2_parts.append(f"The functions/methods you'll need: {', '.join(key_funcs[:6])}.")
    useful_codes = [c for c in e['codes'] if len(c) > 1 and c not in ('True','False','None') and not c.startswith('Q')]
    if useful_codes:
        h2_parts.append(f"The question mentions these code elements: {', '.join(useful_codes[:6])}. These are your building blocks.")
    if not h2_parts:
        if e['kw']:
            h2_parts.append(f"Key Python concepts to use: {', '.join(e['kw'][:6])}.")
        else:
            h2_parts.append("Identify the operation the question asks for and find the right Python function.")
    hints.append(' '.join(h2_parts))

    # ── H3: Step-by-step approach ──
    h3_parts = []
    if e['vars'] and ('print' in e['kw'] or 'type' in e['kw']):
        vnames = [v[0] for v in e['vars'][:3]]
        h3_parts.append(f"Step by step: 1) Create {', '.join(vnames)}.")
        if 'type' in e['kw']:
            h3_parts.append("2) Apply type() to each variable.")
            h3_parts.append("3) Print both the value and its type using print() or f-strings.")
        else:
            h3_parts.append("2) Apply the operation described. 3) Print the result.")
    elif 'function' in t or 'def ' in t:
        h3_parts.append("Step by step: 1) Define the function with proper parameters.")
        h3_parts.append("2) Write the logic inside the function body.")
        h3_parts.append("3) Return the result (don't just print inside the function).")
        h3_parts.append("4) Call the function with test values and print the result.")
    elif 'loop' in t or 'iterate' in t:
        h3_parts.append("Step by step: 1) Set up your data/collection.")
        h3_parts.append("2) Write the loop header (for item in collection:).")
        h3_parts.append("3) Inside the loop, perform the action on each item.")
        h3_parts.append("4) Print or collect the results.")
    elif 'try' in t or 'except' in t or 'catch' in t or 'error' in t:
        h3_parts.append("Step by step: 1) Write the code that might fail inside try:.")
        h3_parts.append("2) Add except with the specific error type.")
        h3_parts.append("3) Print a friendly message in the except block.")
    else:
        h3_parts.append("Break it down: 1) Set up the data. 2) Apply the operation. 3) Print the result clearly.")
    hints.append(' '.join(h3_parts))

    # ── H4: Common mistakes to avoid ──
    h4_parts = []
    if 'sort' in e['kw']:
        h4_parts.append("Common mistake: .sort() returns None — don't write x = my_list.sort(). Just call my_list.sort() then use my_list.")
    elif 'append' in e['kw']:
        h4_parts.append("Common mistake: .append() returns None — don't write x = my_list.append(val). Just call .append() then use the list.")
    elif 'type' in e['kw'] and 'print' in e['kw']:
        h4_parts.append("Common mistake: don't forget to print your results! type() alone doesn't display anything.")
    elif '==' in t or 'compare' in t or 'equal' in t:
        h4_parts.append("Remember: = is assignment, == is comparison. For None, use 'is None' not '== None'.")
    elif 'index' in t or 'slice' in t or '[' in t:
        h4_parts.append("Remember: Python indexing starts at 0. The last element is at index -1 or len(list)-1.")
    elif 'immutable' in t or 'mutable' in t:
        h4_parts.append("Immutable types (str, tuple, int) can't be changed in-place. You must create a new one.")
    elif 'string' in t and ('replace' in t or 'upper' in t or 'lower' in t):
        h4_parts.append("String methods return a NEW string — they don't change the original. Assign the result: s = s.upper().")
    elif 'class' in t or 'self' in t:
        h4_parts.append("Don't forget 'self' as the first parameter in every method. Access attributes with self.name.")
    elif 'return' in e['kw']:
        h4_parts.append("Common mistake: using print() inside a function when you should use return. print() displays, return sends the value back.")
    elif 'global' in t or 'scope' in t:
        h4_parts.append("Variables inside functions are local by default. To modify an outer variable, declare it with 'global'.")
    else:
        h4_parts.append("Double-check: are you printing the result? Does your output match exactly what the question asks for?")
    hints.append(' '.join(h4_parts))

    # ── H5: Final nudge (for complex questions) ──
    h5_parts = []
    if e['expected']:
        h5_parts.append(f"Your final output should include: {e['expected']}.")
    if 'explain' in t or 'why' in t:
        h5_parts.append("After the code works, add a comment explaining WHY Python behaves this way. Think about the underlying mechanics.")
    if 'demonstrate' in t or 'show' in t or 'prove' in t:
        h5_parts.append("Make your demonstration clear: show the before state, perform the action, show the after state.")
    if 'compare' in t or 'both' in t or 'difference' in t:
        h5_parts.append("Show both approaches side by side so the comparison is clear in the output.")
    if not h5_parts:
        h5_parts.append("Review your code: does it address every part of the question? Run it and verify the output matches expectations.")
    hints.append(' '.join(h5_parts))

    return hints


def process_day(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'(<div class="question")((?:\s+data-hint-\d+="[^"]*")*)(\s*>)(.*?)(</div>\s*\n\s*<div class="code-cell")'
    count = [0]

    def replacer(m):
        tag = m.group(1)
        old_hints = m.group(2)
        close = m.group(3)
        body = m.group(4)
        after = m.group(5)

        hints = gen_hints(body)
        attrs = ''
        for i, h in enumerate(hints, 1):
            attrs += f' data-hint-{i}="{htmlmod.escape(h, quote=True)}"'
        count[0] += 1
        return f'{tag}{attrs}{close}{body}{after}'

    new_content = re.sub(pattern, replacer, content, flags=re.DOTALL)
    if count[0]:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
    return count[0]


def main():
    total = 0
    for day in range(1, 31):
        fp = os.path.join(DAYS_DIR, f'day{day:02d}.html')
        if not os.path.exists(fp):
            print(f'[skip] day{day:02d}.html not found'); continue
        c = process_day(fp)
        total += c
        print(f'[done] day{day:02d}.html -- {c} questions')
    print(f'\nTotal: {total} questions with 5 hints each')

if __name__ == '__main__':
    main()
