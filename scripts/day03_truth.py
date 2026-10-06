"""Day 03 practice questions: reference solutions + computed ground-truth values.

Grading a learner against a guessed value is worse than not grading at all, so
every `validation.checkVars` value below is produced by executing the reference
solution and reading the actual result.
"""
import json

# (key, starterCode, ref, [vars to report])
QUESTIONS = [
    ("q1",
     'language = "Python"\n\n'
     '# TODO: store the first character in `first`\nfirst = None\n\n'
     '# TODO: store the last character in `last`\nlast = None\n\n'
     '# TODO: store the length in `size`\nsize = None\n\n'
     'print(first, last, size)\n',
     'language = "Python"\n\n'
     'first = language[0]\n'
     'last  = language[-1]\n'
     'size  = len(language)\n\n'
     'print(first, last, size)\n',
     ['first', 'last', 'size']),

    ("q2",
     'language = "Python"\n\n'
     '# TODO: store the reversed string in `reversed_text`\nreversed_text = None\n\n'
     '# TODO: store every second character in `every_second`\nevery_second = None\n\n'
     '# TODO: store the last three characters in `tail`\ntail = None\n\n'
     'print(reversed_text, every_second, tail)\n',
     'language = "Python"\n\n'
     'reversed_text = language[::-1]\n'
     'every_second  = language[::2]\n'
     'tail          = language[-3:]\n\n'
     'print(reversed_text, every_second, tail)\n',
     ['reversed_text', 'every_second', 'tail']),

    ("q3",
     'report = "  Monthly Revenue Report  "\n\n'
     '# TODO: store the trimmed text in `cleaned`\ncleaned = None\n\n'
     '# TODO: store the word count (an int) in `word_count`\nword_count = None\n\n'
     '# TODO: store the text in title case in `title`\ntitle = None\n\n'
     '# TODO: upper-case `report` IN PLACE by assigning the result back\nreport = None\n\n'
     'print(repr(cleaned), word_count, title, report)\n',
     'report = "  Monthly Revenue Report  "\n\n'
     'cleaned    = report.strip()\n'
     'word_count = len(cleaned.split())\n'
     'title      = cleaned.title()\n'
     'report     = report.upper()   # strings are immutable: assign the result back\n\n'
     'print(repr(cleaned), word_count, title, report)\n',
     ['cleaned', 'word_count', 'title', 'report']),

    ("q4",
     'raw = "Alice,Bob,Charlie"\n\n'
     '# TODO: split on the comma into `parts`\nparts = None\n\n'
     '# TODO: store each name trimmed, in `names`\nnames = None\n\n'
     '# TODO: join `names` back with "; " into `joined`\njoined = None\n\n'
     '# TODO: store the number of names in `count`\ncount = None\n\n'
     'print(parts, names, joined, count)\n',
     'raw = "Alice,Bob,Charlie"\n\n'
     'parts  = raw.split(",")\n'
     'names  = [p.strip() for p in parts]\n'
     'joined = "; ".join(names)\n'
     'count  = len(names)\n\n'
     'print(parts, names, joined, count)\n',
     ['parts', 'names', 'joined', 'count']),

    ("q5",
     'product = "Widget"\nprice = 249.5\nqty = 4\n\n'
     '# TODO: f-string into `label`: "Widget x4 @ 249.50 each"\nlabel = None\n\n'
     '# TODO: f-string into `total`: "Total: 998.00"\ntotal = None\n\n'
     '# TODO: f-string into `code` padding 42 to 5 digits: "00042"\ncode = None\n\n'
     'print(label, total, code)\n',
     'product = "Widget"\nprice = 249.5\nqty = 4\n\n'
     'label = f"{product} x{qty} @ {price:.2f} each"\n'
     'total = f"Total: {price * qty:.2f}"\n'
     'code  = f"{42:05d}"\n\n'
     'print(label, total, code)\n',
     ['label', 'total', 'code']),

    ("q6",
     'path = "report_q3.csv"\n\n'
     '# TODO: store the extension (without the dot) in `ext`\next = None\n\n'
     '# TODO: store the stem (name without the extension) in `stem`\nstem = None\n\n'
     '# TODO: store the upper-cased filename in `upper`\nupper = None\n\n'
     '# TODO: store True in `is_csv` if the path ends with .csv\nis_csv = None\n\n'
     'print(ext, stem, upper, is_csv)\n',
     'path = "report_q3.csv"\n\n'
     'stem   = path.removesuffix(".csv")\n'
     'ext    = path.split(".")[-1]\n'
     'upper  = path.upper()\n'
     'is_csv = path.endswith(".csv")\n\n'
     'print(ext, stem, upper, is_csv)\n',
     ['ext', 'stem', 'upper', 'is_csv']),

    ("q7",
     'samples = [" 12A ", "BC", " 7 7 ", "3.5"]\n\n'
     '# TODO: list `digits` of the samples that are alphanumeric only\ndigits = None\n\n'
     '# TODO: list `clean` of each sample stripped and lowercased\nclean = None\n\n'
     '# TODO: store in `alpha_count` how many samples are alphabetic\nalpha_count = None\n\n'
     'print(digits, clean, alpha_count)\n',
     'samples = [" 12A ", "BC", " 7 7 ", "3.5"]\n\n'
     'digits      = [s for s in samples if s.isalnum()]\n'
     'clean       = [s.strip().lower() for s in samples]\n'
     'alpha_count = sum(1 for s in samples if s.isalpha())\n\n'
     'print(digits, clean, alpha_count)\n',
     ['digits', 'clean', 'alpha_count']),

    ("q8",
     'nums = [1, 2, 3, 4, 5]\n\n'
     '# TODO: join `nums` with ", " into `csv_line`\ncsv_line = None\n\n'
     '# TODO: store the length of `csv_line` in `line_len`\nline_len = None\n\n'
     '# TODO: store "1,2,3,4,5" (no spaces) in `tight`\ntight = None\n\n'
     'print(csv_line, line_len, tight)\n',
     'nums = [1, 2, 3, 4, 5]\n\n'
     'csv_line = ", ".join(map(str, nums))   # join needs strings\n'
     'line_len = len(csv_line)\n'
     'tight    = "".join(str(n) for n in nums)\n\n'
     'print(csv_line, line_len, tight)\n',
     ['csv_line', 'line_len', 'tight']),

    ("q9",
     'word = "level"\n\n'
     '# TODO: store True in `is_palindrome`\nis_palindrome = None\n\n'
     '# TODO: True in `is_same_ignoring_case` comparing "LEVEL" to `word`\nis_same_ignoring_case = None\n\n'
     '# TODO: build the letter frequency dict for `word` in `freq`\nfreq = None\n\n'
     'print(is_palindrome, is_same_ignoring_case, freq)\n',
     'word = "level"\n\n'
     'is_palindrome        = word == word[::-1]\n'
     'is_same_ignoring_case = word.casefold() == "LEVEL".casefold()\n\n'
     'freq = {}\n'
     'for ch in word:\n'
     '    freq[ch] = freq.get(ch, 0) + 1\n\n'
     'print(is_palindrome, is_same_ignoring_case, freq)\n',
     ['is_palindrome', 'is_same_ignoring_case', 'freq']),

    ("q10",
     'card = "4111111111111237"\n\n'
     '# TODO: store the first 12 digits replaced by * in `masked`\nmasked = None\n\n'
     '# TODO: store the last 4 digits in `last4`\nlast4 = None\n\n'
     '# TODO: store a string of 12 asterisks in `block`\nblock = None\n\n'
     '# TODO: store True in `has_dash` if the string contains a dash\nhas_dash = None\n\n'
     'print(masked, last4, block, has_dash)\n',
     'card = "4111111111111237"\n\n'
     'masked   = "*" * 12 + card[-4:]\n'
     'last4    = card[-4:]\n'
     'block    = "*" * 12\n'
     'has_dash = "-" in card\n\n'
     'print(masked, last4, block, has_dash)\n',
     ['masked', 'last4', 'block', 'has_dash']),

    ("q11",
     "raw = 'they\\'re the \"best\" analysts'\n\n"
     '# TODO: split on the double-quoted section into `words`\nwords = None\n\n'
     '# TODO: count the double-quote characters in `quote_count`\nquote_count = None\n\n'
     "# TODO: store the text with apostrophes removed in `stripped`\nstripped = None\n\n"
     '# TODO: store the title-cased text in `titled`\ntitled = None\n\n'
     'print(words, quote_count, stripped, titled)\n',
     "raw = 'they\\'re the \"best\" analysts'\n\n"
     'words       = raw.split(\'"\')[1::2]\n'
     'quote_count = raw.count(\'"\')\n'
     "stripped    = raw.replace(\"'\", '')\n"
     'titled      = raw.title()\n\n'
     'print(words, quote_count, stripped, titled)\n',
     ['words', 'quote_count', 'stripped', 'titled']),

    ("q12",
     's = "the quick brown fox jumps"\n\n'
     '# TODO: store the word count in `n`\nn = None\n\n'
     '# TODO: join the first letter of each word in `initials`\ninitials = None\n\n'
     '# TODO: store the longest word in `longest`\nlongest = None\n\n'
     '# TODO: store True in `has_the` if "the" appears as a whole word\nhas_the = None\n\n'
     'print(n, initials, longest, has_the)\n',
     's = "the quick brown fox jumps"\n\n'
     'words    = s.split()\n'
     'n        = len(words)\n'
     'initials = "".join(w[0] for w in words)\n'
     'longest  = max(words, key=len)\n'
     'has_the  = "the" in words\n\n'
     'print(n, initials, longest, has_the)\n',
     ['n', 'initials', 'longest', 'has_the']),

    ("q13",
     'code = "A3F9Z2"\n\n'
     '# TODO: store True in `all_upper` if every cased letter is uppercase\nall_upper = None\n\n'
     '# TODO: store True in `all_alnum` if it is letters and digits only\nall_alnum = None\n\n'
     '# TODO: store True in `is_identifier` if it is a valid identifier\nis_identifier = None\n\n'
     '# TODO: store the length in `size`\nsize = None\n\n'
     'print(all_upper, all_alnum, is_identifier, size)\n',
     'code = "A3F9Z2"\n\n'
     'all_upper     = code.isupper()\n'
     'all_alnum     = code.isalnum()\n'
     'is_identifier = code.isidentifier()\n'
     'size          = len(code)\n\n'
     'print(all_upper, all_alnum, is_identifier, size)\n',
     ['all_upper', 'all_alnum', 'is_identifier', 'size']),

    ("q14",
     'msg = "Attack at Dawn"\n\n'
     '# TODO: store the lower-cased message in `lower_msg`\nlower_msg = None\n\n'
     '# TODO: store True in `starts_a` if it starts with "attack"\nstarts_a = None\n\n'
     '# TODO: store the index of the first "a" in `lower_msg` in `first_a`\nfirst_a = None\n\n'
     '# TODO: store the message with spaces replaced by "_" in `slug`\nslug = None\n\n'
     'print(lower_msg, starts_a, first_a, slug)\n',
     'msg = "Attack at Dawn"\n\n'
     'lower_msg = msg.lower()\n'
     'starts_a  = lower_msg.startswith("attack")\n'
     'first_a   = lower_msg.find("a")\n'
     'slug      = msg.replace(" ", "_")\n\n'
     'print(lower_msg, starts_a, first_a, slug)\n',
     ['lower_msg', 'starts_a', 'first_a', 'slug']),

    ("q15",
     'secret = "data science"\n\n'
     '# TODO: store the reversed secret in `backwards`\nbackwards = None\n\n'
     '# TODO: store True in `has_space`\nhas_space = None\n\n'
     '# TODO: store the sentence-cased secret in `sentence`\nsentence = None\n\n'
     "# TODO: store True in `is_clean` if it has no leading/trailing whitespace\nis_clean = None\n\n"
     'print(backwards, has_space, sentence, is_clean)\n',
     'secret = "data science"\n\n'
     'backwards = secret[::-1]\n'
     'has_space = " " in secret\n'
     'sentence  = secret.capitalize()\n'
     'is_clean  = secret == secret.strip()\n\n'
     'print(backwards, has_space, sentence, is_clean)\n',
     ['backwards', 'has_space', 'sentence', 'is_clean']),
]

SKIP = {"print", "str", "int", "float", "len", "range", "max", "min", "sum", "sorted", "list", "dict"}


def run(code):
    g = {}
    exec(code, g)
    return {k: v for k, v in g.items() if not k.startswith("__") and k not in SKIP and not callable(v)}


out = {}
for key, starter, ref, wanted in QUESTIONS:
    try:
        vals = run(ref)
    except Exception as e:
        print("--- %s --- EXEC ERROR: %s" % (key, e))
        print(ref)
        continue
    out[key] = {k: vals.get(k) for k in wanted}
    print("--- %s ---" % key)
    for k in wanted:
        print("    %-22s %r" % (k, vals.get(k)))
    print()

json.dump(out, open("C:/Users/deepa/AppData/Local/Temp/kilo/day03_truth.json", "w"), indent=2, default=str)
print("wrote ground truth for %d questions" % len(out))