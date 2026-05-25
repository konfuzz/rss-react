import { request } from "./client";
import type { RecipesResponse, Recipe } from "../types";

export interface FetchRecipesParams {
  query?: string;
  page: number;
  limit: number;
}

export function fetchRecipes(
  { query, page, limit }: FetchRecipesParams,
  signal?: AbortSignal
): Promise<RecipesResponse> {
  const params: Record<string, string> = {
    limit: String(limit),
    skip: String((page - 1) * limit),
  };
  if (query) {
    return request<RecipesResponse>(
      `recipes/search?q=${encodeURIComponent(query)}`,
      params,
      signal
    );
  }
  return request<RecipesResponse>("/recipes", params, signal);
}

export function fetchRecipeById(
  id: string,
  signal?: AbortSignal
): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`, undefined, signal);
}