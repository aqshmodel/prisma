import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleBySlug, getArticleSlugs, getAllArticles } from '@/features/articles/utils/mdx';
import { ArrowLeft, Calendar, User, Tag, RefreshCw, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { ShareButtons } from '@/components/common/ShareButtons';
import { DiagnosisCTA } from '@/features/articles/components/DiagnosisCTA';
import { CompatibilityCTA } from '@/features/articles/components/CompatibilityCTA';
import { AuthorBio } from '@/features/articles/components/AuthorBio';
import { RelatedArticles } from '@/features/articles/components/RelatedArticles';
import { TableOfContents } from '@/features/articles/components/TableOfContents';
import { getReadingTime } from '@/features/articles/utils/readingTime';
import { extractHeadings } from '@/features/articles/utils/extractHeadings';
import { extractFaqJsonLd } from '@/features/articles/utils/faqExtractor';
import { SITE_CONFIG, PUBLISHER_JSON_LD, buildUrl } from '@/lib/constants/site-config';
import rehypeSanitize from 'rehype-sanitize';
import { rehypePreserveMdx, rehypeRestoreMdx, mdxSanitizeSchema } from '@/features/articles/utils/rehype-preserve-mdx';

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

    const baseUrl = SITE_CONFIG.baseUrl;
    const canonicalUrl = buildUrl(`/articles/${slug}`);
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
            publishedTime: new Date(article.metadata.date).toISOString(),
            ...(article.metadata.updatedAt && {
                modifiedTime: new Date(article.metadata.updatedAt).toISOString(),
            }),
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
 * h2に自動でidを付与し、目次からのページ内リンクを実現する。
 */
const createComponents = (headings: { id: string; text: string }[]) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h2: (props: any) => {
        const text = String(props.children || '').replace(/[*_`]/g, '').trim();
        const heading = headings.find(h => h.text === text);
        return <h2 id={heading?.id} {...props} />;
    },
    DiagnosisCTA,
});

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

    // 前後記事を取得
    const allArticles = getAllArticles();
    const currentIndex = allArticles.findIndex(a => a.slug === slug);
    const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
    const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

    // 読了時間を算出
    const readingTime = getReadingTime(content);

    // h2見出しを抽出（目次 + h2へのid付与に使用）
    const headings = extractHeadings(content);

    // FAQPage JSON-LDを生成（疑問形見出しが2つ以上ある場合のみ）
    const faqJsonLd = extractFaqJsonLd(content);

    /**
     * Article (JSON-LD)
     * 検索エンジンに対して、このページがブログ記事であることを構造化データで伝えます。
     */
    const baseUrl = SITE_CONFIG.baseUrl;
    const canonicalUrl = buildUrl(`/articles/${slug}`);
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: metadata.title,
            description: metadata.description,
            image: metadata.coverImage ? [`${baseUrl}${metadata.coverImage}`] : [],
            datePublished: new Date(metadata.date).toISOString(),
            dateModified: new Date(metadata.updatedAt || metadata.date).toISOString(),
            author: {
                '@type': 'Person',
                name: '塚田 崇博',
                jobTitle: '代表取締役',
                worksFor: {
                    '@type': 'Organization',
                    name: 'Aqsh株式会社'
                }
            },
            publisher: PUBLISHER_JSON_LD,
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': canonicalUrl
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'TOP',
                    item: baseUrl
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'コラム',
                    item: buildUrl('/articles')
                },
                {
                    '@type': 'ListItem',
                    position: 3,
                    name: metadata.title,
                    item: canonicalUrl
                }
            ]
        }
    ];

    // FAQPage JSON-LDがあれば追加
    if (faqJsonLd) {
        (jsonLd as object[]).push(faqJsonLd);
    }

    // h2にidを付与するためのカスタムcomponents
    const components = createComponents(headings);

    return (
        <div className="min-h-screen bg-white pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Header Nav */}
            <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50" data-pagefind-ignore>
                {/* 背景だけを画面幅いっぱいに引き延ばすフルブリードハック */}
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md border-b border-slate-100 w-screen left-1/2 -translate-x-1/2 -z-10" aria-hidden="true" />

                <div className="max-w-4xl md:max-w-6xl xl:max-w-[1200px] mx-auto px-4 h-14 flex items-center">
                    <Link href="/articles" className="text-slate-500 hover:text-slate-800 flex items-center gap-2 text-sm font-medium transition-colors">
                        <ArrowLeft size={16} />
                        記事一覧へ戻る
                    </Link>
                </div>
            </div>

            <article className="w-full mt-0" data-pagefind-body>
                {/* Breadcrumb UI */}
                <nav aria-label="パンくずリスト" className="max-w-4xl md:max-w-6xl xl:max-w-[1200px] mx-auto px-4 py-3" data-pagefind-ignore>
                    <ol className="flex items-center gap-1 text-xs text-slate-400 flex-wrap">
                        <li><Link href="/" className="hover:text-prisma-600 transition-colors">TOP</Link></li>
                        <li><ChevronRight size={12} /></li>
                        <li><Link href="/articles" className="hover:text-prisma-600 transition-colors">コラム</Link></li>
                        <li><ChevronRight size={12} /></li>
                        <li className="text-slate-600 font-medium truncate max-w-[200px] md:max-w-[400px]">{metadata.title}</li>
                    </ol>
                </nav>
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
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5" title="公開日">
                                    <Calendar size={14} />
                                    <time dateTime={metadata.date}>{metadata.date}</time>
                                </span>
                                {metadata.updatedAt && metadata.updatedAt !== metadata.date && (
                                    <span className="flex items-center gap-1.5" title="最終更新日">
                                        <RefreshCw size={14} />
                                        <time dateTime={metadata.updatedAt}>{metadata.updatedAt}</time>
                                    </span>
                                )}
                                <span className="flex items-center gap-1.5" title="読了時間">
                                    <Clock size={14} />
                                    約{readingTime}分で読めます
                                </span>
                            </div>

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

                    {/* Table of Contents */}
                    <TableOfContents headings={headings} />

                    {/* MDX Body with Typography plugin */}
                    <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-h2:border-b prose-h2:pb-2 prose-h2:border-slate-100 prose-a:text-prisma-600 prose-p:leading-loose prose-img:rounded-xl">
                        <MDXRemote
                            source={content}
                            components={components}
                            options={{
                                mdxOptions: {
                                    rehypePlugins: [
                                        rehypePreserveMdx,
                                        [rehypeSanitize, mdxSanitizeSchema],
                                        rehypeRestoreMdx
                                    ]
                                }
                            }}
                        />
                    </div>

                    {/* 相性ページ導線CTA（キャリア系記事のみ） */}
                    {metadata.category && /キャリア|働き方|仕事|職場/.test(metadata.category) && (
                        <CompatibilityCTA />
                    )}

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

                    {/* Author Bio */}
                    <AuthorBio />

                    {/* Related Articles */}
                    <RelatedArticles
                        currentSlug={slug}
                        category={metadata.category}
                        tags={metadata.tags}
                    />

                    {/* Prev / Next Navigation */}
                    {(prevArticle || nextArticle) && (
                        <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4" data-pagefind-ignore>
                            {prevArticle ? (
                                <Link
                                    href={`/articles/${prevArticle.slug}`}
                                    className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-100 hover:border-prisma-200 hover:bg-prisma-50/30 transition-all"
                                >
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <ArrowLeft size={12} />
                                        前の記事
                                    </span>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-prisma-600 transition-colors line-clamp-2">
                                        {prevArticle.title}
                                    </span>
                                </Link>
                            ) : <div />}
                            {nextArticle && (
                                <Link
                                    href={`/articles/${nextArticle.slug}`}
                                    className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-100 hover:border-prisma-200 hover:bg-prisma-50/30 transition-all text-right sm:col-start-2"
                                >
                                    <span className="text-xs text-slate-400 flex items-center gap-1 justify-end">
                                        次の記事
                                        <ArrowRight size={12} />
                                    </span>
                                    <span className="text-sm font-bold text-slate-700 group-hover:text-prisma-600 transition-colors line-clamp-2">
                                        {nextArticle.title}
                                    </span>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </div>
    );
}
