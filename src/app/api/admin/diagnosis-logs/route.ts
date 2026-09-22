import { FieldPath, Timestamp } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import {
  ApiError,
  apiFailure,
  privateJson,
  requireAdmin,
} from "@/features/admin/lib/auth-server";
import {
  jstMonth,
  monthStart,
  shiftMonth,
  timestampMillis,
  validatePeriod,
} from "@/features/admin/lib/statistics";
export const runtime = "nodejs";
export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const params = new URL(req.url).searchParams,
      period = params.get("period") ?? jstMonth(Date.now());
    if (
      !validatePeriod(period) ||
      (period !== "all" && period > jstMonth(Date.now()))
    )
      throw new ApiError(400, "年月の指定が正しくありません。");
    // All-period logs include records without timestamp; use stable document-ID order there.
    let q =
      period === "all"
        ? dbAdmin
            .collection("diagnosis_results")
            .orderBy(FieldPath.documentId())
        : dbAdmin
            .collection("diagnosis_results")
            .where("timestamp", ">=", Timestamp.fromMillis(monthStart(period)))
            .where(
              "timestamp",
              "<",
              Timestamp.fromMillis(
                Math.min(Date.now(), monthStart(shiftMonth(period, 1))),
              ),
            )
            .orderBy("timestamp", "desc")
            .orderBy(FieldPath.documentId(), "desc");
    const cursor = params.get("cursor");
    if (cursor) {
      if (cursor.length > 1500 || cursor.includes("/"))
        throw new ApiError(400, "カーソルが正しくありません。");
      const doc = await dbAdmin
        .collection("diagnosis_results")
        .doc(cursor)
        .get();
      if (!doc.exists)
        throw new ApiError(400, "ログを更新してから再試行してください。");
      q = q.startAfter(doc);
    }
    const page = await q.limit(51).get();
    const docs = page.docs.slice(0, 50);
    return privateJson({
      logs: docs.map((doc) => {
        const d = doc.data(),
          ms = timestampMillis(d.timestamp);
        return {
          id: doc.id,
          timestamp: ms === null ? null : new Date(ms).toISOString(),
          os: typeof d.type?.os?.code === "string" ? d.type.os.code : null,
          engine:
            typeof d.type?.engine?.primary === "string"
              ? d.type.engine.primary
              : null,
        };
      }),
      nextCursor: page.size > 50 ? docs[49].id : null,
    });
  } catch (e) {
    return apiFailure(e);
  }
}
