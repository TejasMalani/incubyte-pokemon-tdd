import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const NotFoundPage = lazy(() => import("../components/NoPageFound"));

const PokemonList = lazy(() =>
  import("../features/pokemon/PokemonList").then((module) => ({
    default: module.PokemonList,
  })),
);

const PokemonDetail = lazy(() =>
  import("../features/pokemon/PokemonDetail").then((module) => ({
    default: module.PokemonDetail,
  })),
);

export function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          {/* 🔹 Catch-all for unknown routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
