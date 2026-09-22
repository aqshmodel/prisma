import { afterEach, expect, it, vi } from "vitest";
import { render, act, cleanup } from "@testing-library/react";
import { LoadingAnalysis } from "@/features/diagnosis/components/LoadingAnalysis";
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});
it("cancels the completion timer when callback changes or component unmounts", () => {
  vi.useFakeTimers();
  const old = vi.fn(),
    next = vi.fn();
  const { rerender, unmount } = render(<LoadingAnalysis onComplete={old} />);
  for (let i = 0; i < 5; i++)
    act(() => {
      vi.advanceTimersByTime(1200);
    });
  rerender(<LoadingAnalysis onComplete={next} />);
  act(() => {
    vi.advanceTimersByTime(800);
  });
  expect(old).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
  unmount();
  act(() => {
    vi.runOnlyPendingTimers();
  });
  expect(next).toHaveBeenCalledTimes(1);
});
