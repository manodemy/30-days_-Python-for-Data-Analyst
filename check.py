import json
nb=json.load(open(r'notebooks\Day01_Data_Types_Blank.ipynb', 'r', encoding='utf-8'))
total_q = 0
for i, c in enumerate(nb['cells']):
  src=''.join(c['source'])
  if '## Q1.' in src or '## Q' in src or '### **Q' in src:
    total_q += 1
    if i+1 < len(nb['cells']):
      print('Next cell type:', nb['cells'][i+1]['cell_type'])
