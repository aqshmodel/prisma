import React from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'white' | 'glass';
}

export const Card: React.FC<CardProps> = ({
    className,
    children,
    variant = 'white',
    ...props
}) => {
    return (
        <div
            className={cn(
                'rounded-2xl p-6',
                variant === 'white' && 'bg-white/90 shadow-xl shadow-slate-200/50 backdrop-blur-sm',
                variant === 'glass' && 'bg-white/60 shadow-lg border border-white/50 backdrop-blur-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
