import { create } from 'zustand'

type Store = {
  selectedIds: Set<number>
  toggleIds: (id: number) => void
  unselectAll: () => void
}

export const useSelectedStore = create<Store>()((set) => ({
  selectedIds: new Set(),
  toggleIds: (id: number) => set((state) => {
    const newSet = new Set(state.selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    return { selectedIds: newSet };
  }),
  unselectAll: () => set({ selectedIds: new Set() }),
}))
