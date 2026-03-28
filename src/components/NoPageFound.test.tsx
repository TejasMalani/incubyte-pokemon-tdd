// import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import NotFoundPage from "./NoPageFound";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("NotFoundPage", () => {
  // Mock window.location.replace
  const originalLocation = window.location;

  beforeEach(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { replace: vi.fn() };
  });

  afterEach(() => {
    // @ts-ignore
    window.location = originalLocation;
  });

  it("renders 404 heading", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("404");
  });

  it("renders page not found message", () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Page not found/i)).toBeDefined();
  });

  it("renders Go Home button", () => {
    render(<NotFoundPage />);
    expect(screen.getByRole("button", { name: /Go Home/i })).toBeDefined();
  });

  it("clicking Go Home button calls window.location.replace", () => {
    render(<NotFoundPage />);
    const button = screen.getByRole("button", { name: /Go Home/i });
    fireEvent.click(button);
    expect(window.location.replace).toHaveBeenCalledWith("/");
  });
});
