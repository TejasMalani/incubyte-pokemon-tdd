import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "../services/pokemonService";

export function usePokemonList() {
    return useQuery({
        queryKey: ["pokemon"],
        queryFn: fetchPokemonList,
    });
}