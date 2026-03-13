import { visit } from 'unist-util-visit';
import { defaultSchema } from 'hast-util-sanitize';
import type { Node } from 'unist';

// MDXのJSX要素であり、かつ名前が大文字から始まる（カスタムReactコンポーネント）場合のみ保護する
/**
 * MDXのカスタムコンポーネント（大文字で始まるタグ）をrehype-sanitizeから保護するために、
 * 一時的に標準要素（element）に変換するプラグイン。
 */
export function rehypePreserveMdx() {
    return (tree: Node) => {
        visit(tree, (node: any) => {
            // MDXのJSX要素であり、かつ名前が大文字から始まる（カスタムReactコンポーネント）場合のみ保護する
            if ((node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') && node.name && /^[A-Z]/.test(node.name)) {
                node.data = node.data || {};
                node.data._mdxType = node.type;
                node.data._mdxName = node.name;
                node.data._mdxAttributes = node.attributes;
                node.type = 'element';
                node.tagName = 'mdx-preserve-component';
            }
        });
    };
}

/**
 * rehype-sanitizeの処理後、一時的に退避していたMDXカスタムコンポーネントを
 * 元のMDX要素（mdxJsxFlowElement / mdxJsxTextElement）に復元するプラグイン。
 */
export function rehypeRestoreMdx() {
    return (tree: Node) => {
        visit(tree, 'element', (node: any) => {
            if (node.tagName === 'mdx-preserve-component') {
                node.type = node.data._mdxType;
                node.name = node.data._mdxName;
                node.attributes = node.data._mdxAttributes;
                delete node.tagName;
            }
        });
    };
}

/**
 * MDX対応用のrehype-sanitizeスキーマ
 */
export const mdxSanitizeSchema = {
    ...defaultSchema,
    tagNames: [...(defaultSchema.tagNames || []), 'mdx-preserve-component'],
    attributes: {
        ...defaultSchema.attributes,
        // mdx-preserve-componentタグには全ての属性を許可し、復元時に属性情報が失われないようにする
        'mdx-preserve-component': ['*']
    }
};
