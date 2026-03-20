import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const glossaryDirectory = path.join(process.cwd(), 'content/glossary');

export interface GlossaryMetadata {
    slug: string;
    title: string;
    reading: string;
    description: string;
    category: string;
    relatedTerms: string[];
    relatedArticles: string[];
}

export interface GlossaryEntry {
    metadata: GlossaryMetadata;
    content: string;
}

/**
 * 特定のスラグの用語データを取得
 */
export const getGlossaryBySlug = (slug: string): GlossaryEntry | null => {
    try {
        const fullPath = path.join(glossaryDirectory, `${slug}.mdx`);
        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            metadata: {
                slug,
                title: data.title || '',
                reading: data.reading || '',
                description: data.description || '',
                category: data.category || '',
                relatedTerms: data.relatedTerms || [],
                relatedArticles: data.relatedArticles || [],
            },
            content,
        };
    } catch (e) {
        console.error(`Error reading glossary ${slug}:`, e);
        return null;
    }
};

/**
 * モジュールレベルキャッシュ
 */
let glossaryCache: GlossaryMetadata[] | null = null;

/**
 * 全用語のメタデータ一覧をカテゴリ順＋読み仮名順で取得
 */
export const getAllGlossaryEntries = (): GlossaryMetadata[] => {
    if (glossaryCache) return glossaryCache;
    if (!fs.existsSync(glossaryDirectory)) return [];

    const fileNames = fs.readdirSync(glossaryDirectory);

    const entries = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(fileName => {
            const slug = fileName.replace(/\.mdx$/, '');
            const entry = getGlossaryBySlug(slug);
            return entry ? entry.metadata : null;
        })
        .filter((entry): entry is GlossaryMetadata => entry !== null);

    // カテゴリ順 → 読み仮名順
    const categoryOrder = ['認知機能', 'ソシオニクス関係性', 'エニアグラム', 'タイプ論全般'];
    glossaryCache = entries.sort((a, b) => {
        const catA = categoryOrder.indexOf(a.category);
        const catB = categoryOrder.indexOf(b.category);
        if (catA !== catB) return catA - catB;
        return a.reading.localeCompare(b.reading, 'ja');
    });

    return glossaryCache;
};

/**
 * 全用語のスラグ一覧を取得
 */
export const getGlossarySlugs = (): string[] => {
    if (!fs.existsSync(glossaryDirectory)) return [];
    return fs.readdirSync(glossaryDirectory)
        .filter(f => f.endsWith('.mdx'))
        .map(f => f.replace(/\.mdx$/, ''));
};
