import { useQuery } from '@tanstack/react-query'
import { fetchRecipeById } from '../api/recipes'
import type { Recipe } from '../types'

export function useRecipeDetailQuery(detailsId: string | null) {
  return useQuery<Recipe>({
    queryKey: ['recipe', detailsId],
    queryFn: ({ signal }) => fetchRecipeById(detailsId!, signal),
    enabled: !!detailsId,
  })
}