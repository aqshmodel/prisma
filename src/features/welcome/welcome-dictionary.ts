import type { Locale } from '@/lib/i18n/types';

/**
 * WelcomePage 全セクション用のテキスト辞書
 * 各コンポーネントから useLocale() + getWelcomeText() で参照する。
 */

export interface WelcomeText {
    hero: {
        badge: string;
        heading: string[];
        desc: string[];
        ctaLabel: string;
        ctaSub: string;
        resumeLabel: string;
        resumeSub: string;
        viewResultLabel: string;
        viewResultSub: string;
        restartLabel: string;
        restartSub: string;
        timeNote: string;
    };
    problem: {
        badge: string;
        heading: string[];
        subheading: string[];
        cards: { title: string; desc: string }[];
        insightBadge: string;
        insight: string[];
    };
    solution: {
        badge: string;
        heading: string[];
        subheading: string[];
        items: { title: string; description: string }[];
    };
    benefit: {
        badge: string;
        heading: string[];
        cards: { title: string; subtitle: string; description: string }[];
    };
    trust: {
        badge: string;
        heading: string[];
        cards: { title: string; desc: string }[];
        whyTitle: string;
        whyDesc: string[];
    };
    type: {
        badge: string;
        heading: string[];
        subheading: string[];
    };
    howTo: {
        heading: string[];
        subheading: string;
        steps: { title: string; desc: string }[];
    };
    faq: {
        badge: string;
        heading: string;
        items: { question: string; answer: string }[];
    };
    cta: {
        heading: string[];
        desc: string[];
        button: string;
        timeNote: string;
    };
    compatibility: {
        heading: string;
        desc: string;
        selectA: string;
        selectB: string;
        button: string;
    };
}

export const WELCOME_TEXT: Record<Locale, WelcomeText> = {
    ja: {
        hero: {
            badge: 'Aqsh Prisma Analysis',
            heading: ['ソシオニクス', '自分を、科学する。'],
            desc: [
                'なんとなく生きづらい。いつも同じところでつまずいてしまう。',
                'その理由は、あなたが「自分の性格の構造」をまだ知らないから。',
                'Aqsh Prismaは、16タイプ診断とエニアグラムの力で、',
                'あなたの見えない才能と欲求を言語化する自己分析ツールです。',
            ],
            ctaLabel: '無料で診断する',
            ctaSub: 'Free Analysis',
            resumeLabel: '診断を再開する',
            resumeSub: 'Resume Analysis',
            viewResultLabel: '最新の結果を見る',
            viewResultSub: 'View Result',
            restartLabel: '新しく診断を始める',
            restartSub: 'Restart',
            timeNote: '所要時間：約 10分  |  登録不要',
        },
        problem: {
            badge: 'The Problem',
            heading: ['あなたがいつも抱えている、', 'その生きづらさの理由。'],
            subheading: [
                '人生のモヤモヤを生むのは、あなたの「性格の欠陥」ではありません。',
                'それは、あなたと世界の「認知のズレ」が原因かもしれないのです。',
            ],
            cards: [
                { title: 'わかりあえない', desc: '「なんでそんな言い方をするの？」「どうして分かってくれないの？」恋愛や職場の人間関係で、いつも同じすれ違いを繰り返してしまう。' },
                { title: '見つからない', desc: '今の仕事が向いていない気がするけれど、本当にやりたいことも分からない。「自分らしさ」が迷子になっている。' },
                { title: '満たされない', desc: '誰かの期待に応えようと頑張りすぎて、得体のしれない疲れが抜けない。休日も心から休まらない。' },
            ],
            insightBadge: 'Key Insight',
            insight: [
                'これらの摩擦や悩みは、努力不足ではなく',
                '「情報処理タイプ（思考のクセ）」と「欲求（心のエンジン）」の',
                '構造的なミスマッチから生まれています。',
            ],
        },
        solution: {
            badge: 'Scientific Approach',
            heading: ['見えない「根本原因」を、', '見える「データ」に変える。'],
            subheading: [
                'Aqsh Prismaは、あなたの特性を4つのレイヤーで分析。',
                '感覚や経験則に頼らない、科学的な「自分だけの取扱説明書」を生成します。',
            ],
            items: [
                { title: '基本タイプ (Type)', description: '情報の入力・処理・出力の癖を16タイプに分類。「あの人はなぜそう考えるのか？」のメカニズムを解明します。' },
                { title: '駆動エンジン (Motivation)', description: '深層心理にある根源的な欲求を特定。何がその人の情熱に火をつけるのか、モチベーションの源泉を探ります。' },
                { title: 'バイアスリスク (Risk)', description: '意思決定や人間関係を歪める「認知バイアス」の傾向を予測。キャリアや恋愛における落とし穴を事前に回避します。' },
                { title: '関係性マトリクス (Match)', description: '他の15タイプとの相関関係を可視化。誰と最高のシナジーを生み、誰と摩擦が起きやすいのか、関係性の予測マップを手に入れます。' },
            ],
        },
        benefit: {
            badge: 'Why Prisma?',
            heading: ['自己理解の深さが、', '人生の質に直結する。'],
            cards: [
                { title: 'Deep Insight', subtitle: '自分だけの取扱説明書', description: '自分が何者で、どこへ向かうべきかが明確に。得意なことだけでなく、絶対に避けるべき「致死量のタスク」まで可視化します。' },
                { title: 'Empathy', subtitle: '人間関係のノイズ削減', description: '「なぜあの人はあんな態度をとるのか」が腑に落ちます。不毛な感情対立が減り、ストレスのない関係構築の土台が作れます。' },
                { title: 'Life Hack', subtitle: '才能の最大化', description: '無理に自分を変えるのではなく、持って生まれた「思考のクセ」を活かしきることで、仕事も恋愛も本来の力を発揮できるようになります。' },
            ],
        },
        trust: {
            badge: 'Scientific Foundation',
            heading: ['理論に裏打ちされた', '確かな信頼性。'],
            cards: [
                { title: 'Jungian Typology', desc: 'C.G.ユングの「タイプ論」をベースに、人間の認知プロセスを体系化。生まれ持った「脳の利き手」を特定します。' },
                { title: 'Socionics', desc: '16タイプ間の相性をモデル化したソシオニクス理論を採用。恋愛や人間関係の摩擦メカニズムを論理的に解明します。' },
                { title: 'Enneagram', desc: '古代から伝わるエニアグラム理論を統合。行動の裏にある無意識の欲求・恐れという心のエンジンを描き出します。' },
            ],
            whyTitle: 'Why it works',
            whyDesc: [
                '多くの性格診断が「よくある行動」や「気分」という表面的な現象だけを測定するのに対し、',
                'Aqsh Prismaはその源泉となる「思考のクセ」と「心のエンジン」を特定します。',
                'そのため、環境や気分で結果がブレにくく、本質的なあなたの自己理解を助けます。',
            ],
        },
        type: {
            badge: 'Discover Your Type',
            heading: ['多様な個性が、', '組織の力になる。'],
            subheading: [
                'Aqsh Prismaは、人間の認知特性を16の「基本タイプ」に分類。',
                'それぞれの強みと役割を理解することが、最強のチーム作りへの第一歩です。',
            ],
        },
        howTo: {
            heading: ['使い方は、', 'とてもシンプル。'],
            subheading: '登録不要。今すぐあなたの組織タイプを診断できます。',
            steps: [
                { title: '72の質問に回答', desc: 'ブラウザ上で直感的に回答。所要時間は約10分〜15分です。アカウント登録は必要ありません。' },
                { title: '分析レポートを表示', desc: '回答完了と同時に、詳細な分析結果が表示されます。あなたのタイプ、強み、盲点が即座にわかります。' },
                { title: 'チームで活用', desc: '結果をチームでシェア。お互いの「取扱説明書」として活用し、相互理解を深めましょう。' },
            ],
        },
        faq: {
            badge: 'Q & A',
            heading: 'よくあるご質問',
            items: [
                { question: '利用に料金はかかりますか？', answer: 'いいえ、現在のバージョン（Aqsh Prisma Public Beta）はすべての機能を無料でご利用いただけます。将来的に法人向けの有料プランを追加する可能性がありますが、個人利用の範囲で勝手に課金されることはありません。' },
                { question: '会員登録は必要ですか？', answer: 'いいえ、登録なしですぐに診断を開始できます。ただし、診断結果の履歴を長期保存したい場合などは、ブラウザのキャッシュをクリアしないようご注意ください（現在はローカルストレージに一時保存されます）。' },
                { question: '推奨環境を教えてください。', answer: 'PC、スマートフォン、タブレットの主要ブラウザ（Google Chrome, Safari, Edge, Firefox）の最新版でご利用いただけます。' },
                { question: '診断結果はどれくらい正確ですか？', answer: '約80%以上のユーザーから「非常に当たっている」「当たっている」との回答を得ていますが、心理テストの性質上、その時の心理状態によって結果が変動する場合があります。あくまで自己理解・相互理解のためのツールとしてご活用ください。' },
            ],
        },
        cta: {
            heading: ['あなたの可能性を、', 'データで解き明かそう。'],
            desc: [
                '組織のミスマッチを解消し、最高のチームを作る第一歩。',
                'まずは無料で、あなた自身のタイプを知ることから始めましょう。',
            ],
            button: '今すぐ診断を始める',
            timeNote: '所要時間：約10分 | 登録不要',
        },
        compatibility: {
            heading: '気になるあの人との相性は？',
            desc: '2つのタイプを選んで、仕事・恋愛での相性パターンとコミュニケーションのコツを確認しましょう。',
            selectA: '自分のタイプを選択',
            selectB: '相手のタイプを選択',
            button: '相性を見る',
        },
    },
    en: {
        hero: {
            badge: 'Aqsh Prisma Analysis',
            heading: ['Socionics', 'Understand yourself, scientifically.'],
            desc: [
                'Something feels off. You keep stumbling in the same places.',
                'The reason? You don\'t yet know the structure of your own personality.',
                'Aqsh Prisma uses 16-type diagnostics and the Enneagram to',
                'articulate your hidden talents and desires — a scientific self-analysis tool.',
            ],
            ctaLabel: 'Start Free Analysis',
            ctaSub: 'Free Analysis',
            resumeLabel: 'Resume Analysis',
            resumeSub: 'Resume Analysis',
            viewResultLabel: 'View Latest Results',
            viewResultSub: 'View Result',
            restartLabel: 'Start New Diagnosis',
            restartSub: 'Restart',
            timeNote: 'Takes about 10 min  |  No registration needed',
        },
        problem: {
            badge: 'The Problem',
            heading: ['The reason behind', 'the friction you always feel.'],
            subheading: [
                'The fog in your life isn\'t caused by a "character flaw."',
                'It may be a cognitive gap between you and the world.',
            ],
            cards: [
                { title: 'Misunderstood', desc: '"Why do they say it like that?" "Why don\'t they get me?" — the same miscommunications keep repeating in love and at work.' },
                { title: 'Lost', desc: 'This job doesn\'t feel right, but you don\'t know what you truly want either. Your "authentic self" has gone missing.' },
                { title: 'Unfulfilled', desc: 'You push yourself to meet others\' expectations, yet an inexplicable exhaustion lingers. Even days off bring no real rest.' },
            ],
            insightBadge: 'Key Insight',
            insight: [
                'These frictions aren\'t from lack of effort —',
                'they arise from a structural mismatch between your "information processing type" and "core desires"',
                '(your thinking patterns and your heart\'s engine).',
            ],
        },
        solution: {
            badge: 'Scientific Approach',
            heading: ['Turn invisible root causes', 'into visible data.'],
            subheading: [
                'Aqsh Prisma analyzes your traits across 4 layers.',
                'A scientific "personal instruction manual" — no guesswork, no gut feelings.',
            ],
            items: [
                { title: 'Base Type', description: 'Classifies your information intake, processing, and output habits into 16 types. Uncovers the mechanism behind "Why do they think that way?"' },
                { title: 'Motivation Engine', description: 'Identifies the primal desire in your deep psychology. Explores the source that ignites your passion and drives your motivation.' },
                { title: 'Bias Risk', description: 'Predicts cognitive bias tendencies that distort decisions and relationships. Avoid career and relationship pitfalls before they happen.' },
                { title: 'Relationship Matrix', description: 'Visualizes compatibility with all other 15 types. Get a predictive map of who you synergize with and where friction is likely.' },
            ],
        },
        benefit: {
            badge: 'Why Prisma?',
            heading: ['Depth of self-understanding', 'directly impacts quality of life.'],
            cards: [
                { title: 'Deep Insight', subtitle: 'Your personal instruction manual', description: 'Clarifies who you are and where you should head. Visualizes not just strengths, but the "lethal dose tasks" you must avoid.' },
                { title: 'Empathy', subtitle: 'Reduce relationship noise', description: 'Finally understand "Why do they act that way?" Reduce futile emotional conflict and build a foundation for stress-free connections.' },
                { title: 'Life Hack', subtitle: 'Maximize your talent', description: 'Instead of forcing change, leverage your innate thinking patterns. Unlock your true potential in work, love, and life.' },
            ],
        },
        trust: {
            badge: 'Scientific Foundation',
            heading: ['Backed by theory.', 'Built on trust.'],
            cards: [
                { title: 'Jungian Typology', desc: 'Based on C.G. Jung\'s Type Theory, systematizing human cognitive processes. Identifies your brain\'s natural "dominant hand."' },
                { title: 'Socionics', desc: 'Adopts Socionics theory modeling compatibility between 16 types. Logically explains the mechanics of friction in love and relationships.' },
                { title: 'Enneagram', desc: 'Integrates the ancient Enneagram tradition. Reveals the unconscious desires and fears — the engine of your heart — behind your actions.' },
            ],
            whyTitle: 'Why it works',
            whyDesc: [
                'While most personality tests measure only surface behaviors and moods,',
                'Aqsh Prisma identifies the source: "thinking patterns" and "the heart\'s engine."',
                'Results resist fluctuation from mood or environment, giving you essential self-understanding.',
            ],
        },
        type: {
            badge: 'Discover Your Type',
            heading: ['Diverse personalities', 'become organizational strength.'],
            subheading: [
                'Aqsh Prisma classifies human cognitive traits into 16 "base types."',
                'Understanding each type\'s strengths and roles is the first step to building the ultimate team.',
            ],
        },
        howTo: {
            heading: ['Simple to use.', ''],
            subheading: 'No registration needed. Start your personality analysis right now.',
            steps: [
                { title: 'Answer 72 questions', desc: 'Respond intuitively in your browser. Takes about 10–15 minutes. No account registration required.' },
                { title: 'View your analysis report', desc: 'Detailed results appear instantly upon completion. Discover your type, strengths, and blind spots immediately.' },
                { title: 'Apply with your team', desc: 'Share results with your team. Use them as mutual "instruction manuals" to deepen understanding.' },
            ],
        },
        faq: {
            badge: 'Q & A',
            heading: 'Frequently Asked Questions',
            items: [
                { question: 'Is there a fee?', answer: 'No. The current version (Aqsh Prisma Public Beta) is completely free. We may add paid enterprise plans in the future, but personal use will never be charged without consent.' },
                { question: 'Do I need to register?', answer: 'No. You can start the diagnosis immediately without registering. Note that results are stored in your browser\'s local storage — avoid clearing your cache if you want to keep your history.' },
                { question: 'What are the system requirements?', answer: 'The latest versions of major browsers (Google Chrome, Safari, Edge, Firefox) on PC, smartphone, or tablet.' },
                { question: 'How accurate are the results?', answer: 'Over 80% of users report the results as "very accurate" or "accurate." However, as with any psychological test, results may vary with your mental state at the time. Please use this as a tool for self-understanding and mutual understanding.' },
            ],
        },
        cta: {
            heading: ['Unlock your potential', 'with data.'],
            desc: [
                'The first step to resolving team mismatches and building the best team.',
                'Start by discovering your own type — completely free.',
            ],
            button: 'Start Diagnosis Now',
            timeNote: 'Takes about 10 min | No registration needed',
        },
        compatibility: {
            heading: 'Check compatibility with anyone',
            desc: 'Select two types to explore work & love compatibility patterns and communication tips.',
            selectA: 'Select your type',
            selectB: 'Select their type',
            button: 'Check Compatibility',
        },
    },
};

/**
 * ロケールに応じた WelcomePage テキストを取得する
 */
export function getWelcomeText(locale: Locale): WelcomeText {
    return WELCOME_TEXT[locale];
}
