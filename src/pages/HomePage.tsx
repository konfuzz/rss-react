import { useState, useEffect } from "react";
import { SearchSection } from "../components/SearchSection";
import { ResultSection } from "../components/ResultSection";
import type { RecipesResponse, Recipe } from "../types";
import { TestErrorButton } from "../components/TestErrorButton";

const API_URL = "https://dummyjson.com/recipes";

interface AppState {
  recipes: Recipe[];
  loading: boolean;
  query: string;
  error: string | null;
}

export default function HomePage() {
  const [state, setState] = useState<AppState>({
    recipes: [],
    loading: true,
    query: window.localStorage.getItem("lastQuery") || "",
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async (query: string = "") => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      let url: URL;

      if (query) {
        url = new URL(API_URL + "/search");
        url.searchParams.set("q", query);
      } else {
        url = new URL(API_URL);
      }

      url.searchParams.set("delay", "1000");

      try {
        const data = await fetch(url, { signal: controller.signal });

        if (!data.ok) {
          throw new Error(`Server error: ${data.status}`);
        }

        const json: RecipesResponse = await data.json();

        const recipes = json.recipes;
        if (!controller.signal.aborted) {
          setState((prev) => ({ ...prev, recipes, loading: false }));
        }
      } catch {
        if (!controller.signal.aborted) {
          setState((prev) => ({
            ...prev,
            error: "Failed to load recipes. Please try again later.",
            loading: false,
            recipes: [],
          }));
        }
      }
    };

    fetchData(state.query);

    return () => controller.abort();
  }, [state.query]);

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("query");

    const query = typeof value === "string" ? value.trim() : "";

    window.localStorage.setItem("lastQuery", query);
    setState((prev) => ({ ...prev, query }));
  }

  return (
    <div className="container">
      <SearchSection searchHandler={handleSearch} query={state.query} />
      <ResultSection items={state.recipes} loading={state.loading} error={state.error} />
      <TestErrorButton />
    </div>
  );
}