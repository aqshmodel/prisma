
import type { OSTypeCode } from '../../../../types/diagnosis';

export interface OSParams {
    analysis: number;     // 分析・論理 (Logic)
    innovation: number;   // 革新・創造 (Vision)
    empathy: number;      // 協調・共感 (Empathy)
    execution: number;    // 実務・遂行 (Realism)
    adaptability: number; // 柔軟・適応 (Agility)
}

export interface WorkStyle {
    mission: string;        // 仕事における使命
    style: string;          // ワーキングスタイル
    motivation: string;     // モチベーションの源泉
    management: string;     // マネジメント適性
    bestRoles: {            // 適職リスト
        title: string;
        reason: string;
    }[];
}

export interface Psychology {
    coreDesire: string;     // 根源的な欲求
    stressResponse: string; // ストレス反応 (Grip)
    recoveryMethod: string; // 回復メソッド
    flowState: string;      // フロー状態（ゾーン）
    blindSpot: string;      // 盲点・死角
}

export interface Relationships {
    communicationStyle: string; // コミュニケーションの基本スタンス
    partnerQuality: string;     // パートナーに求めるもの
    conflictTrigger: string;    // トラブルの引き金
    advice: string;             // 対人関係のアドバイス
}

export interface GrowthRoadmap {
    level1: { title: string; content: string }; // 基礎レベル（守）
    level2: { title: string; content: string }; // 応用レベル（破）
    level3: { title: string; content: string }; // 覚醒レベル（離）
    actionItems: {
        level: 1 | 2 | 3;
        title: string;
        description: string;
    }[];
}

export interface OSContent {
    code: OSTypeCode;
    name: string;
    catchphrase: string;
    description: string;      // 総合的な解説
    strength: string;         // 強み
    weakness: string;         // 弱み

    // Legacy but kept for compatibility or summary
    communication: string;
    leadershipStyle: string;
    decisionMaking: string;

    bestMatch: OSTypeCode;
    worstMatch: OSTypeCode;
    doCommunication: string[];
    dontCommunication: string[];

    color: string;
    params: OSParams;

    // Expanded Content
    workStyle: WorkStyle;
    psychology: Psychology;
    relationships: Relationships;
    growth: GrowthRoadmap;
}
