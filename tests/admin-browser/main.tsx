import React from "react";
import { createRoot } from "react-dom/client";
import { AdminPage } from "@/features/admin/AdminPage";
import {
  createSnapshot,
  addRecord,
  dashboardView,
  OS_CODES,
  ENGINE_CODES,
  jstMonth,
} from "@/features/admin/lib/statistics";
import "@/app/globals.css";
const snapshot = createSnapshot();
const records: Array<{
  id: string;
  timestamp: string;
  os: string;
  engine: string;
}> = [];
for (let i = 1; i <= 572; i++) {
  const ms = Date.now() - i * 9 * 3600000;
  records.push({
    id: `fixture-${i}`,
    timestamp: new Date(ms).toISOString(),
    os: OS_CODES[i % 16],
    engine: ENGINE_CODES[i % 9],
  });
  addRecord(snapshot, {
    timestamp: { toMillis: () => ms },
    type: {
      os: { code: OS_CODES[i % 16] },
      engine: { primary: ENGINE_CODES[i % 9] },
    },
  });
}
const nativeFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  if (!String(input).includes("/api/admin/")) return nativeFetch(input, init);
  const url = new URL(String(input), location.origin),
    period = url.searchParams.get("period") ?? jstMonth(Date.now());
  if (url.pathname.includes("statistics"))
    return Response.json({
      ...dashboardView(snapshot, period),
      stale: location.search.includes("stale=1"),
      refreshError: location.search.includes("stale=1")
        ? "更新に失敗しました。前回の集計を表示しています。"
        : null,
    });
  const filtered =
    period === "all"
      ? [...records].sort((a, b) => a.id.localeCompare(b.id))
      : records.filter(
          (record) => jstMonth(Date.parse(record.timestamp)) === period,
        );
  const cursor = url.searchParams.get("cursor");
  const start = cursor
    ? filtered.findIndex((record) => record.id === cursor) + 1
    : 0;
  const logs = filtered.slice(start, start + 50);
  return Response.json({
    logs,
    nextCursor: start + 50 < filtered.length ? logs[logs.length - 1].id : null,
  });
};
createRoot(document.getElementById("root")!).render(
  <>
    <p className="bg-amber-100 px-4 py-2 text-sm text-amber-950">
      ブラウザ検証用：合成データです。本番への接続・書き込みはありません。
    </p>
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <span className="font-serif text-xl font-bold text-slate-800">
          Aqsh <span className="text-prisma-600">PRISMA</span>
        </span>
        <nav className="hidden gap-6 text-sm text-slate-600 sm:flex">
          <span>相性診断</span>
          <span>コラム</span>
          <span>チーム分析</span>
        </nav>
      </div>
    </header>
    <AdminPage />
  </>,
);
