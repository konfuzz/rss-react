import { Component } from "react";
import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
  loading: boolean;
  error: string | null;
}

export class ResultSection extends Component<Props> {
  render() {
    if (this.props.error) {
      return (
        <section className="results">
          <div className="error-message">
            ⚠️ {this.props.error}
          </div>
        </section>
      );
    }
    
    return (
      <section className="results">
        { this.props.loading 
          ? (Array(10).fill(0).map((_, i) => (<div className="sceleton" key={i}></div>)))
          : this.props.items.length > 0
            ? (this.props.items.map((item: Recipe) => <Card key={item.id} data={item} />))
            : (<p className="no-results">No results found. Try harder...</p>)
        }
      </section>
    )
  }
}
