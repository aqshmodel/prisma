import React from 'react';
import { cn } from '@/lib/utils';

export const BentoGrid: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem: React.FC<{
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    title,
    description,
    header,
    icon,
    ...props
}) => {
        return (
            <div
                className={cn(
                    "row-span-1 rounded-apple group/bento glass-panel p-6 justify-between flex flex-col space-y-4 transition-all duration-500 ease-apple hover:scale-[1.02] hover:shadow-lg hover:shadow-prisma-200/50",
                    className
                )}
                {...props}
            >
                {header}
                <div className="group-hover/bento:translate-x-2 transition duration-500 ease-apple">
                    {icon}
                    <div className="font-serif font-bold text-slate-800 mb-2 mt-4 text-xl">
                        {title}
                    </div>
                    <div className="font-sans font-medium text-slate-500 text-sm leading-relaxed">
                        {description}
                    </div>
                </div>
            </div>
        );
    };
