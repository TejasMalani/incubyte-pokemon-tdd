import { useNavigate } from "react-router-dom";

export function PokemonCard({ name }: { name: string }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/pokemon/${name}`)}
            style={{ border: "1px solid #ccc", padding: "10px", cursor: "pointer" }}
        >
            {name}
        </div>
    );
}