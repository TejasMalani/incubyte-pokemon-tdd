import { Link } from "react-router-dom";

export function PokemonCard({ name, url }: { name: string; url: string }) {
  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <Link
      to={`/pokemon/${name}`}
      aria-label={`View details for ${name}`}
      className="
        block bg-white rounded-xl p-4 text-center
        border border-gray-300
        shadow-sm
        transition transform
        hover:shadow-lg hover:border-blue-400
        focus:outline-none
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      "
    >
      <img
        src={imageUrl}
        alt={`${name} sprite`}
        className="w-20 h-20 mx-auto mb-3"
      />

      <h2 className="text-sm md:text-base font-semibold capitalize">{name}</h2>
    </Link>
  );
}
