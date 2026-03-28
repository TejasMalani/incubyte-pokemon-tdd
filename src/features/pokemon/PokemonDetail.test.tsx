import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { PokemonDetail } from "./PokemonDetail";
import * as pokemonService from "../../services/pokemonService";

vi.mock("../../services/pokemonService");

function renderWithRouter(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
        <Routes>
          <Route path="/pokemon/:name" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("PokemonDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state", () => {
    (pokemonService.fetchPokemonDetail as any).mockReturnValue(
      new Promise(() => {}),
    );

    renderWithRouter(<PokemonDetail />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  const fullBulbasaurData = {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    abilities: [
      { ability: { name: "overgrow" }, is_hidden: false },
      { ability: { name: "chlorophyll" }, is_hidden: true },
    ],
  };

  test("renders pokemon details", async () => {
    (pokemonService.fetchPokemonDetail as any).mockResolvedValue(
      fullBulbasaurData,
    );

    renderWithRouter(<PokemonDetail />);

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/weight/i)).toBeInTheDocument();
  });

  test("passes route name to fetchPokemonDetail", async () => {
    (pokemonService.fetchPokemonDetail as any).mockResolvedValue(
      fullBulbasaurData,
    );

    renderWithRouter(<PokemonDetail />);

    await screen.findByText(/bulbasaur/i);
    expect(pokemonService.fetchPokemonDetail).toHaveBeenCalledWith("bulbasaur");
  });

  test("renders types and abilities badges", async () => {
    (pokemonService.fetchPokemonDetail as any).mockResolvedValue(
      fullBulbasaurData,
    );

    renderWithRouter(<PokemonDetail />);

    expect(await screen.findByText(/grass/i)).toBeInTheDocument();
    expect(screen.getByText(/poison/i)).toBeInTheDocument();
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
    expect(screen.getByText(/chlorophyll/i)).toBeInTheDocument();
    expect(screen.getByText(/hidden/i)).toBeInTheDocument();
  });

  test("back button navigates to home", async () => {
    (pokemonService.fetchPokemonDetail as any).mockResolvedValue(
      fullBulbasaurData,
    );

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /←/i }));
    expect(await screen.findByText(/home page/i)).toBeInTheDocument();
  });

  test("handles error state", async () => {
    (pokemonService.fetchPokemonDetail as any).mockRejectedValue(
      new Error("API error"),
    );

    renderWithRouter(<PokemonDetail />);

    expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
  });
});
