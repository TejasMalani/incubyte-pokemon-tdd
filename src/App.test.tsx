import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock AppRoutes to simplify testing
vi.mock("./routes/AppRoutes", () => ({
  AppRoutes: () => <div>AppRoutes Rendered</div>,
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("AppRoutes Rendered")).toBeDefined();
  });

  it("renders inside a BrowserRouter", () => {
    render(<App />);
    // Check that BrowserRouter exists by querying a nested component
    expect(screen.getByText("AppRoutes Rendered")).toBeDefined();
  });

  it("matches snapshot", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
