'use client';

import React from 'react';

interface TrackableCardWrapperProps {
    slug: string;
    children: React.ReactNode;
    className?: string;
}

/**
 * GA イベントトラッキング用の Client Component ラッパー。
 * Server Component 内でイベントハンドラを使えないため分離。
 */
export const TrackableCardWrapper: React.FC<TrackableCardWrapperProps> = ({
    slug,
    children,
    className,
}) => {
    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'click_related_article', {
                event_category: 'engagement',
                event_label: `Related Article Click: ${slug}`,
                location: window.location.pathname,
            });
        }
    };

    return (
        <div onClickCapture={handleClick} className={className}>
            {children}
        </div>
    );
};
