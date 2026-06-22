'use client'

import { createContext } from 'react';

interface AppContextProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export const AppContext = createContext<AppContextProps>({});