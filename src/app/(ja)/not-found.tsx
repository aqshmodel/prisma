import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, SearchX, ArrowRight } from 'lucide-react';

export default function NotFound() {
    const popularArticles = [
        { slug: 'intj-struggle-with-emotions', title: 'INTJは冷たい？──感情論が通じず孤立する理由' },
        { slug: 'mbti-vs-socionics-beyond-16types', title: 'MBTIとソシオニクスの違い──16タイプの「その先」' },
        { slug: 'infp-want-to-quit-job', title: 'INFp「仕事辞めたい」が止まらない本当の理由' },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-slate-50">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-slate-50 rounded-full">
                        <SearchX className="w-12 h-12 text-slate-400" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    Page Not Found
                </h2>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    お探しのページは見つかりませんでした。<br />
                    削除されたか、URLが変更された可能性があります。
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
                    <Link href="/">
                        <Button variant="primary" size="lg" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            トップページに戻る
                        </Button>
                    </Link>
                    <Link href="/diagnosis">
                        <Button variant="primary" size="lg" className="flex items-center gap-2 !bg-[#00B5AD] hover:!bg-[#009e97]">
                            無料で性格診断する
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                <div className="border-t border-slate-100 pt-6">
                    <p className="text-xs text-slate-400 mb-3 font-medium">人気の記事</p>
                    <ul className="space-y-2">
                        {popularArticles.map(article => (
                            <li key={article.slug}>
                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="text-sm text-slate-600 hover:text-prisma-600 transition-colors leading-snug"
                                >
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
