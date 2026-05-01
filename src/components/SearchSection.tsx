import { Component } from "react";

interface Props {
  searchHandler: (e: React.SubmitEvent<HTMLFormElement>) => void;
  query: string;
}
export class SearchSection extends Component<Props> {
  render() {
    return (
      <section className="search">
        <form className="search__inner" onSubmit={this.props.searchHandler}>
          <input 
            name="query" 
            type="text" 
            placeholder="Search recipes..." 
            defaultValue={this.props.query}
          />
          <button type="submit">Search</button>
        </form>
      </section>
    )
  }
}
