import { useQuery } from '@tanstack/react-query'
import { fetchRecipes } from '../api/recipes'
import type { RecipesResponse } from '../types'

const ITEMS_PER_PAGE = Number(import.meta.env.VITE_ITEMS_PER_PAGE) || 10

export function useRecipesQuery(query: string, page: number) {
  return useQuery<RecipesResponse>({
    queryKey: ['recipes', query, page],
    queryFn: ({ signal }) => fetchRecipes({ query, page, limit: ITEMS_PER_PAGE }, signal),
  })
}