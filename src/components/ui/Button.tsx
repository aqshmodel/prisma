import React from 'react';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-prisma-500 text-white hover:bg-prisma-600 shadow-lg shadow-prisma-200/50',
        secondary: 'bg-prisma-100 text-prisma-800 hover:bg-prisma-200',
        outline: 'border-2 border-prisma-500 text-prisma-600 hover:bg-prisma-50',
        ghost: 'text-prisma-600 hover:bg-prisma-50',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-semibold',
        xl: 'px-10 py-5 text-xl font-bold',
    };

    return (
        <button
            className={cn(
                'rounded-full transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
