
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticleSlugs } from '../../../features/articles/utils/mdx';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { ShareButtons } from '../../../components/common/ShareButtons';

/**
 * SSG（静的生成）のためのパス一覧をNext.jsに提供します。
 * これにより、ビルド時にすべての記事のHTMLがあらかじめ生成されます。
 */
export async function generateStaticParams() {
    const slugs = getArticleSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

/**
 * 記事ごとのSEOメタ情報（OGP、Twitterカード、Canonical等）を動的に生成します。
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) return { title: 'Not Found' };

    const baseUrl = 'https://prisma.aqsh.co.jp';
    const canonicalUrl = `${baseUrl}/articles/${slug}`;
    const imageUrl = article.metadata.coverImage ? `${baseUrl}${article.metadata.coverImage}` : `${baseUrl}/og-image.png`;

    return {
        title: `${article.metadata.title} | Aqsh Prisma コラム`,
        description: article.metadata.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: article.metadata.title,
            description: article.metadata.description,
            url: canonicalUrl,
            type: 'article',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.metadata.title,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: article.metadata.title,
            description: article.metadata.description,
            images: [imageUrl],
        },
    };
}

/**
 * MDX内で使用できるReactコンポーネントのマッピング。
 * プレーンなMarkdownのタグをカスタムUIコンポーネントに上書きできます。
 */
const components = {
    // 例: h2タグにカスタムスタイルを適用する場合
    // h2: (props: any) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4 border-l-4 border-prisma-500 pl-4" {...props} />,
};

/**
 * 記事詳細ページ (Server Component)
 * MDXのパースとレンダリング、SEOスキーマの埋め込みを担当します。
 */
export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const { metadata, content } = article;

    /**
     * Article (JSON-LD)
     * 検索エンジンに対して、このページがブログ記事であることを構造化データで伝えます。
     */
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.title,
        description: metadata.description,
        image: metadata.coverImage ? [`https://prisma.aqsh.co.jp${metadata.coverImage}`] : [],
        datePublished: new Date(metadata.date).toISOString(),
        author: {
            '@type': 'Organization',
            name: metadata.author || 'Aqsh Prisma',
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header Nav */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 h-16 flex items-center">
                    <Link href="/articles" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 font-medium transition-colors">
                        <ArrowLeft size={18} />
                        記事一覧へ戻る
                    </Link>
                </div>
            </div>

            <article className="max-w-3xl md:max-w-5xl xl:max-w-[1200px] mx-auto px-4 mt-8">
                {/* Article Header */}
                <header className="mb-10 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 font-medium mb-6">
                        {metadata.category && (
                            <span className="bg-prisma-100 text-prisma-800 px-3 py-1 rounded-full text-xs">
                                {metadata.category}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {metadata.date}
                        </span>
                        {metadata.author && (
                            <span className="flex items-center gap-1">
                                <User size={14} />
                                {metadata.author}
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                        {metadata.title}
                    </h1>

                    {metadata.tags && metadata.tags.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                            {metadata.tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">
                                    <Tag size={10} />
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </header>

                {/* Hero Image (Optional) */}
                {/* CSS背景画像ではなく next/image を使ってLCPと帯域を最適化します */}
                {metadata.coverImage && (
                    <div className="w-full h-64 md:h-96 xl:h-[500px] bg-slate-200 rounded-2xl overflow-hidden mb-12 relative shadow-sm border border-slate-100">
                        <Image
                            src={metadata.coverImage}
                            alt={`${metadata.title}のアイキャッチ画像`}
                            fill
                            priority /* 個別記事のヒーロー画像は最初に視界に入るため最優先ロード */
                            sizes="(max-width: 768px) 100vw, 800px"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* MDX Body with Typography plugin */}
                <div className="bg-white p-6 md:p-12 rounded-3xl shadow-sm border border-slate-200">
                    <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:border-slate-100 prose-a:text-prisma-600 prose-p:leading-relaxed">
                        <MDXRemote source={content} components={components} />
                    </div>
                </div>

                {/* Article Footer & Share */}
                <div className="mt-12 text-center pt-8 border-t border-slate-200">
                    <h3 className="font-bold text-slate-700 mb-6 flex items-center justify-center gap-2">
                        この記事をシェアする
                    </h3>
                    <ShareButtons
                        title={`【Aqsh Prisma】${metadata.title}`}
                        text={metadata.description}
                    />
                </div>
            </article>
        </div>
    );
}
