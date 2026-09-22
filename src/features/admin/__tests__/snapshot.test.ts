// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from "vitest";
import { gzipSync } from "node:zlib";
const m = vi.hoisted(() => ({ runTransaction: vi.fn(), collection: vi.fn() }));
vi.mock("@/lib/firebase-admin", () => ({ dbAdmin: m }));
import { getSnapshot } from "../lib/snapshot-server";
import { createSnapshot } from "../lib/statistics";
beforeEach(() => vi.clearAllMocks());
describe("snapshot publication", () => {
  it("uses fresh cached aggregates without scanning source records", async () => {
    const s = createSnapshot();
    const data = {
      payload: gzipSync(JSON.stringify(s)).toString("base64"),
      generatedAt: Date.now(),
    };
    m.collection.mockReturnValue({ doc: () => ({}) });
    m.runTransaction.mockImplementation((f) =>
      f({ get: async () => ({ data: () => data }) }),
    );
    const result = await getSnapshot();
    expect(result.stale).toBe(false);
    expect(result.snapshot.total).toBe(0);
    expect(m.collection).toHaveBeenCalledTimes(1);
  });
  it("preserves last success on scan failure and releases only its own lease", async () => {
    const old = createSnapshot(new Date(Date.now() - 600000));
    let data: Record<string, unknown> = {
      payload: gzipSync(JSON.stringify(old)).toString("base64"),
      generatedAt: Date.now() - 600000,
    };
    const ref = {};
    const chain = {
      select: () => chain,
      limit: () => chain,
      get: async () => {
        throw new Error("unavailable");
      },
    };
    m.collection.mockImplementation((name) =>
      name === "_admin_statistics"
        ? { doc: () => ref }
        : { orderBy: () => chain },
    );
    m.runTransaction.mockImplementation((f) =>
      f({
        get: async () => ({ data: () => data }),
        set: (_ref: unknown, v: object) => {
          data = { ...data, ...v };
        },
      }),
    );
    const result = await getSnapshot();
    expect(result.stale).toBe(true);
    expect(result.refreshError).toBeTruthy();
    expect(result.snapshot.generatedAt).toBe(old.generatedAt);
    expect(data.owner).toBeNull();
  });
  it("fails instead of returning zero when initial generation is locked", async () => {
    m.collection.mockReturnValue({ doc: () => ({}) });
    m.runTransaction.mockImplementation((f) =>
      f({
        get: async () => ({ data: () => ({ leaseUntil: Date.now() + 60000 }) }),
      }),
    );
    await expect(getSnapshot()).rejects.toThrow();
  });
});
