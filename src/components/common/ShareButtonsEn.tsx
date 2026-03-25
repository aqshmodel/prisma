"use client";

import React from 'react';
import { Share2, MessageCircle, Twitter } from 'lucide-react';
import { Button } from '../ui/Button';

interface ShareButtonsEnProps {
    url?: string;
    title?: string;
    text?: string;
    hashtags?: string[];
}

export const ShareButtonsEn: React.FC<ShareButtonsEnProps> = ({
    url = typeof window !== 'undefined' ? window.location.href : '',
    title = '16 Personality Test',
    text = 'Check out my personality diagnosis result!',
    hashtags = ['16Personality', 'PersonalityTest'],
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
            alert('URL copied to clipboard!');
        }
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            <Button
                onClick={handleTwitterShare}
                className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
            >
                <Twitter size={18} />
                Share on X
            </Button>
            <Button
                onClick={handleLineShare}
                className="bg-[#06C755] text-white hover:bg-[#05b34c] flex items-center gap-2"
            >
                <MessageCircle size={18} />
                Send via LINE
            </Button>
            <Button
                variant="outline"
                onClick={handleSystemShare}
                className="flex items-center gap-2"
            >
                <Share2 size={18} />
                Share
            </Button>
        </div>
    );
};
