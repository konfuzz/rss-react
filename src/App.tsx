import { Component } from "react";
import { SearchSection } from "./components/SearchSection";
import { ResultSection } from "./components/ResultSection";
import type { RecipesResponse, Recipe } from "./types";

const API_URL = "https://dummyjson.com/recipes";

interface AppState {
  recipes: Recipe[];
}

class App extends Component<Record<string, never>, AppState> {

  state: AppState = {
    recipes: []
  }

  async fetchData() {
    const data = await fetch(API_URL);
    const json: RecipesResponse = await data.json();

    const recipes = json.recipes;

    this.setState({ recipes });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="container">
        <SearchSection />
        <ResultSection items={this.state.recipes} />
      </div>
    )
  }
}

export default App
