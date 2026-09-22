import { getAuth } from "firebase-admin/auth";
import "@/lib/firebase-admin";
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export async function requireAdmin(req: Request) {
  const bearer = req.headers.get("authorization");
  if (!bearer?.startsWith("Bearer "))
    throw new ApiError(401, "ログインが必要です。");
  let uid: string;
  try {
    uid = (await getAuth().verifyIdToken(bearer.slice(7), true)).uid;
  } catch {
    throw new ApiError(
      401,
      "ログインの有効期限が切れました。再ログインしてください。",
    );
  }
  const allowed = (process.env.PRISMA_ADMIN_UIDS ?? "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  if (!allowed.includes(uid))
    throw new ApiError(
      403,
      "管理者権限がありません。管理者UIDの設定を確認してください。",
    );
  return uid;
}
export function privateJson(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store", Vary: "Authorization" },
  });
}
export function apiFailure(error: unknown) {
  if (error instanceof ApiError)
    return privateJson({ error: error.message }, error.status);
  console.error(
    "Admin API failed",
    error instanceof Error ? error.name : "unknown",
  );
  return privateJson(
    { error: "データを取得できませんでした。時間をおいて再試行してください。" },
    503,
  );
}
