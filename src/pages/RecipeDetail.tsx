import { useSearchParams, useOutletContext } from "react-router";
import { useRecipeDetailQuery } from "../hooks/useRecipeDetailQuery";

export default function RecipeDetail() {
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<{ onClose: () => void }>();
  const detailsId = searchParams.get('details');

  const { data: recipe, isPending, error } = useRecipeDetailQuery(detailsId);

  if (isPending) {
    return (
      <div className="detail-panel">
        <button className="detail-close" onClick={onClose}>✕</button>
        <div className="detail-loading" />
        <div className="detail-loading" style={{ height: 200 }} />
        <div className="detail-loading" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="detail-panel">
        <button className="detail-close" onClick={onClose}>✕</button>
        <p className="error-message">{error ? "Failed to load recipe details." : "Recipe not found."}</p>
      </div>
    );
  }
  
  return (
    <div className="detail-panel">
      <button className="detail-close" onClick={onClose}>✕</button>
      <img className="detail-image" src={recipe.image} alt={recipe.name} />
      <div className="detail-header">
        <h2>{recipe.name}</h2>
        <span className="badge">{recipe.difficulty}</span>
      </div>
      <div className="meta">
        <span>🍽 {recipe.servings} servings</span>
        <span>⏱ {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
        <span>🔥 {recipe.caloriesPerServing} kcal</span>
      </div>
      <div className="detail-section">
        <h3>Ingredients</h3>
        <ul>
          {recipe.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="detail-section">
        <h3>Instructions</h3>
        <ol>
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="tags">
        {recipe.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p className="detail-cuisine">{recipe.cuisine} · {recipe.mealType.join(", ")}</p>
      <div className="rating">
        ⭐ {recipe.rating} <span>({recipe.reviewCount} reviews)</span>
      </div>
    </div>
  );
}