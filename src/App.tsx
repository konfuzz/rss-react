import { Component } from "react";
import { SearchSection } from "./components/SearchSection";
import { ResultSection } from "./components/ResultSection";
import type { RecipesResponse, Recipe } from "./types";

const API_URL = "https://dummyjson.com/recipes";

interface AppState {
  recipes: Recipe[];
  loading: boolean;
  query: string;
  error: string | null;
}

class App extends Component<Record<string, never>, AppState> {

  state: AppState = {
    recipes: [],
    loading: true,
    query: window.localStorage.getItem("lastQuery") || "",
    error: null,
  }

  async fetchData(query: string = "") {
    this.setState({ loading: true, error: null });

    let url: URL;

    if (query) {
      url = new URL(API_URL + "/search");
      url.searchParams.set("q", query);
    } else {
      url = new URL(API_URL);
    }

    url.searchParams.set("delay", "1000");

    try {
      const data = await fetch(url);

      if (!data.ok) {
        throw new Error(`Server error: ${data.status}`);
      }

      const json: RecipesResponse = await data.json();

      const recipes = json.recipes;
      this.setState({ recipes, loading: false });
    } catch {
      this.setState({
        error: "Failed to load recipes. Please try again later.",
        loading: false,
        recipes: []
      });
    }    
  }

  handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get("query");

    const query = typeof value === "string" ? value.trim() : "";

    window.localStorage.setItem("lastQuery", query);
    this.setState({ query });
  }

  componentDidMount() {
    this.fetchData(this.state.query);
  }

  componentDidUpdate(_: Record<string, never>, prevState: AppState) {
    if (prevState.query !== this.state.query) {
      this.fetchData(this.state.query);
    }
  }

  render() {
    return (
      <div className="container">
        <SearchSection searchHandler={this.handleSearch} query={this.state.query} />
        <ResultSection items={this.state.recipes} loading={this.state.loading} error={this.state.error} />
      </div>
    )
  }
}

export default App
