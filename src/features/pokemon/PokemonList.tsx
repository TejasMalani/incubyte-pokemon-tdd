import { useState } from "react";
import { usePokemonList } from "../../hooks/pokemonList";
import { useDebounce } from "../../hooks/debounce";


export function PokemonList() {
    const { data, isLoading } = usePokemonList();
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 300);

    if (isLoading) return <div>Loading...</div>;

    const filtered = data?.filter((p: any) =>
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <div>
            <input
                placeholder="Search pokemon"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filtered?.map((pokemon: any) => (
                <div key={pokemon.name}>{pokemon.name}</div>
            ))}
        </div>
    );
}