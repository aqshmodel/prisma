import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../content/articles');
const pillarSlugs = [
  'understanding-16types-for-career',   // ピラー9
  'understanding-socionics-matching',   // ピラー4
  'understanding-enneagram-motivation', // ピラー6
  'mbti-vs-socionics-beyond-16types',   // ピラー17
];

function extractInternalLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];
    if (url.startsWith('/articles/')) {
      links.push({ text, url });
    }
  }
  return links;
}

function hasDiagnosisCTA(content) {
  return content.includes('<DiagnosisCTA />');
}

function auditArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  const results = [];

  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Frontmatter抽出
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    let slug = file.replace('.mdx', '');
    if (frontmatterMatch) {
      const slugMatch = frontmatterMatch[1].match(/slug:\s*['"]?([^'"\n]+)['"]?/);
      if (slugMatch) {
        slug = slugMatch[1];
      }
    }

    const internalLinks = extractInternalLinks(content);
    const linksToPillars = internalLinks.filter(link =>
      pillarSlugs.some(p => link.url.includes(p))
    );

    results.push({
      file,
      slug,
      isPillar: pillarSlugs.includes(slug),
      hasCTA: hasDiagnosisCTA(content),
      totalInternalLinks: internalLinks.length,
      linksToPillars: linksToPillars.map(l => `${l.text} -> ${l.url}`)
    });
  });

  const outputDir = path.join(__dirname, '../docs/optimize_internal_links_and_topic_clusters');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'audit_result.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`監査完了: ${files.length}件の記事を監査しました。`);
  console.log(`結果を保存しました: ${outputPath}`);
}

auditArticles();
