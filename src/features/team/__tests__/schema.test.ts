import { describe, it, expect } from 'vitest';
import { teamInputSchema, teamMemberSchema, leadInfoSchema } from '../utils/schema';

describe('Team Zod Schemas', () => {
  describe('teamMemberSchema', () => {
    it('validates correct member data', () => {
      const result = teamMemberSchema.safeParse({ name: 'Taro', typeCode: 'ENTp', enneagram: '7' });
      expect(result.success).toBe(true);
    });

    it('rejects empty name', () => {
      const result = teamMemberSchema.safeParse({ name: '', typeCode: 'ENTp' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('名前を入力してください');
      }
    });

    it('rejects invalid type code length', () => {
      const result = teamMemberSchema.safeParse({ name: 'Taro', typeCode: 'ENT' });
      expect(result.success).toBe(false);
    });
  });

  describe('leadInfoSchema', () => {
    it('validates correct lead data', () => {
      const result = leadInfoSchema.safeParse({
        companyName: '株式会社テスト',
        contactName: 'テスト太郎',
        phoneNumber: '090-1234-5678',
        email: 'test@example.com',
        emailConfirm: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('rejects mismatched email', () => {
      const result = leadInfoSchema.safeParse({
        companyName: '株式会社テスト',
        contactName: 'テスト太郎',
        phoneNumber: '090-1234-5678',
        email: 'test@example.com',
        emailConfirm: 'wrong@example.com',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('メールアドレスが一致しません');
      }
    });
    
    it('rejects invalid phone number', () => {
      const result = leadInfoSchema.safeParse({
        companyName: '株式会社テスト',
        contactName: 'テスト太郎',
        phoneNumber: 'invalid',
        email: 'test@example.com',
        emailConfirm: 'test@example.com',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('teamInputSchema', () => {
    const validLeadInfo = {
      companyName: 'Test Inc',
      contactName: 'John',
      phoneNumber: '03-1234-5678',
      email: 'john@example.com',
      emailConfirm: 'john@example.com',
    };

    it('rejects less than 3 members', () => {
      const result = teamInputSchema.safeParse({
        members: [{ name: 'A', typeCode: 'ENTp' }, { name: 'B', typeCode: 'ISFp' }],
        leadInfo: validLeadInfo
      });
      expect(result.success).toBe(false);
    });

    it('validates exactly 3 members', () => {
      const result = teamInputSchema.safeParse({
        members: [
          { name: 'A', typeCode: 'ENTp' },
          { name: 'B', typeCode: 'ISFp' },
          { name: 'C', typeCode: 'ESFj' }
        ],
        leadInfo: validLeadInfo
      });
      expect(result.success).toBe(true);
    });
  });
});
