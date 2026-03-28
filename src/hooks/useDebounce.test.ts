import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));

    expect(result.current).toBe("initial");
  });

  it("debounces value change after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    expect(result.current).toBe("initial");

    rerender({ value: "changed", delay: 500 });
    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("changed");
  });

  it("clears previous timer when value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 500 } },
    );

    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: "third", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("first");

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe("third");
  });

  it("uses different delay values correctly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 1000 } },
    );

    rerender({ value: "changed", delay: 1000 });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("changed");
  });

  it("handles empty string and falsy values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "test", delay: 500 } },
    );

    rerender({ value: "", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("");
  });

  it("handles numeric values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 0, delay: 500 } },
    );

    rerender({ value: 100, delay: 500 });
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe(100);
  });
});