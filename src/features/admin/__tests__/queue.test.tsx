import { beforeEach, describe, it, expect, vi } from "vitest";
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import { useDiagnosisStore } from "@/stores/useDiagnosisStore";
import { calculateDiagnosis } from "@/features/diagnosis/logic/calculator";
import { DiagnosisSaveSync } from "@/features/diagnosis/components/DiagnosisSaveSync";
beforeEach(() => {
  cleanup();
  localStorage.clear();
  useDiagnosisStore.setState({ pending: [], history: [], result: null });
  vi.restoreAllMocks();
});
describe("durable submission queue", () => {
  it("does not enqueue restored or shared views, and persists completed diagnosis ID", async () => {
    const result = calculateDiagnosis({});
    useDiagnosisStore.getState().setResult(result);
    useDiagnosisStore.getState().restoreLastResult();
    expect(useDiagnosisStore.getState().pending).toHaveLength(0);
    useDiagnosisStore.getState().completeDiagnosis(result, "ja");
    const id = useDiagnosisStore.getState().pending[0].id;
    const stored = localStorage.getItem("aqsh-prisma-storage")!;
    useDiagnosisStore.setState({ pending: [] });
    localStorage.setItem("aqsh-prisma-storage", stored);
    await useDiagnosisStore.persist.rehydrate();
    expect(useDiagnosisStore.getState().pending[0].id).toBe(id);
  });
  it("retains failed submissions and retries with the same ID after network recovery", async () => {
    useDiagnosisStore
      .getState()
      .completeDiagnosis(calculateDiagnosis({}), "ja");
    const fetcher = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValue({ ok: true } as Response);
    render(<DiagnosisSaveSync />);
    await screen.findByText("保存を再試行");
    const firstBody = fetcher.mock.calls[0][1]?.body;
    expect(useDiagnosisStore.getState().pending).toHaveLength(1);
    await act(async () => {
      fireEvent(window, new Event("online"));
    });
    await waitFor(() =>
      expect(useDiagnosisStore.getState().pending).toHaveLength(0),
    );
    expect(fetcher.mock.calls[1][1]?.body).toBe(firstBody);
  });
});

it("keeps the result available even when browser storage is full", () => {
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("quota");
  });
  expect(() =>
    useDiagnosisStore
      .getState()
      .completeDiagnosis(calculateDiagnosis({}), "ja"),
  ).not.toThrow();
  expect(useDiagnosisStore.getState().result).not.toBeNull();
  expect(useDiagnosisStore.getState().pending).toHaveLength(1);
});
