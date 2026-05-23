import { create } from 'zustand'
import type { Recipe } from '../types'

type Store = {
  selectedRecipes: Set<Recipe>
  toggleIds: (recipe: Recipe) => void
  unselectAll: () => void
}

export const useSelectedStore = create<Store>()((set) => ({
  selectedRecipes: new Set(),
  toggleIds: (recipe: Recipe) => set((state) => {
    const newSet = new Set(state.selectedRecipes);
    if (newSet.has(recipe)) {
      newSet.delete(recipe);
    } else {
      newSet.add(recipe);
    }
    return { selectedRecipes: newSet };
  }),
  unselectAll: () => set({ selectedRecipes: new Set() }),
}))
