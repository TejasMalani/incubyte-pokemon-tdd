import { render, screen } from "@testing-library/react";
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
        </QueryClientProvider>
    );
}

describe("PokemonDetail", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders loading state", () => {
        (pokemonService.fetchPokemonDetail as any).mockReturnValue(
            new Promise(() => { })
        );

        renderWithRouter(<PokemonDetail />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders pokemon details", async () => {
        (pokemonService.fetchPokemonDetail as any).mockResolvedValue({
            name: "bulbasaur",
            height: 7,
            weight: 69,
        });

        renderWithRouter(<PokemonDetail />);

        expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/height/i)).toBeInTheDocument();
        expect(screen.getByText(/weight/i)).toBeInTheDocument();
    });

    test("handles error state", async () => {
        (pokemonService.fetchPokemonDetail as any).mockRejectedValue(
            new Error("API error")
        );

        renderWithRouter(<PokemonDetail />);

        expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
    });
});