/**
 * ビルド前に全記事のメタデータをJSONファイルとして書き出す。
 * output: exportモードでAPIルートが使えないため、
 * クライアントコンポーネントから記事データを参照するためのワークアラウンド。
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '..', 'content', 'articles');
const outputDir = path.join(__dirname, '..', 'public', 'data');
const outputPath = path.join(outputDir, 'articles-meta.json');

// ディレクトリ作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

const articles = files.map(fileName => {
  const filePath = path.join(contentDir, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  const slug = fileName.replace(/\.mdx?$/, '');

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    coverImage: data.coverImage || '',
    category: data.category || '',
    tags: data.tags || [],
  };
}).sort((a, b) => {
  // 日付の降順（新しい記事が先頭）
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
});

fs.writeFileSync(outputPath, JSON.stringify(articles, null, 0));
console.log(`✅ Generated articles-meta.json (${articles.length} articles)`);
