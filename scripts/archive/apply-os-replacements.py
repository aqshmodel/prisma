import json
import os

with open('os_replacements_review.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for item in data:
    filepath = item['file']
    matches = item['matches']
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    for match in matches:
        idx = match['line_idx']
        # Double check the original matches before replacing
        if lines[idx].strip() == match['original']:
            lines[idx] = lines[idx].replace(match['original'], match['proposed'])
            
    with open(filepath, 'w', encoding='utf-8') as f:
        f.writelines(lines)
        
print("Replacements applied successfully.")
