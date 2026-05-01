import { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div className="card">
        <img src="https://cdn.dummyjson.com/recipe-images/1.webp" alt="recipe" />

        <div className="card__content">
          <div className="card__header">
            <h3>Classic Margherita Pizza</h3>
            <span className="badge">Easy</span>
          </div>

          <div className="meta">
            <span>🍽 4 servings</span>
            <span>⏱ 35 min</span>
            <span>🔥 300 kcal</span>
          </div>

          <div className="tags">
            <span>Italian</span>
            <span>Pizza</span>
          </div>

          <div className="rating">
            ⭐ 4.6 <span>(98 reviews)</span>
          </div>
        </div>
      </div>
    )
  }
}
