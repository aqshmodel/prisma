import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] w-full bg-slate-50">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-prisma-500 animate-spin" />
                <p className="text-sm text-slate-500 font-medium tracking-wide animate-pulse">
                    Loading...
                </p>
            </div>
        </div>
    );
}
