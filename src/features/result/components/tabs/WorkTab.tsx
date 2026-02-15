
import React from 'react';

import { Briefcase, Target } from 'lucide-react';
import { Card } from '../../../../components/ui/Card';
import type { OSContent } from '../../data/content-os';

interface WorkTabProps {
    osData: OSContent;
    themeColor: string;
}

export const WorkTab: React.FC<WorkTabProps> = ({ osData, themeColor }) => {
    if (!osData.workStyle) return null;

    return (
        <div
            className="space-y-6"
        >
            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Briefcase size={20} style={{ color: themeColor }} />
                    ワークスタイル分析
                </h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-slate-700 mb-2">ミッション</h4>
                        <p className="text-lg font-medium text-slate-800 border-l-4 border-slate-300 pl-4 py-1 italic">
                            "{osData.workStyle.mission}"
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">働き方のスタイル</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                {osData.workStyle.style}
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-700 mb-2 text-sm">モチベーションの源泉</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg whitespace-pre-wrap">
                                {osData.workStyle.motivation}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Target size={20} className="text-rose-500" />
                    適職・キャリアパス
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {osData.workStyle.bestRoles.map((role, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                            <h4 className="font-bold text-slate-800 mb-2 text-sm border-b pb-2">{role.title}</h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                {role.reason}
                            </p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
