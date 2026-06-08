import { create } from 'zustand';
import type { FormStore, FormSubmission } from '../types/types';

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries: ["USA", "Canada", "UK", "Australia", "Germany", "France", "India", "China", "Japan", "Brazil"],
  addSubmission: (submission: FormSubmission) => {
    set((state) => ({
      submissions: [...state.submissions, submission],
    }));
  },
}));