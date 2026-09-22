import { randomUUID } from "node:crypto";
import { gzipSync, gunzipSync } from "node:zlib";
import { FieldPath } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { addRecord, createSnapshot, type Snapshot } from "./statistics";
const TTL = 5 * 60_000;
const LEASE = 120_000;
interface Cache {
  payload?: string;
  generatedAt?: number;
  owner?: string | null;
  leaseUntil?: number;
}
export async function getSnapshot(): Promise<{
  snapshot: Snapshot;
  stale: boolean;
  refreshError: string | null;
}> {
  const ref = dbAdmin.collection("_admin_statistics").doc("diagnosis-v1");
  const now = Date.now(),
    owner = randomUUID();
  const lock = await dbAdmin.runTransaction(async (tx) => {
    const cached = (await tx.get(ref)).data() as Cache | undefined;
    if (cached?.payload && now - (cached.generatedAt ?? 0) < TTL)
      return { cached, acquired: false, fresh: true };
    if ((cached?.leaseUntil ?? 0) > now)
      return { cached, acquired: false, fresh: false };
    tx.set(ref, { owner, leaseUntil: now + LEASE }, { merge: true });
    return { cached, acquired: true, fresh: false };
  });
  const fallback = (message: string | null) => {
    if (!lock.cached?.payload)
      throw new Error(message ?? "Snapshot unavailable");
    const snapshot = JSON.parse(
      gunzipSync(Buffer.from(lock.cached.payload, "base64")).toString(),
    ) as Snapshot;
    return { snapshot, stale: !lock.fresh, refreshError: message };
  };
  if (!lock.acquired)
    return fallback(
      lock.fresh ? null : "集計を更新中です。前回成功時の値を表示しています。",
    );
  try {
    const snapshot = createSnapshot(new Date(now));
    let cursor: string | undefined;
    do {
      if (Date.now() - now > 90_000) throw new Error("Snapshot scan timeout");
      let q = dbAdmin
        .collection("diagnosis_results")
        .orderBy(FieldPath.documentId())
        .select("type.os.code", "type.engine.primary", "timestamp")
        .limit(500);
      if (cursor) q = q.startAfter(cursor);
      const page = await q.get();
      for (const doc of page.docs) addRecord(snapshot, doc.data());
      if (page.size < 500) break;
      cursor = page.docs[page.docs.length - 1].id;
    } while (true);
    const payload = gzipSync(JSON.stringify(snapshot)).toString("base64");
    if (Buffer.byteLength(payload) > 850_000)
      throw new Error("Snapshot capacity exceeded");
    await dbAdmin.runTransaction(async (tx) => {
      const current = (await tx.get(ref)).data() as Cache | undefined;
      if (current?.owner !== owner) throw new Error("Snapshot lease lost");
      tx.set(ref, { payload, generatedAt: now, owner: null, leaseUntil: 0 });
    });
    return { snapshot, stale: false, refreshError: null };
  } catch (error) {
    console.error(
      "Statistics refresh failed",
      error instanceof Error ? error.message : "unknown",
    );
    return fallback(
      "集計の更新に失敗しました。前回成功時の値を表示しています。",
    );
  } finally {
    await dbAdmin
      .runTransaction(async (tx) => {
        const c = (await tx.get(ref)).data() as Cache | undefined;
        if (c?.owner === owner)
          tx.set(ref, { owner: null, leaseUntil: 0 }, { merge: true });
      })
      .catch(() => undefined);
  }
}
