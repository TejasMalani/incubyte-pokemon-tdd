import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PokemonCard } from "./PokemonCard";

describe("PokemonCard", () => {
  const mockProps = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  };

  it("renders the link with correct 'to' prop and aria-label", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockProps} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", {
      name: /View details for bulbasaur/i,
    });

    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/pokemon/bulbasaur");
  });

  it("renders the pokemon image with correct src and alt", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockProps} />
      </MemoryRouter>,
    );

    const img = screen.getByAltText("bulbasaur sprite") as HTMLImageElement;

    expect(img).toBeDefined();
    expect(img.src).toContain("/1.png"); // Checks that the ID from URL is used
  });

  it("renders the pokemon name correctly", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("bulbasaur")).toBeDefined();
  });

  it("has proper accessibility attributes", () => {
    render(
      <MemoryRouter>
        <PokemonCard {...mockProps} />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-label", "View details for bulbasaur");
  });
});
