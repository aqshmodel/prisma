import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';


export const FAQSection: React.FC = () => {
    return (
        <section className="py-24 md:py-32 bg-white border-t border-slate-100 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="inline-block text-xs font-serif tracking-[0.2em] text-slate-400 uppercase mb-2">
                        Q & A
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-medium text-slate-900 leading-[1.3] tracking-tight">
                        よくあるご質問
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <FAQItem question={faq.question} answer={faq.answer} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`group rounded-apple border transition-all duration-500 ease-apple overflow-hidden ${isOpen ? 'bg-slate-50 border-prisma-200/50 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left transition-colors"
                aria-expanded={isOpen}
            >
                <span className={`font-serif text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-prisma-700' : 'text-slate-800'}`}>
                    {question}
                </span>
                <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500 ease-apple ml-4 shrink-0 ${isOpen ? 'bg-prisma-500 border-prisma-500 text-white rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-white group-hover:border-slate-300'}`}>
                    <ChevronDown className="w-4 h-4" />
                </span>
            </button>

            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-apple ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 md:p-8 pt-0 text-slate-600 leading-loose text-base md:text-lg border-t border-dashed border-prisma-100/50 mx-6 md:mx-8 mt-2">
                        <div className="pt-4">
                            {answer}
                        </div>
                    </div>
                </div>
            </div>
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
