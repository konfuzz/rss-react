import type { Recipe } from '../types'
export const mockRecipe: Recipe = {
  id: 1,
  name: "Classic Margherita Pizza",
  ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella cheese", "Fresh basil leaves", "Olive oil", "Salt and pepper to taste"],
  instructions: ["Preheat oven to 475°F (245°C).", "Roll out the dough and spread sauce.", "Top with mozzarella and basil.", "Bake for 12-15 minutes.", "Slice and serve."],
  prepTimeMinutes: 20,
  cookTimeMinutes: 15,
  servings: 4,
  difficulty: "Easy",
  cuisine: "Italian",
  caloriesPerServing: 300,
  tags: ["Pizza", "Italian"],
  userId: 45,
  image: "https://cdn.dummyjson.com/recipe-images/1.webp",
  rating: 4.6,
  reviewCount: 3,
  mealType: ["Dinner"],
}

export const mockRecipesResponse = {
  recipes: [mockRecipe],
  total: 1,
  skip: 0,
  limit: 10,
}