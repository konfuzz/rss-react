import { Component } from "react";
import { SearchSection } from "./components/SearchSection";
import { ResultSection } from "./components/ResultSection";

class App extends Component {

  render() {
    return (
      <div className="container">
        <SearchSection />
        <ResultSection />
      </div>
    )
  }
}

export default App
