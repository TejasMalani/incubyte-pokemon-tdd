import { render, screen, waitFor } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { expect, test } from "vitest";

test("renders pokemon list after loading", () => {
    render(<PokemonList />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});

test("renders pokemon data from API", async () => {
    render(<PokemonList />);

    await waitFor(() => {
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    });
});