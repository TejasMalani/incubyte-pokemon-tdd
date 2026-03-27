import { render, screen } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { expect, test } from "vitest";

test("renders pokemon list after loading", () => {
    render(<PokemonList />);
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});