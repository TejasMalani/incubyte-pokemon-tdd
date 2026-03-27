import { Routes, Route } from "react-router-dom";
import { PokemonList } from "../features/pokemon/PokemonList";
import { PokemonDetail } from "../features/pokemon/PokemonDetail";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
    );
}