import React, { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';


export const FAQSection: React.FC = () => {
    return (
        <Section background="white">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-prisma-50 text-prisma-700 text-xs font-bold uppercase tracking-wider border border-prisma-100">
                    <MessageCircleQuestion className="w-3 h-3" />
                    FAQ
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                    よくあるご質問
                </h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </Section>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-prisma-300 bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
            >
                <span className="font-bold text-slate-800 pr-8">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div
                    className="overflow-hidden bg-slate-50/50 animate-fade-in-up"
                >
                    <div className="p-5 pt-0 text-slate-600 leading-relaxed text-sm">
                        <div className="h-px w-full bg-slate-100 mb-4" />
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
};

const faqs = [
    {
        question: "利用に料金はかかりますか？",
        answer: "いいえ、現在のバージョン（Aqsh Prisma Public Beta）はすべての機能を無料でご利用いただけます。将来的に法人向けの有料プランを追加する可能性がありますが、個人利用の範囲で勝手に課金されることはありません。"
    },
    {
        question: "会員登録は必要ですか？",
        answer: "いいえ、登録なしですぐに診断を開始できます。ただし、診断結果の履歴を長期保存したい場合などは、ブラウザのキャッシュをクリアしないようご注意ください（現在はローカルストレージに一時保存されます）。"
    },
    {
        question: "推奨環境を教えてください。",
        answer: "PC、スマートフォン、タブレットの主要ブラウザ（Google Chrome, Safari, Edge, Firefox）の最新版でご利用いただけます。"
    },
    {
        question: "診断結果はどれくらい正確ですか？",
        answer: "約80%以上のユーザーから「非常に当たっている」「当たっている」との回答を得ていますが、心理テストの性質上、その時の心理状態によって結果が変動する場合があります。あくまで自己理解・相互理解のためのツールとしてご活用ください。"
    }
];
