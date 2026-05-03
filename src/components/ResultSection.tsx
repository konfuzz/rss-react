import React, { Component } from "react";
import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
  loading: boolean;
  error: string | null;
}

export class ResultSection extends Component<Props> {
  render() {
    let content: React.ReactNode = this.props.items.map((item: Recipe) => <Card key={item.id} data={item} />);

    if (this.props.loading) {
      content = Array(10).fill(0).map((_, i) => (<div className="sceleton" key={i}></div>));
    } else if (this.props.items.length === 0) {
      content = (<p className="no-results">No results found. Try harder...</p>);
    }

    if (this.props.error) {
      content =  <div className="error-message">⚠️ {this.props.error}</div>
    }

    return (
      <section className="results">
        {content}
      </section>
    )
  }
}
