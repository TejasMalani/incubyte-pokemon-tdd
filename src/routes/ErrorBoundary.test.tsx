import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Content</div>
      </ErrorBoundary>,
    );

    expect(screen.getByTestId("child")).toBeDefined();
    expect(screen.getByText("Child Content")).toBeDefined();
  });

  it("renders fallback UI when an error occurs", () => {
    const ErrorThrowingComponent = () => {
      throw new Error("Test error");
    };

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/)).toBeDefined();
    expect(screen.getByRole("button", { name: /Reload/i })).toBeDefined();
  });

  it("displays reload button that calls window.location.reload", () => {
    const reloadSpy = vi.fn();
    Object.defineProperty(window, "location", {
      value: { reload: reloadSpy },
      writable: true,
    });

    const ErrorThrowingComponent = () => {
      throw new Error("Test error");
    };

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    const reloadButton = screen.getByRole("button", { name: /Reload/i });
    reloadButton.click();

    expect(reloadSpy).toHaveBeenCalled();
  });

  it("catches errors from nested children", () => {
    const ThrowingChild = () => {
      throw new Error("Nested error");
    };

    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <div>
          <ThrowingChild />
        </div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(/Something went wrong/)).toBeDefined();
  });
});