'use client';

import React, { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    type User
} from 'firebase/auth';
import {
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    Timestamp
} from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import {
    Loader2,
    LogOut,
    BarChart3,
    Users,
    Calendar,
    RefreshCw
} from 'lucide-react';

// Types
interface DiagnosisLog {
    id: string;
    type: {
        os: { code: string; name: string };
        engine: { primary: string };
    };
    timestamp: Timestamp;
}

interface Stats {
    total: number;
    today: number;
    typeDistribution: Record<string, number>;
}

interface AdminState {
    user: User | null;
    loading: boolean;
    dataLoading: boolean;
    logs: DiagnosisLog[];
    stats: Stats;
}

type AdminAction =
    | { type: 'AUTH_STATE_CHANGED'; payload: User | null }
    | { type: 'FETCH_START' }
    | { type: 'FETCH_SUCCESS'; payload: { logs: DiagnosisLog[]; stats: Stats } }
    | { type: 'FETCH_ERROR'; payload?: unknown };

function adminReducer(state: AdminState, action: AdminAction): AdminState {
    switch (action.type) {
        case 'AUTH_STATE_CHANGED':
            return { ...state, user: action.payload, loading: false };
        case 'FETCH_START':
            return { ...state, dataLoading: true };
        case 'FETCH_SUCCESS':
            return { ...state, dataLoading: false, logs: action.payload.logs, stats: action.payload.stats };
        case 'FETCH_ERROR':
            return { ...state, dataLoading: false };
        default:
            return state;
    }
}

export const AdminPage: React.FC = () => {
    const [state, dispatch] = React.useReducer(adminReducer, {
        user: null,
        loading: true,
        dataLoading: false,
        logs: [],
        stats: { total: 0, today: 0, typeDistribution: {} }
    });

    // Form State (kept as useState for simple form handling)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');

    // Handle Authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            dispatch({ type: 'AUTH_STATE_CHANGED', payload: currentUser });
            if (currentUser) {
                fetchData();
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: unknown) {
            console.error(err);
            setAuthError('ログインに失敗しました。IDまたはパスワードを確認してください。');
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
    };

    // Fetch Data from Firestore
    const fetchData = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const resultsRef = collection(db, 'diagnosis_results');

            // Fetch recent logs
            const q = query(resultsRef, orderBy('timestamp', 'desc'), limit(100)); // Limit to 100 for performance
            const querySnapshot = await getDocs(q);

            const fetchedLogs: DiagnosisLog[] = [];
            const typeDist: Record<string, number> = {};
            let todayCount = 0;
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const log: DiagnosisLog = {
                    id: doc.id,
                    type: data.type,
                    timestamp: data.timestamp
                };
                fetchedLogs.push(log);

                const typeCode = data.type?.os?.code || 'Unknown';
                typeDist[typeCode] = (typeDist[typeCode] || 0) + 1;

                if (data.timestamp?.toDate() >= startOfDay) {
                    todayCount++;
                }
            });

            dispatch({
                type: 'FETCH_SUCCESS',
                payload: {
                    logs: fetchedLogs,
                    stats: {
                        total: querySnapshot.size,
                        today: todayCount,
                        typeDistribution: typeDist
                    }
                }
            });

        } catch (error) {
            console.error("Error fetching data:", error);
            dispatch({ type: 'FETCH_ERROR', payload: error });
        }
    };

    if (state.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-prisma-500 w-10 h-10" />
            </div>
        );
    }

    if (!state.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Prisma Admin</h1>
                        <p className="text-slate-500 text-sm mt-2">管理画面へログイン</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email ID</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-prisma-500 focus:border-transparent outline-none transition-all"
                                placeholder="name@aqsh.co.jp"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-prisma-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {authError && (
                            <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
                                {authError}
                            </p>
                        )}

                        <Button type="submit" className="w-full bg-prisma-500 hover:bg-prisma-600 text-white font-bold py-3">
                            ログイン
                        </Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-xl text-prisma-600">Prisma Admin</span>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 hidden sm:inline">{state.user?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">表示中の診断データ</p>
                            <p className="text-3xl font-bold text-slate-800">{state.stats.total}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg">
                            <Calendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">本日の診断数</p>
                            <p className="text-3xl font-bold text-slate-800">{state.stats.today}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="p-3 bg-violet-50 text-violet-500 rounded-lg">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">タイプ種類数</p>
                            <p className="text-3xl font-bold text-slate-800">{Object.keys(state.stats.typeDistribution).length}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Logs List */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="font-bold text-slate-800">最新診断ログ</h2>
                            <button
                                onClick={fetchData}
                                className="text-slate-400 hover:text-prisma-500 transition-colors"
                                title="Refresh"
                            >
                                <RefreshCw size={18} className={state.dataLoading ? "animate-spin" : ""} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3">日時</th>
                                        <th className="px-6 py-3">タイプ</th>
                                        <th className="px-6 py-3">Primary Engine</th>
                                        <th className="px-6 py-3">ID</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {state.logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-slate-50/50">
                                            <td className="px-6 py-4 text-slate-600">
                                                {log.timestamp?.toDate().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-prisma-50 text-prisma-700 border border-prisma-100">
                                                    {log.type?.os?.code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                {log.type?.engine?.primary}
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                                {log.id.slice(0, 8)}...
                                            </td>
                                        </tr>
                                    ))}
                                    {state.logs.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                                データがありません
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Type Distribution */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden h-fit">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="font-bold text-slate-800">タイプ分布</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {Object.entries(state.stats.typeDistribution)
                                    .sort(([, a], [, b]) => b - a)
                                    .map(([type, count]) => (
                                        <div key={type} className="flex items-center gap-3">
                                            <div className="w-12 text-sm font-bold text-slate-700">{type}</div>
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-prisma-500 rounded-full"
                                                    style={{ width: `${(count / state.stats.total) * 100}%` }}
                                                />
                                            </div>
                                            <div className="w-8 text-right text-sm text-slate-500">{count}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
