import { useState, useEffect } from "react";
import { useSearchParams, useOutletContext } from "react-router";
import type { Recipe } from "../types";
import { fetchRecipeById } from "../api/recipes";

export default function RecipeDetail() {
  const [searchParams] = useSearchParams();
  const { onClose } = useOutletContext<{ onClose: () => void }>();
  const detailsId = searchParams.get('details');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchRecipe = async () => {
      setLoading(true);
      setError(null);

      if (!detailsId) return;

      try {
        const data = await fetchRecipeById(detailsId, controller.signal);

        if (!controller.signal.aborted) {
          setRecipe(data);
          setLoading(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Failed to load recipe details.");
          setLoading(false);
        }
      }
    };
    fetchRecipe();
    return () => controller.abort();
  }, [detailsId]);

  if (loading) {
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
        <p className="error-message">{error || "Recipe not found."}</p>
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