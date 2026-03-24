import type { Locale } from './types';

/**
 * UI テキスト辞書の型定義
 * 全言語で同じキーを持つことが型により保証される。
 */
export interface UIText {
    // --- 診断ウィザード ---
    diagnosis: {
        sectionNames: {
            os: string;
            subtype: string;
            engine: string;
            bias: string;
        };
        aboutMinutes: string;
        remainingMinutes: (n: number) => string;
        abort: string;
        back: string;
        next: string;
        complete: string;
        abortConfirm: string;
        answeredOf: (answered: number, total: number) => string;
        transitions: {
            /** 思考パターン → 行動傾向 */
            s1: string;
            /** 行動傾向 → 行動エンジン */
            s2: string;
            /** 行動エンジン → 判断バイアス */
            s3: string;
        };
    };

    // --- 結果ページ ---
    result: {
        title: string;
        noData: string;
        backToTop: string;
        retakeDiagnosis: string;
        shareTitle: string;
        shareText: (osName: string) => string;
        tabs: {
            overview: string;
            psychology: string;
            relations: string;
            career: string;
            growth: string;
        };
    };

    // --- 結果ページ : OverviewTab ---
    overviewTab: {
        engine: string;
        stressReaction: string;
        growthHint: string;
        baseType: string;
        bestMatch: string;
        caution: string;
        yourCombo: string;
        comboCaption: (osName: string, engineName: string) => string;
        typePosition: string;
        viewProfile: string;
        quadrantTopLeft: string;
        quadrantTopLeftDesc: string;
        quadrantTopRight: string;
        quadrantTopRightDesc: string;
        quadrantBottomLeft: string;
        quadrantBottomLeftDesc: string;
        quadrantBottomRight: string;
        quadrantBottomRightDesc: string;
    };

    // --- AnalysisTab ---
    analysisTab: {
        profile: string;
        strengths: string;
        weaknesses: string;
        aruaru: string;
        deepPsychology: string;
        coreDesire: string;
        blindSpot: string;
        flowState: string;
        cognitiveHabits: string;
        detected: string;
        highRisk: string;
        medRisk: string;
        countermeasure: string;
    };

    // --- WorkTab ---
    workTab: {
        workStyle: string;
        mission: string;
        style: string;
        motivation: string;
        management: string;
        teamBehavior: string;
        energyRhythm: string;
        careerPath: string;
        sideProjects: string;
        ngEnvironments: string;
        ngEnvLabel: string;
        motivationKillers: string;
        bossCompat: string;
        idealBoss: string;
        idealSubordinate: string;
        careerRisk: string;
        trapPattern: string;
        quitTrigger: string;
        prevention: string;
        moneyStyle: string;
        lossPattern: string;
        negotiationHabit: string;
        earningStrategy: string;
    };

    // --- RelationsTab ---
    relationsTab: {
        commTitle: string;
        manual: string;
        doComm: string;
        dontComm: string;
        friendFamily: string;
        friendship: string;
        familyRole: string;
        compatDetails: string;
        bestCompat: string;
        cautionCompat: string;
        viewAll16: string;
    };

    // --- GrowthTab ---
    growthTab: {
        advice: string;
        roadmap: string;
        levelLabels: [string, string, string];
    };

    // --- ResultCompatibilityCTA ---
    compatCta: {
        badge: string;
        title: string;
        subtitle: string;
        bestLabel: string;
        bestLink: string;
        challengeLabel: string;
        challengeDesc: string;
        challengeLink: string;
        viewAll16: string;
    };

    // --- VerbalHabitsSection ---
    verbalHabits: {
        title: string;
        phrases: string;
        innerVoice: string;
        triggerWords: string;
    };

    // --- StressManualSection ---
    stressManual: {
        title: string;
        stressResponse: string;
        recoveryHint: string;
        signTitle: string;
        ngActions: string;
        recoveryPlan: string;
        quick: string;
        medium: string;
        full: string;
    };

    // --- LoveStyleSection ---
    loveStyle: {
        title: string;
        partnerImage: string;
        conflictTrigger: string;
        fallingPattern: string;
        attachmentType: string;
        breakTrigger: string;
    };

    // --- CompatibilityScoreTable ---
    compatTable: {
        title: string;
        close: string;
        showMore: (n: number) => string;
    };

    // --- 相性 ---
    compatibility: {
        title: string;
        overallView: string;
        workCompat: string;
        loveCompat: string;
        dos: string;
        donts: string;
        concreteTip: string;
        faq: string;
    };

    // --- ヘッダー・フッター ---
    nav: {
        compatibility: string;
        articles: string;
        glossary: string;
        service: string;
        typeList: string;
        about: string;
        diagnosticLogic: string;
        enneagram: string;
        socionics: string;
        editorialPolicy: string;
        legal: string;
        terms: string;
        privacy: string;
        contact: string;
        operator: string;
        footerDescription: string;
    };
}

/**
 * 全言語の UI テキスト辞書
 * Record<Locale, UIText> により、新しい言語追加時にキーの漏れをコンパイル時に検知する。
 */
export const UI_TEXT: Record<Locale, UIText> = {
    ja: {
        diagnosis: {
            sectionNames: {
                os: '思考パターン',
                subtype: '行動傾向',
                engine: '行動エンジン',
                bias: '判断バイアス',
            },
            aboutMinutes: '約10分',
            remainingMinutes: (n: number) => `あと約${n}分`,
            abort: '中断',
            back: '戻る',
            next: '次へ',
            complete: '診断完了',
            abortConfirm: '診断を中断しますか？\n回答データは保持されるため、後から再開できます。',
            answeredOf: (answered: number, total: number) => `${answered} / ${total} 問回答済み`,
            transitions: {
                s1: '✅ 思考パターン編 完了！\n次は「行動傾向」を測定します。',
                s2: '✅ 行動傾向編 完了！\n次は「行動エンジン（モチベーション）」を測定します。',
                s3: '✅ 行動エンジン編 完了！\n最後に「判断バイアス」をチェックします。',
            },
        },
        result: {
            title: 'あなたの診断結果',
            noData: '診断データが見つかりませんでした。',
            backToTop: 'トップに戻る',
            retakeDiagnosis: '診断をやり直す',
            shareTitle: '性格診断結果をシェアする',
            shareText: (osName: string) => `あなたは ${osName} タイプです！ #AqshPrisma`,
            tabs: {
                overview: 'サマリ',
                psychology: '性格分析',
                relations: '人間関係',
                career: '仕事・適職',
                growth: '成長ロードマップ',
            },
        },
        overviewTab: {
            engine: '駆動エンジン',
            stressReaction: '⚠️ ストレス反応',
            growthHint: '🌱 成長へのヒント',
            baseType: '基本タイプ',
            bestMatch: '相性最高',
            caution: '要注意',
            yourCombo: 'あなただけの組み合わせ',
            comboCaption: (osName: string, engineName: string) => `${osName} × ${engineName} の組み合わせ解説`,
            typePosition: 'タイプポジション',
            viewProfile: '詳細プロファイルを見る',
            quadrantTopLeft: '左上: 伝統・規律',
            quadrantTopLeftDesc: '確実性と安定を重視し、組織の基盤を支える守り手。',
            quadrantTopRight: '右上: 革新・論理',
            quadrantTopRightDesc: '合理性と成果を追求し、変革を推進する開拓者。',
            quadrantBottomLeft: '左下: 協調・感情',
            quadrantBottomLeftDesc: '人の和と調和を尊び、チームの接着剤となる調整役。',
            quadrantBottomRight: '右下: 自由・直感',
            quadrantBottomRightDesc: '可能性と独自性を愛し、新しい風を吹き込む創作者。',
        },
        analysisTab: {
            profile: '基本プロファイル',
            strengths: '強み',
            weaknesses: '弱点',
            aruaru: 'あるある',
            deepPsychology: '深層心理',
            coreDesire: '根源的欲求',
            blindSpot: '盲点',
            flowState: 'フロー状態',
            cognitiveHabits: '思考のクセ診断',
            detected: '検出数',
            highRisk: '高リスク',
            medRisk: '中リスク',
            countermeasure: '対策アプローチ',
        },
        workTab: {
            workStyle: 'ワークスタイル分析',
            mission: 'ミッション',
            style: '働き方のスタイル',
            motivation: 'モチベーションの源泉',
            management: 'マネジメント適性',
            teamBehavior: '会議・チームでの振る舞い',
            energyRhythm: '仕事エネルギーのリズム',
            careerPath: '適職・キャリアパス',
            sideProjects: '副業・サイドプロジェクト適性',
            ngEnvironments: '避けるべき環境・モチベーションキラー',
            ngEnvLabel: 'この性格タイプに合わない環境',
            motivationKillers: 'やる気を殺す3大要素',
            bossCompat: '上司・部下の相性',
            idealBoss: 'こういう上司の下で力を発揮する',
            idealSubordinate: 'こういう部下と相性がいい',
            careerRisk: 'キャリアの危険信号',
            trapPattern: '陥りがちなパターン',
            quitTrigger: '転職の引き金になりやすいこと',
            prevention: '予防策',
            moneyStyle: 'お金と交渉の傾向',
            lossPattern: '損しやすいパターン',
            negotiationHabit: '交渉のクセ',
            earningStrategy: '収入アップの戦略',
        },
        relationsTab: {
            commTitle: '人間関係とコミュニケーション',
            manual: '周囲への取扱説明書',
            doComm: '効果的な接し方',
            dontComm: '避けるべき接し方',
            friendFamily: '友人・家族の傾向',
            friendship: '友人関係の傾向',
            familyRole: '家族内での役割',
            compatDetails: '相性をもっと詳しく',
            bestCompat: '最高の相性',
            cautionCompat: '要注意の相手',
            viewAll16: '全16タイプとの相性を見る',
        },
        growthTab: {
            advice: '成長へのアドバイス',
            roadmap: '成長ロードマップ',
            levelLabels: ['Lv.1 基礎', 'Lv.2 応用', 'Lv.3 実践'],
        },
        compatCta: {
            badge: '特別な相性',
            title: '特別な相性のパートナー',
            subtitle: 'あなたにとって最も重要な意味を持つ2つのタイプをチェックしましょう',
            bestLabel: '最高の相性（双対関係）',
            bestLink: '最高の相性を見る',
            challengeLabel: '成長を促す相手（衝突関係）',
            challengeDesc: '価値観が根本的に異なり摩擦が起きやすい反面、自分にない視点を学べる成長の鍵となる相手です。',
            challengeLink: '接し方のコツを見る',
            viewAll16: '全16タイプとの相性を見る',
        },
        verbalHabits: {
            title: '口ぐせ・思考パターン',
            phrases: 'よく言う口ぐせ',
            innerVoice: '心の中のつぶやき',
            triggerWords: '地雷ワード',
        },
        stressManual: {
            title: 'ストレス取扱マニュアル',
            stressResponse: 'ストレス下の反応',
            recoveryHint: '回復のヒント',
            signTitle: '疲れている時のサイン',
            ngActions: 'やりがちなNG行動',
            recoveryPlan: 'リカバリープラン',
            quick: '5分',
            medium: '30分',
            full: '1日',
        },
        loveStyle: {
            title: '恋愛の傾向',
            partnerImage: '求めるパートナー像',
            conflictTrigger: '対立のトリガー',
            fallingPattern: '恋に落ちるパターン',
            attachmentType: '付き合い方の傾向',
            breakTrigger: '別れの引き金',
        },
        compatTable: {
            title: '全タイプとの相性一覧',
            close: '閉じる',
            showMore: (n: number) => `残り ${n} タイプを表示`,
        },
        compatibility: {
            title: 'タイプ別相性診断',
            overallView: '相性の全体像',
            workCompat: '仕事での相性',
            loveCompat: '恋愛での相性',
            dos: 'こうすると◎',
            donts: 'これはNG',
            concreteTip: '具体的なシーン',
            faq: 'よくある質問',
        },
        nav: {
            compatibility: '相性診断',
            articles: 'コラム',
            glossary: '用語集',
            service: 'サービス',
            typeList: 'タイプ一覧',
            about: 'About',
            diagnosticLogic: '診断ロジック',
            enneagram: 'エニアグラムとは',
            socionics: 'ソシオニクスとは',
            editorialPolicy: '編集方針',
            legal: '規約・サポート',
            terms: '利用規約',
            privacy: 'プライバシーポリシー',
            contact: 'お問い合わせ',
            operator: '運営会社: Aqsh株式会社',
            footerDescription: '科学的な組織診断と性格分析で、\nチームの可能性を最大化し、個人の生きづらさを解消する。',
        },
    },
    en: {
        diagnosis: {
            sectionNames: {
                os: 'Thinking Patterns',
                subtype: 'Behavioral Tendencies',
                engine: 'Motivation Engine',
                bias: 'Judgment Bias',
            },
            aboutMinutes: 'About 10 min',
            remainingMinutes: (n: number) => `About ${n} min left`,
            abort: 'Quit',
            back: 'Back',
            next: 'Next',
            complete: 'Complete',
            abortConfirm: 'Quit the diagnosis?\nYour answers will be saved so you can resume later.',
            answeredOf: (answered: number, total: number) => `${answered} / ${total} answered`,
            transitions: {
                s1: '✅ Thinking Patterns complete!\nNext: Behavioral Tendencies.',
                s2: '✅ Behavioral Tendencies complete!\nNext: Motivation Engine.',
                s3: '✅ Motivation Engine complete!\nFinally: Judgment Bias check.',
            },
        },
        result: {
            title: 'Your Results',
            noData: 'No diagnosis data found.',
            backToTop: 'Back to Top',
            retakeDiagnosis: 'Retake Diagnosis',
            shareTitle: 'Share Your Personality Diagnosis',
            shareText: (osName: string) => `I'm a ${osName} type! #AqshPrisma`,
            tabs: {
                overview: 'Overview',
                psychology: 'Psychology',
                relations: 'Relations',
                career: 'Career',
                growth: 'Growth',
            },
        },
        overviewTab: {
            engine: 'Motivation Engine',
            stressReaction: '⚠️ Stress Response',
            growthHint: '🌱 Growth Tips',
            baseType: 'Base Type',
            bestMatch: 'Best Match',
            caution: 'Watch Out',
            yourCombo: 'Your Unique Combination',
            comboCaption: (osName: string, engineName: string) => `${osName} × ${engineName} profile`,
            typePosition: 'Type Position',
            viewProfile: 'View Full Profile',
            quadrantTopLeft: 'Top-Left: Tradition & Discipline',
            quadrantTopLeftDesc: 'Values reliability and stability — the foundation keeper of the organization.',
            quadrantTopRight: 'Top-Right: Innovation & Logic',
            quadrantTopRightDesc: 'Pursues rationality and results — the pioneer driving change.',
            quadrantBottomLeft: 'Bottom-Left: Harmony & Emotion',
            quadrantBottomLeftDesc: 'Treasures unity and teamwork — the glue holding the team together.',
            quadrantBottomRight: 'Bottom-Right: Freedom & Intuition',
            quadrantBottomRightDesc: 'Loves possibility and uniqueness — the creator of fresh perspectives.',
        },
        analysisTab: {
            profile: 'Base Profile',
            strengths: 'Strengths',
            weaknesses: 'Weaknesses',
            aruaru: 'Relatable Moments',
            deepPsychology: 'Deep Psychology',
            coreDesire: 'Core Desire',
            blindSpot: 'Blind Spot',
            flowState: 'Flow State',
            cognitiveHabits: 'Cognitive Bias Check',
            detected: 'Detected',
            highRisk: 'High Risk',
            medRisk: 'Medium Risk',
            countermeasure: 'Countermeasure',
        },
        workTab: {
            workStyle: 'Work Style Analysis',
            mission: 'Mission',
            style: 'Work Style',
            motivation: 'Source of Motivation',
            management: 'Management Aptitude',
            teamBehavior: 'Meetings & Team Behavior',
            energyRhythm: 'Work Energy Rhythm',
            careerPath: 'Career Path',
            sideProjects: 'Side Project Aptitude',
            ngEnvironments: 'Environments to Avoid',
            ngEnvLabel: 'Environments that don\'t suit this type',
            motivationKillers: 'Top 3 Motivation Killers',
            bossCompat: 'Boss & Subordinate Compatibility',
            idealBoss: 'Thrives under this type of boss',
            idealSubordinate: 'Best subordinate match',
            careerRisk: 'Career Red Flags',
            trapPattern: 'Common Pitfalls',
            quitTrigger: 'Likely Quit Triggers',
            prevention: 'Prevention',
            moneyStyle: 'Money & Negotiation Tendencies',
            lossPattern: 'Loss-Prone Patterns',
            negotiationHabit: 'Negotiation Habits',
            earningStrategy: 'Income Growth Strategy',
        },
        relationsTab: {
            commTitle: 'Relationships & Communication',
            manual: 'How-To Guide for Others',
            doComm: 'Effective Approaches',
            dontComm: 'Approaches to Avoid',
            friendFamily: 'Friends & Family Patterns',
            friendship: 'Friendship Tendencies',
            familyRole: 'Family Role',
            compatDetails: 'Compatibility Details',
            bestCompat: 'Best Compatibility',
            cautionCompat: 'Challenging Match',
            viewAll16: 'View compatibility with all 16 types',
        },
        growthTab: {
            advice: 'Growth Advice',
            roadmap: 'Growth Roadmap',
            levelLabels: ['Lv.1 Fundamentals', 'Lv.2 Application', 'Lv.3 Mastery'],
        },
        compatCta: {
            badge: 'Special Compatibility',
            title: 'Your Special Partners',
            subtitle: 'Discover the two types that hold the most significance for you',
            bestLabel: 'Best Match (Dual)',
            bestLink: 'View Best Match',
            challengeLabel: 'Growth Catalyst (Conflict)',
            challengeDesc: 'Despite friction from fundamentally different values, this partner offers perspectives you lack — a key to personal growth.',
            challengeLink: 'View Tips for This Pair',
            viewAll16: 'View compatibility with all 16 types',
        },
        verbalHabits: {
            title: 'Verbal Habits & Thought Patterns',
            phrases: 'Common Phrases',
            innerVoice: 'Inner Voice',
            triggerWords: 'Trigger Words',
        },
        stressManual: {
            title: 'Stress Management Manual',
            stressResponse: 'Stress Response',
            recoveryHint: 'Recovery Tips',
            signTitle: 'Signs of Fatigue',
            ngActions: 'Common Harmful Reactions',
            recoveryPlan: 'Recovery Plan',
            quick: '5 min',
            medium: '30 min',
            full: '1 day',
        },
        loveStyle: {
            title: 'Love & Romance',
            partnerImage: 'Ideal Partner',
            conflictTrigger: 'Conflict Trigger',
            fallingPattern: 'Falling in Love Pattern',
            attachmentType: 'Relationship Style',
            breakTrigger: 'Breakup Trigger',
        },
        compatTable: {
            title: 'Compatibility with All Types',
            close: 'Close',
            showMore: (n: number) => `Show ${n} more types`,
        },
        compatibility: {
            title: 'Type Compatibility',
            overallView: 'Overview',
            workCompat: 'Work Compatibility',
            loveCompat: 'Love Compatibility',
            dos: 'Do\'s',
            donts: 'Don\'ts',
            concreteTip: 'Real-Life Scenarios',
            faq: 'FAQ',
        },
        nav: {
            compatibility: 'Compatibility',
            articles: 'Articles',
            glossary: 'Glossary',
            service: 'Service',
            typeList: 'Type List',
            about: 'About',
            diagnosticLogic: 'Diagnostic Logic',
            enneagram: 'What is Enneagram?',
            socionics: 'What is Socionics?',
            editorialPolicy: 'Editorial Policy',
            legal: 'Legal',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            contact: 'Contact',
            operator: 'Operated by Aqsh Inc.',
            footerDescription: 'Maximize team potential and resolve personal challenges\nthrough scientific personality analysis.',
        },
    },
};

/**
 * ロケールに応じた UI テキストを取得する
 */
export function getUIText(locale: Locale): UIText {
    return UI_TEXT[locale];
}
