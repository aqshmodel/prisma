import { describe, expect, it } from 'vitest';
import { OS_CONTENT_EXPANDED } from './index';
import type { OSContent } from './types';

/**
 * Phase 1 データ拡張のテスト
 * - 全16タイプに hashTag と aruaru が存在すること
 * - hashTag は # で始まること
 * - aruaru は 5〜7 個であること
 */
describe('OS Content Expanded Data', () => {
    const allTypeCodes = Object.keys(OS_CONTENT_EXPANDED);

    it('全16タイプが定義されている', () => {
        expect(allTypeCodes.length).toBe(16);
    });

    describe('hashTag フィールド', () => {
        it.each(allTypeCodes)('%s に hashTag が定義されている', (code) => {
            const os: OSContent = OS_CONTENT_EXPANDED[code];
            expect(os.hashTag).toBeDefined();
            expect(typeof os.hashTag).toBe('string');
            expect(os.hashTag!.length).toBeGreaterThan(0);
        });

        it.each(allTypeCodes)('%s の hashTag は # で始まる', (code) => {
            const os: OSContent = OS_CONTENT_EXPANDED[code];
            expect(os.hashTag!.startsWith('#')).toBe(true);
        });
    });

    describe('aruaru フィールド', () => {
        it.each(allTypeCodes)('%s に aruaru が定義されている', (code) => {
            const os: OSContent = OS_CONTENT_EXPANDED[code];
            expect(os.aruaru).toBeDefined();
            expect(Array.isArray(os.aruaru)).toBe(true);
        });

        it.each(allTypeCodes)('%s の aruaru は 5〜7 個', (code) => {
            const os: OSContent = OS_CONTENT_EXPANDED[code];
            expect(os.aruaru!.length).toBeGreaterThanOrEqual(5);
            expect(os.aruaru!.length).toBeLessThanOrEqual(7);
        });

        it.each(allTypeCodes)('%s の aruaru は空文字を含まない', (code) => {
            const os: OSContent = OS_CONTENT_EXPANDED[code];
            os.aruaru!.forEach((item) => {
                expect(item.trim().length).toBeGreaterThan(0);
            });
        });
    });
});
