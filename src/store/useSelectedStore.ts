import { create } from 'zustand'

type Store = {
  selectedRecipes: number[]
  toggleIds: (id: number) => void
  unselectAll: () => void
}

export const useSelectedStore = create<Store>()((set) => ({
  selectedRecipes: [],
  toggleIds: (id: number) => set((state) => {
    if (state.selectedRecipes.includes(id)) {
      return { selectedRecipes: state.selectedRecipes.filter(i => i !== id) }
    }
    return { selectedRecipes: [...state.selectedRecipes, id] }
  }),
  unselectAll: () => set({ selectedRecipes: [] }),
}))
