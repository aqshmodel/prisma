import type { QuadrantType } from '@/features/mini-diagnosis/data/mini-types';
import type { OSTypeCode } from '@/types/diagnosis';

/**
 * クイズ質問の型定義
 */
export interface QuizQuestion {
    id: string;
    /** 質問テキスト */
    text: string;
    /** 選択肢A: テキスト */
    choiceA: string;
    /** 選択肢B: テキスト */
    choiceB: string;
    /** A を選んだ場合に残る候補 */
    resultIfA: OSTypeCode[] | QuadrantType[];
    /** B を選んだ場合に残る候補 */
    resultIfB: OSTypeCode[] | QuadrantType[];
}

/**
 * トーナメントの Stage
 */
export type TournamentStage = 'intro' | 'stage1' | 'stage2' | 'complete';

/**
 * トーナメントの状態
 */
export interface TournamentState {
    stage: TournamentStage;
    currentQuestionIndex: number;
    /** Stage 1の回答から確定したQuadra (stage2移行時に設定) */
    determinedQuadra: QuadrantType | null;
    /** Stage 2で残っている候補タイプ */
    remainingTypes: OSTypeCode[];
    /** 最終確定タイプ */
    determinedType: OSTypeCode | null;
    /** 全回答ログ */
    answers: Record<string, 'A' | 'B'>;
}

/**
 * Stage 1: Quadra 判定用の2問
 *
 * Q1: Merry vs Serious → (Alpha/Beta) vs (Gamma/Delta)
 * Q2: Judicious vs Decisive → Quadra確定
 */
export const STAGE1_QUESTIONS: QuizQuestion[] = [
    {
        id: 's1-q1',
        text: 'あなたの人間関係の傾向は？',
        choiceA: '場の雰囲気を明るくして、みんなで楽しむのが好き。感情をオープンに共有できる関係が心地いい。',
        choiceB: '少数の信頼できる人と深くつながる方が好き。表面的な盛り上がりよりも、本音の関係を大切にする。',
        resultIfA: ['Alpha', 'Beta'] as QuadrantType[],
        resultIfB: ['Gamma', 'Delta'] as QuadrantType[],
    },
    {
        id: 's1-q2',
        text: 'あなたの行動パターンは？',
        choiceA: 'いろんな可能性を探り、慎重に検討する。日常の安定や心地よさも大切にしたい。',
        choiceB: '明確な目標に向かって一直線。大胆に行動して結果を出すことにこだわる。',
        resultIfA: ['Alpha', 'Delta'] as QuadrantType[],
        resultIfB: ['Beta', 'Gamma'] as QuadrantType[],
    },
];

/**
 * Stage 2: Quadra内の4タイプから1タイプに絞り込む3問
 * 各Quadraごとに3問ずつ定義
 *
 * 構造:
 * Q1: E/I 判定（4→2タイプに）
 * Q2: 各Quadra内で最も識別力の高い軸で判定（2→最終確定 or 最終2択）
 * Q3: 最終確認（2→1タイプに）
 */
export const STAGE2_QUESTIONS: Record<QuadrantType, QuizQuestion[]> = {
    // Alpha: ENTp(ILE), ISFp(SEI), ESFj(ESE), INTj(LII)
    Alpha: [
        {
            id: 'alpha-q1',
            text: 'エネルギーを得られるのはどんなとき？',
            choiceA: '人と議論したり、新しいアイデアを語り合う時間にワクワクする。外の刺激が自分を動かす。',
            choiceB: '一人で考え事をしたり、静かな空間で過ごす時間に充電される。外の刺激は疲れることもある。',
            resultIfA: ['ENTp', 'ESFj'],
            resultIfB: ['ISFp', 'INTj'],
        },
        {
            id: 'alpha-q2',
            text: 'より自分に近いのは？',
            choiceA: 'アイデアや理論に惹かれる。「なぜ？」「もしこうなったら？」と考えるのが好き。論理的な思考を重視する。',
            choiceB: '人の気持ちや雰囲気に敏感。居心地の良い空間を作ったり、人を笑顔にすることに喜びを感じる。',
            resultIfA: ['ENTp', 'INTj'],
            resultIfB: ['ESFj', 'ISFp'],
        },
        {
            id: 'alpha-q3',
            text: '最後にあと一つ。ピンとくるのは？',
            choiceA: '既存の枠に収まらない自由な発想で、常識を覆すアイデアを生み出す。完了より発見が大事。',
            choiceB: '理論を体系的に整理し、物事の本質を深く理解することに情熱を燃やす。一貫性を重視する。',
            resultIfA: ['ENTp'],
            resultIfB: ['INTj'],
        },
    ],

    // Beta: ENFj(EIE), ISTj(LSI), ESTp(SLE), INFp(IEI)
    Beta: [
        {
            id: 'beta-q1',
            text: 'エネルギーを得られるのはどんなとき？',
            choiceA: '仲間の前で自分のビジョンや感情を熱く語ったり、チームを率いて突き進むとき。',
            choiceB: '一人で内省し、世界の深い意味や自分の理想について静かに思いを馳せるとき。',
            resultIfA: ['ENFj', 'ESTp'],
            resultIfB: ['ISTj', 'INFp'],
        },
        {
            id: 'beta-q2',
            text: 'より自分に近いのは？',
            choiceA: '感情やビジョンが自分を動かす。人の心を揺さぶったり、理想の未来を描くことに情熱を注ぐ。',
            choiceB: '事実と秩序を重視する。規律を守り、具体的な行動で結果を出すことにこだわる。',
            resultIfA: ['ENFj', 'INFp'],
            resultIfB: ['ESTp', 'ISTj'],
        },
        {
            id: 'beta-q3',
            text: '最後にあと一つ。ピンとくるのは？',
            choiceA: '人々にインスピレーションを与え、大きなムーブメントを起こしたい。感化力で世界を変える。',
            choiceB: '秩序とルールを守ることで組織を支える。責任感と正確さが自分の強み。',
            resultIfA: ['ENFj'],
            resultIfB: ['ISTj'],
        },
    ],

    // Gamma: ESFp(SEE), INTp(ILI), ENTj(LIE), ISFj(ESI)
    Gamma: [
        {
            id: 'gamma-q1',
            text: 'エネルギーを得られるのはどんなとき？',
            choiceA: '人と積極的に関わり、ビジネスや交渉の場でインパクトを出せたとき。行動力が武器。',
            choiceB: '一人で深く分析し、物事の本質や将来のリスクを見通せたとき。観察力が武器。',
            resultIfA: ['ESFp', 'ENTj'],
            resultIfB: ['INTp', 'ISFj'],
        },
        {
            id: 'gamma-q2',
            text: 'より自分に近いのは？',
            choiceA: '効率と結果を重視する。目標達成のために論理的に戦略を立て、合理的に動く。',
            choiceB: '人の本質を見抜き、信頼できるかどうかを大切にする。誠実さと道義心が譲れないライン。',
            resultIfA: ['ENTj', 'INTp'],
            resultIfB: ['ESFp', 'ISFj'],
        },
        {
            id: 'gamma-q3',
            text: '最後にあと一つ。ピンとくるのは？',
            choiceA: '効率重視で目標に向かって突き進む。利益を最大化するための戦略と実行力が強み。',
            choiceB: '物事の裏に潜むリスクや矛盾を鋭く見抜く。批判的思考と深い洞察力が強み。',
            resultIfA: ['ENTj'],
            resultIfB: ['INTp'],
        },
    ],

    // Delta: ESTj(LSE), INFj(EII), ENFp(IEE), ISTp(SLI)
    Delta: [
        {
            id: 'delta-q1',
            text: 'エネルギーを得られるのはどんなとき？',
            choiceA: '人と協力して何かを成し遂げたり、新しい可能性を一緒に探るとき。',
            choiceB: '自分のペースでコツコツと技術や知識を磨いたり、好きなことに没頭するとき。',
            resultIfA: ['ESTj', 'ENFp'],
            resultIfB: ['INFj', 'ISTp'],
        },
        {
            id: 'delta-q2',
            text: 'より自分に近いのは？',
            choiceA: '実用的で効率的なやり方を追求する。管理能力と責任感で組織を動かすことに長けている。',
            choiceB: '一人ひとりの個性や可能性を大切にする。人との深い心のつながりに真の価値を見出す。',
            resultIfA: ['ESTj', 'ISTp'],
            resultIfB: ['INFj', 'ENFp'],
        },
        {
            id: 'delta-q3',
            text: '最後にあと一つ。ピンとくるのは？',
            choiceA: 'チームを管理し、効率的にプロジェクトを完遂させることに強い責任を感じる。結果を出す。',
            choiceB: 'すべての人が自分らしくいられる世界を静かに信じている。共感と調和が自分の芯。',
            resultIfA: ['ESTj'],
            resultIfB: ['INFj'],
        },
    ],
};
