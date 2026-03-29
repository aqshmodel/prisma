import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';

// Stripe APIのモック
const { mockCreateSession } = vi.hoisted(() => ({
  mockCreateSession: vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.test/123' }),
}));

vi.mock('stripe', () => {
  return {
    default: class {
      checkout = {
        sessions: {
          create: mockCreateSession,
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
    mockCreateSession.mockResolvedValue({ url: 'https://checkout.stripe.test/123' });
    // Vitest用にPriceIDの環境変数をモック
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SMALL = 'price_test_small';
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MIDDLE = 'price_test_middle';
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_LARGE = 'price_test_large';
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

  it('should return 400 for enterprise plan (more than 30 members)', async () => {
    const enterpriseMembers = Array.from({ length: 31 }, (_, i) => ({
      name: `Member ${i}`,
      typeCode: 'ENTp',
    }));
    const req = new Request('http://localhost:3003/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ ...validPayload, members: enterpriseMembers }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    // 31名以上はZodバリデーションによって弾かれる（二重ガード）
    expect(data.error).toBe('Invalid input data');
    expect(data.details[0].message).toContain('31名以上');
    expect(mockDoc).not.toHaveBeenCalled(); // Firestoreへの保存は行われない
  });

  it('should throw Error and update firestore if stripe session url is missing', async () => {
    // StripeからURLが返ってこない異常事態をモック
    mockCreateSession.mockResolvedValueOnce({ url: null });

    const req = new Request('http://localhost:3003/api/checkout', {
      method: 'POST',
      headers: { origin: 'http://localhost:3003' },
      body: JSON.stringify(validPayload),
    });

    const res = await POST(req);
    // 内部エラー(500)になるはず
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe('Internal server error');

    // 最初にpendingで作られ、その後異常を受けてupdateで failed_stripe_url_creation になっているか
    expect(mockSet).toHaveBeenCalledWith(expect.objectContaining({ status: 'pending' }));
    expect(mockUpdate).toHaveBeenCalledWith({ status: 'failed_stripe_url_creation' });
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
