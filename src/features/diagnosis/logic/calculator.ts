import { type Answers, type DiagnosisResult, type OSTypeCode, type EngineType, type BiasType, type Subtype } from '../../../types/diagnosis';

// --- Constants & Config ---

/**
 * 診断ロジックで使用する閾値や定数
 * 
 * OS: Socionicsのタイプ判定に使用するスコア閾値
 * SUBTYPE: Contact / Inert サブタイプ判定のスコア閾値
 */
const THRESHOLDS = {
    OS: {
        E_SCORE: 3, // E判定に必要な最小スコア
        N_SCORE: 4, // N判定に必要な最小スコア (N >= 4 -> N)
        N_SCORE_LOW: 2, // N <= 2 -> S
        T_SCORE: 4, // T判定に必要な最小スコア
        T_SCORE_LOW: 2, // T <= 2 -> F
        J_SCORE: 4, // J判定に必要な最小スコア
        J_SCORE_LOW: 2, // J <= 2 -> P
    },
    SUBTYPE: {
        CONTACT_MIN: 13, // Contact判定に必要な最小スコア
        INERT_MAX: 11,   // Inert判定に必要な最大スコア
    }
} as const;


// --- Logic Implementation ---

/**
 * 回答から診断結果を計算するメイン関数
 * 
 * 処理フロー:
 * 1. calculateOS: 4つの指標 (E/I, N/S, F/T, J/P) を算出し、16タイプを決定
 * 2. calculateSubtype: 行動特性からサブタイプ (Contact/Inert) を決定
 * 3. calculateEngine: 回答パターンから主要機能 (Primary Engine) を特定
 * 4. calculateBias: 特定の回答組み合わせから認知バイアスを検出
 * 5. calculateMatrix: UI表示用のマトリクス座標を計算
 * 6. checkValidity: 回答の一貫性を検証
 * 
 * @param answers ユーザーの回答記録
 * @returns 診断結果オブジェクト
 */
export const calculateDiagnosis = (answers: Answers): DiagnosisResult => {
    const osResult = calculateOS(answers);
    const subtype = calculateSubtype(osResult.code, answers);
    const engineResult = calculateEngine(answers, osResult.code);
    const biasResult = calculateBias(answers);
    const matrix = calculateMatrix(answers);
    const validity = checkValidity(osResult.code, engineResult.primary, biasResult.totalScore);

    return {
        os: {
            code: osResult.code,
            subtype: subtype
        },
        engine: engineResult,
        bias: biasResult,
        matrix: matrix,
        validity: validity as 'A' | 'B' | 'C',
        // rawScores: osResult.scores, // Removed as it's not in the type definition yet
        timestamp: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    };
};

/**
 * OSタイプ (Socionics 16タイプ) を計算する
 * 
 * ロジック:
 * ユーザーの回答から E, N, T, J のスコアを集計し、閾値と比較して各指標を決定する。
 * 閾値付近の場合はタイブレーカーとして特定の質問の回答を参照する。
 */
const calculateOS = (answers: Answers): { code: OSTypeCode, scores: Record<string, number> } => {
    // 1. E (Extrovert) vs I (Introvert)
    let scoreE = 0;
    if (answers[1] === 'A') scoreE++;
    if (answers[8] === 'A') scoreE++;
    if (answers[12] === 'A') scoreE++;
    if (answers[27] === 'B') scoreE++;
    if (answers[32] === 'B') scoreE++;
    const isE = scoreE >= THRESHOLDS.OS.E_SCORE;

    // 2. N (Intuition) vs S (Sensing)
    let scoreN = 0;
    if (answers[4] === 'A') scoreN++;
    if (answers[6] === 'A') scoreN++;
    if (answers[9] === 'A') scoreN++;
    if (answers[13] === 'A') scoreN++;
    if (answers[17] === 'B') scoreN++;
    if (answers[19] === 'A') scoreN++;

    let isN = false;
    if (scoreN >= THRESHOLDS.OS.N_SCORE) isN = true;
    else if (scoreN <= THRESHOLDS.OS.N_SCORE_LOW) isN = false;
    else isN = answers[4] === 'A'; // Tie-breaker: Q4の回答を優先

    // 3. T (Thinking) vs F (Feeling)
    let scoreT = 0;
    if (answers[3] === 'B') scoreT++;
    if (answers[7] === 'B') scoreT++;
    if (answers[10] === 'B') scoreT++;
    if (answers[14] === 'B') scoreT++;
    if (answers[18] === 'A') scoreT++;
    if (answers[39] === 'B') scoreT++;

    let isT = false;
    if (scoreT >= THRESHOLDS.OS.T_SCORE) isT = true;
    else if (scoreT <= THRESHOLDS.OS.T_SCORE_LOW) isT = false;
    else isT = answers[14] === 'B'; // Tie-breaker: Q14の回答を優先

    // 4. j (Judging) vs p (Perceiving)
    // Socionicsでは小文字のj/pを使用。MBTIのJ/Pとは定義が一部異なるが、ここでは指標として扱う。
    let scoreJ = 0;
    if (answers[2] === 'B') scoreJ++;
    if (answers[5] === 'A') scoreJ++;
    if (answers[11] === 'A') scoreJ++;
    if (answers[15] === 'A') scoreJ++;
    if (answers[16] === 'B') scoreJ++;
    if (answers[20] === 'A') scoreJ++;

    let isJ = false;
    if (scoreJ >= THRESHOLDS.OS.J_SCORE) isJ = true;
    else if (scoreJ <= THRESHOLDS.OS.J_SCORE_LOW) isJ = false;
    else isJ = answers[15] === 'A'; // Tie-breaker: Q15の回答を優先

    // Construct Code
    // E/I + N/S + T/F + j/p -> e.g. ENTp
    const c1 = isE ? 'E' : 'I';
    const c2 = isN ? 'N' : 'S';
    const c3 = isT ? 'T' : 'F';
    const c4 = isJ ? 'j' : 'p';

    const code = `${c1}${c2}${c3}${c4}` as OSTypeCode;

    return { code, scores: { scoreE, scoreN, scoreT, scoreJ } };
};

/**
 * サブタイプ (Contact / Inert) を判定する
 * 
 * ロジック:
 * 専用機能へのアクセスのしやすさ、環境への働きかけの強さを測る質問群 (Q21-44) のスコア合計で判定。
 * Contact: 環境との接触が多い、変化に強い
 * Inert: 環境からの影響を遮断する、慣性が強い
 */
const calculateSubtype = (osCode: OSTypeCode, answers: Answers): Subtype => {
    let cs = 0; // Contact Score
    // Group 1
    if (answers[21] === 'B') cs++;
    if (answers[22] === 'A') cs++;
    if (answers[23] === 'B') cs++;
    if (answers[24] === 'B') cs++;
    if (answers[25] === 'A') cs++;
    if (answers[26] === 'B') cs++;
    // Group 2
    if (answers[27] === 'A') cs++;
    if (answers[28] === 'A') cs++;
    if (answers[29] === 'B') cs++;
    if (answers[30] === 'B') cs++;
    if (answers[31] === 'B') cs++;
    if (answers[32] === 'B') cs++;
    // Group 3
    if (answers[33] === 'B') cs++;
    if (answers[34] === 'A') cs++;
    if (answers[35] === 'B') cs++;
    if (answers[36] === 'B') cs++;
    if (answers[37] === 'A') cs++;
    if (answers[38] === 'B') cs++;
    // Group 4
    if (answers[39] === 'B') cs++;
    if (answers[40] === 'A') cs++;
    if (answers[41] === 'A') cs++;
    if (answers[42] === 'A') cs++;
    if (answers[43] === 'B') cs++;
    if (answers[44] === 'A') cs++;

    if (cs >= THRESHOLDS.SUBTYPE.CONTACT_MIN) return 'Contact';
    if (cs <= THRESHOLDS.SUBTYPE.INERT_MAX) return 'Inert';

    // Tie-breaker: E型はContact寄り、I型はInert寄りとする
    const isE = osCode.startsWith('E');
    return isE ? 'Contact' : 'Inert';
};

/**
 * エンジン (Primary/Secondary Engine) を決定する
 * 
 * ロジック:
 * 9つのエニアグラムタイプ的なエンジン (T1~T9) のスコアを集計し、優先順位を決定。
 * OSタイプとの整合性も考慮して重み付け (Priority Map) を行う。
 */
const calculateEngine = (answers: Answers, osCode: OSTypeCode): { primary: EngineType, secondary: EngineType } => {
    const scores: Record<EngineType, number> = {
        T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0, T7: 0, T8: 0, T9: 0
    };

    const add = (qId: number, typeA: EngineType, typeB: EngineType) => {
        if (answers[qId] === 'A') scores[typeA]++;
        else if (answers[qId] === 'B') scores[typeB]++;
    };

    // Q45-62: エンジン判定用の質問
    add(45, 'T1', 'T3');
    add(46, 'T2', 'T5');
    add(47, 'T6', 'T4');
    add(48, 'T7', 'T8');
    add(49, 'T9', 'T1');
    add(50, 'T2', 'T8');
    add(51, 'T3', 'T5');
    add(52, 'T7', 'T4');
    add(53, 'T6', 'T9');
    add(54, 'T1', 'T4');
    add(55, 'T2', 'T7');
    add(56, 'T3', 'T8');
    add(57, 'T5', 'T9');
    add(58, 'T6', 'T3');
    add(59, 'T1', 'T7');
    add(60, 'T2', 'T4');
    add(61, 'T5', 'T8');
    add(62, 'T6', 'T9');

    // ソートロジック
    const sorted = (Object.keys(scores) as EngineType[]).sort((a, b) => {
        const diff = scores[b] - scores[a];
        if (diff !== 0) return diff;

        // Priority Map Tie-breaker: スコアが同点の場合、OSタイプに基づいて優先順位を決定
        const isE = osCode.startsWith('E');
        const isI = !isE;

        // 3文字目で判断: Code (e.g., ENTp) の3文字目が T なら論理型、F なら倫理型
        const isLogic = osCode[2] === 'T';
        const isEthic = osCode[2] === 'F';

        // 優先度スコア (低いほど優先)
        const getPrio = (t: EngineType): number => {
            let p = 100; // Base priority

            // OSタイプに応じたボーナス付与 (優先度を下げる値)
            if (isE) {
                if (t === 'T3' || t === 'T7' || t === 'T8' || t === 'T2') p -= 10;
            }
            if (isI) {
                if (t === 'T5' || t === 'T4' || t === 'T9' || t === 'T1' || t === 'T6') p -= 10;
            }
            if (isLogic) {
                if (t === 'T5' || t === 'T3' || t === 'T8' || t === 'T1' || t === 'T6') p -= 5;
            }
            if (isEthic) {
                if (t === 'T2' || t === 'T4' || t === 'T7' || t === 'T9') p -= 5;
            }
            return p;
        };

        // タイブレーカー: 優先度関数の結果で比較
        // 同点の場合はQ45 (T1 vs T3) のような直接対決の結果を参照するのが理想だが、ここでは簡易化
        return getPrio(a) - getPrio(b);
    });

    return { primary: sorted[0], secondary: sorted[1] };
};

/**
 * 認知バイアススコアを計算する
 * 
 * ロジック:
 * 特定の質問ペア (e.g., Q63 & Q64) が両方とも 'A' 回答の場合、そのバイアスが強く出ているとみなす。
 */
const calculateBias = (answers: Answers): DiagnosisResult['bias'] => {
    const check = (q1: number, q2: number) => answers[q1] === 'A' && answers[q2] === 'A';
    const count = (q1: number, q2: number) => (answers[q1] === 'A' ? 1 : 0) + (answers[q2] === 'A' ? 1 : 0);

    const alerts: BiasType[] = [];
    if (check(63, 64)) alerts.push('Confirmation'); // 確証バイアス
    if (check(65, 66)) alerts.push('SunkCost');     // サンクコスト効果
    if (check(67, 68)) alerts.push('StatusQuo');    // 現状維持バイアス
    if (check(69, 70)) alerts.push('Authority');    // 権威バイアス
    if (check(71, 72)) alerts.push('Availability'); // 利用可能性ヒューリスティック

    const scores: Record<BiasType, number> = {
        Confirmation: count(63, 64),
        SunkCost: count(65, 66),
        StatusQuo: count(67, 68),
        Authority: count(69, 70),
        Availability: count(71, 72)
    };

    let totalScore = 0;
    Object.values(scores).forEach(s => totalScore += s);

    return { scores, alerts, totalScore };
};

/**
 * マトリクスチャート表示用のX, Y座標を計算する
 * 
 * X軸: Logical (論理) vs Emotional (感情)
 * Y軸: Innovation (革新/直観) vs Traditional (伝統/感覚)
 */
const calculateMatrix = (answers: Answers): DiagnosisResult['matrix'] => {
    // X: Logical vs Emotional 0.0 - 10.0
    // Tスコアを利用して計算
    let scoreT = 0;
    if (answers[3] === 'B') scoreT++;
    if (answers[7] === 'B') scoreT++;
    if (answers[10] === 'B') scoreT++;
    if (answers[14] === 'B') scoreT++;
    if (answers[18] === 'A') scoreT++;
    if (answers[39] === 'B') scoreT++;

    // Tスコアが高いほど Logical (右側)
    const x = (scoreT / 6) * 10;

    // Y: Innovation vs Traditional
    // NスコアとP傾向スコアを組み合わせて計算
    let scoreN = 0;
    if (answers[4] === 'A') scoreN++;
    if (answers[6] === 'A') scoreN++;
    if (answers[9] === 'A') scoreN++;
    if (answers[13] === 'A') scoreN++;
    if (answers[17] === 'B') scoreN++;
    if (answers[19] === 'A') scoreN++;

    // Jスコアの逆をPスコアとする
    let scoreJ = 0;
    if (answers[2] === 'B') scoreJ++;
    if (answers[5] === 'A') scoreJ++;
    if (answers[11] === 'A') scoreJ++;
    if (answers[15] === 'A') scoreJ++;
    if (answers[16] === 'B') scoreJ++;
    if (answers[20] === 'A') scoreJ++;

    const scoreP = 6 - scoreJ;

    // NスコアとPスコアが高いほど Innovation (上側)
    const y = ((scoreN + scoreP) / 12) * 10;

    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
};

/**
 * 回答の整合性をチェックする (簡易版)
 * 
 * ロジック:
 * OSタイプと選択されたエンジンの間に矛盾がないかチェックする。
 * 例: T型なのにF系のエンジンが強く出ている、など。
 */
const checkValidity = (osCode: OSTypeCode, engine: EngineType, riskScore: number): string => { // returns 'A' | 'B' | 'C'
    let flags = 0;
    let isMasking = false;

    const isI = osCode[0] === 'I';
    const isLogic = osCode[2] === 'T';

    // 1. T/F contradiction
    // 論理型(Logic)なのに、感情系エンジン(T2:助ける人, T4:個性を求める人)が出る矛盾
    if (isLogic && (engine === 'T2' || engine === 'T4')) flags++;

    // 2. E/I contradiction
    // 内向型(I)なのに、達成や対決を好むエンジン(T3:達成する人, T8:挑戦する人)が出る矛盾
    if (isI && (engine === 'T3' || engine === 'T8')) flags++;

    // 3. Superman detection (回答操作の疑い)
    // リスクスコアが0 でかつ 達成型エンジン が出ている場合など
    if (riskScore === 0 && engine === 'T3') isMasking = true;

    if (isMasking || flags >= 2) return 'C';
    if (flags === 1) return 'B';
    return 'A';
};
