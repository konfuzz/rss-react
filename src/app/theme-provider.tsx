'use client'

import { useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { ReactNode } from 'react'

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useLocalStorage<boolean>('isDark', false)

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])


  return (
    <AppContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </AppContext.Provider>
  )
}