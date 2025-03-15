import { create } from 'zustand';

interface UserPreferences {
  topics: string[];
  sources: string[];
  darkMode: boolean;
}

interface NewsState {
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  isPreferencesOpen: boolean;
  setPreferencesOpen: (open: boolean) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  preferences: {
    topics: ['Technology', 'Business', 'Science'],
    sources: ['Reuters', 'Associated Press', 'Bloomberg'],
    darkMode: false,
  },
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    })),
  isPreferencesOpen: false,
  setPreferencesOpen: (open) => set({ isPreferencesOpen: open }),
}));