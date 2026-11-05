for path in ['landing_v2/index.html', 'public/landing_v2/index.html']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove existing meta charset
    content = content.replace('<meta charset="utf-8"/>\n', '')
    content = content.replace('<meta charset="utf-8">', '')
    
    # Place right after <head>
    content = content.replace('<head>\n', '<head>\n<meta charset="utf-8"/>\n', 1)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Moved charset to top of head in {path}")
