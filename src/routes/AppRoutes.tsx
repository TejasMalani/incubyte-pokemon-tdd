import { Routes, Route } from "react-router-dom";
import { PokemonList } from "../features/pokemon/PokemonList";

const Home = () => <h1>Pokemon List Page</h1>;
const Detail = () => <h1>Pokemon Detail Page</h1>;

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
    );
}