import { Component } from "react";
import { SearchSection } from "./components/SearchSection";
import { ResultSection } from "./components/ResultSection";
import type { RecipesResponse, Recipe } from "./types";

const API_URL = "https://dummyjson.com/recipes";

interface AppState {
  recipes: Recipe[];
  loading: boolean;
  query: string;
}

class App extends Component<Record<string, never>, AppState> {

  state: AppState = {
    recipes: [],
    loading: true,
    query: "",
  }

  async fetchData(query: string = "") {
    this.setState({ loading: true });

    let url: URL;

    if (query) {
      url = new URL(API_URL + "/search");
      url.searchParams.set("q", query);
    } else {
      url = new URL(API_URL);
    }

    url.searchParams.set("delay", "1000");

    const data = await fetch(url);
    const json: RecipesResponse = await data.json();

    const recipes = json.recipes;

    this.setState({ recipes, loading: false });
  }

  handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("query");

    const query = typeof value === "string" ? value.trim() : "";

    if (query === this.state.query) return;

    window.localStorage.setItem("lastQuery", query);
    this.setState({ query });
    this.fetchData(query);
  }

  componentDidMount() {
    const lastQuery = window.localStorage.getItem("lastQuery");
    this.setState({ query: lastQuery || "" });
    this.fetchData(lastQuery || "");
  }

  render() {
    return (
      <div className="container">
        <SearchSection searchHandler={this.handleSearch} query={this.state.query} />
        <ResultSection items={this.state.recipes} loading={this.state.loading} />
      </div>
    )
  }
}

export default App
