import { useState } from "react";
import { usePokemonList } from "../../hooks/usePokemonList";
import { useDebounce } from "../../hooks/useDebounce";
import { PokemonCard } from "../../components/PokemonCard";

export function PokemonList() {
  const { data, isLoading, isError } = usePokemonList();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  if (isLoading) return <div className="flex justify-center">Loading...</div>;
  if (isError) return <div className="flex justify-center">Error loading data</div>;

  const filtered = data?.filter((p: any) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* 🔍 Centered Input */}
      {/* 🔍 Sticky Centered Input */}
      <div
        className="sticky top-0 z-10
        bg-white
        py-4 mb-6
        flex justify-center"
      >
        <input
          placeholder="Search pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
                        w-full max-w-md
                        px-4 py-2
                        border border-gray-300
                        rounded-xl
                        shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-400
                        focus:border-transparent
                        transition
                    "
        />
      </div>

      {/* 🧩 Responsive Grid */}
      <div
        className="
                grid gap-4
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            "
      >
        {filtered?.map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            url={pokemon.url}
          />
        ))}
      </div>
    </div>
  );
}
