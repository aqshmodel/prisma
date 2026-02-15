import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    background?: 'white' | 'gray' | 'prisma' | 'dark';
    container?: boolean;
}

export const Section: React.FC<SectionProps> = ({
    className,
    background = 'white',
    container = true,
    children,
    ...props
}) => {
    const backgrounds = {
        white: 'bg-white',
        gray: 'bg-slate-50',
        prisma: 'bg-gradient-to-b from-prisma-50 to-white',
        dark: 'bg-slate-900 text-white',
    };

    return (
        <section
            className={cn(
                'py-16 md:py-24 relative overflow-hidden',
                backgrounds[background],
                className
            )}
            {...props}
        >
            {container ? (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {children}
                </div>
            ) : (
                children
            )}
        </section>
    );
};
