import { useParams, useNavigate } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";

export function PokemonDetail() {
  const { name = "" } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = usePokemonDetail(name);
  const typeColors: Record<string, string> = {
    grass: "bg-green-100 text-green-700 border-green-300",
    poison: "bg-purple-100 text-purple-700 border-purple-300",
    fire: "bg-red-100 text-red-700 border-red-300",
    water: "bg-blue-100 text-blue-700 border-blue-300",
    electric: "bg-yellow-100 text-yellow-700 border-yellow-300",
    bug: "bg-lime-100 text-lime-700 border-lime-300",
    normal: "bg-gray-100 text-gray-700 border-gray-300",
    flying: "bg-indigo-100 text-indigo-700 border-indigo-300",
    ground: "bg-amber-100 text-amber-700 border-amber-300",
    fairy: "bg-pink-100 text-pink-700 border-pink-300",
  };

  if (isLoading) return <div className="flex justify-center">Loading...</div>;
  if (isError)
    return <div className="flex justify-center">Error loading data</div>;

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium text-lg"
        >
          ←
        </button>

        {/* 🧾 Title */}
        <h1 className="text-3xl font-bold capitalize text-center flex-1">
          {data.name}
        </h1>

        {/* Placeholder for right side (can add favorites, share, etc.) */}
        <div className="w-20" />
      </div>

      {/* Optional: Pokémon ID below the header */}
      <p className="text-gray-400 text-center mb-4">#{data.id}</p>

      {/* 🖼️ Image */}
      <div className="flex justify-center mb-6">
        <img
          src={imageUrl}
          alt={data.name}
          className="w-40 h-40 object-contain drop-shadow-lg"
        />
      </div>

      {/* 🏷️ Types */}
      <div className="flex justify-center gap-3 mb-6">
        {data.types.map((t: any) => {
          const typeName = t.type.name;
          const color =
            typeColors[typeName] || "bg-gray-100 text-gray-700 border-gray-300";

          return (
            <span
              key={typeName}
              className={`px-4 py-1 rounded-full text-sm font-medium border ${color}`}
            >
              {typeName}
            </span>
          );
        })}
      </div>

      {/* 📊 Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow border text-center">
          <p className="text-gray-500 text-sm">Height</p>
          <p className="font-semibold">{(data.height / 10).toFixed(1)} m</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border text-center">
          <p className="text-gray-500 text-sm">Weight</p>
          <p className="font-semibold">{(data.weight / 10).toFixed(1)} kg</p>
        </div>
      </div>

      {/* ⚡ Abilities */}
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Abilities</h2>

        <div className="flex flex-wrap gap-3">
          {data.abilities.map((item: any) => (
            <div
              key={item.ability.name}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                item.is_hidden
                  ? "bg-purple-100 text-purple-700 border-purple-300"
                  : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
            >
              {item.ability.name}
              {item.is_hidden && (
                <span className="ml-2 text-xs opacity-70">(Hidden)</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
