"""Unlock Python Day 03 in both home pages.

`getDayUrl` sent any Python day above 02 to the auth-gated /notebook route.
Python days 01-03 ship a complete static simulator, so they are free.
"""
OLD = "    if (num <= 2) return `/python/day${formatted}.html`;"
NEW = "    if (num <= 3) return `/python/day${formatted}.html`;   // Python days 01-03 are free"

for p in ['public/home.html', 'home.html']:
    s = open(p, encoding='utf-8').read()
    n = s.count(OLD)
    if n:
        s = s.replace(OLD, NEW)
        open(p, 'w', encoding='utf-8', newline='').write(s)
    print('%-22s replaced %d' % (p, n))