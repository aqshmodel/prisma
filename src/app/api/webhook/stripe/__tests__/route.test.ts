import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '../route';

// vi.hoistedでモック用の関数を巻き上げ
const { mockConstructEvent } = vi.hoisted(() => ({
  mockConstructEvent: vi.fn(),
}));

// Stripe APIのモック
vi.mock('stripe', () => {
  return {
    default: class {
      webhooks = {
        constructEvent: mockConstructEvent,
      };
    },
  };
});

// Firebase Admin Firestore のモック
const mockUpdate = vi.fn();
const mockDocResult = {
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

// uuidのモック（resultTokenの一貫性テストのため）
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mocked-uuid-token-123'),
}));

describe('Stripe Webhook API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 400 if stripe-signature header is missing', async () => {
    const req = new Request('http://localhost:3003/api/webhook/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {},
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Missing stripe-signature header');
  });

  it('should return 400 if stripe signature verification fails', async () => {
    mockConstructEvent.mockImplementationOnce(() => {
      throw new Error('Invalid signature');
    });

    const req = new Request('http://localhost:3003/api/webhook/stripe', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'stripe-signature': 'invalid-sig',
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Webhook Error: Invalid signature');
  });

  it('should return 200 without updating DB if event is not checkout.session.completed', async () => {
    const mockEvent = {
      type: 'payment_intent.succeeded', // 対象外のイベント
      data: { object: { id: 'pi_123' } },
    };
    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const req = new Request('http://localhost:3003/api/webhook/stripe', {
      method: 'POST',
      body: JSON.stringify(mockEvent),
      headers: {
        'stripe-signature': 'valid-sig',
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.received).toBe(true);

    // DB更新は呼ばれていないことの確認
    expect(mockDoc).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('should return 200 without updating DB if client_reference_id is missing', async () => {
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          client_reference_id: null, // IDがない場合
        },
      },
    };
    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const req = new Request('http://localhost:3003/api/webhook/stripe', {
      method: 'POST',
      body: JSON.stringify(mockEvent),
      headers: {
        'stripe-signature': 'valid-sig',
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.received).toBe(true);

    // DB更新は呼ばれていないことの確認
    expect(mockDoc).not.toHaveBeenCalled();
    expect(mockUpdate).not.toHaveBeenCalled();
  });

  it('should process checkout.session.completed and update firestore order to paid', async () => {
    const mockEvent = {
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_test_123',
          client_reference_id: 'mock-order-uuid',
        },
      },
    };
    mockConstructEvent.mockReturnValueOnce(mockEvent);

    const req = new Request('http://localhost:3003/api/webhook/stripe', {
      method: 'POST',
      body: JSON.stringify(mockEvent),
      headers: {
        'stripe-signature': 'valid-sig',
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.received).toBe(true);

    // ドキュメントIDが渡されているか
    expect(mockDoc).toHaveBeenCalledWith('mock-order-uuid');
    
    // updateが正しいパラメータで呼ばれたか
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'paid',
        stripeSessionId: 'cs_test_123',
        resultToken: 'mocked-uuid-token-123',
      })
    );
  });
});
