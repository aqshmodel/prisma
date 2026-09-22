import { expect, it } from "vitest";
import { createSnapshot, dashboardView } from "../lib/statistics";
import { statisticsCsv } from "../lib/csv";
it("exports zero categories, denominators, timezone and comparison metadata without raw logs", () => {
  const csv = statisticsCsv({
    ...dashboardView(
      createSnapshot(new Date("2026-09-22T00:00:00Z")),
      "2026-09",
    ),
    stale: false,
    refreshError: null,
  });
  expect(csv).toContain('"os","2026-09/ENTp","0","件"');
  expect(csv).toContain('"engine","2026-09/T9","0","件"');
  expect(csv).toContain("os有効分母");
  expect(csv).toContain("比較終了（未満）");
  expect(csv).toContain("集計時刻（UTC）");
  expect(csv).not.toContain("userAgent");
});
