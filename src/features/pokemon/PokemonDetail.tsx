import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

export function PokemonDetail() {
    const { name = "" } = useParams();
    const { data, isLoading, isError } = usePokemonDetail(name);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data</div>;

    return (
        <div>
            <h1>{data.name}</h1>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>
        </div>
    );
}