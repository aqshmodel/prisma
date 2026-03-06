import type { OSTypeCode } from '@/types/diagnosis';

// --- 相性関係の種類定義 ---

/** ソシオニクスの14種の相性関係 */
export type RelationType =
    | 'Dual' | 'Activity' | 'Mirror' | 'Identity'
    | 'SemiDual' | 'Illusionary' | 'Kindred' | 'Business'
    | 'QuasiIdentity' | 'SuperEgo' | 'Contrary'
    | 'Benefit' | 'Supervision' | 'Conflict';

/** 相性関係の詳細定義 */
export interface RelationDefinition {
    type: RelationType;
    name: string;           // 日本語名
    nameEn: string;         // 英語名
    stars: 1 | 2 | 3 | 4 | 5;
    emoji: string;
    summary: string;        // 1行の概要
    overview: string;       // 詳細な概要（2〜3段落）
    strengths: string[];    // この関係の強み
    cautions: string[];     // この関係の注意点
    /** 具体的な日常シーン例 */
    concreteTip: string;
    workCompatibility: {
        teamDynamics: string;
        roleAdvice: string;
        frictionPoint: string;
    };
    loveCompatibility: {
        attraction: string;
        challenge: string;
        longevityTip: string;
    };
    dos: string[];
    donts: string[];
    /** SEO用FAQ（JSON-LDに組み込み） */
    faq: { question: string; answer: string }[];
    /** Benefit/Supervision等で方向による解説が異なる場合の補足 */
    directionNote?: string;
}

// --- 14種の関係性定義 ---

export const RELATION_DEFINITIONS: Record<RelationType, RelationDefinition> = {
    Dual: {
        type: 'Dual',
        name: '双対関係',
        nameEn: 'Dual',
        stars: 5,
        emoji: '💎',
        summary: '最高の相性。互いの弱点を自然に補い合う理想的なパートナー。',
        overview: '双対関係は、ソシオニクスにおいて最も理想的な関係です。互いの強みが相手の弱みを自然と補完し、一緒にいるだけで安心感を得られます。\n\n言葉にしなくても相手のニーズを理解でき、無理なく支え合える稀有なペアです。長期的な関係ほど、この関係の真価が発揮されます。',
        strengths: [
            '互いの弱点を意識せずに補い合える',
            '一緒にいると自然体でリラックスできる',
            '長期間一緒にいても疲れにくい',
        ],
        cautions: [
            '初対面では互いの良さに気づきにくい場合がある',
            '似ていない部分が多いため、最初は戸惑うことも',
            'お互いへの依存度が高くなりすぎる可能性',
        ],
        workCompatibility: {
            teamDynamics: '最強のタッグ。一方が戦略を描き、もう一方が実行する理想的な役割分担が自然と生まれます。チーム全体のパフォーマンスを底上げする黄金コンビです。',
            roleAdvice: '互いの得意分野を明確にし、責任範囲を分けると最大効率になります。一方がフロントに立ち、もう一方がバックオフィスを支えるスタイルが最適です。',
            frictionPoint: '互いに任せきりになり、コミュニケーションが疎かになると、認識のズレが蓄積される可能性があります。定期的な擦り合わせを心がけましょう。',
        },
        loveCompatibility: {
            attraction: '「この人といると不思議と落ち着く」という、言語化しにくい安心感で惹かれ合います。ドラマチックな展開は少ないですが、深い信頼が醸成されます。',
            challenge: '相手があまりにも自然に弱点を補ってくれるため、その貢献に気づかず感謝を忘れることがあります。当たり前だと思わない意識が重要です。',
            longevityTip: '月に一度、互いへの感謝を言葉にする習慣を作りましょう。「ありがとう」が最強の接着剤です。',
        },
        dos: [
            '相手の得意分野を尊重し、任せる部分は全面的に委ねる',
            '自分の弱点を素直に見せ、助けを受け入れる',
            '定期的に感謝の気持ちを言葉で伝える',
        ],
        donts: [
            '相手の貢献を「当たり前」と思い、感謝を忘れる',
            '自分のやり方を相手に押し付ける',
            '相手の弱みを指摘して批判する（自分の強みは相手の弱みである）',
        ],
        concreteTip: '例: 論理派のILEが「この計画のリスクは…」と分析すると、感覚派のSEIが「じゃあ実際に試してみよう」と実行に移す。二人の間で自然に構想→実行の流れが生まれ、チームの生産性が格段に上がります。',
        faq: [
            { question: '双対関係はなぜ最高の相性なの？', answer: '双対関係では、互いの主導機能が相手の最も弱い第4機能を自然に補完します。意識的な努力なく弱点がカバーされるため、ストレスなく安心感のある関係が築けるのです。' },
            { question: '双対関係は最初から気が合いますか？', answer: '実は初対面では良さが分かりにくいことが多いです。双対の真価は中長期の関係で発揮されます。最初は「なんか違う人だな」と思っても、一緒に過ごす時間が増えるほど居心地の良さを実感します。' },
        ],
    },
    Activity: {
        type: 'Activity',
        name: '活性化関係',
        nameEn: 'Activity',
        stars: 4,
        emoji: '⚡',
        summary: '互いに刺激を与え合い、エネルギーが湧く活発な関係。',
        overview: '活性化関係は、一緒にいるとエネルギーが倍増する刺激的な組み合わせです。互いのアイデアや行動が相手を触発し、「一人では思いつかなかった」発想が次々と生まれます。\n\nただし、そのエネルギーの高さゆえに、長時間一緒にいると疲労が蓄積する側面もあります。適度な距離感がこの関係を最大限に活かす鍵です。',
        strengths: [
            '互いに刺激を与え合い、モチベーションが上がる',
            '会話が弾み、新しい発想が生まれやすい',
            'マンネリに陥りにくい活発な関係',
        ],
        cautions: [
            '刺激が強すぎて、長時間だと互いに疲れる',
            'テンポのズレが少しあり、タイミングが合わないことがある',
            '深い理解よりも表面的な楽しさに留まりやすい',
        ],
        workCompatibility: {
            teamDynamics: 'ブレインストーミングやキックオフミーティングでは爆発的な成果を出します。互いの発言がスパークし、革新的なアイデアが生まれやすい組み合わせです。',
            roleAdvice: 'プロジェクトの立ち上げフェーズや企画段階で組むのが最適。ルーチン業務では刺激が減り、双方のパフォーマンスが低下する可能性があります。',
            frictionPoint: '互いのペースが微妙に異なるため、進捗の足並みが揃わないことがあります。マイルストーンを明確にし、定期的に同期を取りましょう。',
        },
        loveCompatibility: {
            attraction: '出会った瞬間から会話が弾み、「この人と一緒にいると楽しい！」と直感的に惹かれ合います。デートのたびに新鮮な発見があるでしょう。',
            challenge: '一緒にいる時間が長すぎるとエネルギーを消耗し合います。一人の時間を確保しないと、燃え尽きてしまうリスクがあります。',
            longevityTip: '週に1日は「一人デー」を設け、互いのエネルギーを充電する時間を大切にしましょう。',
        },
        dos: [
            '相手のアイデアに乗っかり、一緒にテンションを上げる',
            '互いに刺激し合える趣味や活動を共有する',
            '適度な距離感を保ち、一人の時間を尊重する',
        ],
        donts: [
            '長時間ぶっ通しで一緒にいることを強要する',
            '相手のペースに合わせすぎて自分を消耗させる',
            '活発さがなくなった時に関係に不満を持つ',
        ],
        concreteTip: '例: 飲み会やイベントで出会うと一気に意気投合。「次はあれもやろう！」「面白い！」と互いのテンションが加速し、周囲を巻き込む勢いが生まれます。ただし、翌日は二人とも電池切れになりがち。',
        faq: [
            { question: '活性化関係と双対関係の違いは？', answer: '双対が「静かな安心」なら、活性化は「爆発的な刺激」。双対は長期的に安定しますが、活性化は短期的にエネルギーが爆発する分、長時間だと互いに消耗しやすい面があります。' },
            { question: '活性化関係で長く付き合うコツは？', answer: '適度な距離感が最大の武器です。毎日ベッタリではなく、定期的に会うスタイルが最適。互いのエネルギーが充電された状態で会うと、毎回新鮮な刺激が得られます。' },
        ],
    },
    Mirror: {
        type: 'Mirror',
        name: '鏡像関係',
        nameEn: 'Mirror',
        stars: 4,
        emoji: '🪞',
        summary: '似た思考回路を持つが行動パターンが異なる、建設的な議論ができるペア。',
        overview: '鏡像関係は、同じテーマに興味を持ちながらアプローチが異なるユニークな関係です。互いの考え方を「鏡」のように映し出し、自分では気づかなかった新しい視点を提供してくれます。\n\n議論が非常に建設的になりやすく、知的な成長を促進し合えるパートナーです。ただし、「分かり合えそうで微妙にズレる」もどかしさを感じることもあります。',
        strengths: [
            '建設的で深い議論ができる',
            '互いの視点から学び、知的成長を促進し合える',
            '同じ興味分野を共有でき、話題が尽きない',
        ],
        cautions: [
            '分かり合えそうで微妙にズレるもどかしさがある',
            '互いに「自分の方が正しい」と主張してしまうことがある',
            '行動面での補完性が弱い',
        ],
        workCompatibility: {
            teamDynamics: '企画の壁打ち相手として最適です。同じ問題意識を共有しつつ、異なる切り口で解決策を提示し合えるため、質の高いアウトプットが生まれます。',
            roleAdvice: '同じプロジェクト内で並行して別の領域を担当し、定期的にレビューし合う体制が最適です。',
            frictionPoint: '方法論で意見が割れた時に「自分のやり方が正しい」と互いに引かないことがあります。最終的にはデータや結果で判断する合意ルールを作りましょう。',
        },
        loveCompatibility: {
            attraction: '「この人は自分と似ているのに、なぜか違う視点を持っている」という知的好奇心で惹かれ合います。会話が楽しく、退屈しません。',
            challenge: '考え方が似ているがゆえに、「なぜそこだけ分かってくれないの？」というフラストレーションが溜まりやすいです。',
            longevityTip: '「似ている」前提ではなく「異なる個人」として尊重する意識を持ちましょう。ズレを欠点ではなく面白さと捉えることが秘訣です。',
        },
        dos: [
            '相手の異なる視点を「面白い」と受け止める',
            'ディスカッションを楽しみ、互いの意見を取り入れる',
            '行動面で不足する部分は第三者の協力を仰ぐ',
        ],
        donts: [
            '「自分の方が正しい」と議論を勝ち負けにしてしまう',
            '似ているからといって相手の意見を軽視する',
            '行動パターンの違いを否定する',
        ],
        concreteTip: '例: 同じ「効率化したい」という目標を持ちながら、一方はシステム設計で解決しようとし、もう一方はプロセス改善で解決しようとする。「なるほど、そのやり方もあるのか！」という発見が日常的に起きます。',
        faq: [
            { question: '鏡像関係とは具体的にどんな関係？', answer: '同じEgo機能（主導+創造）を共有しますが、順序が逆になる関係です。例えばILE(Ne-Ti)とLII(Ti-Ne)は同じNe/Tiを使いますが、どちらが主導かが入れ替わります。' },
            { question: '鏡像関係で議論が白熱した時どうすれば？', answer: '互いに「自分が正しい」と思う傾向があるため、客観的なデータや第三者の意見を判断基準にするルールを事前に決めておくと健全な議論になります。' },
        ],
    },
    Identity: {
        type: 'Identity',
        name: '同一関係',
        nameEn: 'Identity',
        stars: 3,
        emoji: '👥',
        summary: '同じタイプ同士。深い理解はあるが、互いの盲点も同じ。',
        overview: '同一関係は、文字通り同じタイプ同士の出会いです。相手の考えが手に取るように分かり、深い共感が生まれます。\n\nしかし、弱みも同じであるため互いを補完できず、同じ問題に揃ってハマりやすいという課題があります。刺激が少なく、成長の機会を外部に求める必要があります。',
        strengths: ['深い共感と理解が即座に得られる', '価値観が合い、衝突が少ない', '互いの言動の理由が直感的に分かる'],
        cautions: ['弱みが同じため補完ができない', '刺激や成長が不足しがち', '互いに甘え合い、停滞する危険性'],
        workCompatibility: { teamDynamics: '互いの思考が完全に読めるため、意思疎通のコストは極めて低いです。ただし、同じ盲点を持つため、チーム全体の弱みが増幅される危険があります。', roleAdvice: '同じ得意分野を持つため、競合するより分業する意識が重要です。互いの弱点をカバーできる第三者をチームに加えましょう。', frictionPoint: '同じタイプ同士で「自分の方が上手い」という競争心が芽生えることがあります。比較ではなく協力を意識しましょう。' },
        loveCompatibility: { attraction: '「この人は自分のことを完全に理解してくれる」という安心感で惹かれ合います。初対面から旧知のような親密さを感じるでしょう。', challenge: '互いに弱みが同じため、問題発生時に共倒れするリスクがあります。また、刺激が少なく新鮮味が薄れやすいです。', longevityTip: '外部の友人や趣味を通じて刺激を取り入れ、二人の世界に風を入れましょう。' },
        dos: ['互いの気持ちに深く共感し、安心感を与え合う', '外部との交流を通じて新しい刺激を取り入れる', '弱みをカバーしてくれる仲間を一緒に見つける'],
        donts: ['二人だけの閉じた世界に引きこもる', '互いの能力を比較して競争する', '「分かっているはず」と甘えてコミュニケーションを怠る'],
        concreteTip: '例: 二人でプレゼン資料を作ると、同じ箇所が得意で同じ箇所が苦手。「ここは任せた」が言えず、得意パートが被って苦手パートが放置される。外部の補完者を積極的に巻き込むのが吉。',
        faq: [
            { question: '同じタイプ同士は相性が良いの？', answer: '深い理解はありますが、弱点も共有するため補完がありません。友人としては心地よいですが、仕事やパートナーとしては第三者の力を借りないと同じ問題にハマりやすいです。' },
        ],
    },
    SemiDual: {
        type: 'SemiDual',
        name: '準双対関係',
        nameEn: 'Semi-Dual',
        stars: 4,
        emoji: '🌗',
        summary: '双対に近い相補性を持つが、一部にミスマッチがある惜しい関係。',
        overview: '準双対関係は、双対関係に非常に近い良好な組み合わせです。互いの強みが相手の弱みの多くをカバーし、自然な補完関係が成り立ちます。\n\nただし完全な双対とは異なり、一部の領域でカバーしきれない盲点が残ります。その微妙なズレを許容できるかどうかが、この関係の成否を分けます。',
        strengths: ['双対に近い高い補完性', '比較的リラックスした関係を築ける', '互いの長所を活かしやすい'],
        cautions: ['一部の盲点がカバーされない', '完璧な補完を期待すると失望する', '微妙なすれ違いが蓄積しやすい'],
        workCompatibility: { teamDynamics: '多くの面で優れた補完性をもつため、チームでの協力は高いレベルで機能します。ただし特定分野での意見の食い違いが生じやすいです。', roleAdvice: '互いの得意分野を最大限に活かしつつ、カバーしきれない部分は第三者のサポートを仰ぎましょう。', frictionPoint: '「ほぼ完璧に分かり合えるのに、なぜここだけダメなの？」という期待値のギャップがストレスになることがあります。' },
        loveCompatibility: { attraction: '自然な居心地の良さと、適度な刺激のバランスが取れた魅力的な組み合わせです。', challenge: '双対ほどの完璧な補完を期待すると「何か足りない」感覚に悩むことがあります。', longevityTip: '完璧を求めず、「ほぼ最高」を楽しむ心構えが長続きの秘訣です。' },
        dos: ['互いの補完性を楽しみ、感謝する', '足りない部分は一緒に解決策を考える', 'ズレを責めるのではなく個性として受け入れる'],
        donts: ['双対関係と比較して不満を持つ', '一部のズレを全体の否定に拡大する', '完璧な理解を相手に要求する'],
        concreteTip: '例: 一緒いると8割は快適なのに、残り2割で「あれ？」というズレを感じる。例えば、感情面は完璧にフォローしてくれるのに、実務面では微妙にかみ合わない等。この2割を許容できるかがポイント。',
        faq: [
            { question: '準双対関係と双対関係の違いは？', answer: '双対は4つの機能全てが完全に補完し合いますが、準双対は3つが噛み合い1つがズレます。「ほぼ完璧だけど、あと一歩」という感覚の関係です。' },
        ],
    },
    Illusionary: {
        type: 'Illusionary',
        name: '幻想関係',
        nameEn: 'Illusionary',
        stars: 3,
        emoji: '🌈',
        summary: '表面的には心地よいが、深い理解に至りにくい蜃気楼のような関係。',
        overview: '幻想関係は、初対面では非常に魅力的に感じる組み合わせです。互いの表面的な特徴に惹かれ、「素敵な人だ」と感じやすいでしょう。\n\nしかし関係が深まるにつれ、内面的な価値観やコミュニケーション方法のズレが露呈します。美しい蜃気楼のように、近づくほど実態が掴みにくくなる関係です。',
        strengths: ['第一印象が良く、好感を持ちやすい', '互いに礼儀正しく接する', '短期的な交流は非常に心地よい'],
        cautions: ['深い関係になると本質的なズレが表面化する', '互いの本音が掴みにくい', '期待と現実のギャップが大きくなりがち'],
        workCompatibility: { teamDynamics: 'チーム内の雰囲気は和やかに保たれますが、本質的な議論が表面化しにくく、問題の先送りが起きやすいです。', roleAdvice: '互いに丁寧な関係を保ちつつ、本音で議論できる場を意識的に作りましょう。', frictionPoint: '「いい人なんだけど、何を考えているか分からない」というもどかしさがストレスになることがあります。' },
        loveCompatibility: { attraction: '互いの魅力に引き寄せられ、ロマンチックな始まりになりやすいです。相手の「憧れの自分」を投影しやすい関係です。', challenge: '理想化した相手像と現実の相手とのギャップに悩みやすいです。「思っていた人と違う」と感じる瞬間が訪れます。', longevityTip: '相手を理想化せず、ありのままの姿を見つめる努力を続けましょう。幻想を捨てた先に本当のつながりがあります。' },
        dos: ['積極的に自己開示し、本音で話す場を作る', '相手の表面的な魅力だけでなく内面を知ろうとする', '現実的な期待値を持って接する'],
        donts: ['相手を理想化して過度な期待をかける', '表面的な和やかさに甘えて本質的な議論を避ける', '相手の行動を自分の価値観で解釈する'],
        concreteTip: '例: 初めてのランチで「この人素敵！」と強く惹かれるのに、3回目のディナーで「あれ？思ってた人と違う…」と感じ始める。蜃気楼のような関係。',
        faq: [
            { question: '幻想関係でうまく付き合うには？', answer: '最初の印象に囚われず、相手の内面を時間をかけて理解する姿勢が重要です。「自分が見たい相手」ではなく「実際の相手」を受け入れる意識が鍵です。' },
        ],
    },
    Kindred: {
        type: 'Kindred',
        name: '同族関係',
        nameEn: 'Kindred',
        stars: 3,
        emoji: '🤝',
        summary: '似た価値観を共有するが、同じ領域で競合しやすい仲間。',
        overview: '同族関係は、基本的な価値観や世界の見方が似ている組み合わせです。互いの言動に共感しやすく、自然な親近感を覚えるでしょう。\n\nしかし、得意分野がかぶるため競合が生まれやすく、互いの弱みを補う力には欠けます。「わかるけど助けられない」というもどかしさを感じることがあります。',
        strengths: ['価値観が近く、共感が得やすい', '同じ話題で盛り上がれる', '互いのやり方を理解できる'],
        cautions: ['得意分野が被り、競合が起きやすい', '弱みを補完できない', '新しい視点を得にくい'],
        workCompatibility: { teamDynamics: '同じ方向を向いて走れる反面、同じスキルセットのため差別化が難しく、暗黙の競争が生まれやすいです。', roleAdvice: '明確にサブ専門を分け、互いの領域を侵さないラインを引くと協力しやすくなります。', frictionPoint: 'プロジェクトのリーダーシップや功績を巡って摩擦が起きやすいです。公平な評価体制を整えましょう。' },
        loveCompatibility: { attraction: '趣味や興味が一致し、「気が合う！」と感じる楽しい出会いになりやすいです。', challenge: '似すぎているがゆえに、マンネリ化しやすく、成長の刺激が得にくいです。', longevityTip: '二人で新しい分野に挑戦し、互いの未知の一面を引き出すことで新鮮さを保ちましょう。' },
        dos: ['互いの得意分野を認め、敬意を払う', '協力することを競争よりも優先する', '新しい体験を一緒に取り入れる'],
        donts: ['互いの成果を比較して優越感・劣等感に浸る', '同じ土俵で勝ち負けを決めようとする', '外部の視点を取り入れることを怠る'],
        concreteTip: '例: 同じ主導機能（例: Ne）を持つため、「あ、その発想面白い」と共感しやすいが、同時に「自分ならもっとうまくやれる」という競争心も芽生えやすい。切磋琢磨と嫉妬は紙一重。',
        faq: [
            { question: '同族関係で競争にならないコツは？', answer: '互いの専門領域を明確に分けることが効果的です。同じ能力を持っていても、適用する分野を変えることで、競合ではなく「異分野の同志」として協力できます。' },
        ],
    },
    Business: {
        type: 'Business',
        name: '準ビジネス関係',
        nameEn: 'Business',
        stars: 3,
        emoji: '💼',
        summary: '仕事では効果的に機能するが、感情面でのつながりに距離が生じやすい。',
        overview: '準ビジネス関係は、その名の通り仕事上での協力に適した組み合わせです。互いの能力を認め合い、プロフェッショナルな協力関係を築けます。\n\nただし、感情面での親密さやプライベートな共有は難しく、「仕事仲間としては最高だけど、友人としては微妙」と感じることがあります。',
        strengths: ['仕事上の協力がスムーズ', '互いのプロフェッショナリズムを尊重できる', '適度な距離感を保てる'],
        cautions: ['感情的な深い繋がりが構築しにくい', 'プライベートでの話題が見つかりにくい', '関係がドライになりがち'],
        workCompatibility: { teamDynamics: '効率的でプロフェッショナルなチームワークが可能です。各自の役割を淡々とこなし、安定した成果を出せます。', roleAdvice: 'ビジネス上の明確な目標を共有し、各自の貢献領域を定義することで最大効率を発揮します。', frictionPoint: '感情面の配慮が不足しがちです。たまには雑談やチームビルディングの時間を意識的に取りましょう。' },
        loveCompatibility: { attraction: '互いの能力や社会的な立ち位置に惹かれることが多いです。知的でスマートな関係になりやすいです。', challenge: '感情面での繋がりが薄く、「一緒にいて楽しいけど、心が通じ合っている感覚がない」と悩むことがあります。', longevityTip: '意識的に自分の感情を開示し、弱さを見せる練習をしましょう。完璧でなくていいのです。' },
        dos: ['互いの専門性を認め、成果を正当に評価する', '仕事以外の話題にも踏み込んでみる', '感謝や称賛は言葉にして伝える'],
        donts: ['関係を仕事だけに閉じ込める', '感情的な話題を全て避ける', '効率だけを追求して人間味を失う'],
        concreteTip: '例: 同じ創造機能（例: Ti）を共有するため、問題解決のアプローチは似ている。しかし追求する目的が異なるため、「手段は合うのにゴールが違う」不思議な感覚になる。',
        faq: [
            { question: '準ビジネス関係でプライベートも仲良くなれる？', answer: 'なれますが、意識的な努力が必要です。仕事以外の共通体験（旅行、料理、スポーツ等）を通じて感情的な絆を構築することで、ビジネスを超えた関係に発展できます。' },
        ],
    },
    QuasiIdentity: {
        type: 'QuasiIdentity',
        name: '準同一関係',
        nameEn: 'Quasi-Identity',
        stars: 2,
        emoji: '🔄',
        summary: '似ているようで根本的に異なる、誤解が生まれやすい関係。',
        overview: '準同一関係は、表面的には似ているように見えて実は根本的な思考プロセスが異なる組み合わせです。「同じ言葉を使っているのに、意味が違う」という現象が頻発します。\n\n互いに「分かるはず」と期待してしまうため、ズレが発覚した時の失望感が大きくなりがちです。',
        strengths: ['共通の話題が見つかりやすい', '互いの表面的な行動は理解できる', '短期的な協力は可能'],
        cautions: ['深い部分で根本的なズレがある', '「分かっているはず」という過度な期待', '誤解が蓄積しやすい'],
        workCompatibility: { teamDynamics: '表面上は協力できますが、優先事項の違いから「なぜそんな判断を？」という困惑が生まれやすいです。', roleAdvice: '前提の共有を念入りに行い、「同じ方向を向いているか」を頻繁に確認しましょう。', frictionPoint: '「似ているのに分かってくれない」というフラストレーションが最大の摩擦ポイントです。' },
        loveCompatibility: { attraction: '似た雰囲気に安心感を覚え、親しみを感じて近づきます。', challenge: '関係が深まるほど「根本的に違う人だった」と気づく瞬間が多くなります。', longevityTip: '「似ている」前提を捨て、全く別の個人として改めて理解し直す姿勢が必要です。' },
        dos: ['前提や定義を確認してからコミュニケーションする', '「同じはず」と決めつけず、相手の立場を聞く', '違いを発見したら面白がる余裕を持つ'],
        donts: ['「なんで分からないの？」と相手を責める', '表面的な類似点だけで相手を判断する', '自分の基準を相手にも適用する'],
        concreteTip: '例: 二人とも「効率」を重視するが、一方は「プロセスの効率」を、もう一方は「結果の効率」を意味している。同じ言葉なのに意味が違い、「え？そういう意味だったの？」が頻発。',
        faq: [
            { question: '準同一関係と同一関係の違いは？', answer: '同一は同じタイプ同士で完全に一致。準同一はE/I（外向/内向）が逆転したバージョンで、表面は似ていますが内面の処理方法が真逆です。「裏返しの自分」に会ったような感覚です。' },
        ],
    },
    SuperEgo: {
        type: 'SuperEgo',
        name: '超自我関係',
        nameEn: 'Super-Ego',
        stars: 2,
        emoji: '⚖️',
        summary: '互いに尊敬し合うが、一緒にいると緊張が抜けない。',
        overview: '超自我関係は、相手の能力を心から尊敬し、「ああいう人になりたい」と憧れる組み合わせです。相手が自分にとっての「理想像」のように映ります。\n\nしかしその裏返しとして、相手の前では常に「良い自分」でいようと背伸びするため、リラックスできません。長時間一緒にいると精神的に疲弊します。',
        strengths: ['互いを深く尊敬できる', '相手から自分にないものを学べる', '礼儀正しく丁寧な関係を保てる'],
        cautions: ['常に背伸びするため疲れやすい', '本音を見せることが難しい', 'リラックスした関係になりにくい'],
        workCompatibility: { teamDynamics: '互いの能力を高く評価するため、品質の高い仕事ができますが、精神的な緊張が常に伴います。', roleAdvice: '適度な距離を保ちつつ、互いの専門性を活かす分業体制が最適です。密着での協力は避けましょう。', frictionPoint: '互いに「負けられない」というプレッシャーがかかり、リラックスした協力が難しくなります。' },
        loveCompatibility: { attraction: '「こんなすごい人に認められたい」という向上心から惹かれ合います。ハイレベルなカップルになりやすいです。', challenge: '互いに素の自分を見せられず、関係が形式的になりがちです。弱さを見せることへの恐怖があります。', longevityTip: '「完璧じゃなくてもいい」と互いに許し合う宣言をしましょう。弱さを見せた時に関係が深まります。' },
        dos: ['相手へのリスペクトを言葉で表現する', '自分の弱みを少しずつ開示する', '完璧を求めず、70点の自分を許す'],
        donts: ['常に「すごい自分」を演じ続ける', '相手の評価を気にしすぎてストレスを溜める', '弱みを見せることを恥と考える'],
        concreteTip: '例: 相手が自分の苦手分野をいとも簡単にこなす姿を見て、憧れと同時にプレッシャーを感じる。相手の前では失敗できないという緊張感が常に漂う。',
        faq: [
            { question: '超自我関係で居心地を良くするには？', answer: '「完璧でなくてもいい」と互いに明示的に宣言することが最初のステップです。相手も同じように緊張している可能性が高いので、先に弱さを見せた方が関係を楽にします。' },
        ],
    },
    Contrary: {
        type: 'Contrary',
        name: '相克関係',
        nameEn: 'Contrary',
        stars: 2,
        emoji: '🔥',
        summary: '対照的な価値観がぶつかり合う、短期の刺激と長期の摩擦。',
        overview: '相克関係は、互いの価値観が正面からぶつかり合う対照的な組み合わせです。短期的には新鮮な刺激を与え合いますが、長期的には根本的な方向性の違いが摩擦を生みます。\n\n「この人の考え方は理解できないが、面白い」と感じる関係です。互いの違いを楽しめる成熟度があれば成長の糧になります。',
        strengths: ['対照的な視点から新しい気づきを得られる', '短期的には非常に刺激的', '互いの盲点を指摘し合える'],
        cautions: ['長期的な摩擦が蓄積しやすい', '価値観の根本的な対立が起きやすい', '互いのやり方を否定してしまいがち'],
        workCompatibility: { teamDynamics: '異なる視点からの意見が飛び交い、多角的な検討ができますが、合意形成に時間がかかります。', roleAdvice: '明確に異なる領域を担当し、互いの方法論に干渉しない体制が最適です。', frictionPoint: '「どちらのやり方が正しいか」という不毛な論争に発展しやすいです。結果で判断するルールを設けましょう。' },
        loveCompatibility: { attraction: '自分にない要素を持つ相手に強く惹かれる「正反対の魅力」で引き寄せられます。', challenge: '日常の些細な場面で「なぜそうするの？」と理解できない行動が多く、ストレスが溜まります。', longevityTip: '相手の価値観を変えようとしないこと。「自分とは違うがそれもOK」と受け入れる器の大きさが鍵です。' },
        dos: ['相手の価値観を「一つの正解」として認める', '互いの違いを笑い合える関係を目指す', '短所の指摘ではなく長所の称賛を増やす'],
        donts: ['相手を自分の価値観に変えようとする', '些細な違いを大きな問題にエスカレートさせる', '「なぜ分からないの？」と繰り返す'],
        concreteTip: '例: 同じ得意分野を持ちながら使い方が真逆。例えば二人ともNeが強いのに、一方は革新的アイデアに使い、もう一方は既存の改善に使う。「なぜそっちに使うの？」がお互いの口癖に。',
        faq: [
            { question: '相克関係は避けるべき？', answer: '避ける必要はありません。短期的なコラボレーションでは非常に刺激的で、自分にない視点を得る貴重な機会になります。ただし、長期的な密着は精神的に消耗するのでバランスが大切です。' },
        ],
    },
    Benefit: {
        type: 'Benefit',
        name: '恩恵関係',
        nameEn: 'Benefit',
        stars: 2,
        emoji: '🎁',
        summary: '一方が自然に影響を与える非対称な関係。均衡を保つ意識が重要。',
        overview: '恩恵関係は、一方が無意識に相手に影響力を持ち、もう一方がその恩恵を受ける非対称な関係です。恩恵を与える側はリーダーシップを発揮しやすく、受ける側は成長の機会を得ます。\n\nただし、この非対称性に気づかないまま進むと、一方的な支配やフラストレーションの蓄積につながります。',
        strengths: ['受ける側は大きな成長の機会を得られる', '与える側はリーダーシップを発揮できる', '互いに学び合える要素がある'],
        cautions: ['関係が非対称で不均衡になりやすい', '受ける側がストレスを溜めやすい', '与える側が無意識に支配的になる'],
        workCompatibility: { teamDynamics: 'メンター・メンティーの関係に近く、育成的な効果が期待できますが、対等なパートナーシップは難しいです。', roleAdvice: '非対称性を自覚し、定期的にフラットな場で意見交換をする機会を設けましょう。', frictionPoint: '与える側が「当然従うべき」と無意識に思い、受ける側の自主性を奪ってしまうことがあります。' },
        loveCompatibility: { attraction: '与える側のカリスマ性や包容力に、受ける側が強く惹かれます。', challenge: '対等でない関係に受ける側が窮屈さを感じ始めた時、長続きするかが試されます。', longevityTip: '「教える/教えられる」の固定的な関係を壊し、互いに違う分野で尊敬し合えるポイントを見つけましょう。' },
        dos: ['関係の非対称性に気づき、バランスを取る意識を持つ', '受ける側の意見や提案も積極的に取り入れる', '互いの成長を応援し合う'],
        donts: ['一方が常にリードし続ける固定パターンに安住する', '受ける側の自主性を奪う', '非対称性を利用して支配する'],
        concreteTip: '例: 恩恵を与える側が新プロジェクトのビジョンを語ると、受ける側は「なるほど、そういう視点があったのか」と自然に動機付けられる。しかし逆方向の影響力は弱く、受ける側の提案はスルーされがち。',
        faq: [
            { question: '恩恵関係では誰が「与える側」？', answer: 'ソシオニクスでは、恩恵を与える側（Benefactor）の主導機能が、受ける側（Beneficiary）の活性化機能と一致します。これにより与える側の自然な振る舞いが、受ける側を無意識に活性化させるのです。' },
            { question: '恩恵関係でバランスを取るには？', answer: '非対称性を自覚した上で、受ける側の得意分野を「逆メンター」として活かす場を意識的に作りましょう。例えば、与える側が苦手な領域で受ける側に教えを乞うなどです。' },
        ],
        directionNote: 'この関係は非対称です。恩恵を「与える側（Benefactor）」と「受ける側（Beneficiary）」では体験が大きく異なります。与える側は自然にリーダーシップを発揮でき、受ける側は影響を受けつつもその力に対抗しにくい構造があります。',
    },
    Supervision: {
        type: 'Supervision',
        name: '監督関係',
        nameEn: 'Supervision',
        stars: 1,
        emoji: '👁️',
        summary: '無意識に相手の弱点を突いてしまう、緊張度の高い関係。',
        overview: '監督関係は、一方が無意識のうちに相手の最も弱い部分を突いてしまう緊張度の高い組み合わせです。攻撃する意図がなくても、自然な振る舞いが相手にとっては刺さるプレッシャーとなります。\n\n監督される側は常に「見られている」感覚があり、リラックスできません。互いの役割を意識し、距離感を保つことが重要です。',
        strengths: ['互いの弱みを客観的に指摘できる', '成長のための厳しいフィードバックが得られる', '弱点克服へのモチベーションになる'],
        cautions: ['監督される側のストレスが非常に大きい', '無意識の批判が関係を悪化させる', '建設的な関係を築くのが難しい'],
        workCompatibility: { teamDynamics: 'パフォーマンスの改善には繋がりますが、精神的な負担が大きく、長期的な協力には不向きです。', roleAdvice: '直接的な上下関係は避け、別チームでの間接的な協力程度に留めるのが安全です。', frictionPoint: '監督する側の何気ない一言が、される側にとっては深く突き刺さるナイフになることがあります。言葉選びに細心の注意が必要です。' },
        loveCompatibility: { attraction: '相手の持つ強さに惹かれつつも、近づくと緊張する複雑な感情を抱きます。', challenge: '監督される側が常に萎縮し、対等な関係が築きにくいです。', longevityTip: '互いの弱みを「攻撃材料」ではなく「守るべき領域」として認識しましょう。優しさが最大の武器です。' },
        dos: ['相手の弱みを知った上で、意識的に優しく接する', '批判よりも称賛の比率を大幅に増やす', '相手がリラックスできる環境を作り出す'],
        donts: ['相手の弱点を無意識に突く言動を繰り返す', '「それくらい気にするな」と軽視する', '支配的な態度を取る'],
        concreteTip: '例: 監督する側がプレゼンで何気なく指摘した「ここ論理が弱いですね」の一言が、される側にとっては最も痛い急所に刺さるナイフに。悪意ゼロなのに、される側は深く傷つく。',
        faq: [
            { question: '監督関係はなぜ緊張が高い？', answer: '監督する側の主導機能が、される側の最も弱い第4機能（脆弱機能）に直撃するためです。監督する側の自然な振る舞いが、される側にとっては最も不安な領域を突かれる体験になります。' },
            { question: '職場で監督関係にある人とどう付き合う？', answer: '直接的な上下関係は避けるのがベスト。同じ目標を持ちつつ、別チームや別プロジェクトで働く距離感が最適です。やむを得ない場合は、第三者のファシリテーターを間に挟みましょう。' },
        ],
        directionNote: 'この関係は非対称です。「監督する側（Supervisor）」の自然な振る舞いが「される側（Supervisee）」の最も弱い機能を突きます。監督する側は相手の反応に気づきにくく、される側は常に緊張を強いられるという構造的な非対称性があります。',
    },
    Conflict: {
        type: 'Conflict',
        name: '衝突関係',
        nameEn: 'Conflict',
        stars: 1,
        emoji: '⚔️',
        summary: '最も困難な相性。互いの価値観が根本から噛み合わない。',
        overview: '衝突関係は、ソシオニクスにおいて最も困難とされる組み合わせです。互いの強みが相手にとっては不快な刺激となり、自然な振る舞いが相手を苛立たせます。\n\nしかし、この関係は「成長への最大の触媒」にもなり得ます。自分とは正反対の価値観と向き合うことで、人間としての器が大きく広がる可能性を秘めています。',
        strengths: ['自分にない視点を強制的に突きつけられ、成長できる', '人間としての器を広げるチャンス', '困難を乗り越えた時の絆は非常に強い'],
        cautions: ['自然体でいるだけで相手を不快にさせてしまう', '互いの行動原理が理解できない', '長期的な関係維持には多大なエネルギーが必要'],
        workCompatibility: { teamDynamics: '互いのアプローチが根本的に異なるため、合意形成が極めて困難です。ただし、第三者のファシリテーションがあれば、革新的な成果を生む可能性もあります。', roleAdvice: '直接的な協力は最小限にし、同じ目標に対して別々のアプローチで取り組む体制が現実的です。', frictionPoint: 'ほぼ全てがフリクションポイントです。コミュニケーションそのものにストレスがかかります。仲介者の存在が不可欠です。' },
        loveCompatibility: { attraction: '自分とは全く違う価値観に、好奇心から惹かれることがあります。「未知への冒険」のような刺激があります。', challenge: '日常の全てで「なぜそうするの？」が発生します。生活習慣、会話スタイル、意思決定のどれもが噛み合いません。', longevityTip: '互いを変えようとしないことが唯一のルールです。「理解できないが、それでも一緒にいたい」という覚悟が必要です。修行と思いましょう。' },
        dos: ['相手が自分と根本的に違う存在であることを受け入れる', '互いの「地雷」を事前に共有し、避ける努力をする', '第三者の仲介を積極的に活用する'],
        donts: ['相手を自分のフレームワークで理解しようとする', '「普通こうでしょ」と自分の常識を押し付ける', '衝突を相手の性格のせいにする'],
        concreteTip: '例: 一方が「まず全体像を把握しよう」と言い、もう一方が「まず細部を固めよう」と言う。どちらも正しいのに全く噛み合わない。第三者が「じゃあ交互にやりましょう」と言うまで延々と平行線。',
        faq: [
            { question: '衝突関係でも良い関係は築ける？', answer: '困難ですが不可能ではありません。互いの違いを「欠点」ではなく「自分にない武器」と捉える成熟度があれば、人間としての器が最も広がる関係でもあります。第三者の仲介が常に効果的です。' },
            { question: 'なぜ衝突関係は最も困難なの？', answer: '互いの主導機能が相手の第4機能（最も弱い部分）に対応し、さらに創造機能も相手の第3機能（苦手意識がある部分）に対応するためです。お互いの自然な振る舞いが、相手にとっては全面的にストレスフルなのです。' },
        ],
    },
};

// --- 16×16 相性マッピングテーブル ---
// 権威ソース（Wikisocion / socionics4you.com）に準拠した正規マッピング
// 略号: Id=同一, Du=双対, Ac=活性化, Mr=鏡像, Sd=準双対, Mg=幻想(Mirage)
//       Cp=準ビジネス, Cg=同族(Kindred), QI=準同一, Ex=相克(Contrary)
//       Se=超自我, Cf=衝突, Rq=恩恵(Benefit), Sv=監督(Supervision)

export const COMPATIBILITY_MAP: Record<OSTypeCode, Record<OSTypeCode, RelationType>> = {
    // Alpha Quadra: ILE(ENTp), SEI(ISFp), ESE(ESFj), LII(INTj)
    ENTp: { ENTp: 'Identity', ISFp: 'Dual', ESFj: 'Activity', INTj: 'Mirror', ENFj: 'Benefit', ISTj: 'Supervision', ESTp: 'Business', INFp: 'Illusionary', ESFp: 'SuperEgo', INTp: 'Contrary', ENTj: 'QuasiIdentity', ISFj: 'Conflict', ESTj: 'Benefit', INFj: 'Supervision', ENFp: 'Kindred', ISTp: 'SemiDual' },
    ISFp: { ENTp: 'Dual', ISFp: 'Identity', ESFj: 'Mirror', INTj: 'Activity', ENFj: 'Supervision', ISTj: 'Benefit', ESTp: 'Illusionary', INFp: 'Business', ESFp: 'Contrary', INTp: 'SuperEgo', ENTj: 'Conflict', ISFj: 'QuasiIdentity', ESTj: 'Supervision', INFj: 'Benefit', ENFp: 'SemiDual', ISTp: 'Kindred' },
    ESFj: { ENTp: 'Activity', ISFp: 'Mirror', ESFj: 'Identity', INTj: 'Dual', ENFj: 'Business', ISTj: 'Illusionary', ESTp: 'Benefit', INFp: 'Supervision', ESFp: 'QuasiIdentity', INTp: 'Conflict', ENTj: 'SuperEgo', ISFj: 'Contrary', ESTj: 'Kindred', INFj: 'SemiDual', ENFp: 'Benefit', ISTp: 'Supervision' },
    INTj: { ENTp: 'Mirror', ISFp: 'Activity', ESFj: 'Dual', INTj: 'Identity', ENFj: 'Illusionary', ISTj: 'Business', ESTp: 'Supervision', INFp: 'Benefit', ESFp: 'Conflict', INTp: 'QuasiIdentity', ENTj: 'Contrary', ISFj: 'SuperEgo', ESTj: 'SemiDual', INFj: 'Kindred', ENFp: 'Supervision', ISTp: 'Benefit' },

    // Beta Quadra: EIE(ENFj), LSI(ISTj), SLE(ESTp), IEI(INFp)
    ENFj: { ENTp: 'Benefit', ISFp: 'Supervision', ESFj: 'Business', INTj: 'Illusionary', ENFj: 'Identity', ISTj: 'Dual', ESTp: 'Activity', INFp: 'Mirror', ESFp: 'Benefit', INTp: 'Supervision', ENTj: 'Kindred', ISFj: 'SemiDual', ESTj: 'SuperEgo', INFj: 'Contrary', ENFp: 'QuasiIdentity', ISTp: 'Conflict' },
    ISTj: { ENTp: 'Supervision', ISFp: 'Benefit', ESFj: 'Illusionary', INTj: 'Business', ENFj: 'Dual', ISTj: 'Identity', ESTp: 'Mirror', INFp: 'Activity', ESFp: 'Supervision', INTp: 'Benefit', ENTj: 'SemiDual', ISFj: 'Kindred', ESTj: 'Contrary', INFj: 'SuperEgo', ENFp: 'Conflict', ISTp: 'QuasiIdentity' },
    ESTp: { ENTp: 'Business', ISFp: 'Illusionary', ESFj: 'Benefit', INTj: 'Supervision', ENFj: 'Activity', ISTj: 'Mirror', ESTp: 'Identity', INFp: 'Dual', ESFp: 'Kindred', INTp: 'SemiDual', ENTj: 'Benefit', ISFj: 'Supervision', ESTj: 'QuasiIdentity', INFj: 'Conflict', ENFp: 'SuperEgo', ISTp: 'Contrary' },
    INFp: { ENTp: 'Illusionary', ISFp: 'Business', ESFj: 'Supervision', INTj: 'Benefit', ENFj: 'Mirror', ISTj: 'Activity', ESTp: 'Dual', INFp: 'Identity', ESFp: 'SemiDual', INTp: 'Kindred', ENTj: 'Supervision', ISFj: 'Benefit', ESTj: 'Conflict', INFj: 'QuasiIdentity', ENFp: 'Contrary', ISTp: 'SuperEgo' },

    // Gamma Quadra: SEE(ESFp), ILI(INTp), LIE(ENTj), ESI(ISFj)
    ESFp: { ENTp: 'SuperEgo', ISFp: 'Contrary', ESFj: 'QuasiIdentity', INTj: 'Conflict', ENFj: 'Benefit', ISTj: 'Supervision', ESTp: 'Kindred', INFp: 'SemiDual', ESFp: 'Identity', INTp: 'Dual', ENTj: 'Activity', ISFj: 'Mirror', ESTj: 'Benefit', INFj: 'Supervision', ENFp: 'Business', ISTp: 'Illusionary' },
    INTp: { ENTp: 'Contrary', ISFp: 'SuperEgo', ESFj: 'Conflict', INTj: 'QuasiIdentity', ENFj: 'Supervision', ISTj: 'Benefit', ESTp: 'SemiDual', INFp: 'Kindred', ESFp: 'Dual', INTp: 'Identity', ENTj: 'Mirror', ISFj: 'Activity', ESTj: 'Supervision', INFj: 'Benefit', ENFp: 'Illusionary', ISTp: 'Business' },
    ENTj: { ENTp: 'QuasiIdentity', ISFp: 'Conflict', ESFj: 'SuperEgo', INTj: 'Contrary', ENFj: 'Kindred', ISTj: 'SemiDual', ESTp: 'Benefit', INFp: 'Supervision', ESFp: 'Activity', INTp: 'Mirror', ENTj: 'Identity', ISFj: 'Dual', ESTj: 'Business', INFj: 'Illusionary', ENFp: 'Benefit', ISTp: 'Supervision' },
    ISFj: { ENTp: 'Conflict', ISFp: 'QuasiIdentity', ESFj: 'Contrary', INTj: 'SuperEgo', ENFj: 'SemiDual', ISTj: 'Kindred', ESTp: 'Supervision', INFp: 'Benefit', ESFp: 'Mirror', INTp: 'Activity', ENTj: 'Dual', ISFj: 'Identity', ESTj: 'Illusionary', INFj: 'Business', ENFp: 'Supervision', ISTp: 'Benefit' },

    // Delta Quadra: LSE(ESTj), EII(INFj), IEE(ENFp), SLI(ISTp)
    ESTj: { ENTp: 'Benefit', ISFp: 'Supervision', ESFj: 'Kindred', INTj: 'SemiDual', ENFj: 'SuperEgo', ISTj: 'Contrary', ESTp: 'QuasiIdentity', INFp: 'Conflict', ESFp: 'Benefit', INTp: 'Supervision', ENTj: 'Business', ISFj: 'Illusionary', ESTj: 'Identity', INFj: 'Dual', ENFp: 'Activity', ISTp: 'Mirror' },
    INFj: { ENTp: 'Supervision', ISFp: 'Benefit', ESFj: 'SemiDual', INTj: 'Kindred', ENFj: 'Contrary', ISTj: 'SuperEgo', ESTp: 'Conflict', INFp: 'QuasiIdentity', ESFp: 'Supervision', INTp: 'Benefit', ENTj: 'Illusionary', ISFj: 'Business', ESTj: 'Dual', INFj: 'Identity', ENFp: 'Mirror', ISTp: 'Activity' },
    ENFp: { ENTp: 'Kindred', ISFp: 'SemiDual', ESFj: 'Benefit', INTj: 'Supervision', ENFj: 'QuasiIdentity', ISTj: 'Conflict', ESTp: 'SuperEgo', INFp: 'Contrary', ESFp: 'Business', INTp: 'Illusionary', ENTj: 'Benefit', ISFj: 'Supervision', ESTj: 'Activity', INFj: 'Mirror', ENFp: 'Identity', ISTp: 'Dual' },
    ISTp: { ENTp: 'SemiDual', ISFp: 'Kindred', ESFj: 'Supervision', INTj: 'Benefit', ENFj: 'Conflict', ISTj: 'QuasiIdentity', ESTp: 'Contrary', INFp: 'SuperEgo', ESFp: 'Illusionary', INTp: 'Business', ENTj: 'Supervision', ISFj: 'Benefit', ESTj: 'Mirror', INFj: 'Activity', ENFp: 'Dual', ISTp: 'Identity' },
};

/**
 * 2つのタイプの相性関係を取得する
 */
export function getCompatibility(typeA: OSTypeCode, typeB: OSTypeCode): RelationDefinition {
    const relationType = COMPATIBILITY_MAP[typeA][typeB];
    return RELATION_DEFINITIONS[relationType];
}

/**
 * あるタイプの全相性一覧を星評価の降順で取得する
 */
export function getAllCompatibilities(typeCode: OSTypeCode): { targetCode: OSTypeCode; relation: RelationDefinition }[] {
    const allTypes = Object.keys(COMPATIBILITY_MAP[typeCode]) as OSTypeCode[];
    return allTypes
        .filter((code) => code !== typeCode)
        .map((targetCode) => ({
            targetCode,
            relation: getCompatibility(typeCode, targetCode),
        }))
        .sort((a, b) => b.relation.stars - a.relation.stars);
}
