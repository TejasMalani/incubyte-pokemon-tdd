import { usePokemonList } from "../../hooks/pokemonList";

export function PokemonList() {
    const { data, isLoading } = usePokemonList();

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            {data?.map((pokemon: any) => (
                <div key={pokemon.name}>{pokemon.name}</div>
            ))}
        </div>
    );
}