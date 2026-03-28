import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonList } from "./usePokemonList";

vi.mock("../services/pokemonService");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("usePokemonList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches pokemon list successfully", async () => {
    const mockData = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    ];

    const { fetchPokemonList } = await import("../services/pokemonService");
    (fetchPokemonList as any).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("bulbasaur");
  });

  it("handles fetch error", async () => {
    const { fetchPokemonList } = await import("../services/pokemonService");
    (fetchPokemonList as any).mockRejectedValueOnce(new Error("Fetch failed"));

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it("has correct query key", () => {
    const queryClient = new QueryClient();
    renderHook(() => usePokemonList(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    const query = queryClient.getQueryCache().find({ queryKey: ["pokemon"] });
    expect(query).toBeDefined();
  });

  it("starts with loading state", async () => {
    const { fetchPokemonList } = await import("../services/pokemonService");
    (fetchPokemonList as any).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});