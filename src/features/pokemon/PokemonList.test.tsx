import { render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { expect, test } from "vitest";

test("renders loading state initially", () => {
    render(<PokemonList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});