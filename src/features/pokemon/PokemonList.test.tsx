import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { PokemonList } from "./PokemonList";
import * as pokemonService from "../../services/pokemonService";

vi.mock("../../services/pokemonService");

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe("PokemonList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state initially", () => {
    (pokemonService.fetchPokemonList as any).mockReturnValue(
      new Promise(() => {}),
    );

    renderWithClient(<PokemonList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pokemon data from API", async () => {
    (pokemonService.fetchPokemonList as any).mockResolvedValue([
      { name: "bulbasaur" },
      { name: "charmander" },
    ]);

    renderWithClient(<PokemonList />);

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(await screen.findByText(/charmander/i)).toBeInTheDocument();
  });

  test("handles API error state", async () => {
    (pokemonService.fetchPokemonList as any).mockRejectedValue(
      new Error("API error"),
    );

    renderWithClient(<PokemonList />);

    expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
  });

  test("filters pokemon based on search input", async () => {
    (pokemonService.fetchPokemonList as any).mockResolvedValue([
      { name: "bulbasaur" },
      { name: "charmander" },
    ]);

    renderWithClient(<PokemonList />);

    await screen.findByText(/bulbasaur/i);

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "bulb" } });

    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
    });
  });

  test("filters pokemon with debounce", async () => {
    vi.useFakeTimers();

    (pokemonService.fetchPokemonList as any).mockResolvedValue([
      { name: "bulbasaur" },
      { name: "charmander" },
    ]);

    renderWithClient(<PokemonList />);

    await screen.findByText(/bulbasaur/i);

    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "bulb" } });

    // before debounce
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    vi.advanceTimersByTime(300);

    await waitFor(() => {
      expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });
});
