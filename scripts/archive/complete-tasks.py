import re

with open("docs/plan_new_articles_batch3/task.md", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("- [ ] 11. **全10記事の画像生成と設定", "- [x] 11. **全10記事の画像生成と設定")
content = content.replace("- [ ] 12. **SEOメタデータ検証", "- [x] 12. **SEOメタデータ検証")
content = content.replace("- [ ] 13. **ウォークスルー作成", "- [x] 13. **ウォークスルー作成")

with open("docs/plan_new_articles_batch3/task.md", "w", encoding="utf-8") as f:
    f.write(content)
print("Tasks marked as complete.")
