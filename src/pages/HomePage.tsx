import { useLocalStorage } from "../hooks/useLocalStorage";
import { SearchSection } from "../components/SearchSection";
import { ResultSection } from "../components/ResultSection";
import { Pagination } from "../components/Pagination";
import { TestErrorButton } from "../components/TestErrorButton";
import { useSearchParams, Outlet } from "react-router";
import { Flyout } from "../components/Flyout";
import { useSelectedStore } from "../store/useSelectedStore";
import { useRecipesQuery } from "../hooks/useRecipesQuery";

const ITEMS_PER_PAGE = import.meta.env.VITE_ITEMS_PER_PAGE || 10;

export default function HomePage() { 
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useLocalStorage("lastQuery", "");
  
  const hasDetails = !!searchParams.get('details');

  const rawPage = searchParams.get("page");
  const page = rawPage ? Math.max(1, parseInt(rawPage, 10) || 1) : 1;

  const { data, isPending, error } = useRecipesQuery(query, page);
  const { selectedRecipes } = useSelectedStore();

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

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  return (
    <>
      <div className={hasDetails ? "container container--split" : "container"}>
        <div className="left-panel">
          <SearchSection searchHandler={handleSearch} query={query} />
          <ResultSection
            items={data?.recipes ?? []}
            loading={isPending}
            error={error ? "Failed to load recipes. Please try again later." : null}
            onSelect={handleSelectRecipe}
          />
          {totalPages > 1 && !isPending && !error && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          )}
          <TestErrorButton />
        </div>
        {hasDetails && (
          <div className="right-panel">
            <Outlet context={{ onClose: handleClosePanel }} />
          </div>
        )}
      </div>
      {selectedRecipes.size > 0 && <Flyout />}
    </>
  );
}