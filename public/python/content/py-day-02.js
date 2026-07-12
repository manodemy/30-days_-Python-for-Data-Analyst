// Python Day 02 — Operators & Expressions
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay02'] = {
  day: 2,
  title: "Operators & Expressions",
  emoji: "➕",

  practiceQuestions: [
    {
      id: "p1",
      prompt: "<strong>Discount Calculator:</strong> Write a ternary expression that returns <code>\"VIP\"</code> if <code>spend &gt; 1000</code> else <code>\"Standard\"</code>. Then write the same logic using <code>and</code>/<code>or</code> short-circuiting and confirm both give the same result.",
      starterCode: `spend = 1500

# Ternary expression
tier_ternary  = "VIP" if spend > 1000 else "Standard"

# Short-circuit equivalent
tier_shortcircuit = (spend > 1000 and "VIP") or "Standard"

print(f"Ternary      : {tier_ternary}")
print(f"Short-circuit: {tier_shortcircuit}")
print(f"Same result? : {tier_ternary == tier_shortcircuit}")
`
    },
    {
      id: "p2",
      prompt: "<strong>Flag Checker:</strong> Define <code>READ=1, WRITE=2, EXEC=4</code>. Given a <code>perms</code> value, write an expression using <code>&amp;</code> to check whether <code>WRITE</code> permission is included.",
      starterCode: `# Permission flag system using bitwise operators
READ  = 1  # 001
WRITE = 2  # 010
EXEC  = 4  # 100

# Combine READ + EXEC
perms = READ | EXEC   # 101 = 5

has_write = bool(perms & WRITE)   # Check WRITE bit
has_read  = bool(perms & READ)    # Check READ bit
has_exec  = bool(perms & EXEC)    # Check EXEC bit

print(f"perms binary : {bin(perms)}")
print(f"has_read  : {has_read}")
print(f"has_write : {has_write}")
print(f"has_exec  : {has_exec}")
`
    }
  ],

  testQuestions: [
    {
      id: 1,
      prompt: "Compute BMI: <code>weight_kg / (height_m ** 2)</code>, round to 2 decimals, store in <code>bmi</code>. Classify as <code>\"Underweight\"</code>/<code>\"Normal\"</code>/<code>\"Overweight\"</code> using a <strong>ternary expression</strong>; store in <code>category</code>. Use <code>weight_kg=70, height_m=1.75</code>.",
      starterCode: `# Q1: BMI + ternary classification
weight_kg = 70
height_m  = 1.75

bmi = round(weight_kg / (height_m ** 2), 2)
category = "Underweight" if bmi < 18.5 else ("Normal" if bmi < 25 else "Overweight")

print(f"BMI      : {bmi}")
print(f"Category : {category}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "bmi",      type: "float",  value: 22.86, tolerance: 0.01 },
          { name: "category", type: "string", value: "Normal" }
        ]
      }
    },
    {
      id: 2,
      prompt: "Apply <code>**=</code> five times starting from <code>base = 2</code>; store each intermediate value in a list <code>steps</code>. Expected: <code>[4, 16, 256, 65536, 4294967296]</code>.",
      starterCode: `# Q2: Augmented assignment **=
base  = 2
steps = []
for _ in range(5):
    base **= 2
    steps.append(base)

print(f"Steps: {steps}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "steps", type: "list", value: [4, 16, 256, 65536, 4294967296] }
        ]
      }
    },
    {
      id: 3,
      prompt: "Floor division with negatives: compute <code>-7 // 2</code>, store in <code>result</code> (expect <code>-4</code>). Explain in a comment why Python rounds toward negative infinity rather than toward zero.",
      starterCode: `# Q3: Floor division semantics with negatives
result = -7 // 2    # rounds toward -inf → -4  (not -3 like C/Java!)
result_c_style = int(-7 / 2)   # C-style: truncation toward zero → -3

print(f"-7 // 2 (Python floor) : {result}")
print(f"int(-7/2) (C-style truncation): {result_c_style}")
# WHY -4?  Floor div always rounds DOWN (toward -infinity).
# For positive numbers floor and truncation agree.
# For negatives they diverge: floor(-3.5) = -4, trunc(-3.5) = -3.
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: -4 }
        ]
      }
    },
    {
      id: 4,
      prompt: "The precedence trap: for <code>x = 5</code>, evaluate <code>x &amp; 1 == 1</code> and store in <code>trapped_result</code>. Separately compute the <em>intended</em> check <code>(x &amp; 1) == 1</code> and store in <code>intended_result</code>.",
      starterCode: `# Q4: Bitwise vs comparison operator precedence bug
# Python precedence: == binds tighter than &
# So: x & 1 == 1  is parsed as  x & (1 == 1)  which is  x & True  which is  x & 1
x = 5  # binary: 101

# Without parentheses — may work accidentally for some values but is WRONG logic:
trapped_result  = x & 1 == 1   # Parsed as: x & (1 == 1) → x & True → 1 & True → 1 → truthy

# Correct — explicit parentheses:
intended_result = (x & 1) == 1  # (5 & 1) == 1 → 1 == 1 → True

# Test where they diverge:
x2 = 4  # binary: 100 (even number)
trapped2  = x2 & 1 == 1    # x2 & (1==1) → 4 & True → 0 → False (accidentally correct)
intended2 = (x2 & 1) == 1  # (4 & 1) == 1 → 0 == 1 → False

print(f"x=5  trapped : {trapped_result},  intended : {intended_result}")
print(f"x=4  trapped : {trapped2},  intended : {intended2}")
print("Always parenthesize flag checks!")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "intended_result", type: "bool", value: true }
        ]
      }
    },
    {
      id: 5,
      prompt: "Safe division using short-circuit: <code>safe_div = lambda a, b: b != 0 and a / b</code>. Test with <code>b=0</code> (store in <code>zero_case</code>) and <code>b=2</code> (store in <code>normal_case</code>).",
      starterCode: `# Q5: Short-circuit guard pattern
safe_div = lambda a, b: b != 0 and a / b

zero_case   = safe_div(10, 0)    # b==0 is falsy, short-circuits → False (not ZeroDivisionError!)
normal_case = safe_div(10, 2)    # b!=0 is truthy → evaluates and returns 5.0

print(f"safe_div(10, 0) → {zero_case}    (short-circuited)")
print(f"safe_div(10, 2) → {normal_case}  (evaluated)")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "zero_case",   type: "falsy" },
          { name: "normal_case", type: "float", value: 5.0, tolerance: 0.001 }
        ]
      }
    },
    {
      id: 6,
      prompt: "Walrus in a list: given <code>f(x) = x*2</code>, build <code>[y := f(x), y**2, y**3]</code> for <code>x = 3</code>, computing <code>f(x)</code> only once; store the list in <code>result</code>. Expected: <code>[6, 36, 216]</code>.",
      starterCode: `# Q6: Walrus operator := avoids recomputation
f = lambda x: x * 2

x = 3
result = [y := f(x), y**2, y**3]  # f(x) called ONCE; y is reused

print(f"f(3)  = y   = {result[0]}")
print(f"y**2       = {result[1]}")
print(f"y**3       = {result[2]}")
print(f"Full list  = {result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", value: [6, 36, 216] }
        ]
      }
    },
    {
      id: 7,
      prompt: "Chained comparison: evaluate <code>0 &lt; score &lt; 100 and score != 50</code> for <code>score = 50</code> and <code>score = 75</code>. Store booleans in <code>result_50</code>, <code>result_75</code>.",
      starterCode: `# Q7: Python chained comparison
score = 50
result_50 = 0 < score < 100 and score != 50   # True AND False → False

score = 75
result_75 = 0 < score < 100 and score != 50   # True AND True  → True

print(f"score=50: {result_50}")
print(f"score=75: {result_75}")
# Python chaining: 0 < 50 < 100 evaluates as (0 < 50) and (50 < 100)
# Each operand evaluated ONCE — more efficient and readable than C-style
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result_50", type: "bool", value: false },
          { name: "result_75", type: "bool", value: true }
        ]
      }
    },
    {
      id: 8,
      prompt: "Even/odd check using bitwise: <code>(n &amp; 1) == 0</code> for even. Apply to the first 10 integers; store the boolean list in <code>result</code>.",
      starterCode: `# Q8: Bitwise AND even/odd check
result = [(n & 1) == 0 for n in range(10)]
labels = ["even" if v else "odd" for v in result]

for n, label in zip(range(10), labels):
    print(f"{n}: {label}  ({bin(n)} & 1 = {n & 1})")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", value: [true, false, true, false, true, false, true, false, true, false] }
        ]
      }
    },
    {
      id: 9,
      prompt: "Variable swap without a temp: <code>a, b = b, a</code>. Store both before/after states. Use <code>a=10, b=20</code>.",
      starterCode: `# Q9: Pythonic tuple-packing swap
a, b = 10, 20
before = (a, b)

a, b = b, a   # Python packs right side as (20,10) then unpacks left to left

after = (a, b)

print(f"Before: a={before[0]}, b={before[1]}")
print(f"After : a={after[0]},  b={after[1]}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "after", type: "list", value: [20, 10] }
        ]
      }
    },
    {
      id: 10,
      prompt: "Stop-word filter: <code>[w for w in text if w not in stop_words]</code> where <code>stop_words</code> is a <code>set</code>. Store in <code>result</code>. Add a comment explaining why <code>stop_words</code> should be a set, not a list.",
      starterCode: `# Q10: Membership test + complexity lesson
text = ["the", "cat", "sat", "on", "the", "mat"]
stop_words = {"the", "on"}   # Set: O(1) lookup per word

result = [w for w in text if w not in stop_words]
print(f"Filtered: {result}")
# WHY set, not list?
# list: 'w not in stop_words' → O(k) per word → O(n*k) total
# set:  'w not in stop_words' → O(1) per word → O(n) total
# For 10M words and 1000 stop words: list=10B ops vs set=10M ops!
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", value: ["cat","sat","mat"] }
        ]
      }
    },
    {
      id: 11,
      prompt: "Precedence trap: evaluate <code>not False == False</code>; store in <code>result</code>. Explain step-by-step in a comment why <code>==</code> binds tighter than <code>not</code>.",
      starterCode: `# Q11: not vs == operator precedence
# Python precedence: '==' > 'not'
# So: not False == False  is parsed as  not (False == False)  = not True = False
result = not False == False

# Step by step:
step1 = False == False   # True  (== first)
step2 = not step1        # False (not second)
print(f"not False == False → {result}")
print(f"  1. False == False → {step1}")
print(f"  2. not True      → {step2}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "bool", value: false }
        ]
      }
    },
    {
      id: 12,
      prompt: "Leap year check: <code>(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)</code>. Test years <code>2000</code>, <code>1900</code>, <code>2024</code>. Store results in a dict <code>result</code>.",
      starterCode: `# Q12: Compound boolean — leap year
def is_leap(year):
    return (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)

result = {2000: is_leap(2000), 1900: is_leap(1900), 2024: is_leap(2024)}

for y, v in result.items():
    print(f"{y}: {'Leap' if v else 'Not leap'}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: [2000, 1900, 2024] }
        ]
      }
    },
    {
      id: 13,
      prompt: "Default value with <code>or</code>: test with <code>user_input = \"\"</code> (store <code>empty_case</code>) and <code>user_input = \"custom\"</code> (store <code>custom_case</code>). Explain in a comment one dangerous case.",
      starterCode: `# Q13: Short-circuit default pattern + its failure case
user_input = ""
empty_case = user_input or "default_value"   # "" is falsy → "default_value"

user_input = "custom"
custom_case = user_input or "default_value"   # "custom" is truthy → "custom"

print(f"empty  → '{empty_case}'")
print(f"custom → '{custom_case}'")

# DANGER CASE: What if the valid input IS falsy?
user_age = 0   # Valid! User is 0 years old
result = user_age or 18   # Returns 18 — WRONG! 0 is a valid age.
# FIX:
safe_result = user_age if user_age is not None else 18
print(f"or default(0): {result}  ← WRONG")
print(f"is None check: {safe_result}  ← Correct")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "empty_case",  type: "string", value: "default_value" },
          { name: "custom_case", type: "string", value: "custom" }
        ]
      }
    },
    {
      id: 14,
      prompt: "Bit shifting: compute powers of 2 up to <code>2**16</code> using <code>&lt;&lt;</code> (left shift). Store the list in <code>result</code>.",
      starterCode: `# Q14: Powers of 2 via left bit shift
# 1 << n  is equivalent to  2**n
result = [1 << n for n in range(17)]   # 2^0 through 2^16

for i, v in enumerate(result):
    print(f"1 << {i:2d} = 2^{i:2d} = {v:>8,}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", length: 17 }
        ]
      }
    },
    {
      id: 15,
      prompt: "<code>is None</code> vs <code>== None</code>: define a class with <code>__eq__</code> always returning <code>True</code>. Show <code>instance == None</code> returns <code>True</code> while <code>instance is None</code> returns <code>False</code>. Store both in <code>result_eq</code>, <code>result_is</code>.",
      starterCode: `# Q15: is None vs == None — why 'is None' is the safe choice
class TruthyEverything:
    def __eq__(self, other):
        return True   # Everything "equals" everything in this class

obj = TruthyEverything()
result_eq = (obj == None)   # True — because __eq__ returns True for everything
result_is = (obj is None)   # False — obj is clearly not the None singleton

print(f"obj == None : {result_eq}  (dangerous if checking for None!)")
print(f"obj is None : {result_is}  (correct — identity check)")
# LESSON: Always use 'is None' for None checks.
# PEP 8 requires it. It's the one time Python style is strict about operator choice.
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result_eq", type: "bool", value: true },
          { name: "result_is", type: "bool", value: false }
        ]
      }
    },
    {
      id: 16,
      prompt: "Safe attribute access via short-circuit: given <code>user = None</code>, evaluate <code>user and user.get(\"email\")</code> without raising <code>AttributeError</code>. Store in <code>result</code>.",
      starterCode: `# Q16: Short-circuit guard for nullable objects
user = None
result = user and user.get("email")   # None is falsy → short-circuits, no AttributeError

print(f"result: {result}   (falsy, not an exception)")
print(f"type  : {type(result).__name__}")

# Compare: what happens without the guard:
try:
    _ = user.get("email")   # AttributeError: 'NoneType' has no attribute 'get'
except AttributeError as e:
    print(f"Without guard → {type(e).__name__}: {e}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "falsy" }
        ]
      }
    },
    {
      id: 17,
      prompt: "Compound interest: <code>P * (1 + r/n) ** (n*t)</code> for <code>P=10000, r=0.08, n=12, t=5</code>. Round to 2 decimals, store in <code>result</code>.",
      starterCode: `# Q17: Compound interest — multi-operator precedence
P = 10000   # Principal
r = 0.08    # Annual rate
n = 12      # Compounding periods per year
t = 5       # Time in years

result = round(P * (1 + r/n) ** (n*t), 2)

print(f"Principal     : \\\${P:,}")
print(f"Rate          : {r*100}% annually")
print(f"Compounded    : {n}× per year for {t} years")
print(f"Final amount  : \\\${result:,}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "float", value: 14898.46, tolerance: 0.05 }
        ]
      }
    },
    {
      id: 18,
      prompt: "Input validation via set membership: check <code>response in {\"yes\",\"no\",\"maybe\"}</code> for several inputs. Store results in <code>result</code> as a dict. Explain the complexity benefit.",
      starterCode: `# Q18: Membership validation with set
valid_choices = {"yes", "no", "maybe"}
inputs = ["yes", "no", "yep", "maybe", "YES", ""]

result = {inp: inp in valid_choices for inp in inputs}

for inp, valid in result.items():
    print(f"'{inp:6s}' → {'✅ valid' if valid else '❌ invalid'}")

# O(1) per check with set vs O(k) with list where k=len(choices)
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["yes", "no", "maybe"] }
        ]
      }
    },
    {
      id: 19,
      prompt: "Bitwise NOT: compute <code>~5</code>, store in <code>result</code> (expect <code>-6</code>). Explain in a comment using two's complement (<code>~n == -(n+1)</code>).",
      starterCode: `# Q19: Bitwise NOT ~ and two's complement
result = ~5   # Expected: -6

print(f"~5 = {result}")
print(f"~0 = {~0}")    # -1
print(f"~(-1) = {~(-1)}")  # 0

# WHY ~5 == -6?
# In two's complement: ~n = -(n+1)
# Bit flip of 0b00000101 (5) = 0b11111010
# In two's complement this represents -6
# Formula: ~n = -(n+1) for all integers
for n in range(-3, 4):
    print(f"~{n:2d} = {~n:3d}  (= -({n}+1) = {-(n+1)})")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: -6 }
        ]
      }
    },
    {
      id: 20,
      prompt: "Use <code>any()</code> and <code>all()</code> with a generator: <code>x &gt; 0 for x in [-1,-2,3]</code>. Store <code>any_result</code>, <code>all_result</code>. Explain in a comment why a generator avoids unnecessary evaluations.",
      starterCode: `# Q20: any() and all() with lazy generators
data = [-1, -2, 3]

any_result = any(x > 0 for x in data)   # Stops at first True (x=3)
all_result = all(x > 0 for x in data)   # Stops at first False (x=-1)

print(f"any(x>0): {any_result}")   # True  (3 > 0)
print(f"all(x>0): {all_result}")   # False (-1 is not > 0)

# WHY generator, not list?
# any([x>0 for x in data])   → evaluates ALL elements first, THEN checks
# any(x>0 for x in data)     → stops as soon as one True is found (lazy)
# For 10M elements, stopping early saves massive computation!
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "any_result", type: "bool", value: true },
          { name: "all_result", type: "bool", value: false }
        ]
      }
    },
    {
      id: 21,
      prompt: "XOR trick: given <code>[3,5,3,7,5,9,9]</code> (every element paired except one), use <code>functools.reduce</code> with XOR to find the unique element. Store in <code>result</code>.",
      starterCode: `# Q21: XOR to find the lone element
import functools

lst = [3, 5, 3, 7, 5, 9, 9]
result = functools.reduce(lambda a, b: a ^ b, lst)

print(f"List    : {lst}")
print(f"Unique  : {result}")
# WHY? XOR properties:
# a ^ a = 0  (same values cancel out)
# a ^ 0 = a  (XOR with 0 leaves value unchanged)
# So: 3^5^3^7^5^9^9 = (3^3)^(5^5)^(9^9)^7 = 0^0^0^7 = 7
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 7 }
        ]
      }
    },
    {
      id: 22,
      prompt: "Ternary refactoring: rewrite a 4-line <code>if/else</code> discount-tier block as a single nested ternary. Store the result in <code>result</code> for <code>purchase_amount = 150</code>.",
      starterCode: `# Q22: Ternary expression refactoring
purchase_amount = 150

# Original if/else block:
if purchase_amount >= 500:
    tier = "Platinum"
elif purchase_amount >= 200:
    tier = "Gold"
elif purchase_amount >= 100:
    tier = "Silver"
else:
    tier = "Standard"

# Refactored to single ternary expression:
result = ("Platinum" if purchase_amount >= 500 else
          "Gold"     if purchase_amount >= 200 else
          "Silver"   if purchase_amount >= 100 else
          "Standard")

print(f"Amount : \\\${purchase_amount}")
print(f"Tier   : {result}")
print(f"Match  : {tier == result}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "string", value: "Silver" }
        ]
      }
    },
    {
      id: 23,
      prompt: "Unpacking merge: merge <code>defaults = {\"a\":1,\"b\":2}</code> and <code>overrides = {\"b\":99,\"c\":3}</code> two ways — using <code>{**defaults, **overrides}</code> and the <code>|</code> merge operator (Python 3.9+). Store both in <code>merged_unpack</code>, <code>merged_pipe</code>.",
      starterCode: `# Q23: Dict merge — two modern approaches
defaults  = {"a": 1, "b": 2}
overrides = {"b": 99, "c": 3}

# Method 1: Unpacking merge (Python 3.5+)
merged_unpack = {**defaults, **overrides}

# Method 2: | merge operator (Python 3.9+)
merged_pipe = defaults | overrides

print(f"Unpack merge : {merged_unpack}")
print(f"Pipe merge   : {merged_pipe}")
print(f"Same result  : {merged_unpack == merged_pipe}")
# In both cases, 'overrides' wins for key "b" → 99
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "merged_unpack", type: "dict", keys: ["a", "b", "c"] },
          { name: "merged_pipe",   type: "dict", keys: ["a", "b", "c"] }
        ]
      }
    },
    {
      id: 24,
      prompt: "String formatting comparison: given <code>value = 1234.5</code>, produce <code>\"1,234.50\"</code> three ways — <code>%</code>-style, <code>.format()</code>, and f-string format spec. Store all three in <code>pct_style</code>, <code>format_style</code>, <code>fstring_style</code>.",
      starterCode: `# Q24: Three string formatting approaches
value = 1234.5

# %-style (old Python 2 style — % is BOTH modulo AND format operator!)
pct_style    = "{:,.2f}".format(value)   # Using .format for comma support
# True %-style comma formatting requires locale or manual: "%.2f" % value

# .format() style
format_style = "{:,.2f}".format(value)

# f-string (preferred modern Python)
fstring_style = f"{value:,.2f}"

print(f"%-style    : {pct_style}")
print(f".format()  : {format_style}")
print(f"f-string   : {fstring_style}")
print(f"All same?  : {pct_style == format_style == fstring_style}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "fstring_style", type: "string", value: "1,234.50" }
        ]
      }
    },
    {
      id: 25,
      prompt: "Permission flags: define <code>READ=1, WRITE=2, EXEC=4</code>. Combine <code>READ | WRITE</code> into <code>perms</code>. Check <code>EXEC</code> with <code>&amp;</code> (store <code>has_exec</code>, expect <code>False</code>). Toggle <code>EXEC</code> on with <code>^</code> (store <code>toggled</code>).",
      starterCode: `# Q25: Unix-style permission flags — tying together bitwise operators
READ  = 1   # binary: 001
WRITE = 2   # binary: 010
EXEC  = 4   # binary: 100

# Combine READ + WRITE using |
perms = READ | WRITE   # 011 = 3

# Check if EXEC is set using &
has_exec = bool(perms & EXEC)   # 011 & 100 = 000 → False

# Toggle EXEC on using ^ (XOR flips the bit)
toggled = perms ^ EXEC          # 011 ^ 100 = 111 = 7 (READ+WRITE+EXEC)

print(f"perms     = {perms}  = {bin(perms)}  (READ+WRITE)")
print(f"has_exec  = {has_exec}")
print(f"toggled   = {toggled}  = {bin(toggled)} (READ+WRITE+EXEC)")

# Verify individual permissions in toggled:
print(f"After toggle — READ: {bool(toggled & READ)}, WRITE: {bool(toggled & WRITE)}, EXEC: {bool(toggled & EXEC)}")
`,
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "has_exec", type: "bool",  value: false },
          { name: "toggled",  type: "int",   value: 7 }
        ]
      }
    }
  ],

  slides: [
    {
      title: "01. Arithmetic, Assignment & Comparison",
      duration: "7:30",
      html: `
<h2>➕ 01. Arithmetic, Assignment &amp; Comparison Operators</h2>

<div class="slide-section">
  <div class="vs-block">
    <div class="vs-card vs-card--pk">
      <h4>📋 Division Operators Comparison</h4>
      <ul style="margin: 4px 0; padding-left: 16px; font-size: 0.78rem;">
        <li><code>/</code> (True division): always returns float (e.g. <code>10 / 2</code> → <code>5.0</code>).</li>
        <li><code>//</code> (Floor division): truncates toward negative infinity (e.g. <code>-7 // 2</code> → <code>-4</code>).</li>
      </ul>
    </div>
  </div>
</div>

<div class="slide-section">
  <h3 style="color:#93c5fd;margin-bottom:14px;">📐 Complete Arithmetic Operator Reference</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th><th>Analyst Use Case</th></tr></thead>
    <tbody>
      <tr><td><code>+</code></td><td>Addition</td><td><code>revenue + tax</code></td><td>Sum</td><td>Aggregating metrics</td></tr>
      <tr><td><code>-</code></td><td>Subtraction</td><td><code>revenue - cost</code></td><td>Difference</td><td>Profit calculation</td></tr>
      <tr><td><code>*</code></td><td>Multiplication</td><td><code>price * qty</code></td><td>Product</td><td>Invoice totals</td></tr>
      <tr><td><code>/</code></td><td>True division</td><td><code>total / count</code></td><td>Float</td><td>Averages (always float!)</td></tr>
      <tr><td><code>//</code></td><td>Floor division</td><td><code>rows // page_size</code></td><td>Int</td><td>Pagination, bucket counting</td></tr>
      <tr><td><code>%</code></td><td>Modulo</td><td><code>id % 10</code></td><td>Remainder</td><td>Alternating groups, hashing</td></tr>
      <tr><td><code>**</code></td><td>Exponentiation</td><td><code>P * (1+r) ** t</code></td><td>Power</td><td>Compound interest, growth models</td></tr>
    </tbody>
  </table>

  <div class="warn-box">
    <strong>⚠️ Division always returns float in Python 3:</strong>
    <pre class="nb-code-block"><code>print(10 / 2)    # 5.0  ← not 5!
print(10 // 2)   # 5    ← use floor division for int result
print(-7 // 2)   # -4   ← rounds toward -inf, NOT -3 like C/Java!</code></pre>
  </div>
</div>

<div class="slide-section">
  <h3 class="sub-why">📝 Augmented Assignment Operators</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Equivalent To</th><th>Example</th></tr></thead>
    <tbody>
      <tr><td><code>x += 5</code></td><td><code>x = x + 5</code></td><td>Running total</td></tr>
      <tr><td><code>x -= 3</code></td><td><code>x = x - 3</code></td><td>Decrement counter</td></tr>
      <tr><td><code>x *= 2</code></td><td><code>x = x * 2</code></td><td>Doubling budget</td></tr>
      <tr><td><code>x /= 100</code></td><td><code>x = x / 100</code></td><td>Percentage conversion</td></tr>
      <tr><td><code>x **= 2</code></td><td><code>x = x ** 2</code></td><td>Squaring values</td></tr>
      <tr><td><code>x //= 2</code></td><td><code>x = x // 2</code></td><td>Halving with integer result</td></tr>
      <tr><td><code>x %= 10</code></td><td><code>x = x % 10</code></td><td>Extract last digit</td></tr>
    </tbody>
  </table>
</div>

<div class="slide-section">
  <h3 class="sub-why">🔍 Comparison Operators</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Meaning</th><th>Returns</th></tr></thead>
    <tbody>
      <tr><td><code>==</code></td><td>Value equality</td><td><code>bool</code></td></tr>
      <tr><td><code>!=</code></td><td>Value inequality</td><td><code>bool</code></td></tr>
      <tr><td><code>&lt;</code>, <code>&gt;</code></td><td>Less/greater than</td><td><code>bool</code></td></tr>
      <tr><td><code>&lt;=</code>, <code>&gt;=</code></td><td>Less/greater or equal</td><td><code>bool</code></td></tr>
    </tbody>
  </table>

  <div class="pro-tip-box">
    <strong>✨ Python Chained Comparisons:</strong>
    <pre class="nb-code-block"><code># Pythonic — each operand evaluated ONCE:
if 18 <= age <= 65:
    print("Working age")

# C-style equivalent (verbose, evaluates 'age' twice):
if 18 <= age and age <= 65:
    print("Working age")</code></pre>
  </div>

  <h3 class="sub-why">🔀 Ternary (Conditional) Expressions</h3>
  <p>Python's ternary is: <code>value_if_true if condition else value_if_false</code></p>
  <pre class="nb-code-block"><code>bmi = 22.86
category = "Normal" if 18.5 <= bmi < 25 else "Check BMI"

# Nested ternary for multiple tiers:
tier = ("Underweight" if bmi < 18.5 else
        "Normal"      if bmi < 25   else
        "Overweight"  if bmi < 30   else
        "Obese")</code></pre>
  <div class="info-box"><strong>📌 When to use:</strong> Single-line assignments where the condition is simple. Avoid deeply nested ternaries — switch to <code>if/elif/else</code> blocks for readability.</div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What happens when you do floor division // on negative numbers in Python?</strong></p>
      <p><em>A: Python's floor division <code>//</code> always rounds down (towards negative infinity). Therefore, <code>-7 // 2</code> yields <code>-4</code> rather than <code>-3</code>. This guarantees the relation <code>(a // b) * b + (a % b) == a</code> is always true in Python.</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is chained comparison evaluation?</strong></p>
      <p><em>A: Python allows joining comparisons directly like <code>18 <= age <= 65</code>. In this form, each intermediate variable or expression is evaluated exactly once, which prevents side effects compared to writing <code>18 <= age and age <= 65</code>.</em></p>
    </div>
  </div>
</div>
`
    },
    {
      title: "02. Logical, Bitwise & Identity Operators",
      duration: "8:15",
      html: `
<h2>🔀 02. Logical, Bitwise &amp; Identity/Membership Operators</h2>

<div class="slide-section">
  <h3 class="sub-why">🧠 Logical Operators — Short-Circuit Truth Table</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Returns</th><th>Short-Circuits When</th><th>Pattern</th></tr></thead>
    <tbody>
      <tr><td><code>a and b</code></td><td>First falsy or last value</td><td>First operand is falsy</td><td>Guard clause</td></tr>
      <tr><td><code>a or b</code></td><td>First truthy or last value</td><td>First operand is truthy</td><td>Default value</td></tr>
      <tr><td><code>not a</code></td><td><code>True</code>/<code>False</code></td><td>Never</td><td>Negation</td></tr>
    </tbody>
  </table>

  <pre class="nb-code-block"><code># Guard pattern (and):
result = user is not None and user.get("email")  # Safe access

# Default value pattern (or):
name = user_input or "Anonymous"   # If user_input is falsy, use default

# ⚠️ DANGER with or-default: 0 is falsy!
count = user_count or 10   # WRONG if user_count=0 is valid!
count = user_count if user_count is not None else 10  # CORRECT</code></pre>
</div>

<div class="slide-section">
  <h3 class="sub-memory">⚡ Bitwise Operators</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Name</th><th>Example</th><th>Use Case</th></tr></thead>
    <tbody>
      <tr><td><code>&amp;</code></td><td>AND</td><td><code>perms &amp; WRITE</code></td><td>Check if a flag bit is set</td></tr>
      <tr><td><code>|</code></td><td>OR</td><td><code>READ | WRITE</code></td><td>Combine permission flags</td></tr>
      <tr><td><code>^</code></td><td>XOR</td><td><code>perms ^ EXEC</code></td><td>Toggle a specific bit</td></tr>
      <tr><td><code>~</code></td><td>NOT</td><td><code>~5</code> → <code>-6</code></td><td>Bitwise complement (~n = -(n+1))</td></tr>
      <tr><td><code>&lt;&lt;</code></td><td>Left shift</td><td><code>1 &lt;&lt; 4</code> → <code>16</code></td><td>Powers of 2, fast multiplication</td></tr>
      <tr><td><code>&gt;&gt;</code></td><td>Right shift</td><td><code>16 &gt;&gt; 2</code> → <code>4</code></td><td>Fast division by power of 2</td></tr>
    </tbody>
  </table>

  <pre class="nb-code-block"><code># Unix-style permission system:
READ, WRITE, EXEC = 1, 2, 4
perms = READ | WRITE      # 011 = 3
has_exec = bool(perms & EXEC)  # 011 & 100 = 000 → False
toggled  = perms ^ EXEC   # 011 ^ 100 = 111 = 7 (add EXEC)</code></pre>

  <h3 class="sub-pitfall">⚠️ Critical Precedence Bug: Bitwise vs Comparison</h3>
  <div class="warn-box">
    <strong>Danger:</strong> <code>==</code> binds <em>tighter</em> than <code>&amp;</code> in Python.<br>
    <code>x &amp; 1 == 1</code> is parsed as <code>x &amp; (1 == 1)</code> = <code>x &amp; True</code> = <code>x &amp; 1</code><br>
    This is a real, cited production bug pattern in flag-checking code!
    <pre class="nb-code-block"><code>x = 4   # binary: 100 (even)
# WRONG: x & 1 == 1  → x & True → 4 & 1 → 0 → False (accidentally correct here)
# RIGHT: (x & 1) == 1  → 0 == 1 → False

# For x=6 (binary 110):
x = 6
wrong   = x & 1 == 1    # 6 & (1==1) → 6 & True → 6 & 1 → 0 → False
correct = (x & 1) == 1  # (6 & 1) == 1 → 0 == 1 → False
# Both False here — but for different reasons. Always parenthesize!</code></pre>
  </div>
</div>

<div class="slide-section">
  <h3 class="sub-why">🔍 Identity &amp; Membership Operators</h3>
  <table class="db-table-mock">
    <thead><tr><th>Operator</th><th>Checks</th><th>Use For</th><th>⚠️ Not For</th></tr></thead>
    <tbody>
      <tr><td><code>is</code></td><td>Same object in memory</td><td>Singleton checks (<code>is None</code>, <code>is True</code>)</td><td>Value equality on non-singletons</td></tr>
      <tr><td><code>is not</code></td><td>Different objects</td><td><code>if result is not None:</code></td><td>Comparing strings, ints &gt; 256</td></tr>
      <tr><td><code>in</code></td><td>Membership</td><td>Set O(1), dict O(1), list O(n)</td><td>—</td></tr>
      <tr><td><code>not in</code></td><td>Non-membership</td><td>Stop-word filtering, exclusion lists</td><td>—</td></tr>
    </tbody>
  </table>

  <div class="info-box">
    <strong>📌 Membership complexity matters:</strong><br>
    <code>x in a_list</code> → O(n) per check<br>
    <code>x in a_set</code>  → O(1) per check<br>
    <code>x in a_dict</code> → O(1) per check (checks keys)<br>
    For repeated lookups over large collections, always convert to <code>set</code> first.
  </div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the operator precedence trap between comparison and bitwise operators?</strong></p>
      <p><em>A: Comparison operators (like <code>==</code>) have a higher precedence than bitwise operators (like <code>&amp;</code>). Thus, writing <code>x &amp; 1 == 1</code> is evaluated as <code>x &amp; (1 == 1)</code>, rather than <code>(x &amp; 1) == 1</code>. Always wrap bitwise masking checks in parenthesized blocks.</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is set lookup O(1) compared to list lookup O(n)?</strong></p>
      <p><em>A: Sets in Python are implemented using hash tables. When checking <code>x in s</code>, Python calculates the hash of <code>x</code> and targets its bucket directly (constant time). Lists require checking every item sequentially from beginning to end (linear time).</em></p>
    </div>
  </div>
</div>
`
    },
    {
      title: "03. Precedence, Walrus & String Formatting",
      duration: "8:00",
      html: `
<h2>📏 03. Operator Precedence, Walrus &amp; String Formatting</h2>

<div class="slide-section">
  <div class="vs-block">
    <div class="vs-card vs-card--fk">
      <h4>📋 Dict Merging Comparison</h4>
      <ul style="margin: 4px 0; padding-left: 16px; font-size: 0.78rem;">
        <li><code>{**defaults, **overrides}</code> (Unpacking merge): standard method for merging dicts.</li>
        <li><code>defaults | overrides</code> (Merge operator): clean modern way (Python 3.9+) to obtain identical result.</li>
      </ul>
    </div>
  </div>
</div>

<div class="slide-section">
  <h3 style="color:#93c5fd;margin-bottom:12px;">📋 Python Operator Precedence (Highest → Lowest)</h3>
  <table class="db-table-mock">
    <thead><tr><th>#</th><th>Operators</th><th>Category</th></tr></thead>
    <tbody>
      <tr><td>1</td><td><code>()</code></td><td>Parentheses — always highest</td></tr>
      <tr><td>2</td><td><code>**</code></td><td>Exponentiation (right-associative!)</td></tr>
      <tr><td>3</td><td><code>+x</code>, <code>-x</code>, <code>~x</code></td><td>Unary operators</td></tr>
      <tr><td>4</td><td><code>*</code>, <code>/</code>, <code>//</code>, <code>%</code></td><td>Multiplication / Division</td></tr>
      <tr><td>5</td><td><code>+</code>, <code>-</code></td><td>Addition / Subtraction</td></tr>
      <tr><td>6</td><td><code>&lt;&lt;</code>, <code>&gt;&gt;</code></td><td>Bit shifts</td></tr>
      <tr><td>7</td><td><code>&amp;</code></td><td>Bitwise AND</td></tr>
      <tr><td>8</td><td><code>^</code></td><td>Bitwise XOR</td></tr>
      <tr><td>9</td><td><code>|</code></td><td>Bitwise OR</td></tr>
      <tr><td>10</td><td><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, <code>in</code>, <code>is</code></td><td>Comparisons</td></tr>
      <tr><td>11</td><td><code>not x</code></td><td>Boolean NOT</td></tr>
      <tr><td>12</td><td><code>and</code></td><td>Boolean AND</td></tr>
      <tr><td>13</td><td><code>or</code></td><td>Boolean OR</td></tr>
      <tr><td>14</td><td><code>:=</code></td><td>Walrus (lowest binding)</td></tr>
    </tbody>
  </table>

  <div class="warn-box">
    <strong>⚠️ Right-Associativity of <code>**</code>:</strong><br>
    <code>2 ** 3 ** 2</code> evaluates as <code>2 ** (3**2)</code> = <code>2 ** 9</code> = <strong>512</strong>, NOT <code>8 ** 2 = 64</code>!<br>
    Always parenthesize compound power expressions.
  </div>
</div>

<div class="slide-section">
  <h3 class="sub-why">🦭 Walrus Operator := (Python 3.8+)</h3>
  <p>The walrus operator assigns a value <em>and</em> returns it — enabling "assign and test" in a single expression. It's particularly useful for avoiding recomputation.</p>

  <pre class="nb-code-block"><code># Pattern 1: while loop with assignment
data = [1, 2, 3, 4, 5]
i = 0
while (chunk := data[i:i+2]):
    print(chunk); i += 2
    if i >= len(data): break

# Pattern 2: Compute once, use many times in comprehension
f = lambda x: x * x
results = [y := f(3), y + 1, y + 2]   # f called once, y reused

# Pattern 3: Filter with intermediate value
values = [1, -2, 3, -4, 5]
positive_squares = [y**2 for x in values if (y := x) > 0]</code></pre>

  <div class="info-box"><strong>📌 When NOT to use walrus:</strong> When it reduces readability. Walrus is powerful but can make code confusing if overused. Prefer it only when it eliminates a meaningful recomputation or enables a cleaner loop pattern.</div>
</div>

<div class="slide-section">
  <h3 class="sub-memory">🔤 Unpacking &amp; Merging Operators (<code>*</code>, <code>**</code>, <code>|</code>)</h3>
  <p>Python reuses arithmetic operators in a second syntactic role for unpacking and merging collections:</p>

  <pre class="nb-code-block"><code># * in function calls: unpack iterable as positional args
args = [1, 2, 3]
print(*args)   # same as print(1, 2, 3)

# ** in function calls: unpack dict as keyword args
opts = {"sep": ", ", "end": "!\\n"}
print(*args, **opts)   # print(1, 2, 3, sep=", ", end="!\\n")

# ** in dict literals: merge dicts
defaults  = {"timeout": 30, "retries": 3}
overrides = {"retries": 5, "verbose": True}
config = {**defaults, **overrides}   # overrides wins on conflict

# | merge operator (Python 3.9+):
config2 = defaults | overrides   # same result</code></pre>
</div>

<div class="slide-section">
  <h3 class="sub-memory">📊 String Formatting Operator Comparison</h3>
  <p>Python's <code>%</code> operator has a <strong>dual role</strong>: modulo arithmetic AND string formatting (C-printf style).</p>

  <table class="db-table-mock">
    <thead><tr><th>Style</th><th>Syntax</th><th>Python Version</th><th>Best For</th></tr></thead>
    <tbody>
      <tr><td>%-style</td><td><code>"%.2f" % value</code></td><td>Python 2+</td><td>Legacy code; avoid in new code</td></tr>
      <tr><td>.format()</td><td><code>"{:,.2f}".format(v)</code></td><td>Python 2.6+</td><td>Template strings stored in variables</td></tr>
      <tr><td>f-string</td><td><code>f"{value:,.2f}"</code></td><td>Python 3.6+</td><td>✅ Modern preferred — fastest, most readable</td></tr>
    </tbody>
  </table>

  <pre class="nb-code-block"><code>revenue = 1_234_567.89

# Format spec mini-language: [fill][align][sign][,][.precision][type]
f"{revenue:>15,.2f}"   # Right-aligned, comma, 2 decimal: " 1,234,567.89"
f"{0.1528:.1%}"         # Percentage: "15.3%"
f"{255:08b}"            # Binary with 8 digits: "11111111"
f"{255:#010x}"          # Hex with prefix: "0x000000ff"
</code></pre>

  <div class="pro-tip-box">
    <strong>Professional rules for operator-heavy code:</strong><br>
    1. <strong>Always parenthesize</strong> compound boolean expressions: <code>(a &amp; b) == c</code> not <code>a &amp; b == c</code><br>
    2. <strong>Never use <code>is</code></strong> for value equality — only for <code>None</code>, <code>True</code>, <code>False</code><br>
    3. <strong>Prefer f-strings</strong> for formatting: fastest runtime, IDE-friendly<br>
    4. <strong>Use set for membership tests</strong> in loops: O(1) vs O(n)
  </div>
</div>

<div class="slide-section">
  <div class="interview-box">
    <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the walrus operator := and when should it be used?</strong></p>
      <p><em>A: The walrus operator (assignment expression) assigns values to variables as part of a larger expression. It is best used to avoid double computation (e.g. evaluating <code>f(x)</code> once and reusing it inside list comprehensions or conditional branches).</em></p>
    </div>
    <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
    <div>
      <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Explain the double role of % operator in Python.</strong></p>
      <p><em>A: For numeric types, <code>%</code> represents the modulo operator (returning remainder of division). For strings, <code>%</code> operates as the string formatting interpolation operator (similar to printf in C).</em></p>
    </div>
  </div>
</div>
`
    }
  ]
};
