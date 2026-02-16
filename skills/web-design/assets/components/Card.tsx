
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    title,
    description,
    footer,
}) => {
    return (
        <div className={`overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 ${className}`}>
            {(title || description) && (
                <div className="border-b border-slate-100 px-6 py-4">
                    {title && <h3 className="text-base font-semibold leading-6 text-slate-900">{title}</h3>}
                    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
                </div>
            )}

            <div className="p-6">
                {children}
            </div>

            {footer && (
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
                    {footer}
                </div>
            )}
        </div>
    );
};
