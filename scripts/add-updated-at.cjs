const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../content/articles');
const files = fs.readdirSync(dir);

let updatedCount = 0;

files.forEach(file => {
  if (!file.endsWith('.mdx') && !file.endsWith('.md')) return;

  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Frontmatterの抽出
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (match) {
    const frontmatter = match[1];

    // updatedAtが未定義なら追加
    if (!frontmatter.includes('updatedAt:')) {
      const dateRegex = /date:\s*['"]?([^'"\n]+)['"]?/;
      const dateMatch = frontmatter.match(dateRegex);

      if (dateMatch) {
        const dateVal = dateMatch[1];
        // dateの行の直後にupdatedAtを追加
        const newFrontmatter = frontmatter.replace(dateRegex, `${dateMatch[0]}\nupdatedAt: '${dateVal}'`);
        content = content.replace(frontmatter, newFrontmatter);

        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated: ${file} (date: ${dateVal})`);
      }
    }
  }
});

console.log(`Total updated files: ${updatedCount}`);
