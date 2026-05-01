import { Component } from "react";
import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
  loading: boolean;
}

export class ResultSection extends Component<Props> {
  render() {
    return (
      <section className="results">
        {this.props.loading ? (
          Array(10).fill(0).map((_, i) => (<div className="sceleton" key={i}></div>))
        ) : (
          this.props.items.map((item: Recipe) => <Card key={item.id} data={item} />)
        )}
      </section>
    )
  }
}
