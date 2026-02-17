import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, SearchX } from 'lucide-react';

export default function NotFound() {
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

                <div className="flex justify-center">
                    <Link href="/">
                        <Button variant="primary" size="lg" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            トップページに戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
