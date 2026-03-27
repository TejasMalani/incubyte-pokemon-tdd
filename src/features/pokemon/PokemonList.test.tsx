import { render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { expect, test } from "vitest";

test("renders loading state initially", () => {
    render(<PokemonList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("renders pokemon list after loading", () => {
    render(<PokemonList />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});