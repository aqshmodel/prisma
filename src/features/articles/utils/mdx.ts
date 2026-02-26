import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleMetadata {
    slug: string;
    title: string;
    description: string;
    date: string;
    coverImage: string;
    author: string;
    category: string;
    tags: string[];
}

export interface Article {
    metadata: ArticleMetadata;
    content: string;
}

/**
 * 拡張子を取り除いたスラグを取得
 */
const getSlug = (fileName: string) => fileName.replace(/\.mdx?$/, '');

/**
 * すべての記事のスラグ一覧を取得（パス生成用）
 */
export const getArticleSlugs = () => {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs.readdirSync(contentDirectory).map(getSlug);
};

/**
 * 特定のスラグの記事データを取得
 */
export const getArticleBySlug = (slug: string): Article | null => {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            // .md 拡張子へのフォールバック
            const mdPath = path.join(contentDirectory, `${slug}.md`);
            if (!fs.existsSync(mdPath)) return null;
        }

        const actualPath = fs.existsSync(fullPath) ? fullPath : path.join(contentDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(actualPath, 'utf8');

        // gray-matterでフロントマターと本文を分離
        const { data, content } = matter(fileContents);

        return {
            metadata: {
                slug,
                title: data.title || '',
                description: data.description || '',
                date: data.date || '',
                coverImage: data.coverImage || '',
                author: data.author || '',
                category: data.category || '',
                tags: data.tags || [],
            },
            content,
        };
    } catch (e) {
        console.error(`Error reading article ${slug}:`, e);
        return null;
    }
};

/**
 * 全記事のメタデータ一覧を日付順（新しい順）で取得
 */
export const getAllArticles = (): ArticleMetadata[] => {
    if (!fs.existsSync(contentDirectory)) return [];

    const fileNames = fs.readdirSync(contentDirectory);

    const allArticlesData = fileNames
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map(fileName => {
            // メタデータのみ抽出するためgetArticleBySlugを利用
            const slug = getSlug(fileName);
            const article = getArticleBySlug(slug);
            return article ? article.metadata : null;
        })
        .filter((article): article is ArticleMetadata => article !== null);

    // 日付の降順でソート
    return allArticlesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
};
