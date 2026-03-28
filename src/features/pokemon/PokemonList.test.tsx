// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { PokemonList } from "./PokemonList";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { MemoryRouter, Route, Routes } from "react-router-dom";

// import * as pokemonService from "../../services/pokemonService";

// vi.mock("../../services/pokemonService");

// function renderWithRouter(ui: React.ReactElement) {
//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: { retry: false },
//     },
//   });

//   return render(
//     <QueryClientProvider client={queryClient}>
//       <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
//         <Routes>
//           <Route path="/pokemon/:name" element={ui} />
//         </Routes>
//       </MemoryRouter>
//     </QueryClientProvider>,
//   );
// }

// // Mock the hooks
// vi.mock("../../hooks/usePokemonList", () => ({
//   usePokemonList: vi.fn(),
// }));

// vi.mock("../../hooks/useDebounce", () => ({
//   useDebounce: (value: string) => value,
// }));

// vi.mock("../../components/PokemonCard", () => ({
//   PokemonCard: ({ name }: { name: string }) => <div>{name}</div>,
// }));

// import { usePokemonList } from "../../hooks/usePokemonList";

// describe("PokemonList Component", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("renders loading state", () => {
//     (pokemonService.fetchPokemonDetail as any).mockReturnValue(
//       new Promise(() => {}),
//     );

//     renderWithRouter(<PokemonList />);

//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   it("renders loading state", () => {
//     (usePokemonList as any).mockReturnValue({
//       data: null,
//       isLoading: true,
//       isError: false,
//     });

//     render(<PokemonList />);
//     expect(screen.getByText("Loading...")).toBeDefined();
//   });

//   it("renders error state", () => {
//     (usePokemonList as any).mockReturnValue({
//       data: null,
//       isLoading: false,
//       isError: true,
//     });

//     render(<PokemonList />);
//     expect(screen.getByText("Error loading data")).toBeDefined();
//   });

//   it("renders a list of PokemonCards", () => {
//     const mockData = [
//       { name: "bulbasaur", url: "/pokemon/1" },
//       { name: "charmander", url: "/pokemon/4" },
//     ];

//     (usePokemonList as any).mockReturnValue({
//       data: mockData,
//       isLoading: false,
//       isError: false,
//     });

//     render(<PokemonList />);

//     expect(screen.getByText("bulbasaur")).toBeDefined();
//     expect(screen.getByText("charmander")).toBeDefined();
//   });

//   it("filters pokemon based on search input", () => {
//     const mockData = [
//       { name: "bulbasaur", url: "/pokemon/1" },
//       { name: "charmander", url: "/pokemon/4" },
//       { name: "squirtle", url: "/pokemon/7" },
//     ];

//     (usePokemonList as any).mockReturnValue({
//       data: mockData,
//       isLoading: false,
//       isError: false,
//     });

//     render(<PokemonList />);

//     const input = screen.getByPlaceholderText("Search pokemon...");
//     fireEvent.change(input, { target: { value: "char" } });

//     expect(screen.getByText("charmander")).toBeDefined();
//     expect(screen.queryByText("bulbasaur")).toBeNull();
//     expect(screen.queryByText("squirtle")).toBeNull();
//   });
// });

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonList } from "./PokemonList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";

// Mock hooks
vi.mock("../../hooks/usePokemonList", () => ({
  usePokemonList: vi.fn(),
}));
vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: string) => value,
}));
vi.mock("../../components/PokemonCard", () => ({
  PokemonCard: ({ name }: { name: string }) => <div>{name}</div>,
}));

import { usePokemonList } from "../../hooks/usePokemonList";

// Helper to render component with router and react-query
function renderWithProviders(ui: React.ReactElement, initialRoute = "/") {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/pokemon/:name" element={ui} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("PokemonList", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders loading state", () => {
    (usePokemonList as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    renderWithProviders(<PokemonList />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("renders error state", () => {
    (usePokemonList as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    renderWithProviders(<PokemonList />);
    expect(screen.getByText("Error loading data")).toBeDefined();
  });

  it("renders list of PokemonCards", () => {
    const mockData = [
      { name: "bulbasaur", url: "/pokemon/1" },
      { name: "charmander", url: "/pokemon/4" },
    ];

    (usePokemonList as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<PokemonList />);

    expect(screen.getByText("bulbasaur")).toBeDefined();
    expect(screen.getByText("charmander")).toBeDefined();
  });

  it("filters pokemon based on search input", () => {
    const mockData = [
      { name: "bulbasaur", url: "/pokemon/1" },
      { name: "charmander", url: "/pokemon/4" },
      { name: "squirtle", url: "/pokemon/7" },
    ];

    (usePokemonList as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    renderWithProviders(<PokemonList />);

    const input = screen.getByPlaceholderText("Search pokemon...");
    fireEvent.change(input, { target: { value: "char" } });

    expect(screen.getByText("charmander")).toBeDefined();
    expect(screen.queryByText("bulbasaur")).toBeNull();
    expect(screen.queryByText("squirtle")).toBeNull();
  });
});
