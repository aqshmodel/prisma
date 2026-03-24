import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OSTypeCode } from '@/types/diagnosis';

const INVITE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface PairState {
    /** 招待元（Aさん）のタイプコード */
    partnerCode: OSTypeCode | null;
    /** 招待を受け取った日時（UNIX ms） */
    invitedAt: number | null;
}

interface PairAction {
    /** 招待コードを保存する */
    setPartnerCode: (code: OSTypeCode) => void;
    /** 招待コードをクリアする */
    clearPartnerCode: () => void;
    /** 招待が有効期限内（24時間以内）かどうかを判定する */
    isValidInvite: () => boolean;
}

export const usePairStore = create<PairState & PairAction>()(
    persist(
        (set, get) => ({
            partnerCode: null,
            invitedAt: null,

            setPartnerCode: (code) => set({
                partnerCode: code,
                invitedAt: Date.now(),
            }),

            clearPartnerCode: () => set({
                partnerCode: null,
                invitedAt: null,
            }),

            isValidInvite: () => {
                const { partnerCode, invitedAt } = get();
                if (!partnerCode || !invitedAt) return false;
                return Date.now() - invitedAt < INVITE_TTL_MS;
            },
        }),
        {
            name: 'prisma-pair-storage',
        }
    )
);
