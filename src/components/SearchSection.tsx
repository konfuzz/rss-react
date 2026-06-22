import { search } from "../actions/search";

export function SearchSection({ query }: { query: string }) {
  return (
    <section className="search">
      <form className="search__inner" action={search}>
        <input
          name="query"
          type="text"
          placeholder="Search recipes..."
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
