"use client";

import React from 'react';
import { Share2, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareButtonsProps {
    url?: string;
    title?: string;
    text?: string;
    hashtags?: string[];
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = '16性格診断',
    text = '私の基本タイプ診断結果はこちら！',
    hashtags = ['16性格診断', '性格診断'],
}) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    const encodedHashtags = hashtags.join(',');

    const handleTwitterShare = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}&hashtags=${encodedHashtags}`,
            '_blank'
        );
    };

    const handleLineShare = () => {
        window.open(
            `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
            '_blank'
        );
    };

    const handleSystemShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${text} ${url}`);
            alert('URLをコピーしました！');
        }
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            <Button
                onClick={handleTwitterShare}
                className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
                <Twitter size={18} />
                Xでシェア
            </Button>
            <Button
                onClick={handleLineShare}
                className="bg-[#06C755] text-white hover:bg-[#05b34c] flex items-center gap-2"
            >
                <MessageCircle size={18} />
                LINEで送る
            </Button>
            <Button
                variant="outline"
                onClick={handleSystemShare}
                className="flex items-center gap-2"
            >
                <Share2 size={18} />
                共有する
            </Button>
        </div>
    );
};
