import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';

// Stripe APIのモック
vi.mock('stripe', () => {
  return {
    default: class {
      checkout = {
        sessions: {
          create: vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.test/123' }),
        },
      };
    },
  };
});

// Firebase Admin Firestore のモック
const mockSet = vi.fn();
const mockUpdate = vi.fn();
const mockDocResult = {
  id: 'test-order-id',
  set: mockSet,
  update: mockUpdate,
};
const mockDoc = vi.fn(() => mockDocResult);

vi.mock('@/lib/firebase-admin', () => ({
  dbAdmin: {
    collection: vi.fn(() => ({
      doc: mockDoc,
    })),
  },
}));

describe('Checkout API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validPayload = {
    members: [
      { name: 'Member A', typeCode: 'ENTp', enneagram: 'T1' },
      { name: 'Member B', typeCode: 'ISFp', enneagram: 'T2' },
      { name: 'Member C', typeCode: 'ESFj', enneagram: 'T3' },
    ],
    leadInfo: {
      companyName: '株式会社テスト',
      contactName: 'テスト太郎',
      phoneNumber: '090-1234-5678',
      email: 'test@example.com',
      emailConfirm: 'test@example.com',
    },
  };

  it('should return 400 for invalid input (e.g. less than 3 members)', async () => {
    const invalidPayload = { ...validPayload, members: [] };
    const req = new Request('http://localhost:3003/api/checkout', {
      method: 'POST',
      body: JSON.stringify(invalidPayload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Invalid input data');
  });

  it('should save pending order in Firestore and return stripe checkout URL for valid input', async () => {
    const req = new Request('http://localhost:3003/api/checkout', {
      method: 'POST',
      headers: { origin: 'http://localhost:3003' },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);
    const data = await res.json();

    // ステータスと返却URLの検証
    expect(res.status).toBe(200);
    expect(data.url).toBe('https://checkout.stripe.test/123');

    // Firestoreの検証
    expect(mockDoc).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: 'test-order-id',
        status: 'pending',
        members: validPayload.members,
        leadInfo: validPayload.leadInfo,
      })
    );
  });
});
