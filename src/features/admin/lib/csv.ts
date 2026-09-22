import { OS_CODES, ENGINE_CODES, type DashboardData } from "./statistics";
export function statisticsCsv(data: DashboardData) {
  const rows: Array<Array<string | number | null>> = [
    ["項目", "期間・分類", "値", "単位", "集計時刻（UTC）"],
    ["全期間累計", "all", data.total, "件", data.generatedAt],
    ["選択期間", data.period, data.selected.count, "件", data.generatedAt],
    ["日時不明", "all", data.invalidDate, "件", data.generatedAt],
    ["未来日時", "all", data.futureDate, "件", data.generatedAt],
    ["前期間差", data.period, data.change, "件", data.generatedAt],
    ["前期間増減率", data.period, data.changePercent, "%", data.generatedAt],
    [
      "比較開始（以上）",
      data.period,
      data.comparisonStart,
      "日時（UTC）",
      data.generatedAt,
    ],
    [
      "比較終了（未満）",
      data.period,
      data.comparisonEnd,
      "日時（UTC）",
      data.generatedAt,
    ],
  ];
  for (const point of data.monthly)
    rows.push([
      "月別（JST）",
      point.period,
      point.count,
      "件",
      data.generatedAt,
    ]);
  for (const point of data.daily)
    rows.push([
      "日別（JST）",
      point.period,
      point.count,
      "件",
      data.generatedAt,
    ]);
  for (const kind of ["os", "engine"] as const) {
    const unknown =
      kind === "os" ? data.selected.unknownOs : data.selected.unknownEngine;
    const denominator = data.selected.count - unknown;
    const previousDenominator = data.comparison
      ? data.comparison.count -
        (kind === "os"
          ? data.comparison.unknownOs
          : data.comparison.unknownEngine)
      : 0;
    rows.push(
      [`${kind}有効分母`, data.period, denominator, "件", data.generatedAt],
      [`${kind}不明`, data.period, unknown, "件", data.generatedAt],
    );
    for (const code of kind === "os" ? OS_CODES : ENGINE_CODES) {
      const count = data.selected[kind][code] ?? 0,
        percentage = denominator ? (count / denominator) * 100 : null;
      rows.push(
        [kind, `${data.period}/${code}`, count, "件", data.generatedAt],
        [
          `${kind}構成比`,
          `${data.period}/${code}`,
          percentage,
          "%",
          data.generatedAt,
        ],
        [
          `${kind}前期間構成比差`,
          `${data.period}/${code}`,
          percentage !== null && previousDenominator
            ? percentage -
              ((data.comparison?.[kind][code] ?? 0) / previousDenominator) * 100
            : null,
          "ポイント",
          data.generatedAt,
        ],
      );
    }
  }
  return (
    "\uFEFF" +
    rows
      .map((row) =>
        row
          .map(
            (v) =>
              '"' + String(v ?? "未到来・算出不可").replaceAll('"', '""') + '"',
          )
          .join(","),
      )
      .join("\r\n")
  );
}
