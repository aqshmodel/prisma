import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../content/articles');
const DISCLAIMER_TEXT = '※本記事は自己分析のフレームワークであり、医療的アドバイスではありません。';
const CTA_TAG = '<DiagnosisCTA />';

function injectDisclaimer() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
  let updatedCount = 0;
  let alreadyHasCount = 0;

  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // すでに免責事項が含まれているかチェック
    if (content.includes(DISCLAIMER_TEXT)) {
      alreadyHasCount++;
      // 免責事項はあるが、改行位置などフォーマットが微妙な場合の正規化は一旦スキップし
      // 致命的な欠損のみをターゲットにする
      return;
    }

    // <DiagnosisCTA /> が存在するかチェック
    if (!content.includes(CTA_TAG)) {
      console.warn(`[WARNING] ${file} には <DiagnosisCTA /> が見つかりませんでした。スキップします。`);
      return;
    }

    // CTAの直前に空行とともに免責事項を挿入する
    // 現在のコンテンツでCTAの手前に来るテキストを正規表現で置き換える
    const replacement = `\n${DISCLAIMER_TEXT}\n\n${CTA_TAG}`;

    // 単純な置換 (余分な改行を防ぐため、CTA周りの改行空白を吸収)
    const newContent = content.replace(/\s*<DiagnosisCTA \/>\s*$/, replacement + '\n');

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
    }
  });

  console.log(`\n--- 実行結果 ---`);
  console.log(`免責事項を新規挿入した記事数: ${updatedCount}件`);
  console.log(`すでに免責事項が存在した記事数: ${alreadyHasCount}件`);
  console.log(`対象全ファイル数: ${files.length}件`);
}

injectDisclaimer();
