import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SearchSection } from "../components/SearchSection";
import { ResultSection } from "../components/ResultSection";
import { Pagination } from "../components/Pagination";
import type { RecipesResponse, Recipe } from "../types";
import { TestErrorButton } from "../components/TestErrorButton";
import { useSearchParams, Outlet } from "react-router";

const API_URL = import.meta.env.VITE_API_URL || "https://dummyjson.com/recipes";
const ITEMS_PER_PAGE = import.meta.env.VITE_ITEMS_PER_PAGE || 10;

interface AppState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  total: number;
}

export default function HomePage() {
  
  const [state, setState] = useState<AppState>({
    recipes: [],
    loading: true,
    error: null,
    total: 0,
  });
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useLocalStorage("lastQuery", "");
  
  const hasDetails = !!searchParams.get('details');

  const rawPage = searchParams.get("page");
  const page = rawPage ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (query: string = "", page: number = 1) => {
      setState((prev) => ({ ...prev, loading: true, error: null, total: 0 }));

      let url: URL;

      if (query) {
        url = new URL(API_URL + "/search");
        url.searchParams.set("q", query);
      } else {
        url = new URL(API_URL);
      }

      url.searchParams.set("delay", "1000");
      url.searchParams.set("limit", ITEMS_PER_PAGE.toString());
      url.searchParams.set("skip", ((page - 1) * ITEMS_PER_PAGE).toString());

      try {
        const data = await fetch(url, { signal: controller.signal });

        if (!data.ok) {
          throw new Error(`Server error: ${data.status}`);
        }

        const json: RecipesResponse = await data.json();

        const {recipes, total} = json;
        if (!controller.signal.aborted) {
          setState((prev) => ({ ...prev, recipes, loading: false, total: total }));
        }
      } catch {
        if (!controller.signal.aborted) {
          setState((prev) => ({
            ...prev,
            error: "Failed to load recipes. Please try again later.",
            loading: false,
            recipes: [],
            total: 0,
          }));
        }
      }
    };

    fetchData(query, page);

    return () => controller.abort();
  }, [query, page]);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("query");

    const query = typeof value === "string" ? value.trim() : "";

    setQuery(query);
    setSearchParams({ page: "1" });
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  }

  const handleSelectRecipe = (id: number) => {
    setSearchParams((prev) => { prev.set('details', String(id)); return prev; });
  }

  const handleClosePanel = () => {
    setSearchParams((prev) => { prev.delete('details'); return prev; });
  };

  return (
    <div className={hasDetails ? "container container--split" : "container"}>
      <div className="left-panel">
        <SearchSection searchHandler={handleSearch} query={query} />
        <ResultSection
          items={state.recipes}
          loading={state.loading}
          error={state.error}
          onSelect={handleSelectRecipe}
        />
        {Math.ceil(state.total / ITEMS_PER_PAGE) > 1 && !state.loading && !state.error && (
          <Pagination currentPage={page} totalPages={Math.ceil(state.total / ITEMS_PER_PAGE)} onPageChange={handlePageChange} />
        )}
        <TestErrorButton />
      </div>
      {hasDetails && (
        <div className="right-panel">
          <Outlet context={{ onClose: handleClosePanel }} />
        </div>
      )}
    </div>
  );
}