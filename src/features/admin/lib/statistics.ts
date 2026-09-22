export const OS_CODES = [
  "ENTp",
  "ISFp",
  "ESFj",
  "INTj",
  "ENFj",
  "ISTj",
  "ESTp",
  "INFp",
  "ESFp",
  "INTp",
  "ENTj",
  "ISFj",
  "ESTj",
  "INFj",
  "ENFp",
  "ISTp",
] as const;
export const ENGINE_CODES = [
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T8",
  "T9",
] as const;
export interface Bucket {
  count: number;
  os: Record<string, number>;
  engine: Record<string, number>;
  unknownOs: number;
  unknownEngine: number;
}
export interface Snapshot {
  version: 1;
  generatedAt: string;
  total: number;
  invalidDate: number;
  futureDate: number;
  all: Bucket;
  months: Record<string, Bucket>;
  days: Record<string, number>;
  currentComparison: Bucket;
  comparisonStart: string;
  comparisonEnd: string;
  firstDay: string | null;
}
export const emptyBucket = (): Bucket => ({
  count: 0,
  os: {},
  engine: {},
  unknownOs: 0,
  unknownEngine: 0,
});
export const jstDay = (ms: number) =>
  new Date(ms + 9 * 3600_000).toISOString().slice(0, 10);
export const jstMonth = (ms: number) => jstDay(ms).slice(0, 7);
export function monthStart(month: string): number {
  return Date.parse(`${month}-01T00:00:00+09:00`);
}
export function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7);
}
export function validatePeriod(period: string): boolean {
  return period === "all" || /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(period);
}
export function createSnapshot(now = new Date()): Snapshot {
  const ms = now.getTime(),
    current = jstMonth(ms),
    previous = shiftMonth(current, -1);
  const local = new Date(ms + 9 * 3600_000);
  const previousDays = Number(jstDay(monthStart(current) - 1).slice(8));
  const end =
    local.getUTCDate() > previousDays
      ? monthStart(current)
      : monthStart(previous) +
        (local.getUTCDate() - 1) * 86400_000 +
        local.getUTCHours() * 3600_000 +
        local.getUTCMinutes() * 60_000 +
        local.getUTCSeconds() * 1000 +
        local.getUTCMilliseconds();
  return {
    version: 1,
    generatedAt: now.toISOString(),
    total: 0,
    invalidDate: 0,
    futureDate: 0,
    all: emptyBucket(),
    months: {},
    days: {},
    currentComparison: emptyBucket(),
    comparisonStart: new Date(monthStart(previous)).toISOString(),
    comparisonEnd: new Date(end).toISOString(),
    firstDay: null,
  };
}
export function timestampMillis(value: unknown): number | null {
  if (
    !value ||
    typeof value !== "object" ||
    !("toMillis" in value) ||
    typeof value.toMillis !== "function"
  )
    return null;
  try {
    const ms = value.toMillis();
    return typeof ms === "number" &&
      Number.isFinite(ms) &&
      ms >= 0 &&
      ms <= 253402214400000
      ? ms
      : null;
  } catch {
    return null;
  }
}
function tally(bucket: Bucket, os: unknown, engine: unknown) {
  bucket.count++;
  if (typeof os === "string" && (OS_CODES as readonly string[]).includes(os))
    bucket.os[os] = (bucket.os[os] || 0) + 1;
  else bucket.unknownOs++;
  if (
    typeof engine === "string" &&
    (ENGINE_CODES as readonly string[]).includes(engine)
  )
    bucket.engine[engine] = (bucket.engine[engine] || 0) + 1;
  else bucket.unknownEngine++;
}
export function addRecord(s: Snapshot, data: Record<string, unknown>) {
  const type = data.type as
    { os?: { code?: unknown }; engine?: { primary?: unknown } } | undefined;
  const os = type?.os?.code,
    engine = type?.engine?.primary;
  s.total++;
  tally(s.all, os, engine);
  const ms = timestampMillis(data.timestamp);
  if (ms === null) {
    s.invalidDate++;
    return;
  }
  if (ms >= Date.parse(s.generatedAt)) {
    s.futureDate++;
    return;
  }
  const day = jstDay(ms),
    month = day.slice(0, 7);
  s.firstDay = s.firstDay === null || day < s.firstDay ? day : s.firstDay;
  tally(s.months[month] ?? (s.months[month] = emptyBucket()), os, engine);
  s.days[day] = (s.days[day] || 0) + 1;
  if (ms >= Date.parse(s.comparisonStart) && ms < Date.parse(s.comparisonEnd))
    tally(s.currentComparison, os, engine);
}
export function dashboardView(s: Snapshot, period: string) {
  if (!validatePeriod(period)) throw new Error("Invalid period");
  const current = jstMonth(Date.parse(s.generatedAt));
  if (period !== "all" && period > current) throw new Error("Future period");
  const selected =
    period === "all" ? s.all : (s.months[period] ?? emptyBucket());
  const comparison =
    period === "all"
      ? null
      : period === current
        ? s.currentComparison
        : (s.months[shiftMonth(period, -1)] ?? emptyBucket());
  const daily: Array<{ period: string; count: number | null }> = [];
  if (period !== "all")
    for (
      let t = monthStart(period);
      t < monthStart(shiftMonth(period, 1));
      t += 86400_000
    ) {
      const day = jstDay(t);
      daily.push({
        period: day,
        count:
          day > jstDay(Date.parse(s.generatedAt)) ? null : (s.days[day] ?? 0),
      });
    }
  const monthly: Array<{ period: string; count: number }> = [];
  const first = s.firstDay?.slice(0, 7) ?? current;
  for (let m = first; m <= current; m = shiftMonth(m, 1))
    monthly.push({ period: m, count: s.months[m]?.count ?? 0 });
  return {
    period,
    generatedAt: s.generatedAt,
    total: s.total,
    firstDay: s.firstDay,
    invalidDate: s.invalidDate,
    futureDate: s.futureDate,
    selected,
    comparison,
    comparisonStart:
      period === "all"
        ? null
        : period === current
          ? s.comparisonStart
          : new Date(monthStart(shiftMonth(period, -1))).toISOString(),
    comparisonEnd:
      period === "all"
        ? null
        : period === current
          ? s.comparisonEnd
          : new Date(monthStart(period)).toISOString(),
    change: comparison ? selected.count - comparison.count : null,
    changePercent:
      comparison && comparison.count > 0
        ? ((selected.count - comparison.count) / comparison.count) * 100
        : null,
    monthly,
    daily,
  };
}
export type DashboardData = ReturnType<typeof dashboardView> & {
  stale: boolean;
  refreshError: string | null;
};
