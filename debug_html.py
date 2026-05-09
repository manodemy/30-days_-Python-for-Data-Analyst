import bs4
html = open('day01.html', 'r', encoding='utf-8').read()
soup = bs4.BeautifulSoup(html, 'html.parser')

cells = soup.find_all('div', class_='code-cell')
print(f"Total code cells: {len(cells)}")

scored = 0
for cell in cells:
    prev = cell.find_previous_sibling()
    if prev and prev.name == 'div' and any(c in prev.get('class', []) for c in ['question', 'task', 'interview']):
        scored += 1

print(f"Scored cells (direct previous sibling is question): {scored}")

# Let's see what is actually the previous sibling for the first few non-scored cells
missing = 0
for cell in cells:
    prev = cell.find_previous_sibling()
    if prev and not any(c in prev.get('class', []) for c in ['question', 'task', 'interview']):
        if prev.name == 'div' and 'nb-rich' in prev.get('class', []):
            continue # just an example cell following theory
        if prev.name == 'p':
            continue # just an example cell following paragraph
        
        # This might be an interview question that got messed up?
        missing += 1
        print("Previous sibling for non-scored cell:", prev)
        if missing > 5:
            break
