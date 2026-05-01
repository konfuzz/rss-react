import { Component } from "react";

export class SearchSection extends Component {
  render() {
    return (
      <section className="search">
        <div className="search__inner">
          <input type="text" placeholder="Search recipes..." />
          <button>Search</button>
        </div>
      </section>
    )
  }
}
