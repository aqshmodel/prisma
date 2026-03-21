import { describe, expect, it } from 'vitest';
import type { CrossContent } from './types';
import { getCrossKey } from './types';
import { CROSS_CONTENT } from './index';

/**
 * OS × Engine 掛け合わせデータのテスト
 * バッチごとに追加されるため、現時点のデータ量に応じてテストする
 */
describe('Cross Content Data', () => {
    it('getCrossKey が正しいキーを生成する', () => {
        expect(getCrossKey('ENTp', 'T1')).toBe('ENTp_T1');
        expect(getCrossKey('ISFp', 'T9')).toBe('ISFp_T9');
    });

    it('全エントリが正しい構造を持つ', () => {
        const allEntries = Object.values(CROSS_CONTENT);
        expect(allEntries.length).toBeGreaterThan(0);

        allEntries.forEach((entry: CrossContent) => {
            // osCode が存在する
            expect(entry.osCode).toBeDefined();
            expect(typeof entry.osCode).toBe('string');

            // engineType が存在する
            expect(entry.engineType).toBeDefined();

            // title が 1〜20文字
            expect(entry.title.length).toBeGreaterThanOrEqual(1);
            expect(entry.title.length).toBeLessThanOrEqual(20);

            // description が 50〜300文字
            expect(entry.description.length).toBeGreaterThanOrEqual(50);
            expect(entry.description.length).toBeLessThanOrEqual(300);
        });
    });

    describe('バッチ1: ENTp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ENTp × %s が存在する', (engineType) => {
            const key = getCrossKey('ENTp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ENTp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ2: ISFp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ISFp × %s が存在する', (engineType) => {
            const key = getCrossKey('ISFp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ISFp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ3: ESFj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ESFj × %s が存在する', (engineType) => {
            const key = getCrossKey('ESFj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ESFj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ4: INTj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('INTj × %s が存在する', (engineType) => {
            const key = getCrossKey('INTj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('INTj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ5: ENFj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ENFj × %s が存在する', (engineType) => {
            const key = getCrossKey('ENFj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ENFj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ6: ISTj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ISTj × %s が存在する', (engineType) => {
            const key = getCrossKey('ISTj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ISTj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ7: ESTp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ESTp × %s が存在する', (engineType) => {
            const key = getCrossKey('ESTp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ESTp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ8: INFp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('INFp × %s が存在する', (engineType) => {
            const key = getCrossKey('INFp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('INFp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ9: ESFp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ESFp × %s が存在する', (engineType) => {
            const key = getCrossKey('ESFp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ESFp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ10: INTp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('INTp × %s が存在する', (engineType) => {
            const key = getCrossKey('INTp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('INTp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ11: ENTj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ENTj × %s が存在する', (engineType) => {
            const key = getCrossKey('ENTj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ENTj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ12: ISFj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ISFj × %s が存在する', (engineType) => {
            const key = getCrossKey('ISFj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ISFj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ13: ESTj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ESTj × %s が存在する', (engineType) => {
            const key = getCrossKey('ESTj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ESTj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ14: INFj × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('INFj × %s が存在する', (engineType) => {
            const key = getCrossKey('INFj', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('INFj');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ15: ENFp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ENFp × %s が存在する', (engineType) => {
            const key = getCrossKey('ENFp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ENFp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('バッチ16: ISTp × T1〜T9', () => {
        const engineTypes = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'] as const;

        it.each(engineTypes)('ISTp × %s が存在する', (engineType) => {
            const key = getCrossKey('ISTp', engineType);
            expect(CROSS_CONTENT[key]).toBeDefined();
            expect(CROSS_CONTENT[key].osCode).toBe('ISTp');
            expect(CROSS_CONTENT[key].engineType).toBe(engineType);
        });
    });

    describe('完全性チェック', () => {
        it('全144通り（16タイプ × 9エンジン）が揃っている', () => {
            expect(Object.keys(CROSS_CONTENT).length).toBe(144);
        });
    });
});
