import os
import glob
import re

directories = ['docs', 'documents']
pattern = re.compile(r'\[Do\][ 　]?')

for directory in directories:
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if pattern.search(content):
                        new_content = pattern.sub('', content)
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")

# Also process any mdx files in content/
for root, _, files in os.walk('content'):
    for file in files:
        if file.endswith('.md') or file.endswith('.mdx'):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if pattern.search(content):
                    new_content = pattern.sub('', content)
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

