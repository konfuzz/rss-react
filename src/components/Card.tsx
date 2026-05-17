import type { Recipe } from "../types";

interface Props {
  data: Recipe;
}

export function Card(props: Props) {
  const { data } = props;

  return (
    <div className="card">
      <img src={data.image} alt={data.name} />

      <div className="card__content">
        <div className="card__header">
          <h3>{data.name}</h3>
          <span className="badge">{data.difficulty}</span>
        </div>

        <div className="meta">
          <span>🍽 {data.servings} servings</span>
          <span>⏱ {data.prepTimeMinutes + data.cookTimeMinutes} min</span>
          <span>🔥 {data.caloriesPerServing} kcal</span>
        </div>

        <div className="tags">
          {data.tags.map((tag: string) => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div className="rating">
          ⭐ {data.rating} <span>({data.reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );  
}