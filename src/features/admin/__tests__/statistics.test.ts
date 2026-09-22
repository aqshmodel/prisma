import { describe, expect, it } from "vitest";
import { createSnapshot, addRecord, dashboardView } from "../lib/statistics";
const now = new Date("2026-03-31T03:00:00Z");
function record(date: string, os = "ENTp", engine = "T1") {
  return {
    timestamp: { toMillis: () => Date.parse(date) },
    type: { os: { code: os }, engine: { primary: engine } },
  };
}
describe("diagnosis statistics", () => {
  it("counts more than 100 records and keeps independent valid denominators", () => {
    const s = createSnapshot(now);
    for (let i = 0; i < 151; i++) addRecord(s, record("2026-03-01T00:00:00Z"));
    addRecord(s, record("2026-03-02T00:00:00Z", "bad"));
    const v = dashboardView(s, "2026-03");
    expect(v.total).toBe(152);
    expect(v.selected.count).toBe(152);
    expect(v.selected.os.ENTp).toBe(151);
    expect(v.selected.engine.T1).toBe(152);
    expect(v.selected.unknownOs).toBe(1);
  });
  it("uses JST month boundaries and separates invalid/future timestamps", () => {
    const s = createSnapshot(now);
    addRecord(s, record("2026-02-28T15:00:00Z"));
    addRecord(s, record("2026-02-28T14:59:59Z"));
    addRecord(s, { timestamp: null });
    addRecord(s, record("2027-01-01T00:00:00Z"));
    expect(dashboardView(s, "2026-03").selected.count).toBe(1);
    expect(s.total).toBe(4);
    expect(s.invalidDate).toBe(1);
    expect(s.futureDate).toBe(1);
    expect(dashboardView(s, "all").selected.count).toBe(4);
  });
  it("clips March 31 comparison to end of February and does not invent a zero denominator rate", () => {
    const s = createSnapshot(now);
    addRecord(s, record("2026-02-28T14:59:59Z"));
    const v = dashboardView(s, "2026-03");
    expect(v.comparison?.count).toBe(1);
    expect(v.comparisonEnd).toBe("2026-02-28T15:00:00.000Z");
    expect(
      dashboardView(createSnapshot(now), "2026-03").changePercent,
    ).toBeNull();
  });
  it("compares current month only to the same elapsed time and marks future days null", () => {
    const s = createSnapshot(new Date("2024-03-10T03:00:00Z"));
    addRecord(s, record("2024-02-10T02:59:59Z"));
    addRecord(s, record("2024-02-10T03:00:00Z"));
    const v = dashboardView(s, "2024-03");
    expect(v.comparison?.count).toBe(1);
    expect(v.daily.find((d) => d.period === "2024-03-11")?.count).toBeNull();
    expect(dashboardView(s, "2024-02").daily).toHaveLength(29);
  });
});
