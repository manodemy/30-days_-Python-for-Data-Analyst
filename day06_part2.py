"""Generate Day06 Sets notebook - Part 2: Sections 4-6 + assembly."""
from nb_helpers import *
from day06_part1 import sections_1_to_3
import os

def sections_4_to_6():
    S = []

    # ── SECTION 4: Subset & Superset Relations ──
    S.append((
        SH(4,"Subset & Superset Relations","Comparative Logic") + '\n\n' +
        WH("Sets can be compared to check if one is fully contained within another. A set is a <b>subset</b> if all its elements exist in the other set. It is a <b>superset</b> if it contains all elements of the other set. Two sets are <b>disjoint</b> if they share no common elements.") + '\n\n' +
        "| Operation | Operator | Method | True if... |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| Subset | `A <= B` | `A.issubset(B)` | All elements of A are in B |\n"
        "| Proper Subset | `A < B` | None | Subset AND A != B |\n"
        "| Superset | `A >= B` | `A.issuperset(B)` | A contains all elements of B |\n"
        "| Disjoint | None | `A.isdisjoint(B)` | A & B is empty |\n\n" +
        WC([("Permission Checking","`if user_roles.issubset(allowed_roles):` — verify access rights"),
            ("Data Validation","`if required_columns.issubset(df.columns):` — ensure data structure is correct"),
            ("Overlap Checking","`if isdisjoint` — verify two user segments are truly mutually exclusive")]) + '\n\n' +
        PT("Use <code><=</code> and <code>>=</code> for subsets/supersets. <code>A < B</code> checks for a <b>proper subset</b> (A is a subset of B, but A is not equal to B)."),
        "A = {1, 2}\nB = {1, 2, 3, 4}\nC = {5, 6}\n\n# Subsets\nprint(f'A is subset of B: {A.issubset(B)}')  # True\nprint(f'A <= B: {A <= B}')  # True\n\n# Proper subset\nprint(f'A < A: {A < A}')    # False (not proper)\nprint(f'A <= A: {A <= A}')  # True\n\n# Supersets\nprint(f'B is superset of A: {B.issuperset(A)}')  # True\nprint(f'B >= A: {B >= A}')  # True\n\n# Disjoint\nprint(f'A and C are disjoint: {A.isdisjoint(C)}')  # True\n",
        "Subset & Superset",
        [
            '### **Q1.** Given `required = {"age", "name"}`, check if it is a subset of `columns = {"age", "name", "salary"}` using both method and operator.\n',
            '### **Q2.** Check if `columns` is a superset of `required` using both method and operator. Print results.\n',
            '### **Q3.** Demonstrate the difference between a subset (`<=`) and a proper subset (`<`) using `A = {1, 2}` and `B = {1, 2}`.\n',
            '### **Q4.** Create two sets of tags for two different articles. Check if they have zero overlap using `.isdisjoint()`. Print the result.\n',
            '### **Q5.** Write a function `has_all_permissions(user_perms, required_perms)` that returns True only if the user has all required permissions. Test it.\n',
        ]
    ))

    # ── SECTION 5: Frozen Sets ──
    S.append((
        SH(5,"Frozen Sets","Immutable Sets") + '\n\n' +
        WH("A <b>frozenset</b> is an <b>immutable</b> version of a set. Once created, elements cannot be added or removed. Because it is immutable, a frozenset is <b>hashable</b>, meaning it can be used as a dictionary key or as an element inside another set.") + '\n\n' +
        "| Feature | `set` | `frozenset` |\n"
        "| :--- | :--- | :--- |\n"
        "| Mutable? | Yes | No |\n"
        "| Hashable? | No | Yes |\n"
        "| Use as dict key? | No | Yes |\n"
        "| Put inside a set? | No | Yes |\n"
        "| Methods | All set methods | Only non-modifying methods (union, etc.) |\n\n" +
        WC([("Compound Keys","`distances = {frozenset(['NY', 'LA']): 2444}` — order-independent keys"),
            ("Caching","Use frozenset as arguments to cached/memoized functions"),
            ("Immutable Constraints","Prevent accidental modification of global rule sets")]) + '\n\n' +
        PF("Sets of Sets","You cannot create a set of sets like <code>{{1, 2}, {3, 4}}</code> because sets are unhashable. You MUST use frozensets: <code>{frozenset([1, 2]), frozenset([3, 4])}</code>."),
        "# Frozenset creation\nfs = frozenset([1, 2, 3])\nprint(f'Frozenset: {fs}')\n\n# fs.add(4)  # AttributeError: 'frozenset' object has no attribute 'add'\n\n# Frozenset as dict key\n# Represents distance between two cities (order doesn't matter!)\ndistances = {\n    frozenset(['NY', 'LA']): 2444,\n    frozenset(['NY', 'Chicago']): 712\n}\n\n# Lookup works regardless of order\nquery = frozenset(['LA', 'NY'])\nprint(f'Distance NY-LA: {distances[query]} miles')\n\n# Set of sets (using frozensets)\nvalid_combinations = {frozenset([1, 2]), frozenset([3, 4])}\nprint(f'Combinations: {valid_combinations}')\n",
        "Frozen Sets",
        [
            '### **Q1.** Create a frozenset from a list `[1, 2, 3]`. Try to use `.add(4)` and catch the AttributeError. Print the error message.\n',
            '### **Q2.** Demonstrate that standard sets cannot be dict keys (catch TypeError), but frozensets can.\n',
            '### **Q3.** Create a dictionary where keys are frozensets of two users, and values are their relationship status. Retrieve a value using the reverse order of users.\n',
            '### **Q4.** Show that `frozenset([1, 2, 3]) | frozenset([3, 4, 5])` works and returns a frozenset. Print the type of the result.\n',
            '### **Q5.** Create a set containing three frozensets. Print the set.\n',
        ]
    ))

    # ── SECTION 6: Sets vs Lists Performance ──
    S.append((
        SH(6,"Sets vs Lists","O(1) Lookups & Performance") + '\n\n' +
        WH("Sets use <b>hash tables</b> under the hood. This means checking if an item is in a set takes <b>O(1) time</b> (constant time), regardless of how large the set is. Checking if an item is in a list takes <b>O(n) time</b>, which gets slower as the list grows.") + '\n\n' +
        "| Operation | List Time Complexity | Set Time Complexity | Speedup |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `x in collection` | O(n) | O(1) | Massive for large data |\n"
        "| Deduplicate | O(n^2) (naive) | O(n) | Huge |\n"
        "| Iteration | O(n) | O(n) | Equal |\n\n" +
        WC([("Filtering Pipelines","Convert blacklist of IDs to a set before filtering a large DataFrame"),
            ("Cross-referencing","Checking which users in Table A exist in Table B"),
            ("Performance Optimization","Replacing `if item in list:` with `if item in set:` is the easiest performance win in Python")]) + '\n\n' +
        PT("If you need to check membership (`in`) inside a loop over a large dataset, ALWAYS convert the lookup collection to a set first."),
        "import time\nimport random\n\n# Setup data\nnum_elements = 1_000_000\nlookup_value = 999_999\n\n# Create collections\ndata_list = list(range(num_elements))\ndata_set = set(data_list)\n\n# Time List Lookup\nstart = time.time()\nfound = lookup_value in data_list\nlist_time = time.time() - start\n\n# Time Set Lookup\nstart = time.time()\nfound = lookup_value in data_set\nset_time = time.time() - start\n\nprint(f'List lookup: {list_time:.6f} seconds')\nprint(f'Set lookup:  {set_time:.6f} seconds')\nprint(f'Set is {list_time / (set_time + 1e-9):.1f}x faster')\n",
        "Performance",
        [
            '### **Q1.** Recreate the performance benchmark: time looking up `-1` (not in collection) in a list of 1,000,000 items vs a set. Print the times.\n',
            '### **Q2.** Given a huge text, extracting unique words using `list.append` (if not in list) vs `set.add`. Explain why the set approach is O(n) and list approach is O(n^2).\n',
            '### **Q3.** Write a function `find_common(l1, l2)` that finds common elements between two large lists. Convert them to sets and use intersection. Time the function.\n',
            '### **Q4.** Write a loop that filters a list of 100,000 numbers, keeping only those present in a `valid_ids` list of 10,000 numbers. Show how converting `valid_ids` to a set speeds it up.\n',
            '### **Q5.** When would you NOT use a set for lookups? (Hint: Order preservation, duplicate counting). Explain briefly.\n',
        ]
    ))

    return S

TASKS = [
    ("Data Deduplicator", "Write a function `unique_sorted_chars(text)` that takes a string, removes duplicates, removes spaces, and returns a sorted list of the unique characters. Test with `'hello world'`."),
    ("Cohort Overlap", "Given `cohort_A = [1,2,3,4,5,6]` and `cohort_B = [4,5,6,7,8]`, use sets to find: IDs in both, IDs only in A, IDs only in B, and IDs in exactly one cohort. Print all 4 lists."),
    ("Vocabulary Analyzer", "Write a function `jaccard_similarity(doc1, doc2)` that splits two strings into sets of words and calculates: `len(intersection) / len(union)`. Test with two short sentences."),
    ("Access Controller", "Given `user_roles = {'read', 'write'}` and `admin_roles = {'read', 'write', 'delete'}`, write code that uses subset/superset methods to check if the user has all admin roles, and if not, which ones are missing."),
    ("Fast Filter", "Create a list of 100,000 random integers. Create a list of 5,000 'blacklist' integers. Filter the main list to remove blacklisted integers using a set for O(1) lookups. Print the final length."),
]

INTERVIEWS = [
    "Write a function `has_duplicates(lst)` that returns True if a list contains duplicates, using sets. Do it in one line.",
    "Write a function `missing_numbers(lst, n)` that finds all missing numbers from `1` to `n` in a list. Use sets.",
    "Write a function `intersection_multiple(*sets)` that returns the intersection of an arbitrary number of sets.",
    "Write a function `symmetric_diff_multiple(*sets)` that finds elements present in exactly one of the sets.",
    "Write a function `is_pangram(text)` that checks if a string contains every letter of the alphabet using sets.",
    "Given two lists of dictionaries, find the symmetric difference based on a specific key (e.g., 'id').",
    "Write a function `remove_duplicates_preserve_order(lst)` without using external libraries, but using a set for O(1) lookups.",
    "Implement the Jaccard similarity index for two lists of items. Handle empty sets gracefully.",
    "Write a function that takes a string and returns the length of the longest substring without repeating characters (sliding window + set).",
    "Write a function `find_pairs_sum(lst, target)` that finds all unique pairs that sum to target, using a set for O(n) time.",
    "Write a function `find_common_chars(words)` that returns a list of characters present in all words in a list.",
    "Write code to flatten a list of sets into a single set: `[{1,2}, {2,3}, {3,4}]` -> `{1,2,3,4}`.",
    "Explain the difference between `s.remove(x)` and `s.discard(x)`. Write a wrapper function `safe_remove(s, x)` that mimics discard using remove.",
    "Write a function `is_anagram_set_trap(s1, s2)` that shows why `set(s1) == set(s2)` is NOT a valid way to check for anagrams.",
    "Create a dictionary acting as an undirected graph, where edges are represented by frozensets. `frozenset([A, B]): weight`.",
    "Given a list of lists, deduplicate the inner lists. `[[1,2], [2,1], [3,4]]` -> `[[1,2], [3,4]]`. Use frozensets.",
    "Write a function `group_identical(lst)` that groups identical dictionaries in a list using frozensets of their items.",
    "Write a function `set_from_generator(n)` that creates a set of the first `n` prime numbers using a generator expression inside `set()`.",
    "Explain why `{[]}` raises a TypeError but `{()}` does not. Write code demonstrating this hashability concept.",
    "Write a function `longest_consecutive_sequence(nums)` that runs in O(n) time using a set.",
    "Write a function to find the elements that appear exactly once in an array where every other element appears twice. (Can use XOR or sets).",
    "Write a function `word_break(s, word_dict)` that checks if a string can be segmented into words from a dictionary. Convert dict to set.",
    "Write a function `is_bipartite(graph)` using two sets to color nodes and detect odd-length cycles.",
    "Implement a custom `MySet` class wrapping a dictionary to demonstrate how sets work under the hood.",
    "Write a function `count_unique_vowels(word)` using set intersection with `{'a','e','i','o','u'}`.",
]

SUMMARY = (
    "| # | Topic | Key Takeaway | Professional Application |\n"
    "|---|-------|-------------|-------------------------|\n"
    "| 1 | Creation | `set()`, `{1, 2}`. Mutable, unordered. | Data deduplication |\n"
    "| 2 | Operations | Union `|`, Intersection `&`, Difference `-` | Cohort and overlap analysis |\n"
    "| 3 | Methods | `add`, `discard` (safe), `remove` (unsafe) | Incremental processing |\n"
    "| 4 | Relations | `issubset <=`, `issuperset >=` | Data validation, permissions |\n"
    "| 5 | Frozen Sets | Immutable, hashable sets | Sets of sets, Dict keys |\n"
    "| 6 | Performance | O(1) membership testing (`in`) | Massive optimization over lists |\n"
)

CHECKLIST = (
    "- [ ] I understand that sets are unordered and cannot be accessed by index.\n"
    "- [ ] I know how to deduplicate a list instantly using `set()`.\n"
    "- [ ] I can perform union, intersection, and difference operations.\n"
    "- [ ] I understand the difference between `.remove()` and `.discard()`.\n"
    "- [ ] I know when to use a `frozenset` (dict keys, sets of sets).\n"
    "- [ ] I understand why `in set` is exponentially faster than `in list`.\n"
    "- [ ] I have completed all 5 practice tasks.\n"
    "- [ ] I have reviewed all 25 interview questions."
)

if __name__ == '__main__':
    all_sections = sections_1_to_3() + sections_4_to_6()
    nb = build(
        day=6, title="Sets",
        obj_text="Sets are the secret weapon of efficient Python code. While lists are for sequences, sets are for membership and uniqueness. Today we master set theory operations and discover how switching from a list to a set can speed up your data processing pipelines by 1000x.",
        obj_table=(
            "| # | Topic | Key Concept | Core Use Case |\n"
            "|---|-------|-------------|---------------|\n"
            "| 1 | Creation | Unordered, unique, `{}` or `set()` | Deduplication |\n"
            "| 2 | Operations | `\\|`, `&`, `-`, `^` | Cohort Analysis |\n"
            "| 3 | Methods | `add()`, `discard()` | Dynamic updating |\n"
            "| 4 | Relations | `A <= B`, `issubset()` | Validation |\n"
            "| 5 | Frozen Sets | `frozenset()`, immutable | Dict keys, sets of sets |\n"
            "| 6 | Performance | O(1) vs O(N) | Pipeline optimization |\n"
        ),
        sections=all_sections,
        tasks=TASKS, interviews=INTERVIEWS,
        summary=SUMMARY, checklist=CHECKLIST,
        next_up="Day 7 - Dictionaries: Key-Value Mappings, Iteration, and Data Structures"
    )
    save(nb, os.path.join('notebooks', 'Day06_Sets_Blank.ipynb'))
    print("Day 06 generated successfully!")
