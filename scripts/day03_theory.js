'use strict';

/** Day 03 source. The parent assembler owns bundles and audio availability. */
const { PLAY } = require('./day_notes_dsl.js');
const esc = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const c = value => `<code>${esc(value)}</code>`;
const p = text => `<p>${text}</p>`;
const note = (title, text) => `<aside class="cd-note"><strong>${title}</strong>${p(text)}</aside>`;
const details = (title, body, kind = 'advanced') => `<details class="cd-details cd-${kind}"><summary>${title}</summary><div class="cd-details-body">${body}</div></details>`;
const recall = (question, answer) => details(`<span class="cd-detail-label">Recall</span> ${question}`, p(answer), 'recall');

// Escape code and output separately, preserving indentation and literal pipes.
function example(title, source, output, error = '') {
  return `<figure class="cd-example${error ? ' cd-example-error' : ''}" data-example${error ? ` data-error="${error}"` : ''}>
    <figcaption>${esc(title)}<span>${error ? 'Intentional failure' : 'Python'}</span></figcaption>
    <pre class="cd-code course-code" tabindex="0" aria-label="${esc(title)} code"><code>${esc(source)}</code></pre>
    <div class="cd-output"><span class="cd-output-label">${error ? 'Expected exception' : 'Output'}</span><pre>${esc(output)}</pre></div>
  </figure>`;
}
function table(id, title, headers, rows) {
  return `<div class="cd-table-scroll" role="region" aria-label="${esc(title)}" tabindex="0"><table id="${id}">
    <caption>${title}</caption><thead><tr>${headers.map(h => `<th scope="col">${h}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(row => `<tr>${row.map((cell, i) => i ? `<td>${cell}</td>` : `<th scope="row">${cell}</th>`).join('')}</tr>`).join('\n')}</tbody>
  </table></div>`;
}
function heading(tag, id, number, title, audio) {
  // Preserve the engine's onclick contract and the established audio location.
  const button = audio ? `<button type="button" class="audio-play-btn" onclick="playAudio('Day03/${audio}', this)" title="Play narration" aria-label="Narration: ${esc(title)}" data-audio-src="Day03/${audio}">${PLAY}</button>` : '';
  return `<${tag} class="slide-section-title heading-box-wrap heading-with-audio" id="${id}"><span class="heading-num-box">${number}</span><span class="heading-title-box"><span class="heading-title-text">${title}</span>${button}</span></${tag}>`;
}
function buildTrackMap() {
  return [
    ['Fundamentals', 'Fundamentals'],
    ['Escapes', 'Escape Sequences and Raw Strings'],
    ['Concat', 'Concatenation, Repetition and Comparison'],
    ['Slicing', 'Indexing and Slicing'],
    ['Formatting', 'String Formatting'],
    ['Methods', 'String Methods'],
    ['Validation', 'Validation Methods Compared']
  ].map(([key, title], i) => ({
    key, section: `day03${key}Section`, table: `day03${key}TableSection`, code: `day03${key}CodeSection`, title,
    audio: [1, 2, 3].map(offset => `New_PyDay03Audio${String(i * 3 + offset).padStart(2, '0')}.mp3`)
  }));
}
const TRACK_MAP = buildTrackMap();
const headingKeys = ['Basics', 'Escapes', 'Concat', 'Slicing', 'Formatting', 'Methods', 'Validation'];
const SECTIONS = TRACK_MAP.map((track, i) => ({ id: track.section, title: track.title, number: i + 1 }));
SECTIONS.push({ id: 'day03MistakesSection', title: 'Errors and recall', number: 8 });
function section(topic, part, title, body) {
  const track = TRACK_MAP[topic - 1];
  const suffix = ['', 'Table', 'Code'][part];
  return `<section class="${part ? 'topic-subcard' : 'slide-section'} cd-section" id="${track[['section', 'table', 'code'][part]]}">
    ${heading(part ? 'h3' : 'h2', `headingStrings${headingKeys[topic - 1]}${suffix}`, `${String(topic).padStart(2, '0')}${['', 'a', 'b'][part]}`, title, track.audio[part])}
    ${body}
  </section>`;
}

const fundamentals = [
  section(1, 0, 'Fundamentals',
    p('Day 01 introduced values and names; Day 02 introduced operators. Now apply both to text: read a label, extract part of it, clean it, and produce a useful report.') +
    p('A Python string, '+c('str')+', is an ordered, immutable sequence of Unicode code points. For plain English text, each position is usually one visible character. Quotes mark a string literal in your code; they are not part of the stored text.') +
    example('Quotes create text', String.raw`name = 'Maya'
message = "It's ready"
lines = """First line
Second line"""
print(name)
print(message)
print(lines)
print(len("A B"))
print(type("7").__name__)`, 'Maya\nIt\'s ready\nFirst line\nSecond line\n3\nstr') +
    p('Single and double quotes create the same type. Triple quotes allow literal line breaks, and any indentation inside them becomes text. '+c('len()')+' counts code points, including spaces and newlines. '+c('type(value).__name__')+' displays the type name. One letter is still a string; Python has no separate character type.') +
    note('Empty is different from blank', c('""')+' has length 0; '+c('" "')+' has length 1. An empty string is false in a Boolean context, while a space and even '+c('"False"')+' are true.')),
  section(1, 1, 'Text, numbers and sequences',
    table('day03TypeTable', 'Choose the type for the job', ['Expression', 'Result', 'Meaning'], [
      [c('"42" + "1"'), c('"421"'), 'Join two pieces of text.'],
      [c('int("42") + 1'), c('43'), 'Convert valid integer text before arithmetic.'],
      [c('str(42) + "1"'), c('"421"'), 'Convert a number to text before joining.'],
      [c('len("0042")'), c('4'), 'Leading zeroes belong to the text.'],
      [c('"th" in "Python"'), c('True'), 'Test for a consecutive substring.']
    ]) +
    p('Keep identifiers such as postal codes or account labels as text when leading zeroes matter. Conversion to '+c('int')+' discards that representation.') +
    example('Make a deliberate conversion', String.raw`code = "0042"
print(code)
print(int(code))
print(str(int(code)))
print(bool(""), bool(" "), bool("False"))`, '0042\n42\n42\nFalse True True') +
    details('Further reading: code points and visible characters',
      p('A Unicode code point is a numbered text element. A visible symbol can contain several: an accented letter may be a letter followed by a combining accent. Length, indexing and slicing operate on code points, not on visible character clusters or encoded bytes.') +
      example('Two spellings of an accented letter', String.raw`print(len("\u00e9"))
print(len("e\u0301"))
print("\u00e9" == "e\u0301")`, '1\n2\nFalse') +
      p('These strings can look identical but compare unequal. Unicode normalization is introduced in the optional validation section.'))),
  section(1, 2, 'Immutability: keep the returned value',
    p('A method is an operation attached to a value: '+c('text.upper()')+' returns uppercase text. It cannot change the existing string. Assign its result to a name, pass it to another operation, or print it directly.') +
    example('The original value remains available', String.raw`original = "python"
alias = original
upper = original.upper()
print(original)
print(upper)
original = upper
print(original)
print(alias)`, 'python\nPYTHON\nPYTHON\npython') +
    `<figure class="cd-diagram"><figcaption>Reassignment changes a name's value</figcaption><div class="cd-binding"><div><span>Before</span><p><code>original</code> &rarr; <code>"python"</code><br><code>alias</code> &rarr; <code>"python"</code></p></div><div><span>After <code>original = upper</code></span><p><code>original</code> &rarr; <code>"PYTHON"</code><br><code>alias</code> &rarr; <code>"python"</code></p></div></div></figure>` +
    p('Reassignment is allowed; replacing a character inside an existing string is not. You will learn how to build a replacement with slicing in section 04.') +
    recall('What happens after '+c('label.upper()')+'?', 'The returned value contains uppercase text. The name '+c('label')+' still refers to its original value unless you assign the result back. Immutability is about the value, not whether a name can be reassigned.'))
].join('\n');

const escapes = [
  section(2, 0, 'Escapes, raw strings and repr',
    p('An escape sequence describes a character that is awkward to type in a literal. Python interprets recognized escapes while reading the literal. For example, '+c('\\n')+' becomes one newline; '+c('\\\\')+' becomes one backslash.') +
    example('Rendered text versus its representation', String.raw`text = "A\nB"
print(text)
print(repr(text))
print(len(text))`, String.raw`A
B
'A\nB'
3`) +
    p(c('print(text)')+' shows the text. '+c('repr(text)')+' returns a diagnostic representation with quotes and escaped control characters, so hidden spaces, tabs and line breaks are easier to inspect.') +
    note('Literal syntax is not runtime input', 'Escapes are interpreted in Python source literals. Text read from a file or typed into '+c('input()')+' is not automatically reinterpreted as Python escape syntax.')),
  section(2, 1, 'Escape sequence reference',
    table('day03EscapesTable', 'One spelling, one meaning', ['In a literal', 'Stored character', 'Example'], [
      [c('\\n'), 'Newline', c('"a\\nb"')],
      [c('\\t'), 'Tab (one code point; display width varies)', c('"name\\tvalue"')],
      [c('\\\\'), 'Backslash', c('"C:\\\\temp"')],
      [c("\\'"), 'Single quote', c("'It\\'s ready'")],
      [c('\\"'), 'Double quote', c('"Say \\"hi\\""')],
      [c('\\r'), 'Carriage return', 'Often paired with a newline in files.'],
      [c('\\u0041'), 'Unicode code point U+0041', c('"A"')],
      [c('\\x41'), 'Code point U+0041 in a str literal', c('"A"')]
    ]) +
    p('Choose the other quote style when it keeps text readable: '+c('"It\'s ready"')+' needs no escape. Avoid unrecognized escape spellings; use a raw literal or double the backslash when the backslash itself is intended.')),
  section(2, 2, 'Raw strings preserve backslashes',
    p('The '+c('r')+' prefix changes how a literal is read. The result is still an ordinary '+c('str')+'. It is useful for Windows paths and, later, regular-expression patterns.') +
    example('Two ways to write the same path', String.raw`raw_path = r"C:\new\table"
escaped_path = "C:\\new\\table"
print(raw_path)
print(raw_path == escaped_path)
print(repr("C:\new"))
print(len(r"\n"), len("\n"))`, String.raw`C:\new\table
True
'C:\new'
2 1`) +
    p('In '+c('"C:\\new"')+', '+c('\\n')+' becomes a newline between the colon and '+c('ew')+'. Raw literals preserve those two characters instead. A raw literal cannot end with an odd number of backslashes because of how its closing quote is parsed.') +
    details('Optional: a path with a trailing backslash',
      example('Append one escaped backslash', String.raw`path = r"C:\temp" + "\\"
print(path)`, 'C:\\temp\\') +
      p('The invalid spelling '+c('r"C:\\temp\\"')+' fails at parsing time. It is not an executable example.')) +
    recall('How many characters are in '+c('"a\\tb"')+'?', 'Three: '+c('a')+', a tab, and '+c('b')+'. Use '+c('repr()')+' to make the tab visible as an escape.'))
].join('\n');

const operators = [
  section(3, 0, 'Combine, repeat and search',
    p(c('+')+' joins strings without adding spaces. '+c('*')+' repeats a string an integer number of times. '+c('in')+' and '+c('not in')+' test for a consecutive substring and return a Boolean.') +
    example('Text operators in a report', String.raw`name = "Maya"
print("Hello, " + name + "!")
print("ha" * 3)
print(repr("ha" * 0))
print("data" in "metadata")
print("Data" in "metadata")
print("sql" not in "python")`, "Hello, Maya!\nhahaha\n''\nTrue\nFalse\nTrue") +
    p('Membership is case-sensitive and does not recognize word boundaries: '+c('"data"')+' occurs inside '+c('"metadata"')+'. Every string contains the empty substring. A zero or negative repeat count produces an empty string.') +
    note('Both sides of + must be text', 'Use '+c('"Age: " + str(25)')+' or the f-string syntax in section 05. Adding a string and an integer raises '+c('TypeError')+'.')),
  section(3, 1, 'Comparison follows code-point order',
    p('Equality compares the complete text. Ordering compares the first differing code points; if one string is a prefix of the other, the shorter one sorts first. This is lexicographic order, not numeric or language-aware order.') +
    table('day03OrdinalTable', 'Read the first difference', ['Comparison', 'Result', 'Reason'], [
      [c('"apple" == "apple"'), c('True'), 'The text matches exactly.'],
      [c('"Z" < "a"'), c('True'), 'For these ASCII letters, 90 is less than 97.'],
      [c('"10" < "2"'), c('True'), 'The first characters are 1 and 2.'],
      [c('"cat" < "catalog"'), c('True'), 'The shorter string is a prefix.'],
      [c('"Python" == "python"'), c('False'), 'Case is significant.']
    ]) +
    example('Inspect and normalize comparisons', String.raw`print(ord("Z"), ord("a"))
print(chr(65))
print("Python".casefold() == "PYTHON".casefold())
print("Stra\u00dfe".casefold() == "STRASSE".casefold())`, '90 97\nA\nTrue\nTrue') +
    p(c('ord()')+' returns the code point of one character; '+c('chr()')+' does the reverse. '+c('casefold()')+' supports Unicode caseless comparison and can expand characters. It does not provide locale-aware sorting. Use '+c('==')+', not '+c('is')+', to compare text values.')),
  section(3, 2, 'Join pieces with a separator',
    p('A list is an ordered collection written with square brackets. Here it holds text pieces. Call '+c('join()')+' on the separator; it places that separator between consecutive pieces. Every piece must be a string.') +
    example('The separator controls the result', String.raw`parts = ["North", "Sales", "2026"]
print(" / ".join(parts))
print("".join(parts))
print(", ".join(["Age", str(25)]))
print(repr("-".join([])))`, "North / Sales / 2026\nNorthSales2026\nAge, 25\n''") +
    p('Use '+c('+')+' for a few known pieces. Use '+c('join()')+' when combining a collection: it avoids relying on repeated concatenation, which may repeatedly copy growing text.') +
    recall('Where does the separator go in '+c('"-".join(["a", "b"])')+'?', 'Only between the pieces: '+c('"a-b"')+'. It adds no leading or trailing separator.'))
].join('\n');

const ribbon = `<figure class="cd-diagram cd-index-diagram"><figcaption>Trace <code>word[1:4]</code> in <code>"Python"</code></figcaption>
  <div class="cd-index-ribbon" role="img" aria-label="Python has indexes 0 through 5 and negative indexes -6 through -1. Slice 1:4 includes y, t and h; it excludes o at index 4.">
    <div class="cd-index-labels"><span>Index</span><span>Text</span><span>From end</span></div>
    ${[...'Python'].map((char, i) => `<div class="cd-index-cell${i >= 1 && i < 4 ? ' cd-index-selected' : ''}${i === 4 ? ' cd-index-stop' : ''}"><span>${i}</span><strong>${char}</strong><span>${i - 6}</span></div>`).join('')}
  </div><p class="cd-diagram-key"><span>Selected: 1, 2, 3</span><span>Stop before 4</span><strong>Result: <code>"yth"</code></strong></p></figure>`;
const slicing = [
  section(4, 0, 'Indexing and slicing',
    p('An index selects one position. Counting starts at '+c('0')+'; negative indexes count from the end, where '+c('-1')+' selects the last code point. A slice selects a range using '+c('text[start:stop:step]')+'.') +
    ribbon +
    example('One character or a range', String.raw`word = "Python"
print(word[0])
print(word[-1])
print(word[1:4])
print(word[-3:])`, 'P\nn\nyth\nhon') +
    note('Start in, stop out', 'For a positive step, select positions starting at '+c('start')+' and stop before '+c('stop')+'. Negative indexes name positions in the same string; they do not reverse it.')),
  section(4, 1, 'Slice boundaries and defaults',
    table('day03SliceTable', 'Given word = "Python"', ['Expression', 'Result', 'Positions selected'], [
      [c('word[:3]'), c('"Pyt"'), '0, 1, 2'],
      [c('word[3:]'), c('"hon"'), '3, 4, 5'],
      [c('word[:]'), c('"Python"'), 'All positions'],
      [c('word[::2]'), c('"Pto"'), '0, 2, 4'],
      [c('word[1:5:2]'), c('"yh"'), '1, 3'],
      [c('word[2:100]'), c('"thon"'), '2 through the end; the stop is clipped'],
      [c('word[4:1]'), c('""'), 'None: a positive step cannot reach backward'],
      [c('word[::-1]'), c('"nohtyP"'), '5, 4, 3, 2, 1, 0']
    ]) +
    p('With a positive step, omitted start and stop mean the beginning and the end. A negative step reverses direction and changes those defaults. A step of zero is invalid. Out-of-range slice bounds are clipped, while an out-of-range single index raises '+c('IndexError')+'.') +
    details('Optional: why an omitted reverse stop matters',
      p('For a negative step, an omitted stop lets the slice reach index 0. An explicit '+c('-1')+' means the last character, not a position before the beginning.') +
      example('Reverse slices still exclude the stop', String.raw`word = "Python"
print(word[4:1:-1])
print(word[::-1])
print(repr(word[:-1:-1]))`, "oht\nnohtyP\n''"))),
  section(4, 2, 'Extract and rebuild text',
    example('Read a fixed-format identifier', String.raw`record = "INV-2026-0042"
print(record[:3])
print(record[4:8])
print(record[-4:])
word = "python"
updated = "P" + word[1:]
print(updated)
print(word)`, 'INV\n2026\n0042\nPython\npython') +
    p('Slicing is useful when the format has known positions. For variable-length fields separated by punctuation, use '+c('split()')+' or '+c('partition()')+' from section 06. Rebuilding '+c('updated')+' leaves '+c('word')+' unchanged.') +
    note('An empty string has no first character', c('""[:1]')+' safely returns '+c('""')+', but '+c('""[0]')+' raises '+c('IndexError')+'. Reversing by slicing reverses code points; it can break a multi-code-point visible symbol.') +
    recall('Predict '+c('"Python"[1:5:2]')+'.', 'It selects indexes 1 and 3, producing '+c('"yh"')+'. Start at 1, move forward by 2, and stop before 5.'))
].join('\n');

const formatting = [
  section(5, 0, 'Formatting text with values',
    p('An f-string starts with '+c('f')+'. Expressions inside braces are evaluated and inserted into the text. It is a readable default for assembling messages from known values.') +
    example('Build a report line', String.raw`name = "Maya"
count = 3
price = 12.5
print(f"{name}: {count} items")
print(f"Total: {count * price:.2f}")
print(f"Literal braces: {{ready}}")`, 'Maya: 3 items\nTotal: 37.50\nLiteral braces: {ready}') +
    p('The colon introduces a format specification. '+c('.2f')+' displays two digits after the decimal point. Double braces, '+c('{{')+' and '+c('}}')+', insert literal braces.') +
    note('Formatting creates text', 'Formatting changes presentation. It does not change the stored number or make binary floating-point arithmetic exact.')),
  section(5, 1, 'Precision, width and alignment',
    table('day03FormatTable', 'Read a format specification', ['Specification', 'Example', 'Rendered text'], [
      [c('.2f'), c('f"{3.14159:.2f}"'), c('3.14')],
      [c(',d'), c('f"{1234567:,d}"'), c('1,234,567')],
      [c('05d'), c('f"{42:05d}"'), c('00042')],
      [c('.1%'), c('f"{0.256:.1%}"'), c('25.6%')],
      [c('>6'), c('f"|{\'hi\':>6}|"'), c('|    hi|')],
      [c('<6'), c('f"|{\'hi\':<6}|"'), c('|hi    |')],
      [c('^6'), c('f"|{\'hi\':^6}|"'), c('|  hi  |')]
    ]) +
    p('Width is a minimum, not a truncation limit. Alignment adds spaces when needed. '+c('d')+' expects an integer; '+c('f')+' formats a number in fixed-point form; '+c('%')+' scales by 100 for display and adds a percent sign.') +
    example('Formatting leaves the number unchanged', String.raw`price = 3.14159
print(f"{price:.2f}")
print(price)
print(f"|{'longer':>3}|")`, '3.14\n3.14159\n|longer|')),
  section(5, 2, 'Formatting in existing code',
    p('You will also encounter '+c('str.format()')+' and percent formatting. Learn to recognize them; f-strings keep simple expressions close to their text.') +
    example('Three styles, the same result', String.raw`name = "Maya"
score = 91
print(f"{name}: {score}")
print("{}: {}".format(name, score))
print("%s: %d" % (name, score))`, 'Maya: 91\nMaya: 91\nMaya: 91') +
    details('Optional: reusable templates and diagnostic representations',
      p('Named format fields let a template receive values later. In an f-string, '+c('!r')+' applies '+c('repr()')+' before formatting, making spaces and control characters visible.') +
      example('A named template', String.raw`template = "{name}: {score:.1f}"
print(template.format(name="Maya", score=91.25))
label = " A\n"
print(f"label={label!r}")`, String.raw`Maya: 91.2
label=' A\n'`)) +
    recall('Does '+c('f"{0.25:.0%}"')+' change the value to 25?', 'No. It produces the string '+c('"25%"')+'. The original numeric value remains 0.25.'))
].join('\n');

const pipeline = `<figure class="cd-diagram"><figcaption>A cleaning pipeline with visible intermediate values</figcaption><ol class="cd-pipeline">
  <li><span>Source</span><code>"  DATA   Analyst  "</code></li>
  <li><span>Split whitespace</span><code>["DATA", "Analyst"]</code></li>
  <li><span>Join with one space</span><code>"DATA Analyst"</code></li>
  <li><span>Normalize case</span><code>"data analyst"</code></li>
</ol></figure>`;
const methods = [
  section(6, 0, 'String methods: choose the operation',
    p('Methods read the string and return a result. Some return strings, some return numbers or Booleans, and '+c('split()')+' returns a list. None changes the original string in place.') +
    example('Case, edges and replacements', String.raw`raw = "  Data Analyst  "
print(repr(raw.strip()))
print(raw.strip().lower())
print(raw.strip().upper())
print("red red red".replace("red", "blue", 1))
print(repr(raw))`, "'Data Analyst'\ndata analyst\nDATA ANALYST\nblue red red\n'  Data Analyst  '") +
    p('A chain runs left to right: '+c('raw.strip().lower()')+' calls '+c('lower()')+' on the result of '+c('strip()')+'. '+c('lstrip()')+' trims the left edge; '+c('rstrip()')+' trims the right. The optional third argument to '+c('replace()')+' limits the number of replacements.') +
    note('Trimming is not substring removal', c('strip("abc")')+' removes any a, b or c repeatedly from both ends. It does not remove the exact word '+c('"abc"')+'. Use '+c('removeprefix()')+' or '+c('removesuffix()')+' for exact edge text (Python 3.9+).')),
  section(6, 1, 'Methods by the question they answer',
    table('day03MethodsTable', 'A working method reference', ['Goal', 'Method', 'Important behavior'], [
      ['Change case', c('lower(), upper(), casefold()'), 'Use casefold for caseless matching; retain original display text.'],
      ['Change word capitalization', c('capitalize(), title(), swapcase()'), 'Mechanical case rules; title() is not a reliable name formatter.'],
      ['Trim whitespace', c('strip(), lstrip(), rstrip()'), 'Only the edges; internal spaces remain.'],
      ['Remove exact edge text', c('removeprefix(), removesuffix()'), 'Remove one matching prefix or suffix.'],
      ['Check boundaries', c('startswith(), endswith()'), 'Return True or False.'],
      ['Find a position', c('find(), rfind(), index()'), 'find/rfind return -1 if missing; index raises ValueError.'],
      ['Count matches', c('count()'), 'Non-overlapping occurrences.'],
      ['Replace text', c('replace(old, new)'), 'Literal, case-sensitive substring replacement.'],
      ['Separate pieces', c('split(), rsplit(), splitlines()'), 'Return lists; rsplit starts from the right.'],
      ['Separate once', c('partition(separator)'), 'Returns before, separator, after as a three-item tuple.'],
      ['Combine pieces', c('separator.join(parts)'), 'Requires text pieces; returns a string.']
    ]) +
    example('Search without losing a match at index zero', String.raw`text = "banana"
print(text.find("ban"))
print(text.find("x"))
print("ban" in text)
print(text.count("ana"))
print(text.startswith("ban"), text.endswith("na"))`, '0\n-1\nTrue\n1\nTrue True') +
    p('Do not use '+c('find(...) > 0')+' as a presence test: it misses index 0. Testing the number directly is also misleading because 0 is false and -1 is true. Use '+c('in')+' when you only need presence.') +
    example('Whitespace splitting versus an explicit delimiter', String.raw`print("  a   b  ".split())
print("a  b".split(" "))
print("a,,b,".split(","))
print("key=value=extra".split("=", 1))
print("key=value".partition("="))
print("key".partition("="))`, "['a', 'b']\n['a', '', 'b']\n['a', '', 'b', '']\n['key', 'value=extra']\n('key', '=', 'value')\n('key', '', '')") +
    p('Without an argument, '+c('split()')+' groups whitespace and drops empty edge pieces. An explicit separator preserves empty fields. The second argument '+c('1')+' limits splitting to one match. A tuple uses parentheses to display a fixed sequence of values; no tuple manipulation is needed here.')),
  section(6, 2, 'Clean a label, one decision at a time',
    p('Suppose category labels should use a single space between words and compare without case. Keep the raw value, inspect each stage, then build a normalized comparison key.') +
    pipeline +
    example('Preserve the input and inspect each stage', String.raw`raw = "  DATA   Analyst  "
words = raw.split()
clean = " ".join(words)
key = clean.casefold()
print(repr(raw))
print(words)
print(clean)
print(key)`, "'  DATA   Analyst  '\n['DATA', 'Analyst']\nDATA Analyst\ndata analyst") +
    p('This rule also collapses tabs and line breaks. That is useful for some category labels, but would destroy meaningful layout in a poem or address. Cleaning rules belong to the data task; there is no universal rule that safely removes all punctuation or spaces.') +
    example('Exact prefixes versus sets of edge characters', String.raw`print("Arthur".strip("Ar"))
print("Arthur".removeprefix("Ar"))
print("report.csv".removesuffix(".csv"))
print("they're ready".title())`, "thu\nthur\nreport\nThey'Re Ready") +
    recall('Why use '+c('" ".join(text.split())')+'?', 'It removes outer whitespace and collapses internal whitespace runs to a single space. '+c('strip()')+' alone only trims the two ends. Preserve the original if that whitespace might matter.'))
].join('\n');

const validation = [
  section(7, 0, 'Validation starts with a rule',
    p('Validation asks whether text meets a requirement; conversion attempts to interpret it as another type. A classification method returns a Boolean, but each method answers a particular question. None is a complete email, password or real-number validator.') +
    example('Character tests are not number parsing', String.raw`print("Python".isalpha())
print("Data 3".isalnum())
print(" \t".isspace())
print("3.5".isdigit())
print("-2".isdecimal())
print(float("3.5"))
print(int("-2"))`, 'True\nFalse\nTrue\nFalse\nFalse\n3.5\n-2') +
    p(c('isalpha()')+' tests letters; '+c('isalnum()')+' tests letters or numeric characters; '+c('isspace()')+' tests whitespace. These methods recognize Unicode and require at least one character. '+c('islower()')+' and '+c('isupper()')+' require at least one cased character and ignore uncased characters such as digits.') +
    note('Empty-string exceptions', 'Many classification tests are false for '+c('""')+', but '+c('"".isascii()')+' and '+c('"".isprintable()')+' are true. State your nonempty rule explicitly instead of assuming all tests agree.')),
  section(7, 1, 'Decimal, digit and numeric are different',
    table('day03ValidationTable', 'A widening set of Unicode characters', ['Text', 'isdecimal()', 'isdigit()', 'isnumeric()'], [
      [c('"42"'), 'True', 'True', 'True'],
      [c('"\u0661\u0662"')+' (Arabic-Indic 12)', 'True', 'True', 'True'],
      [c('"\u00b2"')+' (superscript 2)', 'False', 'True', 'True'],
      [c('"\u00bd"')+' (one half)', 'False', 'False', 'True'],
      [c('"-2"'), 'False', 'False', 'False'],
      [c('"3.5"'), 'False', 'False', 'False'],
      [c('""'), 'False', 'False', 'False']
    ]) +
    p('Decimal characters are a subset of digits; digits are a subset of numeric characters. Superscripts and fractions can pass a broader character test but still fail '+c('int()')+'. These tests do not accept signs, decimal points or surrounding spaces.') +
    example('An ASCII-only three-digit code', String.raw`code = "042"
valid = code.isascii() and code.isdecimal() and len(code) == 3
print(valid)
print("\u0661\u0662".isdecimal())
print("\u0661\u0662".isascii())
print(int("\u0661\u0662"))
print("".isascii(), "".isprintable())`, 'True\nTrue\nFalse\n12\nTrue True') +
    p('This code combines Day 02 Boolean logic with three independent requirements: ASCII, decimal digits, and length 3. Keep '+c('"042"')+' as text so its leading zero survives.')),
  section(7, 2, 'Convert carefully; normalize deliberately',
    p('For known, valid input, '+c('int()')+' and '+c('float()')+' perform conversion. Arbitrary input needs error handling and a rule for allowed values. The optional examples below introduce their prerequisites before using them.') +
    details('Optional: handle invalid numeric input with try/except',
      p(c('try')+' runs an indented block. '+c('except ValueError')+' handles a failed conversion. '+c('import math')+' loads Python\'s standard math module; '+c('math.isfinite()')+' rejects infinities and NaN. '+c('if')+' chooses a branch based on a Boolean.') +
      example('Parse a finite number', String.raw`import math

text = "3.5"
try:
    value = float(text)
    if math.isfinite(value):
        print(value)
    else:
        print("Enter a finite number")
except ValueError:
    print("Enter a number")`, '3.5') +
      p('With '+c('text = "oops"')+' the error branch prints '+c('Enter a number')+'. With '+c('text = "inf"')+' conversion succeeds, but the finite check prints '+c('Enter a finite number')+'. Decide separately whether negative values, exponent notation or surrounding whitespace are allowed.')) +
    details('Optional: identifiers and reserved words',
      p('An identifier is a valid Python name. '+c('isidentifier()')+' checks its shape, but keywords such as '+c('for')+' cannot be ordinary variable names. '+c('import keyword')+' loads the standard module that identifies reserved keywords.') +
      example('A valid shape can still be reserved', String.raw`import keyword

name = "for"
print(name.isidentifier())
print(keyword.iskeyword(name))
print(name.isidentifier() and not keyword.iskeyword(name))`, 'True\nTrue\nFalse')) +
    details('Optional: normalize equivalent Unicode spellings',
      p('Normalization converts equivalent Unicode sequences into a selected form. '+c('import unicodedata')+' loads the standard Unicode module. NFC composes characters where possible; it does not strip accents or make all similar-looking symbols equal.') +
      example('Normalize before comparing', String.raw`import unicodedata

left = "\u00e9"
right = "e\u0301"
print(left == right)
left = unicodedata.normalize("NFC", left)
right = unicodedata.normalize("NFC", right)
print(left == right)`, 'False\nTrue') +
      p('For a caseless key, normalization and '+c('casefold()')+' may both be needed. Choose the policy for your data, preserve the display value, and do not treat visually similar text as proof of identity.')) +
    recall('Is '+c('"\u00b2".isdigit()')+' enough to justify '+c('int("\u00b2")')+'?', 'No. The superscript is a digit according to Unicode, but '+c('int()')+' does not accept it as a decimal digit. A character classification is not a promise that conversion will succeed.'))
].join('\n');

const errors = `<section class="slide-section cd-section" id="day03MistakesSection">
${heading('h2', 'headingStringsMistakes', '08', 'Errors and a final recall', '')}
${p('A raised exception stops ordinary execution at that line. Run each intentional failure below on its own. The exception class is stable; the full message can vary by Python version.')}
${table('day03MistakesTable', 'Read the symptom, then choose the repair', ['Symptom', 'Cause', 'Repair'], [
  ['TypeError', 'Mixing text and numbers; assigning to a string index; joining non-strings.', 'Convert deliberately or build a replacement string.'],
  ['IndexError', 'Selecting a position that does not exist.', 'Check length or use a slice when a shorter result is acceptable.'],
  ['ValueError', 'Invalid conversion, missing text with index(), or a zero slice step.', 'Validate the intended rule or handle the exception.'],
  ['SyntaxError', 'Unclosed quotes or malformed literals.', 'Repair the source before it can run.'],
  ['Unexpected result with no exception', 'Ignoring a return value, using the wrong delimiter, or stripping a character set.', 'Inspect repr(), intermediate values and the method contract.']
])}
${details('Intentional failures: immutability and type boundaries',
  example('An existing string cannot be edited', String.raw`text = "python"
text[0] = "P"`, 'TypeError', 'TypeError') +
  example('Text plus an integer is not defined', 'print("Age: " + 25)', 'TypeError', 'TypeError'), 'errors')}
${details('Intentional failures: missing positions and invalid values',
  example('No character at position 6', 'print("Python"[6])', 'IndexError', 'IndexError') +
  example('A step must move', 'print("Python"[::0])', 'ValueError', 'ValueError') +
  example('index requires a match', 'print("Python".index("x"))', 'ValueError', 'ValueError') +
  example('Numeric-looking text is not always an integer', String.raw`print(int("\u00b2"))`, 'ValueError', 'ValueError'), 'errors')}
${recall('Trace a complete cleaning and formatting task.', 'First preserve the raw string. Inspect hidden characters with '+c('repr()')+'. Choose trimming, splitting and case rules for the data. Validate the resulting value before conversion. Format the final report without confusing its display with the stored value.')}
${note('Before practice', 'You should be able to explain why methods leave strings unchanged, trace an exclusive slice stop, distinguish rendered text from repr, choose split versus join, and justify a validation rule with an edge case.')}
<p class="cd-source">Language references: <a href="https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str" target="_blank" rel="noopener noreferrer">Python string operations</a> and <a href="https://docs.python.org/3/reference/lexical_analysis.html#string-and-bytes-literals" target="_blank" rel="noopener noreferrer">string literal syntax</a>.</p>
</section>`;

const navigation = `<nav class="cd-topic-nav" aria-label="Day 03 sections"><span>In this lesson</span><ol>${SECTIONS.map(s => `<li><a href="#${s.id}"><span>${String(s.number).padStart(2, '0')}</span>${s.title}</a></li>`).join('')}</ol></nav>`;
const HTML = `<div class="course-design-v1" data-course-design="1">\n${navigation}\n${[fundamentals, escapes, operators, slicing, formatting, methods, validation, errors].join('\n')}\n</div>`;

module.exports = { HTML, TRACK_MAP, SECTIONS };
