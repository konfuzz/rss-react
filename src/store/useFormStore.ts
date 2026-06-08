import { create } from 'zustand';
import countries from '../utils/countries';
import type { FormStore, FormSubmission } from '../types/types';

export const useFormStore = create<FormStore>((set) => ({
  submissions: [],
  countries,
  addSubmission: (submission: FormSubmission) => {
    set((state) => ({
      submissions: [...state.submissions, submission],
    }));
  },
}));