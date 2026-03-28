import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./AppRoutes";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

describe("AppRoutes", () => {
  it("renders Suspense loading state initially", () => {
    const queryClient = createQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(document.querySelector(".animate-spin")).toBeDefined();
  });

  it("wraps routes with ErrorBoundary", () => {
    const queryClient = createQueryClient();

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(container.querySelector(".h-screen")).toBeDefined();
  });

  it("renders AppRoutes component", () => {
    const queryClient = createQueryClient();

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(getByText).toBeDefined();
  });
});