'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-slate-50">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 max-w-lg w-full">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-50 rounded-full">
                        <AlertCircle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
                    Something went wrong!
                </h2>

                <p className="text-slate-500 mb-8 leading-relaxed">
                    予期せぬエラーが発生しました。<br />
                    しばらく経ってから再読み込みをお試しください。
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => reset()}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        再試行する
                    </Button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-slate-100 rounded text-left overflow-auto max-h-40 text-xs text-slate-600 font-mono">
                        <p className="font-bold mb-1">Error Details (Dev only):</p>
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
}
