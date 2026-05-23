import type { Recipe } from "../types";
import { useSelectedStore } from "../store/useSelectedStore";

interface Props {
  data: Recipe;
  onSelect: (id: number) => void;
}

export function Card(props: Props) {
  const { data, onSelect } = props;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target instanceof HTMLInputElement) return;
    onSelect?.(data.id);
  }

  const { selectedRecipes, toggleIds } = useSelectedStore();
  const isSelected = selectedRecipes.has(data);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    toggleIds(data);
  }

  return (
    <div className="card" onClick={handleClick} tabIndex={0} role="button">
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
        <div className="checkbox">
          <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
        </div>
      </div>
    </div>
  );  
}