
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
    const baseUrl = 'https://prisma.aqsh.co.jp';
    const canonicalUrl = `${baseUrl}/articles/${slug}`;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: metadata.title,
        description: metadata.description,
        image: metadata.coverImage ? [`${baseUrl}${metadata.coverImage}`] : [],
        datePublished: new Date(metadata.date).toISOString(),
        author: {
            '@type': 'Organization',
            name: metadata.author || 'Aqsh Prisma',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Aqsh Prisma',
            logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/icon.png`
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header Nav */}
            <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50">
                {/* 背景だけを画面幅いっぱいに引き延ばすフルブリードハック */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-slate-100 w-screen left-1/2 -translate-x-1/2 -z-10" aria-hidden="true" />

                <div className="max-w-4xl md:max-w-6xl xl:max-w-[1200px] mx-auto px-4 h-14 flex items-center">
                    <Link href="/articles" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} />
                        記事一覧へ戻る
                    </Link>
                </div>
            </div>

            <article className="w-full mt-0">
                {/* Hero Image (Full Width) */}
                {metadata.coverImage && (
                    <div className="w-full relative h-[40vh] min-h-[300px] md:h-[50vh] md:min-h-[400px] bg-slate-100 mb-8 md:mb-12">
                        <Image
                            src={metadata.coverImage}
                            alt={`${metadata.title}のアイキャッチ画像`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                )}

                {/* Content Container (Title, Meta, Body) */}
                <div className="max-w-3xl md:max-w-4xl mx-auto px-4 md:px-8">
                    {/* Article Header */}
                    <header className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                            {metadata.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">
                            {metadata.author && (
                                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                        <User size={14} className="text-slate-500" />
                                    </div>
                                    {metadata.author}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                {metadata.date}
                            </span>

                            {(metadata.category || (metadata.tags && metadata.tags.length > 0)) && (
                                <div className="flex items-center gap-2 flex-wrap md:ml-auto">
                                    {metadata.category && (
                                        <span className="text-prisma-600 bg-prisma-50 px-2.5 py-1 rounded text-xs font-medium border border-prisma-100">
                                            {metadata.category}
                                        </span>
                                    )}
                                    {metadata.tags?.map(tag => (
                                        <span key={tag} className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                                            <Tag size={10} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    {/* MDX Body with Typography plugin */}
                    <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:border-slate-100 prose-a:text-prisma-600 prose-p:leading-loose prose-img:rounded-xl">
                        <MDXRemote source={content} components={components} />
                    </div>

                    {/* Article Footer & Share */}
                    <div className="mt-16 md:mt-24 text-center pt-8 border-t border-slate-200">
                        <h3 className="font-bold text-slate-700 mb-6 flex items-center justify-center gap-2">
                            この記事をシェアする
                        </h3>
                        <ShareButtons
                            title={`【Aqsh Prisma】${metadata.title}`}
                            text={metadata.description}
                        />
                    </div>
                </div>
            </article>
        </div>
    );
}
