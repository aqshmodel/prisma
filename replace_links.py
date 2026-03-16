import os
import glob
import re

CONTENT_DIR = "content/articles"

mapping = {
  "/articles/personality-type-diagnosis-guide": "/articles/how-to-find-your-type",
  "/articles/16types-career-stress": "/articles/understanding-16types-for-career",
  "/articles/pressure-of-individuality-and-self-acceptance": "/articles/pressure-of-individuality-and-normality",
  "/articles/enneagram-9types-explained": "/articles/enneagram-motivation-engine",
  "/articles/jobs-to-avoid-by-personality-type": "/articles/understanding-16types-for-career",
  "/articles/enneagram-type5-ai-era-survivor": "/articles/human-strengths-in-ai-era-by-type",
  "/articles/stress-coping-by-16types": "/articles/pressure-resilience-by-personality-type",
  "/articles/perfectionist-burnout-by-personality-type": "/articles/perfectionism-burnout-by-personality-type",
  "/articles/defense-mechanisms-by-personality-type": "/articles/door-slam-and-self-defense",
  "/articles/entj-love-lead-and-blind-spots": "/articles/entj-subordinates-not-following",
  "/articles/infj-reading-between-lines": "/articles/infj-work-relationships-exhaustion"
}

modified_files = 0
for filepath in glob.glob(f"{CONTENT_DIR}/**/*.mdx", recursive=True):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in mapping.items():
        new_content = new_content.replace(old + ")", new + ")") # 確実にリンクの()の中身だけ置換する
        new_content = new_content.replace(old + "#", new + "#") # アンカーリンク用
        
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        modified_files += 1
        print(f"Updated: {filepath}")

print(f"置換完了: {modified_files}ファイルを更新しました。")
