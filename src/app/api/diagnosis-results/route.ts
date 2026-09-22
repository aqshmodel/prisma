import { FieldValue } from "firebase-admin/firestore";
import { dbAdmin } from "@/lib/firebase-admin";
import { SITE_CONFIG } from "@/lib/constants/site-config";
import {
  submissionSchema,
  submissionHash,
} from "@/features/diagnosis/lib/submission";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const headers = { "Cache-Control": "no-store" };
  const json = (data: unknown, status: number) =>
    Response.json(data, { status, headers });
  const origin = req.headers.get("origin");
  if (
    origin &&
    origin !== new URL(req.url).origin &&
    origin !== SITE_CONFIG.baseUrl
  )
    return json({ error: "Origin not allowed" }, 403);
  if (!req.headers.get("content-type")?.includes("application/json"))
    return json({ error: "JSON required" }, 415);
  try {
    // Bound the streamed body as well as Content-Length (which clients may omit).
    const reader = req.body?.getReader();
    if (!reader) return json({ error: "Empty body" }, 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16_384) {
        await reader.cancel();
        return json({ error: "Payload too large" }, 413);
      }
      chunks.push(value);
    }
    let raw: unknown;
    try {
      raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    const parsed = submissionSchema.safeParse(raw);
    if (!parsed.success)
      return json({ error: "Invalid diagnosis result" }, 400);
    const input = parsed.data,
      hash = submissionHash(input);
    const ref = dbAdmin.collection("diagnosis_results").doc(input.id);
    const outcome = await dbAdmin.runTransaction(async (tx) => {
      const existing = await tx.get(ref);
      if (existing.exists)
        return existing.data()?.submissionHash === hash
          ? "duplicate"
          : "conflict";
      tx.create(ref, {
        type: input.result,
        timestamp: FieldValue.serverTimestamp(),
        locale: input.locale,
        schemaVersion: 1,
        submissionHash: hash,
      });
      return "created";
    });
    if (outcome === "conflict")
      return json(
        { error: "Submission ID already has different content" },
        409,
      );
    return json(
      { saved: true, id: input.id },
      outcome === "created" ? 201 : 200,
    );
  } catch (error) {
    console.error(
      "Diagnosis save failed",
      error instanceof Error ? error.name : "unknown",
    );
    return json({ error: "保存できませんでした。再試行してください。" }, 503);
  }
}
