const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(process.cwd(), 'content/articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
const articles = files.map(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  const { data, content: bodyContent } = matter(content);
  const charCount = bodyContent.replace(/\s+/g, '').length;
  const dateStr = data.updatedAt || data.date || "9999-12-31";
  return {
    filename: f,
    slug: data.slug || f.replace(/\.mdx$/, ''),
    title: data.title || '',
    updatedAt: dateStr,
    charCount: charCount
  };
});

articles.sort((a, b) => {
  const dateA = new Date(a.updatedAt).getTime();
  const dateB = new Date(b.updatedAt).getTime();
  if (dateA !== dateB) return dateA - dateB;
  return a.charCount - b.charCount;
});

console.log(JSON.stringify(articles.slice(0, 30), null, 2));
