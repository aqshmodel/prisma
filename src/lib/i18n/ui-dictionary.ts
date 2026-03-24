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
