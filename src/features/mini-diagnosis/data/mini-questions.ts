import type { MiniQuestion } from './mini-types';

/**
 * ミニ診断用の10問
 *
 * Reinin dichotomy の2軸で Quadra を判定する:
 * - Merry/Serious 軸 (5問): Fe（外向的感情）vs Fi（内向的感情）の価値判断
 * - Judicious/Decisive 軸 (5問): Ne+Si vs Ni+Se の認知傾向
 *
 * 選択肢A = Merry寄り or Judicious寄り（スコア加算）
 * 選択肢B = Serious寄り or Decisive寄り（スコア加算なし）
 */
export const MINI_QUESTIONS: MiniQuestion[] = [
    // === Merry/Serious 軸（5問）===
    // Fe（感情の共有・集団の盛り上がり）vs Fi（個人の誠実さ・深い信頼）
    {
        id: 1,
        text: '人と過ごすときに大切にしていること',
        choiceA: '場の雰囲気を明るくし、みんなが楽しめる空気を作ること。笑いや冗談が飛び交う時間が一番心地いい。',
        choiceB: '表面的な盛り上がりより、本音で向き合える関係を築くこと。たとえ静かでも、誠実なやりとりの方が価値がある。',
        axis: 'merry-serious',
    },
    {
        id: 2,
        text: '友人が落ち込んでいるとき',
        choiceA: '楽しい話題を振ったり、気分転換に誘ったりして、まずは気持ちを明るくしてあげたい。',
        choiceB: 'じっくり話を聞いて、相手の感情を受け止めてあげたい。無理に元気づけるのは違う気がする。',
        axis: 'merry-serious',
    },
    {
        id: 3,
        text: '初対面の人との会話',
        choiceA: '軽い冗談や共通の話題で場を温め、すぐに打ち解けた雰囲気を作れる方がいい。',
        choiceB: '最初からフレンドリーすぎるのは苦手。ゆっくり信頼関係を築いてから、本当の自分を見せたい。',
        axis: 'merry-serious',
    },
    {
        id: 4,
        text: 'チームで意見が割れたとき',
        choiceA: '対立を長引かせるのは雰囲気が悪くなるので、早めに折り合いをつけて前に進みたい。',
        choiceB: '安易に妥協するのは嫌。各自が本当に納得できる結論が出るまで、粘り強く議論したい。',
        axis: 'merry-serious',
    },
    {
        id: 5,
        text: '人間関係で重視するもの',
        choiceA: '一緒にいて楽しいかどうか。ノリが合って、気軽に誘い合える関係が心地いい。',
        choiceB: '信頼できるかどうか。少人数でいいから、裏表のない深い絆で結ばれた関係がいい。',
        axis: 'merry-serious',
    },

    // === Judicious/Decisive 軸（5問）===
    // Ne+Si（可能性の探索＋日常の心地よさ）vs Ni+Se（長期的ビジョン＋即時行動力）
    {
        id: 6,
        text: '新しいプロジェクトに取り組むとき',
        choiceA: 'いろんな可能性を探って、面白そうなアイデアを広げてから方向性を決めたい。',
        choiceB: '最終的にどうなるべきかのビジョンを先に描き、そこに向かって一直線に進みたい。',
        axis: 'judicious-decisive',
    },
    {
        id: 7,
        text: '日常生活のスタイル',
        choiceA: '心地よいルーティンや慣れた環境を大切にする。お気に入りのカフェ、いつもの道が落ち着く。',
        choiceB: '刺激や変化がないと退屈する。新しい場所、新しい体験を積極的に求めたい。',
        axis: 'judicious-decisive',
    },
    {
        id: 8,
        text: '決断のスタイル',
        choiceA: 'いろんな角度から検討し、慎重に判断したい。急いで決めると後悔しそう。',
        choiceB: '考えすぎると機を逃す。直感を信じて素早く決めて、走りながら修正する方がいい。',
        axis: 'judicious-decisive',
    },
    {
        id: 9,
        text: '困難な状況に直面したとき',
        choiceA: '過去の経験や蓄積した知恵を活かして、堅実に乗り越える方法を探る。',
        choiceB: '状況を打開するために、大胆に行動して一気に流れを変えたい。',
        axis: 'judicious-decisive',
    },
    {
        id: 10,
        text: '理想のキャリアの形',
        choiceA: '幅広い知識やスキルを身につけ、複数の選択肢を持っておきたい。可能性を狭めたくない。',
        choiceB: '「これだ」という一つの道を見極めて、そこに全力で集中投資したい。結果が全て。',
        axis: 'judicious-decisive',
    },
];
