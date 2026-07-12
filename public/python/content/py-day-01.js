// Python Day 01 — Data Types & Memory
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay01'] = {
  day: 1,
  title: "Data Types & Memory",
  emoji: "🔢",

  practiceQuestions: [
    {
      id: "p1",
      prompt: "<strong>Grouping Analyst:</strong> Given a list of <code>(name, department)</code> tuples, build a <code>dict</code> mapping department → list of names using <code>defaultdict(list)</code>. <em>Hint: iterate and append to <code>d[dept]</code>.</em>",
      starterCode: `from collections import defaultdict

employees = [
    ("Aarav", "Engineering"),
    ("Priya", "Marketing"),
    ("Rohit", "Engineering"),
    ("Sneha", "Finance"),
    ("Vikram", "Marketing"),
    ("Anjali", "Finance"),
]

# Build a defaultdict mapping department -> list of names
d = defaultdict(list)
# TODO: populate d

print(dict(d))
`
    },
    {
      id: "p2",
      prompt: "<strong>Memory Detective:</strong> Compare <code>sys.getsizeof()</code> for a <code>list</code> vs a <code>tuple</code> holding the same 5 integers. Explain in a comment why tuples are generally lighter.",
      starterCode: `import sys

data = [10, 20, 30, 40, 50]
as_list  = list(data)
as_tuple = tuple(data)

list_size  = sys.getsizeof(as_list)
tuple_size = sys.getsizeof(as_tuple)

print(f"list  size: {list_size} bytes")
print(f"tuple size: {tuple_size} bytes")
print(f"Difference: {list_size - tuple_size} bytes")

# Explain: why is tuple lighter?
# TODO: Add your comment here
`
    }
  ],

  testQuestions: [
    {
      id: 1,
      prompt: "Create a variable <code>sales = 1_000_000</code> using underscore separators. Store <code>type(sales).__name__</code> in <code>result_type</code> and the value in <code>result_value</code>.",
      starterCode: `# Q1: Integer literals with underscore separators
sales = 1_000_000
result_type  = type(sales).__name__
result_value = sales
print(f"Type: {result_type}, Value: {result_value:,}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result_type",  type: "string", value: "int" },
          { name: "result_value", type: "int",    value: 1000000 }
        ]
      }
    },
    {
      id: 2,
      prompt: "Compute <code>2 ** 200</code> and store the digit count via <code>len(str(...))</code> in <code>digit_count</code>. Python integers never overflow — prove it!",
      starterCode: `# Q2: Arbitrary precision integers
big_num    = 2 ** 200
digit_count = len(str(big_num))
print(f"2^200 has {digit_count} digits")
print(f"First 30 digits: {str(big_num)[:30]}...")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "digit_count", type: "int", value: 61 }
        ]
      }
    },
    {
      id: 3,
      prompt: "Demonstrate the float trap: check <code>0.1 + 0.2 == 0.3</code> (store in <code>is_equal</code>, expect <code>False</code>). Then fix with <code>math.isclose()</code> (store in <code>is_close_ok</code>, expect <code>True</code>).",
      starterCode: `# Q3: IEEE 754 floating-point trap
import math

is_equal   = (0.1 + 0.2 == 0.3)
is_close_ok = math.isclose(0.1 + 0.2, 0.3)

print(f"0.1 + 0.2 == 0.3  → {is_equal}")
print(f"0.1 + 0.2 ≈ 0.3   → {is_close_ok}")
print(f"Actual sum: {0.1 + 0.2}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "is_equal",    type: "bool", value: false },
          { name: "is_close_ok", type: "bool", value: true }
        ]
      }
    },
    {
      id: 4,
      prompt: "Test integer caching: <code>a = 100; b = 100</code>, check <code>a is b</code> → store in <code>small_int_is</code>. Then <code>a = 300; b = 300</code>, check again → store in <code>big_int_is</code>. CPython caches -5 to 256; above that, <code>is</code> is undefined behavior!",
      starterCode: `# Q4: CPython small-integer caching
a = 100
b = 100
small_int_is = (a is b)   # True — CPython caches this range

a = 300
b = 300
big_int_is = (a is b)     # May be True or False — implementation detail!

print(f"100 is 100  → {small_int_is}  (cached range -5..256)")
print(f"300 is 300  → {big_int_is}  (above cache range — undefined)")
# IMPORTANT: Never use 'is' for value equality on integers!
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "small_int_is", type: "bool", value: true }
        ]
      }
    },
    {
      id: 5,
      prompt: "NaN trap: store <code>math.nan != math.nan</code> in <code>nan_check</code> (expect <code>True</code>). Explain in a comment why this silently breaks naive <code>value == some_nan</code> deduplication logic.",
      starterCode: `# Q5: NaN semantics — float('nan') != float('nan')
import math

nan_val  = math.nan
nan_check = (nan_val != nan_val)   # NaN is never equal to itself!

# Safe NaN test:
is_nan = math.isnan(nan_val)

print(f"nan != nan  → {nan_check}   (always True!)")
print(f"math.isnan  → {is_nan}")
# WARNING: if you filter with 'val == float("nan")', it NEVER matches.
# Use math.isnan() or pandas isna() instead.
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "nan_check", type: "bool", value: true }
        ]
      }
    },
    {
      id: 6,
      prompt: "Reverse <code>\"DataAnalyst\"</code> using slicing; store the result in <code>result</code>.",
      starterCode: `# Q6: String slicing reversal
s = "DataAnalyst"
result = s[::-1]
print(f"Original : {s}")
print(f"Reversed : {result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "string", value: "tsylananataD" }
        ]
      }
    },
    {
      id: 7,
      prompt: "Check falsiness of <code>\"\"</code>, <code>0</code>, <code>[]</code>, <code>{}</code>, <code>None</code>, and <code>0.0</code> — store results as a list of booleans in <code>result</code> (all should be <code>False</code>).",
      starterCode: `# Q7: Python's falsy values
falsy_candidates = ["", 0, [], {}, None, 0.0]
result = [bool(v) for v in falsy_candidates]
print(f"bool results: {result}")
# All should be False — Python's falsy set
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", value: [false, false, false, false, false, false] }
        ]
      }
    },
    {
      id: 8,
      prompt: "Create a <code>frozenset({1,2,3})</code>, attempt <code>.add(4)</code>, catch the <code>AttributeError</code>, and store the exception's type name in <code>error_type</code>.",
      starterCode: `# Q8: frozenset immutability
fs = frozenset({1, 2, 3})
error_type = None
try:
    fs.add(4)
except AttributeError as e:
    error_type = type(e).__name__
    print(f"Caught {error_type}: {e}")

print(f"frozenset is still: {fs}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "error_type", type: "string", value: "AttributeError" }
        ]
      }
    },
    {
      id: 9,
      prompt: "Use <code>sys.getsizeof()</code> to compare memory: <code>int(0)</code>, <code>float(0.0)</code>, <code>bool(False)</code>. Store as a dict <code>result</code> mapping type name → byte size.",
      starterCode: `# Q9: Memory footprint comparison
import sys

result = {
    "int":   sys.getsizeof(int(0)),
    "float": sys.getsizeof(float(0.0)),
    "bool":  sys.getsizeof(bool(False)),
    "str":   sys.getsizeof(""),
}

for k, v in result.items():
    print(f"{k:8s}: {v} bytes")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["int", "float", "bool"] }
        ]
      }
    },
    {
      id: 10,
      prompt: "Find the intersection of <code>{1,2,3,4}</code> and <code>{3,4,5,6}</code> using the <code>&</code> operator; store in <code>result</code>.",
      starterCode: `# Q10: Set intersection
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
result = a & b
print(f"Intersection: {result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "set", value: [3, 4] }
        ]
      }
    },
    {
      id: 11,
      prompt: "Create a <code>namedtuple Employee(name, salary, dept)</code>, instantiate one record, and access fields by name. Store the salary in <code>result</code>.",
      starterCode: `# Q11: namedtuple — structured immutable data
from collections import namedtuple

Employee = namedtuple('Employee', ['name', 'salary', 'dept'])
emp = Employee(name="Priya Desai", salary=112800, dept="Data Science")

result = emp.salary   # Access by name, not index
print(f"Name  : {emp.name}")
print(f"Salary: {emp.salary:,}")
print(f"Dept  : {emp.dept}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 112800 }
        ]
      }
    },
    {
      id: 12,
      prompt: "Demonstrate string interning: <code>a = 'hello'; b = 'hello'</code>; check <code>a is b</code>, store in <code>result</code>. Explain in a comment why this should NEVER be relied on in application logic.",
      starterCode: `# Q12: String interning (CPython implementation detail)
a = 'hello'
b = 'hello'
result = (a is b)   # May be True due to interning, but NOT guaranteed!

# Two strings with the same value created dynamically may not be interned:
import random
x = 'hel' + 'lo'   # Constant folding — often interned
y = 'hel' + chr(108) + 'o'  # Runtime — less likely interned

print(f"'hello' is 'hello': {result}")
print(f"Dynamic x is y    : {x is y}  (may differ)")
# LESSON: Always use == for value equality. 'is' checks identity, not value.
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "truthy" }  // True in CPython for compile-time literals
        ]
      }
    },
    {
      id: 13,
      prompt: "Prove <code>bool</code> is a subclass of <code>int</code>: check <code>isinstance(True, int)</code> (store in <code>is_subclass</code>) and compute <code>True + True + False</code> (store in <code>sum_result</code>, expect <code>2</code>).",
      starterCode: `# Q13: bool is a subclass of int
is_subclass = isinstance(True, int)
sum_result  = True + True + False

print(f"isinstance(True, int) → {is_subclass}")
print(f"True + True + False   → {sum_result}")
print(f"True  == 1: {True == 1}")
print(f"False == 0: {False == 0}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "is_subclass", type: "bool",  value: true },
          { name: "sum_result",  type: "int",   value: 2 }
        ]
      }
    },
    {
      id: 14,
      prompt: "Conversion pipeline: <code>\"3.14\"</code> → <code>float</code> → <code>int</code> → <code>complex</code>. Store each intermediate in <code>step1</code>, <code>step2</code>, <code>step3</code>.",
      starterCode: `# Q14: Type coercion pipeline
raw = "3.14"
step1 = float(raw)          # str → float: 3.14
step2 = int(step1)           # float → int: 3  (truncates, doesn't round!)
step3 = complex(step2)       # int → complex: (3+0j)

print(f"str    : '{raw}'  → {type(raw).__name__}")
print(f"float  : {step1}  → {type(step1).__name__}")
print(f"int    : {step2}    → {type(step2).__name__}  (truncated!)")
print(f"complex: {step3} → {type(step3).__name__}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "step1", type: "float", value: 3.14, tolerance: 0.001 },
          { name: "step2", type: "int",   value: 3 }
        ]
      }
    },
    {
      id: 15,
      prompt: "Build a <code>defaultdict(list)</code> grouping a list of names by first letter. Store the resulting dict in <code>result</code>.",
      starterCode: `# Q15: defaultdict grouping pattern
from collections import defaultdict

names = ["Alice", "Bob", "Anna", "Charlie", "Brian", "Carol", "Diana"]
result = defaultdict(list)

for name in names:
    result[name[0]].append(name)

# Convert to regular dict for display
result = dict(result)
for letter, group in sorted(result.items()):
    print(f"{letter}: {group}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["A", "B", "C", "D"] }
        ]
      }
    },
    {
      id: 16,
      prompt: "Demonstrate the mutable-default-argument trap: define <code>def add(item, lst=[])</code>, call it twice with different items. Store both return values in <code>call1</code>, <code>call2</code> — showing accumulation, not two fresh lists!",
      starterCode: `# Q16: Mutable default argument trap
def add(item, lst=[]):
    lst.append(item)
    return lst

call1 = add("first")    # Returns ["first"]
call2 = add("second")   # Returns ["first", "second"] — NOT ["second"]!

print(f"call1: {call1}")
print(f"call2: {call2}")
print("Both calls share the same default list!")

# FIX: use None as default
def add_safe(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "call2", type: "list", length: 2 }
        ]
      }
    },
    {
      id: 17,
      prompt: "Compare <code>dict.get(\"key\", \"default\")</code> vs <code>dict[\"key\"]</code> on a missing key. Store the <code>.get()</code> result in <code>safe_result</code> and the exception type name in <code>error_type</code>.",
      starterCode: `# Q17: Safe dict access patterns
data = {"name": "Aarav", "dept": "Engineering"}

safe_result = data.get("salary", "Not Available")

error_type = None
try:
    _ = data["salary"]
except KeyError as e:
    error_type = type(e).__name__

print(f"get() result : '{safe_result}'")
print(f"KeyError type: {error_type}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "safe_result", type: "string", value: "Not Available" },
          { name: "error_type",  type: "string", value: "KeyError" }
        ]
      }
    },
    {
      id: 18,
      prompt: "Tuple unpacking with <code>*</code>: <code>a, *b, c = (1,2,3,4,5)</code>. Store <code>a</code>, <code>b</code>, <code>c</code> separately.",
      starterCode: `# Q18: Extended unpacking with *
a, *b, c = (1, 2, 3, 4, 5)

print(f"a = {a}        (first element)")
print(f"b = {b}  (middle elements — always a list)")
print(f"c = {c}        (last element)")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "a", type: "int",  value: 1 },
          { name: "b", type: "list", value: [2, 3, 4] },
          { name: "c", type: "int",  value: 5 }
        ]
      }
    },
    {
      id: 19,
      prompt: "Shallow copy trap: <code>a=[[1,2],[3,4]]; b=a.copy(); b[0][0]=99</code>. Store <code>a</code> after mutation in <code>result</code> (trap: <code>a</code> is affected!). Fix with <code>copy.deepcopy</code>, store in <code>result_fixed</code>.",
      starterCode: `# Q19: Shallow vs deep copy
import copy

a = [[1, 2], [3, 4]]
b = a.copy()      # Shallow copy — nested lists are shared!
b[0][0] = 99

result = a        # a is mutated too!

# Fix with deepcopy
a2 = [[1, 2], [3, 4]]
b2 = copy.deepcopy(a2)
b2[0][0] = 99
result_fixed = a2   # a2 is NOT affected

print(f"After shallow copy mutation: a = {result}")
print(f"After deep copy mutation  : a2= {result_fixed}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result",       type: "list", value: [[99,2],[3,4]] },
          { name: "result_fixed", type: "list", value: [[1,2],[3,4]] }
        ]
      }
    },
    {
      id: 20,
      prompt: "Use <code>Counter(\"mississippi\")</code> and store the 3 most common characters (with counts) in <code>result</code> using <code>.most_common(3)</code>.",
      starterCode: `# Q20: Counter for frequency analysis
from collections import Counter

c = Counter("mississippi")
result = c.most_common(3)   # List of (char, count) tuples

print(f"Full count  : {dict(c)}")
print(f"Top 3 chars : {result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", length: 3 }
        ]
      }
    },
    {
      id: 21,
      prompt: "Categorical data with <code>Enum</code>: define <code>class Status(Enum)</code> with <code>ACTIVE=1, INACTIVE=2, PENDING=3</code>. Store <code>Status.ACTIVE.value</code> in <code>result</code>. Add a comment explaining why Enum beats raw strings for categorical columns.",
      starterCode: `# Q21: Enum for categorical data
from enum import Enum

class Status(Enum):
    ACTIVE   = 1
    INACTIVE = 2
    PENDING  = 3

result = Status.ACTIVE.value

# Demonstrate enum advantages:
print(f"Status.ACTIVE       : {Status.ACTIVE}")
print(f"Status.ACTIVE.value : {Status.ACTIVE.value}")
print(f"Status.ACTIVE.name  : {Status.ACTIVE.name}")
print(f"Type-safe compare   : {Status.ACTIVE == Status.INACTIVE}")

# WHY use Enum over raw strings like "active"?
# 1. IDE autocomplete — no typos like "activee" slip through silently
# 2. Type-safe comparisons — Status.ACTIVE != "active" prevents confusion
# 3. Iterable membership — list(Status) gives all valid states
# 4. Serializable — .value gives the int for database storage
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 1 }
        ]
      }
    },
    {
      id: 22,
      prompt: "Build a <code>dict</code> from two parallel lists using <code>dict(zip([\"a\",\"b\",\"c\"], [1,2,3]))</code>; store in <code>result</code>.",
      starterCode: `# Q22: dict from parallel lists via zip
keys   = ["revenue", "cost", "profit"]
values = [950000, 620000, 330000]

result = dict(zip(keys, values))

for k, v in result.items():
    print(f"{k:10s}: {v:>10,}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["revenue", "cost", "profit"] }
        ]
      }
    },
    {
      id: 23,
      prompt: "Use <code>float('inf')</code> as a seed to find the minimum of a list WITHOUT using <code>min()</code>; store in <code>result</code>.",
      starterCode: `# Q23: float('inf') as sentinel for minimum search
data = [42, 17, 83, 5, 61, 29, 94, 11]

current_min = float('inf')   # Start above every possible value
for val in data:
    if val < current_min:
        current_min = val

result = current_min

print(f"Data    : {data}")
print(f"Minimum : {result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 5 }
        ]
      }
    },
    {
      id: 24,
      prompt: "Type-based dispatch: build <code>dispatch = {int: lambda x: x*2, str: lambda x: x.upper()}</code> and call <code>dispatch[type(5)](5)</code>. Store result in <code>result</code>.",
      starterCode: `# Q24: Dict as type-dispatch table (replaces if/elif chains)
dispatch = {
    int:   lambda x: x * 2,
    str:   lambda x: x.upper(),
    list:  lambda x: sorted(x),
    float: lambda x: round(x, 2),
}

result = dispatch[type(5)](5)      # Calls int handler → 10
str_r  = dispatch[type("hi")]("hi")  # Calls str handler → "HI"

print(f"dispatch(5)    → {result}")
print(f"dispatch('hi') → {str_r}")
print("Dict-based dispatch = idiomatic Python pattern!")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 10 }
        ]
      }
    },
    {
      id: 25,
      prompt: "Time comparison: measure lookup time of <code>x in a_list</code> vs <code>x in a_set</code> (1000 elements each). Store durations in <code>list_time</code>, <code>set_time</code>, and a boolean <code>set_faster</code> (expect <code>True</code>).",
      starterCode: `# Q25: O(n) list lookup vs O(1) set lookup — empirical proof
import time

N = 10000
data = list(range(N))
a_list = data
a_set  = set(data)
target = N - 1   # Worst case: search for last element

# Measure list lookup (O(n))
start = time.perf_counter()
for _ in range(1000):
    _ = target in a_list
list_time = time.perf_counter() - start

# Measure set lookup (O(1))
start = time.perf_counter()
for _ in range(1000):
    _ = target in a_set
set_time = time.perf_counter() - start

set_faster = set_time < list_time

print(f"list lookup : {list_time*1000:.3f} ms")
print(f"set  lookup : {set_time*1000:.3f} ms")
print(f"set_faster  : {set_faster}")
print(f"Speedup     : {list_time/max(set_time,1e-9):.1f}x")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "set_faster", type: "bool", value: true }
        ]
      }
    }
  ],

  slides: [
    {
      title: "01. Numeric Types: int · float · complex",
      duration: "8:30",
      html: `
<h2>🔢 01. Numeric Types: <code>int</code>, <code>float</code>, <code>complex</code></h2>

<div class="slide-section">
  <div class="rdbms-infographic">
    <div class="info-title">
      <svg class="db-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.02 2 6.5v11c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 18c-4.41 0-8-1.57-8-3.5v-2.28c1.9.89 4.77 1.48 8 1.48s6.1-.59 8-1.48v2.28c0 1.93-3.59 3.5-8 3.5zm0-5c-4.41 0-8-1.57-8-3.5V9.72c1.9.89 4.77 1.48 8 1.48s6.1-.59 8-1.48V11.5c0 1.93-3.59 3.5-8 3.5zm0-5c-4.41 0-8-1.57-8-3.5s3.59-3.5 8-3.5 8 1.57 8 3.5-3.59 3.5-8 3.5z"/></svg>
      <span>PYTHON DATA ANALYSIS LANDSCAPE</span>
    </div>
    <div style="text-align: center; margin: 15px 0;">
      <img src="/python/python_analyst_illustration.png" alt="Python Analyst" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border);" />
    </div>
  </div>
</div>

<div class="slide-section">
  <h3 style="color:#93c5fd;margin-bottom:14px;">📋 Strategic Data Type Matrix</h3>
  <table class="db-table-mock">
    <thead><tr><th>#</th><th>Type</th><th>Immutable?</th><th>Memory</th><th>Analyst Use Case</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><code>int</code></td><td>✅ Yes</td><td>Variable</td><td>Primary keys, row counts, categorical encoding</td></tr>
      <tr><td>2</td><td><code>float</code></td><td>✅ Yes</td><td>24 bytes</td><td>Revenue, prices, probabilities, geospatial coords</td></tr>
      <tr><td>3</td><td><code>complex</code></td><td>✅ Yes</td><td>32 bytes</td><td>Signal processing, FFT, geospatial vectors</td></tr>
      <tr><td>4</td><td><code>str</code></td><td>✅ Yes</td><td>Variable</td><td>Text mining, log parsing, categorical labels</td></tr>
      <tr><td>5</td><td><code>bool</code></td><td>✅ Yes</td><td>28 bytes</td><td>Binary masks, conditional filtering</td></tr>
      <tr><td>6</td><td><code>NoneType</code></td><td>✅ Yes</td><td>16 bytes</td><td>Null/missing value representation</td></tr>
      <tr><td>7</td><td><code>list</code></td><td>❌ No</td><td>Dynamic</td><td>Ordered queues, time-series buffers</td></tr>
      <tr><td>8</td><td><code>tuple</code></td><td>✅ Yes</td><td>Fixed</td><td>Immutable records, compound dict keys</td></tr>
      <tr><td>9</td><td><code>set</code></td><td>❌ No</td><td>Dynamic</td><td>O(1) dedup, cohort intersection/union</td></tr>
      <tr><td>10</td><td><code>dict</code></td><td>❌ No</td><td>Dynamic</td><td>O(1) key-value lookups, JSON payload structuring</td></tr>
    </tbody>
  </table>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>① <code>int</code> — Arbitrary Precision Integers</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p>Python integers have <strong>no fixed width</strong> — unlike C's 32-bit or 64-bit int, a Python <code>int</code> can grow to billions of digits, limited only by available memory.</p>

  <pre class="nb-code-block"><code>transaction_count = 1_842_000   # underscore = readability
big_num = 2 ** 200              # 61-digit number — no overflow!
print(type(transaction_count))  # &lt;class 'int'&gt;</code></pre>

  <p class="sub-why">💼 Why Data Analysts Care</p>
  <ul>
    <li><strong>Primary Keys</strong>: Customer ID, Order ID, Transaction ID → always integers for O(1) index lookups.</li>
    <li><strong>Row Counts</strong>: <code>len(df)</code> returns int; using it as a float introduces needless overhead.</li>
    <li><strong>Categorical Encoding</strong>: Converting <code>"Low/Medium/High"</code> → <code>0/1/2</code> is a standard ML preprocessing step.</li>
  </ul>

  <p class="sub-pitfall">⚠️ Common Pitfall: Division Always Returns Float</p>
  <div class="warn-box"><strong>Danger:</strong> <code>10 / 2</code> returns <code>5.0</code>, not <code>5</code>. Use floor division <code>//</code> to keep the result an integer.</div>
  <pre class="nb-code-block"><code>print(10 / 2)    # 5.0   ← always float
print(10 // 2)   # 5     ← floor division, returns int
print(-7 // 2)   # -4    ← rounds toward negative infinity!</code></pre>

  <p class="sub-memory">🧠 CPython Integer Caching (Critical Gotcha!)</p>
  <div class="callout-box">
    <strong>⚡ CPython caches integers from -5 to 256.</strong> In this range, <code>a is b</code> returns <code>True</code> even without explicit assignment.
    Above 256, behavior is <strong>undefined</strong> — it depends on the interpreter version and context.
    <strong>Never use <code>is</code> for integer equality.</strong> Always use <code>==</code>.
  </div>

  <table class="db-table-mock" style="margin-top:10px;">
    <thead><tr><th>NumPy Type</th><th>Memory</th><th>Range</th><th>When to Use</th></tr></thead>
    <tbody>
      <tr><td><code>int8</code></td><td>1 byte</td><td>-128 to 127</td><td>Small categorical flags</td></tr>
      <tr><td><code>int16</code></td><td>2 bytes</td><td>-32K to 32K</td><td>Small integer features</td></tr>
      <tr><td><code>int32</code></td><td>4 bytes</td><td>~±2 billion</td><td>Most analytical workloads</td></tr>
      <tr><td><code>int64</code></td><td>8 bytes</td><td>~±9 quintillion</td><td>Timestamps, large IDs</td></tr>
    </tbody>
  </table>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>② <code>float</code> — 64-bit IEEE 754 Double</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p>Python floats use the <strong>IEEE 754 double-precision</strong> standard: 64 bits, approximately 15-17 significant decimal digits of precision.</p>

  <pre class="nb-code-block"><code>pi = 3.1415926535
scientific = 2.5e3    # 2500.0
inf_val    = float('inf')
nan_val    = float('nan')</code></pre>

  <p class="sub-why">💼 Why Data Analysts Care</p>
  <ul>
    <li><strong>Financial Metrics</strong>: Revenue, prices, transaction amounts.</li>
    <li><strong>Statistical Measures</strong>: Mean, std dev, Z-scores all evaluate to floats.</li>
    <li><strong>NaN in Datasets</strong>: <code>float('nan')</code> is the universal missing-value sentinel in pandas.</li>
  </ul>

  <p class="sub-pitfall">⚠️ The Floating-Point Trap</p>
  <pre class="nb-code-block"><code>print(0.1 + 0.2)          # 0.30000000000000004  (not 0.3!)
print(0.1 + 0.2 == 0.3)   # False  ← silent bug in deduplication/filtering!</code></pre>
  <div class="warn-box"><strong>Fix:</strong> Use <code>math.isclose(a, b)</code> for comparison. For strict financial accounting, use <code>decimal.Decimal</code>.</div>

  <p class="sub-pitfall">⚠️ NaN Semantics — The Silent Dataset Destroyer</p>
  <div class="warn-box">
    <strong><code>float('nan') != float('nan')</code> is always <code>True</code>.</strong>
    NaN is never equal to anything, including itself. Filtering with <code>val == float('nan')</code> will silently match zero rows.
    Always use <code>math.isnan(val)</code> or <code>pandas.isna(val)</code> instead.
  </div>

  <p class="sub-memory">🧠 Special Float Values</p>
  <table class="db-table-mock">
    <thead><tr><th>Value</th><th>Created by</th><th>Analyst Use</th></tr></thead>
    <tbody>
      <tr><td><code>nan</code></td><td><code>float('nan')</code> or <code>math.nan</code></td><td>Missing value sentinel in pandas</td></tr>
      <tr><td><code>inf</code></td><td><code>float('inf')</code></td><td>Seed for minimum-search loops</td></tr>
      <tr><td><code>-inf</code></td><td><code>float('-inf')</code></td><td>Seed for maximum-search loops</td></tr>
    </tbody>
  </table>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>③ <code>complex</code> — 2D Plane Numbers</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p>A complex number has a <strong>real part</strong> and an <strong>imaginary part</strong>. Python uses <code>j</code> suffix (not <code>i</code>) for the imaginary unit.</p>

  <pre class="nb-code-block"><code>z = 3 + 4j
print(z.real)   # 3.0
print(z.imag)   # 4.0
print(abs(z))   # 5.0  ← magnitude: sqrt(3²+4²)</code></pre>

  <p class="sub-pitfall">⚠️ No Ordering</p>
  <div class="warn-box">Complex numbers live on a 2D plane. You <strong>cannot</strong> use <code>&gt;</code>, <code>&lt;</code>, <code>&lt;=</code>, <code>&gt;=</code> — they raise <code>TypeError</code>. Only equality comparison (<code>==</code>) works.</div>

  <div class="pro-tip-box"><strong>📐 Practical Use:</strong> Signal processing, Fast Fourier Transforms (FFT), electrical impedance modelling. In NumPy: <code>np.fft.fft(signal)</code> returns an array of complex numbers.</div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does 0.1 + 0.2 != 0.3 in Python, and how do you handle it in production?</strong></p>
      <p><em>A: Python floats are represented as base-2 fractions. Some decimal values like 0.1 have infinite repeating binary representations, leading to minor round-off errors. In production, always compare floats using <code>math.isclose(a, b)</code>, or use <code>decimal.Decimal</code> for financial operations.</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is small integer interning in CPython?</strong></p>
      <p><em>A: CPython pre-allocates integer objects from -5 to 256. When you assign variables to values in this range, they reference the same object in memory, so <code>is</code> checks pass. Outside this range, they are fresh objects. Never use <code>is</code> for numerical equality.</em></p>
    </div>
  </div>
</div>
`
    },
    {
      title: "02. Text, Boolean & NoneType",
      duration: "7:45",
      html: `
<h2>📝 02. Text, Boolean &amp; NoneType: <code>str</code>, <code>bool</code>, <code>None</code></h2>

<div class="slide-section">
  <div class="type-heading"><h3>④ <code>str</code> — Immutable Unicode Sequences</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p>A string is an ordered, <strong>immutable</strong> sequence of Unicode characters. Defined with single, double, or triple quotes.</p>

  <pre class="nb-code-block"><code>greeting = "Hello, World!"
multi    = """Line 1
Line 2"""
f_str    = f"Revenue: {950_000:,} INR"   # f-string with format spec</code></pre>

  <p class="sub-why">💼 Why Data Analysts Care</p>
  <ul>
    <li><strong>Categorical Features</strong>: Region, Product Tier, Status labels.</li>
    <li><strong>Log Parsing</strong>: Extracting timestamps, IPs, error codes from raw server logs.</li>
    <li><strong>Dynamic Reporting</strong>: F-strings embed variables and format specs for dashboard strings.</li>
  </ul>

  <p class="sub-pitfall">⚠️ Immutability — Strings Can't Be Modified In-Place</p>
  <pre class="nb-code-block"><code>s = "cat"
# s[0] = "b"    ← TypeError: 'str' object does not support item assignment
s = "b" + s[1:]  # Correct: create a new string</code></pre>

  <p class="sub-memory">🧠 String Interning (CPython Detail)</p>
  <div class="callout-box">
    CPython <em>interns</em> short strings that look like identifiers (e.g. <code>'hello'</code>). Two such literals may share the same memory object, making <code>a is b</code> return <code>True</code>.
    <br><br>
    <strong>Never rely on this.</strong> Dynamically created strings (concatenation, input) are usually NOT interned. Always use <code>==</code> for value equality.
  </div>

  <p class="sub-memory">🧠 Method Chaining Cost</p>
  <div class="warn-box"><code>data.strip().lower().replace('x','y')</code> is readable but creates <em>3 temporary string objects</em>. On millions of rows this becomes a memory hotspot — prefer pandas <code>.str</code> accessor for bulk operations.</div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑤ <code>bool</code> — Binary Logic &amp; Subclass of int</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p><code>bool</code> is literally a <strong>subclass of <code>int</code></strong>. <code>True == 1</code> and <code>False == 0</code>, which means booleans can be summed directly.</p>

  <pre class="nb-code-block"><code>print(True + True + False)   # 2  (int arithmetic!)
print(sum([True, False, True, True]))  # 3
# Useful for: count_active = sum(status == "active" for status in statuses)</code></pre>

  <h3 class="sub-why">💼 Truthy / Falsy Reference</h3>
  <table class="db-table-mock">
    <thead><tr><th>Value</th><th>bool(value)</th><th>Rule</th></tr></thead>
    <tbody>
      <tr><td><code>0</code>, <code>0.0</code>, <code>0j</code></td><td><code>False</code></td><td>Zero</td></tr>
      <tr><td><code>""</code>, <code>[]</code>, <code>{}</code>, <code>set()</code>, <code>()</code></td><td><code>False</code></td><td>Empty container</td></tr>
      <tr><td><code>None</code></td><td><code>False</code></td><td>Null singleton</td></tr>
      <tr><td>Any non-zero number</td><td><code>True</code></td><td>Non-zero</td></tr>
      <tr><td>Any non-empty container</td><td><code>True</code></td><td>Non-empty</td></tr>
    </tbody>
  </table>

  <p class="sub-pitfall">⚠️ Short-Circuit Evaluation</p>
  <pre class="nb-code-block"><code>x = None
# safe: 'and' short-circuits — second expr only runs if first is True
result = x is not None and x.upper()   # Returns False, not AttributeError

# 'or' returns first truthy value:
name = user_input or "Anonymous"       # Default value pattern</code></pre>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑥ <code>NoneType</code> — The Null Singleton</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p><code>None</code> is Python's null value. There is <strong>exactly one</strong> <code>None</code> object in any interpreter session — it's a singleton.</p>

  <pre class="nb-code-block"><code>a = None
b = None
print(a is b)    # True — same object in memory
print(id(a) == id(b))   # True</code></pre>

  <div class="pro-tip-box"><strong>✅ Best Practice:</strong> Always check for None with <code>is None</code>, never <code>== None</code>. A custom class can override <code>__eq__</code> to return <code>True</code> when compared with anything — making <code>== None</code> dangerously unreliable.</div>

  <p class="sub-pitfall">⚠️ The Mutable Default Argument Trap</p>
  <div class="warn-box">
    <strong>Never use a mutable object as a default argument.</strong> The default is evaluated <em>once</em> at function definition time, not per call.
    <pre class="nb-code-block"><code>def add(item, lst=[]):    # ← shared list across ALL calls!
    lst.append(item); return lst

add("a")  # ["a"]
add("b")  # ["a", "b"]  ← not ["b"]!

# FIX:
def add_safe(item, lst=None):
    if lst is None: lst = []
    lst.append(item); return lst</code></pre>
  </div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>📌 Enum — Categorical Data Done Right</h3><span class="type-chip">Standard Library</span></div>

  <p><code>Enum</code> represents a <strong>fixed set of named constants</strong>. For data analysts, it's the safest way to encode categorical columns where values are one of a predefined set.</p>

  <pre class="nb-code-block"><code>from enum import Enum

class Status(Enum):
    ACTIVE   = 1
    INACTIVE = 2
    PENDING  = 3

# Safe comparisons:
s = Status.ACTIVE
print(s.name)   # "ACTIVE"
print(s.value)  # 1
print(list(Status))  # All valid states</code></pre>

  <div class="pro-tip-box">
    <strong>Why Enum beats raw strings for categorical data:</strong><br>
    1. <strong>No typos</strong> — <code>Status.ACTIV</code> raises AttributeError immediately vs <code>"activ"</code> silently passing through.<br>
    2. <strong>IDE autocomplete</strong> — all valid values are discoverable.<br>
    3. <strong>Serializable</strong> — <code>.value</code> gives the int for database storage.<br>
    4. <strong>Iterable</strong> — <code>list(Status)</code> gives all valid states for validation loops.
  </div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the difference between is and == in Python?</strong></p>
      <p><em>A: <code>==</code> checks for value equality (whether the values of two objects are equal). <code>is</code> checks for identity (whether both variables point to the exact same object in memory). Always use <code>==</code> for comparing values (numbers, strings, lists) and <code>is</code> for singletons like <code>None</code>.</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is mutable default argument list (def append_to(val, list=[])) considered dangerous?</strong></p>
      <p><em>A: Default arguments are evaluated once at function definition time. A mutable default object like a list is shared across all function invocations that don't pass an explicit list argument. The correct pattern is to use <code>list=None</code> and instantiate a fresh list inside the function.</em></p>
    </div>
  </div>
</div>
`
    },
    {
      title: "03. Collections: list · tuple · set · dict",
      duration: "9:00",
      html: `
<h2>📦 03. Collections: <code>list</code>, <code>tuple</code>, <code>set</code>, <code>dict</code></h2>

<div class="slide-section">
  <div class="vs-block">
    <div class="vs-card vs-card--pk">
      <h4>📋 List vs Tuple comparison</h4>
      <ul style="margin: 4px 0; padding-left: 16px; font-size: 0.78rem;">
        <li><strong>List:</strong> Mutable sequence; backed by dynamic arrays; O(1) random access, amortized append.</li>
        <li><strong>Tuple:</strong> Immutable sequence; fixed size; lower memory, hashable (safe for dict keys).</li>
      </ul>
    </div>
  </div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑦ <code>list</code> — Dynamic Mutable Sequences</h3><span class="type-chip type-chip--mutable">Mutable</span></div>

  <p>Lists are ordered, mutable, and allow duplicate elements. They're backed by a dynamic array — amortized O(1) append, but O(n) insertion at arbitrary positions.</p>

  <pre class="nb-code-block"><code>records = [87500, 63200, 112800, 74900]
records.append(96300)   # O(1) — amortized constant time
records.insert(0, 0)    # O(n) — shifts all elements right</code></pre>

  <h3 class="sub-memory">🧠 Big-O Complexity Reference</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operation</th><th>Time</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><code>lst.append(x)</code></td><td><span class="complexity-badge complexity-badge--o1">O(1)</span></td><td>Amortized — occasional resize is O(n) but rare</td></tr>
      <tr><td><code>lst.pop()</code></td><td><span class="complexity-badge complexity-badge--o1">O(1)</span></td><td>Remove from end</td></tr>
      <tr><td><code>lst.insert(i, x)</code></td><td><span class="complexity-badge complexity-badge--on">O(n)</span></td><td>Shifts elements right — avoid on large lists</td></tr>
      <tr><td><code>x in lst</code></td><td><span class="complexity-badge complexity-badge--on">O(n)</span></td><td>Linear scan — use <code>set</code> for repeated lookups</td></tr>
      <tr><td><code>lst[i]</code></td><td><span class="complexity-badge complexity-badge--o1">O(1)</span></td><td>Random access by index</td></tr>
    </tbody>
  </table>

  <p class="sub-pitfall">⚠️ The Shallow Copy Trap</p>
  <div class="warn-box">
    <code>list.copy()</code> creates a <strong>shallow</strong> copy — nested mutable objects (like sub-lists) are <em>shared</em>, not duplicated.
    <pre class="nb-code-block"><code>a = [[1, 2], [3, 4]]
b = a.copy()    # Shallow!
b[0][0] = 99
print(a)        # [[99, 2], [3, 4]]  ← a is mutated too!

# Fix:
import copy
b = copy.deepcopy(a)    # Independent copy</code></pre>
  </div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑧ <code>tuple</code> — Immutable Records</h3><span class="type-chip type-chip--immutable">Immutable</span></div>

  <p>Tuples are like lists but <strong>immutable</strong>. They're faster to create, use less memory, and can be used as dictionary keys or set members (because they're hashable).</p>

  <pre class="nb-code-block"><code>point = (34.05, -118.24)   # (lat, lon) — immutable coordinate
row   = ("Aarav", "Engineering", 87500)   # A database record

# Named access via namedtuple:
from collections import namedtuple
Employee = namedtuple('Employee', ['name', 'dept', 'salary'])
emp = Employee("Aarav", "Engineering", 87500)
print(emp.salary)   # 87500 — by name, not index</code></pre>

  <div class="pro-tip-box">
    <strong>When to choose tuple over list:</strong><br>
    • Fixed-schema records (name, salary, dept) — namedtuple makes this explicit<br>
    • Dict keys: <code>{(lat, lon): city_name}</code> — lists can't be dict keys<br>
    • Return values from functions: <code>return min_val, max_val</code><br>
    • Configuration constants that must not change
  </div>

  <p class="sub-pitfall">⚠️ Hashability Rule</p>
  <div class="callout-box">
    Only <strong>immutable, hashable</strong> objects can be dict keys or set members.<br>
    A <strong>tuple is hashable only if all its elements are hashable</strong>.<br>
    <code>(1, 2, 3)</code> → hashable ✅<br>
    <code>(1, [2, 3])</code> → NOT hashable ❌ (contains a mutable list)<br>
    <pre class="nb-code-block"><code>d = {(1, 2): "point A"}   # ✅ tuple key works
# d = {[1, 2]: "point A"} # ❌ TypeError: unhashable type: 'list'</code></pre>
  </div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑨ <code>set</code> — O(1) Unique Collections</h3><span class="type-chip type-chip--mutable">Mutable</span></div>

  <p>Sets store <strong>unique, unordered</strong> elements in a hash table. Membership test is O(1) — far faster than a list for repeated lookups.</p>

  <pre class="nb-code-block"><code>customers_A = {"Alice", "Bob", "Charlie", "Diana"}
customers_B = {"Charlie", "Diana", "Eve", "Frank"}

both     = customers_A & customers_B   # Intersection
either   = customers_A | customers_B   # Union
only_A   = customers_A - customers_B   # Difference
exclusive = customers_A ^ customers_B  # Symmetric difference</code></pre>

  <h3 class="sub-memory">🧠 Set Operations Diagram</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Method</th><th>Meaning</th><th>Result</th></tr></thead>
    <tbody>
      <tr><td><code>A & B</code></td><td><code>.intersection(B)</code></td><td>In both A and B</td><td><code>{"Charlie","Diana"}</code></td></tr>
      <tr><td><code>A | B</code></td><td><code>.union(B)</code></td><td>In A or B or both</td><td>6 elements</td></tr>
      <tr><td><code>A - B</code></td><td><code>.difference(B)</code></td><td>In A but not B</td><td><code>{"Alice","Bob"}</code></td></tr>
      <tr><td><code>A ^ B</code></td><td><code>.symmetric_difference(B)</code></td><td>In exactly one of A, B</td><td>4 elements</td></tr>
    </tbody>
  </table>

  <p class="sub-pitfall">⚠️ Unhashable Elements</p>
  <div class="warn-box"><code>{[1,2]: "x"}</code> raises <code>TypeError: unhashable type: 'list'</code>. Lists and dicts cannot be set members or dict keys. Use <code>tuple</code> instead: <code>{(1,2): "x"}</code> ✅</div>
</div>

<div class="slide-section">
  <div class="type-heading"><h3>⑩ <code>dict</code> — O(1) Key-Value Store</h3><span class="type-chip type-chip--mutable">Mutable</span></div>

  <p>Dictionaries are Python's <strong>hash table</strong>: O(1) average lookup, insertion, and deletion. Since Python 3.7, insertion order is guaranteed.</p>

  <pre class="nb-code-block"><code>metrics = {"revenue": 950_000, "cost": 620_000, "profit": 330_000}

# Safe access:
cac = metrics.get("CAC", 0)    # Returns 0 if key missing

# defaultdict — no KeyError on first access:
from collections import defaultdict
by_dept = defaultdict(list)
by_dept["Engineering"].append("Aarav")   # No need to pre-initialize

# Counter — frequency mapping:
from collections import Counter
words = ["the", "cat", "the", "mat", "the"]
freq  = Counter(words)
print(freq.most_common(2))    # [("the", 3), ("cat", 1)]</code></pre>

  <h3 class="sub-memory">🧠 Dict Comprehension</h3>
  <pre class="nb-code-block"><code># Build a dict from two parallel arrays (common analyst pattern):
cols   = ["name", "salary", "dept"]
vals   = ["Priya", 112800, "Data Science"]
record = {k: v for k, v in zip(cols, vals)}
# → {'name':'Priya', 'salary':112800, 'dept':'Data Science'}</code></pre>

  <div class="info-box">
    <strong>📌 Hashability Rule (consolidated):</strong><br>
    Only <strong>immutable and hashable</strong> objects can be dict keys or set members.<br>
    Immutability of the <em>container type</em> alone isn't enough —
    a <code>tuple</code> containing a <code>list</code> is still <strong>unhashable</strong>
    because its contents can be mutated. Test with <code>hash(obj)</code> — if it raises <code>TypeError</code>, it can't be a key.
  </div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is hashability and why does it matter for dict keys?</strong></p>
      <p><em>A: Dict keys and set members must be hashable. An object is hashable if it has a hash value that never changes during its lifetime (requires immutability). Lists, dicts, and sets are mutable and therefore unhashable. A tuple is hashable only if all its elements are also hashable.</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Explain the difference in Big-O lookup time between a Python List and Set.</strong></p>
      <p><em>A: Searching for an item in a list (<code>item in list</code>) takes O(n) linear time because Python scans each element. Searching in a set (<code>item in set</code>) uses a hash table, taking O(1) constant time on average. Sets are significantly faster at scale.</em></p>
    </div>
  </div>
</div>
`
    }
  ]

};
