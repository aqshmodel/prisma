import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../content/articles');

// 記事マッピングの定義
const pillarMapping = {
  // ピラー9（16タイプ入門）のクラスター
  'understanding-16types-for-career': [
    'management-by-personality-type', 'create-your-manual-for-team-synergy', 'hidden-stress-of-work-environment',
    'communication-tips-by-personality-type', 'freelance-aptitude-by-personality', 'job-change-self-pr-by-personality',
    'self-analysis-for-job-hunting', 'leadership-style-by-personality-type', 'meeting-anxiety-for-introverts',
    'infp-want-to-quit-job', 'intj-workplace-isolation', 'enfp-job-hopping-reasons', 'isfj-cannot-say-no-at-work',
    'entp-too-many-interests-work', 'infj-work-relationships-exhaustion', 'enfj-people-pleasing-exhaustion',
    'infp-struggle-to-live', 'enfj-burnout-by-exploitation', 'intj-struggle-with-emotions'
  ],
  // ピラー4（ソシオニクス入門）のクラスター
  'socionics-os-compatibility': [ // mdx名は understanding-socionics-matching だが大元のslugを使用
    'communication-tips-by-personality-type', 'romantic-compatibility-by-socionics', 'couple-communication-by-socionics',
    'dealing-with-difficult-people-by-socionics', 'parent-child-relationship-by-personality-type', 'friendship-style-by-personality-type',
    'infj-love-exhaustion', 'istp-love-freedom', 'infj-relationship-reset', 'infj-work-relationships-exhaustion',
    'esfj-fear-of-being-disliked', 'infp-love-idealism-too-high', 'isfj-love-over-adapting', 'intj-struggle-with-emotions',
    'enfp-fickle-love-habits'
  ],
  // ピラー6（エニアグラム入門）のクラスター
  'enneagram-motivation-engine': [ // mdx名は understanding-enneagram-motivation だが大元のslugを使用
    'hidden-stress-of-work-environment', 'confirmation-bias-in-workplace', 'mental-health-by-enneagram-type',
    'perfectionism-burnout-by-personality-type', 'anger-management-by-personality-type', 'money-personality-by-type',
    'decision-making-by-personality-type', 'esfj-fear-of-being-disliked', 'enfj-people-pleasing-exhaustion',
    'procrastination-by-personality-type', 'infp-struggle-to-live', 'enfj-burnout-by-exploitation'
  ]
};

// 挿入するリンクのテキストテンプレート
const templates = {
  'understanding-16types-for-career': {
    top: `> 💡 **関連記事**: 16タイプの基本的な仕組みや仕事への活かし方については、『[16タイプ性格診断で分かる才能と適職](/articles/understanding-16types-for-career)』で詳しく解説しています。`,
    bottom: `- 🔗 キャリアにおける性格診断の活用法については、『[16タイプ性格診断で分かる才能と適職](/articles/understanding-16types-for-career)』もぜひご覧ください。`
  },
  'socionics-os-compatibility': {
    top: `> 💡 **関連記事**: 思考のクセの違いによる人間関係のメカニズムについては、『[ソシオニクスで解く人間関係の謎（相性の仕組み）](/articles/socionics-os-compatibility)』で詳しく解説しています。`,
    bottom: `- 🔗 ソシオニクスの相性理論についてさらに深く知りたい方は、『[ソシオニクスで解く人間関係の謎（相性の仕組み）](/articles/socionics-os-compatibility)』もぜひご覧ください。`
  },
  'enneagram-motivation-engine': {
    top: `> 💡 **関連記事**: 9つのタイプと無意識の欲求（心のエンジン）については、『[エニアグラムが暴くモチベーションの正体（エニアグラムとは）](/articles/enneagram-motivation-engine)』で詳しく解説しています。`,
    bottom: `- 🔗 エニアグラムのタイプ別特徴やモチベーション管理については、『[エニアグラムが暴くモチベーションの正体（エニアグラムとは）](/articles/enneagram-motivation-engine)』もぜひご覧ください。`
  }
};

const pillarFilenames = [
  'understanding-16types-for-career.mdx',
  'understanding-socionics-matching.mdx',
  'understanding-enneagram-motivation.mdx',
  'mbti-vs-socionics-beyond-16types.mdx'
];

function injectLinks() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx') && !pillarFilenames.includes(f));

  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Frontmatterからslugを取得
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return;

    let slug = file.replace('.mdx', '');
    const slugMatch = frontmatterMatch[1].match(/slug:\s*['"]?([^'"\n]+)['"]?/);
    if (slugMatch) slug = slugMatch[1];

    const requiredPillars = [];
    Object.keys(pillarMapping).forEach(pillarKey => {
      if (pillarMapping[pillarKey].includes(slug)) {
        requiredPillars.push(pillarKey);
      }
    });

    if (requiredPillars.length === 0) return; // 紐づくピラーなし

    let modified = false;

    requiredPillars.forEach(pillarKey => {
      const topTemplate = templates[pillarKey].top;
      const bottomTemplate = templates[pillarKey].bottom;

      const linkUrl = `/articles/${pillarKey}`;

      // Topの注入（Frontmatterの直後）
      if (!content.includes(linkUrl) || (!content.includes('> 💡 **関連記事**') && !content.includes(linkUrl))) {
        // まだ対象のリンクが含まれていなければ追加
        const lines = content.split('\n');
        let fmEndsAt = -1;
        let fmCount = 0;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('---')) {
            fmCount++;
            if (fmCount === 2) {
              fmEndsAt = i;
              break;
            }
          }
        }

        if (fmEndsAt !== -1 && !content.substring(0, 1000).includes(linkUrl)) {
          lines.splice(fmEndsAt + 1, 0, '', topTemplate);
          content = lines.join('\n');
          modified = true;
        }
      }

      // Bottomの注入（<DiagnosisCTA /> の直前、既存のリストがあればそこに追加）
      if (!content.substring(content.length - 1500).includes(linkUrl)) {
        if (content.includes('<DiagnosisCTA />')) {
          const ctaRegex = /<DiagnosisCTA \/>/;

          // 「関連する記事」や「あわせて読みたい」ブロックがあるか確認
          if (!content.includes('### 🔗 あわせて読みたい')) {
            content = content.replace(ctaRegex, `### 🔗 あわせて読みたい\n\n${bottomTemplate}\n\n<DiagnosisCTA />`);
          } else {
            content = content.replace(/### 🔗 あわせて読みたい\n\n/, `### 🔗 あわせて読みたい\n\n${bottomTemplate}\n`);
          }
          modified = true;
        }
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content);
      updatedCount++;
    }
  });

  console.log(`リンクの自動注入が完了しました。更新された記事数: ${updatedCount}件`);
}

injectLinks();
