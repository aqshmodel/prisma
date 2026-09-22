"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { OS_CONTENT } from "@/features/result/data/content-os";
import { ENGINE_CONTENT } from "@/features/result/data/content-engine";
import {
  ENGINE_CODES,
  OS_CODES,
  jstMonth,
  type Bucket,
  type DashboardData,
} from "./lib/statistics";
import { statisticsCsv } from "./lib/csv";
import {
  BarChart3,
  Calendar,
  TrendingUp,
  LogOut,
  RefreshCw,
  Download,
} from "lucide-react";

type Log = {
  id: string;
  timestamp: string | null;
  os: string | null;
  engine: string | null;
};
const date = (value: string) =>
  new Date(value).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
const number = (value: number) => value.toLocaleString("ja-JP");
const panel =
  "rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6";
const action =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition-colors hover:border-prisma-500 hover:text-prisma-700 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prisma-700";
function Trend({
  title,
  points,
}: {
  title: string;
  points: Array<{ period: string; count: number | null }>;
}) {
  return (
    <section className={panel}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mb-4 text-sm text-slate-600">
        単位：件。今月・本日は集計時点までの値です。
      </p>
      <div
        className="h-64 w-full"
        aria-label={`${title}。正確な値は直後の数値表で確認できます。`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 10, right: 16, left: 0, bottom: 5 }}
            accessibilityLayer
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="period"
              minTickGap={35}
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, "auto"]}
              width={45}
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <Tooltip formatter={(v) => [`${v} 件`, "診断件数"]} />
            <Line
              type="linear"
              dataKey="count"
              stroke="#078282"
              strokeWidth={2}
              dot={points.length < 35}
              connectNulls={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm underline">
          数値表を表示
        </summary>
        <div className="max-h-64 overflow-auto">
          <table className="mt-3 w-full text-sm">
            <caption className="sr-only">{title}</caption>
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="p-2 text-left">期間</th>
                <th className="p-2 text-right">診断件数</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p) => (
                <tr key={p.period} className="border-t border-slate-100">
                  <th className="p-2 text-left font-normal">{p.period}</th>
                  <td className="p-2 text-right tabular-nums">
                    {p.count === null ? "未到来" : number(p.count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
function Distribution({
  kind,
  bucket,
  previous,
}: {
  kind: "os" | "engine";
  bucket: Bucket;
  previous: Bucket | null;
}) {
  const codes = kind === "os" ? OS_CODES : ENGINE_CODES,
    unknown = kind === "os" ? bucket.unknownOs : bucket.unknownEngine;
  const denominator = bucket.count - unknown,
    previousDenominator = previous
      ? previous.count -
        (kind === "os" ? previous.unknownOs : previous.unknownEngine)
      : 0;
  const name = (code: string) =>
    kind === "os"
      ? OS_CONTENT[code as (typeof OS_CODES)[number]].name
      : ENGINE_CONTENT[code as (typeof ENGINE_CODES)[number]].name;
  return (
    <section className={panel}>
      <h2 className="text-lg font-bold">
        {kind === "os" ? "OSタイプ" : "Primary Engine"}の分布
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        有効 {number(denominator)} 件を分母に計算／不明 {number(unknown)} 件
      </p>
      <table className="mt-5 w-full text-sm">
        <thead>
          <tr>
            <th className="pb-3 text-left">分類・構成比</th>
            <th className="pb-3 text-right">件数</th>
            <th className="pb-3 text-right">
              前期間差
              <br />
              <span className="font-normal">ポイント</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...codes]
            .sort((a, b) => (bucket[kind][b] ?? 0) - (bucket[kind][a] ?? 0))
            .map((code) => {
              const count = bucket[kind][code] ?? 0,
                ratio = denominator ? (count / denominator) * 100 : 0;
              const diff =
                denominator && previousDenominator
                  ? ratio -
                    ((previous?.[kind][code] ?? 0) / previousDenominator) * 100
                  : null;
              return (
                <tr key={code} className="border-t border-slate-100">
                  <th className="py-3 pr-3 text-left font-normal">
                    <span>
                      {name(code)}{" "}
                      <span className="text-slate-600">{code}</span>
                    </span>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className="h-2 flex-1 rounded bg-slate-100"
                        aria-hidden="true"
                      >
                        <div
                          className="h-2 rounded bg-prisma-500"
                          style={{ width: `${ratio}%` }}
                        />
                      </div>
                      <span className="w-14 text-right tabular-nums">
                        {denominator ? `${ratio.toFixed(1)}%` : "—"}
                      </span>
                    </div>
                  </th>
                  <td className="text-right tabular-nums">{count}</td>
                  <td className="pl-2 text-right tabular-nums">
                    {diff === null
                      ? "—"
                      : `${diff > 0 ? "+" : ""}${diff.toFixed(1)}`}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
export function AdminPage() {
  const router = useRouter(),
    params = useSearchParams();
  const period = params.get("period") ?? jstMonth(Date.now());
  const [user, setUser] = useState<User | null>(null),
    [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loginError, setLoginError] = useState(""),
    [loggingIn, setLoggingIn] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]),
    [cursor, setCursor] = useState<string | null>(null),
    [logError, setLogError] = useState(""),
    [logsLoading, setLogsLoading] = useState(false),
    [allMonths, setAllMonths] = useState(false);
  const requestId = useRef(0),
    logsId = useRef(0);
  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        setAuthLoading(false);
        setData(null);
        setLogs([]);
        setError("");
        requestId.current++;
        logsId.current++;
      }),
    [],
  );
  const api = useCallback(
    async (path: string) => {
      if (!user) throw new Error("ログインしてください。");
      const token = await user.getIdToken();
      const res = await fetch(path, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "取得に失敗しました。");
      return body;
    },
    [user],
  );
  const loadLogs = useCallback(
    async (next: string | null = null) => {
      const id = ++logsId.current;
      setLogsLoading(true);
      setLogError("");
      try {
        const body = await api(
          `/api/admin/diagnosis-logs/?period=${encodeURIComponent(period)}${next ? `&cursor=${encodeURIComponent(next)}` : ""}`,
        );
        if (id !== logsId.current) return;
        setLogs((old) => (next ? [...old, ...body.logs] : body.logs));
        setCursor(body.nextCursor);
      } catch (e) {
        if (id === logsId.current)
          setLogError(e instanceof Error ? e.message : "取得に失敗しました。");
      } finally {
        if (id === logsId.current) setLogsLoading(false);
      }
    },
    [api, period],
  );
  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    setError("");
    try {
      const body = await api(
        `/api/admin/statistics/?period=${encodeURIComponent(period)}`,
      );
      if (id === requestId.current) setData(body);
    } catch (e) {
      if (id === requestId.current)
        setError(e instanceof Error ? e.message : "取得に失敗しました。");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [api, period]);
  useEffect(() => {
    setData(null);
    setLogs([]);
    setCursor(null);
    if (user) {
      void refresh();
      void loadLogs();
    }
    return () => {
      requestId.current++;
      logsId.current++;
    };
  }, [user, refresh, loadLogs]);
  if (authLoading)
    return (
      <p className="p-8" role="status">
        認証状態を確認しています…
      </p>
    );
  if (!user)
    return (
      <div className="mx-auto my-12 w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold">Prisma 管理画面</h1>
        <form
          className="mt-8 space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoggingIn(true);
            setLoginError("");
            try {
              await signInWithEmailAndPassword(auth, email, password);
              setPassword("");
            } catch {
              setLoginError(
                "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
              );
            } finally {
              setLoggingIn(false);
            }
          }}
        >
          <label className="block">
            メールアドレス
            <input
              className="mt-2 w-full rounded border border-slate-400 p-3"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block">
            パスワード
            <input
              className="mt-2 w-full rounded border border-slate-400 p-3"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {loginError && (
            <p role="alert" className="text-red-800">
              {loginError}
            </p>
          )}
          <button
            className="w-full rounded-lg bg-prisma-500 px-4 py-3 font-bold text-white transition-colors hover:bg-prisma-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prisma-700 disabled:opacity-50"
            disabled={loggingIn}
          >
            {loggingIn ? "確認中…" : "ログイン"}
          </button>
        </form>
      </div>
    );
  const selectPeriod = (value: string) =>
    router.replace(`/admin/?period=${encodeURIComponent(value)}`, {
      scroll: false,
    });
  const download = () => {
    if (!data) return;
    const url = URL.createObjectURL(
      new Blob([statisticsCsv(data)], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `prisma-statistics-${data.period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 bg-slate-50 px-4 py-8 text-slate-800 sm:space-y-6 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-prisma-600">Prisma Admin</h1>
          <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
            Dashboard
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-slate-600 sm:inline">
            {user.email}
          </span>
          <button
            className="rounded p-2 text-slate-400 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-prisma-700"
            aria-label="ログアウト"
            title="ログアウト"
            onClick={() => void signOut(auth)}
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>
      <div className={`${panel} flex flex-wrap items-end gap-4`}>
        <label className="text-sm">
          表示範囲
          <select
            className="mt-1 block rounded-lg border border-slate-300 bg-white p-2 text-slate-700 focus:outline-prisma-700"
            value={period === "all" ? "all" : "month"}
            onChange={(e) =>
              selectPeriod(
                e.target.value === "all" ? "all" : jstMonth(Date.now()),
              )
            }
          >
            <option value="month">月を指定</option>
            <option value="all">全期間</option>
          </select>
        </label>
        {period !== "all" && (
          <label className="text-sm">
            対象月
            <input
              type="month"
              aria-label="対象月"
              className="mt-1 block rounded-lg border border-slate-300 bg-white p-2 text-slate-700 focus:outline-prisma-700"
              value={period}
              max={jstMonth(Date.now())}
              min="1970-01"
              onInput={(e) => {
                if (e.currentTarget.value) selectPeriod(e.currentTarget.value);
              }}
            />
          </label>
        )}
        <button
          disabled={loading}
          className={action}
          onClick={() => {
            void refresh();
            void loadLogs();
          }}
        >
          <RefreshCw
            size={16}
            aria-hidden="true"
            className={loading ? "animate-spin" : ""}
          />{" "}
          更新
        </button>
        <button disabled={!data} className={action} onClick={download}>
          <Download size={16} aria-hidden="true" /> 集計CSV
        </button>
        <p className="text-sm text-slate-600">
          日時は日本時間／集計は5分間有効／同じ人の再診断を含む件数です
        </p>
      </div>
      {loading && <p role="status">集計を読み込んでいます…</p>}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-900"
        >
          {error}
          {data && " 前回取得した値を表示しています。"}
        </div>
      )}
      {data && (
        <>
          <p className="text-sm text-slate-600">
            集計時刻：{date(data.generatedAt)}／記録開始：
            {data.firstDay ?? "記録なし"}／対象：
            {data.period === "all" ? "全期間" : data.period}
            {data.stale && (
              <strong className="ml-2 text-amber-900">古い集計です</strong>
            )}
          </p>
          {data.refreshError && (
            <p
              role="alert"
              className="rounded-lg border border-amber-400 bg-amber-50 p-4 text-amber-900"
            >
              {data.refreshError}
            </p>
          )}
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["全期間の累計", `${number(data.total)} 件`],
              ["選択期間の診断件数", `${number(data.selected.count)} 件`],
              [
                "前期間との差",
                data.change === null
                  ? "比較対象なし"
                  : `${data.change > 0 ? "+" : ""}${number(data.change)} 件`,
              ],
            ].map(([label, value], index) => (
              <section
                className={`${panel} flex items-center gap-4`}
                key={label}
              >
                <div
                  aria-hidden="true"
                  className={`rounded-lg p-3 ${["bg-blue-50 text-blue-500", "bg-emerald-50 text-emerald-500", "bg-violet-50 text-violet-500"][index]}`}
                >
                  {index === 0 ? (
                    <BarChart3 size={24} />
                  ) : index === 1 ? (
                    <Calendar size={24} />
                  ) : (
                    <TrendingUp size={24} />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-medium text-slate-500">
                    {label}
                  </h2>
                  <p className="mt-1 text-3xl font-bold tabular-nums text-slate-800">
                    {value}
                  </p>
                  {label === "前期間との差" && (
                    <p className="mt-2 text-sm">
                      増減率：
                      {data.changePercent === null
                        ? "算出不可"
                        : `${data.changePercent > 0 ? "+" : ""}${data.changePercent.toFixed(1)}%`}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>
          {data.comparisonStart && data.comparisonEnd && (
            <p className="text-sm text-slate-600">
              比較対象：{date(data.comparisonStart)} 以上〜{" "}
              {date(data.comparisonEnd)} 未満（
              {number(data.comparison?.count ?? 0)}{" "}
              件）。今月は前月の同じ経過期間と比較します。
            </p>
          )}
          {data.selected.count === 0 && (
            <p role="status" className={panel}>
              選択期間に保存された診断結果はありません。
            </p>
          )}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">利用件数の推移</h2>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={allMonths}
                onChange={(e) => setAllMonths(e.target.checked)}
              />
              月別推移を全履歴で表示
            </label>
          </div>
          <div
            className={`grid gap-6 ${data.period === "all" ? "" : "lg:grid-cols-2"}`}
          >
            <Trend
              title={
                allMonths
                  ? "月別の診断件数（全履歴）"
                  : "月別の診断件数（直近12か月・記録開始以降）"
              }
              points={allMonths ? data.monthly : data.monthly.slice(-12)}
            />
            {data.period !== "all" && (
              <Trend
                title={`${data.period} の日別診断件数`}
                points={data.daily}
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">選択期間の結果の内訳</h2>
            <p className="mt-1 text-sm text-slate-600">
              構成比の差は前期間からの変化です。一般人口の分布や、変化の原因を示すものではありません。
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Distribution
              kind="os"
              bucket={data.selected}
              previous={data.comparison}
            />
            <Distribution
              kind="engine"
              bucket={data.selected}
              previous={data.comparison}
            />
          </div>
          <section className={panel}>
            <h2 className="text-lg font-bold">データの状態と定義</h2>
            <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <dt>日時不明</dt>
              <dd>{number(data.invalidDate)} 件</dd>
              <dt>集計時刻以降の日時</dt>
              <dd>{number(data.futureDate)} 件</dd>
            </dl>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              これらは全期間の累計と全期間の結果分布に含め、月別・日別集計から除外します。記録範囲内の0件は保存レコードがないことを示します。保存障害による欠測、過去の重複・テスト診断は判別できません。明細は集計キャッシュとは別に取得するため、最新の保存分だけ件数が異なる場合があります。
            </p>
          </section>
        </>
      )}
      <section className={panel}>
        <h2 className="text-lg font-bold">診断ログ</h2>
        <p className="mt-1 text-sm text-slate-600">
          {period === "all"
            ? "全期間：日時不明も含め、ID順で表示します。"
            : "選択月：新しい日時順で表示します。"}{" "}
          50件ずつ取得します。
        </p>
        {logError && (
          <p role="alert" className="mt-3 text-red-800">
            {logError}{" "}
            <button className="underline" onClick={() => void loadLogs(cursor)}>
              再試行
            </button>
          </p>
        )}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {["保存日時（日本時間）", "タイプ", "Primary Engine", "ID"].map(
                  (t) => (
                    <th className="px-4 py-3" key={t}>
                      {t}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  className="border-t border-slate-100 hover:bg-slate-50/50"
                  key={log.id}
                >
                  <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                    {log.timestamp ? date(log.timestamp) : "日時不明"}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-full border border-prisma-100 bg-prisma-50 px-2.5 py-0.5 text-xs font-medium text-prisma-700">
                      {log.os ?? "不明"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {log.engine ?? "不明"}
                  </td>
                  <td
                    className="px-4 py-4 font-mono text-xs text-slate-400"
                    title={log.id}
                  >
                    {log.id.slice(0, 8)}…
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!logs.length && !logsLoading && !logError && (
          <p className="py-4 text-sm">該当するログはありません。</p>
        )}
        {logsLoading && (
          <p role="status" className="mt-3">
            ログを取得しています…
          </p>
        )}
        {cursor && (
          <button
            className={`${action} mt-4`}
            disabled={logsLoading}
            onClick={() => void loadLogs(cursor)}
          >
            次の50件を表示
          </button>
        )}
      </section>
    </div>
  );
}
