const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemonList() {
    const res = await fetch(`${BASE_URL}?limit=20`);
    if (!res.ok) throw new Error("Failed to fetch pokemon list");
    const data = await res.json();
    return data.results;
}

export async function fetchPokemonDetail(name: string) {
    const res = await fetch(`${BASE_URL}/${name}`);
    if (!res.ok) throw new Error("Failed to fetch pokemon detail");
    return res.json();
}