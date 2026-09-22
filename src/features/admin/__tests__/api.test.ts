// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";
const mock = vi.hoisted(() => ({
  verify: vi.fn(),
  snapshot: vi.fn(),
  collection: vi.fn(),
  runTransaction: vi.fn(),
}));
vi.mock("firebase-admin/auth", () => ({
  getAuth: () => ({ verifyIdToken: mock.verify }),
}));
vi.mock("@/lib/firebase-admin", () => ({
  dbAdmin: { collection: mock.collection, runTransaction: mock.runTransaction },
}));
vi.mock("../lib/snapshot-server", () => ({ getSnapshot: mock.snapshot }));
import { GET } from "@/app/api/admin/statistics/route";
import { POST } from "@/app/api/diagnosis-results/route";
import { createSnapshot } from "../lib/statistics";
import { calculateDiagnosis } from "@/features/diagnosis/logic/calculator";
const payload = () => ({
  id: "12345678-1234-4123-8123-123456789012",
  locale: "ja",
  result: calculateDiagnosis({}),
});
const post = (body: unknown) =>
  POST(
    new Request("http://localhost/api/diagnosis-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
beforeEach(() => {
  vi.clearAllMocks();
  process.env.PRISMA_ADMIN_UIDS = "admin";
  mock.verify.mockResolvedValue({ uid: "admin" });
});
describe("admin statistics API", () => {
  it("rejects missing token, non-admin, and unset allowlist before reading", async () => {
    expect(
      (await GET(new Request("http://localhost/api/admin/statistics"))).status,
    ).toBe(401);
    mock.verify.mockResolvedValueOnce({ uid: "other" });
    expect(
      (
        await GET(
          new Request("http://localhost/api/admin/statistics", {
            headers: { Authorization: "Bearer x" },
          }),
        )
      ).status,
    ).toBe(403);
    process.env.PRISMA_ADMIN_UIDS = "";
    expect(
      (
        await GET(
          new Request("http://localhost/api/admin/statistics", {
            headers: { Authorization: "Bearer x" },
          }),
        )
      ).status,
    ).toBe(403);
    expect(mock.snapshot).not.toHaveBeenCalled();
  });
  it("returns private stale values with their actual timestamp and warning", async () => {
    const snapshot = createSnapshot();
    mock.snapshot.mockResolvedValue({
      snapshot,
      stale: true,
      refreshError: "更新失敗",
    });
    const res = await GET(
      new Request("http://localhost/api/admin/statistics?period=all", {
        headers: { Authorization: "Bearer x" },
      }),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Cache-Control")).toContain("no-store");
    expect(await res.json()).toMatchObject({
      stale: true,
      refreshError: "更新失敗",
      generatedAt: snapshot.generatedAt,
    });
  });
  it("rejects malformed month and expired token", async () => {
    expect(
      (
        await GET(
          new Request("http://localhost/api/admin/statistics?period=2026-99", {
            headers: { Authorization: "Bearer x" },
          }),
        )
      ).status,
    ).toBe(400);
    mock.verify.mockRejectedValueOnce(new Error("expired"));
    expect(
      (
        await GET(
          new Request("http://localhost/api/admin/statistics", {
            headers: { Authorization: "Bearer x" },
          }),
        )
      ).status,
    ).toBe(401);
  });
});
describe("idempotent diagnosis API", () => {
  it("creates one record, acknowledges identical retry and rejects different content", async () => {
    let stored: Record<string, unknown> | null = null;
    const create = vi.fn((_ref: unknown, value: Record<string, unknown>) => {
      stored = value;
    });
    mock.collection.mockReturnValue({ doc: () => ({}) });
    mock.runTransaction.mockImplementation(async (f) =>
      f({
        get: async () => ({ exists: stored !== null, data: () => stored }),
        create,
      }),
    );
    const value = payload();
    expect((await post(value)).status).toBe(201);
    expect((await post(value)).status).toBe(200);
    expect((await post({ ...value, locale: "en" })).status).toBe(409);
    expect(create).toHaveBeenCalledTimes(1);
  });
  it("rejects invalid input and reports storage failure without claiming success", async () => {
    expect((await post({ id: "bad" })).status).toBe(400);
    expect(mock.runTransaction).not.toHaveBeenCalled();
    mock.collection.mockReturnValue({ doc: () => ({}) });
    mock.runTransaction.mockRejectedValueOnce(new Error("offline"));
    expect((await post(payload())).status).toBe(503);
  });
  it("rejects cross-origin submissions and oversized bodies", async () => {
    const req = new Request("http://localhost/api/diagnosis-results", {
      method: "POST",
      headers: {
        Origin: "https://unrelated.example",
        "Content-Type": "application/json",
      },
      body: "{}",
    });
    expect((await POST(req)).status).toBe(403);
    expect((await post({ data: "x".repeat(17000) })).status).toBe(413);
  });
});

it("accepts the configured production origin behind a reverse proxy", async () => {
  const req = new Request("http://localhost:3003/api/diagnosis-results/", {
    method: "POST",
    headers: {
      Origin: "https://prisma.aqsh.co.jp",
      "Content-Type": "application/json",
    },
    body: "{}",
  });
  expect((await POST(req)).status).toBe(400); // JSON validation, not origin rejection
});
