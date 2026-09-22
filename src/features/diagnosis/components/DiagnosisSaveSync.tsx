"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useDiagnosisStore,
  isDiagnosisStorageDurable,
} from "@/stores/useDiagnosisStore";

/** Only completed diagnoses enter this durable queue; shared views never enqueue. */
export function DiagnosisSaveSync({ locale = "ja" }: { locale?: "ja" | "en" }) {
  const pending = useDiagnosisStore((s) => s.pending);
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "saved">(
    "idle",
  );
  const busy = useRef(false);
  const flush = useCallback(async () => {
    if (
      busy.current ||
      !navigator.onLine ||
      useDiagnosisStore.getState().pending.length === 0
    )
      return;
    busy.current = true;
    setStatus("saving");
    let failed = false;
    try {
      for (const item of [...useDiagnosisStore.getState().pending]) {
        try {
          const response = await fetch("/api/diagnosis-results/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
            signal: AbortSignal.timeout(15000),
          });
          if (!response.ok) {
            failed = true;
            continue;
          }
          useDiagnosisStore.getState().acknowledgeSubmission(item.id);
        } catch {
          failed = true;
        }
      }
    } finally {
      busy.current = false;
      setStatus(failed ? "error" : "saved");
    }
  }, []);
  const queueKey = pending.map((item) => item.id).join(",");
  useEffect(() => {
    void flush();
    const online = () => void flush();
    window.addEventListener("online", online);
    return () => window.removeEventListener("online", online);
  }, [flush, queueKey]);
  if (!pending.length && status !== "saved") return null;
  return (
    <div
      className="mx-auto my-3 w-full max-w-5xl px-4 text-sm"
      role="status"
      aria-live="polite"
    >
      {status === "saved" && !pending.length ? (
        locale === "ja" ? (
          "診断結果を保存しました。"
        ) : (
          "Your result has been saved."
        )
      ) : (
        <div className="rounded-lg border border-slate-300 bg-white p-3 text-slate-700">
          {status === "saving"
            ? locale === "ja"
              ? "診断結果を保存しています…"
              : "Saving your result…"
            : locale === "ja"
              ? "診断結果は表示できますが、サーバーへの保存が完了していません。保存を再試行してください。"
              : "Your result is available. Saving is pending on this device."}
          {!isDiagnosisStorageDurable() && (
            <p className="mt-2 font-medium">
              {locale === "ja"
                ? "ブラウザの保存領域を使えません。このページを閉じると未送信の結果が失われます。"
                : "Browser storage is unavailable. Keep this page open until saving succeeds."}
            </p>
          )}
          {status !== "saving" && (
            <button
              type="button"
              className="ml-3 underline underline-offset-4"
              onClick={() => void flush()}
            >
              {locale === "ja" ? "保存を再試行" : "Retry saving"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
