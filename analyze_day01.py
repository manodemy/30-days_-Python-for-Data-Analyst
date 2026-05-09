"""Extract the full first section header cell from Day01."""
import json, sys
sys.stdout.reconfigure(encoding='utf-8')

nb = json.load(open(r'notebooks\Day01_Data_Types_Blank.ipynb', 'r', encoding='utf-8'))

# Cell 1 is the first section header (cell 0 is the title)
print("=== CELL 0 FULL ===")
print(''.join(nb['cells'][0]['source']))
print("\n\n=== CELL 1 FULL (Section Header + Theory) ===")
print(''.join(nb['cells'][1]['source']))
