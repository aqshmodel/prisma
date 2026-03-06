import Image from 'next/image';
import Link from 'next/link';

export const AuthorBio = () => {
    return (
        <div className="not-prose mt-16 md:mt-24 pt-8 border-t border-slate-200">
            <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                    <Image
                        src="/images/author-profile.webp"
                        alt="塚田 崇博のプロフィール写真"
                        width={72}
                        height={72}
                        className="rounded-full object-cover"
                    />
                </div>
                <div>
                    <p className="text-xs text-slate-400 mb-1">この記事を書いた人</p>
                    <p className="font-bold text-slate-900 text-base">塚田 崇博</p>
                    <p className="text-xs text-slate-500 mt-0.5 mb-2">Aqsh株式会社 代表取締役</p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        人材業界23年、累計1万人超の面談経験を持つ。ソシオニクス・エニアグラム・ソーシャルスタイル等の性格類型学に精通し、採用・育成・定着を一気通貫で支援。
                    </p>
                    <Link
                        href="/about/methodology"
                        className="inline-block mt-3 text-xs text-prisma-600 hover:text-prisma-700 font-medium transition-colors"
                    >
                        診断ロジックの説明を見る →
                    </Link>
                </div>
            </div>
        </div>
    );
};
