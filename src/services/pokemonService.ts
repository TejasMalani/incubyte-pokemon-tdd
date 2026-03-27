// src/services/pokemonService.ts
export async function fetchPokemonList() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
    const data = await res.json();
    return data.results;
}