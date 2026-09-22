import {
  requireAdmin,
  privateJson,
  apiFailure,
  ApiError,
} from "@/features/admin/lib/auth-server";
import { getSnapshot } from "@/features/admin/lib/snapshot-server";
import {
  dashboardView,
  jstMonth,
  validatePeriod,
} from "@/features/admin/lib/statistics";
export const runtime = "nodejs";
export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const period =
      new URL(req.url).searchParams.get("period") ?? jstMonth(Date.now());
    if (
      !validatePeriod(period) ||
      (period !== "all" && period > jstMonth(Date.now()))
    )
      throw new ApiError(400, "年月の指定が正しくありません。");
    const { snapshot, stale, refreshError } = await getSnapshot();
    // A snapshot from the previous month must be refreshed before displaying the new month.
    if (period !== "all" && period > jstMonth(Date.parse(snapshot.generatedAt)))
      throw new ApiError(
        503,
        "新しい月の集計を更新できませんでした。再試行してください。",
      );
    return privateJson({
      ...dashboardView(snapshot, period),
      stale,
      refreshError,
    });
  } catch (e) {
    return apiFailure(e);
  }
}
