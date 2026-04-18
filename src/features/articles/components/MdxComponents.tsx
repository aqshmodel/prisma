'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { DiagnosisCTA } from '@/features/articles/components/DiagnosisCTA';
import { RelationshipDualCTA } from '@/features/articles/components/RelationshipDualCTA';
import { useEffect } from 'react';

interface MdxArticleBodyProps {
    mdxSource: MDXRemoteSerializeResult;
    headings: { id: string; text: string }[];
}

/**
 * MDX記事本文レンダラー (Client Component)
 *
 * next-mdx-remote/rsc は Next.js 16 の RSC シリアライズ制約と非互換のため、
 * 従来の serialize + MDXRemote (Client Component) パターンを使用する。
 * サーバー側で serialize したデータを受け取り、クライアント側でレンダリングする。
 */
export function MdxArticleBody({ mdxSource, headings }: MdxArticleBodyProps) {
    // h2 にidを付与するカスタムコンポーネント
    const components = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        h2: (props: any) => {
            const text = String(props.children || '').replace(/[*_`]/g, '').trim();
            const heading = headings.find(h => h.text === text);
            return <h2 id={heading?.id} {...props} />;
        },
        DiagnosisCTA,
        RelationshipDualCTA,
    };

    // 見出しIDの補完（コンポーネントマッチで漏れた場合のフォールバック）
    useEffect(() => {
        const h2Elements = document.querySelectorAll('article h2');
        h2Elements.forEach((el) => {
            if (el.id) return; // 既に付与済みならスキップ
            const text = (el.textContent || '').replace(/[*_`]/g, '').trim();
            const heading = headings.find(h => h.text === text);
            if (heading) {
                el.id = heading.id;
            }
        });
    }, [headings]);

    return <MDXRemote {...mdxSource} components={components} />;
}
