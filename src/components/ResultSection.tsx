import { Component } from "react";
import { Card } from "./Card";
import type { Recipe } from "../types";

interface Props {
  items: Recipe[];
}

export class ResultSection extends Component<Props> {
  render() {
    return (
      <section className="results">
        {this.props.items.map((item: Recipe) => <Card key={item.id} data={item} />)}
      </section>
    )
  }
}
