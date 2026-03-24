/**
 * ビルド前に全用語集エントリのメタデータをJSONファイルとして書き出す。
 * output: クライアントコンポーネントから用語集データを参照するためのワークアラウンド。
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '..', 'content', 'glossary');
const outputDir = path.join(__dirname, '..', 'public', 'data');
const outputPath = path.join(outputDir, 'glossary-meta.json');

// ディレクトリ作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// glossaryディレクトリが無い場合は空配列を出力して終了
if (!fs.existsSync(contentDir)) {
  fs.writeFileSync(outputPath, JSON.stringify([], null, 0));
  return;
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));
const entries = files.map(fileName => {
  const filePath = path.join(contentDir, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  const slug = fileName.replace(/\.mdx$/, '');

  return {
    slug,
    title: data.title || '',
    reading: data.reading || '',
    category: data.category || '',
  };
}).sort((a, b) => {
  // 文字数が長い順（最長一致優先）
  return b.title.length - a.title.length;
});

fs.writeFileSync(outputPath, JSON.stringify(entries, null, 0));
console.log(`✅ Generated glossary-meta.json (${entries.length} terms)`);
