import { fetchRecipeById } from "../api/recipes";
import Link from "next/link";
import type { Recipe } from "../types";

interface Props {
  detailsId: string | null
  page: string | undefined
}

export async function RecipeDetail({ detailsId, page }: Props) {
  if (!detailsId) return null

  let recipe: Recipe;
  let url: string;

  if (page) {
    url = `/?page=${page}`;
  } else {
    url = `/`;
  }

  try {
    recipe = await fetchRecipeById(detailsId);
  } catch {
    return (
      <div className="detail-panel">
        <p className="error-message">Failed to load recipe details.</p>
        <Link href={url}><button className="detail-close">✕</button></Link>
      </div>
    )
  }

  return (
    <div className="detail-panel">
      <Link href={url}><button className="detail-close">✕</button></Link>
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
      <p className="detail-cuisine">{recipe.cuisine} · {recipe.mealType.join(', ')}</p>
      <div className="rating">
        ⭐ {recipe.rating} <span>({recipe.reviewCount} reviews)</span>
      </div>
    </div>
  )
}