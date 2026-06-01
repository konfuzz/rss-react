import { create } from 'zustand'
import type { Recipe } from '../types'

type Store = {
  selectedRecipes: Map<number, Recipe>
  toggleIds: (recipe: Recipe) => void
  unselectAll: () => void
}

export const useSelectedStore = create<Store>()((set) => ({
  selectedRecipes: new Map(),
  toggleIds: (recipe: Recipe) => set((state) => {
    const newSet = new Map(state.selectedRecipes);
    if (newSet.has(recipe.id)) {
      newSet.delete(recipe.id);
    } else {
      newSet.set(recipe.id, recipe);
    }
    return { selectedRecipes: newSet };
  }),
  unselectAll: () => set({ selectedRecipes: new Map() }),
}))
