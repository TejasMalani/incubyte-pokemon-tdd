import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonDetail } from "./usePokemonDetail";

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

describe("usePokemonDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches pokemon detail successfully", async () => {
    const mockData = {
      name: "bulbasaur",
      id: 1,
      height: 7,
      weight: 69,
      types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
      abilities: [{ ability: { name: "overgrow" } }],
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      },
    };

    const { fetchPokemonDetail } = await import("../services/pokemonService");
    (fetchPokemonDetail as any).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => usePokemonDetail("bulbasaur"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.data?.name).toBe("bulbasaur");
    expect(result.current.data?.types).toHaveLength(2);
  });

  it("does not fetch when name is empty", () => {
    const { result } = renderHook(() => usePokemonDetail(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it("does not fetch when name is undefined", () => {
    const { result } = renderHook(() => usePokemonDetail(undefined as any), {
      wrapper: createWrapper(),
    });

    expect(result.current.isFetching).toBe(false);
  });

  it("handles fetch error", async () => {
    const { fetchPokemonDetail } = await import("../services/pokemonService");
    (fetchPokemonDetail as any).mockRejectedValueOnce(new Error("Not found"));

    const { result } = renderHook(() => usePokemonDetail("invalid"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  it("uses correct query key with pokemon name", async () => {
    const { fetchPokemonDetail } = await import("../services/pokemonService");
    (fetchPokemonDetail as any).mockResolvedValue({});

    const queryClient = new QueryClient();
    renderHook(() => usePokemonDetail("bulbasaur"), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    const query = queryClient.getQueryCache().find({ queryKey: ["pokemon", "bulbasaur"] });
    expect(query).toBeDefined();
  });

  it("starts with loading state", async () => {
    const { fetchPokemonDetail } = await import("../services/pokemonService");
    (fetchPokemonDetail as any).mockImplementation(() => new Promise(() => {}));

    const { result } = renderHook(() => usePokemonDetail("bulbasaur"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });
});