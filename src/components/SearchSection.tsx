interface Props {
  searchHandler: (e: React.SubmitEvent<HTMLFormElement>) => void;
  query: string;
}

export function SearchSection(props: Props) {
  const { searchHandler, query } = props;
  return (
    <section className="search">
      <form className="search__inner" onSubmit={searchHandler}>
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
