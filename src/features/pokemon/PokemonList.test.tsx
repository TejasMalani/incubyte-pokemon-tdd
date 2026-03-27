import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { PokemonList } from "./PokemonList";
import * as pokemonService from "../../services/pokemonService";
import userEvent from "@testing-library/user-event";

// 🔁 Mock API
vi.mock("../../services/pokemonService");

function renderWithClient(ui: React.ReactElement) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
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
            new Promise(() => { })
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

    test("does not show loading after data is loaded", async () => {
        (pokemonService.fetchPokemonList as any).mockResolvedValue([
            { name: "bulbasaur" },
        ]);

        renderWithClient(<PokemonList />);

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });
    });

    test("filters pokemon based on search input", async () => {
        const user = userEvent.setup();

        (pokemonService.fetchPokemonList as any).mockResolvedValue([
            { name: "bulbasaur" },
            { name: "charmander" },
        ]);

        renderWithClient(<PokemonList />);

        await screen.findByText(/bulbasaur/i);

        const input = screen.getByPlaceholderText(/search/i);

        await user.type(input, "bulb");

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
            expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
        });
    });

    test("filters pokemon with debounce", async () => {
        // Do not use fake timers with userEvent typing
        (pokemonService.fetchPokemonList as any).mockResolvedValue([
            { name: "bulbasaur" },
            { name: "charmander" },
        ]);

        renderWithClient(<PokemonList />);

        await screen.findByText(/bulbasaur/i);

        const input = screen.getByPlaceholderText(/search/i);
        const user = userEvent.setup({ delay: 0 }); // real timers

        await user.type(input, "bulb");

        // Wait for debounce (real timers now)
        await waitFor(() => {
            expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        });
    });
});