import type { Recipe } from "../types";

export function generateCSV(recipes: Recipe[]): string {
  const header = "Name,Ingredients,URL,Cuisine,Difficulty,Time\n";
  const rows = recipes.map(r => {
    const ingredients = r.ingredients.join("; ");
    const url = `${window.location.origin}/?details=${r.id}`;
    return `"${r.name}","${ingredients}","${url}","${r.cuisine}","${r.difficulty}","${r.prepTimeMinutes + r.cookTimeMinutes}"`;
  });
  return header + rows.join("\n");
}