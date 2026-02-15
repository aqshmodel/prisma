import React from 'react';


interface ProgressBarProps {
    progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="w-full bg-prisma-100 rounded-full h-2.5 overflow-hidden">
            <div
                className="bg-prisma-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};
