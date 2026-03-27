import { useState } from "react";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useDebounce } from "../../hooks/useDebounce";
import { PokemonCard } from "../../components/PokemonCard";

export function PokemonList() {
    const { data, isLoading, isError } = usePokemonList();
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 300);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

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
                <PokemonCard key={pokemon.name} name={pokemon.name} />
            ))}
        </div>
    );
}