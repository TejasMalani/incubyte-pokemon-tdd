import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { PokemonList } from "./PokemonList";
import * as pokemonService from "../../services/pokemonService";

// 🔁 Mock API
vi.mock("../../services/pokemonService");

function renderWithClient(ui: React.ReactElement) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // important for tests
            },
        },
    });

    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
}

describe("PokemonList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders loading state initially", () => {
        (pokemonService.fetchPokemonList as any).mockReturnValue(
            new Promise(() => { }) // never resolves → loading state
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

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
            expect(screen.getByText(/charmander/i)).toBeInTheDocument();
        });
    });

    test("does not show loading after data is loaded", async () => {
        (pokemonService.fetchPokemonList as any).mockResolvedValue([
            { name: "bulbasaur" },
        ]);

        renderWithClient(<PokemonList />);

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });
    });
});